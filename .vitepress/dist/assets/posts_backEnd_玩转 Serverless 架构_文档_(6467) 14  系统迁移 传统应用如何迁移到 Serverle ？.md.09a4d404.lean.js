import{_ as e,j as o,o as r,g as t,k as p,h as n,s,Q as l}from"./chunks/framework.4e7d56ce.js";const G=JSON.parse('{"title":"传统应用应该如何迁移到 Serverless ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6467) 14  系统迁移 传统应用如何迁移到 Serverle ？.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6467) 14  系统迁移 传统应用如何迁移到 Serverle ？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/玩转 Serverless 架构_文档/(6467) 14  系统迁移 传统应用如何迁移到 Serverle ？.md"},E=s("p",null,"Serverless 有很多优点，可以让你不用关心运维、按量付费节省成本......所以很多同学一直想把已有应用迁移到 Serverless 架构上。但因为 Serverless 是一项新的技术，和传统开发方式区别很大，迁移成本也很大。",-1),y=s("p",null,"另外，基于 Serverless 架构的应用是由 FaaS 和 BaaS 组成的（FaaS 提供计算资源，BaaS 提供数据存储和服务），而传统应用的计算和存储都在同一台服务器上，所以传统应用要想迁移到 Serverless 架构上，就要进行相关的改造。",-1),i=s("p",null,"这一讲我会先从整体上带你了解传统应用迁移到 Serverless 架构的几个重要改造点，然后带你了解怎么把传统 Web 服务进行 Serverless 改造。希望你学完今天的内容之后，能知道自己的应用适不适合迁移到 Serverless 架构、具体怎么实现，以及迁移过程中有哪些需要注意的地方。",-1),F=s("h3",{id:"传统应用应该如何迁移到-serverless",tabindex:"-1"},[n("传统应用应该如何迁移到 Serverless "),s("a",{class:"header-anchor",href:"#传统应用应该如何迁移到-serverless","aria-label":'Permalink to "传统应用应该如何迁移到 Serverless"'},"​")],-1),v=s("p",null,"传统应用的典型特点就是：应用进程是持续运行在服务器上的。",-1),d=s("p",null,"以 Web 服务为例，要部署一个应用，你要买服务器，然后把代码部署到服务器上，启动服务进程，监听服务器相关的端口，然后等待客户端请求，收到请求后进行处理并返回处理结构。这个服务进程是常驻的，就算没有客户端的请求，也会占用服务器资源。",-1),u=s("p",null,"传统 Web 服务架构",-1),A=s("p",null,[n("因为应用进程常驻，同一个服务器上的内存可以共享，所以传统应用通常可以在内存中缓存数据，以便提升计算性能（比如在内存中保存用户信息），这样每次处理用户请求时，就可以从内存读取用户信息，不用查询数据库了。但基于 Serverless 架构的应用，内存缓存通常没有意义，因为函数生命周期有限，且函数实例之间无法共享内存。"),s("strong",null,"所以传统应用迁移到 Serverless 架构面临的第一个改造点就是内存缓存问题。")],-1),C=s("p",null,"在 Serverless 架构的应用中，我们一般不会用内存做缓存，而是用缓存数据库（比如 Redis）。当然，基于 Redis 的缓存，读写数据还是会经过网络请求，性能相比内存缓存有一定损耗。不过我个人认为，这一点不用特别担心，在传统应用中（尤其分布式应用），大部分时候我们也会使用缓存数据库，因为服务器和服务器之间，也无法共享内存，所以内存缓存也仅作用于当前服务器处理的所有请求。",-1),h=s("p",null,"此外，在传统应用中，我们通常也会使用二级缓存，同时将数据缓存在内存和缓存数据库中。读取缓存时，首先读取内存缓存，如果内存中没有数据，再读取缓存数据库中的数据，如果缓存数据库中也没有数据，再通过网络请求从远程读取数据。",-1),S=s("p",null,"二级缓存",-1),g=s("p",null,[n("缓存带来的另一个问题就是身份认证，"),s("strong",null,"身份认证是传统应用迁移到 Serverless 的第二个改造点"),n("。传统应用的身份认证通常有 cookie-session 和 JWT 两种方式。")],-1),B=s("p",null,"基于 cookie-session 的认证方式，通常是把身份信息保存在服务端的 session 中。对于只有一台服务器的应用，有的同学可能会把 session 保存在内存中，但在 Serverless 中就会有问题了，因为内存缓存是很短暂的。当然，现在大部分 cookie-session 的身份认证，也会将 session 存储在缓存数据库，这样就降低了迁移成本。另外，由于 JWT 的认证方式本身是无状态的，客户端和服务端通过一个加密后的 token 交换信息，所以比较适合 Serverelss 架构，可以无缝迁移（关于身份认证，我 15 讲会细说）。",-1),_=s("p",null,"除了对内存读写，一些传统应用可能还会对磁盘有很多读写操作。比如我们可能会基于磁盘做重试，当一条数据处理失败后，我们就将其写入磁盘，然后启动另一个线程读取磁盘数据进行重试。部署传统应用的磁盘是直接挂载到服务器上的，所以就算应用重启了，服务器和磁盘也依旧存在，所以将数据直接写入磁盘不会造成数据丢失。",-1),b=s("p",null,[n("而 Serverless 函数是运行在 FaaS 平台上的，函数运行时只会有一个临时目录的读写权限，一旦运行环境被释放，该临时目录也会被释放，所以磁盘数据无法持续存储。并且和内存问题类似，不同函数实例的临时目录也是独立的。"),s("strong",null,"那么对于有读写磁盘需求的应用，应该如何迁移到 Serverless 架构呢？"),n(" 要解决这个问题，我们可以为 Serverless 函数挂载一个持久存储，比如云盘或 NAS 等，这些持久化存储和 FaaS 平台是相互独立的，只要不释放数据可以永久保存。并且不同函数可以共用同一个持久化存储，这样不同函数就可以读写同一份数据了，甚至函数间还可以基于持久化存储进行通信。采用持久化存储还有一个好处就是，计算和存储分离了，这样更利于应用扩缩容。"),s("strong",null,"总的来说，数据持久化是传统应用迁移到 Serverless 的第三个改造点。")],-1),D=s("p",null,"其实不难看出，如果传统应用本身是分布式架构，很容易满足前面三点。因为分布式架构的应用就需要考虑内存缓存、身份认证、持久化存储等问题，而 Serverless 架构本身也是分布式的。",-1),T=s("p",null,"对于传统分布式应用，要对外提供 HTTP 服务，通常也会有一个统一接入层来实现负载均衡、高可用等，例如我们会通过负载均衡使用户流量均衡分配到背后的每台服务器上，其中可能会使用到 Nginx、SLB 等产品。而对于 Serverless 架构的应用，我们可以使用 API 网关来做统一接入，由 API 网关承接用户请求，然后触发具体函数的执行。",-1),k=s("p",null,[n("使用 API 网关做统一接入是架构上的改造，除此之外，应用代码也需要改造。因为在传统应用中，运行在服务器上的应用是直接处理来自用户的 HTTP 请求的，而在 Serverless 应用中，函数处理的是 API 网关的事件，两者的数据结构和请求响应方式都有很大差异。你要对传统应用提供 HTTP 服务的代码进行改造，才能使其部署在 Serverless 平台上，"),s("strong",null,"所以将传统 Web 服务 Serverless 化是传统应用迁移到 Serverless 架构的又一个改造点。")],-1),f=s("p",null,"接下来我就以一个具体的开发框架 Express.js 为例，通过将 Express.js 框架 Serverless 化，为你详细介绍如何将传统 Web 服务 Serverless 化。",-1),q=s("h3",{id:"web-服务如何-serverless-化",tabindex:"-1"},[n("Web 服务如何 Serverless 化 "),s("a",{class:"header-anchor",href:"#web-服务如何-serverless-化","aria-label":'Permalink to "Web 服务如何 Serverless 化"'},"​")],-1),x=s("p",null,"传统的 Web 服务请求参数与 Serverless 函数参数有较大差异，所以将 Web 服务 Serverless 化的核心工作就是开发一个适配层，通过适配层将函数的事件对象转化为标准的 Web 请求，这样我们就可以接着用传统 Web 服务去处理用户请求和响应了。整体流程如下图所示：",-1),m=l("",22),P=l("",10);function j(H,N,W,w,R,L){const a=o("Image");return r(),t("div",null,[E,y,i,F,v,d,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/93/Cip5yGAZAUSAcAJEAAE7WwPpQs0967.png"}),n(),u,A,C,h,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/96/CgpVE2AZAU6AIsGDAAF6SNrHN1c948.png"}),n(),S,g,B,_,b,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/93/Cip5yGAZAVqAEQ_ZAARFv9c7O6A392.png"}),D,T,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/93/Cip5yGAZAWCALB5LAAG1Ybf7G7c701.png"}),k,f,q,x,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/96/CgpVE2AZAWmAchYZAAHYDXbY_9c062.png"}),n(),m,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/93/Cip5yGAZAX6AFyFKAALzp61gPVQ447.png"}),n(),P])}const V=e(c,[["render",j]]);export{G as __pageData,V as default};
