import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import NavBar from '../components/Navbar.js'
import {login} from '../actions/userActions.js'
import Error from '../components/Error.js'
import { createBrowserHistory } from 'history';

const LogIn=()=>{
  const [email,changeEmail]=useState('')
  const [password,changePassword]=useState('')
  const userLogin=useSelector((state)=>state.userLogin)
  let {message}=userLogin
  const dispatch=useDispatch()
  const history=createBrowserHistory()

   if(userLogin){
    if(userLogin.message){
         message=userLogin.message  
    }
}  

useEffect(()=>{
  if(userLogin&&userLogin.message==="success"){
    history.push('/')
    window.location.reload() 
 }  
},[history,userLogin])

  const submitHandler=async (e)=>{
      e.preventDefault()
      await dispatch(login(email,password))
   }
      return (
        <div>
          <NavBar/>
          {message!==''?(<Error message={message}/>):(<></>)}
          <div className="form">
          <Form  onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>changeEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>changePassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form> 
          </div>
    </div>

      )
}

export default LogIn