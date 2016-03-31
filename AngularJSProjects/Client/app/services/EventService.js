/**
 * Created by MathiasClaesson on 2016-03-04.
 */
angular
    .module("clientApp")
    .factory('EventService', EventService); // register the recipe for teh service

EventService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];


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
        },

        // This gets an single player
        getEvent:function(id) {
            // get the specific player in sessionStorage (we have save all in a bigg array)
            var items = localStorage.get(LS.eventsKey);
            var item = false;

            // Create a promise
            var deferred = $q.defer();

            var obj = {'instanceName' : 'events', 'id' : id};

            // check if we have the one with the id in web storage
            if(items) {
                items.forEach(function(object, index){
                    var objEvent = object.event;
                    if(objEvent.id === id) {
                        item = objEvent; // update item and return
                        return true;
                    }
                });
            }else {
                //get all items
            }

            // If we dont have stuff in localstorage we get it
            var promise;
            // We have the item and kan use the HATEOAS, namely the url in the item-object (the players direct url)
            if(item) {
                console.log(item);
                // make the call to the api with the item -> will use the url in the object
                promise = Event.getSingle('url', item);
            }
            else {
                // we trying to get a player but dont have the url - maybe bookmarked in a browser?
                // ignore HATEOAS...it may work if the api is persistant with the url /players/:id

                promise = Event.getSingle('events', obj);
            }
            // When the call has been made and everything is good (indepentet from how we call the API)
            promise.success(function(data){

                // set the single player in the LS (could have a lot more information than the representation in the list)
                var localStorageKey = LS.eventsKey +"." +data.id
                localStorage.set(localStorageKey, data);

                // resolve the data to the caller
                deferred.resolve(data);

            }).catch(function(){
                // If something went wrong we have to reject the promise (the caller will catch an error)
                deferred.reject("Something went wrong with the call");
            });

            // return the promise to the caller (this is returned before we got data - async)
            return deferred.promise;
        },
        saveEvent:function(data, method, id) {
            // Create a promise
            var deferred = $q.defer();

            var promise = Event.save('events', data, method, id).then(function(data) {
                console.log(data);
                localStorage.remove(LS.eventsKey);
                // resolve the data to the caller
                deferred.resolve(data);
            });
            return deferred.promise;
        },
        deleteEvent:function(id) {
            // Create a promise
            var deferred = $q.defer();


            var promise = Event.delete('events', id).then(function(data) {
                console.log(data);
                localStorage.remove(LS.eventsKey);

                // resolve the data to the caller
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };
}
