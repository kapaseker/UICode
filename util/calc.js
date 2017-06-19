var Calc = {
    distanceInTowPoints: function (x0, x1, y0, y1) {
        var dis = (Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0))));
        return Math.round(dis * 100) / 100;
    },
    centPointInTowPoints: function (x0, x1, y0, y1) {
        return {
            x: ((x0 + x1) / 2),
            y: ((y0 + y1) / 2)
        };
    }
}

module.exports = Calc;