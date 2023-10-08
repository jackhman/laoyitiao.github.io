import{_ as p,j as t,o,g as r,k as a,h as e,s,Q as l}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"第17讲：树结构及经典考题剖析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(334) 第17讲：树结构及经典考题剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(334) 第17讲：树结构及经典考题剖析.md","lastUpdated":1696682708000}'),c={name:"posts/devops/110-测试开发核心技术文档/(334) 第17讲：树结构及经典考题剖析.md"},i=s("h1",{id:"第17讲-树结构及经典考题剖析",tabindex:"-1"},[e("第17讲：树结构及经典考题剖析 "),s("a",{class:"header-anchor",href:"#第17讲-树结构及经典考题剖析","aria-label":'Permalink to "第17讲：树结构及经典考题剖析"'},"​")],-1),E=s("p",null,"本课时我们主要讲解树结构，以及剖析树结构相关的考题。",-1),d=s("h2",{id:"树结构定义",tabindex:"-1"},[e("树结构定义 "),s("a",{class:"header-anchor",href:"#树结构定义","aria-label":'Permalink to "树结构定义"'},"​")],-1),h=s("p",null,"首先，我们先来看下什么是树结构，树结构的定义是如果有一种数据，它既有自己的核心字段，同时又有指向它的若干个子节点，其中子节点下面又可以嵌套更多的子节点，这样便形成了一定的层级关系，这种结构看起来像是一颗翻转过来的树，所以被称为树结构。",-1),y=s("br",null,null,-1),f=s("p",null,"如图所示，在树结构里，A 节点包含了 B 节点和 C 节点，B 节点下面又包含了三个其他的子节点，数据一层一层往下扩展。",-1),g=l(`<p>在树结构里还有一种特例，就是二叉树。二叉树是指所有的节点最多只能有两个子节点，这种树结构我们便称之为二叉树。二叉树是面试中经常会被问到的考题，但是对普通的树形结构的处理反而是我们测试中经常会用到的。所以二叉树的处理和普通树结构的处理，你都需要掌握。</p><br><p>那么普通的树结构在什么地方会用到呢？比如我们打开一个网站，这个网站有很多页面，这些页面又都是层级逻辑关系，也就是进入一层界面处理一层界面的操作逻辑，然后又进入另外一个界面，所有的界面的层级便构成了一个复杂的树结构。产品经理在设计 App 或网站的时候，也是一个层级结构。除此之外，还有很多我们测试中用到的结构其实也都是树结构。</p><h2 id="二叉树" tabindex="-1">二叉树 <a class="header-anchor" href="#二叉树" aria-label="Permalink to &quot;二叉树&quot;">​</a></h2><p>讲完了树结构，我们来了解到底什么是二叉树。</p><br><p>树结构其实是由一个核心的数据和一堆指向节点的链接组成。二叉树则是树结构的一种特例，二叉树每个节点下最多只能有两个子节点，所以我们可以使用 left、right 进行表示。如果有更多的子树，你还可以使用 self.children，把所有子节点放到 children 中进行描述。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class BTree：</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self,data=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.data = data</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.left = None</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.right = None</span></span>
<span class="line"><span style="color:#E1E4E8;">        # slef.children =[]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class BTree：</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self,data=None):</span></span>
<span class="line"><span style="color:#24292E;">        self.data = data</span></span>
<span class="line"><span style="color:#24292E;">        self.left = None</span></span>
<span class="line"><span style="color:#24292E;">        self.right = None</span></span>
<span class="line"><span style="color:#24292E;">        # slef.children =[]</span></span></code></pre></div><p>本课时我们就先以二叉树的例子来给你讲解树结构，以及如何做相关的常见的数据处理。</p><br><p>了解了二叉树的基本定义，接下来我们从零开始创建一个二叉树。</p><br><p>让我们回到 IDE，创建一个 BTree 的类，和链表类似，我们先创建出一个树结构。树结构有一个核心的数据，那这个数据从哪里来呢？当然是需要我们传入进来，所以我们定义一个参数，这里为了简单方便直接给定一个默认值。</p><br><p>二叉树最多有两个节点，所以我们分别使用 left 及 right 作为代表。如果还有更多的子节点则使用 children，在 children 中其实使用了一个结构，如果它里面有节点，我们就可以往里面插入更多的节点，所以说不同的树结构是非常相似的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestBTee:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_create(self)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestBTee:</span></span>
<span class="line"><span style="color:#24292E;">    def test_create(self)</span></span></code></pre></div><p>我们先创建一个测试用例。在这里构建一个二叉树描述我们今天的 demo 数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestBTee:</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    0</span></span>
<span class="line"><span style="color:#E1E4E8;">    1 2</span></span>
<span class="line"><span style="color:#E1E4E8;">    3 4 | 5 6</span></span>
<span class="line"><span style="color:#E1E4E8;">    none none | none none | none none | 7 none|</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;&quot;&quot; </span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_create(self):</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestBTee:</span></span>
<span class="line"><span style="color:#24292E;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    0</span></span>
<span class="line"><span style="color:#24292E;">    1 2</span></span>
<span class="line"><span style="color:#24292E;">    3 4 | 5 6</span></span>
<span class="line"><span style="color:#24292E;">    none none | none none | none none | 7 none|</span></span>
<span class="line"><span style="color:#24292E;">    &quot;&quot;&quot; </span></span>
<span class="line"><span style="color:#24292E;">    def test_create(self):</span></span></code></pre></div><p>我们先来描述下我们想要的二叉树结构。0 下面有 1、2 两个节点，1 下面又分 3、4 两个节点，2 下面又分 5、6 两个节点，其中 6下面只有一个节点 7。</p><br><p>好，那么这个结构相信你已经理解了，接下来我们去创建这样的一个结构。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_create(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree=BTree(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.left=BTree(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.right=BTree(2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.left.left=BTree(3)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.left.right=BTree(4)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.right.left=BTree(5)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.right.right=BTree(6)</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree.right.right.left=BTree(7)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_create(self):</span></span>
<span class="line"><span style="color:#24292E;">    tree=BTree(0)</span></span>
<span class="line"><span style="color:#24292E;">    tree.left=BTree(1)</span></span>
<span class="line"><span style="color:#24292E;">    tree.right=BTree(2)</span></span>
<span class="line"><span style="color:#24292E;">    tree.left.left=BTree(3)</span></span>
<span class="line"><span style="color:#24292E;">    tree.left.right=BTree(4)</span></span>
<span class="line"><span style="color:#24292E;">    tree.right.left=BTree(5)</span></span>
<span class="line"><span style="color:#24292E;">    tree.right.right=BTree(6)</span></span>
<span class="line"><span style="color:#24292E;">    tree.right.right.left=BTree(7)</span></span></code></pre></div><p>首先，我们使用一个 tree 变量，让其等于 BTree(0)，你可以从底层开始进行创建，也可以从上层开始创建，我们就先从上层开始构建，过程参考代码。</p><br><p>当然这样创建树形结构打的字比较多，你也可以自己写一个构建函数来模拟这个操作，我这里就先临时这么写，简单构建一个小的二叉树，它一共有 4 层。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(self.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(self.left)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(self.right)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self):</span></span>
<span class="line"><span style="color:#24292E;">    print(self.data)</span></span>
<span class="line"><span style="color:#24292E;">    print(self.left)</span></span>
<span class="line"><span style="color:#24292E;">    print(self.right)</span></span></code></pre></div><p>构建完二叉树后，我们第一个操作就是打印这个树形结构，我们使用 travel，那么 travel 怎么对树进行遍历呢？我们先写一个最简单的方法，首先打印根节点，然后再打印它的左节点和右节点。</p><br><p>但是这样打印，我们只能打印出来一层，可是下面还有很多层，它是一个层级关系，每个子节点又是一个新的树。所以你觉不觉得处理起来像递归用法呢？接下来我们就写一个递归的算法遍历树形结构，我们把它改造成一种递归。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(subtree):</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(subtree.left)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(subtree.right)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(subtree):</span></span>
<span class="line"><span style="color:#24292E;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#24292E;">    print(subtree.left)</span></span>
<span class="line"><span style="color:#24292E;">    print(subtree.right)</span></span></code></pre></div><p>首先，self 不可能一直都是根节点，它是需要再找到子树的，所以我们将 self 改为 subTree。但是这样只是完成了第一步，它还可以支持传参。这样就完成了一个递归思路，通过这个办法，我们可以先打印核心的根节点，然后再打印 left 和 right，而在打印 left 的时候，left 可能又有新的子节点，所以又把它传递一次递归，这样就打印了左节点的数据，接着再打印左节点下面的左节点。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self,subtree):</span></span>
<span class="line"><span style="color:#E1E4E8;">    if subtree is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        return</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.travel(subtree.left)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self,subtree):</span></span>
<span class="line"><span style="color:#24292E;">    if subtree is None:</span></span>
<span class="line"><span style="color:#24292E;">        return</span></span>
<span class="line"><span style="color:#24292E;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#24292E;">    self.travel(subtree.left)</span></span></code></pre></div><p>那么，什么时候终止呢？这里我们需要添加一个递归的终止条件，这个终止条件就是 if subtree is none，如果是 none 的话，就直接退出；如果不是的话，就直接打印数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">tree.travel(tree)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">tree.travel(tree)</span></span></code></pre></div><p>我们写完这个算法之后就需要检查数据到底对不对，所以这里写一个 tree.travel，因为它是参数化的，所以需要传参，这里传入的是二叉树自身。</p><br><p>这个函数看起来有点啰嗦，我们可以再写一个新的函数，把整个调用封装起来，把它改造成内部的函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">def travel(cls,subtree):</span></span>
<span class="line"><span style="color:#E1E4E8;">    if subtree is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        return</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    cls.travel(subtree.left)</span></span>
<span class="line"><span style="color:#E1E4E8;">    cls.travel(subtree.right)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">classTestBTee:</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    0</span></span>
<span class="line"><span style="color:#E1E4E8;">    1 2</span></span>
<span class="line"><span style="color:#E1E4E8;">    3 4 | 5 6</span></span>
<span class="line"><span style="color:#E1E4E8;">    none none | none none | none none | 7 none|</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;&quot;&quot; </span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_create(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree=BTree(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.left=BTree(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.right=BTree(2)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.left.left=BTree(3)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.left.right=BTree(4)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.right.left=BTree(5)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.right.right=BTree(6)</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree.right.right.left=BTree(7)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        BTree.travel(tree)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@classmethod</span></span>
<span class="line"><span style="color:#24292E;">def travel(cls,subtree):</span></span>
<span class="line"><span style="color:#24292E;">    if subtree is None:</span></span>
<span class="line"><span style="color:#24292E;">        return</span></span>
<span class="line"><span style="color:#24292E;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#24292E;">    cls.travel(subtree.left)</span></span>
<span class="line"><span style="color:#24292E;">    cls.travel(subtree.right)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">classTestBTee:</span></span>
<span class="line"><span style="color:#24292E;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    0</span></span>
<span class="line"><span style="color:#24292E;">    1 2</span></span>
<span class="line"><span style="color:#24292E;">    3 4 | 5 6</span></span>
<span class="line"><span style="color:#24292E;">    none none | none none | none none | 7 none|</span></span>
<span class="line"><span style="color:#24292E;">    &quot;&quot;&quot; </span></span>
<span class="line"><span style="color:#24292E;">    def test_create(self):</span></span>
<span class="line"><span style="color:#24292E;">        tree=BTree(0)</span></span>
<span class="line"><span style="color:#24292E;">        tree.left=BTree(1)</span></span>
<span class="line"><span style="color:#24292E;">        tree.right=BTree(2)</span></span>
<span class="line"><span style="color:#24292E;">        tree.left.left=BTree(3)</span></span>
<span class="line"><span style="color:#24292E;">        tree.left.right=BTree(4)</span></span>
<span class="line"><span style="color:#24292E;">        tree.right.left=BTree(5)</span></span>
<span class="line"><span style="color:#24292E;">        tree.right.right=BTree(6)</span></span>
<span class="line"><span style="color:#24292E;">        tree.right.right.left=BTree(7)</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        BTree.travel(tree)</span></span></code></pre></div><p>或者，你也可以在这儿加一个 @classmethod，把 self 换成 cls，这样效果也是一样的。这样就可以使用 BTree 方法打印了。</p><br><p>整个遍历的过程需要我们注意，它根据根节点打印的先后顺序，分为前序、中序和后序。前序指的是核心数据节点先打印出来，而核心数据如果放在左右节点的中间就叫作中序，其次是后序。</p>`,41),u=l(`<p>我们来看下打印的结果值，因为是按照前序遍历打印数据，所以第一个打印的是根节点 0，其次是左节点 1，然后是左节点的左节点 3，以此类推，结果按照0、 1、2、4、5、6、7 全部打印出来。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">def travel(cls,subtree):</span></span>
<span class="line"><span style="color:#E1E4E8;">    if subtree is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        return</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    cls.travel(subtree.left)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    cls.travle(subtree.right)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@classmethod</span></span>
<span class="line"><span style="color:#24292E;">def travel(cls,subtree):</span></span>
<span class="line"><span style="color:#24292E;">    if subtree is None:</span></span>
<span class="line"><span style="color:#24292E;">        return</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    cls.travel(subtree.left)</span></span>
<span class="line"><span style="color:#24292E;">    print(subtree.data)</span></span>
<span class="line"><span style="color:#24292E;">    cls.travle(subtree.right)</span></span></code></pre></div>`,2),_=l(`<p>如果现在我们把这个节点放到中间呢？再次执行你会注意到这个时候变成了 3、1、4、0、5、2、7、6。这是因为我们此时是按照中序在遍历。</p><br><p>打印的过程中先去寻找左节点，第一个左节点是 3，3 打印完是 1，然后再寻找右节点，接着是 4，最后的结果便是 3、1、4。4 打印完后是 0，以此类推，你可以课后自己推导结果，这里就不再一一介绍了。</p><h2 id="树形结构考题" tabindex="-1">树形结构考题 <a class="header-anchor" href="#树形结构考题" aria-label="Permalink to &quot;树形结构考题&quot;">​</a></h2><p>一个简单的树的遍历，差不多就是这样一个写法，接下来我们剖析一个经典的树结构面试考题。</p><br><p>怎样获取一个树结构的最大深度？其实我们在一些测试工作中有时候也经常会用到这个算法。比如计算某个控件在当前界面中它属于多大的一个深度。接下来我们看下具体怎么解答这个问题。</p><br><p>首先，我们写一个叫作 max depth 的函数，然后我们用递归算法来计算深度。这个深度是这样子的，首先如果它即有左节点，又有右节点，那么每进去一层深度其实是要加 1 的。最后完成之后，我们计算加 1 的值最后能加到多少？你可以看到它的算法本质和遍历是一样的。我们看下它的写法是什么？</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def max_depth(self,subtree,depth):</span></span>
<span class="line"><span style="color:#E1E4E8;">    if subtree is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        return depth</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    self.max_depth(subtree.left,depth+1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.max_depth(subtree.right,depth+1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    return max_left if max_left &gt; max_right else max_right</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def max_depth(self,subtree,depth):</span></span>
<span class="line"><span style="color:#24292E;">    if subtree is None:</span></span>
<span class="line"><span style="color:#24292E;">        return depth</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    self.max_depth(subtree.left,depth+1)</span></span>
<span class="line"><span style="color:#24292E;">    self.max_depth(subtree.right,depth+1)</span></span>
<span class="line"><span style="color:#24292E;">    return max_left if max_left &gt; max_right else max_right</span></span></code></pre></div><p>我们梳理下思路，首先是通过递归，因为每一次递归都会查找一个子树，所以我们需要有个树的节点传递给函数。left 或 right 就是这时被传入函数的，在传入的过程中，因为深度加 1 了，所以 depth 也需要加 1。然后通过一个终止条件，判断返回的时机，如果 left 或 right 为空就直接返回，如果不为空就进行上面说的逻辑处理，直到找到最后一层子树并返回结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def setup(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree=BTree(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.left=BTree(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.right=BTree(2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.left.left=BTree(3)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.left.right=BTree(4)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.right.left=BTree(5)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.right.right=BTree(6)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.right.right.left=BTree(7)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def setup(self):</span></span>
<span class="line"><span style="color:#24292E;">    self.tree=BTree(0)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.left=BTree(1)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.right=BTree(2)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.left.left=BTree(3)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.left.right=BTree(4)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.right.left=BTree(5)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.right.right=BTree(6)</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.right.right.left=BTree(7)</span></span></code></pre></div><p>然后，我们验证下这个 case。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_travel(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    BTree.travel(self.tree)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">def test_max_depth(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(self.tree.max_depth(self.tree,0))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_travel(self):</span></span>
<span class="line"><span style="color:#24292E;">    BTree.travel(self.tree)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">def test_max_depth(self):</span></span>
<span class="line"><span style="color:#24292E;">    print(self.tree.max_depth(self.tree,0))</span></span></code></pre></div><p>我们再创建一个测试用例和树来测试它的深度，首先 self.tree 前面已经创建好了，这个 tree 的 max_depth 也需要传入一个子树，这里传入 self.tree。下面是获取深度的逻辑，一开始的初始值是 0，每进一层它就加 1，最后打印下最后的值是多少。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_max_depth(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.tree.max_depth(self.tree,0) == 4</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.tree.right.right.left.left = BTree(8)</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.tree.max_depth(self.tree,0) == 5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_max_depth(self):</span></span>
<span class="line"><span style="color:#24292E;">    assert self.tree.max_depth(self.tree,0) == 4</span></span>
<span class="line"><span style="color:#24292E;">    self.tree.right.right.left.left = BTree(8)</span></span>
<span class="line"><span style="color:#24292E;">    assert self.tree.max_depth(self.tree,0) == 5</span></span></code></pre></div><p>我看深度好像是 4，那么接下来我们开始写断言来证明它的值到底是不是 4。</p><br><p>所以通过这个办法，我们可以看到，我们就写出来一个关于 BTree 二叉树的一个经典的遍历算法，当然你觉得这个调用特别烦琐的话，你还可以创建一个新的函数，比如说：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def get_max_depth(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.max_depth(self,0)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def get_max_depth(self):</span></span>
<span class="line"><span style="color:#24292E;">    self.max_depth(self,0)</span></span></code></pre></div><p>这样使得调用变得更简单。</p><br><p>本课时的内容就讲到这里了，其实核心就是一个树形结构，它的遍历跟链表很相似，子节点跟父节点是类似的算法处理，所以我们可以使用递归算法计算树形的深度。</p>`,23);function b(v,T,m,B,k,C){const n=t("Image");return o(),r("div",null,[i,E,d,h,y,f,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/D3/Cgq2xl4f2gWAMlflAAF5FGDHnyo146.png"}),e(),g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/D3/Cgq2xl4f2gaAMydMAAEp3l-gCRU140.png"}),e(),u,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/D2/CgpOIF4f2gaARjLlAAGMP20VB90449.png"}),e(),_])}const N=p(c,[["render",b]]);export{q as __pageData,N as default};
