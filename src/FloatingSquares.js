import React, { useEffect, useState } from 'react';
import './FloatingSquares.css';

// Képek importálása
import pirulaImage from '../src/pirula.png';
import dobozpirulaImage from '../src/dobozpirula.png';

const FloatingSquares = () => {
    const [images, setImages] = useState([pirulaImage, dobozpirulaImage]); // A képeket tömbben tároljuk

    useEffect(() => {
        const spanElements = Array.from(document.querySelectorAll('.wrapper span'));

        // Kép váltás minden elemhez
        spanElements.forEach((span, index) => {
            const image = images[index % 2]; // Felváltva a képek
            span.style.backgroundImage = `url(${image})`; // Dinamikusan állítjuk be a háttérképet
        });
    }, [images]); // Amikor a képek változnak, újra lefut

    return (
        <div className="wrapper">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default FloatingSquares;
