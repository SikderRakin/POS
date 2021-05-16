const express = require('express')
const Task=require("../models/task")
const auth=require("../middleware/auth")
const router=new express.Router()

router.post('/tasks',auth,async (req,res)=>{
   // const task=new Task(req.body)
   const task= new Task({
      ...req.body,
      owner:req.user._id
   })
    try {
      await task.save()
       res.status(201).send(task)
   } catch (e) {
      res.status(400).send(e)
   }
    
 })

router.get('/tasks',auth,async(req,res)=>{
   const match={}
   const sort={}
   if(req.query.completed){
      match.completed=req.query.completed ==="true"
   }
   if(req.query.sortBy){
      part=req.query.sortBy.split(':')
      sort[part[0]]=part[1]==="desc"? -1:1
   }
   try {
   // const task= await Task.find({owner: req.user._id})*this alternative of code blow*
   // res.status(201).send(task)
   await req.user.populate({
      path:'task',
      match,
      options:{
         limit:parseInt(req.query.limit),
         skip:parseInt(req.query.skip),
         sort
      }}).execPopulate() 
    res.status(201).send(req.user.task)
   } catch (e) {
      res.status(400).send(e)
   }
  
})

router.get('/task/:id',auth,async(req,res)=>{
   const _id=req.params.id
   try {

      // const task= await Task.findById({_id})
      const task= await Task.findOne({_id,owner: req.user._id})
      if(!task){
         return res.status(404).send() 
      }
       res.status(201).send(task)
   } catch (e) {
      res.status(400).send(e)
   }
 
})
router.patch('/task/:id',auth,async (req,res)=>{
   const _id=req.params.id
   const updates=Object.keys(req.body)
   const allowUpdates=["description", "completed"]
   const isValid=updates.every((update)=> allowUpdates.includes(update))
   if(!isValid){
      res.status(404).send(" error: not have the permission")
   }
   try {
      const task= await Task.findOne({_id,owner: req.user._id})
      updates.forEach((update)=> task[update]=req.body[update])
      await task.save()
   // const task= await  Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
   res.status(202).send(task)
   } catch (e) {
    res.status(400).send(e)
   }
   
   
   })

   //Delecte
router.delete('/task/:id',auth,async(req,res)=>{


   try {
      const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
      if(!task){
         res.status(404).send(" error: Cant Delecte User  ")
      }
      res.status(201).send(task)
   } catch (e) {
   
   }


})
module.exports=router