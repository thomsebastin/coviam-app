var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope, GlobalService) {
  console.log("Controller inititated!!");
  
  $scope.isHidden = true;

  // calling API for getting products
  $scope.getProductDetails = function() {
    GlobalService.getProductDetails().then(function(res) {
      console.log(res);
    })
  };

  $scope.getProductDetails();
});
