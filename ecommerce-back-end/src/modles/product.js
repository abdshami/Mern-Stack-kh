const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
      fname : {
          type:String,
          required: true,
          trim: true
          
      },

      description : {
        type:String,
        required: true,
        trim: true,
        maxlenngth: 2000
        
     },
     price : {
        type:Number,
        required: true,
        trim: true
        
    },
    category : {
        type:ObjectId,
        ref: 'Category',
        required:true
        
    },
    quantity : {
        type:Number,
        required: true
    },

    sold:{
        type:Number,
        default:0
    },

    photo : {
        type:String,
        required: true,
        trim: true,
        maxlenngth: 300
    },

    shipping : {
        type:Boolean,
        required: false
    },


},
    { timestamps: true }
)

  
// userSchema.virtual('password')
// .set(function(password){
 
//      this._password = password
//      this.salt = uuid();
//      this.hashed_password = this.encryptPassword(password)

// })  

// .get(function(){
//     return this._password
// })

//userSchema.methods = { 
     

//     encryptPassword: function(password){
//         if(!password) return ""
//         try{
//             return crypto.createHmac('sha1', this.salt)
//                   .update(password)
//                   .digest('hex')
//         }catch (err) {
//             return ""
//         }
//     }

 //}

    

module.exports = mongoose.model("Product",productSchema);