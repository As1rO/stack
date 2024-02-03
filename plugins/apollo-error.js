import { removeJwtToken } from '../utils/local-storage'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('apollo:error', (error) => {
    if (error?.networkError?.statusCode === 401) {
      removeJwtToken()
    }
  })
})
