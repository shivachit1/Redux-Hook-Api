import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog, createNewComment } from "../reducers/blogsReducer";
import { Button, Card, Container } from 'react-bootstrap';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const blogId = useParams().id;
  const loggedUser = useSelector((state) => state.loggedUser);

  const blog = useSelector((state) =>
    state.blogs.find((item) => item.id === blogId)
  );
  if (!blog) {
    return null;
  }

  const hitLike = () => {
    const updatingBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    // updating blog with new blog data (for now Likes only)
    dispatch(likeBlog(blog.id, updatingBlog));
  };

  const handleDeleteBlog = () => {
    var result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) {
      dispatch(removeBlog(blog.id));
    } else {
      console.log("delete blog cancelled");
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    const comment ={
        comment:e.target.comment.value
    }
    // dispatching
    dispatch(createNewComment(blog.id, comment))
    e.target.comment.value = ''
  }

  return (
    <Card className = "my-auto" style={{padding:20}}>
        <div>
        <div>
        <h4>{blog.title}</h4>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes
          <Button className="likeButton" variant="info" onClick={hitLike}>
            like
          </Button>
        </p>
        <p>added by {blog.user.name}</p>
        {loggedUser.username === blog.user.username ? (
          <Button className="deleteButton" variant="danger" onClick={handleDeleteBlog}>
            delete
          </Button>
        ) : (
          <div></div>
        )}
        <div>
          <h5>comments</h5>
          <form onSubmit={addComment}>
            <input name="comment" placeholder="leave comment here" />
            <Button style={{marginLeft:15}} variant="success">add comment</Button>
          </form>

          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
        </div>
      
    </Card>
  );
};

export default BlogDetails;
