import{_ as e,j as o,o as t,h as c,k as a,f as l,Q as p,s}from"./chunks/framework.d3daa342.js";const Q=JSON.parse('{"title":"第09讲：高频真题解析II","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(37) 第09讲：高频真题解析 II.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(37) 第09讲：高频真题解析 II.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(37) 第09讲：高频真题解析 II.md"},r=p("",16),E=s("ol",null,[s("li",null,[s("p",null,"情况一：两个区间没有任何重叠的部分，因此区间不会发生融合。")]),s("li",null,[s("p",null,"情况二和三：区间有重叠。"),s("ol",null,[s("li",null,[s("p",null,"新区间的起始时间是 a 的起始时间，这个不变；")]),s("li",null,[s("p",null,"新区间的终止时间是 a 的终止时间和 b 的终止时间的最大值，这个就是融合两个区间的最基本的思想。")])])])],-1),y=s("p",null,"给定了 n 个区间，如何有效地融合它们呢？以下是一种很直观也是非常有效的做法。",-1),u=p("",37),h=s("ol",null,[s("li",null,[s("p",null,"如果只考虑保留 B 的情况，而不考虑把 B 删除的情况，那么就会错过一个答案，因为在这个情况下，把 B 删除，只剩下 A 和 C，它们互不重叠，也能得到最优的解。")]),s("li",null,[s("p",null,"遇到 A 和 B 相互重叠的情况时，必须要考虑把 B 删除掉。")])],-1),d=s("p",null,"为什么不把 A 删除呢？因为如果把 A 删了，B 和 C 还是可能会重叠，则需要删除掉更多的区间，不满足题目要求。",-1),g=p("",10),f=s("ol",{start:"2"},[s("li",null,"B 和 C 重叠，由于 C 结束得晚，把区间 C 删除，保留区间 B。")],-1),m=s("ol",{start:"3"},[s("li",null,"B 和 D 不重叠，结束，一共只删除了 2 个区间。")],-1),v=p("",9),k=p("",34),_=s("ol",{start:"2"},[s("li",null,"比较 wrf 和 er，第一个字母开始不同，因此，得出 w 排在 e 之前，记为 w -> e。")],-1),A=s("ol",{start:"3"},[s("li",null,"比较 er 和 ett，从第二个字母开始不一样，因此，得出 r 排在 t 之前，记为 r -> t。")],-1),C=s("ol",{start:"4"},[s("li",null,"比较 ett 和 rftt，从第一个字母开始不一样，得出 e 排在 r 之前，记为 e -> r。")],-1),q=s("p",null,"梳理上述关系，得 t -> f，w -> e，r -> t，e -> r",-1),B=s("p",null,"拓扑排序得到正确顺序：将每个字母看成是图里的顶点，它们之间的关系就好比是连接顶点与顶点的变，而且是有向边，所以这个图是一个有向图。最后对这个有向图进行拓扑排序，就可以得出最终的结果。",-1),b=p("",7),D=s("ul",null,[s("li",null,[s("p",null,"从 A 开始对这个图进行深度优先的遍历，那么当访问到顶点 D 的时候，visited 集合以及 loop 集合都是 {A, B, C, D}。")]),s("li",null,[s("p",null,"当从 D 继续遍历到 B 的时候，发现 B 已经在 loop 集合里。")]),s("li",null,[s("p",null,"因此得出结论，在这一轮遍历中，出现了环。")])],-1),w=s("p",null,"为什么不能单单用 visited 集合来帮助判断呢？例如下面情况。",-1),S=p("",28),I=p("",6),L=p("",13);function F(T,P,j,x,M,V){const n=o("Image");return t(),c("div",null,[r,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeoeAXmexAABQeDb1BWQ016.png"}),l(),E,y,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeomAZY5oAFqba-5PZJc045.gif"}),l(),u,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeomAJypIAAA1_CqUqGA909.png"}),l(),h,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeomAasCyABO9nAPnBLM742.gif"}),l(),d,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeoqAMYGUAB4TTFLJ7aA153.gif"}),l(),g,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeouALsHDACoIa6RqiFk139.gif"}),l(),f,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeouAVgkTACrf8XPAR8o811.gif"}),l(),m,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IeoyAS7VEABGI5Z_ovpM719.gif"}),l(),v,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IeoyAMCcNAABEWLc4h90512.png"}),l(),k,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2Ieo2AUKzRAB96MtWjhn0834.gif"}),l(),_,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2Ieo2AHp2gABsjRhdqs-o833.gif"}),l(),A,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2Ieo6AGzbmABkoJlXVd6Q543.gif"}),l(),C,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2Ieo-AQsABACwHvWpfLUM265.gif"}),l(),q,B,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2Ieo-AL2rOAAA-SDWivvo697.png"}),l(),b,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2Ieo-AfXiGAB41ZU6ORu4144.gif"}),l(),D,w,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IepCADkCaAAA9qnc1K_8002.png"}),l(),S,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/1B/CgotOV2IepKAGgQSAIKuyG7w9pk329.gif"}),l(),I,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/FB/CgoB5l2IepSAeUhVAFLy8rXwn-M290.gif"}),l(),L])}const N=e(i,[["render",F]]);export{Q as __pageData,N as default};
