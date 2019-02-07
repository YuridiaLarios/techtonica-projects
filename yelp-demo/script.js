// https://repl.it/@judytuna/DemoRestaurantRecommender





//**************************************************** */
class Category {
  constructor(name) {
    this.name = name;
    this.restaurants = [];
  }
  addRestaurant(restaurantId) {
    this.restaurants.push(restaurantId);
  }

  get categoryRestaurants() {
    return this.restaurants.join(", ");
  }
}
//**************************************************** */





//**************************************************** */
class Restaurant {
  constructor(name, id) {
    this.name = name;
    this.categories = new Set();
    this.id = id;
    this._usersRatings = [5];
    this.numOfRatings = 1;
    this.averageRating = 5;
  }

  updateAverage() {
    let sum = 0;
    for (let i = 0; i < this._usersRatings.length; i++) {
      sum += this._usersRatings[i];
    }
    this.averageRating = (sum / this._usersRatings.length).toFixed(2);
    // console.log(this.averageRating);
  }

  addCategory(name) {
    this.categories.add(name); //add is a built in set method
  }

  get rateAverageInfo() {
    return this.averageRating;
  }

  get numOfRatingsInfo() {
    return this.numOfRatings;
  }

  set usersRatings(rating) {
    if (typeof rating == "number") {
      this._usersRatings.push(rating);
      this.numOfRatings += 1;
      this.updateAverage();
    }
  }
}
//**************************************************** */





//**************************************************** */

class User {
  constructor(firstName, lastName, id, avatarURL) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.avatar = avatarURL
    this.ratings = {};
  }

  addRating(restaurantId, rating) {
    this.ratings[restaurantId] = rating; //setting ratings for restaurant "evergrenn" and the rest.
  }

  get userName() {
    return this.firstName;
  }
  get userLastName() {
    return this.lastName;
  }

}
//**************************************************** */





//**************************************************** */
class RestaurantRecommender {
  constructor() {
    // All main properties should go here.
    this.categories = {};
    this.restaurants = [];
    this.users = [];
  }

  get usersInfo() {
    return this.users;
  }

  get restaurantInfo() {
    return this.restaurants;
  }



  deleteUser(userFirstName, userLastName) {
    // finding what index it is, if not index = -1;
    let filterIndex = this.users.findIndex(e => ((e.firstName === userFirstName) &&
      (e.lastName === userLastName)));
    console.log("momomomomomomomoo");
    console.log(filterIndex);
    if (filterIndex > -1) {
      this.users.splice(filterIndex, 1);
    }
  }


  deleteRestaurant(restaurantName) {
    // finding what index it is, if not index = -1;
    let filterIndex = this.restaurants.findIndex(e => ((e.name === restaurantName)));
    console.log("momomomomomomomoo");
    console.log(filterIndex);
    if (filterIndex > -1) {
      this.restaurants.splice(filterIndex, 1);
    }
  }

}
//**************************************************** */






let food = new RestaurantRecommender();





//**************************************************** */
// Adding users 

let ingrid = new User("Ingrid", "Cookiemonster", food.users.length, "images/ingridAvatar.png");
food.users.push(ingrid);

let yuridia = new User("Yuridia", "Larios", food.users.length, "images/yuriAvatar.png");
food.users.push(yuridia);

let isabelle = new User("Isabelle", "Yiu", food.users.length, "images/isabelleAvatar.png");
food.users.push(isabelle);

let judytuna = new User("Judy", "Tuna", food.users.length, "images/judyAvatar.jpg");
food.users.push(judytuna);

let tony = new User("Tony", "Hero", food.users.length, "images/tonyAvatar.jpg");
food.users.push(tony);

let danielle = new User("Danielle", "Hero", food.users.length, "images/danielleAvatar.png");
food.users.push(danielle);

// Printing all users info from array
console.log(food.users);
console.log(); // new line
//**************************************************** */




//**************************************************** */
//Adding Restaurants
let evergreen = new Restaurant("Evergreen", food.restaurants.length);
food.restaurants.push(evergreen);


let burgerKing = new Restaurant("Burger King", food.restaurants.length);
food.restaurants.push(burgerKing);

//Printing all restaurants info from array
console.log(food.restaurants);
console.log(); // new line
//**************************************************** */



//**************************************************** */
// creating categories of food
let vietnamese = new Category("Vietnamese");
let fastFood = new Category("Fast Food");
let american = new Category("American");

// add categories to each restaurant name
evergreen.addCategory("Vietnamese");
burgerKing.addCategory(["Fast Food", "American"]);


console.log(evergreen.categories);
console.log(burgerKing.categories);


// add id of restaurant to each corresponding category
vietnamese.addRestaurant(evergreen.id);
fastFood.addRestaurant(burgerKing.id);
american.addRestaurant(burgerKing.id);

console.log("id's of vietnamese restaurants: " + vietnamese.restaurants);
console.log("id's of fastFood restaurants: " + fastFood.restaurants);
console.log("id's of American food restaurants: " + american.restaurants);
console.log(); // new line
//**************************************************** */




//**************************************************** */
// Add users rating to restaurants
ingrid.addRating(evergreen.id, 4);
ingrid.addRating(burgerKing.id, 2);
console.log("ingrid's ratings: ");
console.log(ingrid.ratings);


yuridia.addRating(evergreen.id, 1);
yuridia.addRating(burgerKing.id, 3);
console.log("yuridia's ratings: ");
console.log(yuridia.ratings);
//**************************************************** */





//**************************************************** */
evergreen.usersRatings = (ingrid.ratings["0"]);
evergreen.usersRatings = (yuridia.ratings["0"]);

console.log(evergreen._usersRatings);
console.log(evergreen.numOfRatings);
// console.log(evergreen.averageRating());
//**************************************************** */



// food.filter("vietnamese"); //this returns evergreen
vietnamese.categoryRestaurants;





//**********************************************************************************/
// VERY SCARY USER INTERFACE


/************************************************************************************
function showUsers()  
function to generate users divs and attach their first name, last name, and avatar to their corresponding div to be displayed.
***********************************************************************************/
function showUsers() {
  var html = '';
  html += '<div class="container p-3"><div class="row">';

  for (let i = 0; i < food.usersInfo.length; i++) {
    html += '<div class="userX p-2 col-lg-4 col-md-6 col-sm-6 col-12-row">';
    html += '<img class="avatar rounded-circle" src="' + food.usersInfo[i].avatar + '">' + '<br>' + '<p class="firstName">' + food.usersInfo[i].firstName + '</p><p class="lastName">' + food.usersInfo[i].lastName + '</p></div>';
  }

  html += '</div>'; // end of container

  // apend info to our users div
  $("#usersDiv").append(html);
}





/************************************************************************************
function showRestaurants()  
function to generate users divs and attach their first name, last name, and avatar to their corresponding div to be displayed.
***********************************************************************************/
function showRestaurants() {
  var html = '';
  html += '<div class="container p-3" <div class="row">';
  for (let i = 0; i < food.restaurantInfo.length; i++) {
    html += '<div class="restaurantX m-4 p-2 col-lg-12 col-md-12 col-sm-12 col-12-row">';
    html += '<h3 class="restaurantName">' + food.restaurantInfo[i].name + '</h3><p class="average">' + 'Rate Average: ' + food.restaurantInfo[i].rateAverageInfo + '<p class="numOfRates">' + 'Reviews: ' + food.restaurantInfo[i].numOfRatingsInfo + '</p></div>';
  }
  html += '</div>'; // end of container

  // apend info to our users div
  $("#restaurantDiv").append(html);
}







/************************************************************************************
MAIN PROGRAM
***********************************************************************************/
// main program
$(document).ready(function () {
  showUsers();
  showRestaurants();


  // When the "add-restaurant" form is submited, the name input is readed 
  // and added to the our database system and UI
  $("#addRestaurantButton").on("click", function () {
    let restaurantName = $("#inputRestaurantName").val();
    if (restaurantName !== "") {
      let newRestaurant = new Restaurant(restaurantName, food.restaurants.length);
      food.restaurants.push(newRestaurant);
      $("#restaurantDiv").empty();
      showRestaurants();
      console.log("momomomommomomomfafafafaf");
    }
    return false;
  });


  // If at least one restaurant div is selected, activate the delete restaurant button
  function activateRestaurantDeleteButton() {
    var self = $('#deleteRestaurantButton');
    if ($('.restaurantX.border-warning').length >= 1) {
      if (self.hasClass('disabled')) {
        self.removeClass('disabled');
      }
    } else {
      self.addClass('disabled');
    }
  }


  // When selecting or deselecting a restaurant div, apply corresponding highlighting class, and call activateUserDeleteButton() function to check for activating or deactivating the delete restaurant button.
  $('#restaurantDiv').on('click', '.restaurantX', function () {
    var self = $(this);

    if (self.hasClass('border-warning')) {
      self.removeClass("border-warning");
      self.removeClass("border");
      activateRestaurantDeleteButton();
    } else {
      self.addClass("border-warning");
      self.addClass("border");
      activateRestaurantDeleteButton();
    }
  });

  // When the delete restaurant button is clicked, get the name of all the selected restaurant's divs and use them to delete restaurant from both database and UI.
  $("#deleteRestaurantButton").on("click", function () {
    $('.restaurantX.border-warning').each(function (i, obj) {
      let restaurantName = $(obj).children(".restaurantName").text();
      // let restaurantNameModified = restaurantName.toLowerCase().replace(/\s/g, '');
      console.log(obj);
      console.log(restaurantName);
      // console.log(restaurantNameModified)
      food.deleteRestaurant(restaurantName);
    });

    // removes all divs with userX class and yellow border class
    $('.restaurantX.border-warning').remove();
    $('#deleteRestaurantButton').addClass('disabled');

    return false;
  });





  // When the "add-user" form is submited, the first name and last name are readed 
  // and added to the our database system and UI
  $("#addUserButton").on("click", function () {
    let userFirstName = $("#firstNameInput").val();
    let userLastName = $("#lastNameInput").val();
    if (userFirstName !== "" && userLastName !== "") {
      let newUser = new User(userFirstName, userLastName, food.users.length, "images/ingridAvatar.png");
      food.users.push(newUser);
      $("#usersDiv").empty();
      showUsers();
    }
    return false;
  });

  // When selecting or deselecting an user div, apply corresponding highlighting 
  // class, and call activateUserDeleteButton() function to check for activating or deactivating the delete user button.
  $('#usersDiv').on('click', '.userX', function () {
    var self = $(this);

    if (self.hasClass('border-warning')) {
      self.removeClass("border-warning");
      self.removeClass("border");
      activateUserDeleteButton();
    } else {
      self.addClass("border-warning");
      self.addClass("border");
      activateUserDeleteButton();
    }
  });


  // If at least one user div is selected, activate the delete user button
  function activateUserDeleteButton() {
    var self = $('#deleteUserButton');
    if ($('.userX.border-warning').length >= 1) {
      if (self.hasClass('disabled')) {
        self.removeClass('disabled');
      }
    } else {
      self.addClass('disabled');
    }
  }




  // When the delete user button is clicked, get the first and last name of all the selected user's divs and use them to delete user from both database and UI.
  $("#deleteUserButton").on("click", function () {
    $('.userX.border-warning').each(function (i, obj) {
      let firstName = $(obj).children(".firstName").text();
      let lastName = $(obj).children(".lastName").text();
      console.log(obj);
      console.log(firstName);
      console.log(lastName);
      food.deleteUser(firstName, lastName);
    });

    // removes all divs with userX class and yellow border class
    $('.userX.border-warning').remove();
    $('#deleteUserButton').addClass('disabled');

    return false;
  });



});