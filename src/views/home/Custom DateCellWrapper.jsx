// CustomDateCellWrapper.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomDateCellWrapper = ({ children, value }) => {
  const navigate = useNavigate();
  const rentals = useSelector((state) => state.rentals);

  // Convertir la fecha de la celda a string para comparar (por ejemplo, "Mon Sep 04 2023")
  const dateString = new Date(value).toDateString();

  // Buscar un alquiler cuya fecha de inicio coincida con la fecha de la celda
  const rental = rentals.find(
    (rental) =>
      new Date(rental.startDate).toDateString() === dateString
  );

  const handleClick = () => {
    if (rental) {
      navigate(`/details/${rental.id}`);
    } else {
      navigate('/new-rental');
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};

export default CustomDateCellWrapper;
