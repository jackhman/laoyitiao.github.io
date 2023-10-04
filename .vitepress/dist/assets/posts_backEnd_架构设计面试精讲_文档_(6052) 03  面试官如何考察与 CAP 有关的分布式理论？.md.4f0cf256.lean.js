import{_ as l,j as n,o as p,g as i,k as s,h as o,Q as e,s as t}from"./chunks/framework.e0c66c3f.js";const x=JSON.parse('{"title":"案例背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6052) 03  面试官如何考察与 CAP 有关的分布式理论？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6052) 03  面试官如何考察与 CAP 有关的分布式理论？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/架构设计面试精讲_文档/(6052) 03  面试官如何考察与 CAP 有关的分布式理论？.md"},_=e("",12),A=t("p",null,"这时，客户端 Client 从任何节点 A 或 A1 读取数据，都能读取到最新写入的数据，说明 A 和 A1 的数据是一致的，并且 A 和 A1 也都是可用的。",-1),c=t("p",null,"但由于网络是不可靠的，节点 A 和 A1 的网络随时会因为中断而出现分区。所谓网络分区就是由于网络不通导致节点 A 和 A1 被隔离在不同的网络子集中，此时节点 A 的数据就不能及时同步到节点 A1 中了。",-1),d=t("p",null,"在分布式系统中，由于网络问题导致的网络分区是常态。也就是说出现网络分区时，根据 CAP 理论，需要在 A 和 C 中进行取舍，即要么保证系统的可用性，要么保证数据一致性。",-1),u=t("p",null,"这里你要注意了，上面的例子有个大前提，就是系统出现了网络分区，但实际情况是，在绝大多数时间里并不存在网络分区（网络不会经常出现问题）。那么还要进行三选二吗（CP 或者 AP）？",-1),C=t("p",null,[o("其实，不同的分布式系统要根据业务场景和业务需求在 CAP 三者中进行权衡。"),t("strong",null,"CAP 理论用于指导在系统设计时需要衡量的因素，而非进行绝对地选择"),o("。")],-1),g=t("p",null,"当网络没有出现分区时，CAP 理论并没有给出衡量 A 和 C 的因素，但如果你做过实际的分布式系统设计，一定会发现系统数据同步的时延（Latency），即例子中节点 A 同步数据到节点 A1 的时间才是衡量 A 和 C 最重要的因素，此时就不会有绝对的 AP 模型还是 CP 模型了，而是源于对实际业务场景的综合考量。",-1),h=t("p",null,[o("因此，才会有如 "),t("a",{href:"http://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf",target:"_blank",rel:"noreferrer"},"PACELC"),o(" 这样的新模型优化原有的 CAP 理论，理论指导实践，实践优化理论。根据 PACELC 模型的定义，如果有网络分区产生，系统就必须在 A 和 C 之间取得平衡，否则（Else，即 PACELC 中的 E）当系统运行在无网络分区情况下，系统需要在 L（延迟）和 C 之间取得平衡。")],-1),P=e("",14),q=e("",20);function m(b,f,E,T,S,k){const a=n("Image");return p(),i("div",null,[_,s(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/8D/67/CgqCHl_-eW2ALOs5AAFBvaYD4f8199.png"}),o(),A,c,s(a,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/8D/5C/Ciqc1F_-eXaAcu6nAAE3Pk18sD8666.png"}),d,u,C,g,h,s(a,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/8D/67/CgqCHl_-eYOAT7NXAAFRFjVnR8E067.png"}),o(),P,s(a,{alt:"9.png",src:"https://s0.lgstatic.com/i/image/M00/8D/5C/Ciqc1F_-eY-AALaAAAGd9CXhZI4183.png"}),o(),q])}const V=l(r,[["render",m]]);export{x as __pageData,V as default};
