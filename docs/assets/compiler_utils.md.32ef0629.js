import { o as n, c as s, a } from './app.547ab472.js'
const t =
    '{"title":"advancePositionWithMutation","description":"","frontmatter":{},"headers":[{"level":2,"title":"advancePositionWithMutation","slug":"advancepositionwithmutation"},{"level":2,"title":"getCursor","slug":"getcursor"},{"level":2,"title":"getSelection","slug":"getselection"},{"level":2,"title":"advanceBy","slug":"advanceby"},{"level":2,"title":"getNewPosition","slug":"getnewposition"},{"level":2,"title":"advancePositionWithClone","slug":"advancepositionwithclone"},{"level":2,"title":"总结","slug":"总结"}],"relativePath":"compiler/utils.md","lastUpdated":1641357564057}',
  o = {},
  p = a(
    '<h2 id="advancepositionwithmutation"><a class="header-anchor" href="#advancepositionwithmutation" aria-hidden="true">#</a> advancePositionWithMutation</h2><p>解析的时候换行的一个函数</p><div class="language-ts"><pre><code><span class="token comment">// advance by mutation without cloning (for performance reasons), since this</span>\n<span class="token comment">// gets called a lot in the parser</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">advancePositionWithMutation</span><span class="token punctuation">(</span>\n  pos<span class="token operator">:</span> Position<span class="token punctuation">,</span>\n  source<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n  numberOfCharacters<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> source<span class="token punctuation">.</span>length\n<span class="token punctuation">)</span><span class="token operator">:</span> Position <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> linesCount <span class="token operator">=</span> <span class="token number">0</span>\n  <span class="token keyword">let</span> lastNewLinePos <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numberOfCharacters<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 如果需要换行</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">10</span> <span class="token comment">/* newline char code */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      linesCount<span class="token operator">++</span>\n      lastNewLinePos <span class="token operator">=</span> i\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n\n  pos<span class="token punctuation">.</span>offset <span class="token operator">+=</span> numberOfCharacters <span class="token comment">// 解析的位置++</span>\n  pos<span class="token punctuation">.</span>line <span class="token operator">+=</span> linesCount  <span class="token comment">// 解析的行数++</span>\n  pos<span class="token punctuation">.</span>column <span class="token operator">=</span>\n    lastNewLinePos <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span>\n      <span class="token operator">?</span> pos<span class="token punctuation">.</span>column <span class="token operator">+</span> numberOfCharacters\n      <span class="token operator">:</span> numberOfCharacters <span class="token operator">-</span> lastNewLinePos <span class="token comment">// 拿到列数</span>\n\n  <span class="token keyword">return</span> pos\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="getcursor"><a class="header-anchor" href="#getcursor" aria-hidden="true">#</a> getCursor</h2><p>获取当前的一个解析位置</p><div class="language-ts"><pre><code><span class="token comment">// 获取每次解析的位置</span>\n<span class="token keyword">function</span> <span class="token function">getCursor</span><span class="token punctuation">(</span>context<span class="token operator">:</span> ParserContext<span class="token punctuation">)</span><span class="token operator">:</span> Position <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> column<span class="token punctuation">,</span> line<span class="token punctuation">,</span> offset <span class="token punctuation">}</span> <span class="token operator">=</span> context\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> column<span class="token punctuation">,</span> line<span class="token punctuation">,</span> offset <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="getselection"><a class="header-anchor" href="#getselection" aria-hidden="true">#</a> getSelection</h2><p>获取当前已解析的相关信息</p><div class="language-ts"><pre><code><span class="token keyword">function</span> <span class="token function">getSelection</span><span class="token punctuation">(</span>\n  context<span class="token operator">:</span> ParserContext<span class="token punctuation">,</span>\n  start<span class="token operator">:</span> Position<span class="token punctuation">,</span>\n  end<span class="token operator">?</span><span class="token operator">:</span> Position\n<span class="token punctuation">)</span><span class="token operator">:</span> SourceLocation <span class="token punctuation">{</span>\n  end <span class="token operator">=</span> end <span class="token operator">||</span> <span class="token function">getCursor</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    start<span class="token punctuation">,</span>\n    end<span class="token punctuation">,</span>\n    source<span class="token operator">:</span> context<span class="token punctuation">.</span>originalSource<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>start<span class="token punctuation">.</span>offset<span class="token punctuation">,</span> end<span class="token punctuation">.</span>offset<span class="token punctuation">)</span> <span class="token comment">// 拿到文本内容</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="advanceby"><a class="header-anchor" href="#advanceby" aria-hidden="true">#</a> advanceBy</h2><p>向前前进多少位</p><div class="language-ts"><pre><code><span class="token comment">/**\n * @param context 解析的上下文\n * @param numberOfCharacters 需要前进的位数\n */</span>\n<span class="token keyword">function</span> <span class="token function">advanceBy</span><span class="token punctuation">(</span>context<span class="token operator">:</span> ParserContext<span class="token punctuation">,</span> numberOfCharacters<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 获取解析的template</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> source <span class="token punctuation">}</span> <span class="token operator">=</span> context\n  __TEST__ <span class="token operator">&amp;&amp;</span> <span class="token function">assert</span><span class="token punctuation">(</span>numberOfCharacters <span class="token operator">&lt;=</span> source<span class="token punctuation">.</span>length<span class="token punctuation">)</span>\n  <span class="token function">advancePositionWithMutation</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> source<span class="token punctuation">,</span> numberOfCharacters<span class="token punctuation">)</span>\n  <span class="token comment">// 截取还未解析的template</span>\n  context<span class="token punctuation">.</span>source <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>numberOfCharacters<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="getnewposition"><a class="header-anchor" href="#getnewposition" aria-hidden="true">#</a> getNewPosition</h2><p>获取一个新的位置</p><div class="language-ts"><pre><code><span class="token keyword">function</span> <span class="token function">getNewPosition</span><span class="token punctuation">(</span>\n  context<span class="token operator">:</span> ParserContext<span class="token punctuation">,</span>\n  start<span class="token operator">:</span> Position<span class="token punctuation">,</span>\n  numberOfCharacters<span class="token operator">:</span> <span class="token builtin">number</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> Position <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">advancePositionWithClone</span><span class="token punctuation">(</span>\n    start<span class="token punctuation">,</span>\n    context<span class="token punctuation">.</span>originalSource<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>start<span class="token punctuation">.</span>offset<span class="token punctuation">,</span> numberOfCharacters<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    numberOfCharacters\n  <span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="advancepositionwithclone"><a class="header-anchor" href="#advancepositionwithclone" aria-hidden="true">#</a> advancePositionWithClone</h2><div class="language-ts"><pre><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">advancePositionWithClone</span><span class="token punctuation">(</span>\n  pos<span class="token operator">:</span> Position<span class="token punctuation">,</span>\n  source<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n  numberOfCharacters<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> source<span class="token punctuation">.</span>length\n<span class="token punctuation">)</span><span class="token operator">:</span> Position <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">advancePositionWithMutation</span><span class="token punctuation">(</span>\n    <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> pos<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    source<span class="token punctuation">,</span>\n    numberOfCharacters\n  <span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="总结"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>这些是<code>vue-next</code>在<code>parse</code>的过程中一些重要的函数，就不特别说明了，注释基本都有。</p>',
    19
  )
o.render = function(a, t, o, e, c, u) {
  return n(), s('div', null, [p])
}
export default o
export { t as __pageData }