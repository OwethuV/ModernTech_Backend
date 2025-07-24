const db = require('../config/db');

//  Create review
exports.createReview = async (req, res) => {
  const { employee_id, review_date, score, remarks } = req.body;
  if (!employee_id || !review_date || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const [check] = await db.execute('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
    if (check.length === 0) return res.status(400).json({ error: 'Employee not found.' });

    await db.execute(
      'INSERT INTO performance (employee_id, review_date, score, remarks) VALUES (?, ?, ?, ?)',
      [employee_id, review_date, score, remarks]
    );
    res.status(201).json({ message: 'Performance review added.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add performance review.' });
  }
};

//  Read all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM performance');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch performance reviews.' });
  }
};

//  Read by ID
exports.getReviewById = async (req, res) => {
  const { performance_id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM performance WHERE performance_id = ?', [performance_id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Review not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving performance review.' });
  }
};

//  Update score and remarks
exports.updateReview = async (req, res) => {
  const { performance_id } = req.params;
  const { score, remarks } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE performance SET score = ?, remarks = ? WHERE performance_id = ?',
      [score, remarks, performance_id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Review not found.' });
    res.json({ message: 'Review updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review.' });
  }
};

//  Delete review
exports.deleteReview = async (req, res) => {
  const { performance_id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM performance WHERE performance_id = ?', [performance_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Review not found.' });
    res.json({ message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review.' });
  }
};