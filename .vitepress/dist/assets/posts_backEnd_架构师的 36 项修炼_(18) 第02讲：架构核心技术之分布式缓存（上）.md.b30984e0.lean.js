import{_ as s,D as i,o as p,g as h,J as l,h as e,m as a,Q as o}from"./chunks/framework.f67d7268.js";const Q=JSON.parse('{"title":"第02讲：架构核心技术之分布式缓存（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(18) 第02讲：架构核心技术之分布式缓存（上）.md","filePath":"posts/backEnd/架构师的 36 项修炼/(18) 第02讲：架构核心技术之分布式缓存（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/架构师的 36 项修炼/(18) 第02讲：架构核心技术之分布式缓存（上）.md"},n=a("h1",{id:"第02讲-架构核心技术之分布式缓存-上",tabindex:"-1"},[e("第02讲：架构核心技术之分布式缓存（上） "),a("a",{class:"header-anchor",href:"#第02讲-架构核心技术之分布式缓存-上","aria-label":'Permalink to "第02讲：架构核心技术之分布式缓存（上）"'},"​")],-1),_=a("p",null,"本课时的主题是分布式缓存。",-1),r=a("p",null,"缓存是架构设计中一个重要的手段。缓存的主要特点是技术比较简单，同时对性能提升的效果又很显著，所以缓存在很多地方都会被用到。使用缓存需要注意几个关键指标：缓存键集合大小、缓存空间的大小以及缓存的使用寿命。这三个指标决定了缓存的有效性、缓存的使用效率、缓存实现的效果。缓存的类型主要有代理缓存、反向代理缓存、 CDN 缓存和对象缓存几种。缓存知识图谱如下图所示。",-1),d=o("",17),b=o("",17),m=a("p",null,"所谓的超时失效是在构建缓存，即写缓存的时候，每个缓存对象都设置一个超时时间，在超时之前访问缓存就会返回缓存的数据，而一旦超时，缓存就失效了，这时候再访问缓存，就会返回空。",-1),u=a("p",null,"而实时清除是说，当有缓存对象更新的时候，直接通知缓存将已经被更新了的数据进行清除。清除了以后，应用程序下一次访问这个缓存对象键的时候，就不得不到数据库中去查找读取，这个时候就会得到最新的数据，因为更新总是更新在数据库里的。",-1),C=a("p",null,"还有一种，虽然时间上还没有失效但是新的对象要写入缓存，而内存空间不够了，这个时候就需要将一些老的缓存对象清理掉，为新的缓存对象腾出空间。",-1),P=a("p",null,"内存空间清除主要使用的算法是 LRU 算法，LRU 算法就是最近最久未用算法，也就是说清除那些最近最久没有被访问过的对象。这个算法使用链表结构实现的，所有的缓存对象都放在同一个链表上。当一个对象被访问的时候，就把这个对象移到整个链表的头部。当需要通过 LRU 算法清除那些最近最久未用对象的时候，只需要从队列的尾部进行查找，越是在队列尾部的，越是最近最久没有被访问过的，也就是优先清除的，腾出的内存空间让新对象加入进来。",-1),g=a("h6",{id:"缓存的主要类型",tabindex:"-1"},[e("缓存的主要类型 "),a("a",{class:"header-anchor",href:"#缓存的主要类型","aria-label":'Permalink to "缓存的主要类型"'},"​")],-1),A=a("h6",{id:"代理缓存",tabindex:"-1"},[e("代理缓存 "),a("a",{class:"header-anchor",href:"#代理缓存","aria-label":'Permalink to "代理缓存"'},"​")],-1),T=a("p",null,"代理缓存是在应用程序---端的代理，缓存在客户端---端的，代理客户端访问互联网。它的主要作用是互联网访问代理。但是同时因为他代理了所有的客户端 HTTP 请求，所以它可以进行页面缓存，如果有一些其他的客户端已经访问过这个网页，那么当新的客户端连接的时候，就可以通过代理缓存中的数据直接返回，避免对数据中心的访问。",-1),N=a("p",null,"代理缓存是存在客户端一端的缓存，我们无法进行管理。所以代理缓存虽然存在，但是通常不作为我们系统架构中的一部分，我们能够管理的是反向代理缓存。",-1),k=a("h6",{id:"反向代理缓存",tabindex:"-1"},[e("反向代理缓存 "),a("a",{class:"header-anchor",href:"#反向代理缓存","aria-label":'Permalink to "反向代理缓存"'},"​")],-1),D=a("h6",{id:"",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#","aria-label":'Permalink to ""'},"​")],-1),f=a("p",null,"代理缓存是代理用户上网的，而反向代理则是代理数据中心输出的，是反向代理的。所以反向代理缓存是存在于系统数据中心里的，它是数据中心的统一入口，代理整个数据中心其他服务器的应用处理。",-1),x=a("p",null,"用户通过互联网连接到数据中心的时候，连接的通常是一个反向代理服务器，反向代理服务器根据用户的请求，在本地的反向代理缓存中查找是否有用户请求的数据，如果有就直接返回这个数据，如果没有再把这个请求向下继续转发，请求后面的应用服务器去处理生成数据。",-1),V=a("p",null,"反向代理缓存可以多层反向代理缓存的形式出现。因为我们的应用服务器也是经过分层的，在处理的前端通常是一个前端服务器，后面有 Web 服务器，之后有应用服务器，再后还有其他的各类服务器。在这样一个分层的服务器结构里，我们可以对每一层的服务器都进行反向代理缓存。",-1),W=a("p",null,"如下图所示，前端 Web 服务器和 Web 服务器分为两层，用户请求接入的时候，先接入前端 Web 服务器，其上可以加一层反向代理服务器来代理前端 Web 服务器的 HTTP 请求。如果用户请求的数据已经包含在这个反向代理服务器中，就可以直接返回；如果没有，就再把 HTTP 请求提交给前端 Web 服务器，前端 Web 服务器会把请求发给后面的 Web 服务器。在 Web 服务器和前端 Web 服务器之间还可以再加一层反向代理服务器。如果前端 Web 服务器的请求在这一层的反向代理服务器中存在，那么这一层反向代理服务器可以直接将数据返还；如果不存在，再将请求下发给 Web 服务器。",-1),q=a("p",null,"通过这样的方式，极大地减少了前端 Web 服务器或者是 Web 服务器的访问压力，同时提高了系统的响应性能。",-1),I=a("h6",{id:"内容分发网络-cdn-缓存",tabindex:"-1"},[e("内容分发网络 CDN 缓存 "),a("a",{class:"header-anchor",href:"#内容分发网络-cdn-缓存","aria-label":'Permalink to "内容分发网络 CDN 缓存"'},"​")],-1),U=a("p",null,"所谓的 CDN 是指在用户请求的前端（尽量前的前端）为用户提供数据服务。CDN 并不存在于我们的数据中心，也不存在于用户的访问系统一端，它介于两者之间，作为网络服务商的缓存服务。用户进行互联网访问的时候，需要通过互联网网络服务商提供的网络链接才能够连接到数据中心，那么网络服务商就可以在自己提供的网络服务的机房里进行一次缓存操作，提供一次缓存服务。如下图所示。",-1),H=a("p",null,"客户端第一次访问 example.com 的时候，访问数据中心，数据中心返回 HTML 页面以后，客户端解析 HTML，HTML 里面还各种 js 文件、css 文件、图片等，这些静态资源访问的就是 CDN 服务器。CDN 服务器检查自己是否有需要的静态资源，如果有，就立即返回给客户端；如果没有，就自己访问数据中心，获得需要的静态资源后，缓存在 CDN 服务器上后，再返回客户端。",-1),M=a("p",null,'所以 CDN 缓存也叫作网络访问的"第一跳"，用户请求先到达的是互联网网络服务商的机房。在机房里面部署 CDN 服务器，提供缓存服务。如果 CDN 中存在用户请求的 Web 响应内容，那么就可以直接通过 CDN 进行返回；如果 CDN 中不存在，那么 CDN 会把这个请求通过后面的网络连接，把它发到系统的数据中心去。数据中心返回的结果依然是先通过 CDN 服务器，CDN 服务器就可以把数据缓存在自己的本地，供后面的用户请求操作响应。',-1);function O(E,v,B,S,y,L){const t=i("Image");return p(),h("div",null,[n,_,r,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D7/CgotOV13Eh2AUjPjAAEIXLhmsGo317.png"}),e(),d,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/15/CgoB5l13VbiAHhPSAABoymphrNs072.png"}),e(),b,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D7/CgotOV13Eh6AeZaQAABY4_ZmeQk831.png"}),e(),m,u,C,P,g,A,T,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/35/CgotOV13VcWAYl8OAAC1Z4DMJ1E846.png"}),e(),N,k,D,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/16/CgoB5l13VcuAQoUeAACKaiIOlJc476.png"}),e(),f,x,V,W,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/36/CgotOV13VnaAfPm9AAC46bZcN0w341.png"}),e(),q,I,U,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/B7/CgoB5l13Eh6AXvePAAGOZ4Q8scY773.png"}),e(),H,M])}const Z=s(c,[["render",O]]);export{Q as __pageData,Z as default};
