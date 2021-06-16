const mongoose = require('mongoose');
const validator=require('validator'); 
const  bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Task = require('./task');
const ItemEntry = require('./itementry');


const userSchema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        trim: true
    },
    first_name:{
        type:String,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){

            if(!validator.isEmail(value)){
                throw new Error("Email is not valid") 
            }
        }
    },
    DOB:{
        type: Date,
        max: Date.now(),
        // validate(value){
        //  if(value<0){
        //     throw new Error("A positive number is must") 
        //  }
        //  }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
       
        validate(value){
      
            if(value.toLowerCase().includes("password")){
                throw new Error("Password is not valid") 
            }
        }
    },
    contact:{
        type:Number,
        default:0,
        validate(value){
         if(value<0){
            throw new Error("A positive number is must") 
         }
     }},
    country:{
        type:String,
    },
    region:{
        type:String
    },
    address:{
        type:String,
        required:true,
    },
    zip_code:{
        type:String,
    },
    gender:{
        type:String,
        required:true, 
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    imagePath:{
        type:String
    },
    isActvie:{
        type:Boolean
    },
    rollID:{
        type:String
    },
    EmplyeeCode:{
        type:String
    }

    

},

{
    timestamps:true
}
)
//Virtual Field
userSchema.virtual('task',{
   ref: 'Task',
   localField:'_id',
   foreignField:'owner'

})
userSchema.virtual('itementry',{
    ref: 'ItemEntry',
    localField:'_id',
    foreignField:'owner'
 
 })

//Hide private Data Default
// userSchema.methods.toJSON=function(){

//    const user=this
//    const userObject=user.toObject()
//    delete userObject.password
//    delete userObject.tokens
//    delete userObject.first_name
//    delete userObject.last_name



// // add IsActvie , RollID, EmplyeeCode, here to hide them from view

//    return userObject
// }

//Hide data for user table
userSchema.methods.toJSON=function(){

    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.first_name
    delete userObject.last_name
    delete userObject.DOB
    delete userObject.country
    delete userObject.region
    delete userObject.address
    delete userObject.zip_code
    delete userObject.gender
    delete userObject.imagePath

 
 
 
 // add IsActvie , RollID, EmplyeeCode, here to hide them from view
 
    return userObject
 }

//Token Generate
userSchema.methods.generateAuthToken= async function(){
    const user=this
    const token= jwt.sign({_id:user.id.toString()},'rakin')
    user.tokens=user.tokens.concat({token})
  
    await user.save()
    return token
}


userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})
  
if(!user){
    throw new Error("Cant find Email");
}  

  const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("Cant find password");
    }
   return user
}

//Hash password before saving
userSchema.pre('save', async function(next){
    const user=this

if(user.isModified('password')){
    user.password= await bcrypt.hash(user.password,8)

} 

    next()

})

userSchema.pre('remove', async function(next){
    const user=this

   await Task.deleteMany({owner:user._id})

    next()

})
const User=mongoose.model('User',userSchema)



// const me= new User({
//   name:"Rakin",
//   email:"Rakin@gmail.com ",
//   age:20,
//   password:"Ra"
 
// })
// me.save().then((resutl)=>{
//     console.log(resutl)
// }).catch((error)=>{
//     console.log(error)
// })
module.exports= User