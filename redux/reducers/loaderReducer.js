
  const INITIAL_STATE={
    isLoading:false
  }
  
  export default function loader(state=INITIAL_STATE,action){
    switch (action.type) {
      case 'LOADER_STATUS':
        return{
          ...state,
          isLoading: action.isLoading
        }
      default:
        return state
    }
  }