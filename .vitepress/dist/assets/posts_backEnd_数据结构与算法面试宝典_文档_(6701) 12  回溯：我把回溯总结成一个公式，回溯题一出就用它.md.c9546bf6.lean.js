import{_ as o,j as e,o as t,g as c,k as a,Q as l,s,h as p}from"./chunks/framework.4e7d56ce.js";const gs=JSON.parse('{"title":"从一次面试开始 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6701) 12  回溯：我把回溯总结成一个公式，回溯题一出就用它.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6701) 12  回溯：我把回溯总结成一个公式，回溯题一出就用它.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6701) 12  回溯：我把回溯总结成一个公式，回溯题一出就用它.md"},E=l("",38),y=s("p",null,[p("我们先看一下数组中有"),s("strong",null,"两个元素"),p("的时候应该如何处理。")],-1),i=l("",19),A=s("p",null,"接下来我们看一下使用这个模板所需要：",-1),F=s("ul",null,[s("li",null,[s("p",null,"1 个核心")]),s("li",null,[s("p",null,"3 个条件")])],-1),g=s("h4",{id:"_1-个核心",tabindex:"-1"},[p("1 个核心 "),s("a",{class:"header-anchor",href:"#_1-个核心","aria-label":'Permalink to "1 个核心"'},"​")],-1),D=s("p",null,[p("理解回溯算法的核心，可以将"),s("strong",null,"思路的重点"),p("总结为：第 i 个人怎么选？")],-1),d=l("",10),u=s("p",null,'输入：A = "23"',-1),b=s("p",null,'输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]',-1),h=s("p",null,'解释：数字 2 可以选择字母"abc", 数字 3 可以选择"def"。那么一共有 9 种组合。',-1),C=s("p",null,[p('【分析】看到"'),s("strong",null,"所有"),p('"二字，你应该立马想到使用回溯算法。前面我们提到。回溯算法需要 1 个核心和 3 个条件。')],-1),B=s("h5",{id:"_1-1-个核心",tabindex:"-1"},[p("1. 1 个核心 "),s("a",{class:"header-anchor",href:"#_1-1-个核心","aria-label":'Permalink to "1. 1 个核心"'},"​")],-1),x=s("p",null,'回想一下之前的"借箱子"游戏，里面每个人都只可以有一种选择。',-1),k=s("p",null,'而现在，当题目改变，输入变成"23"之后，情形如下：',-1),f=s("p",null,'第 0 个人拿到的是数字 2，可以选择的"宝石"为{"a", "b", "c"}，第 1 个人可以拿到的宝石为{"d", "e", "f"}。',-1),_=s("p",null,"因此，第 i 个人的选择是：",-1),v=l("",19),j=l("",8),m=s("p",null,'但是，如果第 0 个人选择 1 ，此时第 1 个人也选择 1，那么箱子里面会装上 "{1, 1}"。很明显这是不符合要求的，因为一个元素被用了两次，不符合子集的定义。',-1),q=s("p",null,"我们分情况整理如下：",-1),N=s("p",null,"Case 1. 当第 0 个人选择 1 的时候，第 1 个人只能选择 {2, 3}, {1, 2}, {1, 3}。",-1),T=s("p",null,"Case 2. 当第 0 个人选择 2 的时候，第 1 个人只能选择 {3}。注意，此时不能再去选择 1，否则会形成 {2, 1}，而这种情况是在前面的选择中出现过的。",-1),L=s("p",null,"Case 3. 当第 0 个人选择 3 的时候，第 1 个人所有的数都不能选。因为一选就会和 Case 1,、Case 2 重复。",-1),I=s("p",null,'通过上述分析，我们发现，第 1 个人的选择范围是和第 0 个人的选择有关系的。如果第 0 个人选择了下标 A[j]，那么第 1 个人就只能选择数组 A[] 中第 [j + 1, ..., N) 范围里面的"宝石"。',-1),S=s("p",null,[p("可以总结成"),s("strong",null,"结论 1：")],-1),w=l("",40),P=l("",9),V=l("",16),H=s("p",null,"然后，我们重新再看 1 个核心和 3 个条件。",-1),R=s("h5",{id:"_1-1-个核心-3",tabindex:"-1"},[p("1. 1 个核心 "),s("a",{class:"header-anchor",href:"#_1-1-个核心-3","aria-label":'Permalink to "1. 1 个核心"'},"​")],-1),K=s("p",null,"根据核心的定义：重点解决第 i 个人应该选什么？我们从下面这种情况展开。",-1),Q=s("ul",null,[s("li",null,[s("p",null,"整个数组为 [1, 2, 3, 4, 5, 6]")]),s("li",null,[s("p",null,"已经有 [1, 2, 3] 元素在箱子里面")])],-1),G=s("p",null,"根据结论 2 和结论 3，容易得到，第 i 个人实际上只能选择 [4, 5, 6]。那么在操作时，第 i 个人可以像下图演示的这样操作。",-1),X=s("p",null,"虽然，我们还没有找到一个较好的数据结构来实现袋子。但是，根据这里的操作，可以分析出只需要这种数据结构支持交换操作就可以了。",-1),O=s("p",null,[p('这时候，数组跳出来说："'),s("strong",null,"正是在下"),p('"。我们在操作的时候，统一使用 Swap 操作，如下动图所示：')],-1),z=l("",7),M=l("",15),W=s("p",null,"到这里，我们可以将回溯的知识点总结如下：",-1),J=l("",15),Y=l("",8),U=l("",42),Z=s("p",null,"但是，当遇到下面这种场景时，可以发现，交换带来的结果是一样的：",-1),$=l("",5),ss=s("p",null,[p("为什么在这里不需要处理？因为在本题中，我们需要求解的是"),s("strong",null,"排列"),p("，而 [1, 4] 和 [4, 1] 本来就是不一样的，所以不需要处理这种情况。")],-1),ns=s("p",null,[p("这里我们使用了 HashSet，虽然它的复杂度是 O(1)，但是在"),s("strong",null,"数据量比较小"),p("的时候，直接基于线性查找的方式可能会更快一些。主要基于以下两点：")],-1),as=s("ul",null,[s("li",null,[s("p",null,"HashSet 需要动态申请和释放内存，代价比较大；")]),s("li",null,[s("p",null,"线性查找具有较好的内存局部性，对 CPU 的缓存更加友好。")])],-1),ls=s("p",null,"因此，我们可以使用线性查找的方式来确定将要交换的元素在之前是否出现过了。",-1),ps=l("",12),os=l("",9),es=l("",8);function ts(cs,rs,Es,ys,is,As){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/32/23/Cgp9HWBtdtSAemcJAABtIIQYuhI248.png"}),y,a(n,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M00/32/23/Cgp9HWBtdtuAF8knABW0aJ4sYFY451.gif"}),i,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2C/CioPOWBtdv6ATY5lAABVm7vYZuA844.png"}),A,F,g,D,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2C/CioPOWBtdwiAS-y4AAEpIitKONI169.png"}),d,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/32/23/Cgp9HWBtdxKAa_IqAADNQcafC-0771.png"}),u,b,h,C,B,x,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/32/2C/CioPOWBtdyOAOcbzAABowutir0s459.png"}),k,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/32/23/Cgp9HWBtdyyAEHvOAACZKdDxbbI193.png"}),f,_,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/32/2C/CioPOWBtdzOAKtlQAABSK7rzKO0889.png"}),v,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/32/2C/CioPOWBtd1CAKIPqAAFn75z053s828.png"}),j,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/32/2C/CioPOWBtd2KAMoGiAACIgBcvVEs557.png"}),m,q,a(n,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image6/M00/32/2C/CioPOWBteASAC2BPAADRSYzADxo556.png"}),N,a(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image6/M01/32/24/Cgp9HWBteAyAe5pyAADFY2OC8CY932.png"}),T,a(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image6/M01/32/2C/CioPOWBteDKABd7KAAC7RMpN8BA100.png"}),L,I,S,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/32/24/Cgp9HWBteFKAbyA_AABiyDTuqnA371.png"}),w,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/32/25/Cgp9HWBteGqAZMylAAEqT_ofGyc931.png"}),P,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/32/2D/CioPOWBteHmAYEkbAABDDRrPp08346.png"}),V,a(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/32/25/Cgp9HWBteIuALQiGAAH4SSA6SLE200.png"}),H,R,K,Q,G,a(n,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/32/25/Cgp9HWBteKSAdcDmABC51Quisxo118.gif"}),X,O,a(n,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M00/32/2E/CioPOWBteKyAJej-AApc_Eb_YTw097.gif"}),z,a(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/32/26/Cgp9HWBteLiAQ_gDAAE5tlvsWjg213.png"}),M,a(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/32/26/Cgp9HWBteMeAQBV8AABSwrpsu8U552.png"}),W,a(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2E/CioPOWBteNGAZD5TAAGFudmr2E8242.png"}),J,a(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2E/CioPOWBtePaAcwJVAAG672uGcho369.png"}),Y,a(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2E/CioPOWBteQGAcjy3AALPFrgULVg418.png"}),U,a(n,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image6/M00/32/26/Cgp9HWBteRqATVJhAACynh0Mq7w152.png"}),Z,a(n,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2E/CioPOWBteSCAfdJcAAC171lwGnU669.png"}),$,a(n,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M00/32/26/Cgp9HWBteSiAf626AALTqN7ChdM529.png"}),ss,ns,as,ls,a(n,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image6/M00/32/2F/CioPOWBteTCALbz-AAC6scJpg2I034.png"}),ps,a(n,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image6/M01/32/2F/CioPOWBteT-AImZjAADTAQrjfTc956.png"}),os,a(n,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image6/M01/32/26/Cgp9HWBteUaAFj2OAAIfg-QqiDc226.png"}),es])}const Ds=o(r,[["render",ts]]);export{gs as __pageData,Ds as default};
