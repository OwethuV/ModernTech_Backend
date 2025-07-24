const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.createLogin = async (req, res) => {
  //  Extract values safely
  const { employee_id, password } = req.body;
  console.log("Incoming login data:", req.body);

  //  Guard clause: ensure payload exists
  if (!employee_id || !password) {
    return res.status(400).json({ error: 'Missing employee ID or password.' });
  }

  try {
    //  Check if employee exists
    const [check] = await db.execute(
      'SELECT * FROM employees WHERE employee_id = ?',
      [employee_id]
    );

    if (check.length === 0) {
      return res.status(400).json({ error: 'Employee not found. Cannot create login.' });
    }

    //  Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert login record
    await db.execute(
      'INSERT INTO login (employee_id, password) VALUES (?, ?)',
      [employee_id, hashedPassword]
    );

    res.status(201).json({
      message: `Login created successfully for employee ${employee_id}`,
      employee_id
    });
  } catch (err) {
    console.error(' Login creation error:', err.message);
    res.status(500).json({ error: 'Login creation failed due to server error.' });
  }
};

//  READ - Fetch all login records
exports.getAllLogins = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM login');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch login records' });
  }
};

// READ ONE - Fetch login by log_id
exports.getLoginById = async (req, res) => {
  const { log_id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM login WHERE log_id = ?', [log_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Login not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch login record' });
  }
};

//  UPDATE - Change password for a login
exports.updateLoginPassword = async (req, res) => {
  const { log_id } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: 'New password required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'UPDATE login SET password = ? WHERE log_id = ?',
      [hashedPassword, log_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Login not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password' });
  }
};

//  DELETE - Remove a login entry
exports.deleteLogin = async (req, res) => {
  const { log_id } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM login WHERE log_id = ?',
      [log_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Login not found' });
    }

    res.json({ message: `Login #${log_id} deleted` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete login' });
  }
};