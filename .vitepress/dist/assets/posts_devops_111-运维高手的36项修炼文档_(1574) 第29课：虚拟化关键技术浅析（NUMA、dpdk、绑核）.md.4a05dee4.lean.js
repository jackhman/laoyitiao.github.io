import{_ as a,j as n,o as s,g as l,k as e,s as t,h as i,Q as p}from"./chunks/framework.e0c66c3f.js";const J=JSON.parse('{"title":"虚拟化技术演变 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1574) 第29课：虚拟化关键技术浅析（NUMA、dpdk、绑核）.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1574) 第29课：虚拟化关键技术浅析（NUMA、dpdk、绑核）.md","lastUpdated":1696338709000}'),c={name:"posts/devops/111-运维高手的36项修炼文档/(1574) 第29课：虚拟化关键技术浅析（NUMA、dpdk、绑核）.md"},r=t("p",null,"本课时我们来学习虚拟化关键技术。对于虚拟化技术原理的了解有助于我们对虚拟化技术的应用。",-1),_=t("h3",{id:"虚拟化技术演变",tabindex:"-1"},[i("虚拟化技术演变 "),t("a",{class:"header-anchor",href:"#虚拟化技术演变","aria-label":'Permalink to "虚拟化技术演变"'},"​")],-1),d=t("p",null,"我这里列了一张图，把一些常见的虚拟主机技术进行罗列，横坐标是时间轴，纵坐标是具体的一些虚拟化技术名称。",-1),h=p("",13),U=t("p",null,"了解这个概念后我们如果在底层系统层再安装虚拟机，那么就是遵循：硬件层-->物理机系统-->虚拟机管理软件VMM-->虚拟主机系统-->虚拟主机应用 这样一个层次关系。那么在虚拟化技术中虚拟机应用所需要执行特权指令该如何切换呢？",-1),C=t("h4",{id:"cpu-全虚拟化原理",tabindex:"-1"},[i("CPU 全虚拟化原理 "),t("a",{class:"header-anchor",href:"#cpu-全虚拟化原理","aria-label":'Permalink to "CPU 全虚拟化原理"'},"​")],-1),P=t("p",null,"下面这张图展示了 CPU 虚化早期的全虚拟化原理的实现方式：",-1),g=t("p",null,"可以看到，内核态 Ring0 级别运行一个叫作 VMM 的软件，这个软件主要是用来做特权指令集的翻译。虚拟机系统 OS 在 Ring1，虚拟机上的应用 App 需要执行特权的底层调用指令时，它会先给自己运行的虚拟机的 OS 系统上发送对应的指令。它在执行特权指令时,会触发异常,然后 VMM 捕获这个异常,在异常里面做翻译模拟,返回到 OS。",-1),u=t("p",null,"我们会看到，这种方式对一条指令执行非常烦琐，需要进行多次转发，性能差。早期的虚拟化技术，早期版本 Vmware 、 Virtualbox，它们都是基于软件虚拟化的方式来实现的，随着虚拟化技术发展以及性能瓶颈越来越凸显，有更好的虚拟化的技术产生。",-1),A=t("h4",{id:"cpu-半虚拟化原理",tabindex:"-1"},[i("CPU 半虚拟化原理 "),t("a",{class:"header-anchor",href:"#cpu-半虚拟化原理","aria-label":'Permalink to "CPU 半虚拟化原理"'},"​")],-1),M=t("p",null,"更好的技术最早出来一种技术叫半虚拟化技术。所谓半虚拟化技术，你可以看看下面这张图：",-1),m=t("p",null,"我们会看到这里把虚拟机 OS 层放到 Ring0，这里封装了 Hypervisor 层，这种模式需要修改操作系统内核，替换掉不能虚拟化的指令，通过 Hypercall 直接和底层的虚拟化层 Hypervisor 来通信，Hypervisor 同时也提供了超级调用接口来满足其他关键内核操作，这种方式节省了全虚拟化中的捕获和模拟，大大提高了效率，但是存在一个问题，它需要让虚拟机上的 OS 系统进行内核上的改造，才能够调用 Hypervisor及整体这套架构。",-1),N=t("p",null,"所以：我们会看到早期 Xen 虚拟化技术，用到这样的一种方式，它只能用 Linux 的操作系统来做虚拟机的操作系统，但是 Windows 是无法进行支持的，所以在操作系统的支持上就存在着一些局限性。",-1),V=t("h4",{id:"cpu-硬件虚拟化原理",tabindex:"-1"},[i("CPU 硬件虚拟化原理 "),t("a",{class:"header-anchor",href:"#cpu-硬件虚拟化原理","aria-label":'Permalink to "CPU 硬件虚拟化原理"'},"​")],-1),x=t("p",null,"除了软件的不断优化，硬件也在对虚拟化的技术不断改善及性能调优。主流的服务器 CPU 的厂商，如 Intel 和 AMD ，他们从 CPU 层，也就是硬件层，考虑去支持虚拟化的一些指令。Intel 引入了 Intel-VT （Virtualization Technology）虚拟化 CPU 指令集，这种 CPU 有 VMX root operation 和 VMX non-root operation 两种模式，且两种模式都有一套 Ring0-4 权限级别。 这里就使得 VMM 可以运行在 VMX root operation 模式下,客户 OS 运行在 VMX non-root operation 模式下，而且两种操作模式可以互相转换。",-1),b=t("p",null,"对于虚拟主机上面的应用有需求，需要 OS 去使用底层特权或遇到需要 VMM 处理的事件，这时 OS 就可以切换到 VMX root operation 模式。",-1),k=t("p",null,"这种依赖 CPU 硬件虚拟化方式，应用广泛，性能也是比较出众的。",-1),f=t("h3",{id:"numa-虚拟化技术",tabindex:"-1"},[i("NUMA 虚拟化技术 "),t("a",{class:"header-anchor",href:"#numa-虚拟化技术","aria-label":'Permalink to "NUMA 虚拟化技术"'},"​")],-1),R=t("p",null,"接下来要给你来分享虚拟化技术，也是围绕 CPU 的资源优化，叫作 NUMA。NUMA 是对于虚拟主机调用内存的一套新的管理方式，为什么需要 NUMA？在早期的 CPU 架构里面，CPU 对于内存的调用都要通过硬件上面的北桥芯片，但随着 CPU 的核数不断增加， CPU 对于内存的调用都通过北桥芯片，肯定会产生很多冲突，这个时候就把内存逐步在底层硬件上面做了改造，把内存绑定到了不同的 CPU 的寄存器里面。",-1),S=t("p",null,"对于 CPU 调用内存而言，我们会看到一个单独的 CPU，它自己会绑定一组内存。但是这样模式会存在一个问题：在多核物理服务器的架构下，内存的控制器由于受到了拆分，分配到了不同的 CPU上，会导致 CPU 访问非本地这一组内存时，要比访问本地这组的内存慢 10%，也就是访问 Remote 这组内存时，会慢 10%，因为它不是在本地进行调用的，所以性能上一定会受损。",-1),q=t("p",null,"为了避免这样的问题产生，我们在软件层使用了 NUMA 技术。这就涉及在进行虚拟机优化的情况下，虚拟机 CPU 尽量减少一些跨 NUMA 的调用，所以我们需要根据虚拟机上的虚拟 CPU 和它内存的调用关系来做提前分配，让具体的 CPU 能够尽量分配到同一种 NUMA 节点，来避免远程调用。",-1),H=t("p",null,"所以具体的虚拟机的装箱算法通常是这样子的：",-1),v=t("p",null,"物理机上的任何一个物理 CPU，在它能提供的虚拟核数足够的情况下，尽量让虚拟机的 CPU 能够放到单个物理及物理 CPU 上面。如果物理 CPU 小于子集所需要申请的虚拟 CPU ，我们尽量在虚拟机的 CPU 上和在物理机的 CPU 平分。",-1),I=t("p",null,"另外，在虚拟机层次中，尽量透传 NUMA 信息到虚拟机，使得虚拟机上运行应用能够根据这些 NUMA 信息，这样对应用层 NUMA 绑定优化可以起到帮助的。",-1),O=t("p",null,"应用对于 NUMA 的使用，通常 DBA 的同学对数据库(MySQL) 进行优化的时候，会考虑 NUMA 的配置优化。",-1),T=t("h3",{id:"绑核",tabindex:"-1"},[i("绑核 "),t("a",{class:"header-anchor",href:"#绑核","aria-label":'Permalink to "绑核"'},"​")],-1),y=t("p",null,"最后要给你分享的就是对于 CPU 的绑核，在讲 Nginx 的优化的时给你介绍过，Nginx 优化需要考虑做 CPU 亲和性，对于虚拟机绑核其实也是一样的道理，让虚拟机把它的虚拟机 VCPU 固定绑到底层虚拟化服务固定线程上，从而实现一对一的绑定到具体的物理 CPU。这样的好处之一就是使得虚拟机的 CPU 和物理机的 CPU 能够一对一地绑定，而不会导致其他的虚拟机来争抢当前VCPU 资源，同时也避免来回切换 CPU 资源。这个也是通常在虚拟机的性能优化时，我们通常需要考虑进行设置的。",-1),D=t("p",null,"本课时内容我们主要是围绕计算性能这部分内容做的讲解，如果你对虚拟化的技术非常感兴趣，也可以在网上来搜索更多的资料或者来和我交流。",-1);function X(Z,B,G,w,L,j){const o=n("Image");return s(),l("div",null,[r,_,d,e(o,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/19/07/Ciqc1F7Z5pCAI3wpAACnKzGghUk811.png"}),h,e(o,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/19/12/CgqCHl7Z5pqASfvmAAGwHYuxx1k074.png"}),U,C,P,e(o,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/19/12/CgqCHl7Z5qGAHRbsAAGofogy0rg750.png"}),g,u,A,M,e(o,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/19/07/Ciqc1F7Z5qiABuNpAAGxNcsS_Ho822.png"}),m,N,V,x,e(o,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/19/12/CgqCHl7Z5rKAHPYjAAIJrpujE5k364.png"}),b,k,f,R,e(o,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/19/13/CgqCHl7Z5rmAJBJ1AACo-ULE6rw595.png"}),S,q,H,e(o,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/19/07/Ciqc1F7Z5sCAR0RjAADU0NzcWqI053.png"}),v,I,O,T,y,D])}const K=a(c,[["render",X]]);export{J as __pageData,K as default};
