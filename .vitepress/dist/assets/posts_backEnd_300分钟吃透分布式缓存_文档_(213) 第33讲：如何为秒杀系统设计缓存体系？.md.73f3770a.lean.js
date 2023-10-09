import{_ as o,j as a,o as l,h as n,k as _,f as s,Q as p,s as t}from"./chunks/framework.d3daa342.js";const v=JSON.parse('{"title":"第33讲：如何为秒杀系统设计缓存体系？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(213) 第33讲：如何为秒杀系统设计缓存体系？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(213) 第33讲：如何为秒杀系统设计缓存体系？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(213) 第33讲：如何为秒杀系统设计缓存体系？.md"},r=p("",24),i=t("p",null,"秒杀系统专为秒杀活动服务，售卖商品确定，因此可以在设计秒杀商品页面时，将商品信息提前设计为静态信息，将静态的商品信息以及常规的 CSS、JS、宣传图片等静态资源，一起独立存放到 CDN 节点，加速访问，且降低系统访问压力。",-1),d=t("br",null,null,-1),h=t("p",null,"在访问前端也可以制定种种限制策略，比如活动没开始时，抢购按钮置灰，避免抢先访问，用户抢购一次后，也将按钮置灰，让用户排队等待，避免反复刷新。",-1),u=t("br",null,null,-1),b=t("p",null,"用户所有的请求进入秒杀系统前，通过负载均衡策略均匀分发到不同 Web 服务器，避免节点过载。在 Web 服务器中，首先进行各种服务预处理，检查用户的访问权限，识别并发刷订单的行为。同时在真正服务前，也要进行服务前置检查，避免超售发生。如果发现售出数量已经达到秒杀数量，则直接返回结束。",-1),m=t("br",null,null,-1),A=t("p",null,"秒杀系统在处理抢购业务逻辑时，除了对用户进行权限校验，还需要访问商品服务，对库存进行修改，访问订单服务进行订单创建，最后再进行支付、物流等后续服务。这些依赖服务，可以专门为秒杀业务设计排队策略，或者额外部署实例，对秒杀系统进行专门服务，避免影响其他常规业务系统。",-1),C=t("p",null,"在秒杀系统设计中，最重要的是在系统开发之初就进行有效分拆。首先分拆秒杀活动页面的内容，将静态内容分拆到 CDN，动态内容才通过接口访问。其次，要将秒杀业务系统和其他业务系统进行功能分拆，尽量将秒杀系统及依赖服务独立分拆部署，避免影响其他核心业务系统。",-1),f=t("br",null,null,-1),g=t("p",null,"由于秒杀的参与者远大于商品数，为了提高抢购的概率，时常会出现一些利用脚本和僵尸账户并发频繁调用接口进行强刷的行为，秒杀系统需要构建访问记录缓存，记录访问 IP、用户的访问行为，发现异常访问，提前进行阻断及返回。同时还需要构建用户缓存，并针对历史数据分析，提前缓存僵尸强刷专业户，方便在秒杀期间对其进行策略限制。这些访问记录、用户数据，通过缓存进行存储，可以加速访问，另外，对用户数据还进行缓存预热，避免活动期间大量穿透。",-1),x=t("br",null,null,-1),k=t("p",null,"在业务请求处理时，所有操作尽可能由缓存交互完成。由于秒杀商品较少，相关信息全部加载到内存，把缓存暂时当作存储用，并不会带来过大成本负担。",-1),N=t("br",null,null,-1),q=t("p",null,"为秒杀商品构建商品信息缓存，并对全部目标商品进行预热加载。同时对秒杀商品构建独立的库存缓存，加速库存检测。这样通过秒杀商品列表缓存，进行快速商品信息查询，通过库存缓存，可以快速确定秒杀活动进程，方便高效成交或无可售商品后的快速检测及返回。在用户抢购到商品后，要进行库存事务变更，进行库存、订单、支付等相关的构建和修改，这些操作可以尽量由系统只与缓存组件交互完成初步处理。后续落地等操作，必须要入DB库的操作，可以先利用消息队列机，记录成交事件信息，然后再逐步分批执行，避免对 DB 造成过大压力。",-1),D=t("br",null,null,-1),B=t("p",null,"总之，在秒杀系统中，除了常规的分拆访问内容和服务，最重要的是尽量将所有数据访问进行缓存化，尽量减少 DB 的访问，在大幅提升系统性能的同时，提升用户体验。",-1);function P(S,T,V,E,I,U){const e=a("Image");return l(),n("div",null,[r,_(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/CA/Cgq2xl4B4UqAL8uCAADQNODClaU362.png"}),s(),i,d,h,u,b,m,A,_(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/CA/Cgq2xl4B4XiAaox5AACe7kKMixU642.png"}),s(),C,f,g,x,k,N,q,D,B])}const M=o(c,[["render",P]]);export{v as __pageData,M as default};
