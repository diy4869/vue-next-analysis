import { parse, SFCScriptCompileOptions, compileScript } from '../src'
import { parse as babelParse } from '@babel/parser'
import { babelParserDefaultPlugins } from '@vue/shared'

function compile(src: string, options?: SFCScriptCompileOptions) {
  const { descriptor } = parse(src)
  return compileScript(descriptor, options)
}

function assertCode(code: string) {
  // parse the generated code to make sure it is valid
  try {
    babelParse(code, {
      sourceType: 'module',
      plugins: [...babelParserDefaultPlugins, 'typescript']
    })
  } catch (e) {
    console.log(code)
    throw e
  }
  expect(code).toMatchSnapshot()
}

describe('SFC compile <script setup>', () => {
  test('should hoist imports', () => {
    assertCode(
      compile(`<script setup>import { ref } from 'vue'</script>`).content
    )
  })

  test('explicit setup signature', () => {
    assertCode(
      compile(`<script setup="props, { emit }">emit('foo')</script>`).content
    )
  })

  test('import dedupe between <script> and <script setup>', () => {
    const { content } = compile(`
      <script>
      import { x } from './x'
      </script>
      <script setup>
      import { x } from './x'
      x()
      </script>
      `)
    assertCode(content)
    expect(content.indexOf(`import { x }`)).toEqual(
      content.lastIndexOf(`import { x }`)
    )
  })

  describe('exports', () => {
    test('export const x = ...', () => {
      const { content, bindings } = compile(
        `<script setup>export const x = 1</script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        x: 'setup'
      })
    })

    test('export const { x } = ... (destructuring)', () => {
      const { content, bindings } = compile(`<script setup>
          export const [a = 1, { b } = { b: 123 }, ...c] = useFoo()
          export const { d = 2, _: [e], ...f } = useBar()
        </script>`)
      assertCode(content)
      expect(bindings).toStrictEqual({
        a: 'setup',
        b: 'setup',
        c: 'setup',
        d: 'setup',
        e: 'setup',
        f: 'setup'
      })
    })

    test('export function x() {}', () => {
      const { content, bindings } = compile(
        `<script setup>export function x(){}</script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        x: 'setup'
      })
    })

    test('export class X() {}', () => {
      const { content, bindings } = compile(
        `<script setup>export class X {}</script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        X: 'setup'
      })
    })

    test('export { x }', () => {
      const { content, bindings } = compile(
        `<script setup>
           const x = 1
           const y = 2
           export { x, y }
          </script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        x: 'setup',
        y: 'setup'
      })
    })

    test(`export { x } from './x'`, () => {
      const { content, bindings } = compile(
        `<script setup>
           export { x, y } from './x'
          </script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        x: 'setup',
        y: 'setup'
      })
    })

    test(`export default from './x'`, () => {
      const { content, bindings } = compile(
        `<script setup>
          export default from './x'
          </script>`,
        {
          babelParserPlugins: ['exportDefaultFrom']
        }
      )
      assertCode(content)
      expect(bindings).toStrictEqual({})
    })

    test(`export { x as default }`, () => {
      const { content, bindings } = compile(
        `<script setup>
          import x from './x'
          const y = 1
          export { x as default, y }
          </script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        y: 'setup'
      })
    })

    test(`export { x as default } from './x'`, () => {
      const { content, bindings } = compile(
        `<script setup>
          export { x as default, y } from './x'
          </script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        y: 'setup'
      })
    })

    test(`export * from './x'`, () => {
      const { content, bindings } = compile(
        `<script setup>
          export * from './x'
          export const y = 1
          </script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        y: 'setup'
        // in this case we cannot extract bindings from ./x so it falls back
        // to runtime proxy dispatching
      })
    })

    test('export default in <script setup>', () => {
      const { content, bindings } = compile(
        `<script setup>
          export default {
            props: ['foo']
          }
          export const y = 1
          </script>`
      )
      assertCode(content)
      expect(bindings).toStrictEqual({
        foo: 'props',
        y: 'setup'
      })
    })
  })

  describe('<script setup lang="ts">', () => {
    test('hoist type declarations', () => {
      const { content, bindings } = compile(`
      <script setup lang="ts">
        export interface Foo {}
        type Bar = {}
        export const a = 1
      </script>`)
      assertCode(content)
      expect(bindings).toStrictEqual({ a: 'setup' })
    })

    test('extract props', () => {
      const { content } = compile(`
      <script setup="myProps" lang="ts">
      interface Test {}

      type Alias = number[]

      declare const myProps: {
        string: string
        number: number
        boolean: boolean
        object: object
        objectLiteral: { a: number }
        fn: (n: number) => void
        functionRef: Function
        objectRef: Object
        array: string[]
        arrayRef: Array<any>
        tuple: [number, number]
        set: Set<string>
        literal: 'foo'
        optional?: any
        recordRef: Record<string, null>
        interface: Test
        alias: Alias

        union: string | number
        literalUnion: 'foo' | 'bar'
        literalUnionMixed: 'foo' | 1 | boolean
        intersection: Test & {}
      }
      </script>`)
      assertCode(content)
      expect(content).toMatch(`string: { type: String, required: true }`)
      expect(content).toMatch(`number: { type: Number, required: true }`)
      expect(content).toMatch(`boolean: { type: Boolean, required: true }`)
      expect(content).toMatch(`object: { type: Object, required: true }`)
      expect(content).toMatch(`objectLiteral: { type: Object, required: true }`)
      expect(content).toMatch(`fn: { type: Function, required: true }`)
      expect(content).toMatch(`functionRef: { type: Function, required: true }`)
      expect(content).toMatch(`objectRef: { type: Object, required: true }`)
      expect(content).toMatch(`array: { type: Array, required: true }`)
      expect(content).toMatch(`arrayRef: { type: Array, required: true }`)
      expect(content).toMatch(`tuple: { type: Array, required: true }`)
      expect(content).toMatch(`set: { type: Set, required: true }`)
      expect(content).toMatch(`literal: { type: String, required: true }`)
      expect(content).toMatch(`optional: { type: null, required: false }`)
      expect(content).toMatch(`recordRef: { type: Object, required: true }`)
      expect(content).toMatch(`interface: { type: Object, required: true }`)
      expect(content).toMatch(`alias: { type: Array, required: true }`)
      expect(content).toMatch(
        `union: { type: [String, Number], required: true }`
      )
      expect(content).toMatch(
        `literalUnion: { type: [String, String], required: true }`
      )
      expect(content).toMatch(
        `literalUnionMixed: { type: [String, Number, Boolean], required: true }`
      )
      expect(content).toMatch(`intersection: { type: Object, required: true }`)
    })

    test('extract emits', () => {
      const { content } = compile(`
      <script setup="_, { emit: myEmit }" lang="ts">
      declare function myEmit(e: 'foo' | 'bar'): void
      declare function myEmit(e: 'baz', id: number): void
      </script>
      `)
      assertCode(content)
      expect(content).toMatch(
        `declare function __emit__(e: 'foo' | 'bar'): void`
      )
      expect(content).toMatch(
        `declare function __emit__(e: 'baz', id: number): void`
      )
      expect(content).toMatch(
        `emits: ["foo", "bar", "baz"] as unknown as undefined`
      )
    })
  })

  describe('CSS vars injection', () => {
    test('<script> w/ no default export', () => {
      assertCode(
        compile(
          `<script>const a = 1</script>\n` +
            `<style vars="{ color }">div{ color: var(--color); }</style>`
        ).content
      )
    })

    test('<script> w/ default export', () => {
      assertCode(
        compile(
          `<script>export default { setup() {} }</script>\n` +
            `<style vars="{ color }">div{ color: var(--color); }</style>`
        ).content
      )
    })

    test('<script> w/ default export in strings/comments', () => {
      assertCode(
        compile(
          `<script>
          // export default {}
          export default {}
        </script>\n` +
            `<style vars="{ color }">div{ color: var(--color); }</style>`
        ).content
      )
    })

    test('w/ <script setup>', () => {
      assertCode(
        compile(
          `<script setup>export const color = 'red'</script>\n` +
            `<style vars="{ color }">div{ color: var(--color); }</style>`
        ).content
      )
    })
  })

  describe('async/await detection', () => {
    function assertAwaitDetection(code: string, shouldAsync = true) {
      const { content } = compile(`<script setup>${code}</script>`)
      expect(content).toMatch(
        `export ${shouldAsync ? `async ` : ``}function setup`
      )
    }

    test('expression statement', () => {
      assertAwaitDetection(`await foo`)
    })

    test('variable', () => {
      assertAwaitDetection(`const a = 1 + (await foo)`)
    })

    test('export', () => {
      assertAwaitDetection(`export const a = 1 + (await foo)`)
    })

    test('nested statements', () => {
      assertAwaitDetection(`if (ok) { await foo } else { await bar }`)
    })

    test('should ignore await inside functions', () => {
      // function declaration
      assertAwaitDetection(`export async function foo() { await bar }`, false)
      // function expression
      assertAwaitDetection(`const foo = async () => { await bar }`, false)
      // object method
      assertAwaitDetection(`const obj = { async method() { await bar }}`, false)
      // class method
      assertAwaitDetection(
        `const cls = class Foo { async method() { await bar }}`,
        false
      )
    })
  })

  describe('reactive let bindings', () => {
    test('convert let values', () => {
      const { content } = compile(`<script setup>
      export let a = 1
      let b = {
        count: 0
      }
      let c = () => {}
      let d
      </script>`)
      expect(content).toMatch(`import { ref as __ref__ } from 'vue'`)
      expect(content).not.toMatch(`export let a`)
      expect(content).toMatch(`let a = __ref__(1)`)
      expect(content).toMatch(`
      let b = __ref__({
        count: 0
      })
      `)
      expect(content).toMatch(`let c = __ref__(() => {})`)
      expect(content).toMatch(`let d = __ref__()`)
      assertCode(content)
    })

    test('multi let declarations', () => {
      const { content } = compile(`<script setup>
      export let a = 1, b = 2, c = {
        count: 0
      }
      </script>`)
      expect(content).toMatch(`
      let a = __ref__(1), b = __ref__(2), c = __ref__({
        count: 0
      })
      `)
      assertCode(content)
    })

    test('should not convert const values', () => {
      const { content } = compile(`<script setup>
      export const a = 1
      const b = 2
      </script>`)
      expect(content).toMatch(`const a = 1`)
      expect(content).toMatch(`b = 2`)
    })

    test('accessing let binding', () => {
      const { content } = compile(`<script setup>
      let a = 1
      console.log(a)
      function get() {
        return a + 1
      }
      </script>`)
      expect(content).toMatch(`console.log(a.value)`)
      expect(content).toMatch(`return a.value + 1`)
      assertCode(content)
    })

    test('cases that should not append .value', () => {
      const { content } = compile(`<script setup>
      let a = 1
      console.log(b.a)
      function get(a) {
        return a + 1
      }
      </script>`)
      expect(content).not.toMatch(`a.value`)
    })

    test('mutating let binding', () => {
      const { content } = compile(`<script setup>
      let a = 1
      let b = { count: 0 }
      function inc() {
        a++
        a = a + 1
        b.count++
        b.count = b.count + 1
      }
      </script>`)
      expect(content).toMatch(`a.value++`)
      expect(content).toMatch(`a.value = a.value + 1`)
      expect(content).toMatch(`b.value.count++`)
      expect(content).toMatch(`b.value.count = b.value.count + 1`)
      assertCode(content)
    })

    test('using let binding in property shorthand', () => {
      const { content } = compile(`<script setup>
      let a = 1
      const b = { a }
      function test() {
        const { a } = b
      }
      </script>`)
      expect(content).toMatch(`const b = { a: a.value }`)
      // should not convert destructure
      expect(content).toMatch(`const { a } = b`)
      assertCode(content)
    })
  })

  describe('errors', () => {
    test('<script> and <script setup> must have same lang', () => {
      expect(() =>
        compile(`<script>foo()</script><script setup lang="ts">bar()</script>`)
      ).toThrow(`<script> and <script setup> must have the same language type`)
    })

    test('export local as default', () => {
      expect(() =>
        compile(`<script setup>
          const bar = 1
          export { bar as default }
        </script>`)
      ).toThrow(`Cannot export locally defined variable as default`)
    })

    test('export default referencing local var', () => {
      expect(() =>
        compile(`<script setup>
          const bar = 1
          export default {
            props: {
              foo: {
                default: () => bar
              }
            }
          }
        </script>`)
      ).toThrow(`cannot reference locally declared variables`)
    })

    test('export default referencing exports', () => {
      expect(() =>
        compile(`<script setup>
        export const bar = 1
        export default {
          props: bar
        }
      </script>`)
      ).toThrow(`cannot reference locally declared variables`)
    })

    test('should allow export default referencing scope var', () => {
      assertCode(
        compile(`<script setup>
          const bar = 1
          export default {
            props: {
              foo: {
                default: bar => bar + 1
              }
            }
          }
        </script>`).content
      )
    })

    test('should allow export default referencing imported binding', () => {
      assertCode(
        compile(`<script setup>
          import { bar } from './bar'
          export { bar }
          export default {
            props: {
              foo: {
                default: () => bar
              }
            }
          }
        </script>`).content
      )
    })

    test('should allow export default referencing re-exported binding', () => {
      assertCode(
        compile(`<script setup>
          export { bar } from './bar'
          export default {
            props: {
              foo: {
                default: () => bar
              }
            }
          }
        </script>`).content
      )
    })

    test('error on duplicated default export', () => {
      expect(() =>
        compile(`
      <script>
      export default {}
      </script>
      <script setup>
      export default {}
      </script>
      `)
      ).toThrow(`Default export is already declared`)

      expect(() =>
        compile(`
      <script>
      export default {}
      </script>
      <script setup>
      const x = {}
      export { x as default }
      </script>
      `)
      ).toThrow(`Default export is already declared`)

      expect(() =>
        compile(`
      <script>
      export default {}
      </script>
      <script setup>
      export { x as default } from './y'
      </script>
      `)
      ).toThrow(`Default export is already declared`)

      expect(() =>
        compile(`
      <script>
      export { x as default } from './y'
      </script>
      <script setup>
      export default {}
      </script>
      `)
      ).toThrow(`Default export is already declared`)

      expect(() =>
        compile(`
      <script>
      const x = {}
      export { x as default }
      </script>
      <script setup>
      export default {}
      </script>
      `)
      ).toThrow(`Default export is already declared`)
    })
  })
})

describe('SFC analyze <script> bindings', () => {
  it('recognizes props array declaration', () => {
    const { bindings } = compile(`
      <script>
        export default {
          props: ['foo', 'bar']
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'props', bar: 'props' })
  })

  it('recognizes props object declaration', () => {
    const { bindings } = compile(`
      <script>
        export default {
          props: {
            foo: String,
            bar: {
              type: String,
            },
            baz: null,
            qux: [String, Number]
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({
      foo: 'props',
      bar: 'props',
      baz: 'props',
      qux: 'props'
    })
  })

  it('recognizes setup return', () => {
    const { bindings } = compile(`
      <script>
        const bar = 2
        export default {
          setup() {
            return {
              foo: 1,
              bar
            }
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'setup', bar: 'setup' })
  })

  it('recognizes async setup return', () => {
    const { bindings } = compile(`
      <script>
        const bar = 2
        export default {
          async setup() {
            return {
              foo: 1,
              bar
            }
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'setup', bar: 'setup' })
  })

  it('recognizes data return', () => {
    const { bindings } = compile(`
      <script>
        const bar = 2
        export default {
          data() {
            return {
              foo: null,
              bar
            }
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'data', bar: 'data' })
  })

  it('recognizes methods', () => {
    const { bindings } = compile(`
      <script>
        export default {
          methods: {
            foo() {}
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'options' })
  })

  it('recognizes computeds', () => {
    const { bindings } = compile(`
      <script>
        export default {
          computed: {
            foo() {},
            bar: {
              get() {},
              set() {},
            }
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'options', bar: 'options' })
  })

  it('recognizes injections array declaration', () => {
    const { bindings } = compile(`
      <script>
        export default {
          inject: ['foo', 'bar']
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'options', bar: 'options' })
  })

  it('recognizes injections object declaration', () => {
    const { bindings } = compile(`
      <script>
        export default {
          inject: {
            foo: {},
            bar: {},
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({ foo: 'options', bar: 'options' })
  })

  it('works for mixed bindings', () => {
    const { bindings } = compile(`
      <script>
        export default {
          inject: ['foo'],
          props: {
            bar: String,
          },
          setup() {
            return {
              baz: null,
            }
          },
          data() {
            return {
              qux: null
            }
          },
          methods: {
            quux() {}
          },
          computed: {
            quuz() {}
          }
        }
      </script>
    `)
    expect(bindings).toStrictEqual({
      foo: 'options',
      bar: 'props',
      baz: 'setup',
      qux: 'data',
      quux: 'options',
      quuz: 'options'
    })
  })

  it('works for script setup', () => {
    const { bindings } = compile(`
      <script setup>
        export default {
          props: {
            foo: String,
          },
        }
      </script>
    `)
    expect(bindings).toStrictEqual({
      foo: 'props'
    })
  })
})
