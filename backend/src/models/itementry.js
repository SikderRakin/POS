const mongoose=require("mongoose")

const itementrySchema=new mongoose.Schema({
       type:{
            type:String,
            
         },
  item_name:{
            type:String,
           
        },

        owner:{
              type: mongoose.Schema.Types.ObjectId,  
              required :true,
              ref: 'User'
          
        },
        tax:{
            type:String,
           
        },
        manufacturer:{
            type:String,
           
        },
        brand:{
            type:String,
           
        },
        color:{
            type:String,
           
        },
        storage:{
            type:String,
           
        },
        imagePath:{
            type:String,
           
        },
        other:{
            type:String,
           
        },
        price:{
            type:Number,
           
        },
        item_code :{
            type:String,
           
        },
        isActive:{
            type:Boolean,
           
        },
         
         
 },
 {
      timestamps:true
  })

  itementrySchema.pre('save', async function(next){
      const task=this
  console.log("Alter save")
//   if(user.isModified('password')){
//       user.password= await bcrypt.hash(user.password,8)
  
//   } 
  
      next()
  
  })
 const ItemEntry=mongoose.model('ItemEntry',itementrySchema)
 module.exports= ItemEntry