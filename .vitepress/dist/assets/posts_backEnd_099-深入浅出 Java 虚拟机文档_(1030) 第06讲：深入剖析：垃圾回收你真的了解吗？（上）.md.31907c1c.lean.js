import{_ as n,j as t,o,g as r,k as a,h as e,Q as p,s}from"./chunks/framework.4e7d56ce.js";const rs=JSON.parse('{"title":"标记（Mark） ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1030) 第06讲：深入剖析：垃圾回收你真的了解吗？（上）.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1030) 第06讲：深入剖析：垃圾回收你真的了解吗？（上）.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1030) 第06讲：深入剖析：垃圾回收你真的了解吗？（上）.md"},c=p("",20),_=s("br",null,null,-1),g=s("br",null,null,-1),d=s("p",null,"如图所示，圆圈代表的是对象。绿色的代表 GC Roots，红色的代表可以追溯到的对象。可以看到标记之后，仍然有多个灰色的圆圈，它们都是被回收的对象。",-1),h=s("h2",{id:"清除-sweep",tabindex:"-1"},[s("strong",null,"清除（Sweep）"),e(),s("a",{class:"header-anchor",href:"#清除-sweep","aria-label":'Permalink to "**清除（Sweep）**"'},"​")],-1),u=s("p",null,"清除阶段就是把未被标记的对象回收掉。",-1),b=s("br",null,null,-1),C=s("br",null,null,-1),m=s("br",null,null,-1),S=s("p",null,"但是这种简单的清除方式，有一个明显的弊端，那就是碎片问题。",-1),A=s("br",null,null,-1),T=s("p",null,"比如我申请了 1k、2k、3k、4k、5k 的内存。",-1),P=s("br",null,null,-1),G=s("br",null,null,-1),M=s("p",null,"由于某种原因 ，2k 和 4k 的内存，我不再使用，就需要交给垃圾回收器回收。",-1),E=s("br",null,null,-1),k=p("",12),X=s("p",null,"这种方式看似非常完美的，解决了碎片问题。但是，它的弊端也非常明显。它浪费了几乎一半的内存空间来做这个事情，如果资源本来就很有限，这就是一种无法容忍的浪费。",-1),v=s("h2",{id:"整理-compact",tabindex:"-1"},[s("strong",null,"整理（Compact）"),e(),s("a",{class:"header-anchor",href:"#整理-compact","aria-label":'Permalink to "**整理（Compact）**"'},"​")],-1),q=s("p",null,"其实，不用分配一个对等的额外空间，也是可以完成内存的整理工作。",-1),f=s("br",null,null,-1),y=s("p",null,"你可以把内存想象成一个非常大的数组，根据随机的 index 删除了一些数据。那么对整个数组的清理，其实是不需要另外一个数组来进行支持的，使用程序就可以实现。",-1),V=s("br",null,null,-1),J=s("p",null,"它的主要思路，就是移动所有存活的对象，且按照内存地址顺序依次排列，然后将末端内存地址以后的内存全部回收。",-1),I=s("br",null,null,-1),w=p("",25),x=s("br",null,null,-1),B=s("p",null,"从图中可以看到，大部分对象是朝生夕灭的，其他的则活的很久。",-1),F=s("br",null,null,-1),N=s("p",null,"现在的垃圾回收器，都会在物理上或者逻辑上，把这两类对象进行区分。我们把死的快的对象所占的区域，叫作年轻代（Young generation）。把其他活的长的对象所占的区域，叫作老年代（Old generation）。",-1),U=s("br",null,null,-1),R=s("p",null,"老年代在有些地方也会叫作 Tenured Generation，你在看到时明白它的意思就可以了。",-1),O=s("br",null,null,-1),j=s("h2",{id:"年轻代",tabindex:"-1"},[s("strong",null,"年轻代"),e(),s("a",{class:"header-anchor",href:"#年轻代","aria-label":'Permalink to "**年轻代**"'},"​")],-1),D=s("p",null,"年轻代使用的垃圾回收算法是复制算法。因为年轻代发生 GC 后，只会有非常少的对象存活，复制这部分对象是非常高效的。",-1),W=s("br",null,null,-1),L=s("p",null,"我们前面也了解到复制算法会造成一定的空间浪费，所以年轻代中间也会分很多区域。",-1),H=s("br",null,null,-1),Q=p("",15),Z=p("",29),z=p("",16),Y=p("",44),$=p("",21),K=p("",23);function ss(ls,as,ps,es,ns,ts){const l=t("Image");return o(),r("div",null,[c,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/D7/Ciqah16G0T-AG78xAAFEMVAUqPU670.png"}),_,g,d,h,u,b,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/D7/Ciqah16G0WeAOXhvAAEdzHAK-ss502.png"}),C,m,S,A,T,P,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/Cgq2xl4lQueAIYYUAAAXurRIE5I629.jpg"}),G,M,E,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/CgpOIF4lQueAd1-gAAAfdg7EPJc787.jpg"}),k,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/Cgq2xl4lQueABnuaAABW19PzhdM953.jpg"}),X,v,q,f,y,V,J,I,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/EE/Cgq2xl6G0imALanTAAD5NaTOELA648.png"}),e(),w,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/Cgq2xl4lQuiASUl3AABF6wBEPPY871.jpg"}),x,B,F,N,U,R,O,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/CgpOIF4lQuiAVSVuAAAspR1Zk98256.jpg"}),j,D,W,L,H,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/Cgq2xl4lQuiAHhjjAAAr3JIdyLA146.jpg"}),Q,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/CgpOIF4lQuiAPsIWAAA77GmNSlE020.jpg"}),Z,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/Cgq2xl4lQuiAM7ZPAABnAlb8gZ8269.jpg"}),z,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/CgpOIF4lQuiARGBMAABK3WeyAa4047.jpg"}),Y,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/Cgq2xl4lQuiAHmINAACWihcFScA929.jpg"}),$,a(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/73/CgpOIF4lQuiALAGsAABEEIX0EkE834.jpg"}),K])}const is=n(i,[["render",ss]]);export{rs as __pageData,is as default};
