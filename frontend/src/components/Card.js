import {Card,Button} from 'react-bootstrap'
import axios from 'axios'
import {useState,useEffect} from 'react'

const CardComponent=({movie})=>{
          const userInfo=JSON.parse(localStorage.getItem('userInfo'))
          const[button,toggleButton]=useState('active')
          
        const onBookmark=async ()=>{
             const config={
               headers:{
                 Authorization:`Bearer ${userInfo.token}`
               }
             }
             const {data}= await axios.post('/bookmark',{movie},config)
             userInfo.movies=data.movies
             localStorage.setItem('userInfo',JSON.stringify(userInfo))
             toggleButton('disabled')
        }

        const check=()=>{
                const includes=userInfo.movies.find(movieName=>movieName.imdbID===movie.imdbID)
                includes?toggleButton('disabled'):toggleButton('active')
        }
         
        useEffect(()=>{
               check()          
        },[check])
       return (
            <Card  style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.Poster} alt={movie.Title}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>
            Year: {movie.Year},
            Type: {movie.Type}
          </Card.Text>
          {button==='active'?(
            <>
                <Button variant="primary" onClick={onBookmark}>BOOKMARK</Button> </>
          ):(
            <>  <Button variant="primary" onClick={onBookmark} disabled>BOOKMARKED</Button> </>
          )}
         
        </Card.Body>
            </Card>
       )
}

export default CardComponent