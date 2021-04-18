import NavBar from '../components/Navbar.js'
import CarouselComponent from '../components/Carousel.js'

const HomeScreen=()=>{
         return (
             <div>
            <NavBar/>
            <div className="center"><h4>Search for various Movies and add them to your To-Watch List!</h4></div>
            <CarouselComponent/>
             </div>
           
         )
}

export default HomeScreen