const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const { checkLogin } = require('../middlewares/auth.middleware');
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/changePassword', checkLogin, authController.changePassword);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/confirmPassword', authController.confirmPassword);
// router.post('/send-verify-token',authController.register)
router.get('/verify-email', authController.verifyEmail);
router.get('/information', checkLogin, authController.getMyInformation);
router.put('/information', checkLogin, authController.updateMyInformation);
router.get('/myTickets', checkLogin, authController.getMyTickets);

module.exports = router;
