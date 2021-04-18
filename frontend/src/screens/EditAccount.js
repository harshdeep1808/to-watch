import {Form,Button} from 'react-bootstrap'
import NavBar from '../components/Navbar.js'
import {useState} from 'react'
import {updateAccount,deleteAcc} from '../actions/userActions.js'
import {useDispatch} from 'react-redux'
import { createBrowserHistory } from 'history';

const EditAccount=()=>{
        const {name,email}=JSON.parse(localStorage.getItem('userInfo'))
        const [name1,changeName]=useState(name)
        const [email1,changeEmail]=useState(email)
        const [password1,changePassword]=useState('')
        const dispatch=useDispatch()
        const history=createBrowserHistory()
        
        const deleteMyAccount=async (e)=>{
          await dispatch(deleteAcc())
          localStorage.removeItem('userInfo') 
          
          history.push('/signin')
          window.location.reload() 
 } 

        const submitHandler=async (e)=>{
                 await dispatch(updateAccount(name1,email1,password1))
                 history.push('/')
                 window.location.reload()
        }     

       return (
        <div>
        <NavBar/>
        <div className="form">
        <Form>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name1} onChange={(e)=>{ changeName(e.target.value);}} />
        </Form.Group> 

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email1} onChange={(e)=>changeEmail(e.target.value)}/>
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password1} onChange={(e)=>changePassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={submitHandler}>
        Edit Account
      </Button>
      <Button variant="danger" onClick={deleteMyAccount}>
        Delete Account
      </Button>
    </Form> 
        </div> 
    </div>
       ) 
}

export default EditAccount