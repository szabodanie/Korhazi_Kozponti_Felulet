import React, { useContext, useState, useEffect } from 'react';

import axios from 'axios';
import { UserContext } from './context/UserContext';
import PatientForm from './PatientForm';
import './AdminPage.css';


function AdminPage() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        if (user && user.role === 'doctor') {
            // Adatok lekérése a backendtől, ha az user role 'doctor'
            axios.get('https://yourbackendapi.com/api/users')
                .then(response => setUsers(response.data))
                .catch(error => console.error('Error fetching data:', error));
        }
    },) 

    return (
        <div className="admin-container">
            <h1>Adminisztrációs Felület</h1>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Felhasználónév</th>
                        <th>Email</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {/* Ide jönnek majd a szerkesztés és törlés gombok */}
                                <button>Szerkesztés</button>
                                <button>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;
