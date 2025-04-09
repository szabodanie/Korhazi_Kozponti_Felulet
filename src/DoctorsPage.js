import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import './DoctorsPage.css';
import { UserContext } from './UserContext';
import axios from 'axios';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filter, setFilter] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [file, setFile] = useState(null);
    const [newDoctor, setNewDoctor] = useState({
        vezeteknev: '',
        keresztnev: '',
        specialitas: '',
    });

    const { user } = useContext(UserContext);
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/Orvosok`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!response.ok) throw new Error('Nem sikerült lekérdezni az orvosok adatait.');

                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDoctors();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAddDoctor = async () => {
        setError('');
        setSuccess('');

        if (!newDoctor.vezeteknev || !newDoctor.keresztnev || !newDoctor.specialitas || !file) {
            setError('Kérjük, töltsd ki az összes mezőt és válassz egy képet!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append("vezeteknev", newDoctor.vezeteknev);
            formData.append("keresztnev", newDoctor.keresztnev);
            formData.append("specialitas", newDoctor.specialitas);

            const imageData = new FormData();
            imageData.append("kep", file);
            console.log(imageData, formData);

            const response = await axios.post(`${process.env.REACT_APP_URL}/api/Orvosok`, {imageData}, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                },
                params: formData
            });

            if (!response.ok) throw new Error('Nem sikerült az orvos hozzáadása.');

            const addedDoctor = await response.json();
            setDoctors([...doctors, addedDoctor]);
            setNewDoctor({ vezeteknev: '', keresztnev: '', specialitas: '' });
            setFile(null);
            setSuccess('Az orvos sikeresen hozzáadva!');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    return (
        <div className="DoctorsPage">
            <h1>Orvosaink</h1>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">Hiba történt: {error}</div>}

            {isAdmin && (
                <div className="add-doctor-form">
                    <h2>Új orvos hozzáadása</h2>
                    <input type="text" name="vezeteknev" placeholder="Vezetéknév" value={newDoctor.vezeteknev} onChange={handleInputChange} />
                    <input type="text" name="keresztnev" placeholder="Keresztnév" value={newDoctor.keresztnev} onChange={handleInputChange} />
                    <input type="text" name="specialitas" placeholder="Specialitás" value={newDoctor.specialitas} onChange={handleInputChange} />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button onClick={handleAddDoctor}>Hozzáadás</button>
                </div>
            )}

            <div className="card-container">
                {doctors.map((doctor, index) => (
                    <Card
                        key={index}
                        title={`${doctor.vezeteknev} ${doctor.keresztnev}`}
                        image={doctor.KepURL ? `data:image/jpeg;base64,${doctor.KepURL}` : 'https://example.com/default.jpg'}
                        description={doctor.specialitas}
                    />
                ))}
            </div>
        </div>
    );
}

export default DoctorsPage;
