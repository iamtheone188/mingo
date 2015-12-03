// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tab.dash', {
      url: '/dash',
      cache: false,
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.dash-debug', {
      url: '/debug',
      cache: false,
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash-debug.html',
          controller: 'DebugCtrl'
        }
      }
    })

    .state('tab.mood', {
      url: '/mood',
      cache: false,
      views: {
        'tab-mood': {
          templateUrl: 'templates/tab-mood.html',
          controller: 'MoodCtrl'
        }
      }
    })

    .state('tab.mood-attraction', {
      url: '/mood/:moodId',
      cache: false,
      views: {
        'tab-mood': {
          templateUrl: 'templates/tab-mood-attraction.html',
          controller: 'AttCtrl'
        }
      }
    })

    .state('tab.mood-direction', {
      url: '/direction',
      cache: false,
      views: {
        'tab-mood': {
          templateUrl: 'templates/tab-mood-direction.html',
          controller: 'DirCtrl'
        }
      }
    })

    .state('tab.mood-day', {
      url: '/day',
      cache: false,
      views: {
        'tab-mood': {
          templateUrl: 'templates/tab-mood-day.html',
          controller: 'DayCtrl'
        }
      }
    })

    .state('tab.reminder', {
      url: '/reminder',
      cache: false,
      views: {
        'tab-reminder': {
          templateUrl: 'templates/tab-reminder.html',
          controller: 'ReminderCtrl'
        }
      }
    })

    .state('tab.reminder-add', {
      url: '/reminder-add',
      cache: false,
      views: {
        'tab-reminder': {
          templateUrl: 'templates/tab-reminder-add.html',
          controller: 'ReminderAddCtrl'
        }
      }
    })

  .state('tab.agent', {
    url: '/agent',
    cache: false,
    views: {
      'tab-agent': {
        templateUrl: 'templates/tab-agent.html',
        controller: 'AgentCtrl'
      }
    }
  })

  .state('tab.agent-where', {
    url: '/where',
    cache: false,
    views: {
      'tab-agent': {
        templateUrl: 'templates/tab-agent-where.html',
        controller: 'WhereCtrl'
      }
    }
  })

  .state('tab.agent-mustdo', {
    url: '/mustdo',
    cache: false,
    views: {
      'tab-agent': {
        templateUrl: 'templates/tab-agent-mustdo.html',
        controller: 'MustDoCtrl'
      }
    }
  })

  .state('tab.agent-addattraction', {
    url: '/addattraction',
    cache: false,
    views: {
      'tab-agent': {
        templateUrl: 'templates/tab-agent-addattraction.html',
        controller: 'AddAttractionCtrl'
      }
    }
  })

  .state('tab.agent-details', {
    url: '/details/:attId',
    cache: false,
    views: {
      'tab-agent': {
        templateUrl: 'templates/tab-agent-details.html',
        controller: 'DetailsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
