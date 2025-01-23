import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getRentalById, updateRental } from '../../redux/actions/actions';

function EditRental() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rental = useSelector((state) => state.selectedRental);
  
  const [tenantName, setTenantName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(getRentalById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (rental) {
      setTenantName(rental.tenantName);
      setPrice(rental.price);
      setStartDate(rental.startDate);
      setEndDate(rental.endDate);
    }
  }, [rental]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRental = { tenantName, price, startDate, endDate };
    dispatch(updateRental(id, updatedRental));
    navigate('/home'); // Redirigir a la página principal después de actualizar
  };

  if (!rental) return <div>Cargando...</div>;

  return (
    <div>
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
        <button type="submit">Actualizar Alquiler</button>
      </form>
      <button onClick={() => navigate('/home')} className="back-btn">
        Volver al Calendario
      </button>
    </div>
  );
}

export default EditRental;


