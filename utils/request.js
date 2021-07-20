
import config from "./config";

export default (url,data={},type="GET") => {
  return new Promise((resolve,reject)=>{
      wx.request({
        url:config.host+url,
        data,
        type,
        success:(res)=>{
          resolve(res.data)
        },
        fail:(err)=>{
            reject(err)
        }
      })
  })
}