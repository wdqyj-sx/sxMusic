// pages/personal/personal.js

let startY = 0;
let moveY = 0;
let moveDistanceY = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransForm:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  handleTouchStart(event){
    this.setData({
      coverTransition:""
    })
    //获取第一个手指的坐标
    startY = event.touches[0].clientY;
    
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistanceY = moveY - startY;
    if(moveDistanceY< 0){
      return ;
    }
    if(moveDistanceY >80) {

      moveDistanceY = 80;
    }
    console.log(moveDistanceY)
    this.setData({
      coverTransForm:`translateY(${moveDistanceY}rpx)`
    })
  },
  handleTouchEnd(event){
    this.setData({
      coverTransForm:"0rpx",
      coverTransition:'transform 1s linear'
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})