
import config from "./config";

export default (url,data={},method="GET") => {
  return new Promise((resolve,reject)=>{
      wx.request({
        url:config.host+url,
        data,
        method,
       header:{
        cookie:wx.getStorageSync('cookies') ,
       },
        success:(res)=>{
          if(data.isLogin){
            let cookies = res.cookies.find(item =>item.includes("MUSIC_U"))
            wx.setStorageSync('cookies', cookies)
            console.log(wx.getStorageSync('cookies'))
          }
          resolve(res.data)
        },
        fail:(err)=>{
            reject(err)
        }
      })
  })
}