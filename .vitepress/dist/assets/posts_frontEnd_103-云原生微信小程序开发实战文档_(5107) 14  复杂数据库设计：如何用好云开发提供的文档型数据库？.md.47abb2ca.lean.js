import{_ as p,D as e,o as t,g as c,J as l,h as a,Q as o,m as s}from"./chunks/framework.f67d7268.js";const v=JSON.parse('{"title":"14复杂数据库设计：如何用好云开发提供的文档型数据库？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5107) 14  复杂数据库设计：如何用好云开发提供的文档型数据库？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5107) 14  复杂数据库设计：如何用好云开发提供的文档型数据库？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5107) 14  复杂数据库设计：如何用好云开发提供的文档型数据库？.md"},i=o("",9),E=s("p",null,[s("strong",null,"反范式化"),a("是把文档所用的数据都嵌入文档内部，如果要更新数据，可能要查出整个文档，修改之后再存储到数据库里，如果没有可以进行字段级别的更新指令，大文档新增字段的性能较低。而范式化设计因为集合比较分散（也就比较小），更新数据时可以只更新一个相对较小的文档。")],-1),y=s("p",null,[a("由此可见，数据既可以内嵌（反范式化），也可以采用引用（范式化），两种策略各有优缺点，"),s("strong",null,"关键是你要选择适合自己应用场景的方案。")],-1),d=s("ul",null,[s("li",null,[s("p",null,"完全反范式化可以大大减少文档查询的次数。比如你的应用数据查询比较频繁，但不用频繁更新，那就适合完全反范式化，没必要把数据分散到不同的集合，牺牲查询的效率。")]),s("li",null,[s("p",null,"完全范式化会降低文档更新的成本。如果应用数据需要频繁更新，业务数据特别复杂，你就要对数据库进行一定的范式化设计，不然用反范式化的设计会让集合过大，冗余数据更多，出现数据写入性能差的问题。")])],-1),u=s("p",null,"以下是我总结的适合内嵌（反范式化）和引用（范式化）的情况对比，建议你根据业务情况合理设计。",-1),h=s("h4",{id:"认识数据库数据模式",tabindex:"-1"},[a("认识数据库数据模式 "),s("a",{class:"header-anchor",href:"#认识数据库数据模式","aria-label":'Permalink to "认识数据库数据模式"'},"​")],-1),_=s("p",null,"除了结合实际情况选择范式化设计或反范式化设计之外，你还需要了解云开发数据库的数据模式，从而更好地设计数据库结构。云开发数据库的数据模式比较灵活，主要体现在以下两点。",-1),g=s("ul",null,[s("li",null,[s("p",null,"关系型数据库要求你在插入数据前必须定义好一个表的模版结构，而云开发的文档型数据库中数据的集合 collection 并不限制记录 document 结构。")]),s("li",null,[s("p",null,"另外关系型数据库需要开发者对数据库的结构内容做声明描述，才可以正常运作，而云开发数据库不需要预先声明，在使用时也不会限制记录的结构，同一个集合记录的字段可以有很大的差异。如下图所示：")])],-1),q=o("",28),F=o("",18);function m(b,C,A,B,f,k){const n=e("Image");return t(),c("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/89/65/Ciqc1F_YWhmAUJFEAABNAHnbyIk070.png"}),a(),E,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/89/70/CgqCHl_YWiKAR1RFAABMEo6GuPE428.png"}),a(),y,d,u,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/89/65/Ciqc1F_YWiqAZmzEAAEjsREvLEw593.png"}),a(),h,_,g,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/89/65/Ciqc1F_YWj6AVK07AAEzfZrJn1s066.png"}),a(),q,l(n,{alt:"小程序14-金句.png",src:"https://s0.lgstatic.com/i/image/M00/8B/DE/CgqCHl_hcnSAYEWLAAEP0bG0HwU999.png"}),a(),F])}const P=p(r,[["render",m]]);export{v as __pageData,P as default};
