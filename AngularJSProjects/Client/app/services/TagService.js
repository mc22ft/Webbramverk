/**
 * Created by MathiasClaesson on 2016-03-14.
 */
angular
    .module("clientApp")
    .factory('TagService', TagService); // register the recipe for teh service

TagService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

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
