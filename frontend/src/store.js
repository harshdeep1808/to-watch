import {applyMiddleware,createStore,combineReducers} from 'redux'
import ReduxThunk from 'redux-thunk'
import {registerReducer,loginReducer} from './reducers/userReducer.js'
import {movieReducer} from './reducers/movieReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers=combineReducers({
    userRegister:registerReducer,
    userLogin:loginReducer,
    moviesResult:movieReducer
})

const middleware=composeWithDevTools(applyMiddleware(ReduxThunk))

let userInfo=localStorage.getItem('userInfo')
if(!userInfo){
    userInfo={
        message:''
    }
}

const store=createStore(reducers,{
         userRegister:userInfo,
         userLogin:userInfo
},middleware)

export default store
