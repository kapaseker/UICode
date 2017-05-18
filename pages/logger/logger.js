var Logger = require("../../log/log.js");

Page({
    data: {
        text: "",
    },
    onLoad: function () {
        var pageThis = this;
        Logger.readLog(function (msg) {
            var txt = "";
            if (msg.length == 0) {
                txt = "Empty !!!!";
            } else {
                txt = msg.join("\n");
            }
            
            pageThis.setData({
                text:txt,
            });

        });
    }
});