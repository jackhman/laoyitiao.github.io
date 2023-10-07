import{_ as p,j as e,o as t,g as c,k as o,h as a,Q as l,s}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"02背压机制：响应式流为什么能够提高系统的弹性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6984) 02  背压机制：响应式流为什么能够提高系统的弹性？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6984) 02  背压机制：响应式流为什么能够提高系统的弹性？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(6984) 02  背压机制：响应式流为什么能够提高系统的弹性？.md"},i=l("",7),E=s("p",null,"图 1 推模式下的数据流处理方式示意图",-1),y=s("p",null,"上图中，数据流的生产者会持续地生成数据并推送给消费者。这里就引出了流量控制问题，即如果数据的生产者和消费者处理数据的速度是不一致的，我们应该如何确保系统的稳定性呢？",-1),u=s("h4",{id:"流量控制",tabindex:"-1"},[a("流量控制 "),s("a",{class:"header-anchor",href:"#流量控制","aria-label":'Permalink to "流量控制"'},"​")],-1),d=s("p",null,"先来看第一种场景，即生产者生产数据的速率小于消费者的场景。在这种情况下，因为消费者消费数据没有任何压力，也就不需要进行流量的控制。",-1),_=s("p",null,"现实中，更多的是生产者生产数据的速率大于消费者消费数据的场景。这种情况比较复杂，因为消费者可能因为无法处理过多的数据而发生崩溃。针对这种情况的一种常见解决方案是在生产者和消费者之间添加一种类似于消息队列的机制。我们知道队列具有存储并转发的功能，所以可以由它来进行一定的流量控制，效果如下图所示。",-1),b=s("p",null,"图 2 添加队列机制之后的生产者/消费者场景示意图",-1),h=s("p",null,[a("现在，问题的关键就转变为"),s("strong",null,"如何设计一种合适的队列"),a("。通常，我们可以选择三种不同类型的队列来分别支持不同的功能特性。")],-1),g=s("p",null,[s("strong",null,"无界队列")],-1),A=s("p",null,"第一种最容易想到的队列就是无界队列（Unbounded Queue），这种队列原则上拥有无限大小的容量，可以存放所有生产者所生产的消息，如下图所示。",-1),F=s("p",null,"图 3 无界队列结构示意图",-1),q=s("p",null,"显然，无界队列的优势就是确保了所有消息都能得到消费，但显然会降低系统的回弹性，因为没有一个系统拥有无限的资源。一旦内存等资源被耗尽，系统可能就崩溃了。",-1),S=s("p",null,[s("strong",null,"有界丢弃队列")],-1),m=s("p",null,"与无界队列相对的，更合适的方案是选择一种有界队列。为了避免内存溢出，我们可以使用这样一个队列，一般队列的容量满了，就忽略后续传入的消息，如下图所示。",-1),v=s("p",null,"图 4 有界丢弃队列结构示意图",-1),C=s("p",null,"上图中，可以看出这个有界队列的容量为 6，所以第 7 和第 8 个元素被丢弃了。然后当消费者消费了一部分消息之后，队列出现了新的空闲位置，后续的消息就又被填充到队列中。当然，这里可以设置一些丢弃元素的策略，比方说按照优先级或先进先出等。",-1),T=s("p",null,"有界丢弃队列考虑了资源的限制，比较适合用于允许丢消息的业务场景，但在消息重要性很高的场景显然不可能采取这种队列。",-1),D=s("p",null,[s("strong",null,"有界阻塞队列")],-1),k=s("p",null,"如果需要确保消息不丢失，则需要引入有界阻塞队列。在这种队列中，我们会在队列消息数量达到上限后阻塞生产者，而不是直接丢弃消息，如下图所示。",-1),P=l("",24),f=l("",12);function B(x,I,R,V,j,N){const n=e("Image");return t(),c("div",null,[i,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/21/38/Cgp9HWBUIRCAHSoEAACQmzpsJME739.png"}),a(),E,y,u,d,_,o(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/21/35/CioPOWBUIRiAedZZAACVgTxgC80957.png"}),a(),b,h,g,A,o(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/21/38/Cgp9HWBUISGAJrh5AACOo3oalK8601.png"}),a(),F,q,S,m,o(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/21/35/CioPOWBUISqAal3JAACp2GTWvZM658.png"}),a(),v,C,T,D,k,o(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/21/38/Cgp9HWBUIUOAChJ1AACq6l5LR5Y136.png"}),a(),P,o(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/21/38/Cgp9HWBUIZqASTpVAADEEHREqvE168.png"}),a(),f])}const M=p(r,[["render",B]]);export{w as __pageData,M as default};
