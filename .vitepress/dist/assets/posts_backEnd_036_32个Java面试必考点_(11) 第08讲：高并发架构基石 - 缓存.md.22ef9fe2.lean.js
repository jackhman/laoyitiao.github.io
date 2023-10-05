import{_ as s,j as o,o as p,g as r,s as e,k as l,h as i,Q as t}from"./chunks/framework.4e7d56ce.js";const J=JSON.parse('{"title":"缓存知识点 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(11) 第08讲：高并发架构基石 - 缓存.md","filePath":"posts/backEnd/036_32个Java面试必考点/(11) 第08讲：高并发架构基石 - 缓存.md","lastUpdated":1696417798000}'),h={name:"posts/backEnd/036_32个Java面试必考点/(11) 第08讲：高并发架构基石 - 缓存.md"},d=e("p",null,"本课时介绍缓存相关的知识点以及 Memcache 和 Redis 这两个最常使用的缓存。重点学习以下三个方面的内容：",-1),n=e("ol",null,[e("li",null,[e("p",null,"使用缓存时常遇到的典型问题；")]),e("li",null,[e("p",null,"Memcache 的内存结构；")]),e("li",null,[e("p",null,"Redis 相关的知识点以及 Redis 常用结构的实现。")])],-1),c=e("h6",{id:"缓存知识点",tabindex:"-1"},[i("缓存知识点 "),e("a",{class:"header-anchor",href:"#缓存知识点","aria-label":'Permalink to "缓存知识点"'},"​")],-1),_={id:"",tabindex:"-1"},u=e("a",{class:"header-anchor",href:"#","aria-label":'Permalink to "<Image alt="" src="http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXSAWVk7AAFdi6Ly8iM148.png"/>"'},"​",-1),b=t("",21),m=e("p",null,"如图左侧，MC 会把内存分为许多不同类型的 Slab，每种类型 Slab 用来保存不同大小的对象。每个 Slab 由若干的 Page 组成，如图中浅绿色的模块。不同 Slab 的 Page，默认大小是一样的，都是 1M，这也是默认 MC 存储对象不能超过 1M 的原因。每个 Page 内又划分为许多的 Chunk，Chunk 就是实际用来保存对象的空间，就是图中橘色的。不同类型的 Slab 中 Chunk 的大小是不同的，当保存一个对象时，MC 会根据对象的大小来选择最合适的 Chunk 来存储，减少空间浪费。",-1),R=e("p",null,"Slab Allocator 创建 Slab 时的参数有三个，分别是 Chunk 大小的增长因子，Chunk 大小的初始值以及 Page 的大小。在运行时会根据要保存的对象大小来逐渐创建 Slab。",-1),k=e("h6",{id:"钙化问题",tabindex:"-1"},[i("钙化问题 "),e("a",{class:"header-anchor",href:"#钙化问题","aria-label":'Permalink to "钙化问题"'},"​")],-1),C=e("p",null,"来考虑这样一个场景，使用 MC 来保存用户信息，假设单个对象大约 300 字节。这时会产生大量的 384 字节大小的 Slab。运行一段时间后，用户信息增加了一个属性，单个对象的大小变成了 500 字节，这时再保存对象需要使用 768 字节的 Slab，而 MC 中的容量大部分创建了 384 字节的 Slab，所以 768 的 Slab 非常少。这时虽然 384 Slab 的内存大量空闲，但 768 Slab 还是会根据 LRU 算法频繁剔除缓存，导致 MC 的剔除率升高，命中率降低。这就是所谓的 MC 钙化问题。",-1),A=e("p",null,"解决钙化问题可以开启 MC 的 Automove 机制，每 10s 调整 Slab。也可以分批重启 MC 缓存，不过要注意重启时要进行一定时间的预热，防止雪崩问题。另外，在使用 Memcached 时，最好计算一下数据的预期平均长度，调整 growth factor， 以获得最恰当的设置，避免内存的大量浪费。",-1),M=e("h6",{id:"详解-redis",tabindex:"-1"},[i("详解 Redis "),e("a",{class:"header-anchor",href:"#详解-redis","aria-label":'Permalink to "详解 Redis"'},"​")],-1),S=e("p",null,"Redis 的知识点结构如下图所示。",-1),q=e("br",null,null,-1),g=t("",27),P=t("",7),f=t("",36),B=e("p",null,"第 1～4 题前面都有提到，不再赘述。",-1),x=e("p",null,"第 5 题，可以从主从读写分离、多从库、多端口实例，以及 Cluster 集群部署来支持水平扩展等几方面回答，高可用可以回答用 Sentinel 来保证主挂掉时重新选主并完成从库变更。",-1),D=e("p",null,"第 6 题，可以使用 Redis 的 sorted set 来实现延时队列，使用时间戳做 Score，消费方使用 zrangbyscore 来获取指定延迟时间之前的数据。",-1),y=e("ul",null,[e("li",null,[e("p",null,"简单场景下分布式锁可以使用 setnx 实现，使用 setnx 设置 key，如果返回 1 表示设置成功，即获取锁成功，如果返回 0 则获取锁失败。setnx 需要同时使用 px 参数设置超时时间，防止获取锁的实例宕机后产生死锁。")]),e("li",null,[e("p",null,"严格场景下，可以考虑使用 RedLock 方案。但是实现比较复杂。")])],-1),T=e("br",null,null,-1),V=e("p",null,"下一课时会讲解队列与数据库的相关知识。",-1),F=e("br",null,null,-1);function L(I,O,v,E,U,N){const a=o("Image");return p(),r("div",null,[d,n,c,e("h6",_,[l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXSAWVk7AAFdi6Ly8iM148.png"}),i(),u]),b,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EA/CgotOV14rXSAJl5hAABTCQiyh9k530.png"}),m,R,k,C,A,M,S,q,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXSAHFMcAAFKedIz0a0877.png"}),g,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXWAdWuJAABsOwtDCh0241.png"}),P,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EA/CgotOV14rXWAUG1iAABuijHdubk935.png"}),f,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXWARjDrAABeJtAm0w0873.png"}),B,x,D,y,T,V,F])}const j=s(h,[["render",L]]);export{J as __pageData,j as default};
