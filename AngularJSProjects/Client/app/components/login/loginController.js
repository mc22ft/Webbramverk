/**
 * Created by MathiasClaesson on 2016-03-15.
 */
angular
    .module('clientApp')
.controller("LoginController", function(UserService, $http, $scope, $rootScope, $cookies, $location, $route, localStorageService, LocalStorageConstants) {

        $scope.showModal = false;
        $scope.login = function(){
            $scope.showModal = !$scope.showModal;
        };

        $scope.logout = function() {
            $rootScope.isLoggedIn = false;
            var items;
            items = localStorageService.get(LocalStorageConstants.eventsKey);
            $rootScope.doMainMap(items);
        }

        var vm = this;

        // I'm lazy! neo@mail.com&password=111111
        vm.email = "neo@mail.com";
        vm.password = "111111";

        // Using the rootScope so every controller can access this. Be carefull when using this
        $rootScope.isLoggedIn = false;

        // When user clicks the login button
        vm.login = function() {
            $scope.showModal = false;

            // create a packet of the users (written) credatial
            var data = {'email' : vm.email, 'password': vm.password};

//----->
            //send in email and password and get json token back
            var UserPromise = UserService.get(data);

            // then is called when the function delivers
            UserPromise
                .then(function(data){

                    //If we succeeded we got a token - can be used to autenticate us
                    $rootScope.token = data.auth_token;
                    $rootScope.creator_id = data.creator_id;
                    $rootScope.isLoggedIn = true;
                    //set cookie
                    $cookies.put("key", $rootScope.token);


                })
                .catch(function(data) {
                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                    Flash.create('danger', message);
                });


            // create a packet of the users (written) credatial
            //var data = {'email' : vm.email, 'password': vm.password};

            // Here is the url to my API-autentication entry - Send a POST with user credentials and get a JWT back
            //http://localhost:3000/creator/login?email=neo@mail.com&password=111111

            //var url = "http://localhost:3000/creator/login?email=neo@mail.com&password=111111";
            //var config = {
            //    headers: {
            //        "X-APIkey" : "lksjadjas87dasidas9djööksaödaö",
            //        "Accept" : "application/json"
            //    }
            //}
            // So we create a HTTP POST with the data
            //var promise = $http.get(url);
            // I take care of it in same controller...
            //promise.success(function(data, status, headers, config) {

                //If we succeeded we got a token - can be used to autenticate us
            //    $rootScope.token = data.auth_token;
            //   $rootScope.creator_id = data.creator_id;
            //   $rootScope.isLoggedIn = true;
            //    //set cookie
            //    $cookies.put("key", $rootScope.token);

            //});
            // Something went wrong...
            //promise.error(function(data, status, headers, config) {
            //    console.log(data);
            //    console.log(status);
            //    console.log(config)
            //    $rootScope.token = "No way, Jose!: " +data.error;
            //    $rootScope.isLoggedIn = false;
            //});

        };
    })
    .directive('myLogin', function() {
        return {
            templateUrl: 'app/components/login/login.html'
        };
    })
    .directive('modal', function () {
        return {

            //build html
            template:
                    '<div class="modal fade">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '<h4 class="modal-title">{{ title }}</h4>' +
                    '</div>' +
                    '<div class="modal-body" ng-transclude></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;

                    });
                });
            }
        };
});