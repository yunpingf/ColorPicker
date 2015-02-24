angular.module('ColorWheel').controller('ColorWheelController', ['$scope', 'ColorWheelService', function($scope, ColorWheelService) {
    var canvas = $("canvas");
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    var leftOffset = canvas.offset().left;
    var topOffset = canvas.offset().top;
    $scope.mouseDown = {main:false, first:false, second:false, third:false};
    $scope.rangeDown = {main:false, first:false, second:false, third:false};
    $scope.choices = [
    	[{src: "1", value: constants.getMono()}, {src: "2", value: constants.getComple()}],
    	[{src: "3", value: constants.getSplit()}, {src: "4", value: constants.getAnalog()}],
    	[{src: "5", value: constants.getTriad()}, {src: "6", value: constants.getDouble()}]
    ];
    $scope.composeType = "";
    $scope.mainColor = {x: canvasWidth/2, y: canvasHeight/2, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.thirdColor = {x: canvasWidth/2, y: canvasHeight/2, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.secondColor = {x: canvasWidth/2, y: canvasHeight/2, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.firstColor = {x: canvasWidth/2, y: canvasHeight/2, r:"255", g:"255", b:"255", 
                        rv:"255", gv:"255", bv:"255", h:0, s:0, v:1, "hex":"#FFFFFF"};
    $scope.colorShown = constants.getOne();

    function setColorShown(val) {
    	$scope.colorShown = val;
    }

    $scope.chooseComposeType = function(type) {
    	$scope.composeType = type;
    	ColorWheelService.setComposeType(type);
        ColorWheelService.cacheCenterR();
    	if (type == constants.getMono() || type == constants.getComple()){
    		setColorShown(constants.getOne());
            $scope.firstColor = ColorWheelService.calculateColor($scope.mainColor.x, $scope.mainColor.y, $scope.mainColor.v);
        }
    	else if (type == constants.getSplit() || type == constants.getAnalog()
    		|| type == constants.getTriad()){
            setColorShown(constants.getTwo());
            var colors = ColorWheelService.calculateColor($scope.mainColor.x, $scope.mainColor.y, $scope.mainColor.v);
            $scope.firstColor = colors[0];
            $scope.secondColor = colors[1];
        }
    	else if (type == constants.getDouble()){
    		setColorShown(constants.getThree());
            var colors = ColorWheelService.calculateColor($scope.mainColor.x, $scope.mainColor.y, $scope.mainColor.v);
            $scope.firstColor = colors[0];
            $scope.secondColor = colors[1];
            $scope.thirdColor = colors[2];
        }
    };

    $scope.onMouseDown = function(pos, $event) {
    	ColorWheelService.cacheCenterR();
        if ($scope.composeType != "")
            ColorWheelService.cacheDegree($scope.mainColor, $scope.firstColor,
                $scope.secondColor, $scope.thirdColor);
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
            if ($scope.mouseDown.main) {
                $scope.mainColor = ColorWheelService.getMainColor($event.offsetX, $event.offsetY, $scope.mainColor.v);
                if ($scope.composeType == constants.getMono()
                    || $scope.composeType == constants.getComple()){
                    $scope.firstColor = ColorWheelService.calculateMove($scope.mainColor.x, $scope.mainColor.y, $scope.mainColor.v);
                }
                else if ($scope.composeType  == constants.getSplit() || $scope.composeType  == constants.getAnalog()
                    || $scope.composeType  == constants.getTriad()){
                    var colors = ColorWheelService.calculateMove($scope.mainColor.x, $scope.mainColor.y, $scope.mainColor.v);
                    $scope.firstColor = colors[0];
                    $scope.secondColor = colors[1];
                }
                else if ($scope.composeType  == constants.getDouble()){
                    var colors = ColorWheelService.calculateMove($scope.mainColor.x, $scope.mainColor.y, $scope.mainColor.v);
                    $scope.firstColor = colors[0];
                    $scope.secondColor = colors[1];
                    $scope.thirdColor = colors[2];
                }
            }
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
    		if (index == 0) {
                $scope.mainColor = ColorWheelService.getHSV($scope.mainColor);
                console.log($scope.mainColor);
            }
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
        if ($scope.rangeDown.main)
            $scope.mainColor = ColorWheelService.colorRangeMove($scope.mainColor);
        else if ($scope.rangeDown.first)
            $scope.firstColor = ColorWheelService.colorRangeMove($scope.firstColor);
        else if ($scope.rangeDown.second)
            $scope.secondColor = ColorWheelService.colorRangeMove($scope.secondColor);
        else if ($scope.rangeDown.third)
            $scope.thirdColor = ColorWheelService.colorRangeMove($scope.thirdColor);
    };
}]);