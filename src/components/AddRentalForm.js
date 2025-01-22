import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRental } from '../redux/actions/actions';

const AddRentalForm = () => {
  const [form, setForm] = useState({
    tenantName: '',
    startDate: '',
    endDate: '',
    price: '',
    details: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRental(form));
    setForm({ tenantName: '', startDate: '', endDate: '', price: '', details: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="tenantName"
        value={form.tenantName}
        onChange={handleChange}
        placeholder="Nombre del inquilino"
        required
      />
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio"
        required
      />
      <textarea
        name="details"
        value={form.details}
        onChange={handleChange}
        placeholder="Detalles"
      />
      <button type="submit">Agregar Alquiler</button>
    </form>
  );
};

export default AddRentalForm;
