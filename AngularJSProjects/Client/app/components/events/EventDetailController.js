/**
 * Created by MathiasClaesson on 2016-03-04.
 */
angular
    .module("clientApp")
    .controller("EventDetailController", EventDetailController);

// Dependency injections, routeParams give us the /:id
EventDetailController.$inject = ['$routeParams', 'EventService'];

function EventDetailController($routeParams, eventService) {

    // Set the ViewModel
    var vm = this;

    // Calling our service
    var theEvent = eventService.getEvents($routeParams.id);

    // Update the ViewModel
    vm.name = theEvent.name;
    vm.age = theEvent.age;
}