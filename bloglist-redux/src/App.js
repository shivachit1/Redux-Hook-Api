import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";
import BlogDetails from "./components/BlogDetails";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const user = useSelector((state) => state.loggedUser);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // retrieving logged user from local storage with key "loggedBlogappUser"
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    // checking if loggedUserJSON is defined
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(saveUser(loggedUser));
    }
    dispatch(getAllUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div className="container">
      <Notification />
    <Router>
      {!user.username ? (
        <LoginForm />
      ) : (
        <div>
          <Navbar />
          
          <h2>blogs app</h2>
          <Route
            exact path="/"
            render={() =>
              user ? <Redirect to="/blogs" /> : <Redirect to="/" />
            }
          />
          <Route exact path="/blogs">
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
              <BlogForm toggle={blogFormRef} />
            </Togglable>
            <BlogList />
          </Route>

          <Route path="/blogs/:id">
            <BlogDetails />
          </Route>

          <Route exact path="/users">
            <UserList />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
        </div>
      )}
    </Router>
    </div>
  )
}

export default App;
