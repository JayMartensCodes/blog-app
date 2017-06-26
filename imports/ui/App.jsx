import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
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

  handleAddNewBlog(event) {
    event.preventDefault();
    console.log("Test");
    const blogTitle = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const blogContents = ReactDOM.findDOMNode(this.refs.blogInput).value.trim();

    if (blogTitle && blogContents) {
      Meteor.call('blogs.insert', blogTitle, blogContents);
      ReactDOM.findDOMNode(this.refs.titleInput).value = '';
      ReactDOM.findDOMNode(this.refs.blogInput).value = '';
    }    
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
        {this.props.currentUser ?
        <div className={"blog_container"}>
        <form className="new-blog" onSubmit={this.handleAddNewBlog.bind(this)}>
          <input
              className="blog-title-field"
              type="text"
              ref="titleInput"
              placeholder="Blog Title"
          />
          <input
              className="blog-body-field"
              type="textarea"
              cols='60'
              rows='8'
              ref="blogInput"
              placeholder="Blog"
          />
          <input type="submit" className="blog-submit-button" value="Post Blog" />
        </form>
        </div>
        : ''
        }

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
    currentUser: Meteor.user(),
  };
}, App);