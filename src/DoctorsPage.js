import React, { useState } from 'react';
import Card from './Card';
import './DoctorsPage.css';
import myImage1 from './orvos1.png';
import myImage2 from './orvos2.png';
import myImage3 from './orvos3.png';

function DoctorsPage() {
    const cardData = [
        {
            title: 'Dr. Kalmár Ernő',
            image: myImage1,
            description: 'Izületi fájdalmak illetve csontproblémákat tapasztalóknak Dr.Kalmár Ernőt ajánlom aki ezeknek a probléma megoldásának specialistája.',
            specialty: 'csontproblémák'
        },
        {
            title: 'Dr. Veres Attila',
            image: myImage2,
            description: 'Himlő problémák esetén Dr. Veres Attila a megfelelő orvos ehez a betegséghez.',
            specialty: 'himlő'
        },
        {
            title: 'Dr. Balogh Kiara',
            image: myImage3,
            description: 'Ha rosszindulatú tumorral találkozik, Dr. Balogh Kiara tumorspecialista megfelelő ellátást nyújt.',
            specialty: 'tumor'
        }
    ];

    const [filter, setFilter] = useState('');

    const handleFilterChange = (specialty) => {
        setFilter(specialty);
    };

    const filteredCards = cardData.filter(card => card.specialty.includes(filter));

    return (
        <div className="DoctorsPage">
            <h1>Orvosaink</h1>
         
            <div className="filter-buttons">
                <button onClick={() => handleFilterChange('')}>Mind</button>
                <button onClick={() => handleFilterChange('csontproblémák')}>Csontproblémák</button>
                <button onClick={() => handleFilterChange('himlő')}>Himlő</button>
                <button onClick={() => handleFilterChange('tumor')}>Tumor</button>
            </div>
            <div className="card-container">
                {filteredCards.map((card, index) => (
                    <Card 
                        key={index}
                        title={card.title}
                        image={card.image}
                        description={card.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default DoctorsPage;
