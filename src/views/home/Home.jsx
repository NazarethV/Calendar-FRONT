import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getRentals } from "../../redux/actions/actions";
import Modal from "react-modal";

const localizer = momentLocalizer(moment);

Modal.setAppElement("#root"); // Para accesibilidad (evitar warnings en consola).

function Home() {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals); // Alquileres desde el estado global.

  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar el modal.
  const [selectedRental, setSelectedRental] = useState(null); // Estado para el alquiler seleccionado.

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
    const rental = rentals.find((r) => r.id === event.id); // Obtener detalles del alquiler.
    setSelectedRental(rental); // Guardar el alquiler seleccionado.
    setModalIsOpen(true); // Abrir el modal.
  };

  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal.
    setSelectedRental(null); // Limpiar el alquiler seleccionado.
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

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Alquiler"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {selectedRental ? (
          <div>
            <h2>Detalles del Alquiler</h2>
            <p>
              <strong>Inquilino:</strong> {selectedRental.tenantName}
            </p>
            <p>
              <strong>Fecha de inicio:</strong>{" "}
              {new Date(selectedRental.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Fecha de fin:</strong>{" "}
              {new Date(selectedRental.endDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Precio:</strong> ${selectedRental.price}
            </p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        ) : (
          <p>Cargando detalles...</p>
        )}
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
