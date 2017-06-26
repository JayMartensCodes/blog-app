import '../imports/api/blogs.js';
import { Blogs } from '../imports/api/blogs.js';
import { check } from 'meteor/check';

Meteor.publish('blogs', function blogsPublication(userName) {
    const query = {};
    if (userName) {
        query.username = userName
    }
    console.log(query)
    return Blogs.find(query);
});

Meteor.methods({

    'blogs.insert'(title, body) {
        check(title, String);
        check(body, String);

        if (!Meteor.userId()) {
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

    'blogs.update'(blogId, title, body) {
        check(blogId, String);
        check(title, String);
        check(body, String);

        Blogs.update(blogId, {
            $set: {
                title,
                body,
                lastEdited: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username,
            }
        });
    },

});