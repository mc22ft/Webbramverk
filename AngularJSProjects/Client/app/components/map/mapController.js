/** Created by MathiasClaesson on 2016-03-08...*/
angular
    .module('clientApp')
    .controller("MapController", function(NgMap, EventService, $scope, $rootScope) {
    // Using controllerAs so $scope is in this (save a ref in variable)
        var vm = this;
        vm.hideElement = true;

        //call from searchController
        $rootScope.$on("CallParentMethod", function(event, data){
            vm.hideElement = true;
            vm.infoToBox(data);
        });

        //Send info to view - right side of map
        vm.infoToBox = function(data) {
            vm.hideElement = false;
            $scope.infoWindow = data;
            //map.setZoom(8);
            //map.setCenter(marker.getPosition());
        }

        $scope.showInfoBox = function(){
            console.log("check something");
            if(vm.hideElement == false){
                return false;
            }
            return true;
        }



        var EventPromise = EventService.get();

        console.log("mapcontroller");
        // then is called when the function delivers
        EventPromise
            .then(function(data){
                // put the data om the viewModel - binding it to the view
                vm.eventList = data;

                var events = [];
                //loop all events to fit view better
                for (var j=0; j < vm.eventList.length; j++) {
                    events.push(vm.eventList[j].event);
                }

                vm.shops = events;

                // MAP MAP MAP

                //Fit bounds marker
                var bounds = new google.maps.LatLngBounds();
                for (var i=0; i < vm.shops.length; i++) {
                    var latlng = new google.maps.LatLng(vm.shops[i].position.lat, vm.shops[i].position.long);
                    bounds.extend(latlng);
                }

                NgMap.getMap().then(function(map) {
                    //console.log('map', map);
                    map.setCenter(bounds.getCenter());
                    map.fitBounds(bounds);
                    vm.map = map;
                });

                vm.showDetail = function(e, shop) {
                    vm.shop = shop;
                    vm.map.showInfoWindow('myInfoWindow', this);
                };

                vm.hideDetail = function() {
                    vm.map.hideInfoWindow('myInfoWindow');
                };

            })
            .catch(function(error) {
                console.log("ERROR");
            });

        return vm;


    // We must use this for hadling the map
    //$scope.$on('mapInitialized', function(evt, evtMap) {
        //map = evtMap;
        // Called from view when user clicked on map

        //vm.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        //vm.options = {scrollwheel: false};


        //vm.checkPosition = function(e) {
        //    console.log(e.latLng);
        //    // Create the marker
        //    var marker = new google.maps.Marker({position: e.latLng, map: map});
        //    map.panTo(e.latLng);
        //};



    //});



    })
    .directive('myMap', function() {
        return {
            templateUrl: 'app/components/map/map.html'
        };
    });







