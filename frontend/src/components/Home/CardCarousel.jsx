import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BookCard from './BookCard';
import { Button } from '@mui/material';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const responsive = {
    0: { items: 1 },
    500: { items: 2 },
    600: { items: 2.5 },
    800: { items: 3 },
    900:{ items: 3.5},
    960: { items: 4 },
    1200: { items: 5 },
};

//slice(0,10)
//const items = [1,1,1,1,1].map((item) =><BookCard/>) 

const CardCarousel = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);
    const synchActiveIndex = ({item}) => setActiveIndex(item);
    return (
        <div className='relative py-10 px-3 pl-6'>
            <AliceCarousel
                //mouseTracking
                items={items}
                disableButtonsControls
                disableDotsControls
                autoPlay
                autoPlayInterval={3000}
                infinite
                responsive={responsive}
                onSlideChange={synchActiveIndex}
                activeIndex={activeIndex}
            /> 
            { activeIndex !== items.length-5 && 
                <Button onClick={slideNext} variant='contained' className='z-50' sx={{position:'absolute', top:'42%', right:'0rem', backgroundColor: '#f3ece4',
                    borderRadius: '50%', width: '45px', height: '45px', minWidth: '45px', boxShadow:'0 0 10px rgba(14, 13, 13, 0.151)'}} aria-label='next'>
                    <FaAngleRight className=' w-5 h-5 text-primary'/>
                </Button>
            }
            { activeIndex !== 0 &&
                <Button onClick={slidePrev} variant='contained' className='z-50' sx={{position:'absolute', top:'42%', left:'0rem', backgroundColor: '#f3ece4',
                    borderRadius: '50%', width: '45px', height: '45px', minWidth: '45px', boxShadow:'0 0 10px rgba(14, 13, 13, 0.151)'}} aria-label='previous'>
                    <FaAngleLeft className='w-5 h-5 text-primary'/>
                </Button>
            }
        </div>
    )
}

export default CardCarousel