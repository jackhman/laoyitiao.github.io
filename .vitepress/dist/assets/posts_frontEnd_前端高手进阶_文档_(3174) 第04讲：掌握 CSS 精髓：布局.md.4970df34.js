import{_ as o,j as e,o as t,g as c,k as a,Q as l,s,h as p}from"./chunks/framework.e0c66c3f.js";const K=JSON.parse('{"title":"单列布局 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3174) 第04讲：掌握 CSS 精髓：布局.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3174) 第04讲：掌握 CSS 精髓：布局.md","lastUpdated":1696338709000}'),E={name:"posts/frontEnd/前端高手进阶_文档/(3174) 第04讲：掌握 CSS 精髓：布局.md"},r=l('<p>CSS 虽然初衷是用来美化 HTML 文档的，但实际上随着 float、position 等属性的出现，它已经可以起到调整文档渲染结构的作用了，而随着弹性盒子以及网格布局的推出，CSS 将承担越来越重要的布局功能。渐渐地我们发现 HTML 标签决定了页面的逻辑结构，而 CSS 决定了页面的视觉结构。</p><p>这一课时我们先来分析常见的布局效果有哪些，然后再通过代码来实现这些效果，从而帮助你彻底掌握 CSS 布局。</p><p>我们通常提到的布局，有两个共同点：</p><ol><li>大多数用于 PC 端，因为 PC 端屏幕像素宽度够大，可布局的空间也大；</li><li>布局是有限空间内的元素排列方式，因为页面设计横向不滚动，纵向无限延伸，所以大多数时候讨论的布局都是对水平方向进行分割。</li></ol><p>实际上我们在讨论布局的时候，会把网页上特定的区域进行分列操作。按照分列数目，可以大致分为 3 类，即单列布局、2 列布局、3 列布局。</p><h4 id="单列布局" tabindex="-1">单列布局 <a class="header-anchor" href="#单列布局" aria-label="Permalink to &quot;单列布局&quot;">​</a></h4><p>单列布局是最常用的一种布局，它的实现效果就是将一个元素作为布局容器，通常设置一个较小的（最大）宽度来保证不同像素宽度屏幕下显示一致。</p><p><strong>示例网站</strong></p><p>拉勾，蓝色区域为布局容器，水平居中对齐，宽度 1260px：</p>',9),y=s("p",null,"谷歌搜索，蓝色区域为布局容器，水平左对齐，宽度 652px：",-1),i=s("p",null,"一些网站会将单列布局与其他布局方式混合使用，比如拉勾网首页的海报和左侧标签就使用了 2 列布局，这样既能向下兼容窄屏幕，又能按照主次关系显示页面内容。",-1),g=s("p",null,"这种布局的优势在于基本上可以适配超过布局容器宽度的各种显示屏幕，比如上面的示例网站布局容器宽度为 700px，也就是说超过 700px 宽度的显示屏幕上浏览网站看到的效果是一致的。",-1),d=s("p",null,"但它最大的缺点也是源于此，过度的冗余设计必然会带来浪费。例如，在上面的例子中，其实我的屏幕宽度是足够的，可以显示更多的内容，但是页面两侧却出现了大量空白区域，如果在 4k 甚至更宽的屏幕下，空白区域大小会超过页面内容区域大小！",-1),h=s("h4",{id:"_2-列布局",tabindex:"-1"},[p("2 列布局 "),s("a",{class:"header-anchor",href:"#_2-列布局","aria-label":'Permalink to "2 列布局"'},"​")],-1),m=s("p",null,"2 列布局使用频率也非常的高，实现效果就是将页面分割成左右宽度不等的两列，宽度较小的列设置为固定宽度，剩余宽度由另一列撑满。为了描述方便，我们暂且称宽度较小的列父元素为次要布局容器，宽度较大的列父元素为主要布局容器。",-1),u=s("p",null,[s("strong",null,"示例网站")],-1),_=s("p",null,"Ant Design 文档，蓝色区域为主要内容布局容器，侧边栏为次要内容布局容器。",-1),A=s("p",null,"这种布局适用于内容上具有明显主次关系的网页，比如 API 文档页面中左侧显示内容导航，右侧显示文档描述；又比如后台管理系统中左侧显示菜单栏，右侧显示配置页面。相对于单列布局，在屏幕宽度适配方面处理得更好。当屏幕宽度不够时，主要内容布局容器优先显示，次要内容布局容器改为垂直方向显示或隐藏，但有时候也会和单列布局搭配使用，作为单列布局中的子布局使用。",-1),f=s("h4",{id:"_3-列布局",tabindex:"-1"},[p("3 列布局 "),s("a",{class:"header-anchor",href:"#_3-列布局","aria-label":'Permalink to "3 列布局"'},"​")],-1),F=s("p",null,"3 列布局按照左中右的顺序进行排列，通常中间列最宽，左右两列次之。",-1),q=s("p",null,[s("strong",null,"示例网站")],-1),x=s("p",null,"登录 GitHub 后，蓝色区域为宽度最大的中间列。",-1),v=s("p",null,"CSDN 首页，这是 3 列布局的第二种实现方式，蓝色部分就是 2 列布局的主要布局容器，而它的子元素又使用了 2 列布局。",-1),C=l(`<p>3 列布局和 2 列布局类似，也有明确的主次关系，只是关系层次增加了一层。下面我们来看看如何实现这些布局。</p><h4 id="布局实现" tabindex="-1">布局实现 <a class="header-anchor" href="#布局实现" aria-label="Permalink to &quot;布局实现&quot;">​</a></h4><p>单列布局没有太多技术难点，通过将设置布局容器（最大）宽度以及左右边距为 auto 即可实现，我们重点讨论 2 列和 3 列布局。关于这两种布局，在网上可以找到很多实现方式，我们是不是只要把这些方式收集起来然后都记住就行了呢？</p><p>当然不是！</p><p>我们要做的是通过归纳法，找到这些方式的共同实现步骤，只要把这些步骤记住了，就能做到举一反三。</p><p>你可以试着自己先整理一下，或者直接看我整理好的结果。</p><p>要实现 2 列布局或 3 列布局，可以按照下面的步骤来操作：</p><p>（1）为了保证主要布局容器优先级，应将主要布局容器写在次要布局容器之前。</p><p>（2）将布局容器进行水平排列；</p><p>（3）设置宽度，即次要容器宽度固定，主要容器撑满；</p><p>（4）消除布局方式的副作用，如浮动造成的高度塌陷；</p><p>（5）为了在窄屏下也能正常显示，可以通过媒体查询进行优化。</p><p>根据以上操作步骤，先来看一个使用 flex 布局实现 2 列布局的例子。</p><p>第 1 步，写好 HTML 结构。这里为了查看方便，我们为布局容器设置背景颜色和高度。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /* 为了方便查看，给布局容器设置高度和颜色 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  main,aside {</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: 100px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    background-color: #f09e5a;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  aside {</span></span>
<span class="line"><span style="color:#E1E4E8;">    background-color: #c295cf;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;主要布局容器&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;次要布局容器&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  /* 为了方便查看，给布局容器设置高度和颜色 */</span></span>
<span class="line"><span style="color:#24292E;">  main,aside {</span></span>
<span class="line"><span style="color:#24292E;">    height: 100px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  main {</span></span>
<span class="line"><span style="color:#24292E;">    background-color: #f09e5a;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  aside {</span></span>
<span class="line"><span style="color:#24292E;">    background-color: #c295cf;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;主要布局容器&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;次要布局容器&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,15),D=l(`<p>第 2 步，将布局容器水平排列：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex-direction: row-reverse;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex: 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .aside {</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex: 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;主要布局容器&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;aside&quot;</span><span style="color:#E1E4E8;">&gt;次要布局容器&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .wrap {</span></span>
<span class="line"><span style="color:#24292E;">    display: flex;</span></span>
<span class="line"><span style="color:#24292E;">    flex-direction: row-reverse;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    flex: 1;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .aside {</span></span>
<span class="line"><span style="color:#24292E;">    flex: 1;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;主要布局容器&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;aside&quot;</span><span style="color:#24292E;">&gt;次要布局容器&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),b=l(`<p>第 3 步，调整布局容器宽度：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex-direction: row-reverse;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex: 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .aside {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;主要布局容器&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;aside&quot;</span><span style="color:#E1E4E8;">&gt;次要布局容器&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .wrap {</span></span>
<span class="line"><span style="color:#24292E;">    display: flex;</span></span>
<span class="line"><span style="color:#24292E;">    flex-direction: row-reverse;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    flex: 1;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .aside {</span></span>
<span class="line"><span style="color:#24292E;">    width: 200px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;主要布局容器&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;aside&quot;</span><span style="color:#24292E;">&gt;次要布局容器&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),w=s("p",null,"第 4 步，消除副作用，比如浮动造成的高度塌陷。由于使用 flex 布局没有副作用，所以不需要修改，代码和效果图同第 3 步。",-1),k=l(`<p>第 5 步，增加媒体查询。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex-direction: row-reverse;</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex-wrap: wrap;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex: 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .aside {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  @media only screen and (max-width: 1000px) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">      flex-direction: row;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">      flex: 100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;主要布局容器&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;aside&quot;</span><span style="color:#E1E4E8;">&gt;次要布局容器&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .wrap {</span></span>
<span class="line"><span style="color:#24292E;">    display: flex;</span></span>
<span class="line"><span style="color:#24292E;">    flex-direction: row-reverse;</span></span>
<span class="line"><span style="color:#24292E;">    flex-wrap: wrap;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    flex: 1;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .aside {</span></span>
<span class="line"><span style="color:#24292E;">    width: 200px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  @media only screen and (max-width: 1000px) {</span></span>
<span class="line"><span style="color:#24292E;">    .wrap {</span></span>
<span class="line"><span style="color:#24292E;">      flex-direction: row;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    .main {</span></span>
<span class="line"><span style="color:#24292E;">      flex: 100%;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;主要布局容器&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;aside&quot;</span><span style="color:#24292E;">&gt;次要布局容器&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),T=l(`<p>下面再来个复杂些的 3 列布局的例子。</p><p>第 1 步，写好 HTML 结构，为了辨认方便，我们给布局容器设置背景色和高度：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /* 为了方便查看，给布局容器设置高度和颜色 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: 100px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    background-color: red;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .left {</span></span>
<span class="line"><span style="color:#E1E4E8;">    background-color: green;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    background-color: blue;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;main&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;left&quot;</span><span style="color:#E1E4E8;">&gt;left&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;right&quot;</span><span style="color:#E1E4E8;">&gt;right&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  /* 为了方便查看，给布局容器设置高度和颜色 */</span></span>
<span class="line"><span style="color:#24292E;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#24292E;">    height: 100px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    background-color: red;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .left {</span></span>
<span class="line"><span style="color:#24292E;">    background-color: green;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .right {</span></span>
<span class="line"><span style="color:#24292E;">    background-color: blue;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;main&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;left&quot;</span><span style="color:#24292E;">&gt;left&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;right&quot;</span><span style="color:#24292E;">&gt;right&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,3),B=l(`<p>第 2 步，让布局容器水平排列：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    float: left;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;main&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;left&quot;</span><span style="color:#E1E4E8;">&gt;left&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;right&quot;</span><span style="color:#E1E4E8;">&gt;right&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#24292E;">    float: left;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;main&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;left&quot;</span><span style="color:#24292E;">&gt;left&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;right&quot;</span><span style="color:#24292E;">&gt;right&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),S=l(`<p>第 3 步，调整宽度，将主要布局容器 main 撑满，次要布局容器 left 固定 300px，次要布局容器 right 固定 200px。</p><p>这里如果直接设置的话，布局容器 left 和 right 都会换行，所以我们需要通过设置父元素 wrap 内边距来压缩主要布局 main 给次要布局容器留出空间。同时通过设置次要布局容器边距以及采用相对定位调整次要布局容器至两侧。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    float: left;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">    padding: 0 200px 0 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .left {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: -300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-left: -100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-left: -200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    right: -200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;main&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;left&quot;</span><span style="color:#E1E4E8;">&gt;left&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;right&quot;</span><span style="color:#E1E4E8;">&gt;right&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#24292E;">    float: left;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .wrap {</span></span>
<span class="line"><span style="color:#24292E;">    padding: 0 200px 0 300px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    width: 100%;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .left {</span></span>
<span class="line"><span style="color:#24292E;">    width: 300px;</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    left: -300px;</span></span>
<span class="line"><span style="color:#24292E;">    margin-left: -100%;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .right {</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    width: 200px;</span></span>
<span class="line"><span style="color:#24292E;">    margin-left: -200px;</span></span>
<span class="line"><span style="color:#24292E;">    right: -200px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;main&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;left&quot;</span><span style="color:#24292E;">&gt;left&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;right&quot;</span><span style="color:#24292E;">&gt;right&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,3),P=l(`<p>第 4 步，消除副作用。我们知道使用浮动会造成高度塌陷，如果在父元素后面添加新的元素就会产生这个问题。所以可以通过伪类来清除浮动，同时减小页面宽度，还会发现次要布局容器 left 和 right 都换行了，但这个副作用我们可以在第 5 步时进行消除。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    float: left;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">    padding: 0 200px 0 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap::after {</span></span>
<span class="line"><span style="color:#E1E4E8;">    content: &#39;&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: block;</span></span>
<span class="line"><span style="color:#E1E4E8;">    clear: both;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .left {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: -300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-left: -100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-left: -200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    right: -200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;main&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;left&quot;</span><span style="color:#E1E4E8;">&gt;left&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;right&quot;</span><span style="color:#E1E4E8;">&gt;right&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#24292E;">    float: left;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .wrap {</span></span>
<span class="line"><span style="color:#24292E;">    padding: 0 200px 0 300px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .wrap::after {</span></span>
<span class="line"><span style="color:#24292E;">    content: &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292E;">    display: block;</span></span>
<span class="line"><span style="color:#24292E;">    clear: both;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    width: 100%;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .left {</span></span>
<span class="line"><span style="color:#24292E;">    width: 300px;</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    left: -300px;</span></span>
<span class="line"><span style="color:#24292E;">    margin-left: -100%;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .right {</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    width: 200px;</span></span>
<span class="line"><span style="color:#24292E;">    margin-left: -200px;</span></span>
<span class="line"><span style="color:#24292E;">    right: -200px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;main&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;left&quot;</span><span style="color:#24292E;">&gt;left&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;right&quot;</span><span style="color:#24292E;">&gt;right&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),I=l(`<p>第 5 步，利用媒体查询调整页面宽度较小情况下的显示优先级。这里我们仍然希望优先显示主要布局容器 main，其次是次要布局容器 left，最后是布局容器 right。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    float: left;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">    padding: 0 200px 0 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .wrap::after {</span></span>
<span class="line"><span style="color:#E1E4E8;">    content: &#39;&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: block;</span></span>
<span class="line"><span style="color:#E1E4E8;">    clear: both;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .left {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: -300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-left: -100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-left: -200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    right: -200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  @media only screen and (max-width: 1000px) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    .wrap {</span></span>
<span class="line"><span style="color:#E1E4E8;">      padding: 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    .left {</span></span>
<span class="line"><span style="color:#E1E4E8;">      left: 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">      margin-left: 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    .right {</span></span>
<span class="line"><span style="color:#E1E4E8;">      margin-left: 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">      right: 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">&gt;main&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;left&quot;</span><span style="color:#E1E4E8;">&gt;left&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;right&quot;</span><span style="color:#E1E4E8;">&gt;right&lt;/</span><span style="color:#85E89D;">aside</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .main, .left, .right {</span></span>
<span class="line"><span style="color:#24292E;">    float: left;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .wrap {</span></span>
<span class="line"><span style="color:#24292E;">    padding: 0 200px 0 300px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .wrap::after {</span></span>
<span class="line"><span style="color:#24292E;">    content: &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292E;">    display: block;</span></span>
<span class="line"><span style="color:#24292E;">    clear: both;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .main {</span></span>
<span class="line"><span style="color:#24292E;">    width: 100%;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .left {</span></span>
<span class="line"><span style="color:#24292E;">    width: 300px;</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    left: -300px;</span></span>
<span class="line"><span style="color:#24292E;">    margin-left: -100%;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .right {</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    width: 200px;</span></span>
<span class="line"><span style="color:#24292E;">    margin-left: -200px;</span></span>
<span class="line"><span style="color:#24292E;">    right: -200px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  @media only screen and (max-width: 1000px) {</span></span>
<span class="line"><span style="color:#24292E;">    .wrap {</span></span>
<span class="line"><span style="color:#24292E;">      padding: 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    .left {</span></span>
<span class="line"><span style="color:#24292E;">      left: 0;</span></span>
<span class="line"><span style="color:#24292E;">      margin-left: 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    .right {</span></span>
<span class="line"><span style="color:#24292E;">      margin-left: 0;</span></span>
<span class="line"><span style="color:#24292E;">      right: 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">&gt;main&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;left&quot;</span><span style="color:#24292E;">&gt;left&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">aside</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;right&quot;</span><span style="color:#24292E;">&gt;right&lt;/</span><span style="color:#22863A;">aside</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),V=l(`<p>这种 3 列布局的实现，就是流传已久的&quot;圣杯布局&quot;，但标准的圣杯布局没有添加媒体查询。</p><h4 id="延伸1-垂直方向的布局" tabindex="-1">延伸1：垂直方向的布局 <a class="header-anchor" href="#延伸1-垂直方向的布局" aria-label="Permalink to &quot;延伸1：垂直方向的布局&quot;">​</a></h4><p>垂直方向有一种布局虽然使用频率不如水平方向布局高，但在面试中很容易被问到，所以这里特意再补充讲解一下。</p><p>这种布局将页面分成上、中、下三个部分，上、下部分都为固定高度，中间部分高度不定。当页面高度小于浏览器高度时，下部分应固定在屏幕底部；当页面高度超出浏览器高度时，下部分应该随中间部分被撑开，显示在页面最底部。</p><p>这种布局也称之为&quot;sticky footer&quot;，意思是下部分粘黏在屏幕底部。要实现这个功能，最简单的就是使用 flex 或 grid 进行布局。下面是使用 flex 的主要代码：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .container {</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: 100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex-direction: column;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  header, footer {</span></span>
<span class="line"><span style="color:#E1E4E8;">    min-height: 100px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  main {</span></span>
<span class="line"><span style="color:#E1E4E8;">    flex: 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;container&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;...&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">footer</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">footer</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .container {</span></span>
<span class="line"><span style="color:#24292E;">    display: flex;</span></span>
<span class="line"><span style="color:#24292E;">    height: 100%;</span></span>
<span class="line"><span style="color:#24292E;">    flex-direction: column;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  header, footer {</span></span>
<span class="line"><span style="color:#24292E;">    min-height: 100px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  main {</span></span>
<span class="line"><span style="color:#24292E;">    flex: 1;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;container&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;...&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">footer</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">footer</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>代码实现思路比较简单，将布局容器的父元素 display 属性设置成 flex，伸缩方向改为垂直方向，高度撑满页面，再将中间布局容器的 flex 属性设置为 1，让其自适应即可。</p><p>如果要考虑兼容性的话，其实现起来要复杂些，下面是主要代码：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .container {</span></span>
<span class="line"><span style="color:#E1E4E8;">    box-sizing: border-box;</span></span>
<span class="line"><span style="color:#E1E4E8;">    min-height: 100vh;</span></span>
<span class="line"><span style="color:#E1E4E8;">    padding-bottom: 100px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  header, footer {</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: 100px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  footer {</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-top: -100px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;container&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">footer</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">footer</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .container {</span></span>
<span class="line"><span style="color:#24292E;">    box-sizing: border-box;</span></span>
<span class="line"><span style="color:#24292E;">    min-height: 100vh;</span></span>
<span class="line"><span style="color:#24292E;">    padding-bottom: 100px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  header, footer {</span></span>
<span class="line"><span style="color:#24292E;">    height: 100px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  footer {</span></span>
<span class="line"><span style="color:#24292E;">    margin-top: -100px;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;container&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">footer</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">footer</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>将上部分布局容器与中间布局容器放入一个共同的父元素中，并让父元素高度撑满，然后设置内下边距给下部分布局容器预留空间，下部分布局容器设置上外边距&quot;嵌入&quot;父元素中。从而实现了随着中间布局容器高度而被撑开的效果。</p><h4 id="延伸2-框架中栅格布局的列数" tabindex="-1">延伸2：框架中栅格布局的列数 <a class="header-anchor" href="#延伸2-框架中栅格布局的列数" aria-label="Permalink to &quot;延伸2：框架中栅格布局的列数&quot;">​</a></h4><p>很多 UI 框架都提供了栅格系统来帮助页面实现等分或等比布局，比如 Bootstrap 提供了 12 列栅格，elment ui 和 ant design 提供了 24 列栅格。</p><p>那么你思考过栅格系统设定这些列数背后的原因吗？</p><p>首先从 12 列说起，12 这个数字，从数学上来说它具有很多约数 1、2、3、4、6、12，也就是说可以轻松实现 1 等分、2 等分、3 等分、4 等分、6 等分、12 等分，比例方面可以实现 1:11、1:5、1:3、1:2、1:1、1:10:1、1:4:1 等。如果换成 10 或 8，则可实现的等分比例就会少很多，而更大的 16 似乎是个不错的选择，但对于常用的 3 等分就难以实现。</p><p>至于使用 24 列不使用 12 列，可能是考虑宽屏幕（PC 端屏幕宽度不断增加）下对 12 列难以满足等分比例需求，比如 8 等分。同时又能够保证兼容 12 列情况下的等分比例（方便项目迁移和替换）。</p><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>通过这一讲，我们学习了几种常见布局，包括单列、2 列、3 列及垂直三栏布局，同时思考每种布局的优缺点和使用场景，并且对 2 列布局和 3 列布局实现方法归纳成了 5 个步骤，希望你能举一反三，并应用到实际的工作中。</p><p><a href="https://github.com/yalishizhude/course/tree/master/04" target="_blank" rel="noreferrer">课程代码点击下载</a>。</p><p>最后布置一道思考题：你还想到了使用哪些方法来实现 2 列或 3 列布局？</p>`,19);function M(N,H,R,j,z,U){const n=e("Image");return t(),c("div",null,[r,a(n,{alt:"image001.png",src:"https://s0.lgstatic.com/i/image/M00/0E/02/Ciqc1F7E7naAWgsXAARfwy0XcV8278.png"}),y,a(n,{alt:"image003.png",src:"https://s0.lgstatic.com/i/image/M00/0E/0E/CgqCHl7E7oKAfb17AAFwoje2OMQ914.png"}),i,g,d,h,m,u,_,a(n,{alt:"image005.png",src:"https://s0.lgstatic.com/i/image/M00/0E/02/Ciqc1F7E7o2AW5gDAAE-NngMuFU998.png"}),A,f,F,q,x,a(n,{alt:"image007.png",src:"https://s0.lgstatic.com/i/image/M00/0E/02/Ciqc1F7E7p2AMPNpAAG-acrwqPY708.png"}),v,a(n,{alt:"image009.png",src:"https://s0.lgstatic.com/i/image/M00/0E/0E/CgqCHl7E7qaAIc4DAAaJzemBURk917.png"}),C,a(n,{alt:"image011.png",src:"https://s0.lgstatic.com/i/image/M00/0E/0E/CgqCHl7E7smAEPRpAAAvxBH_FHc839.png"}),D,a(n,{alt:"image013.png",src:"https://s0.lgstatic.com/i/image/M00/0E/02/Ciqc1F7E7tOANF4CAAAvkbIVZBE683.png"}),b,a(n,{alt:"image015.png",src:"https://s0.lgstatic.com/i/image/M00/0E/0E/CgqCHl7E7t2ADHFHAAAwDrjM5WI921.png"}),w,a(n,{alt:"image017.png",src:"https://s0.lgstatic.com/i/image/M00/0E/03/Ciqc1F7E7uWAaUkVAAAv8s-Kzi4653.png"}),k,a(n,{alt:"image019.gif",src:"https://s0.lgstatic.com/i/image/M00/0E/03/Ciqc1F7E7vOAaoMnAALoOB59RVs256.gif"}),T,a(n,{alt:"image020.png",src:"https://s0.lgstatic.com/i/image/M00/0E/0E/CgqCHl7E7wKAXwSWAAAp_ydHZSg960.png"}),B,a(n,{alt:"image022.png",src:"https://s0.lgstatic.com/i/image/M00/0E/03/Ciqc1F7E7wyAQ5-dAAAav_zx9fY631.png"}),S,a(n,{alt:"image024.png",src:"https://s0.lgstatic.com/i/image/M00/0E/03/Ciqc1F7E7xuAdjuNAAAjJjRTGoc544.png"}),P,a(n,{alt:"image026.png",src:"https://s0.lgstatic.com/i/image/M00/0E/0F/CgqCHl7E7y2AWIVNAAAjKqEadUw543.png"}),I,a(n,{alt:"image028.gif",src:"https://s0.lgstatic.com/i/image/M00/0E/03/Ciqc1F7E72KAcZENAAI1dbZkP0I370.gif"}),V])}const L=o(E,[["render",M]]);export{K as __pageData,L as default};
