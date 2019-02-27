const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  res.send("hello world and nodemon from /events");
});

app.get('/events/:id', (req, res) => {
  res.send("hello world and nodemon from /events/:" + req.params.id);
});

const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));