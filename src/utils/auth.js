import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

export function httpUrl() {
  // return "http://10.202.202.71:8081/Patriarch"
  return 'http://47.92.164.250:3000'
}


export function getToken(token) {
  return Cookies.get(token)
}

export function setToken(TokenKey,token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(token) {
  return Cookies.remove(token)
}

