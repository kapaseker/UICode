Page({
    data: {
        show: true,
    },
    fetchLocation: function () {
        this.setData({
            show: false,
        });
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (data) {
                var latitude = data.latitude;
                var longitude = data.longitude;
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 16,
                })
            },
            complete: function () {
                that.setData({
                    show: true,
                });
            }
        });
    }
});