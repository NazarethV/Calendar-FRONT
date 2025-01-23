import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteRental, getRentalById } from '../../redux/actions/actions';

import './Details.css';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rental = useSelector((state) => state.selectedRental);

  useEffect(() => {
    dispatch(getRentalById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este alquiler?')) {
      dispatch(deleteRental(id));
      navigate('/home'); // Redirigir a la página principal después de eliminar
    }
  };

  if (!rental) return <div>Cargando detalles...</div>;

  return (
    <div className="details-container">
      <h1>Detalles del Alquiler</h1>
      <p><strong>Inquilino:</strong> {rental.tenantName}</p>
      <p>
        <strong>Fecha de inicio:</strong>{' '}
        {new Date(rental.startDate).toLocaleDateString('es-ES')}
      </p>
      <p>
        <strong>Fecha de fin:</strong>{' '}
        {new Date(rental.endDate).toLocaleDateString('es-ES')}
      </p>
      <p><strong>Precio:</strong> ${rental.price}</p>
      <p><strong>Seña:</strong> ${rental.deposit || 'No especificado'}</p>
      <p><strong>Número de celular:</strong> {rental.phoneNumber || 'No especificado'}</p>
      <p>
        <strong>Hora de entrada:</strong>{' '}
        {rental.checkInTime
          ? rental.checkInTime.slice(0, 5) // Extrae solo "hh:mm" del formato "hh:mm:ss"
          : 'No especificado'}
      </p>
      <p>
        <strong>Hora de salida:</strong>{' '}
        {rental.checkOutTime
          ? rental.checkOutTime.slice(0, 5) // Extrae solo "hh:mm" del formato "hh:mm:ss"
          : 'No especificado'}
      </p>
      
      <button onClick={() => navigate(`/edit-rental/${id}`)} className="edit-btn">
        Editar información del alquiler
      </button>

      <button onClick={handleDelete} className="delete-btn">
        Eliminar alquiler
      </button>
      
      <button onClick={() => navigate('/home')} className="back-btn">
        Volver al Calendario
      </button>
    </div>
  );
}

export default Details;




