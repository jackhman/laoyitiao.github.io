import{_ as p,j as e,o as t,h as r,k as o,f as a,s,Q as l}from"./chunks/framework.d3daa342.js";const v=JSON.parse('{"title":"18权限分析：Kubernete集群权限管理那些事儿","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4535) 18  权限分析：Kubernete 集群权限管理那些事儿.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4535) 18  权限分析：Kubernete 集群权限管理那些事儿.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4535) 18  权限分析：Kubernete 集群权限管理那些事儿.md"},y=s("h1",{id:"_18权限分析-kubernete集群权限管理那些事儿",tabindex:"-1"},[a("18权限分析：Kubernete集群权限管理那些事儿 "),s("a",{class:"header-anchor",href:"#_18权限分析-kubernete集群权限管理那些事儿","aria-label":'Permalink to "18权限分析：Kubernete集群权限管理那些事儿"'},"​")],-1),E=s("p",null,"你好，我是正范。",-1),i=s("p",null,[a("通过前面的课程学习，你已经学会了使用"),s("code",null,"kubectl"),a("命令行，或者直接发送 REST 请求，以及使用各种语言的 "),s("a",{href:"https://kubernetes.io/docs/reference/using-api/client-libraries/",target:"_blank",rel:"noreferrer"},"client 库"),a("来跟 APIServer 进行交互。那么你是否知道在这其中Kubernetes 是如何对这些请求进行认证、授权的呢？这节课，我们就来一探究竟。")],-1),F=s("p",null,"任何请求访问 Kubernetes 的 kube-apiserver 时，都要依次经历三个阶段：认证（Authentication，有时简写成 AuthN）、授权（Authorization，有时简写成 AuthZ）和准入控制（Admission Control）。",-1),u=l("",26),d=l("",36);function h(C,b,B,k,g,m){const n=e("Image");return t(),r("div",null,[y,E,i,F,o(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/62/1E/Ciqc1F-RVYyAeaf5AABESlN1pJg327.png"}),a(),u,o(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/62/1E/Ciqc1F-RVduACXUqABUdlGrHMh4648.png"}),a(),d])}const A=p(c,[["render",h]]);export{v as __pageData,A as default};
