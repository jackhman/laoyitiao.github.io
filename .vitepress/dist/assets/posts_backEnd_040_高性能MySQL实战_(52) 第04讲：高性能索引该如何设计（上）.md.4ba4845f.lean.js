import{_ as o,j as a,o as _,g as p,k as l,h as s,Q as n,s as e}from"./chunks/framework.4e7d56ce.js";const Be=JSON.parse('{"title":"索引设计和工作原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(52) 第04讲：高性能索引该如何设计（上）.md","filePath":"posts/backEnd/040_高性能MySQL实战/(52) 第04讲：高性能索引该如何设计（上）.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/040_高性能MySQL实战/(52) 第04讲：高性能索引该如何设计（上）.md"},i=n("",10),h=e("br",null,null,-1),c=e("p",null,"举个例子，有序数组 [1-71] 有 17 个值, 即在有序数组 [A0-A16] 中希望找到 Target(7)所在的位置，首选确定下标 L 为 0，下标 R 为 16，下标 m 为 floor [( L+R)/2]，即向下取整数。",-1),u=e("ol",null,[e("li",null,"第一次查询")],-1),d=e("p",null,"下标 L=0，R=16，m= floor[(0+16)/2]=8，获得 A8 的值为 14，因为 A8(14) >Target(7) 则设置 R=m-1=7，如下图所示。",-1),B=e("br",null,null,-1),T=e("br",null,null,-1),A=e("ol",{start:"2"},[e("li",null,"第二次查询")],-1),g=e("p",null,"下标 L=0，R=7，m=floor[(0+7)/2]=3，获得 A3 的值为 6，A3(6) < Target(7) 则设置下标 L=m+1=4，如下图所示。",-1),b=e("br",null,null,-1),m=e("br",null,null,-1),I=e("ol",{start:"3"},[e("li",null,"第三次查询")],-1),H=e("p",null,"下标 L=4，R=7，m=floor[(4+7)/2]=5，获得 A5 的值为 8，A5(8) > Target(7) 则设置下标 R=m-1=4，如下图所示。",-1),S=e("br",null,null,-1),M=e("br",null,null,-1),y=e("ol",{start:"4"},[e("li",null,"第四次查询")],-1),D=e("p",null,"下标 L=4，R=4，m=floor[(4+4)/2]=4，获得 A4 的值为 7，A4(7) = Target(7)，查询结束，如下图所示。",-1),L=e("br",null,null,-1),C=n("",10),k=e("br",null,null,-1),R=e("p",null,"接下来我们从哈希索引如何实现、Hash 碰撞处理、MySQL 如何使用 Hash，三个方面学习哈希索引。",-1),U=e("p",null,"首先讲解哈希索引是如何实现的？数据库中哈希索引是基于哈希表实现的，对于哈希索引列的数据通过 Hash 算法计算，得到对应索引列的哈希码形成哈希表，由哈希码及哈希码指向的真实数据行的指针组成了哈希索引。哈希索引的应用场景是只在对哈希索引列的等值查询才有效。",-1),V=e("p",null,"如下图所示，根据表中的 name 字段构建 Hash 索引，通过 Hash 算法对每一行 name 字段的数据进行计算，得出 Hash 码。由 Hash 码及 Hash 码指向真实数据行的指针组成了哈希索引。",-1),f=e("br",null,null,-1),N=e("br",null,null,-1),P=e("p",null,"因为哈希索引只存储哈希值和行指针，不存储实际字段值，所以其结构紧凑，查询速度也非常快，在无哈希冲突的场景下访问哈希索引一次即可命中。但是哈希索引只适用于等值查询，包括 =、IN()、<=> （安全等于， select null <=> null 和 select null=null 是不一样的结果) ，不支持范围查询。",-1),x=e("p",null,"另外，哈希索引的性能跟哈希冲突数量成反比，哈希冲突越多其维护代价越大性能越低。",-1),E=e("p",null,"接下来我们看看 Hash 碰撞如何处理？Hash 碰撞是指不同索引列值计算出相同的哈希码，如上图所示， 表中 name 字段为 John Smith 和 Sandra Dee 两个不同值根据 Hash 算法计算出来的哈希码都是 152，这就表示出现了 Hash 碰撞。 对于 Hash 碰撞通用的处理方法是使用链表，将 Hash 冲突碰撞的元素形成一个链表，发生冲突时在链表上进行二次遍历找到数据。",-1),Q=e("ul",null,[e("li",null,[e("p",null,"Hash 碰撞跟选择的 Hash 算法有关系，为了减少 Hash 碰撞的概率，优先选择避免 Hash 冲突的 Hash 算法，例如，使用 Percona Server 的函数 FNV64() ，其哈希值为 64 位，出现 Hash 冲突的概率要比 CRC32 小很多。")]),e("li",null,[e("p",null,"其次是考虑性能，优先选择数字类型的 Hash 算法，因为字符串类型的 Hash 算法不仅浪费空间而且不方便进行比较。")])],-1),q=e("p",null,"常见的 CRC32、SHA1 和 MD5 Hash 函数生成的返回值如下图所示。",-1),O=e("br",null,null,-1),v=e("br",null,null,-1),W=e("p",null,"综合建议 Hash 算法使用优先级为：FNV64 > CRC32 （大数据量下 Hash 冲突概率较大）> MD5 > SHA1。",-1),F=e("p",null,"最后再看看，MySQL 中如何使用 Hash 索引？在 MySQL 中主要是分为 Memory 存储引擎原生支持的 Hash 索引 、InnoDB 自适应哈希索引及 NDB 集群的哈希索引3类。",-1),J=e("br",null,null,-1),K=e("br",null,null,-1),w=e("br",null,null,-1),z=e("br",null,null,-1),$=e("p",null,"Memory 存储引擎原生支持的 Hash 索引，如上图所示，Memory 存储引擎创建表时即可原生显式创建并使用 Hash 索引。",-1),j=e("p",null,"相比 InnoDB，虽然不能原生显示创建 Hash 索引，但是可以伪造哈希索引来加速定值查询的性能。例如为超长文本（如网站 URL）进行 Hash 计算后的字段 url_hash 创建 B+Tree 索引，获得 Hash 索引的功能。",-1),G=e("p",null,"关于哈希索引，InnoDB 提供了 InnoDB 自适应哈希索引的强大功能，接下来重点描述 InnoDB 自适应哈希索引。",-1),Y=e("p",null,"InnoDB 自适应哈希索引是为了提升查询效率，InnoDB 存储引擎会监控表上各个索引页的查询，当 InnoDB 注意到某些索引值访问非常频繁时，会在内存中基于 B+Tree 索引再创建一个哈希索引，使得内存中的 B+Tree 索引具备哈希索引的功能，即能够快速定值访问频繁访问的索引页。",-1),X=e("p",null,"创建如下图所示源码。",-1),Z=e("br",null,null,-1),ee=n("",16),te=e("br",null,null,-1),le=e("p",null,"对于 MySQL 存储引擎而言，其实际使用的 B+Tree 索引是为了满足数据读写性能，以及适配磁盘访问模式优化后的数据结构，每一个叶子节点都包含指向下一个叶子节点的指针。",-1),ne=e("p",null,"在 MySQL 中，索引是在存储引擎层而非服务器层实现的，所以不同存储引擎层支持的索引类型可以不同。例如，虽然 MyISAM 和 InnoDB 的索引都是使用 B+Tree 实现的，但是其实际数据存储结构有不少差异。下图中 B+Tree 示例一共2层，图中每个页面都已经被随机编号（编号可以认定为页面号），其中页面号为 20 的页面是 B+Tree 的根页面（根页面通常是存放在内存中的），根页面存储了 <key+pageno>，pageno 是指向具体叶子节点的页面号。其他页面都是叶子节点，存放了具体的数据 <key+data>。",-1),se=e("br",null,null,-1),oe=n("",14),ae=n("",17);function _e(pe,re,ie,he,ce,ue){const t=a("Image");return _(),p("div",null,[i,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/94/CgotOV15tUuAPPo1AACR9TxFpuI655.png"}),h,c,u,d,B,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/75/CgoB5l15tUuALmObAAI1q0jOw0s899.png"}),T,A,g,b,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/94/CgotOV15tUuAOAOUAALmY4aceW0550.png"}),m,I,H,S,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/75/CgoB5l15tUuATnElAALxpJhp2Uc667.png"}),M,y,D,L,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/94/CgotOV15tUyAGJeNAAKfplVS_II867.png"}),C,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/75/CgoB5l15tUyAOz8dAAN8-NUNUH8546.png"}),k,R,U,V,f,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/94/CgotOV15tUyAWaHMAAUYl_Tp3qs421.png"}),N,P,x,E,Q,q,O,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/75/CgoB5l15tUyAIuNtAADRGkxiUa0069.png"}),s(),v,W,F,J,K,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/94/CgotOV15tUyAPcBkAAHM30XzlT0917.png"}),s(),w,z,$,j,G,Y,X,Z,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/75/CgoB5l15tU2Aef6bAABjVpVyPlw440.png"}),ee,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/95/CgotOV15tU2AKdbHAAA_6nca6r8976.png"}),te,le,ne,se,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/75/CgoB5l15tU2ASWk-AAH_3AUtsR8260.png"}),oe,l(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/95/CgotOV15tU2AN8JWAABDbQRYLlg029.png"}),ae])}const Te=o(r,[["render",_e]]);export{Be as __pageData,Te as default};
