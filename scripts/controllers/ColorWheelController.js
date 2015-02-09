angular.module('ColorWheel').controller('ColorWheelController', ['$scope', 'ColorWheelService', function($scope, ColorWheelService) {
    var canvas = $("#colorWheel");
    var leftOffset = canvas.offset().left;
    var topOffset = canvas.offset().top;
    $scope.spice = 'very';
    $scope.choices = [
    	[{src: "1", value: constants.getMono()}, {src: "2", value: constants.getComple()}],
    	[{src: "3", value: constants.getSplit()}, {src: "4", value: constants.getDouble()}],
    	[{src: "5", value: constants.getAnalog()}, {src: "6", value: constants.getTriad()}]
    ];

    $scope.chooseComposeType = function(type) {
    	ColorWheelService.setComposeType(type);
    };
    $scope.onMouseMove = function($event) {
    	console.log($event.offsetX+ " "+canvas.offset().left+" "+canvas.width());
    	ColorWheelService.consoleLog();
    };

    $scope.chiliSpicy = function() {
        $scope.spice = 'chili';
    };

    $scope.jalapenoSpicy = function() {
        $scope.spice = 'jalapeño';
    };
}]);