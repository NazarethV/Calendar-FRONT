// CustomDateCellWrapper.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomDateCellWrapper = ({ children, value }) => {
  const navigate = useNavigate();
  const rentals = useSelector((state) => state.rentals);

  // Convertir la fecha de la celda a string para comparar
  const cellDate = new Date(value).toDateString();

  // Buscar un alquiler que tenga startDate igual a la fecha de la celda
  const rental = rentals.find(
    (rental) => new Date(rental.startDate).toDateString() === cellDate
  );

  const handleClick = (e) => {
    // Prevenir que se dispare algún evento de la celda predeterminado
    e.preventDefault();
    e.stopPropagation();

    if (rental) {
      navigate(`/details/${rental.id}`);
    } else {
      navigate('/new-rental');
    }
  };

  return (
    <div
      onClickCapture={handleClick}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      {children}
    </div>
  );
};

export default CustomDateCellWrapper;
