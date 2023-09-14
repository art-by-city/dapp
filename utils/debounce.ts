import { debounce } from 'lodash'

export default (fn: (...args: any) => any, duration: number = 300) => {
  return debounce(fn, duration, { leading: true, trailing: false })
}
