Page({
    data: {
        iconlist: [
            { type: "success", size: 20, color: "red" },
            { type: "success_no_circle", size: 22, color: "blue" },
            { type: "info", size: 24, color: "green" },
            { type: "warn", size: 26, color: "yellow" },
            { type: "waiting", size: 28, color: "#00695C" },
            { type: "cancel", size: 30, color: "#D84315" },
            { type: "download", size: 32, color: "#1A237E" },
            { type: "search", size: 34, color: "#E91E63" },
            { type: "clear", size: 36, color: "#37474F" },
        ],
        progress: 0,
    },
    up: function () {
        this.setData({
            progress: this.data.progress + 10,
        });
    }
})