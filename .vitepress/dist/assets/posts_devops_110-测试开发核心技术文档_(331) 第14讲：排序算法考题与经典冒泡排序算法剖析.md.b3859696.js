import{_ as l,j as p,o as t,g as o,k as n,h as e,Q as s}from"./chunks/framework.4e7d56ce.js";const m=JSON.parse('{"title":"第14讲：排序算法考题与经典冒泡排序算法剖析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(331) 第14讲：排序算法考题与经典冒泡排序算法剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(331) 第14讲：排序算法考题与经典冒泡排序算法剖析.md","lastUpdated":1696417798000}'),i={name:"posts/devops/110-测试开发核心技术文档/(331) 第14讲：排序算法考题与经典冒泡排序算法剖析.md"},c=s('<h1 id="第14讲-排序算法考题与经典冒泡排序算法剖析" tabindex="-1">第14讲：排序算法考题与经典冒泡排序算法剖析 <a class="header-anchor" href="#第14讲-排序算法考题与经典冒泡排序算法剖析" aria-label="Permalink to &quot;第14讲：排序算法考题与经典冒泡排序算法剖析&quot;">​</a></h1><p>本课时我们主要讲解排序算法并剖析排序算法中经典的冒泡排序和选择排序。</p><br><p>虽然数据结构与算法在我们的工作中使用的并不是特别的多，但它考察了一个测试工程师或开发工程师的基本编程能力，所以它仍然是很多公司面试中的重要考察环节，而且在工作中也会部分用到这些基本的算法，比如我们需要遍历一些复杂的数据结构时，或是自动生成测试用例时都需要对一些复杂的数据结构进行排序。</p><br><p>如果你没有一定的算法和数据结构基础，便很难在日常工作中把代码写得特别好，所以数据结构与算法的知识仍然需要你投入精力去学习，接下来我们会分阶段逐步讲解这块内容，第一阶段我们首先学习经典的排序算法。</p><h2 id="常用排序算法" tabindex="-1">常用排序算法 <a class="header-anchor" href="#常用排序算法" aria-label="Permalink to &quot;常用排序算法&quot;">​</a></h2><p>首先，我们先来了解常用的排序算法，平时我们接触最多的是冒泡排序和选择排序，除此之外为了提高运算效率，人们还针对不同的使用场景发明了插入排序、快速排序、归并排序，等等。</p><br><p>说实话，最下面这一排排序算法我基本上也很少使用，只是在大学课程中学习过，在工作中经常使用的也是前面两个冒泡排序和选择排序，其他的相对而言用的比较少，面试中基本上考察测试工程师是否能够深入编程并了解数据结构，也只是通过一两个算法题来考察的，所以你只需要掌握冒泡排序和选择排序即可，如果你对其他排序算法感兴趣也可以自己课后学习研究。</p><h2 id="时间复杂度与空间复杂度" tabindex="-1">时间复杂度与空间复杂度 <a class="header-anchor" href="#时间复杂度与空间复杂度" aria-label="Permalink to &quot;时间复杂度与空间复杂度&quot;">​</a></h2><p>既然有这么多的算法，我们通过什么标准来区别算法的优劣呢？评估一个算法好坏主要有两个指标，一个是时间复杂度，一个是空间复杂度。</p><p>时间复杂度度量的是代码的性能，而空间复杂度度量的是存储空间的利用率，因为平时我们并不需要编写一些特别复杂的算法，所以空间复杂度一般都很小，这里就不再讲了，我们主要看下时间复杂度对算法性能的影响。</p><p>比如你的某个算法的时间复杂度是 O(1)，也就表示代码执行中没有任何循环；如果你的代码包含一个循环逻辑，代码反复执行那么这个时候时间复杂度就变成了 O(n)；如果你的循环里面，n 次执行的只是数据的一部分，我们的遍历越来越接近终点，那么这时时间复杂度便是 O(logn)；最后如果你的循环逻辑有两层，那么此时的时间复杂度就是 O(n^2)；如果是三层循环就是三次方，以此类推。</p><p>我们在这里只是简单了解算法的复杂度，面试中也偶尔会问到这些知识点，它们的完整解释你可以课后研究官方介绍，这里不再赘述，让我们直接进入代码层面来教你如何实现它。</p><h2 id="冒泡排序" tabindex="-1">冒泡排序 <a class="header-anchor" href="#冒泡排序" aria-label="Permalink to &quot;冒泡排序&quot;">​</a></h2><p>首先，我们通过一张动图来对冒泡排序的原理进行一个初步的了解。</p><br>',18),r=s(`<br><p>冒泡排序是怎么进行的呢？你会发现它会从开始逐一和下一个值进行比较，如果发现下一个值大于自己就调换下位置，以此类推，到最后便可以实现从小到大的排序，这便是冒泡排序的实现原理。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestSort;</span></span>
<span class="line"><span style="color:#E1E4E8;">    def setup(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.data = [3,1,5,2,4]</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.except_data = [1,2,3,4,5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestSort;</span></span>
<span class="line"><span style="color:#24292E;">    def setup(self):</span></span>
<span class="line"><span style="color:#24292E;">        self.data = [3,1,5,2,4]</span></span>
<span class="line"><span style="color:#24292E;">        self.except_data = [1,2,3,4,5]</span></span></code></pre></div><p>我们通过动图已经了解了冒泡排序的原理，接下来我们来编写一个冒泡排序算法，首先我们创建一个 TestSort 的测试用例，并在测试用例中创建一个 TestSort 的测试类，然后给定一个 setup 数据，setup 数据会在每个 case 执行之前生成一组数据，比如我们使用 self.data=[3,1,5,2,4]，这个数据排完序的期望值 self.except_data=[1,2,3,4,5]，这样我们的初始数据就有了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def bubble_sort(self,data:list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    return data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def bubble_sort(self,data:list):</span></span>
<span class="line"><span style="color:#24292E;">    return data</span></span></code></pre></div><p>接下来，我们开始编写一个 bubble_sort 的冒泡排序算法，首先给它传入一个列表变量，这里直接使用上面给定的数据，Python 的新版本支持 data:list 这样的类型修饰，有了原始数据之后我们就可以开始对它进行排序。这里直接 return 一个 data，也就是传进来一个数据排序完之后直接 return 出去。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def test_bubble(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.eexpect_data == self.bubble_sort(self.data)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def test_bubble(self):</span></span>
<span class="line"><span style="color:#24292E;">    assert self.eexpect_data == self.bubble_sort(self.data)</span></span></code></pre></div><p>然后我们先运行验证一下，这时 case 肯定是运行失败的。</p>`,8),d=s(`<br><p>这是因为我们还没有对数据进行排序，接下来我们就编写具体的冒泡排序算法，我们编写算法遵循业内知名的 TDD 风格，也就是先写出目标，以及如何进行断言、单元测试，然后写怎样实现。冒泡排序首先要求第一个位置的数据不断和下一个数据进行对比，如果谁大谁就放在后面，然后继续和后面的元素进行比较。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def bubble_sort(self,data:list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    size = len(data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    for i in range(size):</span></span>
<span class="line"><span style="color:#E1E4E8;">        for j in range(size - i - 1):</span></span>
<span class="line"><span style="color:#E1E4E8;">            if data[j] &gt; data[j + 1]:</span></span>
<span class="line"><span style="color:#E1E4E8;">                data[j],data[j + 1] = data[j + 1],data[j]</span></span>
<span class="line"><span style="color:#E1E4E8;">     return data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def bubble_sort(self,data:list):</span></span>
<span class="line"><span style="color:#24292E;">    size = len(data)</span></span>
<span class="line"><span style="color:#24292E;">    for i in range(size):</span></span>
<span class="line"><span style="color:#24292E;">        for j in range(size - i - 1):</span></span>
<span class="line"><span style="color:#24292E;">            if data[j] &gt; data[j + 1]:</span></span>
<span class="line"><span style="color:#24292E;">                data[j],data[j + 1] = data[j + 1],data[j]</span></span>
<span class="line"><span style="color:#24292E;">     return data</span></span></code></pre></div><p>首先编写外层循环，外层循环就是遍历刚才给定的整个列表，它会对列表中的每个元素进行遍历，一旦拿到列表中的每个元素后我们需要做什么呢？这个时候就需要内层循环去对比两个相邻数据的大小并把大的数据放在后面，这里需要注意内层循环的遍历范围为 size - i - 1，也就是表示已经排序好的数据就不用再遍历了，只需要遍历未排序的数据即可。</p><br><p>对比完大小后需要调换位置，在调换两个数据位置时首先通过 if 语句判断两个数据的大小，如果前面的数据大于后面的数据就调换位置，这里通过 Python 提供的一个简单方法就可以快速实现两个数据的调换，我们运行测试用例可以发现 case 通过，也就是我们排序完的值符合预期值。</p><h2 id="选择排序" tabindex="-1">选择排序 <a class="header-anchor" href="#选择排序" aria-label="Permalink to &quot;选择排序&quot;">​</a></h2><p>接下来我们编写选择排序，选择排序我们也同样用一个动画来演示实现原理，首先我们找到最小的一个数值，然后依次和后面的进行对比，比如我们认为最左侧的值最小，并将它与后面的值依次进行对比，一旦确定哪个数据是最小的就把那个数值放在最前面，然后开始对比第二小的值，以此类推。通过比较发现冒泡排序是两两对比的，而选择排序是依次进行比较直到找到本轮循环最小的值并把它放在最前面。</p><br>`,9),E=s(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def selection_sort(self,data:list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    return data</span></span>
<span class="line"><span style="color:#E1E4E8;">def test_selection(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.expect_data == self.selection_sort(self.data)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def selection_sort(self,data:list):</span></span>
<span class="line"><span style="color:#24292E;">    return data</span></span>
<span class="line"><span style="color:#24292E;">def test_selection(self):</span></span>
<span class="line"><span style="color:#24292E;">    assert self.expect_data == self.selection_sort(self.data)</span></span></code></pre></div><p>我们在冒泡排序下面再创建一个选择排序测试用例，和前面一样首先指定一组数据，因为还没有开始排序如果此时直接运行仍然是错误的，接下来我们来编写选择排序算法，选择排序的外循环基本上和冒泡排序是一样的，也需要将列表中的所有数据进行遍历，而内层循环逻辑则和冒泡排位完全不同，内层循环中关键是需要找到一条最大值或最小值和所有数据进行对比。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def selection_sort(self,data:list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    size = len(data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    for i in range(size):</span></span>
<span class="line"><span style="color:#E1E4E8;">        min_id = i</span></span>
<span class="line"><span style="color:#E1E4E8;">        for j in range(i + 1,size):</span></span>
<span class="line"><span style="color:#E1E4E8;">            if data[min_id] &gt; data[j]:</span></span>
<span class="line"><span style="color:#E1E4E8;">                min_id = j</span></span>
<span class="line"><span style="color:#E1E4E8;">                data[i],data[min_id]=data[min_id],data[i]</span></span>
<span class="line"><span style="color:#E1E4E8;">        return data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def selection_sort(self,data:list):</span></span>
<span class="line"><span style="color:#24292E;">    size = len(data)</span></span>
<span class="line"><span style="color:#24292E;">    for i in range(size):</span></span>
<span class="line"><span style="color:#24292E;">        min_id = i</span></span>
<span class="line"><span style="color:#24292E;">        for j in range(i + 1,size):</span></span>
<span class="line"><span style="color:#24292E;">            if data[min_id] &gt; data[j]:</span></span>
<span class="line"><span style="color:#24292E;">                min_id = j</span></span>
<span class="line"><span style="color:#24292E;">                data[i],data[min_id]=data[min_id],data[i]</span></span>
<span class="line"><span style="color:#24292E;">        return data</span></span></code></pre></div><p>我们先假设最左边的数据是最小的，然后拿它与列表中的每一个元素进行对比，如果对比出来一个最小的值，就记下这个数据，遍历完成之后调换位置，这样处理完成之后，再次执行测试用例，经过排序后能够得到预期的结果。</p><br><p>其实冒泡排序和选择排序是我们在日常工作中比较熟悉的，最重要的是理清楚排序的思想，弄清楚内层循环和外层循环都具体干了什么。</p><h2 id="为什么不用-sort" tabindex="-1">为什么不用 sort <a class="header-anchor" href="#为什么不用-sort" aria-label="Permalink to &quot;为什么不用 sort&quot;">​</a></h2><p>你可能会有疑问，既然前面的课时讲 Python 语言是测试行业的全民语言，那么它有没有提供自带的排序函数供我们直接使用呢？我们为什么不直接使用 Python 自带的函数呢？</p><br><p>其实 Python 给我们提供了两个 sort 方法可以直接进行排序，那我们为什么还需要去学习编写算法呢，这是因为 Python 提供的 sort 方法只能对简单的数据结构进行排序，而一旦我们的真实数据特别复杂，这时 Python 并没有提供很好的库来支持，这时就需要我们自己编写排序算法去计算一些复杂的数据对象，比如嵌套的数据结构。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def sort_list(self,data:list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    data.sort()</span></span>
<span class="line"><span style="color:#E1E4E8;">    return data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">def test_sort_list(list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.expect_data == self.sort_list(self.data)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def sort_list(self,data:list):</span></span>
<span class="line"><span style="color:#24292E;">    data.sort()</span></span>
<span class="line"><span style="color:#24292E;">    return data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">def test_sort_list(list):</span></span>
<span class="line"><span style="color:#24292E;">    assert self.expect_data == self.sort_list(self.data)</span></span></code></pre></div><p>虽然 Python 提供的 sort 方法不能解决复杂的数据结构，在这里我们仍然需要学习怎么使用它，首先我们定义一个方法并传入一个列表，然后使用 sort 方法直接对数据进行排序，需要注意的是 sort 方法是没有任何返回值的，它对数据直接进行排序，我们运行测试用例也可以发现测试通过。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def sorted_list(self,data:list):</span></span>
<span class="line"><span style="color:#E1E4E8;">    return sorted(data)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">def test_sorted_list(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    assert self.expect_data == self.sorted_list(self.data)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def sorted_list(self,data:list):</span></span>
<span class="line"><span style="color:#24292E;">    return sorted(data)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">def test_sorted_list(self):</span></span>
<span class="line"><span style="color:#24292E;">    assert self.expect_data == self.sorted_list(self.data)</span></span></code></pre></div><p>除了 sort 方法之外，Python 还有一个 sorted 方法，我们新建一个 sorted_list 方法并传入一个列表，sorted 与 sort 方法不同之处在于它对数据进行排序后会返回一个新的数据，你可以根据工作需要选择使用 sort 还是 sorted 方法，而当简单的 sort 方法没法解决我们工作中的问题时就需要我们自己来编写排序算法。</p>`,14);function _(h,f,y,g,u,b){const a=p("Image");return t(),o("div",null,[c,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/F1/Cgq2xl4UPMaAXukMAAVbfLJb7Aw855.gif"}),e(),r,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/F1/CgpOIF4UPMaAJC4dAAXmN4ty1bY174.png"}),e(),d,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/F1/Cgq2xl4UPMaAOUqTAActyig9kCs213.gif"}),e(),E])}const k=l(i,[["render",_]]);export{m as __pageData,k as default};
