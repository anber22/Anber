import Cookies from 'js-cookie'

const TokenKey = 'aiot-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, data) {
  return Cookies.set(TokenKey, token, { expires: data })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
