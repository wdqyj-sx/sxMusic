// pages/search/search.js
import request from "../../utils/request"
let isSend = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent:"",
    historyList:[],
    searchList:[],
    hotList:[],
    placeholdData:"",
  },
searchChange(event){
  this.setData({
    searchContent:event.detail.value.trim()
  })
  if(isSend){
    return;
  }
  isSend = true;
  this.getSearchList()
  setTimeout(()=>{
    isSend = false
  },300)
},
//获取初始数据
async getInitData(){
  let initHot = await request("/search/hot/detail");
  let placehold = await request("/search/default");
  this.setData({
    placeholdData:placehold.data.showKeyword,
    hotList:initHot.data
    
  })
  
},
getHistroyList(){
  let historyList =  wx.getStorageSync('histroyList')
  if(historyList){
    this.setData({
      historyList
    })
  }
},
//清除输入内容
clearInput(){
  this.setData({
    searchContent:""
  })
  this.getSearchList()
},
//发送搜索请求
async getSearchList(){
  if(!this.data.searchContent){
    this.setData({
      searchList:[]
    })
    return;
  }
  let {searchContent,historyList} = this.data;
  let searchData = await request("/search",{keywords:searchContent,limit:10});
  this.setData({
    searchList:searchData.result.songs
  })
  //将搜索添加到历史记录中
  if(historyList.indexOf(searchContent) !== -1){
    historyList.splice(historyList.indexOf(searchContent),1);
  }
  else {
    historyList.unshift(searchContent)
  }
  this.setData({
    historyList
  })
  wx.setStorageSync('historyList', historyList)
  
},
//清除历史消息
deleteHistory(){
  wx.showModal({
    content:'确认删除吗？',
    success:(res)=>{
      if(res.confirm){
        this.setData({
          historyList:[]       
         })
         wx.setStorageSync('historyList', "")
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitData();
    this.getHistroyList();
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