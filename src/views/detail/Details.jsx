// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { deleteRental, getRentalById } from '../../redux/actions/actions';

// import './Details.css';
// import { format, parseISO } from 'date-fns';

// function Details() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const rental = useSelector((state) => state.selectedRental);

//   useEffect(() => {
//     dispatch(getRentalById(id));
//   }, [dispatch, id]);

//   const handleDelete = () => {
//     if (window.confirm('¿Estás seguro de que deseas eliminar este alquiler?')) {
//       dispatch(deleteRental(id));
//       navigate('/home'); // Redirigir a la página principal después de eliminar
//     }
//   };

//   if (!rental) return <div>Cargando detalles...</div>;


//   const formattedStartDate = format(parseISO(rental.startDate), "yyyy-MM-dd");
//   const formattedEndDate = format(parseISO(rental.endDate), "yyyy-MM-dd");



//   return (
//     <div className="details-container">
//       <h1>Detalles del Alquiler</h1>
//       <p><span className="subtitle">Inquilino:</span> {rental.tenantName}</p>
//       {/* <p>
//         <span className="subtitle">Fecha de inicio:</span>{' '}
//         {new Date(rental.startDate).toLocaleDateString('es-ES')}
//       </p>
//       <p>
//         <span className="subtitle">Fecha de fin:</span>{' '}
//         {new Date(rental.endDate).toLocaleDateString('es-ES')}
//       </p> */}

// <p>
//         <span className="subtitle">Fecha de inicio:</span>{' '}
//         {formattedStartDate}
//       </p>
//       <p>
//         <span className="subtitle">Fecha de fin:</span>{' '}
//         {formattedEndDate}
//       </p>
//       <p><span className="subtitle">Precio:</span> ${rental.price}</p>
//       <p><span className="subtitle">Seña:</span> ${rental.deposit || 'No especificado'}</p>
//       <p><span className="subtitle">Número de celular:</span> {rental.phoneNumber || 'No especificado'}</p>
//       <p>
//         <span className="subtitle">Hora de entrada:</span>{' '}
//         {rental.checkInTime
//           ? rental.checkInTime.slice(0, 5) // Extrae solo "hh:mm" del formato "hh:mm:ss"
//           : 'No especificado'}
//       </p>
//       <p>
//         <span className="subtitle">Hora de salida:</span>{' '}
//         {rental.checkOutTime
//           ? rental.checkOutTime.slice(0, 5) // Extrae solo "hh:mm" del formato "hh:mm:ss"
//           : 'No especificado'}
//       </p>
      
//       <button onClick={() => navigate(`/edit-rental/${id}`)} className="edit-btn">
//         Editar información del alquiler
//       </button>

//       <button onClick={handleDelete} className="delete-btn">
//         Eliminar alquiler
//       </button>
      
//       <button onClick={() => navigate('/home')} className="back-btn">
//         Volver al Calendario
//       </button>
//     </div>
//   );
// }

// export default Details;


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
      navigate('/home');
    }
  };

  if (!rental) return <div>Cargando detalles...</div>;

  // Ajustar las fechas al inicio y fin del día en la zona horaria local
  const formattedStartDate = rental.startDate
    ? new Date(new Date(rental.startDate).setMinutes(new Date(rental.startDate).getMinutes() - new Date(rental.startDate).getTimezoneOffset()))
    : 'Fecha no disponible';
  const formattedEndDate = rental.endDate
    ? new Date(new Date(rental.endDate).setMinutes(new Date(rental.endDate).getMinutes() - new Date(rental.endDate).getTimezoneOffset()))
    : 'Fecha no disponible';

  return (
    <div className="details-container">
      <h1>Detalles del Alquiler</h1>
      <p><span className="subtitle">Inquilino:</span> {rental.tenantName}</p>

      <p>
        <span className="subtitle">Fecha de inicio:</span>{' '}
        {formattedStartDate.toLocaleDateString()}
      </p>
      <p>
        <span className="subtitle">Fecha de fin:</span>{' '}
        {formattedEndDate.toLocaleDateString()}
      </p>

      <p><span className="subtitle">Precio:</span> ${rental.price}</p>
      <p><span className="subtitle">Seña:</span> ${rental.deposit || 'No especificado'}</p>
      <p><span className="subtitle">Número de celular:</span> {rental.phoneNumber || 'No especificado'}</p>

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

