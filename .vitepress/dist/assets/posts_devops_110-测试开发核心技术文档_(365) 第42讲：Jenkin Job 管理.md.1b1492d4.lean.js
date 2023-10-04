import{_ as t,j as o,o as l,g as a,k as n,s as e,h as i,Q as c}from"./chunks/framework.e0c66c3f.js";const M=JSON.parse('{"title":"修改系统配置 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(365) 第42讲：Jenkin Job 管理.md","filePath":"posts/devops/110-测试开发核心技术文档/(365) 第42讲：Jenkin Job 管理.md","lastUpdated":1696338709000}'),p={name:"posts/devops/110-测试开发核心技术文档/(365) 第42讲：Jenkin Job 管理.md"},d=e("p",null,"本课时我们开始进入 Jenkins Job 管理的学习。我们在上一课时已经搭建好了一个崭新的 Jenkins，但 Jenkins 部署完成后，还需要做一些基础的配置。",-1),_=e("h4",{id:"修改系统配置",tabindex:"-1"},[i("修改系统配置 "),e("a",{class:"header-anchor",href:"#修改系统配置","aria-label":'Permalink to "修改系统配置"'},"​")],-1),r=e("p",null,"比如我们要在 Jenkins 里把默认的 Shell 改成 bash，默认的 sh 是一个老的 Shell 环境，很多高级功能其实是不具备的，而 bash 是目前使用最多的。有的时候，你写脚本可能会遇到一些问题，所以建议你把默认的 Shell 改成 bash。",-1),g=e("p",null,"默认的管理员邮箱也可以修改，还有服务器默认的域名。除此之外，还有安全、时区、slave 节点。所有的全局性的配置都可以在 Jenkins manager 中管理，比如各种细节参数，你都可以在其中进行相应配置。",-1),b=e("p",null,"然后是安全，Jenkins 启动之后默认有一个自己的安全机制，无论你是要改成自己公司关联的安全认证体系，还是基于项目设置权限，都可以进行配置。",-1),h=e("p",null,"时区配置相对来说会比较复杂一点，在 Jenkins 里面配置时区需要修改系统的配置。如果你使用 docker 安装，可以用这样一个简单的办法来处理，首先删除原来的 docker 实例，接着在 docker 实例启动过程中加一个参数：-e JAVA_OPTS，在里面设置一个数据，比如改成北京时间，这个时候，你的 Jenkins 就可以自动更改为指定的本地时间。如果你没有设置，它默认显示的是美国时间，会影响到你的使用。",-1),m=e("p",null,"插件管理可以用于安装、更新插件，必要的时候需要配置代理以加速插件的安装。可以在 Available 里挑选需要的插件，常用的的插件是 git、pipeline、blueocean等，更多插件按需安装即可。",-1),u=e("p",null,"还有一个部分是 slave 节点，它在 Jenkins 的 Nodes 模块下面，你可以自己创建一个新的节点，这个节点主要是为了执行 job。通常 Jenkins所在主机称之为 master，是一个主控机，它要管理很多 job，所以它本身的任务比较重，需要把具体的job执行放到分布式的node上。",-1),J=e("p",null,"通常对每一个 job、每个任务的执行，我们不会在主机上直接执行，而是通过多台机器来进行分担。不同的机器，比如 Windows、Mac、Linux，它们的职责是不一样的，你可以通过节点来管理所有需要控制的资源。那么 slave 节点是在 manager Jenkins 下面的 manager nodes and clouds 里面，你可以写上自己的设备，比如这是我写的一个设备。后面你可以通过把任务与节点进行关联，在特定的节点进行运行。",-1),k=e("p",null,"slave 节点的连接方法，在前面我们启动 docker 的时候，用到了一个叫 50000 的端口，这个端口其实就是在这个地方使用的。8080 是 Jenkins 默认的对外访问的 UI 交互地址，而 50000 端口主要是 slave 节点与 Jenkins 之间进行通信的。创建一个节点之后，你可以使用 8080 端口连接 Jenkins，然后，通过 50000 端口建立真正的连接，所以你要确保这两个端口一定是开启并且配对的，不然你的 slave 是连接不上的。",-1),A=e("h4",{id:"一个-job-的组成部分",tabindex:"-1"},[i("一个 job 的组成部分 "),e("a",{class:"header-anchor",href:"#一个-job-的组成部分","aria-label":'Permalink to "一个 job 的组成部分"'},"​")],-1),j=c("",11);function S(C,V,v,E,f,G){const s=o("Image");return l(),a("div",null,[d,_,r,g,b,n(s,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/0E/D8/Ciqc1F7GV2OAC29ZAAGVjgHtjWQ238.png"}),h,n(s,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/0E/E4/CgqCHl7GV2yAJ_KVAAFGA_fzlXE743.png"}),m,n(s,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/0E/D8/Ciqc1F7GV3SADKBKAAG86XgJj0g712.png"}),u,J,n(s,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/0E/E4/CgqCHl7GV3yAB9M7AAJkJgTs8Eg515.png"}),k,A,n(s,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/0E/E4/CgqCHl7GV4OAJUdSAAFnYw4JkGE523.png"}),j])}const T=t(p,[["render",S]]);export{M as __pageData,T as default};
