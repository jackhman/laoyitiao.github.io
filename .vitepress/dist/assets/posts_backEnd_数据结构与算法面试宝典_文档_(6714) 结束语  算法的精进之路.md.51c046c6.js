import{_ as s,j as l,o as n,g as i,k as a,Q as p,s as o,h as e}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"目标 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6714) 结束语  算法的精进之路.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6714) 结束语  算法的精进之路.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6714) 结束语  算法的精进之路.md"},g=p('<p>专栏的最后一篇内容，我想和你聊聊天，讲一讲我平时如何磨炼自己的算法能力。我会从<strong>目标、方法、执行力</strong>这三个方面展开，和你分享我总结出的一些经验。但是没有一把万能的钥匙可以打开所有的门，所以你还需要根据自身的情况对&quot;我的总结&quot;做一些调整。</p><h3 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>我有一个朋友在准备算法的时候，首先想到的是找到最牛逼的书，然后开始啃书，比如《算法导论》。其实，要做的第一件事，应该是确定目标。你可以思考一下：</p><ul><li><p>你的目标是能够流畅地通过一线大厂的算法面试吗？</p></li><li><p>你的目标是要去参加一些算法竞赛吗？</p></li><li><p>你的目标是要成为算法领域的大牛吗？</p></li></ul><p>这里面，每一个目标需要花费的精力、制定的路线都不同。如果你要参加算法竞赛，那么需要掌握的数据结构/算法要<strong>多得多</strong>，而多出来的这部分知识只有极低的概率会出现在大厂的算法面试中（比如数论算法）。</p><p>我想，阅读这个专栏的同学，大多数制定的目标应该是通过大厂的算法面试。所以这里我们暂且将目标定为<strong>通过面试</strong> 。如果你在刷题或者看书的时候，看到一些超纲的知识点，其实可以降低优先级，跳过它。那么哪些知识点是超纲的呢？我在学习算法前，会有针对性地罗列一下大厂面试中高频出现的<strong>知识点</strong>，如下图所示：</p>',6),c=p('<p>在后面看书、刷题的时候，99% 的精力会花在这些知识点上，暂且不去理会超纲的题目。而只有这些知识点都烂熟于心之后，再去学习一些超纲的知识点。</p><h3 id="学习方法" tabindex="-1">学习方法 <a class="header-anchor" href="#学习方法" aria-label="Permalink to &quot;学习方法&quot;">​</a></h3><p>每个人的基本情况不同，那么这里，我会从基础能力由弱到强说起。你可以根据自身能力跳过某些阶段。</p><h4 id="基础扫盲" tabindex="-1">基础扫盲 <a class="header-anchor" href="#基础扫盲" aria-label="Permalink to &quot;基础扫盲&quot;">​</a></h4><p>如果你以前的专业不是计算机，或者你以前并没有接触过算法与数据结构。你首先需要做 1 件事情：</p><ul><li>拿一本<strong>基础入门</strong> 的书/专栏，把基础的知识点都过<strong>一遍</strong>。</li></ul><blockquote><p>这个阶段不建议看《算法导论》《计算机程序设计艺术》等大部头的书。我一般是挑一本比简单的书或者某个网课/专栏把这个阶段尽快过掉。</p></blockquote><p>这个阶段看书要达到的效果是：要知道各种基础概念（比如 DFS/BFS/回溯等）、各种基础数据结构（二叉树/链表/哈希等）、基础算法名词（贪心/DP 等），都要弄明白说的是什么。<strong>这一阶段，你不需要达到能够写出各种代码的程度，只需要看懂书上的代码，会用笔通过画画的方式，来解决数据结构和算法的某个具体的输入。</strong> 比如：</p><ul><li>当给定有序数组 A[] = {1,2,3,4,9} 的时候，你能<strong>用笔</strong>写出二分搜索的流程。</li></ul><p>接着做<strong>第 2 件事情</strong>：</p><ul><li>重新打开书，按照<strong>知识点的顺序</strong> ，打开你喜欢的刷题网站，每个知识点<strong>先刷 10 道左右简单题</strong>。</li></ul><p>这个阶段花费的时间，根据个人情况，一般 1 个月左右。此外，你的目的是过掉各种基础知识点，所以不需要看很多书。</p><h4 id="刷题阶段" tabindex="-1">刷题阶段 <a class="header-anchor" href="#刷题阶段" aria-label="Permalink to &quot;刷题阶段&quot;">​</a></h4><p>先说一个简单的结论：跟着本专栏走！</p><p>因为当基础知识扫盲之后，接下来就需要通过实践来提升我们的算法能力。在刷题阶段，我们的目标是击破中等难度的题目。</p><p><strong>阶段 1：一解多题</strong></p><p>这一阶段是以知识点为出发点，我们需要按照以下方式来刷题。</p><ul><li><p>高频出现的知识点作为 Tag，只刷这个 Tag 中等难度的题目！</p></li><li><p>看题解！无论一个题是否 Resolve，一定要看题解！</p></li><li><p>抓住数据结构与算法的特点！形成一解多题的能力。<strong>整理</strong>代码模板！</p></li></ul><p>你会发现，这正是我们专栏《模块一：数据结构之一解多题篇》介绍的内容。这个阶段的产出，就 3 个字&quot;<strong>写得出</strong>&quot;。比如当我直白地告诉你需要用 DFS/回溯/二分的时候，你能快速地把相应的代码写出来。</p><blockquote><p>注意：这一阶段不要按照刷题网站的顺序，按照题号来刷题，这样做效率非常低！</p></blockquote><p>此外，整理好的代码模板还需要用起来。所以，这里我再讲一下如何将代码模板放到 Vscode 中，方便你在后面的写题中加快刷题的速度（<a href="https://snippet-generator.app/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">制作代码模板的网站</a>）。</p>',21),_=o("p",null,"Step 1. 输入模板关键字和描述。",-1),h=o("p",null,"Step 2. 放上并查集的模板代码。",-1),u=o("p",null,"Step 3. 复制整个 json 格式的代码模板。",-1),d=o("p",null,"Step 4. 打开 Vscode，找到 User Snippets。",-1),m=o("p",null,[e("Step 5. 选中代码模板要放到哪个文件中，比如放到 global 中。"),o("strong",null,"注意，Vscode 中这个文件的格式一定要满足 json 格式"),e("。")],-1),q=o("p",null,"至此，代码模板就成功添加到了编辑器中，在刷题的时候，都可以用上它。",-1),A=p('<p>Step 6. 输入我们的模板关键字，再回车，一份完整的并查集模板代码就可以直接使用了。</p><blockquote><p>注意：不要小看添加模板和使用模板的小妙招。我曾经用这个绝招，10 个小时刷完了所有的二叉树的题目！</p><p>我们是在学习算法，不是在练习打字。所以一些固定的代码模板，没有必要重复地敲来敲去，以及浪费时间在一些低级的 Bug 调试。</p></blockquote><p><strong>阶段 2：一题多解</strong></p><p>这一阶段是以<strong>解题</strong>为核心，你需要回顾一遍刷过的题，这里我给你划了有三个重点：</p><ul><li><p>每个题尽量需要做到有多种解法；</p></li><li><p>找到不同的题目之间的联系、差异、变化规律；</p></li><li><p>重点关照没思路的题、经常写错的题、有多种解法的题。</p></li></ul><p>这一阶段的产出就 3 个字------<strong>有思路</strong>。具体来说，就是看到题目能够辨别出题目的考点，能够联想到我们的算法与数据结构，然后快速想到解题思路。</p><blockquote><p>注意：这一阶段不是去突击困难的题，而是要保证拿到中等难度的题要有思路。</p></blockquote><p>所以你在刷题的时候，要快速利用你之前整理好的代码模板。比如我会将阶段 1 整理好的代码模板放到 Vscode 编辑器中。写题的时候就可以一键写好我的代码。刷题速度快到飞起！</p><h4 id="面试准备" tabindex="-1">面试准备 <a class="header-anchor" href="#面试准备" aria-label="Permalink to &quot;面试准备&quot;">​</a></h4><p>如果你的目标是面试，那么在面试前，就只需要做两件事：</p><ul><li><p>复习整理好的代码模板，把这些代码模板写熟练，能背着打出来最好；</p></li><li><p>复习不容易形成思路的题目，利用碎片化时间不停抽查这些题目。</p></li></ul><p>准备面试阶段，我们在写题时，一定要计时！人为加一点心理压力，对面试有非常好的帮助。</p><h4 id="超越自我" tabindex="-1">超越自我 <a class="header-anchor" href="#超越自我" aria-label="Permalink to &quot;超越自我&quot;">​</a></h4><p>如果你还想更进一步提升自己的能力，那么可以跳出舒适区，积极地参加一些算法竞赛。与更多的选手、大佬们交流，并且积极地写题解帮助更多的朋友。有时候，&quot;以赛代练&quot;能够更加有效地提升你的算法能力。你需要做到：</p><ul><li><p>不要在意排名</p></li><li><p>比赛做不出来没关系，赛后一定要补题</p></li><li><p>写题解</p></li><li><p>看别人的题解</p></li></ul><p>有了以上几步，相信你的算法能力会迅速提高。</p><h3 id="执行力" tabindex="-1">执行力 <a class="header-anchor" href="#执行力" aria-label="Permalink to &quot;执行力&quot;">​</a></h3><p>以上就是我针对自身情况，以及分享给我身边的朋友们的学习方法。至少就突破面试而言，已经够用了。</p><p>不过，算法是一门实践性非常强的学科。当你有了这么一份好的计划，那么接下来你要做的事情就是：执行它！坚决地执行它！</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这就是我学习算法的过程与方法。看到这里，希望你能够根据这个方法制定出适合自己的方法和计划，并且<strong>一定要执行到位</strong>。</p><p>如果你有什么更好的方法、建议，欢迎写在留言区，我们一起讨论。再见。</p>',22);function b(C,T,k,P,S,f){const t=l("Image");return n(),i("div",null,[g,a(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/40/E0/CioPOWCna7yAbR5gAABloprC1Ew727.png"}),c,a(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/40/E0/CioPOWCna86AIKUTAAKcKMDNif0795.png"}),_,a(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/40/D8/Cgp9HWCna9aAE5V-AAJfqe14csQ341.png"}),h,a(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/40/E0/CioPOWCna92AOE9BAAX3NcmR8bY969.png"}),u,a(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/40/E0/CioPOWCna-SAQvgEAATDO0xeDlg700.png"}),d,a(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/40/D8/Cgp9HWCna-mAV2VqAACacHgsh5E729.png"}),m,q,a(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/40/E0/CioPOWCna_CAV0LiAAIg8AyGcA4899.png"}),A])}const E=s(r,[["render",b]]);export{V as __pageData,E as default};
