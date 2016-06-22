var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope, GlobalService) {
  console.log("Controller inititated!!");
  
  $scope.itemsInCart = 0;
  $scope.allGoods = [];

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

    $scope.allGoods.push({
      name: product.brand_name,
      quantity: product.totalSelectedItems,
      total_amt: product.totalSelectedItems * product.price
    }); 
  };

  // add one more item to the total items on clicking plus
  $scope.addOneMoreItem = function(product) {
    $scope.itemsInCart += 1;
    product.totalSelectedItems += 1;

    var found = ($scope.allGoods).filter(function(item) { return item.name === product.brand_name; });
    found[0].quantity += 1;
    found[0].total_amt = found[0].quantity * product.price;
  };

  // remove one item from cart on clicking '-'
  $scope.removeAnItem = function(product) {
    if ($scope.itemsInCart > 0) {
      $scope.itemsInCart -= 1;
      (product.totalSelectedItems > 0) ? (product.totalSelectedItems -= 1) : product.totalSelectedItems;

      var found = ($scope.allGoods).filter(function(item) { return item.name === product.brand_name; });
      found[0].quantity -= 1;
      found[0].total_amt = found[0].quantity * product.price;
    }
     
    if (product.totalSelectedItems === 0) {
      product.isHidden = false;
      $scope.allGoods = ($scope.allGoods).filter(function(item) { return item.name !== product.brand_name; });
    }
  };

  $scope.getProductDetails();
});
