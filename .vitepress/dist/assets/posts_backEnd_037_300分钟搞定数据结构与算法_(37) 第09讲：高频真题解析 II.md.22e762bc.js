import{_ as e,D as o,o as t,g as c,J as a,h as l,Q as p,m as s}from"./chunks/framework.f67d7268.js";const Q=JSON.parse('{"title":"第09讲：高频真题解析II","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(37) 第09讲：高频真题解析 II.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(37) 第09讲：高频真题解析 II.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(37) 第09讲：高频真题解析 II.md"},r=p('<h1 id="第09讲-高频真题解析ii" tabindex="-1">第09讲：高频真题解析II <a class="header-anchor" href="#第09讲-高频真题解析ii" aria-label="Permalink to &quot;第09讲：高频真题解析II&quot;">​</a></h1><p>这节课继续学习另外三种高频题：</p><ul><li><p>合并区间和无重叠区间</p></li><li><p>火星字典</p></li><li><p>基本计算器</p></li></ul><h1 id="例题分析一" tabindex="-1">例题分析一 <a class="header-anchor" href="#例题分析一" aria-label="Permalink to &quot;例题分析一&quot;">​</a></h1><p>LeetCode 第 56 题：给出一个区间的集合，请合并所有重叠的区间。</p><p><strong>示例 1</strong></p><p>输入: [[1,3], [2,6], [8,10], [15,18]]</p><p>输出: [[1,6], [8,10], [15,18]]</p><p>解释: 区间 [1,3] 和 [2,6] 重叠，将它们合并为 [1,6]。</p><p><strong>示例 2</strong></p><p>输入: [[1,4], [4,5]]</p><p>输出: [[1,5]]</p><p>解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。</p><h6 id="解题思路-贪婪法" tabindex="-1">解题思路：贪婪法 <a class="header-anchor" href="#解题思路-贪婪法" aria-label="Permalink to &quot;解题思路：贪婪法&quot;">​</a></h6><p>在分析一些比较复杂的问题时，可以从比较简单的情况着手来寻找突破口，先来看看两个区间会出现多少种情况。</p><p>假设有区间 a 和 b，区间 a 的起始时间要早于 b 的起始时间。那么它们之间有如下 3 种可能会出现的情况。</p>',16),E=s("ol",null,[s("li",null,[s("p",null,"情况一：两个区间没有任何重叠的部分，因此区间不会发生融合。")]),s("li",null,[s("p",null,"情况二和三：区间有重叠。"),s("ol",null,[s("li",null,[s("p",null,"新区间的起始时间是 a 的起始时间，这个不变；")]),s("li",null,[s("p",null,"新区间的终止时间是 a 的终止时间和 b 的终止时间的最大值，这个就是融合两个区间的最基本的思想。")])])])],-1),y=s("p",null,"给定了 n 个区间，如何有效地融合它们呢？以下是一种很直观也是非常有效的做法。",-1),u=p(`<ol><li><p>先将所有的区间按照起始时间的先后顺序排序，从头到尾扫描一遍</p></li><li><p>定义两个变量 previous 和 current，分别表示前一个区间和当前的区间</p><ol><li><p>如果没有融合，那么当前区间就变成了新的前一个区间，下一个区间成为新的当前区间</p></li><li><p>如果发生了融合，更新前一个区间的结束时间。</p></li></ol></li></ol><br><p>这个就是贪婪算法。</p><br><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int[][] merge(int[][] intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 将所有的区间按照起始时间的先后顺序排序</span></span>
<span class="line"><span style="color:#E1E4E8;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[0], i2[0]));</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个 previous 变量，初始化为 null  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int[] previous = null;</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个 result 变量，用来保存最终的区间结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#FDAEB7;font-style:italic;">int[]</span><span style="color:#E1E4E8;">&gt; result = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 从头开始遍历给定的所有区间</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int[] current : intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 如果这是第一个区间，或者当前区间和前一个区间没有重叠，那么将当前区间加入到结果中</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (previous == null || current[0] &gt; previous[1]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.add(previous = current);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else { // 否则，两个区间发生了重叠，更新前一个区间的结束时间</span></span>
<span class="line"><span style="color:#E1E4E8;">            prev[1] = Math.max(previous[1], current[1]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    return result.toArray(new int[result.size()][]); </span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int[][] merge(int[][] intervals) {</span></span>
<span class="line"><span style="color:#24292E;">    // 将所有的区间按照起始时间的先后顺序排序</span></span>
<span class="line"><span style="color:#24292E;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[0], i2[0]));</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个 previous 变量，初始化为 null  </span></span>
<span class="line"><span style="color:#24292E;">    int[] previous = null;</span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个 result 变量，用来保存最终的区间结果</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#B31D28;font-style:italic;">int[]</span><span style="color:#24292E;">&gt; result = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 从头开始遍历给定的所有区间</span></span>
<span class="line"><span style="color:#24292E;">    for (int[] current : intervals) {</span></span>
<span class="line"><span style="color:#24292E;">        // 如果这是第一个区间，或者当前区间和前一个区间没有重叠，那么将当前区间加入到结果中</span></span>
<span class="line"><span style="color:#24292E;">        if (previous == null || current[0] &gt; previous[1]) {</span></span>
<span class="line"><span style="color:#24292E;">            result.add(previous = current);</span></span>
<span class="line"><span style="color:#24292E;">        } else { // 否则，两个区间发生了重叠，更新前一个区间的结束时间</span></span>
<span class="line"><span style="color:#24292E;">            prev[1] = Math.max(previous[1], current[1]);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    return result.toArray(new int[result.size()][]); </span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div><h3 id="算法分析" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><p>时间复杂度 O(nlog(n))，因为一开始要对数组进行排序。</p><br><p>空间复杂度为 O(n)，因为用了一个额外的 result 数组来保存结果。</p><p>注意：和区间相关的问题，有非常多的变化，融合区间可以说是最基本也是最常考的一个。</p><h6 id="例题分析二" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>LeetCode 第 435 题：给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。</p><p>注意:</p><ol><li><p>可以认为区间的终点总是大于它的起点。</p></li><li><p>区间 [1,2] 和 [2,3] 的边界相互&quot;接触&quot;，但没有相互重叠。</p></li></ol><p><strong>示例 1</strong></p><p>输入: [ [1,2], [2,3], [3,4], [1,3] ]</p><p>输出: 1</p><p><strong>解释</strong>: 移除 [1,3] 后，剩下的区间没有重叠。</p><p><strong>示例 2</strong></p><p>输入: [ [1,2], [1,2], [1,2] ]</p><p>输出: 2</p><p><strong>解释</strong>: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。</p><p><strong>示例 3</strong></p><p>输入: [ [1,2], [2,3] ]</p><p>输出: 0</p><p><strong>解释</strong>: 你不需要移除任何区间，因为它们已经是无重叠的了。</p><h2 id="解题思路一-暴力法" tabindex="-1">解题思路一： 暴力法 <a class="header-anchor" href="#解题思路一-暴力法" aria-label="Permalink to &quot;解题思路一： 暴力法&quot;">​</a></h2><p>这道题是上一道题的一种变形，暴力法就是将各个区间按照起始时间的先后顺序排序，然后找出所有的组合，最后对每种组合分别判断各个区间有没有互相重叠。</p><h3 id="算法分析-1" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-1" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><ol><li><p>排序需要 O(nlog(n)) 的时间复杂度。</p></li><li><p>找出所有组合，按照前一节课里提到的从一个字符串里找出所有子序列的组合个数的方法，取出 n 个区间，有 Cnn 种，算上空的集合，那么一共有 Cn0 + Cn1 + Cn2 + ... Cnn = 2n。</p></li><li><p>对每种组合进行判断是否重叠，k 个区间，需要 O(k) 的时间复杂度。</p></li><li><p>总体时间复杂度为 Cn0 x 0 + Cn1×1 + Cn2×2 + ... + Cnk * k + ... + Cnn×n = n×2n-1。</p></li></ol><p>由于 n×2n-1 已经远大于 nlog(n)，所以排序的时间复杂度就可以忽略不计，整体的时间复杂度就是 O(n×2n)。</p><p>建议：一定要记一些常见的时间复杂度计算公式，对于在面试中能准确快速地分析复杂度是非常有帮助的。</p><h6 id="解题思路二-另一种暴力法" tabindex="-1">解题思路二：另一种暴力法 <a class="header-anchor" href="#解题思路二-另一种暴力法" aria-label="Permalink to &quot;解题思路二：另一种暴力法&quot;">​</a></h6><p>对于暴力法，还有另外的分析方法。用两个变量 prev 和 curr 分别表示前一个区间和当前区间。</p><ol><li><p>如果当前区间和前一个区间没有发生重叠，则尝试保留当前区间，表明此处不需要删除操作。</p></li><li><p>题目要求最少的删除个数，只有在这样的情况下，才不需要做任何删除操作。</p></li><li><p>在这种情况下，虽然两个区间没有重叠，但是也要考虑尝试删除当前区间的情况。</p></li><li><p>对比哪种情况所需要删除的区间最少。</p></li></ol><p>举例：有如下的几个区间 A、B、C，其中 A 是前一个区间，B 是当前区间，A 和 B 没有重叠。</p>`,37),h=s("ol",null,[s("li",null,[s("p",null,"如果只考虑保留 B 的情况，而不考虑把 B 删除的情况，那么就会错过一个答案，因为在这个情况下，把 B 删除，只剩下 A 和 C，它们互不重叠，也能得到最优的解。")]),s("li",null,[s("p",null,"遇到 A 和 B 相互重叠的情况时，必须要考虑把 B 删除掉。")])],-1),d=s("p",null,"为什么不把 A 删除呢？因为如果把 A 删了，B 和 C 还是可能会重叠，则需要删除掉更多的区间，不满足题目要求。",-1),g=p(`<h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 在主体函数里，先将区间按照起始时间的先后顺序排序，然后调用递归函数</span></span>
<span class="line"><span style="color:#E1E4E8;">int eraseOverlapIntervals(int[][] intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[0], i2[0]));</span></span>
<span class="line"><span style="color:#E1E4E8;">    return eraseOverlapIntervals(-1, 0, intervals);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 递归函数里，先检查是否已经处理完所有的区间，是，表明不需要删除操作，直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">int eraseOverlapIntervals(int prev, int curr, int[][] intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (curr == intervals.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    int taken = Integer.MAX_VALUE, nottaken;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (prev == -1 || intervals[prev][1] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= intervals[curr][0]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 只有当prev, curr没有发生重叠的时候，才可以选择保留当前的区间curr</span></span>
<span class="line"><span style="color:#E1E4E8;">        taken = eraseOverlapIntervals(curr, curr + 1, intervals);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 其他情况，可以考虑删除掉curr区间，看看删除了它之后会不会产生最好的结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    nottaken = eraseOverlapIntervals(prev, curr + 1, intervals) + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return Math.min(taken, nottaken);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 在主体函数里，先将区间按照起始时间的先后顺序排序，然后调用递归函数</span></span>
<span class="line"><span style="color:#24292E;">int eraseOverlapIntervals(int[][] intervals) {</span></span>
<span class="line"><span style="color:#24292E;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[0], i2[0]));</span></span>
<span class="line"><span style="color:#24292E;">    return eraseOverlapIntervals(-1, 0, intervals);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 递归函数里，先检查是否已经处理完所有的区间，是，表明不需要删除操作，直接返回</span></span>
<span class="line"><span style="color:#24292E;">int eraseOverlapIntervals(int prev, int curr, int[][] intervals) {</span></span>
<span class="line"><span style="color:#24292E;">    if (curr == intervals.length) {</span></span>
<span class="line"><span style="color:#24292E;">        return 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    int taken = Integer.MAX_VALUE, nottaken;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (prev == -1 || intervals[prev][1] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= intervals[curr][0]) {</span></span>
<span class="line"><span style="color:#24292E;">        // 只有当prev, curr没有发生重叠的时候，才可以选择保留当前的区间curr</span></span>
<span class="line"><span style="color:#24292E;">        taken = eraseOverlapIntervals(curr, curr + 1, intervals);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 其他情况，可以考虑删除掉curr区间，看看删除了它之后会不会产生最好的结果</span></span>
<span class="line"><span style="color:#24292E;">    nottaken = eraseOverlapIntervals(prev, curr + 1, intervals) + 1;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return Math.min(taken, nottaken);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="解题思路二-贪婪法" tabindex="-1">解题思路二：贪婪法 <a class="header-anchor" href="#解题思路二-贪婪法" aria-label="Permalink to &quot;解题思路二：贪婪法&quot;">​</a></h6><h3 id="按照起始时间排序" tabindex="-1">按照起始时间排序 <a class="header-anchor" href="#按照起始时间排序" aria-label="Permalink to &quot;按照起始时间排序&quot;">​</a></h3><p><strong>举例</strong>：有四个区间 A，B，C，D，A 跨度很大，B 和 C 重叠，C 和 D 重叠，而 B 和 D 不重叠。</p><p><strong>解法</strong>：要尽可能少得删除区间，那么当遇到了重叠的时候，应该把区间跨度大，即结束比较晚的那个区间删除。因为如果不删除它，它会和剩下的其他区间发生重叠的可能性非常大。</p><p>当发现 A 和 B 重叠，如果不删除 A，就得牺牲 B，C，D，而正确的答案是只需要删除 A 和 C 即可。</p><p>按照上述思想求解，实现过程如下。</p><br><ol><li>A 和 B 重叠，由于 A 结束得比较晚，此时删除区间 A，保留区间 B。</li></ol>`,10),f=s("ol",{start:"2"},[s("li",null,"B 和 C 重叠，由于 C 结束得晚，把区间 C 删除，保留区间 B。")],-1),m=s("ol",{start:"3"},[s("li",null,"B 和 D 不重叠，结束，一共只删除了 2 个区间。")],-1),v=p(`<p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int eraseOverlapIntervals(int[][] intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (intervals.length == 0) return 0; </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 将所有区间按照起始时间排序</span></span>
<span class="line"><span style="color:#E1E4E8;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[0], i2[0]));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 用一个变量 end 记录当前的最小结束时间点，以及一个 count 变量记录到目前为止删除掉了多少区间</span></span>
<span class="line"><span style="color:#E1E4E8;">    int end = intervals[0][1], count = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 从第二个区间开始，判断一下当前区间和前一个区间的结束时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 1; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> intervals.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 当前区间和前一个区间有重叠，即当前区间的起始时间小于上一个区间的结束时间，end记录下两个结束时间的最小值，把结束时间晚的区间删除，计数加1。</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (intervals[i][0] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> end) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            end = Math.min(end, intervals[i][1]);</span></span>
<span class="line"><span style="color:#E1E4E8;">            count++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            end = intervals[i][1];</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果没有发生重叠，根据贪婪法，更新 end 变量为当前区间的结束时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    return count;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int eraseOverlapIntervals(int[][] intervals) {</span></span>
<span class="line"><span style="color:#24292E;">    if (intervals.length == 0) return 0; </span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 将所有区间按照起始时间排序</span></span>
<span class="line"><span style="color:#24292E;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[0], i2[0]));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 用一个变量 end 记录当前的最小结束时间点，以及一个 count 变量记录到目前为止删除掉了多少区间</span></span>
<span class="line"><span style="color:#24292E;">    int end = intervals[0][1], count = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 从第二个区间开始，判断一下当前区间和前一个区间的结束时间</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 1; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> intervals.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        // 当前区间和前一个区间有重叠，即当前区间的起始时间小于上一个区间的结束时间，end记录下两个结束时间的最小值，把结束时间晚的区间删除，计数加1。</span></span>
<span class="line"><span style="color:#24292E;">        if (intervals[i][0] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> end) {</span></span>
<span class="line"><span style="color:#24292E;">            end = Math.min(end, intervals[i][1]);</span></span>
<span class="line"><span style="color:#24292E;">            count++;</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            end = intervals[i][1];</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 如果没有发生重叠，根据贪婪法，更新 end 变量为当前区间的结束时间</span></span>
<span class="line"><span style="color:#24292E;">    return count;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="按照结束时间排序" tabindex="-1">按照结束时间排序 <a class="header-anchor" href="#按照结束时间排序" aria-label="Permalink to &quot;按照结束时间排序&quot;">​</a></h3><p><strong>题目演变</strong>：在给定的区间中，最多有多少个区间相互之间是没有重叠的？</p><p>思路：假如求出了最多有 m 个区间是互相之间没有重叠的，则最少需要将 n−m 个区间删除才行。即，删掉&quot;害群之马&quot;，则剩下的就不会互相冲突了。</p><p>为什么按照结束时间排序会有助于我们统计出没有重叠的区间最大个数呢？举例说明如下。</p><p>假设今天有很多活动要举行，每个活动都有固定的时间，选择哪些活动，才能使参加的活动最多，然后在时间上不会互相重叠呢？</p><p>如果我们按照活动的起始时间去挑选，某个活动虽然开始得早，但是很有可能会持续一整天，就没有时间去参加其他活动了。如果按照活动的结束时间选，先挑那些最早结束的，就会尽可能节省出更多的时间来参加更多的活动。</p><p>根据这个思路，这道题也可以按照结束时间排序处理，于是，区间的顺序就是 {B, C, D, A}。</p>`,9),k=p(`<p>实现：目标就是统计有多少个没有重叠的情况发生。若当前的区间和前一个区间没有重叠的时候，计数器加 1，同时，用当前的区间去和下一个区间比较。</p><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int eraseOverlapIntervals(int[][] intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (intervals.length == 0) return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 按照结束时间将所有区间进行排序</span></span>
<span class="line"><span style="color:#E1E4E8;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[1], i2[1]));</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个变量 end 用来记录当前的结束时间，count 变量用来记录有多少个没有重叠的区间 </span></span>
<span class="line"><span style="color:#E1E4E8;">    int end = intervals[0][1], count = 1;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 从第二个区间开始遍历剩下的区间  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 1; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> intervals.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 当前区间和前一个结束时间没有重叠，那么计数加 1，同时更新一下新的结束时间</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (intervals[i][0] &gt;= end) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            end = intervals[i][1];</span></span>
<span class="line"><span style="color:#E1E4E8;">            count++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 用总区间的个数减去没有重叠的区间个数，即为最少要删除掉的区间个数</span></span>
<span class="line"><span style="color:#E1E4E8;">    return intervals.length - count; </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int eraseOverlapIntervals(int[][] intervals) {</span></span>
<span class="line"><span style="color:#24292E;">    if (intervals.length == 0) return 0;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 按照结束时间将所有区间进行排序</span></span>
<span class="line"><span style="color:#24292E;">    Arrays.sort(intervals, (i1, i2) -&gt; Integer.compare(i1[1], i2[1]));</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个变量 end 用来记录当前的结束时间，count 变量用来记录有多少个没有重叠的区间 </span></span>
<span class="line"><span style="color:#24292E;">    int end = intervals[0][1], count = 1;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    // 从第二个区间开始遍历剩下的区间  </span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 1; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> intervals.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        // 当前区间和前一个结束时间没有重叠，那么计数加 1，同时更新一下新的结束时间</span></span>
<span class="line"><span style="color:#24292E;">        if (intervals[i][0] &gt;= end) {</span></span>
<span class="line"><span style="color:#24292E;">            end = intervals[i][1];</span></span>
<span class="line"><span style="color:#24292E;">            count++;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 用总区间的个数减去没有重叠的区间个数，即为最少要删除掉的区间个数</span></span>
<span class="line"><span style="color:#24292E;">    return intervals.length - count; </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>关于区间的问题，LeetCode 上还有很多类似的题目，大家一定要去做做。</p><h1 id="例题分析三" tabindex="-1">例题分析三 <a class="header-anchor" href="#例题分析三" aria-label="Permalink to &quot;例题分析三&quot;">​</a></h1><p>LeetCode 第 269 题，火星字典：现有一种使用字母的全新语言，这门语言的字母顺序与英语顺序不同。假设，您并不知道其中字母之间的先后顺序。但是，会收到词典中获得一个不为空的单词列表。因为是从词典中获得的，所以该单词列表内的单词已经按这门新语言的字母顺序进行了排序。您需要根据这个输入的列表，还原出此语言中已知的字母顺序。</p><p><strong>示例 1</strong></p><p>输入:</p><p>[ &quot;wrt&quot;, &quot;wrf&quot;,&quot;er&quot;,&quot;ett&quot;, &quot;rftt&quot;]</p><p>输出: &quot;wertf&quot;</p><p><strong>示例 2</strong></p><p>输入:</p><p>[ &quot;z&quot;, &quot;x&quot;]</p><p>输出: &quot;zx&quot;</p><p><strong>示例 3</strong></p><p>输入:</p><p>[ &quot;z&quot;, &quot;x&quot;,&quot;z&quot;]</p><p>输出: &quot;&quot;</p><p>解释: 此顺序是非法的，因此返回 &quot;&quot;。</p><h2 id="解题思路" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路" aria-label="Permalink to &quot;解题思路&quot;">​</a></h2><p>首先，确定字符串排序方法。</p><br><p>理解题意，关键是搞清楚给定的输入字符串是怎么排序的？</p><br><p>举例：假如我们有这些单词 bar，bat，algorithm，cook，cog，那么按照字符顺序，应该怎么排呢？</p><p>正确的排序应该是：algorithm bat bar cog cook。</p><p>解法：</p><ul><li><p>逐位地比较两个相邻的字符串</p></li><li><p>第一个字母出现的顺序越早，排位越靠前</p></li><li><p>第一个字母相同时，比较第二字母，以此类推</p></li></ul><p>注意：两个字符串某个相同的位置出现了不同，就立即能得出它们的顺序，无需继续比较字符串剩余字母。</p><h3 id="求解示例-1" tabindex="-1"><strong>求解示例 1</strong> <a class="header-anchor" href="#求解示例-1" aria-label="Permalink to &quot;**求解示例 1**&quot;">​</a></h3><p>输入是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wrt</span></span>
<span class="line"><span style="color:#E1E4E8;">wrf</span></span>
<span class="line"><span style="color:#E1E4E8;">er</span></span>
<span class="line"><span style="color:#E1E4E8;">ett</span></span>
<span class="line"><span style="color:#E1E4E8;">rftt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wrt</span></span>
<span class="line"><span style="color:#24292E;">wrf</span></span>
<span class="line"><span style="color:#24292E;">er</span></span>
<span class="line"><span style="color:#24292E;">ett</span></span>
<span class="line"><span style="color:#24292E;">rftt</span></span></code></pre></div><p>解法：</p><ol><li>比较以 w 开头的字符串，它们是 wrt 和 wrf，之所以 wrt 会排在 wrf 之前，是因为 t 比 f 在火星字典里出现的顺序要早。此时将这两个字母的关系表达为 t -&gt; f。</li></ol>`,34),_=s("ol",{start:"2"},[s("li",null,"比较 wrf 和 er，第一个字母开始不同，因此，得出 w 排在 e 之前，记为 w -> e。")],-1),A=s("ol",{start:"3"},[s("li",null,"比较 er 和 ett，从第二个字母开始不一样，因此，得出 r 排在 t 之前，记为 r -> t。")],-1),C=s("ol",{start:"4"},[s("li",null,"比较 ett 和 rftt，从第一个字母开始不一样，得出 e 排在 r 之前，记为 e -> r。")],-1),q=s("p",null,"梳理上述关系，得 t -> f，w -> e，r -> t，e -> r",-1),B=s("p",null,"拓扑排序得到正确顺序：将每个字母看成是图里的顶点，它们之间的关系就好比是连接顶点与顶点的变，而且是有向边，所以这个图是一个有向图。最后对这个有向图进行拓扑排序，就可以得出最终的结果。",-1),b=p(`<p><strong>代码实现</strong></p><p>包括两大步骤，第一步是根据输入构建一个有向图；第二步是对这个有向图进行拓扑排序。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 基本情况处理，比如输入为空，或者输入的字符串只有一个</span></span>
<span class="line"><span style="color:#E1E4E8;">String alienOrder(String[] words) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (words == null || words.length == 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        return null;</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (words.length == 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return words[0];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 构建有向图：定义一个邻接链表 adjList，也可以用邻接矩阵</span></span>
<span class="line"><span style="color:#E1E4E8;">    Map&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character,</span><span style="color:#B392F0;"> List</span><span style="color:#FDAEB7;font-style:italic;">&lt;Character</span><span style="color:#E1E4E8;">&gt;&gt; adjList = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> words.length - 1; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String w1 = words[i], w2 = words[i + 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">        int n1 = w1.length(), n2 = w2.length();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        boolean found = false;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> Math.max(w1.length(), w2.length()); j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Character c1 = j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n1 ? w1.charAt(j) : null;</span></span>
<span class="line"><span style="color:#E1E4E8;">            Character c2 = j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n2 ? w2.charAt(j) : null;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            if (c1 != null &amp;&amp; !adjList.containsKey(c1)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                adjList.put(c1, new ArrayList&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt;());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            if (c2 != null &amp;&amp; !adjList.containsKey(c2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                adjList.put(c2, new ArrayList&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt;());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            if (c1 != null &amp;&amp; c2 != null &amp;&amp; c1 != c2 &amp;&amp; !found) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                adjList.get(c1).add(c2);</span></span>
<span class="line"><span style="color:#E1E4E8;">                found = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Set&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; visited = new HashSet</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    Set&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; loop = new HashSet</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; stack = new Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (Character key : adjList.keySet()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (!visited.contains(key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (!topologicalSort(adjList, key, visited, loop, stack)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                return &quot;&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    StringBuilder sb = new StringBuilder();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sb.append(stack.pop());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return sb.toString（）；</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 基本情况处理，比如输入为空，或者输入的字符串只有一个</span></span>
<span class="line"><span style="color:#24292E;">String alienOrder(String[] words) {</span></span>
<span class="line"><span style="color:#24292E;">    if (words == null || words.length == 0)</span></span>
<span class="line"><span style="color:#24292E;">        return null;</span></span>
<span class="line"><span style="color:#24292E;">    if (words.length == 1) {</span></span>
<span class="line"><span style="color:#24292E;">        return words[0];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 构建有向图：定义一个邻接链表 adjList，也可以用邻接矩阵</span></span>
<span class="line"><span style="color:#24292E;">    Map&lt;</span><span style="color:#B31D28;font-style:italic;">Character,</span><span style="color:#6F42C1;"> List</span><span style="color:#B31D28;font-style:italic;">&lt;Character</span><span style="color:#24292E;">&gt;&gt; adjList = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> words.length - 1; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        String w1 = words[i], w2 = words[i + 1];</span></span>
<span class="line"><span style="color:#24292E;">        int n1 = w1.length(), n2 = w2.length();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        boolean found = false;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        for (int j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> Math.max(w1.length(), w2.length()); j++) {</span></span>
<span class="line"><span style="color:#24292E;">            Character c1 = j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n1 ? w1.charAt(j) : null;</span></span>
<span class="line"><span style="color:#24292E;">            Character c2 = j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n2 ? w2.charAt(j) : null;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            if (c1 != null &amp;&amp; !adjList.containsKey(c1)) {</span></span>
<span class="line"><span style="color:#24292E;">                adjList.put(c1, new ArrayList&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt;());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            if (c2 != null &amp;&amp; !adjList.containsKey(c2)) {</span></span>
<span class="line"><span style="color:#24292E;">                adjList.put(c2, new ArrayList&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt;());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            if (c1 != null &amp;&amp; c2 != null &amp;&amp; c1 != c2 &amp;&amp; !found) {</span></span>
<span class="line"><span style="color:#24292E;">                adjList.get(c1).add(c2);</span></span>
<span class="line"><span style="color:#24292E;">                found = true;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Set&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; visited = new HashSet</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    Set&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; loop = new HashSet</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; stack = new Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (Character key : adjList.keySet()) {</span></span>
<span class="line"><span style="color:#24292E;">        if (!visited.contains(key)) {</span></span>
<span class="line"><span style="color:#24292E;">            if (!topologicalSort(adjList, key, visited, loop, stack)) {</span></span>
<span class="line"><span style="color:#24292E;">                return &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    StringBuilder sb = new StringBuilder();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        sb.append(stack.pop());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return sb.toString（）；</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 将当前节点 u 加入到 visited 集合以及 loop 集合中。</span></span>
<span class="line"><span style="color:#E1E4E8;">boolean topologicalSort(Map&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character,</span><span style="color:#B392F0;"> List</span><span style="color:#FDAEB7;font-style:italic;">&lt;Character</span><span style="color:#E1E4E8;">&gt;&gt; adjList, char u, </span></span>
<span class="line"><span style="color:#E1E4E8;">                        Set&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; visited, Set&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; loop, Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; stack) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    visited.add(u);</span></span>
<span class="line"><span style="color:#E1E4E8;">    loop.add(u);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (adjList.containsKey(u)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> adjList.get(u).size(); i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            char v = adjList.get(u).get(i);</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (loop.contains(v))</span></span>
<span class="line"><span style="color:#E1E4E8;">                return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (!visited.contains(v)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                if (!topologicalSort(adjList, v, visited, loop, stack)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    loop.remove(u);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    stack.push(u);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 将当前节点 u 加入到 visited 集合以及 loop 集合中。</span></span>
<span class="line"><span style="color:#24292E;">boolean topologicalSort(Map&lt;</span><span style="color:#B31D28;font-style:italic;">Character,</span><span style="color:#6F42C1;"> List</span><span style="color:#B31D28;font-style:italic;">&lt;Character</span><span style="color:#24292E;">&gt;&gt; adjList, char u, </span></span>
<span class="line"><span style="color:#24292E;">                        Set&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; visited, Set&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; loop, Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; stack) {</span></span>
<span class="line"><span style="color:#24292E;">    visited.add(u);</span></span>
<span class="line"><span style="color:#24292E;">    loop.add(u);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (adjList.containsKey(u)) {</span></span>
<span class="line"><span style="color:#24292E;">        for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> adjList.get(u).size(); i++) {</span></span>
<span class="line"><span style="color:#24292E;">            char v = adjList.get(u).get(i);</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            if (loop.contains(v))</span></span>
<span class="line"><span style="color:#24292E;">                return false;</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">            if (!visited.contains(v)) {</span></span>
<span class="line"><span style="color:#24292E;">                if (!topologicalSort(adjList, v, visited, loop, stack)) {</span></span>
<span class="line"><span style="color:#24292E;">                    return false;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    loop.remove(u);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    stack.push(u);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return true;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>用深度优先的方法进行拓扑排序，一定要借用下面三者。</p><ol><li><p>visited 集合，用来记录哪些顶点已经被访问过。</p></li><li><p>stack 堆栈，从某个顶点出发，访问完了所有其他顶点，最后才把当前的这个顶点加入到堆栈里。即，若要该点加入到 stack 里，必须先把跟它有联系的顶点都处理完。举例说明，如果我要学习课程 A，得先把课程 B，C 以及 D 都看完。</p></li><li><p>loop 集合，为了有效防止有向图里出现环的情况。举例说明如下。</p></li></ol><p>假如我们有这么一个有向图。</p>`,7),D=s("ul",null,[s("li",null,[s("p",null,"从 A 开始对这个图进行深度优先的遍历，那么当访问到顶点 D 的时候，visited 集合以及 loop 集合都是 {A, B, C, D}。")]),s("li",null,[s("p",null,"当从 D 继续遍历到 B 的时候，发现 B 已经在 loop 集合里。")]),s("li",null,[s("p",null,"因此得出结论，在这一轮遍历中，出现了环。")])],-1),w=s("p",null,"为什么不能单单用 visited 集合来帮助判断呢？例如下面情况。",-1),S=p(`<ul><li><p>从 D 访问 B 的时候，如果判断因为 B 已经被访问过了，于是得出这里就有一个环，显然判断错误。</p></li><li><p>当每一轮访问结束后，都必须要把 loop 集合清空，才能把其他顶点也加入到堆栈里。</p></li><li><p>否则，当 D 遇到 B 的时候，也会认为这里有环出现，而提前终止程序，无法将它加入到堆栈中。</p></li></ul><h6 id="例题分析四" tabindex="-1">例题分析四 <a class="header-anchor" href="#例题分析四" aria-label="Permalink to &quot;例题分析四&quot;">​</a></h6><p>LeetCode 第 772 题，基本计算器：实现一个基本的计算器来计算简单的表达式字符串。</p><p>说明：</p><ul><li><p>表达式字符串可以包含左括号 ( 和右括号 )，加号 + 和减号 -，非负整数和空格。</p></li><li><p>表达式字符串只包含非负整数， + - * / 操作符，左括号 ( ，右括号 ) 和空格。整数除法需要向下截断。</p></li></ul><p><strong>示例 1</strong>：</p><p>&quot;1 + 1&quot; = 2</p><p>&quot; 6-4 / 2 &quot; = 4</p><p>&quot;2×(5+5×2)/3+(6/2+8)&quot; = 21</p><p>&quot;(2+6×3+5- (3×14/7+2)×5)+3&quot; = -12</p><h6 id="解题思路一-只有加号" tabindex="-1">解题思路一：只有加号 <a class="header-anchor" href="#解题思路一-只有加号" aria-label="Permalink to &quot;解题思路一：只有加号&quot;">​</a></h6><p>例题：若表达式里只有数字和加法符号，没有减法，也没有空格，并且输入的表达式一定合法，那么应该如何处理？例如：1+2+10。</p><p>解法：一旦遇到了数字就不断地相加。</p><h3 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 转换，将字符串的字符放入到一个优先队列中</span></span>
<span class="line"><span style="color:#E1E4E8;">int calculate(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        queue.offer(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义两个变量，num 用来表示当前的数字，sum 用来记录最后的和 </span></span>
<span class="line"><span style="color:#E1E4E8;">    int num = 0, sum = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 遍历优先队列，从队列中一个一个取出字符 </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 如果当前字符是数字，那么就更新 num 变量，如果遇到了加号，就把当前的 num 加入到 sum 里，num 清零</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            sum += num;</span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    sum += num; // 最后没有加号，再加一次</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return sum;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 转换，将字符串的字符放入到一个优先队列中</span></span>
<span class="line"><span style="color:#24292E;">int calculate(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#24292E;">        queue.offer(c);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    // 定义两个变量，num 用来表示当前的数字，sum 用来记录最后的和 </span></span>
<span class="line"><span style="color:#24292E;">    int num = 0, sum = 0;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    // 遍历优先队列，从队列中一个一个取出字符 </span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 如果当前字符是数字，那么就更新 num 变量，如果遇到了加号，就把当前的 num 加入到 sum 里，num 清零</span></span>
<span class="line"><span style="color:#24292E;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#24292E;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            sum += num;</span></span>
<span class="line"><span style="color:#24292E;">            num = 0;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    sum += num; // 最后没有加号，再加一次</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return sum;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="代码扩展一" tabindex="-1">代码扩展一 <a class="header-anchor" href="#代码扩展一" aria-label="Permalink to &quot;代码扩展一&quot;">​</a></h3><p>如上，在返回 sum 之前，我们还进行了一次额外的操作：sum += num，就是为了要处理结束时的特殊情况。若在表达式的最后添加上一个&quot;+&quot;，也能实现同样的效果，代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int calculate(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        queue.offer(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.add(&#39;+&#39;); // 在末尾添加一个加号</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return sum;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int calculate(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#24292E;">        queue.offer(c);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    queue.add(&#39;+&#39;); // 在末尾添加一个加号</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return sum;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上，在优先队列的最后添加一个加号。</p><h3 id="代码扩展二" tabindex="-1">代码扩展二 <a class="header-anchor" href="#代码扩展二" aria-label="Permalink to &quot;代码扩展二&quot;">​</a></h3><p>若输入的时候允许空格，如何处理？代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int calculate(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int calculate(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#24292E;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上，在添加到优先队列的时候，过滤到那些空格就好了。</p><h6 id="解题思路二-引入减号" tabindex="-1">解题思路二：引入减号 <a class="header-anchor" href="#解题思路二-引入减号" aria-label="Permalink to &quot;解题思路二：引入减号&quot;">​</a></h6><p>例题：若表达式支持减法，应该怎么处理？例如：1 + 2 - 10。</p><p>解法 1：借助两个 stack，一个 stack 专门用来放数字；一个 stack 专门用来放符号。</p><p>解法 2：将表达式看作 1 + 2 + (-10)，把 -10 看成一个整体，同时，利用一个变量 sign 来表示该数字前的符号，这样即可沿用解法。</p><p>解法 2 的具体操作如下。</p>`,28),I=p(`<h3 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int calculate(String s) {   </span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.add(&#39;+&#39;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    char sign = &#39;+&#39;; // 添加一个符号标志变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    int num = 0, sum = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 遇到了符号，表明我们要开始统计一下当前的结果了</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (sign == &#39;+&#39;) { //数字的符号是 +</span></span>
<span class="line"><span style="color:#E1E4E8;">                sum += num;</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;-&#39;) { // 数字的符号是 -</span></span>
<span class="line"><span style="color:#E1E4E8;">                sum -= num;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">            sign = c;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return sum;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int calculate(String s) {   </span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#24292E;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    queue.add(&#39;+&#39;);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    char sign = &#39;+&#39;; // 添加一个符号标志变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    int num = 0, sum = 0;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#24292E;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            // 遇到了符号，表明我们要开始统计一下当前的结果了</span></span>
<span class="line"><span style="color:#24292E;">            if (sign == &#39;+&#39;) { //数字的符号是 +</span></span>
<span class="line"><span style="color:#24292E;">                sum += num;</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;-&#39;) { // 数字的符号是 -</span></span>
<span class="line"><span style="color:#24292E;">                sum -= num;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            num = 0;</span></span>
<span class="line"><span style="color:#24292E;">            sign = c;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return sum;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="解题思路三-引入乘除" tabindex="-1">解题思路三：引入乘除 <a class="header-anchor" href="#解题思路三-引入乘除" aria-label="Permalink to &quot;解题思路三：引入乘除&quot;">​</a></h6><p>例题：若引入乘法和除法，如何处理？举个例子：1 + 2 x 10。</p><br><p>解法：要考虑符号的优先级问题，不能再简单得对 sum 进行单向的操作。当遇到乘号的时候：sum = 1，num = 2，而乘法的优先级比较高，得先处理 2 x 10 才能加 1。对此，就把它们暂时记录下来，具体操作如下。</p>`,6),L=p(`<h3 id="代码实现-3" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-3" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int calculate(String s) {   </span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.add(&#39;+&#39;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    char sign = &#39;+&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int num = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个新的变量 stack，用来记录要被处理的数</span></span>
<span class="line"><span style="color:#E1E4E8;">    Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; stack = new Stack</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (sign == &#39;+&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(num); // 遇到加号，把当前的数压入到堆栈中</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;-&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(-num); // 减号，把当前数的相反数压入到堆栈中</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(stack.pop() * num); // 乘号，把前一个数从堆栈中取出，然后和当前的数相乘，再放回堆栈</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;/&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(stack.pop() / num); // 除号，把前一个数从堆栈中取出，然后除以当前的数，再把结果放回堆栈</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">            sign = c;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    int sum = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 堆栈里存储的都是各个需要相加起来的结果，把它们加起来，返回总和即可</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sum += stack.pop();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return sum;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int calculate(String s) {   </span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#24292E;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    queue.add(&#39;+&#39;);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    char sign = &#39;+&#39;;</span></span>
<span class="line"><span style="color:#24292E;">    int num = 0;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个新的变量 stack，用来记录要被处理的数</span></span>
<span class="line"><span style="color:#24292E;">    Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; stack = new Stack</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#24292E;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            if (sign == &#39;+&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(num); // 遇到加号，把当前的数压入到堆栈中</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;-&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(-num); // 减号，把当前数的相反数压入到堆栈中</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(stack.pop() * num); // 乘号，把前一个数从堆栈中取出，然后和当前的数相乘，再放回堆栈</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;/&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(stack.pop() / num); // 除号，把前一个数从堆栈中取出，然后除以当前的数，再把结果放回堆栈</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            num = 0;</span></span>
<span class="line"><span style="color:#24292E;">            sign = c;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    int sum = 0;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 堆栈里存储的都是各个需要相加起来的结果，把它们加起来，返回总和即可</span></span>
<span class="line"><span style="color:#24292E;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        sum += stack.pop();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return sum;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="解题思路四-引入小括号" tabindex="-1">解题思路四：引入小括号 <a class="header-anchor" href="#解题思路四-引入小括号" aria-label="Permalink to &quot;解题思路四：引入小括号&quot;">​</a></h6><p>例题：如何支持小括号？</p><p>解法：小括号里的表达式优先计算。</p><ol><li><p>先利用上面的方法计算小括号里面的表达式。</p></li><li><p>当遇到一个左括号的时候，可以递归地处理；当遇到了右括号，表明小括号里面的处理完毕，递归应该返回。</p></li></ol><h3 id="代码实现-4" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-4" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 在主函数里调用一个递归函数</span></span>
<span class="line"><span style="color:#E1E4E8;">int calculate(String s) {   </span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.offer(&#39;+&#39;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return calculate(queue);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">int calculate(Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; queue) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    char sign = &#39;+&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int num = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; stack = new Stack</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 遇到一个左括号，开始递归调用，求得括号里的计算结果，将它赋给当前的 num  </span></span>
<span class="line"><span style="color:#E1E4E8;">        else if (c == &#39;(&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            num = calculate(queue);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (sign == &#39;+&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(num);</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;-&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(-num);</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(stack.pop() * num);</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else if (sign == &#39;/&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stack.push(stack.pop() / num);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            num = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">            sign = c;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            // 遇到右括号，就可以结束循环，直接返回当前的总和     </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (c == &#39;)&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                break;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int sum = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sum += stack.pop();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return sum;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 在主函数里调用一个递归函数</span></span>
<span class="line"><span style="color:#24292E;">int calculate(String s) {   </span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    for (char c : s.toCharArray()) {</span></span>
<span class="line"><span style="color:#24292E;">        if (c != &#39; &#39;) queue.offer(c);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    queue.offer(&#39;+&#39;);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return calculate(queue);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">int calculate(Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; queue) {</span></span>
<span class="line"><span style="color:#24292E;">    char sign = &#39;+&#39;;</span></span>
<span class="line"><span style="color:#24292E;">    int num = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; stack = new Stack</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        char c = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        if (Character.isDigit(c)) {</span></span>
<span class="line"><span style="color:#24292E;">            num = 10 * num + c - &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">        // 遇到一个左括号，开始递归调用，求得括号里的计算结果，将它赋给当前的 num  </span></span>
<span class="line"><span style="color:#24292E;">        else if (c == &#39;(&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">            num = calculate(queue);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        else {</span></span>
<span class="line"><span style="color:#24292E;">            if (sign == &#39;+&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(num);</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;-&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(-num);</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(stack.pop() * num);</span></span>
<span class="line"><span style="color:#24292E;">            } else if (sign == &#39;/&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                stack.push(stack.pop() / num);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            num = 0;</span></span>
<span class="line"><span style="color:#24292E;">            sign = c;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            // 遇到右括号，就可以结束循环，直接返回当前的总和     </span></span>
<span class="line"><span style="color:#24292E;">            if (c == &#39;)&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                break;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int sum = 0;</span></span>
<span class="line"><span style="color:#24292E;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        sum += stack.pop();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return sum;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h6><p>这节课讲解了一些解决区间问题的方法，以及拓扑排序算法，最后实现了一个基本的计算器。</p><p>注意：这些问题都是面试高频题，但不要死记硬背，要通过理解其思想来达到融会贯通。</p><p>下一节课将讨论几道难度比较高的题目。</p><br>`,13);function F(T,P,j,x,M,V){const n=o("Image");return t(),c("div",null,[r,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeoeAXmexAABQeDb1BWQ016.png"}),l(),E,y,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeomAZY5oAFqba-5PZJc045.gif"}),l(),u,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeomAJypIAAA1_CqUqGA909.png"}),l(),h,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeomAasCyABO9nAPnBLM742.gif"}),l(),d,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeoqAMYGUAB4TTFLJ7aA153.gif"}),l(),g,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeouALsHDACoIa6RqiFk139.gif"}),l(),f,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeouAVgkTACrf8XPAR8o811.gif"}),l(),m,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeoyAS7VEABGI5Z_ovpM719.gif"}),l(),v,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeoyAMCcNAABEWLc4h90512.png"}),l(),k,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2Ieo2AUKzRAB96MtWjhn0834.gif"}),l(),_,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2Ieo2AHp2gABsjRhdqs-o833.gif"}),l(),A,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2Ieo6AGzbmABkoJlXVd6Q543.gif"}),l(),C,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2Ieo-AQsABACwHvWpfLUM265.gif"}),l(),q,B,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2Ieo-AL2rOAAA-SDWivvo697.png"}),l(),b,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2Ieo-AfXiGAB41ZU6ORu4144.gif"}),l(),D,w,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IepCADkCaAAA9qnc1K_8002.png"}),l(),S,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IepKAGgQSAIKuyG7w9pk329.gif"}),l(),I,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IepSAeUhVAFLy8rXwn-M290.gif"}),l(),L])}const N=e(i,[["render",F]]);export{Q as __pageData,N as default};
