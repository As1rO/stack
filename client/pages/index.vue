<template>
  <div>salut</div>
  d
</template>

<script setup>
  import { useQuery } from '@vue/apollo-composable'
  import useForm from '../composables/useForm.js'
  import test from '../data-mappers/test.js'

  const GET_TESTL = gql`
    query ExampleQuery {
      users {
        id
        email
        firstname
      }
    }
  `

  const { loading, error, data } = useForm(useQuery, GET_TESTL, {}, test)
</script>
