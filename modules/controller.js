var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope, GlobalService) {
  console.log("Controller inititated!!");
  
  //$scope.isHidden = true;
  $scope.itemsInCart = 0;

  // calling API for getting products
  $scope.getProductDetails = function() {
    GlobalService.getProductDetails().then(function(res) {
      console.log(res);
      $scope.allProducts = res.data;
      console.log($scope.allProducts);
    })
  };

  // triggers when add to cart is clicked
  $scope.addToCart = function(product) {
    product.isHidden = true;
  }

  $scope.getProductDetails();
});
