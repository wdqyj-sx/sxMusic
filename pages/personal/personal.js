// pages/personal/personal.js
import request from "../../utils/request";

let startY = 0;
let moveY = 0;
let moveDistanceY = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransForm:"",
    coverTransition:"",
    userInfo:"", //用户数据
    recentPlayList:[] //最近播放列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    let userInfo = wx.getStorageSync("userInfo")
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
      this.getRecentPlay(this.data.userInfo.userId)
    }
   
    //获取用户最近播放记录

  },
  async getRecentPlay(userId){
    let recentList = await request("/user/record",{uid:userId,type:0})
   
    let index = 0;
    let recentPlayList = recentList.allData.splice(0,10).map(item =>{
        item.id = index++;
        return item;
    })
    this.setData({
      recentPlayList
    })
  }
  ,

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

  },
  //跳转登录页
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})