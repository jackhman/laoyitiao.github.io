import{_ as l,j as o,o as c,g as t,k as n,Q as p,s,h as e}from"./chunks/framework.e0c66c3f.js";const R=JSON.parse('{"title":"Webpack 自动编译 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(2266) 第06讲：如何使用 Dev Server 提高你的本地开发效率？.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(2266) 第06讲：如何使用 Dev Server 提高你的本地开发效率？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/102-Webpack原理与实践文档/(2266) 第06讲：如何使用 Dev Server 提高你的本地开发效率？.md"},i=p("",6),E=p("",9),y=p("",17),d=s("p",null,"不过这里需要注意的是，webpack-dev-server 为了提高工作速率，它并没有将打包结果写入到磁盘中，而是暂时存放在内存中，内部的 HTTP Server 也是从内存中读取这些文件的。这样一来，就会减少很多不必要的磁盘读写操作，大大提高了整体的构建效率。",-1),h=p("",15),_=s("h4",{id:"proxy-代理",tabindex:"-1"},[e("Proxy 代理 "),s("a",{class:"header-anchor",href:"#proxy-代理","aria-label":'Permalink to "Proxy 代理"'},"​")],-1),b=s("p",null,"由于 webpack-dev-server 是一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。但是最终上线过后，我们的应用一般又会和后端服务部署到同源地址下。",-1),g=s("p",null,"那这样就会出现一个非常常见的问题：在实际生产环境中能够直接访问的 API，回到我们的开发环境后，再次访问这些 API 就会产生跨域请求问题。",-1),v=s("p",null,"可能有人会说，我们可以用跨域资源共享（CORS）解决这个问题。确实如此，如果我们请求的后端 API 支持 CORS，那这个问题就不成立了。但是并不是每种情况下服务端的 API 都支持 CORS。如果前后端应用是同源部署，也就是协议 / 域名 / 端口一致，那这种情况下，根本没必要开启 CORS，所以跨域请求的问题仍然是不可避免的。",-1),u=s("p",null,"那解决这种开发阶段跨域请求问题最好的办法，就是在开发服务器中配置一个后端 API 的代理服务，也就是把后端接口服务代理到本地的开发服务地址。",-1),k=s("p",null,"webpack-dev-server 就支持直接通过配置的方式，添加代理服务。接下来，我们来看一下它的具体用法。",-1),A=s("p",null,"这里我们假定 GitHub 的 API 就是我们应用的后端服务，那我们的目标就是将 GitHub API 代理到本地开发服务器中。",-1),C=s("p",null,"我们可以先在浏览器中尝试访问其中的一个接口，具体结果如下图：",-1),m=p("",5),F=p("",3),w=p("",4),B=s("p",null,"此时，我们就可以回到代码中使用代理后的本地同源地址去请求后端接口，而不必担心出现跨域问题了。",-1),f=s("h3",{id:"写在最后",tabindex:"-1"},[e("写在最后 "),s("a",{class:"header-anchor",href:"#写在最后","aria-label":'Permalink to "写在最后"'},"​")],-1),S=s("p",null,"最后再来总结一下今天的内容，今天跟你分享了一个叫作 webpack-dev-server 的工具，它是 Webpack 周边工具中最重要的一个，作用就是提升开发者的开发体验，帮助开发者更快更高效的完成开发工作。",-1),T=s("p",null,'当然 webpack-dev-server 提供的体验还不止如此，它还可以提供一种叫作"模块热替换"的开发体验，这一块内容相对复杂一些，我会在 08 课时中详细介绍。',-1),D=s("p",null,'另外我想说，现代化的前端开发过程已经非常方便了，如果你还在使用原始"刀耕火种"的方式进行开发，就一定要尝试一下这些现代化的工具。',-1);function P(W,x,I,j,q,H){const a=o("Image");return c(),t("div",null,[i,n(a,{alt:"理想的环境.gif",src:"https://s0.lgstatic.com/i/image/M00/03/60/CgqCHl6ykgmAQxFBAPPMpiFtDhw170.gif"}),E,n(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/03/18/Ciqc1F6yYKmAQNcsAAgeCW_ItQU095.png"}),y,n(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykrKAKqeOAABe6Avstu0065.png"}),d,n(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykr2ATByyAAA43IcwZBo618.png"}),h,n(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/03/19/Ciqc1F6yYX2ANKWcAAPBaG2a7VI047.png"}),_,b,g,v,u,k,A,C,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/03/19/CgqCHl6yYZaANEg7AAcJihajV7o403.png"}),m,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykvCAKWlNAAAktiTnWHU229.png"}),F,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykt-AfcoLAAAkkBntZkc327.png"}),w,n(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/03/19/Ciqc1F6yYeGAJ8GbAAcUqWinpoA554.png"}),B,f,S,T,D])}const N=l(r,[["render",P]]);export{R as __pageData,N as default};
