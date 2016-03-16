/**
 * Created by MathiasClaesson on 2016-03-15.
 */
angular
    .module('clientApp')
    .controller("UserEventsController", function(EventService, $scope, $rootScope, $cookies) {


        var vm = this;

        var EventPromise = EventService.get();

        // then is called when the function delivers
        EventPromise
            .then(function(data){

                vm.eventList = data;

                var events = [];
                //loop all events to fit view better
                for (var j=0; j < vm.eventList.length; j++) {
                    //by logged in user id
                    //creator_id

                    //var event = vm.eventList[j].event;
                    //var creator = event.creator;
                    //if(creator.id == $scope.creator_id){
                    //    events.push(vm.eventList[j].event);
                    //}
                    events.push(vm.eventList[j].event);
                }
                //add list to view
                vm.userEvents = events;

            })
            .catch(function(error) {
                console.log("ERROR");
            });

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

        }

        return vm;

    })
    .directive('myUserEvents', function() {
        return {
            templateUrl: 'app/components/login/userEvent/userEvents.html'
        };
    });