// pages/home-video/index.js
// import huuRequest from '../../service/index'
import { getTopMV} from "../../service/api_video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs:[],
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) { 
    this.getTopMVdata(0)
    // const res=await getTopMV(0)
    // this.setData({ topMvs:res.data})
  },
  //封装网络请求的方法
  async getTopMVdata(offset) {
    //判断是否可以请求
    if(!this.data.hasMore ) return
    //展示加载动画
    wx.showNavigationBarLoading()
    //真正请求数据
    const res=await getTopMV(offset)
    let newData = this.data.topMvs
    if(offset == 0) {
      newData = res.data
    }else {
      newData = newData.concat(res.data)
    }
    //设置数据
    this.setData({ topMvs:newData})
    this.setData({hasMore:res.hasMore})
    wx.hideNavigationBarLoading()
    if( offset == 0) {
      wx.stopPullDownRefresh()
    }
  },
  handleVideoItemClick: function (event) {
    //获取id
    const id = event.currentTarget.dataset.item.id
    //页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}` ,
    })
  },
  //下拉刷新，要在.json开启
  onPullDownRefresh:async function() {
    //  const res=await getTopMV(0)
    //  this.setData({ topMvs:res.data})
    this.getTopMVdata(0)
  },



//滚动请求数据
  onReachBottom:async function() {
    // if( !this.data.hasMore) return
    // const res = await getTopMV(this.data.topMvs.length)
    // this.setData({ topMvs: this.data.topMvs.concat(res.data)})
    // this.setData({ hasMore:res.hasMore })
    this.getTopMVdata(this.data.topMvs.length)

  }

  
})