import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // handling changes in login form input
  // target is retrieved with input name
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  // handling form submit and calling handleLogin method of App.js with username and password
  const logIn = (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    //history.push('/blogs',{ from: "LoginForm" })
  }

  return (
    <div className="loginForm">
      <h2>Log in to application</h2>
      <Form onSubmit={logIn}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={handleChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={handleChange}
            autoComplete="off"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
