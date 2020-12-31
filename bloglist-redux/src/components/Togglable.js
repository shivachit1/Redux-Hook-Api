import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // assigning reference to component
  useImperativeHandle(ref , () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Card className="my-auto" style={{padding:25}}>
      <div style={hideWhenVisible}>
        <Button variant="success" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>cancel</Button>
      </div>
    </Card>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable