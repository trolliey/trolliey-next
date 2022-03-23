import axios from 'axios'
import useSwr from 'swr'

export const useRequest = (path: any, fetcher: any) => {
  if (!path) {
    throw new Error('Path is required')
  }
  const url = path
  const { data, error } = useSwr(
    url,
    //@ts-ignore
    fetcher ? fetcher : (...args: any) => axios.get(...args).then((res) => res)
  )
  return { data, error }
}
