var app = angular.module('flapperNews', []);

app.controller('MainCtrl', ['$scope', function($scope) {

  $scope.test = 'Hello World!';

  $scope.posts = [
    {title: 'Post 1', upvotes: Math.random()*20},
    {title: 'Post 2', upvotes: Math.random()*20},
    {title: 'Post 3', upvotes: Math.random()*20},
    {title: 'Post 4', upvotes: Math.random()*20},
    {title: 'Post 5', upvotes: Math.random()*20},
  ]

}]);
