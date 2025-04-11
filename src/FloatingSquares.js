import React from 'react';
import './FloatingSquares.css';

// Képek importálása
import pirulaImage from './assets/pirula.png';
import dobozpirulaImage from './assets/dobozpirula.png';

// Kép váltás
const FloatingSquares = () => {
    const images = [pirulaImage, dobozpirulaImage];

    const floatingItems = Array.from({ length: 10 }, (_, i) => {
        const img = images[i % images.length];
        const style = {
            backgroundImage: `url(${img})`,
        };
        return <span key={i} className={`item item-${i + 1}`} style={style}></span>;
    });

    return (
        <div className="wrapper">{floatingItems}</div>
    );
}

export default FloatingSquares;
