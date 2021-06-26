// const { Timestamp } = require('bson');
const mongoose=require('mongoose'); 
 const UserSchema = new mongoose.Schema(
   {
     firstName: String,
     lastName: {
       type: String,
     },
     email: {
       type: String,
       required: true,
       unique: true,
     },
     username: {
       type: String,
       unique: true,
       required: true,
       lowercase: true,
       trim: true,
     },
     password: {
       type: String,
       required: true,
     },
     role: {
       type: Number, //1 for admin,2 for normal user,3 visitior
       default: 2,
     },
     contactDetails: {
       mobileNumber: {
         type: Number,
         required: true,
       },
       homeNumber: Number,
       alternateNumber: Number,
     },
     image: String,
     dob: Date,
     gender: {
       type: String,
       enum: ["male", "female", "others"],
     },
     address: {
       temporaryAddress: [String],
       permanentAddress: String,
     },

     status: {
       type: String,
       enum: ["active", "inactive"],
       default: "active",
     },
     country: {
       type: String,
       default: "Nepal",
     },
     passwordResetToken:String,
     passwordResetExpiry:String,
   },

   {
     timestamps: true,
   }
 );
 const UserModel=mongoose.model('user',UserSchema);  //mongoose.model('collection',schema) //collection ma chahi last ma users s thopera aauxa
 module.exports=UserModel;