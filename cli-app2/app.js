const inquirer = require('inquirer');
const connection = require('./connection');
const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node');
const client = new eventful.Client(eventfulKey);
const fetch = require('node-fetch');
const table = require('console.table');


const app = {};

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
      'Exit'
    ],
    name: 'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'See all events') app.retrieveAllEvents(continueCallback);
    if (res.action === 'See one event with a particular id') app.retrieveEvent(continueCallback);
    if (res.action === 'Add new event') app.addNewEvent(continueCallback);
    if (res.action === 'Update info of event') app.matchUserWithEvent(continueCallback);
    if (res.action === 'Delete an event') app.seeEventsOfOneUser(continueCallback);
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
      console.log('\n*********************************************************************');
      console.table(json);
      console.log('*********************************************************************');
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
      console.log('\n*********************************************************************');
      console.table(json);
      console.log('*********************************************************************');
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
      .then(json => console.log(json));
  }

  inquirer.prompt(questions).then(answers => {
    let eventName = answers.name;
    postEvent(eventName);
  });
}






// app.matchUserWithEvent = (continueCallback) => {
//   var directionsPrompt = {
//     type: 'list',
//     name: 'direction',
//     message: 'Which direction would you like to go?',
//     choices: ['Forward', 'Right', 'Left', 'Back']
//   };

//   function main() {
//     console.log('You find youself in a small room, there is a door in front of you.');
//     exitHouse();
//   }

//   function exitHouse() {
//     inquirer.prompt(directionsPrompt).then(answers => {
//       if (answers.direction === 'Forward') {
//         console.log('You find yourself in a forest');
//         console.log(
//           'There is a wolf in front of you; a friendly looking dwarf to the right and an impasse to the left.'
//         );
//         encounter1();
//       } else {
//         console.log('You cannot go that way. Try again');
//         exitHouse();
//       }
//     });
//   }

//   function encounter1() {
//     inquirer.prompt(directionsPrompt).then(answers => {
//       var direction = answers.direction;
//       if (direction === 'Forward') {
//         console.log('You attempt to fight the wolf');
//         console.log(
//           'Theres a stick and some stones lying around you could use as a weapon'
//         );
//         encounter2b();
//       } else if (direction === 'Right') {
//         console.log('You befriend the dwarf');
//         console.log('He helps you kill the wolf. You can now move forward');
//         encounter2a();
//       } else {
//         console.log('You cannot go that way');
//         encounter1();
//       }
//     });
//   }

//   function encounter2a() {
//     inquirer.prompt(directionsPrompt).then(answers => {
//       var direction = answers.direction;
//       if (direction === 'Forward') {
//         var output = 'You find a painted wooden sign that says:';
//         output += ' \n';
//         output += ' ____  _____  ____  _____ \n';
//         output += '(_  _)(  _  )(  _ \\(  _  ) \n';
//         output += '  )(   )(_)(  )(_) ))(_)(  \n';
//         output += ' (__) (_____)(____/(_____) \n';
//         console.log(output);
//       } else {
//         console.log('You cannot go that way');
//         encounter2a();
//       }
//     });
//   }

//   function encounter2b() {
//     inquirer.prompt({
//         type: 'list',
//         name: 'weapon',
//         message: 'Pick one',
//         choices: [
//           'Use the stick',
//           'Grab a large rock',
//           'Try and make a run for it',
//           'Attack the wolf unarmed'
//         ]
//       })
//       .then(() => {
//         console.log('The wolf mauls you. You die. The end.');
//       });
//   }

//   main();
// }

// app.seeEventsOfOneUser = (continueCallback) => {
//   console.log('Please write code for this function');
// }


// app.seeUsersOfOneEvent = (continueCallback) => {
//   console.log('Please write code for this function');
// }

module.exports = app;