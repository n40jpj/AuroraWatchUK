// Ionic Starter App

angular.module('auroraWatchUK', ['ionic', 'auroraWatchUK.controllers', 'auroraWatchUK.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
          cache:false,
        templateUrl: 'templates/tab-home.html',
        controller: 'Home'
      }
    }
  })
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
          cache:false,
        templateUrl: 'templates/tab-dash.html',
        controller: 'Dash'
      }
    }
  })

  .state('tab.settings', {
      url: '/settings',
      views: {
          'tab-settings': {
              templateUrl: 'templates/tab-settings.html',
              controller: 'Settings'
          }
      }
  })

  .state('tab.links', {
      url: '/links',
      views: {
        'tab-links': {
          templateUrl: 'templates/tab-links.html',
          controller: 'Links'
        }
      }
    })
;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
