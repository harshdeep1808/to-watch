import {useDispatch,useSelector} from 'react-redux'
import CardComponent from '../components/CardRemove.js'
import Navbar from '../components/Navbar.js'
import Error from '../components/Error.js'
import Loading from '../components/Loading.js'

const MyMovies=()=>{
    const userInfo=JSON.parse(localStorage.getItem('userInfo'))      
        return(
            <div>
            <Navbar/>
                 <> 
                 {userInfo.movies.length===0?(
                     <Error message="No Movies Yet! Please search and add movies" />
                 ):(
                     <>
                    <h1>Your Movies:</h1>
                    <div className="cardsContainer">
                     {userInfo.movies.map(movie=><CardComponent key={movie.imdbID} movie={movie}/>)}
                    </div>
                    </>        
                 )}
                 </>          
           </div>
        )
}

export default MyMovies