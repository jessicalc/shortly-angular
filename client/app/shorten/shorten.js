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
})

.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'POST',
          url: '/api/links/' + attrs.ensureUnique,
          data: {'url': attrs.ensureUnique} 
        }).success(function(data,status, headers, cfg) {
          c.$setValidity('unique', data.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);
