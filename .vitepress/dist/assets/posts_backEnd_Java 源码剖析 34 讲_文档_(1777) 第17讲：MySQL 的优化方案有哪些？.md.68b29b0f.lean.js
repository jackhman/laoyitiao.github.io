import{_ as p,j as n,o as l,h as r,k as t,f as a,Q as o,s}from"./chunks/framework.d3daa342.js";const E=JSON.parse('{"title":"第17讲：MySQL的优化方案有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1777) 第17讲：MySQL 的优化方案有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1777) 第17讲：MySQL 的优化方案有哪些？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1777) 第17讲：MySQL 的优化方案有哪些？.md"},i=o("",9),g=o("",51),h=s("p",null,"摘要说明如下表所示：",-1),_=s("p",null,"以上字段中最重要的就是 type 字段，它的所有值如下所示：",-1),d=s("p",null,"当 type 为 all 时，则表示全表扫描，因此效率会比较低，此时需要查看一下为什么会造成此种原因，是没有创建索引还是索引创建的有问题？以此来优化整个 MySQL 运行的速度。",-1),y=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),u=s("p",null,"本课时我们从三个维度讲了 MySQL 的优化手段：SQL 和索引优化、数据库结构优化以及系统硬件优化等；同时深入到每个维度中，详细地介绍了 MySQL 具体的优化细节；最后我们讲了联合索引的最左匹配原则，以及慢查询的具体解决方案。",-1);function m(S,q,Q,L,M,b){const e=n("Image");return l(),r("div",null,[i,t(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/03/32/Ciqc1F6yb8mAAcbmAAR1G3_Q7uA370.png"}),a(),t(e,{alt:"1.1.png",src:"https://s0.lgstatic.com/i/image/M00/03/32/Ciqc1F6yb8-AH8sDAAZVGooSv0U688.png"}),a(),g,t(e,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/03/33/CgqCHl6ycJOAKJVoAAC7goXXIAs030.png"}),a(),h,t(e,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/03/33/CgqCHl6ycGyAAMg7AADD5S9L1ek214.png"}),a(),_,t(e,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/03/33/CgqCHl6ycKeAA46vAACNn0J31Ik660.png"}),a(),d,y,u])}const v=p(c,[["render",m]]);export{E as __pageData,v as default};
