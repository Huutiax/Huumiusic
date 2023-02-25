import huuRequest from './index'
// 热门关键词 
export function getSearchHot() {
  return huuRequest.get("/search/hot")
}
// 搜索建议
export function getSearchSuggest(keywords) {
  return huuRequest.get("/search/suggest", {
    keywords,
    type: "mobile",
  })
}
// 搜索
export function getSearchResult(keywords) {
  return huuRequest.get("/cloudsearch", {
    keywords,
  })
}