const connection = require('./connection');
const app = require('./app');

// connecting to database
const dbConnect = () => {
  connection.connect((err) => {
    if (err) throw err;

    console.log('Welcome to Eventonica')
    console.log("connected as Administrator");

    // running command line interface app
    app.startQuestion(() => {
      // after done, end the connection
      connection.end()
    });
  })
}

// Uncomment below line once you have PostgreSQL setup
dbConnect();