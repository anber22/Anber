import Cookies from 'js-cookie'

const TokenKey = 'aiot-token'

const UserInfo = 'user-info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, data) {
  return Cookies.set(TokenKey, token, { expires: data })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfo, userInfo)
}

export function getUserInfo() {
  return JSON.parse(Cookies.get(UserInfo))
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
