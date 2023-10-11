import{_ as p,D as e,o as t,g as c,J as l,h as s,Q as o,m as a}from"./chunks/framework.f67d7268.js";const B=JSON.parse('{"title":"13深入分析动态SQL语句解析全流程（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6384) 13  深入分析动态 SQL 语句解析全流程（下）.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6384) 13  深入分析动态 SQL 语句解析全流程（下）.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6384) 13  深入分析动态 SQL 语句解析全流程（下）.md"},y=o(`<h1 id="_13深入分析动态sql语句解析全流程-下" tabindex="-1">13深入分析动态SQL语句解析全流程（下） <a class="header-anchor" href="#_13深入分析动态sql语句解析全流程-下" aria-label="Permalink to &quot;13深入分析动态SQL语句解析全流程（下）&quot;">​</a></h1><p>在上一讲，我们讲解了 MyBatis 中动态 SQL 语句的相关内容，重点介绍了 MyBatis 使用到的 OGNL 表达式、组合模式、DynamicContext 上下文以及多个动态 SQL 标签对应的 SqlNode 实现。今天我们就紧接着上一讲，继续介绍剩余 SqlNode 实现以及 SqlSource 的相关内容。</p><h3 id="sqlnode-剩余实现类" tabindex="-1">SqlNode 剩余实现类 <a class="header-anchor" href="#sqlnode-剩余实现类" aria-label="Permalink to &quot;SqlNode 剩余实现类&quot;">​</a></h3><p>在上一讲我们已经介绍了 StaticTextSqlNode、MixedSqlNode、TextSqlNode、IfSqlNode、TrimSqlNode 这几个 SqlNode 的实现，下面我们再把剩下的三个 SqlNode 实现类也说明下。</p><h4 id="_1-foreachsqlnode" tabindex="-1">1. ForeachSqlNode <a class="header-anchor" href="#_1-foreachsqlnode" aria-label="Permalink to &quot;1. ForeachSqlNode&quot;">​</a></h4><p>在动态 SQL 语句中，我们可以<strong>使用 <code>&lt;foreach&gt;</code> 标签对一个集合进行迭代</strong> 。在迭代过程中，我们可以通过 index 属性值指定的变量作为元素的下标索引（迭代 Map 集合的话，就是 Key 值），使用 item 属性值指定的变量作为集合元素（迭代 Map 集合的话，就是 Value 值）。另外，我们还可以通过 open 和 close 属性在迭代开始前和结束后添加相应的字符串，也允许使用 separator 属性自定义分隔符。这里要介绍的 ForeachSqlNode 就是 <code>&lt;foreach&gt;</code> 标签的抽象。</p><p>下面我们就来分析一下 ForeachSqlNode 的 apply() 方法是如何实现循环的。</p><p>首先，向 DynamicContext.sqlBuilder 中追加 open 属性值指定的字符串，然后通过 ExpressionEvaluator 工具类解析 <code>&lt;foreach&gt;</code> 标签中 collection 属性指定的表达式，得到一个集合对象，并遍历这个集合。</p><p>接下来，为每个元素创建一个 PrefixedContext 对象。PrefixedContext 是 DynamicContext 的一个装饰器，其中记录了一个 prefix 前缀信息（其实就是 <code>&lt;foreach&gt;</code> 标签中的 separator 属性值），在其 apply() 方法中会先追加 prefix 前缀（迭代第一个元素的时候，prefix 为空字符串），然后追加 SQL 片段。</p><p>如果传入的集合是 Map 类型，则通过 applyIndex() 方法和 applyItem() 方法将 Map 中的 Key 和 Value 记录到 PrefixedContext 中，示例如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">applyIndex</span><span style="color:#E1E4E8;">(DynamicContext context, Object o, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (index </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Key值与index属性值指定的变量名称绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">        context.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(index, o); </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Key值还会与&quot;__frch_&quot;+index属性值+ &quot;_&quot; + i 这个变量绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这里传入的 i 是一个自增序列，由底层的 DynamicContext 统一维护。</span></span>
<span class="line"><span style="color:#E1E4E8;">        context.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">itemizeItem</span><span style="color:#E1E4E8;">(index, i), o);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">applyItem</span><span style="color:#E1E4E8;">(DynamicContext context, Object o, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (item </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Value值与item属性值指定的变量名称绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">        context.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(item, o);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Value值还会与&quot;__frch_&quot;+item属性值+ &quot;_&quot; + i 这个变量绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">        context.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">itemizeItem</span><span style="color:#E1E4E8;">(item, i), o);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">applyIndex</span><span style="color:#24292E;">(DynamicContext context, Object o, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (index </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Key值与index属性值指定的变量名称绑定</span></span>
<span class="line"><span style="color:#24292E;">        context.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(index, o); </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Key值还会与&quot;__frch_&quot;+index属性值+ &quot;_&quot; + i 这个变量绑定</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这里传入的 i 是一个自增序列，由底层的 DynamicContext 统一维护。</span></span>
<span class="line"><span style="color:#24292E;">        context.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">itemizeItem</span><span style="color:#24292E;">(index, i), o);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">applyItem</span><span style="color:#24292E;">(DynamicContext context, Object o, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (item </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Value值与item属性值指定的变量名称绑定</span></span>
<span class="line"><span style="color:#24292E;">        context.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(item, o);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Value值还会与&quot;__frch_&quot;+item属性值+ &quot;_&quot; + i 这个变量绑定</span></span>
<span class="line"><span style="color:#24292E;">        context.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">itemizeItem</span><span style="color:#24292E;">(item, i), o);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>但如果传入的集合不是 Map 类型，则通过 applyIndex() 方法和 applyItem() 方法将集合元素的下标索引和元素值本身绑定到 PrefixedContext 中。</p><p>完成 PrefixedContext 的绑定之后，会调用 <code>&lt;foreach&gt;</code> 标签下子 SqlNode 的 apply() 方法，其中传入的 DynamicContext 实际上是 ForEachSqlNode$FilteredDynamicContext 这个内部类，它也是 DynamicContext 的装饰器，核心功能是：根据前面在 PrefixedContext 中绑定的各种变量，处理 SQL 片段中的&quot;#{}&quot;占位符。FilteredDynamicContext 在多次循环中的处理效果如下图所示：</p>`,13),E=o(`<p>FilteredDynamicContext 变化过程示意图</p><p>下面是 FilteredDynamicContext.appendSql() 方法的核心实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">appendSql</span><span style="color:#E1E4E8;">(String sql) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建识别&quot;#{}&quot;的GenericTokenParser解析器</span></span>
<span class="line"><span style="color:#E1E4E8;">    GenericTokenParser parser </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GenericTokenParser</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;#{&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;}&quot;</span><span style="color:#E1E4E8;">, content </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这个TokenHandler实现会将#{i}替换成#{__frch_i_0}、#{__frch_i_1}...</span></span>
<span class="line"><span style="color:#E1E4E8;">        String newContent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> content.</span><span style="color:#B392F0;">replaceFirst</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;^</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">s*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;(?![^.,:</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">s])&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">itemizeItem</span><span style="color:#E1E4E8;">(item, index));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (itemIndex </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> newContent.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(content)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 这里会将#{j}替换成#{__frch_j_0}、#{__frch_j_1}...</span></span>
<span class="line"><span style="color:#E1E4E8;">            newContent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> content.</span><span style="color:#B392F0;">replaceFirst</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;^</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">s*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> itemIndex </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;(?![^.,:</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">s])&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">itemizeItem</span><span style="color:#E1E4E8;">(itemIndex, index));</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;#{&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> newContent </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;}&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 保存解析后的SQL片段</span></span>
<span class="line"><span style="color:#E1E4E8;">    delegate.</span><span style="color:#B392F0;">appendSql</span><span style="color:#E1E4E8;">(parser.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(sql));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">appendSql</span><span style="color:#24292E;">(String sql) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建识别&quot;#{}&quot;的GenericTokenParser解析器</span></span>
<span class="line"><span style="color:#24292E;">    GenericTokenParser parser </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GenericTokenParser</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;#{&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;}&quot;</span><span style="color:#24292E;">, content </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这个TokenHandler实现会将#{i}替换成#{__frch_i_0}、#{__frch_i_1}...</span></span>
<span class="line"><span style="color:#24292E;">        String newContent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> content.</span><span style="color:#6F42C1;">replaceFirst</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;^</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">s*&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;(?![^.,:</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">s])&quot;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">itemizeItem</span><span style="color:#24292E;">(item, index));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (itemIndex </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> newContent.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(content)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 这里会将#{j}替换成#{__frch_j_0}、#{__frch_j_1}...</span></span>
<span class="line"><span style="color:#24292E;">            newContent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> content.</span><span style="color:#6F42C1;">replaceFirst</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;^</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">s*&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> itemIndex </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;(?![^.,:</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">s])&quot;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">itemizeItem</span><span style="color:#24292E;">(itemIndex, index));</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;#{&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> newContent </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;}&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 保存解析后的SQL片段</span></span>
<span class="line"><span style="color:#24292E;">    delegate.</span><span style="color:#6F42C1;">appendSql</span><span style="color:#24292E;">(parser.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(sql));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>完成集合中全部元素的迭代处理之后，ForeachSqlNode.apply() 方法还会调用 applyClose() 方法追加 close 属性指定的后缀。最后，从 DynamicContext 上下文中删除 index 属性值和 item 属性值指定的变量。</p><h4 id="_2-choosesqlnode" tabindex="-1">2. ChooseSqlNode <a class="header-anchor" href="#_2-choosesqlnode" aria-label="Permalink to &quot;2. ChooseSqlNode&quot;">​</a></h4><p>在有的业务场景中，可能会碰到非常多的分支判断，在 Java 中，我们可以通过 switch...case...default 的方式来编写这段代码；在 MyBatis 的动态 SQL 语句中，我们可以使用 <code>&lt;choose&gt;</code>、<code>&lt;when&gt;</code> 和 <code>&lt;otherwise&gt;</code> 三个标签来实现类似的效果。</p><p><strong><code>&lt;choose&gt;</code> 标签会被 MyBatis 解析成 ChooseSqlNode 对象，<code>&lt;when&gt;</code> 标签会被解析成 IfSqlNode 对象，<code>&lt;otherwise&gt;</code> 标签会被解析成 MixedSqlNode 对象。</strong></p><p>IfSqlNode 和 MixedSqlNode 的核心实现在上一讲中我们已经分析过了，这里不再重复。ChooseSqlNode 的实现也比较简单，其中维护了一个 List<code>&lt;SqlNode&gt;</code> 集合（ifSqlNodes 字段）用来记录所有 <code>&lt;when&gt;</code> 子标签对应的 IfSqlNode 对象，同时还维护了一个 SqlNode 类型字段（defaultSqlNode 字段）用来记录 <code>&lt;otherwise&gt;</code> 子标签生成的 MixedSqlNode 对象，该字段可以为 null。</p><p>在 ChooseSqlNode 的 apply() 方法中，首先会尝试迭代全部 IfSqlNode 节点并执行 apply() 方法，我们知道任意一个 IfSqlNode.apply() 方法返回 true，即表示命中该分支，此时整个 ChooseSqlNode.apply() 返回 true，否则尝试执行 defaultSqlNode.apply() 方法并返回 true，即进入默认分支。如果 defaultSqlNode 字段为 null，则返回 false。</p><h4 id="_3-vardeclsqlnode" tabindex="-1">3. VarDeclSqlNode <a class="header-anchor" href="#_3-vardeclsqlnode" aria-label="Permalink to &quot;3. VarDeclSqlNode&quot;">​</a></h4><p>VarDeclSqlNode 抽象了 <code>&lt;bind&gt;</code> 标签，其<strong>核心功能是将一个 OGNL 表达式的值绑定到一个指定的变量名上，并记录到 DynamicContext 上下文中</strong>。</p><p>VarDeclSqlNode 中的 name 字段维护了 <code>&lt;bind&gt;</code> 标签中 name 属性的值，expression 字段记录了 <code>&lt;bind&gt;</code> 标签中 value 属性的值（一般是一个 OGNL 表达式）。</p><p>在 apply() 方法中，VarDeclSqlNode 首先会通过 OGNL 工具类解析 expression 这个表达式的值，然后将解析结果与 name 字段的值一起绑定到 DynamicContext 上下文中，这样后面就可以通过 name 字段值获取这个表达式的值了。</p><h3 id="sqlsourcebuilder" tabindex="-1">SqlSourceBuilder <a class="header-anchor" href="#sqlsourcebuilder" aria-label="Permalink to &quot;SqlSourceBuilder&quot;">​</a></h3><p>动态 SQL 语句经过上述 SqlNode 的解析之后，接着会由 SqlSourceBuilder 进行下一步处理。</p><p>SqlSourceBuilder 的核心操作主要有两个：</p><ul><li><p><strong>解析&quot;#{}&quot;占位符中携带的各种属性</strong>，例如，&quot;#{id, javaType=int, jdbcType=NUMERIC, typeHandler=MyTypeHandler}&quot;这个占位符，指定了 javaType、jdbcType、typeHandler 等配置；</p></li><li><p><strong>将 SQL 语句中的&quot;#{}&quot;占位符替换成&quot;?&quot;占位符</strong>，替换之后的 SQL 语句就可以提交给数据库进行编译了。</p></li></ul><p>SqlSourceBuilder 的入口是 parse() 方法，这里首先会创建一个识别&quot;#{}&quot;占位符的 GenericTokenParser 解析器，当识别到&quot;#{}&quot;占位符的时候，就<strong>由 ParameterMappingTokenHandler 这个 TokenHandler 实现完成上述两个核心步骤</strong>。</p><p>ParameterMappingTokenHandler 中维护了一个 List<code>&lt;ParameterMapping&gt;</code> 类型的集合（parameterMappings 字段），用来记录每个占位符参数解析后的结果，ParameterMapping 记录了占位符名称（property 字段）、jdbcType 属性值（jdbcType 字段）、javaType 属性值（javaType 字段）、typeHandler 属性值（typeHandler 字段）等。</p><p>在 buildParameterMapping() 方法中会通过 ParameterExpression 工具类解析&quot;#{}&quot;占位符，然后通过 ParameterMapping.Builder 创建对应的 ParameterMapping 对象。这里得到的 ParameterMapping 就会被记录到 parameterMappings 集合中。</p><p>ParameterMappingTokenHandler.handleToken() 方法的核心逻辑如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">handleToken</span><span style="color:#E1E4E8;">(String content) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// content是前面通过GenericTokenParser识别到的#{}占位符，</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 这里通过buildParameterMapping()方法进行解析，得到ParameterMapping对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    parameterMappings.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">buildParameterMapping</span><span style="color:#E1E4E8;">(content));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 直接返回&quot;?&quot;占位符，替换原有的#{}占位符</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;?&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">handleToken</span><span style="color:#24292E;">(String content) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// content是前面通过GenericTokenParser识别到的#{}占位符，</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 这里通过buildParameterMapping()方法进行解析，得到ParameterMapping对象</span></span>
<span class="line"><span style="color:#24292E;">    parameterMappings.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">buildParameterMapping</span><span style="color:#24292E;">(content));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 直接返回&quot;?&quot;占位符，替换原有的#{}占位符</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;?&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>SqlSourceBuilder 完成了&quot;#{}&quot;占位符的解析和替换之后，会将最终的 SQL 语句以及得到的 ParameterMapping 集合封装成一个 StaticSqlSource 对象并返回。</p><h3 id="sqlsource" tabindex="-1">SqlSource <a class="header-anchor" href="#sqlsource" aria-label="Permalink to &quot;SqlSource&quot;">​</a></h3><p>经过上述一系列处理之后，SQL 语句最终会由 SqlSource 进行最后的处理。</p><p><strong>在 SqlSource 接口中只定义了一个 getBoundSql() 方法，它控制着动态 SQL 语句解析的整个流程</strong>，它会根据从 Mapper.xml 映射文件（或注解）解析到的 SQL 语句以及执行 SQL 时传入的实参，返回一条可执行的 SQL。</p><p>下图展示了 SqlSource 接口的核心实现：</p>`,27),i=o(`<p>SqlSource 接口继承图</p><p>下面我们简单介绍一下这三个核心实现类的具体含义。</p><ul><li><p>DynamicSqlSource：当 SQL 语句中包含动态 SQL 的时候，会使用 DynamicSqlSource 对象。</p></li><li><p>RawSqlSource：当 SQL 语句中只包含静态 SQL 的时候，会使用 RawSqlSource 对象。</p></li><li><p>StaticSqlSource：DynamicSqlSource 和 RawSqlSource 经过一系列解析之后，会得到最终可提交到数据库的 SQL 语句，这个时候就可以通过 StaticSqlSource 进行封装了。</p></li></ul><h4 id="_1-dynamicsqlsource" tabindex="-1">1. DynamicSqlSource <a class="header-anchor" href="#_1-dynamicsqlsource" aria-label="Permalink to &quot;1. DynamicSqlSource&quot;">​</a></h4><p>DynamicSqlSource 作为最常用的 SqlSource 实现，<strong>主要负责解析动态 SQL 语句</strong>。</p><p>DynamicSqlSource 中维护了一个 SqlNode 类型的字段（rootSqlNode 字段），用于记录整个 SqlNode 树形结构的根节点。在 DynamicSqlSource 的 getBoundSql() 方法实现中，会使用前面介绍的 SqlNode、SqlSourceBuilder 等组件，完成动态 SQL 语句以及&quot;#{}&quot;占位符的解析，具体的实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> BoundSql </span><span style="color:#B392F0;">getBoundSql</span><span style="color:#E1E4E8;">(Object parameterObject) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建DynamicContext对象，parameterObject是用户传入的实参</span></span>
<span class="line"><span style="color:#E1E4E8;">    DynamicContext context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DynamicContext</span><span style="color:#E1E4E8;">(configuration, parameterObject);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用rootSqlNode.apply()方法，完成整个树形结构中全部SqlNode对象对SQL片段的解析</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 这里无须关心rootSqlNode这棵树中到底有多少SqlNode对象，每个SqlNode对象的行为都是一致的，</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 都会将解析之后的SQL语句片段追加到DynamicContext中，形成最终的、完整的SQL语句</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 这是使用组合设计模式的好处</span></span>
<span class="line"><span style="color:#E1E4E8;">    rootSqlNode.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 通过SqlSourceBuilder解析&quot;#{}&quot;占位符中的属性，并将SQL语句中的&quot;#{}&quot;占位符替换成&quot;?&quot;占位符</span></span>
<span class="line"><span style="color:#E1E4E8;">    SqlSourceBuilder sqlSourceParser </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SqlSourceBuilder</span><span style="color:#E1E4E8;">(configuration);</span></span>
<span class="line"><span style="color:#E1E4E8;">    Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; parameterType </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> parameterObject </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> Object.class </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> parameterObject.</span><span style="color:#B392F0;">getClass</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    SqlSource sqlSource </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sqlSourceParser.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">getSql</span><span style="color:#E1E4E8;">(), parameterType, context.</span><span style="color:#B392F0;">getBindings</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建BoundSql对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    BoundSql boundSql </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sqlSource.</span><span style="color:#B392F0;">getBoundSql</span><span style="color:#E1E4E8;">(parameterObject);</span></span>
<span class="line"><span style="color:#E1E4E8;">    context.</span><span style="color:#B392F0;">getBindings</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(boundSql</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">setAdditionalParameter);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> boundSql;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> BoundSql </span><span style="color:#6F42C1;">getBoundSql</span><span style="color:#24292E;">(Object parameterObject) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建DynamicContext对象，parameterObject是用户传入的实参</span></span>
<span class="line"><span style="color:#24292E;">    DynamicContext context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DynamicContext</span><span style="color:#24292E;">(configuration, parameterObject);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用rootSqlNode.apply()方法，完成整个树形结构中全部SqlNode对象对SQL片段的解析</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 这里无须关心rootSqlNode这棵树中到底有多少SqlNode对象，每个SqlNode对象的行为都是一致的，</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 都会将解析之后的SQL语句片段追加到DynamicContext中，形成最终的、完整的SQL语句</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 这是使用组合设计模式的好处</span></span>
<span class="line"><span style="color:#24292E;">    rootSqlNode.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 通过SqlSourceBuilder解析&quot;#{}&quot;占位符中的属性，并将SQL语句中的&quot;#{}&quot;占位符替换成&quot;?&quot;占位符</span></span>
<span class="line"><span style="color:#24292E;">    SqlSourceBuilder sqlSourceParser </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SqlSourceBuilder</span><span style="color:#24292E;">(configuration);</span></span>
<span class="line"><span style="color:#24292E;">    Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; parameterType </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parameterObject </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> Object.class </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> parameterObject.</span><span style="color:#6F42C1;">getClass</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    SqlSource sqlSource </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sqlSourceParser.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(context.</span><span style="color:#6F42C1;">getSql</span><span style="color:#24292E;">(), parameterType, context.</span><span style="color:#6F42C1;">getBindings</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建BoundSql对象</span></span>
<span class="line"><span style="color:#24292E;">    BoundSql boundSql </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sqlSource.</span><span style="color:#6F42C1;">getBoundSql</span><span style="color:#24292E;">(parameterObject);</span></span>
<span class="line"><span style="color:#24292E;">    context.</span><span style="color:#6F42C1;">getBindings</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(boundSql</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">setAdditionalParameter);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> boundSql;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里最终返回的 BoundSql 对象，包含了解析之后的 SQL 语句（sql 字段）、每个&quot;#{}&quot;占位符的属性信息（parameterMappings 字段 ，List<code>&lt;ParameterMapping&gt;</code> 类型）、实参信息（parameterObject 字段）以及 DynamicContext 中记录的 KV 信息（additionalParameters 集合，Map<code>&lt;String, Object&gt;</code> 类型）。</p><p>后面在讲解 StatementHandler、Executor 如何执行 SQL 语句的时候，我们还会继续介绍 BoundSql 的相关内容，到时候你可以跟这里联系起来学习。</p><h4 id="_2-rawsqlsource" tabindex="-1">2. RawSqlSource <a class="header-anchor" href="#_2-rawsqlsource" aria-label="Permalink to &quot;2. RawSqlSource&quot;">​</a></h4><p>接下来我们看 SqlSource 的第二个实现------ RawSqlSource，它与 DynamicSqlSource 有两个不同之处：</p><ul><li><p>RawSqlSource 处理的是非动态 SQL 语句，DynamicSqlSource 处理的是动态 SQL 语句；</p></li><li><p>RawSqlSource 解析 SQL 语句的时机是在初始化流程中，而 DynamicSqlSource 解析动态 SQL 的时机是在程序运行过程中，也就是运行时解析。</p></li></ul><p>这里我们需要先来回顾一下前面介绍的 XMLScriptBuilder.parseDynamicTags() 方法，其中会<strong>判断一个 SQL 片段</strong> 是否为动态 SQL，判断的标准是：<strong>如果这个 SQL 片段包含了未解析的&quot;\${}&quot;占位符或动态 SQL 标签，则为动态 SQL 语句</strong>。但注意，如果是只包含了&quot;#{}&quot;占位符，也不是动态 SQL。</p><p>XMLScriptBuilder. parseScriptNode() 方法而 会<strong>判断整个 SQL 语句</strong> 是否为动态 SQL，判断的依据是：<strong>如果 SQL 语句中包含任意一个动态 SQL 片段，那么整个 SQL 即为动态 SQL 语句</strong>。</p><p>总结来说，对于动态 SQL 语句，MyBatis 会创建 DynamicSqlSource 对象进行处理，而对于非动态 SQL 语句，则会创建 RawSqlSource 对象进行处理。</p><p>RawSqlSource 在构造方法中，会调用 SqlNode.apply() 方法将 SQL 片段组装成完整 SQL，然后通过 SqlSourceBuilder 处理&quot;#{}&quot;占位符，得到 StaticSqlSource 对象。这两步处理与 DynamicSqlSource 完全一样，只不过执行的时机是在 RawSqlSource 对象的初始化过程中（即 MyBatis 框架初始化流程中），而不是在 getBoundSql() 方法被调用时（即运行时）。</p><p>最后，RawSqlSource.getBoundSql() 方法实现是直接调用 StaticSqlSource.getBoundSql() 方法返回一个 BoundSql 对象。</p><p>通过前面的介绍我们知道，无论是 DynamicSqlSource 还是 RawSqlSource，底层都依赖 SqlSourceBuilder 解析之后得到的 StaticSqlSource 对象。StaticSqlSource 中维护了解析之后的 SQL 语句以及&quot;#{}&quot;占位符的属性信息（List<code>&lt;ParameterMapping&gt;</code> 集合），其 getBoundSql() 方法是真正创建 BoundSql 对象的地方，这个 BoundSql 对象包含了上述 StaticSqlSource 的两个字段以及实参的信息。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>我们紧接上一讲的内容，往后介绍了 SqlNode 接口剩余的实现类，其中包括 ForeachSqlNode、ChooseSqlNode 等，这些 SqlNode 实现类都对应我们常用的动态 SQL 标签。</p><p>接下来，我们还介绍了 SqlSourceBuilder 以及 SqlSource 接口的内容，其中针对不同类型的 SQL 语句，MyBatis 抽象出了不同的 SqlSource 实现类，也就是文中介绍的 DynamicSqlSource、RawSqlSource 以及 StaticSqlSource。</p><p>在前面的<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=612&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=6382" target="_blank" rel="noreferrer">第 11 讲</a>中，我们介绍了 MyBatis 对 <code>&lt;resultMap&gt;</code> 标签的解析逻辑，这是 MyBatis 对静态映射规则的处理。在下一讲，我们将开始介绍 MyBatis 是如何在运行过程中利用这些解析好的映射规则动态处理结果集，记得按时来听课。</p><hr><p>[</p>`,24),d=a("p",null,[s("]("),a("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),s(")")],-1),u=a("p",null,[a("strong",null,"《Java 工程师高薪训练营》")],-1),S=a("p",null,[s("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),a("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),s("！")],-1);function q(m,F,g,h,_,D){const n=e("Image");return t(),c("div",null,[y,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/13/4E/Cgp9HWBB-4WADZbeAAIPDjI-G2A404.png"}),s(),E,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/13/4B/CioPOWBB-6CAFZlRAAEeTrexVm4358.png"}),s(),i,l(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"}),s(),d,u,S])}const x=p(r,[["render",q]]);export{B as __pageData,x as default};
