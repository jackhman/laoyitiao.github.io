import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.4e7d56ce.js";const g=JSON.parse('{"title":"03控制结构：if、for、witch逻辑语句的那些事儿","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5229) 03  控制结构：if、for、witch 逻辑语句的那些事儿.md","filePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5229) 03  控制结构：if、for、witch 逻辑语句的那些事儿.md","lastUpdated":1696338709000}'),p={name:"posts/backEnd/22 讲通关 Go 语言_文档/(5229) 03  控制结构：if、for、witch 逻辑语句的那些事儿.md"},o=l(`<h1 id="_03控制结构-if、for、witch逻辑语句的那些事儿" tabindex="-1">03控制结构：if、for、witch逻辑语句的那些事儿 <a class="header-anchor" href="#_03控制结构-if、for、witch逻辑语句的那些事儿" aria-label="Permalink to &quot;03控制结构：if、for、witch逻辑语句的那些事儿&quot;">​</a></h1><p>在上节课中我留了一个思考题，在一个字符串中查找另外一个字符串是否存在，这个其实是字符串查找的功能，假如我需要在&quot;飞雪无情&quot;这个字符串中查找&quot;飞雪&quot;，可以这么做：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">i</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">strings.</span><span style="color:#79B8FF;">Index</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;飞雪无情&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;飞雪&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">i</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">strings.</span><span style="color:#005CC5;">Index</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;飞雪无情&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;飞雪&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>这就是 Go 语言标准库为我们提供的常用函数，以供我们使用，减少开发。</p><p>这节课我们继续讲解 Go 语言，今天的内容是：Go 语言代码逻辑的控制。</p><p>流程控制语句用于控制程序的执行顺序，这样你的程序就具备了逻辑结构。一般流程控制语句需要和各种条件结合使用，比如用于条件判断的 if，用于选择的 switch，用于循环的 for 等。这一节课，我会为你详细介绍，通过示例演示它们的使用方式。</p><h3 id="if-条件语句" tabindex="-1">if 条件语句 <a class="header-anchor" href="#if-条件语句" aria-label="Permalink to &quot;if 条件语句&quot;">​</a></h3><p>if 语句是条件语句，它根据布尔值的表达式来决定选择哪个分支执行：如果表达式的值为 true，则 if 分支被执行；如果表达式的值为 false，则 else 分支被执行。下面，我们来看一个 if 条件语句示例：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&gt;10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&lt;=10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&gt;10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&lt;=10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这是一个非常简单的 if......else 条件语句，当 i&gt;10 为 true 的时候，if 分支被执行，否则就执行 else 分支，你自己可以运行这段代码，验证打印结果。</p><p>关于 if 条件语句的使用有一些规则：</p><ol><li><p>if 后面的条件表达式不需要使用 ()，这和有些编程语言不一样，也更体现 Go 语言的简洁；</p></li><li><p>每个条件分支（if 或者 else）中的大括号是必须的，哪怕大括号里只有一行代码（如示例）；</p></li><li><p>if 紧跟的大括号 { 不能独占一行，else 前的大括号 } 也不能独占一行，否则会编译不通过；</p></li><li><p>在 if......else 条件语句中还可以增加多个 else if，增加更多的条件分支。</p></li></ol><p>通过 go run ch03/main.go 运行下面的这段代码，会看到输出了 5&lt;i&lt;=10 ，这说明代码中的 else if i&gt;5 &amp;&amp; i&lt;=10 成立，该分支被执行。</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">6</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&gt;10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">  i</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&lt;=</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;5&lt;i&lt;=10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&lt;=5&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">6</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&gt;10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">  i</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&lt;=</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;5&lt;i&lt;=10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&lt;=5&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>你可以通过修改 i 的初始值，来验证其他分支的执行情况。</p><p>你还可以增加更多的 else if，以增加更多的条件分支，不过这种方式不被推荐，因为代码可读性差，多个条件分支可以使用我后面讲到的 switch 代替，使代码更简洁。</p><p>和其他编程语言不同，在 Go 语言的 if 语句中，可以有一个简单的表达式语句，并将该语句和条件语句使用分号 ; 分开。同样是以上的示例，我使用这种方式对其改造，如下面代码所示：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&gt;10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">  i</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&lt;=</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;5&lt;i&lt;=10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&lt;=5&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&gt;10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">  i</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&lt;=</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;5&lt;i&lt;=10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&lt;=5&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 if 关键字之后，i&gt;10 条件语句之前，通过分号 ; 分隔被初始化的 i:=6。这个简单语句主要用来在 if 条件判断之前做一些初始化工作，可以发现输出结果是一样的。</p><p>通过 if 简单语句声明的变量，只能在整个 if......else if......else 条件语句中使用，比如以上示例中的变量 i。</p><h3 id="switch-选择语句" tabindex="-1">switch 选择语句 <a class="header-anchor" href="#switch-选择语句" aria-label="Permalink to &quot;switch 选择语句&quot;">​</a></h3><p>if 条件语句比较适合分支较少的情况，如果有很多分支的话，选择 switch 会更方便，比如以上示例，使用 switch 改造后的代码如下：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">;{</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&gt;10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&lt;=</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;5&lt;i&lt;=10&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&lt;=5&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">;{</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&gt;10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&lt;=</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;5&lt;i&lt;=10&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&lt;=5&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>switch 语句同样也可以用一个简单的语句来做初始化，同样也是用分号 ; 分隔。每一个 case 就是一个分支，分支条件为 true 该分支才会执行，而且 case 分支后的条件表达式也不用小括号 () 包裹。</p><p>在 Go 语言中，switch 的 case 从上到下逐一进行判断，一旦满足条件，立即执行对应的分支并返回，其余分支不再做判断。也就是说 Go 语言的 switch 在默认情况下，case 最后自带 break。这和其他编程语言不一样，比如 C 语言在 case 分支里必须要有明确的 break 才能退出一个 case。Go 语言的这种设计就是为了防止忘记写 break 时，下一个 case 被执行。</p><p>那么如果你真的有需要，的确需要执行下一个紧跟的 case 怎么办呢？Go 语言也考虑到了，提供了 fallthrough 关键字。现在看个例子，如下面的代码所示：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> j</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;j {</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">fallthrough</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;没有匹配&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> j</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;j {</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fallthrough</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;没有匹配&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>以上示例运行会输出 1，如果省略 case 1: 后面的 fallthrough，则不会有任何输出。</p><p>不知道你是否可以发现，和上一个例子对比，这个例子的 switch 后面是有表达式的，也就是输入了 ;j，而上一个例子的 switch 后只有一个用于初始化的简单语句。</p><p>当 switch 之后有表达式时，case 后的值就要和这个表达式的结果类型相同，比如这里的 j 是 int 类型，那么 case 后就只能使用 int 类型，如示例中的 case 1、case 2。如果是其他类型，比如使用 case &quot;a&quot; ，会提示类型不匹配，无法编译通过。</p><p>而对于 switch 后省略表达式的情况，整个 switch 结构就和 if......else 条件语句等同了。</p><p>switch 后的表达式也没有太多限制，是一个合法的表达式即可，也不用一定要求是常量或者整数。你甚至可以像如下代码一样，直接把比较表达式放在 switch 之后：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2&gt;1&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2&lt;=1&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2&gt;1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2&lt;=1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可见 Go 语言的 switch 语句非常强大且灵活。</p><h3 id="for-循环语句" tabindex="-1">for 循环语句 <a class="header-anchor" href="#for-循环语句" aria-label="Permalink to &quot;for 循环语句&quot;">​</a></h3><p>当需要计算 1 到 100 的数字之和时，如果用代码将一个个数字加起来，会非常复杂，可读性也不好，这就体现出循环语句的存在价值了。</p><p>下面是一个经典的 for 循环示例，从这个示例中，我们可以分析出 for 循环由三部分组成，其中，需要使用两个 ; 分隔，如下所示：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sum</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">&lt;=</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sum</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">i</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;the sum is&quot;</span><span style="color:#E1E4E8;">,sum)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sum</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">&lt;=</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    sum</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">i</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;the sum is&quot;</span><span style="color:#24292E;">,sum)</span></span></code></pre></div><p>其中：</p><ol><li><p>第一部分是一个简单语句，一般用于 for 循环的初始化，比如这里声明了一个变量，并对 i:=1 初始化；</p></li><li><p>第二部分是 for 循环的条件，也就是说，它表示 for 循环什么时候结束。这里的条件是 i&lt;=100；</p></li><li><p>第三部分是更新语句，一般用于更新循环的变量，比如这里 i++，这样才能达到递增循环的目的。</p></li></ol><p>需要特别留意的是，Go 语言里的 for 循环非常强大，以上介绍的三部分组成都不是必须的，可以被省略，下面我就来为你演示，省略以上三部分后的效果。</p><p>如果你以前学过其他编程语言，可能会见到 while 这样的循环语句，在 Go 语言中没有 while 循环，但是可以通过 for 达到 while 的效果，如以下代码所示：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sum</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&lt;=</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sum</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">i</span></span>
<span class="line"><span style="color:#E1E4E8;">    i</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;the sum is&quot;</span><span style="color:#E1E4E8;">,sum)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sum</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&lt;=</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    sum</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">i</span></span>
<span class="line"><span style="color:#24292E;">    i</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;the sum is&quot;</span><span style="color:#24292E;">,sum)</span></span></code></pre></div><p>这个示例和上面的 for 示例的效果是一样的，但是这里的 for 后只有 i&lt;=100 这一个条件语句，也就是说，它达到了 while 的效果。</p><p>在 Go 语言中，同样支持使用 continue、break 控制 for 循环：</p><ol><li><p>continue 可以跳出本次循环，继续执行下一个循环。</p></li><li><p>break 可以跳出整个 for 循环，哪怕 for 循环没有执行完，也会强制终止。</p></li></ol><p>现在我对上面计算 100 以内整数和的示例再进行修改，演示 break 的用法，如以下代码：</p><p><em><strong>ch03/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sum</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">i</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sum</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">i</span></span>
<span class="line"><span style="color:#E1E4E8;">    i</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;the sum is&quot;</span><span style="color:#E1E4E8;">,sum)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sum</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">i</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    sum</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">i</span></span>
<span class="line"><span style="color:#24292E;">    i</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;the sum is&quot;</span><span style="color:#24292E;">,sum)</span></span></code></pre></div><p>这个示例使用的是没有任何条件的 for 循环，也称为 for 无限循环。此外，使用 break 退出无限循环，条件是 i&gt;100。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课主要讲解 if、for 和 switch 这样的控制语句的基本用法，使用它们，你可以更好地控制程序的逻辑结构，达到业务需求的目的。</p><p>这节课的思考题是：任意举个例子，练习 for 循环 continue 的使用。</p><p>Go 语言提供的控制语句非常强大，本节课我并没有全部介绍，比如 switch 选择语句中的类型选择，for 循环语句中的 for range 等高级能力。这些高级能力我会在后面的课程中逐一介绍，接下来要讲的集合类型，就会详细地为你演示如何使用 for range 遍历集合，记得来听课！</p><hr><p><strong>《Java <strong><strong>工程师高薪训练营</strong></strong>》</strong></p><p>拉勾背书内推+硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。<a href="https://kaiwu.lagou.com/java_architect.html?utm_source=lagouedu&amp;utm_medium=zhuanlan&amp;utm_campaign=Java%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5" target="_blank" rel="noreferrer">点击链接，快来领取！</a></p><p><strong>《Java 就业集训营》</strong></p><p>零基础 180 天高薪就业，<a href="https://kaiwu.lagou.com/java_basic.html?utm_source=zhuanlan%20article&amp;utm_medium=bottom&amp;utm_campaign=Go%E8%AF%AD%E8%A8%80%E4%B8%93%E6%A0%8F#/index" target="_blank" rel="noreferrer">点击链接，快来领取！</a></p>`,67),t=[o];function e(c,r,E,y,i,F){return n(),a("div",null,t)}const h=s(p,[["render",e]]);export{g as __pageData,h as default};
