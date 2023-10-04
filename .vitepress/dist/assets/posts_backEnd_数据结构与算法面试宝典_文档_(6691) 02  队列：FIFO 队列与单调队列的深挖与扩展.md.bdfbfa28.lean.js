import{_ as o,j as e,o as t,g as c,k as n,h as l,Q as a,s as p}from"./chunks/framework.e0c66c3f.js";const ss=JSON.parse('{"title":"FIFO 队列 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6691) 02  队列：FIFO 队列与单调队列的深挖与扩展.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6691) 02  队列：FIFO 队列与单调队列的深挖与扩展.md","lastUpdated":null}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6691) 02  队列：FIFO 队列与单调队列的深挖与扩展.md"},E=a("",2),y=a("",5),i=a("",6),A=a("",5),F=a("",13),g=a("",17),u=a("",5),D=a("",11),d=a("",4),_=p("p",null,[l("【"),p("strong",null,"题目扩展"),l(' 】切忌盲目刷题，其实只要吃透一道题，就可以解决很多类似的题目。只要掌握分层遍历的技巧，以后再碰到类似的题目，就再也难不住你了。这里我为你总结了一张关于"'),p("strong",null,"二叉树的层次遍历"),l('"的解题技巧，如下图所示：')],-1),C=a("",7),h=a("",15),m=a("",20),b=a("",5),v=p("p",null,"FIFO 队列",-1),B=a("",8),f=a("",12),k=a("",11),T=p("p",null,"Step 1. 元素 3 入队，此时队首元素为 3，表示着区间[3]最大值为 3。",-1),Q=p("p",null,"Step 2. 元素 2 入队，此时队列首元素为 3，表示区间[3,2]最大值为 3。",-1),S=p("p",null,[l("Step 3. 元素 5 入队，此时队首元素为 5，此时队列覆盖范围长度为 3，可以得到"),p("strong",null,"区间 [3,2,5] 最大值为 5。")],-1),I=p("p",null,"继续执行入队，想必你也能得出结论了：在没有出队的情况下，黄色覆盖范围会一直增加，队首元素就表示这个黄色覆盖范围的最大值。",-1),L=p("p",null,"下面我们再来看出队与入队混合的情况。在上图 Step3 的基础上，如果再把 A[3] = 6 入队，这个时候，队列的覆盖范围长度为 4，假设我们想控制这个覆盖范围长度为 3，应该怎么办？",-1),P=p("p",null,"此时，我们只需要将 A[0] 出队即可。如下图所示：",-1),q=a("",12),N=p("p",null,[l("【"),p("strong",null,"分析"),l(" 】这是一道来自 "),p("strong",null,"eBay"),l(" 的面试题。拿到时题目之后，可以发现，题目要求还是比较赤裸裸的，不妨先模拟一下，看看能不能想到比较好的解决办法。")],-1),x=p("p",null,[p("strong",null,"1. 模拟")],-1),O=p("p",null,[l("首先我们发现窗口在滑动的时候，有元素不停地进出。因此，可以采用"),p("strong",null,"队列"),l(" 来试一下。由于窗口长度为 3，所以将队列的长度固定为 3。")],-1),w=a("",20),V=p("p",null,[l("假设执行到 A[2] = 3 时，采用"),p("strong",null,"严格单调递减（队列中相等的元素也会被踢出去）"),l("，入队时，A[2] 将会把所有的元素都踢出队列，队列变成 [3]，那么可以得到 [3,2,3] 的最大值为 3。")],-1),R=p("p",null,"但是由于窗口滑动的时候，接着需要把 A[0] = 3 出队，出队之后，队列为空。然后再将 A[3] = 1 入队得到。",-1),M=a("",23),j=a("",4),W=a("",8),z=a("",24),H=a("",8);function J(U,Y,K,X,Z,G){const s=e("Image");return t(),c("div",null,[E,n(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/11/0A/Cgp9HWA_RiuASOCMAACEYQ4Rhu8096.png"}),y,n(s,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M00/11/0B/Cgp9HWA_RuiAYzgpAADIHD6hfoY449.gif"}),i,n(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/11/08/CioPOWA_RwyAWm07AACF5LV9ej0062.png"}),A,n(s,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/11/08/CioPOWA_RyiAQ0IkAAbQTq2M1V8935.gif"}),F,n(s,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M01/11/0C/Cgp9HWA_R4WADJ8eACXiUG8cfgY721.gif"}),g,n(s,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image6/M01/11/09/CioPOWA_R6aAdoJvAACnbi7IL-c504.png"}),u,n(s,{alt:"4.gif",src:"https://s0.lgstatic.com/i/image6/M00/11/09/CioPOWA_R9eAb3DqAA5cp3pt5r8391.gif"}),D,n(s,{alt:"Drawing 30.png",src:"https://s0.lgstatic.com/i/image6/M00/11/09/CioPOWA_SB2AMn_VAACXDtKnvt4099.png"}),d,n(s,{alt:"Drawing 33.png",src:"https://s0.lgstatic.com/i/image6/M00/11/0C/Cgp9HWA_SC2AdwWAAADBBGybQP0811.png"}),_,n(s,{alt:"Drawing 35.png",src:"https://s0.lgstatic.com/i/image6/M01/11/0C/Cgp9HWA_SEGALU-UAADmDhvBE6M451.png"}),C,n(s,{alt:"Drawing 36.png",src:"https://s0.lgstatic.com/i/image6/M01/11/0C/Cgp9HWA_SF2AEV3pAADK0cYKmv8794.png"}),h,n(s,{alt:"Drawing 38.png",src:"https://s0.lgstatic.com/i/image6/M01/11/09/CioPOWA_SHeAP85DAADKwUx6Fio771.png"}),m,n(s,{alt:"Drawing 41.png",src:"https://s0.lgstatic.com/i/image6/M01/11/09/CioPOWA_SIqAG7qhAADoVzWnab0092.png"}),b,n(s,{alt:"Drawing 42.png",src:"https://s0.lgstatic.com/i/image6/M01/11/09/CioPOWA_SJeAYvJTAAB3ffWmPoY742.png"}),l(),v,n(s,{alt:"Drawing 44.png",src:"https://s0.lgstatic.com/i/image6/M01/11/09/CioPOWA_SKmAJflUAACNz8oT0A8471.png"}),l(),B,n(s,{alt:"5.gif",src:"https://s0.lgstatic.com/i/image6/M01/11/0D/Cgp9HWA_SLyAEHB2AEJPbY2MLoE581.gif"}),f,n(s,{alt:"6.gif",src:"https://s0.lgstatic.com/i/image6/M00/11/0A/CioPOWA_SQOAZRMRABqVn-_iVoo720.gif"}),k,n(s,{alt:"7.gif",src:"https://s0.lgstatic.com/i/image6/M01/11/0D/Cgp9HWA_STiAcHJnAAmEZ9koVKA128.gif"}),T,Q,S,I,L,P,n(s,{alt:"8.gif",src:"https://s0.lgstatic.com/i/image6/M01/11/0E/Cgp9HWA_SX6ADn1yAAlfQannP2I331.gif"}),l(),q,n(s,{alt:"Drawing 68.png",src:"https://s0.lgstatic.com/i/image6/M00/11/12/Cgp9HWA_S1aAJXv9AABKF_TFCN8607.png"}),N,x,O,n(s,{alt:"9.gif",src:"https://s0.lgstatic.com/i/image6/M00/11/0C/CioPOWA_ScmAQ8ZYAAoV9uo-AJQ439.gif"}),w,n(s,{alt:"Drawing 76.png",src:"https://s0.lgstatic.com/i/image6/M00/11/13/Cgp9HWA_TDqAU-urAADUKwAZCHk961.png"}),V,R,n(s,{alt:"Drawing 78.png",src:"https://s0.lgstatic.com/i/image6/M00/11/13/Cgp9HWA_TEyAfSBRAADZkvnyEtw271.png"}),M,n(s,{alt:"Drawing 80.png",src:"https://s0.lgstatic.com/i/image6/M00/11/13/Cgp9HWA_S4SAXevyAABpi3LNISI737.png"}),j,n(s,{alt:"10.gif",src:"https://s0.lgstatic.com/i/image6/M01/11/13/Cgp9HWA_TACALWYlAB5Uh_D8ZdQ298.gif"}),W,n(s,{alt:"11.gif",src:"https://s0.lgstatic.com/i/image6/M00/11/13/Cgp9HWA_TH6AUMlAAB3Xvu5uEzw814.gif"}),z,n(s,{alt:"Drawing 98.png",src:"https://s0.lgstatic.com/i/image6/M00/11/10/CioPOWA_TLCATeR6AAFTfMBlaiw858.png"}),H])}const ns=o(r,[["render",J]]);export{ss as __pageData,ns as default};
