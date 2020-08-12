// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前城市
    localCity: "未知",

    // header标签选中热映
    isChoose: true,

    // 电影数据列表的长度
    movieNumber: 0,

    // 当期获取到第几条数据
    total: 0,

    // 后续获取的电影列表
    everyNumber: 10,

    // 电影的movieIds，后续的数据获取需使用
    movieIds: [],

    // 电影的数据保存，用于生成列表
    movieData: [],

    // 是否到达底部
    isLoading:false,
    isBottom:false,
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
   * 显示底部load加载
   */
  showBottomLoad(){
    this.setData({
      isLoading:true
    })
  },

  /**
   * 隐藏底部load加载
   */
  hiddenBottomLoad(){
    this.setData({
      isLoading:false
    })
  },

  /**
   * 显示到底了
   */
  showAtBottom(){
    this.setData({
      isBottom:true
    })
  },

  /**
   * 首次获取数据
   */
  movieOnInfoList() {
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
        console.log(res);
        self.dealFirstMovieListData(res.data);
      },
    });
  },
  /**
   * 后续数据的获取
   */
  afterMovieListData() {
    const self = this;
    const needMovieIds = this.getAfterMovieIds().join(",");
    wx.request({
      url: "https://m.maoyan.com/ajax/moreComingList",
      method: "GET",
      data: {
        token: "",
        movieIds: needMovieIds,
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
        self.dealAfterMovieListData(res.data);
      },
    });
  },

  /**
   * 获取当前要获取的电影id
   */
  getAfterMovieIds() {
    let resIds = [];
    const total = this.data.total;
    const movieIds = this.data.movieIds; //电影Id列表
    const everyNumber = this.data.everyNumber; //电影每次获取条数
    const surplus = this.data.movieNumber - total; //剩余电影数据条数
    if (surplus < this.data.everyNumber) {
      resIds = movieIds.slice(total);
    } else {
      resIds = movieIds.slice(total, total + everyNumber);
    }
    return resIds;
  },

  /**
   * 处理获取的数据
   */
  dealFirstMovieListData(data) {
    const movieDataArr = [];
    data.movieList.forEach((item) => {
      // 处理数据中图片的uri
      item.img = item.img.replace(/\/w.h/g, "");
      movieDataArr.push(item);
    });
    this.setData({
      movieNumber: data.total,
      movieIds: data.movieIds,
      movieData: movieDataArr,
    });
    this.recordNowTotal();
  },

  /**
   * 后续数据的获取处理
   */
  dealAfterMovieListData(data) {
    let afterMovieDataArr = [];
    data.coming.forEach((item) => {
      item.img = item.img.replace(/\/w.h/g, "");
      afterMovieDataArr.push(item);
    });
    afterMovieDataArr = this.data.movieData.concat(afterMovieDataArr);
    this.setData({
      movieData: afterMovieDataArr,
    });
    this.hiddenBottomLoad()
    this.recordNowTotal();
  },

  /**
   * 记录当前数据的总数量
   */
  recordNowTotal() {
    this.setData({
      total: this.data.movieData.length,
    });
    console.log("现在数据条数为：", this.data.total);
  },

  /**
   * 获取当前城市位置
   */
  getCity(){
    wx.getLocation({
      success: (res)=>{
        // console.log(res);
        wx.request({
          url:"https://api.map.baidu.com/reverse_geocoding/v3",
          data:{
            ak:"cXEgpe8l8CzOpZQ69DXb1dWfofyPLnIb",
            output:"json",
            coordtype:"wgs84ll",
            location:`${res.latitude},${res.longitude}`
          },
          success:(res)=>{
            // console.log(res);
            this.setData({
              localCity:res.data.result.addressComponent.city
            })
          },
          fail:(err)=>{
            console.log(err);
          }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCity();
    wx.showLoading({
      title:"加载中...",
      mask:true
    });
    this.movieOnInfoList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
  },

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
  onReachBottom: function () {
    if (this.data.total < this.data.movieNumber) {
      this.showBottomLoad();
      this.afterMovieListData();
    }else{
      this.showAtBottom();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
