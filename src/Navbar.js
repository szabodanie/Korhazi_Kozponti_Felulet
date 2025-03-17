// src/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Navbar.css';
import icon from './iconorv.png';

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Visszanavigálunk a főoldalra kijelentkezés után
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Főoldal</Link></li>
        <li><Link to="/orvosaink">Orvosaink</Link></li>
        <li><Link to="/adatbazis">Időpontfoglalás</Link></li>
        {user ? (
          <>
            {user.role === 'doctor' && <li><Link to="/admin">Admin</Link></li>}
            <li className="user-section" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <span className="user-info">
                <img src={icon} alt="Felhasználó ikon" className="user-icon" />
                {user.username}
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="nav-link-button">Kijelentkezés</button>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li><Link to="/bejelentkezes">Bejelentkezés</Link></li>
            <li><Link to="/regisztracio">Regisztráció</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
