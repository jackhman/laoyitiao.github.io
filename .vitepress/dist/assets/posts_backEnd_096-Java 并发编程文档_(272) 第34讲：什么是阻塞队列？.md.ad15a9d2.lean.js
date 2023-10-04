import{_ as l,j as t,o as p,g as c,k as a,Q as o,s,h as n}from"./chunks/framework.e0c66c3f.js";const S=JSON.parse('{"title":"阻塞队列的作用 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(272) 第34讲：什么是阻塞队列？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(272) 第34讲：什么是阻塞队列？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(272) 第34讲：什么是阻塞队列？.md"},i=o("",6),u=s("p",null,"在图中，左侧有三个生产者线程，它会把生产出来的结果放到中间的阻塞队列中，而右侧的三个消费者也会从阻塞队列中取出它所需要的内容并进行处理。因为阻塞队列是线程安全的，所以生产者和消费者都可以是多线程的，不会发生线程安全问题。",-1),d=s("p",null,'既然队列本身是线程安全的，队列可以安全地从一个线程向另外一个线程传递数据，所以我们的生产者/消费者直接使用线程安全的队列就可以，而不需要自己去考虑更多的线程安全问题。这也就意味着，考虑锁等线程安全问题的重任从"你"转移到了"队列"上，降低了我们开发的难度和工作量。',-1),_=s("p",null,"同时，队列它还能起到一个隔离的作用。比如说我们开发一个银行转账的程序，那么生产者线程不需要关心具体的转账逻辑，只需要把转账任务，如账户和金额等信息放到队列中就可以，而不需要去关心银行这个类如何实现具体的转账业务。而作为银行这个类来讲，它会去从队列里取出来将要执行的具体的任务，再去通过自己的各种方法来完成本次转账。",-1),E=s("p",null,"这样就实现了具体任务与执行任务类之间的解耦，任务被放在了阻塞队列中，而负责放任务的线程是无法直接访问到我们银行具体实现转账操作的对象的，实现了隔离，提高了安全性。",-1),y=s("h3",{id:"主要并发队列关系图",tabindex:"-1"},[n("主要并发队列关系图 "),s("a",{class:"header-anchor",href:"#主要并发队列关系图","aria-label":'Permalink to "主要并发队列关系图"'},"​")],-1),h=o("",11),g=s("h4",{id:"put-方法",tabindex:"-1"},[n("put 方法 "),s("a",{class:"header-anchor",href:"#put-方法","aria-label":'Permalink to "put 方法"'},"​")],-1),k=s("p",null,"put 方法插入元素时，如果队列没有满，那就和普通的插入一样是正常的插入，但是如果队列已满，那么就无法继续插入，则阻塞，直到队列里有了空闲空间。如果后续队列有了空闲空间，比如消费者消费了一个元素，那么此时队列就会解除阻塞状态，并把需要添加的数据添加到队列中。过程如图所示：",-1),A=s("p",null,"以上过程中的阻塞和解除阻塞，都是 BlockingQueue 完成的，不需要我们自己处理。",-1),Q=s("h4",{id:"是否有界-容量有多大",tabindex:"-1"},[n("是否有界（容量有多大） "),s("a",{class:"header-anchor",href:"#是否有界-容量有多大","aria-label":'Permalink to "是否有界（容量有多大）"'},"​")],-1),b=s("p",null,"此外，阻塞队列还有一个非常重要的属性，那就是容量的大小，分为有界和无界两种。",-1),m=s("p",null,"无界队列意味着里面可以容纳非常多的元素，例如 LinkedBlockingQueue 的上限是 Integer.MAX_VALUE，约为 2 的 31 次方，是非常大的一个数，可以近似认为是无限容量，因为我们几乎无法把这个容量装满。",-1),D=s("p",null,"但是有的阻塞队列是有界的，例如 ArrayBlockingQueue 如果容量满了，也不会扩容，所以一旦满了就无法再往里放数据了。",-1),v=s("p",null,"以上就是本课时的全部内容，本课时讲解了什么是阻塞队列，首先我们讲解了阻塞队列的作用；然后看了 Java 8 中的并发队列，分为阻塞队列和非阻塞队列，并且在阻塞队列中有 6 种常见的实现；最后我们看了阻塞队列的特点，包括 take 方法、put 方法和是否有界。",-1);function B(f,C,F,q,x,T){const e=t("Image");return p(),c("div",null,[i,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/Cgq2xl4le8SAYKHDAABbO_HZa9c237.png"}),u,d,_,E,y,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/Cgq2xl4le9SAL6enAAGpXZi8Wcg079.jpg"}),h,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/Cgq2xl4le_eAafhbAABp-t8dt_8312.png"}),g,k,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/CgpOIF4lfAyAC4zxAAB1UtAAltk817.png"}),A,Q,b,m,D,v])}const V=l(r,[["render",B]]);export{S as __pageData,V as default};
