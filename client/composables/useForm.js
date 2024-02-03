/* eslint-disable */

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * A composable function for Vue.js that manages form operations.
 * It handles fetching data using the provided GraphQL query and mapping function.
 * It also manages the form state including loading, error, and the fetched data.
 *
 * @param {Function} useQuery - The GraphQL query function to fetch data.
 * @param {object} query - The GraphQL query for fetching form data.
 * @param {object} variables - Variables for the GraphQL query.
 * @param {Function} mapFn - Function to map the query result to the desired data structure, with localization support.
 * @returns {object} - Returns an object containing the form state: `loading`, `error`, `data`, and a `refetch` function to re-fetch data.
 */
const useForm = (useQuery, query, variables, mapFn) => {
  const { t: $t } = useI18n()
  const data = ref(null)

  const { loading, error, result, refetch } = useQuery(query, variables, {
    fetchPolicy: 'network-only',
  })

  watch(result, () => {
    const mappedData = mapFn(result, $t)
    data.value = mappedData
  })

  return {
    loading,
    error,
    data,
    refetch,
  }
}

export default useForm
