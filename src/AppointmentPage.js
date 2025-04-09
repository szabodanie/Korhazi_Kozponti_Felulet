import React, { useState, useEffect } from 'react';
import './Appointment.css';
import axios from 'axios';

function AppointmentPage() {
  const [orvosnev, setOrvosnev] = useState('');
  const [betegneve, setBetegneve] = useState('');
  const [statusz, setStatusz] = useState('Függőben');
  const [panasz, setPanasz] = useState('');
  const [appointments, setAppointments] = useState([]);
  const role = localStorage.getItem('role')

  // API-ból való adatok lekérése
  useEffect(() => {
    axios.get('https://localhost:7159/api/Appointments') // Backend URL
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Hiba történt:', error);
      });
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();

    const newAppointment = {
      orvosnev: orvosnev,
      betegneve: betegneve,
      statusz: statusz,
      panasz: panasz,
    };

    axios.post('https://localhost:7159/api/Appointments', newAppointment) // Backend URL
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setOrvosnev('');
        setBetegneve('');
        setStatusz('Függőben');
        setPanasz('');
      })
      .catch((error) => {
        console.error('Hiba történt:', error);
      });
  };

  return (
    <div className="appointment-container">
      <h1>Időpont hozzáadása</h1>
      <form onSubmit={handleAddAppointment} className="appointment-form">
        <div>
          <label>Orvos neve:</label>
          <input
            type="text"
            value={orvosnev}
            onChange={(e) => setOrvosnev(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Beteg neve:</label>
          <input
            type="text"
            value={betegneve}
            onChange={(e) => setBetegneve(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Statusz:</label>
          <select
            value={statusz}
            onChange={(e) => setStatusz(e.target.value)}
            required
          >
            <option value="Függőben">Függőben</option>
            <option value="Megerősítve">Megerősítve</option>
            <option value="Törölve">Törölve</option>
          </select>
        </div>
        <label>Panasz:</label>
        <div>
          
          <textarea
            value={panasz}
            onChange={(e) => setPanasz(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Hozzáadás</button>
      </form>

{role === "admin" ? (
<div>
  <h2>Időpontok listája</h2>
      <div className="appointments-list">
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.orvosnev} - {appointment.betegneve} - {appointment.statusz} - {appointment.panasz}
            </li>
          ))}
        </ul>
      </div>
</div>
) : null}
      
    </div>
  );
}

export default AppointmentPage;
