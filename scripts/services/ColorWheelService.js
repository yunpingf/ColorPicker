angular.module('ColorWheel').service('ColorWheelService', function() {
	var mainColor = "";
	var firstColor = "";
	var secondColor = "";
	var thirdColor = "";
	var composeType = "";

	this.consoleLog = function() {
		console.log("!!!!");
	};

	this.setComposeType = function(type) {
		composeType = type;
	};
});