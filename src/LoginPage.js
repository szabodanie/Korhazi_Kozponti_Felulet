import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './Login.css';

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Login művelet kezelése
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setNotification('');

    try {
      // API hívás bejelentkezésre
      const response = await axios.post('https://localhost:7159/api/Auth/login', {
        username: usernameOrEmail,
        password: password,
      });

      const { token, role, username } = response.data;

      // Token és jogosultság mentése a localStorage-ba
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      // UserContext frissítése
      setUser({ username, role });
      setToken(token);

      // Sikeres bejelentkezés visszajelzése
      setNotification('Sikeres bejelentkezés!');

      // Jogosultság alapú navigáció
      if (role === 'admin') {
        navigate('/admin-dashboard'); // Admin felület
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard'); // Orvosi felület
      } else if (role === 'user') {
        navigate('/'); // Általános felhasználói felület
      } else {
        setError('Nincs megfelelő jogosultság!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Hibás felhasználónév, e-mail cím vagy jelszó!');
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
            required
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
            required
          />
        </div>
        <button type="submit" className="btn w-100" style={{ color: 'red' }}>
          Bejelentkezés
        </button>
      </form>

      {notification && <p className="notification">{notification}</p>}
      {error && <p className="error">{error}</p>}

      <p className="mt-3">
        Nincs fiókod? <Link to="/regisztracio">Regisztrálj itt</Link>
      </p>

      <p className="mt-3">
        Admin felület:
        <Link to="/admin-dashboard" className="admin-login-link">
          Admin bejelentkezés itt
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
