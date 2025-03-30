import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css';

const doctorData = `
drkovacs,dr.kovacs@example.com,DrKovacs123
drszabo,dr.szabo@example.com,Szabo4567
drmolnar,dr.molnar@example.com,Molnar890
drnagy,dr.nagy@example.com,NagyDr321
drtoth,dr.toth@example.com,Toth9876
`;

function DoctorLoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkDoctorCredentials = (usernameOrEmail, password) => {
    const lines = doctorData.trim().split('\n');
    for (let line of lines) {
      const [storedUsername, storedEmail, storedPassword] = line.split(',');
      if ((storedUsername === usernameOrEmail || storedEmail === usernameOrEmail) && storedPassword === password) {
        return { username: storedUsername, email: storedEmail, role: 'doctor' };
      }
    }
    return null;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedInUser = checkDoctorCredentials(usernameOrEmail, password);
    if (loggedInUser) {
      const token = `fake-token-${loggedInUser.username}`;
      setUser(loggedInUser);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('username', loggedInUser.username);
      localStorage.setItem('role', loggedInUser.role);

      navigate('/admin'); // Navigálás az admin oldalra
    } else {
      setError('Hibás felhasználónév, e-mail cím vagy jelszó!');
    }
  };

  return (
    <div className="login-container">
      <h2>Orvosi Bejelentkezés</h2>
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
        <button type="submit" className="btn w-100" style={{ color: 'red' }}>Bejelentkezés</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default DoctorLoginPage;
