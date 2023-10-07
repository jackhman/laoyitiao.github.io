import{_ as s,j as _,o as i,g as l,k as o,h as t,Q as p,s as a}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"17数据可靠传播：反熵理论如何帮助数据库可靠工作？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6312) 17  数据可靠传播：反熵理论如何帮助数据库可靠工作？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6312) 17  数据可靠传播：反熵理论如何帮助数据库可靠工作？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6312) 17  数据可靠传播：反熵理论如何帮助数据库可靠工作？.md"},h=p("",13),n=a("p",null,"当修复数据时，读修复可以使用阻塞模式与异步模式两种。阻塞模式如上图所示，在修复完成数据后，再将最终结果返还给客户端；而异步模式会启动一个异步任务去修复数据，而不必等待修复完成的结果，即可返回到客户端。",-1),c=a("p",null,[t("你可以回忆一下，阻塞的读修复模式其实满足了上一讲中客户端一致性提到的"),a("strong",null,"读单增"),t("。因为一个值被读取后，下一次读取数据一定是基于上一次读取的。也就是说，同步修复的数据可以保证在下一次读取之前就被传播到目标节点；而异步修复就没有如此保证。但是阻塞修复同时丧失了一定的可用性，因为它需要等待远程节点修复数据，而异步修复就没有此问题。")],-1),d=a("p",null,"在进行消息比较的时候，我们有一个优化的手段是使用散列来比较数据。比如协调节点收到客户端请求后，只向一个节点发送读取请求，而向其他节点发送散列请求。而后将完全请求的返回值进行散列计算，与其他节点返回的散列值进行比较。如果它们是相等的，就直接返回响应；如果不相等，将进行上文所描述的修复过程。",-1),u=a("p",null,"这种散列模式的一个明显好处是在系统处于稳定的状态时，判断数据一致性的代价很小，故可以加快读取速度并有效降低系统负载。常用的散列算法有 MD5 等。当然，理论上散列算法是有碰撞的可能性的，这意味着一些不一致状态无法检测出来。首先，我们要说在真实场景中，这种碰撞概率是很低的，退一万步讲，即使发生碰撞，也会有其他检测方来修复该差异。",-1),q=a("p",null,"以上就是在读取操作中进行的反熵操作，那么在写入阶段我们如何进行修复呢？下面我来介绍暗示切换。",-1),m=a("h4",{id:"暗示切换",tabindex:"-1"},[t("暗示切换 "),a("a",{class:"header-anchor",href:"#暗示切换","aria-label":'Permalink to "暗示切换"'},"​")],-1),g=a("p",null,"暗示切换名字听起来很玄幻。其实原理非常明了，让我们看看它的过程，如下图所示。",-1),k=p("",9),A=p("",7),T=p("",22);function b(P,f,C,M,G,I){const e=_("Image");return i(),l("div",null,[h,o(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/17/C6/CioPOWBIL8yAMlGZAAGZjMMkMrI651.png"}),t(),n,c,d,u,q,m,g,o(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/17/CA/Cgp9HWBIL9WALPvqAAGcHTvEnf0629.png"}),t(),k,o(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/17/CA/Cgp9HWBIL96AR7YaAAA7C1vVQBU503.png"}),t(),A,o(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/17/C7/CioPOWBIL-eAF5kCAAAo07ziIqo508.png"}),t(),T])}const H=s(r,[["render",b]]);export{S as __pageData,H as default};
