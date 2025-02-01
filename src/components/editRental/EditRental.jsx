import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getRentalById, updateRental } from '../../redux/actions/actions';
import './EditRental.css'; 

function EditRental() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rental = useSelector((state) => state.selectedRental);
  
  const [tenantName, setTenantName] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  useEffect(() => {
    dispatch(getRentalById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (rental) {
      setTenantName(rental.tenantName);
      setPrice(rental.price);
      setDeposit(rental.deposit);
      setPhoneNumber(rental.phoneNumber);
      setStartDate(rental.startDate);
      setEndDate(rental.endDate);
      setCheckInTime(rental.checkInTime);
      setCheckOutTime(rental.checkOutTime);
    }
  }, [rental]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRental = { tenantName, price, deposit, phoneNumber, startDate, endDate, checkInTime, checkOutTime };
    dispatch(updateRental(id, updatedRental));
    navigate('/home'); 
  };

  if (!rental) return <div>Cargando...</div>;

  return (
    <div className="edit-rental-container">
      <h2>Editar Alquiler</h2>
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
        <label>
          Hora de entrada (opcional):
          <input
            type="time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
          />
        </label>
        <label>
          Hora de salida (opcional):
          <input
            type="time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
          />
        </label>
        <button type="submit">Actualizar Alquiler</button>
      </form>
      <button onClick={() => navigate('/home')} className="back-btn">
        Volver al Calendario
      </button>
    </div>
  );
}

export default EditRental;


