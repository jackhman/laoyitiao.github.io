import{_ as n,D as c,o as e,g as i,J as o,h as l,Q as _,m as t}from"./chunks/framework.f67d7268.js";const dl=JSON.parse('{"title":"第36讲：代理工具与高级Mock使用（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(2078) 第36讲：代理工具与高级 Mock 使用（下）.md","filePath":"posts/devops/110-测试开发核心技术文档/(2078) 第36讲：代理工具与高级 Mock 使用（下）.md","lastUpdated":1696682708000}'),a={name:"posts/devops/110-测试开发核心技术文档/(2078) 第36讲：代理工具与高级 Mock 使用（下）.md"},r=_('<h1 id="第36讲-代理工具与高级mock使用-下" tabindex="-1">第36讲：代理工具与高级Mock使用（下） <a class="header-anchor" href="#第36讲-代理工具与高级mock使用-下" aria-label="Permalink to &quot;第36讲：代理工具与高级Mock使用（下）&quot;">​</a></h1><br><p>本课时我们开始讲解 HTTP 与 HTTPS 抓包分析，并结合代理，通过实际测试案例演示如何使用 Charles 工具。</p><h2 id="代理配置步骤" tabindex="-1">代理配置步骤 <a class="header-anchor" href="#代理配置步骤" aria-label="Permalink to &quot;代理配置步骤&quot;">​</a></h2><p>我们首先看下，通常配置代理需要几步。</p><br><p>第一步：配置代理，启动 Charles，然后配置浏览器使用代理；</p><p>第二步：获取 Charles 证书，如果你使用 burpsuite 或其他工具也一样，也需要获取工具证书；</p><p>第三步：把证书安装到手机或 PC 上；</p><p>第四步：设置信任，只有证书被信任了，才可以进行 HTTPS 抓包。</p><br><p>接下来，我先给你演示如何启动 Charles，然后配置代理，最后讲解如何获取证书。</p><br>',13),h=t("br",null,null,-1),u=t("p",null,"首先我们启动 Charles，启动之后可以看到，如果是未付费版本会提示等待 10 秒，然后每隔半小时它会自动停一次，这就是未付费版本的一个限制，这个限制并不影响我们的基本使用。如果你的公司需要做更多的场景应用，可以考虑购买一套。",-1),d=t("br",null,null,-1),p=t("br",null,null,-1),g=t("p",null,"那如何开启一个代理呢？首先点击 proxy settings，并设置一个端口，此时开启的端口就是代理。开启之后，它会监听在这个端口上的信息，从而实现代理功能。只需一步，开启代理就完成了。",-1),A=t("br",null,null,-1),m=t("br",null,null,-1),b=t("p",null,"需要注意，如果要抓 HTTPS 包，并且不会出现异常，还需要在 SSL Proxying Settings 中添加一项配置。",-1),C=t("br",null,null,-1),T=t("p",null,"代理配置完成后，接下来需要配置浏览器。这时我们打开浏览器，找到浏览器代理配置并设置一个代理服务器。我使用一款叫作 SwitchOmega 的工具，它可以完成对 Chrome 浏览器代理的基础配置。比如现在需要对 Charles 开启 8888 端口，就可以将代理指向 8888 端口。",-1),M=t("br",null,null,-1),Z=t("br",null,null,-1),k=t("p",null,"点击 Charles，会再次发起一个请求，此时就已经开始通过代理访问了。再次刷新网址，你就可以看到刚才 Chrome 发起的网络请求，并抓取到了数据包。",-1),x=t("br",null,null,-1),q=t("br",null,null,-1),D=t("p",null,"通常简单的配置只能抓 HTTP，如果你需要抓 HTTPS 这种需要认证的数据包，就还需要额外的一步。我们需要在代理中，先去访问 chls.pro/ssl，它会帮你自动打开证书。这是代理提供的一个小功能，它会下载一个叫 pem 的文件，下载完成之后其实就可以直接打开。",-1),P=t("br",null,null,-1),S=t("br",null,null,-1),f=t("p",null,"打开之后，点击添加就可以安装证书，在 Mac 上你可以打开证书的钥匙串功能。",-1),V=t("br",null,null,-1),E=t("p",null,'点开证书后可以找到 Charles 的证书设置，双击它，其中有一项"信任"选项，安装证书之后默认是不信任的，你需要把它添加为"始终信任"。添加完成之后，这个 Charles 证书才会成为一个信任的证书。这个时候才可以去抓 HTTPS 网站。',-1),H=t("br",null,null,-1),O=t("br",null,null,-1),w=t("p",null,[l("我们怎么去验证有没有成功呢？点击证书，你可以看到咱们的学员论坛 "),t("a",{href:"https://home.testing-studio.com",target:"_blank",rel:"noreferrer"},"https://home.testing-studio.com"),l(" 这个域名，点开这个域名，可以看到证书。如果走代理，它所使用的证书会是 Charles 自己的证书。")],-1),I=t("br",null,null,-1),N=t("br",null,null,-1),Q=t("p",null,"证书叫 Charles proxy Custom，如果是带这个特征的，就代表证书已经安装成功了，如果你看到这个证书，就代表代理 HTTPS 抓包可以完成了，你在百度上搜的内容，包括所有的 HTTPS 的包，系统都可以抓了。有的时候可能会因为chrome的cache机制导致证书展示有问题，可以关闭浏览器或者清空缓存多重试几次即可。",-1),v=t("br",null,null,-1),G=t("br",null,null,-1),W=t("p",null,'如果想去浏览已安装证书，在 Chrome 里有一个快捷的入口，你可以在 Chrome 的设置里面搜索"HTTPS"。无论是 Windows 还是 Mac，每个平台都可以通过点击按钮进入各自平台的证书管理页面，总之把你的证书设置为信任就可以了。',-1),y=t("h2",{id:"所有系统的证书安装方式",tabindex:"-1"},[l("所有系统的证书安装方式 "),t("a",{class:"header-anchor",href:"#所有系统的证书安装方式","aria-label":'Permalink to "所有系统的证书安装方式"'},"​")],-1),B=t("br",null,null,-1),J=t("p",null,[l("对于所有证书，无论是 Windows、Mac 还是 Android ，我给你在 hogwarts 学院的论坛里开了一个整理帖子 "),t("a",{href:"https://home.testing-studio.com/t/topic/1105",target:"_blank",rel:"noreferrer"},"https://home.testing-studio.com/t/topic/1105"),l("，你可以在帖子中查看相关信息。")],-1),K=t("h3",{id:"android-证书安装",tabindex:"-1"},[l("Android 证书安装 "),t("a",{class:"header-anchor",href:"#android-证书安装","aria-label":'Permalink to "Android 证书安装"'},"​")],-1),j=t("br",null,null,-1),F=t("p",null,"如果是 Android 也是一样的，我以 Android 模拟器为例，首先需要配置 Android 的代理设置，然后让代理指向 8888 端口，并通过 Charles 对外监听 8888 端口，通常情况下这也就是你的机器的本地 IP。",-1),U=t("br",null,null,-1),X=t("br",null,null,-1),z=t("p",null,"这样模拟器与电脑会在同一个子网中，并通过网络链接进行桥接，所以需要设置并获取真正的 IP 地址，让模拟器能够连接它。",-1),L=t("br",null,null,-1),Y=t("br",null,null,-1),R=t("p",null,"填好配置之后，需要先打开 Charles，在输入栏去输入 chls.pro/ssl，按回车，就可以打开自动下载证书的窗口。",-1),$=t("br",null,null,-1),tt=t("p",null,"Android 会有一个智能提示，提示证书是否需要直接安装？选择信任并直接安装就可以了，这样可以一步到位，把安装和信任两步全部完成。",-1),lt=t("br",null,null,-1),st=t("br",null,null,-1),ot=t("p",null,[l("我们再次访问 "),t("a",{href:"https://home.testing-studio.com/",target:"_blank",rel:"noreferrer"},"https://home.testing-studio.com/"),l("，打开论坛之后你可以注意到它的证书，我们点击这个证书并查验它，就可以看到证书的一些基本详情了。如果不加信任，打开 HTTPS 网站，系统会提示弹框：证书不受信任。")],-1),nt=t("br",null,null,-1),ct=t("br",null,null,-1),et=t("p",null,"另外说明一下， Android 6.0 默认信任用户级别的证书，但是到了 Android 7.0 之后，默认是不信任用户安装的证书的，所以这时，如果是 7.0 以上，就算安装了证书仍然会弹框。这时怎么办呢？你需要在 App 的包里更改一个系统设置，将证书改成信任，添加信任用户级别的证书就可以了。所以我推荐测试的过程中使用 Android 6.0 模拟器。",-1),it=t("h2",{id:"演练",tabindex:"-1"},[l("演练 "),t("a",{class:"header-anchor",href:"#演练","aria-label":'Permalink to "演练"'},"​")],-1),_t=t("br",null,null,-1),at=t("p",null,"解决了信任问题，接下来我们就进入演练。我使用 Android 6.0 的模拟器来给你进行演示。",-1),rt=t("h3",{id:"mock-实践-数据修改演示",tabindex:"-1"},[l("mock 实践-数据修改演示 "),t("a",{class:"header-anchor",href:"#mock-实践-数据修改演示","aria-label":'Permalink to "mock 实践-数据修改演示"'},"​")],-1),ht=t("br",null,null,-1),ut=t("p",null,"首先我们演示数据修改，我们要完成对雪球 App 的数据修改。",-1),dt=t("br",null,null,-1),pt=t("p",null,"因为我们配置好了证书，打开的时候，就有一堆数据要展示，比如你可以看到有中国平安。举个例子，我想测试当名字比较长的时候，列表显示会如何。还需要测试股价，比如 0.67，跌的时候是绿色的，可不可以改成一个正数，看它会不会变成红色。",-1),gt=t("br",null,null,-1),At=t("br",null,null,-1),mt=t("p",null,'首先要找到中国平安的股价在哪，直接搜"中国平安"，你会注意到它搜到两个接口，一个是 quote.json，一个是 list.json。',-1),bt=t("br",null,null,-1),Ct=t("br",null,null,-1),Tt=t("p",null,'接下来的目标就是把"中国平安"标题改掉，测试股票内容超长会怎么样，也包括股价颜色的变化，那怎么办呢？我们可以修改它，首先我们要用到系统里面的 rewrite 功能，点击 Enable Rewrite，',-1),Mt=t("br",null,null,-1),Zt=t("br",null,null,-1),kt=t("p",null,'接着我们需要创建一个匹配的条件，这里默认全部匹配。我们把中国平安全都改掉。点击 Rewrite 的规则，找到里面的 Body，然后对 Body 内容进行修改。同时修改 response，将"中国平安"改成"中国平安 Hogwarts"，可以多复制几遍。',-1),xt=t("br",null,null,-1),qt=t("br",null,null,-1),Dt=t("p",null,"批量修改完成之后，点击应用。这时再次刷新，你会发现 Hogwarts 这个词已经出现了，系统自动给它做了缩短，就算名字很长也不会挤压整个布局，说明系统的设置是符合预期的。",-1),Pt=t("br",null,null,-1),St=t("br",null,null,-1),ft=t("p",null,"接下来我们再改股价。股价现在是跌了 0.67%，如果改成涨了 0.67% 会怎么样呢？我们现在写规则，跟刚才一样的，也是对 Body 内容做修改，同时更改 response，现在是 -0.67，我们把它批量替换成 +0.67。",-1),Vt=t("br",null,null,-1),Et=t("br",null,null,-1),Ht=t("p",null,"我们再次测试并刷新。可以看到股价涨了，股票颜色也变成了红色，符合我们的预期。",-1),Ot=t("br",null,null,-1),wt=t("p",null,"通过这个办法，我们就可以去测试各种想要的数据。就算系统里面没有符合条件的，也可以自己构造。",-1),It=t("h3",{id:"mock实践-数据加倍演示",tabindex:"-1"},[l("mock实践-数据加倍演示 "),t("a",{class:"header-anchor",href:"#mock实践-数据加倍演示","aria-label":'Permalink to "mock实践-数据加倍演示"'},"​")],-1),Nt=t("br",null,null,-1),Qt=t("p",null,"我们再看第二个场景。对数据进行加倍展示。回到股票列表可以看到有京东、阿里巴巴、拼多多，我们前面讲过，比如测试一个外卖的时候，如果有两百个菜品的商家会是什么样子，它会不会有性能问题？但是如果让后端去配置这样的数据，一定会比较麻烦。有没有简单的办法可以实现呢？我们可以当数据量比较大的时候，直接借助 mock 完成。",-1),vt=t("br",null,null,-1),Gt=t("br",null,null,-1),Wt=t("p",null,"怎么进行 mock 呢？我们先去查找这个数据，比如搜索阿里巴巴，当我们搜阿里巴巴的时候，其实跟刚才一样，查找了三次，你可以看到阿里巴巴的数据，以及阿里巴巴股票页的基本信息，包括涨跌幅、涨跌额等内容。",-1),yt=t("br",null,null,-1),Bt=t("br",null,null,-1),Jt=t("p",null,'这个列表内容有没有办法把它批量化量产呢？你可以看到整个数据结构，首先是一个大的列表，最后提示 "item_size": 4。我们对数据进行复制处理，让它翻倍，比如加到几百个，然后看下这个列表有没有问题。',-1),Kt=t("br",null,null,-1),jt=t("br",null,null,-1),Ft=t("br",null,null,-1),Ut=t("p",null,"可以借助一个特殊的 jq 命令，它对 JSON 做处理的，可以对已有的数据进行翻倍处理，我们可以让它自己加自己，直到数据量非常大为止，比如加到 1024 个。",-1),Xt=t("br",null,null,-1),zt=t("br",null,null,-1),Lt=t("p",null,"当一个用户关注了一千多只股票的时候会怎么样呢？",-1),Yt=t("br",null,null,-1),Rt=t("br",null,null,-1),$t=t("p",null,"我们找到这个接口，右键有一个叫 map local。我们用map local替代真正的数据。",-1),tl=t("br",null,null,-1),ll=t("br",null,null,-1),sl=t("p",null,"这里我们使用的叫 map local。用于把一个远程服务器的特定路径的访问重定向为特定的本地的文件路径。经过这样设置之后，我们再看一下效果。刷新生效了，你可以看到中国平安加上一堆的其他内容，列表非常长，那么在这个长列表里面，数据的滚动、展示都没有问题。",-1),ol=t("br",null,null,-1),nl=t("p",null,"通过这个几个案例，我们就知道怎么去使用 Charles 这个非常强大的工具了。",-1);function cl(el,il,_l,al,rl,hl){const s=c("Image");return e(),i("div",null,[r,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcGAaUfuAAJb_76GZL0559.png"}),l(),h,u,d,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcGATZaoAAEfsHzxDvo312.png"}),l(),p,g,A,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcKAfZqeAADx5hGl_LQ106.png"}),l(),m,b,C,T,M,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcKAB_-xAADjysqJb_4134.png"}),l(),Z,k,x,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcKAOKZMAAHhKm5fkW8360.png"}),l(),q,D,P,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcKAWGT2AAHpOz4kiOw484.png"}),l(),S,f,V,E,H,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcOAQXb-AAIcrpB7Kes598.png"}),l(),O,w,I,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcOAAPtxAAIDEbaH9uQ555.png"}),l(),N,Q,v,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcOAV4RzAAGEOxY_jNY362.png"}),l(),G,W,y,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcOAS41aAATXau175AA558.png"}),l(),B,J,K,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcSAUp0wAAGmj_4rEpE452.png"}),l(),j,F,U,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcSAB8zaAAGv21xZ7Fc617.png"}),l(),X,z,L,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcSAFUaSAAE94SwsuA4481.png"}),l(),Y,R,$,tt,lt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcWASxdIAADvGOHdMnQ145.png"}),l(),st,ot,nt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcWAZxqUAAGFFpGhmSQ775.png"}),l(),ct,et,it,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcWAdujcAAEgirJ3ryE032.png"}),l(),_t,at,rt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcWAP-uWAAQdO9qNmJg336.png"}),l(),ht,ut,dt,pt,gt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcaAXSyNAAIs-w-b3Zk279.png"}),l(),At,mt,bt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcaAMgqSAADKlyAVgeE983.png"}),l(),Ct,Tt,Mt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcaAFMXaAAFMPAcAIkQ000.png"}),l(),Zt,kt,xt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcaAbFOPAAE61rFVpyM960.png"}),l(),qt,Dt,Pt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTceAKEewAAEwInxVAIo007.png"}),l(),St,ft,Vt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTceAHpPWAAEiobgF5Os914.png"}),l(),Et,Ht,Ot,wt,It,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTceAW-7vAADg_MOxQjg973.png"}),l(),Nt,Qt,vt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTciAWuNgAAJlmQ1QvgA598.png"}),l(),Gt,Wt,yt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTciAKgo_AAOs2U84e8M414.png"}),l(),Bt,Jt,Kt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTciANDbEAADaT1g-xXc632.png"}),l(),jt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTciAcXIuAABuN9TMbqo399.png"}),l(),Ft,Ut,Xt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcmAUJKkAABoz1-5EmY548.png"}),l(),zt,Lt,Yt,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/11/07/Ciqah16ZTcmANEaQAAQkvgqd4LY100.png"}),l(),Rt,$t,tl,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/8A/1D/Cgq2xl6ZTcmAUOL6AADtJkaZY2I039.png"}),l(),ll,sl,ol,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/D8/CgoCgV6ZTcqAYcLxAAEXJojG4oM743.png"}),l(),nl])}const pl=n(a,[["render",cl]]);export{dl as __pageData,pl as default};
