import{_ as l,j as t,o as e,h as c,k as o,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const S=JSON.parse('{"title":"16ReactHook的使用限制有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5806) 16  React Hook 的使用限制有哪些？.md","filePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5806) 16  React Hook 的使用限制有哪些？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/107-前端面试宝典之 React篇文档/(5806) 16  React Hook 的使用限制有哪些？.md"},E=p('<h1 id="_16reacthook的使用限制有哪些" tabindex="-1">16ReactHook的使用限制有哪些？ <a class="header-anchor" href="#_16reacthook的使用限制有哪些" aria-label="Permalink to &quot;16ReactHook的使用限制有哪些？&quot;">​</a></h1><p>由于 Hooks 书写方式更加简便，总体上提升了开发效率，所以在 React 面试中经常被问到，其中 Hooks 的使用限制就是不可避开的点，能把这个问题说明白，你不仅需要对知识点足够清楚，还需要有一定的答题技巧，这一讲，我们就来讲解&quot;React Hooks 的使用限制有哪些&quot;。</p><h3 id="破题" tabindex="-1">破题 <a class="header-anchor" href="#破题" aria-label="Permalink to &quot;破题&quot;">​</a></h3><p>React 在 2013 ~ 2018 年走过了它的第一个阶段。毋庸置疑，React 在这个阶段非常成功，为前端开发引入了丰富的概念，也启发了无数的开发者。React 团队作为前端前沿开发者，只是维持现状、修修补补并不能满足他们继续探索的诉求，在他们的构想中，React Hooks 是面向下一个五年的探索。</p><p>也正因为 Hooks 在 React 中备受关注的地位，所以成为面试中绕不开的点，最常见的问题就是它的使用限制有哪些？Hooks 的使用限制对于每一个有使用经验的开发者而言，肯定是非常清楚的。但你需要警惕，问题如果是 What，那么一定伴随着 Why 和 How。这也是面试中常见的 3W 套路：先问你是什么，再问为什么，最后是怎么处理。这同样是对应聘者思维模式的考察，看你是否具备工程化思维，也就是你只是 API 的搬运工，还是真的从工程架构的角度思考过，想过完备的方案。</p><p>&quot;是什么&quot;很好解释，列举一二三即可。但在讲&quot;为什么&quot;的时候就需要一个完整的思路。在第02 讲提到，我们需要理解 React 开发团队在设计相关功能时，它的目标与初衷是什么，希望解决什么问题，为什么选用这种方案，以及该方案的弊端，或者说限制，这些就是我们的&quot;为什么&quot;。做工程是一个不断妥协的过程，永远不可能有一个完美无缺的设计。现实生活中的工程设计更像断臂维纳斯，既有遗憾也有缺陷，这就形成了<strong>妥协点</strong>。但妥协点就是我们的答题点。最后的&quot;How&quot;就需要我们回答在妥协点不能被解决的情况下，如何有效率地规避它、绕开它。</p><h3 id="审题" tabindex="-1">审题 <a class="header-anchor" href="#审题" aria-label="Permalink to &quot;审题&quot;">​</a></h3><p>经过上面的思考，再系统化地整理思路，就能得到一个完整的答题框架了。</p><ul><li><p>是什么：列举使用限制有哪些。</p></li><li><p>为什么：围绕三个点论述，分别是 Hooks 的设计初衷、要解决的问题、设计的方案原理。</p></li><li><p>怎么做：讲述如何规避使用限制会引起的问题。</p></li></ul>',9),y=p(`<h3 id="入手" tabindex="-1">入手 <a class="header-anchor" href="#入手" aria-label="Permalink to &quot;入手&quot;">​</a></h3><p>虽然答题的思路是 What → Why → How，但为了方便理解，我们还是从 Hooks 的设计初衷说起。</p><h4 id="初衷与问题" tabindex="-1">初衷与问题 <a class="header-anchor" href="#初衷与问题" aria-label="Permalink to &quot;初衷与问题&quot;">​</a></h4><p>正如开篇所说，React 发展的第五个年头，也正是寻找下一个方向的时候。其实早在 2016 年，React 团队就开启了个叫 <a href="https://github.com/reactjs/react-future" target="_blank" rel="noreferrer">React Future</a> 的项目，试图探索未来的方向，里面提到了一个概念叫<strong>Stateful Functions</strong>。Stateful Functions 的目的就是通过引入 state 拓宽函数组件的使用边界，但这个方案最终没有成功落地。回到今天来看，React 团队以另外一个方式给出了答案------Hooks。React 团队给的第一个 Hooks 使用案例，也是在函数组件中使用 state，使用状态管理。那为什么要这样做呢？</p><p>React 团队在过去编写和维护数以万计组件的五年时间里，他们遇到了这些问题。</p><p>（1）<strong>组件之间难以复用状态逻辑</strong></p><p>是什么意思呢？在第 05 讲中提到高阶组件复用逻辑时，给了一个检查登录的案例，在这个案例中就只做了一件事，那就是把<strong>登录判断逻辑抽取出来</strong> ，放置到 checkLogin 组件中。组件之间的状态逻辑就通过这样一个高阶组件共享出来了。如果涉及的场景更为复杂，多级组件需要共享状态，就需要使用 Redux 或者 Mobx 来解决了。这是每一个 React 开发者都会遇到的问题，所以最好考虑<strong>从 React 层提供 API</strong>来解决。如下代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> isLogin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!!</span><span style="color:#E1E4E8;">localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;token&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> checkLogin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (WrappedComponent) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (props) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isLogin</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">WrappedComponent {...props} </span><span style="color:#F97583;">/&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">LoginPage </span><span style="color:#F97583;">/&gt;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> isLogin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!!</span><span style="color:#24292E;">localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;token&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> checkLogin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (WrappedComponent) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (props) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isLogin</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">WrappedComponent {...props} </span><span style="color:#D73A49;">/&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">LoginPage </span><span style="color:#D73A49;">/&gt;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>（2）<strong>复杂的组件变得难以理解</strong></p><p>这一条主要指出生命周期函数没能提供最佳的代码编程实践范式。这点相对来说更好理解一些，比如 componentDidMount，在下面的案例中变成了一个大杂烩，我们在这里设置页面标题、订阅聊天状态信息、拉取用户信息、拉取按钮权限信息，ComponentDidMount 函数内部逻辑随意堆砌，内容杂乱，缺乏专注性，往往还会对上下文产生依赖。如果你在 componentDidMount 使用 ChatAPI.subscribe，那么你就需要在 componentWillUnmount 中去 unsubscribe 它。</p><p>订阅与取消订阅并没有直接关联在一起，而是通过生命周期函数去使用，这非常的反模式，也就导致组件难以分解，且到处都是状态逻辑。当然，之前提到过的状态管理框架可以解决类似问题，但它也是有成本的。还是第一条中的那句话&quot;既然是每个人都会遇到的问题，那就应该考虑从 React 层提供 API 来解决&quot;。如下代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Example</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React.Component</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentDidMount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置页面标题</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> \`User Profile\`;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 订阅聊天状态信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    ChatAPI.</span><span style="color:#B392F0;">subscribeToFriendStatus</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.props.friend.id,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.handleStatusChange</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 拉取用户信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fetchUserProfile</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 拉取按钮权限信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fetchButtonAuthority</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentWillUnmount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 取消订阅</span></span>
<span class="line"><span style="color:#E1E4E8;">    ChatAPI.</span><span style="color:#B392F0;">unsubscribeFromFriendStatus</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.props.friend.id,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.handleStatusChange</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Example</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React.Component</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentDidMount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置页面标题</span></span>
<span class="line"><span style="color:#24292E;">    document.title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> \`User Profile\`;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 订阅聊天状态信息</span></span>
<span class="line"><span style="color:#24292E;">    ChatAPI.</span><span style="color:#6F42C1;">subscribeToFriendStatus</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.props.friend.id,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.handleStatusChange</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 拉取用户信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fetchUserProfile</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 拉取按钮权限信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fetchButtonAuthority</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentWillUnmount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 取消订阅</span></span>
<span class="line"><span style="color:#24292E;">    ChatAPI.</span><span style="color:#6F42C1;">unsubscribeFromFriendStatus</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.props.friend.id,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.handleStatusChange</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>（3）<strong>人和机器都容易混淆类</strong></p><p>类容易令初学者，甚至熟手犯错，还会给机器造成困扰：</p><ul><li><p>this 首当其冲，对于这个问题的经典案例就是第 04 讲中提到的<strong>值捕获</strong>，这里就不再赘述了；</p></li><li><p>还有一个与 this 相关的问题就是用 bind 函数包一下来绑定事件。虽然现在我们都通过了类属性的方案，也可以使用 Babel 插件提前开发了，但整个提案仍然是草案的阶段，还不稳定；</p></li><li><p>最后一个问题是在类中难以做编译优化，React 团队一直在做前端编译层的优化工作，比如常数折叠（constant folding）、内联展开（inline expansion）及死码删除（Dead code elimination）等。</p></li></ul><p>不光人难以优化类，机器也难。这也就导致下一步探索工作难以有新的进展。所以基于以上的原因，选择以函数组件为基础进行设计。</p><h4 id="方案原理" tabindex="-1">方案原理 <a class="header-anchor" href="#方案原理" aria-label="Permalink to &quot;方案原理&quot;">​</a></h4><p>不妨看一看 Hooks 最终用起来的样子。通过在函数中调用 useState 会返回当前状态与更新状态的函数。就像下面的案例一样，count 的初始值是 0，然后，通过 useState 赋值初始值，然后获取当前状态 count 与函数 setCount。那么在点击按钮时调用 setCount，修改 count 的值。本质上 state hook 替代了类组件中 setState 的作用。如下代码所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useState } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Example</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 声明一个新的状态变量，我们将其称为 &quot;count&quot; </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">count</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setCount</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;You clicked {count} times&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCount</span><span style="color:#E1E4E8;">(count </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)}&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Click me</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useState } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Example</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 声明一个新的状态变量，我们将其称为 &quot;count&quot; </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">count</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setCount</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;You clicked {count} times&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCount</span><span style="color:#24292E;">(count </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)}&gt;</span></span>
<span class="line"><span style="color:#24292E;">        Click me</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这种写法颇有奇妙感。Rudi Yardley 在 2018 年的时候写过一篇 《React hooks: not magic, just arrays》详细地阐释了它的设计原理，并通过一个案例来说明。在案例中 RenderFunctionComponent 组件有两个 useState，分别用于修改 firstName 与 lastName。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RenderFunctionComponent</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">firstName</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setFirstName</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Rudi&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">lastName</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setLastName</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Yardley&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ( &lt;</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setFirstName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Fred&quot;</span><span style="color:#E1E4E8;">)}&gt;Fred&lt;/</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;">&gt; ); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RenderFunctionComponent</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">firstName</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setFirstName</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Rudi&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">lastName</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setLastName</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Yardley&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ( &lt;</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setFirstName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Fred&quot;</span><span style="color:#24292E;">)}&gt;Fred&lt;/</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;">&gt; ); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当初次渲染时，就会有两对 state 与 setter 被放入数组中，其中第 0 个就是 FirstName 那组，第 1 个就是 LastName 那组。如下图所示：</p>`,22),i=p('<p>那么在后续渲染中，也会保持这样一个规律获取对应的组。那这里就会产生一个问题：如果在 if 条件中调用 useState 会怎样呢？就会造成数组的取值错位，所以不能在 React 的循环、条件或嵌套函数中调用 Hook。</p><p>这里我们用数组来简化描述，实质上 React 源码的实现是采用的<strong>链表</strong>。在整体设计结构上你会发现 Hooks 的设计是贴近函数组件的，那么在类组件方面，为了未来的优化探索，Hooks 直接选择了不支持，但 React 并没有禁止两者混用，甚至鼓励两者混用。React 团队并不希望我们使用 Hooks 重写以前的类组件，那没有什么意义，而是希望在未来 Hooks 变成主流的开发方式。</p><p>从以上的分析中，我们可以得出两条使用限制：</p><ul><li><p>不要在循环、条件或嵌套函数中调用 Hook；</p></li><li><p>在 React 的函数组件中调用 Hook。</p></li></ul><p>那我们应该如何合理处理它们呢？</p><h4 id="防范措施" tabindex="-1">防范措施 <a class="header-anchor" href="#防范措施" aria-label="Permalink to &quot;防范措施&quot;">​</a></h4><p>因为 React 的内在设计原理，所以我们不可能绕过限制规则，但可以在代码中禁止错误的使用方式。如何防范就很有意思了，我不止一次在面试中提问如何防范错误的使用方式，大部分应聘者都是讲自己遇到的错误经历，或者讲加强 Code Review，加强人工检查，但是用这样的方式进行检查效率会很低。</p><p>在前面的章节中，反复强调，工程化的东西最终应该落地到工具上，其实只需要在 ESLint 中引入 eslint-plugin-react-hooks 完成自动化检查就可以了。在处理代码编写方式的问题时，都应该优先想到从 Lint 工具入手。</p><h3 id="答题" tabindex="-1">答题 <a class="header-anchor" href="#答题" aria-label="Permalink to &quot;答题&quot;">​</a></h3><blockquote><p>React Hooks 的限制主要有两条：</p><ol><li><p>不要在循环、条件或嵌套函数中调用 Hook；</p></li><li><p>在 React 的函数组件中调用 Hook。</p></li></ol><p>那为什么会有这样的限制呢？就得从 Hooks 的设计说起。Hooks 的设计初衷是为了改进 React 组件的开发模式。在旧有的开发模式下遇到了三个问题。</p><p>组件之间难以复用状态逻辑。过去常见的解决方案是高阶组件、render props 及状态管理框架。</p><p>复杂的组件变得难以理解。生命周期函数与业务逻辑耦合太深，导致关联部分难以拆分。</p><p>人和机器都很容易混淆类。常见的有 this 的问题，但在 React 团队中还有类难以优化的问题，他们希望在编译优化层面做出一些改进。</p><p>这三个问题在一定程度上阻碍了 React 的后续发展，所以为了解决这三个问题，Hooks 基于函数组件开始设计。然而第三个问题决定了 Hooks 只支持函数组件。</p><p>那为什么不要在循环、条件或嵌套函数中调用 Hook 呢？因为 Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是链表。</p><p>这些限制会在编码上造成一定程度的心智负担，新手可能会写错，为了避免这样的情况，可以引入 ESLint 的 Hooks 检查插件进行预防。</p></blockquote>',10),u=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"本讲从 React Hooks 的使用限制出发，不仅讨论了它的基本原理，还探讨了 React 团队的后续规划与设计理想，你可以感受到 React 团队满满的创造力。他们今年也没闲着，在 2020 年圣诞节还提出了 React Server Components 的草案。我只想说一句，真的学不动了。",-1),h=s("p",null,"那么在本讲的内容基础上，我提出一个问题，就是 Hooks 是如何关联对应组件的？你可以尝试自己找一下答案，欢迎在评论区中和我一起交流。",-1),F=s("p",null,"在下一讲，我将介绍 React 中两个容易混淆的 API，到时见。",-1),g=s("hr",null,null,-1),C=s("p",null,"[",-1),m=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),n(")")],-1),_=s("p",null,"《大前端高薪训练营》",-1),k=s("p",null,[n("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),n("，快来领取！")],-1);function A(D,R,b,f,B,q){const a=t("Image");return e(),c("div",null,[E,o(a,{alt:"React Hooks 使用限制.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8E/Cip5yGAFRPOAeuOVAABxuxywIJg368.png"}),n(),y,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8D/FC/CgqCHmABPPiAG3BtAAE77HQGy1U017.png"}),n(),i,o(a,{alt:"React Hooks 使用限制总.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8E/Cip5yGAFRQKANoZGAAGHTWta8TA980.png"}),n(),u,d,h,F,g,C,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/72/94/Ciqc1F_EZ0eANc6tAASyC72ZqWw643.png"}),n(),m,_,k])}const v=l(r,[["render",A]]);export{S as __pageData,v as default};
