/**
 * Created by MathiasClaesson on 2016-03-11.
 */
angular
    .module('clientApp')
    .controller("SearchController", function(EventService, $scope, $rootScope) {
        var vm = this;

        //Get all
        var EventPromise = EventService.get();

        console.log('search');
        // then is called when the function delivers
        EventPromise
            .then(function(data){

                vm.eventList = data;

                var events = [];
                //loop all events to fit view better
                for (var j=0; j < vm.eventList.length; j++) {
                    events.push(vm.eventList[j].event);
                }

                vm.searchEvents = events;

                //call mapcontroller to set focus on marker
                $scope.go = function(res) {
                    $rootScope.$emit("CallParentMethod", res);
                }
            })
            .catch(function(error) {
                console.log("ERROR");
            });


        return vm;
    })
    .directive('mySearch', function() {
        return {
            templateUrl: 'app/components/filterMap/search.html'
        };
    });