/**
 * Created by MathiasClaesson on 2016-03-07.
 */
/**
 This is responsible of the calls to the API
 We could try to build it så every REST resource fits in it
 teams, players, whatever
 Should have all the CRUD stuff
 */
angular
    .module("clientApp")
    .factory('ResourceService', ResourceService); // register the recipe for the service

// We inject the http (for AJAX-handling) and the API
ResourceService.$inject = ['$http', 'APIConstant', '$cookies'];

function ResourceService($http, APIConstant, $cookies) {

    // Returns the Service - Get the collectionName as parameter
    return function (collectionName) {

        // Creates a intern Resource-object that is filled with data (depending on what the server gets us)
        var Resource = function(data) {
            // Configuerar objectet enligt den data som kommer in - Allt är json
            angular.extend(this, data);
        };

        // Get all players from the API
        Resource.getCollection = function(extensionURL) {
            //remove all after ? in url - clean from old data
            var s = collectionName;
            var n = s.indexOf('?');
            collectionName = s.substring(0, n != -1 ? n : s.length);

            if(extensionURL == undefined){
                //no extension
            }else{
                collectionName += extensionURL;
            }

            // Ordinaiery http-call
            var req = {
                method: 'GET',
                url: APIConstant.url +collectionName, // this is the entry point in my example
                headers: {
                    'Accept': APIConstant.format,
                    "Authorization" : APIConstant.key
                }
            };
            // This returns a promise which will be fullfilled when the response is back
            return $http(req).then(function(response) {
                var result = [];
                // Building up an array with resource objects that will be returned
                angular.forEach(response.data, function(value, key) {
                    result[key] = new Resource(value);
                });
                // This is return when we get data
                return result;
            });
        };

        Resource.getSingle = function(resource, resourceInfo) {
            var url;
            // OK this is maybe a clumpsy way to do this and shows a problem with REST and HATEOAS
            // are we using the url provided by the call- The HATEOAS way
            if(resourceInfo.hasOwnProperty('url')) {
                url = resourceInfo.url;
            }
            else if(resourceInfo.hasOwnProperty('instanceName') && resourceInfo.hasOwnProperty('id')) { // or we using a fall back (item => is an id)
                url = APIConstant.url +resourceInfo.instanceName +"/" +resourceInfo.id
            }
            else {
                return false;
            }

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Accept': APIConstant.format,
                    "Authorization" : APIConstant.key
                },
                params: {
                    'limit': '50'
                }
            };
            // return the promise
            return $http(req).success(function(response) {
                // This eluvated as resolve/reject depending on the status code.
                return response;
            });
        };

        Resource.save = function(collectionName, data, method, id) {
            var jsonKey = 'Bearer ' +$cookies.get("key");

            if(id != undefined){
                collectionName = collectionName+'/'+id;
            }

            var req = {
                method: method,
                url: APIConstant.url +collectionName, // this is the entry point in my example
                headers: {
                        'Accept': APIConstant.format,
                        'Authorization' : jsonKey
                        },
                data : { "event":
                            {
                                "name": data.name,
                                "description": data.description,
                                "position": {
                                    "long": data.long,
                                    "lat": data.lat
                                },
                                "tag": {
                                    "name": data.tag
                                }
                            }
                        }
                    };

                    return $http(req).then(function(response){
                        return new Resource(response.data);
                    });
        };

        Resource.delete = function(collectionName, id) {
            var jsonKey = 'Bearer ' +$cookies.get("key");
            collectionName = collectionName+'/'+id;

            var req = {
                method: 'DELETE',
                url: APIConstant.url +collectionName, // this is the entry point in my example
                headers: {
                    'Accept': APIConstant.format,
                    'Authorization' : jsonKey
                }
            };

            return $http(req).then(function(response){
                return new Resource(response.data);
            });
        };

        //login in url GET
        Resource.login = function(data) {
            var url = "creator/login?email=" + data.email + "&password=" + data.password;

            var req = {
                method: 'GET',
                url: APIConstant.url +url, // this is the entry point in my example
                headers: {
                    "Accept" : APIConstant.format
                }
            };

            return $http(req).then(function(response){
                return new Resource(response.data);
            });
        };

        return Resource;
    }

};

