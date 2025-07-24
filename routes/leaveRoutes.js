const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create new leave request
router.post('/', async (req, res) => {
    const { employeeId, type, startDate, endDate, reason } = req.body;
    try {
        await db.execute(
            'INSERT INTO leave_requests (employee_id, type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)',
            [employeeId, type, startDate, endDate, reason]
        );
        res.status(201).json({ message: 'Leave request submitted successfully' });;
    } catch (err) {
        console.error('POST error:', err.message);
        res.status(500).json({ error: 'Could not  create leave request' });
    }
});

// GET all leave requests
router.get('/', async (req, res) => {
    try{
        const [rows] = await db.execute('SELECT * FROM leave_requests');
        res.status(200).json(rows);
    } catch (err) {
        console.error('GET all error:', err.message);
        res.status(500).json({ error: 'Could not fetch leave requests' });
    }
});

// GET leave request for a specific employee
router.get('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try {
       const [rows] = await db.execute(
        'SELECT * FROM leave_requests WHERE employee_id = ?',
        [employeeId]
       );
       res.status(200).json (rows);
    }  catch (err) {
       console.error('GET by employee error:', err.message);
       res.status(500).json({ error: 'Could not fetch employee leave requests' });
    }
});

// UPDATE leave status
router.patch('/:leaveId/status', async (req, res) => {
    const { status } = req.body;
    const { leaveId } = req.params;
    try {
        await db.execute(
            'UPDATE leave_requests SET status = ? WHERE leave_id = ?',
            [status, leaveId]
        );
        res.status(200).json({ message: 'Leave status updated successfully' });
    }   catch (err) {
        console.error('PATCH error:', err.message);
        res.status(500).json({ error: 'Could not update leave status' });
    }
});

//  DELETE a leave request by ID
router.delete('/:leaveId', async (req, res) => {
  const { leaveId } = req.params;
  try {
    const [result] = await db.execute(
      'DELETE FROM leave_requests WHERE leave_id = ?',
      [leaveId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    console.error('DELETE error:', err.message);
    res.status(500).json({ error: 'Could not delete leave request' });
  }
});

module.exports = router;