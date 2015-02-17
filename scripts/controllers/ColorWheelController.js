angular.module('ColorWheel').controller('ColorWheelController', ['$scope', 'ColorWheelService', function($scope, ColorWheelService) {
    var canvas = $("#colorWheel");
    var leftOffset = canvas.offset().left;
    var topOffset = canvas.offset().top;
    $scope.mouseDown = {main:false, first:false, second:false, third:false};
    $scope.rangeDown = {main:false, first:false, second:false, third:false};
    $scope.choices = [
    	[{src: "1", value: constants.getMono()}, {src: "2", value: constants.getComple()}],
    	[{src: "3", value: constants.getSplit()}, {src: "4", value: constants.getDouble()}],
    	[{src: "5", value: constants.getAnalog()}, {src: "6", value: constants.getTriad()}]
    ];
    $scope.composeType = constants.getMono();
    $scope.mainColor = {x: canvas.width()/2.0, y: canvas.height()/2.0, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.thirdColor = {x: canvas.width()/2.0, y: canvas.height()/2.0, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.secondColor = {x: canvas.width()/2.0, y: canvas.height()/2.0, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.firstColor = {x: canvas.width()/2.0, y: canvas.height()/2.0, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.colorShown = constants.getOne();

    function setColorShown(val) {
    	$scope.colorShown = val;
    }

    $scope.change = function(){
        console.log("!!!");
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

        $scope.rangeDown.main = false;
        $scope.rangeDown.first = false;
        $scope.rangeDown.second = false;
        $scope.rangeDown.third = false;
    };

    $scope.onMouseMove = function($event) {
    	if (($scope.mouseDown.main || $scope.mouseDown.first || $scope.mouseDown.second || $scope.mouseDown.third) 
            && (ColorWheelService.withinRange($event.offsetX, $event.offsetY))) {
            if ($scope.mouseDown.main) 
                $scope.mainColor = ColorWheelService.getMainColor($event.offsetX, $event.offsetY, $scope.mainColor.v);
            else if ($scope.mouseDown.first) 
                $scope.firstColor = ColorWheelService.getMainColor($event.offsetX, $event.offsetY, $scope.firstColor.v);
            else if ($scope.mouseDown.second) 
                $scope.secondColor = ColorWheelService.getMainColor($event.offsetX, $event.offsetY, $scope.secondColor.v);
            else if ($scope.mouseDown.third)
                $scope.thirdColor = ColorWheelService.getMainColor($event.offsetX, $event.offsetY, $scope.thirdColor.v);
    	}
    };

    $scope.invalidRGB = function(rgb) {
    	if ((rgb == "0") || (rgb != "" && parseInt(rgb) != NaN && (parseInt(rgb) == parseFloat(rgb))&& rgb >= 0 && rgb <= 255))
    		return false;
    	else {
    		return true;
        }
    };

    $scope.updateColorInput = function(index, pos) { // when the input value is changed
        var color;
        if (index == 0) color = $scope.mainColor;
        else if (index == 1) color = $scope.firstColor;
        else if (index == 2) color = $scope.secondColor;
        else if (index == 3) color = $scope.thirdColor;

    	if (!$scope.invalidRGB(color[pos])) {
    		if (index == 0) $scope.mainColor = ColorWheelService.getHSV($scope.mainColor);
            else if (index == 1) $scope.firstColor = ColorWheelService.getHSV($scope.firstColor);
            else if (index == 2) $scope.secondColor = ColorWheelService.getHSV($scope.secondColor);
            else if (index == 3) $scope.thirdColor = ColorWheelService.getHSV($scope.thirdColor);
    	}
    };

    $scope.onRangeDown = function(index){
        if (index == 0) $scope.rangeDown.main = true;
        else if (index == 1) $scope.rangeDown.first = true;
        else if (index == 2) $scope.rangeDown.second = true;
        else if (index == 3) $scope.rangeDown.third = true;
    };

    $scope.onRangeMove = function(){
        if ($scope.rangeDown.main) {
            $scope.mainColor.rv = Math.floor($scope.mainColor.r * $scope.mainColor.v);
            $scope.mainColor.gv = Math.floor($scope.mainColor.g * $scope.mainColor.v);
            $scope.mainColor.bv = Math.floor($scope.mainColor.b * $scope.mainColor.v);
            $scope.mainColor.hex = ColorWheelService.rgbToHex($scope.mainColor);
        }
        else if ($scope.rangeDown.first) {
            $scope.firstColor.rv = Math.floor($scope.firstColor.r * $scope.firstColor.v);
            $scope.firstColor.gv = Math.floor($scope.firstColor.g * $scope.firstColor.v);
            $scope.firstColor.bv = Math.floor($scope.firstColor.b * $scope.firstColor.v);
            $scope.firstColor.hex = ColorWheelService.rgbToHex($scope.firstColor);
        }
        else if ($scope.rangeDown.second) {
            $scope.secondColor.rv = Math.floor($scope.secondColor.r * $scope.secondColor.v);
            $scope.secondColor.gv = Math.floor($scope.secondColor.g * $scope.secondColor.v);
            $scope.secondColor.bv = Math.floor($scope.secondColor.b * $scope.secondColor.v);
            $scope.secondColor.hex = ColorWheelService.rgbToHex($scope.secondColor);
        }
        else if ($scope.rangeDown.third) {
            $scope.thirdColor.rv = Math.floor($scope.thirdColor.r * $scope.thirdColor.v);
            $scope.thirdColor.gv = Math.floor($scope.thirdColor.g * $scope.thirdColor.v);
            $scope.thirdColor.bv = Math.floor($scope.thirdColor.b * $scope.thirdColor.v);
            $scope.thirdColor.hex = ColorWheelService.rgbToHex($scope.thirdColor);
        }

    };
}]);