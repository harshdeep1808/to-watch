import mongoose from 'mongoose'

const connectDatabase=async ()=>{
    try{       
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify:false
      })
      console.log('Database Connected')
    }
    catch(error){
          console.log('Error connecting to database ',error.message)
    }
}

export default connectDatabase