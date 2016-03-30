/**
 * Created by MathiasClaesson on 2016-03-14.
 */
angular
    .module('clientApp')
    .controller("TagController", function(TagService, EventService, $scope, $rootScope) {
        var vm = this;

        //get all tags name
        var TagPromise = TagService.get();

        // then is called when the function delivers
        TagPromise
            .then(function(data){

                vm.tagList = data;
                vm.tags = [];
                $scope.selected = undefined;

                var EventPromise = EventService.get();
                EventPromise
                    .then(function(data){
                        vm.events = data;
                        var stringTags = "";
                        //loop out tags
                        for (var j=0; j < vm.events.length; j++) {
                            var event = vm.events[j].event;

                            for (var i=0; i < vm.tagList.length; i++) {
                                var tag = vm.tagList[i].tag;
                                var tagName = event.tags;
                                var t = tagName[0];

                                if(t.tag.name === tag.name){
                                    vm.tags.push(t.tag.name);
                                    //string
                                    var c = ", ";
                                    if(vm.tagList > 0){
                                        stringTags = t.tag.name;
                                    }else{
                                        stringTags += t.tag.name + c;
                                    }
                                }
                            }
                        }
                        stringTags = stringTags.substring(0, stringTags.length - 2);
                        console.log(stringTags);
                        vm.stringTag = stringTags;





                        //var self = this;
                        vm.simulateQuery = false;
                        vm.isDisabled    = false;
                        // list of `state` value/display objects
                        vm.states        = loadAll();
                        vm.querySearch   = querySearch;
                        vm.selectedItemChange = selectedItemChange;
                        vm.searchTextChange   = searchTextChange;
                        vm.newState = newState;
                        function newState(state) {
                            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
                        }
                        // ******************************
                        // Internal methods
                        // ******************************
                        /**
                         * Search for states... use $timeout to simulate
                         * remote dataservice call.
                         */
                        function querySearch (query) {
                            var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states,
                                deferred;
                            if (vm.simulateQuery) {
                                deferred = $q.defer();
                                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                                return deferred.promise;
                            } else {
                                return results;
                            }
                        }
                        function searchTextChange(text) {
                            console.log('Text changed to ' + text);
                            $scope.getTags(text);
                        }
                        function selectedItemChange(item) {
                            console.log('Item changed to ' + JSON.stringify(item));


                            $scope.getTags(item.value)
                        }
                        /**
                         * Build `states` list of key/value pairs
                         */
                        function loadAll() {
                            var allStates = vm.stringTag;
                                var f = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
                            return allStates.split(/, +/g).map( function (state) {
                                return {
                                    value: state.toLowerCase(),
                                    display: state
                                };
                            });
                        }
                        /**
                         * Create filter function for a query string
                         */
                        function createFilterFor(query) {

                            var lowercaseQuery = angular.lowercase(query);
                            return function filterFn(state) {
                                return (state.value.indexOf(lowercaseQuery) === 0);
                            };
                        }

                    })
                    .catch(function(data) {
                        var message = '<strong>Fel!</strong> ' + data.message + '.';
                        Flash.create('danger', message);
                    });


                $scope.states = vm.tags;




                $scope.getTags = function(value) {
                    for (var j=0; j < vm.tagList.length; j++) {

                        $scope.selected = value;

                        if (vm.tags[j] == $scope.selected) {

                            //get all tags off selected
                            var extension = '?tag_search=';
                            extension += $scope.selected

                            var EventPromise = EventService.get(extension);

                            EventPromise
                                .then(function(tagData){
                                    vm.tagsResult = tagData;

                                    var events = [];
                                    //loop all events to fit view better
                                    for (var j=0; j < vm.tagsResult.length; j++) {
                                        events.push(vm.tagsResult[j].event);
                                    }

                                    vm.searchTags = events;
                                    console.log(vm.searchTags);
                                    //call mapcontroller to set focus on marker
                                    $scope.go = function(res) {
                                        $rootScope.$emit("CallParentMethod", res);
                                    }
                                })
                                .catch(function(data) {
                                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                                    Flash.create('danger', message);
                                });
                        } else {
                            console.log('passar inte aoutocomlite');
                        }
                    }
                };
            })
            .catch(function(data) {
                var message = '<strong>Fel!</strong> ' + data.message + '.';
                Flash.create('danger', message);
            });
















        return vm;
    })
    .directive('myTag', function() {
        return {
            templateUrl: 'app/components/tag/tag.html'
        };
    });
