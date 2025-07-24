const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

//  Create login for HR user
router.post('/create-login', loginController.createLogin);

//  Read all logins
router.get('/all', loginController.getAllLogins);

//  Read single login by ID
router.get('/:log_id', loginController.getLoginById);

//  Update password
router.put('/:log_id', loginController.updateLoginPassword);

// 🗑 Delete login
router.delete('/:log_id', loginController.deleteLogin);



module.exports = router;