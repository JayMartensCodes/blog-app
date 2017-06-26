import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Blogs } from '../api/blogs.js';
import Blog from './Blog'
import { Link } from 'react-router-dom';

class Home extends Component {

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
    const userName = this.props.currentUser && this.props.currentUser.username

    return (
      <div className="container">
        <header>
          <h1>Blogs</h1>
          <div style={{ float: 'right' }}>
            {this.props.currentUser &&(
              <span style={{paddingRight: 20}}><Link to={`/${userName}`}>Profile</Link></span>
            )}
            <AccountsUIWrapper />
          </div>
        </header>
        {(this.props.currentUser && (this.props.match.params.id == userName)) ?
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

const HomeContainer = createContainer((props) => {
  Meteor.subscribe('blogs', props.match.params.id);

  return {
    blogs: Blogs.find({}).fetch(),
    currentUser: Meteor.user(),
  };
}, Home);

export default HomeContainer;