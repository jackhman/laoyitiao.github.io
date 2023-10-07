import{_ as o,j as t,o as e,g as r,k as p,h as a,Q as l,s}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"05对象思维：面向对象编程有哪些优势？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6866) 05  对象思维：面向对象编程有哪些优势？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6866) 05  对象思维：面向对象编程有哪些优势？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/趣学设计模式_文档/(6866) 05  对象思维：面向对象编程有哪些优势？.md"},i=l(`<h1 id="_05对象思维-面向对象编程有哪些优势" tabindex="-1">05对象思维：面向对象编程有哪些优势？ <a class="header-anchor" href="#_05对象思维-面向对象编程有哪些优势" aria-label="Permalink to &quot;05对象思维：面向对象编程有哪些优势？&quot;">​</a></h1><p>现在我们一说到&quot;面向对象编程&quot;似乎感觉就是编程的全部，实际上它是 20 世纪 60 年代就已经出现的一门&quot;古老&quot;技术，在 2000 年以后，随着 Java 和 .NET 等编程语言的出现，才逐渐开始在企业软件开发中发挥重要作用。</p><p>那为什么后来面向对象编程变得这么重要呢？或者说为什么开发人员要学习面向对象编程呢？因为<strong>面向对象编程是一门能让你轻松编写高质量软件的综合技术</strong>。</p><p>之所以这么说，是因为现在软件的复杂性已经从过去的底层复杂性（操作系统、编译器）转移到了更高的抽象层面（应用程序）。</p><ul><li><p>一方面，底层操作系统和基础设施技术趋于稳定。现代软件重视可重用性、可维护性更胜于效率（性能），但并不是说性能不重要，而是因为基础设施，例如，操作系统、网络等变得越来越稳定，相反，上层软件的功能扩展需求则变得越来越多。</p></li><li><p>另一方面，人们期望通过理解高级抽象来快速认识计算机系统。对于一个用户来说，App 能提供什么样的功能体验比它到底是被如何被设计开发出来的更重要，但是矛盾也由此产生，没有运行良好的 App 程序，就无法提供体验更丰富的功能。</p></li></ul><p>实际上，<strong>面向对象技术的出现就是为了解决软件的大规模可扩展性问题</strong>。</p><p>那今天这一讲我们就来一起聊聊：随着面向对象技术的发展，它在编程上到底能给我们带来哪些优势？</p><h3 id="编程语言-vs-编程范式" tabindex="-1">编程语言 VS 编程范式 <a class="header-anchor" href="#编程语言-vs-编程范式" aria-label="Permalink to &quot;编程语言 VS 编程范式&quot;">​</a></h3><p>这里我们先来看一个问题：现在 Java 8 以上已经提供了 Lambda 表达式进行函数式的编程，同时也能进行面向对象的编程，那么 Java 是属于什么类型的编程语言？可以使用哪些编程范式？</p><p>估计你已经注意到这两个问题所用的措辞：编程语言和编程范式。</p><p>那什么是编程语言？<strong>编程语言，是一种标准化的通信方式，用来向计算机发出指令。</strong> 比如，C 语言的 Hello World 代码示例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#include </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">stdio.h</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello, World!&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#include </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">stdio.h</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello, World!&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>再比如，Java 语言的 Hello World 代码示例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SayHelloWorld</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">argus</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">       System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello World!&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SayHelloWorld</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">argus</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">       System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello World!&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如果只从上面两段代码来判断，只会得出它们最终是告诉计算机要在终端设备上打印 Hello World，但还是无法判断谁是面向对象编程语言。</p><p>什么是编程范式？<strong>编程范式是一种根据编程语言的功能对编程语言进行分类的方法，它不针对具体的某种编程语言。</strong></p><p>根据功能重视的侧重点不同，编程范式通常可分为命令式和声明式两大类：命令式再往下又可以细分为面向过程编程范式、面向对象编程范式和并发处理范式，声明式又分为逻辑编程范式、函数编程和数据库编程范式。编程范式与编程语言的关系可参考下图：</p>`,17),E=s("p",null,[a("从上面的介绍你可能也意识到，"),s("strong",null,"编程语言 ≠ 编程范式。"),a(" 换句话说，编程语言是对编程范式的一种工具技术上的支撑，一种语言可以适用多种编程范式。")],-1),y=s("p",null,"那么，什么是面向对象编程？",-1),d=s("p",null,[s("strong",null,"面向对象编程是一种编程范式，是基于部分特定编程语言下的编程经验总结，代表了程序员在编码时应该如何构建和执行程序的一种方法集合。")],-1),g=l('<p>现在来回答这部分开头的问题：Java 是面向对象的编程语言，可以使用面向过程或面向对象的编程范式。</p><h3 id="面向对象编程优势" tabindex="-1">面向对象编程优势 <a class="header-anchor" href="#面向对象编程优势" aria-label="Permalink to &quot;面向对象编程优势&quot;">​</a></h3><p>前面我们介绍了面向对象编程的定义，并将编程语言与编程范式做了一个简单对比。</p><p>现在你应该知道了，面向对象编程是一种编程经验的抽象总结。除此以外，与之对应的编程范式还有泛型编程、函数式编程、过程式编程、响应式编程等。</p><p>相比于其他编程范式，面向对象编程在解决软件的扩展性和复用性上有非常大的优势。所以，接下来我们就来详细分析下面向对象编程的这些优势。</p><h4 id="优势一-模块化更适合团队敏捷开发" tabindex="-1">优势一：模块化更适合团队敏捷开发 <a class="header-anchor" href="#优势一-模块化更适合团队敏捷开发" aria-label="Permalink to &quot;优势一：模块化更适合团队敏捷开发&quot;">​</a></h4><p>模块化编程思想最早出现于 1968 年，当时被当作编程语言本身的一种扩展来使用，而真正支持模块化编程的语言却是 1975 年才出现，叫 Modula（现在很少有人知道），而后很长一段时间里，模块化编程并未得到重视，直到 C++ 和 Java 的相继出现，才逐渐将模块化思想发扬光大。</p><p>我们都知道，现代企业的软件系统规模变得越来越庞大，有时可能需要几十、几百人组成的研发团队，耗费几个月甚至几年来开发一款软件产品。</p><p>从时间和投入的成本来看，这样大规模的软件开发是一项巨大的复杂工程，堪比修建一栋大楼。即使没有这么大的规模，我们想要顺利推进软件开发并最终取得成功，也是一件非常不容易的事。</p><p>你可能会有疑问：&quot;敏捷开发实践与面向对象编程有什么关系呢？&quot;</p><p>面向对象编程所提倡的<strong>模块化编程</strong> ，在很大程度上直接解决了开发团队之间的合作问题，也就是<strong>不同团队和个人可以通过编写程序模块来进行功能交互</strong>，这让整个团队的开发效率得到了真正的提升。</p><p>为什么过去敏捷开发推行起来如此困难？主要有三个原因：</p><ul><li><p>单体软件应用的修改成本很高；</p></li><li><p>组件重用性低，不同项目需要大量重复性开发；</p></li><li><p>代码耦合性高，逻辑难以理解，故障排查与修复效率低。</p></li></ul><p>那面向对象编程是如何解决这些问题的呢？</p><p>第一，为什么单体软件会被称为单体应用代码地狱？最重要的原因就在于，随着代码量的不断增加，软件功能逻辑会变得异常复杂，而且维护代码的人数越多，代码越难理解。这使得代码的修改成本非常高昂，因为每修改一次代码，很有可能会影响非常多的代码。</p><p>而面向对象技术会<strong>尽可能解耦复杂的逻辑</strong>，即使是单体应用，也会抽象更多模块，让功能更容易被理解，这在多人的协同开发中尤其重要。试想几十个人在维护同一个系统代码时，看见功能划分清晰的模块，和看见一团糟代码的模块，心情一定是截然不同的。</p><p>第二，如果没有组件化，在软件开发时会带来一个问题：很多基础功能都需要重新实现，比如，网络通信、操作 IO 等。因为没有重用的组件，每一个软件项目都得自行开发去实现，势必会造成巨大的人力和时间浪费。</p><p>现在，我们所熟知的类库、框架，最早就是起源于<strong>面向对象组件重用</strong>的思想，目的就是提高多人协作编程的效率。正是因为有了更多可复用的组件，我们才不用从汇编语言开始编写，而是直接基于底层组件扩展更丰富的上层功能。</p><p>第三，软件运行时，势必会发生故障。而发生故障不可怕，可怕的是发生故障以后很久都无法恢复。早年我曾亲身经历过为定位一个问题，排查一个超过 8 万行代码的模块时那种地狱般的场景，几十个开发和测试人员在一个办公室里轮班好几个通宵定位和测试问题，虽然最终找到了问题并修复，但是却错过了给客户演示的最佳时机，项目以失败告终。后来在复盘会上，所有人都提出应该划分更清晰的模块以及写更易读的代码来提升可维护性。</p><p>而在面向对象编程中，我们可以通过<strong>给对象分配职责来划分不同模块的功能，让各个模块的功能更聚焦在一个关注点上</strong>，这样当代码发生修改时，影响的范围几乎能很快被定位到。</p><h4 id="优势二-对象结构更能提升代码重用性、可读性" tabindex="-1">优势二：对象结构更能提升代码重用性、可读性 <a class="header-anchor" href="#优势二-对象结构更能提升代码重用性、可读性" aria-label="Permalink to &quot;优势二：对象结构更能提升代码重用性、可读性&quot;">​</a></h4><p>面向对象有三大特性：<strong>封装、多态和继承</strong>。这个结构是之前很多编程语言所没有的，而且它解决了结构化语言面临的以下两大难题。</p><ul><li><p>第一个是<strong>全局变量问题</strong>。全局变量是指程序中任意地方都能访问的变量，其最大的问题就是一处修改所有引用的地方都需要修改。结构化语言中通过局部变量和值传递的结构，来避免使用全局变量。但是，局部变量是临时变量，在调用结束后就会消失，这就导致当你需要在一段程序运行完成后继续使用此信息时，则需要将值保存为全局变量。</p></li><li><p>第二个是<strong>可重用性范围问题</strong>。结构化语言中可重用的范围是代码中的子代码（比如某个函数方法），如果离开当前代码，那么子代码就无法被再次使用。</p></li></ul><p>而面向对象结构却很好地避免了以上两种问题，类结构将相关的子程序（或函数）和全局变量汇总在一起，创建高一层级的软件组件；多态和继承则去除了冗余的公用子程序，让公用程序更好地被重用。</p><p>这就让代码从复杂变得更简单、易懂，增加了代码的可读性。你可能会问，代码写出来不都是用来读的吗？可读性好坏真有这么重要？</p><p>我们都知道评价代码质量的好坏通常有三个维度：<strong>可读性、可测试性以及可维护性</strong>。其中，可读性是最重要的，只有你写的代码可读性高，别人才更愿意维护你的代码；如果可读性低，大多数人的做法要么是重构，要么是重写。而重构则意味着要承担维护这部分代码的责任，如果不是迫不得已，一般没人愿意承担未知的风险，所以实际上对于难以阅读的代码，绝大部分人都宁愿选择重写而不是重构。</p><p>所以说，为了让代码变得更加可读，面向对象编程具有不可替代的优势。</p><h4 id="优势三-组合和聚合思想让代码演进更重视组件化" tabindex="-1">优势三：组合和聚合思想让代码演进更重视组件化 <a class="header-anchor" href="#优势三-组合和聚合思想让代码演进更重视组件化" aria-label="Permalink to &quot;优势三：组合和聚合思想让代码演进更重视组件化&quot;">​</a></h4><p>在我看来，面向对象编程除了前面提到的两个优势外，还有一个更重要的优势：它提出的对象之间的组合和聚合关系，让代码在构建过程中更容易形成通用组件。什么是组件？简单来说就是<strong>封装了一个或多个程序代码的二进制文件</strong>，比如，Java 的 jar 包。</p><p>那么，什么是组合、聚合关系？</p><ul><li><p><strong>聚合关系</strong> 表示整体由部分组成，但是<strong>整体和部分不是强依赖的</strong>，整体不存在了部分还是会存在。</p></li><li><p><strong>组合关系</strong> 和聚合不同，组合中<strong>整体和部分是强依赖的</strong>，整体不存在了部分也不存在了。</p></li></ul><p>组合、聚合本来是描述对象之间关系的一种设计方法，含义也简单清晰，但是随着面向对象编程技术的不断发展和程序员们的不断努力，现在已经出现了大量可重用的组件群，比如，类库、框架等。正是因为有了这些优秀的组件群，才让我们在软件开发时，不用每次都从零开始。</p><p>比如说，Java 为了实现跨平台兼容性，而使用 C++ 开发出了 JVM 这个非常重要的组件，当在不同操作系统下构建组件时，C 语言需要在不同的平台下进行编译构建，而 Java 则不需要，只需要一次编写然后在有 JVM 的环境中就可以编译运行了。</p><p>除了不用&quot;重复造轮子&quot;外，组合/聚合思想的另外一个优势是：充分利用众人的智慧，最典型的例子就是 Linux 系统。而对于开发者来说，使用开源框架同样也是组合/聚合思想的体现。比如，现在越来越多的开发者都会优先选择开源框架，一方面可以快速复用已有能力，另一方面可以针对自己的业务场景进行定制和修改。</p><p>所以说，面向对象语言虽然没有面向过程语言的代码运行效率高，但通过牺牲部分性能换取跨平台的兼容性，也带来了更多的优势。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>编程语言是一种标准化的通信方式，用来向计算机发出指令。编程语言是对编程范式的一种工具技术上的支撑，一种语言可以适用多种编程范式。编程范式是一种根据功能对编程语言进行分类的方式，但它并不针对某种编程语言。</p><p>所以，我们常说的<strong>面向对象编程其实是一种编程范式。</strong></p><p>面向对象编程有三大优势：模块化、对象结构和组合/聚合思想。你会发现，它们的<strong>核心理念都是在提升代码的可扩展性、可重用性和可维护性</strong>。80% 的时间里代码都是在被阅读的，如果一段代码很难阅读，那么维护人员修复起来就会非常耗时耗力，而且难读的代码扩展性也非常差，任何的新增功能都有可能引入更多未知的问题。</p><p>比如，我曾写过大量的一次性硬代码和过程式编码，从功能完成角度来看，没有任何问题，但是从扩展性和维护性的角度来看，真的非常难以维护，也给很多人带来过困扰。</p><p>意识到这样的问题后，我重新学习了面向对象编程，并不断地在新的项目中重新试着去写可读、可维护、可重用的代码。虽然刚开始代码量会比写硬编码时更多，直觉上也会很难受，但随着时间的推移，它的优势慢慢发挥出来后，项目就变得更易扩展和维护，周边所有同事的反馈也越来越好，这时我才明白：<strong>要想发挥面向对象编程的优势，遵循正确的方法很重要</strong>。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>有人说面向对象不是语言的问题，而是一种思想。还有人说在 C++ 和 Java 流行之前，只要有面向对象的思想，无论是 C 语言还是 COBOL，都可以实现面向对象编程。你认为这种想法对吗？</p><p>欢迎你在留言区与我分享你的想法和体会。</p><p>在下一讲，我会接着和你分享&quot;迭代思维及高效编程&quot;的相关内容，记得按时来听课！</p>',45);function u(_,h,m,q,v,b){const n=t("Image");return e(),r("div",null,[i,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/6D/CioPOWBcV0GAJaLsAAFDQcWKHNk221.png"}),a(),E,y,d,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/27/71/Cgp9HWBcV0yABBoYAAYDz4WDNrk515.png"}),a(),g])}const A=o(c,[["render",u]]);export{C as __pageData,A as default};
