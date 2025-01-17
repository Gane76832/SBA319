const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

mongoose.connect('mongodb://127.0.0.1:27017/my-express-mongo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected for seeding'))
.catch(console.error);

async function seedData() {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    
    const users = await User.insertMany([
      { username: 'sirLancelot', email: 'lancelot@roundtable.io' },
      { username: 'sirEugene', email: 'eugene@roundtable.io' },
      { username: 'sirBobby', email: 'bobby@roundtable.io' },
      { username: 'sirBedivere', email: 'bedivere@roundtable.io' },
      { username: 'sirTristan', email: 'tristan@roundtable.io' }
    ]);

    
    const posts = await Post.insertMany([
      {
        title: 'Adventures in Camelot',
        content: 'An epic quest awaits...',
        author: users[0]._id,
        tags: ['adventure', 'quest']
      },
      {
        title: 'Dragon Slaying Tips',
        content: 'How to tame beasts.',
        author: users[1]._id,
        tags: ['dragon', 'advice']
      },
      {
        title: 'The Round Table',
        content: 'All about Camlott.',
        author: users[2]._id,
        tags: ['history', 'legend']
      },
      {
        title: 'Knightly Virtues',
        content: 'Codes of honor.',
        author: users[3]._id,
        tags: ['ethics', 'valor']
      },
      {
        title: 'Chivalry 101',
        content: 'Essential qualities.',
        author: users[4]._id,
        tags: ['chivalry', 'guide']
      }
    ]);

    
    const comments = await Comment.insertMany([
      { text: 'Great post!', post: posts[0]._id, commenter: users[1]._id },
      { text: 'Very insightful.', post: posts[1]._id, commenter: users[2]._id },
      { text: 'I agree completely.', post: posts[2]._id, commenter: users[3]._id },
      { text: 'Helpful tips.', post: posts[3]._id, commenter: users[4]._id },
      { text: 'Thank you for sharing.', post: posts[4]._id, commenter: users[0]._id }
    ]);

    console.log('Seeding completed.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedData();
