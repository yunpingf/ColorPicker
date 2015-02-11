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

	this.drawPointer = function(x, y) {
		$("#colorpicker").css({top:y, left: x});
	};

	this.calculateColor = function() {
		if (type == constant.getMono) {

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

	this.drawColorWheel = function() {
		var height = canvas.height();
	    var width = canvas.width();
	    var delta = height > width? (width/2) : (height/2);
	    var centerX = width / 2;
	    var centerY = height / 2 - delta * 0.15;
	    var r = delta*0.8;
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
	            var x = i - centerX;
	            var y = j - centerY;
	            if (x*x + y*y <= r * r) {
	                h = 6 * (Math.atan2(y, x) + Math.PI) / (2 * Math.PI);
	                s = Math.sqrt(x*x + y*y) / r;
	                g = Math.floor(h);
	                f = h - g;
	                u = 255 * (1 - s);
	                v = 255 * (1 - s * f);
	                w = 255 * (1 - s * (1 - f));
	                imageData[k] = [255, v, u, u, w, 255, 255][g];
	                imageData[k + 1] = [w, 255, 255, v, u, u, w][g];
	                imageData[k + 2] = [u, u, w, 255, 255, v, u][g];
	                imageData[k + 3] = 255;
	            }
	            else if((i >= leftX && i <= leftX + 2 * r) &&
	            	(j >= leftY && j <= leftY + delta * 0.12)){

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

	    context.rect(leftX, leftY, 2 * r, delta*0.12);
	    context.lineWidth = 2;
	    context.stroke();
	};
});