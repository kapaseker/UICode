var Calc = require("../../../util/calc.js");

// touch mode include "move","pinch"
Page({
    data: {
        // the origin width of picture
        originWidth: 0,
        // the origin height of picture
        originHeight: 0,
        // the  diagonal of the picture
        originPicLength: 0,
        // the real picture width
        picWidth: 0,
        // the real picture height
        picHeight: 0,
        // the picture postion of y-axis in wrapper
        topOffset: 0,
        // the picture postion of x-axis in wrapper
        leftOffset: 0,
        // the wrapper width
        wrapperWidth: 0,
        // the wrapper height
        wrapperHeight: 0,
        // the move-mode
        evtMode: "unset",
        // the last postion of move-event 
        moveEvent: {
            lastX: 0,
            lastY: 0,
        },
        // the pinch event data
        pinchEvent: {
            distance: 0,
            hasCenter: false,
            center: {
                x: 0,
                y: 0
            }
        },
        // the real scale ratio of the picture
        scaleRatio: 1,
        // the current scale ratio of the picture
        currentRatio: 1,
        // current transform x position
        transformX: 0,
        // current transform y position
        transformY: 0,
        // the pic origin min ratio
        minRatio: 0,
        // the pic origin max ratio
        maxRatio: 0,
        // max X offset
        maxXOffset: 0,
        // max Y offset
        maxYOffset: 0,
        // current move index
        moveIndex: 0,
        // tranfrom x pos
        xPos: 0,
        // transfor y pos
        yPos: 0,
        // canvas context
        canvasContext: null,
        // the dot lines postion in canvas
        lines: [[10, 20], [10, 40], [200, 200], [400, 345]],
    },

    onLoad: function () {
        var canvas = wx.createCanvasContext("mapLayer");

        this.setData({
            canvasContext: canvas
        });

        this.drawLines();
    },

    onReady: function () {

        var width = 3024;
        var height = 2268;

        var systemInfo = wx.getSystemInfoSync();

        var outerWidth = systemInfo.screenWidth - 8;
        var outerHeight = 400;
        var min = Math.max(outerWidth / width, outerHeight / height);

        this.setData({
            picWidth: width,
            picHeight: height,
            originWidth: width,
            originHeight: height,
            originPicLength: Calc.distanceInTowPoints(0, 3024, 0, 2268),
            wrapperWidth: outerWidth,
            wrapperHeight: outerHeight,
            maxRatio: 1,
            minRatio: min,
            maxXOffset: width - outerWidth,
            maxYOffset: height - outerHeight,
        });
    },

    onToucStart: function (evt) {
        if (evt.touches.length == 1) {
            this.setData({
                evtMode: "pinch",
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

        console.log("MOVE");

        // var evtIndex = this.data.moveIndex;
        // ++evtIndex;
        // this.setData({
        //     moveIndex: evtIndex,
        // });

        // if (evtIndex < this.data.moveMaxTrigger) {
        //     return;
        // }

        if (this.data.evtMode == "move") {

            var curX = evt.touches[0].clientX;
            var curY = evt.touches[0].clientY;
            var lastPos = this.getLastMovePos();
            var lastX = lastPos.x;
            var lastY = lastPos.y;

            var setX = curX - lastX + this.data.xPos;
            var setY = curY - lastY + this.data.yPos;

            var allLeftOffSet = setX + this.data.leftOffset;

            if (allLeftOffSet < -this.data.maxXOffset) {
                setX = -this.data.maxXOffset - this.data.leftOffset;
            } else if (allLeftOffSet > 0) {
                setX = 0 - this.data.leftOffset;
            }

            var allTopOffset = setY + this.data.topOffset;

            if (allTopOffset < -this.data.maxYOffset) {
                setY = -this.data.maxYOffset - this.data.topOffset
            } else if (allTopOffset > 0) {
                setY = 0 - this.data.topOffset;
            }

            this.moveMapPosition(setX, setY);
            this.setLastMovePos(evt);

        } else if (this.data.evtMode == "pinch") {

            var pinPos = this.getLastPinchPos();
            var lastDis = pinPos.distance;
            var cent = pinPos.center;

            evt.touches[1] = {
                clientX: 0,
                clientY: 0
            }

            this.setLastPinchPos(evt.touches[0], evt.touches[1]);

            if (!pinPos.hasCenter) {
                return;
            }

            var x0 = evt.touches[0].clientX;
            var x1 = evt.touches[1].clientX;

            var y0 = evt.touches[0].clientY;
            var y1 = evt.touches[1].clientY;

            var curDis = Calc.distanceInTowPoints(x0, x1, y0, y1);

            var diffDis = Math.abs(curDis - lastDis);
            var diffRatio = diffDis / this.data.originPicLength;

            if (curDis < lastDis) { // shrink
                this.scaleMapRatio(diffRatio, cent, true);
            } else if (curDis > lastDis) { // expand
                this.scaleMapRatio(diffRatio, cent, false);
            }
        }
    },

    onTouchEnd: function (evt) {

        if (this.data.evtMode == "pinch") {
            this.updateMapPosAndSize();
        } else if (this.data.evtMode == "move") {
            this.updateMapPosition();
        }

        this.setData({
            evtMode: "unset",
            moveIndex: 0
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
                    hasCenter: false,
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

        var hasCenter = this.data.pinchEvent.hasCenter;

        if (!hasCenter) {
            cent = Calc.centPointInTowPoints(x0, x1, y0, y1);
            hasCenter = true;
        };

        this.setData({
            pinchEvent: {
                hasCenter: hasCenter,
                distance: dis,
                center: cent
            }
        })
    },

    getLastPinchPos: function () {
        return this.data.pinchEvent;
    },

    updateMapPosition: function () {

        var xOffset = this.data.xPos + this.data.leftOffset;
        var yOffset = this.data.yPos + this.data.topOffset;

        xOffset = xOffset > 0 ? 0 : (xOffset < -this.data.maxXOffset ? -this.data.maxXOffset : xOffset);
        yOffset = yOffset > 0 ? 0 : (yOffset < -this.data.maxYOffset ? -this.data.maxYOffset : yOffset);

        this.setData({
            leftOffset: xOffset,
            topOffset: yOffset,
            xPos: 0,
            yPos: 0
        });
    },

    moveMapPosition: function (x, y) {
        this.setData({
            xPos: x,
            yPos: y
        });
    },

    updateMapPosAndSize: function () {

        var width = this.data.scaleRatio * this.data.originWidth;
        var height = this.data.scaleRatio * this.data.originHeight;

        var pinPos = this.getLastPinchPos();
        var pinX = pinPos.center.x;
        var pinY = pinPos.center.y;

        var offsetScaleRatio = width / this.data.picWidth;

        var setX = this.data.leftOffset + (pinX - this.data.leftOffset) * (1 - offsetScaleRatio);
        var setY = this.data.topOffset + (pinY - this.data.topOffset) * (1 - offsetScaleRatio);

        var maxXOffset = width - this.data.wrapperWidth;
        var maxYOffset = height - this.data.wrapperHeight;

        setX = setX > 0 ? 0 : (setX < -maxXOffset ? -maxXOffset : setX);
        setY = setY > 0 ? 0 : (setY < -maxYOffset ? -maxYOffset : setY);

        this.setData({
            leftOffset: setX,
            topOffset: setY,
            picWidth: width,
            picHeight: height,
            currentRatio: 1,
            maxXOffset: maxXOffset,
            maxYOffset: maxYOffset
        });

        var canvas = this.data.canvasContext;
        canvas.clearRect(0, 0, this.data.originWidth, this.data.originHeight);
        canvas.save();
        canvas.scale(this.data.scaleRatio, this.data.scaleRatio);
        this.drawLines();
        canvas.restore();
    },

    scaleMapRatio: function (ratio, cent, isShrink) {
        ratio = ratio * 4;

        var realRatio = isShrink ? (this.data.scaleRatio - ratio) : (this.data.scaleRatio + ratio);

        if (realRatio > this.data.maxRatio) {
            realRatio = this.data.maxRatio;
        } else if (realRatio < this.data.minRatio) {
            realRatio = this.data.minRatio;
        }

        var picCentX = cent.x - this.data.leftOffset;
        var picCentY = cent.y - this.data.topOffset;

        var currentPicScaleRatio = this.data.originWidth * realRatio / this.data.picWidth;

        this.setData({
            transformX: picCentX,
            transformY: picCentY,
            currentRatio: currentPicScaleRatio,
            scaleRatio: realRatio,
        });

        // var width = this.data.originWidth * realRatio;
        // var height = this.data.originHeight * realRatio;

        // this.setData({
        //     picWidth: width,
        //     picHeight: height,
        //     scaleRatio: realRatio,
        // });
    },

    drawLines: function () {

        var canvas = this.data.canvasContext;

        canvas.save();
        canvas.setFillStyle("red");
        canvas.setStrokeStyle("blue");
        canvas.setLineWidth(4);

        canvas.moveTo(10, 20);

        for (var item in this.data.lines) {
            var lineDot = this.data.lines[item];
            canvas.lineTo(lineDot[0], lineDot[1]);
        }

        canvas.stroke();
        canvas.draw();
        canvas.restore();
    }
});