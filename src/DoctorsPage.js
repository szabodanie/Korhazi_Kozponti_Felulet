import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import './DoctorsPage.css';
import { UserContext } from './UserContext';
import axios from 'axios';
import orvos1 from './assets/orvos1.png';
import orvos2 from './assets/orvos2.png';
import orvos3 from './assets/orvos3.png';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [newDoctor, setNewDoctor] = useState({
        vezeteknev: '',
        keresztnev: '',
        specialitas: '',
    });
    const fallbackImages = [orvos1, orvos2, orvos3];

    const { user } = useContext(UserContext);
    const isAdmin = user?.role === 'admin';

    useEffect(() => {

        const fetchDoctors = async () => {
            setError('');
            setSuccess('');
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Orvosok`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                setSuccess('Az orvosok sikeresen betöltődtek!');
                setDoctors(response.data);
            } catch (error) {
                console.error('Hiba történt az orvosok lekérdezésekor:', error);
                setError('Nem sikerült lekérdezni az orvosok adatait.');
            } finally {
                setLoading(false);
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
            // formData.append("vezeteknev", newDoctor.vezeteknev);
            // formData.append("keresztnev", newDoctor.keresztnev);
            // formData.append("specialitas", newDoctor.specialitas);
            formData.append("kep", file);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Orvosok`, formData, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    vezeteknev: newDoctor.vezeteknev,
                    keresztnev: newDoctor.keresztnev,
                    specialitas: newDoctor.specialitas
                }
            });

            setDoctors([...doctors, response.data]);
            setNewDoctor({ vezeteknev: '', keresztnev: '', specialitas: '' });
            setFile(null);
            setSuccess('Az orvos sikeresen hozzáadva!');
        } catch (error) {
            console.error('Hiba történt az orvos hozzáadásakor:', error);
            setError('Nem sikerült az orvos hozzáadása.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    return (
        <div className="DoctorsPage">
            <h1 className='section-title'>Orvosaink</h1>
            {isAdmin && (
                <div className="add-doctor-form">
                    <h2 className='h2-title'>Új orvos hozzáadása</h2>
                    <input type="text" name="vezeteknev" placeholder="Vezetéknév" value={newDoctor.vezeteknev} onChange={handleInputChange} />
                    <input type="text" name="keresztnev" placeholder="Keresztnév" value={newDoctor.keresztnev} onChange={handleInputChange} />
                    <input type="text" name="specialitas" placeholder="Specialitás" value={newDoctor.specialitas} onChange={handleInputChange} />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button onClick={handleAddDoctor}>Hozzáadás</button>
                </div>
            )}
            {loading && <div className="loading">Betöltés...</div>}
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error">Hiba történt: {error}</div>}
            <div className="card-container row">
                {doctors.map((doctor, index) => (
                    <Card
                        key={doctor.id}
                        title={`${doctor.vezeteknev} ${doctor.keresztnev}`}
                        image={doctor.kepURL ? `data:image/jpeg;base64,${doctor.kepURL}` : fallbackImages[index % fallbackImages.length]}
                        description={doctor.specialitas}
                    />
                ))}
            </div>
        </div>
    );
}

export default DoctorsPage;
