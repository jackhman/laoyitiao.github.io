import{_ as o,j as e,o as r,g as t,k as n,h as l,s as a,Q as p}from"./chunks/framework.e0c66c3f.js";const k=JSON.parse('{"title":"ShardingSphere 如何抽象数据脱敏？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3569) 10  数据脱敏：如何确保敏感数据的安全访问？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3569) 10  数据脱敏：如何确保敏感数据的安全访问？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3569) 10  数据脱敏：如何确保敏感数据的安全访问？.md"},E=a("p",null,"从今天开始，我们又将开始一个全新的主题：介绍 ShardingSphere 中的数据脱敏功能。所谓数据脱敏，是指对某些敏感信息通过脱敏规则进行数据转换，从而实现敏感隐私数据的可靠保护。在日常开发过程中，数据安全一直是一个非常重要和敏感的话题。相较传统的私有化部署方案，互联网应用对数据安全的要求更高，所涉及的范围也更广。根据不同行业和业务场景的属性，不同系统的敏感信息可能有所不同，但诸如身份证号、手机号、卡号、用户姓名、账号密码等个人信息一般都需要进行脱敏处理。",-1),y=a("h3",{id:"shardingsphere-如何抽象数据脱敏",tabindex:"-1"},[l("ShardingSphere 如何抽象数据脱敏？ "),a("a",{class:"header-anchor",href:"#shardingsphere-如何抽象数据脱敏","aria-label":'Permalink to "ShardingSphere 如何抽象数据脱敏？"'},"​")],-1),i=a("p",null,"数据脱敏从概念上讲比较容易理解，但在具体实现过程中存在很多方案。在介绍基于数据脱敏的具体开发过程之前，我们有必要先来梳理实现数据脱敏的抽象过程。这里，我将从敏感数据的存储方式、敏感数据的加解密过程以及在业务代码中嵌入加解密的过程这三个维度来抽象数据脱敏。",-1),d=p("",7),u=p("",8),h=p("",24),g=p("",10),F=a("p",null,"加密后的表数据结果",-1),m=a("p",null,"在这个过程中，ShardingSphere 会把原始的 SQL 语句转换为用于数据脱敏的目标语句：",-1),_=p("",8);function A(S,C,D,v,b,q){const s=e("Image");return r(),t("div",null,[E,y,i,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/33/60/CgqCHl8P-QmAA0bQAABWInFwGYE998.png"}),d,n(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/33/60/CgqCHl8P-SWAcpV1AABNv8n4KHg426.png"}),u,n(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/33/55/Ciqc1F8P-TaAd-1QAABkT9WjY8E581.png"}),h,n(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/33/55/Ciqc1F8P-VqAZq9CAACLcF2qedw534.png"}),g,n(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/33/60/CgqCHl8P-WeAZFtRAABT51HN_2s801.png"}),l(),F,m,n(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/33/55/Ciqc1F8P-W6AVpohAAA833UHvZE135.png"}),l(),_])}const B=o(c,[["render",A]]);export{k as __pageData,B as default};
