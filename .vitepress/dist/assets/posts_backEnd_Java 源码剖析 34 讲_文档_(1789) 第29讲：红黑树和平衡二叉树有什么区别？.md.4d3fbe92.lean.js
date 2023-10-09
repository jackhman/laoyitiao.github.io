import{_ as o,j as e,o as t,h as r,k as p,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const K=JSON.parse('{"title":"第29讲：红黑树和平衡二叉树有什么区别？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1789) 第29讲：红黑树和平衡二叉树有什么区别？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1789) 第29讲：红黑树和平衡二叉树有什么区别？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1789) 第29讲：红黑树和平衡二叉树有什么区别？.md"},E=s("h1",{id:"第29讲-红黑树和平衡二叉树有什么区别",tabindex:"-1"},[n("第29讲：红黑树和平衡二叉树有什么区别？ "),s("a",{class:"header-anchor",href:"#第29讲-红黑树和平衡二叉树有什么区别","aria-label":'Permalink to "第29讲：红黑树和平衡二叉树有什么区别？"'},"​")],-1),y=s("p",null,"数据结构属于理解一些源码和技术所必备的知识，比如要读懂 Java 语言中 TreeMap 和 TreeSet 的源码就要懂红黑树的数据结构，不然是无法理解源码中关于红黑树数据的操作代码的，比如左旋、右旋、添加和删除操作等。因此本课时我们就来学习一下数据结构的基础知识，方便看懂源码或者是防止面试中被问到。",-1),i=s("p",null,"我们本课时的面试题是，红黑树和二叉树有什么区别？",-1),_=s("h3",{id:"典型回答",tabindex:"-1"},[n("典型回答 "),s("a",{class:"header-anchor",href:"#典型回答","aria-label":'Permalink to "典型回答"'},"​")],-1),A=s("p",null,"要回答这个问题之前，我们先要弄清什么是二叉树？什么是红黑树？",-1),h=s("p",null,"二叉树（Binary Tree）是指每个节点最多只有两个分支的树结构，即不存在分支大于 2 的节点，二叉树的数据结构如下图所示：",-1),g=l("",5),d=s("p",null,"二叉查找树（Binary Search Tree）也被称为二叉搜索树、有序二叉树（Ordered Binary Tree）或排序二叉树（Sorted Binary Tree）等。",-1),D=s("p",null,'红黑树（Red Black Tree）是一种自平衡二叉查找树，它最早被称之为"对称二叉 B 树"，它现在的名字源于 1978 年的一篇论文，之后便被称之为红黑树了。',-1),F=s("p",null,"所谓的平衡树是指一种改进的二叉查找树，顾名思义平衡树就是将二叉查找树平衡均匀地分布，这样的好处就是可以减少二叉查找树的深度。",-1),u=s("p",null,"一般情况下二叉查找树的查询复杂度取决于目标节点到树根的距离（即深度），当节点的深度普遍较大时，查询的平均复杂度就会上升，因此为了实现更高效的查询就有了平衡树。",-1),f=s("p",null,"非平衡二叉树如下图所示：",-1),C=s("p",null,"平衡二叉树如下图所示：",-1),m=l("",4),T=l("",7),v=l("",7),b=l("",4),V=l("",4),q=s("p",null,"由于篇幅有限，我这里只能带你简单地了解一下红黑树和二叉树的基本概念，想要深入地学习更多的内容，推荐查阅《算法》（第四版）和《算法导论》等书籍。",-1),k=s("h3",{id:"小结",tabindex:"-1"},[n("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),B=s("p",null,"我们本课时介绍了二叉树、二叉查找树及红黑树的概念，还有红黑树的五个特性。普通二叉查找树在特殊情况下会退化成链表的数据结构，因此操作和查询的时间复杂度变成了 O(n)，而红黑树可以实现自平衡，因此它的操作（插入、删除）和查找的时间复杂度都是 O(logn)，效率更高更稳定，红黑树保证平衡的手段有三个：变色、左旋和右旋。",-1);function S(P,I,N,O,M,R){const a=e("Image");return t(),r("div",null,[E,y,i,_,A,h,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/37/CgqCHl7p1giALPJdAAA9HlzQhz8713.png"}),n(),g,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/38/CgqCHl7p1o2AD2B1AABAMGFwUAs699.png"}),n(),d,D,F,u,f,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/2C/Ciqc1F7p1piAYHGAAABOcycxnUY851.png"}),n(),C,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/38/CgqCHl7p1qCAYIL5AABORFVaJ_E571.png"}),n(),m,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/38/CgqCHl7p1q2ANRAbAADvqVSROHE030.png"}),n(),T,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/2C/Ciqc1F7p1raAA54FAABNRmDFu94908.png"}),n(),v,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/2D/Ciqc1F7p1sCAAVsAAACkC6fB4TE240.png"}),n(),b,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/2D/Ciqc1F7p1suAH4G9AACoLoWsW64383.png"}),n(),V,p(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/38/CgqCHl7p1tOAGG5hAABjt5_gQjg041.png"}),n(),q,k,B])}const H=o(c,[["render",S]]);export{K as __pageData,H as default};
