import{_ as l,j as o,o as e,g as t,k as a,Q as p,s,h as r}from"./chunks/framework.e0c66c3f.js";const D=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6887) 22  适配器模式：如何处理不同 API 接口的兼容性？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6887) 22  适配器模式：如何处理不同 API 接口的兼容性？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/趣学设计模式_文档/(6887) 22  适配器模式：如何处理不同 API 接口的兼容性？.md"},E=p('<p>在前面的五讲中，我们一起学习了创建型的设计模式。从今天开始，我们就开始学习另外一组设计模式------结构型模式。如果说<strong>创建型设计模式</strong> 的关注重点在于<strong>一个对象内部结构</strong> 的话（常常是接口与实现的组合），那么<strong>结构性设计模式</strong> 的关注重点就在于<strong>多个对象之间的组合方式</strong>。</p><p>结构型设计模式一共包括七种：<strong>适配器模式、桥接模式、组合模式、装饰模式、门面模式、享元模式和代理模式</strong>。今天这一讲，我们主要讲解最常用到的适配器模式。</p><p>那么，话不多说，让我们开始今天的学习吧！</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>适配器模式的原始定义是：将类的接口转换为客户期望的另一个接口，适配器可以让不兼容的两个类一起协同工作。</p><p>该定义中明确说明了适配器模式的关键点就在于<strong>转换</strong> ，而<strong>转换时要在已有的接口基础上做好兼容</strong>。</p><p>这里我们还是直接来看看适配器模式的 UML 图，如下所示：</p>',7),y=p(`<p>从 UML 图中，我们可以看出适配器模式中包含三个关键角色：</p><ul><li><p><strong>目标类，</strong> 适配器类即将要进行适配的抽象类或接口；</p></li><li><p><strong>适配器类，</strong> 可以是类或接口，是作为具体适配者类的中间类来使用；</p></li><li><p><strong>具体适配者类，</strong> 可以是内部的类或服务，也可以是外部对象或服务。</p></li></ul><p>我们再来看看 UML 图对应的代码实现，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TargetAbstraction</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">str</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TargetAbstractionImpl</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TargetAbstraction</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">str</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> str.</span><span style="color:#B392F0;">replaceAll</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;A&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Adapter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TargetAbstraction</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> OtherClass otherClass;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Adapter</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        otherClass </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">OtherClass</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">str</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        otherClass.</span><span style="color:#B392F0;">preCheck</span><span style="color:#E1E4E8;">(str);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> otherClass.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(str);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">OtherClass</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">OtherClass</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">str</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> str.</span><span style="color:#B392F0;">replaceAll</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;[&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">preCheck</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">str</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TargetAbstraction</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">str</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TargetAbstractionImpl</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TargetAbstraction</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">str</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> str.</span><span style="color:#6F42C1;">replaceAll</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;A&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Adapter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TargetAbstraction</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> OtherClass otherClass;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Adapter</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        otherClass </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">OtherClass</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">str</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        otherClass.</span><span style="color:#6F42C1;">preCheck</span><span style="color:#24292E;">(str);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> otherClass.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(str);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">OtherClass</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">OtherClass</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">str</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> str.</span><span style="color:#6F42C1;">replaceAll</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;[&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">preCheck</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">str</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>你会发现，代码实现中的 Adapter 类充当了一个中间者的角色，Adapter 类继承目标类TargetAbstraction 并实现接口 filter，同时在 fliter 中加入新的扩展功能，扩展功能使用具体适配者类 OtherClass 来实现，这样在保留原有 filter 功能的同时，也增加了新的功能。</p><p>事实上，适配器模式封装了三个重要事实：</p><ul><li><p>具体适配者类可以有不同的接口；</p></li><li><p>用户在使用适配器类时实际上使用了多个接口；</p></li><li><p>适配器类和具体适配者类引入了变化。</p></li></ul><p>如下简图所示，适配器模式的类实际上是作为中间者来封装变化的。</p>`,8),i=p(`<p>所以说，适配器模式的核心原理就是<strong>在原有的接口或类的外层封装一个新的适配器层，以实现扩展对象结构的效果，并且这种扩展可以无限扩展下去</strong>。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>适配器模式一般常用的使用场景有：</p><ul><li><p>原有接口无法修改时；</p></li><li><p>原有接口功能太老旧时；</p></li><li><p>统一多个类的接口设计时；</p></li><li><p>需要过渡升级旧接口时；</p></li><li><p>需要依赖外部系统时；</p></li><li><p>适配不同数据格式时；</p></li><li><p>不同接口协议转换时。</p></li></ul><p>总结起来，适配器模式的使用场景主要有这两大类：<strong>第一类就是原有接口功能不满足现有要求，需要在兼容老接口的同时做适当的扩展；第二类是有相似性的多个不同接口之间做功能的统一</strong>。</p><p>比如，Mac 笔记本电脑使用 Type-C 接口，但通过一个扩展坞就可以转换为 HDMI 视频输出接口、USB 接口等，这样就能很方便地连接外部的 USB 键盘、鼠标、显示器等。再比如，到不同国家去，我们都会随身携带电源转换适配器，以便于将不同国家使用的电源电流标准转化为适合我们自己电器的标准。这些例子本质上都是适配器模式在现实工作和生活中的应用。</p><p>同样，各种类库和框架中也都在大量地使用适配器模式。为了帮助你更好地理解适配器的使用，这里我们还是通过一个简单的例子来进一步说明一下。例如，我们想要通过命令行来输入一段字符串，具体代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">BufferedReader br </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BufferedReader</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InputStreamReader</span><span style="color:#E1E4E8;">(System.in));</span></span>
<span class="line"><span style="color:#E1E4E8;">System.out.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Enter String&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">String s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> br.</span><span style="color:#B392F0;">readLine</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">System.out.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Enter input: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> s);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">BufferedReader br </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BufferedReader</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InputStreamReader</span><span style="color:#24292E;">(System.in));</span></span>
<span class="line"><span style="color:#24292E;">System.out.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Enter String&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">String s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> br.</span><span style="color:#6F42C1;">readLine</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">System.out.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Enter input: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> s);</span></span></code></pre></div><p>代码的大致逻辑是：我们希望使用 BufferedReader 读取用户从命令行（System.in 提供窗口输入）输入的字符并打印。你会发现，System.in 需要的接口类型是 InputStream，而 BufferedReader 的接口类型却是 Reader 类型，这明显属于期望的接口与实际接口不相符的情况，也对应上面我们所说的&quot;原有接口无法修改时&quot;的场景。这时就是使用适配器模式最好的时机。</p><p>代码中的 InputStreamReader 实际上就是充当了适配器的角色，这里我们看一下 InputStreamReader 构造函数的源码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InputStreamReader</span><span style="color:#E1E4E8;">(InputStream in) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(in);  </span><span style="color:#6A737D;">//适配了原始的Reader接口类型</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            sd </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> StreamDecoder.</span><span style="color:#B392F0;">forInputStreamReader</span><span style="color:#E1E4E8;">(in, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, (String)</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// ## check lock object</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (UnsupportedEncodingException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// The default encoding should always be available</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InputStreamReader</span><span style="color:#24292E;">(InputStream in) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(in);  </span><span style="color:#6A737D;">//适配了原始的Reader接口类型</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            sd </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> StreamDecoder.</span><span style="color:#6F42C1;">forInputStreamReader</span><span style="color:#24292E;">(in, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, (String)</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// ## check lock object</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (UnsupportedEncodingException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// The default encoding should always be available</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p>当我们使用 new 关键字来创建 InputStreamReader(System.in) 对象时，实际上最终生成了能够让 BufferedReader 进行读取的 Reader 输入流，这样便实现了适配器模式。</p><p>因此，可以这么说，适配器模式的使用场景侧重于将不适用的功能转换到期望可用的功能。</p><h3 id="为什么要使用适配器模式" tabindex="-1">为什么要使用适配器模式？ <a class="header-anchor" href="#为什么要使用适配器模式" aria-label="Permalink to &quot;为什么要使用适配器模式？&quot;">​</a></h3><p>通过上面的分析，我们还可以总结出选择适配器模式主要有以下三个原因。</p><p><strong>第一，原有接口无法修改但又必须快速兼容部分新功能。</strong> 有时某些接口会因为一些因素而无法修改，比如，已交接的系统、跨团队、外部公用接口等，但这种情况下又需要适当扩展现有接口的功能，该怎么办呢？能想到的第一个办法就是使用适配器模式进行扩展。适配器模式也被称为&quot;最好用打补丁模式&quot;，就是因为只要是一个接口，都可以用它来进行适配。不过，要注意的是适配的新接口和目标接口差异不大时，扩展才更有效，不要被&quot;适配器就是万能接口&quot;的思维所误导，这就像你非要适配 10 年前的软盘接口一样不现实，也没有必要。</p><p><strong>第二，需要使用外部组件组合成新组件来提供功能，而又不想重复开发部分功能。</strong> 比如，构建自然语言识别功能时，你不想从零开始训练庞大的中文语义模型来实现 NLP 接口，这时你就可以选择使用外部第三方公共平台提供的 NLP 接口，然后组合实现你自己的 NLP 接口，形成新的组件。虽然这样效率很高，但是依赖外部系统的风险同样突出（如果外部功能变更或下线，则组件可能不可用），只是作为短期的过渡方案，适配器模式可以说是绝佳选择。</p><p><strong>第三，不同数据格式、不同协议需要转换。</strong> 比如，API 网关中经常需要对 iOS、安卓、H5 等不同的客户端进行数据和通信协议上的适配转换，这时网关就是一个是适配器，适配客户端的同时适配服务端。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>使用适配器模式主要有以下五个大的优点。</p><ul><li><p><strong>将目标类和具体适配者类解耦。</strong> 通过引入一个适配器类来兼容现有的目标类，重用原有类功能的同时扩展新功能，而无须修改原有目标类代码，这样很好地避免了具体适配者类和目标类的直接耦合。</p></li><li><p><strong>增加了类的透明性。</strong> 具体的适配者类中新增功能只影响适配者类，而对于使用目标类的客户端类来说是透明的（使用目标类接口），客户端的调用逻辑不会受到影响。</p></li><li><p><strong>满足里氏替换原则。</strong> 具体适配者类通过适配器类与目标类进行交互，那么适配器类只要不影响目标类的接口功能，具体适配者类无论使用什么样的新功能，都能很方便快速地进行替换。</p></li><li><p><strong>符合开闭原则。</strong> 由于具体适配者类要么是适配器类的子类，要么和适配器类是组合关系，所以对目标类没有修改，满足开闭原则。</p></li><li><p><strong>统一多个类或接口。</strong> 一个适配器类可以把多个不同的具体适配者类和子类，都适配到同一个目标类上，如果这个目标类是一个新类，那么就是间接实现了统一多个类或接口的功能。</p></li></ul><p>同样，适配器模式也有一些缺点。</p><ul><li><p><strong>一次只能适配一个抽象类或接口。</strong> 像 Java、C# 等编程语言是不支持多重继承的，那么在进行适配时，一次最多只能适配一个适配者类。另外，目标类只能为抽象类或接口，不能为具体实例类，这样会在适配时增加很多类文件和代码量，如果适配的类或接口比较多，那么就会增加代码的理解难度。</p></li><li><p><strong>过度嵌套会导致接口臃肿。</strong> 适配器有一个最大的弊端就是，一旦不停地在同一个目标类上增加适配器，就会很容易让接口变得越来越臃肿。你见过一个接口被适配 20 次的情景吗？我前不久在工作中就见过，其实这也是开闭原则极端副作用的某种体现。因为不想去修改原有接口，所以就不断使用新接口适配，而维护接口的人又在不断变化，于是就继续按照这个不修改的思路维护下去，表面上的确符合开闭原则，但实际上只不过是将风险不断隐藏罢了。一旦原始接口（目标类）功能下线后，这个适配链条造成的影响会非常大。</p></li><li><p><strong>目标接口依赖太多适配接口，修改目标接口会导致所有适配接口都需要定制修改。</strong> 本来适配器模式是为了解耦，但是如果适配太多接口，就会演变为另一种定制化的开发。比如，上游平台商家提供的接口变更，导致下游使用方频繁变更接口。再比如，消息组件接口的变更导致所有引用消息组件的适配器全部都需要修改。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>一般来说，适配器模式能够让一个接口与新的接口实现兼容，从而在新的抽象逻辑层次上统一多个不同的接口。但也正是因为适配器模式太过于灵活了，容易导致过度滥用而造成对象间耦合性过高，所以适配器模式的适配器类最好采用<strong>私有继承</strong>的方式，以起到限定接口功能范围的作用。</p><p>除此之外，在具体使用适配器模式的时候，还要尽量避免过多的嵌套适配，也就是不要不断地在适配器上增加适配器，我的建议是<strong>不要超过 3 次适配</strong>，超过了就要考虑是否需要重新设计接口功能。</p><p>由于结构性设计模式涉及如何组合更多的对象来提升代码结构的灵活性，因此在学习所有结构性设计模式的时候，都要努力建立一个大局观，也就是<strong>要多从整体程序设计的大结构去考虑模式应用的场景，不要过度纠结于局部是不是满足模式</strong>。</p>`,27),d=s("h3",{id:"课后思考",tabindex:"-1"},[r("课后思考 "),s("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),u=s("p",null,"当使用适配器模式的接口中有外部接口抛出异常时，适配器类是该直接透传抛出异常，还是捕获后重新抛出新异常，又或者是直接内部处理？为什么？",-1),g=s("p",null,"欢迎留言分享，我会第一时间给你回复。",-1),F=s("p",null,'在下一讲，我会接着与你分享"桥接模式：如何实现抽象协议与不同实现的绑定？"这个话题，记得按时来听课！',-1);function h(A,_,C,b,S,B){const n=o("Image");return e(),t("div",null,[E,a(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M01/41/9A/CioPOWCsz32ARwVLAABfjk8UuXc980.png"}),y,a(n,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image6/M01/41/91/Cgp9HWCsz4iABEtCAABCKYltQBM798.png"}),i,a(n,{alt:"设计模式22--金句.png",src:"https://s0.lgstatic.com/i/image6/M01/41/9A/CioPOWCsz5SAKHVgAAYS6mFbOh8470.png"}),d,u,g,F])}const f=l(c,[["render",h]]);export{D as __pageData,f as default};
