const initialState = {
    rentals: [],
    rental: null,
    selectedRental: null,
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_RENTALS':
        return { 
          ...state, 
          rentals: action.payload 
        };

      case 'GET_RENTAL_BY_ID':
        return { 
          ...state, 
          selectedRental: action.payload 
        };

      // case 'CREATE_RENTAL':
      //   return { ...state, rentals: [...state.rentals, action.payload] };
         case 'CREATE_RENTAL':
          return {
            ...state,
            rentals: [...state.rentals, action.payload],
          }
        return {
          ...state,
          rentals: state.rentals.map((rental) =>
            rental.id === action.payload.id ? action.payload : rental
          ),
        };
      case 'DELETE_RENTAL':
        return {
          ...state,
          rentals: state.rentals.filter((rental) => rental.id !== action.payload),
        };
        
      default:
        return state;
    }
  }
  