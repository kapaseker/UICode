
var definedItem = ["lime", "teal", "violet", "crimeson"]
var curIndex = 0;
Page({
    data: {
        items: definedItem,
        curItem: definedItem[curIndex],
        curTop: 0,
    },
    scrollTo: function () {
        console.log("scroll to some div");
        var that = this;
        this.setData({
            curItem: definedItem[(curIndex = curIndex < definedItem.length - 1 ? ++curIndex : 0)],
        });
        console.log("curItem is :" + this.data.curItem);
    },
    scrollMove: function () {
        console.log("cur top pixel is " + this.data.curTop);
        this.setData({
            curTop: this.data.curTop + 10,
        });
    },
});