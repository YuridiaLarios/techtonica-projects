const express = require('express');
const app = express();
app.use(express.json()); // get ability to use body for post, put, delete;
const {
  Pool
} = require('pg')
const pool = new Pool({
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

pool.connect();

app.get('/events', async (req, res) => {
  const client = await pool.connect();
  var events = await client.query("SELECT * FROM events");
  res.json(events.rows);
  client.release();
});


app.get('/events/:id', async (req, res) => {
  const client = await pool.connect();
  var events = await client.query("SELECT * FROM events  WHERE id=$1", [req.params.id]);
  res.json(events.rows[0]);
  client.release();
});


app.post('/events', async (req, res) => {
  const client = await pool.connect();
  //let userId = req.body.id;
  let userName = req.body.name;
  var events = await client.query("INSERT INTO events(name) VALUES($1) RETURNING *", [userName]);
  res.json(events.rows[0]);
  client.release();
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