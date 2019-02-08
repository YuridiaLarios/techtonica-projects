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
    this.categories = new Set();
    this.restaurants = [];
    this.users = [];
  }

  get usersInfo() {
    return this.users;
  }

  get restaurantInfo() {
    return this.restaurants;
  }

  addRestaurant(name) {
    this.restaurants.push(new Restaurant(name));
  }

  addUser(firstName, lastName, id, avatarURL) {
    this.users.push(new User(firstName, lastName, id, avatarURL));
  }



  deleteUser(userFirstName, userLastName) {
    // finding what index it is, if not index = -1;
    let filterIndex = this.users.findIndex(e => ((e.firstName === userFirstName) &&
      (e.lastName === userLastName)));
    console.log(filterIndex);
    if (filterIndex > -1) {
      this.users.splice(filterIndex, 1);
    }
  }


  deleteRestaurant(restaurantName) {
    // finding what index it is, if not index = -1;
    let filterIndex = this.restaurants.findIndex(e => ((e.name === restaurantName)));
    console.log(filterIndex);
    if (filterIndex > -1) {
      this.restaurants.splice(filterIndex, 1);
    }
  }
}
//**************************************************** */






let food = new RestaurantRecommender();
// food.addRestaurant("ghostName");
// console.log(food.restaurants);




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
let mandarinHouse = new Restaurant("Mandarin House", food.restaurants.length);
food.restaurants.push(mandarinHouse);


let burgerKing = new Restaurant("Burger King", food.restaurants.length);
food.restaurants.push(burgerKing);

let cpk = new Restaurant("California Pizza Kitchen", food.restaurants.length);
food.restaurants.push(cpk);

//Printing all restaurants info from array
console.log(food.restaurants);
console.log(); // new line
//**************************************************** */



//**************************************************** */
// creating categories of food
let american = new Category("American");
let chinese = new Category("Chinese");
let italian = new Category("Italian");
let mexican = new Category("Mexican");
let fastFood = new Category("Fast Food");

// add categories to set
food.categories.add(american);
food.categories.add(chinese);
food.categories.add(italian);
food.categories.add(mexican);
food.categories.add(fastFood);


// add categories to each restaurant name
mandarinHouse.addCategory("Chinese");
burgerKing.addCategory("Fast Food");
burgerKing.addCategory("American");
cpk.addCategory("Italian");



console.log(mandarinHouse.categories);
console.log(burgerKing.categories);


// add id of restaurant to each corresponding category
chinese.addRestaurant(mandarinHouse.id);
fastFood.addRestaurant(burgerKing.id);
american.addRestaurant(burgerKing.id);


console.log("id's of chinese restaurants: " + chinese.restaurants);
console.log("id's of fastFood restaurants: " + fastFood.restaurants);
console.log("id's of American food restaurants: " + american.restaurants);
console.log(); // new line
//**************************************************** */




//**************************************************** */
// Add users rating to restaurants
ingrid.addRating(mandarinHouse.id, 4);
ingrid.addRating(burgerKing.id, 2);
ingrid.addRating(cpk.id, 3.5);

console.log("ingrid's ratings: ");
console.log(ingrid.ratings);


yuridia.addRating(mandarinHouse.id, 1);
yuridia.addRating(burgerKing.id, 3);
yuridia.addRating(cpk.id, 3.5);

console.log("yuridia's ratings: ");
console.log(yuridia.ratings);
//**************************************************** */





//**************************************************** */
// Add ratings to restaurants
mandarinHouse.usersRatings = (ingrid.ratings["0"]);
mandarinHouse.usersRatings = (yuridia.ratings["0"]);

burgerKing.usersRatings = (ingrid.ratings["1"]);
burgerKing.usersRatings = (yuridia.ratings["1"]);

cpk.usersRatings = (ingrid.ratings["2"]);
cpk.usersRatings = (yuridia.ratings["2"]);

// console.log(mandarinHouse.averageRating());
console.log(mandarinHouse._usersRatings);
console.log(mandarinHouse.numOfRatings);

// console.log(burgerKing.averageRating());
console.log(burgerKing._usersRatings);
console.log(burgerKing.numOfRatings);

// console.log(cpk.averageRating());
console.log(cpk._usersRatings);
console.log(cpk.numOfRatings);

//**************************************************** */



module.exports = RestaurantRecommender;