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
    $scope.mainColor = {r:"255", g:"255", b:"255"};
    $scope.mainColorHex = "#FFFFFF";

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

    $scope.invalidRGB = function(rgb) {
    	if (parseInt(rgb) != NaN && rgb >= 0 && rgb <= 255)
    		return false;
    	else 
    		return true;
    };


    $scope.updateMain = function(pos) { // when the input value is changed
    	if (!$scope.invalidRGB($scope.mainColor[pos])) {
    		if ($scope.mainColor[pos] == "") {
    			var checkColor = {};
    			checkColor.r = $scope.mainColor.r;
    			checkColor.g = $scope.mainColor.g;
    			checkColor.b = $scope.mainColor.b;
    			checkColor[pos] = "0";
    		}
    		else {
    			$scope.mainColorHex = ColorWheelService.rgbToHex($scope.mainColor);
    		}
    	}
    };
}]);