import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './registpage.css';
import axios from 'axios';

const userData = `
user1,user1@example.com,pass1
user2,user2@example.com,pass2
user3,user3@example.com,pass3
`;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Általános szerződési feltételek');
      return;
    }
    console.log('Felhasználónév:', username);
    console.log('Email:', email);
    console.log('Jelszó:', password);

    setNotification('Gratulálunk! Sikeresen regisztráltál.');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
        <button type="submit" className="btn w-100" style={{color:'red'}}>Regisztráció</button>
      </form>
      {notification && <p className="notification">{notification}</p>}
      
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
