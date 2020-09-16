import { proxyRefs } from '@vue/reactivity'
import { getCurrentInstance } from './component'
import { warn } from './warning'

// TODO: refine and merge RFC (https://github.com/vuejs/rfcs/pull/210)
// TODO: corresponding option (https://github.com/vuejs/rfcs/pull/135)

export function expose(values: Record<string, any>) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(
      instance.exposed || (instance.exposed = proxyRefs({})),
      values
    )
  } else if (__DEV__) {
    warn(
      `expose() is called when there is no active component instance to be ` +
        `associated with.`
    )
  }
}
