import{_ as e,j as p,o as l,g as t,k as a,Q as n,s as o}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"基本概念 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(332) 第15讲：栈与队列及考题剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(332) 第15讲：栈与队列及考题剖析.md","lastUpdated":1696417798000}'),c={name:"posts/devops/110-测试开发核心技术文档/(332) 第15讲：栈与队列及考题剖析.md"},d=n(`<p>本课时我们主要讲解堆栈与队列，并针对面试中的考题进行剖析。</p><h2 id="基本概念" tabindex="-1">基本概念 <a class="header-anchor" href="#基本概念" aria-label="Permalink to &quot;基本概念&quot;">​</a></h2><p>首先，我们来看下堆栈与队列的基本概念，在编程语言中经常会提到两个术语，一个叫堆栈，另一个叫队列。其中堆栈是指一种后进先出的数据结构，比如 Java、Python 等编程语言底层大量使用了堆栈来存储函数调用时的内部局部变量，包括参数、返回值等，而在我们的面试中提到堆栈时大部分情况下单独指栈。</p><br><p>对于队列而言，它是一种先进先出的数据结构，可以在尾部追加数据并在头部获取数据，通常涉及生产者与消费者这两种使用场景，并大量应用于大数据的传输和处理。</p><br><p>而堆栈在编程语言中还涉及两个非常重要的概念，栈区与堆区。</p><br><p>关于栈区和堆区，我们需要能够区分开，首先在编程语言中栈区是用来存储函数调用时函数的局部变量和参数的，而函数的调用也是基于栈实现的，我们每进入一层新的子函数就会压栈，当函数调用完就会把返回值弹栈。</p><br><p>而对于堆而言，在 Java 中使用也比较多，常用于存储用户动态申请的内存，通常情况下是由虚拟机来管理这块内存的，堆是基于链表实现的。</p><br><p>所以，当我们平时提到的堆栈、堆区、栈区、队列这四个概念时是需要区分开的，它们是不同的数据结构，基于不同的使用场景；而当我们做算法题时，此时的堆栈一般特指栈。</p><h2 id="定义栈" tabindex="-1">定义栈 <a class="header-anchor" href="#定义栈" aria-label="Permalink to &quot;定义栈&quot;">​</a></h2><p>通过前面的讲解我们知道，栈本身是后进先出用来存储数据的，并且可以进行压栈和弹栈操作，即通过 push 操作压栈，通过 pop 操作弹栈。</p><br><p>那么栈具体是怎么实现的呢？我们接下来通过代码演示栈的实现，首先创建一个 test_struct 测试文件，创建完测试文件后创建一个数据结构来模拟栈的压栈/弹栈操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Stack</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self._data = [] </span></span>
<span class="line"><span style="color:#E1E4E8;">    def push(self,item):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self._data.append(item)</span></span>
<span class="line"><span style="color:#E1E4E8;">    def pop(slef):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return self._data.pop()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Stack</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self):</span></span>
<span class="line"><span style="color:#24292E;">        self._data = [] </span></span>
<span class="line"><span style="color:#24292E;">    def push(self,item):</span></span>
<span class="line"><span style="color:#24292E;">        self._data.append(item)</span></span>
<span class="line"><span style="color:#24292E;">    def pop(slef):</span></span>
<span class="line"><span style="color:#24292E;">        return self._data.pop()</span></span></code></pre></div><p>我们创建一个 Stack 类来模拟栈，需要先定义一个列表数据用于数据传输，这里以 _ 开头表示该数据不被外界访问，然后通过 push 完成压栈操作，并使用 append() 方法从栈的尾部追加数据，然后通过 pop 操作弹栈，并最终通过 return self.data.pop() 从栈尾弹出数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestStack:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def setup(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.stack = Stack()</span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_demo(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.stack.push(3)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.stack.push(2)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.stack.push(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">        assert self.stack.pop() == 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        assert self.stack.pop() == 2</span></span>
<span class="line"><span style="color:#E1E4E8;">        assert self.stack.pop() == 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestStack:</span></span>
<span class="line"><span style="color:#24292E;">    def setup(self):</span></span>
<span class="line"><span style="color:#24292E;">        self.stack = Stack()</span></span>
<span class="line"><span style="color:#24292E;">    def test_demo(self):</span></span>
<span class="line"><span style="color:#24292E;">        self.stack.push(3)</span></span>
<span class="line"><span style="color:#24292E;">        self.stack.push(2)</span></span>
<span class="line"><span style="color:#24292E;">        self.stack.push(1)</span></span>
<span class="line"><span style="color:#24292E;">        assert self.stack.pop() == 1</span></span>
<span class="line"><span style="color:#24292E;">        assert self.stack.pop() == 2</span></span>
<span class="line"><span style="color:#24292E;">        assert self.stack.pop() == 3</span></span></code></pre></div><p>然后，我们添加一个 TsetStack 的测试用例来验证我们创建的到底是不是一个栈结构，在测试用例中首先定义一个栈，然后编写具体的测试方法，按照 3、2、1 的顺序将数据压栈，然后 assert 断言弹栈顺序是 1、2、3。为了演示方便这里不考虑对数据的保护及各种数据处理，只是简单看下堆栈是怎么实现的，然后执行 case，测试通过，后进的数据被先弹出。</p><br><p>接下来，我们来看一个关于堆栈的面试考题：</p><br><p><strong>给定一个字符串</strong></p><p><strong>{xxx[xxx{xxx}]xx{x[xxx]xxx{xxx}xx}x}</strong></p><p><strong>判断其中的 {}[]() 是否成对出现</strong></p><br><p>这是一道经典的大厂面试题，面试题中给定一个字符串，然后需要判断其中的某一些字符是否成对出现，这个复杂的字符串类似于 JSON 数据结构，数据是一层一层的，我们需要分析这些符号是不是成对出现，可以通过使用堆栈来解决问题。</p><br><p>我们首先压栈一个左括号，当什么时候检测到与之对应的右括号出现时弹栈，基于这样的解题思路我们来看下具体怎么实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_match(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    test_data=&quot;{xxxxx[dddddddd(xxxxx{ddddd}dfsfe)dfsefe]xxxx}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_match(self):</span></span>
<span class="line"><span style="color:#24292E;">    test_data=&quot;{xxxxx[dddddddd(xxxxx{ddddd}dfsfe)dfsefe]xxxx}&quot;</span></span></code></pre></div><p>首先，定义一个符合题目要求的测试数据。测试数据中包括小括号、花括号等组成的一串字符。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def match(self,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">    for c in data:</span></span>
<span class="line"><span style="color:#E1E4E8;">        if c in &quot;{[(&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">           self.stack.push(c)</span></span>
<span class="line"><span style="color:#E1E4E8;">        elif c in &quot;)]}&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">           self.stack.pop()</span></span>
<span class="line"><span style="color:#E1E4E8;">        return self.stack.get_size()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def match(self,data):</span></span>
<span class="line"><span style="color:#24292E;">    for c in data:</span></span>
<span class="line"><span style="color:#24292E;">        if c in &quot;{[(&quot;:</span></span>
<span class="line"><span style="color:#24292E;">           self.stack.push(c)</span></span>
<span class="line"><span style="color:#24292E;">        elif c in &quot;)]}&quot;:</span></span>
<span class="line"><span style="color:#24292E;">           self.stack.pop()</span></span>
<span class="line"><span style="color:#24292E;">        return self.stack.get_size()</span></span></code></pre></div><p>定义完数据之后，我们写一个 match 方法，在方法中传入 data，然后使用 for 循环对每一个字符进行判断是否属于左括号，如果属于左括号就进行压栈；然后通过 elif 判断 c 是否有对应的右括号 ，如果有对应的右括号就弹栈。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def get_size(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    return len(self._data)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def get_size(self):</span></span>
<span class="line"><span style="color:#24292E;">    return len(self._data)</span></span></code></pre></div><p>判断逻辑处理完我们看下栈里还有没有数据，这时我们在 Stack 类中添加一个 get_size方法来获取栈的长度并 return 栈的长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_match(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    test_data=&quot;{xxxxx[dddddddd(xxxxx{ddddd}dfsfe)dfsefe]xxxx}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.match(test_data) == True</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_match(self):</span></span>
<span class="line"><span style="color:#24292E;">    test_data=&quot;{xxxxx[dddddddd(xxxxx{ddddd}dfsfe)dfsefe]xxxx}&quot;</span></span>
<span class="line"><span style="color:#24292E;">    assert self.match(test_data) == True</span></span></code></pre></div><p>接下来，我们通过 assert 断言验证 self.match 方法，将数据传入，判断是否等于 True，运行 case 发现没有问题。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">test_data=&quot;{xxxx[ddddd]xxxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">assert self.match(test_data) == False</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">test_data=&quot;{xxxx[ddddd]xxxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">assert self.match(test_data) == False</span></span></code></pre></div><p>最后，我们故意写一个不符合题目要求的字符串验证下效果，给 test_data 重新赋值，然后再次返回 self.match，这时它应该等于 False，运行 case 发现也没有任何问题。这样就基于堆栈解答了刚才的面试问题。</p><h2 id="定义队列" tabindex="-1">定义队列 <a class="header-anchor" href="#定义队列" aria-label="Permalink to &quot;定义队列&quot;">​</a></h2><p>我们再来看下如何定义一个队列，队列的数据结构其实和栈是非常类似的，你需要模拟一个先进先出的数据结构，通常情况下需要在队列尾部追加数据，然后在队列头部弹出数据。</p><br><p>我们在前面的学习中曾经使用 deque 结构来模拟队列，在这里你也可以使用一个类来模拟队列的整个逻辑，好在系统默认给我们提供了可以直接使用的队列数据结构，你只需要知道它是怎么实现的就可以了，这里不再做过多的介绍，只是演示下系统的队列是怎么来的，我们创建一个新的文件叫作 test_queue，然后定义 test_queue 方法，在方法中输入 queue.</p>`,45),i=o("p",null,"你可以看到系统联想出队列的各种处理方式，包括简单的 queue，后进先出的 queue，以及各种 queue 的处理逻辑，在这里我们直接使用 Queue 来演示。",-1),r=n(`<p>你可以进入 Queue 的源码看下具体是怎么实现的，它首先通过一个 maxsize 方法检测运行队列的长度，然后底层通过 deque 对数据进行 put、get 等各种处理，最后通过 popleft 将数据弹出，了解了底层的实现逻辑，你也可以自己去实现一个队列。当然，系统给我们提供的队列逻辑是非常全面的，也是线程安全的。在日常工作中你可以直接使用。</p><br><p>然后回到我们自己的代码中，我们使用列表来实现 deque 的功能。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Queue</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        #todo:deque()</span></span>
<span class="line"><span style="color:#E1E4E8;">        slef._data=[]</span></span>
<span class="line"><span style="color:#E1E4E8;">    def put(self,item):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self._data.append()</span></span>
<span class="line"><span style="color:#E1E4E8;">    def get(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        result=self._data[0]</span></span>
<span class="line"><span style="color:#E1E4E8;">        self._data.remove(result)</span></span>
<span class="line"><span style="color:#E1E4E8;">        return result</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Queue</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self):</span></span>
<span class="line"><span style="color:#24292E;">        #todo:deque()</span></span>
<span class="line"><span style="color:#24292E;">        slef._data=[]</span></span>
<span class="line"><span style="color:#24292E;">    def put(self,item):</span></span>
<span class="line"><span style="color:#24292E;">        self._data.append()</span></span>
<span class="line"><span style="color:#24292E;">    def get(self):</span></span>
<span class="line"><span style="color:#24292E;">        result=self._data[0]</span></span>
<span class="line"><span style="color:#24292E;">        self._data.remove(result)</span></span>
<span class="line"><span style="color:#24292E;">        return result</span></span></code></pre></div><p>首先，定义一个 Queue 类，并在类中定义一个 data 列表数据，要模拟队列的实现通常需要实现两个方法，一个是 put 方法，在 put 方法中通过 append 往队列里追加数据，另一个是 get 方法，get 方法中首先定义了一个 result 并将其等于列表的首个数据，然后移除列表的首个数据，移除完成后返回被移除的数据。</p><br><p>这样就简单的实现了队列的功能，当系统给我们提供的数据结构不能满足需求的时候，就需要我们自己创建数据结构并实现对应的方法，然后锁死整个类的实现就可以完成整个数据结构的定义了。因为这块内容在面试中遇到的比较少，就不再给你剖析真题了，课后你需要重点练习栈的实现，因为在面试中栈是常考点。</p>`,7);function E(u,f,_,h,y,x){const s=p("Image");return l(),t("div",null,[d,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/60/87/CgpOIF4W646AeM8eAAOn-WpTKlk978.png"}),i,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/60/87/Cgq2xl4W646APjwyAASNyBPzGcE518.png"}),r])}const v=e(c,[["render",E]]);export{k as __pageData,v as default};
