angular.module('ColorWheel', []);

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
    var injector = angular.element(document).injector();
    var service = injector.get('ColorWheelService');
    service.drawColorWheel();
});

$(window).resize( function(){
    var injector = angular.element(document).injector();
    var service = injector.get('ColorWheelService');
    service.drawColorWheel();
});