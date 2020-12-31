import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { Button, Card, Form } from 'react-bootstrap';

const BlogForm = ({ toggle }) => {
  
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({ title:'', author:'',url:'' })

  const handleChange = (e) => {
    // any changes to input is assigned to user object
    const { name, value } = e.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const addBlog = async (e) => {
    e.preventDefault()
    // adding newly created blog to blogs from response data
    dispatch(createNewBlog(newBlog))
    toggle.current.toggleVisibility()
    setNewBlog({ title:'', author:'',url:'' })
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
        <Form.Label>Title:</Form.Label>
          <Form.Control
             id="title"
             name = "title"
             value={newBlog.title}
             placeholder="Title"
             onChange={handleChange}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
             id="author"
             name = "author"
             value={newBlog.author}
             placeholder="Author"
             onChange={handleChange}
          />
          <Form.Label>URL:</Form.Label>
          <Form.Control
             id="url"
             name = "url"
             value={newBlog.url}
             placeholder="Url"
             onChange={handleChange}
          />
          <Button style={{marginTop:10,marginBottom:10}} variant="primary" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default BlogForm
