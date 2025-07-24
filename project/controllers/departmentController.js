const db = require('../config/db');

//  Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM departments');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

//  Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM departments WHERE dept_id = ?', [req.params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving department' });
  }
};

//  Create department
exports.createDepartment = async (req, res) => {
  const { name, location } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO departments (name, location) VALUES (?, ?)',
      [name, location]
    );

    res.status(201).json({ dept_id: result.insertId, name, location });
  } catch (err) {
    res.status(500).json({ error: 'Error creating department' });
  }
};

//  Update department
exports.updateDepartment = async (req, res) => {
  const { name, location } = req.body;

  try {
    await db.execute(
      'UPDATE departments SET name = ?, location = ? WHERE dept_id = ?',
      [name, location, req.params.id]
    );

    res.json({ message: 'Department updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating department' });
  }
};

//  Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    await db.execute('DELETE FROM departments WHERE dept_id = ?', [req.params.id]);
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting department' });
  }
};