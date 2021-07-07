import { o as n, c as s, a } from './app.015d3e56.js'
const p =
    '{"title":"解析标签","description":"","frontmatter":{},"headers":[{"level":2,"title":"解析标签","slug":"解析标签"},{"level":2,"title":"总结","slug":"总结"}],"relativePath":"compiler/parseTag.md","lastUpdated":1625569027274}',
  t = {},
  o = a(
    '<h2 id="解析标签"><a class="header-anchor" href="#解析标签" aria-hidden="true">#</a> 解析标签</h2><p>这部分来说是如何解析标签的，可以看到<code>vue-next</code>对<code>parseTag</code>去做了一个重载。这个函数整体上不难，相对还是比较简单的。</p><div class="language-ts"><pre><code><span class="token keyword">function</span> <span class="token function">parseTag</span><span class="token punctuation">(</span>\n  context<span class="token operator">:</span> ParserContext<span class="token punctuation">,</span>\n  <span class="token keyword">type</span><span class="token operator">:</span> TagType<span class="token punctuation">.</span>Start<span class="token punctuation">,</span>\n  parent<span class="token operator">:</span> ElementNode <span class="token operator">|</span> <span class="token keyword">undefined</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> ElementNode\n\n<span class="token keyword">function</span> <span class="token function">parseTag</span><span class="token punctuation">(</span>\n  context<span class="token operator">:</span> ParserContext<span class="token punctuation">,</span>\n  <span class="token keyword">type</span><span class="token operator">:</span> TagType<span class="token punctuation">.</span>End<span class="token punctuation">,</span>\n  parent<span class="token operator">:</span> ElementNode <span class="token operator">|</span> <span class="token keyword">undefined</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>\n\n<span class="token keyword">function</span> <span class="token function">parseTag</span><span class="token punctuation">(</span>\n  context<span class="token operator">:</span> ParserContext<span class="token punctuation">,</span>\n  <span class="token keyword">type</span><span class="token operator">:</span> TagType<span class="token punctuation">,</span>\n  parent<span class="token operator">:</span> ElementNode <span class="token operator">|</span> <span class="token keyword">undefined</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> ElementNode <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token punctuation">{</span>\n  __TEST__ <span class="token operator">&amp;&amp;</span> <span class="token function">assert</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^&lt;\\/?[a-z]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  __TEST__ <span class="token operator">&amp;&amp;</span>\n    <span class="token function">assert</span><span class="token punctuation">(</span>\n      <span class="token keyword">type</span> <span class="token operator">===</span> <span class="token punctuation">(</span><span class="token function">startsWith</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>source<span class="token punctuation">,</span> <span class="token string">&#39;&lt;/&#39;</span><span class="token punctuation">)</span> <span class="token operator">?</span> TagType<span class="token punctuation">.</span>End <span class="token operator">:</span> TagType<span class="token punctuation">.</span>Start<span class="token punctuation">)</span>\n    <span class="token punctuation">)</span>\n\n  <span class="token comment">// Tag open.</span>\n  <span class="token comment">// 获取上次解析位置</span>\n  <span class="token keyword">const</span> start <span class="token operator">=</span> <span class="token function">getCursor</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>\n  <span class="token comment">// 解析标签</span>\n  <span class="token keyword">const</span> match <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^&lt;\\/?([a-z][^\\t\\r\\n\\f /&gt;]*)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>source<span class="token punctuation">)</span><span class="token operator">!</span>\n  <span class="token keyword">const</span> tag <span class="token operator">=</span> match<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>\n  <span class="token keyword">const</span> ns <span class="token operator">=</span> context<span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">getNamespace</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> parent<span class="token punctuation">)</span>\n\n  <span class="token function">advanceBy</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> match<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 前进</span>\n  <span class="token function">advanceSpaces</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>\n\n  <span class="token comment">// save current state in case we need to re-parse attributes with v-pre</span>\n  <span class="token keyword">const</span> cursor <span class="token operator">=</span> <span class="token function">getCursor</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>\n  <span class="token keyword">const</span> currentSource <span class="token operator">=</span> context<span class="token punctuation">.</span>source\n\n  <span class="token comment">// Attributes.</span>\n  <span class="token keyword">let</span> props <span class="token operator">=</span> <span class="token function">parseAttributes</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// check &lt;pre&gt; tag</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">isPreTag</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    context<span class="token punctuation">.</span>inPre <span class="token operator">=</span> <span class="token boolean">true</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// check v-pre</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>\n    <span class="token keyword">type</span> <span class="token operator">===</span> TagType<span class="token punctuation">.</span>Start <span class="token operator">&amp;&amp;</span>\n    <span class="token operator">!</span>context<span class="token punctuation">.</span>inVPre <span class="token operator">&amp;&amp;</span>\n    props<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span>p <span class="token operator">=&gt;</span> p<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">===</span> NodeTypes<span class="token punctuation">.</span><span class="token constant">DIRECTIVE</span> <span class="token operator">&amp;&amp;</span> p<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">&#39;pre&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    context<span class="token punctuation">.</span>inVPre <span class="token operator">=</span> <span class="token boolean">true</span>\n    <span class="token comment">// reset context</span>\n    <span class="token function">extend</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> cursor<span class="token punctuation">)</span>\n    context<span class="token punctuation">.</span>source <span class="token operator">=</span> currentSource\n    <span class="token comment">// re-parse attrs and filter out v-pre itself</span>\n    props <span class="token operator">=</span> <span class="token function">parseAttributes</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>p <span class="token operator">=&gt;</span> p<span class="token punctuation">.</span>name <span class="token operator">!==</span> <span class="token string">&#39;v-pre&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Tag close.</span>\n  <span class="token keyword">let</span> isSelfClosing <span class="token operator">=</span> <span class="token boolean">false</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>source<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">emitError</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">EOF_IN_TAG</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    isSelfClosing <span class="token operator">=</span> <span class="token function">startsWith</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>source<span class="token punctuation">,</span> <span class="token string">&#39;/&gt;&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">type</span> <span class="token operator">===</span> TagType<span class="token punctuation">.</span>End <span class="token operator">&amp;&amp;</span> isSelfClosing<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">emitError</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">END_TAG_WITH_TRAILING_SOLIDUS</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 前进，如果是单标签，前进2位 否则前进1位</span>\n    <span class="token function">advanceBy</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> isSelfClosing <span class="token operator">?</span> <span class="token number">2</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// 如果是结束标签 就直接返回</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">type</span> <span class="token operator">===</span> TagType<span class="token punctuation">.</span>End<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// ... v2兼容处理</span>\n\n  <span class="token keyword">let</span> tagType <span class="token operator">=</span> ElementTypes<span class="token punctuation">.</span><span class="token constant">ELEMENT</span>\n  <span class="token keyword">const</span> options <span class="token operator">=</span> context<span class="token punctuation">.</span>options\n  <span class="token comment">// 如果不是v-pre 并且 不是自定义标签</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>context<span class="token punctuation">.</span>inVPre <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>options<span class="token punctuation">.</span><span class="token function">isCustomElement</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 判断是否是v-is</span>\n    <span class="token keyword">const</span> hasVIs <span class="token operator">=</span> props<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span>p <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>name <span class="token operator">!==</span> <span class="token string">&#39;is&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>\n      <span class="token comment">// v-is=&quot;xxx&quot; (TODO: deprecate)</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">===</span> NodeTypes<span class="token punctuation">.</span><span class="token constant">DIRECTIVE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n      <span class="token punctuation">}</span>\n      <span class="token comment">// is=&quot;vue:xxx&quot;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>value <span class="token operator">&amp;&amp;</span> p<span class="token punctuation">.</span>value<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;vue:&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n      <span class="token punctuation">}</span>\n      <span class="token comment">// in compat mode, any is usage is considered a component</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>\n        __COMPAT__ <span class="token operator">&amp;&amp;</span>\n        <span class="token function">checkCompatEnabled</span><span class="token punctuation">(</span>\n          CompilerDeprecationTypes<span class="token punctuation">.</span><span class="token constant">COMPILER_IS_ON_ELEMENT</span><span class="token punctuation">,</span>\n          context<span class="token punctuation">,</span>\n          p<span class="token punctuation">.</span>loc\n        <span class="token punctuation">)</span>\n      <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token comment">// 如果是原生标签 并且不是v-is</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>isNativeTag <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>hasVIs<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 如果不是原生标签的话，说明是组件 html的话为0</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span><span class="token function">isNativeTag</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> tagType <span class="token operator">=</span> ElementTypes<span class="token punctuation">.</span><span class="token constant">COMPONENT</span> <span class="token comment">// 1</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>\n      hasVIs <span class="token operator">||</span> <span class="token comment">// 是否有v-is</span>\n      <span class="token function">isCoreComponent</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token comment">// 是否内置组件</span>\n      <span class="token punctuation">(</span>options<span class="token punctuation">.</span>isBuiltInComponent <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span><span class="token function">isBuiltInComponent</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>\n      <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[A-Z]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span> <span class="token operator">||</span>\n      tag <span class="token operator">===</span> <span class="token string">&#39;component&#39;</span>\n    <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      tagType <span class="token operator">=</span> ElementTypes<span class="token punctuation">.</span><span class="token constant">COMPONENT</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 如果是slot</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;slot&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      tagType <span class="token operator">=</span> ElementTypes<span class="token punctuation">.</span><span class="token constant">SLOT</span> <span class="token comment">// 2</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>\n      tag <span class="token operator">===</span> <span class="token string">&#39;template&#39;</span> <span class="token operator">&amp;&amp;</span>\n      props<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span>\n        p <span class="token operator">=&gt;</span>\n          p<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">===</span> NodeTypes<span class="token punctuation">.</span><span class="token constant">DIRECTIVE</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isSpecialTemplateDirective</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n      <span class="token punctuation">)</span>\n    <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 如果是template 为3</span>\n      tagType <span class="token operator">=</span> ElementTypes<span class="token punctuation">.</span><span class="token constant">TEMPLATE</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token keyword">type</span><span class="token operator">:</span> NodeTypes<span class="token punctuation">.</span><span class="token constant">ELEMENT</span><span class="token punctuation">,</span>\n    ns<span class="token punctuation">,</span>\n    tag<span class="token punctuation">,</span>\n    tagType<span class="token punctuation">,</span>\n    props<span class="token punctuation">,</span>\n    isSelfClosing<span class="token punctuation">,</span>\n    children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    loc<span class="token operator">:</span> <span class="token function">getSelection</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> start<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    codegenNode<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token comment">// to be created during transform phase 在transform阶段创建</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="总结"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>标签的话，就大概是这个样子了，下一节来说解析属性，属性包括<code>props</code>、HTML自带属性、指令等。</p>',
    5
  )
t.render = function(a, p, t, e, c, l) {
  return n(), s('div', null, [o])
}
export default t
export { p as __pageData }
