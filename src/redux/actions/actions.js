import React from "react";
import axios from "axios";

export const getRentals = () => async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/rentals');
      dispatch({ type: 'GET_RENTALS', payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getRentalById = (id) => async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/rentals/${id}`);
      dispatch({ type: 'GET_RENTAL_BY_ID', payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateRental = (id, rentalData) => async (dispatch) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/rentals/${id}`, rentalData);
      dispatch({ type: 'UPDATE_RENTAL', payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  