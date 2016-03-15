/**
 * Created by MathiasClaesson on 2016-03-03.
 */
angular.module("clientApp", ['ngRoute', 'LocalStorageModule', 'ngMap', 'ui.bootstrap', 'ngCookies']) // you must inject the ngRoute (included as a separate js-file)
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'app/components/map/map.html',
                        //this controller is merried to templateUrl
                        //controller: '',
                    }).
                    when('/events', {
                        templateUrl: 'app/components/events/event_list.html',
                        controller: 'EventListController',
                        controllerAs: 'events' // events could be seen as an instance of the controller, use it in the view!
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