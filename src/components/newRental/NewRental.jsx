import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createRental } from '../../redux/actions/actions';

import './NewRental.css';

function NewRental({ selectedDate }) {
  const [tenantName, setTenantName] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState(selectedDate || '');
  const [endDate, setEndDate] = useState(selectedDate || '');
  const [checkInTime, setCheckInTime] = useState('');
  // const [checkOutTime, setCheckOutTime] = useState('');
  const [details, setDetails] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    const rental = {
      tenantName,
      price: parseFloat(price), // Convierte a número
      deposit: deposit ? parseFloat(deposit) : null,
      phoneNumber,
      startDate,
      endDate, 
      checkInTime: checkInTime ? checkInTime : null,
      // checkOutTime: checkOutTime ? checkOutTime : null,
      details, 
    };

    console.log('Datos a enviar:', rental);

    // Despacha la acción para crear el alquiler
    dispatch(createRental(rental));

    navigate('/home');
  };

  const handleBackToCalendar = () => {
    navigate('/home');
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
          Seña (opcional):
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </label>
        <label>
          Número de celular (opcional):
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          Hora de entrada (opcional):
          <input
            type="time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
          />
        </label>
        {/* <label>
          Hora de salida (opcional):
          <input
            type="time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
          />
        </label> */}
        <label>
          Detalles (opcional):
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Agrega información adicional del alquiler"
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

