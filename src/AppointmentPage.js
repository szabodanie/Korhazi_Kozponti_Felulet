import React, { useState, useEffect } from 'react';
import './Appointment.css';
import axios from 'axios';

function AppointmentPage() {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [status, setStatus] = useState('Függőben');
  const [complaint, setComplaint] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const role = localStorage.getItem('role')

  // API-ból való adatok lekérése
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/api/Appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Hiba történt:', error);
        setError('Nem sikerült betölteni az időpontokat.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/Orvosok`)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Nem sikerült lekérni az orvosokat:', error);
      });
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();

    const newAppointment = {
      orvosnev: doctorName,
      betegneve: patientName,
      statusz: status,
      panasz: complaint,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/api/Appointments`, newAppointment)
      .then((response) => {
        console.log(response);
        
        setAppointments([...appointments, response.data]);
        setDoctorName('');
        setPatientName('');
        setStatus('Függőben');
        setComplaint('');
      })
      .catch((error) => {
        console.error('Hiba történt:', error);
      });
  };

  return (
    <div className="appointment-container glass-bg">
      <h1 className="section-title">Időpont hozzáadása</h1>
      <form onSubmit={handleAddAppointment} className="appointment-form">
        <div className="form-group">
          <label>Orvos neve:</label>
          {doctors.length === 0 ? (
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          ) : (
          <select
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          >
            <option value="">-- Válassz orvost --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={`${doc.vezeteknev} ${doc.keresztnev}`}>{`${doc.vezeteknev} ${doc.keresztnev}`}</option>
            ))}
          </select>
          )}
        </div>
        <div className="form-group">
          <label>Beteg neve:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Státusz:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Függőben">Függőben</option>
            <option value="Megerősítve">Megerősítve</option>
            <option value="Törölve">Törölve</option>
          </select>
        </div>
        <div className="form-group">
          <label>Panasz:</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Hozzáadás</button>
      </form>

      {role.toLowerCase() === "admin" ? (
        <div>
          <h2 className="section-title">Időpontok listája</h2>
          {isLoading && <p className="loading">Adatok betöltése...</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && appointments.length === 0 && (
            <p className="no-data">Nincsenek időpontok.</p>
          )}
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-header">
                  <strong>{appointment.orvosnev}</strong> &mdash; {appointment.betegneve}
                </div>
                <div className={`status-badge ${appointment.statusz.toLowerCase()}`}>
                  {appointment.statusz}
                </div>
                <div className="complaint">
                  <strong>Panasz:</strong> {appointment.panasz}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

    </div>
  );
}

export default AppointmentPage;
