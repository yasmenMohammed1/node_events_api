const express=require('express');
const  controller = require('../controllers/EventController');
const {check,body,query,param}=require("express-validator");
const router=express.Router();
 router.route('/events').get(controller.getEvents)
 .post(
   [body("title").notEmpty().withMessage('enter the event title').isString().withMessage('title must be string'),

 body('eventData').isObject().withMessage("eventData must be an object"),
 body('mainSpeaker').notEmpty().withMessage('please enter the speaker')
 , body('speakers').notEmpty().withMessage('please enter an speakes').isArray().withMessage("enter speakers in an array")
, body('students').notEmpty().withMessage('please enter the students allowed to enter the event')


],controller.createEvent).put(controller.updateEvent).delete(controller.deleteEvent);


router.route('/Events/:id').get([
  param('id').isInt().withMessage('id must be a number')
],controller.getEvent)

 module.exports=router
 
 

