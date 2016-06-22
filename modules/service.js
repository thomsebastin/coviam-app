cvServices = angular.module('cvApp.service', []);

cvServices.factory('GlobalService', function($http) {
  return {
    getProductDetails: function() {
      var url = "json/product.json";

      return $http({
        url: url
      }).then(function(res) {
        return res;
      }, function(err) {
        return err;
      })
    }
  }
});
