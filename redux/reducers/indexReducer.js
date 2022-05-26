import * as constants from '../../appResources/constants';
const INITIAL_STATE = {
  index: 0,
  dropdownIndex: {
    item: 0,
    listType: null,
  },
  dropdownIndexAttribute: {
    item: 0,
    listType: null,
  },
  dropdownIndexCertificate: {
    item: 0,
    listType: null,
  },
}

export default function indexValue(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INDEX':
      return {
        ...state,
        index: action.index
      }
      break;
    case 'DROPDOWN_INDEX':
      return {
        ...state,
        dropdownIndex: action.dropdownIndex
      }
      break;
      case 'DROPDOWN_INDEX_ATTRIBUTE':
        return {
          ...state,
          dropdownIndexAttribute: action.dropdownIndex
        }
        break;
        case 'DROPDOWN_INDEX_CERTIFICATE':
      return {
        ...state,
        dropdownIndexCertificate: action.dropdownIndex
      }
      break;
    case 'REFRESH':
      return {
        ...state,
        refresh: action.refresh
      }
    default:
      return state
  }
}