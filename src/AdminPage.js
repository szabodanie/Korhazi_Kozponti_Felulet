import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './AdminPage.css';

function AdminPage() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });

  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Admin/users`;

  // Felhasználók lekérése (GET)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_BASE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Nem sikerült betölteni a felhasználók adatait.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role.toLowerCase() === 'admin') {
      fetchUsers();
    }
  }, []);

  // Új felhasználó hozzáadása (POST)
  const addUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_BASE_URL, newUser, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setUsers([...users, response.data]);
      setNewUser({ username: '', email: '', role: '' });
      alert('Felhasználó sikeresen hozzáadva!');
    } catch (err) {
      setError('Nem sikerült hozzáadni a felhasználót.');
    }
  };

  // Felhasználó módosítása (PUT)
  const updateUser = async (id, updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setUsers(users.map(user => (user.id === id ? updatedUser : user)));
      alert('Felhasználó adatai sikeresen frissítve!');
    } catch (err) {
      setError('Hiba történt a frissítés során.');
    }
  };

  // Felhasználó törlése (DELETE)
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(`Biztosan törölni szeretnéd a felhasználót ID: ${id}?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter(user => user.id !== id));
      alert('Felhasználó sikeresen törölve!');
    } catch (err) {
      setError('Hiba történt a törlés során.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Felhasználók kezelése</h1>
      {loading && <p>Adatok betöltése...</p>}
      {error && <p className="error">{error}</p>}

      {user?.role.toLowerCase() === 'admin' && (
        <div className="add-user-form">
          <h2>Új felhasználó hozzáadása</h2>
          <input type="text" placeholder="Felhasználónév" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
          <input type="email" placeholder="E-mail" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <input type="text" placeholder="Szerepkör" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
          <button onClick={addUser}>Hozzáadás</button>
        </div>
      )}

      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Felhasználónév</th>
              <th>E-mail</th>
              <th>Szerepkör</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => updateUser(user.id, { ...user, role: 'Admin' })} className="update-button">Admin rang adása</button>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">Törlés</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
