const INITIAL_STATE={
  messageToAgency: '',
  modalVisible: false
  }
  
  export default function message(state=INITIAL_STATE,action){
    switch (action.type) {
      case 'MESSAGE_TO_AGENCY':
        return{
          ...state,
          messageToAgency: action.messageToAgency
        }
        break;
        case 'IS_MODAL_VISIBLE':
        return{
          ...state,
          modalVisible: action.modalVisible
        }
      default:
        return state
    }
  }