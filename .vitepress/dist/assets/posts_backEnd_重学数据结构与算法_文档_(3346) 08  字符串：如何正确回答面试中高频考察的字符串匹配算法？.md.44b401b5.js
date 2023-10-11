import{_ as p,D as o,o as t,g as e,J as n,h as l,Q as s}from"./chunks/framework.f67d7268.js";const g=JSON.parse('{"title":"08字符串：如何正确回答面试中高频考察的字符串匹配算法？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学数据结构与算法_文档/(3346) 08  字符串：如何正确回答面试中高频考察的字符串匹配算法？.md","filePath":"posts/backEnd/重学数据结构与算法_文档/(3346) 08  字符串：如何正确回答面试中高频考察的字符串匹配算法？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/重学数据结构与算法_文档/(3346) 08  字符串：如何正确回答面试中高频考察的字符串匹配算法？.md"},r=s('<h1 id="_08字符串-如何正确回答面试中高频考察的字符串匹配算法" tabindex="-1">08字符串：如何正确回答面试中高频考察的字符串匹配算法？ <a class="header-anchor" href="#_08字符串-如何正确回答面试中高频考察的字符串匹配算法" aria-label="Permalink to &quot;08字符串：如何正确回答面试中高频考察的字符串匹配算法？&quot;">​</a></h1><p>这一节我们来讲字符串和它的相关操作。</p><h3 id="字符串是什么" tabindex="-1">字符串是什么 <a class="header-anchor" href="#字符串是什么" aria-label="Permalink to &quot;字符串是什么&quot;">​</a></h3><p>字符串（string） 是由 n 个字符组成的一个有序整体（ n &gt;= 0 ）。例如，s = &quot;BEIJING&quot; ，s 代表这个串的串名，BEIJING 是串的值。这里的双引号不是串的值，作用只是为了将串和其他结构区分开。字符串的逻辑结构和线性表很相似，不同之处在于字符串针对的是字符集，也就是字符串中的元素都是字符，线性表则没有这些限制。</p><p>在实际操作中，我们经常会用到一些特殊的字符串：</p><ul><li><p>空串，指含有零个字符的串。例如，s = &quot;&quot;，书面中也可以直接用 Ø 表示。</p></li><li><p>空格串，只包含空格的串。它和空串是不一样的，空格串中是有内容的，只不过包含的是空格，且空格串中可以包含多个空格。例如，s = &quot; &quot;，就是包含了 3 个空格的字符串。</p></li><li><p>子串，串中任意连续字符组成的字符串叫作该串的子串。</p></li><li><p>原串通常也称为主串。例如：a = &quot;BEI&quot;，b = &quot;BEIJING&quot;，c = &quot;BJINGEI&quot; 。</p><ul><li><p>对于字符串 a 和 b 来说，由于 b 中含有字符串 a ，所以可以称 a 是 b 的子串，b 是 a 的主串；</p></li><li><p>而对于 c 和 a 而言，虽然 c 中也含有 a 的全部字符，但不是连续的 &quot;BEI&quot; ，所以串 c 和 a 没有任何关系。</p></li></ul></li></ul><p>当要判断两个串是否相等的时候，就需要定义相等的标准了。只有两个串的串值完全相同，这两个串才相等。根据这个定义可见，即使两个字符串包含的字符完全一致，它们也不一定是相等的。例如 b = &quot;BEIJING&quot;，c = &quot;BJINGEI&quot;，则 b 和 c 并不相等。</p><p>字符串的存储结构与线性表相同，也有顺序存储和链式存储两种。</p><ul><li><p>字符串的顺序存储结构，是用一组地址连续的存储单元来存储串中的字符序列，一般是用定长数组来实现。有些语言会在串值后面加一个不计入串长度的结束标记符，比如 \\0 来表示串值的终结。</p></li><li><p>字符串的链式存储结构，与线性表是相似的，但由于串结构的特殊性（结构中的每个元素数据都是一个字符），如果也简单地将每个链结点存储为一个字符，就会造成很大的空间浪费。因此，一个结点可以考虑存放多个字符，如果最后一个结点未被占满时，可以使用 &quot;#&quot; 或其他非串值字符补全，如下图所示：</p></li></ul>',9),E=s('<p>在链式存储中，每个结点设置字符数量的多少，与串的长度、可以占用的存储空间以及程序实现的功能相关。</p><ul><li><p>如果字符串中包含的数据量很大，但是可用的存储空间有限，那么就需要提高空间利用率，相应地减少结点数量。</p></li><li><p>而如果程序中需要大量地插入或者删除数据，如果每个节点包含的字符过多，操作字符就会变得很麻烦，为实现功能增加了障碍。</p></li></ul><p>因此，串的链式存储结构除了在连接串与串操作时有一定的方便之外，总的来说，不如顺序存储灵活，在性能方面也不如顺序存储结构好。</p><h3 id="字符串的基本操作" tabindex="-1">字符串的基本操作 <a class="header-anchor" href="#字符串的基本操作" aria-label="Permalink to &quot;字符串的基本操作&quot;">​</a></h3><p>字符串和线性表的操作很相似，但由于字符串针对的是字符集，所有元素都是字符，因此字符串的基本操作与线性表有很大差别。线性表更关注的是单个元素的操作，比如增删查一个元素，而字符串中更多关注的是查找子串的位置、替换等操作。接下来我们以顺序存储为例，详细介绍一下字符串对于另一个字符串的增删查操作。</p><h4 id="字符串的新增操作" tabindex="-1">字符串的新增操作 <a class="header-anchor" href="#字符串的新增操作" aria-label="Permalink to &quot;字符串的新增操作&quot;">​</a></h4><p>字符串的新增操作和数组非常相似，都牵涉对插入字符串之后字符的挪移操作，所以时间复杂度是 O(n)。</p><p>例如，在字符串 s1 = &quot;123456&quot; 的正中间插入 s2 = &quot;abc&quot;，则需要让 s1 中的 &quot;456&quot; 向后挪移 3 个字符的位置，再让 s2 的 &quot;abc&quot; 插入进来。很显然，挪移的操作时间复杂度是 O(n)。不过，对于特殊的插入操作时间复杂度也可以降低为 O(1)。这就是在 s1 的最后插入 s2，也叫作字符串的连接，最终得到 &quot;123456abc&quot;。</p><h4 id="字符串的删除操作" tabindex="-1">字符串的删除操作 <a class="header-anchor" href="#字符串的删除操作" aria-label="Permalink to &quot;字符串的删除操作&quot;">​</a></h4><p>字符串的删除操作和数组同样非常相似，也可能会牵涉删除字符串后字符的挪移操作，所以时间复杂度是 O(n)。</p><p>例如，在字符串 s1 = &quot;123456&quot; 的正中间删除两个字符 &quot;34&quot;，则需要删除 &quot;34&quot; 并让 s1 中的 &quot;56&quot; 向前挪移 2 个字符的位置。很显然，挪移的操作时间复杂度是 O(n)。不过，对于特殊的插入操作时间复杂度也可以降低为 O(1)。这就是在 s1 的最后删除若干个字符，不牵涉任何字符的挪移。</p><h4 id="字符串的查找操作" tabindex="-1">字符串的查找操作 <a class="header-anchor" href="#字符串的查找操作" aria-label="Permalink to &quot;字符串的查找操作&quot;">​</a></h4><p>字符串的查找操作，是反映工程师对字符串理解深度的高频考点，这里需要你格外注意。</p><p>例如，字符串 s = &quot;goodgoogle&quot;，判断字符串 t = &quot;google&quot; 在 s 中是否存在。需要注意的是，如果字符串 t 的每个字符都在 s 中出现过，这并不能证明字符串 t 在 s 中出现了。当 t = &quot;dog&quot; 时，那么字符 &quot;d&quot;、&quot;o&quot;、&quot;g&quot; 都在 s 中出现过，但他们并不连在一起。</p><p>那么我们如何判断一个子串是否在字符串中出现过呢？这个问题也被称作子串查找或字符串匹配，接下来我们来重点分析。</p><h4 id="子串查找-字符串匹配" tabindex="-1">子串查找（字符串匹配） <a class="header-anchor" href="#子串查找-字符串匹配" aria-label="Permalink to &quot;子串查找（字符串匹配）&quot;">​</a></h4><p>首先，我们来定义两个概念，主串和模式串。我们在字符串 A 中查找字符串 B，则 A 就是主串，B 就是模式串。我们把主串的长度记为 n，模式串长度记为 m。由于是在主串中查找模式串，因此，主串的长度肯定比模式串长，n&gt;m。因此，字符串匹配算法的时间复杂度就是 n 和 m 的函数。</p><p>假设要从主串 s = &quot;goodgoogle&quot; 中找到 t = &quot;google&quot; 子串。根据我们的思考逻辑，则有：</p><ul><li><p>首先，我们从主串 s 第 1 位开始，判断 s 的第 1 个字符是否与 t 的第 1 个字符相等。</p></li><li><p>如果不相等，则继续判断主串的第 2 个字符是否与 t 的第1 个字符相等。直到在 s 中找到与 t 第一个字符相等的字符时，然后开始判断它之后的字符是否仍然与 t 的后续字符相等。</p></li><li><p>如果持续相等直到 t 的最后一个字符，则匹配成功。</p></li><li><p>如果发现一个不等的字符，则重新回到前面的步骤中，查找 s 中是否有字符与 t 的第一个字符相等。</p></li><li><p>如下图所示，s 的第1 个字符和 t 的第 1 个字符相等，则开始匹配后续。直到发现前三个字母都匹配成功，但 s 的第 4 个字母匹配失败，则回到主串继续寻找和 t 的第一个字符相等的字符。</p></li><li><p>如下图所示，这时我们发现主串 s 第 5 位开始相等，并且随后的 6 个字母全匹配成功，则找到结果。</p></li></ul>',19),y=s(`<p>这种匹配算法需要从主串中找到跟模式串的第 1 个字符相等的位置，然后再去匹配后续字符是否与模式串相等。显然，从实现的角度来看，需要两层的循环。第一层循环，去查找第一个字符相等的位置，第二层循环基于此去匹配后续字符是否相等。因此，这种匹配算法的时间复杂度为 O(nm)。其代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">s1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;goodgoogle&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;google&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> isfind </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> s.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> t.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (s.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(i) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> t.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> jc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> t.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); j</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (s.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> j) </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> t.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(j)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                jc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> j;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (jc </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> t.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                isfind </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(isfind);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">s1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    String s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;goodgoogle&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;google&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> isfind </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> s.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> t.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (s.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(i) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> t.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> jc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> t.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); j</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (s.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> j) </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> t.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(j)) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                jc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> j;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (jc </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> t.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                isfind </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(isfind);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="字符串匹配算法的案例" tabindex="-1">字符串匹配算法的案例 <a class="header-anchor" href="#字符串匹配算法的案例" aria-label="Permalink to &quot;字符串匹配算法的案例&quot;">​</a></h3><p>最后我们给出一道面试中常见的高频题目，这也是对字符串匹配算法进行拓展，从而衍生出的问题，即查找出两个字符串的最大公共字串。</p><p>假设有且仅有 1 个最大公共子串。比如，输入 a = &quot;13452439&quot;， b = &quot;123456&quot;。由于字符串 &quot;345&quot; 同时在 a 和 b 中出现，且是同时出现在 a 和 b 中的最长子串。因此输出 &quot;345&quot;。</p><p>对于这个问题其实可以用动态规划的方法来解决，关于动态规划，我们会在后续的课程会讲到，所以在这里我们沿用前面的匹配算法。</p><p>假设字符串 a 的长度为 n，字符串 b 的长度为 m，可见时间复杂度是 n 和 m 的函数。</p><ul><li><p>首先，你需要对于字符串 a 和 b 找到第一个共同出现的字符，这跟前面讲到的匹配算法在主串中查找第一个模式串字符一样。</p></li><li><p>然后，一旦找到了第一个匹配的字符之后，就可以同时在 a 和 b 中继续匹配它后续的字符是否相等。这样 a 和 b 中每个互相匹配的字串都会被访问一遍。全局还要维护一个最长子串及其长度的变量，就可以完成了。</p></li></ul><p>从代码结构来看，第一步需要两层的循环去查找共同出现的字符，这就是 O(nm)。一旦找到了共同出现的字符之后，还需要再继续查找共同出现的字符串，这也就是又嵌套了一层循环。可见最终的时间复杂度是 O(nmm)，即 O(nm²)。代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">s2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;123456&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;13452439&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String maxSubStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> max_len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> a.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> b.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); j</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (a.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(i) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> b.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(j)){</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> m</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">i, n</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">j; m</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">a.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;">n</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">b.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); m</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">,n</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (a.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(m) </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> b.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(n)){</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (max_len </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> m</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">i</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                        max_len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> m</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">i</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        maxSubStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> a.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(i, m</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }	</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(maxSubStr);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">s2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    String a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;123456&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;13452439&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String maxSubStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> max_len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> a.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> b.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); j</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (a.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(i) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> b.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(j)){</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> m</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">i, n</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">j; m</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">a.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;">n</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">b.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); m</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">,n</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (a.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(m) </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> b.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(n)){</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (max_len </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> m</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">i</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                        max_len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> m</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">i</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                        maxSubStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> a.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(i, m</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }	</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(maxSubStr);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课我们介绍了字符串匹配算法，它在平时代码编写中都比较常用。</p><p>字符串的逻辑结构和线性表极为相似，区别仅在于串的数据对象约束为字符集。但是，字符串的基本操作和线性表有很大差别：</p><ul><li><p>在线性表的基本操作中，大多以&quot;单个元素&quot;作为操作对象；</p></li><li><p>在字符串的基本操作中，通常以&quot;串的整体&quot;作为操作对象；</p></li><li><p>字符串的增删操作和数组很像，复杂度也与之一样。但字符串的查找操作就复杂多了，它是参加面试、笔试常常被考察的内容。</p></li></ul><h3 id="练习题" tabindex="-1">练习题 <a class="header-anchor" href="#练习题" aria-label="Permalink to &quot;练习题&quot;">​</a></h3><p>最后我们给出一道练习题。给定一个字符串，逐个翻转字符串中的每个单词。例如，输入: &quot;the sky is blue&quot;，输出: &quot;blue is sky the&quot;。</p><p>希望你在课后自己去实践一下，如果你在字符串的使用方面遇到困难，欢迎在留言区和我交流。</p>`,17);function i(F,u,q,h,A,_){const a=o("Image");return t(),e("div",null,[r,n(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/1C/BB/Ciqc1F7gvwmAeOuQAACbWbwi7hs491.png"}),l(),E,n(a,{alt:"Lark20200611-171750.gif",src:"https://s0.lgstatic.com/i/image/M00/1D/7B/Ciqc1F7h-hmAFsw0ADCjkl8SW7M434.gif"}),l(),y])}const b=p(c,[["render",i]]);export{g as __pageData,b as default};
