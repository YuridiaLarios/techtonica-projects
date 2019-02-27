const express = require('express');
const app = express();
app.use(express.json()); // get ability to use body for post, put, delete;
const {
  Client
} = require('pg')
const client = new Client({
  host: 'localhost',
  database: 'eventonica',
  port: 5000
})



// events data
let events = [{
    id: 455,
    name: "Techtonica"
  },
  {
    id: 456,
    name: "Learn Python"
  },
  {
    id: 457,
    name: "Github 101"
  }
]
app.get('/events', async (req, res) => {
  await client.connect();
  var events = await client.query("SELECT * FROM events");
  res.json(events.rows);
  await client.end();
});


app.get('/events/:id', (req, res) => {
  // res.send("hello world and nodemon from /events/:" + req.params.id);
  var found = events.find(function (element) {
    return req.params.id == element.id;
  });
  if (found) {
    res.json(found);
  } else {
    res.status(404).send('ID NOT FOUND: 404 STATUS');
  }
});

app.post('/events', (req, res) => {
  const newEvent = {
    id: req.body.id,
    name: req.body.name,
  }
  events.push(newEvent);
  res.json(newEvent);

});

app.put('/events/:id', (req, res) => {
  var oldEvent = events.find(function (element) {
    return req.params.id == element.id;
  });
  oldEvent.name = req.body.name;
  res.json(oldEvent);
  /*
  {
   "name": "camaron"
  }
  */
});

// app.delete('/events/:id', (req, res) => {
//   let oldEvent = events.find(function (element) {
//     return req.params.id == element.id;
//   });
//   let location = data.indexOf(oldEvent);
//   data.splice(location, 1);
//   res.json(data);
// })


app.delete('/events/:id', (req, res) => {
  let oldEvent = events.findIndex(function (element) {
    return preq.params.id == element.id;
  });
  const old = events.splice(oldEvent, 1);
  res.json(old[0]);
});


const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));