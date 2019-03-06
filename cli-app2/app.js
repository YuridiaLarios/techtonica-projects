const inquirer = require('inquirer');
const connection = require('./connection');
const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node');
const client = new eventful.Client(eventfulKey);
const fetch = require('node-fetch');
const table = require('console.table');


const app = {};

function newLine() {
  console.log('\n*********************************************************************');
}

function endLine() {
  console.log('*********************************************************************');
}

app.startQuestion = (closeConnectionCallback) => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'See all events',
      'See one event with a particular id',
      'Add new event',
      'Update info of event',
      'Delete an event',
      'Find one event in eventonica',
      'Exit'
    ],
    name: 'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'See all events') app.retrieveAllEvents(continueCallback);
    if (res.action === 'See one event with a particular id') app.retrieveEvent(continueCallback);
    if (res.action === 'Add new event') app.addNewEvent(continueCallback);
    if (res.action === 'Update info of event') app.updateEventName(continueCallback);
    if (res.action === 'Delete an event') app.deleteEvent(continueCallback);
    if (res.action === 'Find one event in eventonica') app.eventonicaEvent(continueCallback);
    if (res.action === 'Exit') {
      closeConnectionCallback();
      return;
    }
  })
}






app.retrieveAllEvents = (continueCallback) => {
  function getAllEvents() {
    let promise = fetch('http://localhost:3000/events');

    promise.then((res) => {

      return res.json();

    }).then((json) => {
      newLine();
      console.table(json);
      endLine();
    });
  }
  getAllEvents();
  continueCallback();
}






app.retrieveEvent = (continueCallback) => {
  var questions = [{
    type: 'input',
    name: 'id',
    message: 'which event id?',
    default: 'example: 2',
  }];

  function getEvent(id) {
    let promise = fetch('http://localhost:3000/events/' + id);
    promise.then((res) => {
      return res.json();
    }).then((json) => {
      newLine();
      console.table(json);
      endLine();
      continueCallback();
    });
  }


  inquirer.prompt(questions).then(answers => {
    let id = answers.id;
    console.log('id = ' + id);
    getEvent(id);
  });

}





app.addNewEvent = (continueCallback) => {
  var questions = [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the event?',
    default: 'example: Twilight Movie Marathon',
  }, ];

  function postEvent(eventName) {
    const body = {
      'name': eventName
    };

    fetch('http://localhost:3000/events', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((json) => {
        newLine();
        console.table(json);
        endLine();
        continueCallback();
      });
  }

  inquirer.prompt(questions).then(answers => {
    let eventName = answers.name;
    postEvent(eventName);
  });
}






app.updateEventName = (continueCallback) => {
  var questions = [{
    type: 'input',
    name: 'id',
    message: 'which event id?',
    default: 'example: 2',
  }, {
    type: 'input',
    name: 'name',
    message: 'what is the new event name?',
    default: 'example: Extreme Apocalypsis',
  }];

  let dataToBeDeleted;

  function getEvent(id) {
    let promise = fetch('http://localhost:3000/events/' + id);
    promise.then((res) => {
      return res.json();
    }).then((json) => {
      newLine();
      console.table(json);
      endLine();
      continueCallback();
    });
  }

  function updateData(id, newName) {
    const body = {
      'name': newName
    };
    fetch('http://localhost:3000/events/' + id, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((json) => {
      // console.table(json);
      getEvent(id);
    });
  }

  inquirer.prompt(questions).then(answers => {
    let id = answers.id;
    let newName = answers.name;
    console.log('id = ' + id);
    updateData(id, newName);
  });
}





app.deleteEvent = (continueCallback) => {

  var questions = [{
    type: 'input',
    name: 'id',
    message: 'which event id?',
    default: 'example: 2',
  }];

  let dataToBeDeleted;

  function getEvent(id) {
    let promise = fetch('http://localhost:3000/events/' + id);
    promise.then((res) => {
      return res.json();
    }).then((json) => {
      dataToBeDeleted = json;
    });
  }

  function deleteData(id) {
    fetch('http://localhost:3000/events/' + id, {
      method: 'delete'
    }).then((json) => {
      newLine();
      console.table(dataToBeDeleted);
      endLine();
      continueCallback();
    });
  }

  inquirer.prompt(questions).then(answers => {
    let id = answers.id;
    console.log('id = ' + id);
    getEvent(id);
    deleteData(id);
  });
}





app.eventonicaEvent = (continueCallback) => {
  var getKeyword = [{
    type: 'input',
    name: 'keyword',
    message: 'Enter keyword to search event: ',
    default: 'example: dancing'
  }, {
    type: 'input',
    name: 'location',
    message: 'Enter which city: ',
    default: 'example: San Francisco'
  }]

  let currentEventName;
  let currentEventAddress;


  function encounter1() {
    inquirer.prompt({
        type: 'list',
        name: 'save',
        message: 'would like to save this to the Postgres database?',
        choices: [
          'Yes',
          'No'
        ]
      })
      .then((answers) => {
        if (answers.save === 'Yes') {
          newLine();
          console.log('Save to database? ' + answers.save + '\n');
          console.log(currentEventName);
          console.log(currentEventAddress);
          console.log(currentVenueName);
          console.log(currentEventDate);

          const query = {
            text: 'INSERT INTO events(name) VALUES($1)',
            values: [currentEventName],
          }

          // callback
          connection.query(query, (err, res) => {
            if (err) {
              console.log(err.stack);
              newLine();
              continueCallback();
            } else {
              console.log("\nINSERT SUCCESSFUL\n");
              endLine();
              continueCallback();
            }
          })
        } else {
          console.log(answers.save + "\n Let's keep looking then.");
          promptForKeyword();
        }
      });
  }


  function promptForKeyword() {
    inquirer.prompt(getKeyword).then(answers => {

      client.searchEvents({
        keywords: answers.keyword,
        location: answers.location,
        date: "Next Week"
      }, function (err, data) {
        if (err) {
          return console.error(err);
        }
        let resultEvents = data.search.events.event;
        let counter = 0;

        currentEventName = resultEvents[counter].title;
        currentEventDate = resultEvents[counter].start_time;
        currentEventAddress = resultEvents[counter].venue_address;
        currentVenueName = resultEvents[counter].venue_name;

        console.log("===========================================================")
        console.log('Received ' + data.search.total_items + ' events');
        console.log('Event listing: ');
        console.log('title: ', resultEvents[counter].title);
        console.log('start_time: ', resultEvents[counter].start_time);
        console.log('venue_name: ', resultEvents[counter].venue_name);
        console.log('venue_address: ', resultEvents[counter].venue_address);

        encounter1();

      });
    });

  }


  function main() {
    promptForKeyword();
  }
  main();
}




module.exports = app;