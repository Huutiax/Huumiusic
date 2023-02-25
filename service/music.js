// service/music.js.js
import huuRequest from "./index"

export function getBannerList() {
    return huuRequest.get("/banner",{
        type:2
    })
}

export function getRankings(id) {
  return huuRequest.get("/playlist/detail",{
    id
  })
}

export function getSongMenu(cat="全部",limit=6,offset=0) {
  return huuRequest.get("/top/playlist",{
    cat,
    limit,
    offset
  })
}
export function gethotSongMenu(cat="全部",limit=50,offset=0) {
  return huuRequest.get("/top/playlist",{
    cat,
    limit,
    offset
  })
}
  
export function getSongList(id) {
  return huuRequest.get("/top/list",{
    id
  })
}

export function getSongMenuDatails(id) {
  return huuRequest.get("/playlist/detail", {
    id
  })
}

export function getMusicLyric(id) {
  return huuRequest.get("/lyric", {
    id,
    realIP: "42.91.0.126"
  })
}
