import{_ as l,j as o,o as e,h as t,k as n,f as a,Q as p,s as r}from"./chunks/framework.d3daa342.js";const m=JSON.parse('{"title":"16非类型安全：让你既爱又恨的unafe","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5244) 16  非类型安全：让你既爱又恨的 unafe.md","filePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5244) 16  非类型安全：让你既爱又恨的 unafe.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/22 讲通关 Go 语言_文档/(5244) 16  非类型安全：让你既爱又恨的 unafe.md"},y=p(`<h1 id="_16非类型安全-让你既爱又恨的unafe" tabindex="-1">16非类型安全：让你既爱又恨的unafe <a class="header-anchor" href="#_16非类型安全-让你既爱又恨的unafe" aria-label="Permalink to &quot;16非类型安全：让你既爱又恨的unafe&quot;">​</a></h1><p>上节课我留了一个小作业，让你练习一下如何使用反射调用一个方法，下面我来进行讲解。</p><p>还是以 person 这个结构体类型为例。我为它增加一个方法 Print，功能是打印一段文本，示例代码如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (p person) </span><span style="color:#B392F0;">Print</span><span style="color:#E1E4E8;">(prefix </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">:Name is </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">,Age is </span><span style="color:#79B8FF;">%d\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,prefix,p.Name,p.Age)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (p person) </span><span style="color:#6F42C1;">Print</span><span style="color:#24292E;">(prefix </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">:Name is </span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">,Age is </span><span style="color:#005CC5;">%d\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,prefix,p.Name,p.Age)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后就可以通过反射调用 Print 方法了，示例代码如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   p</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">person{Name: </span><span style="color:#9ECBFF;">&quot;飞雪无情&quot;</span><span style="color:#E1E4E8;">,Age: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">   pv</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">reflect.</span><span style="color:#79B8FF;">ValueOf</span><span style="color:#E1E4E8;">(p)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">//反射调用person的Print方法</span></span>
<span class="line"><span style="color:#E1E4E8;">   mPrint</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">pv.</span><span style="color:#79B8FF;">MethodByName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Print&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   args</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">[]reflect.Value{reflect.</span><span style="color:#79B8FF;">ValueOf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;登录&quot;</span><span style="color:#E1E4E8;">)}</span></span>
<span class="line"><span style="color:#E1E4E8;">   mPrint.</span><span style="color:#79B8FF;">Call</span><span style="color:#E1E4E8;">(args)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   p</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">person{Name: </span><span style="color:#032F62;">&quot;飞雪无情&quot;</span><span style="color:#24292E;">,Age: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">   pv</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">reflect.</span><span style="color:#005CC5;">ValueOf</span><span style="color:#24292E;">(p)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">//反射调用person的Print方法</span></span>
<span class="line"><span style="color:#24292E;">   mPrint</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">pv.</span><span style="color:#005CC5;">MethodByName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Print&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   args</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">[]reflect.Value{reflect.</span><span style="color:#005CC5;">ValueOf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;登录&quot;</span><span style="color:#24292E;">)}</span></span>
<span class="line"><span style="color:#24292E;">   mPrint.</span><span style="color:#005CC5;">Call</span><span style="color:#24292E;">(args)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从示例中可以看到，要想通过反射调用一个方法，首先要通过 MethodByName 方法找到相应的方法。因为 Print 方法需要参数，所以需要声明参数，它的类型是 []reflect.Value，也就是示例中的 args 变量，最后就可以通过 Call 方法反射调用 Print 方法了。其中记得要把 args 作为参数传递给 Call 方法。</p><p>运行以上代码，可以看到如下结果：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">登录</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">Name is 飞雪无情,Age is </span><span style="color:#79B8FF;">20</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">登录</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">Name is 飞雪无情,Age is </span><span style="color:#005CC5;">20</span></span></code></pre></div><p>从打印的结果可以看到，和我们直接调用 Print 方法是一样的结果，这也证明了通过反射调用 Print 方法是可行的。</p><p>下面我们继续深入 Go 的世界，这节课会介绍 Go 语言自带的 unsafe 包的高级用法。</p><p>顾名思义，unsafe 是不安全的。Go 将其定义为这个包名，也是为了让我们尽可能地不使用它。不过虽然不安全，它也有优势，那就是可以绕过 Go 的内存安全机制，直接对内存进行读写。所以有时候出于性能需要，还是会冒险使用它来对内存进行操作。</p><h3 id="指针类型转换" tabindex="-1">指针类型转换 <a class="header-anchor" href="#指针类型转换" aria-label="Permalink to &quot;指针类型转换&quot;">​</a></h3><p>Go 的设计者为了编写方便、提高效率且降低复杂度，将其设计成一门强类型的静态语言。强类型意味着一旦定义了，类型就不能改变；静态意味着类型检查在运行前就做了。同时出于安全考虑，Go 语言是不允许两个指针类型进行转换的。</p><p>我们一般使用 *T 作为一个指针类型，表示一个指向类型 T 变量的指针。为了安全的考虑，两个不同的指针类型不能相互转换，比如 *int 不能转为 *float64。</p><p>我们来看下面的代码：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   i</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">   ip</span><span style="color:#F97583;">:=&amp;</span><span style="color:#E1E4E8;">i</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> fp </span><span style="color:#F97583;">*float64</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">*float64</span><span style="color:#E1E4E8;">)(ip)</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(fp)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   i</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">   ip</span><span style="color:#D73A49;">:=&amp;</span><span style="color:#24292E;">i</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> fp </span><span style="color:#D73A49;">*float64</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">*float64</span><span style="color:#24292E;">)(ip)</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(fp)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个代码在编译的时候，会提示 <em>cannot convert ip (type * int) to type * float64</em>，也就是不能进行强制转型。那如果还是需要转换呢？这就需要使用 unsafe 包里的 Pointer 了。下面我先为你介绍 unsafe.Pointer 是什么，然后再介绍如何转换。</p><h3 id="unsafe-pointer" tabindex="-1">unsafe.Pointer <a class="header-anchor" href="#unsafe-pointer" aria-label="Permalink to &quot;unsafe.Pointer&quot;">​</a></h3><p>unsafe.Pointer 是一种特殊意义的指针，可以表示任意类型的地址，类似 C 语言里的 void* 指针，是全能型的。</p><p>正常情况下，*int 无法转换为 *float64，但是通过 unsafe.Pointer 做中转就可以了。在下面的示例中，我通过 unsafe.Pointer 把 *int 转换为 *float64，并且对新的 *float64 进行 3 倍的乘法操作，你会发现原来变量 i 的值也被改变了，变为 30。</p><p><em><strong>ch16/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   i</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">   ip</span><span style="color:#F97583;">:=&amp;</span><span style="color:#E1E4E8;">i</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> fp </span><span style="color:#F97583;">*float64</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">*float64</span><span style="color:#E1E4E8;">)(unsafe.</span><span style="color:#79B8FF;">Pointer</span><span style="color:#E1E4E8;">(ip))</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">fp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">fp </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(i)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   i</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">   ip</span><span style="color:#D73A49;">:=&amp;</span><span style="color:#24292E;">i</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> fp </span><span style="color:#D73A49;">*float64</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">*float64</span><span style="color:#24292E;">)(unsafe.</span><span style="color:#005CC5;">Pointer</span><span style="color:#24292E;">(ip))</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">fp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">fp </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(i)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个例子没有任何实际意义，但是说明了通过 unsafe.Pointer 这个万能的指针，我们可以在 *T 之间做任何转换。那么 unsafe.Pointer 到底是什么？为什么其他类型的指针可以转换为 unsafe.Pointer 呢？这就要看 unsafe.Pointer 的源代码定义了，如下所示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ArbitraryType is here for the purposes of documentation</span></span>
<span class="line"><span style="color:#6A737D;">// only and is not actually part of the unsafe package. </span></span>
<span class="line"><span style="color:#6A737D;">// It represents the type of an arbitrary Go expression.</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArbitraryType</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Pointer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">ArbitraryType</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ArbitraryType is here for the purposes of documentation</span></span>
<span class="line"><span style="color:#6A737D;">// only and is not actually part of the unsafe package. </span></span>
<span class="line"><span style="color:#6A737D;">// It represents the type of an arbitrary Go expression.</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArbitraryType</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Pointer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">ArbitraryType</span></span></code></pre></div><p>按 Go 语言官方的注释，ArbitraryType 可以表示任何类型（这里的 ArbitraryType 仅仅是文档需要，不用太关注它本身，只要记住可以表示任何类型即可）。 而 unsafe.Pointer 又是 *ArbitraryType，也就是说 unsafe.Pointer 是任何类型的指针，也就是一个通用型的指针，足以表示任何内存地址。</p><h3 id="uintptr-指针类型" tabindex="-1">uintptr 指针类型 <a class="header-anchor" href="#uintptr-指针类型" aria-label="Permalink to &quot;uintptr 指针类型&quot;">​</a></h3><p>uintptr 也是一种指针类型，它足够大，可以表示任何指针。它的类型定义如下所示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// uintptr is an integer type that is large enough </span></span>
<span class="line"><span style="color:#6A737D;">// to hold the bit pattern of any pointer.</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">uintptr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">uintptr</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// uintptr is an integer type that is large enough </span></span>
<span class="line"><span style="color:#6A737D;">// to hold the bit pattern of any pointer.</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">uintptr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">uintptr</span></span></code></pre></div><p>既然已经有了 unsafe.Pointer，为什么还要设计 uintptr 类型呢？这是因为 unsafe.Pointer 不能进行运算，比如不支持 +（加号）运算符操作，但是 uintptr 可以。通过它，可以对指针偏移进行计算，这样就可以访问特定的内存，达到对特定内存读写的目的，这是真正内存级别的操作。</p><p>在下面的代码中，我以通过指针偏移修改 struct 结构体内的字段为例，演示 uintptr 的用法。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   p </span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(person)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">//Name是person的第一个字段不用偏移，即可通过指针修改</span></span>
<span class="line"><span style="color:#E1E4E8;">   pName</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">)(unsafe.</span><span style="color:#79B8FF;">Pointer</span><span style="color:#E1E4E8;">(p))</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">pName</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;飞雪无情&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">//Age并不是person的第一个字段，所以需要进行偏移，这样才能正确定位到Age字段这块内存，才可以正确的修改</span></span>
<span class="line"><span style="color:#E1E4E8;">   pAge</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*int</span><span style="color:#E1E4E8;">)(unsafe.</span><span style="color:#79B8FF;">Pointer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">uintptr</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Pointer</span><span style="color:#E1E4E8;">(p))</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">unsafe.</span><span style="color:#79B8FF;">Offsetof</span><span style="color:#E1E4E8;">(p.Age)))</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">pAge </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   Name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">   Age </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   p </span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(person)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">//Name是person的第一个字段不用偏移，即可通过指针修改</span></span>
<span class="line"><span style="color:#24292E;">   pName</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">)(unsafe.</span><span style="color:#005CC5;">Pointer</span><span style="color:#24292E;">(p))</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">pName</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;飞雪无情&quot;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">//Age并不是person的第一个字段，所以需要进行偏移，这样才能正确定位到Age字段这块内存，才可以正确的修改</span></span>
<span class="line"><span style="color:#24292E;">   pAge</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*int</span><span style="color:#24292E;">)(unsafe.</span><span style="color:#005CC5;">Pointer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">uintptr</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Pointer</span><span style="color:#24292E;">(p))</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">unsafe.</span><span style="color:#005CC5;">Offsetof</span><span style="color:#24292E;">(p.Age)))</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">pAge </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   Name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">   Age </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个示例不是通过直接访问相应字段的方式对 person 结构体字段赋值，而是通过指针偏移找到相应的内存，然后对内存操作进行赋值。</p><p>下面我详细介绍操作步骤。</p><ol><li><p>先使用 new 函数声明一个 *person 类型的指针变量 p。</p></li><li><p>然后把 *person 类型的指针变量 p 通过 unsafe.Pointer，转换为 *string 类型的指针变量 pName。</p></li><li><p>因为 person 这个结构体的第一个字段就是 string 类型的 Name，所以 pName 这个指针就指向 Name 字段（偏移为 0），对 pName 进行修改其实就是修改字段 Name 的值。</p></li><li><p>因为 Age 字段不是 person 的第一个字段，要修改它必须要进行指针偏移运算。所以需要先把指针变量 p 通过 unsafe.Pointer 转换为 uintptr，这样才能进行地址运算。既然要进行指针偏移，那么要偏移多少呢？这个偏移量可以通过函数 unsafe.Offsetof 计算出来，该函数返回的是一个 uintptr 类型的偏移量，有了这个偏移量就可以通过 + 号运算符获得正确的 Age 字段的内存地址了，也就是通过 unsafe.Pointer 转换后的 *int 类型的指针变量 pAge。</p></li><li><p>然后需要注意的是，如果要进行指针运算，要先通过 unsafe.Pointer 转换为 uintptr 类型的指针。指针运算完毕后，还要通过 unsafe.Pointer 转换为真实的指针类型（比如示例中的 *int 类型），这样可以对这块内存进行赋值或取值操作。</p></li><li><p>有了指向字段 Age 的指针变量 pAge，就可以对其进行赋值操作，修改字段 Age 的值了。</p></li></ol><p>运行以上示例，你可以看到如下结果：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{飞雪无情 </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{飞雪无情 </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">}</span></span></code></pre></div><p>这个示例主要是为了讲解 uintptr 指针运算，所以一个结构体字段的赋值才会写得这么复杂，如果按照正常的编码，以上示例代码会和下面的代码结果一样。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   p </span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(person)</span></span>
<span class="line"><span style="color:#E1E4E8;">   p.Name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;飞雪无情&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   p.Age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   p </span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(person)</span></span>
<span class="line"><span style="color:#24292E;">   p.Name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;飞雪无情&quot;</span></span>
<span class="line"><span style="color:#24292E;">   p.Age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>指针运算的核心在于它操作的是一个个内存地址，通过内存地址的增减，就可以指向一块块不同的内存并对其进行操作，而且不必知道这块内存被起了什么名字（变量名）。</p><h3 id="指针转换规则" tabindex="-1">指针转换规则 <a class="header-anchor" href="#指针转换规则" aria-label="Permalink to &quot;指针转换规则&quot;">​</a></h3><p>你已经知道 Go 语言中存在三种类型的指针，它们分别是：常用的 *T、unsafe.Pointer 及 uintptr。通过以上示例讲解，可以总结出这三者的转换规则：</p><ol><li><p>任何类型的 *T 都可以转换为 unsafe.Pointer；</p></li><li><p>unsafe.Pointer 也可以转换为任何类型的 *T；</p></li><li><p>unsafe.Pointer 可以转换为 uintptr；</p></li><li><p>uintptr 也可以转换为 unsafe.Pointer。</p></li></ol>`,43),E=p(`<p>(指针转换示意图)</p><p>可以发现，unsafe.Pointer 主要用于指针类型的转换，而且是各个指针类型转换的桥梁。uintptr 主要用于指针运算，尤其是通过偏移量定位不同的内存。</p><h3 id="unsafe-sizeof" tabindex="-1">unsafe.Sizeof <a class="header-anchor" href="#unsafe-sizeof" aria-label="Permalink to &quot;unsafe.Sizeof&quot;">​</a></h3><p>Sizeof 函数可以返回一个类型所占用的内存大小，这个大小只与类型有关，和类型对应的变量存储的内容大小无关，比如 bool 型占用一个字节、int8 也占用一个字节。</p><p>通过 Sizeof 函数你可以查看任何类型（比如字符串、切片、整型）占用的内存大小，示例代码如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">int8</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">int16</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">int32</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10000000</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">int64</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10000000000000</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">int</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10000000000000000</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;飞雪无情&quot;</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(unsafe.</span><span style="color:#79B8FF;">Sizeof</span><span style="color:#E1E4E8;">([]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;飞雪u无情&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;张三&quot;</span><span style="color:#E1E4E8;">}))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">int8</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">int16</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">int32</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10000000</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">int64</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10000000000000</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">int</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10000000000000000</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;飞雪无情&quot;</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(unsafe.</span><span style="color:#005CC5;">Sizeof</span><span style="color:#24292E;">([]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;飞雪u无情&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;张三&quot;</span><span style="color:#24292E;">}))</span></span></code></pre></div><p>对于整型来说，占用的字节数意味着这个类型存储数字范围的大小，比如 int8 占用一个字节，也就是 8bit，所以它可以存储的大小范围是 -128~~127，也就是 −2^(n-1) 到 2^(n-1)−1。其中 n 表示 bit，int8 表示 8bit，int16 表示 16bit，以此类推。</p><p>对于和平台有关的 int 类型，要看平台是 32 位还是 64 位，会取最大的。比如我自己测试以上输出，会发现 int 和 int64 的大小是一样的，因为我用的是 64 位平台的电脑。</p><blockquote><p>小提示：一个 struct 结构体的内存占用大小，等于它包含的字段类型内存占用大小之和。</p></blockquote><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>unsafe 包里最常用的就是 Pointer 指针，通过它可以让你在 *T、uintptr 及 Pointer 三者间转换，从而实现自己的需求，比如零内存拷贝或通过 uintptr 进行指针运算，这些都可以提高程序效率。</p><p>unsafe 包里的功能虽然不安全，但的确很香，比如指针运算、类型转换等，都可以帮助我们提高性能。不过我还是建议尽可能地不使用，因为它可以绕开 Go 语言编译器的检查，可能会因为你的操作失误而出现问题。当然如果是需要提高性能的必要操作，还是可以使用，比如 []byte 转 string，就可以通过 unsafe.Pointer 实现零内存拷贝，下节课我会详细讲解。</p>`,12),i=r("p",null,"unsafe 包还有一个函数我这节课没有讲，它是 Alignof，功能就是函数名字字面的意思，比较简单，你可以自己练习使用一下，这也是这节课的思考题。记得来听下节课哦！",-1);function u(F,f,d,C,g,h){const s=o("Image");return e(),t("div",null,[y,n(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/AC/CgpVE1_ge3eAaiW8AABP2TB3gXA825.png"}),a(),E,n(s,{alt:"16金句.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C9/Ciqc1F_ge7KAW3QcAAVodV4QU6c331.png"}),a(),i])}const P=l(c,[["render",u]]);export{m as __pageData,P as default};
