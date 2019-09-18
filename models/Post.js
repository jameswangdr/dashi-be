const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment');

const postSchema = new Schema ({
    user: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    content: {
        type: String,
        required: true,
        maxlength: [300, 'Max length exceeded'],
    },
    img: {
        type: String,
        // data: Buffer, 
        // contentType: String // cloundinary.com?
    },
    recent_comments: [Comment.schema],
    likes: {
        type: Number,
        default: 0,
    },
    date_posted: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;