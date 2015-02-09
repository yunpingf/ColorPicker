function drawColorWheel() {
	var canvas = $("#colorWheel");
	var context = canvas.get(0).getContext('2d');
	var height = canvas.height();
    var width = canvas.width();
    var delta = height > width? (width/2) : (height/2);
    var centerX = width / 2;
    var centerY = height / 2 - delta * 0.15;
    var r = delta*0.8;
    canvas.get(0).width = width;
    canvas.get(0).height = height;
    var imageDataObj = context.createImageData(width, height);
    var imageData = imageDataObj.data;
    var k = 0;
    for (var j = 0; j < height; ++j) {
        for (var i = 0; i < width; ++i) {
            var x = i - centerX;
            var y = j - centerY;
            if (x*x + y*y <= r * r) {
                var h = 6 * (Math.atan2(y, x) + Math.PI) / (2 * Math.PI);
                var s = Math.sqrt(x*x + y*y) / r;
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
            k += 4;
        }
    }
	context.putImageData(imageDataObj, 0, 0); // module declaration
};

angular.module('ColorWheel', []);

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
	drawColorWheel();
});

$(window).resize( drawColorWheel );