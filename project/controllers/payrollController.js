const db = require('../config/db');

const createPayroll = async (req, res) => {
  const { employeeId, month, hoursWorked } = req.body;
  const netPay = hoursWorked * 80 - 500;

  try {
    await db.execute(
      'INSERT INTO payroll (employee_id, month, hours_worked, net_pay) VALUES (?, ?, ?, ?)',
      [employeeId, month, hoursWorked, netPay]
    );
    res.status(201).json({ message: 'Payroll created ', netPay });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong with payroll' });
  }
};

const getPayroll = async (req, res) => {
  const { employeeId, month } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM payroll WHERE employee_id = ? AND month = ?',
      [employeeId, month]
    );
    res.status(200).json(rows[0] || { message: 'No data found' });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch payroll info' });
  }
};

module.exports = { createPayroll, getPayroll };