import{_ as l,j as e,o as t,h as r,k as o,f as a,Q as p,s}from"./chunks/framework.d3daa342.js";const _=JSON.parse('{"title":"02Dubbo的配置总线：抓住URL，就理解了半个Dubbo","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4258) 02  Dubbo 的配置总线：抓住 URL，就理解了半个 Dubbo.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4258) 02  Dubbo 的配置总线：抓住 URL，就理解了半个 Dubbo.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4258) 02  Dubbo 的配置总线：抓住 URL，就理解了半个 Dubbo.md"},E=p("",30),y=p("",5),i=s("p",null,"传入的 URL 中包含了 Provider 的地址（172.18.112.15:20880）、暴露的接口（org.apache.dubbo.demo.DemoService）等信息， toUrlPath() 方法会根据传入的 URL 参数确定在 ZooKeeper 上创建的节点路径，还会通过 URL 中的 dynamic 参数值确定创建的 ZNode 是临时节点还是持久节点。",-1),u=s("h4",{id:"_3-url-在服务订阅中的应用",tabindex:"-1"},[a("3. URL 在服务订阅中的应用 "),s("a",{class:"header-anchor",href:"#_3-url-在服务订阅中的应用","aria-label":'Permalink to "3. URL 在服务订阅中的应用"'},"​")],-1),d=s("p",null,"Consumer 启动后会向注册中心进行订阅操作，并监听自己关注的 Provider。那 Consumer 是如何告诉注册中心自己关注哪些 Provider 呢？",-1),b=s("p",null,"我们来看 ZookeeperRegistry 这个实现类，它是由上面的 ZookeeperRegistryFactory 工厂类创建的 Registry 接口实现，其中的 doSubscribe() 方法是订阅操作的核心实现，在第 175 行打一个断点，并 Debug 启动 Demo 中 Consumer，会得到下图所示的内容：",-1),g=p("",8);function m(h,F,D,R,A,C){const n=e("Image");return t(),r("div",null,[E,o(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3B/53/Ciqc1F8j2R2AO15wAAGHCEMA4ig361.png"}),a(),y,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/3B/53/Ciqc1F8j2aGAJmTVAAI-2XB7V7o382.png"}),a(),i,u,d,b,o(n,{alt:"Lark20200731-183202.png",src:"https://s0.lgstatic.com/i/image/M00/3B/6D/CgqCHl8j822Aa3VpAAPpUoCBlf4288.png"}),a(),g])}const U=l(c,[["render",m]]);export{_ as __pageData,U as default};
