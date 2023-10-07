import{_ as p,j as e,o as t,g as c,k as l,h as n,Q as o,s}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"24CICD：容器化后如何实现持续集成与交付？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4595) 24  CICD：容器化后如何实现持续集成与交付？（上）.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4595) 24  CICD：容器化后如何实现持续集成与交付？（上）.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/045_由浅入深吃透 Docker/(4595) 24  CICD：容器化后如何实现持续集成与交付？（上）.md"},y=o("",29),E=s("p",null,"图1 GitLab 设置密码界面",-1),i=s("p",null,"第一次登陆，GitLab 会要求我们设置管理员密码，我们输入管理员密码后点击确认即可，之后 GitLab 会自动跳转到登录页面。",-1),F=o("",9),C=s("p",null,"图3 Jenkins 登录界面",-1),d=s("p",null,"然后将日志中的密码粘贴到密码框即可，之后 Jenkins 会自动初始化，我们根据引导，安装推荐的插件即可。",-1),D=s("p",null,"图4 Jenkins 引导页面",-1),A=s("p",null,"选择好安装推荐的插件后，Jenkins 会自动开始初始化一些常用插件。界面如下：",-1),u=s("p",null,"图5 Jenkins 插件初始化",-1),g=s("p",null,"插件初始化完后，创建管理员账户和密码，输入用户名、密码和邮箱等信息，然后点击保存并完成即可。",-1),h=s("p",null,"图6 Jenkins 创建管理员",-1),k=s("p",null,"这里，确认 Jenkins 地址，我们就可以进入到 Jenkins 主页了。",-1),_=s("p",null,"图7 Jenkins 主页",-1),b=s("p",null,"然后在系统管理 -> 插件管理 -> 可选插件处，搜索 GitLab 和 Docker ，分别安装相关插件即可，以便我们的 Jenkins 服务和 GitLab 以及 Docker 可以更好地交互。",-1),m=s("p",null,"图8 Jenkins 插件安装",-1),B=s("p",null,"等待插件安装完成， 重启 Jenkins ，我们的 Jenkins 环境就准备完成了。",-1),v=s("p",null,"现在，我们的 Docker+Jenkins+GitLab 环境已经准备完成，后面只需要把我们的代码推送到 GitLab 中，并做相关的配置即可实现推送代码自动构建镜像和发布。",-1),f=s("h3",{id:"结语",tabindex:"-1"},[n("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),I=s("p",null,"Docker 的出现解决了 CI/CD 流程中的各种问题，Docker 交付的镜像不仅包含应用程序，也包含了应用程序的运行环境，这很好地解决了开发和线上环境不一致问题。同时 Docker 的出现也极大地提升了 CI/CD 的构建效率，我们仅仅需要编写一个 Dockerfile 并将 Dockerfile 提交到我们的代码仓库即可快速构建出我们的应用，最后，当我们构建好 Docker 镜像后 Docker 可以帮助我们快速发布及更新应用。",-1),J=s("p",null,"那么，你知道 Docker 还可以帮助我们解决 CI/CD 流程中的哪些问题吗？",-1),q=s("p",null,"下一讲，我将为你讲解 CI/CD 实战，利用我们准备好的环境自动构建和发布应用。",-1);function w(j,G,L,P,N,x){const a=e("Image");return t(),c("div",null,[y,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6F/40/CgqCHl-05ceAOEtOAAC7xTjpRgo536.png"}),n(),E,i,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6F/40/CgqCHl-05eKAftEiAACO_hts6R8497.png"}),n(),F,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05giAJYDhAADCpDZzl2M065.png"}),n(),C,d,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05hSAHd7VAAEpFeu4qfY218.png"}),n(),D,A,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05h-AUSiFAAEAxHFCt30058.png"}),n(),u,g,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05iaANJXNAABXftlfsvQ115.png"}),n(),h,k,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05i2AR2lRAADHULl7Ysk145.png"}),n(),_,b,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05j2AfmTUAAGVJGSmG1g804.png"}),n(),l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6F/35/Ciqc1F-05kKAMr27AAGh4SQTNsU299.png"}),n(),m,B,v,f,I,J,q])}const M=p(r,[["render",w]]);export{T as __pageData,M as default};
