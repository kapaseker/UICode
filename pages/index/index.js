//index.js
//获取应用实例
var app = getApp();
var logger = require("../../log/log.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    sampleInfo: [
      { title: "", navito: '' },
    ],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  naviTo: function () {
    console.log("Click me");
  },
  seeLog: function () {
    wx.navigateTo({
      url: '../logger/logger'
    });
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (info) {
      //更新数据
      that.setData({
        userInfo: info.userInfo,
      });
    });
  }
});
