import{_ as e,j as t,o,g as c,k as a,Q as p,s,h as l}from"./chunks/framework.4e7d56ce.js";const $s=JSON.parse('{"title":"2.1. 代码介绍 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1036) 第12讲：工具进阶：如何利用 MAT 找到问题发生的根本原因.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1036) 第12讲：工具进阶：如何利用 MAT 找到问题发生的根本原因.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1036) 第12讲：工具进阶：如何利用 MAT 找到问题发生的根本原因.md"},r=p("",22),E=s("br",null,null,-1),y=s("p",null,"点击对象，可以浏览对象的引用关系，这是一个非常有用的功能：",-1),d=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"outgoing references"),l(" 对象的引出")])]),s("li",null,[s("p",null,[s("strong",null,"incoming references"),l("对象的引入")])])],-1),u=s("p",null,[s("strong",null,"path to GC Roots"),l(" 这是快速分析的一个常用功能，显示和 GC Roots 之间的路径。")],-1),h=s("br",null,null,-1),_=s("br",null,null,-1),g=s("p",null,[l("另外一个比较重要的概念，就是"),s("strong",null,"浅堆"),l(" （Shallow Heap）和"),s("strong",null,"深堆"),l("（Retained Heap），在 MAT 上经常看到这两个数值。")],-1),b=s("br",null,null,-1),m=s("br",null,null,-1),A=s("p",null,'浅堆代表了对象本身的内存占用，包括对象自身的内存占用，以及"为了引用"其他对象所占用的内存。',-1),T=s("br",null,null,-1),v=s("p",null,[l('深堆是一个统计结果，会循环计算引用的具体对象所占用的内存。但是深堆和"对象大小"有一点不同，'),s("strong",null,"深堆指的是一个对象被垃圾回收后，能够释放的内存大小，这些被释放的对象集合，叫做保留集"),l("（Retained Set）。")],-1),M=s("br",null,null,-1),C=p("",10),D=s("br",null,null,-1),S=s("p",null,"如果你是在本地启动的示例代码，则可以使用 Accquire 的方式来获取堆快照。",-1),j=s("br",null,null,-1),w=s("h3",{id:"_2-2-内存泄漏检测",tabindex:"-1"},[l("2.2. 内存泄漏检测 "),s("a",{class:"header-anchor",href:"#_2-2-内存泄漏检测","aria-label":'Permalink to "2.2. 内存泄漏检测"'},"​")],-1),k=s("p",null,"如果问题特别突出，则可以通过 Find Leaks 菜单快速找出问题。",-1),R=s("br",null,null,-1),O=s("br",null,null,-1),f=s("p",null,"如下图所示，展示了名称叫做 huge-thread 的线程，持有了超过 96% 的对象，数据被一个 HashMap 所持有。",-1),F=s("br",null,null,-1),q=s("br",null,null,-1),B=s("p",null,"对于特别明显的内存泄漏，在这里能够帮助我们迅速定位，但通常内存泄漏问题会比较隐蔽，我们需要更加复杂的分析。",-1),I=s("h3",{id:"_2-3-支配树视图",tabindex:"-1"},[l("2.3. 支配树视图 "),s("a",{class:"header-anchor",href:"#_2-3-支配树视图","aria-label":'Permalink to "2.3. 支配树视图"'},"​")],-1),L=s("p",null,'支配树视图对数据进行了归类，体现了对象之间的依赖关系。如图，我们通常会根据"深堆"进行倒序排序，可以很容易的看到占用内存比较高的几个对象，点击前面的箭头，即可一层层展开支配关系。',-1),N=s("br",null,null,-1),H=s("p",null,"图中显示的是其中的 1 MB 数据，从左侧的 inspector 视图，可以看到这 1 MB 的 byte 数组具体内容。",-1),V=s("br",null,null,-1),x=s("br",null,null,-1),G=s("p",null,"从支配树视图同样能够找到我们创建的两个循环依赖，但它们并没有显示这个过程。",-1),P=s("br",null,null,-1),K=s("br",null,null,-1),J=s("p",null,"支配树视图的概念有一点点复杂，我们只需要了解这个概念即可。",-1),X=s("br",null,null,-1),Q=s("br",null,null,-1),U=s("p",null,'如上图，左边是引用关系，右边是支配树视图。可以看到 A、B、C 被当作是"虚拟"的根，支配关系是可传递的，因为 C 支配 E，E 支配 G，所以 C 也支配 G。',-1),W=s("br",null,null,-1),z=s("p",null,"另外，到对象 C 的路径中，可以经过 A，也可以经过 B，因此对象 C 的直接支配者也是根对象。同理，对象 E 是 H 的支配者。",-1),$=s("br",null,null,-1),Y=s("p",null,"我们再来看看比较特殊的 D 和 F。对象 F 与对象 D 相互引用，因为到对象 F 的所有路径必然经过对象 D，因此，对象 D 是对象 F 的直接支配者。",-1),Z=s("br",null,null,-1),ss=s("p",null,"可以看到支配树视图并不一定总是能看到对象的真实应用关系，但对我们分析问题的影响并不是很大。",-1),ns=s("br",null,null,-1),as=s("p",null,"这个视图是非常好用的，甚至可以根据 package 进行归类，对目标类的查找也是非常快捷的。",-1),ls=s("br",null,null,-1),ps=p("",5),es=s("h3",{id:"_2-4-线程视图",tabindex:"-1"},[l("2.4. 线程视图 "),s("a",{class:"header-anchor",href:"#_2-4-线程视图","aria-label":'Permalink to "2.4. 线程视图"'},"​")],-1),ts=s("p",null,"想要看具体的引用关系，可以通过线程视图。我们在第 5 讲，就已经了解了线程其实是可以作为 GC Roots 的。如图展示了线程内对象的引用关系，以及方法调用关系，相对比 jstack 获取的栈 dump，我们能够更加清晰地看到内存中具体的数据。",-1),os=s("br",null,null,-1),cs=s("p",null,"如下图，我们找到了 huge-thread，依次展开找到 holder 对象，可以看到循环依赖已经陷入了无限循环的状态。这在查看一些 Java 对象的时候，经常发生，不要感到奇怪。",-1),is=s("h3",{id:"_2-5-柱状图视图",tabindex:"-1"},[l("2.5. 柱状图视图 "),s("a",{class:"header-anchor",href:"#_2-5-柱状图视图","aria-label":'Permalink to "2.5. 柱状图视图"'},"​")],-1),rs=s("p",null,"我们返回头来再看一下柱状图视图，可以看到除了对象的大小，还有类的实例个数。结合 MAT 提供的不同显示方式，往往能够直接定位问题。也可以通过正则过滤一些信息，我们在这里输入 MAT，过滤猜测的、可能出现问题的类，可以看到，创建的这些自定义对象，不多不少正好一百个。",-1),Es=s("br",null,null,-1),ys=s("br",null,null,-1),ds=s("p",null,"右键点击类，然后选择 incoming，这会列出所有的引用关系。",-1),us=s("br",null,null,-1),hs=s("br",null,null,-1),_s=s("p",null,'再次选择某个引用关系，然后选择菜单"Path To GC Roots"，即可显示到 GC Roots 的全路径。通常在排查内存泄漏的时候，会选择排除虚弱软等引用。',-1),gs=s("br",null,null,-1),bs=s("br",null,null,-1),ms=s("p",null,"使用这种方式，即可在引用之间进行跳转，方便的找到所需要的信息。",-1),As=s("br",null,null,-1),Ts=s("br",null,null,-1),vs=s("p",null,"再介绍一个比较高级的功能。",-1),Ms=s("br",null,null,-1),Cs=s("p",null,[l('我们对于堆的快照，其实是一个"'),s("strong",null,"瞬时态"),l('"，有时候仅仅分析这个瞬时状态，并不一定能确定问题，这就需要对两个或者多个快照进行对比，来确定一个增长趋势。')],-1),Ds=s("br",null,null,-1),Ss=s("br",null,null,-1),js=s("p",null,"可以将代码中的 100 改成 10 或其他数字，再次 dump 一份快照进行比较。如图，通过分析某类对象的增长，即可辅助问题定位。",-1),ws=s("ol",{start:"3"},[s("li",null,"高级功能---OQL")],-1),ks=s("hr",null,null,-1),Rs=s("p",null,"MAT 支持一种类似于 SQL 的查询语言 OQL（Object Query Language），这个查询语言 VisualVM 工具也支持。",-1),Os=s("br",null,null,-1),fs=p("",37),Fs=s("br",null,null,-1),qs=s("p",null,[l("OQL 有比较多的语法和用法，若想深入了解，"),s("a",{href:"http://tech.novosoft-us.com/products/oql_book.htm",target:"_blank",rel:"noreferrer"},"可参考"),s("a",{href:"http://tech.novosoft-us.com/products/oql_book.htm",target:"_blank",rel:"noreferrer"},"这里"),l("。")],-1),Bs=s("br",null,null,-1),Is=s("p",null,"一般，我们使用上面这些简单的查询语句就够用了。",-1),Ls=s("br",null,null,-1),Ns=s("p",null,"OQL 还有一个好处，就是可以分享。如果你和同事同时在分析一个大堆，不用告诉他先点哪一步、再点哪一步，共享给他一个 OQL 语句就可以了。",-1),Hs=s("br",null,null,-1),Vs=s("p",null,"如下图，MAT 贴心的提供了复制 OQL 的功能，但是用在其他快照上，不会起作用，因为它复制的是如下的内容。",-1),xs=s("br",null,null,-1),Gs=p("",24);function Ps(Ks,Js,Xs,Qs,Us,Ws){const n=t("Image");return o(),c("div",null,[r,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsiAGcDYAAGoA74s9J4470.jpg"}),E,y,d,u,h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsiAF2UoAACXuKqZ_nE086.jpg"}),_,g,b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmADmSUAADHVcry3i0679.jpg"}),m,A,T,v,M,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmAEeWTAABDIx8RWa4815.png"}),C,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmAC91XAABbohWGa5g179.png"}),D,S,j,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmAe6KpAADnQ4RiJB0172.jpg"}),w,k,R,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmAXR8iAADltd6bubA950.jpg"}),O,f,F,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmAY8daAACqOrzPq-0668.jpg"}),q,B,I,L,N,H,V,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmAK6e-AAHIVUhKKVo936.jpg"}),x,G,P,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmANxVwAAEHUj82zng151.jpg"}),K,J,X,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmATfB_AACo8ZKxSls467.png"}),Q,U,W,z,$,Y,Z,ss,ns,as,ls,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAL2HLAAC_bwnowFA744.jpg"}),ps,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsqAG2bqAAE8ffV3Y6A856.jpg"}),es,ts,os,cs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAGh2eAAFzWwgR_5s636.jpg"}),is,rs,Es,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsqAZeYkAACXjbBqX-w528.jpg"}),ys,ds,us,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAcbX0AADCFqtn7Cc159.jpg"}),hs,_s,gs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsqAY5P_AAEJNoYbh2g934.jpg"}),bs,ms,As,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAN7ItAABgU-qJaX4743.jpg"}),Ts,vs,Ms,Cs,Ds,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsuAXIf7AADdHx0K1xc241.jpg"}),Ss,js,ws,ks,Rs,Os,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsuAFXehAAC0TcFd7Zs280.jpg"}),fs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsuAMARGAACW6OEtUPs910.jpg"}),Fs,qs,Bs,Is,Ls,Ns,Hs,Vs,xs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsuAP-J5AAEx2z68KT4959.jpg"}),Gs])}const Ys=e(i,[["render",Ps]]);export{$s as __pageData,Ys as default};
