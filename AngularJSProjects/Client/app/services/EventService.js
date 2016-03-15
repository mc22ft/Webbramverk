/**
 * Created by MathiasClaesson on 2016-03-04.
 */
angular
    .module("clientApp")
    .factory('EventService', EventService); // register the recipe for teh service

// We need PlayerResource for calling the API
// localStorageService is an third part service for handling web storage
// LocalStorageConstants is some constants defined in app.js
// $q is an angular module for handling promises
// OBS! No need to do this row but I like to se all dependencies in a nice list
EventService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

    // we pretend we get this from an API :)
    // like a private property
    //var eventList = [
    //    {id: 1, name: "Harry Kane", age: 21, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/1"},
    //    {id: 2, name: "Lotta Schelin", age: 28, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/2"},
    //    {id: 3, name: "Hugo Loris", age: 27, selfurl:"http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/3" }
    //];

// Here is the definition of the service
function EventService(resourceService, localStorage, LS, $q) {
    var Event = resourceService('events');
    return {
        get:function(extension) {

            var items = null;
            //not get something then not is a base value
            if(extension == undefined){
                // check if we have it in localstorage - Pretty clumpsy handling but just for example
                items = localStorage.get(LS.eventsKey);
            }

            // Define a promise...this will be used later
            var deferred = $q.defer();

            // If we dont have stuff in localstorage we get it from the API (should maybe have som timestamp for stale problems)
            if(!items) {

                // make the call to the api - Get all returns a promise and success will be called if $http succeed
                Event.getCollection(extension).then(function(data){

                    //not save if it something else then base values
                    if(extension == undefined){
                        // set the data in LS
                        localStorage.set(LS.eventsKey, data);
                    }

                    // resolve the data to the caller - They have a promise and now we deliver the response
                    deferred.resolve(data);
                });
            }
            else {
                console.log("Getting all the events from the cache");
                // var deferred = $q.defer();
                deferred.resolve(items);
                //return deferred.promise;
            }
            // return the promise to the caller
            return deferred.promise;
        }
    };
}
