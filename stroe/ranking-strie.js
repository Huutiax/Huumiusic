import { HYEventStore } from "hy-event-store"

import { getRankings } from "../service/music"
const rankingMap = { 0: "newRanking", 1: "hotRanking", 2: "orginRanking", 3: "upRanking" }
const rankingStroe = new HYEventStore({
  state: {
    hotRanking: {},     //热歌        3778678
    newRanking: {},      //新歌        3779629
    orginRanking: {},    //原创        2884035
    upRanking: {}        //飙升        19723756
  },
  actions: {
    getRankingDataAction(ctx) {
      getRankings(3778678).then(res => {
      ctx.hotRanking = res.playlist
      })
      getRankings(3779629).then(res => {
        // console.log(res.playlist);
        ctx.newRanking = res.playlist
      })
      getRankings(2884035).then(res => {
        // console.log(res.playlist);
        ctx.orginRanking = res.playlist
      })
      getRankings(19723756).then(res => {
        ctx.upRanking = res.playlist
      })
    }
  }
})
export {
  rankingStroe,
  rankingMap
}