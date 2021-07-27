// pages/songDetail/songDetail.js
import request from "../../utils/request"
import pubSub from "pubsub-js"
//获取全局实例
const appInstsance = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId:'',
    musicTime:'0:00',
    songs:'',
    musicLink:'',
    currentTime:'0:00',
    currentWidth:'0',
    isPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       musicId:options.musicId
     })
     this.getMusicDetail(this.data.musicId)
     //创建音乐播放实例
     this.backgroundAudioManager = wx.getBackgroundAudioManager();
     //判断音乐是否在播放
     if(appInstsance.globalData.isPlay && appInstsance.globalData.musicId ===this.data.musicId){
       this.setData({
         isPlay:true
       })
     }
     //监听音乐播放进度
     this.backgroundAudioManager.onTimeUpdate(()=>{
       let currentTime = this.backgroundAudioManager.currentTime;
       let durationTime = this.backgroundAudioManager.duration;
       let minute = parseInt(currentTime/60);
       let sec = parseInt(currentTime - minute * 60 ).toString().length === 1?'0'+parseInt((currentTime - minute * 60 )):parseInt((currentTime - minute * 60 ));
       this.setData({
         currentWidth: parseInt(currentTime / durationTime * 450),
         currentTime:minute+":"+sec
       })
     })
     //监听音乐是否在播放
     this.backgroundAudioManager.onPlay(()=>{
      
       this.setData({
         isPlay:true
       })
       appInstsance.globalData.isPlay = true
       appInstsance.globalData.musicId = this.data.musicId
     })
     //监听音乐暂停或者停止
     this.backgroundAudioManager.onPause(()=>{
       this.setData({
         isPlay:false
       })
       appInstsance.globalData.isPlay = false

     })
     this.backgroundAudioManager.onStop(()=>{
       this.setData({
         isPlay:false
       })
       appInstsance.globalData.isPlay = false
     })
  },
//获取音乐详情
async getMusicDetail(musicId){
  console.log(musicId)
    let songDetail = await request("/song/detail",{ids:musicId})
    let songTime = songDetail.songs[0].dt;
    let minute =parseInt(songTime/1000/60);
    let sec = (parseInt(songTime/1000)-minute*60).toString().length===1?'0'+ (parseInt(songTime/1000)-minute*60): (parseInt(songTime/1000)-minute*60);
    this.setData({
      songs:songDetail.songs[0],
      songTime:minute+":"+sec
    })
},
//点击音乐播放/暂停的回调
handleMusicPlay(){
  let isPlay = !this.data.isPlay;
  let {musicId,musicLink} = this.data;
  this.musicControl(isPlay,musicId,musicLink);
},
//音乐播放/暂停的功能函数
async musicControl(isPlay,musicId,musicLink){
  if(isPlay) //播放音乐
  {
    if(!musicLink){
      //请求连接
      let musicData = await request("/song/url",{id:musicId});
      this.setData({
        musicLink:musicData.data[0].url,
      })

    }
    this.backgroundAudioManager.src = this.data.musicLink;
    this.backgroundAudioManager.title = this.data.songs.name;
    // this.setData({
    //   isPlay
    // })
  }else {
    //暂停音乐
    this.backgroundAudioManager.pause();
    // this.setData({
    //   isPlay
    // })
  }
},
//切歌
handleSwitch(event){
  let type = event.currentTarget.id;
  this.backgroundAudioManager.stop();
  
  pubSub.subscribe('musicId',(msg,musicId)=>{
   
    //更新歌曲信息
    this.getMusicDetail(musicId)
    //自动播放歌曲
    this.musicControl(true,musicId);
    pubSub.unsubscribe('musicId')
   
  })
  pubSub.publish('switchType',type);
},

//修改音乐播放状态
changePlayState(isPlay){
this.setData({
  isPlay
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