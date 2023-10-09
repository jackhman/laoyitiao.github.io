import{_ as l,j as t,o as p,h as n,k as i,f as a,s as e,Q as o}from"./chunks/framework.d3daa342.js";const E=JSON.parse('{"title":"第12讲：SpringCloud综合案例","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(100) 第12讲：Spring Cloud综合案例.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(100) 第12讲：Spring Cloud综合案例.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(100) 第12讲：Spring Cloud综合案例.md"},d=e("h1",{id:"第12讲-springcloud综合案例",tabindex:"-1"},[a("第12讲：SpringCloud综合案例 "),e("a",{class:"header-anchor",href:"#第12讲-springcloud综合案例","aria-label":'Permalink to "第12讲：SpringCloud综合案例"'},"​")],-1),c=e("p",null,'你好，我是你的 Spring Cloud 讲师尹吉欢，欢迎来到第 12 课时"综合案例"的学习。',-1),h=e("h3",{id:"综合案例架构图",tabindex:"-1"},[a("综合案例架构图 "),e("a",{class:"header-anchor",href:"#综合案例架构图","aria-label":'Permalink to "综合案例架构图"'},"​")],-1),u=e("p",null,"相信你对案例的架构图并不陌生，在开词篇中我有介绍过。经过几个月的学习，终于到了最后总结的时刻。",-1),_=e("p",null,"本课时中的综合案例也是为了让你能够巩固前面学习的知识点，同时可以在使用 Spring Cloud 作为微服务架构时能有一个能够落地的参考。",-1),g=e("p",null,"我们再来回顾下这张图，首先是客户端会发起请求到负载均衡器，比如 Nginx。然后 Nginx 将请求转发到网关上，网关再转发到具体的服务上。",-1),b=e("p",null,"上面是注册中心的集群，也就是 Eureka。还有配置中心 Apollo 和链路跟踪 Sleuth 加 ZipKin。ELK 用来收集链路日志展示查询。",-1),m=e("p",null,"在这个架构中，并不会将所有的东西都搭建出来，但是会将最底层的代码框架搭建出来。像 Nginx、ELK 等就不会再具体演示了。",-1),k=e("h3",{id:"案例项目模块",tabindex:"-1"},[a("案例项目模块 "),e("a",{class:"header-anchor",href:"#案例项目模块","aria-label":'Permalink to "案例项目模块"'},"​")],-1),C=o("",4),A=e("p",null,"前端页面只实现了 2 个，一个是登录的页面，负责登录的功能，一个是文章详情的页面，负责获取文章信息展示，同时在这边还有个退出登录的按钮，执行退出操作。",-1),x=o("",34);function T(P,q,v,f,S,D){const r=t("Image");return p(),n("div",null,[d,c,h,i(r,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/27/50/Cgp9HWBcIOuACRh7AADDrLDk4gs631.png"}),a(),u,_,g,b,m,k,i(r,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/27/51/Cgp9HWBcIPaAYc_qAABYROhyDiA390.png"}),a(),C,i(r,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/27/4E/CioPOWBcIQWAAit7AABjdZD-Hs4729.png"}),a(),A,i(r,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/27/4E/CioPOWBcIQyAJveUAACBu7riNqg956.png"}),a(),x])}const N=l(s,[["render",T]]);export{E as __pageData,N as default};
