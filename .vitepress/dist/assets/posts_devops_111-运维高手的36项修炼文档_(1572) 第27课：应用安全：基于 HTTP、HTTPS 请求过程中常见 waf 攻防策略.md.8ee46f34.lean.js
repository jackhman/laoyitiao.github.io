import{_ as e,D as o,o as t,g as c,J as p,h as s,Q as l,m as a}from"./chunks/framework.f67d7268.js";const S=JSON.parse('{"title":"第27课：应用安全：基于HTTP、HTTPS请求过程中常见waf攻防策略","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1572) 第27课：应用安全：基于 HTTP、HTTPS 请求过程中常见 waf 攻防策略.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1572) 第27课：应用安全：基于 HTTP、HTTPS 请求过程中常见 waf 攻防策略.md","lastUpdated":1696682708000}'),r={name:"posts/devops/111-运维高手的36项修炼文档/(1572) 第27课：应用安全：基于 HTTP、HTTPS 请求过程中常见 waf 攻防策略.md"},i=l("",26),E=a("p",null,"那么怎么来解决呢？我们可以通过使用 HTTPS 协议来代替 HTTP，采用 HTTPS 协议会在 HTTP 协议的基础上加了一层 TLS 防护，使得传输的数据进行加密， 劫持端无法分析和篡改内容。所以 HTTPS 这种方式可以保护我们的数据不被劫持，值得特殊注意的它是无法解决域名劫持的问题，对于基于域名劫持行为我们还需要考虑其他一些访问策略。",-1),y=a("h3",{id:"csrf-跨站请求伪造及其防护策略",tabindex:"-1"},[s("CSRF 跨站请求伪造及其防护策略 "),a("a",{class:"header-anchor",href:"#csrf-跨站请求伪造及其防护策略","aria-label":'Permalink to "CSRF 跨站请求伪造及其防护策略"'},"​")],-1),d=a("p",null,"第 3 个就是 CSRF 跨站请求伪造 。我们首先来讲一下什么是 CSRF 跨站请求伪造行为。这里我画了一张图：",-1),_=l("",22);function h(T,u,m,g,v,P){const n=o("Image");return t(),c("div",null,[i,p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/14/76/Ciqc1F7Q6YiASMiTAAB4a-LuU8A861.png"}),s(),E,p(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/14/76/Ciqc1F7Q6Z6AEwfFAAD8F-GMrW4529.png"}),s(),y,d,p(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/14/82/CgqCHl7Q6f-AQensAAE6SboBoZM422.png"}),s(),_])}const F=e(r,[["render",h]]);export{S as __pageData,F as default};
