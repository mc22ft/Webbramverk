/**
 * Created by MathiasClaesson on 2016-03-14.
 */
angular
    .module("clientApp")
    .factory('TagService', TagService); // register the recipe for teh service

// We need PlayerResource for calling the API
// localStorageService is an third part service for handling web storage
// LocalStorageConstants is some constants defined in app.js
// $q is an angular module for handling promises
// OBS! No need to do this row but I like to se all dependencies in a nice list
TagService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

// we pretend we get this from an API :)
// like a private property
//var eventList = [
//    {id: 1, name: "Harry Kane", age: 21, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/1"},
//    {id: 2, name: "Lotta Schelin", age: 28, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/2"},
//    {id: 3, name: "Hugo Loris", age: 27, selfurl:"http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/3" }
//];

// Here is the definition of the service
function TagService(resourceService, localStorage, LS, $q) {
    var Tag = resourceService('tags');
    return {
        get:function(extension) {
            // check if we have it in localstorage - Pretty clumpsy handling but just for example
            var items = localStorage.get(LS.tagsKey);

            // Define a promise...this will be used later
            var deferred = $q.defer();

            // If we dont have stuff in localstorage we get it from the API (should maybe have som timestamp for stale problems)
            if(!items) {

                // make the call to the api - Get all returns a promise and success will be called if $http succeed
                Tag.getCollection(extension).then(function(data){

                    // set the data in LS
                    localStorage.set(LS.tagsKey, data);

                    // resolve the data to the caller - They have a promise and now we deliver the response
                    deferred.resolve(data);
                });
            }
            else {
                console.log("Getting all the tags from the cache");
                // var deferred = $q.defer();
                deferred.resolve(items);
                //return deferred.promise;
            }
            // return the promise to the caller
            return deferred.promise;
        }
    };
}
