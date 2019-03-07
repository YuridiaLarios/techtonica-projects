const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node'); // documentation for functions: https://github.com/sedouard/eventful-node
const client = new eventful.Client(eventfulKey);

//sample search, try running it to see it in action
client.searchEvents({
  // options for search
  keywords: 'tango',
  location: 'San Francisco',
  date: "Next Week"
  // callback:
}, function (err, data) { // error handling
  if (err) {
    return console.error(err);
  }

  // saves array of resuls
  let resultEvents = data.search.events.event;

  console.log('Received ' + data.search.total_items + ' events');
  console.log('Event listings: ');

  // using loop to console all events found and their info 
  for (let i = 0; i < resultEvents.length; i++) {
    console.log("===========================================================")
    console.log('title: ', resultEvents[i].title);
    console.log('start_time: ', resultEvents[i].start_time);
    console.log('venue_name: ', resultEvents[i].venue_name);
    console.log('venue_address: ', resultEvents[i].venue_address);
  }
});

//export a custom function that searches via Eventful API, displays the results AND stores some of the data into MySQL
module.exports = function (optionsObj) {
  // YOUR WORK HERE
  console.log("You need to create this functionality yourself")
}


module.exports = {
  search,
  saveEvent
}