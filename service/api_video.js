import huuRequest from "./index"
export function getTopMV(offset,limit = 10) {
  return huuRequest.get("/top/mv",{
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 */
export function getMVURL(id) {
  return huuRequest.get("/mv/url",{
    id
  })
}
  /**
   * 请求mv的详情
   */
  export function getMVDatail(mvid) {
    return huuRequest.get("/mv/detail",{
      mvid
    })
  }
    /**
     * 请求mv的相关视频
     */
    export function getRelatedVideo(id) {
      return huuRequest.get("/related/allvideo",{
        id
      })
      
    }
    
  
