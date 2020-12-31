const initialState = {
  successMessage:'',
  errorMessage:''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        
      case 'SHOW_SUCCESS_NOTIFICATION' :
        
        return {
          ...state,
          successMessage:action.successMessage,
        }
      case 'SHOW_ERROR_NOTIFICATION' :
        
        return {
          ...state,
          errorMessage:action.errorMessage
        }

      case 'CLEAR_NOTIFICATION' :
        return {
          successMessage:'',
          errorMessage:''
        }

      default: return state
    }
  }

  var timeoutID='';
  export const setSuccessNotification = (content,duration) => {
    return async dispatch => {
        if(timeoutID!==''){
            clearTimeout(timeoutID)
        }
        dispatch({
          type: 'SHOW_SUCCESS_NOTIFICATION',
          successMessage: content
        })
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
          }, duration)

      }
   
  }

  export const setErrorNotification = (content,duration) => {
    return async dispatch => {
        if(timeoutID!==''){
            clearTimeout(timeoutID)
        }
        dispatch({
          type: 'SHOW_ERROR_NOTIFICATION',
          errorMessage:content
        })
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
          }, duration)

      }
   
  }

  export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
      }
  }


  export default reducer