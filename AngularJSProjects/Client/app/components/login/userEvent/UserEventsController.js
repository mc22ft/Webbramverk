/**
 * Created by MathiasClaesson on 2016-03-15.
 *
 * Handle login views
 */

angular
    .module('clientApp')
    .controller("UserEventsController", function(EventService, NgMap, $scope,
                                                 $filter, $rootScope, $cookies,
                                                 Flash, $timeout) {

        var vm = this;
        vm.markersArray = [];
        vm.showNewForm = false;
        vm.showList = true;
        vm.showUpdateForm = false;
        vm.showEventItem = false;


        vm.loadData = function () {
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
                .catch(function(data) {
                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                    Flash.create('danger', message);
                });
        }
        vm.loadData();

        //function that get one event by id
        $scope.show = function(res) {
            vm.showEventItem = true;
            vm.showUpdateForm = false;
            var id = res.id;

            var EventPromise = EventService.getEvent(id);

            // then is called when the function delivers
            EventPromise
                .then(function(data){

                    //event to view
                    $scope.showEvent = data.event;
                })
                .catch(function(data) {
                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                    Flash.create('danger', message);
                });
        }//end show function


        //function that get one event by id
        $scope.addEvent = function() {
            vm.showEventItem = false;
            vm.showNewForm = true;
            vm.showUpdateForm = false;
            vm.showList = false;

            function clearOverlays() {
                if (vm.markersArray) {
                    for (i in vm.markersArray) {
                        vm.markersArray[i].setMap(null);
                    }
                }
            }

            NgMap.getMap({id:'foomap'}).then(function(map) {
                vm.map = map;
            });

            $timeout(function(){
                var center = vm.map.getCenter();
                google.maps.event.trigger(vm.map, 'resize');
                vm.map.setCenter(center);
                vm.map.setZoom(12);
            },100);

            vm.checkPosition = function(e) {
                clearOverlays();
                //map jump at click try to fix? Error to set markersArray in panTo?
                var marker = new google.maps.Marker({position: e.latLng, map: vm.map});
                vm.markersArray.push(marker);
                vm.map.panTo(e.latLng);

                vm.viewLng = e.latLng.lng();
                vm.viewLat = e.latLng.lat();
            }

            $scope.removeAddEvent = function() {
                vm.showList = true;
                vm.showForm = false;
                vm.showNewForm = false;
                vm.loadData();
            };

        }//end addEvent function

        //function that save new event
        $scope.saveNewEvent = function(form) {
            if (form.name != undefined && form.description != undefined && form.tag != undefined ){

               if(vm.viewLng != undefined){

                    var event = {
                            "name": form.name,
                            "description": form.description,
                                "long": vm.viewLng,
                                "lat": vm.viewLat,
                                "tag": form.tag
                    };

                    //send save
                    var EventPromise = EventService.saveEvent(event, 'POST');
                    // then is called when the function delivers
                    EventPromise
                        .then(function(data){
                            vm.showNewForm = false;
                            vm.showList = true;
                            vm.loadData();
                            //$rootScope.doMap();

                            var form = document.getElementById("newForm");
                            form.reset();

                            var message = '<strong>Klart!</strong> Du har skapat ett nytt event.';
                            Flash.create('success', message);
                        })
                        .catch(function(data) {
                            var message = '<strong>Fel!</strong> ' + data.message + '.';
                            Flash.create('danger', message);
                        });
                    }else{
                    //error message set marker on map
                    var message = '<strong>Oups!</strong> Du måste sätta en markering på kartan.';
                    Flash.create('warning', message);
                }
            };

        }//end saveEvent function

            //function that update
        $scope.updateEvent = function(res) {
            vm.showUpdateForm = true;
            vm.showEventItem = false;

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
                        id: event.id,
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

                                var message = '<strong>Klart!</strong>Du har updaterat ett event.';
                                Flash.create('success', message);

                            })
                            .catch(function(data) {
                                var message = '<strong>Fel!</strong> ' + data.message + '.';
                                Flash.create('danger', message);
                            });
                        //update events
                        vm.loadData();

                         };

                    //event to view
                    $scope.showEvent = data.event;

                })
                .catch(function(data) {
                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                    Flash.create('danger', message);
                });
        }//end updateEvent function

        //function that delete
        $scope.deleteEvent = function(id) {

            var EventPromise = EventService.deleteEvent(id);
            // then is called when the function delivers
            EventPromise
                .then(function(data){
                    vm.showNewForm = false;
                    vm.showList = true;
                    vm.showUpdateForm = false;
                    vm.showEventItem = false;

                    //update events
                    vm.loadData();

                    var message = '<strong>Klart!</strong> ' + data.message + '.';
                    Flash.create('success', message);
                })
                .catch(function(data) {
                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                    Flash.create('danger', message);
                });


        }//end deleteEvent function

        return vm;
    })
    .directive('myUserEvents', function() {
        return {
            templateUrl: 'app/components/login/userEvent/userEvents.html'
        };
    });