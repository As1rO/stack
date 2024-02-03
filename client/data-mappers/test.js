import { toRaw } from 'vue'

const mapTest = (queryData) => {
  const journals = toRaw(queryData?.value?.journals)

  return journals
}

export default mapTest
