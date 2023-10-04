import{_ as l,j as t,o as e,g as c,k as a,s,h as o,Q as p}from"./chunks/framework.e0c66c3f.js";const V=JSON.parse('{"title":"为什么流计算过程不能有环 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6424) 07  死锁：为什么流计算应用突然卡住，不处理数据了.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6424) 07  死锁：为什么流计算应用突然卡住，不处理数据了.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6424) 07  死锁：为什么流计算应用突然卡住，不处理数据了.md"},E=s("p",null,"今天，我们来讨论一个非常有趣的话题，也就是流计算系统中的死锁问题。",-1),y=s("p",null,"在第 06 课时，我们讲解了 CompletableFuture 这个异步编程类的工作原理，并用它实现了一个流计算应用。为了流计算应用不会出现 OOM 问题，我们还专门使用 BackPressureExecutor 执行器，实现了反向压力的功能。",-1),i=s("p",null,'另外，我们在 05 课时已经讲过，描述一个流计算过程使用的是 DAG，也就是"有向无环图"。对于"有向"，我们知道这是代表着流数据的流向。而"无环"又是指什么呢？为什么一定要是"无环"？',-1),u=s("p",null,'其实之所以要强调"无环"，是因为在流计算系统中，当"有环"和"反向压力"一起出现时，流计算系统将会出现"死锁"问题。而程序一旦出现"死锁"，那除非人为干预，否则程序将一直停止执行，也就是我们常说的"卡死"。这在生产环境是绝对不能容忍的。',-1),A=s("p",null,'所以，我们今天将重点分析流计算系统中的"死锁"问题。',-1),_=s("h3",{id:"为什么流计算过程不能有环",tabindex:"-1"},[o("为什么流计算过程不能有环 "),s("a",{class:"header-anchor",href:"#为什么流计算过程不能有环","aria-label":'Permalink to "为什么流计算过程不能有环"'},"​")],-1),F=s("p",null,"我们从一个简单的流计算过程开始，这个流计算过程的 DAG 如下图 1 所示。",-1),h=p("",8),B=p("",10),d=s("p",null,'在图 3 中，整个流计算过程有 A 和 B 这两个步骤，并且具备"反向压力"能力。这时候，如果 A 的输出已经将 B 的输入队列占满，而 B 的输出又需要重新流向 B 的输入队列，那么由于"反向压力"的存在，B 会一直等到其输入队列有空间可用。而 B 的输入队列又因为 B 在等待，永远也不会有空间被释放，所以 B 会一直等待下去。同时，A 也会因为 B 的输入队列已满，由于反向压力的存在，它也只能不停地等待下去。',-1),m=s("p",null,'如此一来，整个流计算过程就形成了一个死锁，A 和 B 两个步骤都会永远等待下去，这样就出现了我们前边看到的程序"卡"住现象。',-1),C=s("h3",{id:"形成-环-的原因",tabindex:"-1"},[o('形成"环"的原因 '),s("a",{class:"header-anchor",href:"#形成-环-的原因","aria-label":'Permalink to "形成"环"的原因"'},"​")],-1),g=s("p",null,'在图 2 所示的 DAG 中，我们是因为需要让 stepB 失败重试，所以"随手"就让 stepB 将其输出重新作为输入重新执行一次。这姑且算是一种比较特殊的需求吧。',-1),q=s("p",null,'但在实际开发过程中，我们的业务逻辑明显是可以分为多个依次执行的步骤，用 DAG 画出来时，也是"无环"的。但在写代码时，有时候一不小心，也会无意识地将一个本来无环的 DAG，实现成了有环的过程。下面图 4 就说明了这种情况。',-1),D=p("",16),x=s("p",null,[s("a",{href:"https://github.com/alain898/realtime_stream_computing_course",target:"_blank",rel:"noreferrer"},"点击此链接查看本课程所有课时的源码")],-1),b=s("hr",null,null,-1),k={href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},f=s("br",null,null,-1),v=s("a",{href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},"PB 级企业大数据项目实战 + 拉勾硬核内推，5 个月全面掌握大数据核心技能。点击链接，全面赋能！",-1);function S(T,P,O,w,I,G){const n=t("Image");return e(),c("div",null,[E,y,i,u,A,_,F,a(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image6/M00/03/B1/Cgp9HWAfi2KATSaEAAE2mmZy--s849.png"}),h,a(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image6/M00/03/AF/CioPOWAfi2yAJoUSAAEjy8tdsAA410.png"}),B,a(n,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image6/M00/03/AF/CioPOWAfi3WAaLyaAAH5vr_30vk488.png"}),d,m,C,g,q,a(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image6/M00/03/AF/CioPOWAfi32AX5a1AAL9Aqk2D9Y454.png"}),D,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/91/Cip5yGAY-4CAZ6B8AAiqciZrqLg086.png"}),x,b,s("p",null,[s("a",k,[a(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image2/M01/0C/98/CgpVE2AZCKKAa8TbAAUCrlmIuEw611.png"})]),f,v])])}const L=l(r,[["render",S]]);export{V as __pageData,L as default};
