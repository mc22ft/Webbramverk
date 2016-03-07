/**
 * Created by MathiasClaesson on 2016-03-03.
 */
angular.module("clientApp", ['ngRoute', 'LocalStorageModule']) // you must inject the ngRoute (included as a separate js-file)
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'components/home/map.html',
                        //this controller is merried to templateUrl
                        //controller: '',
                    }).
                    when('/events', {
                        templateUrl: 'components/events/event_list.html',
                        controller: 'EventListController',
                        controllerAs: 'events' // events could be seen as an instance of the controller, use it in the view!
                    }).
                    when('/event/:id', {
                        templateUrl: 'components/events/event_detail.html',
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
            'key': "sdkjalsdjlasjdlkajsdljs", // bad practice!? Key on client....
            'url': "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/", // base url
            'format': 'application/json' // Default representation we want
        })
        .constant('LocalStorageConstants', {
            'playersKey' : 'p', // just some keys for sessionStorage-keys
            'teamsKey'   : 't'
        });