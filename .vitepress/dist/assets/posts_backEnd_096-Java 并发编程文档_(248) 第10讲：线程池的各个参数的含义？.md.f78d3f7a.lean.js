import{_ as l,j as r,o as t,h as m,k as i,f as o,s as e,Q as c}from"./chunks/framework.d3daa342.js";const E=JSON.parse('{"title":"第10讲：线程池的各个参数的含义？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(248) 第10讲：线程池的各个参数的含义？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(248) 第10讲：线程池的各个参数的含义？.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/096-Java 并发编程文档/(248) 第10讲：线程池的各个参数的含义？.md"},n=e("h1",{id:"第10讲-线程池的各个参数的含义",tabindex:"-1"},[o("第10讲：线程池的各个参数的含义？ "),e("a",{class:"header-anchor",href:"#第10讲-线程池的各个参数的含义","aria-label":'Permalink to "第10讲：线程池的各个参数的含义？"'},"​")],-1),_=e("p",null,"本课时我们主要学习线程池各个参数的含义，并重点掌握线程池中线程是在什么时机被创建和销毁的。",-1),d=e("h2",{id:"线程池的参数",tabindex:"-1"},[o("线程池的参数 "),e("a",{class:"header-anchor",href:"#线程池的参数","aria-label":'Permalink to "线程池的参数"'},"​")],-1),p=e("p",null,"首先，我们来看下线程池中各个参数的含义，如表所示线程池主要有 6 个参数，其中第 3 个参数由 keepAliveTime + 时间单位组成。我们逐一看下它们各自的含义，corePoolSize 是核心线程数，也就是常驻线程池的线程数量，与它对应的是 maximumPoolSize，表示线程池最大线程数量，当我们的任务特别多而 corePoolSize 核心线程数无法满足需求的时候，就会向线程池中增加线程，以便应对任务突增的情况。",-1),h=e("h2",{id:"线程创建的时机",tabindex:"-1"},[o("线程创建的时机 "),e("a",{class:"header-anchor",href:"#线程创建的时机","aria-label":'Permalink to "线程创建的时机"'},"​")],-1),u=e("p",null,"接下来，我们来具体看下这两个参数所代表的含义，以及线程池中创建线程的时机。如上图所示，当提交任务后，线程池首先会检查当前线程数，如果此时线程数小于核心线程数，比如最开始线程数量为 0，则新建线程并执行任务，随着任务的不断增加，线程数会逐渐增加并达到核心线程数，此时如果仍有任务被不断提交，就会被放入 workQueue 任务队列中，等待核心线程执行完当前任务后重新从 workQueue 中提取正在等待被执行的任务。",-1),P=e("p",null,"此时，假设我们的任务特别的多，已经达到了 workQueue 的容量上限，这时线程池就会启动后备力量，也就是 maximumPoolSize 最大线程数，线程池会在 corePoolSize 核心线程数的基础上继续创建线程来执行任务，假设任务被不断提交，线程池会持续创建线程直到线程数达到 maximumPoolSize 最大线程数，如果依然有任务被提交，这就超过了线程池的最大处理能力，这个时候线程池就会拒绝这些任务，我们可以看到实际上任务进来之后，线程池会逐一判断 corePoolSize、workQueue、maximumPoolSize，如果依然不能满足需求，则会拒绝任务。",-1),z=e("h2",{id:"corepoolsize-与-maximumpoolsize",tabindex:"-1"},[o("corePoolSize 与 maximumPoolSize "),e("a",{class:"header-anchor",href:"#corepoolsize-与-maximumpoolsize","aria-label":'Permalink to "corePoolSize 与 maximumPoolSize"'},"​")],-1),S=e("p",null,"通过上面的流程图，我们了解了 corePoolSize 和 maximumPoolSize 的具体含义，corePoolSize 指的是核心线程数，线程池初始化时线程数默认为 0，当有新的任务提交后，会创建新线程执行任务，如果不做特殊设置，此后线程数通常不会再小于 corePoolSize ，因为它们是核心线程，即便未来可能没有可执行的任务也不会被销毁。随着任务量的增加，在任务队列满了之后，线程池会进一步创建新线程，最多可以达到 maximumPoolSize 来应对任务多的场景，如果未来线程有空闲，大于 corePoolSize 的线程会被合理回收。所以正常情况下，线程池中的线程数量会处在 corePoolSize 与 maximumPoolSize 的闭区间内。",-1),k=e("h2",{id:"长工-与-临时工",tabindex:"-1"},[o('"长工"与"临时工" '),e("a",{class:"header-anchor",href:"#长工-与-临时工","aria-label":'Permalink to ""长工"与"临时工""'},"​")],-1),x=e("p",null,"我们可以把 corePoolSize 与 maximumPoolSize 比喻成长工与临时工，通常古代一个大户人家会有几个固定的长工，负责日常的工作，而大户人家起初肯定也是从零开始雇佣长工的。假如长工数量被老爷设定为 5 人，也就对应了 corePoolSize，不管这 5 个长工是忙碌还是空闲，都会一直在大户人家待着，可到了农忙或春节，长工的人手显然就不够用了，这时就需要雇佣更多的临时工，这些临时工就相当于在 corePoolSize 的基础上继续创建新线程，但临时工也是有上限的，也就对应了 maximumPoolSize，随着农忙或春节结束，老爷考虑到人工成本便会解约掉这些临时工，家里工人数量便会从 maximumPoolSize 降到 corePoolSize，所以老爷家的工人数量会一致保持在 corePoolSize 和 maximumPoolSize 的区间。",-1),A=c("",11);function b(f,T,g,v,w,C){const a=r("Image");return t(),m("div",null,[n,_,d,i(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/A3/CgoB5l3eH8mAAoJCAACEOKMHtpw036.png"}),o(),p,h,i(a,{alt:"",src:"https://s0.lgstatic.com/i/image6/M00/58/0F/Cgp9HWE7GMmAZ_OzAADmBM70EkI437.png"}),o(),u,P,z,S,k,x,i(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/C4/CgotOV3eIA2AY8DaAC4VmOi19V8654.gif"}),o(),A])}const Q=l(s,[["render",b]]);export{E as __pageData,Q as default};
