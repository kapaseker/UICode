

Page({
    data: {
        picwidth: 3024,
        picheight: 2268,
        topOffset: 0,
        leftOffset: 0,
        lastX: 0,
        lastY: 0,
    },

    onRead: function () {

    },

    onToucStart: function (evt) {
        if (evt.touches.length == 1) {
            this.setLastTouch(evt);
        }
    },

    onMove: function (evt) {
        if (evt.touches.length == 1) {

            var curX = evt.touches[0].clientX;
            var curY = evt.touches[0].clientY;
            var lastX = this.data.lastX;
            var lastY = this.data.lastY;

            console.log("last:[" + lastX + "," + lastY + "];cur:[" + curX + "," + curY + "]");
            console.log("old leftOffSet:[" + this.data.leftOffset + "," + this.data.topOffset + "]");
            var setX = curX - lastX + this.data.leftOffset;
            var setY = curY - lastY + this.data.topOffset;

            setX = setX > 0 ? 0 : (setX < -this.data.picwidth ? -this.data.picwidth : setX);
            setY = setY > 0 ? 0 : (setY < -this.data.picheight ? -this.data.picheight : setY);

            this.setPositionOffset(setX, setY);

            this.setLastTouch(evt);
        }
    },

    onTouchEnd: function (evt) {

    },

    setLastTouch: function (evt) {
        this.setData({
            lastX: evt.touches[0].clientX,
            lastY: evt.touches[0].clientY
        });
    },

    setPositionOffset: function (x, y) {
        this.setData({
            leftOffset: x,
            topOffset: y,
        });
        console.log("cur pos:[" + x + "," + y + "]");
    }
});