import{_ as t,D as e,o,g as i,J as p,h as a,Q as l,m as s}from"./chunks/framework.f67d7268.js";const ps=JSON.parse('{"title":"第10讲：高频真题解析III（上)","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(38) 第10讲：高频真题解析 III（上).md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(38) 第10讲：高频真题解析 III（上).md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(38) 第10讲：高频真题解析 III（上).md"},r=l('<h1 id="第10讲-高频真题解析iii-上" tabindex="-1">第10讲：高频真题解析III（上) <a class="header-anchor" href="#第10讲-高频真题解析iii-上" aria-label="Permalink to &quot;第10讲：高频真题解析III（上)&quot;">​</a></h1><p>这节课将分析三道比较难的题目，希望能帮助大家拓宽解题的思路。主要内容包括：</p><ul><li><p>正则表达式匹配</p></li><li><p>柱状图中的最大矩形</p></li><li><p>实现 strStr() 函数</p></li></ul><h6 id="例题分析一" tabindex="-1">例题分析一 <a class="header-anchor" href="#例题分析一" aria-label="Permalink to &quot;例题分析一&quot;">​</a></h6><p>LeetCode 第 10 题，正则表达式匹配：给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 &#39;.&#39; 和 &#39;*&#39; 的正则表达式匹配。</p><ul><li><p>&#39;.&#39; 匹配任意单个字符</p></li><li><p>&#39;*&#39; 匹配零个或多个前面的那一个元素</p></li></ul><br><p>注意：所谓匹配，是要涵盖整个字符串 s 的，而不是部分字符串。</p><p>说明：</p><ul><li><p>s 可能为空，且只包含从 a-z 的小写字母。</p></li><li><p>p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。</p></li></ul><p><strong>示例 1</strong></p><p>输入:</p><p>s = &quot;aa&quot;</p><p>p = &quot;a&quot;</p><p>输出: false</p><p>解释: &quot;a&quot; 无法匹配 &quot;aa&quot; 整个字符串。</p><p><strong>示例 2</strong></p><p>输入:</p><p>s = &quot;aa&quot;</p><p>p = &quot;a*&quot;</p><p>输出: true</p><p>解释: 因为 &#39;*&#39; 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 &#39;a&#39;。因此，字符串 &quot;aa&quot; 可被视为 &#39;a&#39; 重复了一次。</p><p><strong>示例 3</strong></p><p>输入:</p><p>s = &quot;ab&quot;</p><p>p = &quot;.*&quot;</p><p>输出: true</p><p>解释: &quot;.*&quot; 表示可匹配零个或多个（&#39;*&#39;）任意字符（&#39;.&#39;）。</p><p><strong>示例 4</strong></p><p>输入:</p><p>s = &quot;aab&quot;</p><p>p = &quot;c*a*b&quot;</p><p>输出: true</p><p>解释: 因为 &#39;*&#39; 表示零个或多个，这里 &#39;c&#39; 为 0 个, &#39;a&#39; 被重复一次。因此可以匹配字符串 &quot;aab&quot;。</p><p><strong>示例 5</strong></p><p>输入:</p><p>s = &quot;mississippi&quot;</p><p>p = &quot;mis*is*p*.&quot;</p><p>输出: false</p><p>解释：&#39;p&#39;与&#39;i&#39;无法匹配。</p><h6 id="解题思路" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路" aria-label="Permalink to &quot;解题思路&quot;">​</a></h6><p>不要害怕，这道题只要求实现正则表达式里的两个小功能。</p><h3 id="判断-s-和-p-匹配" tabindex="-1">判断 s 和 p 匹配 <a class="header-anchor" href="#判断-s-和-p-匹配" aria-label="Permalink to &quot;判断 s 和 p 匹配&quot;">​</a></h3><p>举例：给定两个字符串 s 和 p，判断 s 和 p 是否匹配。</p><br><p>解法：s 和 p 必须要相等。定义两个指针 i 和 j，分别指向 s 和 p 的第一个字符，然后逐个去比较，一旦发现不相等，就立即知道 s 和 p 不匹配。</p>',46),E=s("p",null,"此时，假设 s 字符串的长度为 m，p 字符串的长度为 n，s 和 p 匹配的条件就是 s 和 p 从头到尾一直匹配，即 i == m 同时 j == n 是 s 和 p 匹配的唯一条件。",-1),h=s("h3",{id:"点匹配符",tabindex:"-1"},[a("点匹配符 '.' "),s("a",{class:"header-anchor",href:"#点匹配符","aria-label":`Permalink to "点匹配符 '.'"`},"​")],-1),y=s("p",null,"'.' 匹配任意单个字符，首先要明确的是，它是一一对应关系，和 '*' 匹配符不一样。举例说明如下。",-1),d=s("p",null,"输入:",-1),u=s("p",null,'s = "leetcode"',-1),g=s("p",null,'p = "l..tc..e"',-1),_=s("p",null,"输出: true",-1),m=s("p",null,"因为 '.' 可以匹配任何字符，即，一旦遇上了 '.' 匹配符，可以让 i 指针和 j 指针同时跳到下一个位置。",-1),j=s("p",null,[s("strong",null,"星匹配符 '*'")],-1),b=s("p",null,`'*' 匹配符较难，先要理解这个星匹配符的定义。题目" '*' 匹配零个或多个前面的那一个元素"中包含三个重要的信息：`,-1),A=s("ol",null,[s("li",null,[s("p",null,"它匹配的是 p 字符串中，该 '*' 前面的那个字符。")]),s("li",null,[s("p",null,"它可以匹配零个或多个。")]),s("li",null,[s("p",null,"'*' 匹配符前面必须有一个非星的字符。")])],-1),f=s("p",null,"因此，在分析 '*' 匹配符的时候，一定要把 '*' 以及它前面的一个字符看作为一个整体， '*' 不能单独作为一个个体来看（例如点匹配符）。例如，p 字符串是 a *，则把 (a*) 当作一个整体来看。",-1),q=s("p",null,"对 p 字符串说明如下。",-1),M=l('<ul><li><p>p 可以表示空字符串，因为 &#39;*&#39; 可以匹配 0 个前面的字符，即当有 0 个 a 的时候，为空字符串。</p></li><li><p>a* 还能匹配一个 a，两个 a，三个 a，一直到无穷个 a。</p></li><li><p>当 p 等于 &#39;.*&#39; 的时候，可以表示一个空字符串，也可以表示一个点，两个点，三个点，一直到无穷个点。即它可以表示任何长度的一段字符串，包括空串。</p></li></ul><h3 id="举例说明" tabindex="-1">举例说明 <a class="header-anchor" href="#举例说明" aria-label="Permalink to &quot;举例说明&quot;">​</a></h3><p>输入：</p><p>s = &quot;aaabcd&quot;</p><p>p = &quot;ac*a*b..&quot;</p><ol><li>用两个指针 i 和 j 分别指向 s 和 p 的开头。</li></ol>',6),C=s("ol",{start:"2"},[s("li",null,"在 p 字符串里，a 的下一个字符是 c，不是 '*'，比较 s[i] 和 p[j]。因为它们都是字符 a，所以这个位置匹配正确，i 和 j 同时指向下一个。此时 j 的下一个字符是 '*'，要将 c* 当作一个整体去看待。")],-1),I=s("ol",{start:"3"},[s("li",null,"将 c* 看成是空字符，p 如下所示。")],-1),k=s("ol",{start:"4"},[s("li",null,"若匹配中不一致即 c* 不能当作空字符串，则当作一个 c 字符，此时 p 如下。")],-1),v=s("ol",{start:"5"},[s("li",null,"若不行，则看作两个 c。")],-1),S=s("p",null,"以此类推，应用了回溯的思想。",-1),V=s("p",null,"对于将 c* 作为空字符串的情况。每一次，都要看看当前 j 指向的字符的下一个是不是 '*'。如果是 '*'，就要作为整体考虑。很明显，a 的下一个字符是 '*'。",-1),T=s("p",null,"同样，先将 a* 作为空字符串看待。此时，a != b，两个字符串不匹配，因此回溯.现在将 a* 看成是一个 a，此时 a = a，两个位置的字符匹配。",-1),P=s("p",null,"j 的下一个字符不是 '*'，而是点号，比较 s[i] 和 p[j]，发现 a != b。于是再次回溯，将 a* 看成是两个 a，回到刚才的位置。",-1),B=s("p",null,"最后遇到了两个点号，由于点号可以匹配任何字符，因此可以直接忽略。i 和 j 同时往前一步，再次遇到了点号。i 和 j 继续往前一步。",-1),x=s("p",null,"此时，i 和 j 都已经同时结束了各自的遍历，表明 s 和 p 是匹配的。",-1),D=s("p",null,"提示：重点是把这种回溯的思想掌握好。对于这道题，可以采用递归的写法，也可以采用动态规划的写法。",-1),F=s("h6",{id:"递归法一",tabindex:"-1"},[a("递归法一 "),s("a",{class:"header-anchor",href:"#递归法一","aria-label":'Permalink to "递归法一"'},"​")],-1),O=s("p",null,"一开始，用两个指针 i 和 j 分别指向字符串 s 和 p 的第一个字符，当我们发现它们指向的字符相同时，我们同时往前一步移动指针 i 和 j。",-1),N=s("br",null,null,-1),G=s("p",null,"接下来重复进行相同的操作，即，若将函数定义为 isMatch(String s, int i, String p, int j) 的话，通过传递 i 和 j，就能实现重复利用匹配逻辑的效果。",-1),J=s("p",null,"当遇到点匹配符的时候，方法类似。",-1),w=s("p",null,"来看看当遇到星匹配符的情况，举例说明如下。要不断地用 a* 去表示一个空字符串，一个 a，两个 a，一直到多个 a......",-1),Y=s("p",null,"当 a* 表示空字符串的时候，i 和 j 应该如何调整呢？此时 i 保持不变，j+2，递归调用函数的时候，变成 isMatch(s, i, p, j + 2)。",-1),K=s("p",null,"此时，指向的字符和 j 指向的字符不匹配，于是回溯，回到原来的位置。11:57",-1),R=s("p",null,"用 a* 去表示一个 a，i 指向的字符与 a 匹配，那么 i+1。指针 j，已经完成了用 a* 去表示一个 a 的任务，接下来要指向 b，调用的时候应该是 isMatch(s, i + 1, p, j + 2)。",-1),z=s("p",null,"i 指向的字符和 j 指向的字符不匹配，又进行回溯，但是不用回到最开始的位置。已知用 a* 去表示空字符串不行，表示一个 a 也不行，那么尝试两个 a 字符，于是，i 再往前一步，用 a* 去匹配两个 a，i 就到了 b 的位置上，调用的时候就是 isMatch(s, i + 2, p, j + 2)。",-1),Q=l(`<p>不断地这样操作，一旦遇到了 &#39;*&#39; 组合，就不断地尝试，直到最后满足匹配；或者尝试过所有的可能还是不行则表示 s 和 p 无法匹配。</p><h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>根据上面的思路，一起来写递归的实现。主体函数如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean isMatch(String s, String p) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (s == null || p == null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    return isMatch(s, 0, p, 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean isMatch(String s, String p) {</span></span>
<span class="line"><span style="color:#24292E;">    if (s == null || p == null) {</span></span>
<span class="line"><span style="color:#24292E;">        return false;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    return isMatch(s, 0, p, 0);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>主体函数非常简单，一开始做简单的判断，只要 s 和 p 有一个为 null，就表示不匹配。</p><p>注意：面试的时候，一定要注意对这些基本情况的考量，千万不要认为输入的值都是有效的。</p><p>接下来实现递归函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean isMatch(String s, int i, String p, int j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = s.length();</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = p.length();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 看看pattern和字符串是否都扫描完毕</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (j == n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return i == m;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // next char is not &#39;*&#39;: 必须满足当前字符并递归到下一层</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (j == n - 1 || p.charAt(j + 1) != &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return (i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m) &amp;&amp; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            (p.charAt(j) == &#39;.&#39; || s.charAt(i) == p.charAt(j)) &amp;&amp; </span></span>
<span class="line"><span style="color:#E1E4E8;">            isMatch(s, i + 1, p, j + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // next char is &#39;*&#39;, 如果有连续的s[i]出现并且都等于p[j]，一直尝试下去</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n - 1 &amp;&amp; p.charAt(j + 1) == &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        while ((i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m) &amp;&amp; (p.charAt(j) == &#39;.&#39; || s.charAt(i) == p.charAt(j))) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (isMatch(s, i, p, j + 2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            i++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 接着继续下去</span></span>
<span class="line"><span style="color:#E1E4E8;">    return isMatch(s, i, p, j + 2);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean isMatch(String s, int i, String p, int j) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = s.length();</span></span>
<span class="line"><span style="color:#24292E;">    int n = p.length();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 看看pattern和字符串是否都扫描完毕</span></span>
<span class="line"><span style="color:#24292E;">    if (j == n) {</span></span>
<span class="line"><span style="color:#24292E;">        return i == m;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // next char is not &#39;*&#39;: 必须满足当前字符并递归到下一层</span></span>
<span class="line"><span style="color:#24292E;">    if (j == n - 1 || p.charAt(j + 1) != &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">        return (i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m) &amp;&amp; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            (p.charAt(j) == &#39;.&#39; || s.charAt(i) == p.charAt(j)) &amp;&amp; </span></span>
<span class="line"><span style="color:#24292E;">            isMatch(s, i + 1, p, j + 1);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // next char is &#39;*&#39;, 如果有连续的s[i]出现并且都等于p[j]，一直尝试下去</span></span>
<span class="line"><span style="color:#24292E;">    if (j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n - 1 &amp;&amp; p.charAt(j + 1) == &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">        while ((i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m) &amp;&amp; (p.charAt(j) == &#39;.&#39; || s.charAt(i) == p.charAt(j))) {</span></span>
<span class="line"><span style="color:#24292E;">            if (isMatch(s, i, p, j + 2)) {</span></span>
<span class="line"><span style="color:#24292E;">                return true;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            i++;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 接着继续下去</span></span>
<span class="line"><span style="color:#24292E;">    return isMatch(s, i, p, j + 2);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol><li><p>函数接受四个输入参数，s 字符串，p 字符串，i 指针，j 指针。</p></li><li><p>开始时计算 s 字符串和 p 字符串的长度，分别记为 m 和 n。</p></li><li><p>当 j 指针遍历完了 p 字符串后，可以跳出递归，而 i 也刚好遍历完，说明 s 和 p 完全匹配。</p></li><li><p>判断 j 字符的下一个是不是 &#39;*&#39;，不是，则递归地调用 isMatch 函数，i + 1，j + 1。</p></li><li><p>若是，则不断地将它和 &#39;*&#39; 作为一个整体，分别去表示空字符串，一个字符，两个字符，依此类推。如果其中一种情况能出现 s 和 p 的匹配，就返回 true。</p></li><li><p>while 循环是整个递归算法的核心，前提条件如下。</p><ol><li><p>i 指向的字符必须要能和 j 指向的字符匹配，其中 j 指向的可能是点匹配符。</p></li><li><p>若无法匹配，i++，即用 &#39;*&#39; 组合去匹配更长的一段字符串。</p></li></ol></li><li><p>当 i 字符和 j 字符不相同，或者 i 已经遍历完了 s 字符串，同时 j 字符后面跟着一个 &#39;*&#39;的情况，只能用 &#39;*&#39;组合去表示一个空字符串，然后递归下去。</p></li></ol><h2 id="递归法二" tabindex="-1">递归法二 <a class="header-anchor" href="#递归法二" aria-label="Permalink to &quot;递归法二&quot;">​</a></h2><p>上法是从前往后进行递归地调用，现在从后往前地分析这个问题。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">s = &quot;aaabcd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">p = &quot;a*b.d&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">s = &quot;aaabcd&quot;</span></span>
<span class="line"><span style="color:#24292E;">p = &quot;a*b.d&quot;</span></span></code></pre></div>`,13),U=s("p",null,"实现过程如下所示。",-1),L=l(`<ol><li><p>p 字符串的最后一个字符 d 必须要和 s 字符串的最后一个字符相同，才能使 p 有可能与 s 匹配，那么当它们都相同的时候，问题规模也缩小。</p></li><li><p>p 字符串的最后一个字符不是 &#39;*&#39;，而是点号。它可以匹配 s 字符串里的任意一个字符，且它是最后一个，所以对应的就是 s 字符串里的 c，很明显互相匹配，继续缩小问题规模。</p></li><li><p>同样，b 不是 &#39;*&#39;，比较它与 s 字符串的最后一个字符是否相同，是，则继续缩小问题规模。</p></li><li><p>遇到 &#39;*&#39;，&#39;*&#39;可以表示一个空字符串，与前一个字符表示空字符串的时候，将问题变成了判断两个字符串是否匹配，其中，s 等于 aaa，而 p 是空字符串，很明显不能匹配。</p></li><li><p>用 a* 去表示一个 a。</p></li><li><p>p 的最后一个还是 &#39;*&#39;，用同样的策略。</p></li><li><p>继续用 a* 去表示一个 a。</p></li><li><p>用 a* 去表示空字符串。</p></li><li><p>最后 s 和 p 都变成了空字符串，互相匹配。</p></li></ol><h3 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>主函数代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean isMatch(String s, String p) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (s == null || p == null) return false;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return isMatch(s, s.length(), p, p.length());</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean isMatch(String s, String p) {</span></span>
<span class="line"><span style="color:#24292E;">    if (s == null || p == null) return false;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return isMatch(s, s.length(), p, p.length());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>在主函数里，进行一些简单基础的判断，如果 s 和 p 有一个是 null，则返回 false。</p><p>递归函数代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean isMatch(String s, int i, String p, int j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (j == 0) return i == 0; </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (i == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return j &gt; 1 &amp;&amp; p.charAt(j - 1) == &#39;*&#39; &amp;&amp; isMatch(s, i, p, j - 2);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (p.charAt(j - 1) != &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return isMatch(s.charAt(i - 1), p.charAt(j - 1)) &amp;&amp; </span></span>
<span class="line"><span style="color:#E1E4E8;">               isMatch(s, i - 1, p, j - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return  isMatch(s, i, p, j - 2) || isMatch(s, i - 1, p, j) &amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">            isMatch(s.charAt(i - 1), p.charAt(j - 2));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">boolean isMatch(char a, char b) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return a == b || b == &#39;.&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean isMatch(String s, int i, String p, int j) {</span></span>
<span class="line"><span style="color:#24292E;">    if (j == 0) return i == 0; </span></span>
<span class="line"><span style="color:#24292E;">    if (i == 0) {</span></span>
<span class="line"><span style="color:#24292E;">        return j &gt; 1 &amp;&amp; p.charAt(j - 1) == &#39;*&#39; &amp;&amp; isMatch(s, i, p, j - 2);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (p.charAt(j - 1) != &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">        return isMatch(s.charAt(i - 1), p.charAt(j - 1)) &amp;&amp; </span></span>
<span class="line"><span style="color:#24292E;">               isMatch(s, i - 1, p, j - 1);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return  isMatch(s, i, p, j - 2) || isMatch(s, i - 1, p, j) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">            isMatch(s.charAt(i - 1), p.charAt(j - 2));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">boolean isMatch(char a, char b) {</span></span>
<span class="line"><span style="color:#24292E;">    return a == b || b == &#39;.&#39;;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol><li><p>递归函数的输入参数有四个，分别是字符串 s，当前字符串 s 的下标，字符串 p，以及字符串 p 的当前下标。由主函数可以看到，两个字符串的下标都是从最后一位开始。</p></li><li><p>若 p 字符串为空，并且如果 s 字符串也为空，就表示匹配。</p></li><li><p>当 p 字符串不为空，而 s 字符串为空，如上例所示，当 s 为空字符串，而 p 等于 a*，此时只要 p 总是由 &#39;*&#39;组合构成，一定能满足匹配，否则不行。</p></li><li><p>若 p 的当前字符不是 &#39;*&#39;，判断当前的两个字符是否相等，如果相等，就递归地看前面的字符。</p></li><li><p>否则，如果 p 的当前字符是 &#39;*&#39;：</p><ol><li><p>用 &#39;*&#39; 组合表示空字符串，看看是否能匹配；</p></li><li><p>用 &#39;*&#39; 组合表示一个字符，看看能否匹配。</p></li></ol></li></ol><h6 id="动态规划法" tabindex="-1">动态规划法 <a class="header-anchor" href="#动态规划法" aria-label="Permalink to &quot;动态规划法&quot;">​</a></h6><p>递归的方法比较好理解，但是容易造成重叠计算。为了避免重叠计算，可以用动态规划，自底向上地实现刚才的策略。</p><h3 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><ol><li></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 分别用 m 和 n 表示 s 字符串和 p 字符串的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">boolean isMatch(String s, String p) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = s.length(), n = p.length();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 定义一个二维布尔矩阵 dp</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean[][] dp = new boolean[m + 1][n + 1];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 当两个字符串的长度都为 0，也就是空字符串的时候，它们互相匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">    dp[0][0] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int j = 1; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= n; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        dp[0][j] = j &gt; 1 &amp;&amp; p.charAt(j - 1) == &#39;*&#39; &amp;&amp; dp[0][j - 2];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 1; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= m; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int j = 1; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= n; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            // p 的当前字符不是 &#39;*&#39;，判断当前的两个字符是否相等，如果相等，就看 dp[i-1][j-1] 的值，因为它保存了前一个匹配的结果</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (p.charAt(j - 1) != &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                dp[i][j] = dp[i - 1][j - 1] &amp;&amp; </span></span>
<span class="line"><span style="color:#E1E4E8;">                   isMatch(s.charAt(i - 1), p.charAt(j - 1));</span></span>
<span class="line"><span style="color:#E1E4E8;">            } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">                dp[i][j] = dp[i][j - 2] || dp[i - 1][j] &amp;&amp; </span></span>
<span class="line"><span style="color:#E1E4E8;">                   isMatch(s.charAt(i - 1), p.charAt(j - 2));</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return dp[m][n];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">boolean isMatch(char a, char b) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return a == b || b == &#39;.&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 分别用 m 和 n 表示 s 字符串和 p 字符串的长度</span></span>
<span class="line"><span style="color:#24292E;">boolean isMatch(String s, String p) {</span></span>
<span class="line"><span style="color:#24292E;">    int m = s.length(), n = p.length();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 定义一个二维布尔矩阵 dp</span></span>
<span class="line"><span style="color:#24292E;">    boolean[][] dp = new boolean[m + 1][n + 1];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 当两个字符串的长度都为 0，也就是空字符串的时候，它们互相匹配</span></span>
<span class="line"><span style="color:#24292E;">    dp[0][0] = true;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int j = 1; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= n; j++) {</span></span>
<span class="line"><span style="color:#24292E;">        dp[0][j] = j &gt; 1 &amp;&amp; p.charAt(j - 1) == &#39;*&#39; &amp;&amp; dp[0][j - 2];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    for (int i = 1; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= m; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        for (int j = 1; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= n; j++) {</span></span>
<span class="line"><span style="color:#24292E;">            // p 的当前字符不是 &#39;*&#39;，判断当前的两个字符是否相等，如果相等，就看 dp[i-1][j-1] 的值，因为它保存了前一个匹配的结果</span></span>
<span class="line"><span style="color:#24292E;">            if (p.charAt(j - 1) != &#39;*&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">                dp[i][j] = dp[i - 1][j - 1] &amp;&amp; </span></span>
<span class="line"><span style="color:#24292E;">                   isMatch(s.charAt(i - 1), p.charAt(j - 1));</span></span>
<span class="line"><span style="color:#24292E;">            } else {</span></span>
<span class="line"><span style="color:#24292E;">                dp[i][j] = dp[i][j - 2] || dp[i - 1][j] &amp;&amp; </span></span>
<span class="line"><span style="color:#24292E;">                   isMatch(s.charAt(i - 1), p.charAt(j - 2));</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return dp[m][n];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">boolean isMatch(char a, char b) {</span></span>
<span class="line"><span style="color:#24292E;">    return a == b || b == &#39;.&#39;;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意：</p><ul><li><p>初始化二维矩阵第一行的所有值时，当 s 字符串为空，对于 p 字符串的任何一个位置，要使到这个位置的子串能和空字符串匹配，要求该子串都是由一系列的 &#39;*&#39; 组合构成。</p></li><li><p>对二维矩阵填表，运用到的逻辑跟递归一摸一样。</p></li><li><p>p 的当前字符不是 &#39;*&#39;，判断当前的两个字符是否相等。如果相等，就看 dp[i-1][j-1] 的值，因为它保存了前一个匹配的结果。</p></li><li><p>如果 p 的当前字符是 &#39;*&#39;：</p><ul><li><p>用 &#39;*&#39; 组合表示空字符串，能否匹配，也就是 dp[i][j - 2]；</p></li><li><p>用 &#39;*&#39; 组合表示一个字符，能否匹配，也就是 dp[i - 1][j]。</p></li></ul></li></ul><h3 id="复杂度分析" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h3><p>运用动态规划，把时间复杂度控制在 O(n^2^)，而空间复杂度也是 O(n^2^)。</p><p>建议：LeetCode 上有一道跟这题十分类似的题目，第 44 题，通配符匹配。分析例题的思路，所运用的策略，以及代码的实现，都有很多非常相似的地方。大家一定要去做做看，举一反三才能加深印象。</p><br><br>`,21);function $(H,W,Z,X,ss,as){const n=e("Image");return o(),i("div",null,[r,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie1iAL3rjAFNmGn6rmB8556.gif"}),a(),E,h,y,d,u,g,_,m,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie1mAHiTeAFyyE_vrAho862.gif"}),a(),j,b,A,f,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie1qAJ0yjABmVlo21Z_k078.gif"}),a(),q,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie1uAfvGOAFXqP1fgpyo624.gif"}),a(),M,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie1uAWy3YACOzTjqASVU474.gif"}),a(),C,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie1uAQkfIAD7sMK4b0q0916.gif"}),a(),I,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie1yATZ7aACaSPwysGtw610.gif"}),a(),k,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie1yAYdqYACtak4duJdY791.gif"}),a(),v,S,V,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie12AJf14ACHySIotppY330.gif"}),a(),T,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie16AEWe2AGU2311QM54850.gif"}),a(),P,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie1-AAfhyAMUVWpoQPio071.gif"}),a(),B,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie1-AAKtMAGRVK2beFJI055.gif"}),a(),x,D,F,O,N,G,J,w,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie1-AJzGVAACAxM7kNrk693.png"}),a(),Y,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie2CAAZ6aAEk53IJKbK4406.gif"}),a(),K,R,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie2CARkM9AD_zVAmy1eI036.gif"}),a(),z,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie2GALJKxAEMDpEqq9pU613.gif"}),a(),Q,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FC/CgoB5l2Ie2GAFb2VAAB2VFYCpQA482.png"}),a(),U,p(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1C/CgotOV2Ie2GAA1bPAGMu3IFkH1Y793.gif"}),a(),L])}const ls=t(c,[["render",$]]);export{ps as __pageData,ls as default};
