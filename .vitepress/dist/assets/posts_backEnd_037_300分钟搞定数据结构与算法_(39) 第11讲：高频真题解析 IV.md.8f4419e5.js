import{_ as e,j as o,o as t,g as i,k as a,h as l,Q as p,s}from"./chunks/framework.e0c66c3f.js";const is=JSON.parse('{"title":"例题分析一 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(39) 第11讲：高频真题解析 IV.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(39) 第11讲：高频真题解析 IV.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(39) 第11讲：高频真题解析 IV.md"},r=p(`<p>这节课继续来看几道面试中的难题：</p><ul><li><p>回文对</p></li><li><p>至多包含 K 个不同字符的最长子串</p></li><li><p>接雨水 II</p></li></ul><h6 id="例题分析一" tabindex="-1">例题分析一 <a class="header-anchor" href="#例题分析一" aria-label="Permalink to &quot;例题分析一&quot;">​</a></h6><p>LeetCode 第 336 题，回文对：给定一组唯一的单词， 找出所有不同的索引对 (i, j)，使得列表中的两个单词， words[i] + words[j] ，可拼接成回文串。</p><p><strong>示例 1</strong></p><p>输入: [&quot;abcd&quot;,&quot;dcba&quot;,&quot;lls&quot;,&quot;s&quot;,&quot;sssll&quot;]</p><p>输出: [[0,1],[1,0],[3,2],[2,4]]</p><p>解释: 可拼接成的回文串为 [&quot;dcbaabcd&quot;,&quot;abcddcba&quot;,&quot;slls&quot;,&quot;llssssll&quot;]</p><p><strong>示例 2</strong></p><p>输入: [&quot;bat&quot;,&quot;tab&quot;,&quot;cat&quot;]</p><p>输出: [[0,1],[1,0]]</p><p>解释: 可拼接成的回文串为 [&quot;battab&quot;,&quot;tabbat&quot;]</p><h6 id="解题思路-暴力法" tabindex="-1">解题思路：暴力法 <a class="header-anchor" href="#解题思路-暴力法" aria-label="Permalink to &quot;解题思路：暴力法&quot;">​</a></h6><p>所谓回文，就是正读和反读都一样的字符串，例如&quot;leetteel&quot;。</p><p>检查一个字符串是否是回文，方法如下。</p><ol><li><p>将给定的字符串翻转，然后跟原字符串对比，看是否相等。但空间复杂度为 O(n) 。</p></li><li><p>定义两个指针 i、j，一个指向字符串的头，一个指向字符串的尾巴，同时从两头进行检查，一旦发现不相等就表明不是回文，一直检查到两个指针相遇为止。</p></li></ol><p>将上述方法 2 用代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean isPalindrome(String word, int i, int j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (word.charAt(i++) != word.charAt(j--)) return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean isPalindrome(String word, int i, int j) {</span></span>
<span class="line"><span style="color:#24292E;">    while (i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> j) {</span></span>
<span class="line"><span style="color:#24292E;">        if (word.charAt(i++) != word.charAt(j--)) return false;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return true;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>代码非常简单，因此不作过多讲解。</p><p>回到例题本身，用暴力法怎么解。</p><p>实现方法：</p><ul><li><p>先找出所有的两两组合</p></li><li><p>对每种组合进行排查，看看哪种组合可以构成回文。</p></li></ul><br><p>时间复杂度：</p><ul><li><p>假设一共有 n 个单词，每个单词的平均长度为 k，两两组合，有 P(n, 2) = n×(n - 1) 种；</p></li><li><p>对组合的字符串进行回文检查，需要 2k 的时间复杂度；</p></li><li><p>最终的时间复杂度是：O(n2×k)。</p></li></ul><h6 id="暴力法优化" tabindex="-1">暴力法优化 <a class="header-anchor" href="#暴力法优化" aria-label="Permalink to &quot;暴力法优化&quot;">​</a></h6><p>暴力法需要检查哪些情况？</p><p>进行回文检查的时候，根据两个字符串的长度不同的程度，假设组合字符串的长度分别为 k1、k2，那么会出现以下三种情况。</p><ul><li>k1 = k2</li></ul><p>举例：字符串 s1 = &quot;abcd&quot;，字符串 s2 = &quot;dcba&quot;</p>`,31),E=s("p",null,"实现：同时从两边进行检查，看看它们能否构成回文，构成回文的条件就是两个指针相遇，或者同时扫描完两个字符串。",-1),y=s("ul",null,[s("li",null,"k1 > k2")],-1),d=s("p",null,'举例：s1 = "abcdefe"，s2 = "dcba"',-1),h=s("p",null,"实现：同时从两头进行检查，由于 s2 的长度短，那么 s2 首先会被遍历完毕，此时 s1 还剩下的部分必须要满足回文。",-1),u=s("ul",null,[s("li",null,"k1 < k2")],-1),g=s("p",null,'举例：s1 = "abcd"，s2 = "efedcba"',-1),m=p(`<p>实现：跟第二种情况类似，同时从两头进行检查，由于 s1 的长度短，s1 首先会被遍历完毕，此时 s2 还剩下的部分必须满足回文。</p><p>暴力法如何优化？</p><p>暴力法之所以那么慢，是因为它要对所有情况进行检查。而对于 s1 = &quot;abcd&quot; ，s1 + s2 的组合构成回文的一个条件就是，s2 的最后一个字符必须是 a，如果 k2&gt;=2，它最后两个字符一定是 ba。不满足条件的字符串，不需要理会。</p><p>那么，如何能快速地知道哪些字符串以 a 结尾，哪些字符串以 ba 结尾呢？</p><p>如果反看 s2 ，这个问题相当于，怎么能快速地找出所有以 a 开头或者以 ab 开头的字符串？第 2 节课里介绍的 Trie，正是快速查找以某个字符串开头的数据结构。</p><p>注意：此处要对每个字符串反着构建 Trie。</p><h3 id="trie" tabindex="-1"><strong>Trie</strong> <a class="header-anchor" href="#trie" aria-label="Permalink to &quot;**Trie**&quot;">​</a></h3><p>一个 Trie 一般都是由很多个 TrieNode 节点构成的，最普通的 TrieNode 节点一般有以下的结构。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TrieNode {</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean isEnd;</span></span>
<span class="line"><span style="color:#E1E4E8;">    HashMap&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character,</span><span style="color:#B392F0;"> TrieNode</span><span style="color:#E1E4E8;">&gt; children;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    TrieNode() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        isEnd = false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        children = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TrieNode {</span></span>
<span class="line"><span style="color:#24292E;">    boolean isEnd;</span></span>
<span class="line"><span style="color:#24292E;">    HashMap&lt;</span><span style="color:#B31D28;font-style:italic;">Character,</span><span style="color:#6F42C1;"> TrieNode</span><span style="color:#24292E;">&gt; children;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    TrieNode() {</span></span>
<span class="line"><span style="color:#24292E;">        isEnd = false;</span></span>
<span class="line"><span style="color:#24292E;">        children = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>其中，</p><ul><li><p>children：数组或者集合，罗列出每个分支当中包含的所有字符</p></li><li><p>isEnd：布尔值，表示该节点是否为某字符串的结尾</p></li></ul><p>由上可知，Trie 是一种通过字符链接起来的树状结构，且 Trie 一定有一个根节点 root，它的 children 集合包含了所有字符串的开头那个字符。</p><p>举例：给定一系列字符串：&quot;ab&quot;, &quot;abc&quot;, &quot;abde&quot;, &quot;bcd&quot;，用 Trie 表示的结构如下。</p><br>`,15),_=s("p",null,"其中，",-1),b=s("ul",null,[s("li",null,[s("p",null,"字符作为链接每个节点的边，这些字符也是哈希表里的 key。")]),s("li",null,[s("p",null,"这些 key 对应的 value 是节点，绿色的节点表示节点里的 isEnd 布尔值为 true，也就是这个节点表示了一个字符串的结束。")]),s("li",null,[s("p",null,"要利用这个 Trie 来查找所有以 b 字符开头的字符串时，可以避开左边三个以 a 字母开头的字符串。")])],-1),f=s("h3",{id:"构建-tire",tabindex:"-1"},[l("构建 Tire "),s("a",{class:"header-anchor",href:"#构建-tire","aria-label":'Permalink to "构建 Tire"'},"​")],-1),A=s("p",null,'将给定的字符串变成 "ba"，"cba"，"edba"，"dcb"，它们其实就是之前的字符串的翻转。对它们逆序进行 Trie 的构建，也得出了相同的结构。为了能让给定的字符串能组合成回文，再添加两个字符串："a"，"abc"，同时，把"dcb" 删除，Trie 变成了下面的结构。',-1),q=s("br",null,null,-1),k=p("<p>就之前提到的三种情况来分析如何利用 Trie 判断合并两个字符串能否构成回文。基本上是同时遍历字符串和Trie。</p><ul><li>k1 = k2，即两个字符串的长度相同并且能够构成回文</li></ul><p>举例：s1 = &quot;abc&quot;，s2 = &quot;cba&quot;，s1+s2 = &quot;abccba&quot;。</p><ol><li><p>从 s1 的第一个字符 a 开始，Trie 里有记录以 a 结尾的字符串，其他那些不是以 a 结尾的字符串不予考虑。</p></li><li><p>第二个字符 b，那么从 a 节点开始，看看有没有以 b 作为键值 key 的节点，有，继续。</p></li><li><p>第三个字符 c，在 Trie 里，从 b 指向的节点开始，看看有没有以 c 作为键值的节点，有，继续。那些不是以 c 作为键值的分支可以不必考虑。</p></li><li><p>字符串遍历结束，在 Trie 里，当前节点是 c 指向的节点。由于该节点恰好表示字符串&quot;cba&quot;的结束，因此，得出两个字符串合在一起可以构成回文串。</p></li></ol><ul><li>k1 &gt; k2</li></ul>",5),w=s("p",null,'举例：s1 = "abc"，s2 = "ba" ，s1+s2 ="abcba"。',-1),T=s("ol",null,[s("li",null,[s("p",null,"从 s1 的第一个字符 a 开始，能从 Trie 里找到 a，于是继续。")]),s("li",null,[s("p",null,'字符 b，也能找到，并且 b 指向的节点是一个绿色节点，即从 Trie 里找到了字符"ba"。')]),s("li",null,[s("p",null,'要能使 s1 + s2 构成回文，条件就是 s1 里剩下的部分也是回文，此时 s1 剩下的是字符 c，而字符 c 是回文，因此，"abc" 和 "ba"能构成回文串。')])],-1),C=s("ul",null,[s("li",null,"k1 < k2")],-1),B=p(`<p>举例：s1 = &quot;a&quot;，s2 = &quot;ba&quot;，s1+s2 =&quot;aba&quot;。</p><br><p>当 s1 遍历完毕后，Trie 来到了 b 节点，由于 b 也是回文，因此它们两个也能构成回文串。</p><p>对于情况一、三：</p><ol><li><p>s1 字符串一定会被遍历完毕</p></li><li><p>遍历完毕后，在 Trie 里所对应的节点</p></li></ol><ul><li><p>是 s2 中的最后一个字符；</p></li><li><p>是 s2 的剩余字符</p><ul><li>只要该剩余字符本身是回文，就可以给这个节点添加一个数组，用来记录从该节点向后所有剩余能构成回文的字符串的下标即可。</li></ul></li></ul><p>对于情况二：</p><ol><li><p>在 Trie 里，当遇到某个绿色节点，而它表示了某个字符串的结束，只要 s1 剩下的字符能构成回文即可。</p></li><li><p>修改 isEnd，用 index 替代，来得到 Trie 里 s2 的下标。</p><ol><li><p>当 index 为 -1 时，表示不是字符串的结束位置。</p></li><li><p>当是字符串的结束时，用 index 来记录输入字符串的下标即可。</p></li></ol></li></ol><h6 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 修改 TrieNode 结构，用 index 替换 isEnd</span></span>
<span class="line"><span style="color:#E1E4E8;">class TrieNode {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int index;</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; palindromes;</span></span>
<span class="line"><span style="color:#E1E4E8;">    HashMap&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character,</span><span style="color:#B392F0;"> TrieNode</span><span style="color:#E1E4E8;">&gt; children;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 添加一个 palindromes 列表，用来记录从该节点往下的能构成回文的所有输入字符串的下标</span></span>
<span class="line"><span style="color:#E1E4E8;">    TrieNode() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        index = -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        children = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">        palindromes = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 修改 TrieNode 结构，用 index 替换 isEnd</span></span>
<span class="line"><span style="color:#24292E;">class TrieNode {</span></span>
<span class="line"><span style="color:#24292E;">    int index;</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; palindromes;</span></span>
<span class="line"><span style="color:#24292E;">    HashMap&lt;</span><span style="color:#B31D28;font-style:italic;">Character,</span><span style="color:#6F42C1;"> TrieNode</span><span style="color:#24292E;">&gt; children;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 添加一个 palindromes 列表，用来记录从该节点往下的能构成回文的所有输入字符串的下标</span></span>
<span class="line"><span style="color:#24292E;">    TrieNode() {</span></span>
<span class="line"><span style="color:#24292E;">        index = -1;</span></span>
<span class="line"><span style="color:#24292E;">        children = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">        palindromes = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>主函数代码如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">List&lt;</span><span style="color:#FDAEB7;font-style:italic;">List&lt;Integer</span><span style="color:#E1E4E8;">&gt;&gt; palindromePairs(String[] words) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#FDAEB7;font-style:italic;">List&lt;Integer</span><span style="color:#E1E4E8;">&gt;&gt; res = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;(); // 定义一个空的列表，用来记录找到的配对</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    TrieNode root = new TrieNode(); // 定义一个 Trie 的根节点 root</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> words.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        addWord(root, words[i], i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } // 创建 Trie</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> words.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        search(words, i, root, res);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }// 利用 Trie，找出所有的配对</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return res;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">List&lt;</span><span style="color:#B31D28;font-style:italic;">List&lt;Integer</span><span style="color:#24292E;">&gt;&gt; palindromePairs(String[] words) {</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#B31D28;font-style:italic;">List&lt;Integer</span><span style="color:#24292E;">&gt;&gt; res = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;(); // 定义一个空的列表，用来记录找到的配对</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    TrieNode root = new TrieNode(); // 定义一个 Trie 的根节点 root</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> words.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        addWord(root, words[i], i);</span></span>
<span class="line"><span style="color:#24292E;">    } // 创建 Trie</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> words.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        search(words, i, root, res);</span></span>
<span class="line"><span style="color:#24292E;">    }// 利用 Trie，找出所有的配对</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return res;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>创建 Tire 如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 创建 Trie 的时候，从每个字符串的末尾开始遍历</span></span>
<span class="line"><span style="color:#E1E4E8;">void addWord(TrieNode root, String word, int index) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = word.length() - 1; i &gt;= 0; i--) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        char ch = word.charAt(i);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 对于每个当前字符，如果它还没有被添加到 children 哈希表里，就创建一个新的节点  </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (!root.children.containsKey(ch)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            root.children.put(ch, new TrieNode());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 若该字符串从头开始到当前位置能成为回文的话，把这个字符串的下标添加到这个 Trie 节点的回文列表里 </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (isPalindrome(word, 0, i)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            root.palindromes.add(index);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        root = root.children.get(ch);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 当对该字符串创建完 Trie 之后，将字符串的下标添加到回文列表里，并且将它赋给 index</span></span>
<span class="line"><span style="color:#E1E4E8;">    root.palindromes.add(index);</span></span>
<span class="line"><span style="color:#E1E4E8;">    root.index = index;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 创建 Trie 的时候，从每个字符串的末尾开始遍历</span></span>
<span class="line"><span style="color:#24292E;">void addWord(TrieNode root, String word, int index) {</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = word.length() - 1; i &gt;= 0; i--) {</span></span>
<span class="line"><span style="color:#24292E;">        char ch = word.charAt(i);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 对于每个当前字符，如果它还没有被添加到 children 哈希表里，就创建一个新的节点  </span></span>
<span class="line"><span style="color:#24292E;">        if (!root.children.containsKey(ch)) {</span></span>
<span class="line"><span style="color:#24292E;">            root.children.put(ch, new TrieNode());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        // 若该字符串从头开始到当前位置能成为回文的话，把这个字符串的下标添加到这个 Trie 节点的回文列表里 </span></span>
<span class="line"><span style="color:#24292E;">        if (isPalindrome(word, 0, i)) {</span></span>
<span class="line"><span style="color:#24292E;">            root.palindromes.add(index);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        root = root.children.get(ch);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 当对该字符串创建完 Trie 之后，将字符串的下标添加到回文列表里，并且将它赋给 index</span></span>
<span class="line"><span style="color:#24292E;">    root.palindromes.add(index);</span></span>
<span class="line"><span style="color:#24292E;">    root.index = index;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>若该字符串从头开始到当前位置能成为回文的话，把这个字符串的下标添加到这个 Trie 节点的回文列表里。例如，如果字符串是&quot;aaaba&quot;，由于我们从后面往前面遍历，当遍历到字符 b 的时候，发现 aaa 是回文，于是更新 b 所指向的那个节点，说该节点往下有一个字符串能构成回文。</p><p>处理查找如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 处理查找，从头遍历每个字符串，然后从 Trie 里寻找匹配的字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">void search(String[] words, int i, TrieNode root, List&lt;</span><span style="color:#FDAEB7;font-style:italic;">List&lt;Integer</span><span style="color:#E1E4E8;">&gt;&gt; res) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // k1 &gt; k2，且 s1 剩下的字符能构成回文，就把这对组合添加到结果中</span></span>
<span class="line"><span style="color:#E1E4E8;">    // k1=k2 或 k1&lt;</span><span style="color:#FDAEB7;font-style:italic;">k2，只需要把回文列表里的字符串都和</span><span style="color:#B392F0;"> s1 组合即可    </span></span>
<span class="line"><span style="color:#B392F0;">    for (int j </span><span style="color:#E1E4E8;">= </span><span style="color:#9ECBFF;">0;</span><span style="color:#B392F0;"> j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#B392F0;"> words[i].length(); j++) {</span></span>
<span class="line"><span style="color:#B392F0;">        if (root.index </span><span style="color:#E1E4E8;">&gt;= 0 &amp;&amp; root.index != i &amp;&amp; </span></span>
<span class="line"><span style="color:#E1E4E8;">            isPalindrome(words[i], j, words[i].length() - 1)) </span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            res.add(Arrays.asList(i, root.index));</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">        root = root.children.get(words[i].charAt(j));</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (root == null) return;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int j : root.palindromes) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (i == j) continue;</span></span>
<span class="line"><span style="color:#E1E4E8;">        res.add(Arrays.asList(i, j));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 处理查找，从头遍历每个字符串，然后从 Trie 里寻找匹配的字符串</span></span>
<span class="line"><span style="color:#24292E;">void search(String[] words, int i, TrieNode root, List&lt;</span><span style="color:#B31D28;font-style:italic;">List&lt;Integer</span><span style="color:#24292E;">&gt;&gt; res) {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // k1 &gt; k2，且 s1 剩下的字符能构成回文，就把这对组合添加到结果中</span></span>
<span class="line"><span style="color:#24292E;">    // k1=k2 或 k1&lt;</span><span style="color:#B31D28;font-style:italic;">k2，只需要把回文列表里的字符串都和</span><span style="color:#6F42C1;"> s1 组合即可    </span></span>
<span class="line"><span style="color:#6F42C1;">    for (int j </span><span style="color:#24292E;">= </span><span style="color:#032F62;">0;</span><span style="color:#6F42C1;"> j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#6F42C1;"> words[i].length(); j++) {</span></span>
<span class="line"><span style="color:#6F42C1;">        if (root.index </span><span style="color:#24292E;">&gt;= 0 &amp;&amp; root.index != i &amp;&amp; </span></span>
<span class="line"><span style="color:#24292E;">            isPalindrome(words[i], j, words[i].length() - 1)) </span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            res.add(Arrays.asList(i, root.index));</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">        root = root.children.get(words[i].charAt(j));</span></span>
<span class="line"><span style="color:#24292E;">            if (root == null) return;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    for (int j : root.palindromes) {</span></span>
<span class="line"><span style="color:#24292E;">        if (i == j) continue;</span></span>
<span class="line"><span style="color:#24292E;">        res.add(Arrays.asList(i, j));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="复杂度分析" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h6><p>利用 Trie，在创建和查找的过程中，最多会遇到 n×k 个节点，而且会进行回文检查，所以整体的时间复杂度是：O(n×k×k)。</p><p>如果字符串的字符个数是在一定范围之内的，那么这个问题就可以优化成一个近乎于线性问题了。</p><h6 id="例题分析二" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>LeetCode 第 340 题：给定一个字符串 s ，找出至多包含 k 个不同字符的最长子串 T。</p><p><strong>示例 1</strong></p><p>输入: s = &quot;eceba&quot;, k = 2</p><p>输出: 3</p><p>解释: 则 T 为 &quot;ece&quot;，所以长度为 3。</p><p><strong>示例 2</strong></p><p>输入: s = &quot;aa&quot;, k = 1</p><p>输出: 2</p><p>解释: 则 T 为 &quot;aa&quot;，所以长度为 2。</p><h6 id="解题思路-暴力法-1" tabindex="-1">解题思路：暴力法 <a class="header-anchor" href="#解题思路-暴力法-1" aria-label="Permalink to &quot;解题思路：暴力法&quot;">​</a></h6><p>思路：找出所有的子串，然后逐一检查是否最多包含 k 个不同的字符。</p><br><p>实现：用一个哈希表或者哈希集合去统计。</p><br><p>复杂度：O(n^2)。</p><p>第 8 课讲解了一道 LeetCode 的题目，给定一个字符串，找出无重复字符的最长子串。当时提出了一种比较聪明的办法，能够在 O(n) 的时间里找到答案。上述例题其实是它的另外一种扩展，可以运用相似的策略来进行。</p><p>举例：s = &quot;eceba&quot;，k = 2。</p><p>实现过程如下。</p>`,42),v=s("p",null,"用两个快慢指针：i 和 j，i 是慢指针，j 是快指针。一开始，两个指针都指向字符串的开头。另外，还需要一个哈希表来统计每个字符出现的个数，同时用来统计不同字符的个数。",-1),x=s("ol",null,[s("li",null,"每次将快指针指向的字符添加到哈希表中，统计它出现的次数。第一个字符是 e，加入到 map 中。")],-1),j=s("ol",{start:"2"},[s("li",null,"map 的大小为 1，表明到目前为止出现了一个字符。由于 map 的大小还没有超过 k，快指针向前移动一步。")],-1),D=s("ol",{start:"3"},[s("li",null,"j 指向的字符是 c，同样统计到 map 中，此时 map 的大小为 2，也没有超过 k，快指针继续移动。")],-1),I=s("ol",{start:"4"},[s("li",null,"当前 j 指向的字符是 e，现在 e 出现了 2 次，但是 map 的大小还是 2，表明到目前为止只看到两个不同的字符，即 e 和 c。")],-1),F=s("ol",{start:"5"},[s("li",null,"继续移动 j 指针，出现了新的字符 b，加入到 map 中。")],-1),S=s("ol",{start:"6"},[s("li",null,"此时 map 的大小为 3，已经超过了 2，于是慢指针开始删除字符，目的是为了控制住 map 的大小不超过 2。")],-1),P=s("ol",{start:"7"},[s("li",null,"当把第一个字符删除的时候，在 map 里更新 e 字符的计数，但是整个 map 的大小还是等于 3，继续相同的操作。")],-1),M=s("ol",{start:"8"},[s("li",null,"c 的个数只有一个，直接把它从 map 里删除掉。现在 map 的大小恢复正常，继续移动快指针。")],-1),N=p(`<ol start="9"><li><p>当把 a 添加到 map 里后，map 的大小又超过了 2，于是移动慢指针，把它指向的字符从 map 中删除掉。</p></li><li><p>结束循环。</p></li></ol><h6 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><ul><li><p>初始化一个哈希表 map，用来统计所出现了的不同字符。</p></li><li><p>用 max 变量记录最长的子串，其中子串最多包含 k 个不同的字符。</p></li><li><p>用快慢指针遍历字符串。</p></li><li><p>将快指针指向的字符加入到 map 中，统计字符出现的次数。</p></li><li><p>如果发现 map 的大小超过了 k，那么就得开始不断地将慢指针所指向的字符从 map 里清除掉。</p></li><li><p>首先获取当前慢指针指向的字符。</p></li><li><p>将它在map中的计数减一。</p></li><li><p>一旦它的统计次数变成了 0，就可以把它从 map 中删掉了。</p></li><li><p>接下来，慢指针继续往前走。</p></li><li><p>当 map 的大小恢复正常了，统计一下当前子串的长度。</p></li><li><p>最后返回最大的子串长度。</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int lengthOfLongestSubstringKDistinct(String s, int k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    HashMap&lt;</span><span style="color:#FDAEB7;font-style:italic;">Character,</span><span style="color:#B392F0;"> Integer</span><span style="color:#E1E4E8;">&gt; map = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    int max = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0, j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> s.length(); j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        char cj = s.charAt(j);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // Step 1. count the character</span></span>
<span class="line"><span style="color:#E1E4E8;">        map.put(cj, map.getOrDefault(cj, 0) + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // Step 2. clean up the map if condition doesn&#39;t match</span></span>
<span class="line"><span style="color:#E1E4E8;">        while (map.size() &gt; k) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            char ci = s.charAt(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            map.put(ci, map.get(ci) - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (map.get(ci) == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                map.remove(ci); // that character count has become 0</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            i++;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // Step 3. condition matched, now update the result</span></span>
<span class="line"><span style="color:#E1E4E8;">    max = Math.max(max, j - i + 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return max;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int lengthOfLongestSubstringKDistinct(String s, int k) {</span></span>
<span class="line"><span style="color:#24292E;">    HashMap&lt;</span><span style="color:#B31D28;font-style:italic;">Character,</span><span style="color:#6F42C1;"> Integer</span><span style="color:#24292E;">&gt; map = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    int max = 0;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0, j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> s.length(); j++) {</span></span>
<span class="line"><span style="color:#24292E;">        char cj = s.charAt(j);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // Step 1. count the character</span></span>
<span class="line"><span style="color:#24292E;">        map.put(cj, map.getOrDefault(cj, 0) + 1);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // Step 2. clean up the map if condition doesn&#39;t match</span></span>
<span class="line"><span style="color:#24292E;">        while (map.size() &gt; k) {</span></span>
<span class="line"><span style="color:#24292E;">            char ci = s.charAt(i);</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            map.put(ci, map.get(ci) - 1);</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">            if (map.get(ci) == 0) {</span></span>
<span class="line"><span style="color:#24292E;">                map.remove(ci); // that character count has become 0</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            i++;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // Step 3. condition matched, now update the result</span></span>
<span class="line"><span style="color:#24292E;">    max = Math.max(max, j - i + 1);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    return max;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="复杂度分析-1" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析-1" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h6><p>快慢指针遍历字符串一遍，时间复杂度为 O(n)。</p><p>运用了一个 map来作统计，空间复杂度为 O(n)。</p><h6 id="例题分析三" tabindex="-1">例题分析三 <a class="header-anchor" href="#例题分析三" aria-label="Permalink to &quot;例题分析三&quot;">​</a></h6><p>LeetCode 第 407 题：给定一个 m x n 的矩阵，其中的值均为正整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。</p><p>说明：m 和 n 都是小于 110 的整数。每一个单位的高度都大于 0 且小于 20000。</p><p>示例：</p><p>给出如下 3x6 的高度图:</p><p>[</p><p>[1,4,3,1,3,2],</p><p>[3,2,1,3,2,4],</p><p>[2,3,3,2,3,1]</p><p>]</p><p>返回 4。</p>`,18),V=s("ol",null,[s("li",null,[s("p",null,"下雨前的高度图 [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]。")]),s("li",null,[s("p",null,"下雨后，雨水将会被存储在这些方块中，总的接雨水量是 4。")])],-1),O=s("h6",{id:"解题思路一-从内向外",tabindex:"-1"},[l("解题思路一：从内向外 "),s("a",{class:"header-anchor",href:"#解题思路一-从内向外","aria-label":'Permalink to "解题思路一：从内向外"'},"​")],-1),L=s("h3",{id:"基本情况",tabindex:"-1"},[l("基本情况 "),s("a",{class:"header-anchor",href:"#基本情况","aria-label":'Permalink to "基本情况"'},"​")],-1),R=s("p",null,"举例：假如有一个点高度是 0，而它四周的柱子的高度分别是 1，2，3，4。",-1),H=s("br",null,null,-1),Q=s("p",null,"解法：中间的那个位置最多能接高度为 1 的水，因为它的四周最矮的柱子是 1。",-1),K=s("h3",{id:"扩展情况",tabindex:"-1"},[l("扩展情况 "),s("a",{class:"header-anchor",href:"#扩展情况","aria-label":'Permalink to "扩展情况"'},"​")],-1),W=s("p",null,"举例：假设现在 0 的周围是如下情况，那么 0 那个位置能接水的高度还是 1 吗？",-1),U=s("p",null,"答案应该是 4。",-1),Z=s("p",null,"总结思路：对于每个点，都要不断地往外去寻找那个高过自己的最矮的柱子。假设在平面上，一共有 n 个点，按照这样的算法去计算所有的点的接水高度，复杂度是 O(n^3)。",-1),G=s("h2",{id:"解题思路二-从外向内",tabindex:"-1"},[l("解题思路二：从外向内 "),s("a",{class:"header-anchor",href:"#解题思路二-从外向内","aria-label":'Permalink to "解题思路二：从外向内"'},"​")],-1),J=s("p",null,'为了提高效率，采用"农村包围城市"的策略，从外面往里面进行计算。',-1),X=s("p",null,"者是因为，每个点都必须找到最外围的高度，否则无法确定它能接多少雨水。既然如此，为什么不从最外面开始呢？即，每一次我们都从外面最矮的开始，慢慢地往里面计算。",-1),Y=s("p",null,"以上述例子说明。",-1),z=s("br",null,null,-1),$=p(`<ol><li><p>最外围开始，而最外围的方块无法承载雨水。</p></li><li><p>从最外围的高度中选择最矮的柱子，先对它的邻居进行处理。这是因为决定能够接多少雨水并不是由周围最高的柱子决定，而是由最矮的决定。</p></li><li><p>高度 4 是最矮的，于是对其做 BFS，它的邻居是高度为 2 的方块。</p></li><li><p>由于 2 小于 4，2 的位置能够接纳高度为 2 的雨水，于是这个位置上的高度就变成了 4。</p></li><li><p>还是从最矮的点出发，还是 4，它的邻居是 0，于是 0 所能接的雨水高度就是 4。</p></li><li><p>还是 4 是最矮，可以更新它周围的点在接了雨水后的高度。</p></li></ol><p>那么，如何快速知道接下来哪个高度最矮呢？可以用优先队列来提高速度。</p><h6 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h6><p>代码实现如下，为了配合优先队列的操作，定义一个 Cell 类，用来保存每个方块的坐标以及接了雨水后的高度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Cell {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int row;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int col;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int height;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    public Cell(int row, int col, int height) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.row = row;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.col = col;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.height = height;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Cell {</span></span>
<span class="line"><span style="color:#24292E;">    int row;</span></span>
<span class="line"><span style="color:#24292E;">    int col;</span></span>
<span class="line"><span style="color:#24292E;">    int height;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    public Cell(int row, int col, int height) {</span></span>
<span class="line"><span style="color:#24292E;">        this.row = row;</span></span>
<span class="line"><span style="color:#24292E;">        this.col = col;</span></span>
<span class="line"><span style="color:#24292E;">        this.height = height;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>首先对输入进行一些基本的判断。用变量 m 和 n 分别表示输入矩阵的行数和列数。定义一个优先队列或者最小堆，按照每个方块接雨水后的高度排列。初始化优先队列的时候，把矩形的外围四个边上的方块都加入到优先队列中。</p><p>进入 while 循环，开始进行 BFS。每次，从优先队列中取出高度最矮的方块。从四个方向扩散。该方向上的邻居方块能接多少雨水，取决于它是否低于当前的方块了。同时，将新方块加入到优先队列中。</p><p>最后返回承接雨水的总量。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public int trapRainWater(int[][] heights) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // Sanity check</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (heights == null || heights.length == 0 || heights[0].length == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int m = heights.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">    int n = heights[0].length;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    PriorityQueue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Cell</span><span style="color:#E1E4E8;">&gt; queue = new PriorityQueue(new Comparator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Cell</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        public int compare(Cell a, Cell b) { return a.height - b.height; }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean[][] visited = new boolean[m][n];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // Initially, add all the Cells which are on borders to the queue.</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        visited[i][0] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        visited[i][n - 1] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        queue.offer(new Cell(i, 0, heights[i][0]));</span></span>
<span class="line"><span style="color:#E1E4E8;">        queue.offer(new Cell(i, n - 1, heights[i][n - 1]));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        visited[0][j] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        visited[m - 1][j] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        queue.offer(new Cell(0, j, heights[0][j]));</span></span>
<span class="line"><span style="color:#E1E4E8;">        queue.offer(new Cell(m - 1, j, heights[m - 1][j]));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // From the borders, pick the shortest cell visited and check its </span></span>
<span class="line"><span style="color:#E1E4E8;">    // neighbors:</span></span>
<span class="line"><span style="color:#E1E4E8;">    // If the neighbor is shorter, collect the water it can trap and update </span></span>
<span class="line"><span style="color:#E1E4E8;">    // its height as its height plus the water trapped.</span></span>
<span class="line"><span style="color:#E1E4E8;">    // Add all its neighbors to the queue.</span></span>
<span class="line"><span style="color:#E1E4E8;">    int[][] dirs = { {-1, 0}, {1, 0}, {0, -1}, {0, 1}};</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int total = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Cell cell = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        for (int[] dir : dirs) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int row = cell.row + dir[0];</span></span>
<span class="line"><span style="color:#E1E4E8;">            int col = cell.col + dir[1];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            if (row &gt;= 0 &amp;&amp; row </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> m &amp;&amp; col &gt;= 0 &amp;&amp; col </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> n &amp;&amp; !visited[row][col])</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">                visited[row][col] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">                total += Math.max(0, cell.height - heights[row][col]);</span></span>
<span class="line"><span style="color:#E1E4E8;">                queue.offer(</span></span>
<span class="line"><span style="color:#E1E4E8;">                    new Cell(row, col, Math.max(heights[row][col], cell.height))</span></span>
<span class="line"><span style="color:#E1E4E8;">                );</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return total;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public int trapRainWater(int[][] heights) {</span></span>
<span class="line"><span style="color:#24292E;">    // Sanity check</span></span>
<span class="line"><span style="color:#24292E;">    if (heights == null || heights.length == 0 || heights[0].length == 0) {</span></span>
<span class="line"><span style="color:#24292E;">        return 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int m = heights.length;</span></span>
<span class="line"><span style="color:#24292E;">    int n = heights[0].length;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    PriorityQueue&lt;</span><span style="color:#B31D28;font-style:italic;">Cell</span><span style="color:#24292E;">&gt; queue = new PriorityQueue(new Comparator&lt;</span><span style="color:#B31D28;font-style:italic;">Cell</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">        public int compare(Cell a, Cell b) { return a.height - b.height; }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    boolean[][] visited = new boolean[m][n];</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // Initially, add all the Cells which are on borders to the queue.</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        visited[i][0] = true;</span></span>
<span class="line"><span style="color:#24292E;">        visited[i][n - 1] = true;</span></span>
<span class="line"><span style="color:#24292E;">        queue.offer(new Cell(i, 0, heights[i][0]));</span></span>
<span class="line"><span style="color:#24292E;">        queue.offer(new Cell(i, n - 1, heights[i][n - 1]));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n; j++) {</span></span>
<span class="line"><span style="color:#24292E;">        visited[0][j] = true;</span></span>
<span class="line"><span style="color:#24292E;">        visited[m - 1][j] = true;</span></span>
<span class="line"><span style="color:#24292E;">        queue.offer(new Cell(0, j, heights[0][j]));</span></span>
<span class="line"><span style="color:#24292E;">        queue.offer(new Cell(m - 1, j, heights[m - 1][j]));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // From the borders, pick the shortest cell visited and check its </span></span>
<span class="line"><span style="color:#24292E;">    // neighbors:</span></span>
<span class="line"><span style="color:#24292E;">    // If the neighbor is shorter, collect the water it can trap and update </span></span>
<span class="line"><span style="color:#24292E;">    // its height as its height plus the water trapped.</span></span>
<span class="line"><span style="color:#24292E;">    // Add all its neighbors to the queue.</span></span>
<span class="line"><span style="color:#24292E;">    int[][] dirs = { {-1, 0}, {1, 0}, {0, -1}, {0, 1}};</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int total = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        Cell cell = queue.poll();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        for (int[] dir : dirs) {</span></span>
<span class="line"><span style="color:#24292E;">            int row = cell.row + dir[0];</span></span>
<span class="line"><span style="color:#24292E;">            int col = cell.col + dir[1];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            if (row &gt;= 0 &amp;&amp; row </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> m &amp;&amp; col &gt;= 0 &amp;&amp; col </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> n &amp;&amp; !visited[row][col])</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">                visited[row][col] = true;</span></span>
<span class="line"><span style="color:#24292E;">                total += Math.max(0, cell.height - heights[row][col]);</span></span>
<span class="line"><span style="color:#24292E;">                queue.offer(</span></span>
<span class="line"><span style="color:#24292E;">                    new Cell(row, col, Math.max(heights[row][col], cell.height))</span></span>
<span class="line"><span style="color:#24292E;">                );</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return total;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="复杂度分析-2" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析-2" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h6><p>假设一共有 m 行 n 列，那么一共有 m×n 个方块。对于每个方块，都有可能会进行优先队列的操作，而优先队列的大小为 m + n，加上初始化优先队列的操作时间，因此，整体的时间复杂度为 O(m + n) + O(m×n×log(m + n)) = O(m×n×log(m + n))。</p><p>由上可知，将复杂度下降了一个维度。</p><p>建议：对于这种在 BFS 中运用&quot;农村包围城市&quot;的策略，LeetCode 上还有一道题，第 417 题，太平洋大西洋水流问题，建议大家课后去试试。</p><h6 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h6><p>这节课讲了三道比较难想的题目，至此已经把所有关于数据结构、算法、以及相关的题目做了讲解，掌握好我们课上讲过的知识点，一定会对你的面试准备有很大的帮助。</p><p>当然，要能在面试中取得理想的发挥，还是要看平时的练习是否足够，不光在数量上，更要在质量上严格要求自己。</p><p>下节课将会分享一些面试准备中的方法和技巧。</p><br>`,18);function ss(ns,as,ls,ps,es,os){const n=o("Image");return t(),i("div",null,[r,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4Q2AHWZiAAA5qCvSGLk571.png"}),l(),E,y,d,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4Q2ATkxxAABJBdsgXhA725.png"}),l(),h,u,g,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4Q2AEHAWAABJfYeVV4k708.png"}),l(),m,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4Q2AHbOfAABrqvMxUVU130.png"}),_,b,f,A,q,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4Q2AGNocAABw4HvSobY774.png"}),k,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4Q-AFUARAFdBFfNwj4s416.gif"}),w,T,C,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4RGAdPAxAGKOo26J4J8733.gif"}),B,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4RGActCuAACWTDVjmS4562.png"}),v,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4RGAIz3YAACUEV4BZ10058.png"}),x,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4RKAYjhXAA248QeqTy0883.gif"}),j,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4RKAB20KAA0Y_xJpZGc219.gif"}),D,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4RKAQZMoAACUJa2fTUI207.png"}),I,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4ROAXs2mABP3Qvxxwgc796.gif"}),F,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4ROABmg9ACHl6sZ0cUE027.gif"}),S,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4RSAS2V0AAwyhXeaga4800.gif"}),P,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4RSAP5kkABVxWpINXZU330.gif"}),M,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4RWAEvZNAB6BcQzB1BA923.gif"}),N,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4ReAeHXlAIqi3-dedKM816.gif"}),V,O,L,R,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4ReAKOakAABLZGpg3no849.png"}),H,Q,K,W,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4RiAE6xSAABpFZMq9Kc568.png"}),U,Z,G,J,X,Y,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/51/CgoB5l2I4RiAR15vAACREQ7D-94461.png"}),z,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/71/CgotOV2I4RmAE6UaADwhl85qEAo165.gif"}),$])}const cs=e(c,[["render",ss]]);export{is as __pageData,cs as default};
