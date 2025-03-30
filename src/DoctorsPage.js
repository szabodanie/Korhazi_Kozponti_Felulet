import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import './DoctorsPage.css';
import { UserContext } from './UserContext'; // Az admin jogosultság ellenőrzéséhez

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]); // Orvosok tárolása
    const [filter, setFilter] = useState(''); // Szűrő a specialitásokhoz
    const [error, setError] = useState(null); // Hibák kezelése
    const [success, setSuccess] = useState(''); // Sikeres hozzáadás üzenet
    const [newDoctor, setNewDoctor] = useState({
        vezeteknev: '',
        keresztnev: '',
        specialitas: '',
    });

    const { user } = useContext(UserContext); // Jelenlegi felhasználó betöltése
    const isAdmin = user?.role === 'Admin'; // Ellenőrzés, hogy admin-e a felhasználó

    // Orvosok betöltése a backend API-ról
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://localhost:7159/api/Orvosok', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Token az autentikációhoz
                    },
                });

                if (!response.ok) {
                    throw new Error('Nem sikerült lekérdezni az orvosok adatait.');
                }

                const data = await response.json();
                setDoctors(data); // Az orvosok listájának beállítása
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDoctors();
    }, []);

    // Új orvos hozzáadása
    const handleAddDoctor = async () => {
        setError(''); // Hibák törlése
        setSuccess(''); // Korábbi sikerüzenet törlése

        // Ellenőrzés, hogy minden mezőt kitöltöttek-e
        if (!newDoctor.vezeteknev || !newDoctor.keresztnev || !newDoctor.specialitas) {
            setError('Kérjük, töltsd ki az összes mezőt!');
            return;
        }

        try {
            const response = await fetch('https://localhost:7159/api/Orvosok', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Token ellenőrzés
                },
                body: JSON.stringify(newDoctor),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Nem sikerült az orvos hozzáadása.');
            }

            const addedDoctor = await response.json();
            setDoctors([...doctors, addedDoctor]); // Az új orvos hozzáadása a listához
            setNewDoctor({ vezeteknev: '', keresztnev: '', specialitas: '' }); // Mezők alaphelyzetbe állítása
            setSuccess('Az orvos sikeresen hozzáadva!');
        } catch (error) {
            setError(error.message);
        }
    };

    // Adatok kezelése az űrlapban
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    // Szűrt orvosok megjelenítése a szűrés szerint
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.specialitas.toLowerCase().includes(filter.toLowerCase())
    );

    if (error) {
        return <div className="error-message">Hiba történt: {error}</div>;
    }

    return (
        <div className="DoctorsPage">
            <h1>Orvosaink</h1>

            {/* Sikeres hozzáadás üzenet */}
            {success && <div className="success-message">{success}</div>}

            {/* Szűrő gombok */}
            <div className="filter-buttons">
                <button onClick={() => setFilter('')}>Mind</button>
                <button onClick={() => setFilter('csontproblémák')}>Csontproblémák</button>
                <button onClick={() => setFilter('himlő')}>Himlő</button>
                <button onClick={() => setFilter('tumor')}>Tumor</button>
            </div>

            {/* Orvos hozzáadási űrlap - csak adminoknak */}
            {isAdmin && (
                <div className="add-doctor-form">
                    <h2>Új orvos hozzáadása</h2>
                    <input
                        type="text"
                        name="vezeteknev"
                        placeholder="Vezetéknév"
                        value={newDoctor.vezeteknev}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="keresztnev"
                        placeholder="Keresztnév"
                        value={newDoctor.keresztnev}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="specialitas"
                        placeholder="Specialitás"
                        value={newDoctor.specialitas}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddDoctor}>Hozzáadás</button>
                </div>
            )}

            {/* Orvosok megjelenítése */}
            <div className="card-container">
                {filteredDoctors.map((doctor, index) => (
                    <div key={index} className="card-with-delete">
                        <Card
                            title={`${doctor.vezeteknev} ${doctor.keresztnev}`}
                            image={'/path-to-image-placeholder.png'} // Kép helye
                            description={doctor.specialitas}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorsPage;
