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

  // Handle login request
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setNotification('');

    try {
      // Bejelentkezési API hívás a backendhez
      const response = await axios.post('https://localhost:7159/api/Auth/login', {
        username: usernameOrEmail,
        password: password,
      });

      // Válasz adatok kinyerése
      const { token, role, username } = response.data;

      // Token és role tárolása a localStorage-ban
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      // Felhasználói adatok beállítása a UserContext-ben
      setUser({ username, role });
      setToken(token);

      setNotification('Sikeres bejelentkezés!');

      // Role alapján navigálás
      if (role === 'doctor') {
        navigate('/admin-dashboard'); // Admin oldal, csak orvosoknak
      } else if (role === 'user') {
        navigate('/user-dashboard'); // Felhasználói oldal
      } else {
        setError('Nem megfelelő jogosultság!');
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

      {/* Üzenet az adminoknak */}
      <p className="doctor-login-info">
        Admin (orvos) bejelentkezés:
        <Link to="/admin-dashboard" className="doctor-login-link">
          Orvosi bejelentkezés itt
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
