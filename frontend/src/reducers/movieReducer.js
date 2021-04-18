import {MOVIE_FAIL,MOVIE_REQUEST,MOVIE_SUCCESS,USER_LOGOUT} from '../actionTypes/type.js'

export const movieReducer=(state={loading:true},action)=>{
      switch(action.type){
            case MOVIE_REQUEST:
                return {loading:true};
            case MOVIE_SUCCESS:
                return {loading:false,movies:action.payload};
             case MOVIE_FAIL:
                return {loading:false,error:action.payload};
            case USER_LOGOUT:
               return {};
            default:
                return state;       
      }        
}