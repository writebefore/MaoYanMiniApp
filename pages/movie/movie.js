// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前城市
    localCity: "南昌",

    // header标签选中热映
    isChoose: true,
  },

  /**
   * 头部横线的切换
   */
  bottomLineChange(e) {
    if (
      (e.target.id === "hotPage" && !this.data.isChoose) ||
      (e.target.id === "waitMovie" && this.data.isChoose)
    ) {
      this.setData({
        isChoose: !this.data.isChoose,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求参数
    const requestData = {
      token: "",
      optimus_uuid:
        "39245430D7EB11EAA062B9A8E7E6628CB29134344E634663A91DD911801103B8",
      optimus_risk_level: 71,
      optimus_code: 10,
    };
    let test = [
      1167118,
      1218159,
      1218157,
      1290358,
      293,
      337705,
      158,
      1211270,
      6823,
      1227323,
    ];
    let test2 = test.join(',');
    wx.request({
      url: "https://m.maoyan.com/ajax/movieOnInfoList",
      method: "GET",
      data: requestData,
      header: {
        "Cache-Control": "max-age=0",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
      success(res) {
        console.log(res);
      },
    });

    wx.request({
      //https://m.maoyan.com/ajax/moreComingList?token=&movieIds=1167118%2C1218159%2C1218157%2C1290358%2C293%2C337705%2C158%2C1211270%2C6823%2C1227323&optimus_uuid=39245430D7EB11EAA062B9A8E7E6628CB29134344E634663A91DD911801103B8&optimus_risk_level=71&optimus_code=10
      url: "https://m.maoyan.com/ajax/moreComingList",
      method: "GET",
      data: {
        token: "",
        movieIds: test2, //"1167118%2C1218159%2C1218157%2C1290358%2C293%2C337705%2C158%2C1211270%2C6823%2C1227323",
        optimus_uuid:
          "39245430D7EB11EAA062B9A8E7E6628CB29134344E634663A91DD911801103B8",
        optimus_risk_level: 71,
        optimus_code: 10,
      },
      header: {
        "Cache-Control": "max-age=0",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
      success(res) {
        console.log(res.data);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
