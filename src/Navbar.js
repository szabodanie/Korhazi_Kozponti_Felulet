import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Navbar.css';
import icon from './assets/iconorv.png';

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Kijelentkezés után navigálás a főoldalra
    setMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav>
      <div className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Főoldal</Link>
        </li>

        {/* Orvosaink, Időpontfoglalás csak bejelentkezett felhasználóknak */}
        {user && (
          <>
            <li>
              <Link
                to="/orvosaink"
                onClick={() => setMobileMenuOpen(false)}
              >
                Orvosaink
              </Link>
            </li>

            <li>
              <Link
                to="/adatbazis"
                onClick={() => setMobileMenuOpen(false)}
              >
                Időpontfoglalás
              </Link>
            </li>
          </>
        )}

        {user ? (
          <>
            {/* Admin-specifikus menüpontok */}
            {user.role.toLowerCase() === 'admin' && (
              <>
                <li>
                  <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                </li>
              </>
            )}
            {/* Felhasználói ikon és kijelentkezés */}
            <li className="user-section">
              <span className="user-info" onClick={toggleDropdown}>
                <img src={icon} alt="Felhasználó ikon" className="user-icon" />
                {user.username}
              </span>

              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <button onClick={handleLogout} className="nav-link-button">Kijelentkezés</button>
              </div>
            </li>
          </>
        ) : (
          <>
            {/* Bejelentkezés és regisztráció vendégek számára */}
            <li>
              <Link to="/bejelentkezes" onClick={() => setMobileMenuOpen(false)}>Bejelentkezés</Link>
            </li>
            <li>
              <Link to="/regisztracio" onClick={() => setMobileMenuOpen(false)}>Regisztráció</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
