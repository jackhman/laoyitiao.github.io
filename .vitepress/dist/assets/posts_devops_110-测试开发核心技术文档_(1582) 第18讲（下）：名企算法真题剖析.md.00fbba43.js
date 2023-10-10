import{_ as e,j as o,o as t,g as c,k as a,h as l,Q as p,s}from"./chunks/framework.cfb14fe0.js";const V=JSON.parse('{"title":"第18讲（下）：名企算法真题剖析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(1582) 第18讲（下）：名企算法真题剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(1582) 第18讲（下）：名企算法真题剖析.md","lastUpdated":1696682708000}'),r={name:"posts/devops/110-测试开发核心技术文档/(1582) 第18讲（下）：名企算法真题剖析.md"},i=p(`<h1 id="第18讲-下-名企算法真题剖析" tabindex="-1">第18讲（下）：名企算法真题剖析 <a class="header-anchor" href="#第18讲-下-名企算法真题剖析" aria-label="Permalink to &quot;第18讲（下）：名企算法真题剖析&quot;">​</a></h1><p>本课时剖析树结构的经典考题，题目是如何根据特定的顺序创建一个新的树形结构，这个顺序可以是前序、后续和中序，这也是面试中经常会被问到的一道考题，网上的标准答案已经很多了，这里我们更务实一些，使用测试工作中的经典场景来解答问题。</p><br><p>比如我们需要根据 html 或 xml 数据新建一个树形结构，然后计算每个节点的深度，对比新旧版本之间两个节点有什么异同，这些对于测试工作都非常有用，所以本课时就以实际工作中遇到的 html 案例来给你进行剖析。</p><br><p>以测试用例中的结构为例，html 下面有 head 和 body 两个节点，head 和 body 下面还各有自己不同的子节点，在我们做自动化测试时经常会遇到这种数据结构，我们也希望能从这种树形结构中反向构造一个树，以便我们做更多的数据分析。</p><br><p>接下来，我们就看下具体怎么解决这个问题，首先我们创建一个测试用例，这个测试用例给定一个 xml 数据并简单拼装成了 html 结构，我们希望可以通过 create_from_string 方法根据给定的字符串完整的生产一个树形结构，并可以在这个树形结构中可以断言每个节点的深度，比如 html 的深度是 1，head 的深度是 2，以此类推。</p><br><p>接下来，我们进入代码实现，首先需要一个测试用例，然后实现具体的算法。我们创建一个 test_tree 的文件，和前面讲过的二叉树算法不一样的地方在于这次我们需要处理 xml 数据，节点 head 下可能有多个节点，但它们本质上都是一样的，都是一个树结构。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Tree：</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.data=data</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.children=[]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Tree：</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self,data):</span></span>
<span class="line"><span style="color:#24292E;">        self.data=data</span></span>
<span class="line"><span style="color:#24292E;">        self.children=[]</span></span></code></pre></div><br><p>首先，创建一个叫作 Tree 的类，它有一个初始化方法，在初始化方法中传入了一个数据，并令 self.data=data，把数据存储下来，多叉树与二叉树最大的不同在于二叉树有 left 和 right，而多叉树只需要一个列表来表达就可以了，这时我们使用 slef.children 列表来表达数据，这样我们便有了一个多叉树。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestTree:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_create_tree(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        root=Tree(&quot;html&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        head=Tree(&quot;head&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        a=Tree(&quot;a&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        b=Tree(&quot;b&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        head.children.append(a)</span></span>
<span class="line"><span style="color:#E1E4E8;">        head.children.append(b)</span></span>
<span class="line"><span style="color:#E1E4E8;">        body=Tree(&quot;body&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        x=Tree(&quot;x&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        m=Tree(&quot;m&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        m.children.append(x)</span></span>
<span class="line"><span style="color:#E1E4E8;">        body.children.append(m)</span></span>
<span class="line"><span style="color:#E1E4E8;">        root.children.append(head)</span></span>
<span class="line"><span style="color:#E1E4E8;">        root.children.append(body)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestTree:</span></span>
<span class="line"><span style="color:#24292E;">    def test_create_tree(self):</span></span>
<span class="line"><span style="color:#24292E;">        root=Tree(&quot;html&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        head=Tree(&quot;head&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        a=Tree(&quot;a&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        b=Tree(&quot;b&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        head.children.append(a)</span></span>
<span class="line"><span style="color:#24292E;">        head.children.append(b)</span></span>
<span class="line"><span style="color:#24292E;">        body=Tree(&quot;body&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        x=Tree(&quot;x&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        m=Tree(&quot;m&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        m.children.append(x)</span></span>
<span class="line"><span style="color:#24292E;">        body.children.append(m)</span></span>
<span class="line"><span style="color:#24292E;">        root.children.append(head)</span></span>
<span class="line"><span style="color:#24292E;">        root.children.append(body)</span></span></code></pre></div><br><p>有了多叉树之后，我们就需要去构建它，这时需要创建一个 create_tree 的测试用例，然后根据题目要求构建一个 xml 类型的多叉树。</p><br><p>我们令多叉树的根节点等于 html，root节点下面有 head 和 body 两个节点，而 head 与 body 下面还有各自的子节点，我们将它们创建并添加到树中，这样就构建了一个多叉树，你可以看到构建过程还是蛮复杂的，很显然我们在日常工作中不能使用这种方法进行构建。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self,node):</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(node.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    for child in self.children:</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.travel(child)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self,node):</span></span>
<span class="line"><span style="color:#24292E;">    print(node.data)</span></span>
<span class="line"><span style="color:#24292E;">    for child in self.children:</span></span>
<span class="line"><span style="color:#24292E;">        self.travel(child)</span></span></code></pre></div><br><p>构建完树结构之后我们就需要将它打印出来，在前面的测试用例中使用了 travel，它可以打印每个节点及对应的深度，这里我们具体实现这个方法，在 travel 方法中通常需要遍历算法来实现功能，我们先打印出 self.data，然后使用 for 循环对 data 中的每一个 child 进行遍历并打印，打印的过程逻辑都是一样的，我们使用递归算法实现，为了获取每个子节点这里需要传入一个 node 参数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self.node=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第一步递归改造</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第二步增加默认参数改造</span></span>
<span class="line"><span style="color:#E1E4E8;">    if node is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        node=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(node.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    for child in node.children:</span></span>
<span class="line"><span style="color:#E1E4E8;">        sef.travel(child)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self.node=None):</span></span>
<span class="line"><span style="color:#24292E;">    #第一步递归改造</span></span>
<span class="line"><span style="color:#24292E;">    #第二步增加默认参数改造</span></span>
<span class="line"><span style="color:#24292E;">    if node is None:</span></span>
<span class="line"><span style="color:#24292E;">        node=self</span></span>
<span class="line"><span style="color:#24292E;">    print(node.data)</span></span>
<span class="line"><span style="color:#24292E;">    for child in node.children:</span></span>
<span class="line"><span style="color:#24292E;">        sef.travel(child)</span></span></code></pre></div><br><p>首先，第一步是递归改造，令传入的 node 等于 None，然后如果 node is None，这时就让 node 等于 self，这样就完成了第一步改造，第二步改造是增加默认参数。再次运行，测试用例没有问题。</p><br>`,25),E=p(`<br><p>但是这样打印效果仍然不是很好，并不能很好的看出层级关系，而且后面的断言也需要层级关系，所以我们接下来增加层级关系的处理逻辑。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self.node=None,depth=1):</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第一步递归改造</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第二步增加默认参数改造</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第三部改造增加depth</span></span>
<span class="line"><span style="color:#E1E4E8;">    if node is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        node=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(node.data,depth)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    depth +=1</span></span>
<span class="line"><span style="color:#E1E4E8;">    for child in node.children:</span></span>
<span class="line"><span style="color:#E1E4E8;">        sef.travel(child,depth)</span></span>
<span class="line"><span style="color:#E1E4E8;">    depth -=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self.node=None,depth=1):</span></span>
<span class="line"><span style="color:#24292E;">    #第一步递归改造</span></span>
<span class="line"><span style="color:#24292E;">    #第二步增加默认参数改造</span></span>
<span class="line"><span style="color:#24292E;">    #第三部改造增加depth</span></span>
<span class="line"><span style="color:#24292E;">    if node is None:</span></span>
<span class="line"><span style="color:#24292E;">        node=self</span></span>
<span class="line"><span style="color:#24292E;">    print(node.data,depth)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    depth +=1</span></span>
<span class="line"><span style="color:#24292E;">    for child in node.children:</span></span>
<span class="line"><span style="color:#24292E;">        sef.travel(child,depth)</span></span>
<span class="line"><span style="color:#24292E;">    depth -=1</span></span></code></pre></div><br><p>回到递归函数，随着节点每深入一层深度也需要加 1，那么当前节点的深度到底是多少呢，我们假设第一个节点的深度是 1，depth 等于 1，然后随着递归，depth 需要+=1。当每个节点都遍历完之后，depth 再 -=1，而每一次递归深度是不一样的，所以我们需要传参进入，同样 depth 也需要给定一个初始值 1，经过这样的改造，深度的处理逻辑就追加进去了，然后我们运行测试用例，此时深度信息也可以打印出来了。</p><br>`,6),d=p(`<br><p>html 的深度为 1，head 的深度为2，以此类推。虽然这样就可以打印出多叉树的子节点的深度，但是这样仍然不够直观，怎么办呢？后面断言时我们需要将每个节点的深度存储到词典中，所以就需要我们把结果返回给外部函数，此时我们进行第四步改造，使用生成器。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self.node=None,depth=1):</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第一步递归改造</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第二步增加默认参数改造</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第三部改造增加depth</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第四步改造使用生成器</span></span>
<span class="line"><span style="color:#E1E4E8;">    if node is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        node=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(node.data,depth)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    depth +=1</span></span>
<span class="line"><span style="color:#E1E4E8;">    for child in node.children:</span></span>
<span class="line"><span style="color:#E1E4E8;">        sef.travel(child,depth)</span></span>
<span class="line"><span style="color:#E1E4E8;">    depth -= 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self.node=None,depth=1):</span></span>
<span class="line"><span style="color:#24292E;">    #第一步递归改造</span></span>
<span class="line"><span style="color:#24292E;">    #第二步增加默认参数改造</span></span>
<span class="line"><span style="color:#24292E;">    #第三部改造增加depth</span></span>
<span class="line"><span style="color:#24292E;">    #第四步改造使用生成器</span></span>
<span class="line"><span style="color:#24292E;">    if node is None:</span></span>
<span class="line"><span style="color:#24292E;">        node=self</span></span>
<span class="line"><span style="color:#24292E;">    print(node.data,depth)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    depth +=1</span></span>
<span class="line"><span style="color:#24292E;">    for child in node.children:</span></span>
<span class="line"><span style="color:#24292E;">        sef.travel(child,depth)</span></span>
<span class="line"><span style="color:#24292E;">    depth -= 1</span></span></code></pre></div><br><p>因为有的时候需要断言而不需要打印的，所以这时我们将 print 方法改造为 yield 方法，经过这一步改造，原有方法就变成了一个生成器，当外部调用它的时候就会自动生成每一层 node 和它的深度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">for node,depth in root.travel():</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(f&quot;{&#39;  &#39;*depth}{node} depth={depth}&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">for node,depth in root.travel():</span></span>
<span class="line"><span style="color:#24292E;">    print(f&quot;{&#39;  &#39;*depth}{node} depth={depth}&quot;)</span></span></code></pre></div><br><p>然后我们使用 for node，depth in root.travel(): 进行打印，这样改造之后我们再次运行测试用例。</p><br>`,9),y=p(`<br><p>你可以看到现在只是生成了一个节点，为什么会只生成一个节点呢？是因为 yield 调用 travel 时候里面有个递归逻辑。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">for child in node.children:</span></span>
<span class="line"><span style="color:#E1E4E8;">    yield from self.travel(child,depth)</span></span>
<span class="line"><span style="color:#E1E4E8;">depth -=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">for child in node.children:</span></span>
<span class="line"><span style="color:#24292E;">    yield from self.travel(child,depth)</span></span>
<span class="line"><span style="color:#24292E;">depth -=1</span></span></code></pre></div><br><p>但是已有的方法在递归中没有跑起来，所以我们需要添加一个 Python 的特殊字符 yield from，我们再次打印。</p><br>`,6),h=p(`<br><p>我们再次运行，一个基本的树结构就已经完全的打印出来了，有了这个树形结构我们自然要检查这个树形结构的层级对不对。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;x&quot;]==4</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;b&quot;]=3</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;body&quot;]==2</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;html&quot;]==1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">assert tree_dict[&quot;x&quot;]==4</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;b&quot;]=3</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;body&quot;]==2</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;html&quot;]==1</span></span></code></pre></div><br><p>我们就可以在前面添加一个词典，然后在打印的同时，将词典的 key 也就是节点的 depth 保存下来，然后就可以进行断言了，比如断言 x 的深度是不是等于 4，b 的深度是不是等于 3，等等。这就是多叉树的构建过程。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_create_tree_from_string(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    xml=&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#FDAEB7;font-style:italic;">c</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#FDAEB7;font-style:italic;">c</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#FDAEB7;font-style:italic;">d</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#FDAEB7;font-style:italic;">d</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#FDAEB7;font-style:italic;">m</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">                &lt;</span><span style="color:#FDAEB7;font-style:italic;">n</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#FDAEB7;font-style:italic;">n</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;/</span><span style="color:#FDAEB7;font-style:italic;">m</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">root = Tree.create_from_string(xml)</span></span>
<span class="line"><span style="color:#E1E4E8;">tree_dict={} </span></span>
<span class="line"><span style="color:#E1E4E8;">for data,depth in root.travel():</span></span>
<span class="line"><span style="color:#E1E4E8;">    tree_dict[data]=depth</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;html&quot;]==1</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;head&quot;]=2</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;d&quot;]==3</span></span>
<span class="line"><span style="color:#E1E4E8;">assert tree_dict[&quot;x&quot;]==4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_create_tree_from_string(self):</span></span>
<span class="line"><span style="color:#24292E;">    xml=&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#B31D28;font-style:italic;">c</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#B31D28;font-style:italic;">c</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#B31D28;font-style:italic;">d</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#B31D28;font-style:italic;">d</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#B31D28;font-style:italic;">m</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">                &lt;</span><span style="color:#B31D28;font-style:italic;">n</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#B31D28;font-style:italic;">n</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;/</span><span style="color:#B31D28;font-style:italic;">m</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">root = Tree.create_from_string(xml)</span></span>
<span class="line"><span style="color:#24292E;">tree_dict={} </span></span>
<span class="line"><span style="color:#24292E;">for data,depth in root.travel():</span></span>
<span class="line"><span style="color:#24292E;">    tree_dict[data]=depth</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;html&quot;]==1</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;head&quot;]=2</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;d&quot;]==3</span></span>
<span class="line"><span style="color:#24292E;">assert tree_dict[&quot;x&quot;]==4</span></span></code></pre></div><br><p>当然根据课时开始时的题目，我们需要根据 html 或 xml 生成一个多叉树而不是自己创建，接下来我们就完成对应测试用例的构建，为了节省时间我们直接将测试用例的代码复制过来，测试用例中我们构建了 html 数据，然后创建了 create_from_string 方法并创建一个词典保存了每个节点的深度，最后进行断言。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def create_from_string(self,content)-&gt;&#39;Tree&#39;:</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第一步编写基本的字符串处理逻辑框架</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第二步创建节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    #第三步使用stack记录tree的当前父节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    key=&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    root:Tree=None</span></span>
<span class="line"><span style="color:#E1E4E8;">    stack=Stack()</span></span>
<span class="line"><span style="color:#E1E4E8;">    for c in content:</span></span>
<span class="line"><span style="color:#E1E4E8;">        if c is &quot;</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            key=&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        elif c is &quot;&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            if &quot;/&quot; in key</span></span>
<span class="line"><span style="color:#E1E4E8;">                #节点结束</span></span>
<span class="line"><span style="color:#E1E4E8;">                pass</span></span>
<span class="line"><span style="color:#E1E4E8;">            else:</span></span>
<span class="line"><span style="color:#E1E4E8;">                #新节点</span></span>
<span class="line"><span style="color:#E1E4E8;">                pass</span></span>
<span class="line"><span style="color:#E1E4E8;">            else:</span></span>
<span class="line"><span style="color:#E1E4E8;">                key+=c</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def create_from_string(self,content)-&gt;&#39;Tree&#39;:</span></span>
<span class="line"><span style="color:#24292E;">    #第一步编写基本的字符串处理逻辑框架</span></span>
<span class="line"><span style="color:#24292E;">    #第二步创建节点</span></span>
<span class="line"><span style="color:#24292E;">    #第三步使用stack记录tree的当前父节点</span></span>
<span class="line"><span style="color:#24292E;">    key=&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    root:Tree=None</span></span>
<span class="line"><span style="color:#24292E;">    stack=Stack()</span></span>
<span class="line"><span style="color:#24292E;">    for c in content:</span></span>
<span class="line"><span style="color:#24292E;">        if c is &quot;</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">            key=&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        elif c is &quot;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">            if &quot;/&quot; in key</span></span>
<span class="line"><span style="color:#24292E;">                #节点结束</span></span>
<span class="line"><span style="color:#24292E;">                pass</span></span>
<span class="line"><span style="color:#24292E;">            else:</span></span>
<span class="line"><span style="color:#24292E;">                #新节点</span></span>
<span class="line"><span style="color:#24292E;">                pass</span></span>
<span class="line"><span style="color:#24292E;">            else:</span></span>
<span class="line"><span style="color:#24292E;">                key+=c</span></span></code></pre></div><br><p>然后我们去编写 create_from_string 方法，这个方法需要传入一个参数并返回一个树结构，既然传入了数据，就需要遍历这个数据里的每一个字符串，所以需要使用 for c in content 进行遍历。</p><br><p>如果 c 是 &lt; 符号表示这是一个结构层级的开头，说明我们遇到了一个新节点，这时需要将 key 保留下来，然后 elif c is &quot;&gt;&quot; 表示该节点就已经结束了，除此之外的其他内容我就使用 key+=c 逻辑处理，但是这里有两种情况，一种是 &lt; 表示新节点，一种是 &lt;/ 表示这时节点已经结束，所以 elif 下还有两个逻辑判断，如果 / 在我们的 key 里面我们需要做后续对应的处理，如果不在就需要创建一个新的节点。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">elif c is &quot;&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    if &quot;/&quot; in key</span></span>
<span class="line"><span style="color:#E1E4E8;">        #节点结束</span></span>
<span class="line"><span style="color:#E1E4E8;">        pass</span></span>
<span class="line"><span style="color:#E1E4E8;">    else:</span></span>
<span class="line"><span style="color:#E1E4E8;">        #新节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        tree=Tree(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">        if root is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">            root=tree</span></span>
<span class="line"><span style="color:#E1E4E8;">        else:</span></span>
<span class="line"><span style="color:#E1E4E8;">            pass</span></span>
<span class="line"><span style="color:#E1E4E8;">        pass</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">elif c is &quot;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    if &quot;/&quot; in key</span></span>
<span class="line"><span style="color:#24292E;">        #节点结束</span></span>
<span class="line"><span style="color:#24292E;">        pass</span></span>
<span class="line"><span style="color:#24292E;">    else:</span></span>
<span class="line"><span style="color:#24292E;">        #新节点</span></span>
<span class="line"><span style="color:#24292E;">        tree=Tree(key)</span></span>
<span class="line"><span style="color:#24292E;">        if root is None:</span></span>
<span class="line"><span style="color:#24292E;">            root=tree</span></span>
<span class="line"><span style="color:#24292E;">        else:</span></span>
<span class="line"><span style="color:#24292E;">            pass</span></span>
<span class="line"><span style="color:#24292E;">        pass</span></span></code></pre></div><br><p>然后，令 tree 等于 Tree(key)，当这个节点创建完成之后如果第一次遇到 html 的时候它是一个空的，就需要返回 tree；如果不为空，我们就需要实现其他的逻辑。</p><br><p>当你是第一次创建的时候 root 等于 None，表示第一次创建，我需要把 tree 记录下来，然后再往后都是子节点，这时我们就需要使用栈结构来处理多叉树的层级关系，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stack=Stack()</span></span>
<span class="line"><span style="color:#E1E4E8;">for c in conteng:</span></span>
<span class="line"><span style="color:#E1E4E8;">    if c in content:</span></span>
<span class="line"><span style="color:#E1E4E8;">        key=&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    else c is &quot;&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        if &quot;/&quot; in key:</span></span>
<span class="line"><span style="color:#E1E4E8;">            #节点结束</span></span>
<span class="line"><span style="color:#E1E4E8;">            stack.pop()</span></span>
<span class="line"><span style="color:#E1E4E8;">        else:</span></span>
<span class="line"><span style="color:#E1E4E8;">            #新节点</span></span>
<span class="line"><span style="color:#E1E4E8;">            tree=Tree(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">            if root is None:</span></span>
<span class="line"><span style="color:#E1E4E8;">                root=tree</span></span>
<span class="line"><span style="color:#E1E4E8;">            else:</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.top().children.append(tree)</span></span>
<span class="line"><span style="color:#E1E4E8;">            stack.push(tree)</span></span>
<span class="line"><span style="color:#E1E4E8;">        else:</span></span>
<span class="line"><span style="color:#E1E4E8;">            key+=c</span></span>
<span class="line"><span style="color:#E1E4E8;">    return</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stack=Stack()</span></span>
<span class="line"><span style="color:#24292E;">for c in conteng:</span></span>
<span class="line"><span style="color:#24292E;">    if c in content:</span></span>
<span class="line"><span style="color:#24292E;">        key=&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    else c is &quot;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        if &quot;/&quot; in key:</span></span>
<span class="line"><span style="color:#24292E;">            #节点结束</span></span>
<span class="line"><span style="color:#24292E;">            stack.pop()</span></span>
<span class="line"><span style="color:#24292E;">        else:</span></span>
<span class="line"><span style="color:#24292E;">            #新节点</span></span>
<span class="line"><span style="color:#24292E;">            tree=Tree(key)</span></span>
<span class="line"><span style="color:#24292E;">            if root is None:</span></span>
<span class="line"><span style="color:#24292E;">                root=tree</span></span>
<span class="line"><span style="color:#24292E;">            else:</span></span>
<span class="line"><span style="color:#24292E;">                stack.top().children.append(tree)</span></span>
<span class="line"><span style="color:#24292E;">            stack.push(tree)</span></span>
<span class="line"><span style="color:#24292E;">        else:</span></span>
<span class="line"><span style="color:#24292E;">            key+=c</span></span>
<span class="line"><span style="color:#24292E;">    return</span></span></code></pre></div><br><p>当根节点出现时我们需要将其进行压栈，通过 stack.push 把当前的节点压入栈，根节点处理完之后，就到了 head 节点，这时就会进入 else 逻辑，它需要在原有 stack 中进行追加，因为 head 是 html 的子节点，所以这里我们使用 stack.top，top 可以获取栈顶的元素，获取到栈顶元素后，我们可以使用 children.append 方法对树的子节点进行添加，经过这样一步方法编写，head 就可以放到 html 里面了，以此类推。</p><br><p>什么时候需要弹栈呢，就是当 key 遇到一个 / 的时候，这时候 if 逻辑下的 pass 就变成了 stack.pop。</p><br><p>整个结构都处理完之后我们需要返回 root 节点，然后跑下测试用例验证逻辑是否正确。</p><br>`,26),u=s("br",null,null,-1),_=s("p",null,"这时报错，我们就需要去查找原因，我们可以看到测试用例需要一个 content，因为 create_from_string 是一个类方法，我已经传入了一个参数但是它提示还缺一个参数，原因在于 tree 结构有两个参数，第一个参数要传入一个类，从目前来看调用的方法里面，它使用的是 Tree 这个数据，也就是说你调用的参数的类型是不对的，那怎么办呢？我们对于使用类而不是实例直接进行调用时，需要将它改造成一个静态方法。",-1),g=s("br",null,null,-1),f=s("br",null,null,-1),q=s("p",null,"我们使用 classmethod 对 create_tree_string 进行注解，然后再使用一个 cls，我们将它改造成一个类方法。",-1),b=s("br",null,null,-1),v=s("br",null,null,-1),k=s("p",null,"处理完成之后我们运行 case，整个 case 完全可以通过，然后我们把打印逻辑的代码复制过来并打印下这个结构。",-1),m=s("br",null,null,-1),T=s("br",null,null,-1),A=s("p",null,"可以发现数据结构完全正确，到这里根据 html 数据生成多叉树的处理逻辑就全部讲完了。",-1),C=s("br",null,null,-1);function D(N,x,I,S,B,F){const n=o("Image");return t(),c("div",null,[i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIKAIsZ1AADAOtimqRs873.png"}),l(),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOAK2iIAADUdQhHwIQ158.png"}),l(),d,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIOAQQJnAADIUkZj7wg648.png"}),l(),y,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOASaR1AADIGqiGv1M869.png"}),l(),h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIOAFA6ZAAFGmXvabCo953.png"}),l(),u,_,g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOASL9dAADXKF9RsZk190.png"}),l(),f,q,b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIOAM3FBAAEkGsUFxqY064.png"}),l(),v,k,m,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOAdN7TAAEINwwXC50534.png"}),l(),T,A,C])}const O=e(r,[["render",D]]);export{V as __pageData,O as default};
