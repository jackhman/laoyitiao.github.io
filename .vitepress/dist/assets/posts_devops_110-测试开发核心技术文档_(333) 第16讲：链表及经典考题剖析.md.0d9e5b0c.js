import{_ as l,j as p,o as t,g as i,k as n,Q as e,s as a}from"./chunks/framework.b3d8e22e.js";const N=JSON.parse('{"title":"链表的定义 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(333) 第16讲：链表及经典考题剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(333) 第16讲：链表及经典考题剖析.md","lastUpdated":1696417798000}'),o={name:"posts/devops/110-测试开发核心技术文档/(333) 第16讲：链表及经典考题剖析.md"},c=e(`<p>本课时我们主要讲解链表，以及链表相关的考题剖析。</p><h2 id="链表的定义" tabindex="-1">链表的定义 <a class="header-anchor" href="#链表的定义" aria-label="Permalink to &quot;链表的定义&quot;">​</a></h2><p>那到底什么是链表呢？我们从最简单的单链表开始学习。单链表首先有一个数据字段，用来存储数据；其次它还有一个指针，但这个指针不同于 C++ 中的指针，这里的指针是指向下一个节点，它用来标记并链接下一个节点，然后下一个节点的 next 字段再链接到它的下一个节点，依次类推，便形成一个单链表。</p><br><p>除了单链表之外，常见的还有单向循环链表，可以让链表尾部节点的 next 指针指向头节点。然后是双向链表，增加了一个 pre 字段，它既可以向前指也可以向后指。我们今天就先以单链表为例，来给你演示如何定义和使用链表。</p><h2 id="链表常见操作" tabindex="-1">链表常见操作 <a class="header-anchor" href="#链表常见操作" aria-label="Permalink to &quot;链表常见操作&quot;">​</a></h2><p>首先，我们来看下链表的常见操作，链表的常见操作包括：</p><ul><li><p>新建</p></li><li><p>尾部追加 append</p></li><li><p>特定位置插入数据 insert</p></li><li><p>遍历链表 travel</p></li><li><p>查找数据位置 search</p></li></ul><p>你可以新建一个链表后在尾部追加一个数据，追加数据之后还可以允许在特定位置插入数据，还可以通过遍历链表查找数据的位置，其中面试中最经常考的是在特定的位置插入数据，它考察了你对链表的熟悉程度。</p><h3 id="尾部追加-append" tabindex="-1">尾部追加 append <a class="header-anchor" href="#尾部追加-append" aria-label="Permalink to &quot;尾部追加 append&quot;">​</a></h3><p>然后，我们定义一个链表的数据结构，来演示下链表如何使用，首先我们创建一个 test_link 的测试文件，然后定义 LinkNode 的链表结构，它既有数据又有指向下一个字段的指针，所以它是一个整体的内容。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class LinkNode</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self,data=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.data=data</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.next=None</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class LinkNode</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self,data=None):</span></span>
<span class="line"><span style="color:#24292E;">        self.data=data</span></span>
<span class="line"><span style="color:#24292E;">        self.next=None</span></span></code></pre></div><p>在初始化时，首先定义了一个数据域叫作 self.data，然后给它传入一个 None 值，然后让 self.data 等于 传入的参数 data，self.next 等于 None，next 永远指向下一个节点，在初始化时链表是空的所以让它先等于 None。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestLinkNode:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_add(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        link = LinkNode(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        link.next = LinkNode(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">        link.next.next = LinkNode(2)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestLinkNode:</span></span>
<span class="line"><span style="color:#24292E;">    def test_add(self):</span></span>
<span class="line"><span style="color:#24292E;">        link = LinkNode(0)</span></span>
<span class="line"><span style="color:#24292E;">        link.next = LinkNode(1)</span></span>
<span class="line"><span style="color:#24292E;">        link.next.next = LinkNode(2)</span></span></code></pre></div><p>这样一个简单的链表就创建好了，创建完链表后我们就需要往里面追加数据，并让 next 指向下一个 节点。</p><br><p>我们首先创建一个测试类 TestLinkNode，然后创建一个 test_add 的测试用例，再使用 link 让它等于 LinkNode 并传入一个数据 0，链表中追加的数据类型是不限的。创建完 link 后，怎么往后追加数据呢？首先它有一个 next，使用 next 等于 LinkNode 并往里面传入一个数据 1，这样就可以追加一个新的字段，link.next 指向新节点。同理，我们还可以继续往里面追加数据 3，但这种追加方式非常的麻烦，我们通常是不会这样去追加数据的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def append(self,data=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item.next is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        item=item.next</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    item.next=LinkNode(data)  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return self</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def append(self,data=None):</span></span>
<span class="line"><span style="color:#24292E;">    item=self</span></span>
<span class="line"><span style="color:#24292E;">    while item.next is not None:</span></span>
<span class="line"><span style="color:#24292E;">        item=item.next</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    item.next=LinkNode(data)  </span></span>
<span class="line"><span style="color:#24292E;">    return self</span></span></code></pre></div><p>所以我们需要封装一个新的方法，如果这个链表已经有很多数据了，我们需要往最后一个节点的 next 追加我们想要的数据，所以我们要设计一个循环，这个循环的终止条件是 next is not None，也就是如果这个节点的下一个节点不为空，说明它下面还有一个节点，我们便使用 item 等于 item.next，直到下一个节点为空就可以得到链表的尾部节点，我们使用 item.next 等于 LinkNode 就可以在尾部追加一个数据。最后 return 一个当前的 self，这样就可以进行链式操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_append(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    link=LinkNode(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    link.append(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    link.append(2).append(3).append(4).append(5)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_append(self):</span></span>
<span class="line"><span style="color:#24292E;">    link=LinkNode(0)</span></span>
<span class="line"><span style="color:#24292E;">    link.append(1)</span></span>
<span class="line"><span style="color:#24292E;">    link.append(2).append(3).append(4).append(5)</span></span></code></pre></div><p>接下来，我们使用 test_append 给你演示下如果追加数据，我们创建一个链表变量 link，此时 link 就永远等于链表的头结点，然后使用 link.append 追加数据，比如这里追加 1~5。</p><h3 id="遍历链表-travel" tabindex="-1">遍历链表 travel <a class="header-anchor" href="#遍历链表-travel" aria-label="Permalink to &quot;遍历链表 travel&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item.next is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print(item.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">        item=item.next</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self):</span></span>
<span class="line"><span style="color:#24292E;">    item=self</span></span>
<span class="line"><span style="color:#24292E;">    while item.next is not None:</span></span>
<span class="line"><span style="color:#24292E;">        print(item.data)</span></span>
<span class="line"><span style="color:#24292E;">        item=item.next</span></span></code></pre></div><p>写完链表之后，我们就需要检查链表对不对，这时就需要遍历链表并打印链表的全部内容。接下来我们便学习链表的第二个常见操作遍历链表，遍历链表我们可以使用 teavel，首先 travel 没有任何参数，而链表又一定是一个循环或递归结构。我们让 item 等于 self，然后进入 item.next.is not None 的循环并打印 item.data，使 item 等于 item.next。但是这个写法是有问题的，我们先使用它，不断地查找 next，打印下一个 item.data。</p><br><p>如果此时打印到最后一个节点的 item.next 为空，说明这个节点的下一个节点是没有的，也就是它是尾结点。但是尾结点到 is not None 就退出不再执行了，所以便会漏掉了一个尾结点，这种情况该怎样解决呢？我们将 item.next 改成 item，如果 item 不为空的话就一直执行，也就是说当前 item 的最后一个节点就可以被打印出来了，打印完也不用返回。</p>`,26),r=e(`<p>我们运行看下效果，在这里追加打印了 link.travel，我们看到第一个节点是 0，第二个节点是 1，第三个节点是 2，以此类推，得到的结果和我们预期是一样的。</p><h3 id="查找数据的位置-search" tabindex="-1">查找数据的位置 search <a class="header-anchor" href="#查找数据的位置-search" aria-label="Permalink to &quot;查找数据的位置 search&quot;">​</a></h3><p>掌握了链表的追加和遍历之后，我们学习链表如何查找数据的位置，也就是给定一个数据，然后找出该数据最早出现的位置。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def search(self,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item = self</span></span>
<span class="line"><span style="color:#E1E4E8;">    index = 0</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        if item.data == data:</span></span>
<span class="line"><span style="color:#E1E4E8;">            return index</span></span>
<span class="line"><span style="color:#E1E4E8;">        else:</span></span>
<span class="line"><span style="color:#E1E4E8;">            index +=1</span></span>
<span class="line"><span style="color:#E1E4E8;">            item = item.next</span></span>
<span class="line"><span style="color:#E1E4E8;">    return -1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def search(self,data):</span></span>
<span class="line"><span style="color:#24292E;">    item = self</span></span>
<span class="line"><span style="color:#24292E;">    index = 0</span></span>
<span class="line"><span style="color:#24292E;">    while item is not None:</span></span>
<span class="line"><span style="color:#24292E;">        if item.data == data:</span></span>
<span class="line"><span style="color:#24292E;">            return index</span></span>
<span class="line"><span style="color:#24292E;">        else:</span></span>
<span class="line"><span style="color:#24292E;">            index +=1</span></span>
<span class="line"><span style="color:#24292E;">            item = item.next</span></span>
<span class="line"><span style="color:#24292E;">    return -1</span></span></code></pre></div><p>首先，查找数据也需要通过循环算法，仍然使用 while item is not None，如果不等 None，则判断 item.data 是否等于传入的 data，如果相等就返回 index，也就是我们要查找的数据的 index，否则进入 else，index 加 1，item 等于下一个节点。如果循环到最后仍没有找到，我们就简单 return 一个 -1。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestLinkNode:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def setup(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.link = LinkNode(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.link.append(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.link.append(2).append(3).append(4).append(5)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.link.travel()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestLinkNode:</span></span>
<span class="line"><span style="color:#24292E;">    def setup(self):</span></span>
<span class="line"><span style="color:#24292E;">        self.link = LinkNode(0)</span></span>
<span class="line"><span style="color:#24292E;">        self.link.append(1)</span></span>
<span class="line"><span style="color:#24292E;">        self.link.append(2).append(3).append(4).append(5)</span></span>
<span class="line"><span style="color:#24292E;">        self.link.travel()</span></span></code></pre></div><p>然后，我们添加一个 def setup，并创建一个公共的 link，这样可以使下面的案例更好的复用它。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_search(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(self.link.search(3))</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(self.link.search(0))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_search(self):</span></span>
<span class="line"><span style="color:#24292E;">    print(self.link.search(3))</span></span>
<span class="line"><span style="color:#24292E;">    print(self.link.search(0))</span></span></code></pre></div><p>最后，我们创建一个 test_search，并在 search 中把刚才的算法拷贝过来，比如我们现在 search(3) 和 search(0) 并打印结果：</p>`,9),d=e(`<p>发现结果中一个是 3 一个是 0，所以从结果我们可以看到，这个下标值是对的。</p><h3 id="特定位置插入数据-insert" tabindex="-1">特定位置插入数据 insert <a class="header-anchor" href="#特定位置插入数据-insert" aria-label="Permalink to &quot;特定位置插入数据 insert&quot;">​</a></h3><p>最后，我们再来看一个经典的考题，这个考题也是通常考察一个工程师基本功时经常被问到的一个问题，也就是给定一个单链表，在特定位置插入数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def insert(self,pos,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    index=0</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        index +=1</span></span>
<span class="line"><span style="color:#E1E4E8;">        item=item.next</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def insert(self,pos,data):</span></span>
<span class="line"><span style="color:#24292E;">    item=self</span></span>
<span class="line"><span style="color:#24292E;">    index=0</span></span>
<span class="line"><span style="color:#24292E;">    while item is not None:</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        index +=1</span></span>
<span class="line"><span style="color:#24292E;">        item=item.next</span></span></code></pre></div><p>我们首先创建一个 insert 函数，insert 函数通常需要给定一个下标位置，我们在这个下标位置中插入新值，同时后面的链表也会自动链接起来，我们现在看下具体怎么实现。往链表中插入数据的位置是通过 pos 变量决定的，所以插入数据仍离不开循环，我们仍然使用 while item is not None。接下来，我们看下怎样使用下标来标记特定位置，先在 while 循环中添加 index += 1 操作，表明每一次循环下标都加 1。然后是 item = item.next 完成循环。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def insert(self,pos,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    index=0</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        if index ==(pos - 1)</span></span>
<span class="line"><span style="color:#E1E4E8;">            break</span></span>
<span class="line"><span style="color:#E1E4E8;">        index += 1 </span></span>
<span class="line"><span style="color:#E1E4E8;">        item =item.next</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def insert(self,pos,data):</span></span>
<span class="line"><span style="color:#24292E;">    item=self</span></span>
<span class="line"><span style="color:#24292E;">    index=0</span></span>
<span class="line"><span style="color:#24292E;">    while item is not None:</span></span>
<span class="line"><span style="color:#24292E;">        if index ==(pos - 1)</span></span>
<span class="line"><span style="color:#24292E;">            break</span></span>
<span class="line"><span style="color:#24292E;">        index += 1 </span></span>
<span class="line"><span style="color:#24292E;">        item =item.next</span></span></code></pre></div><p>假如我们想在原有 2 和 3 之间插入一个 2.5，此时 3 的节点需要往后移，2 的 next 指向新节点 2.5，2.5 的 next 再指向 3 即可。所以查找 index 的算法是这样的，如果 index 等于 pos，此时 pos 值需要找到的是前一个 2，想要在目前 3 的位置插入 2.5 就必须先找到 2，所以 index 等于 pos -1，这样我们就找到了它的位置了，这时 break。</p><br><p>一旦确定了要插入的位置我们就需要在 2 和 3 之间插入一个数据 2.5，其中新的数据的 next 指向 3，2 的 next 指向新节点。需要注意的是我们要先让新节点的 next 指向 3，再用2链接新节点就可以了，如果反过来节点 2 的 next 被赋值到新节点，那么原来节点 2 的 next 指向的节点 3 就会丢失找不到了。按照这个思路我们写这样一个方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def insert(self,pos,data):  </span></span>
<span class="line"><span style="color:#E1E4E8;">    item = self</span></span>
<span class="line"><span style="color:#E1E4E8;">    index = 0</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        if index ==(pos - 1):</span></span>
<span class="line"><span style="color:#E1E4E8;">            break</span></span>
<span class="line"><span style="color:#E1E4E8;">        index +=1</span></span>
<span class="line"><span style="color:#E1E4E8;">        item = item.next</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    node=LinkNode(data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    node.next=item.next</span></span>
<span class="line"><span style="color:#E1E4E8;">    item.next=node</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def insert(self,pos,data):  </span></span>
<span class="line"><span style="color:#24292E;">    item = self</span></span>
<span class="line"><span style="color:#24292E;">    index = 0</span></span>
<span class="line"><span style="color:#24292E;">    while item is not None:</span></span>
<span class="line"><span style="color:#24292E;">        if index ==(pos - 1):</span></span>
<span class="line"><span style="color:#24292E;">            break</span></span>
<span class="line"><span style="color:#24292E;">        index +=1</span></span>
<span class="line"><span style="color:#24292E;">        item = item.next</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    node=LinkNode(data)</span></span>
<span class="line"><span style="color:#24292E;">    node.next=item.next</span></span>
<span class="line"><span style="color:#24292E;">    item.next=node</span></span></code></pre></div><p>通过这样一次互换，就可以利用新节点 2.5 隔开 2 和 3 了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_insert(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link.insert(3,2.5)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link.travel</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_insert(self):</span></span>
<span class="line"><span style="color:#24292E;">    self.link.insert(3,2.5)</span></span>
<span class="line"><span style="color:#24292E;">    self.link.travel</span></span></code></pre></div><p>我们来验证下效果，创建一个新的 test_insert 的测试用例，然后在 self.link 中使用 insert，比如我在 3 的位置插入一个 2.5，插完之后我们使用 link.travel 来打印链表。</p>`,13),E=a("p",null,"我们发现插入没有问题，那么 2.5 的位置是多少呢？我们使用 self.link.search 来查找 2.5。",-1),y=a("p",null,"可以发现 2.5 的位置是 3，说明我们已经成功插入了数据，通过这个算法我们可以看到链表的基本使用。链表的核心数据域有两个，data 用来存储数据，next 用来指向下一个节点。",-1),h=a("br",null,null,-1),k=a("p",null,"链表在工作中有很多的用法，比如遍历链表，尾部追加链表，查找关心的数据，以及在特定位置插入数据等。希望你在课后可以自己多加练习并在工作中熟练掌握链表的用法，也能够顺利通过一些大厂的面试。好了，这一课时的内容就结束了，下一课时我将讲解树结构以及关于树结构的经典考题。",-1);function m(f,g,_,x,v,u){const s=p("Image");return t(),i("div",null,[c,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/7B/Cgq2xl4dl6KAZvnXAAEBBAmsoF4690.png"}),r,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/7A/CgpOIF4dl6OATUmnAAFW0-F8eNA749.png"}),d,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/7A/CgpOIF4dl6OAJOdmAAFWyr2vwEM321.png"}),E,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/7B/Cgq2xl4dl6OAH45JAAFROGKvG6M602.png"}),y,h,k])}const C=l(o,[["render",m]]);export{N as __pageData,C as default};
