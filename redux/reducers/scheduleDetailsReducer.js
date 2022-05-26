
const INITIAL_STATE = {
  scheduleData: [],
  visitData: [],
  filterVisitDetails: '',
  iSPcomment: '',
  editedformDetails: [],
  previousVisits: [],
  checkOutData: '',
  locationForMap: ''
}

export default function caregiverSchedule(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'STORE_SCHEDULE_DETAILS':
      return {
        ...state,
        scheduleData: action.scheduleData
      }
      break;
    case 'STORE_VISIT_DETAILS':
      return {
        ...state,
        visitData: action.visitData
      }
      break;
    case 'FLTERED_VISIT_DETAILS':
      return {
        ...state,
        filterVisitDetails: action.filterVisitDetails
      }
      break;
    case 'SCREENING_QUESTIONS':
      return {
        ...state,
        screeningData: action.screeningData
      }
      break;
    case 'CHECK_IN_STATUS':
      return {
        ...state,
        screeningData: action.checkInStatus
      }
      break;
    case 'CLIENT_ISP_COMMENT':
      return {
        ...state,
        iSPcomment: action.iSPcomment
      }
      break;
      case 'EDITED_BASIC_DETAILS':
        return {
          ...state,
          editedBasicDetails: action.editedBasicDetails
        }
        break;
      case 'EDITED_FORM_DETAILS':
        return {
          ...state,
          editedformDetails: action.editedformDetails
        }
        break;
        case 'CLIENT_PREVIOUS_VISITS':
          return {
            ...state,
            previousVisits: action.previousVisits
          }
          break;
        case 'LOCATION_FOR_MAP':
          return {
            ...state,
            locationForMap: action.locationForMap
          }
          break;
        case 'CAREGIVER_CHECKOUT':
          return {
            ...state,
            checkOutData: action.checkOutData
          }
    default:
      return state
  }
}