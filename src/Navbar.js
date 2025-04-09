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
    navigate('/'); // Kijelentkezés után navigálás a főoldalra
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Helper function a linkek engedélyezésére
  const isLinkDisabled = (user) => !user;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Főoldal</Link>
        </li>

        {/* Orvosaink csak bejelentkezett felhasználóknak */}
        <li>
          <Link 
            to="/orvosaink"
            className={isLinkDisabled(user) ? 'disabled-link' : ''}
            style={{ pointerEvents: isLinkDisabled(user) ? 'none' : 'auto' }}
          >
            Orvosaink
          </Link>
        </li>

        {/* Időpontfoglalás csak bejelentkezett felhasználóknak */}
        <li>
          <Link 
            to="/adatbazis"
            className={isLinkDisabled(user) ? 'disabled-link' : ''}
            style={{ pointerEvents: isLinkDisabled(user) ? 'none' : 'auto' }}
          >
            Időpontfoglalás
          </Link>
        </li>

        {user ? (
          <>
            {/* Admin-specifikus menüpontok */}
            {user.role === 'Admin' && (
              <>
                <li>
                  <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin-users">Felhasználók kezelése</Link>
                </li>
              </>
            )}
            {/* Felhasználói ikon és kijelentkezés */}
            <li
              className="user-section"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <span className="user-info">
                <img src={icon} alt="Felhasználó ikon" className="user-icon" />
                {user.username}
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="nav-link-button">
                    Kijelentkezés
                  </button>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            {/* Bejelentkezés és regisztráció vendégek számára */}
            <li>
              <Link to="/bejelentkezes">Bejelentkezés</Link>
            </li>
            <li>
              <Link to="/regisztracio">Regisztráció</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
