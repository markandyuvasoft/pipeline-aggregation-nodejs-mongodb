import mongoose from 'mongoose';
const Schema=mongoose.Schema

const userSchema = new Schema({
 
   name:{
      type:String
   },

   designation: {
      type: String
  },

   email:{

      type:String
   },

   phone:{

      type:String
   },

   age:{

      type: Number
   },

   gender:{

      type: String
   },
   salary:{

      type: Number
   },

   department:{

      type: String
   },
},

   {timestamps:true});

const User = new mongoose.model("User",userSchema)

export default User;