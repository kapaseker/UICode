

Page({
    data: {
        pics: [
            "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
            "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496211552112&di=7e9f3552db91ad7b773ab5ee43c4bee3&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D1896218814%2C3276915094%26fm%3D214%26gp%3D0.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496211500294&di=2fc7484e4c686a2442f99e71274015c2&imgtype=0&src=http%3A%2F%2Fimg28.photophoto.cn%2F20130710%2F0034034865494106_s.jpg",
        ],
        hasDot: true,
        dotColor: "#00aba9",
        activeDotColor: "#6a00ff",
        auto: false,
        terval: 1200,
        idx: 0,
        curIdx: 0,
    },

    changeDot: function () {
        this.setData({
            hasDot: !this.data.hasDot,
        })
    },

    onSwipe: function (event) {
        this.setData({
            curIdx: event.detail.current,
        })
    },

    swipeNext: function (evt) {
        var curIndex = this.data.curIdx;
        var dataLength = this.data.pics.length;

        if (undefined != evt.target.dataset.next) {
            curIndex++;
            if (curIndex > dataLength - 1) {
                curIndex = 0;
            }
        } else {
            curIndex--;
            if (curIndex < 0) {
                curIndex = dataLength - 1;
            }
        }

        this.setData({
            idx: curIndex,
        })
    },

    changeAuto: function () {
        this.setData({
            auto: !this.data.auto,
        })
    }
});