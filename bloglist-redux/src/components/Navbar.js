import React from 'react'
import { Link } from "react-router-dom" 
import { useSelector, useDispatch } from 'react-redux'
import {logOutUser} from '../reducers/userReducer'
import {Navbar, Nav, Button} from 'react-bootstrap'
const Navigation = () => {
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.loggedUser)

    const logOut= () => {
     dispatch(logOutUser())
    }

    return(
       
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={{margin:10,fontSize: 20,fontWeight:'bold'}} to="/blogs">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={{margin:10,fontSize: 20,fontWeight:'bold'}} to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <div><strong>{user.name}</strong> logged in <Button variant="danger" onClick={logOut}>Logout</Button></div>
                : <Link style={{margin:10}} to="/login">login</Link>
              }
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Navigation