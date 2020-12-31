import userService from '../services/user'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.payload

    default: return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'GET_ALL_USERS',
      payload: users
    })
  }
}


export default reducer