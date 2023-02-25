// pages/detail-search/index.js
import { getSearchHot,getSearchSuggest,getSearchResult } from "../../service/api_search"
import { playerStore } from "../../stroe/index"
import { stringToNodes } from '../../utils/string-To-nodes'
import debounce from "../../utils/debounce"
const debounceGetSearchSuggest = debounce(getSearchSuggest,300)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyWords: [],
    suggestSongs:[],
    suggestSongsNodes:[],
    searchValue:"",
    resultSongs:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()
  },
  getPageData() {
    getSearchHot().then(res => {
      // console.log(res);
      this.setData({ hotKeyWords: res.result.hots })
    })
  },
  bandleSearchChange(even) {
    const searchValue = even.detail

    this.setData({searchValue})
    
    if( !searchValue.length) {
      this.setData({ suggestSongs:[]})
      return
    }
    debounceGetSearchSuggest(searchValue).then( res => {
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      if (!suggestSongs) return
      // 2.构成nodes节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      // console.log(suggestKeywords);
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },
  handleSearchAction() {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({ resultSongs: res.result.songs })
    })
  },
  // 点击关键字搜索
  handleSuggestItemClick(event) {
    // 1.获取点击的关键字
    // console.log(event);
    const index = event.currentTarget.dataset.index
    const keyword = this.data.suggestSongs[index].keyword
    // console.log(keyword);
    // 2.将关键字设置到searchValue中
    this.setData({ searchValue: keyword })
    // 3.发送网络请求
    this.handleSearchAction()
    // getSearchResult(keyword).then(res => {
    //   // console.log(res.result.songs);
    //   this.setData({ resultSongs: res.result.songs })
    // })
  },
  // 点击热门搜索关键字进行查询
  handleSearchTagItemClick(event) {
    // console.log(event.currentTarget.dataset.item);
    const keyword = event.currentTarget.dataset.keyword
    this.setData({ searchValue: keyword })
    this.handleSearchAction()
  },
  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.resultSongs)
    playerStore.setState("playListIndex", index)
  },

})