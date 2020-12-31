import userService from '../services/user'
import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from './notificationReducer'

const initialUser = {
  username:'',
  name:'',
  token:''
}
const reducer = (state = initialUser, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    
    case 'SAVE_USER':
      return action.payload
  
    case 'LOGOUT':
      return initialUser

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

export const loginUser = (user) => {
  return async dispatch => {
    try {
      const loggedUser = await userService.logInUser(user)
        
      dispatch({
          type: 'LOGIN',
          payload: loggedUser
      })
      
      // storing logged user to local storage with key "loggedBlogappUser" in json format
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      // setting token for blog service
      blogService.setToken(loggedUser.token)

      dispatch(setSuccessNotification(`${loggedUser.name} logged In`,5000))


    } catch (exception) {
      // setting error message if user login is unsuccessful
     dispatch(setErrorNotification('wrong credentials', 5000))
    }
    
  }
}

export const saveUser = (user) => {
  return async dispatch => {
        
      dispatch({
          type: 'SAVE_USER',
          payload: user
      })
      // setting token for blog service
      blogService.setToken(user.token)

      dispatch(setSuccessNotification(`${user.name} logged In`,5000))
  }
}

export const logOutUser = () => {
   return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
    // clearing local store user data on log out
    window.localStorage.removeItem('loggedBlogappUser')
  }
}


export default reducer