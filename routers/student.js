const express=require('express');
const  controller = require('../controllers/studentController');
const {check,body,query,param}=require("express-validator");
const router=express.Router();
 router.route('/students').get(controller.getStudents)
 .post(
   controller.createStudent).put(controller.updatestudent).delete(controller.deletestudent);


router.route('/students/:id').get([
  param('id').isInt().withMessage('id must be a number')
],controller.getStudent)

 module.exports=router
 
 

