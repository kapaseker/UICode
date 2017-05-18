//app.js
var Logger = require("./log/log.js");

App({
  onLaunch: function () {
    // console.log("Launch App Done");
    Logger.putLog("Launch App Done");
  },
  onShow: function () {
    Logger.putLog("show App");
  },
  onHide: function () {
    Logger.putLog("hide App");
  },
  onError: function (msg) {
    Logger.putLog("msg");
  },
  getUserInfo: function (onReady) {
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (userInfo) {
            onReady(userInfo);
          }
        })
      }
    });
  },
  globaldata: {
    userInfo: null,
  },
});