import { toRaw } from 'vue'

const mapJournals = (queryData) => {
  console.log('queryData', queryData)
  const journals = toRaw(queryData?.value?.journals)

  return journals
}

export default mapJournals
