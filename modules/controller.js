var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope, GlobalService) {
  console.log("Controller inititated!!");
  
  $scope.itemsInCart = 0;

  // calling API for getting products
  $scope.getProductDetails = function() {
    GlobalService.getProductDetails().then(function(res) {
      $scope.allProducts = res.data;
      console.log($scope.allProducts);
    })
  };

  // triggers when add to cart is clicked
  $scope.addToCart = function(product) {
    product.isHidden = true;
    $scope.itemsInCart += 1;
    product.totalSelectedItems += 1;
  };

  // add one more item to the total items on clicking plus
  $scope.addOneMoreItem = function(product) {
    $scope.itemsInCart += 1;
    product.totalSelectedItems += 1;
  };

  // remove one item from cart on clicking '-'
  $scope.removeAnItem = function(product) {
    if ($scope.itemsInCart > 0) {
      $scope.itemsInCart -= 1;
      (product.totalSelectedItems > 0) ? (product.totalSelectedItems -= 1) : product.totalSelectedItems;
    }
     
    if (product.totalSelectedItems === 0) {
      product.isHidden = false;
    }
  };

  $scope.getProductDetails();
});
