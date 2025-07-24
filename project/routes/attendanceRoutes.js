const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST – Create attendance record
router.post('/', async (req, res) => {
    const {employeeId, date, status} = req.body;
    try{
        await db.execute(
            'INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)',
            [employeeId, date, status]
        );
        res.status(201).json({ message: 'Attendance recorded'});
    }   catch (err) {
        res.status(500).json({ error: 'Could not record attendance'});
    }
});

//  GET – All records
router.get('/', async(req, res) => {
    try{
       const [rows] = await db.execute('SELECT * FROM attendance');
       res.status(200).json(rows);
    }  catch (err) {
        res.status(500).json({ error: 'Could not fetch attendance records' });
    }
});

// GET - specific employee
router.get('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try {
        const [rows] = await db.execute(
            'SELECT * FROM attendance WHERE employee_id = ?',
            [employeeId]
        );
        res.status(200).json(rows);
    }   catch (err) {
        res.status(500).json({ error: 'Could not fetch attendance record for employee'});
    }
});

// PUT -update full attendance records
router.put('/:id', async (req, res) => {
    const { employeeId, date, status} = req.body;
    const { id } = req.params;
    try {
        await db.execute(
            'UPDATE attendance SET employee_id = ?, date = ?, status = ? WHERE attendance_id = ?',
            [employeeId, date, status, id]
        );
        res.status(200).json({ message: 'Attendance updated' });
    }   catch (err) {
        res.status(500).json({ error: 'Could not update attendance' });
    }
});

router.delete('/:id', async (req, res) => {
    const{ id } = req.params;
    try{
      await db.execute('DELETE FROM attendance WHERE attendance_id = ?', [id]);
      res.status(200).json ({ message: 'Attendance deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete attendance record' });
    }
});

// PATCH - 
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await db.execute(
      'UPDATE attendance SET status = ? WHERE attendance_id = ?',
      [status, id]
    );
    res.status(200).json({ message: 'Attendance status updated' });
  } catch (err) {
    console.error('Patch error:', err.message);
    res.status(500).json({ error: 'Could not patch attendance' });
  }
});

module.exports = router;