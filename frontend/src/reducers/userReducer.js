import {USER_LOGIN_REQUEST,USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGOUT,
      USER_DELETE,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL} from '../actionTypes/type.js'

export const loginReducer=(state={},action)=>{ 
        switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true};
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.error};
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_UPDATE_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_UPDATE_FAIL:
            return {loading:false,error:action.error};
        case USER_LOGOUT:
            return {};
        case USER_DELETE:
            return {};       
        default:
        return state;
        }
}

export const registerReducer=(state={},action)=>{ 
    switch(action.type){
    case USER_REGISTER_REQUEST:
        return {loading:true};
    case USER_REGISTER_FAIL:
        return {loading:false,error:action.error};
    case USER_REGISTER_SUCCESS:
        return {loading:false,userInfo:action.payload};
    case USER_LOGOUT:
        return {};
    case USER_DELETE:
        return {};
    default:
    return state;
    }
}