const express = require('express');
const cors = require('cors');
const app = express();
const postList = require('./postList.json');

app.use(cors());
app.use(express.json());

app.get('/postList', (req, res) => {
  res.json(postList);
});

app.get('/postList/:id', (req, res) => {
  const { id } = req.params;
  const post = postList.find((post) => post.id.toString() === id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.get('/postList/user/:filter', (req, res) => {
  const { filter } = req.params;
  const post = postList.filter((post) => post.userId === filter);

  if (post.length > 0) {
    res.json(post);
  } else if (post.length === 0) {
    res.json(postList);
  } else {
    res.status(404).json({ error: 'No posts found for the specified user' });
  }
});

app.delete('/postList/:id', (req, res) => {
  const { id } = req.params;
  const post = postList.find((post) => post.id.toString() === id);

  if (post) {
    const index = postList.findIndex((post) => post.id.toString() === id);
    postList.splice(index, 1);
    res.json(postList);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.put('/postList/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const post = postList.find((post) => post.id.toString() === id);

  if (post) {
    const index = postList.findIndex((post) => post.id.toString() === id);
    postList[index].title = title;
    postList[index].body = body;
    res.json(postList[index]);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
