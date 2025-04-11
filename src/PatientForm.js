// src/PatientForm.js
import React, { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';
import axios from 'axios';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const { token } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients`, 
        { name, age, condition },
        { headers: { 'Authorization': token } }
      );
      alert('Beteg adatai sikeresen fel lettek víve az adatbázisba!');
    } catch (error) {
      alert('Hiba történt a beteg adatok felvitele során.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Beteg adatainak felvitele</h2>
      <div>
        <label>Név:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Kor:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label>Állapot:</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
      <button type="submit">Adatok felvitele</button>
    </form>
  );
};

export default PatientForm;
