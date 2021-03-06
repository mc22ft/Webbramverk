/** Created by MathiasClaesson on 2016-03-08...*/
angular
    .module('clientApp')
    .controller("MapController", function(NgMap, EventService, $scope, $rootScope) {
    // Using controllerAs so $scope is in this (save a ref in variable)
        var vm = this;
        vm.hideElement = true;

        //Send info to view - right side of map
        vm.infoToBox = function(data) {
            vm.hideElement = false;
            $scope.infoWindow = data;
        }

        $scope.showInfoBoxMainText = function(){
            if(vm.hideElement != false){
                return false;
            }
            return true;
        }

        $scope.showInfoBox = function(){
            if(vm.hideElement == false){
                return false;
            }
            return true;
        }

        vm.doMap = function(){
            var EventPromise = EventService.get();

            // then is called when the function delivers
            EventPromise
                .then(function(data){
                    // put the data om the viewModel - binding it to the view


                    //Do main map and rootscope is for update map from other controllers
                    $rootScope.doMainMap = function(data) {
                        if(data == null){
                            vm.doMap();
                        }
                        vm.eventList = data;

                        var events = [];
                        //loop all events to fit view better
                        for (var j = 0; j < vm.eventList.length; j++) {
                            events.push(vm.eventList[j].event);
                        }

                        vm.shops = events;

                        // MAP MAP MAP
                        //Fit bounds marker
                        var bounds = new google.maps.LatLngBounds();
                        for (var i = 0; i < vm.shops.length; i++) {
                            var latlng = new google.maps.LatLng(vm.shops[i].position.lat, vm.shops[i].position.long);
                            bounds.extend(latlng);
                        }

                        NgMap.getMap().then(function (map) {
                            //console.log('map', map);
                            map.setCenter(bounds.getCenter());
                            map.fitBounds(bounds);
                            vm.map = map;
                            vm.map.setZoom(12);
                        });

                    }
                    $rootScope.doMainMap(data);

                    vm.showDetail = function(e, shop) {
                        vm.shop = shop;
                        vm.map.showInfoWindow('myInfoWindow', this);
                    };

                    vm.hideDetail = function() {
                        vm.map.hideInfoWindow('myInfoWindow');
                    };
                })
                .catch(function(data) {
                    var message = '<strong>Fel!</strong> ' + data.message + '.';
                    Flash.create('danger', message);
                });
        }

        vm.doMap();
        return vm;
    });






