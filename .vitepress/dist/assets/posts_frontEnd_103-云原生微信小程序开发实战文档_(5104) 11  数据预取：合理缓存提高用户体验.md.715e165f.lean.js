import{_ as o,j as e,o as t,g as c,k as n,h as s,Q as l,s as p}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"11数据预取：合理缓存提高用户体验","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5104) 11  数据预取：合理缓存提高用户体验.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5104) 11  数据预取：合理缓存提高用户体验.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5104) 11  数据预取：合理缓存提高用户体验.md"},E=l("",19),i=l("",10),y=l("",5),g=p("p",null,"跟周期性更新的配置一样，你可以填写开发者服务器的一个接口地址，也可以填写一个云函数。",-1),_=p("p",null,"你要注意，配置和使用流程一致只是表象，数据预拉取与周期性更新的技术原理并不完全相同。数据预拉取并没有每隔 12 小时轮询一次的机制，而是在用户打开小程序时，如果小程序时冷启动，这时候会发起数据预拉取的任务。冷启动结束以后小程序便可直接获取预拉取的数据，完整的流程如图所示：",-1),d=p("p",null,[p("strong",null,"通过上面的学习你可以得出一个结论："),s(" 小程序的数据预取能力其实是借微信客户端完成的，包括预加载数据的网络请求和数据的缓存，而小程序最终只是从微信客户端的缓存中读取已有的数据而已。这其实也从侧面印证了我们在 09 讲学习融入微信生态的必要性。")],-1),h=l("",15);function u(F,A,k,q,m,C){const a=e("Image");return t(),c("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/73/8D/Ciqc1F_GFBGAYbfQAADRyJ9lhhI010.png"}),s(),i,n(a,{alt:"Lark20201204-183844.png",src:"https://s0.lgstatic.com/i/image/M00/78/85/Ciqc1F_KEieAKxxuAAETANPzC8E599.png"}),s(),y,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/73/8D/Ciqc1F_GFCqAL-MsAADIAWGO2H4699.png"}),s(),g,_,n(a,{alt:"Lark20201204-183859.png",src:"https://s0.lgstatic.com/i/image/M00/78/90/CgqCHl_KEjGAf3IqAAD-e8Eo6bo194.png"}),s(),d,n(a,{alt:"11.png",src:"https://s0.lgstatic.com/i/image/M00/80/34/CgqCHl_Qgq-AXdOrAACFZYooKw0252.png"}),s(),h])}const b=o(r,[["render",u]]);export{B as __pageData,b as default};
