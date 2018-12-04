/*global angular*/
/*global Highcharts*/
/*global google*/
/*global FusionCharts*/

angular
    .module("App")
    .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("main controller initialized");

        $http
            .get("/api/v1/highest-paid-athletes")
            .then(function(response) {

                Highcharts.chart('analytics', {
                    title: {
                        text: 'Highest paid athletes'
                    },
                    xAxis: {
                        categories: ['Floyd Mayweather', 'Lionel Messi', 'Cristiano Ronaldo', 'Conor McGregor', 'Neymar', 'LeBron James', 'Roger Federer', 'Stephen Curry', 'Matt Ryan', 'Matthew Stafford']
                    },
                    yAxis: {
                        name: 'Dolars $'
                    },
                    series: [{
                        type: 'column',
                        name: 'Salary',
                        data: response.data.map(function(a) { return a.salary })
                    }, {
                        type: 'column',
                        name: 'Advertising Contracts',
                        data: response.data.map(function(a) { return a.advertisingContracts })
                    }, {
                        type: 'column',
                        name: 'Total',
                        data: response.data.map(function(a) { return a.total })
                    }]
                });


            });

        $http
            .get("/api/v1/highest-paid-athletes")
            .then(function(response) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable([
                        ['Country', 'Athletes'],
                        ['United States', 5],
                        ['Brazil', 1],
                        ['Switzerland', 1],
                        ['Argentina', 1],
                        ['Ireland', 1],
                        ['Portugal', 1]

                    ]);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('analytics2'));

                    chart.draw(data, options);
                }

            });

        $http
            .get("/api/v1/highest-paid-athletes")
            .then(function(response) {
                FusionCharts.ready(function() {
                    var salesAnlysisChart = new FusionCharts({
                        type: 'mscombi2d',
                        renderAt: 'chart-container',
                        width: '600',
                        height: '300',
                        dataFormat: 'json',
                        dataSource: {
                            "chart": {
                                "caption": "Highest paid athletes",
                                "xAxisname": "Name",
                                "numberPrefix": "$",
                                "showBorder": "0",
                                "showValues": "0",
                                "paletteColors": "#0075c2,#1aaf5d,#f2c500",
                                "bgColor": "#ffffff",
                                "showCanvasBorder": "0",
                                "canvasBgColor": "#ffffff",
                                "captionFontSize": "14",
                                "subcaptionFontSize": "14",
                                "subcaptionFontBold": "0",
                                "divlineColor": "#999999",
                                "divLineIsDashed": "1",
                                "divLineDashLen": "1",
                                "divLineGapLen": "1",
                                "showAlternateHGridColor": "0",
                                "usePlotGradientColor": "0",
                                "toolTipColor": "#ffffff",
                                "toolTipBorderThickness": "0",
                                "toolTipBgColor": "#000000",
                                "toolTipBgAlpha": "80",
                                "toolTipBorderRadius": "2",
                                "toolTipPadding": "5",
                                "legendBgColor": "#ffffff",
                                "legendBorderAlpha": '0',
                                "legendShadow": '0',
                                "legendItemFontSize": '10',
                                "legendItemFontColor": '#666666'
                            },
                            "categories": [{
                                "category": [{
                                        "label": response.data[0].name
                                    },
                                    {
                                        "label": response.data[1].name
                                    },
                                    {
                                        "label": response.data[2].name
                                    },
                                    {
                                        "label": response.data[3].name
                                    },
                                    {
                                        "label": response.data[4].name
                                    },
                                    {
                                        "label": response.data[5].name
                                    },
                                    {
                                        "label": response.data[6].name
                                    },
                                    {
                                        "label": response.data[7].name
                                    },
                                    {
                                        "label": response.data[8].name
                                    },
                                    {
                                        "label": response.data[9].name
                                    }
                                ]
                            }],
                            "dataset": [{
                                    "seriesName": "Salary",
                                    "showValues": "1",
                                    "data": [{
                                            "value": response.data[0].salary
                                        },
                                        {
                                            "value": response.data[1].salary
                                        },
                                        {
                                            "value": response.data[2].salary
                                        },
                                        {
                                            "value": response.data[3].salary
                                        },
                                        {
                                            "value": response.data[4].salary
                                        },
                                        {
                                            "value": response.data[5].salary
                                        },
                                        {
                                            "value": response.data[6].salary
                                        },
                                        {
                                            "value": response.data[7].salary
                                        },
                                        {
                                            "value": response.data[8].salary
                                        },
                                        {
                                            "value": response.data[9].salary
                                        }
                                    ]
                                },
                                {
                                    "seriesName": "Total",
                                    "renderAs": "area",
                                    "data": [{
                                            "value": response.data[0].total
                                        },
                                        {
                                            "value": response.data[1].total
                                        },
                                        {
                                            "value": response.data[2].total
                                        },
                                        {
                                            "value": response.data[3].total
                                        },
                                        {
                                            "value": response.data[4].total
                                        },
                                        {
                                            "value": response.data[5].total
                                        },
                                        {
                                            "value": response.data[6].total
                                        },
                                        {
                                            "value": response.data[7].total
                                        },
                                        {
                                            "value": response.data[8].total
                                        },
                                        {
                                            "value": response.data[9].total
                                        }
                                    ]
                                }
                            ]
                        }
                    }).render();
                });
            });



    }]);
