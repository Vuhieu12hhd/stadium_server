const express=require('express')
const authMiddleware = require('../middlewares/auth.middleware');
const router=express.Router()
const cinemaController=require('../controllers/cinema.controller')
router.get('/:cinemaId/rooms',cinemaController.getRoomsByCinemaId)
router.get('/cinemaByCityId/:cityId',cinemaController.getCinemaByCityId)
router.get('/rooms/:roomId',cinemaController.getCinemaByRoomId)
router.get('/cities',cinemaController.getCities)
router.post('/rooms',authMiddleware.checkAdmin,cinemaController.addRoom)
router.get('/:cinemaId',cinemaController.getCinemaById)
router.get('/',cinemaController.getCinemas)
router.post('/',authMiddleware.checkAdmin,cinemaController.createCinema)
router.put('/',authMiddleware.checkAdmin,cinemaController.updateCinema)
router.delete('/',authMiddleware.checkAdmin,cinemaController.deleteCinema)

module.exports=router