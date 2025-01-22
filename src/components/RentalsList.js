import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRentals, deleteRental } from '../redux/actions/actions';

const RentalsList = () => {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals.rentals);

  useEffect(() => {
    dispatch(getRentals());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRental(id));
  };

  return (
    <div>
      <h1>Lista de Alquileres</h1>
      <ul>
        {rentals.map((rental) => (
          <li key={rental.id}>
            {rental.tenantName} - {rental.startDate} - {rental.endDate} - {rental.price}
            <button onClick={() => handleDelete(rental.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalsList;
