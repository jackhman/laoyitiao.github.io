import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1791) 第31讲：如何保证接口的幂等性？常见的实现方案有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1791) 第31讲：如何保证接口的幂等性？常见的实现方案有哪些？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1791) 第31讲：如何保证接口的幂等性？常见的实现方案有哪些？.md"},E=p("",13),y=p("",9),i=s("p",null,"JVM 锁执行流程图",-1),d=s("p",null,"JVM 锁存在的最大问题在于，它只能应用于单机环境，因为 Lock 本身为单机锁，所以它就不适应于分布式多机环境。",-1),u=s("h4",{id:"_4-分布式锁实现",tabindex:"-1"},[a("4. 分布式锁实现 "),s("a",{class:"header-anchor",href:"#_4-分布式锁实现","aria-label":'Permalink to "4. 分布式锁实现"'},"​")],-1),F=s("p",null,"分布式锁实现幂等性的逻辑是，在每次执行方法之前先判断是否可以获取到分布式锁，如果可以，则表示为第一次执行方法，否则直接舍弃请求即可，执行流程如下图所示：",-1),h=p("",40);function _(g,C,b,A,v,D){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"11111111111111111111.gif",src:"https://s0.lgstatic.com/i/image/M00/26/CC/CgqCHl7y9-yAHTg2AAICT3yhluA522.gif"}),a(),y,l(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/26/CF/CgqCHl7y-zKACO1KAADpJreXpQQ297.png"}),a(),i,d,u,F,l(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/26/C3/Ciqc1F7y-z6AVFbTAAB5lCnzVDg343.png"}),a(),h])}const x=o(r,[["render",_]]);export{q as __pageData,x as default};
