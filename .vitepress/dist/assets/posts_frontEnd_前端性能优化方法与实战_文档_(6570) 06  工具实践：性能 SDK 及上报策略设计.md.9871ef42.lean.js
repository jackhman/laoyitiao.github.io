import{_ as o,j as l,o as e,g as t,k as p,h as c,Q as n,s}from"./chunks/framework.e0c66c3f.js";const F=JSON.parse('{"title":"性能 SDK 设计 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6570) 06  工具实践：性能 SDK 及上报策略设计.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6570) 06  工具实践：性能 SDK 及上报策略设计.md","lastUpdated":null}'),r={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6570) 06  工具实践：性能 SDK 及上报策略设计.md"},i=n("",10),E=n("",41),d=s("p",null,"这一讲我们主要介绍了性能 SDK 的设计原则和上报策略，在这个过程中还需要注意一点。 那就是， 在性能指标上报之前，也就是请求指标转换为请求参数环节，SDK 内部最好做一次参数校验处理。",-1),_=s("p",null,"为什么我会强调这一点呢？因为我曾经遇到过类似问题。当初在一个业务接入性能 SDK 后，上报性能数据时出现了平台看不到对应指标数据的情况。我定位问题后发现，原来是 API 接口取性能指标数据时，把 Windows 对象上的某个方法给字符串化后当作参数了。这个参数内容特别多，直接导致 GET 请求时参数过长，出现报错，后端并没有拿到请求参数。",-1),h=s("p",null,"最后，在这里给你留一个问题：",-1),y=s("blockquote",null,[s("p",null,"在前面的上报策略时，我提到了数据抽样，如果是抽样的数据，怎么能确保性能异常的数据不会被漏掉呢？")],-1),D=s("p",null,"你可以把回复写在下方的留言区哦。",-1),S=s("p",null,"一般来说，性能指标数据通过SDK采集完成后，会上报给性能监控平台，通过它来对性能进行监控和预警，那么这个平台怎么搭建呢？下一讲，我将和你介绍下如何从 0 到 1 搭建性能优化平台。再见。",-1);function m(u,K,P,A,f,I){const a=l("Image");return e(),t("div",null,[i,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/16/F6/CioPOWBHIo6AZCY4AADtOp7Xkb8129.png"}),c(),E,p(a,{alt:"溪风的思维导图06.png",src:"https://s0.lgstatic.com/i/image6/M00/16/FE/CioPOWBHKOiACeX2AAKqstIoawE934.png"}),d,_,h,y,D,S])}const v=o(r,[["render",m]]);export{F as __pageData,v as default};
