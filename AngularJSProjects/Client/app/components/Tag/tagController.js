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

                var _selected;
                $scope.selected = undefined;

                var tags = [];
                //loop all events to fit view better
                for (var j=0; j < vm.tagList.length; j++) {
                    var tag = vm.tagList[j].tag
                    tags.push(tag.name);
                }

                $scope.states = tags;

                $scope.getTags = function() {
                    for (var j=0; j < vm.tagList.length; j++) {

                        if (tags[j] == $scope.selected) {

                            //get all tags off selected
                            var extension = '?tag_search=';
                            extension += $scope.selected
                            var TagsPromise = EventService.get(extension);

                            TagsPromise
                                .then(function(tagData){
                                    vm.tagsResult = tagData;

                                    var events = [];
                                    //loop all events to fit view better
                                    for (var j=0; j < vm.tagsResult.length; j++) {
                                        events.push(vm.tagsResult[j].event);
                                    }

                                    vm.searchTags = events;

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
