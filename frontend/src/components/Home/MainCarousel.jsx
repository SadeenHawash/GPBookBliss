import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Section1 from './section1';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const items = [
    <div className="item bg-slate-300 h-32" data-value="1">1</div>,
    <div className="item bg-slate-300 h-32" data-value="2">2</div>,
    <div className="item bg-slate-300 h-32" data-value="3">3</div>,
    <div className="item bg-slate-300 h-32" data-value="4">4</div>,
    <div className="item bg-slate-300 h-32" data-value="5">5</div>,
];

const MainCarousel = () => {
    return (
        <AliceCarousel
        //mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
        //responsive={responsive}
        //controlsStrategy="alternate"
        />
    )
}

export default MainCarousel