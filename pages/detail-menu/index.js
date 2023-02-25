// pages/detail-menu/index.js
import { gethotSongMenu } from "../../service/music"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotMusic:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    gethotSongMenu().then(res => {
      this.setData({hotMusic:res.playlists})
    })

  },
  handleClick1(event) {
    // console.log(event.currentTarget.dataset.item);
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-songs/index?id=${item.id}&type=menu`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})