import { nodeOps, render } from '@vue/runtime-test'
import { h, expose, ref } from '../src'

describe('api: expose', () => {
  test('component ref should only expose exposed properties', () => {
    const Child = {
      render() {},
      setup() {
        expose({
          foo: ref(1),
          bar: ref(2)
        })
        return {
          bar: ref(3),
          baz: ref(4)
        }
      }
    }
    const childRef = ref()
    const Parent = {
      setup() {
        return () => h(Child, { ref: childRef })
      }
    }
    const root = nodeOps.createElement('div')
    render(h(Parent), root)
    expect(childRef.value).toBeTruthy()
    expect(childRef.value.foo).toBe(1)
    expect(childRef.value.bar).toBe(2)
    expect(childRef.value.baz).toBeUndefined()
  })

  test('expose called outside of setup()', () => {
    expose({})
    expect(
      `expose() is called when there is no active component instance`
    ).toHaveBeenWarned()
  })
})
