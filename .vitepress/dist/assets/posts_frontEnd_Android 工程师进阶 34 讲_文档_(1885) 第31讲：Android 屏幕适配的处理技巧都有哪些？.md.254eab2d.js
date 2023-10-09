import{_ as o,j as i,o as l,h as p,k as e,f as t,s as a,Q as n}from"./chunks/framework.d3daa342.js";const $=JSON.parse('{"title":"第31讲：Android屏幕适配的处理技巧都有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1885) 第31讲：Android 屏幕适配的处理技巧都有哪些？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1885) 第31讲：Android 屏幕适配的处理技巧都有哪些？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1885) 第31讲：Android 屏幕适配的处理技巧都有哪些？.md"},c=a("h1",{id:"第31讲-android屏幕适配的处理技巧都有哪些",tabindex:"-1"},[t("第31讲：Android屏幕适配的处理技巧都有哪些？ "),a("a",{class:"header-anchor",href:"#第31讲-android屏幕适配的处理技巧都有哪些","aria-label":'Permalink to "第31讲：Android屏幕适配的处理技巧都有哪些？"'},"​")],-1),d=a("p",null,"在几年前，屏幕适配一直是困扰 Android 开发工程师的一大问题，但是随着近几年各种屏幕适配方案的诞生，以及谷歌各种适配控件的推出，屏幕适配也显得越来越容易，这节课我们就来总结一下关于屏幕适配的那些技巧。",-1),_=a("h3",{id:"constraintlayout",tabindex:"-1"},[t("ConstraintLayout "),a("a",{class:"header-anchor",href:"#constraintlayout","aria-label":'Permalink to "ConstraintLayout"'},"​")],-1),u=a("p",null,"很多工程师不太喜欢使用 ConstraintLayout，感觉 ConstraintLayout 的使用很烦琐，要设置各种上下左右的约束条件。但是请相信我，前期你在代码里付出的越多，后期你需要解决的 bug 就越少！ConstraintLayout 是我个人最喜欢的 Android 控件之一，它的前身是 PercentLayout(百分比布局)，当年 PercentLayout 被推出时也是火爆一时，但是它只延续了很短的一段时间就被 ConstraintLayout 替代了。",-1),h=a("p",null,"ConstraintLayout 的常见属性有以下几个：",-1),g=a("p",null,"说明：",-1),A=a("ul",null,[a("li",null,[a("p",null,"红框 1 中属性相当于 RelativeLayout 的 layout_align 相关属性，能够确定各个 View 之间边对齐特征。")]),a("li",null,[a("p",null,"红框 2 中的属性相当于 RelativeLayout 的 layout_to 相关属性，能够确定各个 View 之间的相对位置。")])],-1),y=a("p",null,"通过这几个属性，基本能够确立 View 的相对位置，并且还能够实现其他 View 容器较难实现的效果。比如有两个 Button 分别是 Button1 和 Button2，需求是将 Button1 置位于屏幕中间，并且始终覆盖 Button2 的左上半角，UI 效果如下：",-1),m=a("p",null,"上述效果就可以使用以下代码实现：",-1),E=a("p",null,"ConstraintLayout 还有几个其他特殊属性，通过它们可以帮助我们更好地做出适配。",-1),w=a("h4",{id:"bias",tabindex:"-1"},[t("Bias "),a("a",{class:"header-anchor",href:"#bias","aria-label":'Permalink to "Bias"'},"​")],-1),C=a("p",null,"ConstraintLayout 提供了水平和垂直方向的 bias 属性，这个属性的取值范围是 0~1。主要作用是确立 View 在水平方向或者垂直方向的位置百分比。比如以下示例代码：",-1),b=a("p",null,"图中的 horizontal_bias 和 vertical_bias 分别指定 TextView 显示在水平方向的 30% 位置和垂直方向上 50% 的位置，最终显示效果如下：",-1),v=a("h4",{id:"weight",tabindex:"-1"},[t("weight "),a("a",{class:"header-anchor",href:"#weight","aria-label":'Permalink to "weight"'},"​")],-1),V=a("p",null,"LinearLayout 可以很方便地实现将多个 UI 控件按照某一方向进行排列，并且设置一定的权重规则。而 ConstraintLayout 也能够实现类似的效果。",-1),k=a("p",null,"以下代码可以使 3 个 TextView 横向依次按照相等的权重来排列。",-1),q=a("p",null,"显示效果如下：",-1),T=n('<p>ConstraintLayout 还提供了 chain 属性来设置不同的均分策略，具体有以下几种属性值：</p><h4 id="spread" tabindex="-1">spread <a class="header-anchor" href="#spread" aria-label="Permalink to &quot;spread&quot;">​</a></h4><p>它将平分剩余空间，让 ConstraintLayout 内部 Views 平分占用剩余空间，spread 也是默认属性，显示效果就如上文中的显示效果。</p><ul><li><strong>spread_inside</strong></li></ul><p>它会将两边的最边缘的两个 View 拉向父组件边缘，然后让剩余的 Views 在剩余的空间内平分间隙布局，代码及显示效果如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">app</span><span style="color:#E1E4E8;">:layout_constraintHorizontal_chainStyle</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;spread_inside&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">app</span><span style="color:#24292E;">:layout_constraintHorizontal_chainStyle</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;spread_inside&quot;</span></span></code></pre></div>',6),x=n('<ul><li><strong>packed</strong></li></ul><p>它将所有 Views 集中到一起不分配多余的空间（margin 除外），然后将整个组件显示在可用的剩余位置居中，代码及效果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">layout_constraintHorizontal_chainStyle</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;packed&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">layout_constraintHorizontal_chainStyle</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;packed&quot;</span></span></code></pre></div>',3),I=n('<p>在 chain 的基础上，还可以再加上 bias 属性使其在某百分比位置上按照权重排列，比如在上述 packed chainstyle 下，我再在 TextView t1 中添加如下属性：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">layout_constraintHorizontal_bias</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;.75&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">layout_constraintHorizontal_bias</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;.75&quot;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span></code></pre></div><p>最终显示效果如下：</p>',4),S=a("blockquote",null,[a("p",null,"注意："),a("p",null,"使用 ConstraintLayout 时，需要特别主要 UI 控件的可见属性。因为 ConstraintLayout 内部控件的 visibility，设置为 GONE 和 INVISIBLE 对其他控件的约束是不一样的。")],-1),L=a("h3",{id:"多-dimens-基于-dp-的适配方案",tabindex:"-1"},[t("多 dimens 基于 dp 的适配方案 "),a("a",{class:"header-anchor",href:"#多-dimens-基于-dp-的适配方案","aria-label":'Permalink to "多 dimens 基于 dp 的适配方案"'},"​")],-1),f=a("p",null,"在 ConstraintLayout 的基础上，我们还可以在 res 文件夹中创建多套 values 文件夹，如下所示：",-1),D=n('<p>图中 values- 后的 sw 指的是 smallest width，也就是最小宽度。Android 系统在运行时会自动识别屏幕可用的最小宽度，然后根据识别的结果去资源文件中查找相对应的资源文件中的属性值。比如有一个 360dpi 的手机设备在运行 App 时，会自动到 values-sw360dp 文件夹中寻找对应的值。手写每个 values 文件很麻烦，可以借助于工具一键生成，具体可以参考这个链接中的介绍： <a href="https://blog.csdn.net/wolfking0608/article/details/79610431" target="_blank" rel="noreferrer">android屏幕适配，自动生成不同的dimens.xml详解</a></p><p>这种方式有很好的容错机制，比如如果一个手机的最小宽度是 350dp，Android 系统如果在 res 中没有找到 values-sw350dp 文件夹，也不会直接使用默认的 values 文件夹中的值，而是向下依次查找最接近的最小宽度文件夹，比如上图中离 350dp 最近的是 values-sw320dp 中的值，这个值虽然不是 100% 精确，但是效果也不会相差太远。</p><p>通过上文介绍的 ConstraintLayout + 多 dimens 适配方案，基本能够将 UI 布局适配到所有的机型。在此基础上，再针对个别 UI 控件进行适配就基本完美了。</p><h3 id="ui-控件适配" tabindex="-1">UI 控件适配 <a class="header-anchor" href="#ui-控件适配" aria-label="Permalink to &quot;UI 控件适配&quot;">​</a></h3><p>在 Android App 中文本 + 图片内容占据了一个 App 显示 UI 的绝大部分，虽然会夹杂 RecyclerView、ViewPager、ScrollView 等嵌套视图，但是最终在嵌套视图内部包含的还是文本内容 + 图片内容，因此这两者的适配是我们重点关注的对象。</p><h4 id="文字-textview" tabindex="-1">文字 TextView <a class="header-anchor" href="#文字-textview" aria-label="Permalink to &quot;文字 TextView&quot;">​</a></h4><p>对于 TextView 的宽高，建议尽量使用 wrap_content 自适应，因为一旦使用具体值进行限定，我们无法保证它不会在某些手机上被 cut 掉。举一个血淋淋的例子：在搜索界面有一个 &quot;清空&quot; 按钮，宽度设置为 24dp，字体大小设置为 16sp。几乎在所有手机上显示都没有问题，但是当 Nokia 安卓手机面世之后，突然 &quot;清空&quot; 按钮被 cut 掉了一半，只显示 &quot;清&quot;，原因就是 24sp 在 Nokia 手机上计算出的宽度不足以展示 2 个 16sp 大小的文字。</p><p>对于 TextView 还有一种情况要注意，我们要习惯使用一个极长字符串来测试在某些极端情况下 TextView 的显示情况。因为需求文档上给到的大多是一个比较常规的文本内容，但是我们从后端获取的文本字符串有时是用户自定义的，有可能是一个比较长的文本字符串。调试时期可以使用 tools:text 属性来调试，tools 属性只是在预览界面有效，比如以下配置：</p>',8),F=a("p",null,'上图中的 TextView 在 AS 的预览界面会显示"这是一段超长的调试文本内容"，但是当安装到手机上时，显示的是"文本内容"。',-1),P=a("h4",{id:"图片imageview",tabindex:"-1"},[t("图片ImageView "),a("a",{class:"header-anchor",href:"#图片imageview","aria-label":'Permalink to "图片ImageView"'},"​")],-1),H=a("p",null,"对于 ImageView 不建议统一使用 wrap_content，因为有时我们的图片是从服务器上下载到本地显示的，图片的宽高并不一定是完全相等的，这样会造成图片的显示大小不一致，这种情况我们一般是将 ImageView 的宽高设置为某一固定 dp 值。还有另外一种做法就是在 Java 代码中动态设置 ImageView 的大小，一个比较常见的使用场景就是 RecyclerView Item 分屏显示，比如需求是 RecyclerView 中每一个 item 大小为屏幕的 1/3，这种情况我们就可以考虑在代码中动态设置 item view 的大小，如下所示：",-1),N=a("blockquote",null,[a("p",null,"实际上这种对 ImageView 的做法，同样也适应于其他控件的显示。")],-1),R=a("h3",{id:"总结",tabindex:"-1"},[t("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),B=a("p",null,"这节课主要介绍了几个 Android 屏幕适配的技巧，其中主要包含以下几点：",-1),M=a("ul",null,[a("li",null,[a("p",null,"使用 ConstraintLayout 能够完美实现布局内部控件之间的约束条件，并且能够代替 LinearLayout 和 RelativeLayout 等布局。")]),a("li",null,[a("p",null,"在 ConstraintLayout 基础上，再加上多 dimens 适配方案基本就能实现所有的屏幕适配。")]),a("li",null,[a("p",null,"最后对于特殊 UI 控件的适配再做针对性适配即可，主要介绍了 TextVIew 和 ImageView 的几个适配技巧。")])],-1);function U(j,z,O,J,W,Z){const s=i("Image");return l(),p("div",null,[c,d,_,u,h,e(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2E/14/CgqCHl8ER0-ANaZyAAHN9robYHc458.png"}),t(),g,A,y,e(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/2E/14/CgqCHl8ER4iAJpF2AAAi8OaOm8k002.png"}),t(),m,e(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2E/09/Ciqc1F8ER5OAOgVWAAPSdoHNkXQ676.png"}),t(),E,w,C,e(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/2E/09/Ciqc1F8ER5uAMIRxAAJTD6eBEJE983.png"}),t(),b,e(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/2E/14/CgqCHl8ER6SAWsnAAAAstbWlAxg123.png"}),t(),v,V,k,e(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/2E/14/CgqCHl8ER66ACC_tAANXA1pJemc381.png"}),t(),q,e(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2E/09/Ciqc1F8ER7WAaYnMAAAZnK_F_k8484.png"}),t(),T,e(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/2E/15/CgqCHl8ESC6Ab3mZAAAZ1OHWxzs982.png"}),t(),x,e(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/2E/09/Ciqc1F8ESEqADf1uAAAbkek1NMc770.png"}),t(),I,e(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/2E/15/CgqCHl8ESFmAOi1lAAAZeKbtjXw455.png"}),t(),S,L,f,e(s,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/2E/15/CgqCHl8ESGiAKQJMAADlPulV000757.png"}),t(),D,e(s,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/2E/0A/Ciqc1F8ESHWASh-xAAB96AYyKEU294.png"}),t(),F,P,H,e(s,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/2E/0A/Ciqc1F8ESH-AfEshAADopjF1-H4322.png"}),t(),N,R,B,M])}const Q=o(r,[["render",U]]);export{$ as __pageData,Q as default};
