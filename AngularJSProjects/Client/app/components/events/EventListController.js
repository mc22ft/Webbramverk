/**
 * Created by MathiasClaesson on 2016-03-04.
 */
angular
    .module("clientApp") // must match ng-app in HTML (this is the module - probobly same for whole application)
    .controller("EventListController", EventListController); // register our controller with name and "constructor" function

EventListController.$inject = ['EventService'];

// Also declare function
function EventListController(EventService) {

// Using controllerAs so $scope is in this (save a ref in variable)
    var vm = this;

    //call eventservise to det promise back
    //var EventPromise = EventService.get();
    console.log("eventlistcontroller");
    //EventPromise
    EventService.get(function(data){
            //put data in the viewmodel
            vm.eventList = data;
        });


    //vm.eventList = theEvents;
}

