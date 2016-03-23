/**
 * Created by MathiasClaesson on 2016-03-03.
 *
 *   $routeProvider not in use!!! Left code for future work...
 *   I have
 */

angular.module("clientApp", ['ngRoute', 'LocalStorageModule', 'ngMap', 'ui.bootstrap',
    'ngCookies', 'xeditable', 'ngFlash', 'ngAnimate']) // you must inject the ngRoute (included as a separate js-file)
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'app/components/login/userEvent/list.html',
                        controller: 'MapController',//this controller is merried to templateUrl
                        controllerAs: 'vm' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/map', {
                        templateUrl: 'app/components/map/map.html',
                        controller: 'mapController',
                        controllerAs: 'vm' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/event/:id', {
                        templateUrl: 'app/components/events/event_detail.html',
                        controller: 'EventDetailController',
                        controllerAs: 'event'
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
            'key': 'Token token="2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1"', // bad practice!? Key on client....
            'url': "http://localhost:3000/", // base url
            'format': 'application/json' // Default representation we want
        })
        .constant('LocalStorageConstants', {
            'eventKey' : 'event', // just some keys for sessionStorage-keys
            'eventsKey'   : 'events',
            'tagKey'   : 'tag',
            'tagsKey'   : 'tags'
        });