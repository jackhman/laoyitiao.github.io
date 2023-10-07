import{_ as o,j as i,o as r,g as n,k as e,h as a,s as t,Q as l}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"04数据复制：如何保证数据在分布式场景下的高可用？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6300) 04  数据复制：如何保证数据在分布式场景下的高可用？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6300) 04  数据复制：如何保证数据在分布式场景下的高可用？.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6300) 04  数据复制：如何保证数据在分布式场景下的高可用？.md"},_=t("h1",{id:"_04数据复制-如何保证数据在分布式场景下的高可用",tabindex:"-1"},[a("04数据复制：如何保证数据在分布式场景下的高可用？ "),t("a",{class:"header-anchor",href:"#_04数据复制-如何保证数据在分布式场景下的高可用","aria-label":'Permalink to "04数据复制：如何保证数据在分布式场景下的高可用？"'},"​")],-1),d=t("p",null,"我们上一讲介绍了分片技术，它主要的目的是提高数据容量和性能。这一讲，我们将介绍分布式数据库另外一个重要根基：复制。",-1),h=t("p",null,"复制的主要目的是在几个不同的数据库节点上保留相同数据的副本，从而提供一种数据冗余。这份冗余的数据可以提高数据查询性能，而更重要的是保证数据库的可用性。",-1),c=t("p",null,"本讲主要介绍两种复制模式：单主复制与多主复制，并通过 MySQL 复制技术的演化来进行相应的展示。",-1),g=t("p",null,"现在让我们开始学习单主复制，其中不仅介绍了该技术本身，也涉及了一些复制领域的话题，如复制延迟、高可用和复制方式等。",-1),u=t("h3",{id:"单主复制",tabindex:"-1"},[a("单主复制 "),t("a",{class:"header-anchor",href:"#单主复制","aria-label":'Permalink to "单主复制"'},"​")],-1),S=t("p",null,"单主复制，也称主从复制。写入主节点的数据都需要复制到从节点，即存储数据库副本的节点。当客户要写入数据库时，他们必须将请求发送给主节点，而后主节点将这些数据转换为复制日志或修改数据流发送给其所有从节点。从使用者的角度来看，从节点都是只读的。下图就是经典的主从复制架构。",-1),b=l("",47),m=l("",10),M=l("",8),y=l("",18);function A(q,T,L,P,Q,D){const p=i("Image");return r(),n("div",null,[_,d,h,c,g,u,S,e(p,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/8F/E2/Ciqc1GAJV6SADprzAACli5qqAMo678.png"}),a(),b,e(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/07/D3/Cip5yGAJV9qAVnjXAAC85xLxhaU613.png"}),a(),m,e(p,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/07/D3/Cip5yGAJV-KAAg5HAAF8syZ9vQM483.png"}),a(),M,e(p,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/07/D5/CgpVE2AJV-mAE6vWAAB_JZptW8Y497.png"}),a(),y])}const I=o(s,[["render",A]]);export{f as __pageData,I as default};
