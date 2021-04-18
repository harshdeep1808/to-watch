import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const auth=async (req,res,next)=>{
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer'))
    {
        const token=req.headers.authorization.split(' ')[1]
  
    try{
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.id)
        req.user=user
        next()
    }catch(error){
           res.status(404)
           next()
    }
  }
  else{
    next()
  } 
}

const generateToken=(id)=>{
          return jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn: '2d'
          })
}

export { auth,generateToken}