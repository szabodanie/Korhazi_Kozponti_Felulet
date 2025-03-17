import React, { useState, useEffect } from 'react'; // Az importok itt kell legyenek!
import './Appointment.css'
import axios from 'axios';



function AppointmentPage() {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [appointments, setAppointments] = useState([]);

  // Időpontok lekérése a backend API-ból, amikor a komponens betöltődik
  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments') // Az API URL-je
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
      doctor_name: doctorName,
      patient_name: patientName,
      appointment_date: date,
      status: status
    };

    axios.get('https://localhost:7159/api/ReactApp', newAppointment) // Az API URL-je
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setDoctorName('');
        setPatientName('');
        setDate('');
        setStatus('pending');
      })
      .catch((error) => {
        console.error('Hiba történt:', error);
      });
  };

  return (
    <div className="test">
      <h1>Időpont hozzáadása</h1>
      <form onSubmit={handleAddAppointment}>
        <div>
          <label>Orvos neve:</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Beteg neve:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Időpont:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Statusz:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Függőben</option>
            <option value="confirmed">Megerősítve</option>
            <option value="cancelled">Törölve</option>
          </select>
        </div>
        <button type="submit">Hozzáadás</button>
      </form>

      <h2>Időpontok listája</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.doctor_name} - {appointment.patient_name} - {appointment.appointment_date} - {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentPage;
