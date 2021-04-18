import {Card,Button} from 'react-bootstrap'
import axios from 'axios'
import {useState,useEffect} from 'react'
import Error from '../components/Error.js'
const CardComponent=({movie})=>{
          const userInfo=JSON.parse(localStorage.getItem('userInfo'))
          const [deleted,updateDeleted]=useState('nope')
        const onRemove=async ()=>{
             const config={
               headers:{
                 Authorization:`Bearer ${userInfo.token}`
               }
             }
             const imdbID=movie.imdbID
             const {data}= await axios.post('/bookmark/delete',{imdbID},config)
             userInfo.movies=data.movies
             localStorage.setItem('userInfo',JSON.stringify(userInfo))
              updateDeleted('deleted')
        }
       return ( 
           <>
           {deleted==='nope'?(
                 <Card  style={{ width: '18rem' }}>
                 <Card.Img variant="top" src={movie.Poster} alt={movie.Title}/>
                 <Card.Body>
                   <Card.Title>{movie.Title}</Card.Title>
                   <Card.Text>
                     Year: {movie.Year},
                     Type: {movie.Type}
                   </Card.Text>
                     <>
                     <Button variant="danger" onClick={onRemove}>REMOVE</Button> 
                     </>
                  
                 </Card.Body>
                     </Card>
           ):(
                 <Error message="Deleted!"/>
           )}
           
            </>
       )
}

export default CardComponent