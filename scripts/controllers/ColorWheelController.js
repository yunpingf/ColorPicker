angular.module('ColorWheel').controller('ColorWheelController', ['$scope', 'ColorWheelService', function($scope, ColorWheelService) {
    var canvas = $("#colorWheel");
    var leftOffset = canvas.offset().left;
    var topOffset = canvas.offset().top;
    $scope.mouseDown = false;
    $scope.choices = [
    	[{src: "1", value: constants.getMono()}, {src: "2", value: constants.getComple()}],
    	[{src: "3", value: constants.getSplit()}, {src: "4", value: constants.getDouble()}],
    	[{src: "5", value: constants.getAnalog()}, {src: "6", value: constants.getTriad()}]
    ];
    $scope.composeType = constants.getMono();
    $scope.mainR = 0;
    $scope.mainG = 0;
    $scope.mainB = 0;

    $scope.chooseComposeType = function(type) {
    	$scope.composeType = type;
    	ColorWheelService.setComposeType(type);
    };

    $scope.onMouseDown = function($event) {
    	$scope.mouseDown = true;
    	ColorWheelService.drawPointer($event.offsetX, $event.offsetY);
    };

    $scope.onMouseUp = function($event) {
    	$scope.mouseDown = false;
    };

    $scope.onMouseMove = function($event) {
    	if ($scope.mouseDown) {
    		//console.log($event.offsetX+ " "+canvas.offset().left+" "+canvas.width());
    		ColorWheelService.drawPointer($event.offsetX, $event.offsetY);
    	}
    };
}]);