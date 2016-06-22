var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope, GlobalService) {
  console.log("Controller inititated!!");
  
  $scope.itemsInCart = 0;
  $scope.allGoods = [];
  $scope.grandSum = 0;

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
    $scope.grandSum = $scope.grandTotal();
  };

  // add one more item to the total items on clicking plus
  $scope.addOneMoreItem = function(product) {
    $scope.itemsInCart += 1;
    product.totalSelectedItems += 1;

    var found = ($scope.allGoods).filter(function(item) { return item.name === product.brand_name; });
    found[0].quantity += 1;
    found[0].total_amt = found[0].quantity * product.price;
    $scope.grandSum = $scope.grandTotal();
  };

  // remove one item from cart on clicking '-'
  $scope.removeAnItem = function(product) {
    if ($scope.itemsInCart > 0) {
      $scope.itemsInCart -= 1;
      (product.totalSelectedItems > 0) ? (product.totalSelectedItems -= 1) : product.totalSelectedItems;

      var found = ($scope.allGoods).filter(function(item) { return item.name === product.brand_name; });
      found[0].quantity -= 1;
      found[0].total_amt = found[0].quantity * product.price;
      $scope.grandSum = $scope.grandTotal();
    }
     
    if (product.totalSelectedItems === 0) {
      product.isHidden = false;
      $scope.allGoods = ($scope.allGoods).filter(function(item) { return item.name !== product.brand_name; });
    }
  };

  // function to calculate the grand total
  $scope.grandTotal = function() {
    var total = 0;
    var _self = $scope.allGoods;
    for ( var i = 0; i < (_self).length; i++ ) {
        total += (_self)[i].total_amt;
    }
    return total;
  };

  // remove the cart item
  $scope.removeCartItem = function(obj) {
    console.log(obj);
    $scope.allGoods = ($scope.allGoods).filter(function(item) { return item.name !== obj.name; });
  };

  $scope.getProductDetails();
});
