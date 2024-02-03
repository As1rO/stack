const appName = 'App'
const jwtTokenKey = `${appName}-JwtToken`

const getJwtToken = () => {
  return localStorage.getItem(jwtTokenKey)
}

const setJwtToken = (token) => {
  localStorage.setItem(jwtTokenKey, token)
}

const removeJwtToken = () => {
  localStorage.removeItem(jwtTokenKey)
}

export { getJwtToken, setJwtToken, removeJwtToken }
