import{_ as n,D as p,o as r,g as i,J as l,h as a,Q as o,m as e}from"./chunks/framework.f67d7268.js";const V=JSON.parse('{"title":"32HDFS介绍：分布式文件系统是怎么回事？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4642) 32  HDFS 介绍：分布式文件系统是怎么回事？.md","filePath":"posts/backEnd/重学操作系统_文档/(4642) 32  HDFS 介绍：分布式文件系统是怎么回事？.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/重学操作系统_文档/(4642) 32  HDFS 介绍：分布式文件系统是怎么回事？.md"},h=o("",15),_=o("",16),u=e("p",null,"如上图所示：每个分片中含有一部分的行，视情况而定。分片（Tablet），可以作为数据分布的最小单位。分片内部可以考虑图上的行存储，也可以考虑内部是一个 B+ 树组织的列存储。",-1),c=e("p",null,"为了实现分布式存储，每个分片可以对应一个分布式文件系统中的文件。假设这个分布式文件系统接入了 Linux 的虚拟文件系统，使用和操作会同 Linux 本地文件并无二致。其实不一定会这样实现，这只是一个可行的方案。",-1),d=e("p",null,"为了存储安全，一个分片最少应该有 2 个副本，也就是 3 份数据。3 份数据在其中一份数据不一致后，可以对比其他两份的结果修正数据。这 3 份数据，我们不考虑跨数据中心。因为跨地域成本太高，吞吐量不好保证，假设它们还在同一地域的机房内，只不过在不同的机器、磁盘上。",-1),C=e("h3",{id:"块-chunk-的抽象",tabindex:"-1"},[a("块（Chunk）的抽象 "),e("a",{class:"header-anchor",href:"#块-chunk-的抽象","aria-label":'Permalink to "块（Chunk）的抽象"'},"​")],-1),k=e("p",null,"比分片更小的单位是块（Chunk），这个单词和磁盘的块（Block）区分开。Chunk 是一个比 Block 更大的单位。Google File System 把数据分成了一个个 Chunk，然后每个 Chunk 会对应具体的磁盘块（Block）。",-1),g=e("p",null,"如下图，Table 是最顶层的结构，它里面含有许多分片（Tablets）。从数据库层面来看，每个分片是一个文件。数据库引擎维护到这个层面即可，至于这个文件如何在分布式系统中工作，就交给底层的文件系统------比如 Google File System 或者 Hadoop Distributed File System。",-1),S=e("p",null,"分布式文件系统通常会在磁盘的 Block 上再抽象一层 Chunk。一个 Chunk 通常比 Block 大很多，比如 Google File System 是 64KB，而通常磁盘的 Block 大小是 4K；HDFS 则是 128MB。这样的设计是为了减少 I/O 操作的频率，分块太小 I/O 频率就会上升，分块大 I/O 频率就减小。 比如一个 Google 的爬虫积攒了足够多的数据再提交到 GFS 中，就比爬虫频繁提交节省网络资源。",-1),m=e("h3",{id:"分布式文件的管理",tabindex:"-1"},[a("分布式文件的管理 "),e("a",{class:"header-anchor",href:"#分布式文件的管理","aria-label":'Permalink to "分布式文件的管理"'},"​")],-1),b=e("p",null,"接下来，我们来讨论一个完整的分布式系统设计。和单机文件系统一样，一个文件必须知道自己的数据（Chunk）存放在哪里。下图展示了一种最简单的设计，文件中包含了许多 Chunk 的 ID，然后每个 ChunkID 可以从 Chunk 的元数据中找到 Chunk 对应的位置。",-1),T=e("p",null,"如果 Chunk 比较大，比如说 HDFS 中 Chunk 有 128MB，那么 1PB 的数据需要 8,388,608 个条目。如果每个条目用 64bit 描述，也就是 8 个字节，只需要 64M 就可以描述清楚。考虑到一个 Chunk 必然会有冗余存储，也就是多个位置，实际会比 64M 多几倍，但也不会非常大了。",-1),A=e("p",null,"因此像 HDFS 和 GFS 等，为了简化设计会把所有文件目录结构信息，加上 Chunk 的信息，保存在一个单点上，通常称为 Master 节点。",-1),F=e("p",null,[a("下图中，客户端想要读取"),e("code",null,"/foo/bar"),a("中某个 Chunk 中某段内容（Byterange）的数据，会分成 4 个步骤：")],-1),B=e("ol",null,[e("li",null,[e("p",null,"客户端向 Master 发送请求，将想访问的文B件名、Chunk 的序号（可以通过 Chunk 大小和内容位置计算）；")]),e("li",null,[e("p",null,"Master 响应请求，返回 Chunk 的地址和 Chunk 的句柄（ID）；")]),e("li",null,[e("p",null,"客户端向 Chunk 所在的地址（一台 ChunkServer）发送请求，并将句柄（ID）和内容范围（Byterange）作为参数；")]),e("li",null,[e("p",null,"ChunkServer 将数据返回给客户端。")])],-1),D=o("",8),G=o("",16);function M(v,L,P,y,f,q){const t=p("Image");return r(),i("div",null,[h,l(t,{alt:"Lark20210101-204013.png",src:"https://s0.lgstatic.com/i/image2/M01/04/62/Cip5yF_vGG6AJ1xDAAC7-lhEiss613.png"}),a(),_,l(t,{alt:"Lark20210101-204000.png",src:"https://s0.lgstatic.com/i/image/M00/8C/81/Ciqc1F_vGISACSHvAADSDqVVRVA843.png"}),a(),u,c,d,l(t,{alt:"Lark20210101-204003.png",src:"https://s0.lgstatic.com/i/image/M00/8C/8C/CgqCHl_vGIyAfLpIAAFm-x3dyxw509.png"}),a(),C,k,g,l(t,{alt:"Lark20210101-204006.png",src:"https://s0.lgstatic.com/i/image/M00/8C/8C/CgqCHl_vGJiAVxgcAAEjt38fJYI284.png"}),a(),S,m,b,l(t,{alt:"Lark20210101-204414.png",src:"https://s0.lgstatic.com/i/image2/M01/04/64/CgpVE1_vGSaAOvq7AACExCrj12U682.png"}),a(),T,A,l(t,{alt:"Lark20210101-204008.png",src:"https://s0.lgstatic.com/i/image/M00/8C/8C/CgqCHl_vGPiABpLOAAKq3EbZ3XQ571.png"}),a(),F,B,l(t,{alt:"Lark20210101-204011.png",src:"https://s0.lgstatic.com/i/image/M00/8C/81/Ciqc1F_vGQGAFWGDAAKs3c4PcVw331.png"}),a(),D,l(t,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/65/CgpVE1_vNRyABrfXAAC_9WDSitU641.png"}),a(),G])}const x=n(s,[["render",M]]);export{V as __pageData,x as default};
