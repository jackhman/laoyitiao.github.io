import{_ as r,j as p,o as _,g as n,k as o,Q as s,s as t,h as a}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"合同的类比 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4647) 36  公私钥体系和网络安全：什么是中间人攻击？.md","filePath":"posts/backEnd/重学操作系统_文档/(4647) 36  公私钥体系和网络安全：什么是中间人攻击？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/重学操作系统_文档/(4647) 36  公私钥体系和网络安全：什么是中间人攻击？.md"},l=s("",18),c=s("",7),h=t("p",null,"如上图所示，Alice 将自己的申请提交给机构，产生证书的原文。机构用自己的私钥签名 Alice 的申请原文（先根据原文内容计算摘要，再用私钥加密），得到带有签名信息的证书。Bob 拿到带签名信息的证书，通过第三方机构的公钥进行解密，获得 Alice 证书的摘要、证书的原文。有了 Alice 证书的摘要和原文，Bob 就可以进行验签。验签通过，Bob 就可以确认 Alice 的证书的确是第三方机构签发的。",-1),g=t("p",null,[a("用上面这样一个机制，合同的双方都无法否认合同。这个解决方案的核心在于"),t("strong",null,"需要第三方信用服务机构提供信用背书"),a("。这里产生了一个最基础的信任链，如果第三方机构的信任崩溃，比如被黑客攻破，那整条信任链条也就断裂了。")],-1),A=t("h3",{id:"信任链",tabindex:"-1"},[a("信任链 "),t("a",{class:"header-anchor",href:"#信任链","aria-label":'Permalink to "信任链"'},"​")],-1),d=t("p",null,[a("为了固化信任关系，减少风险。最合理的方式就是"),t("strong",null,"在互联网中打造一条更长的信任链，环环相扣，避免出现单点的信任风险"),a("。")],-1),b=s("",6),u=s("",12);function m(T,S,k,q,B,P){const e=p("Image");return _(),n("div",null,[l,o(e,{alt:"Lark20210120-162725.png",src:"https://s0.lgstatic.com/i/image/M00/8F/76/CgqCHmAH6jSAER_BAACprlu8LmA391.png"}),c,o(e,{alt:"Lark20210120-162728.png",src:"https://s0.lgstatic.com/i/image2/M01/07/5C/CgpVE2AH6j6ASBKvAADJu5B4-Bc773.png"}),h,g,A,d,o(e,{alt:"Lark20210120-162730.png",src:"https://s0.lgstatic.com/i/image2/M01/07/5A/Cip5yGAH6kWAEWq5AABj5AWYCbQ099.png"}),b,o(e,{alt:"Lark20210120-162718.png",src:"https://s0.lgstatic.com/i/image2/M01/07/5C/CgpVE2AH6kyAHNWzAABv6F_xIJU589.png"}),u])}const H=r(i,[["render",m]]);export{f as __pageData,H as default};
