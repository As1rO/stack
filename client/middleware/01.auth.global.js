import { useQuery } from '@vue/apollo-composable'
import { getJwtToken, removeJwtToken } from '../utils/local-storage'

export default defineNuxtRouteMiddleware(async (to) => {
  const jwtToken = getJwtToken()

  const loginPath = /\/login\/?$/.test(to.path)
  console.log('route', to.path === '/login/')

  if (loginPath) return

  if (!jwtToken) {
    console.log('in')
    return navigateTo('/login')
  }

  const VERIFY_TOKEN = gql`
    query VerifyToken($token: String!) {
      verifyToken(token: $token) {
        isValid
      }
    }
  `
  console.log('jwtToken', jwtToken)
  const {
    result: verifyTokenResult,
    onResult,
    onError,
  } = useQuery(VERIFY_TOKEN, {
    token: jwtToken,
  })

  await new Promise((resolve) => {
    onResult(
      () => {
        resolve()
      },
      { query: verifyTokenResult }
    )
    onError(
      () => {
        removeJwtToken()
        resolve()
        return navigateTo('/login')
      },
      { query: verifyTokenResult }
    )
  })
})
