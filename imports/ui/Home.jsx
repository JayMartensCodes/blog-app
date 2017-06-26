import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Blogs } from '../api/blogs.js';
import Blog from './Blog'
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {

  renderBlogs() {
    return this.props.blogs.map((blog) => (
      <Blog key={blog._id} blog={blog} />
    ));
  }

  constructor(props) {
    super(props);

    this.state = {
      blogTitleField: "",
      blogBodyField: ""
    };
  }

  handleAddNewBlog(event) {
    event.preventDefault();
    const blogTitle = this.state.blogTitleField.trim();
    const blogContents = this.state.blogBodyField.trim();
    if (blogTitle && blogContents) {
      Meteor.call('blogs.insert', blogTitle, blogContents);
      this.state.blogTitleField = '';
      this.state.blogBodyField = '';
    }
  }

  render() {
    const userName = this.props.currentUser && this.props.currentUser.username

    return (
      <div className="container">
        <header>
          <h1>Blogs</h1>
          <div style={{ float: 'right' }}>
            {this.props.currentUser && (
              <span style={{ paddingRight: 20 }}><Link to={`/${userName}`}>Profile</Link></span>
            )}
            <AccountsUIWrapper />
          </div>
        </header>
        {(this.props.currentUser && (this.props.match.params.id == userName)) ?
          <div className={"blog_container"}>
            <form className="new-blog" onSubmit={this.handleAddNewBlog.bind(this)}>
              <div>
                <TextField
                  className="blog-title-field"
                  value={this.state.blogTitleField}
                  onChange={e => this.setState({ blogTitleField: e.target.value })}
                  placeholder="Blog Title"
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  className="blog-body-field"
                  value={this.state.blogBodyField}
                  onChange={e => this.setState({ blogBodyField: e.target.value })}
                  placeholder="Blog"
                  multiLine={true}
                  rows={1}
                  rowsMax={10}
                  fullWidth={true}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <RaisedButton label="Post Blog" primary={true} onClick={this.handleAddNewBlog.bind(this)} />
              </div>
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