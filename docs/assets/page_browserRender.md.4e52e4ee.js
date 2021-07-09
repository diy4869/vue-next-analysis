import { o as e, c as d, f as o, a as l } from './app.03151976.js'
const c =
    '{"title":"浏览器渲染流程","description":"","frontmatter":{},"headers":[{"level":2,"title":"浏览器渲染流程","slug":"浏览器渲染流程"},{"level":3,"title":"回流","slug":"回流"},{"level":3,"title":"重绘","slug":"重绘"},{"level":3,"title":"总结","slug":"总结"}],"relativePath":"page/browserRender.md","lastUpdated":1625370642246}',
  i = {},
  r = l(
    '<h2 id="浏览器渲染流程"><a class="header-anchor" href="#浏览器渲染流程" aria-hidden="true">#</a> 浏览器渲染流程</h2><p>浏览器在拿到<code>HTML</code>的时候，会有以下步骤：</p><ul><li>解析<code>DOM</code>，生成<code>DOM tree</code>。</li><li>解析<code>CSS</code>，生成<code>CSS tree</code>。</li><li>合并<code>DOM tree</code>和<code>CSS tree</code>，生成<code>render tree</code>。</li><li>针对合并好的<code>render tree</code>去计算<code>layout</code>，并生成<code>layout tree</code>（这里是因为在<code>css</code>中，我们会通过<code>z-index</code>、<code>position</code>、<code>opacity</code>、<code>transform</code>、 <code>will-change</code>等一些属性，修改样式所产生的层级所触发的）。我们可以通过F12的<code>layer</code>，查看当前页面所产生的层，如果没有的话，可以通过<code>...</code>内有个<code>more tools</code>去找到<code>layer</code>进行查看。</li><li>至此，浏览器开始通过不断的<code>重绘（repaint）</code>和<code>回流（reflow）</code>开始渲染页面。</li><li>页面渲染完成。</li></ul>',
    3
  ),
  a = l(
    '<h3 id="回流"><a class="header-anchor" href="#回流" aria-hidden="true">#</a> 回流</h3><p>当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。</p><p>引起回流：</p><ul><li>页面首次渲染</li><li>浏览器窗口大小发生改变</li><li>元素尺寸或位置发生改变</li><li>元素内容变化（文字数量或图片大小等等）</li><li>元素字体大小变化</li><li>添加或者删除可见的DOM元素</li><li>激活CSS伪类（例如：:hover）</li><li>查询某些属性或调用某些方法</li></ul><h3 id="重绘"><a class="header-anchor" href="#重绘" aria-hidden="true">#</a> 重绘</h3><p>当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。</p><h3 id="总结"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>上面主要关注的部分是回流和重绘这2个阶段，每次操作DOM的时候，所产生的渲染开销，一般是指这2部分。所以现代的框架通过<code>Vitrual DOM</code>的形式，来解决问题，也就是虚拟DOM。</p><p>上面详细内容可以去极客时间搜索<b>浏览器工作原理</b>与实践了解。</p>',
    9
  )
i.render = function(l, c, i, t, h, s) {
  return (
    e(),
    d('div', null, [
      r,
      o(
        ' 以上具体内容参考[从输入URL开始建立前端知识体系](https://juejin.cn/post/6935232082482298911#heading-36) '
      ),
      a
    ])
  )
}
export default i
export { c as __pageData }
