import Axios from 'axios'
import qs from 'qs'
import { Loading } from 'element-ui'
import { httpUrl } from '@/utils/auth' // get token from cookie

let loading // 定义loading变量

function startLoading() { // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载数据中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() { // 使用Element loading-close 方法
  loading.close()
}
// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

Axios.defaults.timeout = 60000
Axios.defaults.baseURL = httpUrl()

// http request 拦截器
Axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // config.data = qs.stringify(config.data)
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    } else if (config.method === 'get') {
      const newParams = {}
      for (const key in config.params) {
        newParams[key] = encodeURIComponent(config.params[key])
      }
      config.params = newParams
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    } else {
      return config
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    const data = response.data
    // 隐藏等待框
    // tryHideFullScreenLoading()
    if (data.code === 200) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

const get = function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    showFullScreenLoading() // 显示等待框
    Axios.get(url, {
      params: params
    })
      .then(response => {
        tryHideFullScreenLoading() // 隐藏等待框
        resolve(response)
      })
      .catch(err => {
        tryHideFullScreenLoading() // 隐藏等待框
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */

const post = function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    showFullScreenLoading() // 显示等待框
    Axios.post(url, params)
      .then(response => {
        tryHideFullScreenLoading() // 隐藏等待框
        resolve(response)
      }, err => {
        tryHideFullScreenLoading() // 隐藏等待框
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

const patch = function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.patch(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

const put = function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.put(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

export default {
  post,
  get,
  patch,
  put
}
