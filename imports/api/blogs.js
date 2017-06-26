import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Blogs = new Mongo.Collection('blogs');

Meteor.methods({
  'blogs.insert'(title, body) {
    check(title, String); 
    check(body, String); 
    
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Blogs.insert({
      title,
      body,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'blogs.remove'(blogId) {
    check(blogId, String);
 
    Blogs.remove(blogId);
  },
  
});