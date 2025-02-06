import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRentals } from '../../redux/actions/actions'; // Acción para obtener alquileres
import { useNavigate } from 'react-router-dom'; // Para navegar a la vista de detalles del alquiler
import CustomDateHeader from './CustomDateHeader';

const locales = {
  es: es, // Localizador para fecha en español (porq o sino era en ingkes)
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

  // Estado para el filtro: 'upcoming' o 'past'
  const [filter, setFilter] = useState('upcoming');

//   useEffect(() => {
//     dispatch(getRentals());
// }, []);

useEffect(() => {
  dispatch(getRentals());
// },[dispatch]); 
},[]); 


  const sortedRentals = [...rentals].sort((a, b) => { //Al hacer [...rentals] creas un nuevo arreglo con los mismos elementos, y luego lo ordenas sin afectar directamente el estado que maneja Redux.
    const dateA = parse(a.startDate, 'yyyy-MM-dd', new Date());
    const dateB = parse(b.startDate, 'yyyy-MM-dd', new Date());
    return dateA - dateB;
  });
  
  
  // Convertir los alquileres en un formato compatible con el calendario
  // Convertir alquileres en eventos para el calendario
  const events = sortedRentals.map((rental) => ({
    title: rental.tenantName,  
    start: parse(rental.startDate, 'yyyy-MM-dd', new Date()),
    end: parse(rental.endDate, 'yyyy-MM-dd', new Date()),
    id: rental.id,
    isRented: true,
    price: rental.price, 
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
      className: isRentedDay ? 'rented-day' : '',
    };
  };

  

  // Función para manejar la selección de un evento (alquiler)
  const handleSelectEvent = (event) => {
    navigate(`/details/${event.id}`); // Navegar a los detalles del alquiler
  };

  
  const handleSelectSlot = (slotInfo) => {
    if (!slotInfo?.start) return;
  
    // Normalizamos la fecha seleccionada para comparar correctamente
    const selectedDate = slotInfo.start.toISOString().split("T")[0];
  
    // Buscar un alquiler que incluya la fecha seleccionada
    const selectedRental = rentals.find((rental) => {
      const startDate = new Date(rental.startDate).toISOString().split("T")[0];
      const endDate = new Date(rental.endDate).toISOString().split("T")[0];
  
      return selectedDate >= startDate && selectedDate <= endDate;
    });
  
    // Redirigir según si hay un alquiler o no
    navigate(selectedRental ? `/details/${selectedRental.id}` : '/new-rental');
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

//Filtrado de alquileres por fecha 
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingRentals = sortedRentals.filter((rental) => {
    const rentalEnd = new Date(rental.endDate);
    rentalEnd.setHours(0, 0, 0, 0);
    return rentalEnd >= today;
  });

  const pastRentals = sortedRentals.filter((rental) => {
    const rentalEnd = new Date(rental.endDate);
    rentalEnd.setHours(0, 0, 0, 0);
    return rentalEnd < today;
  });

  // Crear listas de renderizado
  const upcomingRentalList = upcomingRentals.map((rental) => (
    <div key={rental.id} className="rental-item">
      <h3>{rental.tenantName}</h3>
      <p><strong>Fecha de inicio:</strong> {rental.startDate}</p>
      <p><strong>Fecha de fin:</strong> {rental.endDate}</p>
      <button onClick={() => navigate(`/details/${rental.id}`)}>Ver Detalles</button>
    </div>
  ));

  const pastRentalList = pastRentals.map((rental) => (
    <div key={rental.id} className="rental-item">
      <h3>{rental.tenantName}</h3>
      <p><strong>Fecha de inicio:</strong> {rental.startDate}</p>
      <p><strong>Fecha de fin:</strong> {rental.endDate}</p>
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
          style={{ height: 500 }} 
          onSelectEvent={handleSelectEvent}
 onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          views={['month', 'agenda']}
          defaultView="month"
          messages={messages}
          culture="es"
           // Sobrescribir la cabecera de la fecha en la vista de mes:
          components={{
            month: {
            dateHeader: CustomDateHeader,
            }
          }}
        />
      </div>

      {/* Botones para filtrar la lista */}
      <div className="filter-buttons">
        <button
          className={filter === 'upcoming' ? 'active' : ''}
          onClick={() => setFilter('upcoming')}
        >
          Próximos Alquileres
        </button>
        <button
          className={filter === 'past' ? 'active' : ''}
          onClick={() => setFilter('past')}
        >
          Alquileres Pasados
        </button>
      </div>

      {/* Renderizado condicional según el filtro */}
      <div className="rental-list">
        {filter === 'upcoming' ? (
          <>
            <h2>Próximos Alquileres</h2>
            {upcomingRentalList.length === 0 ? (
              <p>No hay alquileres próximos registrados.</p>
            ) : (
              upcomingRentalList
            )}
          </>
        ) : (
          <>
            <h2>Alquileres Pasados</h2>
            {pastRentalList.length === 0 ? (
              <p>No hay alquileres pasados registrados.</p>
            ) : (
              pastRentalList
            )}
          </>
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


