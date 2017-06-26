import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Blogs } from '../api/blogs.js';
import ReactDOM from 'react-dom';

// Blog component - represents a single blog item
export default class Blog extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      editMode: false,
    };
  }

  deleteThisBlog() {
    Meteor.call('blogs.remove', this.props.blog._id);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  handleUpdateBlog() {
    Meteor.call('blogs.update', this.props.blog._id, ReactDOM.findDOMNode(this.refs.titleInput).value.trim(), ReactDOM.findDOMNode(this.refs.blogInput).value.trim())
    this.setState({
      editMode: !this.state.editMode
    })
  }

  render() {
    let dateCreated = this.props.blog.createdAt.toDateString();       
    let isBlogOwner = (this.props.blog.owner === Meteor.userId())

    return (
      <div className={"blog_container"}>       
        
        {this.state.editMode ?
        <div>
        <form className="new-blog" onSubmit={this.handleUpdateBlog.bind(this)}>
          <input              
              className="blog-title-field"
              type="text"
              ref="titleInput"
              defaultValue={this.props.blog.title}
          />
          <input              
              className="blog-body-field"
              type="textarea"
              cols='60'
              rows='8'
              ref="blogInput"
              defaultValue={this.props.blog.body}
          />          
        </form>
        <div style={{textAlign: 'center', color: '#0000EE'}}>
          <span className="hover" onClick={this.toggleEditMode.bind(this)}>Discard Changes </span>
          <span className="hover" onClick={this.handleUpdateBlog.bind(this)}> Update Blog</span>          
        </div>
        </div>
        :<div>
        {isBlogOwner ?        
        <button className="delete" onClick={this.deleteThisBlog.bind(this)}>
          &times;
        </button>  
        : ''}
        <h3>
          {this.props.blog.title} 
        </h3>
        <h4>
          Posted: {dateCreated}
        </h4>
        {this.props.blog.lastEdited ?
        <h4>
          Last Edited: {this.props.blog.lastEdited.toDateString()}
        </h4>
        : ''}
        <h4>
          Author: {this.props.blog.username}
        </h4>
        <div>
          {this.props.blog.body}         
        </div>
        {isBlogOwner ?
        <div style={{textAlign: 'right', color: '#0000EE'}}>
            <span className="hover" onClick={this.toggleEditMode.bind(this)}>Edit</span>            
        </div>
        : ''}
        </div>
        }
               
      </div>
    );
  }
}


Blog.propTypes = {  
  blog: PropTypes.object.isRequired,
};