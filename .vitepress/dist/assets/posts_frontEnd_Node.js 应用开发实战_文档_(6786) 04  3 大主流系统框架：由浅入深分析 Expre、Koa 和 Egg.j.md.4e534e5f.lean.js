import{_ as o,j as e,o as t,h as c,k as p,f as n,Q as l,s}from"./chunks/framework.d3daa342.js";const N=JSON.parse('{"title":"043大主流系统框架：由浅入深分析Expre、Koa和Egg.j","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6786) 04  3 大主流系统框架：由浅入深分析 Expre、Koa 和 Egg.j.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6786) 04  3 大主流系统框架：由浅入深分析 Expre、Koa 和 Egg.j.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6786) 04  3 大主流系统框架：由浅入深分析 Expre、Koa 和 Egg.j.md"},E=l("",7),y=l("",8),i=l("",46),F=l("",19),d=s("p",null,"图 3 Express app.use 代码实现",-1),g=s("p",null,[n("当没有传入 path 时，会默认设置 path 为 / ，而 / 则是"),s("strong",null,"匹配任何路径"),n("，最终都是调用 router.use 将 fn 中间件函数传入到 router 中。")],-1),h=s("p",null,"接下来我们看下 router.use 的代码实现。",-1),C=s("p",null,[s("strong",null,"router/index.js")],-1),u=s("p",null,"这个文件在当前目录 router 下的 index.js 中，有一个方法叫作 proto.use，即 application.js 中调用的 router.use 。",-1),A=s("p",null,"图 4 中间件 push 实现",-1),B=s("p",null,"图 4 中的代码经过一系列处理，最终将中间件函数通过 Layer 封装后放到栈列表中。就完成了中间件的处理，最后我们再来看下用户请求时，是如何在栈列表执行的。",-1),v=s("p",null,[n("所有请求进来后都会调用 application.js 中的 "),s("strong",null,"app.handle"),n(" 方法，该方法最终调用的是 router/index.js 中的 "),s("strong",null,"proto.handle"),n(" 方法，所以我们主要看下 router.handle 的实现。在这个函数中有一个 next 方法非常关键，用于判断执行"),s("strong",null,"下一层中间件的逻辑"),n("，它的原理是从栈列表中取出一个 layer 对象，判断是否满足当前匹配，如果满足则执行该中间件函数，如图 5 所示。")],-1),m=s("p",null,"图 5 中间件执行逻辑",-1),D=s("p",null,"接下来我们再看看 layer.handle_request 的代码逻辑，如图 6 所示。",-1),x=l("",21),b=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),n(")")],-1),_=s("p",null,[s("strong",null,"《大前端高薪训练营》")],-1),k=s("p",null,[n("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),n("，快来领取！")],-1);function f(j,w,q,P,T,K){const a=e("Image");return t(),c("div",null,[E,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/17/0C/CioPOWBHM5qAFpsgAA9oKfFNTFM895.png"}),n(),y,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/17/10/Cgp9HWBHM6eAF1p7AAG-YifWNQg212.png"}),n(),i,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/17/0D/CioPOWBHM7-AN7gmAABaG7HpWG8493.png"}),n(),F,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/17/10/Cgp9HWBHM-CAYcukAAFHHQytNag202.png"}),n(),d,g,h,C,u,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/17/0D/CioPOWBHM-eAT835AAFGYW1HaL0653.png"}),n(),A,B,v,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/17/0D/CioPOWBHM_CAGrfhAAEAXbjYjVU402.png"}),n(),m,D,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/17/10/Cgp9HWBHM_iAAdIdAACdFAXr7Tg707.png"}),n(),x,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/FA/CioPOWBBrAKAAod-AASyC72ZqWw233.png"}),n(),b,_,k])}const H=o(r,[["render",f]]);export{N as __pageData,H as default};
