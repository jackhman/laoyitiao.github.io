import{_ as e,j as l,o as p,g as i,k as o,Q as n,s,h as a}from"./chunks/framework.e0c66c3f.js";const K=JSON.parse('{"title":"硬盘分块 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4640) 30  文件系统的底层实现：FAT、NTFS 和 Ext3 有什么区别？.md","filePath":"posts/backEnd/重学操作系统_文档/(4640) 30  文件系统的底层实现：FAT、NTFS 和 Ext3 有什么区别？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/重学操作系统_文档/(4640) 30  文件系统的底层实现：FAT、NTFS 和 Ext3 有什么区别？.md"},_=n("",7),r=n("",6),d=s("p",null,[s("strong",null,"一个文件，最基本的就是要描述文件在硬盘中到底对应了哪些块。FAT 表通过一种类似链表的结构描述了文件对应的块"),a("。上图中：文件 1 从位置 5 开始，这就代表文件 1 在硬盘上的第 1 个块的序号是 5 的块 。然后位置 5 的值是 2，代表文件 1 的下一个块的是序号 2 的块。顺着这条链路，我们可以找到 5 → 2 → 9 → 14 → 15 → -1。-1 代表结束，所以文件 1 的块是：5,2,9,14,15。同理，文件 2 的块是 3,8,12。")],-1),A=s("p",null,[s("strong",null,"FAT 通过一个链表结构解决了文件和物理块映射的问题，算法简单实用，因此得到过广泛的应用，到今天的 Windows/Linux/MacOS 都还支持 FAT 格式的文件系统"),a("。FAT 的缺点就是非常占用内存，比如 1T 的硬盘，如果块的大小是 1K，那么就需要 1G 个 FAT 条目。通常一个 FAT 条目还会存一些其他信息，需要 2~3 个字节，这就又要占用 2-3G 的内存空间才能用 FAT 管理 1T 的硬盘空间。显然这样做是非常浪费的，问题就出在了 FAT 表需要全部维护在内存当中。")],-1),g=s("h4",{id:"索引节点-inode",tabindex:"-1"},[a("索引节点（inode） "),s("a",{class:"header-anchor",href:"#索引节点-inode","aria-label":'Permalink to "索引节点（inode）"'},"​")],-1),h=s("p",null,"为了改进 FAT 的容量限制问题，可以考虑为每个文件增加一个索引节点（inode）。这样，随着虚拟内存的使用，当文件导入内存的时候，先导入索引节点（inode），然后索引节点中有文件的全部信息，包括文件的属性和文件物理块的位置。",-1),T=s("p",null,"如上图，索引节点除了属性和块的位置，还包括了一个指针块的地址。这是为了应对文件非常大的情况。一个大文件，一个索引节点存不下，需要通过指针链接到其他的块去描述文件。",-1),F=s("p",null,"这种文件索引节点（inode）的方式，完美地解决了 FAT 的缺陷，一直被沿用至今。FAT 要把所有的块信息都存在内存中，索引节点只需要把用到的文件形成数据结构，而且可以使用虚拟内存分配空间，随着页表置换，这就解决了 FAT 的容量限制问题。",-1),u=s("h3",{id:"目录的实现",tabindex:"-1"},[a("目录的实现 "),s("a",{class:"header-anchor",href:"#目录的实现","aria-label":'Permalink to "目录的实现"'},"​")],-1),E=s("p",null,"有了文件的描述，接下来我们来思考如何实现目录（Directory）。目录是特殊的文件，所以每个目录都有自己的 inode。目录是文件的集合，所以目录的内容中必须有所有其下文件的 inode 指针。",-1),C=s("p",null,"文件名也最好不要放到 inode 中，而是放到文件夹中。这样就可以灵活设置文件的别名，及实现一个文件同时在多个目录下。",-1),m=s("p",null,'如上图，/foo 和 /bar 两个目录中的 b.txt 和 c.txt 其实是一个文件，但是拥有不同的名称。这种形式我们称作"硬链接"，就是多个文件共享 inode。',-1),b=s("p",null,[a("硬链接有一个非常显著的特点，硬链接的双方是平等的。上面的程序我们用"),s("code",null,"ln"),a("指令为文件 a 创造了一个硬链接"),s("code",null,"b"),a("。如果我们创造完删除了 a，那么 b 也是可以正常工作的。如果要删除掉这个文件的 inode，必须 a,b 同时删除。这里你可以看出 a,b 是平等的。")],-1),y=s("p",null,"和硬链接相对的是软链接，软链接的原理如下图：",-1),k=n("",9),x=n("",5),S=s("p",null,[a("上图这种设计可以让写入变得非常快速，多数时间都是写内存，最后写一次磁盘。"),s("strong",null,"而上图这样的设计成不成立，核心在能不能解决容灾问题"),a("。")],-1),D=s("p",null,[a("你可以思考一下这个问题------"),s("strong",null,"丢失一批日志和丢失一批数据的差别大不大"),a("。其实它们之间最大的差别在于，如果丢失一批日志，只不过丢失了近期的变更；但如果丢失一批数据，那么就可能造成永久伤害。")],-1),P=s("p",null,"举个例子，比如说你把最近一天的订单数据弄乱了，你可以通过第三方支付平台的交易流水、系统的支付记录等帮助用户恢复数据，还可以通过订单关联的用户信息查询具体是哪些用户的订单出了问题。但是如果你随机删了一部分订单， 那问题就麻烦了。你要去第三发支付平台调出所有流水，用大数据引擎进行分析和计算。",-1),v=s("p",null,"为了进一步避免损失，一种可行的方案就是创建还原点（Checkpoint），比如说系统把最近 30s 的日志都写入一个区域中。下一个 30s 的日志，写入下一个区域中。每个区域，我们称作一个还原点。创建还原点的时候，我们将还原点涂成红色，写入完成将还原点涂成绿色。",-1),N=n("",10);function f(B,V,q,I,M,L){const t=l("Image");return p(),i("div",null,[_,o(t,{alt:"Lark20201225-174103.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ls_aAEer_AADHBXF7EHw534.png"}),r,o(t,{alt:"Lark20201225-174106.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltAKAZe8tAACczq1tAiY181.png"}),d,A,g,h,o(t,{alt:"Lark20201225-174108.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltBCAP9AZAAC1vcuIPkE631.png"}),T,F,u,E,o(t,{alt:"Lark20201225-174111.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ltBqAG_agAAB0qsKok0o713.png"}),C,o(t,{alt:"Lark20201225-174114.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ltCKAQ8wsAACxv79iv44798.png"}),m,o(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ltCmANmxDAAEX0KEBlYU772.png"}),b,y,o(t,{alt:"Lark20201225-174117.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltDGAXzaKAADF0IcW0HA765.png"}),k,o(t,{alt:"Lark20201225-174119.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltEeASFyHAAD52tSCqME475.png"}),x,o(t,{alt:"Lark20201225-174123.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ltD-ANGHYAAD43z0foHQ229.png"}),S,D,P,v,o(t,{alt:"Lark20201225-174058.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltFyACwCsAADstiN6HAk886.png"}),N])}const w=e(c,[["render",f]]);export{K as __pageData,w as default};
