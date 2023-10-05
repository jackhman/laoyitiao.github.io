import{_ as l,j as o,o as e,g as t,k as n,Q as p,s,h as c}from"./chunks/framework.4e7d56ce.js";const j=JSON.parse('{"title":"Java 序列化基础 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4268) 16  Dubbo Serialize 层：多种序列化算法，总有一款适合你.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4268) 16  Dubbo Serialize 层：多种序列化算法，总有一款适合你.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4268) 16  Dubbo Serialize 层：多种序列化算法，总有一款适合你.md"},E=p("",20),y=p("",3),i=p("",3),u=s("p",null,"在 DataOutput 接口中定义了序列化 Java 中各种数据类型的相应方法，如下图所示，其中有序列化 boolean、short、int、long 等基础类型的方法，也有序列化 String、byte[] 的方法。",-1),b=s("p",null,"ObjectOutput 接口继承了 DataOutput 接口，并在其基础之上，添加了序列化对象的功能，具体定义如下图所示，其中的 writeThrowable()、writeEvent() 和 writeAttachments() 方法都是调用 writeObject() 方法实现的。",-1),F=p("",3),A=s("p",null,"Hessian2ObjectInput 具体的实现与 Hessian2ObjectOutput 类似：在 DataInput 接口中实现了反序列化各种类型的方法，在 ObjectInput 接口中提供了反序列化 Java 对象的功能，在 Hessian2ObjectInput 中会将所有反序列化的实现委托为 Hessian2Input。",-1),D=s("p",null,"了解了 Dubbo Serialize 层的核心接口以及 Hessian2 序列化算法的接入方式之后，你就可以亲自动手，去阅读其他序列化算法对应模块的代码。",-1),O=s("h3",{id:"总结",tabindex:"-1"},[c("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"在本课时，我们首先介绍了 Java 序列化的基础知识，帮助你快速了解序列化和反序列化的基本概念。然后，介绍了常见的序列化算法，例如，Arvo、Fastjson、Fst、Kryo、Hessian、Protobuf 等。最后，深入分析了 dubbo-serialization 模块对各个序列化算法的接入方式，其中重点说明了 Hessian2 序列化方式。",-1),_=s("p",null,"关于本课时，你若还有什么疑问或想法，欢迎你留言跟我分享。",-1);function g(h,S,C,v,I,m){const a=o("Image");return e(),t("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4F/68/Ciqc1F9gbIiAdyaqAAB4bHnToKs832.png"}),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbJKAFOslAAFjEeB7nf0890.png"}),i,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbOiAG_1mAABH4c18z9c011.png"}),u,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4F/69/Ciqc1F9gbO6AExKqAAB_Dm_zMt0793.png"}),b,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbPOATpsmAABH5ZuVc6E438.png"}),F,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbQ6AXSDeAABIcO3u8aY906.png"}),A,D,O,d,_])}const H=l(r,[["render",g]]);export{j as __pageData,H as default};
