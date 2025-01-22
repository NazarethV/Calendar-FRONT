import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale'; // Importamos el idioma español de date-fns
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Home.css'; // Archivo CSS personalizado
import { useDispatch, useSelector } from 'react-redux';
import { getRentals } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

// Configuración del localizador de date-fns
const locales = {
  es: es, // Español
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Home() {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(getRentals());
  }, [dispatch]);

  const events = rentals.map((rental) => ({
    title: rental.tenantName,
    start: new Date(rental.startDate),
    end: new Date(rental.endDate),
    id: rental.id,
    isRented: true, // Identificador para estilos
    price: rental.price,
  }));

  const eventStyleGetter = (event) => {
    return {
      className: event.isRented ? 'rented-event' : 'available-event',
    };
  };

  const dayStyleGetter = (date) => {
    const rental = rentals.find(
      (rental) =>
        new Date(rental.startDate).toDateString() === date.toDateString() ||
        new Date(rental.endDate).toDateString() === date.toDateString()
    );
    if (rental) {
      return {
        className: 'rented-day',
      };
    }
    return {};
  };

  const handleSelectEvent = (event) => {
    navigate(`/details/${event.id}`);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    if (!slotInfo.start) return;
    const selectedRental = rentals.find(
      (rental) =>
        new Date(rental.startDate).toDateString() === slotInfo.start.toDateString()
    );
    if (selectedRental) {
      navigate(`/details/${selectedRental.id}`);
    } else {
      navigate('/new-rental');
    }
  };

  // Mensajes traducidos al español
  const messages = {
    next: 'Siguiente',
    previous: 'Anterior',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Todo el día',
    noEventsInRange: 'No hay eventos en este rango.',
    weekLabel: 'Semana', // Agregado
    dayLabel: 'Día', // Agregado
    monthLabel: 'Mes', // Agregado
  };

  return (
    <div>
      <h1>Calendario de Alquileres</h1>
      <Calendar
        localizer={localizer} // Usamos el nuevo localizador basado en date-fns
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayStyleGetter}
        views={['month', 'agenda']}
        defaultView="month"
        messages={messages} // Traducciones en español
        culture="es" // Configuración de idioma explícita para react-big-calendar
      />
    </div>
  );
}

export default Home;








///////////////////////////////////////
// CALENDARIO CON MESES / SEMANAS / DÍAS

// import React, { useEffect, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './Home.css'; // Archivo CSS personalizado
// import { useDispatch, useSelector } from 'react-redux';
// import { getRentals } from '../../redux/actions/actions';
// import { useNavigate } from 'react-router-dom';

// const localizer = momentLocalizer(moment);

// function Home() {
//   const dispatch = useDispatch();
//   const rentals = useSelector((state) => state.rentals);
//   const navigate = useNavigate();

//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     dispatch(getRentals());
//   }, [dispatch]);

//   const events = rentals.map((rental) => ({
//     title: rental.tenantName,
//     start: new Date(rental.startDate),
//     end: new Date(rental.endDate),
//     id: rental.id,
//     isRented: true, // Identificador para estilos.
//     price: rental.price,
//   }));

//   // Aplicar estilos a los eventos
//   const eventStyleGetter = (event) => {
//     return {
//       className: event.isRented ? 'rented-event' : 'available-event', // Clase para alquilados.
//     };
//   };

//   // Estilo a las celdas de los días
//   const dayStyleGetter = (date) => {
//     const rental = rentals.find(
//       (rental) =>
//         new Date(rental.startDate).toDateString() === date.toDateString() ||
//         new Date(rental.endDate).toDateString() === date.toDateString()
//     );
//     if (rental) {
//       return {
//         className: 'rented-day', // Si está alquilado, aplica esta clase
//       };
//     }
//     return {};
//   };

//   const handleSelectEvent = (event) => {
//     navigate(`/details/${event.id}`);
//   };


//   const handleSelectSlot = (slotInfo) => {
//     setSelectedDate(slotInfo.start);
//     if (!slotInfo.start) return;
    
//     const selectedRental = rentals.find(
//       (rental) =>
//         new Date(rental.startDate).toDateString() === slotInfo.start.toDateString() ||
//         new Date(rental.endDate).toDateString() === slotInfo.start.toDateString()
//     );
    
//     if (selectedRental) {
//       navigate(`/details/${selectedRental.id}`); // Si ya está alquilado, muestra los detalles
//     } else {
//       navigate('/new-rental'); // Si la fecha no está alquilada, navega a 'new-rental'.
//     }
//   };
  

//   return (
//     <div>
//       <h1>Calendario de Alquileres</h1>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         onSelectEvent={handleSelectEvent}
//         onSelectSlot={handleSelectSlot}
//         selectable
//         eventPropGetter={eventStyleGetter} // Aplicar clases a los eventos.
//         dayPropGetter={dayStyleGetter} // Aplicar clases a las celdas del día.
//       />
//     </div>
//   );
// }

// export default Home;


