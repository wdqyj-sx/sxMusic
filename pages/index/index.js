// pages/index/index.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bannerList:[],
      recommendList:[],
      topListData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      let bannerListData = await request("/banner",{type:2});
      this.setData({
        bannerList:bannerListData.banners
      })
      let recommendLists = await request("/personalized",{limit:10});
      this.setData({
        recommendList:recommendLists.result
      })
      //排行榜数据
      let index = 0;
      let arr=[];
      while(index < 5){
        let topList = await request("/top/list",{idx:index++});
        let topListItem = {
          name:topList.playlist.name,
          tracks:topList.playlist.tracks.slice(0,3)
        };
        arr.push(topListItem);
        this.setData({
          topListData:arr
        })
       
      }
     
  },
toCommendPage(){
  wx.navigateTo({
    url: '/pages/recommendSong/recommendSong',
  })
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