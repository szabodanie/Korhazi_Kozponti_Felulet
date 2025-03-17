// src/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css';

const userData = `
drkovacs,dr.kovacs@example.com,DrKovacs123
drszabo,dr.szabo@example.com,Szabo4567
drmolnar,dr.molnar@example.com,Molnar890
drnagy,dr.nagy@example.com,NagyDr321
drtoth,dr.toth@example.com,Toth9876
user1,user1@example.com,pass1
user2,user2@example.com,pass2
user3,user3@example.com,pass3
`;

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const checkCredentials = (usernameOrEmail, password) => {
    const lines = userData.trim().split('\n');
    for (let line of lines) {
      const [storedUsername, storedEmail, storedPassword] = line.split(',');
      if ((storedUsername === usernameOrEmail || storedEmail === usernameOrEmail) && storedPassword === password) {
        return { username: storedUsername, email: storedEmail, role: storedUsername.startsWith('dr') ? 'doctor' : 'user' };
      }
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loggedInUser = checkCredentials(usernameOrEmail, password);
    if (loggedInUser) {
      const token = `fake-token-${loggedInUser.username}`;
      setUser(loggedInUser);
      setToken(token);
      setNotification('Gratulálunk! Sikeresen bejelentkeztél.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      alert('Hibás felhasználónév, e-mail cím vagy jelszó!');
    }
  };

  return (
    <div className="login-container">
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="usernameOrEmail" className="form-label">Felhasználónév vagy E-mail cím</label>
          <input
            type="text"
            className="form-control"
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            placeholder="Írd be a felhasználóneved vagy e-mail címed"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Jelszó</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Írd be a jelszavad"
          />
        </div>
        <button type="submit" className="btn w-100" style={{color:'red'}}>Bejelentkezés</button>
      </form>

      {notification && <p className="notification">{notification}</p>}

      <p className="mt-3">
        Nincs fiókod? <Link to="/regisztracio">Regisztrálj itt</Link>
      </p>
    </div>
  );
}

export default LoginPage;
