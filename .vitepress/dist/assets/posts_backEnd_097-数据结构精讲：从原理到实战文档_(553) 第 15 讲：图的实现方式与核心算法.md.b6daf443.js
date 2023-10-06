import{_ as p,j as t,o,g as c,k as a,Q as e,s,h as l}from"./chunks/framework.b3d8e22e.js";const M=JSON.parse('{"title":"图的实现方式 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(553) 第 15 讲：图的实现方式与核心算法.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(553) 第 15 讲：图的实现方式与核心算法.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(553) 第 15 讲：图的实现方式与核心算法.md"},i=e('<br><p>在上一讲中我们学习了图的基本概念，以及图是如何在 Spark 这样的大数据框架中大展身手的，不过核心内容是有向无环图（DAG）的应用。你一定想知道 Spark 建立了 DAG 之后又如何执行数据处理的呢？这一课时我来为你揭晓。</p><h3 id="图的实现方式" tabindex="-1"><strong>图的实现方式</strong> <a class="header-anchor" href="#图的实现方式" aria-label="Permalink to &quot;**图的实现方式**&quot;">​</a></h3><p>我们先回顾一下之前讲解的两种图的实现方式，一种是邻接矩阵法，另一种是邻接链表法。这两种实现方式将会影响到我们后面算法的应用。</p><br><p>使用<strong>邻接矩阵法</strong>的基本思想是开一个超大的数组，用数组中间元素的 true/false 来表达边，有 V 个节点的图，需要一个 V × V 大小的数组。下面这个例子中有 V0 ~ V4 总共 5 个节点，可以看到我们已经画出了一个 5 × 5 的二维数组 G。如果有从 Vi 指向 Vj 的边，那么 G[i][j] = true，反之如果没有边，则 G[i][j] = false。</p><br><p>有 V4 指向 V2 的边，那么 G[4][2] = true。V0 和 V2 之间的边是无向的，也就是说我们需要 G[0][2] = true 同时 G[2][0] = true。再看到 V3 有指向自己的边，所以 G[3][3] 也是 true。</p><br>',9),E=s("br",null,null,-1),d=s("p",null,[s("strong",null,"邻接链表法"),l("的核心思想是把每一个节点所指向的点给存储起来。比如还是上面的例子，如果我们用邻接链表法表达的话，则需要一个含 5 个元素的数组，用来存储这样的 5 个节点，然后每个节点所指向的点都会维护在一个链表中。比如，V0 指向了 V1、V4、V2 三个节点，那在内存中就会有从 0 指向 1 接着指向 2、指向 4 这样的一个链表。同理我们看到 V4 指向了 V0 和 V2，在内存中就要维护一个 4→0→2 的单向链表。")],-1),h=s("br",null,null,-1),_=s("h3",{id:"图的拓扑排序",tabindex:"-1"},[s("strong",null,"图的拓扑排序"),l(),s("a",{class:"header-anchor",href:"#图的拓扑排序","aria-label":'Permalink to "**图的拓扑排序**"'},"​")],-1),g=s("p",null,[l("什么是拓扑排序呢？"),s("strong",null,"拓扑排序"),l("指的是对于一个有向无环图来说，排序所有的节点，使得对于从节点 u 到节点 v 的每个有向边 uv，u 在排序中都在 v 之前。拿我们之前讲过的西红柿炒鸡蛋这个例子来说吧。")],-1),u=s("br",null,null,-1),y=s("br",null,null,-1),m=s("p",null,"一个合法的拓扑排序，必须使得被依赖的任务首先完成。在我们西红柿炒鸡蛋这个菜的加工过程中，要保证打鸡蛋在炒鸡蛋之前，买番茄在洗番茄之前，因为炒鸡蛋依赖于打鸡蛋，在我们的图中有打鸡蛋指向炒鸡蛋的边。",-1),v=s("p",null,[l("所以说一个"),s("strong",null,"合理的拓扑排序是能够保证有依赖关系的任务能够被合理完成"),l(" 。不如你思考一下为什么拓扑排序只适用于有向无环图呢？")],-1),b=s("p",null,'我们来看一个经典的例子，那就是"鸡生蛋、蛋生鸡"。',-1),f=s("br",null,null,-1),A=s("p",null,"先有鸡还是先有蛋 （Chicken Egg Dilemma）就是一个无法被拓扑排序的有环图，因为鸡依赖于蛋，蛋又依赖于鸡，你无法把鸡排在蛋前面，也不能把蛋排在鸡的前面。",-1),V=s("br",null,null,-1),k=s("br",null,null,-1),S=s("p",null,'再来看一个经典的可以被拓扑排序的例子。我们常说："等我有钱要去干嘛干嘛。"这里面隐含的一个有向无环图就是钱指向了你想做的事情，那么我们就很容易的得出一个合理的拓扑排序，要把钱排在你想做的事情之前。',-1),C=s("h3",{id:"拓扑排序的实现方式",tabindex:"-1"},[s("strong",null,"拓扑排序的实现方式"),l(),s("a",{class:"header-anchor",href:"#拓扑排序的实现方式","aria-label":'Permalink to "**拓扑排序的实现方式**"'},"​")],-1),T=s("p",null,"首先我们来看看两个简单的概念，图的入度和出度。一个有向图的入度指的是终止于一个节点的边的数量；有向图的出度指的是始于一个节点的边的数量。以下图为例：",-1),x=s("br",null,null,-1),P=e(`<br><p>节点 A 的入度为 2，节点 B 的入度则为 0；而节点 B 的出度为 2，节点 D 的出度则为 0。</p><br><p>卡恩算法是卡恩于 1962 年提出的算法，它其实是贪婪算法的一种形式。简单来说就是，假设 L 是存放结果的列表，我们先找到那些入度为零的节点，把这些节点放到 L 中，因为这些节点没有任何的父节点；然后把与这些节点相连的边从图中去掉，再寻找图中入度为零的节点。对于新找到的这些入度为零的节点来说，他们的父节点都已经在 L 中了，所以也可以放入 L。</p><br><p>重复上述操作，直到找不到入度为零的节点。如果此时 L 中的元素个数和节点总数相同，则说明排序完成；如果 L 中的元素个数和节点总数不同，则说明原图中存在环，无法进行拓扑排序。下面我们来看看这个算法的伪代码：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">L ← Empty list that will contain the sorted elements</span></span>
<span class="line"><span style="color:#E1E4E8;">S ← Set of all nodes with no incoming edge</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">while S is non-empty do</span></span>
<span class="line"><span style="color:#E1E4E8;">    remove a node n from S</span></span>
<span class="line"><span style="color:#E1E4E8;">    add n to tail of L</span></span>
<span class="line"><span style="color:#E1E4E8;">    for each node m with an edge e from n to m do</span></span>
<span class="line"><span style="color:#E1E4E8;">        remove edge e from the graph</span></span>
<span class="line"><span style="color:#E1E4E8;">        if m has no other incoming edges then</span></span>
<span class="line"><span style="color:#E1E4E8;">            insert m into S</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">if graph has edges then</span></span>
<span class="line"><span style="color:#E1E4E8;">    return error   (graph has at least one cycle)</span></span>
<span class="line"><span style="color:#E1E4E8;">else </span></span>
<span class="line"><span style="color:#E1E4E8;">    return L   (a topologically sorted order</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">L ← Empty list that will contain the sorted elements</span></span>
<span class="line"><span style="color:#24292E;">S ← Set of all nodes with no incoming edge</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">while S is non-empty do</span></span>
<span class="line"><span style="color:#24292E;">    remove a node n from S</span></span>
<span class="line"><span style="color:#24292E;">    add n to tail of L</span></span>
<span class="line"><span style="color:#24292E;">    for each node m with an edge e from n to m do</span></span>
<span class="line"><span style="color:#24292E;">        remove edge e from the graph</span></span>
<span class="line"><span style="color:#24292E;">        if m has no other incoming edges then</span></span>
<span class="line"><span style="color:#24292E;">            insert m into S</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">if graph has edges then</span></span>
<span class="line"><span style="color:#24292E;">    return error   (graph has at least one cycle)</span></span>
<span class="line"><span style="color:#24292E;">else </span></span>
<span class="line"><span style="color:#24292E;">    return L   (a topologically sorted order</span></span></code></pre></div><br><p>怎么样？学到这里你就掌握了 Spark 运算引擎的核心，即拓扑排序。一旦 Spark 确立好了大数据处理的有向无环图，它就会对数据处理步骤进行拓扑排序，找到合理的处理顺序。</p><h3 id="图的最短路径" tabindex="-1"><strong>图的最短路径</strong> <a class="header-anchor" href="#图的最短路径" aria-label="Permalink to &quot;**图的最短路径**&quot;">​</a></h3><p>图的最短路径也是非常常见的图的应用，最短路径顾名思义就是在一个有权重的图中，找到两个点之间权重之和最短的路径。</p><br><p>举例来说下，图中所有节点都是不同的城市，每一条边都是连接城市之间的道路距离。比如 1 号节点是武汉，那么我们想要快速地把医疗物资送到武汉的话，就需要找到通向武汉最短的路线。</p><br>`,15),D=e(`<br><p>假如我们有一大批口罩在 5 号城市，想要送往武汉的话可以选择走 5-2-1 这条路线，或者 5-3-1 这条路线，甚至 5-2-3-1 等很多路线。在这个例子中我们很容易发现，5-2-1 这条路线的总距离是 20 + 9 = 29，5-3-1 这条路线的总距离是 12+15 = 27，可见我们应该选择 5-3-1 这个路线。</p><p>我们怎样让计算机找到最短路径呢？这便是大名鼎鼎的 Dijkstra 算法。</p><br><p>最经典的 Dijkstra 算法原始版本仅适用于找到两个固定节点之间的最短路径，后来更常见的变体固定了一个节点作为源节点，然后找到该节点到图中所有其他节点的最短路径，从而产生一个最短路径树。我们这一讲会重点讲解最经典的也就是真正业界应用最多的场景，即两个节点都固定。</p><br><p>这个算法是通过为每个节点 v 保留当前为止所找到的从 s 到 v 的最短路径来工作的。在初始时，原点 s 的路径权重被赋为 0（即原点的实际最短路径 = 0），同时把所有其他节点的路径长度设为无穷大，即表示我们不知道任何通向这些节点的路径。当算法结束时，d[v] 中存储的便是从 s 到 v 的最短路径，或者如果路径不存在的话，则是无穷大。</p><br><p>伪代码如下所示：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> function Dijkstra(Graph, source):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      create vertex set Q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      for each vertex v in Graph:             </span></span>
<span class="line"><span style="color:#E1E4E8;">          dist[v] ← INFINITY                  </span></span>
<span class="line"><span style="color:#E1E4E8;">          prev[v] ← UNDEFINED                 </span></span>
<span class="line"><span style="color:#E1E4E8;">          add v to Q                      </span></span>
<span class="line"><span style="color:#E1E4E8;">      dist[source] ← 0                        </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">      while Q is not empty:</span></span>
<span class="line"><span style="color:#E1E4E8;">          u ← vertex in Q with min dist[u]    </span></span>
<span class="line"><span style="color:#E1E4E8;">                                              </span></span>
<span class="line"><span style="color:#E1E4E8;">          remove u from Q </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#E1E4E8;">          for each neighbor v of u:           // only v that are still in Q</span></span>
<span class="line"><span style="color:#E1E4E8;">              alt ← dist[u] + length(u, v)</span></span>
<span class="line"><span style="color:#E1E4E8;">              if alt </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> dist[v]:               </span></span>
<span class="line"><span style="color:#E1E4E8;">                  dist[v] ← alt </span></span>
<span class="line"><span style="color:#E1E4E8;">                  prev[v] ← u </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      return dist[], prev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> function Dijkstra(Graph, source):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      create vertex set Q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      for each vertex v in Graph:             </span></span>
<span class="line"><span style="color:#24292E;">          dist[v] ← INFINITY                  </span></span>
<span class="line"><span style="color:#24292E;">          prev[v] ← UNDEFINED                 </span></span>
<span class="line"><span style="color:#24292E;">          add v to Q                      </span></span>
<span class="line"><span style="color:#24292E;">      dist[source] ← 0                        </span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">      while Q is not empty:</span></span>
<span class="line"><span style="color:#24292E;">          u ← vertex in Q with min dist[u]    </span></span>
<span class="line"><span style="color:#24292E;">                                              </span></span>
<span class="line"><span style="color:#24292E;">          remove u from Q </span></span>
<span class="line"><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#24292E;">          for each neighbor v of u:           // only v that are still in Q</span></span>
<span class="line"><span style="color:#24292E;">              alt ← dist[u] + length(u, v)</span></span>
<span class="line"><span style="color:#24292E;">              if alt </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> dist[v]:               </span></span>
<span class="line"><span style="color:#24292E;">                  dist[v] ← alt </span></span>
<span class="line"><span style="color:#24292E;">                  prev[v] ← u </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      return dist[], prev</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一课时我们学习了两种图在应用中最重要的算法，先是图的拓扑排序，揭开了 Spark 最核心的机密算法，之后是图的最短路径算法，将会在下一讲中应用到。</p>`,13);function I(B,q,N,Q,G,L){const n=t("Image");return o(),c("div",null,[i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhMCAeUfMAAGzC982uo4755.png"}),E,d,h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhP6AOqjUAAJeI18cJBs969.png"}),_,g,u,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhRiASCvUAAEg6MYD32c725.png"}),y,m,v,b,f,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhTaATFu_AADm09R0Qrs108.png"}),A,V,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhVmABMV-AACqQHeznac129.png"}),k,S,C,T,x,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhXqAHIPnAAFlOiiY74g976.png"}),P,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BB/Cgq2xl5PhcKAUl9LAAF9nDbbVCQ658.png"}),D])}const j=p(r,[["render",I]]);export{M as __pageData,j as default};
