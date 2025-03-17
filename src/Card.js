import React, { useState } from 'react';
import './Card.css';

const Card = ({ title, image, description }) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setIsDescriptionVisible(!isDescriptionVisible);
    };

    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <button onClick={toggleDescription}>
                    {isDescriptionVisible ? "Kevesebb információ" : "További információ"}
                </button>
                {isDescriptionVisible && (
                    <p className="card-description">{description}</p>
                )}
            </div>
        </div>
    );
}

export default Card;
