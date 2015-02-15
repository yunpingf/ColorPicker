angular.module('ColorWheel').controller('ColorWheelController', ['$scope', 'ColorWheelService', function($scope, ColorWheelService) {
    var canvas = $("#colorWheel");
    var leftOffset = canvas.offset().left;
    var topOffset = canvas.offset().top;
    $scope.mouseDown = {main:false, first:false, second:false, third:false};
    $scope.choices = [
    	[{src: "1", value: constants.getMono()}, {src: "2", value: constants.getComple()}],
    	[{src: "3", value: constants.getSplit()}, {src: "4", value: constants.getDouble()}],
    	[{src: "5", value: constants.getAnalog()}, {src: "6", value: constants.getTriad()}]
    ];
    $scope.composeType = constants.getMono();
    $scope.mainColor = {x: canvas.width()/2.0, y: canvas.height()/2.0, r:"255", g:"255", b:"255", v:"100", "hex":"#FFFFFF"};
    $scope.thirdColor = {x: canvas.width()/2, y: canvas.height()/2, r:"255", g:"255", b:"255", v:"100", "hex":"#FFFFFF"};
    $scope.secondColor = { x: canvas.width()/2, y: canvas.height()/2,r:"255", g:"255", b:"255", v:"100", "hex":"#FFFFFF"};
    $scope.firstColor = {x: canvas.width()/2, y: canvas.height()/2, r:"255", g:"255", b:"255", v:"100", "hex":"#FFFFFF"};

    $scope.colorShown = constants.getOne();

    function setColorShown(val) {
    	$scope.colorShown = val;
    }
    $scope.chooseComposeType = function(type) {
    	$scope.composeType = type;
    	ColorWheelService.setComposeType(type);
    	if (type == constants.getMono() || type == constants.getComple())
    		setColorShown(constants.getOne());
    	else if (type == constants.getSplit() || type == constants.getAnalog()
    		|| type == constants.getTriad())
    		setColorShown(constants.getTwo());
    	else if (type == constants.getDouble())
    		setColorShown(constants.getThree());
    };

    $scope.onMouseDown = function(pos, $event) {
    	ColorWheelService.cacheCenterR();
        $scope.mouseDown[pos] = true;
    };
    $scope.onMouseUp = function($event) {
    	$scope.mouseDown.main = false;
        $scope.mouseDown.first = false;
        $scope.mouseDown.second = false;
        $scope.mouseDown.third = false;
    };

    $scope.onMouseMove = function($event) {
    	if (($scope.mouseDown.main || $scope.mouseDown.first || $scope.mouseDown.second || $scope.mouseDown.third) 
            && (ColorWheelService.withinRange($event.offsetX, $event.offsetY))) {
            var color;
            if ($scope.mouseDown.main) color = $scope.mainColor;
            else if ($scope.mouseDown.first) color = $scope.firstColor;
            else if ($scope.mouseDown.second) color = $scope.secondColor;
            else if ($scope.mouseDown.third) color = $scope.thirdColor;

    		color.x = $event.offsetX;
            color.y = $event.offsetY;

    		var tmp = ColorWheelService.getMainColor($event.offsetX, $event.offsetY);
    		color.r = Math.floor(tmp.r);
    		color.g = Math.floor(tmp.g);
    		color.b = Math.floor(tmp.b);
            color.h = tmp.h;
            color.s = tmp.s;
    		color.hex = ColorWheelService.rgbToHex(color);
    	}
    	//else {
    		//outmost
    		//ColorWheelService.drawPointer($event.offsetX, $event.offsetY);
    	//}
    };

    $scope.invalidRGB = function(rgb) {
    	if (parseInt(rgb) != NaN && rgb >= 0 && rgb <= 255)
    		return false;
    	else 
    		return true;
    };

    $scope.updateColorInput = function(index, pos) { // when the input value is changed
        var color;
        if (index == 0) color = $scope.mainColor;
        else if (index == 1) color = $scope.firstColor;
        else if (index == 2) color = $scope.secondColor;
        else if (index == 3) color = $scope.thirdColor;

    	if (!$scope.invalidRGB(color[pos])) {
    		if (color[pos] == "") {
    			var checkColor = {};
    			checkColor.r = color.r;
    			checkColor.g = color.g;
    			checkColor.b = color.b;
    			checkColor[pos] = "0";
                color.hex = ColorWheelService.rgbToHex(checkColor);
    		}
            else {
                 color.hex = ColorWheelService.rgbToHex(color);
            }
    	}
    };
}]);