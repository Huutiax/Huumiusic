import huuRequest from './index'

export function getSongDetail(ids) {
  return huuRequest.get("/song/detail", {
    ids
  })
}
export function getSongLyric(id) {
  return huuRequest.get("/lyric", {
    id,
  })
}

