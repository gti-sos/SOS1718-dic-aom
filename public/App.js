/*global angular*/
angular
    .module("App", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/athletes", {
                templateUrl: "list.html",
                controller: "ListCtrl"
            })
            .when("/athletes/:name", {
                templateUrl: "edit.html",
                controller: "EditCtrl"
            })
            .when("/analytics", {
                templateUrl: "main.html",
                controller: "MainCtrl"
            })
            .when("/integrations",{
                templateUrl: "apisCompartidasAthletes.html",
                controller: "ApisCompartidasAthletesCtrl"
            });
    });
