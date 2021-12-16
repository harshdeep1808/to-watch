import axios from 'axios'
import {USER_LOGIN_REQUEST,USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGOUT,
    USER_DELETE,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL} from '../actionTypes/type.js'
    
export const register=(name,email,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/user',{name,email,password},config)
        const dataString=JSON.stringify(data)
        if(data.message){
            const payload={
                type:USER_REGISTER_FAIL,
                error:data.message
            }
            dispatch(payload)
        }
        else{
        const payload={
            type:USER_REGISTER_SUCCESS,
            payload:data
        }
        dispatch(payload)
        localStorage.setItem('userInfo',dataString)
        }
    }catch(error){
        const payload={
            type:USER_REGISTER_FAIL,
            error:error.message
        }
        dispatch(payload)
    }
}

export const login=(email,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        const {data}=await axios.post('/user/login',{email,password},config)
        if(data.message){
            const payload={
                type:USER_LOGIN_FAIL,
                error:data.message
            }
            dispatch(payload)
        }else{
            const dataString=JSON.stringify(data)
            const payload={
                type:USER_LOGIN_SUCCESS,
                payload:data
            }
            dispatch(payload)
            localStorage.setItem('userInfo',dataString)
        }
    }catch(error){
        const payload={
            type:USER_LOGIN_FAIL,
            error:error.message
        }
        dispatch(payload)
    }
}

export const updateAccount=(name,email,password)=>async dispatch=>{
        try{
                  const userInfo=JSON.parse(localStorage.getItem('userInfo'))
                  const config={
                       headers:{
                           Authorization:`Bearer ${userInfo.token}`
                       }
                  }
                
                  const {data}=await axios.post('user/update',{name,email,password},config)
                
                  dispatch({
                      type:USER_UPDATE_SUCCESS,
                      payload:data
                  })
                 localStorage.setItem('userInfo',JSON.stringify(data))
         } catch(error){
              dispatch({
                  type:USER_UPDATE_FAIL
              })
         }          
}

export const deleteAcc=()=>async dispatch=>{
        try{  
            const userInfo=JSON.parse(localStorage.getItem('userInfo'))
              const config={
                  headers:{
                      Authorization:`Bearer ${userInfo.token}`
                  }
              }
             
               await axios.post('/user/delete',{},config)
               dispatch({
                   type:USER_LOGOUT
               })         
              
           }catch(error){
                 console.log(error.message)
        }
}