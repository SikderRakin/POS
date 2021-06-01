const express = require('express')
const User=require("../models/user")
const router=new express.Router()
const auth=require('../middleware/auth')
const multer=require("multer")
const sharp=require("sharp")

//Img upload
//  const upload=multer({
//    limits:{
//       fileSize:1000000000
//    },
//    fileFilter(req,file,cb){
//       if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
//          return cb(new Error("Please upload a Word file"))
//       }
//       cb(undefined,true)
//    }
// })
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
    cb(null, name+'-'+Date.now()+'.'+extention);

   }
 })
  
 const userAvatar = multer({ storage: storage })

router.post('/users',userAvatar.single("image") ,async (req,res)=>{
   const url=req.protocol + "://"+req.get("host")
   req.body.imagePath=url + "/Img/" + req.file.filename
   console.log(req.body)
   const me=new User(req.body)

    try {
  
       await me.save()
     
       const token= await me.generateAuthToken()
    
       res.status(201).send({me,token})
    } catch (e) {
       res.status(400).send(e)
    }
 //   await me.save().then(()=>{
 //     res.status(201).send(me)
 //    }).catch((error)=>{
 //     res.status(400).send(e)
 //    })
 })
 
 router.get('/users/me',auth,async (req,res)=>{
 
  res.send(req.user)
  })
 
  
  router.get('/user/:id',async(req,res)=>{
      const _id=req.params.id
      try {
       const user= await User.findById({_id})
          if(!user){
            return res.status(404).send() 
         }
       res.status(201).send(user)
    } catch (e) {
       res.status(400).send(e)
    }
    //  User.findById({_id}).then((user)=>{
    //      if(!user){
    //         return res.status(404).send() 
    //      }
    //    res.status(201).send(user)
    //   }).catch((error)=>{
    //    res.status(400).send(e)
    //   })
   })
   router.post('/user/login',async (req,res)=>{
      // findByCredentials
      try {
       const user= await User.findByCredentials(req.body.email, req.body.password)

       const token= await user.generateAuthToken()
       
          if(!user){
            return res.status(404).send() 
         }
       res.status(201).send({user,token})
    } catch (e) {
       res.status(403).send(e)
    }
   })

//LogOut

router.post('/user/logout',auth,async(req,res)=>{
 try {
    req.user.tokens=req.user.tokens.filter((token)=> 
    {
       return token.token !==req.token
      })
   await req.user.save()
   res.status(201).send()
 } catch (e) {
   res.status(500).send(e)
 }

})
router.post('/user/logoutAll',auth,async(req,res)=>{
   try {
      req.user.tokens=[]
     await req.user.save()
     res.status(201).send()
   } catch (e) {
     res.status(500).send(e)
   }
  
  })

//Update

router.patch('/user/me',auth,async (req,res)=>{

 const updates=Object.keys(req.body)
 const allowUpdates=["name", "age","email","password"]
 const isValid=updates.every((update)=> allowUpdates.includes(update))
 if(!isValid){
    return res.status(404).send(" error: not have the permission")
 }
 try {
const me= req.user
console.log(me)
updates.forEach((update)=> me[update]=req.body[update])

await me.save()

//  const user= await  User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})

 res.status(202).send(me)
 } catch (e) {
  res.status(400).send(e)
 }
 
 
 })


 //Delete
 router.delete('/user/me',auth,async(req,res)=>{
    try {
      //  const user=await User.findByIdAndDelete(req.params.id)
      //  if(!user){
      //     res.status(404).send(" error: Cant Delete User  ")
      //  }
      await req.user.remove()
       res.status(201).send(req.user)
    } catch (e) {
      res.status(401).send(e)
    }
 
 
 })
 
//Post Avatar
// router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
//    const buffer= await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
//   req.user.avatar=buffer
//   await req.user.save() 
//   res.send()
// },(error,req,res,next)=>{
//   res.status(400).send({error:error.message})
// })

// //Delete avatar
// router.delete('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
//    req.user.avatar=undefined
//    await req.user.save() 
//    res.send()
//  },(error,req,res,next)=>{
//    res.status(400).send({error:error.message})
//  })

//  //Get Avatar By Id
//  router.get('/users/:id/avatar',upload.single('avatar'),async(req,res)=>{
//     try {
//       const user= await User.findById(req.params.id)
//       if(!user | !user.avatar){
//          throw new Error("Cant find")
//       }
//       res.set('Content-Type','image/png')
//       res.send(user.avatar)
//     } catch (e) {
//       res.status(400).send({error:error.message})
//     }

//  }
//  )
 module.exports=router
