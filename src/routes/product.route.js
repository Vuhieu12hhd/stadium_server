const express=require('express')
const router=express.Router()
const productController=require('../controllers/product.controller')
router.get('/',productController.getProducts)
router.get('/:productId',productController.getProductById)
router.post('/',productController.createProduct)
router.put('/',productController.updateProduct)
router.delete('/',productController.deleteProduct)

module.exports=router