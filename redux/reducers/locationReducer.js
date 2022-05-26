const INITIAL_STATE = {
    locationData: []
  }
  
  export default function location(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOCATION':
        return {
          ...state,
          locationData: action.locationData
        }
      default:
        return state
    }
  }