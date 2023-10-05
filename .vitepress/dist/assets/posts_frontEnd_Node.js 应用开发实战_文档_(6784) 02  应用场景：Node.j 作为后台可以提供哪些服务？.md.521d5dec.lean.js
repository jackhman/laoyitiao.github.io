import{_ as n,j as r,o as l,g as i,k as e,h as o,s as t,Q as a}from"./chunks/framework.4e7d56ce.js";const K=JSON.parse('{"title":"服务分类 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6784) 02  应用场景：Node.j 作为后台可以提供哪些服务？.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6784) 02  应用场景：Node.j 作为后台可以提供哪些服务？.md","lastUpdated":1696417798000}'),_={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6784) 02  应用场景：Node.j 作为后台可以提供哪些服务？.md"},p=t("p",null,"目前 Node.js 最常被用作前端工程化，导致大家误解为 Node.js 只适合作前端工程化工具，而忽视了其作为后端服务的特性。导致很少在后端研发中考虑使用 Node.js，认为没有任何优势，比如适用场景较少、性能较差等。为了消除这种误解，本讲将介绍 Node.js 的特性，以及适合哪些后端应用场景。",-1),d=t("h3",{id:"服务分类",tabindex:"-1"},[o("服务分类 "),t("a",{class:"header-anchor",href:"#服务分类","aria-label":'Permalink to "服务分类"'},"​")],-1),c=t("p",null,"我们常听说的服务有 RESTful 和 RPC，但这都是架构设计规范。我们也可以从另外一个角度来分析后台服务，如图 1 所示。",-1),g=a("",8),h=t("p",null,"图 2 业务网关的作用对比效果图",-1),u=t("p",null,"从上图我们可以看到，其实每个项目的鉴权都是相似的，没有必要在每个项目中维护一份通用的鉴权服务。因此可以提炼一层叫作业务网关，专门处理业务相关的通用逻辑，包括鉴权模块。",-1),m=t("p",null,"接下来我们就从一个实际的例子 OPEN API 的业务网关来介绍下这类服务场景。",-1),A=t("h4",{id:"业务场景",tabindex:"-1"},[o("业务场景 "),t("a",{class:"header-anchor",href:"#业务场景","aria-label":'Permalink to "业务场景"'},"​")],-1),N=t("p",null,"OPEN API 一般会有一个统一的 token 鉴权，通过 token 鉴权后还需要判断第三方的 appid 是否有接口权限，其次判断接口是否到达了请求频率上限。为了服务安全，我们也可以做一些降级处理，在服务过载时，可以根据优先级抛弃一些请求，具体可以查看图 3。",-1),P=t("p",null,"接下来我们从技术层面来看为什么 Node.js 更适合此类应用场景。",-1),f=t("h4",{id:"服务特性",tabindex:"-1"},[o("服务特性 "),t("a",{class:"header-anchor",href:"#服务特性","aria-label":'Permalink to "服务特性"'},"​")],-1),j=t("p",null,"根据图 2 的场景应用，我们专注看下 Nginx 后面的业务网关处理层，它的业务场景如图 4 所示。",-1),C=t("p",null,"这 3 个功能都是基于缓存来处理业务逻辑的，大部分都是网络 I/O ，并未涉及 CPU 密集型逻辑，这也是 Node.js 的优势，其次异步驱动的方案能够处理更高的并发。根据第 01 讲的内容，Node.js 的代码核心是不阻塞主线程处理，而这类业务网关都是轻 CPU 运算服务。因此在这类场景的技术选型中，可以考虑使用 Node.js 作为服务端语言。",-1),T=t("h3",{id:"中台服务",tabindex:"-1"},[o("中台服务 "),t("a",{class:"header-anchor",href:"#中台服务","aria-label":'Permalink to "中台服务"'},"​")],-1),b=t("p",null,[o("在 Web 或者 App 应用中都存在一些"),t("strong",null,"通用服务"),o("，以往都是独立接口、独立开发。随着公司应用越来越多，需要将一些通用的业务服务进行集中，这也是中台的概念。而这部分业务场景往往也是网络 I/O 高、并发较大、业务关联性高、数据库读写压力相对较小。下面我们就来分析下这种业务场景。")],-1),B=t("h4",{id:"业务场景-1",tabindex:"-1"},[o("业务场景 "),t("a",{class:"header-anchor",href:"#业务场景-1","aria-label":'Permalink to "业务场景"'},"​")],-1),k=t("p",null,"为了避免资源浪费、人力浪费，我们可以使用如图 5 所示的中台服务系统：",-1),x=a("",4),I=a("",6),S=a("",10),V={href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},E=t("p",null,[t("strong",null,"《大前端高薪训练营》")],-1),O=t("p",null,[o("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),t("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),o("，快来领取！")],-1);function q(D,W,U,w,M,R){const s=r("Image");return l(),i("div",null,[p,d,c,e(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/13/29/Cgp9HWBB2I2ALxWGAAC4luceI5c251.png"}),o(),g,e(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2A/CioPOWBB3lmASJg-AAHV0vpcYas739.png"}),o(),h,u,m,A,N,e(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2A/CioPOWBB3nOAWYquAABKfQ7r_hc648.png"}),P,f,j,e(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2D/Cgp9HWBB3nyAcYKlAABG_EYz4Lo055.png"}),C,T,b,B,k,e(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2E/Cgp9HWBB3oaAV4SxAAA1KV5k6KE492.png"}),x,e(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2B/CioPOWBB3p-AQBVzAABL9J_mTls495.png"}),I,e(s,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2B/CioPOWBB3qyAB_uYAAA0AUisml4262.png"}),S,t("p",null,[t("a",V,[e(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/FA/CioPOWBBrAKAAod-AASyC72ZqWw233.png"})])]),E,O])}const Y=n(_,[["render",q]]);export{K as __pageData,Y as default};
