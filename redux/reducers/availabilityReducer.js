const INITIAL_STATE={
    availabilityDetails:[],
    restrictionLstdetails: [],
    updateAvailabilityDetails: ''
  }
  
  export default function availability(state=INITIAL_STATE,action){
    switch (action.type) {
      case 'AVAILABILITY_DETAILS':
        return{
          ...state,
          availabilityDetails: action.availabilityDetails
        }
        break;
        case 'AVAILABILITY_DATA':
        return{
          ...state,
          restrictionLstdetails: action.restrictionLstdetails
        }
        break;
        case 'SAVE_AVAILABILITY_DETAILS':
        return{
          ...state,
          updateAvailabilityDetails: action.updateAvailabilityDetails
        }
      default:
        return state
    }
  }