import Cookies from 'js-cookie'

const TokenKey = 'aiot-token'

const UserInfo = 'user-info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, data) {
  return new Promise(resolve => {
    Cookies.set(TokenKey, token, { expires: data })
    resolve()
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfo, userInfo)
}

export function getUserInfo() {
  return Cookies.get(UserInfo) ? JSON.parse(Cookies.get(UserInfo)) : null
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
