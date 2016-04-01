/**
 * Created by MathiasClaesson on 2016-03-31.
 */
angular
    .module("clientApp")
    .controller("EventsController", EventsController);

// Dependency injections, routeParams give us the /:id
//EventsController.$inject = ['$routeParams', 'EventService'];

function EventsController($routeParams, EventService, $scope) {

    // Set the ViewModel
    var vm = this;

    // Calling our service - we get an promise back whitch will be resolved/rejected when the async phase is ready
    var eventPromise = EventService.getEvent($routeParams.id);

    eventPromise.then(function(data){
        // everything is good!
        // Update the ViewModel
        vm.details = data.event;
        //vm.age = data.age;
    }).catch(function(data){
        // Something went wrong!
        var message = '<strong>Fel!</strong> ' + data.message + '.';
        Flash.create('danger', message);
    })

    $scope.doTheBack = function() {
        window.history.back();
    };
}
