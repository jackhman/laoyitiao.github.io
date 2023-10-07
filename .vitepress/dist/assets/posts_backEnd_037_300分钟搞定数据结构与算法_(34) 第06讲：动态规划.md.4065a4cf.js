import{_ as e,j as o,o as t,g as i,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const Y=JSON.parse('{"title":"第06讲：动态规划","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(34) 第06讲：动态规划.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(34) 第06讲：动态规划.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(34) 第06讲：动态规划.md"},r=l('<h1 id="第06讲-动态规划" tabindex="-1">第06讲：动态规划 <a class="header-anchor" href="#第06讲-动态规划" aria-label="Permalink to &quot;第06讲：动态规划&quot;">​</a></h1><p>动态规划可以说是很多准备算法面试者的梦魇，大家都非常怕面试官会出动态规划的题目，如果遇到一些做过的题目还好，但要是遇到了根本就没有做过的，就无从下手了。</p><p>本节课从动态规划的基本属性，题目分类，解题思想，以及算法复杂度等方面来详解动态规划。</p><h6 id="判断动态规划" tabindex="-1">判断动态规划 <a class="header-anchor" href="#判断动态规划" aria-label="Permalink to &quot;判断动态规划&quot;">​</a></h6><p>Wikipedia 定义：它既是一种数学优化的方法，同时也是编程的方法。</p><ol><li>是数学优化的方法------最优子结构</li></ol><br><p>动态规划是数学优化的方法指，动态规划要解决的都是问题的最优解。而一个问题的最优解是由它的各个子问题的最优解决定的。</p><br><p>由此引出动态规划的第一个重要的属性：最优子结构（Optimal Substructure)。</p><br><p>一般由最优子结构，推导出一个状态转移方程 f(n)，就能很快写出问题的递归实现方法。</p>',12),E=s("ol",{start:"2"},[s("li",null,"是编程的方法------重叠子问题")],-1),y=s("br",null,null,-1),d=s("p",null,"动态规划是编程的方法指，可以借助编程的技巧去保证每个重叠的子问题只会被求解一次。",-1),u=s("br",null,null,-1),h=s("p",null,"引出了动态规划的第二个重要的属性：重叠子问题（Overlapping Sub-problems）。",-1),m=s("p",null,"下面通过几个小例题来判断其方法是否符合动态规划。",-1),f=s("p",null,[s("strong",null,"举例 1"),n("：斐波那契数列问题。")],-1),_=s("br",null,null,-1),g=s("p",null,"解法：为了求出第 5 个斐波那契数，得先求出第 4 个和第 3 个数，但是在求第 4 个数的时候，又得重复计算一次第 3 个数，同样，对于第 2 个数的计算也出现了重复。",-1),b=s("p",null,"因此，判断一个问题能不能称得上是动态规划的问题，需要看它是否同时满足这两个重要的属性：最优子结构（Optimal Substructure）和重叠子问题（Overlapping Sub-problems）",-1),x=s("p",null,[s("strong",null,"举例 2"),n("：给定如下的一个有向图，求出从顶点 A 到 C 的最长的路径。要求路径中的点只能出现一次。")],-1),A=s("p",null,"按照题目的要求，可以看到，从 A 通往 C 有两条最长的路径：A -> B -> C 和 A -> D -> C。",-1),T=s("br",null,null,-1),q=s("p",null,"对于 A -> B -> C，A 到 B 的最长距离是：A -> D -> C -> B",-1),B=s("p",null,"B 到 C 的最长距离是：B -> A -> D -> C",-1),j=s("p",null,"组合路径：A -> D -> C -> B -> A -> D -> C",-1),O=l('<p>上述答案并不满足题目的要求。该题并没有一个最优子结构，不是动态规划问题。</p><p><strong>举例 3</strong>：归并排序和快速排序是否属于动态规划？</p><br><p>解法：</p><ol><li><p>将要排序的数组分成两半，然后递归地进行处理，满足最优子结构的属性；</p></li><li><p>不断地对待排序的数组进行对半分的时候，两半边的数据并不重叠，不会遇到重复的子数组，不满足重叠子问题的属性。</p></li></ol><br><p>因此这两种算法不是动态规划的方法。</p><h6 id="例题分析" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析" aria-label="Permalink to &quot;例题分析&quot;">​</a></h6><p>LeetCode 第 300 题：给定一个无序的整数数组，找到其中最长子序列长度。</p><p>说明：</p><ul><li><p>可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。</p></li><li><p>你算法的时间复杂度应该为 O(n^2^） 。</p></li></ul><p>**注意：**子序列和子数组不同，它并不要求元素是连续的。</p><p>示例</p><p>输入：[ 10, 9, 2, 5, 3, 7, 101, 18 ]</p><p>输出：4</p><p>即，最长的上升子序列是 [2, 3, 7, 101]，它的长度是 4。</p><h3 id="解题思路" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>在给定的数组里，有很多的上升子序列，例如：[10, 101]，[9, 101]，[2, 5, 7, 101]，以及 [2, 3, 7, 101]，只需要找出其中一个最长的。</p><p><strong>思路 1</strong>：暴力法</p><br><p>找出所有的子序列，然后从中返回一个最长的。</p><br><p>从一个数组中罗列出所有的非空子数组有： n×(n + 1)/2 种，即 O(n^2^)，那么罗列出所有的非空子序列有 2^n−1^ 种。复杂度将是 O(2^n^)。</p><p><strong>思路 2</strong>：缩小问题规模</p><br><ol><li>找最优子结构：输入规模对半分</li></ol>',26),k=s("p",null,"[10, 9, 2, 5] 最长的子序列应该是 [2, 5]，而 [3, 7, 101, 4] 最长的子序列是 [3, 7, 101]，由于 3 比 5 小，无法简单地组合在一起。即该方法下，总问题的解无法直观地通过子问题的最优解求得。",-1),C=s("ol",{start:"2"},[s("li",null,"找最优子结构：每次减一个")],-1),D=s("br",null,null,-1),S=s("p",null,"假设 f(n) 表示的是数组 nums[0，...，n−1] 中最长的子序列，那么 f(n−1) 就是数组 nums[0，...，n−2] 中最长的子序列，依此类推，f(1) 就是 nums[0] 的最长子序列。",-1),P=s("p",null,"假设已经解决了 f(1)，f(2)，... f(n−1) 的问题，考虑最后一个数 nums[n−1]，也必然考虑到倒数第二个数 nums[n−2]，所以 f(n) 指：如果包含了最后的数，那么最长的子序列应该是什么。",-1),I=s("p",null,"注意：最后这个数必须包含在子序列当中的。",-1),v=s("p",null,"如何通过 f(1)，f(2)，...f(n−1) 推导出 f(n) 呢？由于最后一个数是 4，我们只需要在前面的 f(1)，f(2)，...f(n−1) 当中，找出一个以小于 4 的数作为结尾的最长的子序列，然后把 4 添加到最后，那么 f(n) 就一定是以 4 作为结尾的最长的子序列了。",-1),F=s("p",null,"最长的子序列并不一定会包含 4，遍历 f(1)，f(2)，...f(n−1) ，找出最长的。例如，以 101 结尾的最长的上升子序列是什么。",-1),M=l(`<p>总结解决动态规划问题的两个难点。</p><br><p>（1）如何定义 f(n)</p><p>对于这道题而言，f(n) 是以 nums[n−1] 结尾的最长的上升子序列的长度</p><br><p>（2）如何通过 f(1)，f(2)，...f(n−1) 推导出 f(n)，即状态转移方程</p><p>本题中，nums[n−1] 和比它小的每一个值 nums[i] 进行比较，其中 1&lt;=i&lt;n，加 1 即可。因此状态转移方程就是：f(n)=max (1 &lt;= i &lt; n−1, nums[i−1] &lt; nums[n−1]) { f(i) } + 1</p><p>以上证明了这个问题有一个最优的子结构。</p><br><ol start="3"><li>找重叠子问题</li></ol><br><p>在分析最后一个数 4 的时候，以 3 结尾的最长的上升子序列长度就是 f(5)，因为 3 是第 5 个数。把问题规模缩小 2 个，当前的数变成 101 的时候，找比它小的数，又发现了 3，这个时候又会去重复计算一遍 f(5)，说明该题有重叠的子问题。</p><p>因此，可以运用动态规划的方法来解决这个问题。</p><h6 id="递归-recursion" tabindex="-1">递归（Recursion） <a class="header-anchor" href="#递归-recursion" aria-label="Permalink to &quot;递归（Recursion）&quot;">​</a></h6><p>用递归的方法求解状态转移方程式 f(n)=max (1 &lt;= i &lt; n−1, nums[i−1] &lt; nums[n−1]) { f(i) } + 1。</p><ul><li><p>对于每个 n，要从 0 开始遍历</p></li><li><p>在 n 之前，找出比 nums[n−1] 小的数</p></li><li><p>递归地调用 f 函数，找出最大的，最后加上 1</p></li><li><p>当 i 等于 0 的时候，应该返回 0；当 i 等于 1 的时候应该返回 1。</p></li></ul><h6 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><p>下面就是递归的代码实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class LISRecursion {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个静态变量 max，用来保存最终的最长的上升子序列的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">    static int max;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public int f(int[] nums, int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (n </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return n;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        int result=0, maxEndingHere=1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 从头遍历数组，递归求出以每个点为结尾的子数组中最长上升序列的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int i=1; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            result=f(nums, i);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            if (nums[i−1] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[n−1] &amp;&amp; result + 1 &gt; maxEndingHere) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                maxEndingHere=result + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 判断一下，如果那个数比目前最后一个数要小，那么就能构成一个新的上升子序列 </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (max </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> maxEndingHere) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            max=maxEndingHere;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 返回以当前数结尾的上升子序列的最长长度</span></span>
<span class="line"><span style="color:#E1E4E8;">        return maxEndingHere;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public int LIS(int[] nums) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        max=1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        f(nums, nums.length);</span></span>
<span class="line"><span style="color:#E1E4E8;">        return max; </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class LISRecursion {</span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个静态变量 max，用来保存最终的最长的上升子序列的长度</span></span>
<span class="line"><span style="color:#24292E;">    static int max;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public int f(int[] nums, int n) {</span></span>
<span class="line"><span style="color:#24292E;">        if (n </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= 1) {</span></span>
<span class="line"><span style="color:#24292E;">            return n;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        int result=0, maxEndingHere=1;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // 从头遍历数组，递归求出以每个点为结尾的子数组中最长上升序列的长度</span></span>
<span class="line"><span style="color:#24292E;">        for (int i=1; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; i++) {</span></span>
<span class="line"><span style="color:#24292E;">            result=f(nums, i);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            if (nums[i−1] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[n−1] &amp;&amp; result + 1 &gt; maxEndingHere) {</span></span>
<span class="line"><span style="color:#24292E;">                maxEndingHere=result + 1;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 判断一下，如果那个数比目前最后一个数要小，那么就能构成一个新的上升子序列 </span></span>
<span class="line"><span style="color:#24292E;">        if (max </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> maxEndingHere) {</span></span>
<span class="line"><span style="color:#24292E;">            max=maxEndingHere;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 返回以当前数结尾的上升子序列的最长长度</span></span>
<span class="line"><span style="color:#24292E;">        return maxEndingHere;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public int LIS(int[] nums) {</span></span>
<span class="line"><span style="color:#24292E;">        max=1;</span></span>
<span class="line"><span style="color:#24292E;">        f(nums, nums.length);</span></span>
<span class="line"><span style="color:#24292E;">        return max; </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>其中，实现状态转移方程，即 f 函数。</p><ul><li><p>最基本的情况，当数组的长度为 0 时，没有上升子序列，当数组长度为 1 时，最长的上升子序列长度是 1。</p></li><li><p>maxEndingHere 变量的含义就是包含当前最后一个元素的情况下，最长的上升子序列长度。</p></li></ul><h6 id="时间复杂度" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h6><p>用公式法解决该递归问题的时间复杂度，如下。</p><br><p>当 n=1 的时候，递归直接返回 1，执行时间为 O(1)，即 T(1)=O(1)</p><p>当 n=2 的时候，内部调用了一次递归求解 T(1)，所以 T(2)=T(1)</p><p>当 n=3 的时候，T(3)=T(1) + T(2)</p><p>...</p><p>以此类推，</p><p>T(n−1)=T(1) + T(2) + ... + T(n−2)</p><p>T(n)=T(1) + T(2) + ... + T(n−1)</p><p>通过观察，我们得到：T(n)=2×T(n−1)，这并不满足 T(n)=a×T(n / b) + f(n) 的关系式。但是 T(n) 等于两倍的 T(n−1)，表明，我们的计算是成指数增长的，每次的计算都是先前的两倍。所以 O(n)=O(2^n^)。</p><h6 id="记忆化-memoization" tabindex="-1">记忆化（Memoization） <a class="header-anchor" href="#记忆化-memoization" aria-label="Permalink to &quot;记忆化（Memoization）&quot;">​</a></h6><p>由于递归的解法需要耗费非常多的重复计算，而且很多计算都是重叠的，避免重叠计算的一种办法就是记忆化。</p><p>记忆化，就是将已经计算出来的结果保存起来，那么下次遇到相同的输入时，直接返回保存好的结果，能够有效节省了大量的计算时间。</p><h6 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><p>在之前递归实现的基础上实现记忆化，代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class LISMemoization {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static int max;</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义哈希表 cache，用来保存计算结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    static HashMap&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer,</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Integer</span><span style="color:#E1E4E8;">&gt; cache;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 调用递归函数的时候，判断 cache 里是否已经保留了这个值。是，则返回；不是，继续递归调用</span></span>
<span class="line"><span style="color:#E1E4E8;">    public int f(int[] nums, int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (cache.containsKey(n)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return cache.get(n);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (n </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return n;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        int result=0, maxEndingHere=1; </span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int i=1; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (max </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> maxEndingHere) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            max=maxEndingHere;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 在返回当前结果前，保存到 cache</span></span>
<span class="line"><span style="color:#E1E4E8;">        cache.put(n, maxEndingHere);</span></span>
<span class="line"><span style="color:#E1E4E8;">        return maxEndingHere;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class LISMemoization {</span></span>
<span class="line"><span style="color:#24292E;">    static int max;</span></span>
<span class="line"><span style="color:#24292E;">    // 定义哈希表 cache，用来保存计算结果</span></span>
<span class="line"><span style="color:#24292E;">    static HashMap&lt;</span><span style="color:#B31D28;font-style:italic;">Integer,</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Integer</span><span style="color:#24292E;">&gt; cache;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 调用递归函数的时候，判断 cache 里是否已经保留了这个值。是，则返回；不是，继续递归调用</span></span>
<span class="line"><span style="color:#24292E;">    public int f(int[] nums, int n) {</span></span>
<span class="line"><span style="color:#24292E;">        if (cache.containsKey(n)) {</span></span>
<span class="line"><span style="color:#24292E;">            return cache.get(n);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        if (n </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= 1) {</span></span>
<span class="line"><span style="color:#24292E;">            return n;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        int result=0, maxEndingHere=1; </span></span>
<span class="line"><span style="color:#24292E;">        for (int i=1; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; i++) {</span></span>
<span class="line"><span style="color:#24292E;">            ...</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        if (max </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> maxEndingHere) {</span></span>
<span class="line"><span style="color:#24292E;">            max=maxEndingHere;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // 在返回当前结果前，保存到 cache</span></span>
<span class="line"><span style="color:#24292E;">        cache.put(n, maxEndingHere);</span></span>
<span class="line"><span style="color:#24292E;">        return maxEndingHere;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="时间复杂度-1" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-1" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h2><p>分析递归+记忆化的时间复杂度，如下。</p>`,41),H=l(`<ol><li><p>函数 f 按序传递n，n−1，n−2 ... 最后是 1，把结果缓存并返回；</p></li><li><p>递归返回到输入 n；</p></li><li><p>缓存里已经保存了 n−1 个结果；</p></li><li><p>for 循环调用递归函数 n−1 次，从 cache 里直接返回结果。</p></li></ol><br><p>上述过程的时间复杂度是 O(1)。即将问题的规模大小从 n 逐渐减小到 1 的时候，通过将各个结果保存起来，可以将 T(1)，T(2)，....T(n−1) 的复杂度降低到线性的复杂度。</p><p>现在，回到 T(n)，在 for 循环里，尝试着从 T(1)，T(2)....T(n−1) 里取出最大值，因此 O(T(n))=O(T(1) + T(2) + ... + T(n−1))=O(1 + 2 + .... + n−1)=O(n×(n−1)/2)=O(n^2^)。</p><p>最后加上构建缓存 cache 的时间，整体的时间复杂度就是 O(f(n))=O(n) + O(n^2)=O(n^2^)。</p><p>通过记忆化的操作，我们把时间复杂度从 O(2^n^) 降低到了 O(n^2^)。</p><p>这种将问题规模不断减少的做法，被称为自顶向下的方法。但是，由于有了递归的存在，程序运行时对堆栈的消耗以及处理是很慢的，在实际工作中并不推荐。更好的办法是自底向上。</p><h6 id="自底向上-bottom-up" tabindex="-1">自底向上（Bottom-Up） <a class="header-anchor" href="#自底向上-bottom-up" aria-label="Permalink to &quot;自底向上（Bottom-Up）&quot;">​</a></h6><p>自底向上指，通过状态转移方程，从最小的问题规模入手，不断地增加问题规模，直到所要求的问题规模为止。依然使用记忆化避免重复的计算，不需要递归。</p><p>建议：在面试的时候，如果能最终给出一个自底向上的方案和代码，则比较完美。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class LISDP {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public int LIS(int[] nums, int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        int[] dp=new int[n]; // 一维数组 dp 存储计算结果</span></span>
<span class="line"><span style="color:#E1E4E8;">        int i, j, max=0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 初始化 dp 数组里的每个元素的值为 1，即以每个元素作为结尾的最长子序列的长度初始化为 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (i=0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; i++) dp[i]=1;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 自底向上地求解每个子问题的最优解</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (i=0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 遍历中遇到的每个元素 nums[j] 与 nums[i] 比较，若 nums[j] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[i]，说明 nums[i] 有机会构成上升序列，若新的上升序列比之前计算过的还要长，更新一下，保存到 cache 数组</span></span>
<span class="line"><span style="color:#E1E4E8;">            for (j=0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> i; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                if (nums[j] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[i] &amp;&amp; dp[i] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> dp[j] + 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    dp[i]=dp[j] + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 用当前计算好的长度与全局的最大值进行比较  </span></span>
<span class="line"><span style="color:#E1E4E8;">            max=Math.max(max, dp[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 最后得出最长的上升序列的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">        return max;  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class LISDP {</span></span>
<span class="line"><span style="color:#24292E;">    public int LIS(int[] nums, int n) {</span></span>
<span class="line"><span style="color:#24292E;">        int[] dp=new int[n]; // 一维数组 dp 存储计算结果</span></span>
<span class="line"><span style="color:#24292E;">        int i, j, max=0;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // 初始化 dp 数组里的每个元素的值为 1，即以每个元素作为结尾的最长子序列的长度初始化为 1</span></span>
<span class="line"><span style="color:#24292E;">        for (i=0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; i++) dp[i]=1;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 自底向上地求解每个子问题的最优解</span></span>
<span class="line"><span style="color:#24292E;">        for (i=0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; i++) {</span></span>
<span class="line"><span style="color:#24292E;">            // 遍历中遇到的每个元素 nums[j] 与 nums[i] 比较，若 nums[j] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[i]，说明 nums[i] 有机会构成上升序列，若新的上升序列比之前计算过的还要长，更新一下，保存到 cache 数组</span></span>
<span class="line"><span style="color:#24292E;">            for (j=0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> i; j++) {</span></span>
<span class="line"><span style="color:#24292E;">                if (nums[j] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[i] &amp;&amp; dp[i] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> dp[j] + 1) {</span></span>
<span class="line"><span style="color:#24292E;">                    dp[i]=dp[j] + 1;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            // 用当前计算好的长度与全局的最大值进行比较  </span></span>
<span class="line"><span style="color:#24292E;">            max=Math.max(max, dp[i]);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 最后得出最长的上升序列的长度</span></span>
<span class="line"><span style="color:#24292E;">        return max;  </span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="时间复杂度-2" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-2" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h6><p>由上可知，这一个双重循环。当 i=0 的时候，内循环执行 0 次；当 i=1 的时候，内循环执行 1 次......以此类推，当 i=n−1 的时候，内循环执行了 n−1 次，因此，总体的时间复杂度是 O(1 + 2 + .. + n−1)=O(n×(n−1) / 2)=O(n^2^)。</p><h6 id="动态规划面试题分类" tabindex="-1">动态规划面试题分类 <a class="header-anchor" href="#动态规划面试题分类" aria-label="Permalink to &quot;动态规划面试题分类&quot;">​</a></h6><p>运用动态规划去解决问题，最难的地方有两个：</p><ol><li><p>应当采用什么样的数据结构来保存什么样的计算结果</p></li><li><p>如何利用保存下来的计算结果推导出状态转移方程</p></li></ol><br><p>第一个难点，不仅是为了避免重复的计算，也是推导状态转移方程的关键。这一难点往往是在把问题规模缩小的过程中进行的。</p><p>解决技巧：假设已经把所有子问题的最佳结果都计算出来了，那么只需要考虑，如何根据这些子问题的结果来得出最终的答案。</p><p>根据动态规划问题的难易程度，把常见的动态规划面试题分成如下三大类。</p><h6 id="线性规划" tabindex="-1">线性规划 <a class="header-anchor" href="#线性规划" aria-label="Permalink to &quot;线性规划&quot;">​</a></h6><p>面试题中最常见也是最简单的一种。</p><p>线性，就是说各个子问题的规模以线性的方式分布，并且子问题的最佳状态或结果可以存储在一维线性的数据结构里，例如一维数组，哈希表等。</p><p>解法中，经常会用 dp[i] 去表示第 i 个位置的结果，或者从 0 开始到第 i 个位置为止的最佳状态或结果。例如，最长上升子序列。dp[i] 表示从数组第 0 个元素开始到第i个元素为止的最长的上升子序列。</p><p>求解 dp[i] 的复杂程度取决于题目的要求，但是基本上有两种形式。</p><h3 id="求解-dp-i-形式一" tabindex="-1"><strong>求解 dp[i] 形式一</strong> <a class="header-anchor" href="#求解-dp-i-形式一" aria-label="Permalink to &quot;**求解 dp\\[i\\] 形式一**&quot;">​</a></h3><p>第一种形式，当前所求的值仅仅依赖于有限个先前计算好的值，也就是说，dp[i] 仅仅依赖于有限个 dp[j]，其中 j &lt; i。</p><p><strong>举例 1</strong>：斐波那契数列。</p><br><p>解法：dp[i]=dp[i−1] + dp[i−2]，可以看到，当前值只依赖于前面两个计算好的值。</p><br><p>建议：LeetCode 第 70 题（爬楼梯）就是一道求解斐波那契数列的题目。</p><p><strong>举例2</strong>：LeetCode第 198 题，给定一个数组，不能选择相邻的数，求如何选才能使总数最大。</p><br><p>解法：这道题需要运用经典的 0-1 思想，简单说就是：&quot;选还是不选&quot;。</p><br><p>假设 dp[i] 表示到第 i 个元素为止我们所能收获到的最大总数。</p><ul><li><p>如果选择了第 i 个数，则不能选它的前一个数，因此，收获的最大总数就是 dp[i−2] + nums[i]。</p></li><li><p>不选，则直接考虑它的前一个数 dp[i−1]。因此，可以推导出它的递归公式 dp[i]=max(nums[i] + dp[i−2], dp[i−1])，可以看到，dp[i] 仅仅依赖于有限个 dp[j]，其中 j=i−1，i−2。</p></li></ul><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public int rob(int[] nums) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = nums.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 处理当数组为空或者数组只有一个元素的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">    if(n == 0) return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    if(n == 1) return nums[0];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个 dp 数组，dp[i] 表示到第 i 个元素为止我们所能收获到的最大总数</span></span>
<span class="line"><span style="color:#E1E4E8;">    int[] dp = new int[n];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 初始化 dp[0]，dp[1]</span></span>
<span class="line"><span style="color:#E1E4E8;">    dp[0] = nums[0];</span></span>
<span class="line"><span style="color:#E1E4E8;">    dp[1] = Math.max(nums[0], nums[1]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 对于每个 nums[i]，考虑两种情况，选还是不选，然后取最大值</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 2; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return dp[n - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public int rob(int[] nums) {</span></span>
<span class="line"><span style="color:#24292E;">    int n = nums.length;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 处理当数组为空或者数组只有一个元素的情况</span></span>
<span class="line"><span style="color:#24292E;">    if(n == 0) return 0;</span></span>
<span class="line"><span style="color:#24292E;">    if(n == 1) return nums[0];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 定义一个 dp 数组，dp[i] 表示到第 i 个元素为止我们所能收获到的最大总数</span></span>
<span class="line"><span style="color:#24292E;">    int[] dp = new int[n];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 初始化 dp[0]，dp[1]</span></span>
<span class="line"><span style="color:#24292E;">    dp[0] = nums[0];</span></span>
<span class="line"><span style="color:#24292E;">    dp[1] = Math.max(nums[0], nums[1]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 对于每个 nums[i]，考虑两种情况，选还是不选，然后取最大值</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 2; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return dp[n - 1];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>举例3</strong>：一个机器人位于一个 网格的左上角（起始点在下图中标记为&quot;Start&quot;）。机器人每次只能向下或向右移动一步。机器人试图到达网格的右下角（在下图中标记为&quot;Finish&quot;）。问总共有多少条不同的路径？</p><p>说明： 和的值均不超过100。</p>`,42),V=l(`<p>解法 1：从起点考虑，暴力法。</p><br><p>解法 2：减小问题规模。</p><br><p>分别计算走到它上面的格子以及左边的格子的步数，相加。递推公式为 dp[i][j]=dp[i−1][j] + dp[i][j−1]。</p><p>虽然利用一个二维数组去保存计算的结果，但是 dp[i][j] 所表达的意思仍然是线性的，dp[i][j] 表示从起点到 (i, j) 的总走法。本题不再讨论具体实现。可以看到，dp[i][j] 仅仅依赖于两个先前的状态。</p><h3 id="求解-dp-i-形式二" tabindex="-1">求解 dp[i] 形式二 <a class="header-anchor" href="#求解-dp-i-形式二" aria-label="Permalink to &quot;求解 dp\\[i\\] 形式二&quot;">​</a></h3><p>第二种求解 dp[i] 的形式，当前所求的值依赖于所有先前计算好的值，也就是说，dp[i] 是各个 dp[j] 的某种组合，其中 j 由 0 遍历到 i−1。</p><p>举例：求解最长上升子序列。</p><br><p>解法：dp[i]=max(dp[j]) + 1，0 &lt;= j &lt; i。可以看到，当前值依赖于前面所有计算好的值。</p><h6 id="区间规划" tabindex="-1">区间规划 <a class="header-anchor" href="#区间规划" aria-label="Permalink to &quot;区间规划&quot;">​</a></h6><p>区间规划，就是说各个子问题的规模由不同的区间来定义，一般子问题的最佳状态或结果存储在二维数组里。一般用 dp[i][j] 代表从第 i 个位置到第 j 个位置之间的最佳状态或结果。</p><p>解这类问题的时间复杂度一般为多项式时间，对于一个大小为 n 的问题，时间复杂度不会超过 n 的多项式倍数。例如，O(n)=n^k，k 是一个常数，根据题目的不同而定。</p><p>举例：LeetCode 第 516 题，在一个字符串 S 中求最长的回文子序列。例如给定字符串为 dccac，最长回文就是 ccc。</p><p>解法 1：</p><br><p>对于回文来说，必须保证两头的字符都相同。用 dp[i][j] 表示从字符串第 i 个字符到第 j 个字符之间的最长回文，比较这段区间外的两个字符，如果发现它们相等，它们就肯定能构成新的最长回文。而最长的回文长度会保存在 dp[0][n−1] 里。因此，可以推导出如下的递推公式。</p><br><p>当首尾的两个字符相等的时候 dp[0][n−1]=dp[1][n−2] + 2，</p><br><p>否则，dp[0][n−1]=max(dp[1][n−1], dp[0][n−2])。</p><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public static int LPS(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = s.length();</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义 dp 矩阵，dp[i][j] 表示从字符串第 i 个字符到第 j 个字符之间的最长回文</span></span>
<span class="line"><span style="color:#E1E4E8;">    int[][] dp = new int[n][n];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 初始化 dp 矩阵，将对角线元素设为 1，即单个字符的回文长度为 1</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; i++) dp[i][i] = 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 从长度为 2 开始，尝试将区间扩大，一直扩大到 n</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int len = 2; len </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= n; len++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 在扩大的过程中，每次都得出区间的其实位置i和结束位置j</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n - len + 1; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int j = i + len - 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            // 比较一下区间首尾的字符是否相等，如果相等，就加2；如果不等，从规模更小的字符串中得出最长的回文长度</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (s.charAt(i) == s.charAt(j)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                dp[i][j] = 2 + (len == 2 ? 0: dp[i + 1][j - 1]);</span></span>
<span class="line"><span style="color:#E1E4E8;">              } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return dp[0][n - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public static int LPS(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    int n = s.length();</span></span>
<span class="line"><span style="color:#24292E;">    // 定义 dp 矩阵，dp[i][j] 表示从字符串第 i 个字符到第 j 个字符之间的最长回文</span></span>
<span class="line"><span style="color:#24292E;">    int[][] dp = new int[n][n];</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 初始化 dp 矩阵，将对角线元素设为 1，即单个字符的回文长度为 1</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; i++) dp[i][i] = 1;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 从长度为 2 开始，尝试将区间扩大，一直扩大到 n</span></span>
<span class="line"><span style="color:#24292E;">    for (int len = 2; len </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= n; len++) {</span></span>
<span class="line"><span style="color:#24292E;">        // 在扩大的过程中，每次都得出区间的其实位置i和结束位置j</span></span>
<span class="line"><span style="color:#24292E;">        for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n - len + 1; i++) {</span></span>
<span class="line"><span style="color:#24292E;">            int j = i + len - 1;</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            // 比较一下区间首尾的字符是否相等，如果相等，就加2；如果不等，从规模更小的字符串中得出最长的回文长度</span></span>
<span class="line"><span style="color:#24292E;">            if (s.charAt(i) == s.charAt(j)) {</span></span>
<span class="line"><span style="color:#24292E;">                dp[i][j] = 2 + (len == 2 ? 0: dp[i + 1][j - 1]);</span></span>
<span class="line"><span style="color:#24292E;">              } else {</span></span>
<span class="line"><span style="color:#24292E;">                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return dp[0][n - 1];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>解法 2：</p><br><p>如果用线性规划的方法来解，假设已经把 S[0]，S[0, 1]，S[0... n−2] 中所有最长的回文子序列都找出来了，把最后一个字符加入到 S 中，能不能成为一个新的最长的回文呢？方法是有的，建议同学们自己尝试一下。</p><p>关于区间规划，还有很多题目都有用到，例如给定一系列矩阵，求矩阵相乘的总次数最少的相乘方法。</p><h6 id="约束规划" tabindex="-1">约束规划 <a class="header-anchor" href="#约束规划" aria-label="Permalink to &quot;约束规划&quot;">​</a></h6><p>在普通的线性规划和区间规划里，一般题目有两种需求：统计和最优解。</p><p>这些题目不会对输出结果中的元素有什么限制，只要满足最终的一个条件就好了。但是在很多情况下，题目会对输出结果的元素添加一定的限制或约束条件，增加了解题的难度。</p><p>举例：0-1 背包问题。</p><p>给定 n 个物品，每个物品都有各自的价值 vi 和重量 wi，现在给你一个背包，背包所能承受的最大重量是 W，那么往这个背包里装物品，问怎么装能使被带走的物品的价值总和最大。</p><p>因为很多人都熟悉这道经典题目，因此不去详细讲解，但是建议大家好好去做一下这道题。</p><h3 id="np-完全问题" tabindex="-1">NP 完全问题 <a class="header-anchor" href="#np-完全问题" aria-label="Permalink to &quot;NP 完全问题&quot;">​</a></h3><p>该例题为 NP 完全问题。NP 是 Non-deterministic Polynomial 的缩写，中文是非決定性多项式。通俗一点来说，对于这类问题，我们无法在多项式时间内解答。这个概念很难，但是理解好它能帮助你很好的分析时间复杂度。</p><h3 id="时间复杂度-3" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度-3" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h3><p>时间复杂度并不是表示程序解决问题需要花费的具体时间，而是说程序运行的时间随着问题规模扩大增长的有多快。</p><p>如果程序具有 O(1) 的时间复杂度，那么，无论问题规模有多大，运行时间都是固定不变的，这个程序就是一个好程序。如果程序运行的时间随着问题规模的扩大线性增长，复杂度是 O(n)，也很不错。还有一些平方数 O(n^2^)、立方数 O(n^3^) 的复杂度等，比如冒泡排序。另外还有指数级的复杂度，例如 O(2^n^)，O(3^n^) 等。还有甚至 O(n!) 阶乘级的复杂度，例如全排列算法。分类如下：</p><br><ul><li>多项式级别时间复杂度</li></ul><p>O(1)、O(n)、O(n×logn)、O(n^2^)、O(n^3^) 等，可以表示为 n 的多项式的组合</p><ul><li>非多项式级别时间复杂度</li></ul><p>O(2^n^)，O(3^n^) 等指数级别和 O(n!) 等阶乘级别 。</p><h3 id="例题分析-1" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析-1" aria-label="Permalink to &quot;例题分析&quot;">​</a></h3><p>回到 0-1 背包问题，经典的解法就是利用动态规划求解，时间复杂度是 O(n×W)。</p><br><br><p>因为物体的重量 W 是有精度的，如果假设背包的重量是 21.17008，物品的重量精确到了小数点后 5 位，解题的时候，必须对每一个 0.00001 的重量单位分配一个记忆单元，从 0.00000，0.00001，0.00002 一直分配到 21.17008，虽然背包大小只有不到 22，但是一共分配了 210 多万个单元，这是很可怕的计算量和存储量。</p>`,49),L=s("p",null,"而计算机都是用二进制来表示一个数，假设涵盖从 0 到 W 的区间需要 m 位的二进制数，那么 W 就能写成 2^m^。因此 0-1 背包问题的复杂度就成为了 O(n×2^m^)。",-1),N=s("p",null,"现在问题的规模取决于物品的个数以及需要用多少位二进制数来表示背包的重量，很明显，它是一个指数级的计算量，是一个非多项式级别的复杂度。",-1),W=s("h6",{id:"结语",tabindex:"-1"},[n("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),R=s("p",null,"这节课后，大家应该能对动态规划有了比较清晰的认识。学习动态规划没有什么捷径，除了掌握好本节课的知识点，更重要的是多练。",-1),z=s("br",null,null,-1);function w(K,U,Z,$,G,J){const a=o("Image");return t(),i("div",null,[r,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EF/CgoB5l2IcqKAT-iFAAvZ0mB2w9o185.gif"}),n(),E,y,d,u,h,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0F/CgotOV2IcqKAee79ADIs6KpFExY310.gif"}),n(),m,f,_,g,b,x,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EF/CgoB5l2IcqOAXphFAA-GWGuo2C0144.gif"}),n(),A,T,q,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0F/CgotOV2IcqSAeVmBABezjz1sSV0529.gif"}),n(),B,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EF/CgoB5l2IcqSAb1L3ABPxU8fyZuk520.gif"}),n(),j,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0F/CgotOV2IcqWAfxMeABZ4L440D5c286.gif"}),n(),O,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EF/CgoB5l2IcqWAfAX8ACiK5xevrOI755.gif"}),n(),k,C,D,S,P,I,v,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0F/CgotOV2IcqWAdiFJACpjs_86OCY252.gif"}),n(),F,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EF/CgoB5l2IcqaAZ_nOADpppdMvQp0237.gif"}),n(),M,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0F/CgotOV2IcqaAZ_YzABSfIxvIih8411.gif"}),n(),H,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EF/CgoB5l2IcqeAQlJTAAAkWU86cG8012.png"}),n(),V,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/0F/CgotOV2IcqeARptuAAAixqNCom0540.png"}),n(),L,N,W,R,z])}const X=e(c,[["render",w]]);export{Y as __pageData,X as default};
