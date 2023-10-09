import{_ as s,j as l,o as e,h as p,k as o,f as i,Q as a,s as n}from"./chunks/framework.d3daa342.js";const V=JSON.parse('{"title":"13操作系统内核：Linux内核和Window内核有什么区别？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4620) 13  操作系统内核：Linux 内核和 Window 内核有什么区别？.md","filePath":"posts/backEnd/重学操作系统_文档/(4620) 13  操作系统内核：Linux 内核和 Window 内核有什么区别？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/重学操作系统_文档/(4620) 13  操作系统内核：Linux 内核和 Window 内核有什么区别？.md"},r=a("",11),d=n("h4",{id:"内核是如何工作的",tabindex:"-1"},[i("内核是如何工作的？ "),n("a",{class:"header-anchor",href:"#内核是如何工作的","aria-label":'Permalink to "内核是如何工作的？"'},"​")],-1),u=n("p",null,[n("strong",null,"为了帮助你理解什么是内核，请你先思考一个问题：进程和内核的关系，是不是像浏览器请求服务端服务"),i('？你可以先自己思考，然后在留言区写下你此时此刻对这个问题的认知，等学完"模块三"再反过头来回顾这个知识，相信你定会产生新的理解。')],-1),c=n("p",null,"接下来，我们先一起分析一下这个问题。",-1),h=n("p",null,"内核权限非常高，它可以管理进程、可以直接访问所有的内存，因此确实需要和进程之间有一定的隔离。这个隔离用类似请求/响应的模型，非常符合常理。",-1),g=a("",11),x=n("p",null,"这个名词翻译过来叫作可执行文件链接格式。这是一种从 Unix 继承而来的可执行文件的存储格式。我们可以看到 ELF 中把文件分成了一个个分段（Segment），每个段都有自己的作用。如果想要深入了解这块知识，会涉及部分编译原理的知识，如果你感兴趣可以去网上多查些资料或者去留言区我们一起讨论。",-1),m=n("ul",null,[n("li",null,[n("strong",null,"Monolithic Kernel")])],-1),w=n("p",null,"这个名词翻译过来就是宏内核，宏内核反义词就是 Microkernel ，微内核的意思。Linux 是宏内核架构，这说明 Linux 的内核是一个完整的可执行程序，且内核用最高权限来运行。宏内核的特点就是有很多程序会打包在内核中，比如，文件系统、驱动、内存管理等。当然这并不是说，每次安装驱动都需要重新编译内核，现在 Linux 也可以动态加载内核模块。所以哪些模块在内核层，哪些模块在用户层，这是一种系统层的拆分，并不是很强的物理隔离。",-1),T=n("p",null,[i("与宏内核对应，接下来说说"),n("strong",null,"微内核，内核只保留最基本的能力。比如进程调度、虚拟内存、中断。多数应用，甚至包括驱动程序、文件系统，是在用户空间管理的"),i("。")],-1),L=a("",9),P=n("p",null,"Windows 同样支持 Multitask 和 SMP（对称多处理）。Windows 的内核设计属于混合类型。你可以看到内核中有一个 Microkernel 模块。而整个内核实现又像宏内核一样，含有的能力非常多，是一个完整的整体。",-1),A=n("p",null,[i("Windows 下也有自己的可执行文件格式，这个格式叫作 Portable Executable（PE），也就是可移植执行文件，扩展名通常是"),n("code",null,".exe"),i("、"),n("code",null,".dll"),i("、"),n("code",null,".sys"),i("等。")],-1),C=n("p",null,"PE 文件的结构和 ELF 结构有很多相通的地方，我找到了一张图片帮助你更直观地理解。 因为这部分知识涉及编译原理，我这里就不详细介绍了，感兴趣同学可以在留言区和大家一起讨论，或者查阅更多资料。",-1),q=a("",13);function W(k,b,f,S,E,M){const t=l("Image");return e(),p("div",null,[r,o(t,{alt:"Lark20201021-153830.png",src:"https://s0.lgstatic.com/i/image/M00/61/89/CgqCHl-P5meAd3VdAAB1f7DWz-I273.png"}),i(),d,u,c,h,o(t,{alt:"Lark20201021-153825.png",src:"https://s0.lgstatic.com/i/image/M00/61/8A/CgqCHl-P5naAc5fsAABuTlhIQkw555.png"}),i(),g,o(t,{alt:"Lark20201021-153821.png",src:"https://s0.lgstatic.com/i/image/M00/61/7E/Ciqc1F-P5pOAeET-AAEzXOQTzbA445.png"}),i(),x,m,w,T,o(t,{alt:"Lark20201021-183457.png",src:"https://s0.lgstatic.com/i/image/M00/61/AA/CgqCHl-QEKSAYD22AAFXRfj1rsA581.png"}),i(),L,o(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/61/7F/Ciqc1F-P5suAH9CJAAFl4zKFbJc816.png"}),i(),P,A,C,o(t,{alt:"Lark20201021-153828.png",src:"https://s0.lgstatic.com/i/image/M00/61/8A/CgqCHl-P5ySAAg5CAACF0kTmx_k209.png"}),i(),q])}const I=s(_,[["render",W]]);export{V as __pageData,I as default};
