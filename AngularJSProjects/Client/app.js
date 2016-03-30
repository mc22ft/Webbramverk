/**
 * Created by MathiasClaesson on 2016-03-03.
 *
 *   $routeProvider not in use!!! Left code for future work...
 *   I have
 */

angular.module("clientApp", ['ngRoute', 'LocalStorageModule', 'ngMap', 'ui.bootstrap',
    'ngCookies', 'xeditable', 'ngFlash', 'ngAnimate', 'ngMaterial']) // you must inject the ngRoute (included as a separate js-file)
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/ghfh', {
                        templateUrl: '/',
                    //controller: '',this controller is merried to templateUrl
                    //controllerAs: ''  events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/events', {
                        templateUrl: 'app/components/filterMap/search.html',
                        controller: 'SearchController',
                        controllerAs: 'vm' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/tags', {
                        templateUrl: 'app/components/tag/tag.html',
                        controller: 'TagController',
                        controllerAs: 'vm' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/event/:id', {
                        templateUrl: 'app/components/test/test.html',
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