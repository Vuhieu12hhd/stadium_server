const express=require('express')
const multer = require('multer');

const router=express.Router()
const movieController=require('../controllers/movie.controller')
const authMiddleware = require('../middlewares/auth.middleware');
router.get('/categories',movieController.getCategories)
router.get('/languages',movieController.getLanguages)
router.get('/formats',movieController.getFormats)
router.get('/countries',movieController.getCountries)
router.get('/:movieId/categories',movieController.getCategoriesByMovieId)
router.get('/:movieId',movieController.getMovieById)
router.get('/',movieController.getMovies)
router.post('/',authMiddleware.checkAdmin,movieController.createMovie)
router.put('/',authMiddleware.checkAdmin,movieController.updateMovie)
router.delete('/',authMiddleware.checkAdmin,movieController.deleteMovie)

module.exports=router