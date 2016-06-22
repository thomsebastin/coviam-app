var cvController = angular.module('cvApp.controller', []);

cvController.controller('cvCtrl', function($scope, GlobalService, $localStorage) {
  console.log("Controller inititated!!");
  
  // setting persistant value
  if (!$localStorage.cartObj) {
    $localStorage.cartObj = {};
  }
  console.log($localStorage.cartObj)
  
  $scope.itemsInCart = ($localStorage.cartObj.itemsInCart) ? $localStorage.cartObj.itemsInCart : 0;
  $scope.allGoods = ($localStorage.cartObj.allGoods) ? $localStorage.cartObj.allGoods : [];
  $scope.grandSum = ($localStorage.cartObj.grandSum) ? $localStorage.cartObj.grandSum : 0;

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
    $scope.grandSum = ($localStorage.cartObj.grandSum) ? $localStorage.cartObj.grandSum : $scope.grandTotal();
    $localStorage.cartObj.grandSum = $scope.grandSum;
    $localStorage.cartObj.itemsInCart = $scope.itemsInCart;
    $localStorage.cartObj.allGoods = $scope.allGoods;
  };

  // add one more item to the total items on clicking plus
  $scope.addOneMoreItem = function(product) {
    $scope.itemsInCart += 1;
    product.totalSelectedItems += 1;

    var found = ($scope.allGoods).filter(function(item) { return item.name === product.brand_name; });
    found[0].quantity += 1;
    found[0].total_amt = found[0].quantity * product.price;
    $scope.grandSum = $scope.grandTotal();
    $localStorage.cartObj.grandSum = $scope.grandSum;
    $localStorage.cartObj.itemsInCart = $scope.itemsInCart;
    $localStorage.cartObj.allGoods = $scope.allGoods;
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
      $localStorage.cartObj.grandSum = $scope.grandSum;
      $localStorage.cartObj.itemsInCart = $scope.itemsInCart;
      $localStorage.cartObj.allGoods = $scope.allGoods;
    }
     
    if (product.totalSelectedItems === 0) {
      product.isHidden = false;
      $scope.allGoods = ($scope.allGoods).filter(function(item) { return item.name !== product.brand_name; });
      $localStorage.cartObj.allGoods = $scope.allGoods;
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
    $scope.allGoods = ($scope.allGoods).filter(function(item) { return item.name !== obj.name; });
    $localStorage.cartObj.allGoods = $scope.allGoods;
  };

  $scope.getProductDetails();
});
