import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Home.css'; // Estilos específicos de este componente
import { useDispatch, useSelector } from 'react-redux';
import { getRentals } from '../../redux/actions/actions'; // Acción para obtener alquileres
import { useNavigate } from 'react-router-dom'; // Para navegar a la vista de detalles del alquiler

// Localizador para fecha en español
const locales = {
  es: es,
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
  const rentals = useSelector((state) => state.rentals); // Obtener los alquileres desde el estado
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRentals()); // Obtener los alquileres cuando se cargue el componente
  }, [dispatch]);

  // Ordenar los alquileres por fecha de inicio (de más cercano a más lejano)
  const sortedRentals = rentals.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA - dateB; // Ordenar de menor a mayor fecha
  });

  // Convertir los alquileres en un formato compatible con el calendario
  const events = sortedRentals.map((rental) => ({
    title: rental.tenantName, // Nombre del inquilino
    start: new Date(rental.startDate), // Fecha de inicio
    end: new Date(rental.endDate), // Fecha de fin
    id: rental.id, // ID del alquiler
    isRented: true, // Indicar que está alquilado
    price: rental.price, // Precio del alquiler
  }));

  // Estilos de los eventos del calendario
  const eventStyleGetter = (event) => {
    return {
      className: event.isRented ? 'rented-event' : 'available-event',
    };
  };

  // Estilos para los días del calendario
  const dayPropGetter = (date) => {
    const isRentedDay = events.some(
      (event) =>
        date >= new Date(event.start).setHours(0, 0, 0, 0) &&
        date <= new Date(event.end).setHours(23, 59, 59, 999)
    );

    return {
      className: isRentedDay ? 'rented-day' : '', // Aplica la clase si es un día alquilado
    };
  };

  // Función para manejar la selección de un evento (alquiler)
  const handleSelectEvent = (event) => {
    navigate(`/details/${event.id}`); // Navegar a los detalles del alquiler
  };

  // Función para manejar la selección de una fecha o espacio en el calendario
  const handleSelectSlot = (slotInfo) => {
    const selectedRental = rentals.find(
      (rental) =>
        new Date(rental.startDate).toDateString() === slotInfo.start.toDateString()
    );
    if (selectedRental) {
      navigate(`/details/${selectedRental.id}`); // Navegar a los detalles del alquiler si se encuentra
    } else {
      navigate('/new-rental'); // Si no hay alquiler, ir a la creación de uno nuevo
    }
  };

  // Mensajes en español para el calendario
  const messages = {
    next: 'Mes Siguiente',
    previous: 'Mes Anterior',
    today: 'Hoy',
    month: 'Calendario',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Persona',
    allDay: 'Todo el día',
    noEventsInRange: 'No hay días alquilados en estas fechas.',
    weekLabel: 'Semana',
    dayLabel: 'Día',
    monthLabel: 'Mes',
  };

  // Crear una lista con todos los alquileres ordenados
  const rentalList = sortedRentals.map((rental) => (
    <div key={rental.id} className="rental-item">
      <h3>{rental.tenantName}</h3>
      <p><strong>Fecha de inicio:</strong> {new Date(rental.startDate).toLocaleDateString('es-ES')}</p>
      <p><strong>Fecha de fin:</strong> {new Date(rental.endDate).toLocaleDateString('es-ES')}</p>
      <button onClick={() => navigate(`/details/${rental.id}`)}>Ver Detalles</button>
    </div>
  ));

  return (
    <div className="calendar-container">
      <h1>Calendario de Alquileres</h1>

      {/* Calendario */}
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }} // Manteniendo la altura original
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          views={['month', 'agenda']}
          defaultView="month"
          messages={messages}
          culture="es"
        />
      </div>

      {/* Lista de todos los alquileres */}
      <div className="rental-list">
        <h2>Todos los Alquileres</h2>
        {rentalList.length === 0 ? (
          <p>No hay alquileres registrados.</p>
        ) : (
          rentalList
        )}
      </div>
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


