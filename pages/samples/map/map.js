var locLon = 123.488257;
var locLat = 41.807326;
var locMarker = {
    id: 0,
    latitude: locLat,
    longitude: locLon,
    title: "My Position",
    iconPath: "/res/img/loc.png",
    anchor: { x: .5, y: .5 },
};
Page({
    data: {
        centLon: locLon,
        centLat: locLat,
        mks: [
            locMarker
        ],
        pls: [{
            points: [{ latitude: 41.808758, longitude: 123.434324 }, { latitude: 41.802296, longitude: 123.42411 }, { latitude: 41.810549, longitude: 123.417415 }, { latitude: 41.814131, longitude: 123.43501 }],
            color: "#aabbccFF",
            width: 4,
        }],
        circles:[],
        ctrls: [{
            id: 0,
            position: {
                left: 20,
                top: 20,
                width: 40,
                height: 40,
            },
            iconPath: "/res/img/bubble.png",
            clickable: true
        }],
    },
    tapControl: function (evt) {
        if (evt.controlId == 0) {
            console.log(evt);

            this.setData({
                circles:[{
                    latitude: locLat,
                    longitude: locLon,
                    color:"#0084ffFF",
                    fillColor:"#eb492455",
                    radius:120,
                    strokeWidth:4,
                }],
            });
        }
    },
    onLoad: function () {

        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (data) {

                locLat = data.latitude;
                locLon = data.longitude;
                locMarker.latitude = locLat;
                locMarker.longitude = locLon;

                that.setData({
                    centLon: locLon,
                    centLat: locLat,
                    mks: [
                        locMarker
                    ],
                })
            },
            complete: function () {

            }
        });
    }
});