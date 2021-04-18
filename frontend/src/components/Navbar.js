import React from 'react'
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Navbar,Button,Form,FormControl,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import {getResults} from '../actions/movieActions.js'
import logo from '../logo/logo.jpg'

const history=createBrowserHistory()

const NavBar=()=>{
     const [searchVal,changeSearchVal]=useState('')
     const dispatch=useDispatch()

    const onClck=(e)=>{
         dispatch(getResults)
        history.push(`/search/${searchVal}`)
    }

    const userInfo=localStorage.getItem('userInfo')
  
     const logoutHandler=()=>{
              localStorage.removeItem('userInfo')
              history.push('/login')
              window.location.reload()
     }
    return(
        <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand ><Link to='/'><img src={logo} className="logo"/></Link></Navbar.Brand>
          <Nav className="mr-auto">
            {userInfo?(
                   <>
                 <Nav.Link href="/myMovies">My Movies</Nav.Link>
                 <Nav.Link href="/editAccount">Edit Account</Nav.Link>
                 <Nav.Link onClick={logoutHandler}>Log Out</Nav.Link>
                 </>
            ):( <>
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
              </>
            )}
            
          </Nav>
          {userInfo?(
            <Form onSubmit={onClck} inline >
            <FormControl type="text" placeholder="Search Movies" className="mr-sm-2" value={searchVal} onChange={(e)=>changeSearchVal(e.target.value)} />
            <Button variant="outline-light" type="submit" >Search</Button>
          </Form>
          ):(<></>)}
        </Navbar>
                
        <br />
      </header>
      
    )
}

/*
    
*/ 
export default NavBar 