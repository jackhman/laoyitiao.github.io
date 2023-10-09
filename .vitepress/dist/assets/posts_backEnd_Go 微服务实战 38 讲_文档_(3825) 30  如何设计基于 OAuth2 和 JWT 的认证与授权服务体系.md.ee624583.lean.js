import{_ as e,j as l,o as _,h as r,k as n,f as o,Q as a,s as t}from"./chunks/framework.d3daa342.js";const N=JSON.parse('{"title":"30如何设计基于OAuth2和JWT的认证与授权服务体系","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3825) 30  如何设计基于 OAuth2 和 JWT 的认证与授权服务体系.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3825) 30  如何设计基于 OAuth2 和 JWT 的认证与授权服务体系.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3825) 30  如何设计基于 OAuth2 和 JWT 的认证与授权服务体系.md"},c=a("",9),p=t("p",null,"RBAC96 模型族关系图",-1),h=t("p",null,[o("除了 RBAC 外，还有一种比较流行的权限设计方案------"),t("strong",null,"ACL（Access Control Lists）模型"),o(" ，即"),t("strong",null,"访问控制列表"),o(" 。ACL 的核心思想是"),t("strong",null,"将用户直接和权限关联"),o("，这样就可以非常简单地完成访问控制。但是在权限过多时，却又很容易造成授予权限时的复杂性，访问控制列表的管理最终会演变成极为烦琐的工作。")],-1),A=t("p",null,"我们的实践将基于 RBAC 模型进行权限设计。不过，在权限设计实践的过程中，考虑到需求的差异性，完全遵循 RBAC 模型也许并不可取。我们应该根据自身业务需要，适当地调整 RBAC 模型，使其更加契合业务。",-1),g=t("p",null,"为了简化权限设计方案，便于实践的开展，我们就基于 RBAC0 模型描述的用户、角色、权限和会话关系，设计如下的权限模型：",-1),u=t("p",null,"简易角色权限模型图",-1),d=t("p",null,"上图中分别有用户、角色和权限 3 个实体，每个用户可以拥有多种角色，每一种角色都是一定数量权限的集合，它们之间通过关联表关联起来。当要授予某个用户部分权限时，可以将对应的角色赋予用户，比如在一个论坛系统中，帖子管理员具备审核帖子、删除帖子等权限，当有新的用户希望管理帖子时，可以将帖子管理员的角色授予该用户，这样他就具备了帖子管理的权限。",-1),C=t("h3",{id:"oauth2-和-jwt",tabindex:"-1"},[o("OAuth2 和 JWT "),t("a",{class:"header-anchor",href:"#oauth2-和-jwt","aria-label":'Permalink to "OAuth2 和 JWT"'},"​")],-1),T=t("p",null,"OAuth2 作为当前授权行业的标准，允许用户授权客户端访问它们存储在资源服务器上的信息。OAuth2 中默认支持 4 种客户端类型，分别为授权码类型、密码类型、简化类型和客户端类型，对它们之间的区别了解不多的同学可以参考上一课时中对 OAuth2 的详细介绍。",-1),B=t("p",null,"在微服务架构中，会有多种多样的客户端通过网关接入系统中请求服务，我们可以对这些客户端进行简单的分类，包括第三方客户端应用和自家客户端应用两类。",-1),m=t("p",null,[t("strong",null,"第三方客户端应用"),o(" 基本为外部系统，希望请求本系统内的资源或者服务，为了避免将系统内的用户信息泄漏给第三方客户端，系统将通过授权码类型给这类客户端提供访问令牌。而对于"),t("strong",null,"自家客户端应用"),o("，因为是可信任的客户端，所以可以允许它们通过密码类型获取访问令牌，即它们能够直接接触和保存用户的密码凭证等信息。")],-1),W=t("p",null,"多客户端访问模型图",-1),R=t("p",null,"JWT 是高度紧凑和自包含的安全传输对象，关于 JWT 头部、有效负载和签名的介绍可以参考上一课时。我们可以将 JWT 用作访问令牌和刷新令牌的载体，将签发 JWT 的 secret 保存在授权服务器，由授权服务器签发 JWT 样式的访问令牌。同时，我们还可以将用户的相关信息，比如用户 ID、用户角色码和权限码等信息放到有效负载中，当下游资源服务器使用用户的信息时，可以直接从访问令牌中解析获取，而无须重复查询数据库，这就减少了请求消耗，提升了访问效率。",-1),J=t("p",null,"携带用户信息的 JWT 样式访问令牌",-1),k=t("h3",{id:"token-中继",tabindex:"-1"},[o("Token 中继 "),t("a",{class:"header-anchor",href:"#token-中继","aria-label":'Permalink to "Token 中继"'},"​")],-1),O=t("p",null,"在微服务架构中，各个微服务之间存在错综复杂的调用关系，而且在调用过程中很可能需要获取用户的身份信息，甚至部分接口还需要对用户拥有的权限进行鉴权。虽然我们可以在业务请求体中要求上游服务携带用户的相关信息，然后在业务实现中根据用户信息，去授权服务器查找用户对应的权限信息并进行鉴权操作，但是这种方式对业务开发人员不友好，需要他们在业务实现代码中频繁传递用户信息。同时这其中的部分通用鉴权行为，完全可以通过资源服务器的方式实现，从而减轻业务开发工作。",-1),b=t("p",null,[o("我们可以"),t("strong",null,"将访问令牌在多个请求中进行传递"),o(" ，也就是"),t("strong",null,"Token 中继"),o("，由资源服务器根据自身的认证和鉴权配置，对访问令牌中用户身份和权限进行鉴权，如下图所示：")],-1),q=t("p",null,"在资源服务器中传递访问令牌",-1),S=t("p",null,"如果访问令牌是 JWT 样式，并且其中包含了用户身份信息和权限信息，那么资源服务器就可以直接根据其内的信息进行鉴权操作，从而避免频繁向权限系统请求用户的角色和权限信息。同时，资源服务器应该具备 Token 中继的能力，自动将请求中的访问令牌携带到下游，让鉴权操作对业务开发人员透明。",-1),f=t("h3",{id:"整体结构设计",tabindex:"-1"},[o("整体结构设计 "),t("a",{class:"header-anchor",href:"#整体结构设计","aria-label":'Permalink to "整体结构设计"'},"​")],-1),P=t("p",null,"基于上面的介绍，我们可以将微服务统一认证与授权服务体系设计为如下：",-1),j=a("",7);function w(D,x,E,I,V,F){const s=l("Image");return _(),r("div",null,[c,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7E/CgqCHl-BjmSASE66AAAcST7W53k950.png"}),o(),p,h,A,g,n(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5C/73/Ciqc1F-BjoeAOEb7AAC052s4Czk102.png"}),o(),u,d,C,T,B,m,n(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BjpWAOslFAAA3GP2cSQQ804.png"}),o(),W,R,n(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BjqKAJH-jAAAqGAJDXv8651.png"}),o(),J,k,O,b,n(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5C/73/Ciqc1F-BjrSAFuiKAACSXWInd6I057.png"}),o(),q,S,f,P,n(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5C/73/Ciqc1F-Bjr2AVEhFAABGPArWoOo510.png"}),o(),j])}const H=e(i,[["render",w]]);export{N as __pageData,H as default};
