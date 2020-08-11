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

    // 电影数据列表的长度
    movieNumber:0,

    // 后续获取的电影列表
    everyNumber:10,

    // 电影的movieIds，后续的数据获取需使用
    movieIds:[],

    // 电影的数据保存，用于生成列表
    movieData:[]

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
   * 首次获取数据
   */
  movieOnInfoList(){
    const self = this;
    // 请求参数
    const requestData = {
      token: "",
      optimus_uuid:
        "39245430D7EB11EAA062B9A8E7E6628CB29134344E634663A91DD911801103B8",
      optimus_risk_level: 71,
      optimus_code: 10,
    };
    // 发送请求
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
        self.dealFirstMovieListData(res.data)
      },
    });

  },

  /**
   * 处理首次获取的数据
   */
  dealFirstMovieListData(data){
    const movieDataArr = [];
    data.movieList.forEach(item =>{
      // 处理数据中图片的uri
      item.img = item.img.replace(/\/w.h/g,'');
      movieDataArr.push(item);
    });
    this.setData({
      movieNumber:data.total,
      movieIds:data.movieIds,
      movieData:movieDataArr
    })
    console.log(this.data.movieIds);
    console.log(this.data.movieData);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.movieOnInfoList();
    // const requestData = {
    //   token: "",
    //   optimus_uuid:
    //     "39245430D7EB11EAA062B9A8E7E6628CB29134344E634663A91DD911801103B8",
    //   optimus_risk_level: 71,
    //   optimus_code: 10,
    // };
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
  
    // wx.request({
    //   url: "https://m.maoyan.com/ajax/movieOnInfoList",
    //   method: "GET",
    //   data: requestData,
    //   header: {
    //     "Cache-Control": "max-age=0",
    //     "Accept-Encoding": "gzip, deflate, br",
    //     "Accept-Language": "zh-CN,zh;q=0.9",
    //   },
    //   success(res) {
    //     console.log(res);
    //   },
    // });
    let test2 = test.join(',');
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
