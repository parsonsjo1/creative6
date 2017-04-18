var app = window.angular.module('myApp', []);

  app.controller('myController', ['$scope', '$http', 
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);

app.controller('mainCtrl', mainCtrl);
var api_root = "/message";
function mainCtrl($scope, $http) {
    $scope.username = "";
    $scope.sendingMessage = "";
    $scope.pin = "";
    $scope.retrievePin = "";
    $scope.retrieveName = "";
    $scope.retrievedMessage = "Secret Message";

    $scope.postMessage = function (username) {
        console.log("In post message function");
        console.log($scope.username);
        $http.post(api_root, { username: $scope.username, message: $scope.sendingMessage })
            .then(function (resp) {
                if (resp) {
                    $scope.pin = resp.data.data;
                    console.log(resp);
                    console.log($scope.pin);
                }
                else {
                    console.log("Some error occured");
                }

            })
    }

    $scope.getMessage = function () {
        console.log("In get message function");
        $scope.retrievedMessage = "";
        $http.get(api_root + '/' + $scope.retrieveName + '/' +  $scope.retrievePin)
            .then(function (resp) {
                if (!resp) {
                    $scope.retrievedMessage = "No Message Found"
                }
                else {
                    $scope.retrievedMessage = resp.data;

                }

            })
    }
}