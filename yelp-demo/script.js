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
    this.averageRating = function () {
      let sum = 0;
      for (let i = 0; i < this._usersRatings.length; i++) {
        sum += this._usersRatings[i];
      }
      return sum / this._usersRatings.length;
    }

  }

  addCategory(name) {
    this.categories.add(name); //add is a built in set method
  }
  updateRating(rating) {
    this.averageRating = (this.averageRating + rating) / this.numOfRatings;
  }
  set usersRatings(rating) {
    this._usersRatings.push(rating);
    this.numOfRatings += 1;
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
console.log(evergreen.averageRating());
//**************************************************** */



// food.filter("vietnamese"); //this returns evergreen
vietnamese.categoryRestaurants;





//**********************************************************************************/
// VERY SCARY USER INTERFACE


/************************************************************************************
  function to generate all the divs and attach all info to
  their corresponding div to be displayed.
***********************************************************************************/

function showUsers() {
  var html = '';
  html += '<div class="container p-3"><div class="row">';

  for (let i = 0; i < food.usersInfo.length; i++) {
    html += '<div class="col-lg-4 col-md-6 col-sm-6 col-12-row">';
    html += '<img class="avatar rounded-circle" src="' + food.usersInfo[i].avatar + '">' + food.usersInfo[i].firstName + " " + food.usersInfo[i].lastName + '</div>';
  }

  html += '</div>'; // end of container

  // apend info to our users div
  $("#usersDiv").append(html);
}

showUsers();

// {
//   /* <div class="container">
//   <div class="row">
//     <div class="col-sm">
//       One of three columns
//     </div>
//     <div class="col-sm">
//       One of three columns
//     </div>
//     <div class="col-sm">
//       One of three columns
//     </div>
//   </div>
//   </div> */
// }