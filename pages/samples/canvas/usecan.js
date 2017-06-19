Page({
    onReady: function () {
        var canvas = wx.createCanvasContext("mapLayer");

        canvas.setFillStyle("red");
        canvas.setStrokeStyle("blue");
        canvas.setLineWidth(4);

        canvas.moveTo(10, 20);
        canvas.lineTo(10, 40);
        canvas.lineTo(200, 200);
        canvas.lineTo(400, 345);
        canvas.stroke();
        canvas.draw();
    }
})