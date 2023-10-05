import{_ as o,j as e,o as t,g as c,k as a,h as l,s,Q as p}from"./chunks/framework.4e7d56ce.js";const R=JSON.parse('{"title":"业务场景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6438) 21  场景案例：如何用 Flink SQL CDC 实现实时数据同步？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6438) 21  场景案例：如何用 Flink SQL CDC 实现实时数据同步？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6438) 21  场景案例：如何用 Flink SQL CDC 实现实时数据同步？.md"},E=s("p",null,"今天我们来看第二个案例，也就是用 Flink SQL CDC 实现实时数据同步。",-1),y=s("p",null,"那究竟什么是 Flink SQL CDC 呢？毕竟这是个相对还比较新的技术，可能很多人都还没听说过这个技术，所以我们先从它诞生的业务场景说起。",-1),i=s("h3",{id:"业务场景",tabindex:"-1"},[l("业务场景 "),s("a",{class:"header-anchor",href:"#业务场景","aria-label":'Permalink to "业务场景"'},"​")],-1),F=s("p",null,"如果你是一名后端开发的话，相信十有八九遇到过这样的问题，有时候一种数据库满足不了业务的需求，我们需要将相同的数据，存入多种不同的数据库。",-1),u=s("p",null,"比如，最开始的时候业务比较简单，数据量也很小，数据只需要保存到 MySQL 中，作为主数据库即可。之后，随着业务的发展，数据量变得越来越大，为了提升查询效率，需要将数据写一份到 Redis 缓存。同时，业务查询也变得越来越复杂，为了提供更加灵活和高效的查询分析方式，需要将数据再写一份到 Elasticsearch 里。",-1),C=s("p",null,"面对以上这种情况，你会怎么做呢？一般情况下，我们首先想到的可能就是，改代码！改成类似于下面图 1 这样的方案。",-1),d=p("",4),D=p("",10),h=p("",31),g=s("p",null,"图 4 使用 Flink CDC 实时同步数据的效果图",-1),k=s("p",null,"从上面的图 4 可以看出，左边源数据库 MySQL 里的数据和右边目标数据库 Elasticsearch 里的数据是完全对应的。并且，同步到 Elasticsearch 里数据的字段，也是和我们在 insert into select from 语句里指定的字段是完全一致的。你看，Flink SQL CDC 实现实时数据同步的效果是不是很不错！",-1),S=s("p",null,[l("最后还需要说明下的是，这里我为了专注于讲解 Flink CDC 的工作原理本身，就使用了相对简单的 SQL 语句。其实，Flink SQL CDC 是可以使用一些更加复杂的 SQL 语句，来实现更加丰富的数据同步功能的。比如，使用 GROUP BY 分组和使用 Window 进行窗口计算等。对于这些更完整和更复杂的 Flink SQL 语句说明，你可以参考"),s("a",{href:"https://ci.apache.org/projects/flink/flink-docs-release-1.12/dev/table/sql/?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"这里的官方文档"),l("。")],-1),m=s("h3",{id:"小结",tabindex:"-1"},[l("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),A=s("p",null,"总的来说，相比 DataStream 的方式，Flink SQL CDC 使用起来会更加方便些。但这两种方式我们都需要掌握，因为目前 Flink SQL CDC 还不算非常成熟，一些 Flink SQL 暂时不支持的功能和插件，还是需要我们自己基于 DataStream 在底层实现。",-1),_=s("p",null,"你的工作中有没有可以使用到 Flink CDC，或者用 Flink CDC 进行改造的场景呢？可以将你的想法或问题写在留言区。",-1),q=s("p",null,"下面是本课时的知识脑图。",-1);function b(B,L,T,Q,x,f){const n=e("Image");return t(),c("div",null,[E,y,i,F,u,C,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/90/Cgp9HWBmt66ACLVqAABVxuvt-SA692.png"}),d,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/98/CioPOWBmt7aAP2UtAACBbUI0Ab4887.png"}),D,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/98/CioPOWBmt8CACcZ1AAB-UuW3dDg051.png"}),h,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/2D/90/Cgp9HWBmt-WAB1cbABNhEi6mLVE369.png"}),l(),g,k,S,m,A,_,q,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/2D/90/Cgp9HWBmt_uANir5AAfXEAo3ILg905.png"})])}const I=o(r,[["render",b]]);export{R as __pageData,I as default};
