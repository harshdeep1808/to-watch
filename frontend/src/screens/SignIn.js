import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import NavBar from '../components/Navbar.js'
import Error from '../components/Error.js'
import {register} from '../actions/userActions.js'

const SignIn=()=>{
  const [name,changeName]=useState('')
  const [email,changeEmail]=useState('')
  const [password,changePassword]=useState('')
  const userRegister=useSelector((state)=>state.userRegister)
  let error=null
  const dispatch=useDispatch()

  if(userRegister){
      if(userRegister.error){
        error=userRegister.error
      }
  }

  const submitHandler=(e)=>{
       e.preventDefault()
       dispatch(register(name,email,password))      
  }  
      return (
        <div>
          <NavBar/>
            {error?(<Error message={error}/>):(<></>)}
          <div className="form">
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>changeName(e.target.value)} />
          <Form.Text className="text-muted">
            Please provide your name.
          </Form.Text>
        </Form.Group>

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
        <Button variant="primary" type="submit"  >
          Sign In
        </Button>
      </Form> 
          </div>
    </div>

      )
}

export default SignIn