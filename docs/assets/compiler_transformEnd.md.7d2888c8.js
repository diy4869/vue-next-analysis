import { o as e, c as r, b as t, d as a } from './app.547ab472.js'
const l =
    '{"title":"结束","description":"","frontmatter":{},"headers":[{"level":2,"title":"结束","slug":"结束"}],"relativePath":"compiler/transformEnd.md","lastUpdated":1625828233701}',
  d = {},
  n = t(
    'h2',
    { id: '结束' },
    [
      t(
        'a',
        { class: 'header-anchor', href: '#结束', 'aria-hidden': 'true' },
        '#'
      ),
      a(' 结束')
    ],
    -1
  ),
  o = t(
    'p',
    null,
    [
      a('至此，整个'),
      t('code', null, 'transform'),
      a(
        '阶段也就结束了，虽然对一些内部转换逻辑未做说明，知道有这个内容就行了。下面的代码生成将是整个编译过程最后一部分。'
      )
    ],
    -1
  )
d.render = function(t, a, l, d, s, i) {
  return e(), r('div', null, [n, o])
}
export default d
export { l as __pageData }
