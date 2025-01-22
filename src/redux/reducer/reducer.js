const initialState = {
    rentals: [],
    selectedRental: null,
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_RENTALS':
        return { ...state, rentals: action.payload };
      case 'GET_RENTAL_BY_ID':
        return { ...state, selectedRental: action.payload };
      case 'UPDATE_RENTAL':
        return {
          ...state,
          rentals: state.rentals.map((rental) =>
            rental.id === action.payload.id ? action.payload : rental
          ),
        };
      default:
        return state;
    }
  }
  