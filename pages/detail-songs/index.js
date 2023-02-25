// pages/detail-songs/index.js
import { rankingStroe,playerStore } from "../../stroe/index"
import { getSongMenuDatails } from "../../service/music"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    ranking:"",
    rankingInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type
    this.setData({ type })
    if(type === "menu") {
      const id = options.id
      // console.log(id);
      getSongMenuDatails(id).then(res => {
        // console.log(res);
        this.setData({ rankingInfo: res.playlist })
      })

    }else if(type === "rank") {
      const ranking = options.ranking
      this.setData({ranking})
      rankingStroe.onState(ranking,this.getRankingDataHanlder)
    }
    
  },
  getRankingDataHanlder(res) {
     this.setData({ rankingInfo: res })

    },
  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.rankingInfo.tracks)
    playerStore.setState("playListIndex", index)
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