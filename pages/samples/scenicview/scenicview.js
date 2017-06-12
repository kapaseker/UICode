var Calc = require("../../../util/calc.js");

// touch mode include "move","pinch"
Page({
    data: {
        picwidth: 0,
        picheight: 0,
        picLength: 0,
        topOffset: 0,
        leftOffset: 0,
        evtMode: "move",
        moveEvent: {
            lastX: 0,
            lastY: 0,
        },
        pinchEvent: {
            distance: 0,
            center: {
                x: 0,
                y: 0
            }
        },
        xRatio: 1,
        yRatio: 1,
    },

    onReady: function () {

        var width = 3024;
        var height = 2268;

        this.setData({
            picwidth: width,
            picheight: height,
            picLength: Calc.distanceInTowPoints(0, 3024, 0, 2268),
        });
    },

    onToucStart: function (evt) {
        if (evt.touches.length == 1) {
            this.setData({
                evtMode: "move",
            })
            this.setLastMovePos(evt);
        } else if (evt.touches.length == 2) {
            this.setData({
                evtMode: "pinch",
            })
            this.setLastPinchPos(evt.touches[0], evt.touches[1]);
        }
    },

    onMove: function (evt) {
        if (this.data.evtMode == "move") {
            var curX = evt.touches[0].clientX;
            var curY = evt.touches[0].clientY;
            var lastPos = this.getLastMovePos();
            var lastX = lastPos.x;
            var lastY = lastPos.y;

            var setX = curX - lastX + this.data.leftOffset;
            var setY = curY - lastY + this.data.topOffset;

            setX = setX > 0 ? 0 : (setX < -this.data.picwidth ? -this.data.picwidth : setX);
            setY = setY > 0 ? 0 : (setY < -this.data.picheight ? -this.data.picheight : setY);

            this.setPositionOffset(setX, setY);
            this.setLastMovePos(evt);
        } else if (this.data.evtMode == "pinch") {

            var pinPos = this.getLastPinchPos();
            var lastDis = pinPos.distance;
            var cent = pinPos.center;

            var x0 = evt.touches[0].clientX;
            var x1 = evt.touches[1].clientX;

            var y0 = evt.touches[0].clientY;
            var y1 = evt.touches[1].clientY;

            var curDis = Calc.distanceInTowPoints(x0, x1, y0, y1);

            var diffDis = Math.abs(curDis - lastDis);
            var diffRatio = diffDis / this.data.picLength;

            if (curDis < lastDis) { // shrink
                this.setRatio(diffRatio, true);
            } else if (curDis > lastDis) { // expand
                this.setRatio(diffRatio, false);
            }

            this.setLastPinchPos(evt.touches[0], evt.touches[1]);
        }
    },

    onTouchEnd: function (evt) {

        this.setData({
            evtMode: "unset"
        });

        this.setLastPinchPos(null);
    },

    setLastMovePos: function (evt) {
        this.setData({
            moveEvent: {
                lastX: evt.touches[0].clientX,
                lastY: evt.touches[0].clientY
            }
        });
    },

    getLastMovePos: function () {
        return {
            x: this.data.moveEvent.lastX,
            y: this.data.moveEvent.lastY
        }
    },

    setLastPinchPos: function (lEvt, rEvt) {

        if (lEvt == null || rEvt == null) {
            // clear data
            this.setData({
                pinchEvent: {
                    distance: 0,
                    center: {
                        x: 0,
                        y: 0,
                    }
                }
            });

            return;
        }

        var x0 = lEvt.clientX;
        var x1 = rEvt.clientX;

        var y0 = lEvt.clientY;
        var y1 = rEvt.clientY;

        var dis = Calc.distanceInTowPoints(x0, x1, y0, y1);

        var cent = this.data.pinchEvent.center;

        if (this.data.pinchEvent.center == null) {
            cent = Calc.centPointInTowPoints(x0, x1, y0, y1);
        };

        this.setData({
            pinchEvent: {
                distance: dis,
                center: cent
            }
        })
    },

    getLastPinchPos: function () {
        return this.data.pinchEvent;
    },

    setPositionOffset: function (x, y) {
        this.setData({
            leftOffset: x,
            topOffset: y,
        });
    },

    setRatio: function (ratio, isShrink) {
        ratio = ratio * 10;

        var realRation = isShrink ? (this.data.xRatio - ratio) : (this.data.xRatio + ratio);

        this.setData({
            xRatio: realRation,
            yRatio: realRation,
        });
    },
});