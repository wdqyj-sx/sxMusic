// pages/video/video.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[] ,//导航标签数据
    navId:"",//导航标识
    videoList:[],//视频列表区
    videoId:"" ,//视频id
    playTimeList:[], //存储视频时间
    isRefresh:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getVideoGroupList()
  },
  //获取导航数据
async getVideoGroupList(){
  let getGroupList = await request("/video/group/list")
  this.setData({
    videoGroupList:getGroupList.data.slice(0,14),
    navId:getGroupList.data[0].id
  })
  wx.showLoading({
    title: '正在加载',
  })
  this.getVideoList(this.data.navId)
},
//获取视频数据
async getVideoList(navId){
  let videoData = await request("/video/group",{id:navId})
  let index = 0;
  let videoList = videoData.datas.map(item => {
    item.id = index++;
    return item;0
  })
  this.setData({
    videoList,
    isRefresh:false
  })
  wx.hideLoading();
  
},
//热点页面
toHot(){
  wx.navigateTo({
    url: '/pages/search/search',
  })
},

// 点击导航
changeNav(event){
  let navId = event.currentTarget.id;
  this.setData({
    navId:navId>>>0,
    videoList:[]
  }),
  wx.showLoading({
    title: '正在加载',
  })
  this.getVideoList(this.data.navId)
},
//处理视频播放事件
handlePlay(event){
  let id = event.currentTarget.id;
  this.setData({
    videoId:id
  })
  let videoContext = wx.createVideoContext(id)
  let {playTimeList} = this.data
  let timeObj = playTimeList.find(item => item.vid === id)
  if(timeObj){
    videoContext.seek(timeObj.time)
  }
  videoContext.play()
},
//处理视频结束
handleEnd(e){
  let id =  e.currentTarget.id;
  let {playTimeList} = this.data;
  playTimeList.splice(playTimeList.findIndex(item => item.id === id),1);
  this.setData({
    playTimeList
  })
},
//跟新视频播放时间
handlePlayTime(e){
  let playTimeObj = {vid:e.currentTarget.id,time:e.detail.currentTime};
  let {playTimeList} = this.data;
  let timeItem =   playTimeList.find(item => item.vid === playTimeObj.vid);
  if(timeItem){
    timeItem.time = playTimeObj.time
  }else {
    playTimeList.push(playTimeObj)
  }
  this.setData({
    playTimeList
  })

},
//下拉视频刷新
handleRefreshToUp(){
  console.log('刷新')
  this.getVideoList(this.data.navId)
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