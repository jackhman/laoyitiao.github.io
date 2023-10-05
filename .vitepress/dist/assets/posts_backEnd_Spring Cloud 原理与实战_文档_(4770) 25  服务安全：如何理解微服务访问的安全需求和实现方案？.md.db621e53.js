import{_,j as s,o as p,g as r,k as n,h as e,Q as a,s as t}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"微服务架构中的安全性设计 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4770) 25  服务安全：如何理解微服务访问的安全需求和实现方案？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4770) 25  服务安全：如何理解微服务访问的安全需求和实现方案？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4770) 25  服务安全：如何理解微服务访问的安全需求和实现方案？.md"},l=a('<p>今天，我们又将进入一个全新的话题，讨论微服务架构中的服务访问安全性相关的需求和实现方案。在设计微服务架构时，安全性是一个重要但又往往被忽略的主题，很多开发人员缺乏对微服务安全访问机制的认识。另一方面，微服务安全性又是一个非常综合的话题，涉及的技术体系也比较复杂，让我们一起来看一下。</p><h3 id="微服务架构中的安全性设计" tabindex="-1">微服务架构中的安全性设计 <a class="header-anchor" href="#微服务架构中的安全性设计" aria-label="Permalink to &quot;微服务架构中的安全性设计&quot;">​</a></h3><p>对于微服务架构而言，安全性设计的最核心考虑点还是<strong>认证（Authentication）<strong>和</strong>授权（Authorization）</strong>。</p><h4 id="认证与授权" tabindex="-1">认证与授权 <a class="header-anchor" href="#认证与授权" aria-label="Permalink to &quot;认证与授权&quot;">​</a></h4><p>在软件系统中，我们可以把需要访问的内容定义为是一种资源（Resource），而安全性设计的核心目标就是对这些资源进行保护，确保对它们的访问是安全受控的。在微服务架构中，一个个的微服务就可以被理解为是资源。对于资源的安全性访问，业界也存在一些常见的技术体系。在讲解这些技术体系之前，我们先来理解在安全领域中非常常见但又容易混淆的两个概念，即认证和授权。</p>',5),h=t("p",null,[e('我们首先需要明确，所谓认证，解决的是"'),t("strong",null,"你是谁"),e('"这一个问题，也就是说对于每一次访问请求，系统都能判断出访问者是否具有合法的身份标识。')],-1),c=t("p",null,'一旦明确 "你是谁"之后，下一步就可以判断"你能做什么"，这个步骤就是授权。通用的授权模型通常都是基于权限管理体系的，也就是说是对资源、权限、角色和用户的一种组合处理。',-1),u=t("p",null,"如果我们将认证和授权结合起来，就构成了对系统中资源进行安全性管理的最常见解决方案，即先判断资源访问者的有效身份，然后再来确定其是否有对这个资源进行访问的合法权限，如下图所示：",-1),T=t("p",null,"基于认证和授权机制的资源访问安全性示意图",-1),d=t("p",null,"上图代表的是一种通用方案，而不同的应用场景以及技术体系下可以衍生出很多具体的实现策略。微服务架构中的认证和授权模型与上图中的类似，但在具体设计和实现过程中也有其特殊性。",-1),A=t("h4",{id:"微服务架构中的认证与授权",tabindex:"-1"},[e("微服务架构中的认证与授权 "),t("a",{class:"header-anchor",href:"#微服务架构中的认证与授权","aria-label":'Permalink to "微服务架构中的认证与授权"'},"​")],-1),g=t("p",null,"在微服务架构下，我们设想一下服务访问过程中需要考虑的安全性问题。因为一个微服务系统中服务之间可以存在相互的调用关系，对于每一个服务而言，我们一方面需要考虑来自客户端的请求，同时也要考虑可能来自另一个服务的请求。因此，面临着从客户端到服务、从服务到服务的多种认证和授权场景。",-1),S=t("p",null,[e("针对上述场景下的认证环节，比较容易想到的一种实现方案是"),t("strong",null,"分布式 Session 机制"),e("。Session 本质上是一种服务器端技术，即服务器对请求进行认证，并将已经通过的认证信息的用户信息存储在一个共享存储空间中。这样，每次对于微服务的请求都可以带着 Session ID，服务器根据共享存储空间中的数据检查用户是否认证过。这种方案显然需要消耗服务器端的存储空间，也容易受到攻击。")],-1),k=t("p",null,"与服务器端保存认证信息相对应的，另一种思路是将认证信息存储在客户端。我们可以在客户端生成认证信息并保存在本地。然后，在每次请求中，客户端将这个认证信息通过HTTP请求传递到服务器端，服务器端再基于这个认证信息执行用户身份验证。显然，这种机制是无状态的，而且有利于减轻服务端存储压力。在这种方案下，我们通常把认证信息称为一个 Token（令牌），业界也存在诸如 JWT（JSON Web Tokens）这样的实现方案，课程后面会具体讲到。",-1),m=t("p",null,"讲完对认证信息的处理方式，我们来看微服务架构中的授权。对于某一个特定的微服务而言，我们面临的第一个问题是如何判断一个 HTTP 请求具备访问自己的权限呢？更进一步，就算这个请求具备访问该微服务的权限，但并不意味着它能够访问该服务中的所有功能。对于某些核心功能，需要具备较高的权限才能访问，而有些则不需要。这就是我们需要解决的第二个问题，也就是说，如何对服务访问的权限进行精细化管理？如下图所示：",-1),O=t("p",null,"微服务授权效果示意图",-1),C=t("p",null,"在上图中，我们假设该请求具备服务 A 的权限，但不具备访问服务 A 中功能 1 的权限。想要达到这种效果，一般的做法是引入角色体系。我们对不同的用户设置不同等级的角色，角色等级不同对应的访问权限也不同。而每一个请求都可以绑定到某一个角色，也就具备了访问权限。",-1),J=t("p",null,"接下来，我们把认证和授权结合起来，梳理出服务访问场景下的安全性实现方案，如下所示：",-1),W=a('<p>认证和授权整合示意图</p><p>可以看到，在上图中存在一个授权中心，授权中心首先会获取客户端请求中所带有的身份凭证信息，然后基于这个身份凭证信息生成一个 Token。客户端获取 Token 之后就可以基于这个 Token 发起对微服务的访问。这时候，我们需要对这个 Token 进行认证，并通过授权中心获取该请求所能访问的特定资源。在微服务系统中，对外的资源表现形式可以理解为就是一个个 HTTP 端点。</p><p>关于如何实现上图中给出的技术方案，业界也存在了一些特定的工具和协议。针对授权，最具代表性的就是 OAuth2 协议。而针对授权，采用JWT是目前非常主流的做法。</p><h3 id="授权-oauth2-协议" tabindex="-1">授权：OAuth2 协议 <a class="header-anchor" href="#授权-oauth2-协议" aria-label="Permalink to &quot;授权：OAuth2 协议&quot;">​</a></h3><p>OAuth 是 Open Authorization 的简称，该协议解决的是授权问题而不是认证问题，目前普遍被采用的是 OAuth 2.0 协议。OAuth2 是一个相对复杂的协议，对涉及的角色和授权模式给出了明确的定义，让我们先来看一下这些基本概念。</p><p>OAuth2 协议中把需要访问的接口或服务统称为资源，而每个资源都有一个<strong>拥有者（Resource Owner）</strong>。这些资源拥有者所拥有的资源统一存放在资源服务器（Resource Server）中。同时，协议规定需要有一台授权服务器（Authorization Server），即专门用来处理对访问请求进行授权的服务器，也就是上图中的授权中心。</p><p>OAuth2 协议的作用就是让客户端程序安全可控地获取用户的授权信息，并与资源服务器进行交互。OAuth2 协议在客户端程序和资源服务器之间设置了一个<strong>授权层</strong>，所以客户端程序不能直接访问资源服务器，而是只能先登录授权层。资源拥有者会首先授权给客户端，客户端获得授权之后，向授权服务器申请一个 Token，Token 中就包含了权限范围和有效期。然后，客户端使用这个申请到的 Token 向资源服务器申请获取资源，资源服务器就根据 Token 的权限范围和有效期向客户端开放拥有者的资源。</p><p>对应到微服务系统中，服务提供者所充当的角色就是资源服务器，而服务消费者就是客户端。所以各个服务本身都可以是客户端，也可以作为资源服务器，或者两者兼之。当客户端拿到 Token 之后，该 Token 就能在各个服务之间进行传递。如下所示：</p>',8),P=a('<p>OAuth2 协议在服务访问场景中的应用</p><p>在整个 OAuth2 协议中，最关键的就是如何获取客户端授权。OAuth 2.0 定义了四种授权方式，即密码模式、授权码模式、简化模式和客户端模式。本课程无意对这四种授权方式做一一详细展开，在下一课时中将演示密码模式作为 OAuth 协议授权模式的默认实现方式。</p><h3 id="认证-jwt-机制" tabindex="-1">认证：JWT 机制 <a class="header-anchor" href="#认证-jwt-机制" aria-label="Permalink to &quot;认证：JWT 机制&quot;">​</a></h3><p>JWT 是一种表示数据的标准，所有人都可以遵循这种标准来传递数据。在安全领域，我们通常用它来传递被认证的用户身份信息，以便从资源服务器获取资源。同时，JWT 在结构上也提供了良好的扩展性，开发人员可以根据需求增加一些额外信息用于处理复杂的业务逻辑。因为 JWT 中的数据都是被加密的，所以除了可以直接被用于认证之外，也可以处理加密需求。</p><p>JWT 具有很多优秀的功能特性，它的数据表示方式采用语言无关的 JSON 格式，可以与各个异构系统进行集成。同时，基于 JWT 表示的 Token 简洁紧凑，也便于网络之间的高效传输。最重要的，JWT 中的 Token 不存储在服务端，所以提供了一种无状态性。</p><p>同时，我们也应该注意到，正因为 Token 不存储在服务端，所以我们要关注它的注销方式。区别于服务器端技术，当用户注销时，我们无法实时控制 Token 的失效时间。所以一般可以把这个失效时间设置为一个较小的值，从而降低 Token 可用性的风险。</p><p>本质上，JWT 和 OAuth2 面向不同的应用场景，本身并没有任何关联，但在很多情况下，在讨论 OAuth2 的实现时，会把 JWT 作为一种认证机制进行使用。</p><p>OAuth2 协议和 JWT 机制在实现上体系比较复杂，综合应用摘要认证、签名认证、HTTPS 等安全性手段，同时需要开发者进行精细化的权限粒度控制。一般我们应该避免自己去实现如此复杂的协议，而是倾向于借助于特定工具以避免重复造轮子。幸好，Spring Cloud 为我们提供了一个专门实现 OAuth2 协议以及整合 JWT 机制的框架，这就是 Spring Cloud Security。Spring Cloud Security 框架基于 Spring 家族中的 Spring Security 框架。在本课程中，我们将采用 Spring Cloud Security 来实现微服务架构下服务之间访问的安全性。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>今天我们进入到微服务安全性领域的探讨，在这个领域中，认证和授权仍然是最基本的安全性控制手段。我们系统分析了微服务架构中的认证和授权解决方案，并分别引入了 OAuth2 协议和 JWT 机制来实现这一解决方案。</p><p>这里给你留一道思考题：你能正确描述 OAuth2 协议和 JWT 机制之间的区别和联系吗？</p><p>介绍完系统概念和原理，接下来我们将基于 SpringHealth 案例系统详细介绍 OAuth2 协议和 JWT 机制的实现过程。首先我们关注的是如何使用 Spring Cloud Security 集成 OAuth2 协议，这就是下一课时的内容。</p>',12);function b(q,f,V,x,D,E){const o=s("Image");return p(),r("div",null,[l,n(o,{alt:"Lark20201215-153117.png",src:"https://s0.lgstatic.com/i/image/M00/89/7A/CgqCHl_YZyWAbDX6AAV1elL6Gts541.png"}),h,c,u,n(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/89/6D/Ciqc1F_YZnaAHkq8AAAtOzs4KsM610.png"}),e(),T,d,A,g,S,k,m,n(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/89/79/CgqCHl_YZoeAKoQkAAAxAJxql5w313.png"}),e(),O,C,J,n(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/01/4A/CgpVE1_YZpCAVQXGAABA1q4T9ok354.png"}),e(),W,n(o,{alt:"Lark20201215-153100.png",src:"https://s0.lgstatic.com/i/image2/M01/01/4A/CgpVE1_YZp-AMWTWAAH1ElZc_cc663.png"}),e(),P])}const I=_(i,[["render",b]]);export{H as __pageData,I as default};
