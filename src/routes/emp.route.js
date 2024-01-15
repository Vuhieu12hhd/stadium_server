const express=require('express')

const router=express.Router()
const empController=require('../controllers/emp.controller')

router.get('/:empId',empController.getEmpById)
router.get('/',empController.getEmps)
router.delete('/',empController.deleteEmp)
router.post('/',empController.createEmp)
router.put('/',empController.updateEmp)


module.exports=router