// pages/login/login.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
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
  //后端验证
  async formSubmit(e){
    let {phone,password} = this.data;
    console.log(phone,password)
    if(!phone|| phone.length<6||!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)){
      wx.showToast({
        title: '账号有误',
      })
      return;
    }
    if(!password){
      wx.showToast({
        title: '请输入密码',
      })
      return ;
    }
    let result = await request("/login/cellphone",{phone,password,isLogin:true});
    if(result.code === 200){
      wx.showToast({
        title: '登录成功',
        icon:'success'
      })
      //存储用户信息
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      //跳转至个人中心
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
      
    }
    else if(result.code === 400){
      wx.showToast({
        title: '手机号有误',
      })
    }
    else if(result.code === 502){
      wx.showToast({
        title: '密码有误',
      })
    }
    else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon:"error"
      })
    }
  },
  //前端验证
  handleInput(e){
    
     let type = e.currentTarget.dataset.key;
     let value = e.detail.value;
     let flag = true;
     if(type === 'phone'){
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      flag = phoneReg.test(value)
     }
     if(value.length < 6){
       wx.showToast({
        title: '位数不对',
        icon:"error"
       })
     } 
     else if(!flag){
       wx.showToast({
         title: '请输入手机号码',
         icon:"error"
       })
     }
     else {
       wx.hideToast({
         success: (res) => {
          this.setData({
            [type]:value
          })
         },
       })
     }
  }

  
})