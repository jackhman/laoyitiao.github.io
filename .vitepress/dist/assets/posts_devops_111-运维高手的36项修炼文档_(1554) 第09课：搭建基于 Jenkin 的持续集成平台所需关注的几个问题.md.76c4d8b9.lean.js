import{_ as t,D as o,o as i,g as r,J as p,h as a,Q as s,m as e}from"./chunks/framework.f67d7268.js";const V=JSON.parse('{"title":"第09课：搭建基于Jenkin的持续集成平台所需关注的几个问题","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1554) 第09课：搭建基于 Jenkin 的持续集成平台所需关注的几个问题.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1554) 第09课：搭建基于 Jenkin 的持续集成平台所需关注的几个问题.md","lastUpdated":1696682708000}'),l={name:"posts/devops/111-运维高手的36项修炼文档/(1554) 第09课：搭建基于 Jenkin 的持续集成平台所需关注的几个问题.md"},_=s("",10),c=s("",15),h=s("",9),k=e("br",null,null,-1),d=e("p",null,"微服务是当前的一个主流架构，Jenkins 很好的支持企业微服务部署环节。K8s 完美地解决了调度，负载均衡，集群管理、有状态数据的管理等微服务面临的问题，成为企业微服务容器化的首选解决方案。Jenkins 支持打包部署通过 Docker 来承载应用，我们会把应用封装进镜像，然后通过 Jenkins 打包一个完整的镜像并上传到镜像仓库。",-1),b=e("br",null,null,-1),A=e("p",null,"另外，我们会看到在小型的集成方案里面，Shell 是有局限性的，管理起海量的服务系统，不如 Ansible 或者自动化执行的管理模块方便，自动化运维能力也没有那么强大。这个时候我们则可以用 Ansible 来做自动化任务。",-1),E=e("br",null,null,-1),J=e("p",null,"我们会看到镜像仓库，它在这套环境中的代码发布管理流程中至关重要。我们需要把每一个镜像，按照它的版本号和发布时间和主题描述来进行版本的管理，方便于发布记录及回滚，所以仓库管理也成了微服务集成架构里面非常重要的一个组件。",-1),m=e("br",null,null,-1),B=e("p",null,"Jenkins 在微服务的集成架构里面起着一个核心的持续集成环境平台的作用。",-1),g=e("h2",{id:"devops-集成架构",tabindex:"-1"},[a("Devops 集成架构 "),e("a",{class:"header-anchor",href:"#devops-集成架构","aria-label":'Permalink to "Devops 集成架构"'},"​")],-1),u=e("p",null,"最后的一张图示，就是 Devops 集成架构了：",-1),D=s("",10),v=s("",69);function T(S,P,C,q,f,j){const n=o("Image");return i(),r("div",null,[_,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/4B/CgpOIF5wY7yAJJsMAAJRRuQVMKw843.png"}),a(),c,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/4B/Cgq2xl5wY76ASQwBAAUQzeQk2NQ579.png"}),a(),h,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/4B/CgpOIF5wY76AB1SaAAZNIemKRrY433.png"}),a(),k,d,b,A,E,J,m,B,g,u,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/4B/Cgq2xl5wY7-ANUjVAAdwdd2Q2To107.png"}),a(),D,p(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/4B/CgpOIF5wY7-AFSPOAAVFUJDaFAI724.png"}),a(),v])}const F=t(l,[["render",T]]);export{V as __pageData,F as default};
