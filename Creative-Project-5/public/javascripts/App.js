var app = window.angular.module('app', []);
app.controller('mainCtrl', mainCtrl);
var api_root = "/message";
function mainCtrl($scope, $http) {
    $scope.name = "";
    $scope.sendingMessage = "";
    $scope.pin = "";
    $scope.retrievePin = "";
    $scope.retrieveName = "";
    $scope.retrievedMessage = "Secret Message";

    $scope.postMessage = function () {
        console.log("In post message function");
        
        $http.post(api_root, { name: $scope.name, message: $scope.sendingMessage })
            .then(function (resp) {
                if (resp) {
                    $scope.pin = resp.data.data;
                    
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
