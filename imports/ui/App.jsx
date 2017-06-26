import React, { Component } from 'react';
 
import Blog from './Blog.jsx';
 
// App component - represents the whole app
export default class App extends Component {
  getBlogs() {
    return [
      { _id: 1, title: 'Tinkering Blog', body: "Test" },
      { _id: 2, title: 'Tinkering Blog2', body: "Test2"}, 
    ];
  }
 
  renderBlogs() {
    return this.getBlogs().map((blog) => (
      <Blog key={blog._id} blog={blog} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Blogs</h1>
        </header>
        
        {this.renderBlogs()}
        
      </div>
    );
  }
}