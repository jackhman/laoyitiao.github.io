import{_ as o,j as t,o as e,g as c,k as a,s,h as p,Q as l}from"./chunks/framework.4e7d56ce.js";const X=JSON.parse('{"title":"栈是什么 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学数据结构与算法_文档/(3343) 05  栈：后进先出的线性表，如何实现增删查？.md","filePath":"posts/backEnd/重学数据结构与算法_文档/(3343) 05  栈：后进先出的线性表，如何实现增删查？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/重学数据结构与算法_文档/(3343) 05  栈：后进先出的线性表，如何实现增删查？.md"},E=s("p",null,"通过前面课时的学习，相信你已经掌握了线性表的基本原理，以及如何完成线性表结构下的增删查操作。",-1),y=s("p",null,"线性表是使用非常广泛的一类数据结构，它对数据的顺序非常敏感，而且它对数据的增删操作非常灵活。在有序排列的数据中，可以灵活的执行增删操作，就好像是为排好队的数据增加了插队的入口。这既是灵活性也是缺陷，原因在于它的灵活性在某种程度上破坏了数据的原始顺序。在某些需要严格遵守数据处理顺序的场景下，我们就需要对线性表予以限制了。经过限制后的线性表，它们通常会被赋予一些新的名字。这一课时，我们就来学习其中一个限制后的线性表--栈。",-1),i=s("h3",{id:"栈是什么",tabindex:"-1"},[p("栈是什么 "),s("a",{class:"header-anchor",href:"#栈是什么","aria-label":'Permalink to "栈是什么"'},"​")],-1),F=s("p",null,"你需要牢记一点，栈是一种特殊的线性表。栈与线性表的不同，体现在增和删的操作。具体而言，栈的数据结点必须后进先出。后进的意思是，栈的数据新增操作只能在末端进行，不允许在栈的中间某个结点后新增数据。先出的意思是，栈的数据删除操作也只能在末端进行，不允许在栈的中间某个结点后删除数据。",-1),_=s("p",null,"也就是说，栈的数据新增和删除操作只能在这个线性表的表尾进行，即在线性表的基础上加了限制。如下图所示：",-1),h=s("p",null,"因此，栈是一种后进先出的线性表。栈对于数据的处理，就像用砖头盖房子的过程。对于盖房子而言，新的砖头只能放在前一个砖头上面；而对于拆房子而言，我们需要从上往下拆砖头。",-1),A=s("p",null,"宏观上来看，与数组或链表相比，栈的操作更为受限，那为什么我们要用这种受限的栈呢？其实，单纯从功能上讲，数组或者链表可以替代栈。然而问题是，数组或者链表的操作过于灵活，这意味着，它们过多暴露了可操作的接口。这些没有意义的接口过多，当数据量很大的时候就会出现一些隐藏的风险。一旦发生代码 bug 或者受到攻击，就会给系统带来不可预知的风险。虽然栈限定降低了操作的灵活性，但这也使得栈在处理只涉及一端新增和删除数据的问题时效率更高。",-1),u=s("p",null,"举个实际的例子，浏览器都有页面前进和后退功能，这就是个很典型的后进先出的场景。假设你先后访问了五个页面，分别标记为 1、2、3、4、5。当前你在页面 5，如果执行两次后退，则退回到了页面 3，如果再执行一次前进，则到了页面 4。处理这里的页面链接存储问题，栈就应该是我们首选的数据结构。",-1),d=s("p",null,"栈既然是线性表，那么它也包含了表头和表尾。不过在栈结构中，由于其操作的特殊性，会对表头和表尾的名字进行改造。表尾用来输入数据，通常也叫作栈顶（top）；相应地，表头就是栈底（bottom）。栈顶和栈底是用来表示这个栈的两个指针。跟线性表一样，栈也有顺序表示和链式表示，分别称作顺序栈和链栈。",-1),g=s("h3",{id:"栈的基本操作",tabindex:"-1"},[p("栈的基本操作 "),s("a",{class:"header-anchor",href:"#栈的基本操作","aria-label":'Permalink to "栈的基本操作"'},"​")],-1),C=s("p",null,"如何通过栈这个后进先出的线性表，来实现增删查呢？初始时，栈内没有数据，即空栈。此时栈顶就是栈底。当存入数据时，最先放入的数据会进入栈底。接着加入的数据都会放入到栈顶的位置。如果要删除数据，也只能通过访问栈顶的数据并删除。对于栈的新增操作，通常也叫作 push 或压栈。对于栈的删除操作，通常也叫作 pop 或出栈。对于压栈和出栈，我们分别基于顺序栈和链栈进行讨论。",-1),D=s("h4",{id:"顺序栈",tabindex:"-1"},[p("顺序栈 "),s("a",{class:"header-anchor",href:"#顺序栈","aria-label":'Permalink to "顺序栈"'},"​")],-1),m=s("p",null,"栈的顺序存储可以借助数组来实现。一般来说，会把数组的首元素存在栈底，最后一个元素放在栈顶。然后定义一个 top 指针来指示栈顶元素在数组中的位置。假设栈中只有一个数据元素，则 top = 0。一般以 top 是否为 -1 来判定是否为空栈。当定义了栈的最大容量为 StackSize 时，则栈顶 top 必须小于 StackSize。",-1),B=s("p",null,"当需要新增数据元素，即入栈操作时，就需要将新插入元素放在栈顶，并将栈顶指针增加 1。如下图所示：",-1),f=s("p",null,"删除数据元素，即出栈操作，只需要 top - 1 就可以了。",-1),k=s("p",null,"对于查找操作，栈没有额外的改变，跟线性表一样，它也需要遍历整个栈来完成基于某些条件的数值查找。",-1),q=s("h4",{id:"链栈",tabindex:"-1"},[p("链栈 "),s("a",{class:"header-anchor",href:"#链栈","aria-label":'Permalink to "链栈"'},"​")],-1),S=s("p",null,"关于链式栈，就是用链表的方式对栈的表示。通常，可以把栈顶放在单链表的头部，如下图所示。由于链栈的后进先出，原来的头指针就显得毫无作用了。因此，对于链栈来说，是不需要头指针的。相反，它需要增加指向栈顶的 top 指针，这是压栈和出栈操作的重要支持。",-1),b=s("p",null,"对于链栈，新增数据的压栈操作，与链表最后插入的新数据基本相同。需要额外处理的，就是栈的 top 指针。如下图所示，插入新的数据，则需要让新的结点指向原栈顶，即 top 指针指向的对象，再让 top 指针指向新的结点。",-1),v=s("p",null,"在链式栈中进行删除操作时，只能在栈顶进行操作。因此，将栈顶的 top 指针指向栈顶元素的 next 指针即可完成删除。对于链式栈来说，新增删除数据元素没有任何循环操作，其时间复杂度均为 O(1)。",-1),P=s("p",null,"对于查找操作，相对链表而言，链栈没有额外的改变，它也需要遍历整个栈来完成基于某些条件的数值查找。",-1),T=s("p",null,"通过分析你会发现，不管是顺序栈还是链栈，数据的新增、删除、查找与线性表的操作原理极为相似，时间复杂度完全一样，都依赖当前位置的指针来进行数据对象的操作。区别仅仅在于新增和删除的对象，只能是栈顶的数据结点。",-1),x=s("h3",{id:"栈的案例",tabindex:"-1"},[p("栈的案例 "),s("a",{class:"header-anchor",href:"#栈的案例","aria-label":'Permalink to "栈的案例"'},"​")],-1),U=s("p",null,"接下来，我们一起来看两个栈的经典案例，从中你可以更深切地体会到栈所发挥出的价值。",-1),M=s("p",null,"例 1，给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。有效字符串需满足：左括号必须与相同类型的右括号匹配，左括号必须以正确的顺序匹配。例如，{ [ ( ) ( ) ] } 是合法的，而 { ( [ ) ] } 是非法的。",-1),N=s("p",null,'这个问题很显然是栈发挥价值的地方。原因是，在匹配括号是否合法时，左括号是从左到右依次出现，而右括号则需要按照"后进先出"的顺序依次与左括号匹配。因此，实现方案就是通过栈的进出来完成。',-1),H=s("p",null,"具体为，从左到右顺序遍历字符串。当出现左括号时，压栈。当出现右括号时，出栈。并且判断当前右括号，和被出栈的左括号是否是互相匹配的一对。如果不是，则字符串非法。当遍历完成之后，如果栈为空。则合法。如下图所示：",-1),L=l(`<p>代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;{[()()]}&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isLegal</span><span style="color:#E1E4E8;">(s));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isLeft</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> c) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;(&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;[&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isPair</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> p, </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> curr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> curr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;}&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> (p </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;[&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> curr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;]&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> (p </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;(&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> curr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;)&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">isLegal</span><span style="color:#E1E4E8;">(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Stack stack </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stack</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> s.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> curr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isLeft</span><span style="color:#E1E4E8;">(curr) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(curr);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (stack.</span><span style="color:#B392F0;">empty</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;非法&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;">) stack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isPair</span><span style="color:#E1E4E8;">(p, curr) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;非法&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (stack.</span><span style="color:#B392F0;">empty</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;合法&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;非法&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] args) {</span></span>
<span class="line"><span style="color:#24292E;">    String s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;{[()()]}&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isLegal</span><span style="color:#24292E;">(s));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isLeft</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> c) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;(&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;[&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isPair</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> p, </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> curr) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> curr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;}&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> (p </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;[&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> curr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;]&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> (p </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;(&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> curr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;)&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">isLegal</span><span style="color:#24292E;">(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    Stack stack </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stack</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> s.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> curr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(i);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isLeft</span><span style="color:#24292E;">(curr) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(curr);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (stack.</span><span style="color:#6F42C1;">empty</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;非法&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">char</span><span style="color:#24292E;">) stack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isPair</span><span style="color:#24292E;">(p, curr) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;非法&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (stack.</span><span style="color:#6F42C1;">empty</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;合法&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;非法&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>例 2，浏览器的页面访问都包含了后退和前进功能，利用栈如何实现？</p><p>我们利用浏览器上网时，都会高频使用后退和前进的功能。比如，你按照顺序先后访问了 5 个页面，分别标记为 1、2、3、4、5。现在你不确定网页 5 是不是你要看的网页，需要回退到网页 3，则需要使用到两次后退的功能。假设回退后，你发现网页 4 有你需要的信息，那么就还需要再执行一次前进的操作。</p><p>为了支持前进、后退的功能，利用栈来记录用户历史访问网页的顺序信息是一个不错的选择。此时需要维护两个栈，分别用来支持后退和前进。当用户访问了一个新的页面，则对后退栈进行压栈操作。当用户后退了一个页面，则后退栈进行出栈，同时前进栈执行压栈。当用户前进了一个页面，则前进栈出栈，同时后退栈压栈。我们以用户按照 1、2、3、4、5、4、3、4 的浏览顺序为例，两个栈的数据存储过程，如下图所示：</p>`,5),V=l('<h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>好的，这节课的内容就到这里了。这一节的内容主要围绕栈的原理、栈对于数据的增删查操作展开。</p><p>栈继承了线性表的优点与不足，是个限制版的线性表。限制的功能是，只允许数据从栈顶进出，这也就是栈后进先出的性质。不管是顺序栈还是链式栈，它们对于数据的新增操作和删除操作的时间复杂度都是 O(1）。而在查找操作中，栈和线性表一样只能通过全局遍历的方式进行，也就是需要 O(n) 的时间复杂度。</p><p>栈具有后进先出的特性，当你面对的问题需要高频使用新增、删除操作，且新增和删除操作的数据执行顺序具备后来居上的相反关系时，栈就是个不错的选择。例如，浏览器的前进和后退，括号匹配等问题。栈在代码的编写中有着很广泛的应用，例如，大多数程序运行环境都有的子程序的调用，函数的递归调用等。这些问题都具有后进先出的特性。关于递归，我们会在后续的课程单独进行分析。</p><h3 id="练习题" tabindex="-1">练习题 <a class="header-anchor" href="#练习题" aria-label="Permalink to &quot;练习题&quot;">​</a></h3><p>下面我们给出本课时的练习题。在上一课时中，我们的习题是，给定一个包含 n 个元素的链表，现在要求每 k 个节点一组进行翻转，打印翻转后的链表结果。其中，k 是一个正整数，且 n 可被 k 整除。</p><p>例如，链表为 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5 -&gt; 6，k = 3，则打印 321654。仍然是这道题，我们试试用栈来解决它吧。</p><p>如果你在栈的使用方面遇到困难，欢迎在留言区和我交流。</p>',8);function I(O,J,j,Z,w,z){const n=t("Image");return e(),c("div",null,[E,y,i,F,_,a(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/16/03/CgqCHl7UyyiAOqRGAACdPSEyJAw292.png"}),h,a(n,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image/M00/16/03/CgqCHl7UyzCAZynsAA1ztbJtHZM075.gif"}),A,u,a(n,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image/M00/16/03/CgqCHl7Uy0KAVgCXAGp5lx2v7gs430.gif"}),d,g,C,a(n,{alt:"4.gif",src:"https://s0.lgstatic.com/i/image/M00/16/03/CgqCHl7Uy1mASD8_ABTJXLqysYw837.gif"}),D,m,B,a(n,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/16/04/CgqCHl7Uy2mAZIutAABpJkFDBhc178.png"}),f,k,q,S,a(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/16/04/CgqCHl7Uy3aANCZjAABKDxPgTUQ478.png"}),b,a(n,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/16/04/CgqCHl7Uy4iAUXORAACjOoEAXFA016.png"}),v,P,T,x,U,M,N,H,a(n,{alt:"8.gif",src:"https://s0.lgstatic.com/i/image/M00/15/F8/Ciqc1F7Uy5WAaANiAAslJ0QN4bc832.gif"}),L,a(n,{alt:"9.gif",src:"https://s0.lgstatic.com/i/image/M00/16/04/CgqCHl7Uy5-ANiGoABFtWM1_uZU348.gif"}),V])}const $=o(r,[["render",I]]);export{X as __pageData,$ as default};
