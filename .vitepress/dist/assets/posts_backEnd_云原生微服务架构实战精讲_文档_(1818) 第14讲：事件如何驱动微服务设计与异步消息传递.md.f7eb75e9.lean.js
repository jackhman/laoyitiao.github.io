import{_ as e,j as l,o,g as t,k as n,Q as p,s,h as r}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"事件 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1818) 第14讲：事件如何驱动微服务设计与异步消息传递.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1818) 第14讲：事件如何驱动微服务设计与异步消息传递.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1818) 第14讲：事件如何驱动微服务设计与异步消息传递.md"},E=p("",29),y=s("p",null,"Kafka 包含了 5 个核心 API，如下表所示。",-1),i=s("p",null,"生产者负责发布记录到选定的主题上。在发布时，生产者负责为记录选择所在的分片，每个主题都可以有多个消费者，消费者以分组的形式来组织，每个消费者以标签的形式来表明所在的分组。对于每个主题中发布的记录，该记录会被发送到每个订阅了该主题的消费者分组中的其中一个消费者，消费者分组可以实现不同的记录处理场景。如果所有的消费者都属于同一个分组，那么记录会在所有的消费者中以负载均衡的方式处理；如果所有的消费者都属于各自独立的分组，那么记录会被广播到所有的消费者。",-1),d=s("p",null,"除了这两种极端场景外，通常的情况是使用从业务需要上进行区分的少量分组，每个分组中包含一定数量的消费者来保证处理速度和进行故障恢复。每个分组中的消费者数量不能超过分片的数量。",-1),g=s("p",null,"消费者只需要维护在分片中的当前偏移量即可，这个偏移量是当前的读取位置，通常的做法是递增该偏移量来顺序读取记录。在需要的时候，还可以把偏移量设置为之前的值来重新处理一些记录，或是跳过一些记录。",-1),h=s("h4",{id:"消息传递的保证性",tabindex:"-1"},[r("消息传递的保证性 "),s("a",{class:"header-anchor",href:"#消息传递的保证性","aria-label":'Permalink to "消息传递的保证性"'},"​")],-1),_=s("p",null,"在消息传递时，一个需要考虑的重要问题是消息传递的保证性，也就是生产者发布的消息，是否一定可以被消费者接收到。一共有 3 种不同的保证性，如下表所示。",-1),v=p("",9);function u(F,A,P,k,C,b){const a=l("Image");return o(),t("div",null,[E,n(a,{alt:"kafka-topic.png",src:"https://s0.lgstatic.com/i/image/M00/00/F3/Ciqc1F6quauAFWu4AABAhDlLtrQ129.png"}),y,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/00/F3/CgqCHl6qujWAXEjgAAB-2tIxsOE392.png"}),i,d,g,h,_,n(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/00/F3/Ciqc1F6qukCAO4taAABNA04t1yw767.png"}),v])}const m=e(c,[["render",u]]);export{f as __pageData,m as default};
