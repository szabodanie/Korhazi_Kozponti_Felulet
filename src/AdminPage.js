import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './AdminPage.css';

function AdminPage() {
  const { user } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newDoctor, setNewDoctor] = useState({ vezeteknev: '', keresztnev: '', specialitas: '' });
  const [newPatient, setNewPatient] = useState({ vezeteknev: '', keresztnev: '', panasz: '', tbkartya: '', felhasznalonev: '', email: '' });
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({ vezeteknev: '', keresztnev: '', specialitas: '' });
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editedPatient, setEditedPatient] = useState({ vezeteknev: '', keresztnev: '', panasz: '', tbkartya: '', felhasznalonev: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [doctorsRes, patientsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/Orvosok`, config),
          axios.get(`${process.env.REACT_APP_API_URL}/api/KorhaziSzemelyek`, config),
        ]);

        setDoctors(doctorsRes.data);
        setPatients(patientsRes.data);
      } catch (err) {
        setError('Nem sikerült betölteni az adatokat.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role.toLowerCase() === 'admin') {
      fetchData();
    }
  }, []);

  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Orvosok`, newDoctor, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setDoctors([...doctors, response.data]);
      setNewDoctor({ vezeteknev: '', keresztnev: '', specialitas: '' });
    } catch (err) {
      setError('Nem sikerült hozzáadni az orvost.');
    }
  };

  const addPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/KorhaziSzemelyek`, newPatient, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setPatients([...patients, response.data]);
      setNewPatient({ vezeteknev: '', keresztnev: '', panasz: '', tbkartya: '', felhasznalonev: '', email: '' });
    } catch (err) {
      setError('Nem sikerült hozzáadni a beteget.');
    }
  };

  const updateDoctor = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/Orvosok/${id}`, editedDoctor, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setDoctors(doctors.map(d => d.id === id ? { ...editedDoctor, id } : d));
      setEditingDoctorId(null);
    } catch (err) {
      setError('Hiba történt az orvos frissítése során.');
    }
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm('Biztosan törölni szeretnéd az orvost?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/Orvosok/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDoctors(doctors.filter(d => d.id !== id));
    } catch (err) {
      setError('Hiba történt az orvos törlése során.');
    }
  };

  const updatePatient = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/KorhaziSzemelyek/${id}`, editedPatient, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setPatients(patients.map(p => p.id === id ? { ...editedPatient, id } : p));
      setEditingPatientId(null);
    } catch (err) {
      setError('Hiba történt a páciens frissítése során.');
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm('Biztosan törölni szeretnéd a pácienst?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/KorhaziSzemelyek/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatients(patients.filter(p => p.id !== id));
    } catch (err) {
      setError('Hiba történt a páciens törlése során.');
    }
  };

  return (
    <div className="admin-container glass-bg">
      <h1 className='section-title'>Admin felület</h1>
      {loading && <p className='loading'>Adatok betöltése...</p>}
      {error && <p className="error">{error}</p>}

      <div className="add-section">
        <form onSubmit={addDoctor} className="add-user-form">
          <h2 className='h2-title'>Új orvos hozzáadása</h2>
          <input type="text" placeholder="Vezetéknév" value={newDoctor.vezeteknev} onChange={(e) => setNewDoctor({ ...newDoctor, vezeteknev: e.target.value })} required />
          <input type="text" placeholder="Keresztnév" value={newDoctor.keresztnev} onChange={(e) => setNewDoctor({ ...newDoctor, keresztnev: e.target.value })} required />
          <input type="text" placeholder="Specialitás" value={newDoctor.specialitas} onChange={(e) => setNewDoctor({ ...newDoctor, specialitas: e.target.value })} required />
          <button>Orvos hozzáadása</button>
        </form>

        <form onSubmit={addPatient} className="add-user-form">
          <h2 className='h2-title'>Új beteg hozzáadása</h2>
          <input type="text" placeholder="Vezetéknév" value={newPatient.vezeteknev} onChange={(e) => setNewPatient({ ...newPatient, vezeteknev: e.target.value })} required />
          <input type="text" placeholder="Keresztnév" value={newPatient.keresztnev} onChange={(e) => setNewPatient({ ...newPatient, keresztnev: e.target.value })} required />
          <input type="text" placeholder="Panasz" value={newPatient.panasz} onChange={(e) => setNewPatient({ ...newPatient, panasz: e.target.value })} />
          <input type="number" placeholder="TB kártya szám" value={newPatient.tbkartya} onChange={(e) => setNewPatient({ ...newPatient, tbkartya: Number(e.target.value) })} required />
          <input type="text" placeholder="Felhasználónév" value={newPatient.felhasznalonev} onChange={(e) => setNewPatient({ ...newPatient, felhasznalonev: e.target.value })} required />
          <input type="email" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} required />
          <button>Beteg hozzáadása</button>
        </form>
      </div>

      <div className="admin-table-wrapper">
        <h2 className='h2-title'>Orvosok listája</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vezetéknév</th>
              <th>Keresztnév</th>
              <th>Specialitás</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>
                  {editingDoctorId === doc.id ? (
                    <input value={editedDoctor.vezeteknev || ''} onChange={(e) => setEditedDoctor({ ...editedDoctor, vezeteknev: e.target.value })} />
                  ) : doc.vezeteknev}
                </td>
                <td>
                  {editingDoctorId === doc.id ? (
                    <input value={editedDoctor.keresztnev || ''} onChange={(e) => setEditedDoctor({ ...editedDoctor, keresztnev: e.target.value })} />
                  ) : doc.keresztnev}
                </td>
                <td>
                  {editingDoctorId === doc.id ? (
                    <input value={editedDoctor.specialitas || ''} onChange={(e) => setEditedDoctor({ ...editedDoctor, specialitas: e.target.value })} />
                  ) : doc.specialitas}
                </td>
                <td>
                  {editingDoctorId === doc.id ? (
                    <>
                      <button className="save" onClick={() => updateDoctor(doc.id)}>Mentés</button>
                      <button className="cancel" onClick={() => setEditingDoctorId(null)}>Mégse</button>
                    </>
                  ) : (
                    <>
                      <button className="update" onClick={() => {
                        setEditingDoctorId(doc.id);
                        setEditedDoctor(doc);
                      }}>Szerkesztés</button>
                      <button className="delete" onClick={() => deleteDoctor(doc.id)}>Törlés</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className='h2-title'>Betegek listája</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vezetéknév</th>
              <th>Keresztnév</th>
              <th>Email</th>
              <th>Felhasználónév</th>
              <th>TB</th>
              <th>Panasz</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {editingPatientId === p.id ? (
                    <input value={p.vezeteknev || ''} onChange={(e) => setEditedPatient({ ...editedPatient, vezeteknev: e.target.value })} />
                  ) : p.vezeteknev}
                </td>
                <td>
                  {editingPatientId === p.id ? (
                    <input value={p.keresztnev || ''} onChange={(e) => setEditedPatient({ ...editedPatient, keresztnev: e.target.value })} />
                  ) : p.keresztnev}
                </td>
                <td>
                  {editingPatientId === p.id ? (
                    <input value={p.email || ''} onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })} />
                  ) : p.email}
                </td>
                <td>
                  {editingPatientId === p.id ? (
                    <input value={p.felhasznalonev || ''} onChange={(e) => setEditedPatient({ ...editedPatient, felhasznalonev: e.target.value })} />
                  ) : p.felhasznalonev}
                </td>
                <td>
                  {editingPatientId === p.id ? (
                    <input value={p.tbkartya || ''} onChange={(e) => setEditedPatient({ ...editedPatient, tbkartya: Number(e.target.value) })} />
                  ) : p.tbkartya}
                </td>
                <td>
                  {editingPatientId === p.id ? (
                    <input value={p.panasz || ''} onChange={(e) => setEditedPatient({ ...editedPatient, panasz: e.target.value })} />
                  ) : p.panasz}
                </td>
                <td>
                  {editingPatientId === p.id ? (
                    <>
                      <button className="save" onClick={() => updatePatient(p.id)}>Mentés</button>
                      <button className="cancel" onClick={() => setEditingPatientId(null)}>Mégse</button>
                    </>
                  ) : (
                    <>
                      <button className="update" onClick={() => {
                        setEditingPatientId(p.id);
                        setEditedPatient(p);
                      }}>Szerkesztés</button>
                      <button className="delete" onClick={() => deletePatient(p.id)}>Törlés</button>
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
