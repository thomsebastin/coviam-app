var cvApp = angular.module('cvApp', [
  'cvApp.controller', 
  //'cvApp.directive', 
  //'cvApp.service',
  'ui.router'
]);

//setting up routes
cvApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  //now set up states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "modules/listing/listing.html"
    })
});
