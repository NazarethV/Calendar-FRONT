import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRental } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

function NewRental() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tenantName: '',
    startDate: '',
    endDate: '',
    price: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createRental(formData));
    navigate('/home'); // Redirige al calendario después de guardar el alquiler.
  };

  return (
    <div>
      <h1>Agregar Nuevo Alquiler</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Inquilino:</label>
        <input
          name="tenantName"
          value={formData.tenantName}
          onChange={handleFormChange}
          required
        />
        <label>Fecha de inicio:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleFormChange}
          required
        />
        <label>Fecha de fin:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleFormChange}
          required
        />
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleFormChange}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default NewRental;
