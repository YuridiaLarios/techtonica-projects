    describe("Restaurant Recommender", function () {
      var RestaurantRecommender = require("../script.js");
      //   var Restaurant = require("../static/js/js.js");
      var testRestaurantRecommender;

      beforeEach(function () {
        testRestaurantRecommender = new RestaurantRecommender();
      });

      describe("addRestaurant", function () {
        it("adds a restaurant", function () {
          expect(testRestaurantRecommender.restaurants.length).toEqual(0);
          testRestaurantRecommender.addRestaurant("a");
          expect(testRestaurantRecommender.restaurants.length).toEqual(1);
        });
        it("sets the name of the restaurant", function () {
          testRestaurantRecommender.addRestaurant("ghostName");
          expect(testRestaurantRecommender.restaurants[0].name).toEqual(
            "ghostName"
          );
        });
      });


      describe("addUser", function () {
        it("adds a user", function () {
          expect(testRestaurantRecommender.users.length).toEqual(0);
          testRestaurantRecommender.addUser("a");
          expect(testRestaurantRecommender.users.length).toEqual(1);
        });
        it("sets the name of the user", function () {
          testRestaurantRecommender.addUser("ghostNameUser");
          expect(testRestaurantRecommender.users[0].firstName).toEqual(
            "ghostNameUser"
          );
        });
      });
    });