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
  var questions = [{
    type: 'input',
    name: 'keyword',
    message: 'Enter keyword to search event: ',
    default: 'example: dancing'
  }]

  inquirer.prompt(questions[0]).then(answers => {

    client.searchEvents({
      keywords: answers.keyword,
      location: 'San Francisco',
      date: "Next Week"
    }, function (err, data) {
      if (err) {
        return console.error(err);
      }
      let resultEvents = data.search.events.event;
      console.log('Received ' + data.search.total_items + ' events');
      console.log('Event listing: ');

      let i = 0;
      console.log("===========================================================")
      console.log('title: ', resultEvents[i].title);
      console.log('start_time: ', resultEvents[i].start_time);
      console.log('venue_name: ', resultEvents[i].venue_name);
      console.log('venue_address: ', resultEvents[i].venue_address);

      console.log('\n*********************************************************************');
      continueCallback();

    });
  });
}

app.matchUserWithEvent = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  //continueCallback();
}

app.seeEventsOfOneUser = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  //continueCallback();
}

app.seeUsersOfOneEvent = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  //continueCallback();
}

module.exports = app;