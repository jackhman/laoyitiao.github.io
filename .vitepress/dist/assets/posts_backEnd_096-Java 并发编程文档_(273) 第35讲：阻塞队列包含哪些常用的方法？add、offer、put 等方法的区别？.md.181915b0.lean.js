import{_ as p,j as o,o as e,g as t,k as n,h as l,Q as c,s}from"./chunks/framework.4e7d56ce.js";const Q=JSON.parse('{"title":"第一组：add、remove、element ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(273) 第35讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(273) 第35讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(273) 第35讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？.md"},E=c("",51),y=s("h4",{id:"take-方法",tabindex:"-1"},[l("take 方法 "),s("a",{class:"header-anchor",href:"#take-方法","aria-label":'Permalink to "take 方法"'},"​")],-1),i=s("p",null,"take 方法的作用是获取并移除队列的头结点。通常在队列里有数据的时候会正常取出数据并删除；但是如果执行 take 的时候队列里无数据，则阻塞，直到队列里有数据；一旦队列里有数据了，就会立刻解除阻塞状态，并且取到数据。",-1),u=s("h3",{id:"总结",tabindex:"-1"},[l("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"以上就是本课时的内容，本课时我们讲解了阻塞队列中常见的方法并且把它们分为了三组，每一组都有各自的特点。第一组的特点是在无法正常执行的情况下抛出异常；第二组的特点是在无法正常执行的情况下不抛出异常，但会用返回值提示运行失败；第三组的特点是在遇到特殊情况时让线程陷入阻塞状态，等到可以运行再继续执行。",-1),g=s("p",null,"我们用表格把上面 8 种方法总结如下：",-1),h=s("p",null,"有了这个表格之后，我们就可以非常清晰地理清这 8 个方法之间的关系了，课后你可以仔细对比表格以加深印象。",-1);function k(F,v,b,C,m,f){const a=o("Image");return e(),t("div",null,[E,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7E/Cgq2xl4lhcOAYPonAAB1UtAAltk655.png"}),y,i,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7E/Cgq2xl4lhdWAWOz8AABp-t8dt_8107.png"}),u,d,g,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7E/CgpOIF4lheGALDjnAAHFyzrSvqU109.png"}),l(),h])}const A=p(r,[["render",k]]);export{Q as __pageData,A as default};
