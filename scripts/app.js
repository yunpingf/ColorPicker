angular.module('ColorWheel', []);
$(document).ready(function () {
    var injector = angular.element(document).injector();
    var service = injector.get('ColorWheelService');
    
    service.drawColorWheel();
    service.drawButtons();
});

$(window).resize( function(){
    var injector = angular.element(document).injector();
    var service = injector.get('ColorWheelService');
    service.drawColorWheel();
});