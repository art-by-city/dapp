import { debounce } from 'lodash'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export default (fn: (...args: any[]) => any, duration: number = 300) => {
  return debounce(fn, duration, { leading: true, trailing: false })
}
