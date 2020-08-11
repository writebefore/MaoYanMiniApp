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
      type:Number,
      value:0
    },
    wish:{
      type:Number,
      value:0
    },
    actor:{
      type:String,
      value:"未知"
    },
    showInfo:{
      type:String,
      value:"未知"
    },
    showst:{
      type:Number,
      value:3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnType:"sellBtn",
    sellType:"购票"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadVersion(str) {
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
    loadBtn(showst){
      if(showst === 3){
        this.setData({
          btnType:"sellBtn",
          sellType:"购票"
        })
      }else if(showst === 4){
        this.setData({
          btnType:"presellBtn",
          sellType:"预售"
        })
        console.log(this.data.sellType);
      }
    }
  },

  lifetimes: {
    attached() {
      this.loadVersion(this.data.version);
      this.loadBtn(this.data.showst);
    },
  },
});
