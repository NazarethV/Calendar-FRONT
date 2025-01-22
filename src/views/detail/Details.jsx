import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentalById, updateRental } from '../../redux/actions/actions';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rental = useSelector((state) => state.selectedRental);
  const [formData, setFormData] = useState({
    tenantName: '',
    startDate: '',
    endDate: '',
    price: '',
  });

  useEffect(() => {
    dispatch(getRentalById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (rental) setFormData(rental);
  }, [rental]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRental(id, formData));
    alert('Alquiler actualizado correctamente.');
  };

  return (
    <div>
      <h1>Detalles del Alquiler</h1>
      <form onSubmit={handleSubmit}>
        <label>Inquilino:</label>
        <input name="tenantName" value={formData.tenantName} onChange={handleChange} />
        <label>Fecha de inicio:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        <label>Fecha de fin:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        <label>Precio:</label>
        <input name="price" value={formData.price} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default Details;
