const BASE_URL = "https://www.codeman.ink/api"
class HuuRequest {
  request(url,method,params) {
   return new Promise((resolve,reject) => {
    wx.request({
      url:BASE_URL + url,
      method:method,
      data:params,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
   })

  }

  get(url,params) {
    return this.request(url,"GET",params)
  }
  post(url,data) {
    return this.request(url,"POST",data)
  }
}
const huuRequest = new HuuRequest()
export default huuRequest
