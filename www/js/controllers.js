angular.module('auroraWatchUK.controllers', [])
    .controller('Home', function($scope, $http, $filter, $timeout, $interval) {
        $scope.reportingUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.txt";
        function init() {

            var config = {headers:  {
                'User-Agent': 'AuroraWatch UK (n40jpj.com)'
            }
            };

            $http.get($scope.reportingUrl)
                .then(function (results) {
                    var baseRows = results.data.split('\n');

                    var rows = [];
                    var station = "";
                    angular.forEach(baseRows, function (value, key) {
                        var row = value.split(' ');
                        if (row[0].indexOf('STATION') > -1) {
                            station = row[1];
                        }

                        if (row[0].indexOf('ACTIVITY') > -1) {
                            var dateAndTimeString = row[1].split('T');

                            var colour = row[3];


                            if(colour.indexOf("green")>-1){
                                $scope.auroraStatusColour = "Green";
                                colour = "rgb(51, 255, 51)";
                            }
                            if(colour.indexOf("yellow")>-1){
                                $scope.auroraStatusColour = "Yellow";
                                colour = "rgb(255, 255, 0)";
                            }
                            if(colour.indexOf("amber")>-1){
                                $scope.auroraStatusColour = "Amber";
                                colour = "rgb(255, 153, 0)";
                            }
                            if(colour.indexOf("red")>-1){
                                $scope.auroraStatusColour = "Red";
                                colour = "rgb(255,0,0)";
                            }

                            var activityRow = {
                                date: $filter('date')(new Date(dateAndTimeString[0]), 'yyyy-MM-dd'),
                                time: dateAndTimeString[1].split('+')[0],
                                value: row[2],
                                colour: colour
                            };
                            this.push(activityRow);
                        }
                    }, rows);
                    $scope.lastRefresh = Date.now();
                    $scope.latestReading = rows[rows.length-1];
                    $scope.latestReading.station = station;
                });
        }

        //Put in interval, first trigger after 10 seconds
        var refreshInterval = $interval(function(){
            init();
        }, 1800000);

        //invoke initialy
        init();

        $scope.$on('$destroy', function () { $interval.cancel(refreshInterval) })

    })

.controller('Dash', function($scope, $http, $filter, $timeout, $interval, $ionicActionSheet) {


        $scope.imageUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.png";
        $scope.reportingUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.txt";

        // Triggered on a button click, or some other target
        $scope.showFilters = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: 'Rolling'},
                    {text: 'Today'},
                    {text: 'Yesterday'}
                ],
                titleText: '<h4>Sort view by ....</h4>',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..

                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:
                            $scope.imageUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.png";
                            $scope.reportingUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.txt";
                            break;
                        case 1:
                            $scope.imageUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.png";
                            $scope.reportingUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/today.txt";
                            break;
                        case 2:
                            $scope.imageUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/rolling.png";
                            $scope.reportingUrl = "http://aurorawatch.lancs.ac.uk/api/n40jpj.com/0.1/yesterday.txt";
                            break;
                    }
                    init();
                    return true;
                }
            });
        };



        function init() {
            var config = {headers:  {
                'User-Agent': 'AuroraWatch UK (n40jpj.com)'
            }
            };

            $http.get($scope.reportingUrl)
                .then(function (results) {
                    var baseRows = results.data.split('\n');

                    $scope.rows = [];

                    angular.forEach(baseRows, function (value, key) {
                        //console.log(value, key);
                        var row = value.split(' ');
                        if (row[0].indexOf('ACTIVITY') > -1) {
                            var dateAndTimeString = row[1].split('T');

                            var colour = row[3];


                            if(colour.indexOf("green")>-1){
                                $scope.auroraStatusColour = "Green";
                                colour = "rgb(51, 255, 51)";
                            }
                            if(colour.indexOf("yellow")>-1){
                                $scope.auroraStatusColour = "Yellow";
                                colour = "rgb(255, 255, 0)";
                            }
                            if(colour.indexOf("amber")>-1){
                                $scope.auroraStatusColour = "Amber";
                                colour = "rgb(255, 153, 0)";
                            }
                            if(colour.indexOf("red")>-1){
                                $scope.auroraStatusColour = "Red";
                                colour = "rgb(255,0,0)";
                            }


                            var activityRow = {
                                date: $filter('date')(new Date(dateAndTimeString), 'yyyy-MM-dd HH:mm:ss'),
                                shortDate: $filter('date')(new Date(dateAndTimeString), 'MMM dd yyyy'),
                                time: dateAndTimeString[1].split('+')[0],
                                value: row[2],
                                colour: colour
                            };
                            this.push(activityRow);
                        }
                    }, $scope.rows);

                    console.log($scope.rows);

                    $scope.lastRefresh = Date.now();
                    $scope.latestReading = $scope.rows[$scope.rows.length-1];
                });
        }

        //Put in interval, first trigger after 10 seconds
        var refreshInterval = $interval(function(){
            init();
        }, 1800000);

        //invoke initialy
        init();

        $scope.$on('$destroy', function () { $interval.cancel(refreshInterval) })

    })


.controller('Links', function($scope, Links) {
        $scope.links = Links.all();
})

.controller('Settings', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})


.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
;

