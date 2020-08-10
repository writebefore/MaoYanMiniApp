// Components/movieList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieImg: {
      type: String,
      value:
        "http://p0.meituan.net/moviemachine/94138dc0290a74b35786b6e3b8ece8607940668.jpg",
    },
    movieTitle: {
      type: String,
      value: "星际穿越",
    },
    version: {
      type: String,
      value: "v2d imax",
    },
    score:{
      type:String,
      value:"暂无"
    },
    actor:{
      type:String,
      value:"未知"
    },
    showInfo:{
      type:String,
      value:"未知"
    },
    btnType:{
      type:String,
      value:"sellBtn"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadVersion(str) {
      console.log(str);
      switch (str) {
        case "v2d imax":
          this.setData({
            version:"2DIMAX"
          })
          break;
        case "v3d imax":
          this.setData({
            version:"3DIMAX"
          })
          break;
        case "v3d":
          this.setData({
            version:"3D"
          })
          break;
        default:
          this.setData({
            version:""
          })
          break;
      }
    },
  },

  lifetimes: {
    attached() {
      this.loadVersion(this.data.version);
    },
  },
});
