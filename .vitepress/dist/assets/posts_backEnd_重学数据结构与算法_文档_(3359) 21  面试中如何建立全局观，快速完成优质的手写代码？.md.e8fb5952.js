import{_ as a,o as e,g as t,Q as p}from"./chunks/framework.e0c66c3f.js";const q=JSON.parse('{"title":"手写代码的能力考核 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学数据结构与算法_文档/(3359) 21  面试中如何建立全局观，快速完成优质的手写代码？.md","filePath":"posts/backEnd/重学数据结构与算法_文档/(3359) 21  面试中如何建立全局观，快速完成优质的手写代码？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/重学数据结构与算法_文档/(3359) 21  面试中如何建立全局观，快速完成优质的手写代码？.md"},o=p('<p>在前面课时中，我们介绍了技术面试的流程。本课时我们将重点剖析面试流程中的手写代码环节，帮助你换一种思路迎接面试。</p><h3 id="手写代码的能力考核" tabindex="-1">手写代码的能力考核 <a class="header-anchor" href="#手写代码的能力考核" aria-label="Permalink to &quot;手写代码的能力考核&quot;">​</a></h3><p>首先，我们要明确一点，手写代码要比在 IDE 里写代码难得多。在很多 IDE 中，敲一个 Str 出来，就会自动补全 ing，得到 String。反括号&quot;}&quot;，也会自动与前面的括号呼应。即使代码敲错了，按下 backspace 就可以回到原来的位置重新写。</p><p>而手写代码就没有这么便捷的&quot;功能&quot;了。如果你前面的代码写错了，或者忘记定义变量了，那么勾勾画画就会让纸上的卷面乱七八糟，这势必会影响代码的呈现。 <strong>因此，手写代码必须谋定而后动</strong> 。</p><p>但是，我也曾多次听到这样的声音，很多人会说：&quot;我入职之后是在 IDE 里写代码，为什么面试要给我增加难度，偏偏要在纸上写呢？&quot;</p><p>其实，原因就在于 IDE 帮助工程师减负，但工程师的能力不应该下降。在纸上写代码，特别锻炼一个候选人的全局视野。 <strong>它考察的是候选人关于模块、函数的分解能力，对代码中变量的声明、初始化、赋值运算的设计框架以及对于编码任务的全方面把控能力</strong> 。</p><p>如果一个候选人，通过勾勾抹抹完成了一个编码任务，其实是能反映出他不具备全局思考的能力，只能是走一步看一步地去解决问题。</p><h3 id="手写代码的全局观解题方法" tabindex="-1">手写代码的全局观解题方法 <a class="header-anchor" href="#手写代码的全局观解题方法" aria-label="Permalink to &quot;手写代码的全局观解题方法&quot;">​</a></h3><p>那么，如何谋定而后动呢？一个简单的标准就是，避免写一行、想一行，而要建立手写代码的全局观。具体而言，就跟我们这个专栏一直强调的方法论不谋而合了。</p><ul><li><p>首先，根据问题进行 复杂度的分析。估算问题中复杂度的上限和下限。</p></li><li><p>接着，定位问题。根据问题类型，确定采用何种算法思维。</p></li><li><p>然后，分析数据操作。根据增、删、查和数据顺序关系去选择合适的数据结构，利用空间换取时间。</p></li><li><p>分析完这些之后，想一下这段代码大致包含哪些模块，需要拆解出哪些函数，需要用到哪些变量，以及每个变量在哪里声明和赋值。</p></li><li><p>有了这些全局观后，再动手去写代码。</p></li></ul><p>这种实操层面的能力，就需要你千锤百炼了。因此，前面课程中的问题或代码，请尽可能在纸上尝试着再写一遍。如果你能保持干净整洁地写出代码，你一定会有不一样的收获和体会。</p><h3 id="如果不会写代码怎么办" tabindex="-1">如果不会写代码怎么办 <a class="header-anchor" href="#如果不会写代码怎么办" aria-label="Permalink to &quot;如果不会写代码怎么办&quot;">​</a></h3><p>最后一个问题，也是最实际的问题，那就是如果在手写代码环节，遇到了自己真的不会实现的问题，该怎么办呢？</p><p>下面我们分情况来讨论。</p><h4 id="第一种可能性-你有思路、有方法-但代码中要用到一块你不会编码的内容" tabindex="-1">第一种可能性：你有思路、有方法，但代码中要用到一块你不会编码的内容 <a class="header-anchor" href="#第一种可能性-你有思路、有方法-但代码中要用到一块你不会编码的内容" aria-label="Permalink to &quot;第一种可能性：你有思路、有方法，但代码中要用到一块你不会编码的内容&quot;">​</a></h4><p>例如，这个问题需要用到哈希表，但你以前写代码的过程中没有用过。变量声明和一些接口函数名不太清楚。</p><p>那么，你可以考虑在写代码的对应部分用伪代码来代替，并如实告知面试官。这并不丢人。因为每个人的知识体系都有盲区，工程师遇到自己陌生的知识，都需要翻阅相关的帮助文档。但这些都不会成为你实现某个功能或代码的阻塞点。</p><h4 id="第二种可能性-你有思路-但不确定对错" tabindex="-1">第二种可能性：你有思路，但不确定对错 <a class="header-anchor" href="#第二种可能性-你有思路-但不确定对错" aria-label="Permalink to &quot;第二种可能性：你有思路，但不确定对错&quot;">​</a></h4><p>这种情况，你应该在问题分析的阶段，与面试官进行问题的讨论。切记不可以自己闷着头想 10 分钟还没有结果的时候，再跟面试官说我不会。永远牢记一点，面试时间非常宝贵，不要浪费彼此时间。</p><p>解决问题并不丢人，谁遇到问题，都会去查查百度谷歌，更何况是高压下的面试场景。但你不要尝试去找面试官要答案，应该把自己对问题的分析思路讲出来，让面试官来评价是否正确。如果正确，再继续下一步的分析；如果不正确，就可以快速止损，避免时间浪费。</p><h4 id="第三种可能性-你理解了问题-但毫无头绪-解决思路一点都没有" tabindex="-1">第三种可能性：你理解了问题，但毫无头绪，解决思路一点都没有 <a class="header-anchor" href="#第三种可能性-你理解了问题-但毫无头绪-解决思路一点都没有" aria-label="Permalink to &quot;第三种可能性：你理解了问题，但毫无头绪，解决思路一点都没有&quot;">​</a></h4><p>这就比较悲观了。 此时你更应该在最开始就跟面试官反馈。你可以让面试官给予一些提示，这样也许你很快就能找到解决思路了。如果实在是对这个问题很陌生，没有信心，也可以向面试官反馈，希望更换一道面试题。</p><p>你要知道，对于一个有经验的面试官而言，更换面试题太正常不过了。一道题正好戳中求职者的知识盲区，这是很正常的事情。更换题目，不丢人。</p><p>总而言之，当你在手写代码环节遇到困难时，不可以过度浪费时间而闷头苦思冥想，这样你就在浪费面试官的宝贵时间。相反，你应该尽早向面试官反馈自己遇到的困难，并寻求讨论、确认或者提示。这样，对于彼此的效率都是最高的，也是工作过程中遇到问题的最优解决方案。你可以设想一下，在工作中遇到问题，也应该第一时间向领导反馈寻求帮助。</p><p>最后，如果你真的遇到一个完全陌生的问题，那么就更要第一时间反馈给面试官，寻求更换另一个题目。永远牢记一点，遇到不会的，第一时间反馈，这并不丢人。相反，这是明智的选择，反映的是你遇到问题后解决方式的选择和判断。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>好的，这一课时的内容就到这里了。在这一课时的内容中，我们反复强调的一点是，不丢人。遇到困难不丢人，谁工作不遇到点困难呢。遇到困难求助他人给一点提示不丢人，遇到困难不找人帮忙闷头苦想才是错误的。遇到我们不懂的问题选择更换一道题目，这并不是在逃避问题；反之，更是在当时被动的情况下，做出的最优选择。</p><p>在面试求职的过程中，你是否也遇到过问题答不上来的尴尬状况？还记不记得你是如何解决处理的？欢迎在评论区留言，和大家分享你的面试经历。</p><p>最后呢，我还想邀请你为本专栏课程进行结课评价，因为你的每一个观点，都是我们最关注的点。<a href="https://wj.qq.com/s2/6946469/226f/" target="_blank" rel="noreferrer">点击链接，即可参与课程评价。</a></p>',29),_=[o];function i(l,n,s,h,d,c){return e(),t("div",null,_)}const b=a(r,[["render",i]]);export{q as __pageData,b as default};
