import{_ as o,j as e,o as t,g as c,k as n,h as p,Q as l,s}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"Istio 环境搭建 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6007) 14  Itio 入门：基于最新 1.7 版本的环境搭建和介绍.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6007) 14  Itio 入门：基于最新 1.7 版本的环境搭建和介绍.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(6007) 14  Itio 入门：基于最新 1.7 版本的环境搭建和介绍.md"},y=l("",46),E=l("",12),i=l("",17),d=s("p",null,"Istio 架构示意图",-1),F=s("p",null,"Istio 通过 Galley 模块管理配置，Pilot 模块解析配置为 xDS 协议格式，通过 gRPC 和 Envoy 进行通信，以便完成配置和节点信息更新， pilot-agent 作为 Envoy 守护模块，保证 Envoy 的正常运行和平滑重启。",-1),g=s("p",null,"本地业务服务 productpage 通过 iptables 劫持的方式和本地 Envoy 进行通信，Envoy 完成服务发现后将请求转发到 ProductDetail 服务的所在 Pod，同样通过 iptables 劫持的方式将请求转发到本地的业务服务 ProductDetail。",-1),D=s("h3",{id:"总结",tabindex:"-1"},[p("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),A=s("p",null,"这一讲我主要讲解了 Istio 的基础知识，并通过一个简单的示例让你了解了整个 Istio 的运作模式。",-1),u=s("p",null,"本讲内容总结如下：",-1),v=s("p",null,"参照上面的示例，通过之前的 Kiali 的调用关系图，你可以发现在示例中，productpage 页面中会随机展示 reviews 服务的不同版本。那如何变更默认配置，可以让访问 reviews 服务显示特定版本呢？如果按照不同比例访问 review 特定版本，又如何配置呢？欢迎在留言区和我分享你的观点。",-1),h=s("p",null,"下一讲我会与你分享 xDS：控制面和数据面的通信桥梁。利用 xDS 协议，Envoy 可以实现配置的完全动态化，配置实时更新而无须重启 Envoy 或者影响业务。通过这部分内容的学习，希望你可以掌握数据面 Envoy 如何动态地更新服务的各种配置。我们下一讲再见！",-1);function b(C,k,m,B,f,_){const a=e("Image");return t(),c("div",null,[y,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/92/C0/CgqCHmASi8uAdsqeAAKHpD0j4qg994.png"}),E,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/AC/CgpVE2ASi9WAXwlcAARJrTHcx40431.png"}),p(),i,n(a,{alt:"3-1.png",src:"https://s0.lgstatic.com/i/image/M00/94/C3/CgqCHmAZTISAfD_yAACNyFBh83E067.png"}),p(),d,F,g,D,A,u,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/A9/Cip5yGASi-6AGLTqAAGmg-MI4sk397.png"}),v,h])}const T=o(r,[["render",b]]);export{I as __pageData,T as default};
