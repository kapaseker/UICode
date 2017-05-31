//index.js
//获取应用实例
var app = getApp();
var logger = require("../../log/log.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    sampleInfo: [
      { title: "use view", navito: '../samples/view/view' },
      { title: "Scroll View", navito: "../samples/scroll/scroll" },
      { title: "Swiper", navito: "../samples/swipe/swiper" },
    ],
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    wx.showModal({
      title: "Your nick name",
      content: that.data.userInfo.nickName,
      showCancel: false,
    });
  },
  naviTo: function (view) {
    wx.navigateTo({
      url: view.target.dataset.url,
    });
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
