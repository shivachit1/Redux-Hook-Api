import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from './notificationReducer'

const sortBlogs = (blogsToBeSorted) => {
  // sort by value descending order (higher likes to lowest)
    const sortedBlogs = blogsToBeSorted.sort( (a, b) => {
      return b.likes - a.likes
    })
    return sortedBlogs
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return sortBlogs(action.payload)

    case 'NEW_BLOG':
      return [...state,action.payload]
    
    case 'LIKE':
      const likeBlog = action.payload
      const newState = state.map(blog => blog.id === likeBlog.id ? likeBlog : blog)
      return sortBlogs(newState)
    
    case 'REMOVE_BLOG':
        const id = action.payload
        const stateAfterDelete = state.filter(blog => blog.id !== id)
        return sortBlogs(stateAfterDelete)
    case 'NEW_COMMENT':
      const commentedBlog = action.payload
      const Blogs = state.map(blog => blog.id === commentedBlog.id ? commentedBlog : blog)
      return sortBlogs(Blogs)
  
    default: return state
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload:blogs
    })
  }
}

export const createNewBlog = (blog) => {
   return async dispatch => {
     try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        payload: newBlog
      })
      dispatch(setSuccessNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`,3000))
     } catch (error) {
      dispatch(setErrorNotification('Error creating new blog', 5000))
     }
   
  }
}
export const likeBlog = (id,blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      dispatch({
        type: 'LIKE',
        payload: updatedBlog
      }) 
      dispatch(setSuccessNotification(`${updatedBlog.title} likes increased by 1`,5000))
    } catch (error) {
      dispatch(setErrorNotification('Blog cannot be updated', 5000))
    }
    
  }
}


export const removeBlog = (id) => {
    return async dispatch => {
      try {
        await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        payload: id
      })
      dispatch(setSuccessNotification(`blog is deleted`,5000))
    } catch (error) {
      dispatch(setErrorNotification('Blog cannot be deleted', 5000))
    
    }
       
    }
  }

  export const createNewComment = (id, comment) => {
    return async dispatch => {
      try {
        console.log(id + comment)
       const newBlog = await blogService.createNewComment(id, comment)
       dispatch({
         type: 'NEW_COMMENT',
         payload: newBlog
       })
       dispatch(setSuccessNotification(`a comment added to the blog`,3000))
      } catch (error) {
       dispatch(setErrorNotification('Error commenting on blog', 5000))
      }
    
   }
 }

export default reducer