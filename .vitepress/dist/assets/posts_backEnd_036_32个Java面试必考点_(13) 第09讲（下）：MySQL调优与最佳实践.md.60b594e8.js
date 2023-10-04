import{_ as p,j as t,o,g as n,k as i,s as l,h as r,Q as e}from"./chunks/framework.e0c66c3f.js";const P=JSON.parse('{"title":"详解 MySQL ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(13) 第09讲（下）：MySQL调优与最佳实践.md","filePath":"posts/backEnd/036_32个Java面试必考点/(13) 第09讲（下）：MySQL调优与最佳实践.md","lastUpdated":1696338709000}'),s={name:"posts/backEnd/036_32个Java面试必考点/(13) 第09讲（下）：MySQL调优与最佳实践.md"},h=l("h6",{id:"详解-mysql",tabindex:"-1"},[r("详解 MySQL "),l("a",{class:"header-anchor",href:"#详解-mysql","aria-label":'Permalink to "详解 MySQL"'},"​")],-1),_=l("p",null,"下面来学习互联网行业使用最为广泛的关系型数据库 MySQL，它的知识点结构图如下所示。",-1),c=l("br",null,null,-1),d=e('<h6 id="常用-sql-语句" tabindex="-1">常用 SQL 语句 <a class="header-anchor" href="#常用-sql-语句" aria-label="Permalink to &quot;常用 SQL 语句&quot;">​</a></h6><p>对于手写常用 SQL 语句，没有什么特殊的技巧，根据所列的语句类型多做一些练习就好。</p><h6 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h6><p>要知道 MySQL 都提供哪些基本的数据类型，不同数据类型占用的空间大小。可以按给出的分类进行记忆，不一一罗列。</p><h6 id="引擎" tabindex="-1">引擎 <a class="header-anchor" href="#引擎" aria-label="Permalink to &quot;引擎&quot;">​</a></h6><p>介绍 MySQL 中主要的存储引擎。</p><ul><li><p>MyISAM 是 MySQL 官方提供的存储引擎，其特点是支持全文索引，查询效率比较高，缺点是不支持事务、使用表级锁。</p></li><li><p>InnoDB 在 5.5 版本后成为了 MySQL 的默认存储引擎，特点是支持 ACID 事务、支持外键、支持行级锁提高了并发效率。</p></li><li><p>TokuDB 是第三方开发的开源存储引擎，有非常快的写速度，支持数据的压缩存储、可以在线添加索引而不影响读写操作。但是因为压缩的原因，TokuDB 非常适合访问频率不高的数据或历史数据归档，不适合大量读取的场景。</p></li></ul><h6 id="锁" tabindex="-1">锁 <a class="header-anchor" href="#锁" aria-label="Permalink to &quot;锁&quot;">​</a></h6><p>MySQL 中的锁，上面也提到了，MyIASAM 使用表级锁，InnoDB 使用行级锁。</p><ul><li><p>表锁开销小，加锁快，不会出现死锁；但是锁的粒度大，发生锁冲突的概率高，并发访问效率比较低。</p></li><li><p>行级锁开销大，加锁慢，有可能会出现死锁，不过因为锁定粒度最小，发生锁冲突的概率低，并发访问效率比较高。</p></li><li><p>共享锁也就是读锁，其他事务可以读，但不能写。MySQL 可以通过 lock in share mode 语句显示使用共享锁。</p></li><li><p>排他锁就是写锁，其他事务不能读取，也不能写。对于 UPDATE、DELETE 和 INSERT 语句，InnoDB 会自动给涉及的数据集加排他锁，或者使用 select for update 显示使用排他锁。</p></li></ul><h6 id="存储过程与函数" tabindex="-1">存储过程与函数 <a class="header-anchor" href="#存储过程与函数" aria-label="Permalink to &quot;存储过程与函数&quot;">​</a></h6><p>MySQL 的存储过程与函数都可以避免开发人员重复编写相同的 SQL 语句，并且存储过程和函数都是在 MySQL 服务器中执行的，可以减少客户端和服务器端的数据传输。</p><p>存储过程能够实现更复杂的功能，而函数一般用来实现针对性比较强的功能，例如特殊策略求和等。存储过程可以执行包括修改表等一系列数据库操作，而用户定义函数不能用于执行修改全局数据库状态的操作。</p><p>存储过程一般是作为一个独立的部分来执行，而函数可以作为查询语句的一个部分来调用。SQL 语句中不能使用存储过程，但可以使用函数。存储过程一般与数据库实现绑定，使用存储过程会降低程序的可移植性，应谨慎使用。</p><h6 id="新特性" tabindex="-1">新特性 <a class="header-anchor" href="#新特性" aria-label="Permalink to &quot;新特性&quot;">​</a></h6><p>此外，可以去了解 MySQL8.0 的一些新特性，例如：</p><ul><li><p>默认字符集格式改为了 UTF-8；</p></li><li><p>增加了隐藏索引的功能，隐藏后的索引不会被查询优化器使用，可以使用这个特性用于性能调试；</p></li><li><p>支持了通用表表达式，使复杂查询中的嵌入表语句更加清晰；</p></li><li><p>新增了窗口函数的概念，可以用来实现新的查询方式。</p></li></ul><br><p>其中，窗口函数与 SUM、COUNT 等集合函数类似，但不会将多行查询结果合并，而是将结果放在多行中，即窗口函数不需要 GROUP BY。</p><h6 id="索引" tabindex="-1">索引 <a class="header-anchor" href="#索引" aria-label="Permalink to &quot;索引&quot;">​</a></h6><p>来看 MySQL 的索引，索引可以大幅增加数据库的查询的性能，在实际业务场景中，或多或少都会使用到。但是索引也是有代价的，首先需要额外的磁盘空间来保存索引；其次，对于插入、更新、删除等操作由于更新索引会增加额外的开销，因此索引比较适合用在读多写少的场景。</p><p>首先学习 MySQL 索引类型。</p><ul><li><p>唯一索引，就是索引列中的值必须是唯一的，但是允许出现空值。这种索引一般用来保证数据的唯一性，比如保存账户信息的表，每个账户的 ID 必须保证唯一，如果重复插入相同的账户 ID 时 MySQL 返回异常。</p></li><li><p>主键索引是一种特殊的唯一索引，但是它不允许出现空值。</p></li><li><p>普通索引，与唯一索引不同，它允许索引列中存在相同的值。例如学生的成绩表，各个学科的分数是允许重复的，就可以使用普通索引。</p></li><li><p>联合索引，就是由多个列共同组成的索引。一个表中含有多个单列的索引并不是联合索引，联合索引是对多个列字段按顺序共同组成一个索引。应用联合索引时需要注意最左原则，就是 where 查询条件中的字段必须与索引字段从左到右进行匹配。比如，一个用户信息表，用姓名和年龄组成了联合索引，如果查询条件是&quot;姓名等于张三&quot;，那么满足最左原则；如果查询条件是&quot;年龄大于 20&quot;，由于索引中最左的字段是姓名不是年龄，所以不能使用这个索引。</p></li><li><p>全文索引，前面提到了，MyISAM 引擎中实现了这个索引，在 5.6 版本后 InnoDB 引擎也支持了全文索引，并且在 5.7.6 版本后支持了中文索引。全文索引只能在 CHAR、VARCHAR、TEXT 类型字段上使用，底层使用倒排索引实现。要注意对于大数据量的表，生成全文索引会非常消耗时间也非常消耗磁盘空间。</p></li></ul><p>然后来看索引的实现。</p><p>B+ 树实现，B+ 树比较适合用作 &gt; 或 &lt; 这样的范围查询，是 MySQL 中最常使用的一种索引实现。</p><p>R-Tree 是一种用于处理多维数据的数据结构，可以对地理数据进行空间索引。不过实际业务场景中使用的比较少。</p><p>Hash 是使用散列表来对数据进行索引，Hash 方式不像 B-Tree 那样需要多次查询才能定位到记录，因此 Hash 索引的效率高于 B-Tree，但是不支持范围查找和排序等功能。实际使用的也比较少。</p><p>FullText 就是前面提到的全文索引，是一种记录关键字与对应文档关系的倒排索引。</p><h6 id="调优" tabindex="-1">调优 <a class="header-anchor" href="#调优" aria-label="Permalink to &quot;调优&quot;">​</a></h6><p>MySQL 的调优也是研发人员需要掌握的一项技能，一般 MySQL 调优有如下图所示的四个纬度。</p><br>',31),u=e("<ul><li><p>第一个纬度是针对数据库设计、表结构设计以及索引设置纬度进行的优化；</p></li><li><p>第二个纬度是对我们业务中使用的 SQL 语句进行优化，例如调整 where 查询条件；</p></li><li><p>第三个纬度是对 MySQL 服务的配置进行优化，例如对链接数的管理，对索引缓存、查询缓存、排序缓存等各种缓存大小进行优化；</p></li><li><p>第四个纬度是对硬件设备和操作系统设置进行优化，例如调整操作系统参数、禁用 swap、增加内存、升级固态硬盘等等。</p></li></ul><br><p>这四个纬度从优化的成本角度来讲，从左到右优化成本逐渐升高；从优化效果角度来看，从右到左优化的效果更高。</p><p>对于研发人员来说，前两个纬度与业务息息相关，因此需要重点掌握，后两个纬度更适合 DBA 进行深入学习，简单了解就好。</p><p>那么，重点来看前两个纬度，要点如下图所示。</p><br>",6),S=e('<p>先看到图中左边的模块，关于表结构和索引的优化，应该掌握如下原则。</p><br><ol><li><p>要在设计表结构时，考虑数据库的水平与垂直扩展能力，提前规划好未来1年的数据量、读写量的增长，规划好分库分表方案。比如设计用户信息表，预计 1 年后用户数据 10亿 条，写 QPS 约 5000，读 QPS 30000，可以设计按 UID 纬度进行散列，分为 4 个库每个库 32 张表，单表数据量控制在 KW 级别。</p></li><li><p>要为字段选择合适的数据类型，在保留扩展能力的前提下，优先选用较小的数据结构。例如保存年龄的字段，要使用 TINYINT 而不要使用 INT。</p></li><li><p>可以将字段多的表分解成多个表，必要时增加中间表进行关联。假如一张表有 40～50 个字段显然不是一个好的设计。</p></li><li><p>一般来说，设计关系数据库时需要满足第三范式，但为了满足第三范式，我们可能会拆分出多张表。而在进行查询时需要对多张表进行关联查询，有时为了提高查询效率，会降低范式的要求，在表中保存一定的冗余信息，也叫做反范式。但要注意反范式一定要适度。</p></li><li><p>要擅用索引，比如为经常作为查询条件的字段创建索引、创建联合索引时要根据最左原则考虑索引的复用能力，不要重复创建索引；要为保证数据不能重复的字段创建唯一索引等等。不过要注意索引对插入、更新等写操作是有代价的，不要滥用索引，比如像性别这样唯一很差的字段就不适合建立索引。</p></li><li><p>列字段尽量设置为 not null。MySQL 难以对使用 null 的列进行查询优化，允许 null 会使索引、索引统计和值更加复杂，允许 null 值的列需要更多的存储空间，还需要 MySQL 内部进行特殊处理。</p><p>再看到如图右边所示的模块，对 SQL 语句进行优化的原则。</p></li><li><p>要找到最需要优化的 SQL 语句。要么是使用最频繁的语句，要么是优化后提高最明显的语句，可以通过查询 MySQL 的慢查询日志来发现需要进行优化的 SQL 语句；</p></li><li><p>要学会利用 MySQL 提供的分析工具。例如使用 Explain 来分析语句的执行计划，看看是否使用了索引，使用了哪个索引，扫描了多少记录，是否使用文件排序等等。或者利用 Profile 命令来分析某个语句执行过程中各个分步的耗时。</p></li><li><p>要注意使用查询语句是要避免使用 SELECT *，而是应该指定具体需要获取的字段。原因一是可以避免查询出不需要使用的字段，二是可以避免查询列字段的元信息。</p></li><li><p>是尽量使用 prepared statements，一个是它性能更好，另一个是可以防止 SQL 注入。</p></li><li><p>是尽量使用索引扫描来进行排序，也就是尽量在有索引的字段上进行排序操作。</p></li></ol><h6 id="考察点与加分项" tabindex="-1">考察点与加分项 <a class="header-anchor" href="#考察点与加分项" aria-label="Permalink to &quot;考察点与加分项&quot;">​</a></h6><h6 id="考察点" tabindex="-1">考察点 <a class="header-anchor" href="#考察点" aria-label="Permalink to &quot;考察点&quot;">​</a></h6><p>来看这一课的面试考察点。</p><ol><li><p>必须了解消息队列、数据库的基本原理、使用场景以及常用队列、数据库的特点。比如消息队列适用于异步处理和削峰填谷的场景；Kafka 在提供高可用性的前提下实现了 0 消息丢失的高性能分布式队列服务；MySQL 提供了多种引擎可以支持事务型与非事务型的关系对象库服务等等。</p></li><li><p>要了解 Kafka 的架构和消息处理流程，明白 Kafka 是如何通过 Partition 来保证并发能力与冗余灾备的；了解消费组是如何保证每个 Consumer 实例不会获取到重复消息的。</p></li><li><p>要深刻理解数据库事务的 ACID 特性，了解并发事务可能导致的并发问题和不同的数据库隔离级别如何解决这些并发问题。</p></li><li><p>要牢牢掌握常用的 MySQL 语句，比如 WHERE 条件查询语句、JOIN 关联语句、ORDER BY 排序语句等等。还要熟悉常用的自带函数，例如 SUM、COUNT 等等。</p></li><li><p>了解 MySQL 数据库不同引擎的特点及不同类型的索引实现。比如知道最常使用的 InnoDB 非常擅长事务处理，MyISAM 比较适合非事务的简单查询场景。比如知道 MySQL 的唯一索引、联合索引、全文索引等不同索引类型，以及最常使用等 B+ 树索引实现等等。</p></li></ol><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>如果想要在面试中获得更好的表现，还应该了解下面这些加分项。</p><ol><li><p>要了解新特性，不论是 Kafka 还是 MySQL，都要了解一下新版本特性。例如 MySQL8.0 中提供了窗口函数来支持新的查询方式；支持通用表表达式，使复杂查询中的嵌入表语句更加清晰等等。</p></li><li><p>要知道数据库表设计原则，如果有过线上业务数据库的设计经验就更好了，就能够知道如何对容量进行评估，也知道适当分库分表来保证未来服务的可扩展性，这会对面试起到积极的影响。</p></li><li><p>最好有过数据库调优经验，例如明明建立了索引的语句，但是查询效率还是很慢，通过 Explain 分析发现表中有多个索引，MySQL 的优化器选用了错误的索引，导致查询效率偏低，然后通过在 SQL 语句中使用 use index 来指定索引解决。</p></li><li><p>有过 Kafka 等主流消息队列使用经验，并且知道应该如何在业务场景下进行调优。例如日志推送的场景，对小概率消息丢失可以容忍，可以设置异步发送消息。而对应金融类业务，需要设置同步发送消息，并设置最高的消息可靠性，把 request.required.acks 参数设置为 -1。</p></li></ol><h6 id="真题汇总" tabindex="-1">真题汇总 <a class="header-anchor" href="#真题汇总" aria-label="Permalink to &quot;真题汇总&quot;">​</a></h6><p>最后将面试真题汇总如下。</p>',12),L=l("ul",null,[l("li",null,[l("p",null,"第 2 题，可以从消息的发送者保证投递到消息队列、消息对象自身的高可用、消费方处理完成后修改 offset 这三个方面来保证消息的可靠性。这个题目可以结合 Kafka 的消息发送同步、异步，消息可靠性配置来回答。")]),l("li",null,[l("p",null,"第 3 题可以从两个方面解决消息重复：一个是通过对消息处理实现幂等，消除消息重复的影响；另一个是使用 Redis 来进行消息去重，避免重复消息的处理。")]),l("li",null,[l("p",null,"第 4 题可以从创建索引、减少关联查询、优化 SQL 查询条件等方面展开。")]),l("li",null,[l("p",null,"第 6 题可以从 MySQL 调优部分讲解的相关原则这个角度来回答。")])],-1),M=l("br",null,null,-1),Q=l("p",null,"下一课时将会学习系统架构与项目案例详解的相关内容。",-1),y=l("br",null,null,-1);function m(b,A,T,q,f,k){const a=t("Image");return o(),n("div",null,[h,_,c,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EF/CgotOV14tcCAAj4qAAG5pZSsGg0126.png"}),d,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CF/CgoB5l14tcCAW4TEAAA4gPziGLI076.png"}),u,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EF/CgotOV14tcCADvHvAAC0X6SqEbk666.png"}),S,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CF/CgoB5l14tcGASkb-AABwwI5lamM754.png"}),L,M,Q,y])}const C=p(s,[["render",m]]);export{P as __pageData,C as default};
