/*global angular*/
angular
    .module("App")
    .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/highest-paid-athletes";

        $scope.addAthlete = function() {
            $http.post(api, $scope.newAthlete).then(function(response) {
                $scope.status = "Status:" + response.status;
                console.log(JSON.stringify(response, null, 2));
                getAthletes();
            });
        };

        $scope.deleteAthletes = function() {
            console.log("all athlete will be delete");
            $http.delete(api + "/").then(function(response) {
                $scope.status = "Status: " + response.status;
                getAthletes();
            });
        };

        $scope.deleteAthlete = function(name) {
            console.log("Athlete to be deleted: " + name);
            $http.delete(api + "/" + name).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAthletes();
            });
        };

        $scope.loadInitialData = function() {
            console.log("Athlete load all");
            $http.get(api + "/loadInitialData").then(function(response) {
                $scope.status = "Status: " + response.status;
                getAthletes();
            });
        };

        function getAthletes() {
            $http.get(api).then(function(response) {
                $scope.athletes = response.data;
            });
        }

        getAthletes();

    }]);
