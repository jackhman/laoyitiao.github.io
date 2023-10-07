import{_ as n,j as p,o as l,g as i,k as e,h as t,Q as o,s}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"第10讲：树在Amazon中的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(544) 第 10 讲：树在 Amazon 中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(544) 第 10 讲：树在 Amazon 中的应用.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(544) 第 10 讲：树在 Amazon 中的应用.md"},c=o("",10),d=o("",15),S=o("",6),_=s("p",null,"如果用语法树表达的话会是下面图中的样子，这个树的根是 SELECT 节点，在下面左子树是 name，右子树是 FROM 节点为根的子树。FROM 节点下面是 table 叶子节点。",-1),m=s("p",null,"在用 AST 表达 SQL 语句时，SQL 操作符永远是子树的根，而树的叶子则是比如这里的 name 或者 table。",-1),h=s("br",null,null,-1),u=s("p",null,"用 AST 解析 SQL 语句之后，我们对于 SQL 语句的分析和优化就变得更为直接了。你可以很快找出这个 SQL 语句的操作就是 SELECT 和 FROM，他们都是子树的根节点。每一个 SQL 语句中的 token 在语法书中都拥有了语义上的含义，比如 from 和 name 不仅仅是单词不一样，他们在语义上是不同的含义，from 是操作，而 name 是一张表中的列名称。",-1),L=s("br",null,null,-1),E=s("p",null,"我们可以根据解析后的语法树对这棵树做进一步的修改，比如在 FROM 下面的子节点我们知道是一个表的名字，可以把表的完整路径解析出来；再比如我们知道 SELECT 下面的左子树是一个表的列名称，可以把完整的表名称解析出来。在做完这些名字的解析之后，这个 SQL 语法树就变成了如下图所示的样子。",-1),g=o("",15);function Q(A,b,T,C,x,k){const a=p("Image");return l(),i("div",null,[c,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/DA/CgpOIF4f_qCAFrrXAABVuB8FTZk278.png"}),t(),d,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/DA/CgpOIF4f_r2AfVt5AAAtd-U383M254.png"}),t(),S,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/DB/Cgq2xl4f_uSAGzwqAABVuB8FTZk049.png"}),t(),_,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/DB/Cgq2xl4f_vCAelA_AADz55RQ5Gk214.png"}),t(),m,h,u,L,E,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/DA/CgpOIF4f_vuAS2ZLAAFUDkBSqfc827.png"}),t(),g])}const v=n(r,[["render",Q]]);export{q as __pageData,v as default};
