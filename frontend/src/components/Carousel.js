import React from 'react'
import {Carousel} from 'react-bootstrap'
import fightClub from '../data/images/fightClub.jpg'
import inception from '../data/images/inception.jpg'
import shutterIsland from '../data/images/shutterIsland.jpg'
const CarouselComponent=()=>{
    return (
        <> 
        <div style={{backgroundColor:'black', width:"90%",marginLeft:"5%",marginTop:"50px"}}>
        <Carousel>
        <Carousel.Item interval={2000}>
            <div className="center">
          <img
            className="carouselImage"
            src={fightClub}
            alt="FightClub"
          />
          </div>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
            <div className="center">
          <img
            className="carouselImage"
            src={inception}
            alt="Inception"
          />
          </div>
        </Carousel.Item>      
        <Carousel.Item interval={2000}>
            <div className="center">
          <img
            className="carouselImage"
            src={shutterIsland}
            alt="First Movie"
          />
          </div>
        </Carousel.Item>            
      </Carousel>
      </div>
       </>
    )
}

export default CarouselComponent