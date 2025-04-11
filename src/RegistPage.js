import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registpage.css';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Alapértelmezett szerepkör: user
  const [specialty, setSpecialty] = useState(''); // Csak admin esetén
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Regisztráció API hívás
  const handleRegister = async (e) => {
    e.preventDefault();

    // Ellenőrizzük, hogy elfogadták-e a felhasználói feltételeket
    if (!acceptedTerms) {
      alert('Általános szerződési feltételek elfogadása szükséges');
      return;
    }

    // API hívás a backendhez
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Auth/register`, {
        username,
        email,
        password,
        role,
        specialty: role === 'admin' ? specialty : null, // Specialty csak admin esetén
      });

      
      

      setNotification(response.data.message); // Sikeres üzenet
      setTimeout(() => {
        navigate('/login'); // Regisztráció után átirányítás a bejelentkezési oldalra
      }, 2000);
    } catch (err) {
      console.log(err);
      
      setError('Hiba történt a regisztráció során.');
    }
  };

  const openTermsPopup = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const closeTermsPopup = () => {
    setShowTerms(false);
  };

  return (
    <div className="regist-container">
      <h2>Regisztráció</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Felhasználónév</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Írd be a felhasználóneved"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Írd be az email címed"
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
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Szerepkör</label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Felhasználó</option>
            <option value="admin">Admin (Orvos)</option>
          </select>
        </div>
        {role === 'admin' && (
          <div className="mb-3">
            <label htmlFor="specialty" className="form-label">Szakirány</label>
            <input
              type="text"
              className="form-control"
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Írd be az orvosi szakirányt"
            />
          </div>
        )}
        <div className="terms">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label>
            elfogadom a <Link to="#" onClick={openTermsPopup}>Felhasználói feltételek</Link>
          </label>
        </div>
        <button type="submit" className="registBtn w-100">Regisztráció</button>
      </form>

      {notification && <p className="notification">{notification}</p>}
      {error && <p className="error">{error}</p>}

      {showTerms && (
        <div className="popup">
          <div className="popup-content">
            <h2>Felhasználói feltételek</h2>
            <p>Itt található a felhasználási feltételek szövege...</p>
            <button onClick={() => setAcceptedTerms(true)}>Elfogadom</button>
            <button onClick={closeTermsPopup}>Bezárás</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
