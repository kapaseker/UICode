var Logger = {
    LOG_NAME: "log",
    putLog: function (msg) {
        var data = wx.getStorageSync(this.LOG_NAME) || [];
        data.push(msg);
        wx.setStorageSync(this.LOG_NAME, data);
    },
    readLog: function (onRead) {
        var data = wx.getStorageSync(this.LOG_NAME) || [];
        onRead(data);
    },
};

module.exports = Logger;