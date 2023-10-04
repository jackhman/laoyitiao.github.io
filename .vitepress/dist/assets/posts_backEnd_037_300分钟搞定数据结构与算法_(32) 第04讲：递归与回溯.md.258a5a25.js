import{_ as l,j as p,o,g as e,k as a,Q as s}from"./chunks/framework.e0c66c3f.js";const k=JSON.parse('{"title":"递归（Recursion） ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(32) 第04讲：递归与回溯.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(32) 第04讲：递归与回溯.md","lastUpdated":1696338709000}'),t={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(32) 第04讲：递归与回溯.md"},c=s('<p>前一节课讲解了几种经典的排序算法。面试主要考察的是分析和处理问题的能力，而排序算法的一些思想是非常常用的，例如归并排序和快速排序采用的分治法就是高效的算法思想。这节课将介绍：递归和回溯。</p><p>递归和回溯的关系密不可分：</p><ul><li><p>递归的基本性质就是函数调用，在处理问题的时候，递归往往是把一个大规模的问题不断地变小然后进行推导的过程。</p></li><li><p>回溯则是利用递归的性质，从问题的起始点出发，不断地进行尝试，回头一步甚至多步再做选择，直到最终抵达终点的过程。</p></li></ul><h6 id="递归-recursion" tabindex="-1">递归（Recursion） <a class="header-anchor" href="#递归-recursion" aria-label="Permalink to &quot;递归（Recursion）&quot;">​</a></h6><h6 id="算法思想" tabindex="-1">算法思想 <a class="header-anchor" href="#算法思想" aria-label="Permalink to &quot;算法思想&quot;">​</a></h6><p>递归算法是一种调用自身函数的算法（二叉树的许多性质在定义上就满足递归）。</p><p><strong>举例</strong>：（汉诺塔问题）有三个塔 A、B、C，一开始的时候，在塔 A 上放着 n 个盘子，它们自底向上按照从大到小的顺序叠放。现在要求将塔 A 中所有的盘子搬到塔 C 上，让你打印出搬运的步骤。在搬运的过程中，每次只能搬运一个盘子，另外，任何时候，无论在哪个塔上，大盘子不能放在小盘子的上面。</p><p><strong>解法</strong>：</p>',8),i=s(`<ol><li><p>从最终的结果出发，要把 n 个盘子按照大小顺序叠放在塔 C 上，就需要将塔 A 的底部最大的盘子搬到塔 C；</p></li><li><p>为了实现步骤 1，需要将除了这个最大盘子之外的其余盘子都放到塔 B 上。</p></li></ol><br><p>由上可知，将原来的问题规模从 n 个盘子变成了 n-1 个盘子，即将 n-1 个盘子转移到塔 B 上。</p><p>如果一个函数，能将 n 个盘子从塔 A，借助塔 B，搬到塔 C。那么，也可以利用该函数将 n-1 个盘子从塔 A，借助塔 C，搬到塔 B。同理，不断地把问题规模变小，当 n 为 1，也就是只有 1 个盘子的时候，直接打印出步骤。</p><p><strong>代码</strong>：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void hano(char A, char B, char C, int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n &gt; 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hano(A, C, B, n - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">        move(A, C);</span></span>
<span class="line"><span style="color:#E1E4E8;">        hano(B, A, C, n - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void hano(char A, char B, char C, int n) {</span></span>
<span class="line"><span style="color:#24292E;">    if (n &gt; 0) {</span></span>
<span class="line"><span style="color:#24292E;">        hano(A, C, B, n - 1);</span></span>
<span class="line"><span style="color:#24292E;">        move(A, C);</span></span>
<span class="line"><span style="color:#24292E;">        hano(B, A, C, n - 1);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>由上述总结出递归的算法思想，将一个问题的规模变小，然后再利用从小规模问题中得出的结果，结合当前的值或者情况，得出最终的结果。</p><p>通俗来说，把要实现的递归函数看成是已经实现好的， 直接利用解决一些子问题，然后需要考虑的就是如何根据子问题的解以及当前面对的情况得出答案。这种算法也被称为自顶向下（Top-Down）的算法。</p><h6 id="例题分析一" tabindex="-1">例题分析一 <a class="header-anchor" href="#例题分析一" aria-label="Permalink to &quot;例题分析一&quot;">​</a></h6><p>LeetCode 第 91 题，解码的方法。</p><p>一条包含字母 A-Z 的消息通过以下方式进行了编码：</p><p>&#39;A&#39; -&gt; 1</p><p>&#39;B&#39; -&gt; 2</p><p>...</p><p>&#39;Z&#39; -&gt; 26</p><p>给定一个只包含数字的非空字符串，请计算解码方法的总数。</p><h3 id="解题思路" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><ol><li><p>就例题中的第二个例子，给定编码后的消息是字符串&quot;226&quot;，如果对其中&quot;22&quot;的解码有 m 种可能，那么，加多一个&quot;6&quot;在最后，相当于在最终解密出来的字符串里多了一个&quot;F&quot;字符而已，总体的解码还是只有 m 种。</p></li><li><p>对于&quot;6&quot;而言，如果它的前面是&quot;1&quot;或者&quot;2&quot;，那么它就有可能是&quot;16&quot;，&quot;26&quot;，所以还可以再往前看一个字符，发现它是&quot;26&quot;。而前面的解码组合是 k 个，那么在这 k 个解出的编码里，添加一个&quot;Z&quot;，所以总的解码个数就是 m+k。</p></li></ol><br><h6 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int numDecodings(String s) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (s.charAt(0) == &#39;0&#39;) return 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    char[] chars = s.toCharArray();</span></span>
<span class="line"><span style="color:#E1E4E8;">    return decode(chars, chars.length - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 字符串转换成字符数组，利用递归函数 decode，从最后一个字符向前递归</span></span>
<span class="line"><span style="color:#E1E4E8;">int decode(char[] chars, int index) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 处理到了第一个字符,只能有一种解码方法，返回 1</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (index </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= 0) return 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    int count = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    char curr = chars[index];</span></span>
<span class="line"><span style="color:#E1E4E8;">    char prev = chars[index - 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 当前字符比 “0” 大，则直接利用它之前的字符串所求得的结果     </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (curr &gt; &#39;0&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        count = decode(chars, index - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 由前一个字符和当前字符所构成的数字，值必须要在 1 到 26 之间，否则无法进行解码 </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (prev == &#39;1&#39; || (prev == &#39;2&#39; &amp;&amp; curr </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= &#39;6&#39;)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        count += decode(chars, index - 2);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    return count;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int numDecodings(String s) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (s.charAt(0) == &#39;0&#39;) return 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    char[] chars = s.toCharArray();</span></span>
<span class="line"><span style="color:#24292E;">    return decode(chars, chars.length - 1);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 字符串转换成字符数组，利用递归函数 decode，从最后一个字符向前递归</span></span>
<span class="line"><span style="color:#24292E;">int decode(char[] chars, int index) {</span></span>
<span class="line"><span style="color:#24292E;">    // 处理到了第一个字符,只能有一种解码方法，返回 1</span></span>
<span class="line"><span style="color:#24292E;">    if (index </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= 0) return 1;</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    int count = 0;</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    char curr = chars[index];</span></span>
<span class="line"><span style="color:#24292E;">    char prev = chars[index - 1];</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">    // 当前字符比 “0” 大，则直接利用它之前的字符串所求得的结果     </span></span>
<span class="line"><span style="color:#24292E;">    if (curr &gt; &#39;0&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">        count = decode(chars, index - 1);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">    // 由前一个字符和当前字符所构成的数字，值必须要在 1 到 26 之间，否则无法进行解码 </span></span>
<span class="line"><span style="color:#24292E;">    if (prev == &#39;1&#39; || (prev == &#39;2&#39; &amp;&amp; curr </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= &#39;6&#39;)) {</span></span>
<span class="line"><span style="color:#24292E;">        count += decode(chars, index - 2);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    return count;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="解题模板" tabindex="-1">解题模板 <a class="header-anchor" href="#解题模板" aria-label="Permalink to &quot;解题模板&quot;">​</a></h6><p>通过上述例题，来归纳总结一下递归函数的解题模版。</p><h3 id="解题步骤" tabindex="-1"><strong>解题步骤</strong> <a class="header-anchor" href="#解题步骤" aria-label="Permalink to &quot;**解题步骤**&quot;">​</a></h3><ol><li><p>判断当前情况是否非法，如果非法就立即返回，这一步也被称为完整性检查（Sanity Check）。例如，看看当前处理的情况是否越界，是否出现了不满足条件的情况。通常，这一部分代码都是写在最前面的。</p></li><li><p>判断是否满足结束递归的条件。在这一步当中，处理的基本上都是一些推导过程当中所定义的初始情况。</p></li><li><p>将问题的规模缩小，递归调用。在归并排序和快速排序中，我们将问题的规模缩小了一半，而在汉诺塔和解码的例子中，我们将问题的规模缩小了一个。</p></li><li><p>利用在小规模问题中的答案，结合当前的数据进行整合，得出最终的答案。</p></li></ol><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function fn(n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 第一步：判断输入或者状态是否非法？</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (input/state is invalid) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第二步：判读递归是否应当结束?</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (match condition) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return some value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第三步：缩小问题规模</span></span>
<span class="line"><span style="color:#E1E4E8;">    result1 = fn(n1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    result2 = fn(n2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第四步: 整合结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    return combine(result1, result2)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function fn(n) {</span></span>
<span class="line"><span style="color:#24292E;">    // 第一步：判断输入或者状态是否非法？</span></span>
<span class="line"><span style="color:#24292E;">    if (input/state is invalid) {</span></span>
<span class="line"><span style="color:#24292E;">        return;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第二步：判读递归是否应当结束?</span></span>
<span class="line"><span style="color:#24292E;">    if (match condition) {</span></span>
<span class="line"><span style="color:#24292E;">        return some value;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第三步：缩小问题规模</span></span>
<span class="line"><span style="color:#24292E;">    result1 = fn(n1)</span></span>
<span class="line"><span style="color:#24292E;">    result2 = fn(n2)</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第四步: 整合结果</span></span>
<span class="line"><span style="color:#24292E;">    return combine(result1, result2)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="例题分析二" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>LeetCode 第 247 题：找到所有长度为 n 的中心对称数。</p><p><strong>示例</strong></p><p>输入: n = 2</p><p>输出: [&quot;11&quot;,&quot;69&quot;,&quot;88&quot;,&quot;96&quot;]</p><h3 id="解题思路-1" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-1" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3>`,34),r=s(`<ul><li><p>当 n=0 的时候，应该输出空字符串：&quot; &quot;。</p></li><li><p>当 n=1 的时候，也就是长度为 1 的中心对称数有：0，1，8。</p></li><li><p>当 n=2 的时候，长度为 2 的中心对称数有：11， 69，88，96。注意：00 并不是一个合法的结果。</p></li><li><p>当 n=3 的时候，只需要在长度为 1 的合法中心对称数的基础上，不断地在两边添加 11，69，88，96 就可以了。</p></li></ul><p>[101, 609, 808, 906, 111, 619, 818, 916, 181, 689, 888, 986]</p><br><p>随着 n 不断地增长，我们只需要在长度为 n-2 的中心对称数两边添加 11，69，88，96 即可。</p><h2 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">List&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt; helper(int n, int m) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 第一步：判断输入或者状态是否非法？</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0 || m </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0 || n &gt; m) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        throw new IllegalArgumentException(&quot;invalid input&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第二步：判读递归是否应当结束?</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n == 0) return new ArrayList&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt;(Arrays.asList(&quot;&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n == 1) return new ArrayList&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt;(Arrays.asList(&quot;0&quot;, &quot;1&quot;, &quot;8&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 第三步：缩小问题规模</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt; list = helper(n - 2, m); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第四步: 整合结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt; res = new ArrayList&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> list.size(); i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String s = list.get(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (n != m) res.add(&quot;0&quot; + s + &quot;0&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        res.add(&quot;1&quot; + s + &quot;1&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        res.add(&quot;6&quot; + s + &quot;9&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        res.add(&quot;8&quot; + s + &quot;8&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        res.add(&quot;9&quot; + s + &quot;6&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return res;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">List&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt; helper(int n, int m) {</span></span>
<span class="line"><span style="color:#24292E;">    // 第一步：判断输入或者状态是否非法？</span></span>
<span class="line"><span style="color:#24292E;">    if (n </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0 || m </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0 || n &gt; m) {</span></span>
<span class="line"><span style="color:#24292E;">        throw new IllegalArgumentException(&quot;invalid input&quot;);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第二步：判读递归是否应当结束?</span></span>
<span class="line"><span style="color:#24292E;">    if (n == 0) return new ArrayList&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt;(Arrays.asList(&quot;&quot;));</span></span>
<span class="line"><span style="color:#24292E;">    if (n == 1) return new ArrayList&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt;(Arrays.asList(&quot;0&quot;, &quot;1&quot;, &quot;8&quot;));</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 第三步：缩小问题规模</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt; list = helper(n - 2, m); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第四步: 整合结果</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt; res = new ArrayList&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> list.size(); i++) {</span></span>
<span class="line"><span style="color:#24292E;">        String s = list.get(i);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        if (n != m) res.add(&quot;0&quot; + s + &quot;0&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        res.add(&quot;1&quot; + s + &quot;1&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        res.add(&quot;6&quot; + s + &quot;9&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        res.add(&quot;8&quot; + s + &quot;8&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        res.add(&quot;9&quot; + s + &quot;6&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return res;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="算法分析" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析" aria-label="Permalink to &quot;算法分析&quot;">​</a></h2><p>分析非递归算法的时间复杂度非常直接，例如，前一节课里分析过冒泡排序以及插入排序的时间复杂度，分析方法就是数有多少层循环，由于每层循环里面执行的操作都是对比和交换，时间复杂度是 O(1)，所以，最终的时间复杂度就是将每层循环的长度相乘。</p><p>分析递归算法推荐两种方法：</p><ul><li><p>迭代法</p></li><li><p>公式法</p></li></ul><h6 id="迭代法" tabindex="-1">迭代法 <a class="header-anchor" href="#迭代法" aria-label="Permalink to &quot;迭代法&quot;">​</a></h6><p><strong>举例</strong> ：分析汉诺塔递归函数的时间复杂度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void hano(char A, char B, char C, int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n &gt; 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hano(A, C, B, n - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">        move(A, C);</span></span>
<span class="line"><span style="color:#E1E4E8;">        hano(B, A, C, n - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void hano(char A, char B, char C, int n) {</span></span>
<span class="line"><span style="color:#24292E;">    if (n &gt; 0) {</span></span>
<span class="line"><span style="color:#24292E;">        hano(A, C, B, n - 1);</span></span>
<span class="line"><span style="color:#24292E;">        move(A, C);</span></span>
<span class="line"><span style="color:#24292E;">        hano(B, A, C, n - 1);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>假设这个递归函数的运行时间是 T(n)。</p><ol><li>if 语句（一般取 if 块或 else 块之间最大的时间复杂度）中，比较和判断 n 的大小，CPU 的执行时间为 1 个单位。</li></ol><br><ol start="2"><li>两次调用递归函数，每次都使问题的规模减少 1 个，得到两倍的 T(n-1)。打印输出的语句，CPU 的执行时间也为 1 个单位。因此得出：T(n) = 1 + 2×T(n - 1) + 1。</li></ol><br><p>此处 if 语句和打印输出语句的执行时间与问题规模 n 无关，因此它们的算法时间复杂度可以记为 O(1)，表达式变为：T(n) = 2×T(n - 1) + O(1)。</p><br><p>当 n=0 的时候，T(0) = 1，因为当没有盘子的时候，if 语句也要进行一次比较，判断 n 是否大于 0。</p><ol start="3"><li>用迭代法将 T(n) 进行展开。</li></ol><p>T(n - 1) = 2×T(n - 2) + 1，以此类推，不断地代入到 T(n) 的表达式当中，得到如下关系：</p><p>T(n) = 2× (2×T(n - 2) + 1) + 1 = 2^2^×T(n - 2) + (2 + 1)</p><p>T(n) = 2×(2× (2×T(n - 3) + 1) + 1) + 1 = 2^3^×T(n - 3) + (4 + 2 + 1)</p><p>T(n) = 2×(2×(2×(2×T(n - 4) + 1) + 1) + 1) + 1 = 2^4^×T(n - 4) + (8 + 4 + 2 + 1)</p><p>...</p><p>T(n) = 2^k^×T(n - k) + (2^k^ - 1)</p><p>其中，1 + 2 + 4 + 8 + ... 是一个等比数列，由求和公式得到 2^k^ - 1。当 k 等于 n 的时候，T(n) = 2^n^×T(0) + (2^n^ - 1)，由于 T(0) 等于 1，所以最终 T(n) = 2×2^n^ - 1。</p><br><p>对 T(n) 求 O 的值得到：O(n) = O(T(n)) = O(2×2^n^ - 1) ，忽略掉常量和系数，O(n) = O(2^n^)。</p><p>所以，整个算法的时间复杂度就是 O(2^n^)。</p><p>而很难通过迭代法推导出比较复杂的时间复杂度的时候，可以借用公式法。</p><h6 id="公式法" tabindex="-1">公式法 <a class="header-anchor" href="#公式法" aria-label="Permalink to &quot;公式法&quot;">​</a></h6><p>公式法可以说是计算递归函数复杂度最方便的工具，当递归函数的时间执行函数满足如下的关系式时，我们可以利用公式法：T(n) = a×T(n/b) + f(n)。</p><br><p>其中，f(n) 是每次递归完毕之后额外的计算执行时间。例如，在归并排序中，每次递归处理完两边的数组后，我们需要执行合并的操作，那么这个操作的执行时间就是 f(n)。</p><p>当参数 a、b 都确定的时候，光看递归的部分，它的时间复杂度就是：O(n^log~b~a)。</p><p>由于时间复杂度求的是上界（upper bound)，通过对比递归部分的时间复杂度和 f(n) 的大小关系，得出最后的整体时间复杂度。牢记以下三种情况和相应公式：</p><ol><li><p>当递归部分的执行时间 nlog(b)a 大于 f(n) 的时候，最终的时间复杂度就是 O(n^log~b~a)。</p></li><li><p>当递归部分的执行时间 nlog(b)a 小于 f(n) 的时候，最终的时间复杂度就是 f(n)。</p></li><li><p>当递归部分的执行时间 nlog(b)a 等于 f(n) 的时候，最终的时间复杂度就是 O(n^log~b~a)logn。</p></li></ol><p><strong>举例 1</strong>：分析归并排序的时间复杂度。</p><p>T(n) = 2T(n/2) + n</p><p>a = 2，b = 2，f(n) = n</p><p>log~b~a = 1，n^1^ = n</p><p>符合第三种情况，最终的时间复杂度就是 O(nlogn)。</p><p><strong>举例 2</strong>：分析下面函数的时间复杂度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int recursiveFn(int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (n == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return recursiveFn(n / 4) + recursiveFn(n / 4);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int recursiveFn(int n) {</span></span>
<span class="line"><span style="color:#24292E;">    if (n == 0) {</span></span>
<span class="line"><span style="color:#24292E;">        return 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return recursiveFn(n / 4) + recursiveFn(n / 4);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>得出时间执行函数：T(n) = 2×T(n/4) + 1，a = 2，b = 4，f(n) = 1。</p><p>代入公式得到：n^log~4~2 = n^0.5^，当 n&gt;1 的时候，n^0.5^&gt;1，因此，时间复杂度就是 O(n^0.5^)。</p><p><strong>举例 3</strong>：已知时间执行函数如下，分析时间复杂度。</p><p>T(n) = 3×T(n/2) + n^2^</p><p>a = 3，b = 2，f(n) = n^2^</p><p>最复杂的操作发生在递归完成之后，符合第二种情况。</p><p>代入公式得到：n^log~2~3 = n^1.48^&lt;n^2^，最后递归的时间复杂度是 O(n^2^)。</p><h6 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h6><p>对于时间复杂度的分析是算法面试中非常重要的一环，掌握好迭代法和公式法，对于分析大多数面试题都有非常重要的帮助，需要通过不断地练习，来熟练运用它们。</p><h6 id="回溯-backtracking" tabindex="-1">回溯（Backtracking） <a class="header-anchor" href="#回溯-backtracking" aria-label="Permalink to &quot;回溯（Backtracking）&quot;">​</a></h6><h6 id="算法思想-1" tabindex="-1">算法思想 <a class="header-anchor" href="#算法思想-1" aria-label="Permalink to &quot;算法思想&quot;">​</a></h6><p>回溯实际上是一种试探算法，这种算法跟暴力搜索最大的不同在于，在回溯算法里，是一步一步地小心翼翼地进行向前试探，会对每一步探测到的情况进行评估，如果当前的情况已经无法满足要求，那么就没有必要继续进行下去，也就是说，它可以帮助我们避免走很多的弯路。</p><p>回溯算法的特点在于，当出现非法的情况时，算法可以回退到之前的情景，可以是返回一步，有时候甚至可以返回多步，然后再去尝试别的路径和办法。这也就意味着，想要采用回溯算法，就必须保证，每次都有多种尝试的可能。</p><h6 id="解题模板-1" tabindex="-1">解题模板 <a class="header-anchor" href="#解题模板-1" aria-label="Permalink to &quot;解题模板&quot;">​</a></h6><p><strong>解题步骤</strong></p><ol><li><p>判断当前情况是否非法，如果非法就立即返回；</p></li><li><p>当前情况是否已经满足递归结束条件，如果是就将当前结果保存起来并返回；</p></li><li><p>当前情况下，遍历所有可能出现的情况并进行下一步的尝试；</p></li><li><p>递归完毕后，立即回溯，回溯的方法就是取消前一步进行的尝试。</p></li></ol><p><strong>代码模板</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function fn(n) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第一步：判断输入或者状态是否非法？</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (input/state is invalid) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第二步：判读递归是否应当结束?</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (match condition) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return some value;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 遍历所有可能出现的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (all possible cases) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 第三步: 尝试下一步的可能性</span></span>
<span class="line"><span style="color:#E1E4E8;">        solution.push(case)</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 递归</span></span>
<span class="line"><span style="color:#E1E4E8;">        result = fn(m)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 第四步：回溯到上一步</span></span>
<span class="line"><span style="color:#E1E4E8;">        solution.pop(case)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function fn(n) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第一步：判断输入或者状态是否非法？</span></span>
<span class="line"><span style="color:#24292E;">    if (input/state is invalid) {</span></span>
<span class="line"><span style="color:#24292E;">        return;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第二步：判读递归是否应当结束?</span></span>
<span class="line"><span style="color:#24292E;">    if (match condition) {</span></span>
<span class="line"><span style="color:#24292E;">        return some value;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 遍历所有可能出现的情况</span></span>
<span class="line"><span style="color:#24292E;">    for (all possible cases) {</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">        // 第三步: 尝试下一步的可能性</span></span>
<span class="line"><span style="color:#24292E;">        solution.push(case)</span></span>
<span class="line"><span style="color:#24292E;">        // 递归</span></span>
<span class="line"><span style="color:#24292E;">        result = fn(m)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 第四步：回溯到上一步</span></span>
<span class="line"><span style="color:#24292E;">        solution.pop(case)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="例题分析一-1" tabindex="-1">例题分析一 <a class="header-anchor" href="#例题分析一-1" aria-label="Permalink to &quot;例题分析一&quot;">​</a></h6><p>LeetCode 第 39 题：给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的数字可以无限制重复被选取。</p><p>说明：</p><ul><li><p>所有数字（包括 target）都是正整数。</p></li><li><p>解集不能包含重复的组合。</p></li></ul><p><strong>解题思路</strong></p><p>题目要求的是所有不重复的子集，而且子集里的元素的值的总和等于一个给定的目标。</p><p><strong>思路 1</strong>：暴力法。</p><p>罗列出所有的子集组合，然后逐个判断它们的总和是否为给定的目标值。解法非常慢。</p><p><strong>思路 2</strong>：回溯法。</p><ol><li><p>从一个空的集合开始，小心翼翼地往里面添加元素。</p></li><li><p>每次添加，检查一下当前的总和是否等于给定的目标。</p></li><li><p>如果总和已经超出了目标，说明没有必要再尝试其他的元素了，返回并尝试其他的元素；</p></li><li><p>如果总和等于目标，就把当前的组合添加到结果当中，表明我们找到了一种满足要求的组合，同时返回，并试图寻找其他的集合。</p></li></ol><h6 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int[][] combinationSum(int[] candidates, int target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int[][] results;</span></span>
<span class="line"><span style="color:#E1E4E8;">    backtracking(candidates, target, 0, [], results - 换另外一种颜色高亮);</span></span>
<span class="line"><span style="color:#E1E4E8;">    return results;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">void backtracking = (int[] candidates, int target, int start, int[] solution, int[][] results) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (target === 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        results.push(solution);</span></span>
<span class="line"><span style="color:#E1E4E8;">        return;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = start; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> candidates.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        solution.push(candidates[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        backtracking(candidates, target - candidates[i], i, solution, results);</span></span>
<span class="line"><span style="color:#E1E4E8;">        solution.pop();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int[][] combinationSum(int[] candidates, int target) {</span></span>
<span class="line"><span style="color:#24292E;">    int[][] results;</span></span>
<span class="line"><span style="color:#24292E;">    backtracking(candidates, target, 0, [], results - 换另外一种颜色高亮);</span></span>
<span class="line"><span style="color:#24292E;">    return results;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">void backtracking = (int[] candidates, int target, int start, int[] solution, int[][] results) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    if (target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">        return;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (target === 0) {</span></span>
<span class="line"><span style="color:#24292E;">        results.push(solution);</span></span>
<span class="line"><span style="color:#24292E;">        return;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    for (int i = start; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> candidates.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        solution.push(candidates[i]);</span></span>
<span class="line"><span style="color:#24292E;">        backtracking(candidates, target - candidates[i], i, solution, results);</span></span>
<span class="line"><span style="color:#24292E;">        solution.pop();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在主函数里：</p><ol><li><p>定义一个 results 数组用来保存最终的结果；</p></li><li><p>调用函数 backtracking，并将初始的情况以及 results 传递进去，这里的初始情况就是从第一个元素开始尝试，而且初始的子集为空。</p></li></ol><p>在 backtracking 函数里：</p><ol><li><p>检查当前的元素总和是否已经超出了目标给定的值，每添加进一个新的元素时，就将它从目标总和中减去；</p></li><li><p>如果总和已经超出了目标给定值，就立即返回，去尝试其他的数值；</p></li><li><p>如果总和刚好等于目标值，就把当前的子集添加到结果中。</p></li></ol><br><p>在循环体内：</p><ol><li><p>每次添加了一个新的元素，立即递归调用 backtracking，看是否找到了合适的子集</p></li><li><p>递归完毕后，要把上次尝试的元素从子集里删除，这是最重要的。</p></li></ol><br><p>以上，就完成了回溯。</p><p>提示：这是一个最经典的回溯的题目，麻雀虽小，但五脏俱全。它完整地体现了回溯算法的各个阶段。</p><h6 id="例题分析二-1" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二-1" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>LeetCode 第 51 题， 在一个 N×N 的国际象棋棋盘上放置 N 个皇后，每行一个并使她们不能互相攻击。给定一个整数 N，返回 N 皇后不同的的解决方案的数量。</p><h3 id="解题思路-2" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-2" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>解决 N 皇后问题的关键就是如何判断当前各个皇后的摆放是否合法。</p>`,91),E=s(`<p>利用一个数组 columns[] 来记录每一行里皇后所在的列。例如，第一行的皇后如果放置在第 5 列的位置上，那么 columns[0] = 6。从第一行开始放置皇后，每行只放置一个，假设之前的摆放都不会产生冲突，现在将皇后放在第 row 行第 col 列上，检查一下这样的摆放是否合理。</p><br><p>方法就是沿着两个方向检查是否存在冲突就可以了。</p><h2 id="代码实现-3" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-3" aria-label="Permalink to &quot;代码实现&quot;">​</a></h2><p>首先，从第一行开始直到第 row 行的前一行为止，看那一行所放置的皇后是否在 col 列上，或者是不是在它的对角线上，代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean check(int row, int col, int[] columns) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int r = 0; r </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> row; r++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (columns[r] == col || row - r == Math.abs(columns[r] - col)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean check(int row, int col, int[] columns) {</span></span>
<span class="line"><span style="color:#24292E;">    for (int r = 0; r </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> row; r++) {</span></span>
<span class="line"><span style="color:#24292E;">        if (columns[r] == col || row - r == Math.abs(columns[r] - col)) {</span></span>
<span class="line"><span style="color:#24292E;">            return false;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return true;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>然后进行回溯的操作，代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int count;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">int totalNQueens(int n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    count = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    backtracking(n, 0, new int[n]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    return count;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">void backtracking(int n, int row, int[] columns) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 是否在所有n行里都摆放好了皇后？</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (row == n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        count++; // 找到了新的摆放方法</span></span>
<span class="line"><span style="color:#E1E4E8;">        return;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 尝试着将皇后放置在当前行中的每一列   </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int col = 0; col </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; col++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        columns[row] = col;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 检查是否合法，如果合法就继续到下一行</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (check(row, col, columns)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            backtracking(n, row + 1, columns);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 如果不合法，就不要把皇后放在这列中（回溯）</span></span>
<span class="line"><span style="color:#E1E4E8;">        columns[row] = -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int count;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">int totalNQueens(int n) {</span></span>
<span class="line"><span style="color:#24292E;">    count = 0;</span></span>
<span class="line"><span style="color:#24292E;">    backtracking(n, 0, new int[n]);</span></span>
<span class="line"><span style="color:#24292E;">    return count;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">void backtracking(int n, int row, int[] columns) {</span></span>
<span class="line"><span style="color:#24292E;">    // 是否在所有n行里都摆放好了皇后？</span></span>
<span class="line"><span style="color:#24292E;">    if (row == n) {</span></span>
<span class="line"><span style="color:#24292E;">        count++; // 找到了新的摆放方法</span></span>
<span class="line"><span style="color:#24292E;">        return;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 尝试着将皇后放置在当前行中的每一列   </span></span>
<span class="line"><span style="color:#24292E;">    for (int col = 0; col </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; col++) {</span></span>
<span class="line"><span style="color:#24292E;">        columns[row] = col;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 检查是否合法，如果合法就继续到下一行</span></span>
<span class="line"><span style="color:#24292E;">        if (check(row, col, columns)) {</span></span>
<span class="line"><span style="color:#24292E;">            backtracking(n, row + 1, columns);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 如果不合法，就不要把皇后放在这列中（回溯）</span></span>
<span class="line"><span style="color:#24292E;">        columns[row] = -1;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="算法分析-1" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-1" aria-label="Permalink to &quot;算法分析&quot;">​</a></h6><p>回溯其实是用递归实现的，因此我们在分析回溯的时间复杂度时，其实就是在对递归函数进行分析，方法和之前介绍的一样。</p><p><strong>举例</strong>：分析一下 N 皇后的时间复杂度。</p><p>假设 backtracking 函数的执行时间是 T(n)。</p><p><strong>解法</strong>：</p><ol><li><p>每次都必须遍历所有的列，一共有 n 列。</p></li><li><p>在每次遍历中，先要利用 check 函数检查当前的摆放方法会不会产生冲突，检查的时间复杂度由当前所在的行决定，上限是 n，所以总时间复杂度就是 O(n^2^)。</p></li><li><p>递归地尝试着每种摆放，当我们放好了第一个皇后，剩下要处理的之后 n-1 个皇后，问题的规模减少了一个，于是执行时间变成了 T(n - 1)。</p></li></ol><p>最终得到了 T(n) 的表达式：T(n) = n×T(n - 1) + O(n^2^)。</p><p>利用迭代法将 T(n) 展开得到：</p><p>T(n) = n×((n - 1)×T(n - 2) + (n - 1)^2^ + n^2^</p><p>...</p><p>T(n) = n×(n - 1)×(n - 2)× ... ×1 + 1 + 2^2^ + 3^2^ + ... (n - 1)^2^ + n^2^</p><p>前面一部分是阶乘，后面一部分是平方求和，根据公式最后得到：</p><p>T(n) = n! + n(n+1)(2n+1)/6</p><p>O(T(n)) = n! + O(n^3^)</p><p>由于 n!&gt;n^3^，因此，它的上界就是 n!，即：O(T(n)) = n!</p><h6 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h6><p>递归和回溯可以说是算法面试中最重要的算法考察点之一，很多其他算法都有它们的影子。例如，二叉树的定义和遍历就利用到了递归的性质；归并排序、快速排序的时候也运用了递归；我们将在第 6 课介绍动态规划，它其实是对递归的一种优化；还有第 7 课里的二分搜索，也可以利用递归去实现。</p><p>注意：要能熟练掌握好分析递归复杂度的方法，必须得有比较扎实的数学基础，比如对等差数列、等比数列等求和公式要牢记。</p><p>建议：LeetCode 上对递归和回溯的题目分类做得很好，有丰富的题库，建议大家多做。</p><br>`,29);function y(u,d,h,g,b,f){const n=p("Image");return o(),e("div",null,[c,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/12/CgoB5l2IjneAd7CsALPFsWgB1rw332.gif"}),i,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/32/CgotOV2IjniAGk33AEvgAuHp84Y570.gif"}),r,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/12/CgoB5l2IjnmALbFsAC7XEvsRn6M912.gif"}),E])}const m=l(t,[["render",y]]);export{k as __pageData,m as default};
