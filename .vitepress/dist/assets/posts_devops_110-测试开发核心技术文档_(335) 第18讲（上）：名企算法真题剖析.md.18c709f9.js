import{_ as l,j as p,o as t,g as o,k as a,h as n,Q as e,s as c}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"第18讲（上）：名企算法真题剖析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(335) 第18讲（上）：名企算法真题剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(335) 第18讲（上）：名企算法真题剖析.md","lastUpdated":1696417798000}'),r={name:"posts/devops/110-测试开发核心技术文档/(335) 第18讲（上）：名企算法真题剖析.md"},i=e(`<h1 id="第18讲-上-名企算法真题剖析" tabindex="-1">第18讲（上）：名企算法真题剖析 <a class="header-anchor" href="#第18讲-上-名企算法真题剖析" aria-label="Permalink to &quot;第18讲（上）：名企算法真题剖析&quot;">​</a></h1><p>本课时我们主要剖析名企算法真题，关于算法数据结构的考题，在面试中经常会被问到，这类考题考察了你的基础编程能力。</p><br><p>因为这一课时内容较多，我将分为上下两个课时来讲解，在课时上我们重点剖析数据结构中栈和链表的面试题。</p><br><p>关于数据结构的考题常见的类型可以分为栈结构、链表结构、树结构这三大类，当面试官提问这方面的问题时，不要着急给出答案，首先我们需要做好技术选型，然后分析问题给出合理解法。</p><br><p>在我们日常的工作中也经常会遇到一些数据结构，比如测试工作中的界面或者链接的跳转，白盒代码分析的分支路径，这些数据本身也是一种树结构，如果在工作中你能够熟练使用则会事半功倍，但如果你还不能熟练掌握，面试前就需要你临阵磨枪，加深印象。</p><br><p>这一课时我们主要通过栈结构、链表结构和树结构来讲解，同时通过这些问题培养你在面对一个新的问题时的解题思路，以便一通百通，轻松通过面试。</p><h2 id="栈考题" tabindex="-1">栈考题 <a class="header-anchor" href="#栈考题" aria-label="Permalink to &quot;栈考题&quot;">​</a></h2><p>首先，我们讲解关于栈结构的考题，这个栈结构的考试是这样的，判断字符串中 []{}() 是否完全配对出现，需要注意这里的考题和课时 15 的不太一样，前面的考题是给定一个字符串{xxx[xxx{xxx}]xx{x[xxx]xxx{xxx}xx}x}，判断其中的 {}[]() 是否成对出现。</p><br><p>在课时 15 中我们只需要判断是否能对出现就可以了，也就是说可以错位的，但是在这一课时添加了一个判断条件就是它们需要完全配对，也就是说顺序不能错。</p><br><p>我们看下示例，如果是 [{}] 这种情况就是 true，而如果是 [{]} 这种出现顺序错乱的情况就是 false，所以它比课时 15 的题目增加了一个难度，是有一个顺序约束的。</p><br><p>我们来看下这道题目的解题思路，虽然它有顺序约束，但是其他逻辑和前面的题目是一样的，前面我们使用堆栈解答，所以很明显涉及这类配对的题目特别适合使用堆栈来解答，所以本课时我们也使用堆栈来解答问题。</p><br><p>这道题比前面多了一个对顺序的要求，这类似于我们玩过的一款消消乐的游戏，每一个字符我都存储起来，当遍历下一个字符的时候首先判断是否与前面的配对，如果配对两者全部弹栈，如果不配对就进行压栈，最后确保整个栈是完整并且为空的，就表示字符串完全配对出现。</p><br><p>所以，这个时候我们的解法就需要调整一下，添加一个条件。接下来我们看下怎么去用代码实现，回到我们之前的代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_pattern(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.stack.pattern(&quot;[]&quot;) == True</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.stack.pattern(&quot;[{}]&quot;) == True</span></span>
<span class="line"><span style="color:#E1E4E8;">    ssert self.stack.pattern(&quot;[{()}]&quot;) == True</span></span>
<span class="line"><span style="color:#E1E4E8;">    ssert self.stack.pattern(&quot;[&quot;) == False</span></span>
<span class="line"><span style="color:#E1E4E8;">    ssert self.stack.pattern(&quot;[{]}&quot;) == False</span></span>
<span class="line"><span style="color:#E1E4E8;">    ssert self.stack.pattern(&quot;[{(})]&quot;) == False</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_pattern(self):</span></span>
<span class="line"><span style="color:#24292E;">    assert self.stack.pattern(&quot;[]&quot;) == True</span></span>
<span class="line"><span style="color:#24292E;">    assert self.stack.pattern(&quot;[{}]&quot;) == True</span></span>
<span class="line"><span style="color:#24292E;">    ssert self.stack.pattern(&quot;[{()}]&quot;) == True</span></span>
<span class="line"><span style="color:#24292E;">    ssert self.stack.pattern(&quot;[&quot;) == False</span></span>
<span class="line"><span style="color:#24292E;">    ssert self.stack.pattern(&quot;[{]}&quot;) == False</span></span>
<span class="line"><span style="color:#24292E;">    ssert self.stack.pattern(&quot;[{(})]&quot;) == False</span></span></code></pre></div><p>第一步我们编写一个 test_pattern 的测试用例，在这个测试用例里我们要求给定的数据要完全按照顺序配对出现，这时的 self.stack 就需要一个 pattern 方法，这个 pattern 方法中传入要测试的字符串。我们先写几个结果为 True 的用例，然后我们调换括号出现的顺序，补充三种 false 的情况，当然你还可以编写一些其他条件，比如内容为空时是 false 还是 true，这里我们主要介绍核心算法，就不写那么多异常数据了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def pattern(self,content:str)-&gt; bool:</span></span>
<span class="line"><span style="color:#E1E4E8;">    pass</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def pattern(self,content:str)-&gt; bool:</span></span>
<span class="line"><span style="color:#24292E;">    pass</span></span></code></pre></div><p>这个时候 pattern 方法还没有定义，在栈中还没有这个方法，此时我们就需要创建这个方法，在 Stack 类中添加一个新的 pattern 方法，然后给它传入一个字符串，这里需要给它做一个类型注解，然后返回一个布尔类型。</p><br><p>然后，我们就可以跑 case 了，运行一下，当然此时这个 case 肯定是错的，我们遵循 TDD 风格，先写测试用例，然后不断地完善我们的方法直到 case 通过。</p><br><p>和以前一样，我们先取出来 content 里面的每一个字符，然后分别根据判断条件进行压栈和弹栈，而此时多了一个顺序的要求，我们的判断条件就需要做一些调整。我们看下怎么去调整，首先判断新的字符是否和前面的字符有配对关系，前面的字符我们可以使用一个栈来保存，如果没有配对成功就压栈，如果配对成功就弹栈。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def pattern(self,content:str)-&gt;bool:</span></span>
<span class="line"><span style="color:#E1E4E8;">    for c in content:</span></span>
<span class="line"><span style="color:#E1E4E8;">         if self._data[-1]+c in [&#39;[]&#39;,&#39;{}&#39;,&#39;()&#39;]:</span></span>
<span class="line"><span style="color:#E1E4E8;">             self.pop()</span></span>
<span class="line"><span style="color:#E1E4E8;">         else:</span></span>
<span class="line"><span style="color:#E1E4E8;">             self.push(c)</span></span>
<span class="line"><span style="color:#E1E4E8;">         return self.get_size() == 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def pattern(self,content:str)-&gt;bool:</span></span>
<span class="line"><span style="color:#24292E;">    for c in content:</span></span>
<span class="line"><span style="color:#24292E;">         if self._data[-1]+c in [&#39;[]&#39;,&#39;{}&#39;,&#39;()&#39;]:</span></span>
<span class="line"><span style="color:#24292E;">             self.pop()</span></span>
<span class="line"><span style="color:#24292E;">         else:</span></span>
<span class="line"><span style="color:#24292E;">             self.push(c)</span></span>
<span class="line"><span style="color:#24292E;">         return self.get_size() == 0</span></span></code></pre></div><p>首先，通过 if 判断语句与栈顶的数据进行配对，也就是假设 self.data 假设它的最后的字符 + c 是不是配对，我们可以用这个方法判断在几个可选的条件里，它们的 组合是否符合完全配对的条件，如果符合这个时候就需要弹栈，也就是 self.pop，如果不符合就通过 self.push 进行压栈。</p><br><p>然后我们 return 一个 self.get_size 是否等于 0 来判断栈是否为空。这样我们就完成了第一个方法，当然这段代码肯定有各种各样的 bug，我们先运行一遍，发现问题解决问题，直到测试用例符合我们的预期。</p>`,34),d=e(`<p>我们先看第一步报错，显示 list index out of range，为什么会出现这个报错呢？是因为我们的数据一开始是空的，当 index 为 -1 肯定不行，数据为空抛出异常，这个时候我们就需要添加一个条件判断，如果栈一开始没有数据，我们不能直接使用这个方法，这时我们可以添加一个方法并进行封装。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def top(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    if self._data:</span></span>
<span class="line"><span style="color:#E1E4E8;">        return self._data[-1]</span></span>
<span class="line"><span style="color:#E1E4E8;">    else:</span></span>
<span class="line"><span style="color:#E1E4E8;">         return None</span></span>
<span class="line"><span style="color:#E1E4E8;">def pattern(self,content:str)-&gt;bool:</span></span>
<span class="line"><span style="color:#E1E4E8;">    for c in content:</span></span>
<span class="line"><span style="color:#E1E4E8;">        if self.top() + c in [&#39;[]&#39;,&#39;{}&#39;,&#39;()&#39;]:</span></span>
<span class="line"><span style="color:#E1E4E8;">            self.pop()</span></span>
<span class="line"><span style="color:#E1E4E8;">        slse:</span></span>
<span class="line"><span style="color:#E1E4E8;">            self.push(c)</span></span>
<span class="line"><span style="color:#E1E4E8;">    return self.get_size() ==0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def top(self):</span></span>
<span class="line"><span style="color:#24292E;">    if self._data:</span></span>
<span class="line"><span style="color:#24292E;">        return self._data[-1]</span></span>
<span class="line"><span style="color:#24292E;">    else:</span></span>
<span class="line"><span style="color:#24292E;">         return None</span></span>
<span class="line"><span style="color:#24292E;">def pattern(self,content:str)-&gt;bool:</span></span>
<span class="line"><span style="color:#24292E;">    for c in content:</span></span>
<span class="line"><span style="color:#24292E;">        if self.top() + c in [&#39;[]&#39;,&#39;{}&#39;,&#39;()&#39;]:</span></span>
<span class="line"><span style="color:#24292E;">            self.pop()</span></span>
<span class="line"><span style="color:#24292E;">        slse:</span></span>
<span class="line"><span style="color:#24292E;">            self.push(c)</span></span>
<span class="line"><span style="color:#24292E;">    return self.get_size() ==0</span></span></code></pre></div><p>我们添加一个 top 方法，然后在 top 方法判断当前 self.data 是否有值，如果有值就返回当前的数值，如果为空就返回 None。</p>`,3),E=c("p",null,"这时肯定也是有异常的，提示这两个类型不匹配，我们可以将 None 改为 ''，还可以使用格式化的字符来解决这个问题。",-1),y=e(`<p>我们先使用第一种解决方式，编写并运行，这次比较顺利立马就通过了。</p><h2 id="链表考题" tabindex="-1">链表考题 <a class="header-anchor" href="#链表考题" aria-label="Permalink to &quot;链表考题&quot;">​</a></h2><p>我们接下来剖析链表的考题，这里需要你创建一个有序的链表，并做有序的数据插入。此时这个链表可能是有值的也有可能为空的，当我们再插入一个新的值的时候，这个值需要和链表中其他数据有一个顺序，比如从小到大，也就是比如说我有一个 1、5 的链表，接下来插入 2、3、4，它能够按照 1、2、3、4、5 的顺序进行插入并排序，并一直维护这个有序链表。这也是一个链表的经典考题，接下来我们看下如何解答这个考题。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_link_sort(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link = LinkNode()</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link.order(1).order(5).order(3).order(2).order(4)</span></span>
<span class="line"><span style="color:#E1E4E8;">    list_data = .[i.data for i in self.link.travel()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(list_data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert list_data == sorted(list_data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link.append(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    list_data = [i.data for i in self.link.travel()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(list_data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert list_data != sorted(list_data)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_link_sort(self):</span></span>
<span class="line"><span style="color:#24292E;">    self.link = LinkNode()</span></span>
<span class="line"><span style="color:#24292E;">    self.link.order(1).order(5).order(3).order(2).order(4)</span></span>
<span class="line"><span style="color:#24292E;">    list_data = .[i.data for i in self.link.travel()]</span></span>
<span class="line"><span style="color:#24292E;">    print(list_data)</span></span>
<span class="line"><span style="color:#24292E;">    assert list_data == sorted(list_data)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    self.link.append(1)</span></span>
<span class="line"><span style="color:#24292E;">    list_data = [i.data for i in self.link.travel()]</span></span>
<span class="line"><span style="color:#24292E;">    print(list_data)</span></span>
<span class="line"><span style="color:#24292E;">    assert list_data != sorted(list_data)</span></span></code></pre></div><p>首先，我们编写一个测试用例，和前面的 case 差不多，假设此时新增一个 order 方法，order 方法首先创建一个链表，在这个链表中插入 1、5、3、2、4，并打印链表。</p><br><p>然后，我们需要对链表进行一个排序，把 1、5、3、2、4 排序成 1、2、3、4、5，最后断言链表是不是和期望的序列是一样的，如果说排序也一样就符合我们的预期。</p><br><p>最后，我们编写一个错误的用例，校验故意插入错误的数值，通过 append 在尾部追加一个 1，这样顺序就不对了，并不是严格按照顺序进行排序的，这个时候 case 运行失败。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_order(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link = LinkNode(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link.order(5).order(3).order(2).order(4)</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.link.data == [1,2,3,4,5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_order(self):</span></span>
<span class="line"><span style="color:#24292E;">    self.link = LinkNode(1)</span></span>
<span class="line"><span style="color:#24292E;">    self.link.order(5).order(3).order(2).order(4)</span></span>
<span class="line"><span style="color:#24292E;">    assert self.link.data == [1,2,3,4,5]</span></span></code></pre></div><p>这是一个小的示例，接下来我们找到以前的代码自己实现功能，我们创建一个 test_order 的新的测试用例，然后在测试用例中创建一个 link 链表，这个链表赋值为 LinkNode(1)，然后再往后面插入对应的数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def order(self,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">    return self</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def order(self,data):</span></span>
<span class="line"><span style="color:#24292E;">    return self</span></span></code></pre></div><p>我们添加一个新的 order 方法，并给定一个数据 data，并希望它能够返回，然后在 order 中插入 1、5、3、2、4，这样插入之后最后我们希望能够得到从小到大排序的链表。</p><br><p>就需要为原有的链表追加一个方法，也就是 self.link.data 能够等于一个确定好的排序，比如 1、2、3、4、5，当然目前这个case也是错的。</p>`,15),f=e(`<p>为什么呢，是因为现在这个链表 Actual 里面只有一个数据 1，这个时候我们需要追加一个方法把 data 中的所有数据转成链表。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item = self</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print(item.data)</span></span>
<span class="line"><span style="color:#E1E4E8;">        item = item.next</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self):</span></span>
<span class="line"><span style="color:#24292E;">    item = self</span></span>
<span class="line"><span style="color:#24292E;">    while item is not None:</span></span>
<span class="line"><span style="color:#24292E;">        print(item.data)</span></span>
<span class="line"><span style="color:#24292E;">        item = item.next</span></span></code></pre></div><p>我们看一下，以前的 travel 方法，首先将 item 等于 self，然后 item 如果不为空就一直遍历，直到把所有内容全部遍历一遍，但接下来我们需要链表能够和其它的数据结构进行对比分析，所以我们要求返回一个整体链表的数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def travel(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    item = self</span></span>
<span class="line"><span style="color:#E1E4E8;">    while item is not None</span></span>
<span class="line"><span style="color:#E1E4E8;">         yield item</span></span>
<span class="line"><span style="color:#E1E4E8;">         item = item.next</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def travel(self):</span></span>
<span class="line"><span style="color:#24292E;">    item = self</span></span>
<span class="line"><span style="color:#24292E;">    while item is not None</span></span>
<span class="line"><span style="color:#24292E;">         yield item</span></span>
<span class="line"><span style="color:#24292E;">         item = item.next</span></span></code></pre></div><p>我们现在需要对这个方法进行一个改造，我们仍使用 travel，我们知道 python 里面有一个数据生成器，生成器允许在 travel 里对 item 进行一个方法调用，我们通过 yield 对 item 进行调用，也就是说在遍历的过程中允许通过生成器使用 for-in 结构来遍历每一个数据，基于这样的原理我们添加了一行代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_order(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    self.link = LinkNode(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    self..link.order(5).order(3).order(2).order(4)</span></span>
<span class="line"><span style="color:#E1E4E8;">    link_data=[item.data for item in self.link.travel]</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.link == [1,2,3,4,5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_order(self):</span></span>
<span class="line"><span style="color:#24292E;">    self.link = LinkNode(1)</span></span>
<span class="line"><span style="color:#24292E;">    self..link.order(5).order(3).order(2).order(4)</span></span>
<span class="line"><span style="color:#24292E;">    link_data=[item.data for item in self.link.travel]</span></span>
<span class="line"><span style="color:#24292E;">    assert self.link == [1,2,3,4,5]</span></span></code></pre></div><p>然后，在后面的逻辑中开始使用 self.link.travel 方法打印数据结构，这里我们借助于前面课时讲 Python 时使用的一个小技巧，令 link_data 等于 self.link.travel，这个方法叫作列表表达式，也就是使用 for item in 生成一个列表，然后打印这个 link_data，并对其进行断言。</p><br><p>有了 travel 方法之后就可以很好的与预期的数据顺序进行对比了，通过这一步改造之后我们去实现 order，order 本身需要往里面追加数据，所以我们先看下 insert 方法，因为它和 insert 方法的逻辑很像。</p><br><p>我们看下具体代码怎么写，首先逻辑是一样的，也就是 for item is not None，然后不断地进行遍历，遍历的过程中因为没有 pos，所以我们需要自己去寻找这个位置，这时就需要借助 travel 方法了，在 travel 方法中对每一个 item 进行查找，这样我们可以拿 item 与每一个节点进行对比，直到符合条件进行插入。</p><br><p>我们来看下具体怎么写，首先使用 for item in self.travel 把链表的每个元素全都调用一遍，通过这个方法可以获得每一个节点。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def order(self,data):</span></span>
<span class="line"><span style="color:#E1E4E8;">    pre=self</span></span>
<span class="line"><span style="color:#E1E4E8;">    for item in self.travel():</span></span>
<span class="line"><span style="color:#E1E4E8;">        if data </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> item.data:</span></span>
<span class="line"><span style="color:#E1E4E8;">            break</span></span>
<span class="line"><span style="color:#E1E4E8;">        pre=item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def order(self,data):</span></span>
<span class="line"><span style="color:#24292E;">    pre=self</span></span>
<span class="line"><span style="color:#24292E;">    for item in self.travel():</span></span>
<span class="line"><span style="color:#24292E;">        if data </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> item.data:</span></span>
<span class="line"><span style="color:#24292E;">            break</span></span>
<span class="line"><span style="color:#24292E;">        pre=item</span></span></code></pre></div><p>到这里，我们开始对节点进行查找，直到当前的 data 比之前传入的 item 的 data 数据小时终止查找，终止条件为 break，终止之后当前的 item 假设最后一个数据是 5，现在传入的是 3，3 是小于 5 的，它是 5 之前的节点，需要放到 5 的前面。但是我们知道链表到了 5，但是 5 之前的数据是多少是不知道的，所以就需要在前面添加一个 pre 变量，保存之前遍历过的元素。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">node_new = LinkNode(data)</span></span>
<span class="line"><span style="color:#E1E4E8;">node_new.next = pre.next</span></span>
<span class="line"><span style="color:#E1E4E8;">pre.next = node_new</span></span>
<span class="line"><span style="color:#E1E4E8;">return self</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">node_new = LinkNode(data)</span></span>
<span class="line"><span style="color:#24292E;">node_new.next = pre.next</span></span>
<span class="line"><span style="color:#24292E;">pre.next = node_new</span></span>
<span class="line"><span style="color:#24292E;">return self</span></span></code></pre></div><p>接下来，通过 pre 在当前的节点进行插入，插入一个节点和以前的逻辑一样，首先创建一个节点，然后把当前节点的 next 指针等于 5 这个节点，然后定义一个新的节点 node.new 等于 LinkNode 并传入 data，最后让 node_next.nex 等于现在的 item，并让上一个节点 pre.next 等于 node_new，通过这样的方法节点就被正确的插入链表，然后运行 case。</p>`,17),_=e(`<p>我们可以看到得到了预期的结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">self.link.append(7).append(6)</span></span>
<span class="line"><span style="color:#E1E4E8;">link_data =[item.data for item in self.link.travel()]</span></span>
<span class="line"><span style="color:#E1E4E8;">assert link_data != [1,2,3,4,5,6,7]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">self.link.append(7).append(6)</span></span>
<span class="line"><span style="color:#24292E;">link_data =[item.data for item in self.link.travel()]</span></span>
<span class="line"><span style="color:#24292E;">assert link_data != [1,2,3,4,5,6,7]</span></span></code></pre></div><p>通过这个方法我们就可以发现使用order就可以很好的帮我们去维护这个有序的链表数据了。</p>`,3);function h(u,g,k,v,b,m){const s=p("Image");return t(),o("div",null,[i,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/73/CgpOIF470r-ASjlzAAL2-HzWbjI277.png"}),n(),d,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/74/Cgq2xl470r-ANICIAAOQgrpr9l8446.png"}),n(),E,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/73/CgpOIF470r-ACRiDAAHGQCT5II4290.png"}),n(),y,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/73/CgpOIF470r-ANMQEAALzFUdNppc735.png"}),n(),f,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/74/Cgq2xl470r-AbZj6AAGq631NcHM427.png"}),n(),_])}const T=l(r,[["render",h]]);export{C as __pageData,T as default};
