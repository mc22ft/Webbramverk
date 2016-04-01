/**
 * Created by MathiasClaesson on 2016-03-03.
 *
 *   $routeProvider not in use!!! Left code for future work...
 *
 *   I have problem width $locationProvider: error all the time = not find map in root or Error: $location:nobase
 *   $location in HTML5 mode requires a <base> tag to be present!
 *   I have spend a lot of time to fix it? grr...
 */

angular.module("clientApp", ['ngRoute', 'LocalStorageModule', 'ngMap', 'ui.bootstrap',
    'ngCookies', 'xeditable', 'ngFlash', 'ngAnimate', 'ngMaterial']) // you must inject the ngRoute (included as a separate js-file)
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'app/components/map/map.html',
                        controller: 'MapController',//this controller is merried to templateUrl
                        controllerAs: 'vm' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/events', {
                        templateUrl: 'app/components/search/search.html',
                        controller: 'SearchController',
                        controllerAs: 'vm' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/event/:id', {
                        templateUrl: 'app/components/events/event-single.html',
                        controller: 'EventsController',
                        controllerAs: 'vm'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
                //$locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10

            }])
        .config(function (localStorageServiceProvider) {
            // The module give me some stuff to configure
            localStorageServiceProvider
                .setPrefix('Client')
                .setStorageType('sessionStorage')
                .setNotify(true, true)
        })
        .constant('APIConstant', { // here I also can declare constants
            'key': 'Token token="1fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1"', // bad practice!? Key on client....
            'url': "http://localhost:3000/", // base url
            'format': 'application/json' // Default representation we want
        })
        .constant('LocalStorageConstants', {
            'eventKey' : 'event', // just some keys for sessionStorage-keys
            'eventsKey'   : 'events',
            'tagKey'   : 'tag',
            'tagsKey'   : 'tags'
        });