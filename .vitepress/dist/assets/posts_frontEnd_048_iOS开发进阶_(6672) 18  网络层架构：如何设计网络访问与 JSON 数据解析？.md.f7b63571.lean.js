import{_ as l,j as e,o as t,h as c,k as o,f as a,s,Q as p}from"./chunks/framework.d3daa342.js";const T=JSON.parse('{"title":"18网络层架构：如何设计网络访问与JSON数据解析？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6672) 18  网络层架构：如何设计网络访问与 JSON 数据解析？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6672) 18  网络层架构：如何设计网络访问与 JSON 数据解析？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6672) 18  网络层架构：如何设计网络访问与 JSON 数据解析？.md"},E=s("h1",{id:"_18网络层架构-如何设计网络访问与json数据解析",tabindex:"-1"},[a("18网络层架构：如何设计网络访问与JSON数据解析？ "),s("a",{class:"header-anchor",href:"#_18网络层架构-如何设计网络访问与json数据解析","aria-label":'Permalink to "18网络层架构：如何设计网络访问与JSON数据解析？"'},"​")],-1),y=s("p",null,"为了存取服务器上的数据，并与其他用户进行通信，几乎所有的 iOS App 都会访问后台 API 。目前流行的后台 API 设计有几种方案： RESTful、gRPC、GraphQL 和 WebSocket。其中，gRPC 使用 Protobuf 进行数据传输， GraphQL 和 RESTful 往往使用 JSON 进行传输。",-1),i=s("p",null,"为了把访问后台 API 的网络传输细节给屏蔽掉，并为上层模块提供统一的访问接口，我们在架构 App 的时候，往往会把网络访问封装成一个独立的 Networking 模块。像我们的 Moments App 也不例外，它的这个模块负责访问 BFF，同时把返回的 JSON 数据进行解码。所以，这一讲，我主要介绍下 Networking 模块的架构设计与实现，以及如何使用 Swift 的 Codable 来解码返回的 JSON 数据。",-1),d=s("h3",{id:"networking-模块架构",tabindex:"-1"},[a("Networking 模块架构 "),s("a",{class:"header-anchor",href:"#networking-模块架构","aria-label":'Permalink to "Networking 模块架构"'},"​")],-1),F=s("p",null,"下图是朋友圈功能 Networking 模块的具体架构。",-1),u=p("",6),g=p("",39),C=p("",20),D=p("",13);function m(h,b,B,S,q,v){const n=e("Image");return t(),c("div",null,[E,y,i,d,F,o(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/82/Cgp9HWB_3o2AYfKOAAONWHcpJpI148.png"}),a(),u,o(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/82/Cgp9HWB_3pmAR0JMAAGYfVaC1qI931.png"}),a(),g,o(n,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/82/Cgp9HWB_3tuABbZnAAUdSISnc44399.png"}),a(),C,o(n,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M00/3A/8A/CioPOWB_3yGAbcmbAAT0CvLwTTw986.png"}),a(),D])}const M=l(r,[["render",m]]);export{T as __pageData,M as default};
