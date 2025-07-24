const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Create payroll (POST)
router.post('/', async (req, res) => {
  const { employeeId, month, hoursWorked } = req.body;
  const netPay = hoursWorked * 80 - 500;
  try {
    await db.execute(
      'INSERT INTO payroll (employee_id, month, hours_worked, net_pay) VALUES (?, ?, ?, ?)',
      [employeeId, month, hoursWorked, netPay]
    );
    res.status(201).json({ message: 'Payroll record created', netPay });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payroll record' });
  }
});

// ✅ Get all payroll records (GET)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM payroll');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payroll records' });
  }
});

// ✅ Get specific payroll by ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM payroll WHERE payroll_id = ?',
      [id]
    );
    res.status(200).json(rows[0] || { message: 'Payroll not found' });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch payroll info' });
  }
});

// ✅ Update payroll record (PUT)
router.put('/:id', async (req, res) => {
  const { employeeId, month, hoursWorked } = req.body;
  const { id } = req.params;
  const netPay = hoursWorked * 80 - 500;
  try {
    await db.execute(
      'UPDATE payroll SET employee_id = ?, month = ?, hours_worked = ?, net_pay = ? WHERE payroll_id = ?',
      [employeeId, month, hoursWorked, netPay, id]
    );
    res.status(200).json({ message: 'Payroll record updated' });
  } catch (err) {
    res.status(500).json({ error: 'Could not update payroll' });
  }
});

// ✅ Patch payroll netPay only (PATCH)
router.patch('/:id/pay', async (req, res) => {
  const { netPay } = req.body;
  const { id } = req.params;
  try {
    await db.execute(
      'UPDATE payroll SET net_pay = ? WHERE payroll_id = ?',
      [netPay, id]
    );
    res.status(200).json({ message: 'Net pay updated' });
  } catch (err) {
    res.status(500).json({ error: 'Could not patch net pay' });
  }
});

// ✅ Delete payroll record (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM payroll WHERE payroll_id = ?', [id]);
    res.status(200).json({ message: 'Payroll deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete payroll' });
  }
});

module.exports = router;