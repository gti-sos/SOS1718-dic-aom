/*global angular*/
/*global Highcharts*/
/*global AmCharts*/
/*global google*/
angular
    .module("App")
    .controller("ApisCompartidasAthletesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("ApisCompartidasAthletes Ctrl initialized!");
        var apiPropia = "/api/v1/highest-paid-athletes";
        var api1 = "/proxyALVARO/api/v1/tvfees-stats";
        var api2 = "https://sos1718-09.herokuapp.com/api/v1/spanish-Universities";
        var ebola = {
            method: 'GET',
            url: "https://ebola-outbreak.p.mashape.com/cases",
            headers: {
                "X-Mashape-Key": "5Te0oZKcMQmshwoOh9V3POQgwfSlp1aDKWtjsnFcQjwkZ8b2ZV",
                "Accept": "application/jsosn"
            }

        };
        var goals = {
            method: 'GET',
            url: "https://montanaflynn-fifa-world-cup.p.mashape.com/goals",
            headers: {
                "X-Mashape-Key": "5Te0oZKcMQmshwoOh9V3POQgwfSlp1aDKWtjsnFcQjwkZ8b2ZV",
                "Accept": "application/jsosn"
            }

        };

        $http.get(api1).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {

                Highcharts.chart('integration1', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'Integration1'
                    },
                    xAxis: {
                        categories: response2.data.map(function(a) { return a.name })
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Capacity',
                        data: response1.data.map(function(t) { return t.capacity })
                    }, {
                        name: 'Attotal',
                        data: response1.data.map(function(t) { return t.attotal })
                    }, {
                        name: 'Ataverage',
                        data: response1.data.map(function(t) { return t.ataverage })
                    }, {
                        name: 'Salary',
                        data: response2.data.map(function(a) { return a.salary })
                    }, {
                        name: 'AdvertisingContracts',
                        data: response2.data.map(function(a) { return a.advertisingContracts })
                    }, {
                        name: 'Total',
                        data: response2.data.map(function(a) { return a.total })
                    }]
                });
            });

        });

        $http.get(api2).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {


                Highcharts.chart('integration2', {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Integration2'
                    },
                    xAxis: [{
                        categories: response1.data.map(function(u) { return u.nameUniversity }),
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} $',
                            style: {
                                color: Highcharts.getOptions().colors[2]
                            }
                        },
                        title: {
                            text: 'Salary',
                            style: {
                                color: Highcharts.getOptions().colors[2]
                            }
                        },
                        opposite: true

                    }, { // Secondary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: 'AdvertisingContracts',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} $',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        }

                    }, { // Tertiary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: 'Total',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        labels: {
                            format: '{value} $',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    series: [{
                        name: 'Salary',
                        type: 'column',
                        yAxis: 1,
                        data: response2.data.map(function(a) { return a.salary }),
                        tooltip: {
                            valueSuffix: ' $'
                        }

                    }, {
                        name: 'AdvertisingContracts',
                        type: 'spline',
                        yAxis: 2,
                        data: response2.data.map(function(a) { return a.advertisingContracts }),
                        marker: {
                            enabled: false
                        },
                        dashStyle: 'shortdot',
                        tooltip: {
                            valueSuffix: ' $'
                        }

                    }, {
                        name: 'Total',
                        type: 'spline',
                        data: response2.data.map(function(a) { return a.total }),
                        tooltip: {
                            valueSuffix: '$'
                        }
                    }]
                });

            });
        });

        $http(ebola).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                var chart = AmCharts.makeChart("consumo1", {
                    "type": "pie",
                    "startDuration": 0,
                    "theme": "chalk",
                    "addClassNames": true,
                    "legend": {
                        "position": "right",
                        "marginRight": 100,
                        "autoMargins": false
                    },
                    "innerRadius": "30%",
                    "defs": {
                        "filter": [{
                            "id": "shadow",
                            "width": "200%",
                            "height": "200%",
                            "feOffset": {
                                "result": "offOut",
                                "in": "SourceAlpha",
                                "dx": 0,
                                "dy": 0
                            },
                            "feGaussianBlur": {
                                "result": "blurOut",
                                "in": "offOut",
                                "stdDeviation": 5
                            },
                            "feBlend": {
                                "in": "SourceGraphic",
                                "in2": "blurOut",
                                "mode": "normal"
                            }
                        }]
                    },
                    "dataProvider": [{
                        "name": "Cases",
                        "value": response1.data.map(function(c) { return c["cases"] }).reduce(function(c, n) { return c + n })
                    }, {
                        "name": "Salary",
                        "value": response2.data.map(function(a) { return a["salary"] }).reduce(function(a, n) { return a + n })
                    }, {
                        "name": "AdvertisingContracts",
                        "value": response2.data.map(function(a) { return a["advertisingContracts"] }).reduce(function(a, n) { return a + n })
                    }, {
                        "name": "Total",
                        "value": response2.data.map(function(a) { return a["total"] }).reduce(function(a, n) { return a + n })
                    }],
                    "valueField": "value",
                    "titleField": "name",
                    "export": {
                        "enabled": true
                    },
                    title: {
                        text: 'Consumo1'
                    }

                });
                chart.addListener("init", handleInit);

                chart.addListener("rollOverSlice", function(e) {
                    handleRollOver(e);
                });

                function handleInit() {
                    chart.legend.addListener("rollOverItem", handleRollOver);
                }

                function handleRollOver(e) {
                    var wedge = e.dataItem.wedge.node;
                    wedge.parentNode.appendChild(wedge);
                }

            });
        });

        $http(goals).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Name', 'Salary', 'AdvertisingContracts', 'Total'],
                        [response1.data, response2.data[0].salary, response2.data[0].advertisingContracts, response2.data[0].total],
                        [response1.data[1], response2.data[1].salary, response2.data[1].advertisingContracts, response2.data[1].total],
                        [response1.data[2], response2.data[2].salary, response2.data[2].advertisingContracts, response2.data[2].total],
                        [response1.data[3], response2.data[3].salary, response2.data[3].advertisingContracts, response2.data[3].total]
                    ]);

                    var options = {
                        title: 'Consumo 2',
                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 }
                    };

                    var chart = new google.visualization.AreaChart(document.getElementById('consumo2'));
                    chart.draw(data, options);
                }
            });
        });
    }]);
