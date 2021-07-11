import { o as e, c as r, b as t, d as a } from './app.c3e51dbf.js'
const l =
    '{"title":"结束","description":"","frontmatter":{},"headers":[{"level":2,"title":"结束","slug":"结束"}],"relativePath":"compiler/generateEnd.md","lastUpdated":1625906934193}',
  n = {},
  d = t(
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
  i = t(
    'p',
    null,
    [
      a(
        '到这里，整个编译环节就已经结束了。虽然内容挺多的，而且比较复杂。能看到这里，估计你也对整个编译过程有了个大概的了解。下一步将开始说明生成的'
      ),
      t('code', null, 'render function'),
      a('是如何转变为DOM的。')
    ],
    -1
  ),
  o = t(
    'p',
    null,
    '不过整个编译过程，更建议自己去断点调试，印象会更深入，毕竟看文你也不一定能看懂，而且我写的也不算简单。',
    -1
  )
n.render = function(t, a, l, n, s, c) {
  return e(), r('div', null, [d, i, o])
}
export default n
export { l as __pageData }
