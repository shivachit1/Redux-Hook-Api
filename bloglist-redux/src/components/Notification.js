import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from 'react-bootstrap'

const Notification = () => {
const successMessage = useSelector(state => state.notification.successMessage)
const errorMessage = useSelector(state => state.notification.errorMessage)
  
if(successMessage==='' && errorMessage===''){
    return null
  }
  if(errorMessage!==''){
    return <Alert variant="danger">{errorMessage}</Alert>
  }
  if(successMessage!==''){
    return <Alert variant="success">{successMessage}</Alert>
  }
}

export default Notification
