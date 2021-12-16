import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './db.js'
import axios from 'axios'
import bodyParser from 'body-parser'
import asyncHandler from 'express-async-handler'
import path from 'path'

import {auth,generateToken} from './middleware/authMiddleware.js'
import User from './models/UserModel.js'

dotenv.config()
connectDatabase()

const __dirname=path.resolve()

const app=express()
app.use(express.json())
app.use(bodyParser.json(true))
app.use(bodyParser.urlencoded({extended:true}))

// get movie details based on search ---- open
      app.get('/movie/:movie',async (req,res)=>{
          try{
            const data=await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.params.movie}`)
            
            if(data.data.Error){
                res.status(201).json({message:data.data.Error})
            }        
            else{
                res.json(data.data)
            }
          }
          catch(error){
               res.status(400).json({message:'Error getting search results'})
          }
      })

// POST user details --- open  (SIGN_UP)
app.post('/user',asyncHandler(async(req,res)=>{
     const {name,email,password}=req.body

     try{
        const userExists=await User.findOne({email})
        if(userExists){
           
            throw new Error('User already Exists')
        }
        else{
              const user =await User.create({
                  name,email,password
              })
            res.status(201).json({
                id:user._id,
                name:user.name,
                email:user.email,
                movies:[],
                token:(await generateToken(user._id)).toString()
            })
        }
     }
     catch(error){

         res.status(201).json({message:error.message})
     }
}))

// POST user details --- open  (LOGIN)
app.post('/user/login',async(req,res)=>{
    const {email,password}=req.body
    try{
       const userExists=await User.findOne({email})
       if(!userExists){
         
        res.status(201).json({message:`User does'not exist`})
       }
       else{
             const user =await User.findOne({email,password})
             if(user===null)
             res.status(201).json({message:"Incorrect password"})
             else{
           res.status(201).json({
               id:user._id,
               name:user.name,
               email:user.email,
               movies:user.movies,
               token:(await generateToken(user._id)).toString()
           })
        }
       }
    }
    catch(error){
     
        res.status(400).json({message:error.message})
    }
})

//post bookmark ---- private
app.post('/bookmark',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user._id)
        await user.movies.push(req.body.movie)
        await user.save()
        
        res.status(201).json({
            movies:user.movies
        })        
    }catch(error){
           res.status(404).json(error.message)
    }
})

// update user --private
app.post('/user/update',auth,async (req,res)=>{
          try{   
                const {name,email,password}=req.body 
                const options = { returnNewDocument: true };
             let user=null 
                if(password!==''){
                    await User.findOneAndUpdate({_id:req.user._id},{ $set:{name,email,password}},options)
                    user=await User.findById(req.user._id)
                }
                    
            else{
                 await User.findOneAndUpdate({_id:req.user._id},{ $set:{name,email}},options)
                 user=await User.findById(req.user._id)
            }
        
            res.status(201).json({
                id:user._id,
                name:user.name,
                email:user.email,
                movies:user.movies,
                token:(await generateToken(user._id)).toString()
            })
        
          }catch(error){
             
                 res.status(201).json('Cannot update!')
          }
})

// delete bookmark --private
app.post('/bookmark/delete',auth,async(req,res)=>{
    try{
             const user=await User.findById(req.user._id)
             const movies=user.movies
            const filteredMovies= movies.filter((movie)=>{
                   if(movie.imdbID!=req.body.imdbID)
                    return movie
             })
             user.movies=filteredMovies
             await user.save()
             res.status(201).json({
                 movies:user.movies
             })
    }  catch(error){
        res.status(404).json('Cannot Delete')
    }                
})

//delete user --private
app.post('/user/delete',auth,async(req,res)=>{
    try{
             await User.findByIdAndDelete(req.user._id)
             res.send(201).json('deleted user')
    }  catch(error){
        res.status(404).json('Cannot Delete')
    }                
})

if(process.env.NODE_ENV==='production'){

        app.use(express.static(path.join(__dirname, '/frontend/build')))

    // * means everything except the app.get('/) we have used above
          app.get('*',(req,res)=>{
              res.sendFile(path.resolve(__dirname,'frontend','build','index.html')) 
        })
}else{
          app.get('/',(req,res)=>{
              res.json('Api is running')
        })
}

app.listen(process.env.PORT,()=>{
    console.log('Server is Running')
})