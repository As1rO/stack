import { from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { provideApolloClient } from '@vue/apollo-composable'
import { getJwtToken } from '../utils/local-storage'

/*
 * Sources:
 * - https://github.com/vuejs/apollo/issues/24
 * - https://github.com/nuxt-modules/apollo/issues/442
 * - https://dev.to/marvinrabe/file-upload-with-vue-apollo-client-and-graphql-5emb
 */

export default defineNuxtPlugin((nuxtApp) => {
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
      },
    }
  })

  $apollo.defaultClient.setLink(from([errorLink, authLink]))
  provideApolloClient($apollo.defaultClient)
})
