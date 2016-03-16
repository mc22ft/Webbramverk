/**
 * Created by MathiasClaesson on 2016-03-15.
 */
angular
    .module('clientApp')
    .controller("UserEventsController", function(EventService, $scope, $filter, $rootScope, $cookies) {


        var vm = this;
        vm.showForm = false;
        vm.showUpdateForm = false;

        var EventPromise = EventService.get();
        // then is called when the function delivers
        EventPromise
            .then(function(data){

                vm.eventList = data;

                var events = [];
                //loop all events to fit view better
                for (var j=0; j < vm.eventList.length; j++) {

                    events.push(vm.eventList[j].event);
                }
                //add list to view
                vm.userEvents = events;

            })
            .catch(function(error) {
                console.log("ERROR");
            });


        //function that get one event by id
        $scope.show = function(res) {
            var id = res.id;

            var EventPromise = EventService.getEvent(id);

            // then is called when the function delivers
            EventPromise
                .then(function(data){

                    //event to view
                    $scope.showEvent = data.event;
                })
                .catch(function(error) {
                    console.log("ERROR");
                });
        }//end show function


        //function that get one event by id
        $scope.addEvent = function() {
            vm.showForm = true;

            $scope.toJSON = function(obj) {
                return JSON.stringify(obj, null, 2);
            };

            $scope.getCssClasses = function(ngModelController) {
                return {
                    error: ngModelController.$invalid && ngModelController.$dirty,
                    success: ngModelController.$valid && ngModelController.$dirty
                };
            };

            $scope.showError = function(ngModelController, error) {
                return ngModelController.$error[error];
            };



        }//end addEvent function

        //function that save new event
        $scope.saveNewEvent = function(form) {

            var event = {
                    "name": form.name,
                    "description": form.description,
                        "long": "18.06858",
                        "lat": "59.32932",
                        "tag": form.tag
            };
            //send save
            var EventPromise = EventService.saveEvent(event, 'POST');
            // then is called when the function delivers
            EventPromise
                .then(function(data){

                    var e = data;

                })
                .catch(function(error) {
                    console.log("ERROR");
                });

        }//end saveEvent function

        //function that update
        $scope.updateEvent = function(res) {
            vm.showUpdateForm = true;

            var id = res.id;

            var EventPromise = EventService.getEvent(id);

            // then is called when the function delivers
            EventPromise
                .then(function(data){

                    var event = data.event;
                    var tag = event.tags;

                    $scope.event = {
                        name: event.name,
                        description: event.description,
                        tag: tag[0].tag.name,
                    };


                    $scope.checkName = function(data) {
                        if (data !== 'awesome' && data !== 'error') {
                            return "Username should be `awesome` or `error`";
                        }
                    };

                    $scope.saveEvent = function(form) {

                        var position = event.position;

                        var sendEvent = {
                            "name": form.name,
                            "description": form.description,
                            "long": position.long,
                            "lat": position.lat,
                            "tag": form.tag
                        };
                        //send save
                        var EventPromise = EventService.saveEvent(sendEvent, 'PUT', event.id);
                        // then is called when the function delivers
                        EventPromise
                            .then(function(data){

                                var e = data;

                            })
                            .catch(function(error) {
                                console.log("ERROR");
                            });
                    };



                    //event to view
                    $scope.showEvent = data.event;
                })
                .catch(function(error) {
                    console.log("ERROR");
                });
        }//end updateEvent function



        return vm;

    })
    .directive('myUserEvents', function() {
        return {
            templateUrl: 'app/components/login/userEvent/userEvents.html'
        };
    });