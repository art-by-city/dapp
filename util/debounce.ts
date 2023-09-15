import _ from 'lodash'

const timeoutDuration = 300

export type VoidFunction = () => void

export const debounce = (func: VoidFunction) => {
  return _.debounce(func, timeoutDuration, { leading: true, trailing: false })
}
