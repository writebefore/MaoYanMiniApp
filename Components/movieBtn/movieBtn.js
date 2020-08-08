// Components/movieBtn/movieBtn.js

/**
 * 按钮的类型
 * 购票 #DC5042 sellBtn 
 * 预售 #6BAEE5 presellBtn
 * 想看 #FAAF00 wantBtn
 * 收藏 #EEA79A interestBtn
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnType: {
      type: String,
      value: "sellBtn",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    btnReady(btnType = "sellBtn") {
      console.log(btnType);
      return btnType;
    },
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    created() {
      this.btnReady(this.btnType);
    },
  },
});
