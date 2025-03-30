import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext'; // UserContext importálása
import './AdminPage.css';

function AdminPage() {
  const { user } = useContext(UserContext); // Felhasználó adatainak lekérése
  const [users, setUsers] = useState([]); // A felhasználók listája, amit az admin lát

  useEffect(() => {
    if (user && user.role === 'doctor') { // Csak akkor történjen a lekérés, ha az orvos be van jelentkezve
      axios.get('https://yourbackendapi.com/api/users') // A backend adatainak lekérése
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [user]); // Ha a user változik, újra lefut a lekérés

  if (!user || user.role !== 'doctor') {
    return <div>Hozzáférés megtagadva. Csak orvosok férhetnek hozzá ehhez a felülethez.</div>;
  }

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
                {/* Szerkesztés és törlés gombok */}
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
