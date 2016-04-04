/**
 * Created by MathiasClaesson on 2016-03-11.
 *
 * Chuld be two controllers all and tag search but is was more jobb width the map
 *
 */
angular
    .module('clientApp')
    .controller("SearchController", function(EventService, TagService, $scope, $rootScope, NgMap) {
        var vm = this;
        $scope.isCollapsed = false;
        $scope.data = {
            group1 : 'searchAll',
        };

        vm.showDetail = function(e, shop) {
            vm.shop = shop;
            vm.map.showInfoWindow('myInfoWindow', this);
        };

        //Get all
        var EventPromise = EventService.get();

        // then is called when the function delivers
        EventPromise
            .then(function(data){

                vm.eventList = data;
                var events = [];

                NgMap.getMap({id:'searchMap'}).then(function(map) {
                    vm.map = map;
                });

                vm.positions = [];

                //loop all events to fit view better
                for (var j=0; j < vm.eventList.length; j++) {
                    events.push(vm.eventList[j].event);
                }

                vm.searchEvents = events;

                vm.addMarkerOnMap = function(res) {
                    vm.info = res;
                    vm.positions = [];
                    var bounds = new google.maps.LatLngBounds();
                    var latLng = new google.maps.LatLng(res.position.lat, res.position.long);
                    vm.positions.push({lat:latLng.lat(), lng: latLng.lng()});
                    bounds.extend(latLng);
                    vm.map.setCenter(bounds.getCenter());
                    vm.map.fitBounds(bounds);
                    vm.map.setZoom(12);
                    vm.map.showInfoWindow('myInfoWindow', latLng);
                }

            })
            .catch(function(data) {
                var message = '<strong>Fel!</strong> ' + data.message + '.';
                Flash.create('danger', message);
            });

        //get all tags name
        var TagPromise = TagService.get();

        // then is called when the function delivers
        TagPromise
            .then(function(data){

                vm.tagList = data;
                vm.tags = [];
                $scope.selected = undefined;
                var stringTags = "";
                var EventPromise = EventService.get();
                EventPromise
                    .then(function(data){
                        vm.events = data;

                        //loop out tags
                        for (var j=0; j < vm.events.length; j++) {
                            var event = vm.events[j].event;

                            for (var i=0; i < vm.tagList.length; i++) {
                                var tag = vm.tagList[i].tag;
                                var tagName = event.tags;
                                var t = tagName[0];

                                if(t.tag.name === tag.name){
                                    if (vm.tags.indexOf(tag.name) > -1) {
                                    }else{
                                        vm.tags.push(tag.name);

                                        var c = ", ";
                                        if(vm.tagList > 0){
                                            stringTags = t.tag.name;
                                        }else{
                                            stringTags += t.tag.name + c;
                                        }
                                    }
                                }
                            }
                        }
                        stringTags = stringTags.substring(0, stringTags.length - 2);
                        console.log(stringTags);
                        vm.stringTag = stringTags; //Drop down in tag search

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

                // TAG SEARCH

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
    });