import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './NewRental.css'

function NewRental({ selectedDate }) {
  const [tenantName, setTenantName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home'); // Redirect to calendar after saving rental
  };

  const handleBackToCalendar = () => {
    navigate('/home'); // Redirect to calendar
  };

  return (
    <div className="new-rental-form">
      <h2>Agregar Alquiler</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del inquilino:
          <input
            type="text"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Guardar Alquiler</button>
      </form>
      <button onClick={handleBackToCalendar} className="back-to-calendar-btn">
        ← Volver al Calendario
      </button>
    </div>
  );
}

export default NewRental;

