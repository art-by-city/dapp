import _ from 'lodash'

const timeoutDuration = 300

export type AnyFunction = ((...args: any) => any)

export const debounce = (func: AnyFunction) => {
  return _.debounce(func, timeoutDuration, { leading: true, trailing: false })
}
