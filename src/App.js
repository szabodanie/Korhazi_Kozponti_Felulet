import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import DoctorsPage from './DoctorsPage';
import AppointmentPage from './AppointmentPage';
import LoginPage from './LoginPage';
import RegistPage from './RegistPage';
import AdminPage from './AdminPage';
import TermsPage from './TermsPage';
import { UserProvider } from './UserContext';
import DoctorLoginPage from './DoctorLoginPage';
import './App.css';
import FloatingSquares from './FloatingSquares';
import './assets/fonts/Tektur-Regular.ttf';



function App() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    document.title = "Kórházi Weboldal";
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/favicon.io/favicon.ico';
    document.head.appendChild(link);

    const interval = setInterval(() => {
      const newIconIndex = Math.floor(Math.random() * 3);
      const targetHeight = `${Math.random() * -500}px`;
      setIcons(icons => [
        ...icons,
        { src: `path-to-icon${newIconIndex + 1}.png`, key: Date.now(), targetHeight }
      ]);
    }, Math.random() * 2000 + 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="background-container">
          <FloatingSquares />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orvosaink" element={<DoctorsPage />} />
            <Route path="/adatbazis" element={<AppointmentPage />} />
            <Route path="/bejelentkezes" element={<LoginPage />} />
            <Route path="/regisztracio" element={<RegistPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/doctor-login" element={<DoctorLoginPage />} />
            <Route path="/admin-dashboard" element={<AdminPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>

        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
