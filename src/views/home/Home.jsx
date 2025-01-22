import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getRentals, createRental, updateRental } from '../../redux/actions/actions';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

function Home() {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    tenantName: '',
    startDate: '',
    endDate: '',
    price: '',
  });

  useEffect(() => {
    dispatch(getRentals());
  }, [dispatch]);

  const events = rentals.map((rental) => ({
    title: rental.tenantName,
    start: new Date(rental.startDate),
    end: new Date(rental.endDate),
    id: rental.id,
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      tenantName: event.title,
      startDate: event.start.toISOString().split('T')[0],
      endDate: event.end.toISOString().split('T')[0],
      price: event.price || '',
    });
    setModalIsOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setFormData({
      tenantName: '',
      startDate: slotInfo.start.toISOString().split('T')[0],
      endDate: slotInfo.start.toISOString().split('T')[0],
      price: '',
    });
    setSelectedEvent(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
    setFormData({
      tenantName: '',
      startDate: '',
      endDate: '',
      price: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent) {
      dispatch(updateRental(selectedEvent.id, formData));
    } else {
      dispatch(createRental(formData));
    }
    closeModal();
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
        onSelectSlot={handleSelectSlot}
        selectable
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Evento"
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            padding: '20px',
          },
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <h2>{selectedEvent ? 'Editar Evento' : 'Agregar Evento'}</h2>
          <label>Inquilino:</label>
          <input
            name="tenantName"
            value={formData.tenantName}
            onChange={handleFormChange}
            required
          />
          <label>Fecha de inicio:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleFormChange}
            required
          />
          <label>Fecha de fin:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleFormChange}
            required
          />
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
          />
          <button type="submit">{selectedEvent ? 'Guardar Cambios' : 'Agregar'}</button>
        </form>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default Home;




// import React, { useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRentals } from '../../redux/actions/actions';

// const localizer = momentLocalizer(moment);

// function Home() {
//   const dispatch = useDispatch();
//   const rentals = useSelector((state) => state.rentals); // Alquileres desde el estado global.

//   useEffect(() => {
//     dispatch(getRentals()); // Cargar alquileres al inicio.
//   }, [dispatch]);

//   const events = rentals.map((rental) => ({
//     title: rental.tenantName,
//     start: new Date(rental.startDate),
//     end: new Date(rental.endDate),
//     id: rental.id,
//   }));

//   const handleSelectEvent = (event) => {
//     window.location.href = `/details/${event.id}`;
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
//       />
//     </div>
//   );
// }

// export default Home;
