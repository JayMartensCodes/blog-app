import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Blogs } from '../api/blogs.js';
 
import Blog from './Blog.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
// App component - represents the whole app
class App extends Component {
 
  renderBlogs() {
    return this.props.blogs.map((blog) => (
      <Blog key={blog._id} blog={blog} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Blogs</h1>
          <div style={{float: 'right'}}>
            <AccountsUIWrapper />
          </div>
        </header>
        
        {this.renderBlogs()}
        
      </div>
    );
  }
}

App.propTypes = {
  blogs: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    blogs: Blogs.find({}).fetch(),
  };
}, App);