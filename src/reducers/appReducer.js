export default function appReducer(state={message: '', disableInstructions: false, closedInstructions: ''}, action){

  switch(action.type){

      case "FETCH_MESSAGE":

      return {...state, message: action.payload}

      case "DISABLE_INSTRUCTIONS":

      return {...state, disableInstructions: action.payload}

      case "CLOSE_INSTRUCTIONS":

      return {...state, closeInstructions: action.payload}

    default:
      return state
  }
}
