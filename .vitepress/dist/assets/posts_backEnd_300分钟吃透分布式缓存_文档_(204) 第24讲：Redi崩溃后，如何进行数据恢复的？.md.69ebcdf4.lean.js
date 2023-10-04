import{_ as l,j as a,o,g as n,k as t,s as e,Q as i,h as _}from"./chunks/framework.e0c66c3f.js";const q=JSON.parse('{"title":"RDB ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(204) 第24讲：Redi崩溃后，如何进行数据恢复的？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(204) 第24讲：Redi崩溃后，如何进行数据恢复的？.md","lastUpdated":1696338709000}'),d={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(204) 第24讲：Redi崩溃后，如何进行数据恢复的？.md"},p=e("p",null,'你好，我是你的缓存课老师陈波，欢迎来到第 24 课时"Redis 崩溃后，如何进行数据恢复"的学习。本课时我们主要学习通过 RDB、AOF、混合存储等数据持久化方案来解决如何进行数据恢复的问题。',-1),c=i("",6),r=i("",8),A=e("p",null,"Redis 的 AOF 持久化是以命令追加的方式进行数据落地的。通过打开 appendonly 配置，Redis 将每一个写指令追加到磁盘 AOF 文件，从而及时记录内存数据的最新状态。这样即便 Redis 被 crash 或异常关闭后，再次启动，也可以通过加载 AOF，来恢复最新的全量数据，基本不会丢失数据。",-1),R=e("br",null,null,-1),D=e("p",null,"AOF 文件中存储的协议是写指令的 multibulk 格式，这是 Redis 的标准协议格式，所以不同的 Redis 版本均可解析并处理，兼容性很好。",-1),h=e("br",null,null,-1),B=e("p",null,"但是，由于 Redis 会记录所有写指令操作到 AOF，大量的中间状态数据，甚至被删除的过期数据，都会存在 AOF 中，冗余度很大，而且每条指令还需通过加载和执行来进行数据恢复，耗时会比较大。",-1),O=e("p",null,"AOF 数据的落地流程如下。Redis 在处理完写指令后，首先将写指令写入 AOF 缓冲，然后通过 server_cron 定期将 AOF 缓冲写入文件缓冲。最后按照配置策略进行 fsync，将文件缓冲的数据真正同步写入磁盘。",-1),u=e("p",null,"Redis 通过 appendfsync 来设置三种不同的同步文件缓冲策略。",-1),g=e("ol",null,[e("li",null,[e("p",null,"第一种配置策略是 no，即 Redis 不主动使用 fsync 进行文件数据同步落地，而是由操作系统的 write 函数去确认同步时间，在 Linux 系统中大概每 30 秒会进行一次同步，如果 Redis 发生 crash，就会造成大量的数据丢失。")]),e("li",null,[e("p",null,"第二种配置策略是 always，即每次将 AOF 缓冲写入文件，都会调用 fsync 强制将内核数据写入文件，安全性最高，但性能上会比较低效，而且由于频繁的 IO 读写，磁盘的寿命会大大降低。")]),e("li",null,[e("p",null,"第三种配置策略是 everysec。即每秒通过 BIO 线程进行一次 fsync。这种策略在安全性、性能，以及磁盘寿命之间做较好的权衡，可以较好的满足线上业务需要。")])],-1),F=e("p",null,"随着时间的推移，AOF 持续记录所有的写指令，AOF 会越来越大，而且会充斥大量的中间数据、过期数据，为了减少无效数据，提升恢复时间，可以定期对 AOF 进行 rewrite 操作。",-1),m=e("p",null,"AOF 的 rewrite 操作可以通过运维执行 bgrewiretaof 命令来进行，也可以通过配置重写策略进行，由 Redis 自动触发进行。当对 AOF 进行 rewrite 时，首先会 fork 一个子进程。子进程轮询所有 RedisDB 快照，将所有内存数据转为 cmd，并写入临时文件。在子进程 rewriteaof 时，主进程可以继续执行用户请求，执行完毕后将写指令写入旧的 AOF 文件和 rewrite 缓冲。子进程将 RedisDB 中数据落地完毕后，通知主进程。主进程从而将 AOF rewite 缓冲数据写入 AOF 临时文件，然后用新的 AOF 文件替换旧的 AOF 文件，最后通过 BIO 线程异步关闭旧的 AOF 文件。至此，AOF 的 rewrite 过程就全部完成了。",-1),b=e("p",null,"AOF 重写的过程，是一个轮询全部 RedisDB 快照，逐一落地的过程。每个 DB，首先通过 select $db 来记录待落的 DBID。然后通过命令记录每个 key/value。对于数据类型为 SDS 的value，可以直接落地。但如果 value 是聚合类型，则会将所有元素设为批量添加指令，进行落地。",-1),f=e("p",null,"对于 list 列表类型，通过 RPUSH 指令落地所有列表元素。对于 set 集合，会用 SADD 落地所有集合元素。对于 Zset 有序集合，会用 Zadd 落地所有元素，而对于 Hash 会用 Hmset 落地所有哈希元素。如果数据带过期时间，还会通过 pexpireat 来记录数据的过期时间。",-1),y=e("br",null,null,-1),k=e("p",null,"AOF 持久化的优势是可以记录全部的最新内存数据，最多也就是 1-2 秒的数据丢失。同时 AOF 通过 Redis 协议来追加记录数据，兼容性高，而且可以持续轻量级的保存最新数据。最后因为是直接通过 Redis 协议存储，可读性也比较好。",-1),v=e("p",null,"AOF 持久化的不足是随着时间的增加，冗余数据增多，文件会持续变大，而且数据恢复需要读取所有命令并执行，恢复速度相对较慢。",-1),w=e("h6",{id:"混合持久化",tabindex:"-1"},[_("混合持久化 "),e("a",{class:"header-anchor",href:"#混合持久化","aria-label":'Permalink to "混合持久化"'},"​")],-1),C=e("p",null,"Redis 在 4.0 版本之后，引入了混合持久化方式，而且在 5.0 版本后默认开启。前面讲到 RDB 加载速度快，但构建慢，缺少最新数据。AOF 持续追加最新写记录，可以包含所有数据，但冗余大，加载速度慢。混合模式一体化使用 RDB 和 AOF，综合 RDB 和 AOF 的好处。即可包含全量数据，加载速度也比较快。可以使用 aof-use-rdb-preamble 配置来明确打开混合持久化模式。",-1),E=e("p",null,"混合持久化也是通过 bgrewriteaof 来实现的。当启用混合存储后，进行 bgrewriteaof 时，主进程首先依然是 fork 一个子进程，子进程首先将内存数据以 RDB 的二进制格式写入 AOF 临时文件中。然后，再将落地期间缓冲的新增写指令，以命令的方式追加到临时文件。然后再通知主进程落地完毕。主进程将临时文件修改为 AOF 文件，并关闭旧的 AOF 文件。这样主体数据以 RDB 格式存储，新增指令以命令方式追加的混合存储方式进行持久化。后续执行的任务，以正常的命令方式追加到新的 AOF 文件即可。",-1),T=e("p",null,"混合持久化综合了 RDB 和 AOF 的优缺点，优势是包含全量数据，加载速度快。不足是头部的 RDB 格式兼容性和可读性较差。",-1),x=e("br",null,null,-1),S=e("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"Redis 是如何处理容易超时的系统调用的"，记得按时来听课哈。好，下节课见，拜拜！',-1);function H(I,P,V,N,U,L){const s=a("Image");return o(),n("div",null,[p,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/DD/CgoB5l3OHiKACmE3AABtGNZ4Oxg924.png"}),c,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/DD/CgoB5l3OHoKAXgL6AAAjAjYgyA8864.png"}),r,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/FD/CgotOV3OHqeAVsTXAABY_SjFvis172.png"}),A,R,D,h,B,O,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/FE/CgotOV3OHraAWHE5AABgPyypH_w746.png"}),u,g,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/DE/CgoB5l3OHsKAapDeAAB1wnxp50U447.png"}),F,m,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/FE/CgotOV3OHs2AQUstAAAyy17gNZE683.png"}),b,f,y,k,v,w,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A8/DE/CgoB5l3OHuaACLkEAAAwhhFbaIg661.png"}),C,E,T,x,S])}const $=l(d,[["render",H]]);export{q as __pageData,$ as default};
