angular.module('ColorWheel').service('ColorWheelService', function() {
	var canvas = $("#colorWheel");
	var context = canvas.get(0).getContext('2d');
	var mainColor = {h:0, s:0, v:1};
	var firstColor = {};
	var secondColor = {};
	var thirdColor = {};
	var composeType = "";
	var count = 0;

	this.consoleLog = function() {
		count += 1;
		console.log(count);
	};

	this.setComposeType = function(type) {
		composeType = type;
	};

	this.setMainColor = function(i, j) {
		var height = canvas.height();
	    var width = canvas.width();
	    var delta = height > width? (width/2) : (height/2);
	    var centerX = width / 2;
	    var centerY = height / 2 - delta * 0.15;
	    var x = i - centerX;
	    var y = j - centerY;

	    var h = 6 * (Math.atan2(y, x) + Math.PI) / (2 * Math.PI);
        var s = Math.sqrt(x*x + y*y) / r;

        var g = Math.floor(h);
        var f = h - g;
        var u = 255 * (1 - s);
        var v = 255 * (1 - s * f);
        var w = 255 * (1 - s * (1 - f));

        var r = [255, v, u, u, w, 255, 255][g];
        var b =[w, 255, 255, v, u, u, w][g];
        var g = [u, u, w, 255, 255, v, u][g];

	};

	this.setMainGrey = function(i) {
		

	};

	this.withinRange = function(x, y) {
		var height = canvas.height();
	    var width = canvas.width();
	    var delta = height > width? (width/2) : (height/2);
	    var centerX = width / 2;
	    var centerY = height / 2 - delta * 0.15;
	    var r = delta*0.8;
	    return (x - centerX) * (x - centerX) +
	    	(y - centerY) * (y - centerY) <= r * r;
	};

	this.drawPointer = function(x, y) {
		$("#colorpicker").css({top:y, left: x});
		/*if (!out){
			$("#colorpicker").css({top:y, left: x});
		}
		else {
			//outmost
		}*/
	};

	this.calculateColor = function(x, y) {
		var pos = getCenterR();
	    var centerX = pos.centerX;
	    var centerY = pos.centerY;
	    var r = pos.r;

		if (type == constants.getMono()) {

		}
		else if (type == constants.getComple()) {
			var x2 = centerX - x;
			var y2 = centerY - y;
			var color = getHSVFromRePos(x2, y2,r);
		}
		else if (type == constants.getSplit()) {
			var ds = Math.sqrt((centerX-x)*(centerX-x) + (centerY-y)*(centerY-y));
			var deg = atan2(centerY-y, centerX-x); //comple angle between positive x axis
			var degL = deg - Math.PI / 6;
			var degR = deg + Math.PI / 6;

			var xL = ds * Math.cos(degL);
			var yL = ds * Math.sin(degL);
			var xR = ds * Math.cos(degR);
			var yR = ds * Math.sin(degL);

			var colorL = getHSVFromRePos(xL, yL, r);
			var colorR = getHSVFromRePos(xR, yR, r);
		}
		else if (type == constants.getDouble()) {
			var ds = Math.sqrt((centerX-x)*(centerX-x) + (centerY-y)*(centerY-y));
			var deg = atan2(y - centerY, x - centerX);
			var degCom = atan2(centerY-y, centerX-x); //comple angle between positive x axis
			var degL = degCom - Math.PI / 3;
			var degR = deg - Math.PI / 3;

			var xC = ds * Math.cos(degCom);
			var yC = ds * Math.sin(degCom);
			var xL = ds * Math.cos(degL);
			var yL = ds * Math.sin(degL);
			var xR = ds * Math.cos(degR);
			var yR = ds * Math.sin(degL);

			var colorC = getHSVFromRePos(xC, yC, r);
			var colorL = getHSVFromRePos(xL, yL, r);
			var colorR = getHSVFromRePos(xR, yR, r);
		}
		else if (type == constants.getAnalog()) {
			var ds = Math.sqrt((centerX-x)*(centerX-x) + (centerY-y)*(centerY-y));
			var deg = atan2(y - centerY, x - centerX);
			var degL = deg + Math.PI / 6;
			var degR = deg - Math.PI / 6;

			var xL = ds * Math.cos(degL);
			var yL = ds * Math.sin(degL);
			var xR = ds * Math.cos(degR);
			var yR = ds * Math.sin(degL);

			var colorL = getHSVFromRePos(xL, yL, r);
			var colorR = getHSVFromRePos(xR, yR, r);
		}
		else if (type == constant.getTriad()) {
			var ds = Math.sqrt((centerX-x)*(centerX-x) + (centerY-y)*(centerY-y));
			var deg = atan2(y - centerY, x - centerX);
			var degL = deg + Math.PI * 2 / 3;
			var degR = deg - Math.PI * 2 / 3;

			var xL = ds * Math.cos(degL);
			var yL = ds * Math.sin(degL);
			var xR = ds * Math.cos(degR);
			var yR = ds * Math.sin(degL);

			var colorL = getHSVFromRePos(xL, yL, r);
			var colorR = getHSVFromRePos(xR, yR, r);
		}
	};

	function decToHex(num) { //decimal num in string
		var hex = parseInt(num).toString(16).toUpperCase();
		return hex.length == 1? "0"+hex: hex;
	};

	this.rgbToHex = function(color) {
		return "#" + decToHex(color.r) +
				decToHex(color.g) +
				decToHex(color.b);
	};

	function getCenterR () {
		var height = canvas.height();
	    var width = canvas.width();
	    var delta = height > width? (width/2) : (height/2);
	    var centerX = width / 2;
	    var centerY = height / 2;
	    var r = delta*0.9;
	    return {'height':height, 'width': width,
	    	'centerX':centerX, 'centerY':centerY, 'r':r};
	};

	function getHSVFromRePos(x, y, r) { //relative distance
	    var h = 6 * (Math.atan2(y, x) + Math.PI) / (2 * Math.PI);
        var s = Math.sqrt(x*x + y*y) / r;

        var g = Math.floor(h);
        var f = h - g;
        var u = 255 * (1 - s);
        var v = 255 * (1 - s * f);
        var w = 255 * (1 - s * (1 - f));

        var cr = [255, v, u, u, w, 255, 255][g];
        var cg =[w, 255, 255, v, u, u, w][g];
        var cb = [u, u, w, 255, 255, v, u][g];

        return {'h':h, 's':s, 'v':1, 'r':cr, 'g':cg, 'b':cb};
	}

	this.drawColorWheel = function() {
		var pos = getCenterR();
		var width = pos.width;
		var height = pos.height;
	    var centerX = pos.centerX;
	    var centerY = pos.centerY;
	    var r = pos.r;
	    var leftX = centerX - r;
	    var leftY = centerY + r + 10;
	    canvas.get(0).width = width;
	    canvas.get(0).height = height;
	    var imageDataObj = context.createImageData(width, height);
	    var imageData = imageDataObj.data;
	    var k = 0; var h = 0; var s = 0; var g = 0;
	    var f = 0; var u = 0; var v = 0; var w = 0;
	    for (var j = 0; j < height; ++j) {
	        for (var i = 0; i < width; ++i) {
	            var x = i - centerX; // distance
	            var y = j - centerY; //distance
	            if (x*x + y*y <= r * r) {
	            	var clr = getHSVFromRePos(x, y, r);
	                imageData[k] = clr.r;
	                imageData[k + 1] = clr.g
	                imageData[k + 2] = clr.b
	                imageData[k + 3] = 255;
	            }
	            k += 4;
	        }
	    }
	    
		context.putImageData(imageDataObj, 0, 0);
	    context.beginPath();//draw the outmost circle
	    context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
	    context.lineWidth = 2;
	    context.strokeStyle = '#696969';
	    context.closePath();
	    context.stroke();
	};
});