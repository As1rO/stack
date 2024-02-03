import { createHttpLink, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import { provideApolloClient } from '@vue/apollo-composable'
import { getJwtToken } from '../utils/local-storage'

/*
 * Sources:
 * - https://github.com/vuejs/apollo/issues/24
 * - https://github.com/nuxt-modules/apollo/issues/442
 * - https://dev.to/marvinrabe/file-upload-with-vue-apollo-client-and-graphql-5emb
 */

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiUrl } = runtimeConfig.public
  const { $apollo } = useNuxtApp()
  const errorLink = onError((err) => {
    nuxtApp.callHook('apollo:error', err)
  })

  const authLink = setContext(async (_, { headers }) => {
    const jwtToken = getJwtToken()
    return {
      credentials: 'include',
      headers: {
        ...headers,
        Authorization: `Bearer ${jwtToken}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    }
  })

  const uploadLink = createUploadLink({
    uri: apiUrl,
  })

  const httpLink = authLink.concat(
    createHttpLink({
      uri: apiUrl,
    })
  )

  $apollo.defaultClient.setLink(
    from([errorLink, authLink, uploadLink, httpLink])
  )
  provideApolloClient($apollo.defaultClient)
})
