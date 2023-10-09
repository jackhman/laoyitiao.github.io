import{_ as o,j as e,o as t,h as c,k as p,f as a,Q as l,s}from"./chunks/framework.d3daa342.js";const X=JSON.parse('{"title":"第52讲：信号量能被FixedThreadPool替代吗？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(290) 第52讲：信号量能被 FixedThreadPool 替代吗？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(290) 第52讲：信号量能被 FixedThreadPool 替代吗？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(290) 第52讲：信号量能被 FixedThreadPool 替代吗？.md"},E=l("",4),y=s("p",null,'从图中可以看出，信号量的一个最主要的作用就是，来控制那些需要限制并发访问量的资源。具体来讲，信号量会维护"许可证"的计数，而线程去访问共享资源前，必须先拿到许可证。线程可以从信号量中去"获取"一个许可证，一旦线程获取之后，信号量持有的许可证就转移过去了，所以信号量手中剩余的许可证要减一。',-1),i=s("p",null,'同理，线程也可以"释放"一个许可证，如果线程释放了许可证，这个许可证相当于被归还给信号量了，于是信号量中的许可证的可用数量加一。当信号量拥有的许可证数量减到 0 时，如果下个线程还想要获得许可证，那么这个线程就必须等待，直到之前得到许可证的线程释放，它才能获取。由于线程在没有获取到许可证之前不能进一步去访问被保护的共享资源，所以这就控制了资源的并发访问量，这就是整体思路。',-1),F=s("h4",{id:"应用实例、使用场景",tabindex:"-1"},[a("应用实例、使用场景 "),s("a",{class:"header-anchor",href:"#应用实例、使用场景","aria-label":'Permalink to "应用实例、使用场景"'},"​")],-1),d=s("p",null,[s("strong",null,"背景")],-1),h=s("p",null,"我们来看一个具体的场景：",-1),A=l("",8),u=s("p",null,'这张图的方框代表一个许可证为 3 的信号量，每一个绿色的长条代表一个许可证（permit）。现在我们拥有 3 个许可证，并且信号量的特点是非常"慷慨"，只要它持有许可证，别人想请求的话它都会分发的。假设此时 Thread 1 来请求了，在这种情况下，信号量就会把一个许可证给到这边的第一个线程 Thread 1。于是 Thread 1 获得了许可证，变成了下图这个样子：',-1),C=s("p",null,"Thread 1 拿到许可证之后就拥有了访问慢服务的资格，它紧接着就会去访问我们的慢服务，同时，我们的信号量手中持有的许可证也减为了 2。假设这个慢服务速度很慢，可能长时间内不返回，所以在没返回之前，Thread 1 也会不释放许可证，在此期间第二个线程又来请求了：",-1),D=s("p",null,"同理，此时由于信号量手中持有两个许可证，还是可以满足 Thread 2 的需求的，所以就把第二个许可证给了第二个线程。这样一来，第二个线程也拿到了我们的许可证，可以访问右边的慢服务了，如图所示：",-1),m=s("p",null,"同理，在前两个线程返回前，第三个线程也过来了，也是按照同样的方式获得了许可证，并且访问慢服务：",-1),_=s("p",null,[s("strong",null,"没许可证时，会阻塞前来请求的线程")],-1),g=s("p",null,'至此，我们信号量中的许可证已经没有了，因为原有的 3 个都分给这 3 个线程了。在这种情况下，信号量就可以进一步发挥作用了，此时假设第 4 个线程再来请求找我们信号量拿许可证，由于此时线程 1、线程 2、线程 3 都正在访问"慢服务"，还没归还许可证，而信号量自身也没有更多的许可证了，所以在这个时候就会发生这样的一种情况：',-1),B=s("p",null,'线程 4 在找我们用 acquire 方法请求许可证的时候，它会被阻塞，意味着线程 4 没有拿到许可证，也就没有被允许访问"慢服务"，也就是说此时"慢服务"依然只能被前面的 3 个线程访问，这样就达到我们最开始的目的了：限制同时最多有 3 个线程调用我们的慢服务。',-1),b=s("p",null,[s("strong",null,"有线程释放信号量后")],-1),T=s("p",null,'假设此时线程 1 因为最早去的，它执行完了这个任务，于是返回了。返回的时候它会调用 release 方法，表示"我处理完了我的任务，我想把许可证还回去"，所以，此时线程 1 就释放了之前持有的许可证，把它还给了我们的信号量，于是信号量所持有的许可证数量从 0 又变回了 1，如图所示：',-1),v=s("p",null,"此时由于许可证已经归还给了信号量，那么刚才找我们要许可证的线程 4 就可以顺利地拿到刚刚释放的这个许可证了。于是线程 4 也就拥有了访问慢服务的访问权，接下来它也会去访问这个慢服务。",-1),q=s("p",null,"不过要注意，此时线程 1 先归还了许可证给信号量，再由信号量把这个许可证转给线程 4，所以，此时同时访问慢服务的依然只有 3 个线程，分别是线程 2、3 和 4，因为之前的线程 1 已经完成任务并且离开了。",-1),k=s("p",null,[s("strong",null,"如果有两个线程释放许可证")],-1),x=s("p",null,"假设程序继续运行，随着时间推移，线程 2 和 3 同时执行完毕，然后释放手中的许可证。于是信号量又重新拥有了 2 个许可证，它会把许可证进一步发放给还有这个需求的线程 5 和线程 6，那么这两个线程也就能访问这个慢服务了：",-1),S=l("",39);function P(f,w,I,N,M,V){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/8A/Cgq2xl5fiViAS1xOAADHimTjAp0576.png"}),a(),y,i,F,d,h,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/89/CgpOIF5fiWSAf2upAABI13bn6cI788.png"}),a(),A,p(n,{alt:"Lark20210201-104823.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/16/CgpVE2AXbH-AFw9RAAA3ZTddKWM230.png"}),a(),u,p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/13/Cip5yGAXbXKAH4mUAABA9wLZKiU943.png"}),a(),C,p(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/94/1D/Ciqc1GAXbX6AFjv2AABA2iqm0P4371.png"}),a(),D,p(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/13/Cip5yGAXbYqASyiQAABDBXlUBo0090.png"}),a(),m,p(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/13/Cip5yGAXbbOAPDjlAABH5dhYwUU956.png"}),a(),_,g,p(n,{alt:"5.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/16/CgpVE2AXbcCAcWUpAABNWMJg-nw773.png"}),a(),B,b,T,p(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/16/CgpVE2AXbcqAH6L0AABWKo4i04w361.png"}),a(),v,q,p(n,{alt:"7.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/13/Cip5yGAXbeGAEJjWAABhGTcve38623.png"}),a(),k,x,p(n,{alt:"8.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/13/Cip5yGAXbeyAdTc5AABmeMiqFnc424.png"}),a(),S])}const U=o(r,[["render",P]]);export{X as __pageData,U as default};
