/**
 * Created by MathiasClaesson on 2016-04-01.
 */
/**
 * Created by MathiasClaesson on 2016-03-14.
 */
angular
    .module("clientApp")
    .factory('UserService', UserService); // register the recipe for teh service

UserService.$inject = ['ResourceService', '$q'];

// Here is the definition of the service
function UserService(resourceService, $q) {
    var User = resourceService('creator');
    return {
        get:function(inData) {
            // Create a promise
            var deferred = $q.defer();

            var promise = User.login(inData).then(function(data) {

                // resolve the data to the caller
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };
}
