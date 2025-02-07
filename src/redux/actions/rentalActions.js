import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/rentals';

// Función auxiliar para obtener la configuración de autorización
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getRentals = () => async (dispatch) => {
  try {
    const { data } = await axios.get(API_URL, getAuthConfig());
    dispatch({ type: "GET_RENTALS", payload: data });
  } catch (error) {
    console.error("Error al obtener alquileres:", error);
  }
};

export const getRentalById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`, getAuthConfig());
    dispatch({ type: "GET_RENTAL_BY_ID", payload: data });
  } catch (error) {
    console.error("Error al obtener el alquiler:", error);
  }
};

export const createRental = (rental) => async (dispatch) => {
  try {
    const { data } = await axios.post(API_URL, rental, getAuthConfig());
    dispatch({ type: "CREATE_RENTAL", payload: data });
  } catch (error) {
    console.error("Error al crear el alquiler:", error);
  }
};

export const updateRental = (id, rental) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, rental, getAuthConfig());
    dispatch({ type: "UPDATE_RENTAL", payload: data });
  } catch (error) {
    console.error("Error al actualizar el alquiler:", error);
  }
};

export const deleteRental = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    dispatch({ type: "DELETE_RENTAL", payload: id });
  } catch (error) {
    console.error("Error al eliminar el alquiler:", error);
  }
};



// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/v1/rentals';
// // const API_URL = 'https://servidor-alquileres-backend.onrender.com/api/v1/rentals';

// export const getRentals = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get(API_URL);
//     dispatch({ type: 'GET_RENTALS', payload: data });
//   } catch (error) {
//     console.error('Error al obtener alquileres:', error);
//   }
// };

// export const getRentalById = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`${API_URL}/${id}`);
//     dispatch({ type: 'GET_RENTAL_BY_ID', payload: data });
//   } catch (error) {
//     console.error('Error al obtener el alquiler:', error);
//   }
// };

// export const createRental = (rental) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(API_URL, rental);
//     dispatch({ type: 'CREATE_RENTAL', payload: data });
//   } catch (error) {
//     console.error('Error al crear el alquiler:', error);
//   }
// };

// export const updateRental = (id, rental) => async (dispatch) => {
//   try {
//     const { data } = await axios.put(`${API_URL}/${id}`, rental);
//     dispatch({ type: 'UPDATE_RENTAL', payload: data });
//   } catch (error) {
//     console.error('Error al actualizar el alquiler:', error);
//   }
// };

// export const deleteRental = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//     dispatch({ type: 'DELETE_RENTAL', payload: id });
//   } catch (error) {
//     console.error('Error al eliminar el alquiler:', error);
//   }
// };

