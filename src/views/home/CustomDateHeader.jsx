// import React from 'react'

// const CustomDateHeader = ({ label }) => {
//   return (
//     <div className="custom-date-header">
//       {label}
//     </div>
//   )
// }

// export default CustomDateHeader


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomDateHeader = ({ label, date }) => {
  const navigate = useNavigate();
  const rentals = useSelector((state) => state.rentals);

  const handleClick = () => {
    // Busca si hay algún alquiler cuyo startDate coincida con la fecha de la celda
    const selectedRental = rentals.find(
      (rental) =>
        new Date(rental.startDate).toDateString() === new Date(date).toDateString()
    );
    navigate(selectedRental ? `/details/${selectedRental.id}` : '/new-rental');
  };

  return (
    <div className="custom-date-header" onClick={handleClick}>
      {label}
    </div>
  );
};

export default CustomDateHeader;

