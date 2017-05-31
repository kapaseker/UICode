Page({
    data: {
        result: [],
    },
    sendRequest: function () {
        var that = this;
        wx.request({
            url: "http://61.189.20.114:9001/AbilityPlatform?key=7A2EA1FD3CBC3D46D037ABA35F62A7A3-001&sn=20170531154840&lineId=210100010276,210100010275,210100010013,210100010014",
            data: {
                function: "get_bus_by_lineid",
                type: "bus_route",
            },
            method: "GET",
            dataType: "json",
            success: function (result) {
                var data = [];
                result.data.result.list.forEach(function (element, index) {
                    data.push(index + ":" + element.name);
                }, this);
                that.setData({
                    result: data,
                });
            },
        })
    },
})