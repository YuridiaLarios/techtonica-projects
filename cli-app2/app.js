const inquirer = require('inquirer');
const connection = require('./connection');
const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node');
const client = new eventful.Client(eventfulKey);

const app = {};

app.startQuestion = (closeConnectionCallback) => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'Complete a sentence',
      'Create a new user',
      'Find one event of a particular type in San Francisco next week',
      'Mark an existing user to attend an event in database',
      'See all events that a particular user is going to',
      'See all the users that are going to a particular event',
      'Exit'
    ],
    name: 'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'Complete a sentence') app.completeSentence(continueCallback);
    if (res.action === 'Create a new user') app.createNewUser(continueCallback);
    if (res.action === 'Find one event of a particular type in San Francisco next week') app.searchEventful(continueCallback);
    if (res.action === 'Mark an existing user to attend an event in database') app.matchUserWithEvent(continueCallback);
    if (res.action === 'See all events that a particular user is going to') app.seeEventsOfOneUser(continueCallback);
    if (res.action === 'See all the users that are going to a particular event') app.seeUsersOfOneEvent(continueCallback);
    if (res.action === 'Exit') {
      closeConnectionCallback();
      return;
    }
  })
}

app.completeSentence = (continueCallback) => {

  var questions = [{
      type: 'input',
      name: 'color',
      message: 'Your favorite color? ',
      default: 'example: blue'
    },
    {
      type: 'input',
      name: 'item',
      message: 'name an iteme or something you really want to buy: ',
      default: 'example: diamond'
    }
  ]

  inquirer.prompt(questions).then(answers => {
    console.log('\nAnswers:');
    console.log('My favorite color is ' + answers.color + ', so my dream is to buy a ' + answers.color + ' ' + answers.item + "!");
    console.log('\n');
    console.log('*********************************************************************');
    //console.log(JSON.stringify(answers, null, ' -- '));


    continueCallback();
  });
}

app.createNewUser = (continueCallback) => {

  function validateAge(age) {
    var reg = /^\d+$/;
    return reg.test(age) || "Age should be a number!";
  }

  var questions = [{
      type: 'input',
      name: 'userName',
      message: 'your name? ',
      default: 'example: Jhon'
    },
    {
      type: 'input',
      name: 'age',
      message: 'your age? ',
      default: 'example: 25',
      validate: validateAge
    },
  ];

  inquirer.prompt(questions).then(answers => {
    console.log('*********************************************************************');
    const query = {
      text: 'INSERT INTO users2(name, age) VALUES($1, $2)',
      values: [answers.userName, answers.age],
    }

    // callback
    connection.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
        console.log('\n*********************************************************************');
        continueCallback();
      } else {
        console.log('name = ' + answers.userName);
        console.log('age = ' + answers.age);
        console.log("\nINSERT SUCCESSFUL\n");
        console.log('*********************************************************************');
        continueCallback();
      }
    })
  });
}

app.searchEventful = (continueCallback) => {
  var getKeyword = {
    type: 'input',
    name: 'keyword',
    message: 'Enter keyword to search event: ',
    default: 'example: dancing'
  }

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
          console.log('Too late lol....JK ' + answers.save);
          console.log(currentEventName);
          console.log(currentEventAddress);
          console.log(currentVenueName);
          console.log(currentEventDate);

          const query = {
            text: 'INSERT INTO events(name, address, venue, date) VALUES($1, $2, $3, $4)',
            values: [currentEventName, currentEventAddress, currentVenueName, currentEventDate],
          }

          // callback
          connection.query(query, (err, res) => {
            if (err) {
              console.log(err.stack);
              console.log('\n*********************************************************************');
              continueCallback();
            } else {
              console.log("\nINSERT SUCCESSFUL\n");
              console.log('*********************************************************************');
              continueCallback();
            }
          })
        } else {
          console.log('succker ' + answers.save);
          promptForKeyword();
        }
      });
  }


  function promptForKeyword() {
    inquirer.prompt(getKeyword).then(answers => {

      client.searchEvents({
        keywords: answers.keyword,
        location: 'San Francisco',
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

app.matchUserWithEvent = (continueCallback) => {
  var directionsPrompt = {
    type: 'list',
    name: 'direction',
    message: 'Which direction would you like to go?',
    choices: ['Forward', 'Right', 'Left', 'Back']
  };

  function main() {
    console.log('You find youself in a small room, there is a door in front of you.');
    exitHouse();
  }

  function exitHouse() {
    inquirer.prompt(directionsPrompt).then(answers => {
      if (answers.direction === 'Forward') {
        console.log('You find yourself in a forest');
        console.log(
          'There is a wolf in front of you; a friendly looking dwarf to the right and an impasse to the left.'
        );
        encounter1();
      } else {
        console.log('You cannot go that way. Try again');
        exitHouse();
      }
    });
  }

  function encounter1() {
    inquirer.prompt(directionsPrompt).then(answers => {
      var direction = answers.direction;
      if (direction === 'Forward') {
        console.log('You attempt to fight the wolf');
        console.log(
          'Theres a stick and some stones lying around you could use as a weapon'
        );
        encounter2b();
      } else if (direction === 'Right') {
        console.log('You befriend the dwarf');
        console.log('He helps you kill the wolf. You can now move forward');
        encounter2a();
      } else {
        console.log('You cannot go that way');
        encounter1();
      }
    });
  }

  function encounter2a() {
    inquirer.prompt(directionsPrompt).then(answers => {
      var direction = answers.direction;
      if (direction === 'Forward') {
        var output = 'You find a painted wooden sign that says:';
        output += ' \n';
        output += ' ____  _____  ____  _____ \n';
        output += '(_  _)(  _  )(  _ \\(  _  ) \n';
        output += '  )(   )(_)(  )(_) ))(_)(  \n';
        output += ' (__) (_____)(____/(_____) \n';
        console.log(output);
      } else {
        console.log('You cannot go that way');
        encounter2a();
      }
    });
  }

  function encounter2b() {
    inquirer.prompt({
        type: 'list',
        name: 'weapon',
        message: 'Pick one',
        choices: [
          'Use the stick',
          'Grab a large rock',
          'Try and make a run for it',
          'Attack the wolf unarmed'
        ]
      })
      .then(() => {
        console.log('The wolf mauls you. You die. The end.');
      });
  }

  main();
}

app.seeEventsOfOneUser = (continueCallback) => {
  console.log('Please write code for this function');
}


app.seeUsersOfOneEvent = (continueCallback) => {
  console.log('Please write code for this function');
}

module.exports = app;