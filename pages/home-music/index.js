// pages/home-music/index.js
import { rankingStroe,rankingMap,playerStore} from "../../stroe/index"
import { getBannerList,getSongMenu } from "../../service/music"
import querRect from "../../utils/query-rect"
import throttle from "../../utils/throttle"
const thorttleQuerRect = throttle(querRect)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:0,
    bannerList: [],
    recommendSongs:[],
    hotSongMenu:[],
    recommendSongMenu:[],

    currentSong: {},
    isPlaying: false,
    playAnimState: "paused",
    show:false

  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()

    rankingStroe.dispatch("getRankingDataAction")
    this.setupPlayerStoreListener()

    

  },
  getRankingHandler(id) {
    // console.log(res);
    return (res) => {
      if (Object.keys(res).length === 0) return
      // console.log("id:", id);
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const songList = res.tracks.slice(0, 3)
      const playCount = res.playCount
      const rankingObj = { name, coverImgUrl, songList, playCount }
      const orginRankings = { ...this.data.rankings, [id]: rankingObj } //浅拷贝
      this.setData({
        rankings: orginRankings
      })
      // console.log(this.data.rankings);
    }
  },
  handleSearchClick:function () {
      //搜索跳转页面
    wx.navigateTo({
      url: '../detail-search/index',
    })
  },
  handleSwiperImageLoaded:function () {
    thorttleQuerRect(".image").then(res => {
      const rest = res[0]
      this.setData({ swiperHeight:rest.height})
    })
  },
  handlePlayBtnClick: function(event) {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
    // Propagation 繁殖
    // event.stopPropagation()
  },
  handlePlayBarClick: function() {
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + this.data.currentSong.id,
    })
  },
  handListBtnClick:function () {
    this.setData({ show:true })
  },
  onClose() {
    this.setData({ show: false });
  },
  getPageData() {
    getBannerList().then(res => {
      this.setData({ bannerList: res.banners })
    })
    getSongMenu().then(res => {
      this.setData({hotSongMenu:res.playlists})
      })
    getSongMenu("摇滚").then(res => {
      this.setData({recommendSongMenu:res.playlists})
    })
    
  },
  setupPlayerStoreListener:function () {
    rankingStroe.onState("hotRanking",(res) => {
      //排行榜
      if( !res.tracks) return
      const recommendSongs = res.tracks.slice(0,6)
      this.setData({recommendSongs:recommendSongs})
    }) 
    rankingStroe.onState("newRanking", this.getRankingHandler(0))
    rankingStroe.onState("orginRanking", this.getRankingHandler(2))
    rankingStroe.onState("upRanking", this.getRankingHandler(3))

       // 2.播放器监听
       playerStore.onStates(["currentSong", "isPlaying"], ({currentSong, isPlaying}) => {
        if (currentSong) this.setData({ currentSong })
        if (isPlaying !== undefined) {
          this.setData({ 
            isPlaying, 
            playAnimState: isPlaying ? "running": "paused" 
          })
        }
      })
  },
  hancleMoreClick() {
    this.navigateToDetailSongsPage("hotRanking")
  },
  handleRankingItemClick(event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongsPage(rankingName)
  },
  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.recommendSongs)
    playerStore.setState("playListIndex", index) 
  },
  navigateToDetailSongsPage(rankingName){
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
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