/**
 * Created by MathiasClaesson on 2016-03-08.
 */
angular
    .module('clientApp')
    .controller("MapController", function(NgMap, EventService) {
    // Using controllerAs so $scope is in this (save a ref in variable)
        var vm = this;
        var EventPromise = EventService.get();

        console.log("eventlistcontroller");
        // then is called when the function delivers
        EventPromise
            .then(function(data){
                // put the data om the viewModel - binding it to the view
                vm.eventList = data;


                var shops = [];
                //loop all events to fit view better
                for (var j=0; j < vm.eventList.length; j++) {
                    shops.push(vm.eventList[j].event);
                }

                vm.shops = shops;

                //GOOGLE MAP
                NgMap.getMap().then(function(map) {
                    console.log('map', map);
                    vm.map = map;
                });

                vm.clicked = function() {
                    alert('Clicked a link inside infoWindow');
                };

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


        //var bounds = new google.maps.LatLngBounds();
        //for (var i=0; i<vm.positions.length; i++) {
        //    var latlng = new google.maps.LatLng(vm.positions[i][0], vm.positions[i][1]);
        //    bounds.extend(latlng);
        //}

        //NgMap.getMap().then(function(map) {
        //    map.setCenter(bounds.getCenter());
        //    map.fitBounds(bounds);
        //});

    //});



    })
    .directive('myMap', function() {
        return {
            templateUrl: 'app/components/map/map.html'
        };
    });







