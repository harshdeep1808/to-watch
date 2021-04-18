import mongoose from 'mongoose'

const movieSchema=mongoose.Schema({
      Poster:{
          type:String
      },
      Title:{
          type:String
      },
      Type:{
        type:String
    },Year:{
        type:String
    },
     imdbID:{
        type:String
    }
})

const userSchema=mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    movies:[movieSchema]
})
const User=mongoose.model('User',userSchema)

export default User