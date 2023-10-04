import{_ as l,j as p,o as e,g as o,k as n,h as i,Q as a}from"./chunks/framework.e0c66c3f.js";const v=JSON.parse('{"title":"冒泡排序（Bubble Sort） ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(31) 第03讲：排序.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(31) 第03讲：排序.md","lastUpdated":1696338709000}'),t={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(31) 第03讲：排序.md"},c=a('<p>在前两节课里，我们学习了面试中常用的以及几个较为复杂的数据结构，它们是学好算法的基石。</p><p>算法学习其实是一种提高思维能力的过程。无论是学习算法，还是在面试或实际的工作、生活中，我们都会碰见一些从没遇到过的问题。解决方法也类似，先推敲最直观的解法，再对某个步骤进行优化。例如，讲前缀树的例题时，我们正是为了要提高匹配字符串的速度才借用了前缀树的。</p><p>从这节课开始，我们会将宝贵的时间、精力针对性地去学习面试中最常考的、最核心的算法。而这节课要学习的是排序算法，包括：</p><ol><li>基本的排序算法</li></ol><ul><li><p>冒泡排序（Bubble Sort）</p></li><li><p>插入排序（Insertion Sort）</p></li></ul><ol start="2"><li>常考的排序算法</li></ol><ul><li><p>归并排序（Merge Sort）</p></li><li><p>快速排序（Quick Sort）</p></li><li><p>拓扑排序（Topological Sort）</p></li></ul><ol start="3"><li>其他排序算法</li></ol><ul><li><p>堆排序（Heap Sort）</p></li><li><p>桶排序（Bucket Sort)</p></li></ul><p><strong>注意</strong>：</p><ol><li><p>冒泡排序和插入排序是最基础的，面试官有时候喜欢拿它们来考察你的基础知识，并且看看你能不能快速地写出没有 bug 的代码。</p></li><li><p>归并排序、快速排序和拓扑排序的思想是解决绝大部分涉及排序问题的关键，我们将在这节课里重点介绍它们。</p></li><li><p>堆排序和桶排序，本节课不作深入研究，但有时间的话一定要看看，尤其是桶排序，在一定的场合中（例如知道所有元素出现的范围时），能在线性的时间复杂度里解决战斗，掌握好它的解题思想能开阔解题思路。</p></li></ol><h3 id="冒泡排序-bubble-sort" tabindex="-1">冒泡排序（Bubble Sort） <a class="header-anchor" href="#冒泡排序-bubble-sort" aria-label="Permalink to &quot;冒泡排序（Bubble Sort）&quot;">​</a></h3><h4 id="基本思想" tabindex="-1">基本思想 <a class="header-anchor" href="#基本思想" aria-label="Permalink to &quot;基本思想&quot;">​</a></h4><p>给定一个数组，我们把数组里的元素通通倒入到水池中，这些元素将通过相互之间的比较，按照大小顺序一个一个地像气泡一样浮出水面。</p><h4 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h4><p>每一轮，从杂乱无章的数组头部开始，每两个元素比较大小并进行交换，直到这一轮当中最大或最小的元素被放置在数组的尾部，然后不断地重复这个过程，直到所有元素都排好位置。其中，核心操作就是元素相互比较。</p><h4 id="例题分析" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析" aria-label="Permalink to &quot;例题分析&quot;">​</a></h4><p>给定数组 [2, 1, 7, 9, 5, 8]，要求按照从左到右、从小到大的顺序进行排序。</p><h4 id="解题思路" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路" aria-label="Permalink to &quot;解题思路&quot;">​</a></h4><p>从左到右依次冒泡，把较大的数往右边挪动即可。</p>',20),r=a(`<ol><li><p>首先指针指向第一个数，比较第一个数和第二个数的大小，由于 2 比 1 大，所以两两交换，[1, 2, 7, 9, 5, 8]。</p></li><li><p>接下来指针往前移动一步，比较 2 和 7，由于 2 比 7 小，两者保持不动，[1, 2, 7, 9, 5, 8]。到目前为止，7 是最大的那个数。</p></li><li><p>指针继续往前移动，比较 7 和 9，由于 7 比 9 小，两者保持不动，[1, 2, 7, 9, 5, 8]。现在，9 变成了最大的那个数。</p></li><li><p>再往后，比较 9 和 5，很明显，9 比 5 大，交换它们的位置，[1, 2, 7, 5, 9, 8]。</p></li><li><p>最后，比较 9 和 8，9 比 8 大，交换它们的位置，[1, 2, 7, 5, 8, 9]。经过第一轮的两两比较，9 这个最大的数就像冒泡一样冒到了数组的最后面。</p></li></ol><p>接下来进行第二轮的比较，把指针重新指向第一个元素，重复上面的操作，最后，数组变成了：[1, 2, 5, 7, 8, 9]。</p><p>在进行新一轮的比较中，判断一下在上一轮比较的过程中有没有发生两两交换，如果一次交换都没有发生，就证明其实数组已经排好序了。</p><h4 id="代码示例" tabindex="-1">代码示例 <a class="header-anchor" href="#代码示例" aria-label="Permalink to &quot;代码示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void sort(int[] nums) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    //定义一个布尔变量 hasChange，用来标记每轮遍历中是否发生了交换</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean hasChange = true; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    //每轮遍历开始，将 hasChange 设置为 false</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums.length - 1 &amp;&amp; hasChange; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hasChange = false;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        //进行两两比较，如果发现当前的数比下一个数还大，那么就交换这两个数，同时记录一下有交换发生</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums.length - 1 - i; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (nums[j] &gt; nums[j + 1]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                swap(nums, j, j + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">                hasChange = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void sort(int[] nums) {</span></span>
<span class="line"><span style="color:#24292E;">    //定义一个布尔变量 hasChange，用来标记每轮遍历中是否发生了交换</span></span>
<span class="line"><span style="color:#24292E;">    boolean hasChange = true; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    //每轮遍历开始，将 hasChange 设置为 false</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums.length - 1 &amp;&amp; hasChange; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        hasChange = false;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        //进行两两比较，如果发现当前的数比下一个数还大，那么就交换这两个数，同时记录一下有交换发生</span></span>
<span class="line"><span style="color:#24292E;">        for (int j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums.length - 1 - i; j++) {</span></span>
<span class="line"><span style="color:#24292E;">            if (nums[j] &gt; nums[j + 1]) {</span></span>
<span class="line"><span style="color:#24292E;">                swap(nums, j, j + 1);</span></span>
<span class="line"><span style="color:#24292E;">                hasChange = true;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div><h3 id="算法分析" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><h4 id="空间复杂度" tabindex="-1"><strong>空间复杂度</strong> <a class="header-anchor" href="#空间复杂度" aria-label="Permalink to &quot;**空间复杂度**&quot;">​</a></h4><p>假设数组的元素个数是 n，由于在整个排序的过程中，我们是直接在给定的数组里面进行元素的两两交换，所以空间复杂度是 O(1)。</p><h4 id="时间复杂度" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h4><ol><li>给定的数组按照顺序已经排好</li></ol><p>在这种情况下，我们只需要进行 n−1 次的比较，两两交换次数为 0，时间复杂度是 O(n)。这是最好的情况。</p><ol start="2"><li>给定的数组按照逆序排列</li></ol><p>在这种情况下，我们需要进行 n(n-1)/2 次比较，时间复杂度是 O(n^2^)。这是最坏的情况。</p><ol start="3"><li>给定的数组杂乱无章</li></ol><p>在这种情况下，平均时间复杂度是 O(n^2^)。</p><p>由此可见，冒泡排序的时间复杂度是 O(n^2^)。它是一种稳定的排序算法。（稳定是指如果数组里两个相等的数，那么排序前后这两个相等的数的相对位置保持不变。）</p><h3 id="插入排序-insertion-sort" tabindex="-1">插入排序（Insertion Sort） <a class="header-anchor" href="#插入排序-insertion-sort" aria-label="Permalink to &quot;插入排序（Insertion Sort）&quot;">​</a></h3><h4 id="基本思想-1" tabindex="-1">基本思想 <a class="header-anchor" href="#基本思想-1" aria-label="Permalink to &quot;基本思想&quot;">​</a></h4><p>不断地将尚未排好序的数插入到已经排好序的部分。</p><h4 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h4><p>在冒泡排序中，经过每一轮的排序处理后，数组后端的数是排好序的；而对于插入排序来说，经过每一轮的排序处理后，数组前端的数都是排好序的。</p><h4 id="例题分析-1" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析-1" aria-label="Permalink to &quot;例题分析&quot;">​</a></h4><p>对数组 [2, 1, 7, 9, 5, 8] 进行插入排序。</p><h4 id="解题思路-1" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-1" aria-label="Permalink to &quot;解题思路&quot;">​</a></h4><p>首先将数组分成左右两个部分，左边是已经排好序的部分，右边是还没有排好序的部分，刚开始，左边已排好序的部分只有第一个元素 2。接下来，我们对右边的元素一个一个进行处理，将它们放到左边。</p>`,25),E=a(`<ol><li><p>先来看 1，由于 1 比 2 小，需要将 1 插入到 2 的前面，做法很简单，两两交换位置即可，[1, 2, 7, 9, 5, 8]。</p></li><li><p>然后，我们要把 7 插入到左边的部分，由于 7 已经比 2 大了，表明它是目前最大的元素，保持位置不变，[1, 2, 7, 9, 5, 8]。</p></li><li><p>同理，9 也不需要做位置变动，[1, 2, 7, 9, 5, 8]。</p></li><li><p>接下来，如何把 5 插入到合适的位置。首先比较 5 和 9，由于 5 比 9 小，两两交换，[1, 2, 7, 5, 9, 8]，继续，由于 5 比 7 小，两两交换，[1, 2, 5, 7, 9, 8]，最后，由于 5 比 2 大，此轮结束。</p></li><li><p>最后一个数是 8，由于 8 比 9 小，两两交换，[1, 2, 5, 7, 8, 9]，再比较 7 和 8，发现 8 比 7 大，此轮结束。到此，插入排序完毕。</p></li></ol><h4 id="代码示例-1" tabindex="-1">代码示例 <a class="header-anchor" href="#代码示例-1" aria-label="Permalink to &quot;代码示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void sort(int[] nums) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 将数组的第一个元素当作已经排好序的，从第二个元素，即 i 从 1 开始遍历数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 1, j, current; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 外围循环开始，把当前 i 指向的值用 current 保存</span></span>
<span class="line"><span style="color:#E1E4E8;">        current = nums[i];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 指针 j 内循环，和 current 值比较，若 j 所指向的值比 current 值大，则该数右移一位</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (j = i - 1; j &gt;= 0 &amp;&amp; nums[j] &gt; current; j--) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            nums[j + 1] = nums[j];</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 内循环结束，j+1 所指向的位置就是 current 值插入的位置</span></span>
<span class="line"><span style="color:#E1E4E8;">        nums[j + 1] = current;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void sort(int[] nums) {</span></span>
<span class="line"><span style="color:#24292E;">    // 将数组的第一个元素当作已经排好序的，从第二个元素，即 i 从 1 开始遍历数组</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 1, j, current; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        // 外围循环开始，把当前 i 指向的值用 current 保存</span></span>
<span class="line"><span style="color:#24292E;">        current = nums[i];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 指针 j 内循环，和 current 值比较，若 j 所指向的值比 current 值大，则该数右移一位</span></span>
<span class="line"><span style="color:#24292E;">        for (j = i - 1; j &gt;= 0 &amp;&amp; nums[j] &gt; current; j--) {</span></span>
<span class="line"><span style="color:#24292E;">            nums[j + 1] = nums[j];</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // 内循环结束，j+1 所指向的位置就是 current 值插入的位置</span></span>
<span class="line"><span style="color:#24292E;">        nums[j + 1] = current;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="算法分析-1" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-1" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><h4 id="空间复杂度-1" tabindex="-1">空间复杂度 <a class="header-anchor" href="#空间复杂度-1" aria-label="Permalink to &quot;空间复杂度&quot;">​</a></h4><p>假设数组的元素个数是 n，由于在整个排序的过程中，是直接在给定的数组里面进行元素的两两交换，空间复杂度是 O(1)。</p><h4 id="时间复杂度-1" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-1" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h4><ol><li>给定的数组按照顺序已经排好</li></ol><p>只需要进行 n-1 次的比较，两两交换次数为 0，时间复杂度是 O(n)。这是最好的情况。</p><ol start="2"><li>给定的数组按照逆序排列</li></ol><p>在这种情况下，我们需要进行 n(n-1)/2 次比较，时间复杂度是 O(n^2^)。这是最坏的情况。</p><ol start="3"><li>给定的数组杂乱无章</li></ol><p>在这种情况下，平均时间复杂度是 O(n^2^)。</p><p>由此可见，和冒泡排序一样，插入排序的时间复杂度是 O(n^2^)，并且它也是一种稳定的排序算法。</p><p><strong>建议</strong>：LeetCode 第 147 题，要求对一个链表进行插入排序，希望大家去试一试。</p><h3 id="归并排序-merge-sort" tabindex="-1">归并排序（Merge Sort） <a class="header-anchor" href="#归并排序-merge-sort" aria-label="Permalink to &quot;归并排序（Merge Sort）&quot;">​</a></h3><h4 id="基本思想-2" tabindex="-1">基本思想 <a class="header-anchor" href="#基本思想-2" aria-label="Permalink to &quot;基本思想&quot;">​</a></h4><p>核心是分治，就是把一个复杂的问题分成两个或多个相同或相似的子问题，然后把子问题分成更小的子问题，直到子问题可以简单的直接求解，最原问题的解就是子问题解的合并。归并排序将分治的思想体现得淋漓尽致。</p><h4 id="实现-1" tabindex="-1">实现 <a class="header-anchor" href="#实现-1" aria-label="Permalink to &quot;实现&quot;">​</a></h4><p>一开始先把数组从中间划分成两个子数组，一直递归地把子数组划分成更小的子数组，直到子数组里面只有一个元素，才开始排序。</p><p>排序的方法就是按照大小顺序合并两个元素，接着依次按照递归的返回顺序，不断地合并排好序的子数组，直到最后把整个数组的顺序排好。</p><h4 id="代码示例-2" tabindex="-1">代码示例 <a class="header-anchor" href="#代码示例-2" aria-label="Permalink to &quot;代码示例&quot;">​</a></h4><p>主体函数的代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void sort(int[] A, int lo, int hi) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 判断是否只剩下最后一个元素</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (lo &gt;= hi) return;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  // 从中间将数组分成两个部分</span></span>
<span class="line"><span style="color:#E1E4E8;">  int mid = lo + (hi - lo) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  // 分别递归地将左右两半排好序</span></span>
<span class="line"><span style="color:#E1E4E8;">  sort(A, lo, mid);</span></span>
<span class="line"><span style="color:#E1E4E8;">  sort(A, mid + 1, hi);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  // 将排好序的左右两半合并  </span></span>
<span class="line"><span style="color:#E1E4E8;">  merge(A, lo, mid, hi);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void sort(int[] A, int lo, int hi) {</span></span>
<span class="line"><span style="color:#24292E;">  // 判断是否只剩下最后一个元素</span></span>
<span class="line"><span style="color:#24292E;">  if (lo &gt;= hi) return;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  // 从中间将数组分成两个部分</span></span>
<span class="line"><span style="color:#24292E;">  int mid = lo + (hi - lo) / 2;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  // 分别递归地将左右两半排好序</span></span>
<span class="line"><span style="color:#24292E;">  sort(A, lo, mid);</span></span>
<span class="line"><span style="color:#24292E;">  sort(A, mid + 1, hi);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  // 将排好序的左右两半合并  </span></span>
<span class="line"><span style="color:#24292E;">  merge(A, lo, mid, hi);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>归并操作的代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void merge(int[] nums, int lo, int mid, int hi) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 复制一份原来的数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    int[] copy = nums.clone();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个 k 指针表示从什么位置开始修改原来的数组，i 指针表示左半边的起始位置，j 表示右半边的起始位置</span></span>
<span class="line"><span style="color:#E1E4E8;">    int k = lo, i = lo, j = mid + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (k </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= hi) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (i &gt; mid) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            nums[k++] = copy[j++];</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else if (j &gt; hi) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          nums[k++] = copy[i++];</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else if (copy[j] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> copy[i]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          nums[k++] = copy[j++];</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">          nums[k++] = copy[i++];</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void merge(int[] nums, int lo, int mid, int hi) {</span></span>
<span class="line"><span style="color:#24292E;">    // 复制一份原来的数组</span></span>
<span class="line"><span style="color:#24292E;">    int[] copy = nums.clone();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个 k 指针表示从什么位置开始修改原来的数组，i 指针表示左半边的起始位置，j 表示右半边的起始位置</span></span>
<span class="line"><span style="color:#24292E;">    int k = lo, i = lo, j = mid + 1;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (k </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= hi) {</span></span>
<span class="line"><span style="color:#24292E;">        if (i &gt; mid) {</span></span>
<span class="line"><span style="color:#24292E;">            nums[k++] = copy[j++];</span></span>
<span class="line"><span style="color:#24292E;">        } else if (j &gt; hi) {</span></span>
<span class="line"><span style="color:#24292E;">          nums[k++] = copy[i++];</span></span>
<span class="line"><span style="color:#24292E;">        } else if (copy[j] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> copy[i]) {</span></span>
<span class="line"><span style="color:#24292E;">          nums[k++] = copy[j++];</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">          nums[k++] = copy[i++];</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其中，While 语句比较，一共可能会出现四种情况。</p><ul><li><p>左半边的数都处理完毕，只剩下右半边的数，只需要将右半边的数逐个拷贝过去。</p></li><li><p>右半边的数都处理完毕，只剩下左半边的数，只需要将左半边的数逐个拷贝过去就好。</p></li><li><p>右边的数小于左边的数，将右边的数拷贝到合适的位置，j 指针往前移动一位。</p></li><li><p>左边的数小于右边的数，将左边的数拷贝到合适的位置，i 指针往前移动一位。</p></li></ul><h4 id="例题分析-2" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析-2" aria-label="Permalink to &quot;例题分析&quot;">​</a></h4><p>例题：利用归并排序算法对数组 [2, 1, 7, 9, 5, 8] 进行排序。</p><h4 id="解题思路-2" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-2" aria-label="Permalink to &quot;解题思路&quot;">​</a></h4>`,31),h=a("<p>首先不断地对数组进行切分，直到各个子数组里只包含一个元素。</p><p>接下来递归地按照大小顺序合并切分开的子数组，递归的顺序和二叉树里的前向遍历类似。</p><ol><li><p>合并 [2] 和 [1] 为 [1, 2]。</p></li><li><p>子数组 [1, 2] 和 [7] 合并。</p></li><li><p>右边，合并 [9] 和 [5]。</p></li><li><p>然后合并 [5, 9] 和 [8]。</p></li><li><p>最后合并 [1, 2, 7] 和 [5, 8, 9] 成 [1, 2, 5, 8, 9]，就可以把整个数组排好序了。</p></li></ol><p>合并数组 [1, 2, 7] 和 [5, 8, 9] 的操作步骤如下。</p>",4),y=a('<ol><li><p>把数组 [1, 2, 7] 用 L 表示，[5, 8, 9] 用 R 表示。</p></li><li><p>合并的时候，开辟分配一个新数组 T 保存结果，数组大小应该是两个子数组长度的总和</p></li><li><p>然后下标 i、j、k 分别指向每个数组的起始点。</p></li><li><p>接下来，比较下标i和j所指向的元素 L[i] 和 R[j]，按照大小顺序放入到下标 k 指向的地方，1 小于 5。</p></li><li><p>移动 i 和 k，继续比较 L[i] 和 R[j]，2 比 5 小。</p></li><li><p>i 和 k 继续往前移动，5 比 7 小。</p></li><li><p>移动 j 和 k，继续比较 L[i] 和 R[j]，7 比 8 小。</p></li><li><p>这时候，左边的数组已经处理完毕，直接将右边数组剩余的元素放到结果数组里就好。</p></li></ol><p>合并之所以能成功，先决条件必须是两个子数组都已经分别排好序了。</p><h3 id="算法分析-2" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-2" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><h4 id="空间复杂度-2" tabindex="-1">空间复杂度 <a class="header-anchor" href="#空间复杂度-2" aria-label="Permalink to &quot;空间复杂度&quot;">​</a></h4><p>由于合并 n 个元素需要分配一个大小为 n 的额外数组，合并完成之后，这个数组的空间就会被释放，所以算法的空间复杂度就是 O(n)。归并排序也是稳定的排序算法。</p><h4 id="时间复杂度-2" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-2" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h4><p>归并算法是一个不断递归的过程。</p><p><strong>举例</strong>：数组的元素个数是 n，时间复杂度是 T(n) 的函数。</p><p><strong>解法</strong>：把这个规模为 n 的问题分成两个规模分别为 n/2 的子问题，每个子问题的时间复杂度就是 T(n/2)，那么两个子问题的复杂度就是 2×T(n/2)。当两个子问题都得到了解决，即两个子数组都排好了序，需要将它们合并，一共有 n 个元素，每次都要进行最多 n-1 次的比较，所以合并的复杂度是 O(n)。由此我们得到了递归复杂度公式：T(n) = 2×T(n/2) + O(n)。</p><p>对于公式求解，不断地把一个规模为 n 的问题分解成规模为 n/2 的问题，一直分解到规模大小为 1。如果 n 等于 2，只需要分一次；如果 n 等于 4，需要分 2 次。这里的次数是按照规模大小的变化分类的。</p><p>以此类推，对于规模为 n 的问题，一共要进行 log(n) 层的大小切分。在每一层里，我们都要进行合并，所涉及到的元素其实就是数组里的所有元素，因此，每一层的合并复杂度都是 O(n)，所以整体的复杂度就是 O(nlogn)。</p><p><strong>建议</strong>：归并算法的思想很重要，其中对两个有序数组合并的操作，在很多面试题里都有用到，建议大家一定要把这个算法练熟。</p><h3 id="快速排序-quick-sort" tabindex="-1">快速排序（Quick Sort） <a class="header-anchor" href="#快速排序-quick-sort" aria-label="Permalink to &quot;快速排序（Quick Sort）&quot;">​</a></h3><h4 id="基本思想-3" tabindex="-1">基本思想 <a class="header-anchor" href="#基本思想-3" aria-label="Permalink to &quot;基本思想&quot;">​</a></h4><p>快速排序也采用了分治的思想。</p><h4 id="实现-2" tabindex="-1">实现 <a class="header-anchor" href="#实现-2" aria-label="Permalink to &quot;实现&quot;">​</a></h4><p>把原始的数组筛选成较小和较大的两个子数组，然后递归地排序两个子数组。</p><p><strong>举例</strong>：把班里的所有同学按照高矮顺序排成一排。</p><p><strong>解法</strong>：老师先随机地挑选了同学 A，让所有其他同学和 A 比高矮，比 A 矮的都站在 A 的左边，比 A 高的都站在 A 的右边。接下来，老师分别从左边和右边的同学里选择了同学 B 和 C，然后不断地筛选和排列下去。</p><p>在分成较小和较大的两个子数组过程中，如何选定一个基准值（也就是同学 A、B、C 等）尤为关键。</p><h4 id="例题分析-3" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析-3" aria-label="Permalink to &quot;例题分析&quot;">​</a></h4><p>对数组 [2, 1, 7, 9, 5, 8] 进行排序。</p><h4 id="解题思路-3" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-3" aria-label="Permalink to &quot;解题思路&quot;">​</a></h4>',23),d=a(`<ol><li><p>按照快速排序的思想，首先把数组筛选成较小和较大的两个子数组。</p></li><li><p>随机从数组里选取一个数作为基准值，比如 7，于是原始的数组就被分成了两个子数组。注意：快速排序是直接在原始数组里进行各种交换操作，所以当子数组被分割出来的时候，原始数组里的排列也被改变了。</p></li><li><p>接下来，在较小的子数组里选 2 作为基准值，在较大的子数组里选 8 作为基准值，继续分割子数组。</p></li><li><p>继续将元素个数大于 1 的子数组进行划分，当所有子数组里的元素个数都为 1 的时候，原始数组也被排好序了。</p></li></ol><h4 id="代码示例-3" tabindex="-1">代码示例 <a class="header-anchor" href="#代码示例-3" aria-label="Permalink to &quot;代码示例&quot;">​</a></h4><p>主体函数代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void sort(int[] nums, int lo, int hi) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (lo &gt;= hi) return; // 判断是否只剩下一个元素，是，则直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 利用 partition 函数找到一个随机的基准点</span></span>
<span class="line"><span style="color:#E1E4E8;">    int p = partition(nums, lo, hi);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 递归地对基准点左半边和右半边的数进行排序</span></span>
<span class="line"><span style="color:#E1E4E8;">    sort(nums, lo, p - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    sort(nums, p + 1, hi);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void sort(int[] nums, int lo, int hi) {</span></span>
<span class="line"><span style="color:#24292E;">    if (lo &gt;= hi) return; // 判断是否只剩下一个元素，是，则直接返回</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 利用 partition 函数找到一个随机的基准点</span></span>
<span class="line"><span style="color:#24292E;">    int p = partition(nums, lo, hi);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 递归地对基准点左半边和右半边的数进行排序</span></span>
<span class="line"><span style="color:#24292E;">    sort(nums, lo, p - 1);</span></span>
<span class="line"><span style="color:#24292E;">    sort(nums, p + 1, hi);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>下面用代码实现 partition 函数获得基准值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int partition(int[] nums, int lo, int hi) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 随机选择一个数作为基准值，nums[hi] 就是基准值</span></span>
<span class="line"><span style="color:#E1E4E8;">    swap(nums, randRange(lo, hi), hi);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    int i, j;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 从左到右用每个数和基准值比较，若比基准值小，则放到指针 i 所指向的位置。循环完毕后，i 指针之前的数都比基准值小</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (i = lo, j = lo; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> hi; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (nums[j] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= nums[hi]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            swap(nums, i++, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 末尾的基准值放置到指针 i 的位置，i 指针之后的数都比基准值大</span></span>
<span class="line"><span style="color:#E1E4E8;">    swap(nums, i, j);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 返回指针 i，作为基准点的位置</span></span>
<span class="line"><span style="color:#E1E4E8;">    return i;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int partition(int[] nums, int lo, int hi) {</span></span>
<span class="line"><span style="color:#24292E;">    // 随机选择一个数作为基准值，nums[hi] 就是基准值</span></span>
<span class="line"><span style="color:#24292E;">    swap(nums, randRange(lo, hi), hi);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    int i, j;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 从左到右用每个数和基准值比较，若比基准值小，则放到指针 i 所指向的位置。循环完毕后，i 指针之前的数都比基准值小</span></span>
<span class="line"><span style="color:#24292E;">    for (i = lo, j = lo; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> hi; j++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (nums[j] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= nums[hi]) {</span></span>
<span class="line"><span style="color:#24292E;">            swap(nums, i++, j);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 末尾的基准值放置到指针 i 的位置，i 指针之后的数都比基准值大</span></span>
<span class="line"><span style="color:#24292E;">    swap(nums, i, j);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 返回指针 i，作为基准点的位置</span></span>
<span class="line"><span style="color:#24292E;">    return i;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="算法分析-3" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-3" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><h4 id="时间复杂度-3" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-3" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h4><ol><li>最优情况：被选出来的基准值都是当前子数组的中间数。</li></ol><p>这样的分割，能保证对于一个规模大小为 n 的问题，能被均匀分解成两个规模大小为 n/2 的子问题（归并排序也采用了相同的划分方法），时间复杂度就是：T(n) = 2×T(n/2) + O(n)。</p><p>把规模大小为 n 的问题分解成 n/2 的两个子问题时，和基准值进行了 n-1 次比较，复杂度就是 O(n)。很显然，在最优情况下，快速排序的复杂度也是 O(nlogn)。</p><ol start="2"><li>最坏情况：基准值选择了子数组里的最大或者最小值</li></ol><p>每次都把子数组分成了两个更小的子数组，其中一个的长度为 1，另外一个的长度只比原子数组少 1。</p><p><strong>举例</strong>：对于数组来说，每次挑选的基准值分别是 9、8、7、5、2。</p><p><strong>解法</strong>：划分过程和冒泡排序的过程类似。</p><p>算法复杂度为 O(n^2^)。</p><p>提示：可以通过随机地选取基准值来避免出现最坏的情况。</p><h4 id="空间复杂度-3" tabindex="-1">空间复杂度 <a class="header-anchor" href="#空间复杂度-3" aria-label="Permalink to &quot;空间复杂度&quot;">​</a></h4><p>和归并排序不同，快速排序在每次递归的过程中，只需要开辟 O(1) 的存储空间来完成交换操作实现直接对数组的修改，又因为递归次数为 logn，所以它的整体空间复杂度完全取决于压堆栈的次数，因此它的空间复杂度是 O(logn)。</p><p><strong>举例</strong>：LeetCode 第 215 题，给定一个尚未排好序的数组，要求找出第 k 大的数。</p><p><strong>解法 1</strong>：直接将数组进行排序，然后得出结果。</p><p><strong>解法 2</strong>：快速排序。</p><p>每次随机选取一个基准值，将数组分成较小的一半和较大的一半，然后检查这个基准值最后所在的下标是不是 k，算法复杂度只需要 O(n)。</p><h3 id="拓扑排序-topological-sort" tabindex="-1">拓扑排序（Topological Sort） <a class="header-anchor" href="#拓扑排序-topological-sort" aria-label="Permalink to &quot;拓扑排序（Topological Sort）&quot;">​</a></h3><h4 id="基本思想-4" tabindex="-1">基本思想 <a class="header-anchor" href="#基本思想-4" aria-label="Permalink to &quot;基本思想&quot;">​</a></h4><p>和前面介绍的几种排序不同，拓扑排序应用的场合不再是一个简单的数组，而是研究图论里面顶点和顶点连线之间的性质。拓扑排序就是要将这些顶点按照相连的性质进行排序。</p><p>要能实现拓扑排序，得有几个前提：</p><ol><li><p>图必须是有向图</p></li><li><p>图里面没有环</p></li></ol><p>拓扑排序一般用来理清具有依赖关系的任务。</p><p><strong>举例</strong>：假设有三门课程 A、B、C，如果想要学习课程 C 就必须先把课程 B 学完，要学习课程 B，还得先学习课程 A，所以得出课程的学习顺序应该是 A -&gt; B -&gt; C。</p><h6 id="实现-3" tabindex="-1">实现 <a class="header-anchor" href="#实现-3" aria-label="Permalink to &quot;实现&quot;">​</a></h6><ol><li><p>将问题用一个有向无环图（DAG, Directed Acyclic Graph）进行抽象表达，定义出哪些是图的顶点，顶点之间如何互相关联。</p></li><li><p>可以利用广度优先搜索或深度优先搜索来进行拓扑排序。</p></li></ol><h4 id="例题分析-4" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析-4" aria-label="Permalink to &quot;例题分析&quot;">​</a></h4><p>有一个学生想要修完 5 门课程的学分，这 5 门课程分别用 1、2、3、4、5 来表示，现在已知学习这些课程有如下的要求：</p><ul><li><p>课程 2 和 4 依赖于课程 1</p></li><li><p>课程 3 依赖于课程 2 和 4</p></li><li><p>课程 4 依赖于课程 1 和 2</p></li><li><p>课程 5 依赖于课程 3 和 4</p></li></ul><p>那么这个学生应该按照怎样的顺序来学习这 5 门课程呢？</p><h4 id="解题思路-4" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-4" aria-label="Permalink to &quot;解题思路&quot;">​</a></h4><p>可以把 5 门课程看成是一个图里的 5 个顶点，用有向线段按照它们的相互关系连起来，于是得出下面的有向图。</p><p>首先可以看到，这个有向图里没有环，无论从哪个顶点出发，都不会再回到那个顶点。并且，这个图里并没有孤岛的出现，因此，我们可以对它进行拓扑排序。</p><p>方法就是，一开始的时候，对每个顶点统计它们各自的前驱（也就是入度）：1(0)，2(1)，3(2)，4(2)，5(2)。</p>`,40),u=a(`<ol><li><p>选择其中一个没有前驱（也就是入度为 0）的顶点，在这道题里面，顶点 1 就是我们要找的那个点，将它作为结果输出。同时删除掉该顶点和所有以它作为起始点的有向边，更新顶点的入度表。</p></li><li><p>接下来，顶点 2 就是下一个没有前驱的顶点，输出顶点 2，并将以它作为起点的有向边删除，同时更新入度表。</p></li><li><p>再来，顶点 4 成为了没有前驱的顶点，输出顶点 4，删除掉它和顶点 3 和 5 的有向边。</p></li><li><p>然后，顶点 3 没有了前驱，输出它，并删除它与 5 的有向边。</p></li><li><p>最后，顶点 5 没有前驱，输出它，于是得出最后的结果为：1，2，4，3，5。</p></li></ol><p>一般来说，一个有向无环图可以有一个或多个拓扑排序的序列。</p><h4 id="代码示例-4" tabindex="-1">代码示例 <a class="header-anchor" href="#代码示例-4" aria-label="Permalink to &quot;代码示例&quot;">​</a></h4><p>运用广度优先搜索的方法对这个图的结构进行遍历。在构建这个图的过程中，用一个链接矩阵 adj 来表示这个图的结构，用一个 indegree 的数组统计每个顶点的入度，重点看如何实现拓扑排序。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void sort() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; q = new LinkedList(); // 定义一个队列 q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 将所有入度为 0 的顶点加入到队列 q</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int v = 0; v </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> V; v++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (indegree[v] == 0) q.add(v);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 循环，直到队列为空</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!q.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        int v = q.poll();</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 每次循环中，从队列中取出顶点，即为按照入度数目排序中最小的那个顶点</span></span>
<span class="line"><span style="color:#E1E4E8;">        print(v);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 将跟这个顶点相连的其他顶点的入度减 1，如果发现那个顶点的入度变成了 0，将其加入到队列的末尾</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int u = 0; u </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> adj[v].length; u++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (--indegree[u] == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                q.add(u);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void sort() {</span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; q = new LinkedList(); // 定义一个队列 q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 将所有入度为 0 的顶点加入到队列 q</span></span>
<span class="line"><span style="color:#24292E;">    for (int v = 0; v </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> V; v++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (indegree[v] == 0) q.add(v);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 循环，直到队列为空</span></span>
<span class="line"><span style="color:#24292E;">    while (!q.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        int v = q.poll();</span></span>
<span class="line"><span style="color:#24292E;">        // 每次循环中，从队列中取出顶点，即为按照入度数目排序中最小的那个顶点</span></span>
<span class="line"><span style="color:#24292E;">        print(v);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 将跟这个顶点相连的其他顶点的入度减 1，如果发现那个顶点的入度变成了 0，将其加入到队列的末尾</span></span>
<span class="line"><span style="color:#24292E;">        for (int u = 0; u </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> adj[v].length; u++) {</span></span>
<span class="line"><span style="color:#24292E;">            if (--indegree[u] == 0) {</span></span>
<span class="line"><span style="color:#24292E;">                q.add(u);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="算法分析-4" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-4" aria-label="Permalink to &quot;算法分析&quot;">​</a></h4><h3 id="时间复杂度-4" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-4" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h3><p>统计顶点的入度需要 O(n) 的时间，接下来每个顶点被遍历一次，同样需要 O(n) 的时间，所以拓扑排序的时间复杂度是 O(n)。</p><p><strong>建议</strong>：利用深度优先搜索的方法对这道题实现拓扑排序。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>这节课复习了面试中经常会被考到的排序算法，最重点内容是归并排序和快速排序。除了要好好理解它们的思路，还必须要能写出没有 bug 的代码，因此建议多做 LeetCode 里面的经典题目。</p><p>下一节课，将深入讲解递归算法和回溯算法，它们在算法面试中出现的概率是最高的。</p>`,12);function g(m,b,_,f,k,q){const s=p("Image");return e(),o("div",null,[c,n(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0B/CgoB5l2IiW2AUgXzAEVU1vdS3ek726.gif"}),r,n(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0B/CgoB5l2IiW-AJFICAFSirGa8QjY019.gif"}),E,n(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0B/CgoB5l2IiXKAR7hcAFhCcVK5jAM221.gif"}),h,n(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/2B/CgotOV2IiXSAfGJAAF-ZK14qZ9Q978.gif"}),y,n(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/2B/CgotOV2IiXaAXXBaADUbuSK_xc4506.gif"}),d,n(s,{alt:"",src:"http://s0.lgstatic.com/plat-home-fed/vue/scripts/libraries/UEditor/themes/default/images/spacer.gif"}),i(),n(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/2B/CgotOV2IiXqAM6cFAFNa8qMI_JU260.gif"}),u])}const A=l(t,[["render",g]]);export{v as __pageData,A as default};
