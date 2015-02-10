angular.module('ColorWheel').service('ColorWheelService', function() {
	var canvas = $("#colorWheel");
	var context = canvas.get(0).getContext('2d');
	var mainColor = "";
	var firstColor = "";
	var secondColor = "";
	var thirdColor = "";
	var composeType = "";
	var count = 0;

	this.consoleLog = function() {
		count += 1;
		console.log(count);
	};

	this.setComposeType = function(type) {
		composeType = type;
	};

	this.drawPointer = function(x, y) {
		$("#colorpicker").css({top:y, left: x});
		/*var radius = 3;
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'white';
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = '#696969';
		context.stroke();
		context.fillStyle = 'white';
		context.fillRect(x,y,10,10);*/
	};

	this.calculateColor = function() {
		if (type == constant.getMono) {

		}
	};
});