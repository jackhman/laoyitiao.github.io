import{_,j as p,o,h as n,k as a,f as e,s as t,Q as r}from"./chunks/framework.d3daa342.js";const P=JSON.parse('{"title":"结束语开启性能优化实践之路","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6584) 结束语  开启性能优化实践之路.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6584) 结束语  开启性能优化实践之路.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6584) 结束语  开启性能优化实践之路.md"},l=t("h1",{id:"结束语开启性能优化实践之路",tabindex:"-1"},[e("结束语开启性能优化实践之路 "),t("a",{class:"header-anchor",href:"#结束语开启性能优化实践之路","aria-label":'Permalink to "结束语开启性能优化实践之路"'},"​")],-1),d=t("p",null,"你好，我是溪风，时间过得很快，一晃 2 个多月就过去了。",-1),i=t("p",null,"总的来说，这段磨稿经历让我印象十分深刻，我几乎是每天晚上 10 点到家后，开始写稿、改稿、录音。记得有一次要录 06 讲，那时我正好出差到深圳，录音的时候已经到了凌晨，又因为赶上外面施工，总是有噪音，顺利录完以后天都快亮了。",-1),h=t("p",null,"还有一件印象比较深的事儿，那就是课程上线之后，很多同学积极地在留言区互动，有的问题很有意思，比如 SDK 在弱网下的上报策略，还有离线包解压失败这么小概率的问题，竟然也有人遇到。当然了，我最感动的是很多同学给了我鼓励，肯定了课程的内容，正是这种声音，让我一直坚持持续输出内容。",-1),m=t("p",null,"今天是专栏的最后一讲，为了让你更系统地了解前端性能优化的全貌，我想和你一起回顾一下前面的内容，并分享一下性能实战过程中的注意事项。",-1),f=t("p",null,'前面我带你学习了"性能优化方法论（01~03）""性能优化指标采集及上报（04~06）""性能诊断与优化手段（07~11）""Hybrid 下的进阶优化手段（12~16）""一线大厂性能优化体系演进（17～19）"等内容。',-1),g=t("p",null,"这部分内容通过发现问题、立项、项目实施、专项测试、收益评估等过程，形成了一条横轴（ X轴），又通过一线大厂性能方案对比，形成了一条纵轴（Y轴），加入时间因素后，前端未来在 RN、Flutter上 的演进形成了一条时间轴（Z轴）。",-1),u=r('<p>之前，你一直是一步一步跟着课程来形成前端性能体系，但现在你就要通过实践来夯实自己之前梳理的前端性能体系了。那么在这个实战过程中，**你会遇到哪些问题呢？又该怎么解决呢？**这里我提供一些经验，希望你能有所收获。</p><p><strong>性能优化实践过程中最难的点，还是发现问题</strong>，我们之所以觉得问题难以解决，就是因为没有发现问题的真正所在。所以性能监控预警平台至关重要，你要知道怎么搭建该平台，怎么设定、采集和上报性能指标，性能监控预警平台上的数据指标对应的标准是什么，学会从性能指标异常推导出性能问题。</p><p>这很像医生看病，当一个发烧病人来到诊室，医生通过验血等手段了解你白细胞、中性离细胞等指标，然后和标准进行对比，诊断是病毒性感冒还是细菌性感冒，并开对应对药方治疗。当然，如果你目前还没有能力去开发平台，可以使用第三方，比如阿里云的性能平台或者听云 APM。</p><p><strong>无论是否需要自研平台，性能诊断都是一个难点</strong>，值得你一遍一遍反复学习。我们会在性能平台上看到各种各样的问题，那怎么去诊断、发现代码修改点就非常重要。这时如果你比较了解团队过往出现的性能问题，那你定位性能问题的速度也就越快；如果你能多了解工程化链路和浏览器渲染原理等瓶颈点，就越有助你定位到问题。</p><p>通过一遍一遍练习对性能问题的定位与诊断，你要努力达到：利用性能体系建立强大的心理表征（心理表征是一种与我们大脑正在思考的某个事物、某个观点、某些信息或者其他任何事物相对应的心理结构，棋手的心理表征是过往的一盘盘棋局），吸收和考虑更多性能相关的信息，把 webview、浏览器、App，前端代码当作一个整体来思考，快速定位到性能问题。</p><p><strong>当你发现问题，并成功定位问题之后，接下来的重点就是掌握优化手段。</strong> 很多同学会因为缺乏对节奏的把握，影响优化结果，比如明明时间很紧，要快点拿到结果，你却选择了一个长期的方案，导致迟迟看不到结果，项目被 cancel 掉。所以我重点讲一下这块儿。</p><p>一般来说，业务报出性能问题时，比如手机首页访问慢的问题，需要一个短平快的解决方案（比如一周内需要完成上线），快速上线。</p><p>因为时间的原因，这个性能优化方案过程中肯定是要有取舍的，比如在最终效果方面，性能指标定到首屏平均 1s 就可以了，更多是短期方案，也就是前端工程师可以独立完成的优化手段，如懒加载、离线化、异步化、骨架屏和缓存等手段，做完上述优化后，一般可以做到性能大幅提升，极限秒开。那为了进一步提升性能水平，让秒开率也达标，你可以同时准备一些中期需要的基础建设，比如离线包方案和 SSR 相关的 Node 生态内容等。</p><p>接下来就要定一个中期目标（比如 半个月周期的项目），效果方面，秒开率提升到 80%。此时就可以用一些中期优化方案，比如首屏内容做到稳定秒开，优化手段就是性能的稳定治理，需要利用一些横向资源，比如客户端资源，接入前期准备的离线包、SSR 等方案。与此同时，也要开始做一些长期的准备，比如webview 层的优化，又比如预请求、预加载、预渲染的方案。</p><p>如果你可以再提高对自己的要求，比如二次做到闪开、首次秒开、且白屏时间缩短，需要使用一些长期方案，比如引入 QA 团队做好专项测试，保证性能长期稳定，建立起性能预警问题的解决机制。一般来说，要实现上述的要求，需要跨团队的深度合作，长期方案实施时，就需要我们设定好预期收益目标，说服业务投入资源到项目中去。</p><p>以上就是优化整体体系以及实战过程中的注意事项，我简单将整个课程的内容进行了梳理，希望能让你明确性能优化的重难点，以及今后努力的方向。</p><p>或许你觉得在互联网时代知识很容易学习，实际上性能知识比较海量，如果你单纯依赖碎片化的学习，就会越来越无法将知识体系化，更别提提升性能优化的技能了。就像我刚开始做性能优化时，因为缺乏体系化的知识，看了很多公众号和零星的课程，最终还是不知道性能优化整体上该怎么做。</p><p>所以这门课我结合了自己的实践总结，为你提供一套前端性能体系。希望你在工作中，能够通过知行合一，深耕自己的技术实力，早日成为前端性能专家。</p><p>最后，我为你准备了一份结课问卷，希望你对本课程的内容进行评价，以便我及时优化课程内容。</p><p><a href="https://wj.qq.com/s2/8373266/bb7e?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">点击链接，即可参与课程评价</a></p><p>希望你能学有所成，早日成为最优秀的自己。</p>',16);function S(A,N,b,x,T,E){const s=p("Image");return o(),n("div",null,[l,d,i,h,m,f,g,a(s,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/EE/Cgp9HWCHssKAdlx3AABDN8UOHr4585.png"}),e(),u])}const k=_(c,[["render",S]]);export{P as __pageData,k as default};
