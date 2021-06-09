const express = require('express')
const ItemEntry=require("../models/itementry")
const auth=require("../middleware/auth")
const multer=require("multer")
const router=new express.Router()

const MiME_TYPE_MAP={
    "image/png":"png",
    "image/jpeg":"jpg",
    "image/jpg":"jpg"
    
 }; 
 
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       const isValid=MiME_TYPE_MAP[file.mimetype];
       let error=new Error("Invalid mime type");
       if(isValid){
          error=null
       }
      cb(error, 'backend/Img')
    },
    filename: function (req, file, cb) {
     const name=file.originalname.toLowerCase().split('').join('-');
     const extention=MiME_TYPE_MAP[file.mimetype];
     cb(null,'Product'+'-'+name+'-'+Date.now()+'.'+extention);
 
    }
  })
   
  const itemImg = multer({ storage: storage })
router.post('/itementry',itemImg.single("image") ,auth,async (req,res)=>{
   // const task=new Task(req.body)
   const url=req.protocol + "://"+req.get("host")
   req.body.imagePath=url + "/Img/" + req.file.filename
   console.log(req.body)
   const itementry= new ItemEntry({
      ...req.body,
      owner:req.user._id
   })
    try {
      await itementry.save()
   
       res.status(201).send(itementry)
   } catch (e) {
      res.status(400).send(e)
   }
    
 })


module.exports=router