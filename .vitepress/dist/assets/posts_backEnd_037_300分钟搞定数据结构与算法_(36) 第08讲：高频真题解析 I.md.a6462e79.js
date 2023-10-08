import{_ as e,j as t,o,g as i,k as l,h as n,Q as p,s}from"./chunks/framework.a0d18f64.js";const ss=JSON.parse('{"title":"第08讲：高频真题解析I","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(36) 第08讲：高频真题解析 I.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(36) 第08讲：高频真题解析 I.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(36) 第08讲：高频真题解析 I.md"},r=p('<h1 id="第08讲-高频真题解析i" tabindex="-1">第08讲：高频真题解析I <a class="header-anchor" href="#第08讲-高频真题解析i" aria-label="Permalink to &quot;第08讲：高频真题解析I&quot;">​</a></h1><p>从这节课开始，我们将一起分析 LeetCode 里面的高频题。这些题目都非常具有代表性，是各大公司面试的高频题，因为它们可以考察大家对问题的剖析能力，解决问题的方案是否完善，以及代码的书写功底。</p><p>这节课主要介绍的解题方法是：</p><ul><li><p>线性法及优化线性法</p></li><li><p>切分法</p></li><li><p>快速选择算法</p></li><li><p>最小堆法</p></li><li><p>分治法</p></li></ul><h6 id="例题分析一" tabindex="-1">例题分析一 <a class="header-anchor" href="#例题分析一" aria-label="Permalink to &quot;例题分析一&quot;">​</a></h6><p>LeetCode 第 03 题：给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。</p><p>示例 1</p><p>输入：&quot;abcabcbb&quot;</p><p>输出：3</p><p>解释：因为无重复字符的最长子串是&quot;abc&quot;，其长度为3。</p><p>示例 2</p><p>输入：&quot;bbbbb&quot;</p><p>输出：1</p><p>解释：因为无重复字符的最长子串是 &quot;b&quot;，其长度为 1。</p><p>示例 3</p><p>输入：&quot;pwwkew&quot;</p><p>输出：3</p><p>解释：因为无重复字符的最长子串是 &quot;wke&quot;，其长度为 3。</p><p>注意：答案必须是子串的长度，&quot;pwke&quot; 是一个子序列，不是子串。</p><h6 id="解题思路一-暴力法" tabindex="-1">解题思路一：暴力法 <a class="header-anchor" href="#解题思路一-暴力法" aria-label="Permalink to &quot;解题思路一：暴力法&quot;">​</a></h6><h6 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h6>',21),E=p('<p>找出所有的子串，然后一个一个地去判断每个子串里是否包含有重复的字符。假设字符串的长度为 n，那么有 n×(n + 1) / 2 个非空子串。计算过程如下。</p><p>长度为 1 的子串，有 n 个</p><p>长度为 2 的子串，每两个每两个相邻地取，一共有 n - 1 个</p><p>长度为 3 的子串，每三个每三个相邻地取，一共有 n - 2 个</p><p>......</p><p>以此类推，长度为 k 的子串，有 n - k + 1 个。</p><p>当 k 等于 n 的时候，n - k + 1=1，即长度为 n 的子串有 1 个。</p><p>所有情况相加，得到所有子串的长度为：</p><p>n + (n - 1) + (n - 2) + (n - 3) + ... + 2 + 1 = n×(n + 1) / 2</p><p>算上空字符串，那么就一共有 n×(n + 1) / 2 + 1 个。</p><p>拓展一下，对于一个长度为 n 的字符串，一共有多少个子序列呢？和子串不一样，子序列里的元素不需要相互挨着。</p><p>同理分析，长度为 1 的子序列有 n 个，即 Cn^1^，长度为 2 的子序列个数为 Cn^2^，以此类推，长度为 k 的子序列有 Cn^k^，那么所有子序列的个数（包括空序列）是 Cn^0^ + Cn^1^ + Cn^2^ + ... Cn^n^ = 2^n^</p><p>注意：对于统计子串和子序列个数的方法和结果，大家务必记下来，对于在分析各种问题时会有很大帮助。</p><p>回到本来问题，如果对所有的子串进行判断，从每个子串里寻找出最长的那个并且没有重复字符的，那么复杂度就是：O(n×(n + 1)/2×n) = O(n^3^)。</p><h6 id="解题思路二-线性法" tabindex="-1">解题思路二：线性法 <a class="header-anchor" href="#解题思路二-线性法" aria-label="Permalink to &quot;解题思路二：线性法&quot;">​</a></h6><p>例题 1：给定的字符串里有一段是没有重复字符的，如下，能不能把下一个字符 a 加进来？</p>',16),y=s("p",null,'要看当前的子串"abc"是否已经包含了字符 a。',-1),u=s("ol",null,[s("li",null,[s("p",null,'扫描一遍"abc"，当发现某个字符与 a 相同，可以得出结论。')]),s("li",null,[s("p",null,'把"abc"三个字符放入到一个哈希集合里，那么就能在 O(1) 的时间里作出判断，提高速度。')])],-1),h=s("br",null,null,-1),m=s("p",null,"使用定义一个哈希集合 set 的方法，从给定字符串的头开始，每次检查一下当前字符是不是在集合里边，如果不在，说明这个字符不会造成重复和冲突，把它加入到集合里，并统计一下当前集合的长度，可能它就是最长的那个子串。",-1),g=s("p",null,"例题 2：如果发现新的字符已经在集合里已经出现了，怎么办？",-1),d=s("p",null,'deabc 是目前为止没有重复字符的最长子串，当我们遇到下一个字符a的时候，以这个字符结尾的没有重复的子串是"bca"，而此时集合里的字符有：d，e，a，b，c。首先，必须把 a 删除，因为这样才能把新的 a 加入到集合里，那么如何判断要把 d 和 e 也都删除呢？',-1),k=p(`<ol><li><p>可以定义两个指针 i 和 j。</p></li><li><p>i 是慢指针，j 是快指针，当 j 遇到了一个重复出现的字符时，从慢指针开始一个一个地将 i 指针指向的字符从集合里删除，然后判断一下是否可以把新字符加入到集合里而不会产生重复。</p></li><li><p>把字符 d 删除后，i 指针向前移动一步，此时集合里还剩下：e, a, b, c，很明显，字符 a 还在集合里，仍然要继续删除。</p></li><li><p>把字符 e 删除后，集合里还剩 a，b，c，字符 a 还在集合里，继续删除慢指针 i 指向的字符 a。</p></li><li><p>集合里剩 b，c，可以放心地把新的字符 a 放入到集合里，然后快指针 j 往前移动一步。</p></li></ol><br><p>通过这样不断尝试，每当新的字符加入到集合里的时候，统计一下当前集合里的元素个数，最后记录下最长的那个。</p><h6 id="时间复杂度" tabindex="-1"><strong>时间复杂度</strong> <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;**时间复杂度**&quot;">​</a></h6><p>由于采用的是快慢指针的策略，字符串最多被遍历两次，快指针遇到的字符会被添加到哈希集合，而慢指针遇到的字符会从哈希集合里删除，对哈希集合的操作都是 O(1) 的时间复杂度，因此，整个算法的时间复杂度就是 n×O(1) + n×O(1) = O(n)。</p><br><p><strong>空间复杂度</strong></p><p>由于用到了一个哈希集合，在最坏的情况下，给定的字符串没有任何重复的字符，需要把每个字符都加入到哈希集合里，因此空间复杂度是 O(n)。</p><h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 定义一个哈希集合 set，初始化结果 max 为 0</span></span>
<span class="line"><span style="color:#E1E4E8;">int lengthOfLongestSubstring(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Set&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character</span><span style="color:#E1E4E8;">&gt; set = new HashSet</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    int max = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 用快慢指针 i 和 j 扫描一遍字符串，如果快指针所指向的字符已经出现在哈希集合里，不断地尝试将慢指针所指向的字符从哈希集合里删除</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0, j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> s.length(); j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        while (set.contains(s.charAt(j))) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            set.remove(s.charAt(i));</span></span>
<span class="line"><span style="color:#E1E4E8;">            i++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 当快指针的字符加入到哈希集合后，更新一下结果 max</span></span>
<span class="line"><span style="color:#E1E4E8;">        set.add(s.charAt(j));</span></span>
<span class="line"><span style="color:#E1E4E8;">        max = Math.max(max, set.size());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return max;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 定义一个哈希集合 set，初始化结果 max 为 0</span></span>
<span class="line"><span style="color:#24292E;">int lengthOfLongestSubstring(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    Set&lt;</span><span style="color:#B31D28;font-style:italic;">Character</span><span style="color:#24292E;">&gt; set = new HashSet</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    int max = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 用快慢指针 i 和 j 扫描一遍字符串，如果快指针所指向的字符已经出现在哈希集合里，不断地尝试将慢指针所指向的字符从哈希集合里删除</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0, j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> s.length(); j++) {</span></span>
<span class="line"><span style="color:#24292E;">        while (set.contains(s.charAt(j))) {</span></span>
<span class="line"><span style="color:#24292E;">            set.remove(s.charAt(i));</span></span>
<span class="line"><span style="color:#24292E;">            i++;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        // 当快指针的字符加入到哈希集合后，更新一下结果 max</span></span>
<span class="line"><span style="color:#24292E;">        set.add(s.charAt(j));</span></span>
<span class="line"><span style="color:#24292E;">        max = Math.max(max, set.size());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return max;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="解题思路三-优化的线性法" tabindex="-1">解题思路三：优化的线性法 <a class="header-anchor" href="#解题思路三-优化的线性法" aria-label="Permalink to &quot;解题思路三：优化的线性法&quot;">​</a></h6><p>在上述例题中，能否让慢指针不再一步一步地挪动，而是迅速地跳到字符 b 的位置？</p><p>可以用哈希表来记录每个字符以及它出现的位置，当遇到了字符 a 的时候，就知道跟它重复的前一个字符出现的位置，只需要让慢指针指向那个位置的下一个即可。（如果题目说所有字符都是字母的话，也可以用一个数组去记录。）</p><p>遇到字符 a，此时哈希表的记录 {d: 0, e: 1, a: 2, b: 3: c: 4}，a 的位置是 2，把 2 加上 1 等于 3，就能让慢指针 i 指向下标为 3 的位置，即 b 字符的地方。</p>`,14),b=s("p",null,"注意：在运用这个算法的时候，不能去数哈希集合的元素个数来作为子串的长度，所以得额外维护一个变量来保存最后的结果。",-1),_=s("p",null,"但是在一些情况下，我们不能简单地将取出来的重复位置加 1，如下：快指针 j 指向的字符是 e，而 e 在哈希表里记录的位置是 1。",-1),f=p(`<p>在这种情况下，没有必要让 i 重新指向 e 后面的 a。此时，i 应该保留在原地不动。因此，i 被移动到的新位置应该等于 max(i，重复字符出现位置 + 1）。</p><p><strong>代码实现</strong></p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 定义一个哈希表用来记录上一次某个字符出现的位置，并初始化结果 max 为 0</span></span>
<span class="line"><span style="color:#E1E4E8;">int lengthOfLongestSubstring(String s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Map&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character,</span><span style="color:#B392F0;"> Integer</span><span style="color:#E1E4E8;">&gt; map = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    int max = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 用快慢指针 i 和 j 扫描一遍字符串，若快指针所对应的字符已经出现过，则慢指针跳跃</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0, j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> s.length(); j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (map.containsKey(s.charAt(j))) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            i = Math.max(i, map.get(s.charAt(j)) + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        map.put(s.charAt(j), j);</span></span>
<span class="line"><span style="color:#E1E4E8;">        max = Math.max(max, j - i + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    return max;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 定义一个哈希表用来记录上一次某个字符出现的位置，并初始化结果 max 为 0</span></span>
<span class="line"><span style="color:#24292E;">int lengthOfLongestSubstring(String s) {</span></span>
<span class="line"><span style="color:#24292E;">    Map&lt;</span><span style="color:#B31D28;font-style:italic;">Character,</span><span style="color:#6F42C1;"> Integer</span><span style="color:#24292E;">&gt; map = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    int max = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 用快慢指针 i 和 j 扫描一遍字符串，若快指针所对应的字符已经出现过，则慢指针跳跃</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0, j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> s.length(); j++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (map.containsKey(s.charAt(j))) {</span></span>
<span class="line"><span style="color:#24292E;">            i = Math.max(i, map.get(s.charAt(j)) + 1);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        map.put(s.charAt(j), j);</span></span>
<span class="line"><span style="color:#24292E;">        max = Math.max(max, j - i + 1);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    return max;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="例题分析二" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>LeetCode 第 04 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m+n))。你可以假设 nums1 和 nums2 不会同时为空。</p><p><strong>示例1</strong></p><p>nums1 = [1, 3]</p><p>nums2 = [2]</p><p>则中位数是 2.0</p><p><strong>示例2</strong></p><p>nums1 = [1, 2]</p><p>nums2 = [3, 4]</p><p>则中位数是 (2 + 3)/2 = 2.5</p><h6 id="解题思路一-暴力法-1" tabindex="-1">解题思路一：暴力法 <a class="header-anchor" href="#解题思路一-暴力法-1" aria-label="Permalink to &quot;解题思路一：暴力法&quot;">​</a></h6><p>因为两个数组都是排好序的，可以利用归并排序将它们合并成一个长度为 m+n 的有序数组，合并的时间复杂度是 m+n，然后从中选取中位数，整体的时间复杂度就是 O(m+n)。</p><p>这是比较直观的解法，但是比题目要求的 O(log(m+n)) 慢了许多，并不适合。</p><h6 id="解题思路二-切分法" tabindex="-1">解题思路二：切分法 <a class="header-anchor" href="#解题思路二-切分法" aria-label="Permalink to &quot;解题思路二：切分法&quot;">​</a></h6><p>假设 m+n = L，若 L 为奇数，即两个数组的元素总个数为奇数，那么它们的中位数就是第 int(L / 2) + 1 小的数。例如，数组 { 1, 2, 3 } 的中位数是 2，2 就是第二小的数 2 = int(3/2) + 1。</p><p>如果 L 是偶数，那么中位数就是第 int(L/2) 小与第 int(L/2)+1 小的数的和的平均值。例如，数组 {1, 2, 3, 4} 的中位数是 (2 + 3) / 2 = 2.5，其中，2 = int(4/2)，3 = int(4/2) + 1。</p><p>因此这个问题就转变为在两个有序数组中寻找第 k 小的数 f(k)，当 L 是奇数的时候，另 k = L/2，结果为 f(k + 1)；而当 L 是偶数的时候，结果为 f(k) + f(k + 1) / 2。</p><p>如何从两个排好序的数组里找出第 k 小的数？</p><p>假设我们从第一个数组里前面 k~1~ 个数，从第二个数组里取出前面 k~2~ 个数，如下图。</p>`,23),v=s("p",null,"假设 k = 5，k~1~= 3，k~2~ = 2，有下面几种情况。",-1),A=s("ol",null,[s("li",null,"当 a~2~ = b~1~时，可以肯定 a~2~ 和 b~1~ 就是第 5 小的数。")],-1),w=s("p",null,"因为当把 a~0~、a~1~、a~2~ 以及 b~0~、b~1~ 按照大小顺序合并在一起的时候， a~2~ 和 b~1~ 一定排在最后面，完全不需要考虑 a~0~、a~1~ 和 b~0~ 的大小关系。其中一种可能的排列如下。",-1),q=s("ol",{start:"2"},[s("li",null,"当 a~2~ < b~1~ 的时候，无法肯定 a~2~ 和 b~1~ 是不是第 5 小的数。举例如下。")],-1),C=s("p",null,"而最终第 5 小的数是 a~3~ 5 这个数。因此，在这种情况下，我们不能得出第 5 小的数是哪个。",-1),j=s("br",null,null,-1),x=s("p",null,"但是，在这种情况下，至少我们可以肯定的是，我们要找的结果肯定不会在 a~0~，a~1~，a~2~ 之间，即不会出现在 nums1 数组的前半段里。为什么呢？很简单，因为如果第 5 小的数是 a~0~，a~1~，a~2~ 其中一个的话，意味着 k~1~+k~2~ 必然大于 5，这就跟我们的假设不符了。",-1),T=s("p",null,"那么结果会不会在 nums2 的后半段呢？不可能，加入第 5 小的数在 nums2 的后半段，那么意味着，这个数要大于 b~1~（即 7），也会大于 a~2~（即 3），但是 k~1~ + k~2~ 已经等于 5了，所以就和假设冲突了。",-1),L=p("<p>在这样的情况下，我们可以把搜索的范围缩小，从 nums1 的后半段以及 nums2 的前半段中继续寻找。</p><ol><li>当 a~2~ &gt; b~1~ 的时候，无法肯定 a~2~ 和 b~1~ 是不是第 5 小的数。举例如下。</li></ol><p>nums1[] = {5, 6, <strong>7</strong>, 8, 9}</p><p>nums2[] = {1, <strong>2</strong>, 3, 4}</p><p>a~2~ = 7，b~1~ = 2</p><br><p>而最终第 5 小的数是 a~0~ 5 这个数。因此，在这种情况下，我们也不能得出第 5 小的数是哪个。</p><p>但是，在这种情况下，至少我们可以肯定的是，我们要找的结果肯定不会是 b0，或者</p><p>nums2 数组的前半段里。为什么呢？因为如果第 5 小的数是 b0 的话，意味着 k1+k2 必然大</p><p>于 5，这也跟我们的假设不符了。同样的，结果也不可能在 nums1 的后半段里。</p><br><p>在这样的情况下，我们可以把搜索的范围缩小，从 nums2 的后半段以及 nums1 中继续寻找。</p>",12),B=p(`<br><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">double findMedianSortedArrays(int nums1[], int nums2[]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = nums1.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = nums2.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int k = (m + n) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if ((m + n) % 2 == 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return findKth(nums1, 0, m - 1, nums2, 0, n - 1, k + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return (</span></span>
<span class="line"><span style="color:#E1E4E8;">            findKth(nums1, 0, m - 1, nums2, 0, n - 1, k) + </span></span>
<span class="line"><span style="color:#E1E4E8;">            findKth(nums1, 0, m - 1, nums2, 0, n - 1, k + 1)</span></span>
<span class="line"><span style="color:#E1E4E8;">        ) / 2.0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">double findKth(int[] nums1, int l1, int h1, int[] nums2, int l2, int h2, int k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = h1 - l1 + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = h2 - l2 + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (m &gt; n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return findKth(nums2, l2, h2, nums1, l1, h1, k);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (m == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return nums2[l2 + k - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (k == 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return Math.min(nums1[l1], nums2[l2]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int na = Math.min(k/2, m);</span></span>
<span class="line"><span style="color:#E1E4E8;">    int nb = k - na;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int va = nums1[l1 + na - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">    int vb = nums2[l2 + nb - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (va == vb) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return va;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else if (va </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> vb) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return findKth(nums1, l1 + na, h1, nums2, l2, l2 + nb - 1, k - na);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">       return findKth(nums1, l1, l1 + na - 1, nums2, l2 + nb, h2, k - nb);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">double findMedianSortedArrays(int nums1[], int nums2[]) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = nums1.length;</span></span>
<span class="line"><span style="color:#24292E;">    int n = nums2.length;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int k = (m + n) / 2;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if ((m + n) % 2 == 1) {</span></span>
<span class="line"><span style="color:#24292E;">        return findKth(nums1, 0, m - 1, nums2, 0, n - 1, k + 1);</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        return (</span></span>
<span class="line"><span style="color:#24292E;">            findKth(nums1, 0, m - 1, nums2, 0, n - 1, k) + </span></span>
<span class="line"><span style="color:#24292E;">            findKth(nums1, 0, m - 1, nums2, 0, n - 1, k + 1)</span></span>
<span class="line"><span style="color:#24292E;">        ) / 2.0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">double findKth(int[] nums1, int l1, int h1, int[] nums2, int l2, int h2, int k) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = h1 - l1 + 1;</span></span>
<span class="line"><span style="color:#24292E;">    int n = h2 - l2 + 1;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (m &gt; n) {</span></span>
<span class="line"><span style="color:#24292E;">        return findKth(nums2, l2, h2, nums1, l1, h1, k);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (m == 0) {</span></span>
<span class="line"><span style="color:#24292E;">        return nums2[l2 + k - 1];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (k == 1) {</span></span>
<span class="line"><span style="color:#24292E;">        return Math.min(nums1[l1], nums2[l2]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int na = Math.min(k/2, m);</span></span>
<span class="line"><span style="color:#24292E;">    int nb = k - na;</span></span>
<span class="line"><span style="color:#24292E;">    int va = nums1[l1 + na - 1];</span></span>
<span class="line"><span style="color:#24292E;">    int vb = nums2[l2 + nb - 1];</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (va == vb) {</span></span>
<span class="line"><span style="color:#24292E;">        return va;</span></span>
<span class="line"><span style="color:#24292E;">    } else if (va </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> vb) {</span></span>
<span class="line"><span style="color:#24292E;">        return findKth(nums1, l1 + na, h1, nums2, l2, l2 + nb - 1, k - na);</span></span>
<span class="line"><span style="color:#24292E;">    } else {</span></span>
<span class="line"><span style="color:#24292E;">       return findKth(nums1, l1, l1 + na - 1, nums2, l2 + nb, h2, k - nb);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol><li><p>主体函数其实就是根据两个字符串长度的总和进行判断，看看如何调用递归函数以及返回结果。当总长度是奇数的时候，返回正中间的那个数；当总长度是偶数的时候，返回中间两个数的平均值。</p></li><li><p>进入 findkth 函数，这个函数的目的是寻找第 k 小的元素。</p></li><li><p>如果 nums1 数组的长度大于 nums2 数组的长度，我们将它们互换一下，这样可以让程序结束得快一些。</p></li><li><p>当 nums1 的长度为 0 时，直接返回 nums2 数组里第 k 小的数。当 k 等于 1 的时候，返回两个数组中的最小值。</p></li><li><p>接下来，分别选两个数组的中间数。</p></li><li><p>比较一下两者的大小，如果相等，表明我们找到了中位数，返回它；如果不等的话，我们进行剪枝处理。</p></li></ol><h3 id="算法分析" tabindex="-1"><strong>算法分析</strong> <a class="header-anchor" href="#算法分析" aria-label="Permalink to &quot;**算法分析**&quot;">​</a></h3><p>由于要求中位数，即 k = (m+n) / 2，k1 = k / 2，k2 = k / 2，每次都能将一半的数排除，即问题的规模减小一半，因此，算法复杂度就类似二分搜索，复杂度就是 log(k)，即 O(log((m+n) / 2))。</p><h6 id="扩展一" tabindex="-1">扩展一 <a class="header-anchor" href="#扩展一" aria-label="Permalink to &quot;扩展一&quot;">​</a></h6><p>例题：如果给定的两个数组是没有经过排序处理的，应该怎么找出中位数呢？</p>`,8),D=s("h6",{id:"解法-1-直观方法",tabindex:"-1"},[n("解法 1：直观方法 "),s("a",{class:"header-anchor",href:"#解法-1-直观方法","aria-label":'Permalink to "解法 1：直观方法"'},"​")],-1),S=s("p",null,"先将两个数组合并在一起，然后排序，再选出中位数。时间复杂度是：O((m+n)× og(m+n))。",-1),N=s("h6",{id:"解法-2-快速选择算法",tabindex:"-1"},[n("解法 2：快速选择算法 "),s("a",{class:"header-anchor",href:"#解法-2-快速选择算法","aria-label":'Permalink to "解法 2：快速选择算法"'},"​")],-1),I=s("p",null,"快速选择算法，可以在 O(n) 的时间内从长度为 n 的没有排序的数组中取出第 k 小的数，运用了快速排序的思想。",-1),P=s("p",null,"假如将 nums1[] 与 nums2[] 数组组合成一个数组变成 nums[]：{2, 5, 3, 1, 6, 8, 9, 7, 4}，那么如何在这个没有排好序的数组中找到第 k 小的数呢？",-1),O=s("ol",null,[s("li",null,"随机地从数组中选择一个数作为基准值，比如 7。一般而言，随机地选择基准值可以避免最坏的情况出现。")],-1),M=s("ol",{start:"2"},[s("li",null,"将数组排列成两个部分，以基准值作为分界点，左边的数都小于基准值，右边的都大于基准值。")],-1),V=s("ol",{start:"3"},[s("li",null,[s("p",null,"判断一下基准值所在位置 p：")]),s("li",null,[s("p",null,"如果 p 刚好等于 k，那么基准值就是所求数，直接返回。")]),s("li",null,[s("p",null,"如果 k < p，即基准值太大，搜索的范围应该缩小到基准值的左边。")]),s("li",null,[s("p",null,"如果 k > p，即基准值太小，搜索的范围应该缩小到基准值的右边。此时需要找的应该是第 k - p 小的数，因为前 p 个数被淘汰。")])],-1),K=p(`<br><ol start="4"><li>重复第一步，直到基准值的位置 p 刚好就是要找的 k。</li></ol><br><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public int findKthLargest(int[] nums, int k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return quickSelect(nums, 0, nums.length - 1, k);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 随机取一个基准值，这里取最后一个数作为基准值</span></span>
<span class="line"><span style="color:#E1E4E8;">int quickSelect(int[] nums, int low, int high, int k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int pivot = low;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 比基准值小的数放左边，把比基准值大的数放右边</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int j = low; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> high; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      if (nums[j] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= nums[high]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          swap(nums, pivot++, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    swap(nums, pivot, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 判断基准值的位置是不是第 k 大的元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    int count = high - pivot + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果是，就返回结果。</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (count == k) return nums[pivot];</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果发现基准值小了，继续往右边搜索</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (count &gt; k) return quickSelect(nums, pivot + 1, high, k);</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果发现基准值大了，就往左边搜索</span></span>
<span class="line"><span style="color:#E1E4E8;">    return quickSelect(nums, low, pivot - 1, k - count);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public int findKthLargest(int[] nums, int k) {</span></span>
<span class="line"><span style="color:#24292E;">    return quickSelect(nums, 0, nums.length - 1, k);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 随机取一个基准值，这里取最后一个数作为基准值</span></span>
<span class="line"><span style="color:#24292E;">int quickSelect(int[] nums, int low, int high, int k) {</span></span>
<span class="line"><span style="color:#24292E;">    int pivot = low;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 比基准值小的数放左边，把比基准值大的数放右边</span></span>
<span class="line"><span style="color:#24292E;">    for (int j = low; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> high; j++) {</span></span>
<span class="line"><span style="color:#24292E;">      if (nums[j] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= nums[high]) {</span></span>
<span class="line"><span style="color:#24292E;">          swap(nums, pivot++, j);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    swap(nums, pivot, high);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 判断基准值的位置是不是第 k 大的元素</span></span>
<span class="line"><span style="color:#24292E;">    int count = high - pivot + 1;</span></span>
<span class="line"><span style="color:#24292E;">    // 如果是，就返回结果。</span></span>
<span class="line"><span style="color:#24292E;">    if (count == k) return nums[pivot];</span></span>
<span class="line"><span style="color:#24292E;">    // 如果发现基准值小了，继续往右边搜索</span></span>
<span class="line"><span style="color:#24292E;">    if (count &gt; k) return quickSelect(nums, pivot + 1, high, k);</span></span>
<span class="line"><span style="color:#24292E;">    // 如果发现基准值大了，就往左边搜索</span></span>
<span class="line"><span style="color:#24292E;">    return quickSelect(nums, low, pivot - 1, k - count);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p><strong>时间复杂度</strong></p><p>时间复杂度为什么是 O(n)。分析如下。</p><p>为了方便推算，假设每次都选择中间的那个数作为基准值。</p><br><ol><li><p>设函数的时间执行函数为 T(n)，第一次运行的时候，把基准值和所有的 n 个元素进行比较，然后将输入规模减半并递归，所以 T(n) = T(n/2) + n。</p></li><li><p>当规模减半后，新的基准值只和 n/2 个元素进行比较，因此 T(n/2) = T(n/4) + n/2。</p></li><li><p>以此类推：</p></li></ol><p>T(n/4) = T(n/8) + n/4</p><p>...</p><p>T(2) = T(1) + 2</p><p>T(1) = 1</p><p>将上面的公式逐个代入后得到 T(n) = 1 + 2 + ... + n/8 + n/4 + n/2 + n = 2×n，所以 O(T(n)) = O(n)。</p><p><strong>空间复杂度</strong></p><p>如果不考虑递归对栈的开销，那么算法并没有使用额外的空间，swap 操作都是直接在数组里完成，因此空间复杂度为 O(1)。</p><h6 id="解法-3-数组-组合" tabindex="-1">解法 3：数组&quot;组合&quot; <a class="header-anchor" href="#解法-3-数组-组合" aria-label="Permalink to &quot;解法 3：数组&quot;组合&quot;&quot;">​</a></h6><p>把这两个数组&quot;虚拟&quot;地组合在一起，即它们是分开的，但是在访问它们的元素时，把它们看成是一个数组。那么就能运用快速选择的算法。</p><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">double findMedianArrays(int[] nums1, int[] nums2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = nums1.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = nums2.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int k = (m + n) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return (m + n) % 2 == 1 ?</span></span>
<span class="line"><span style="color:#E1E4E8;">        findKthLargest(nums1, nums2, k + 1) :</span></span>
<span class="line"><span style="color:#E1E4E8;">        (findKthLargest(nums1, nums2, k) + findKthLargest(nums1, nums2, k + 1)) / 2.0;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">double findKthLargest(int[] nums1, int[] nums2, int k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return quickSelect(nums1, nums2, 0, nums1.length + nums2.length - 1, k);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">double quickSelect(int[] nums1, int[] nums2, int low, int high, int k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int pivot = low;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // use quick sort&#39;s idea</span></span>
<span class="line"><span style="color:#E1E4E8;">    // put nums that are </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= pivot to the left</span></span>
<span class="line"><span style="color:#E1E4E8;">    // put nums that are  &gt; pivot to the right</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int j = low; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> high; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (getNum(nums1, nums2, j) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= getNum(nums1, nums2, high)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            swap(nums1, nums2, pivot++, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    swap(nums1, nums2, pivot, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // count the nums that are &gt; pivot from high</span></span>
<span class="line"><span style="color:#E1E4E8;">    int count = high - pivot + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    // pivot is the one!</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (count == k) return getNum(nums1, nums2, pivot);</span></span>
<span class="line"><span style="color:#E1E4E8;">    // pivot is too small, so it must be on the right</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (count &gt; k) return quickSelect(nums1, nums2, pivot + 1, high, k);</span></span>
<span class="line"><span style="color:#E1E4E8;">    // pivot is too big, so it must be on the left</span></span>
<span class="line"><span style="color:#E1E4E8;">    return quickSelect(nums1, nums2, low, pivot - 1, k - count);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">int getNum(int[] nums1, int[] nums2, int index) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return (index </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums1.length) ? nums1[index] : nums2[index - nums1.length];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">void swap(int[] nums1, int[] nums2, int i, int j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = nums1.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m &amp;&amp; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        swap(nums1, i, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else if (i &gt;= m &amp;&amp; j &gt;= m) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        swap(nums2, i - m, j - m);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else if (i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m &amp;&amp; j &gt;= m) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        int temp = nums1[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">        nums1[i] = nums2[j - m];</span></span>
<span class="line"><span style="color:#E1E4E8;">        nums2[j - m] = temp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">void swap(int[] nums, int i, int j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int temp = nums[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">    nums[i] = nums[j];</span></span>
<span class="line"><span style="color:#E1E4E8;">    nums[j] = temp;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">double findMedianArrays(int[] nums1, int[] nums2) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = nums1.length;</span></span>
<span class="line"><span style="color:#24292E;">    int n = nums2.length;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int k = (m + n) / 2;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return (m + n) % 2 == 1 ?</span></span>
<span class="line"><span style="color:#24292E;">        findKthLargest(nums1, nums2, k + 1) :</span></span>
<span class="line"><span style="color:#24292E;">        (findKthLargest(nums1, nums2, k) + findKthLargest(nums1, nums2, k + 1)) / 2.0;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">double findKthLargest(int[] nums1, int[] nums2, int k) {</span></span>
<span class="line"><span style="color:#24292E;">    return quickSelect(nums1, nums2, 0, nums1.length + nums2.length - 1, k);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">double quickSelect(int[] nums1, int[] nums2, int low, int high, int k) {</span></span>
<span class="line"><span style="color:#24292E;">    int pivot = low;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // use quick sort&#39;s idea</span></span>
<span class="line"><span style="color:#24292E;">    // put nums that are </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= pivot to the left</span></span>
<span class="line"><span style="color:#24292E;">    // put nums that are  &gt; pivot to the right</span></span>
<span class="line"><span style="color:#24292E;">    for (int j = low; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> high; j++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (getNum(nums1, nums2, j) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= getNum(nums1, nums2, high)) {</span></span>
<span class="line"><span style="color:#24292E;">            swap(nums1, nums2, pivot++, j);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    swap(nums1, nums2, pivot, high);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // count the nums that are &gt; pivot from high</span></span>
<span class="line"><span style="color:#24292E;">    int count = high - pivot + 1;</span></span>
<span class="line"><span style="color:#24292E;">    // pivot is the one!</span></span>
<span class="line"><span style="color:#24292E;">    if (count == k) return getNum(nums1, nums2, pivot);</span></span>
<span class="line"><span style="color:#24292E;">    // pivot is too small, so it must be on the right</span></span>
<span class="line"><span style="color:#24292E;">    if (count &gt; k) return quickSelect(nums1, nums2, pivot + 1, high, k);</span></span>
<span class="line"><span style="color:#24292E;">    // pivot is too big, so it must be on the left</span></span>
<span class="line"><span style="color:#24292E;">    return quickSelect(nums1, nums2, low, pivot - 1, k - count);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">int getNum(int[] nums1, int[] nums2, int index) {</span></span>
<span class="line"><span style="color:#24292E;">    return (index </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums1.length) ? nums1[index] : nums2[index - nums1.length];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">void swap(int[] nums1, int[] nums2, int i, int j) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = nums1.length;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m &amp;&amp; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m) {</span></span>
<span class="line"><span style="color:#24292E;">        swap(nums1, i, j);</span></span>
<span class="line"><span style="color:#24292E;">    } else if (i &gt;= m &amp;&amp; j &gt;= m) {</span></span>
<span class="line"><span style="color:#24292E;">        swap(nums2, i - m, j - m);</span></span>
<span class="line"><span style="color:#24292E;">    } else if (i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m &amp;&amp; j &gt;= m) {</span></span>
<span class="line"><span style="color:#24292E;">        int temp = nums1[i];</span></span>
<span class="line"><span style="color:#24292E;">        nums1[i] = nums2[j - m];</span></span>
<span class="line"><span style="color:#24292E;">        nums2[j - m] = temp;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">void swap(int[] nums, int i, int j) {</span></span>
<span class="line"><span style="color:#24292E;">    int temp = nums[i];</span></span>
<span class="line"><span style="color:#24292E;">    nums[i] = nums[j];</span></span>
<span class="line"><span style="color:#24292E;">    nums[j] = temp;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>因为这道题的解法与之前讲的快速选择算法非常类似，差别在于将两个数组合在一起考虑。因此大家可以自己分析一下代码。</p><p>时间复杂度是 O(m+n)，空间复杂度 O(1)。</p><h6 id="扩展二" tabindex="-1">扩展二 <a class="header-anchor" href="#扩展二" aria-label="Permalink to &quot;扩展二&quot;">​</a></h6><p>例题：有一万个服务器，每个服务器上存储了十亿个没有排好序的数，现在要找所有数当中的中位数，怎么找？</p><p>对于分布式地大数据处理，应当考虑两个方面的限制：</p><ol><li><p>每台服务器进行算法计算的复杂度限制，包括时间和空间复杂度</p></li><li><p>服务器与服务器之间进行通信时的网络带宽限制</p></li></ol><h5 id="限制-1-空间复杂度" tabindex="-1">限制 1：空间复杂度 <a class="header-anchor" href="#限制-1-空间复杂度" aria-label="Permalink to &quot;限制 1：空间复杂度&quot;">​</a></h5><p>假设存储的数都是 32 位整型，即 4 个字节，那么 10 亿个数需占用 40 亿字节，大约 4GB</p><ul><li><p>归并排序至少得需要 4GB 的内存</p></li><li><p>快速排序的空间复杂度为 log(n)，即大约 30 次堆栈压入</p></li></ul><br><p>用非递归的方法去实现快速排序，代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 每次只需将数组中的某个起始点和终点，即一个范围，压入堆栈中，压入 30 个范围的大小约为 30×2×4=240 字节</span></span>
<span class="line"><span style="color:#E1E4E8;">class Range {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public int low;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public int high;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    public Range(int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.low = low;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.high = high;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 不使用递归写法，压入堆栈的还包括程序中的其他变量等，假设需要 100 字节，总共需要 30×100=3K 字节</span></span>
<span class="line"><span style="color:#E1E4E8;">void quickSort(int[] nums) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Range</span><span style="color:#E1E4E8;">&gt; stack = new Stack</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Range range = new Range(0, nums.length - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    stack.push(range);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        range = stack.pop();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        int pivot = partition(nums, range.low, range.high);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (pivot - 1 &gt; range.low) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            stack.push(new Range(range.low, pivot - 1));</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (pivot + 1 </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> range.high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            stack.push(new Range(pivot + 1, range.high));</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 快速排序对内存的开销非常小</span></span>
<span class="line"><span style="color:#E1E4E8;">int partition(int[] nums, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int pivot = randRange(low, high), i = low;</span></span>
<span class="line"><span style="color:#E1E4E8;">    swap(nums, pivot, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int j = low; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> high; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (nums[j] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= nums[high]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            swap(nums, i++, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    swap(nums, i, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return i;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 每次只需将数组中的某个起始点和终点，即一个范围，压入堆栈中，压入 30 个范围的大小约为 30×2×4=240 字节</span></span>
<span class="line"><span style="color:#24292E;">class Range {</span></span>
<span class="line"><span style="color:#24292E;">    public int low;</span></span>
<span class="line"><span style="color:#24292E;">    public int high;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    public Range(int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">        this.low = low;</span></span>
<span class="line"><span style="color:#24292E;">        this.high = high;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 不使用递归写法，压入堆栈的还包括程序中的其他变量等，假设需要 100 字节，总共需要 30×100=3K 字节</span></span>
<span class="line"><span style="color:#24292E;">void quickSort(int[] nums) {</span></span>
<span class="line"><span style="color:#24292E;">    Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Range</span><span style="color:#24292E;">&gt; stack = new Stack</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Range range = new Range(0, nums.length - 1);</span></span>
<span class="line"><span style="color:#24292E;">    stack.push(range);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        range = stack.pop();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        int pivot = partition(nums, range.low, range.high);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        if (pivot - 1 &gt; range.low) {</span></span>
<span class="line"><span style="color:#24292E;">            stack.push(new Range(range.low, pivot - 1));</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        if (pivot + 1 </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> range.high) {</span></span>
<span class="line"><span style="color:#24292E;">            stack.push(new Range(pivot + 1, range.high));</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 快速排序对内存的开销非常小</span></span>
<span class="line"><span style="color:#24292E;">int partition(int[] nums, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    int pivot = randRange(low, high), i = low;</span></span>
<span class="line"><span style="color:#24292E;">    swap(nums, pivot, high);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int j = low; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> high; j++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (nums[j] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= nums[high]) {</span></span>
<span class="line"><span style="color:#24292E;">            swap(nums, i++, j);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    swap(nums, i, high);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return i;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上，利用一个栈 stack 来记录每次进行快速排序时的范围。一旦发现基准值左边还有未处理完的数，就将左边的范围区间压入到栈里；如果发现基准值右边还有未处理完的数，就将右边的范围区间压入到栈里。其中，处理基准值的 partition 函数非常重要，之前已经介绍过。</p><h6 id="限制-2-网络带宽" tabindex="-1">限制 2：网络带宽 <a class="header-anchor" href="#限制-2-网络带宽" aria-label="Permalink to &quot;限制 2：网络带宽&quot;">​</a></h6><p>在实际应用中，这是最重要的考量因素，很多大型的云服务器都是按照流量来进行收费，如何有效地限制流量，避免过多的服务器之间的通信，就是要考量的重点，并且，实际上它与算法的时间复杂度有很大的关系。</p><p><strong>解决方案</strong></p><p>借助扩展一的思路。</p><br><ol><li>从 1万 个服务器中选择一个作为主机（master server）。这台主机将扮演主导快速选择算法的角色。</li></ol>`,42),F=s("ol",{start:"2"},[s("li",null,"在主机上随机选择一个基准值，然后广播到其他各个服务器上。")],-1),R=s("ol",{start:"3"},[s("li",null,"每台服务器都必须记录下最后小于、等于或大于基准值数字的数量：less count，equal count，greater count。")],-1),H=p('<ol start="4"><li><p>每台服务器将 less count，equal count 以及 greater count 发送回主机。</p></li><li><p>主机统计所有的 less count，equal count 以及 greater count，得出所有比基准值小的数的总和 total less count，等于基准值的总和 total equal count，以及大于基准值的总和 total greater count。进行如下判断。</p></li><li><p>如果 total less count &gt;= total count / 2，表明基准值太大。</p></li><li><p>如果total less count + total equal count &gt;= total count / 2，表明基准值即为所求结果。</p></li><li><p>否则，total less count + total equal count &lt; total count / 2 表明基准值太小。</p></li><li><p>后面两种情况，主机会把新的基准值广播给各个服务器，服务器根据新的基准值的大小判断往左半边或者右半边继续进行快速选择。直到最后找到中位数。</p></li></ol><br><p><strong>时间复杂度</strong></p><p>整体的时间复杂度是 O(nlog(n))，主机和各个其他服务器之间的通信总共也需要 nlog(n)次，每次通信需要传递一个基准值以及三个计数值。</p><br><p>如果用一些组播网络（Multicast Network)，可以有效地节省更多的带宽。</p><h6 id="例题分析三" tabindex="-1">例题分析三 <a class="header-anchor" href="#例题分析三" aria-label="Permalink to &quot;例题分析三&quot;">​</a></h6><p>LeetCode 第 23 题：合并 k 个排好序的链表，返回合并后的排序链表。分析和描述算法的复杂度。</p><p><strong>示例</strong></p><p>输入：</p><p>[</p><p>1 -&gt; 4 -&gt; 5,</p><p>1 -&gt; 3 -&gt; 4,</p><p>2 -&gt; 6</p><p>]</p><p>输出：1 -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 4 -&gt; 5 -&gt; 6</p><h6 id="解题思路一-暴力法-2" tabindex="-1">解题思路一：暴力法 <a class="header-anchor" href="#解题思路一-暴力法-2" aria-label="Permalink to &quot;解题思路一：暴力法&quot;">​</a></h6><p>用一个数组保存所有链表中的数，然后对这个数组进行排序，再从头到尾将数组遍历一遍，生成一个排好序的链表。假设每个链表的平均长度为 n，整体的时间复杂度就是 O(nk×log(nk))。</p><br><h6 id="解题思路二-最小堆法" tabindex="-1">解题思路二：最小堆法 <a class="header-anchor" href="#解题思路二-最小堆法" aria-label="Permalink to &quot;解题思路二：最小堆法&quot;">​</a></h6><p>面对 k 个排好序的链表时，最小的那个数肯定是从这 k 个链表的头里面选出来。</p><p>那么，第二小的如何选择？例如，有下面 k 个链表。</p>',22),Q=p(`<ol><li><p>把最小的 1 从所有的 k 个链表头里选出来之后，把 1 从链表里删掉。</p></li><li><p>下一个最小的数，还是从所有的 k 个链表头里选出来。</p></li><li><p>以此类推，每一轮都比较 k 个新的链表头的大小，得出最后的结果。</p></li></ol><p>上述操作的时间复杂度是 O(k)。而针对找出最小的数，可以使用最小堆来提高效率。时间复杂度计算如下。</p><ol><li><p>对 k 个链表头创建一个大小为 k 的最小堆，在第 2 课中提到创建一个大小为 k 的最小堆所需的时间是 O(k)；</p></li><li><p>从堆里取出最小的数，都是 O(lg(k))；</p></li><li><p>若每个链表的平均长度为 n，一共有 nk 个元素，即用大小为 k 的最小堆去过滤 nk 个元素；</p></li><li><p>整体的时间复杂度就是 O(nk×log(k))。</p></li></ol><br><p>维护这个大小为 k 的最小堆，直到遍历完所有 k 个链表里的所有元素。</p><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public ListNode mergeKLists(ListNode[] lists) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    //空测试用例处理</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public ListNode mergeKLists(ListNode[] lists) {</span></span>
<span class="line"><span style="color:#24292E;">    //空测试用例处理</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">        if(lists==null || lists.length==0){</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">        if(lists==null || lists.length==0){</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">            return null;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">            return null;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">        }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    //利用一个空的链表头方便插入节点。  </span></span>
<span class="line"><span style="color:#E1E4E8;">    ListNode fakeHead = new ListNode(0), p = fakeHead;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int k = lists.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个最小堆来保存 k 个链表节点；将 k 个链表的头放入到最小堆里。</span></span>
<span class="line"><span style="color:#E1E4E8;">    PriorityQueue&lt;</span><span style="color:#FDAEB7;font-style:italic;">ListNode</span><span style="color:#E1E4E8;">&gt; heap = </span></span>
<span class="line"><span style="color:#E1E4E8;">        new PriorityQueue</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;(k, new Comparator&lt;</span><span style="color:#FDAEB7;font-style:italic;">ListNode</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            public int compare(ListNode a, ListNode b) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                return a.val - b.val;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 从最小堆里将当前最小的节点取出，插入到结果链表中。</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> k; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (lists[i] != null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            heap.offer(lists[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    while (!heap.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ListNode node = heap.poll();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        p.next = node;</span></span>
<span class="line"><span style="color:#E1E4E8;">        p = p.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 如果发现该节点后面还有后续节点，将后续节点加入到最小堆里。    </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (node.next != null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            heap.offer(node.next);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return fakeHead.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    //利用一个空的链表头方便插入节点。  </span></span>
<span class="line"><span style="color:#24292E;">    ListNode fakeHead = new ListNode(0), p = fakeHead;</span></span>
<span class="line"><span style="color:#24292E;">    int k = lists.length;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 定义一个最小堆来保存 k 个链表节点；将 k 个链表的头放入到最小堆里。</span></span>
<span class="line"><span style="color:#24292E;">    PriorityQueue&lt;</span><span style="color:#B31D28;font-style:italic;">ListNode</span><span style="color:#24292E;">&gt; heap = </span></span>
<span class="line"><span style="color:#24292E;">        new PriorityQueue</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;(k, new Comparator&lt;</span><span style="color:#B31D28;font-style:italic;">ListNode</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">            public int compare(ListNode a, ListNode b) {</span></span>
<span class="line"><span style="color:#24292E;">                return a.val - b.val;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 从最小堆里将当前最小的节点取出，插入到结果链表中。</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> k; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (lists[i] != null) {</span></span>
<span class="line"><span style="color:#24292E;">            heap.offer(lists[i]);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    while (!heap.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        ListNode node = heap.poll();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        p.next = node;</span></span>
<span class="line"><span style="color:#24292E;">        p = p.next;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // 如果发现该节点后面还有后续节点，将后续节点加入到最小堆里。    </span></span>
<span class="line"><span style="color:#24292E;">        if (node.next != null) {</span></span>
<span class="line"><span style="color:#24292E;">            heap.offer(node.next);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return fakeHead.next;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="解题思路三-分治法" tabindex="-1">解题思路三：分治法 <a class="header-anchor" href="#解题思路三-分治法" aria-label="Permalink to &quot;解题思路三：分治法&quot;">​</a></h6><p>当 k=1 的时候，直接返回结果；当 k=2 的时候，把这两个链表归并。当 k=3 的时候，我们可以把它们分成两组，分别归并完毕后再进行最后的归并操作，如下。</p>`,13),W=p(`<p>上述做法运用了典型的分治思想，非常类似归并排序操作。</p><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public ListNode mergeKLists(ListNode[] lists, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (low == high) return lists[low];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2; // 从中间切一刀</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return mergeTwoLists(</span></span>
<span class="line"><span style="color:#E1E4E8;">        mergeKLists(lists, low, middle),</span></span>
<span class="line"><span style="color:#E1E4E8;">        mergeKLists(lists, middle + 1, high)</span></span>
<span class="line"><span style="color:#E1E4E8;">    ); // 递归地处理左边和右边的链表，最后合并</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public ListNode mergeTwoLists(ListNode a, ListNode b) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (a == null) return b;</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (b == null) return a;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (a.val </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= b.val) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        a.next = mergeTwoLists(a.next, b);</span></span>
<span class="line"><span style="color:#E1E4E8;">        return a;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    b.next = mergeTwoLists(a, b.next);</span></span>
<span class="line"><span style="color:#E1E4E8;">    return b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public ListNode mergeKLists(ListNode[] lists, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (low == high) return lists[low];</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2; // 从中间切一刀</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return mergeTwoLists(</span></span>
<span class="line"><span style="color:#24292E;">        mergeKLists(lists, low, middle),</span></span>
<span class="line"><span style="color:#24292E;">        mergeKLists(lists, middle + 1, high)</span></span>
<span class="line"><span style="color:#24292E;">    ); // 递归地处理左边和右边的链表，最后合并</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public ListNode mergeTwoLists(ListNode a, ListNode b) {</span></span>
<span class="line"><span style="color:#24292E;">    if (a == null) return b;</span></span>
<span class="line"><span style="color:#24292E;">    if (b == null) return a;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (a.val </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= b.val) {</span></span>
<span class="line"><span style="color:#24292E;">        a.next = mergeTwoLists(a.next, b);</span></span>
<span class="line"><span style="color:#24292E;">        return a;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    b.next = mergeTwoLists(a, b.next);</span></span>
<span class="line"><span style="color:#24292E;">    return b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>合并两个排好序的链表非常简单，此处使用递归函数，可以尝试非递归写法。</p><br><p><strong>时间复杂度</strong>：O(nk×log(k))。</p><p><strong>空间复杂度</strong>：O(1)。因为不像最小堆解法那样需要维护一个额外的数据结构。</p><p>提示：因为这道题针对的是链表，所以很多操作都直接在链表上进行。</p><h6 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h6><p>这节课剖析了三道非常经典的高频题，从不同的角度考虑解决问题的方案，并回顾了经典的快速选择算法。下节课将讨论另外三道经典的高频题。</p><br><br>`,12);function Y(U,G,z,X,J,Z){const a=t("Image");return o(),i("div",null,[r,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpGAXYErAIDbacLXGUw574.gif"}),n(),E,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InpOAH6lGAE1uzx5xDe0090.gif"}),n(),y,u,h,m,g,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpOAdm0bAAA91_bKAZI920.png"}),n(),d,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpSAJ2NcAEb7BX-6f9k727.gif"}),n(),k,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InpWAAnvyAFQgtLp9Xgg419.gif"}),n(),b,_,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpaABE_PAACvFYyHH4E185.png"}),n(),f,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InpaAZ6lZAAC7LqjZWnU769.png"}),n(),v,A,w,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpaAAPVqAADiT5r6EoE952.png"}),n(),q,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InpaAdWQTAACcO4jiikI797.png"}),n(),C,j,x,T,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpiANLV4AGB7zVnr6UQ076.gif"}),n(),L,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InpmAHlttACt9vWodiQU791.gif"}),n(),B,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpmAMCH-AACt9UBVjdM117.png"}),n(),D,S,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InpqADa6YACUXrW-nt7c325.gif"}),n(),N,I,P,O,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpuAQV-WAB7LzfFC6cc207.gif"}),n(),M,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InpyAWKEsACyLx0hVqIg915.gif"}),n(),V,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2Inp-ANdNWAFfawadYn4g058.gif"}),n(),K,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2Inp-ADWduAACy1HlNYdU966.png"}),n(),F,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InqCADiJBADbDhpQ_g34352.gif"}),n(),R,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InqOAW68SAEJNyDb5D5o855.gif"}),n(),H,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/30/CgoB5l2InqSAHLY0ACSlxIOkYh0731.gif"}),n(),Q,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/50/CgotOV2InqWAExguACYe_inhacY345.gif"}),n(),W])}const ns=e(c,[["render",Y]]);export{ss as __pageData,ns as default};
