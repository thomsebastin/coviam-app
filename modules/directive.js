var cvDirectives = angular.module('cvApp.directive', []);

cvDirectives.directive('cvDir', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      console.log("Nothing here for now!!");
    }
  }
});
