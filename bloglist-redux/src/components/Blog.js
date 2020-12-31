import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom" 
const Blog = ({ blog }) => {


  const blogStyle = {
    padding: 15,
    margin:10,
    border: 'solid',
    borderWidth: 1,
    borderColor:'green',
    marginBottom: 8
  }


  return (
    <Card style={blogStyle} id="blog">
      <Link to={`/blogs/${blog.id}`} className="blogTitle">
        <h6>{blog.title} {blog.author}</h6>
        </Link>
    </Card>
  )

}

export default Blog
