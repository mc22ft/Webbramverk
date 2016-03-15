/**
 * Created by MathiasClaesson on 2016-03-15.
 */
angular
    .module('clientApp')
    .controller("LoginController", function($http, $scope, $rootScope, $cookies) {
        var vm = this;

        // I'm lazy!
        vm.email = "john.haggerud@lnu.se";

        // Using the rootScope so every controller can access this. Be carefull when using this
        $rootScope.isLoggedIn = false;

        // When user clicks the login button
        vm.login = function() {
            // create a packet of the users (written) credatial
            var data = {'email' : vm.email, 'password': vm.password};

            // Here is the url to my API-autentication entry - Send a POST with user credentials and get a JWT back
            //http://localhost:3000/creator/login?email=neo@mail.com&password=111111

            var url = "http://localhost:3000/creator/login?email=neo@mail.com&password=111111";
            var config = {
                headers: {
                    "X-APIkey" : "lksjadjas87dasidas9djööksaödaö",
                    "Accept" : "application/json"
                }
            }
            // So we create a HTTP POST with the data
            var promise = $http.get(url);
            // I take care of it in same controller...
            promise.success(function(data, status, headers, config) {
                // Just check what we get back
                console.log(data);
                console.log(status);
                console.log(config)

                // if we succeeded we got a token - can be used to autenticate us
                $rootScope.token = data.auth_token.substring(0, 20) +"...";
                $rootScope.isLoggedIn = true;
                //set cookie
                $cookies.put("key", $rootScope.token);
                var value = $cookies.get("key");
                console.log(value);
            });
            // Something went wrong...
            promise.error(function(data, status, headers, config) {
                console.log(data);
                console.log(status);
                console.log(config)
                $rootScope.token = "No way, Jose!: " +data.error;
                $rootScope.isLoggedIn = false;
            });

        };
    })
    .directive('myLogin', function() {
        return {
            templateUrl: 'app/components/login/login.html'
        };
    });