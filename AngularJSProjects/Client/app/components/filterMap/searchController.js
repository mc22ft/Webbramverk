/**
 * Created by MathiasClaesson on 2016-03-11.
 */
angular
    .module('clientApp')
    .controller("SearchController", function(EventService, $scope, $rootScope, NgMap) {
        var vm = this;

        $scope.data = {
            group1 : 'searchAll',
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

                vm.markers = [];
                //call mapcontroller to set focus on marker
                $scope.go = function(res) {
                    $rootScope.$emit("CallParentMethod", res);
                }


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

                }

                //vm.addMarker = function(event) {
                //    vm.positions = [];
                //    var ll = event.latLng;
                //    vm.positions.push({lat:ll.lat(), lng: ll.lng()});
                //}

                vm.showDetail = function(e, shop) {
                    vm.shop = shop;
                    vm.map.showInfoWindow('myInfoWindow', this);
                };















            })
            .catch(function(data) {
                var message = '<strong>Fel!</strong> ' + data.message + '.';
                Flash.create('danger', message);
            });
        return vm;
    })
    .directive('mySearch', function() {
        return {
            templateUrl: 'app/components/filterMap/search.html'
        };
    });