import{_ as o,j as e,o as t,g as c,k as n,Q as l,s,h as p}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"灰度发布 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1845) 第41讲：如何结合服务网格进行灰度发布.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1845) 第41讲：如何结合服务网格进行灰度发布.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1845) 第41讲：如何结合服务网格进行灰度发布.md"},E=l("",14),y=l("",4),i=l("",34),d=s("p",null,"当需要开发一个较大的新功能时，所花费的时间可能很长。在新功能的开发过程中，仍然需要对当前的版本进行 bug 修复。这种情况下，基于主干的开发方式的管理会变得复杂，可以考虑使用分支。",-1),u=s("p",null,"新旧版本有各自的 Git 分支，当前版本的代码使用主分支，当需要开发新版本时，从主分支创建新的分支来进行开发，两个分支都有各自的持续集成和部署流程。在新版本部署之后，仍然需要对旧版本进行 bug 修复，新版本也需要根据用户的反馈进行修改。当新版本更新完成之后，其分支被合并到主分支，准备下一个版本的开发。",-1),F=s("p",null,"在下图中，当需要开发新功能时，从主分支中创建一个新分支，并部署到蓝色环境。与此同时，主分支的开发仍然在进行中，并部署到绿色环境。不过在主分支中所做的改动只限于严重 bug 的修复，大部分的开发仍然在新分支中进行。在主分支中所做的修改，需要被定期合并到新分支中，这样就确保了新分支中包含了全部相关的改动。当新分支开发完成，并合并到主分支之后，新分支的部署环境会变成当前的生产环境。",-1),h=s("p",null,"新功能分支的版本号可以与主分支保持一致，也可以根据语义化版本的规范来更新版本号，是否更新版本号取决于改动的大小。新版本的分支都有各自的持续集成流程。由于持续集成所创建的容器镜像的标签使用 Git 提交的标识符作为后缀，因此不更新版本号也不会产生冲突。",-1),m=s("h3",{id:"总结",tabindex:"-1"},[p("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),v=s("p",null,"通过使用灰度发布，我们可以更加安全地对应用进行更新，不但可以进行更多的测试，当出现问题时还可以方便地回退部署。通过本课时的学习，你可以了解灰度发布相关的基本概念，还可以了解如何通过服务网格来实现，最后了解与灰度发布相对应的源代码管理策略。",-1),A=s("p",null,[p("最后呢，成老师邀请你为本专栏课程进行结课评价，因为你的每一个观点都是我们最关注的点。"),s("a",{href:"https://wj.qq.com/s2/6902680/3fb2/",target:"_blank",rel:"noreferrer"},"点击链接，即可参与课程评价"),p("。")],-1);function D(q,b,C,g,_,B){const a=e("Image");return t(),c("div",null,[E,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/3D/CA/CgqCHl8qj2CARN1lAABMDo8z1kM493.png"}),y,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/3D/CA/CgqCHl8qj3WALsbzAAA2dUtboDs639.png"}),i,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/3D/CC/CgqCHl8qk8CALlLgAAA9Y1Hv_ZE356.png"}),d,u,F,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/3D/CC/CgqCHl8qk9OAEuYoAABoYgeAeSo061.png"}),h,m,v,A])}const f=o(r,[["render",D]]);export{T as __pageData,f as default};
