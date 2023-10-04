import{_ as e,j as i,o as c,g as r,k as l,Q as s,s as n,h as o}from"./chunks/framework.e0c66c3f.js";const st=JSON.parse('{"title":"synchronized","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1862) 第08讲：既生 Synchronized，何生 ReentrantLock.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1862) 第08讲：既生 Synchronized，何生 ReentrantLock.md","lastUpdated":1696338709000}'),a={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1862) 第08讲：既生 Synchronized，何生 ReentrantLock.md"},_=s("",5),h=n("br",null,null,-1),d=n("p",null,"这种情况下的锁对象是当前实例对象，因此只有同一个实例对象调用此方法才会产生互斥效果，不同实例对象之间不会有互斥效果。比如如下代码：",-1),u=n("br",null,null,-1),p=n("br",null,null,-1),g=n("p",null,"上述代码，在不同的线程中调用的是不同对象的 printLog 方法，因此彼此之间不会有排斥。运行效果如下：",-1),A=n("br",null,null,-1),m=n("br",null,null,-1),b=n("p",null,"可以看出，两个线程是交互执行的。",-1),C=n("br",null,null,-1),k=n("p",null,"如果将代码进行如下修改，两个线程调用同一个对象的 printLog 方法：",-1),z=n("br",null,null,-1),y=n("br",null,null,-1),R=n("p",null,"则执行效果如下：",-1),L=n("br",null,null,-1),x=n("br",null,null,-1),M=n("p",null,"可以看出：只有某一个线程中的代码执行完之后，才会调用另一个线程中的代码。也就是说此时两个线程间是互斥的。",-1),X=n("h3",{id:"修饰静态类方法",tabindex:"-1"},[o("修饰静态类方法 "),n("a",{class:"header-anchor",href:"#修饰静态类方法","aria-label":'Permalink to "修饰静态类方法"'},"​")],-1),q=n("p",null,"如果 synchronized 修饰的是静态方法，则锁对象是当前类的 Class 对象。因此即使在不同线程中调用不同实例对象，也会有互斥效果。",-1),f=n("br",null,null,-1),E=n("p",null,"将 LagouSynchronizedMehtods 中的 printLog 修改为静态方法，如下：",-1),S=n("br",null,null,-1),P=n("br",null,null,-1),V=n("p",null,"执行后的打印效果如下：",-1),T=n("br",null,null,-1),I=n("br",null,null,-1),v=n("p",null,"可以看出，两个线程还是依次执行的。",-1),W=n("h3",{id:"synchronized-修饰代码块",tabindex:"-1"},[o("synchronized 修饰代码块 "),n("a",{class:"header-anchor",href:"#synchronized-修饰代码块","aria-label":'Permalink to "synchronized 修饰代码块"'},"​")],-1),N=n("p",null,"除了直接修饰方法之外，synchronized 还可以作用于代码块，如下代码所示：",-1),D=n("br",null,null,-1),O=n("br",null,null,-1),B=n("p",null,"synchronized 作用于代码块时，锁对象就是跟在后面括号中的对象。上图中可以看出任何 Object 对象都可以当作锁对象。",-1),G=n("h3",{id:"实现细节",tabindex:"-1"},[o("实现细节 "),n("a",{class:"header-anchor",href:"#实现细节","aria-label":'Permalink to "实现细节"'},"​")],-1),H=n("p",null,"synchronized 既可以作用于方法，也可以作用于某一代码块。但在实现上是有区别的。 比如如下代码，使用 synchronized 作用于代码块：",-1),K=n("br",null,null,-1),Q=n("br",null,null,-1),Y=n("p",null,"使用 javap 查看上述 test1 方法的字节码，可以看出，编译而成的字节码中会包含 monitorenter 和 monitorexit 这两个字节码指令。如下所示：",-1),j=n("br",null,null,-1),Z=n("br",null,null,-1),w=n("p",null,"你可能已经发现了，上面字节码中有 1 个 monitorenter 和 2 个 monitorexit。这是因为虚拟机需要保证当异常发生时也能释放锁。因此 2 个 monitorexit 一个是代码正常执行结束后释放锁，一个是在代码执行异常时释放锁。",-1),J=n("br",null,null,-1),U=n("p",null,"再看下 synchronized 修饰方法有哪些区别：",-1),F=n("br",null,null,-1),$=n("br",null,null,-1),nn=n("p",null,"从图中可以看出，被 synchronized 修饰的方法在被编译为字节码后，在方法的 flags 属性中会被标记为 ACC_SYNCHRONIZED 标志。当虚拟机访问一个被标记为 ACC_SYNCHRONIZED 的方法时，会自动在方法的开始和结束（或异常）位置添加 monitorenter 和 monitorexit 指令。",-1),tn=n("br",null,null,-1),ln=n("p",null,"关于 monitorenter 和 monitorexit，可以理解为一把具体的锁。在这个锁中保存着两个比较重要的属性：计数器和指针。",-1),on=n("ul",null,[n("li",null,[n("p",null,"计数器代表当前线程一共访问了几次这把锁；")]),n("li",null,[n("p",null,"指针指向持有这把锁的线程。")])],-1),sn=n("p",null,"用一张图表示如下：",-1),en=n("br",null,null,-1),cn=n("br",null,null,-1),rn=n("p",null,"锁计数器默认为0，当执行monitorenter指令时，如锁计数器值为0 说明这把锁并没有被其它线程持有。那么这个线程会将计数器加1，并将锁中的指针指向自己。当执行monitorexit指令时，会将计数器减1。",-1),an=n("h1",{id:"reentrantlock",tabindex:"-1"},[o("ReentrantLock "),n("a",{class:"header-anchor",href:"#reentrantlock","aria-label":'Permalink to "ReentrantLock"'},"​")],-1),_n=n("h3",{id:"reentrantlock-基本使用",tabindex:"-1"},[o("ReentrantLock 基本使用 "),n("a",{class:"header-anchor",href:"#reentrantlock-基本使用","aria-label":'Permalink to "ReentrantLock 基本使用"'},"​")],-1),hn=n("p",null,"ReentrantLock 的使用同 synchronized 有点不同，它的加锁和解锁操作都需要手动完成，如下所示：",-1),dn=n("br",null,null,-1),un=n("br",null,null,-1),pn=n("p",null,"图中 lock() 和 unlock() 分别是加锁和解锁操作。运行效果如下：",-1),gn=n("br",null,null,-1),An=n("br",null,null,-1),mn=n("p",null,"可以看出，使用 ReentrantLock 也能实现同 synchronized 相同的效果。",-1),bn=n("br",null,null,-1),Cn=n("blockquote",null,[n("p",null,"你可能已经注意到，在上面 ReentrantLock 的使用中，我将 unlock 操作放在 finally 代码块中。这是因为 ReentrantLock 与 synchronized 不同，当异常发生时 synchronized 会自动释放锁，但是 ReentrantLock 并不会自动释放锁。因此好的方式是将 unlock 操作放在 finally 代码块中，保证任何时候锁都能够被正常释放掉。")],-1),kn=n("h3",{id:"公平锁实现",tabindex:"-1"},[o("公平锁实现 "),n("a",{class:"header-anchor",href:"#公平锁实现","aria-label":'Permalink to "公平锁实现"'},"​")],-1),zn=n("p",null,"ReentrantLock 有一个带参数的构造器，如下：",-1),yn=n("br",null,null,-1),Rn=n("br",null,null,-1),Ln=n("p",null,"默认情况下，synchronized 和 ReentrantLock 都是非公平锁。但是 ReentrantLock 可以通过传入 true 来创建一个公平锁。所谓公平锁就是通过同步队列来实现多个线程按照申请锁的顺序获取锁。",-1),xn=n("br",null,null,-1),Mn=n("p",null,"公平锁使用实例如下：",-1),Xn=n("br",null,null,-1),qn=n("br",null,null,-1),fn=n("p",null,"运行效果如下：",-1),En=n("br",null,null,-1),Sn=s("",14),Pn=n("br",null,null,-1),Vn=n("ol",{start:"2"},[n("li",null,"通过读写锁对象分别获取读锁（ReadLock）和写锁（WriteLock）：")],-1),Tn=n("br",null,null,-1),In=n("br",null,null,-1),vn=n("ol",{start:"3"},[n("li",null,"使用读锁（ReadLock）同步缓存的读操作，使用写锁（WriteLock）同步缓存的写操作：")],-1),Wn=n("br",null,null,-1),Nn=n("br",null,null,-1),Dn=n("p",null,"具体实现，参考如下代码片段：",-1),On=n("br",null,null,-1),Bn=n("br",null,null,-1),Gn=n("p",null,"解释说明：",-1),Hn=n("ul",null,[n("li",null,[n("p",null,"图中的 number 是线程中共享的数据，用来模拟缓存数据；")]),n("li",null,[n("p",null,"图中①处，分别创建 2 个 Reader 线程并从缓存中读取数据，和 1 个 Writer 将数据写入缓存中；")]),n("li",null,[n("p",null,"图中②处，使用读锁（ReadLock）将读取数据的操作加锁；")]),n("li",null,[n("p",null,"图中③处，使用写锁（WriteLock）将写入数据到缓存中的操作加锁。")])],-1),Kn=n("p",null,"上述代码执行效果如下：",-1),Qn=n("br",null,null,-1),Yn=n("br",null,null,-1),jn=n("p",null,"仔细查看日志，可以看出当写入操作在执行时，读取数据的操作会被阻塞。当写入操作执行成功后，读取数据的操作继续执行，并且读取的数据也是最新写入后的实时数据。",-1),Zn=n("h1",{id:"总结",tabindex:"-1"},[o("总结 "),n("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),wn=n("p",null,"这课时我们主要学习了 Java 中两个实现同步的方式 synchronized 和 ReentrantLock。其中 synchronized 使用更简单，加锁和释放锁都是由虚拟机自动完成，而 ReentrantLock 需要开发者手动去完成。但是很显然 ReentrantLock 的使用场景更多，公平锁还有读写锁都可以在复杂场景中发挥重要作用。",-1);function Jn(Un,Fn,$n,nt,tt,lt){const t=i("Image");return c(),r("div",null,[_,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-CGAVC61AABX0U421kk161.png"}),h,d,u,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-CGAX3UPAALcuyvYTr0464.png"}),p,g,A,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-CGAcrKiAAHaIMHzqvs482.png"}),m,b,C,k,z,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-CGAXyrZAAK14-hA_p0053.png"}),y,R,L,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-CKADxv6AAK2n8Hb_oI699.png"}),x,M,X,q,f,E,S,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-CKAdo5PAAGlZwFDsJM251.png"}),P,V,T,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-CKAa6FcAAJ44oCVs3Q021.png"}),I,v,W,N,D,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-CKAV1oUAAGejxzGQ6g680.png"}),O,B,G,H,K,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-CKAZaaeAABaozQldl0900.png"}),Q,Y,j,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-COAC4hMAAEjW40t64s500.png"}),Z,w,J,U,F,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-COACexhAAD00Tr1LPM127.png"}),$,nn,tn,ln,on,sn,en,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-COAEskYAABd1Qkprak432.png"}),cn,rn,an,_n,hn,dn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-COAM0TsAAHIQYMakhA463.png"}),un,pn,gn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-COAO3ZBAAClbs36w3w694.png"}),An,mn,bn,Cn,kn,zn,yn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-CSAAdUqAACzsvj2pFg758.png"}),Rn,Ln,xn,Mn,Xn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-CSAR23jAAG2SZgQKY0744.png"}),qn,fn,En,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-CSAR8MxAAI0mD5blog517.png"}),Sn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-CSAfAiHAAAlGuwPEXA557.png"}),Pn,Vn,Tn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-CWAEmShAAApkBH8nBM233.png"}),In,vn,Wn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/78/Ciqah16X-CWAHTM4AACOosEvECg851.png"}),Nn,Dn,On,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/8E/Cgq2xl6X-CWAYv9FAATloxYxrXs824.png"}),Bn,Gn,Hn,Kn,Qn,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/49/CgoCgV6X-CaAdEWVAAI1D9-ghzQ492.png"}),Yn,jn,Zn,wn])}const et=e(a,[["render",Jn]]);export{st as __pageData,et as default};
