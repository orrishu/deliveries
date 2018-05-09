const cache = {

  data: {},

  remove(url) {
    delete cache.data[url]
  },
  has(url) {
    return cache.data.hasOwnProperty(url) && cache.data[url] !== null
  },
  add(url, json) {
    cache.data[url] = json
  },
  get(url) {
    return cache.data[url]
  },
  clear() {
    cache.data = {}
  }
}
export default cache
