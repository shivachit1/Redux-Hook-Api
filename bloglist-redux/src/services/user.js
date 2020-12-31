import axios from 'axios'
const baseUrl = '/api/login'

// POST request for logging user with given username and password
const logInUser = async user => {
  const res = await axios.post(baseUrl,user)
  return res.data
}

// POST request for logging user with given username and password
const getAllUsers = async () => {
  const res = await axios.get('/api/users')
  return res.data
}

export default { logInUser, getAllUsers }