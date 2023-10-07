import{_ as n,j as c,o as p,g as _,k as o,h as t,Q as a,s as e}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"09开放数据：微信生态帮助业务快速落地","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5102) 09  开放数据：微信生态帮助业务快速落地.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5102) 09  开放数据：微信生态帮助业务快速落地.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5102) 09  开放数据：微信生态帮助业务快速落地.md"},i=a('<h1 id="_09开放数据-微信生态帮助业务快速落地" tabindex="-1">09开放数据：微信生态帮助业务快速落地 <a class="header-anchor" href="#_09开放数据-微信生态帮助业务快速落地" aria-label="Permalink to &quot;09开放数据：微信生态帮助业务快速落地&quot;">​</a></h1><p>你好，我是俊鹏，从今天开始，我会用四讲的时间，从&quot;效率、留存、体验和更新&quot;四个角度出发，带你学习目前在微信小程序开发领域中的一些前沿技术和实践经验。</p><p>这四个角度是团队在日常工作中最具有代表性的，我相信随着你的小程序功能越来越复杂、用户越来越多，肯定也会遇到在&quot;效率、留存、体验和更新&quot;上的问题。所以我希望这一讲的经验能够给你一些借鉴和参考。</p><p>今天这节课，我们先来学习&quot;效率&quot;，看一看怎么通过微信平台提供的开放数据接口，把小程序集成到微信生态中，让小程序快速实现业务功能。虽然我在字面上没有&quot;效率&quot;二字，但这一讲全是围绕效率展开的。比如在第一部分&quot;微信生态帮助业务功能快速实现中，&quot;快速&quot;一词就体现了效率；而第二部分调用开放数据接口的两种方式中，学习传统的调用方式能让你明白原理，而云调用方式能让你提高效率。</p><p>接下来，让我们进入第一部分的学习：什么是微信生态，以及它怎么帮业务功能快速实现。</p><h3 id="微信生态帮助功能快速实现" tabindex="-1">微信生态帮助功能快速实现 <a class="header-anchor" href="#微信生态帮助功能快速实现" aria-label="Permalink to &quot;微信生态帮助功能快速实现&quot;">​</a></h3><p>在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=526#/detail/pc?id=5095" target="_blank" rel="noreferrer">&quot;02 | 授权模型： 小程序的用户体系与 OAuth 规范&quot;</a>中，我们明确了小程序和微信的关系：小程序对微信来说是第三方应用，小程序接入微信登录的主要优势之一就是融入微信生态。至于怎么理解&quot;微信生态&quot;？我觉得你可以从产品和技术两个角度切入。</p><p><strong>从产品角度上，</strong> 目前微信不仅仅是一个 App ，而是一个庞大的平台。小程序、公众号是以微信为中心两个典型的第三方应用，应用只是作为用户介入的入口或者功能的出口，它的背后还包括微信平台的各种能力，比如微信支付、微信运动、游戏......你可以把这些能力理解为微信生态。</p><p><strong>从技术角度上（从研发角度上），</strong> 微信生态的意义在于微信提供了一些开放数据接口，开发者能以便捷的方法调用这些接口，进而通过微信平台的能力完成业务功能需求。比如小程序需要支付功能，如果你自己研发一套支付体系，成本巨大（因为支付不仅仅是技术层面的，还有很多政策法规的要求）。而微信平台提供小程序调用微信支付的开放接口，你只用做基本的资质备案审查，然后自己搭建服务器或直接使用云调用，把微信支付功能集成到小程序中就可以了。</p><p>和自己实现一套支付体系比起来，用微信平台提供的开放接口不仅减少了成本，也加快了业务功能的实现速度，进而提升了整体的研发效率。接下来，我就带你学习怎么调用微信的开放数据接口，我们先从最原始的传统调用方式学起，然后再来学习效率更高的云调用。</p><h3 id="三方完成的传统调用方式" tabindex="-1">三方完成的传统调用方式 <a class="header-anchor" href="#三方完成的传统调用方式" aria-label="Permalink to &quot;三方完成的传统调用方式&quot;">​</a></h3><p>在传统的调用方式中，涉及了三个角色：小程序、开发者服务器和微信服务器。<strong>为什么需要开发者服务器呢？</strong></p><p>微信提供的开放数据接口按照调用方式可以分为两类：</p><ul><li><p>在小程序端通过 SDK 的 API 就可以直接调用的接口（针对私密性相对不高的数据，比如微信运动、卡券、收货地址等）；</p></li><li><p>需要服务端配合完成整条链路的接口（针对私密性和安全性要求较高的数据，比如支付、订阅消息等）。</p></li></ul><p>第二类接口的调用需要经过授权甚至携带小程序的私密信息（比如 AppId 、AppSecret 等）才可以完成，这些信息不能放在小程序端侧，必须放在服务端进行管理，否则泄露风险极高。也就是说，与 02 讲中的登录功能一样，调用第二种接口你需要一台自己的服务器，<strong>我们把这个服务器叫作开发者服务器。</strong></p><p>开发者服务器的工作是向微信服务器的<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html" target="_blank" rel="noreferrer">auth.getAccessToken接口</a>发起授权请求，此请求中需要携带小程序的 AppId 和 AppSecret ，这两个私密信息可以从微信公众平台的小程序管理后台中拿到。授权请求成功后，会得到一个调用微信开放数据接口的临时凭证 access_token，然后在后续调用微信开放接口时，把 access_token 作为参数传递给微信服务器。</p><p>整个流程可以简单概况为下面这张图：</p>',17),l=a('<p><strong>虽然流程看上去很简单，但你需要把握很多开发细节，比如 access_token 的有效期管理。</strong></p><p>access_token 是一个临时凭证，目前有效期只有两个小时，过期后就不能再通过它调用微信的开放接口了。所以你调用微信开放接口时，都必须保证 access_token 在有效期内。**那怎么实现这个需求呢？**每次调用微信开放接口之前都调用<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html" target="_blank" rel="noreferrer">auth.getAccessToken接口</a>获取一个最新的 access_token 不就行了？当然不行！这么做有几个问题：</p><ul><li><p>加长了调用链路，造成用户等待时间加长，用户体验下降；</p></li><li><p>开发者服务器压力加重，可能会引起对高并发支撑能力的下降；</p></li><li><p>获取新的 access_token 会造成旧 access_token 失效，对于需要频繁调用微信开放接口的复杂业务逻辑而言，需要在每个调用逻辑之间制定同步 access_token 的逻辑，加重了开发和维护的难度。</p></li></ul><p>所以通常的做法是：<strong>开发者服务器通过缓存维护 access_token</strong>（这也是微信官方推荐的做法）。开发者服务器从微信服务器中获取到 access_token 之后，将它保存到缓存中，并且记录此刻的时间戳。然后在后续每次调用微信开放接口之前，都判断当前时刻与 access_token 时间戳的差值是否超过了 access_token 的有效期，如果小于的话说明 access_token 没有过期，直接用本地缓存中的即可。如下图所示：</p>',4),d=e("p",null,"这样就能够在 access_token 的有效期内复用，避免了每次调用微信开放接口都需要获取一次，缩短了请求的链路，解决了上面三个问题。",-1),h=e("p",null,"以上就是微信开放接口的传统调用方式，是不是有些麻烦？最起码要一台服务器以及必要的缓存管理逻辑，这对前端开发的你来说不是一件很容易的事儿。所以接下来，我就带你学习另外一种更效率的调用方式：免鉴权的云调用。",-1),g=e("h3",{id:"免鉴权的云调用方式",tabindex:"-1"},[t("免鉴权的云调用方式 "),e("a",{class:"header-anchor",href:"#免鉴权的云调用方式","aria-label":'Permalink to "免鉴权的云调用方式"'},"​")],-1),u=e("p",null,"在传统调用方式流程中，获取 access_token 的行为相当于得到微信的授权，然后才能使用这个 access_token。也就是授权凭证然后调用开放接口，这是一个典型的鉴权流程。",-1),k=e("p",null,"你也看到了，在这个流程中你要做的事情很多，而使用云调用你不需要关注鉴权的问题，不用开发者服务器以及维护 access_token 缓存。整个流程简化成了下面这张图：",-1),m=e("p",null,[t('从图中，我们发现了"云函数"这个词，'),e("strong",null,"那云调用和云函数到底是什么呢？")],-1),A=e("p",null,[e("strong",null,"用一句话概括云调用："),t(" 云调用是云开发提供的，基于云函数免鉴权调用小程序开放接口的能力。")],-1),q=e("p",null,"我会带你在模块四系统地学习云开发的知识，你可以暂时把云开发简单地将理解为一系列云端的服务，其中包括一些原子能力，比如云函数、云存储、云数据库，也包括一些与微信生态整合的能力，比如云调用。",-1),f=e("p",null,[e("strong",null,"你可以看到，云函数是云开发的原子能力之一，是运行在云端的一段服务器代码。"),t(" 它可以充当传统调用方式中，开发者服务器的角色。云函数的代码可以直接在微信IDE中编写，代码写完之后，使用微信 IDE 将云函数部署到云端，然后在小程序端侧调用这个函数，这就是小程序使用云函数的基本流程。")],-1),T=e("p",null,"我要强调的是，虽然云函数可以充当开发者服务器的角色，但是它的能力不只是一个普通的服务，而是能免鉴权调用微信的开放接口，请看下面这张图：",-1),C=a('<p>现在你应该对云调用的概念和使用流程有一定的了解了，<strong>接下来我就带你看一看为什么云调用能提升研发效率？</strong></p><p>最明显的就是免鉴权。跟传统的调用方式相比，云调用不需要开发者服务器和 access_token 缓存维护工作，可以直接调用微信的开放接口，极大地提升研发效率。</p><p>然后是云函数。刚刚我提到，有了云函数你就不用搭建一台开发者服务器了，也就是说，你不需要花钱买一台或租一台服务器了，节省了成本。如果你不关注公司花了多少钱，更关注技术，那你应该知道，虽然作为开发者，我们不经常编写服务端代码，但维护一台服务器的成本也是很高的，比如负载均衡、容灾、服务器监控、数据库冷备热备等。</p><p>除此之外，云函数将服务器保障的工作（主要由运维工程师负责，现实中，后端工程师也需要兼顾一部分工作）转交给云端平台负责，让开发者只关注代码本身。换句话说，开发者有更多的精力投入到业务开发上，整体迭代的速度加快，效率得到了提升。</p><p>综合以上，云调用不仅节省了搭建开发者服务器的开销，而且也免去了管理 access_token 的逻辑代码编写工作，<strong>从经济和效率两个角度都优于传统的模式。</strong></p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>云调用能够免鉴权调用微信的开放接口，进而帮助你在小程序中更加快速便捷地集成微信的生态系统。了解了云调用之后你应该能够隐约到一个问题：既然不需要搭建开发者服务，也不需要管理 access_token，那么后端工程师的工作还剩下啥呢？我来回答你：不需要他们了。你完全可以自己在云函数中实现以前的后端逻辑，这时候你就相当于完成了小程序前后端的所有开发工作，这就是云开发想要为开发者提供的理想状态。</p><p>另外，你不用担心云调用的安全性，免鉴权并不意味着无鉴权，而是云开发将鉴权的工作帮你完成了，这套流程会在微信和云开发之间完成。</p><p>今天的课后作业需要你动动手：请你使用传统方式和云调用分别实现服务端获取小程序二维码的功能，可以参考<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.createQRCode.html" target="_blank" rel="noreferrer">官方的文档</a>。我相信在这个作业完成之后，你能够更深层地体会云调用的便利性。</p>',9);function b(S,I,P,x,V,D){const s=c("Image");return p(),_("div",null,[i,o(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/71/10/Ciqc1F-86tSAdW1nAABQ11fRork280.png"}),t(),l,o(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/71/1C/CgqCHl-86uGAVPLKAACC7hhOFL8438.png"}),t(),d,h,g,u,k,o(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/71/10/Ciqc1F-86uiAY4kxAAAf7K9QlVo322.png"}),t(),m,A,o(s,{alt:"9.png",src:"https://s0.lgstatic.com/i/image/M00/80/29/Ciqc1F_QgmKAc3gJAAB5cidAM5U409.png"}),t(),q,f,T,o(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/71/1C/CgqCHl-860SAQIS_AABAYsgou5Q665.png"}),t(),C])}const E=n(r,[["render",b]]);export{w as __pageData,E as default};
