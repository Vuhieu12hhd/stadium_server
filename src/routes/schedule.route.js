const express = require('express');

const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.get('/allChairs', scheduleController.getAllChairs);
router.get('/amount', scheduleController.getAmount);
router.get('/report', authMiddleware.checkAdmin, scheduleController.getReport);
router.get('/ticketByCode', scheduleController.getTicketByCode);
router.post('/receiveTicket', scheduleController.receiveTicket);
router.post('/cancelTicket', scheduleController.cancelTicket);
router.post('/bookingChairs', scheduleController.bookingChairs);
router.get(
  '/chairsByScheduleId/:scheduleId',
  scheduleController.getChairsByScheduleId
);
router.get(
  '/timeTypeSchedule/:scheduleId',
  scheduleController.getTimeTypeSchedule
);
router.get(
  '/getSchedulesOfMovieByDate',
  scheduleController.getSchedulesOfMovieByDate
);
router.get('/:scheduleId', scheduleController.getScheduleById);
router.post('/', authMiddleware.checkAdmin, scheduleController.createSchedule);
router.put('/', authMiddleware.checkAdmin, scheduleController.updateSchedule);
router.get('/', scheduleController.getSchedules);
router.delete(
  '/',
  authMiddleware.checkAdmin,
  scheduleController.deleteSchedule
);

module.exports = router;
