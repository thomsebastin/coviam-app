var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope) {
  console.log("Controller inititated!!");
  $scope.isHidden = false;
  $scope.isShown = false;
  //function to hide cart button
  $scope.hideCartBtn = function() {
    $scope.isHidden = true;
    $scope.isShown = true;
  }
});
