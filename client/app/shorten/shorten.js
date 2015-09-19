angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};
  $scope.loading = false;
  $scope.linkAppended = true;
  $scope.addLink = function () {
    $scope.loading = true;
    Links.addLink($scope.link.url, function(dataSentBack) {
      $scope.link.url = '';
      $scope.data = dataSentBack;
      $scope.shortenForm.$setPristine();
      $scope.loading = false;
    });
  };
});
