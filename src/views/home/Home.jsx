import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRentals } from '../../redux/actions/actions';

const localizer = momentLocalizer(moment);

function Home() {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals); // Alquileres desde el estado global.

  useEffect(() => {
    dispatch(getRentals()); // Cargar alquileres al inicio.
  }, [dispatch]);

  const events = rentals.map((rental) => ({
    title: rental.tenantName,
    start: new Date(rental.startDate),
    end: new Date(rental.endDate),
    id: rental.id,
  }));

  const handleSelectEvent = (event) => {
    window.location.href = `/details/${event.id}`;
  };

  return (
    <div>
      <h1>Calendario de Alquileres</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default Home;
