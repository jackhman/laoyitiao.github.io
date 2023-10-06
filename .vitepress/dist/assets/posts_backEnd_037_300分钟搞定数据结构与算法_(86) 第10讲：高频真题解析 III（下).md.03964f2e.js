import{_ as e,j as t,o,g as i,k as a,h as l,s,Q as p}from"./chunks/framework.b3d8e22e.js";const us=JSON.parse('{"title":"例题分析二 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(86) 第10讲：高频真题解析 III（下).md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(86) 第10讲：高频真题解析 III（下).md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(86) 第10讲：高频真题解析 III（下).md"},r=s("h6",{id:"例题分析二",tabindex:"-1"},[l("例题分析二 "),s("a",{class:"header-anchor",href:"#例题分析二","aria-label":'Permalink to "例题分析二"'},"​")],-1),E=s("p",null,"LeetCode 第 84 题：给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1。求在该柱状图中，能够勾勒出来的矩形的最大面积。",-1),h=s("p",null,"说明：下图是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。",-1),y=p('<p><strong>示例</strong></p><p>输入: [2,1,5,6,2,3]</p><p>输出: 1</p><h6 id="解题思路一-暴力法" tabindex="-1">解题思路一：暴力法 <a class="header-anchor" href="#解题思路一-暴力法" aria-label="Permalink to &quot;解题思路一：暴力法&quot;">​</a></h6><p>从暴力法开始寻找思路。既然要找出最大的面积，就把所有可能的面积都找出来，然后从中比较出最大的那个。如何找出所有的面积呢？</p><ol><li><p>从左到右扫描一遍输入的数组。</p></li><li><p>遇到每根柱子的时候，以它的高度作为当前矩形的高度。</p></li><li><p>矩形的宽度从当前柱子出发一直延伸到左边和右边。</p></li><li><p>一旦遇到了低于当前高度的柱子就停止。</p></li><li><p>计算面积，统计所有面积里的最大值。</p></li></ol><p>具体的实现步骤如下。</p>',7),d=p('<ol><li><p>第一根柱子高度是 2，当往右边扩展的时候，发现第二根柱子的高度为 1，要低于当前的高度，于是扩展结束，即以第一根柱子高度作为矩形高度，得到矩形面积是 2。</p></li><li><p>第二根柱子，它的高度为 1，以它作为高度的矩形面积是 6。</p></li><li><p>以 5 为高度的矩形面积是 10。</p></li><li><p>以 6 为高度的矩形面积是 6。</p></li><li><p>以 2 为高度的矩形面积是 8。</p></li><li><p>以 3 作为高度的矩形面积为 3。</p></li></ol><br><p>由此，得到最大的面积是 10。</p><p>该算法的时间复杂度是 O(n2)。</p><h6 id="解题思路二-解法优化" tabindex="-1">解题思路二：解法优化 <a class="header-anchor" href="#解题思路二-解法优化" aria-label="Permalink to &quot;解题思路二：解法优化&quot;">​</a></h6><p>以两个柱子的情况为例进行分析。</p><ol><li>不必急于计算以 2 为高度的矩形面积，把 2 暂时保存起来备用，因为一旦从开始就计算矩形面积的话，就是暴力法。</li></ol>',7),_=s("ol",{start:"2"},[s("li",null,"遇到 1 的时候，由于 1 的高度低，造成以 2 为高度的矩形无法延伸到高度为 1 的柱子，即，可以计算高度为 2 的矩形面积。每当遇到一个下降的高度时，就可以开始计算以之前高度作为矩形高度的面积。")],-1),g=s("ol",{start:"3"},[s("li",null,"遇到更高的高度时，也不急计算以 1 为高度的矩形面积，因为 5 的下一个是 6，面积还能继续扩大。")],-1),u=s("ol",{start:"4"},[s("li",null,"再次遇到 2 时，按照之前的策略，可以计算以 6 为高度的矩形面积。")],-1),A=s("ol",{start:"5"},[s("li",null,"是否要计算以 5 作为高度的矩形面积呢？是的，因为 2 比 5 低，以 5 作为高度的矩形无法包含 2 这个点。该宽度如何计算呢？是不是就是 2 的下标减去 5 的下标就可以呢？")],-1),m=s("ol",{start:"6"},[s("li",null,"当计算完高度为 6 的矩形面积时，立即知道下一个高度是 5，以及 5 所对应的下标，可以利用一个 stack 来帮助记录。（注意：此处在整个算法里都很重要。）")],-1),k=s("ol",{start:"7"},[s("li",null,"计算完了以 5 作为高度的矩形面积后，还剩下 1，由于 2 比 1 高，表明后面可能还有更高的点，而以 1 为高度的矩形还能扩展。")],-1),C=s("ol",{start:"8"},[s("li",null,"下一个比 2 还高，于是继续保留它在 stack 里。")],-1),B=s("p",null,"到这里，所有的柱子都遍历完了，如何处理剩下的 3 根柱子呢？",-1),f=s("p",null,"以新的柱子高度为 0，由于 0 低于任何一根柱子的高度，那么对剩下的柱子计算，以它们的高度作为边的矩形的面积。",-1),P=s("ul",null,[s("li",null,[s("p",null,"指针停留在下标为 6 的地方，堆栈里记录的是三根柱子的下标：5，4，1。")]),s("li",null,[s("p",null,"跟之前计算其他柱子的情况一样，先将堆栈里的下标弹出，第一个弹出的是 5。")]),s("li",null,[s("p",null,"然后比它矮的那根柱子的下标一定是堆栈目前顶端的那个，也就是 4。")]),s("li",null,[s("p",null,"因此以 3 作为高度的矩形的宽度就是：i - 1 - 4 = 6 - 1 - 4 = 1，那么面积就是 3 x 1 = 3。")])],-1),S=s("p",null,"剩下的 2 根柱子，方法同样，目前 stack 里的值是：4，1。",-1),b=s("p",null,"把下标 4 弹出，得知比这根柱子还要矮的柱子的下标一定是 stack 顶端的值，也就是 1。",-1),q=s("p",null,"那么以高度 2 作为矩形高度的矩形宽度就是：i - 1 - 1 = 6 - 1 - 1 = 4，面积就是 2 x 4 = 8。",-1),I=s("p",null,"最后处理剩下 1 的柱子。",-1),D=p(`<p>将它弹出，发现此时堆栈为空。那以 1 作为高度的矩形的宽度是多少呢？很简单，就是 i，也就是 6。因为它一定是最矮的那个才会留到最后，那么它的宽度就应该是横跨整个区间。所以求得面积就是 6。</p><h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><ol><li><p>一旦我们发现当前的高度要比堆栈顶端所记录的高度要矮，就可以开始对堆栈顶端记录的高度计算面积了。在这里，我们巧妙地处理了当 i 等于 n 时的情况。同时在这一步里，我们判断一下当前的面积是不是最大值。</p></li><li><p>如果当前的高度比堆栈顶端所记录的高度要高，就压入堆栈。</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 将输入数组的长度记为 n，初始化最大面积 max 为 0</span></span>
<span class="line"><span style="color:#E1E4E8;">int largestRectangleArea(int[] heights) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = heights.length, max = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个堆栈 stack 用来辅助计算</span></span>
<span class="line"><span style="color:#E1E4E8;">    Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; stack = new Stack</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">     // 从头开始扫描输入数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= n; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        while (</span></span>
<span class="line"><span style="color:#E1E4E8;">            !stack.isEmpty() &amp;&amp; </span></span>
<span class="line"><span style="color:#E1E4E8;">            (i == n || heights[i] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> heights[stack.peek()])</span></span>
<span class="line"><span style="color:#E1E4E8;">         ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int height = heights[stack.pop()];</span></span>
<span class="line"><span style="color:#E1E4E8;">            int width = stack.isEmpty() ? i : i - 1 - stack.peek();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            max = Math.max(max, width * height);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        stack.push(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 返回面积最大值</span></span>
<span class="line"><span style="color:#E1E4E8;">    return max;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 将输入数组的长度记为 n，初始化最大面积 max 为 0</span></span>
<span class="line"><span style="color:#24292E;">int largestRectangleArea(int[] heights) {</span></span>
<span class="line"><span style="color:#24292E;">    int n = heights.length, max = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 定义一个堆栈 stack 用来辅助计算</span></span>
<span class="line"><span style="color:#24292E;">    Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; stack = new Stack</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">     // 从头开始扫描输入数组</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= n; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        while (</span></span>
<span class="line"><span style="color:#24292E;">            !stack.isEmpty() &amp;&amp; </span></span>
<span class="line"><span style="color:#24292E;">            (i == n || heights[i] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> heights[stack.peek()])</span></span>
<span class="line"><span style="color:#24292E;">         ) {</span></span>
<span class="line"><span style="color:#24292E;">            int height = heights[stack.pop()];</span></span>
<span class="line"><span style="color:#24292E;">            int width = stack.isEmpty() ? i : i - 1 - stack.peek();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            max = Math.max(max, width * height);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        stack.push(i);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    // 返回面积最大值</span></span>
<span class="line"><span style="color:#24292E;">    return max;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="复杂度分析" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h3><p>时间复杂度是 O(n)，因为从头到尾扫描了一遍数组，每个元素都被压入堆栈一次，弹出一次。</p><p>空间复杂度是 O(n)，因为用了一个堆栈来保存各个元素的下标，最坏的情况就是各个高度按照从矮到高的顺序排列，需要将它们都压入堆栈。</p><h6 id="例题分析三" tabindex="-1">例题分析三 <a class="header-anchor" href="#例题分析三" aria-label="Permalink to &quot;例题分析三&quot;">​</a></h6><p>LeetCode 第 28 题：实现 strStr() 函数。给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从 0 开始)。如果不存在，则返回 -1。</p><p><strong>示例 1</strong></p><p>输入: haystack = &quot;hello&quot;, needle = &quot;ll&quot;</p><p>输出: 2</p><p>解释：&quot;ll&quot;出现在 haystack 第 2 个位置。</p><p><strong>示例 2</strong></p><p>输入: haystack = &quot;aaaaa&quot;, needle = &quot;bba&quot;</p><p>输出: -1</p><p>解释：&quot;bba&quot;并不出现在 &quot;aaaaa&quot;里</p><h6 id="解题思路一-暴力法-1" tabindex="-1">解题思路一：暴力法 <a class="header-anchor" href="#解题思路一-暴力法-1" aria-label="Permalink to &quot;解题思路一：暴力法&quot;">​</a></h6><p>实现：在一个字符串中找出某个字符串出现的位置，用暴力法来做是非常简单的，从头遍历一遍 haystack 字符串，每遍历到一个位置，就扫描一下，看看是不是等于 needle 字符串。举例说明如下。</p><br><p>输入：</p><p>haystack = &quot;iloveleetcode&quot;</p><p>needle = &quot;leetcode&quot;</p>`,23),T=p(`<p>不断移动 needle，来对比是否在 haystack 中，一旦找到就返回它的位置。</p><p>注意：当 needle 是空字符串时，应当返回什么值呢？这是一个在面试中很好的问题。对于本题而言，当 needle 是空字符串时应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。</p><h3 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>暴力法的代码实现比较简单，如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int strStr(String haystack, String needle) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int j = 0; ; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (j == needle.length()) return i;</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (i + j == haystack.length()) return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (needle.charAt(j) != haystack.charAt(i + j)) break;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int strStr(String haystack, String needle) {</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        for (int j = 0; ; j++) {</span></span>
<span class="line"><span style="color:#24292E;">            if (j == needle.length()) return i;</span></span>
<span class="line"><span style="color:#24292E;">            if (i + j == haystack.length()) return -1;</span></span>
<span class="line"><span style="color:#24292E;">            if (needle.charAt(j) != haystack.charAt(i + j)) break;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="复杂度分析-1" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析-1" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h3><p>假设 haystack 的字符串长度为 m，needle 字符串的长度为 n，那么暴力法的时间复杂度是 O(m×n)。</p><h6 id="解题思路二-kmp" tabindex="-1">解题思路二：KMP <a class="header-anchor" href="#解题思路二-kmp" aria-label="Permalink to &quot;解题思路二：KMP&quot;">​</a></h6><p>KMP（Knuth-Morris-Pratt）是由三人联合发表的一个算法，目的就是为了在一个字符串 haystack 中找出另外一个字符串 needle 出现的所有位置。它的核心思想是避免暴力法当中出现的不必要的比较。</p><p>用维基百科中的例题说明。</p><br><p>举例：</p><p>haystack = &quot;ABC ABCDAB ABCDABCDABDE&quot;</p><p>needle = &quot;ABCDABD&quot;</p>`,14),M=p('<p>解法 1：暴力法，当比较到上图所示位置的时候，发现 D 和空格不一样。接下来，needle 往前挪动一小步，然后继续和 haystack 比较。</p><p>解法 2：KMP，直接让 needle 挪动到如上图所示的位置。</p><p>此处有两个常见的问题：</p><ol><li><p>为什么 KMP 无需慢慢移动比较，可以跳跃式比较呢？不会错过一些可能性吗？</p></li><li><p>如何能知道 needle 跳跃的位置呢？</p></li></ol><h3 id="lps" tabindex="-1">LPS <a class="header-anchor" href="#lps" aria-label="Permalink to &quot;LPS&quot;">​</a></h3><p>为了说明这两个问题，必须先讲解 KMP 里的一个重要数据结构------最长的公共前缀和后缀，英文是 Longest Prefix and Suffix，简称 LPS。</p><p>LPS 其实是一个数组，记录了字符串从头开始到某个位置结束的一段字符串当中，公共前缀和后缀的最大长度。所谓公共前缀和后缀，就是说字符串的前缀等于后缀，并且，前缀和后缀不能是同一段字符串。</p><p>以上题中 needle 字符串，它的 LPS 数组就是：{0, 0, 0, 0, 1, 2, 0}。</p><p>needle = &quot;ABCDABD&quot;</p>',9),x=s("p",{"0000120":""},"LPS =",-1),j=p('<ul><li>LPS[0] = 0，表示字符串&quot;A&quot;的最长公共前缀和后缀的长度为 0。</li></ul><p>注意：虽然&quot;A&quot;的前缀和后缀都等于 A，但前缀和后缀不能是同一段字符串，因此，&quot;A&quot;的 LPS 为 0。</p><ul><li>LPS[1] = 0，表示字符串&quot;AB&quot;的最长公共前缀和后缀长度为 0。</li></ul><p>因为它只有一个前缀 A 和后缀 B，并且它们不相等，因此 LPS 为 0。</p><ul><li>LPS[4] = 1，表示字符串 ABCDA 的最长公共前缀和后缀的长度为 1。</li></ul><p>该字符串有很多前缀和后缀，前缀有：A，AB，ABC，ABCD，后缀有：BCDA，CDA，DA，A，其中两个相同并且长度最长的就是 A ，所以 LPS 为 1。</p><ul><li>LPS[5] = 2，表示字符串 ABCDAB 的最长公共前缀和后缀的长度为 2。</li></ul><p>该字符串有很多前缀和后缀，前缀有：A，AB，ABC，ABCD，ABCDA，后缀有：BCDAB，CDAB，DAB，AB，B，其中两个相同并且长度最长的就是 AB，所以 LPS 为 2。</p><h3 id="lps-实现跳跃比较" tabindex="-1">LPS 实现跳跃比较 <a class="header-anchor" href="#lps-实现跳跃比较" aria-label="Permalink to &quot;LPS 实现跳跃比较&quot;">​</a></h3><p>那么，LPS 数组如何实现跳跃比较 haystack 和 needle 字符串呢？</p>',10),L=s("ol",null,[s("li",null,[s("p",null,"haystack 里面的空格和 needle 里的 D 不相等时，在 needle 里，D 前面的字符串 ABCDAB 与 haystack 中对应的字符串是相等的。")]),s("li",null,[s("p",null,"ABCDAB 的 LPS 为 2，即，对于 ABCDAB ，它最后两个字符一定与它最前面两个字符相等。")]),s("li",null,[s("p",null,"若把最前面的两个字符挪到最后两个字符的位置，可以保证 AB 位置绝对能和 haystack 配对。")])],-1),V=s("p",null,"那么，为什么不需要去比较前面的位置？",-1),v=s("p",null,"例如：",-1),O=s("p",null,"例如：",-1),w=s("p",null,"因为没有必要。下面通过反证法来证明。将下图所示情况用抽象成为方块图形来表示。",-1),N=s("p",null,"其中红色的方块表示不相同的字符，分别对应 haystack 中的空格以及 needle 当中的 D 字符；而绿色的方块表示相同的最大前缀和后缀，对应字符串里的 AB。",-1),K=s("p",null,"现在，假设向右挪动了，使得 needle 能与 haystack 完美地匹配，如下所示，可以标出 haystack 与 needle 完美匹配时的关系。即，在 haystack 和 needle 里，有一段区间 A，它们是相同的。",-1),Q=s("p",null,"那么，needle 里，红色方块前的一段区间其实和 needle 开头的一段区间是相同的，它们都是 A，如下所示。",-1),R=s("p",null,'即，红色方块前的 needle 字符串，A 是共同的前缀和后缀。而它比两个绿色的方块要长得多，这与之前定义的"两个绿色方块是最长的公共前缀和后缀"相互矛盾。',-1),F=s("p",null,"因此，当知道两个绿色的方块就是最大的公共前缀和后缀时，可以放心地进行跳跃操作，而不必担心会错过完全匹配的情况发生。完美匹配不可能在跳跃的区间内发生。",-1),G=s("p",null,"那么，具体在算法上如何进行跳跃操作呢？",-1),J=p(`<ol><li><p>j 指针指向红色方块的位置，needle 的字符与 haystack 的字符不一样。</p></li><li><p>LPS[j - 1] = 2，即 j 指针前一个字符作为结尾时的最长公共前缀和后缀长度是 2，因此，只需要将 j 移动到 2 的位置即可，也就是 j = LPS[j - 1]。</p></li></ol><p>以上就是 KMP 算法的核心思想，下面来看代码如何实现。</p><h3 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>假如已经求出了 LPS 数组，如何实现上述跳跃策略？代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int strStr(String haystack, String needle) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = haystack.length();</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = needle.length();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int[] lps = getLPS(needle);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int i = 0, j = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (haystack.charAt(i) == needle.charAt(j)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            i++; j++;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (j == n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                return i - n;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else if (j &gt; 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            j = lps[j - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            i++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int strStr(String haystack, String needle) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = haystack.length();</span></span>
<span class="line"><span style="color:#24292E;">    int n = needle.length();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (n == 0) {</span></span>
<span class="line"><span style="color:#24292E;">        return 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int[] lps = getLPS(needle);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int i = 0, j = 0;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    while (i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m) {</span></span>
<span class="line"><span style="color:#24292E;">        if (haystack.charAt(i) == needle.charAt(j)) {</span></span>
<span class="line"><span style="color:#24292E;">            i++; j++;</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            if (j == n) {</span></span>
<span class="line"><span style="color:#24292E;">                return i - n;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        } else if (j &gt; 0) {</span></span>
<span class="line"><span style="color:#24292E;">            j = lps[j - 1];</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            i++;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return -1;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>代码解释</strong>：</p><ol><li><p>分别用变量 m 和 n 记录 haystack 字符串和 needle 字符串的长度。</p></li><li><p>若 n=0，返回 0，符合题目要求。</p></li><li><p>求出 needle 的 LPS，即最长的公共前缀和后缀数组。</p></li><li><p>分别定义两个指针 i 和 j，i 扫描 haystack，j 扫描 needle。</p></li><li><p>进入循环体，直到 i 扫描完整个 haystack，若扫描完还没有发现 needle 在里面，就跳出循环。</p></li><li><p>在循环体里面，当发现 i 指针指向的字符与 j 指针指向的字符相等的时候，两个指针一起向前走一步，i++，j++。</p></li><li><p>若 j 已经扫描完了 needle 字符串，说明在 haystack 中找到了 needle，立即返回它在 haystack 中的起始位置。</p></li><li><p>若 i 指针指向的字符和 j 指针指向的字符不相同，进行跳跃操作，j = LPS[j - 1]，此处必须要判断 j 是否大于 0。</p></li><li><p>j=0，表明此时 needle 的第一个字符就已经和 haystack 的字符不同，则对比 haystack 的下一个字符，所以 i++。</p></li><li><p>若没有在 haystack 中找到 needle，返回 -1。</p></li></ol><h3 id="复杂度分析-2" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析-2" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h3><p>KMP 算法需要 O(n) 的时间计算 LPS 数组，还需要 O(m) 的时间扫描一遍 haystack 字符串，整体的时间复杂度为 O(m + n)。这比暴力法快了很多。</p><h6 id="例题三扩展" tabindex="-1">例题三扩展 <a class="header-anchor" href="#例题三扩展" aria-label="Permalink to &quot;例题三扩展&quot;">​</a></h6><p>如何求出 needle 字符串的最长公共前缀和后缀数组？</p><h2 id="解题思路一-暴力法-2" tabindex="-1">解题思路一：暴力法 <a class="header-anchor" href="#解题思路一-暴力法-2" aria-label="Permalink to &quot;解题思路一：暴力法&quot;">​</a></h2><p><strong>解法</strong>：检查字符串的每个位置。</p><p><strong>举例</strong>：若字符串长度为 m，先尝试比较长度为 m−1 的前缀的后缀，如果两者一样，就记录下来；如果不一样，就尝试长度为 m−2 的前缀和后缀。以此类推。</p><p><strong>复杂度</strong>：O(n2)。</p><h2 id="解题思路二" tabindex="-1">解题思路二 <a class="header-anchor" href="#解题思路二" aria-label="Permalink to &quot;解题思路二&quot;">​</a></h2><p><strong>解法</strong>：对于给定的字符串 needle，用一个 i 指针从头到尾扫描一遍字符串，并且用一个叫 len 的变量来记录当前的最长公共前缀和后缀的长度。举例说明如下。</p>`,17),Y=s("p",null,"当 i 扫描到这个位置的时候，len=4，表明在 i 之前的字符串里，最长的前缀和后缀长度是 4，也就是那 4 个绿色的方块。",-1),W=s("p",null,"现在 needle[i] 不等于 needle[4]，怎么计算 LPS[i] 呢？",-1),Z=s("p",null,"既然无法构成长度为5的最长前缀和后缀，那便尝试构成长度为 4，3，或者 2 的前缀和后缀，但做法并非像暴力法一样逐个尝试比较，而是通过 LPS[len - 1] 得知下一个最长的前缀和后缀的长度是什么。举例说明如下。",-1),H=p(`<ul><li><p>LPS[len - 1] 记录的是橘色字符串的最长的前缀和后缀，假如 LPS[len - 1]=3，那么前面 3 个字符和后面的 3 个字符相等</p></li><li><p>绿色的部分其实和橘色的部分相同。</p></li><li><p>LPS[len - 1] 记录的其实是 i 指针之前的字符串里的第二长的公共前缀和后缀（最关键点）。</p></li><li><p>更新 len = LPS[len - 1]，继续比较 needle[i] 和 needle[len]。</p></li></ul><h3 id="代码实现-3" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-3" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int[] getLPS(String str) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 初始化一个 lps 数组用来保存最终的结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    int[] lps = new int[str.length()];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // lps 的第一个值一定是 0，即长度为 1 的字符串的最长公共前缀后缀的长度为 0，直接从第二个位置遍历。并且，初始化当前最长的 lps 长度为 0，用 len 变量记录下</span></span>
<span class="line"><span style="color:#E1E4E8;">    int i = 1, len = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 指针 i 遍历整个输入字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> str.length()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 若 i 指针能延续前缀和后缀，则更新 lps 值为 len+1</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (str.charAt(i) == str.charAt(len)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            lps[i++] = ++len;</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 否则，判断 len 是否大于 0，尝试第二长的前缀和后缀，是否能继续延续下去/</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else if (len &gt; 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            len = lps[len - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 所有的前缀和后缀都不符合，则当前的 lps 为 0，i++</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            i++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  return lps;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int[] getLPS(String str) {</span></span>
<span class="line"><span style="color:#24292E;">    // 初始化一个 lps 数组用来保存最终的结果</span></span>
<span class="line"><span style="color:#24292E;">    int[] lps = new int[str.length()];</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // lps 的第一个值一定是 0，即长度为 1 的字符串的最长公共前缀后缀的长度为 0，直接从第二个位置遍历。并且，初始化当前最长的 lps 长度为 0，用 len 变量记录下</span></span>
<span class="line"><span style="color:#24292E;">    int i = 1, len = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 指针 i 遍历整个输入字符串</span></span>
<span class="line"><span style="color:#24292E;">    while (i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> str.length()) {</span></span>
<span class="line"><span style="color:#24292E;">        // 若 i 指针能延续前缀和后缀，则更新 lps 值为 len+1</span></span>
<span class="line"><span style="color:#24292E;">        if (str.charAt(i) == str.charAt(len)) {</span></span>
<span class="line"><span style="color:#24292E;">            lps[i++] = ++len;</span></span>
<span class="line"><span style="color:#24292E;">        // 否则，判断 len 是否大于 0，尝试第二长的前缀和后缀，是否能继续延续下去/</span></span>
<span class="line"><span style="color:#24292E;">        } else if (len &gt; 0) {</span></span>
<span class="line"><span style="color:#24292E;">            len = lps[len - 1];</span></span>
<span class="line"><span style="color:#24292E;">        // 所有的前缀和后缀都不符合，则当前的 lps 为 0，i++</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            i++;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  return lps;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="复杂度分析-3" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析-3" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h3><p>时间复杂度为 O(n) ，这是一种比较高效的做法。</p><h3 id="举例说明" tabindex="-1">举例说明 <a class="header-anchor" href="#举例说明" aria-label="Permalink to &quot;举例说明&quot;">​</a></h3><p>下面通过举例来加深印象。</p><p>例题：needle 是 ADCADBADCADC。</p>`,8),U=s("ol",null,[s("li",null,"一开始，初始化 LPS 数组全部为 0。")],-1),X=s("p",null,"规定前缀和后缀不能是同一个字符串，所以从第二个字符开始扫描，此时 len = 0，i = 1。AD 字符串的最长公共前缀和后缀为 0，因为 A 不等于 D，所以 LPS[1] = 0。",-1),z=s("ol",{start:"2"},[s("li",null,"移动到 C。同样，对于 ADC ，最长的公共前缀和后缀也是 0，所以 LPS[2] = 0，此时，len 变量一直是 0。")],-1),$=s("ol",{start:"3"},[s("li",null,"移动到 A，此时 i=3。")],-1),ss=s("p",null,"对于字符串 ADCA，因为 needle[len] = needle[3]，所以执行代码 lps[i++] = ++len，也就是把 len+1 赋给 lps[i]，然后 i + 1，len + 1，表明对于字符串 ADCA，最长的公共前缀和后缀的长度为 1。",-1),ns=s("ol",{start:"4"},[s("li",null,"接下来到 D，此时 i = 4，len = 1。")],-1),as=s("p",null,"同样，由于 needle[len] 等于 needle[i]，都是字符 D，所以再次执行代码 lps[i++] = ++len，这样一来，lps[4] 就等于 2，表明对于字符串 ADCAD，最长的公共前缀和后缀长度是 2。",-1),ls=s("ol",{start:"5"},[s("li",null,"接下来是 B，此时 i = 5，len = 2。")],-1),ps=s("p",null,"needle[len] ='C'，而 needle[i] ='B'，两者不相等，同时，len 大于 0，将 len 修改为 lps[len - 1]，取出字符串 AD 的最长公共前缀和后缀的长度，也就是 0。当循环再次进行，needle[len] 仍不等于 neele[i]，因此对于 ADCADB ，最长的公共前缀后缀长度为 0。",-1),es=s("p",null,[s("strong",null,"建议"),l("：以上基本概括了 KMP 的算法思想和精髓，其实 KMP 的代码实现是很精妙的，建议大家不要去死记硬背，通过理解去帮助记忆。")],-1),ts=s("h6",{id:"结语",tabindex:"-1"},[l("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),os=s("p",null,"这节课讲解了三道比较难的题目，其中正规表达式以及 KMP 算法是重中之重。",-1),is=s("br",null,null,-1);function cs(rs,Es,hs,ys,ds,_s){const n=t("Image");return o(),i("div",null,[r,E,h,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaBmANhiBAAAvRVLSdAM365.png"}),y,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaBqAT7fLAHGVT_G-HGE157.gif"}),d,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaBqAXPBJAA5Vx5kRvrI712.gif"}),_,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaBuAQ_G7AB8iyyFhsP8537.gif"}),g,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaBuAanh5ABOPEuDQKbE900.gif"}),u,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaByAHgaZABWZDxwJlTo840.gif"}),A,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaByAQjMCAByIrvLjjAM248.gif"}),m,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaByAfZyzAABI-qF4lwQ735.png"}),k,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaB2ACxD_AC1iHvcGTv8971.gif"}),C,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaB2AS6txACaMXIPm9-I299.gif"}),B,f,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaB6AZDoqAB3_QEbtXrY350.gif"}),l(),P,S,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaB6AWUQNACIE9DZQPyI414.gif"}),l(),b,q,I,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaB6AMiybAByyazYRVgg510.gif"}),l(),D,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaB-AZrqFAIWMuevJfbs428.gif"}),l(),T,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCCAEy-TABNB_IdI3Eg442.gif"}),M,x,j,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCCAJ39aAERYoGxb1p0088.gif"}),l(),L,V,v,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCGAZUF4AAAhUwmoEAc094.png"}),O,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCGAJrCpAAAk60Qcsyw360.png"}),l(),w,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCGACDXcAB5wm3NTrb4729.gif"}),l(),N,K,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCKAeEE4AI6KeO453eY927.gif"}),l(),Q,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCOAJzQ0ACMA3QOrN2A725.gif"}),R,F,G,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCOAcfWEAHw9WU7AYQY830.gif"}),J,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCSATVZPACdhTz792dg446.gif"}),l(),Y,W,Z,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCSAVpIQAFEf-VyP6-A314.gif"}),H,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCWAYemSAGbI_2HuWFE739.gif"}),U,X,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCaATxS8ABYXnYXhN1Y816.gif"}),z,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCaAEnHyACFGv5D5WL4879.gif"}),$,ss,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/04/CgotOV2IaCaAPe83ACKGclsUKCA865.gif"}),ns,as,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/E4/CgoB5l2IaCeAW6P4AEhZHBJ_UJQ849.gif"}),ls,ps,es,ts,os,is])}const As=e(c,[["render",cs]]);export{us as __pageData,As as default};
