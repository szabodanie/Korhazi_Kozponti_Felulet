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

  // Helper function to determine if a link should be disabled
  const isLinkDisabled = (user) => !user;

  return (
    <nav>
      <ul>
        <li><Link to="/">Főoldal</Link></li>

        {/* Orvosaink link, only active if the user is logged in */}
        <li>
          <Link 
            to="/orvosaink" 
            className={isLinkDisabled(user) ? 'disabled-link' : ''}
            style={{ pointerEvents: isLinkDisabled(user) ? 'none' : 'auto' }}
          >
            Orvosaink
          </Link>
        </li>

        {/* Időpontfoglalás link, only active if the user is logged in */}
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
