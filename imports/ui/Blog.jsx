import React, { Component, PropTypes } from 'react';
 
// Blog component - represents a single blog item
export default class Blog extends Component {
  render() {
    return (
      <div className={"blog_container"}><h3>{this.props.blog.title}</h3><div>{this.props.blog.body}</div></div>
    );
  }
}
 
Blog.propTypes = {  
  blog: PropTypes.object.isRequired,
};