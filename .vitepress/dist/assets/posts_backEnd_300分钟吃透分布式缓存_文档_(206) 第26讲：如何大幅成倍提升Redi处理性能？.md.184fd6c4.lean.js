import{_ as s,j as a,o as i,g as n,k as o,Q as _,s as e,h as l}from"./chunks/framework.e0c66c3f.js";const B=JSON.parse('{"title":"主线程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(206) 第26讲：如何大幅成倍提升Redi处理性能？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(206) 第26讲：如何大幅成倍提升Redi处理性能？.md","lastUpdated":1696338709000}'),d={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(206) 第26讲：如何大幅成倍提升Redi处理性能？.md"},c=_("",13),r=e("p",null,"当请求命令进入时，在主线程触发读事件，主线程此时并不进行网络 IO 的读取，而将该连接所在的 client 加入待读取队列中。Redis 的 Ae 事件模型在循环中，发现待读取队列不为空，则将所有待读取请求的 client 依次分派给 IO 线程，并自旋检查等待，等待 IO 线程读取所有的网络数据。所谓自旋检查等待，也就是指主线程持续死循环，并在循环中检查 IO 线程是否读完，不做其他任何任务。只有发现 IO 线程读完所有网络数据，才停止循环，继续后续的任务处理。",-1),p=e("br",null,null,-1),h=e("p",null,"一般可以配置多个 IO 线程，比如配置 4~8 个，这些 IO 线程发现待读取队列中有任务时，则开始并发处理。每个 IO 线程从对应列表获取一个任务，从里面的 client 连接中读取请求数据，并进行命令解析。当 IO 线程完成所有的请求读取，并完成解析后，待读取任务数变为 0。主线程就停止循环检测，开始依次执行 IO 线程已经解析的所有命令，每执行完毕一个命令，就将响应写入 client 写缓冲，这些 client 就变为待回复 client，这些待回复 client 被加入待回复列表。然后主线程将这些待回复 client，轮询分配给多个 IO 线程。然后再次自旋检测等待。",-1),I=e("br",null,null,-1),O=e("p",null,"然后 IO 线程再次开始并发执行，将不同 client 的响应缓冲写给 client。当所有响应全部处理完后，待回复的任务数变为 0，主线程结束自旋检测，继续处理后续的任务，以及新的读请求。",-1),u=e("br",null,null,-1),R=e("p",null,"Redis 6.0 版本中新引入的多线程模型，主要是指可配置多个 IO 线程，这些线程专门负责请求读取、解析，以及响应的回复。通过 IO 多线程，Redis 的性能可以提升 1 倍以上。",-1),m=e("h2",{id:"多线程方案优劣",tabindex:"-1"},[l("多线程方案优劣 "),e("a",{class:"header-anchor",href:"#多线程方案优劣","aria-label":'Permalink to "多线程方案优劣"'},"​")],-1),b=e("p",null,"虽然多线程方案能提升1倍以上的性能，但整个方案仍然比较粗糙。首先所有命令的执行仍然在主线程中进行，存在性能瓶颈。然后所有的事件触发也是在主线程中进行，也依然无法有效使用多核心。而且，IO 读写为批处理读写，即所有 IO 线程先一起读完所有请求，待主线程解析处理完毕后，所有 IO 线程再一起回复所有响应，不同请求需要相互等待，效率不高。最后在 IO 批处理读写时，主线程自旋检测等待，效率更是低下，即便任务很少，也很容易把 CPU 打满。整个多线程方案比较粗糙，所以性能提升也很有限，也就 1~2 倍多一点而已。要想更大幅提升处理性能，命令的执行、事件的触发等都需要分拆到不同线程中进行，而且多线程处理模型也需要优化，各个线程自行进行 IO 读写和执行，互不干扰、等待与竞争，才能真正高效地利用服务器多核心，达到性能数量级的提升。",-1),P=e("br",null,null,-1);function f(k,g,x,C,T,A){const t=a("Image");return i(),n("div",null,[c,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AB/F1/CgotOV3XnXSAKWxbAACUrOrLfBg597.png"}),r,p,h,I,O,u,R,m,b,P])}const V=s(d,[["render",f]]);export{B as __pageData,V as default};
