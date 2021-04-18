import CardComponent from '../components/Card.js'
import Navbar from '../components/Navbar.js'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getResults} from '../actions/movieActions.js'
import Error from '../components/Error.js'
import Loading from '../components/Loading.js'

const SearchResult=(props)=>{
    const dispatch = useDispatch()
    const movie=props.match.params.movie
    const moviesResult=useSelector(state=>state.moviesResult)

    useEffect(()=>{
           dispatch(getResults(movie))    
    },[dispatch,movie])
    
    return (
        <div>
         <Navbar/>
         {moviesResult.loading?(<Loading/>):(
              <>
               <h1>Search results related to {props.match.params.movie}:</h1>
               <div className="cardsContainer">
               {moviesResult.error?(<Error message={moviesResult.error}/>):( moviesResult.movies.map(movie=><CardComponent key={movie.imdbID} movie={movie}/>))}
               </div>
              </>
          )}
        </div>
    )
}

export default SearchResult