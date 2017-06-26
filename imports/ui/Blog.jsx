import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Blogs } from '../api/blogs.js';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// Blog component - represents a single blog item
export default class Blog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      blogTitleField: this.props.blog.title,
      blogBodyField: this.props.blog.body
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
    Meteor.call('blogs.update', this.props.blog._id, this.state.blogTitleField.trim(), this.state.blogBodyField.trim())
    this.setState({
      editMode: !this.state.editMode
    })
  }
  render() {
    let dateCreated = this.props.blog.createdAt.toDateString();
    let isBlogOwner = (this.props.blog.owner === Meteor.userId())

    return (
      <div className={"blog_container"}>

        {this.state.editMode ? (
          <div>
            <form className="new-blog" onSubmit={this.handleUpdateBlog.bind(this)}>
              <div>
                <TextField
                  className="blog-title-field"
                  value={this.state.blogTitleField}
                  onChange={e => this.setState({ blogTitleField: e.target.value })}
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  className="blog-body-field"
                  value={this.state.blogBodyField}
                  onChange={e => this.setState({ blogBodyField: e.target.value })}
                  multiLine={true}
                  rows={1}
                  rowsMax={10}
                  fullWidth={true}
                />
              </div>
            </form>
            <div style={{ textAlign: 'center' }}>
              <RaisedButton label="Discard" secondary={true} style={{ paddingRight: 5 }} onClick={this.toggleEditMode.bind(this)} />
              <RaisedButton label="Save" primary={true} onClick={this.handleUpdateBlog.bind(this)} />
            </div>
          </div>
        ) : (
            <div>
              {isBlogOwner && (
                <button className="delete" onClick={this.deleteThisBlog.bind(this)}>
                  &times;
              </button>
              )}
              <h3>
                {this.props.blog.title}
              </h3>
              <h4>
                Posted: {dateCreated}
              </h4>
              {this.props.blog.lastEdited && (
                <h4>
                  Last Edited: {this.props.blog.lastEdited.toDateString()}
                </h4>
              )}
              <h4>
                Author: {this.props.blog.username}
              </h4>
              <div style={{marginLeft: 10, marginTop: 10, wordWrap: 'break-word', width: '98%'}}>
                {this.props.blog.body}
              </div>
              {isBlogOwner && (
                <div style={{ textAlign: 'right', marginBottom: 5, marginTop: 5 }}>
                  <RaisedButton label="Edit" primary={true} onClick={this.toggleEditMode.bind(this)} />
                </div>
              )}
            </div>
          )}

      </div>
    );
  }
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};