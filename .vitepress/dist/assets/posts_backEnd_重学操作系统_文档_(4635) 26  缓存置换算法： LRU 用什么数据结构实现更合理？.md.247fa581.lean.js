import{_ as n,j as p,o as i,h as l,k as e,f as o,Q as s,s as t}from"./chunks/framework.d3daa342.js";const Q=JSON.parse('{"title":"26缓存置换算法：LRU用什么数据结构实现更合理？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4635) 26  缓存置换算法： LRU 用什么数据结构实现更合理？.md","filePath":"posts/backEnd/重学操作系统_文档/(4635) 26  缓存置换算法： LRU 用什么数据结构实现更合理？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/重学操作系统_文档/(4635) 26  缓存置换算法： LRU 用什么数据结构实现更合理？.md"},r=s("",14),c=t("p",null,"为了方便你理解本讲后面的内容，我在这里先做一个知识铺垫供你参考。上图中，新元素从链表头部插入，旧元素从链表尾部离开。 这样就构成了一个队列（Queue），队列是一个经典的 FIFO 模型。",-1),d=t("p",null,"还有一种策略是先进后出（First In Last Out）。但是这种策略和 FIFO、随机一样，没有太强的实际意义。因为先进来的元素、后进来的元素，还是随机的某个元素，和我们期望的未来使用频率，没有任何本质联系。",-1),h=t("p",null,"同样 FILO 的策略也可以用一个链表实现，如下图所示：",-1),g=t("p",null,"新元素从链表头部插入链表，旧元素从链表头部离开链表，就构成了一个栈（Stack），栈是一种天然的 FILO 数据结构。这里仅供参考了，我们暂时还不会用到这个方法。",-1),U=t("p",null,"当然我们不可能知道未来，但是可以考虑基于历史推测未来。经过前面的一番分析，接下来我们开始讨论一些更有价值的置换策略。",-1),u=t("h3",{id:"最近未使用-nru",tabindex:"-1"},[o("最近未使用（NRU） "),t("a",{class:"header-anchor",href:"#最近未使用-nru","aria-label":'Permalink to "最近未使用（NRU）"'},"​")],-1),R=t("p",null,"一种非常简单、有效的缓存实现就是优先把最近没有使用的数据置换出去（Not Recently Used)。从概率上说，最近没有使用的数据，未来使用的概率会比最近经常使用的数据低。缓存设计本身也是基于概率的，一种方案有没有价值必须经过实践验证------在内存缺页中断后，如果采用 NRU 置换页面，可以提高后续使用内存的命中率，这是实践得到的结论。",-1),L=t("p",null,[o('而且 NRU 实现起来比较简单，下图是我们在"'),t("strong",null,"24 讲"),o('"中提到的页表条目设计。')],-1),A=t("p",null,"在页表中有一个访问位，代表页表有被读取过。还有一个脏位，代表页表被写入过。无论是读还是写，我们都可以认为是访问过。 为了提升效率，一旦页表被使用，可以用硬件将读位置 1，然后再设置一个定时器，比如 100ms 后，再将读位清 0。当有内存写入时，就将写位置 1。过一段时间将有内存写入的页回写到磁盘时，再将写位清 0。这样读写位在读写后都会置为 1，过段时间，也都会回到 0。",-1),m=t("p",null,"上面这种方式，就构成了一个最基本的 NRU 算法。每次置换的时候，操作系统尽量选择读、写位都是 0 的页面。而一个页面如果在内存中停留太久，没有新的读写，读写位会回到 0，就可能会被置换。",-1),F=t("p",null,"这里多说一句，NRU 本身还可以和其他方法结合起来工作，比如我们可以利用读、写位的设计去改进 FIFO 算法。",-1),C=t("p",null,[o("每次 FIFO 从队列尾部找到一个条目要置换出去的时候，就检查一下这个条目的读位。如果读位是 0，就删除这个条目。如果读位中有 1，就把这个条目从队列尾部移动到队列的头部，并且把读位清 0，相当于多给这个条目一次机会，因此也被称为"),t("strong",null,"第二次机会算法"),o("。多给一次机会，就相当于发生访问的页面更容易存活。而且，这样的算法利用天然的数据结构优势（队列），保证了 NRU 的同时，节省了去扫描整个缓存寻找读写位是 0 的条目的时间。")],-1),q=t("p",null,"第二次机会算法还有一个更巧妙的实现，就是利用循环链表。这个实现可以帮助我们节省元素从链表尾部移动到头部的开销。",-1),b=t("p",null,"如上图所示，我们可以将从尾部移动条目到头部的这个操作简化为头指针指向下一个节点。每次移动链表尾部元素到头部，只需要操作头指针指向下一个元素即可。这个方法非常巧妙，而且容易实现，你可以尝试在自己系统的缓存设计中尝试使用它。",-1),f=t("p",null,[t("strong",null,"以上，是我们学习的第一个比较有价值的缓存置换算法。基本可用，能够提高命中率"),o("。缺点是只考虑了最近用没用过的情况，没有充分考虑综合的访问情况。优点是简单有效，性能好。缺点是考虑不周，对缓存的命中率提升有限。但是因为简单，容易实现，NRU 还是成了一个被广泛使用的算法。")],-1),k=t("h3",{id:"最近使用最少-lru",tabindex:"-1"},[o("最近使用最少（LRU） "),t("a",{class:"header-anchor",href:"#最近使用最少-lru","aria-label":'Permalink to "最近使用最少（LRU）"'},"​")],-1),P=t("p",null,"一种比 NRU 考虑更周密，实现成本更高的算法是最近最少使用（Least Recently Used， LRU）算法，它会置换最久没有使用的数据。和 NRU 相比，LRU 会考虑一个时间范围内的数据，对数据的参考范围更大。LRU 认为，最近一段时间最少使用到的数据应该被淘汰，把空间让给最近频繁使用的数据。这样的设计，即便数据都被使用过，还是会根据使用频次多少进行淘汰。比如：CPU 缓存利用 LUR 算法将空间留给频繁使用的内存数据，淘汰使用频率较低的内存数据。",-1),I=t("h4",{id:"常见实现方案",tabindex:"-1"},[o("常见实现方案 "),t("a",{class:"header-anchor",href:"#常见实现方案","aria-label":'Permalink to "常见实现方案"'},"​")],-1),N=t("p",null,"LRU 的一种常见实现是链表，如下图所示：",-1),T=s("",30);function O(M,x,S,D,y,V){const a=p("Image");return i(),l("div",null,[r,e(a,{alt:"Lark20201209-181216.png",src:"https://s0.lgstatic.com/i/image/M00/80/58/Ciqc1F_QoymAebUsAAC5OScaOig811.png"}),o(),c,d,h,e(a,{alt:"Lark20201209-181224.png",src:"https://s0.lgstatic.com/i/image/M00/80/58/Ciqc1F_QozGARRGMAACUhdXtUCg859.png"}),o(),g,U,u,R,L,e(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/80/63/CgqCHl_QozuAMNoVAACEBmcfbc8914.png"}),o(),A,m,F,C,q,e(a,{alt:"Lark20201209-182118.png",src:"https://s0.lgstatic.com/i/image/M00/80/5C/Ciqc1F_QpS-Ab2r8AAEGCdwUp9k081.png"}),o(),b,f,k,P,I,N,e(a,{alt:"Lark20201209-182121.png",src:"https://s0.lgstatic.com/i/image/M00/80/5C/Ciqc1F_QpTeAK6CAAAC8UoADogQ978.png"}),o(),T])}const B=n(_,[["render",O]]);export{Q as __pageData,B as default};
