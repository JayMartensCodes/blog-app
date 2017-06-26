import React, { Component, PropTypes } from 'react';

import { Blogs } from '../api/blogs.js';

// Blog component - represents a single blog item
export default class Blog extends Component {

  deleteThisBlog() {
    Meteor.call('blogs.remove', this.props.blog._id);
  }
  
  render() {
    const dateCreated = this.props.blog.createdAt.toDateString();   

    return (
      <div className={"blog_container"}>
        <button className="delete" onClick={this.deleteThisBlog.bind(this)}>
          &times;
        </button>
        <h3>
          {this.props.blog.title}
        </h3>
        <h4>
          Posted: {dateCreated}
        </h4>
        <div>
          {this.props.blog.body}
        </div>
        </div>
    );
  }
}


Blog.propTypes = {  
  blog: PropTypes.object.isRequired,
};