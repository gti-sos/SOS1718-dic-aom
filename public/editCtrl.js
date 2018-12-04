/*global angular*/
angular
    .module("App")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Ctrl initialized!");
        var athleteURL = "/api/v1/highest-paid-athletes/" + $routeParams.name;

        $http.get(athleteURL).then(function(response) {
            $scope.updatedAthlete = response.data;
        });

        $scope.updateAthlete = function() {
            $http.put(athleteURL, $scope.updatedAthlete).then(function(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/athletes");
            }, function() {
                var i;
                for (i = 0; i < $scope.length; i++) {
                    if ($scope[i] == null) {
                        $scope.status = "Debe completar todos los campos";
                        break;
                    }
                }


            });

        };

    }]);
