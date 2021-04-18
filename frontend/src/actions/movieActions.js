import axios from 'axios'
import {MOVIE_FAIL,MOVIE_REQUEST,MOVIE_SUCCESS} from '../actionTypes/type.js'

export const getResults=(movieName)=>async (dispatch)=>{ 
        try{
            dispatch({type:MOVIE_REQUEST })

              const {data}= await axios.get(`/movie/${movieName}`)
              if(data.message){
                const payload={
                    type:MOVIE_FAIL,
                    payload:data.message
                }
                dispatch(payload)
              }
              else{
                const result=data.Search
                const payload={
                    type:MOVIE_SUCCESS,
                    payload:result
                }
                dispatch(payload)
              }

        }catch(error){
            const payload={
                type:MOVIE_FAIL,
                payload:error.message
            }
            dispatch(payload)
        }
}