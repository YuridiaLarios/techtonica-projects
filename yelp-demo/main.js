//**********************************************************************************/
// VERY SCARY USER INTERFACE


/************************************************************************************
function showUsers()  
function to generate users divs and attach their first name, last name, and avatar to their corresponding div to be displayed.
***********************************************************************************/
function showUsers(array) {
  var html = '';
  html += '<div class="container p-3"><div class="row">';

  for (let i = 0; i < array.length; i++) {
    html += '<div class="userX p-2 col-lg-4 col-md-6 col-sm-6 col-12-row">';
    html += '<img class="avatar rounded-circle" src="' + array[i].avatar + '">' + '<br>' + '<p class="firstName">' + array[i].firstName + '</p><p class="lastName">' + array[i].lastName + '</p></div>';
  }

  html += '</div>'; // end of container

  // apend info to our users div
  $("#usersDiv").append(html);
}





/************************************************************************************
function showRestaurants()  
function to generate users divs and attach their first name, last name, and avatar to their corresponding div to be displayed.
***********************************************************************************/
function showRestaurants(array) {
  var html = '';
  html += '<div class="container p-3" <div class="row">';
  for (let i = 0; i < array.length; i++) {
    html += '<div class="restaurantX m-4 p-2 col-lg-12 col-md-12 col-sm-12 col-12-row">';
    html += '<h3 class="restaurantName">' + array[i].name + '</h3><p class="average">' + 'Rate Average: ' + array[i].rateAverageInfo + '<p class="numOfRates">' + 'Reviews: ' + array[i].numOfRatingsInfo + '</p>'
    if (array[i].categories.size > 1) {
      html += '<p> Categories: ';
    } else {
      html += '<p> Category: '
    }

    if (array[i].categories.has("American")) {
      html += '<span class="american-gray" style="color:gray">American Food</span> ';
    }
    if (array[i].categories.has("Chinese")) {
      html += '<span class="chinese-category" style="color:#17a2b8">Chinese Food</span> ';
    }
    if (array[i].categories.has("Italian")) {
      html += '<span class="italian-category" style="color:red"> Italian Food</span> ';
    }

    if (array[i].categories.has("Mexican")) {
      html += '<span class="mexican-category" style="color:green"> Mexican Food ';
    }

    if (array[i].categories.has("Fast Food")) {
      html += '<span class="fastfood-category" style="color:#3b4249"> Fast Food</span> ';
    }

    html += '</p>'
    html += '</div>';
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
  showUsers(food.usersInfo);
  showRestaurants(food.restaurantInfo);


  /*  When the "add-restaurant" form is submited, the name input is readed and added to the our database system and UI */
  $("#addRestaurantButton").on("click", function () {
    let restaurantName = $("#inputRestaurantName").val();
    if (restaurantName !== "") {
      let newRestaurant = new Restaurant(restaurantName, food.restaurants.length);
      food.restaurants.push(newRestaurant);
      $("#restaurantDiv").empty();
      showRestaurants(food.restaurantInfo);
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


  /* When selecting or deselecting a restaurant div, apply corresponding highlighting class, and call activateUserDeleteButton() function to check for activating or deactivating the delete restaurant button.
   */
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

  /*When the delete restaurant button is clicked, get the name of all the selected restaurant 's divs and use them to delete restaurant from both database and UI.
   */
  $("#deleteRestaurantButton").on("click", function () {
    $('.restaurantX.border-warning').each(function (i, obj) {
      let restaurantName = $(obj).children(".restaurantName").text();
      // let restaurantNameModified = restaurantName.toLowerCase().replace(/\s/g, '');
      console.log(obj);
      console.log(restaurantName);
      food.deleteRestaurant(restaurantName);
    });

    /* removes all divs with userX class and yellow border class */
    $('.restaurantX.border-warning').remove();
    $('#deleteRestaurantButton').addClass('disabled');

    return false;
  });





  /* When the "add-user" form is submited, the first name and last name are readed 
  and added to the our database system and UI */
  $("#addUserButton").on("click", function () {
    let userFirstName = $("#firstNameInput").val();
    let userLastName = $("#lastNameInput").val();
    if (userFirstName !== "" && userLastName !== "") {
      let newUser = new User(userFirstName, userLastName, food.users.length, "images/newUserAvatar.jpg");
      food.users.push(newUser);
      $("#usersDiv").empty();
      showUsers(food.usersInfo);
    }
    return false;
  });

  /* When selecting or deselecting an user div, apply corresponding highlighting 
   class, and call activateUserDeleteButton() function to check for activating or deactivating the delete user button.
   */
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




  /* When the delete user button is clicked, get the first and last name of all the selected user's divs and use them to delete user from both database and UI.
   */
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




  function filterRestaurantAverage(a, b) {
    if (a.averageRating > b.averageRating) {
      return -1;
    }
    if (a.averageRating < b.averageRating) {
      return 1;
    }
    return 0;
  }




  /* 
  When the filter-by-average button is clicked, filter restaurants and load them
  in new order.
   */
  $("#filterByAverage").on("click", function () {
    let sortRestByAverage = Array.from(food.restaurants);
    sortRestByAverage.sort(filterRestaurantAverage);
    $('#restaurantDiv').empty();
    showRestaurants(sortRestByAverage);
    console.log(sortRestByAverage);
    return false;
  });



  /* 
  When the all button is clicked, unfilter restaurants and load them all.
   */
  $("#unfilter").on("click", function () {
    $('#restaurantDiv').empty();
    showRestaurants(food.restaurantInfo);
    return false;
  });


}); // END OF MAIN PROGRAM