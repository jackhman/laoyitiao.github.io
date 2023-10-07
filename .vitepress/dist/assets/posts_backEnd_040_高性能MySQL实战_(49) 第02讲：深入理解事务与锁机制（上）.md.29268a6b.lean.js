import{_ as i,j as n,o as s,g as p,k as t,h as l,Q as o,s as a}from"./chunks/framework.4e7d56ce.js";const j=JSON.parse('{"title":"第02讲：深入理解事务与锁机制（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(49) 第02讲：深入理解事务与锁机制（上）.md","filePath":"posts/backEnd/040_高性能MySQL实战/(49) 第02讲：深入理解事务与锁机制（上）.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/040_高性能MySQL实战/(49) 第02讲：深入理解事务与锁机制（上）.md"},r=o("",7),h=o("",27),d=o("",11),c=o("",13),u=a("ul",null,[a("li",null,[a("p",null,"隐含 ID（DB_ROW_ID），6 个字节，当由 InnoDB 自动产生聚集索引时，聚集索引包括这个 DB_ROW_ID 的值。")]),a("li",null,[a("p",null,"事务号（DB_TRX_ID），6 个字节，标记了最新更新这条行记录的 Transaction ID，每处理一个事务，其值自动 +1。")]),a("li",null,[a("p",null,"回滚指针（DB_ROLL_PT），7 个字节，指向当前记录项的 Rollback Segment 的 Undo log记录，通过这个指针才能查找之前版本的数据。")])],-1),A=a("p",null,"具体的更新过程，简单描述如下。",-1),g=a("br",null,null,-1),C=a("p",null,"首先，假如这条数据是刚 INSERT 的，可以认为 ID 为 1，其他两个字段为空。",-1),m=a("br",null,null,-1),R=a("p",null,"然后，当事务 1 更改该行的数据值时，会进行如下操作，如下图所示。",-1),b=a("ul",null,[a("li",null,[a("p",null,"用排他锁锁定该行；记录 Redo log；")]),a("li",null,[a("p",null,"把该行修改前的值复制到 Undo log，即图中下面的行；")]),a("li",null,[a("p",null,"修改当前行的值，填写事务编号，使回滚指针指向 Undo log 中修改前的行。")])],-1),q=a("p",null,"接下来，与事务 1 相同，此时 Undo log 中有两行记录，并且通过回滚指针连在一起。因此，如果 Undo log 一直不删除，则会通过当前记录的回滚指针回溯到该行创建时的初始内容，所幸的是在 InnoDB 中存在 purge 线程，它会查询那些比现在最老的活动事务还早的 Undo log，并删除它们，从而保证 Undo log 文件不会无限增长，如下图所示。",-1),P=o("",11),T=a("p",null,'这里举例说明"脏读"和"不可重复读"的问题。',-1),f=a("p",null,'MySQL 中默认的事务隔离级别是 RR，这里设置成 RC 隔离级别，此时提交事务 B 修改 id=1 的数据之后，事务 A 进行同样的查询操作，后一次和前一次的查询结果不一样，这就是不可重复读（重新读取产生的结果不一样了）。这里事务 A 读到了事务 B 提交的数据，即是"脏读"。',-1),M=a("br",null,null,-1),S=a("p",null,"上文讲解了不可重复读的情况，下面我们来看看在RR隔离级别下的情况。当 teacher_id=1时，事务 A 先进行一次读取操作，事务 B 中间修改了 id=1 的数据并提交，事务 C 也插入了一条数据并提交。事务 A 第二次读到的数据和第一次完全相同。所以说它是可重读的。",-1),V=a("br",null,null,-1),D=a("p",null,'这里我们举个例子来说明"幻读"的问题。',-1),I=a("p",null,"行锁可以防止不同事务版本的数据在修改提交时造成数据冲突的情况。但如何避免别的事务插入数据造成的问题呢。我们先来看看在 RC 隔离级别下的处理过程。",-1),B=a("p",null,'如下图所示，事务 A 修改了所有 teacher_id=30 的数据，但是当事务 B INSERT 新数据后，事务 A 发现莫名其妙的多了一行 teacher_id=30 的数据， 而且没有被之前的 UPDATE语句所修改，这就是"当前读"的幻读问题。',-1),k=a("br",null,null,-1),L=a("p",null,"跟上面的例子一样，也是在 RC 事务隔离级别下，这时事务 B INSERT 了一条数据，并提交，而事务 A 读到了事务 B 新插入的数据。这也是幻读，如下图所示。",-1),E=a("p",null,"这里就需要重点注意不可重复读和幻读的区别了。前面讲了它们的含义，这个提醒大家的是：不可重复读重点在于 UPDATA 和 DELETE，而幻读的重点在于 INSERT。它们之间最大的区别是如何通过锁机制来解决它们产生的问题。这里说的锁只是使用悲观锁机制。",-1),x=a("p",null,"那么在 RR 隔离级别下，事务 A 在 UPDATE 后加锁，事务 B 无法插入新数据，这样事务 A在 UPDATE 前后读的数据保持一致，避免了幻读。",-1),N=a("p",null,'跟上面的案例一样，也是在 RR 事务隔离级别下，事务 A 在 UPDATE 后加锁，对于其他两个事务，事务 B 和事务 C 的 INSERT 操作，就必须等事务 A 提交后，才能继续执行。这里就用到了"锁"，这里使用的是 Gap 锁，后面会详细讲解。它和上面的情况一样，解决了"幻读"的发生，如下图所示。',-1),U=a("p",null,"由于本节内容较多，我们分为两课时进行讲解。",-1);function O(Q,y,W,G,v,w){const e=n("Image");return s(),p("div",null,[r,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/54/CgotOV13asaAGkG3AAGU7xgZQTk307.png"}),l(),h,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/54/CgotOV13avWAGG8dAAGlPeHINis630.png"}),l(),d,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/54/CgotOV13avqANg0WAAJHh3fbzps116.png"}),l(),c,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/B3/CgpOIF4Ns9CASh0LAABZEwLRCys494.png"}),l(),u,A,g,C,m,R,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/B3/Cgq2xl4Ns9uAWYTGAAA8qN_9JCg622.png"}),l(),b,q,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/B3/CgpOIF4Ns-eAZE0dAABgXw6BnOw333.png"}),l(),P,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13I8KAHCFwAABQYjH_j24097.png"}),l(),T,f,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F3/CgotOV13I8KAG0hZAADjWVHNGZY171.png"}),l(),M,S,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13I8KAAY1KAAErLSCjobQ181.png"}),l(),V,D,I,B,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F3/CgotOV13I8OAKu78AADW3KHb-bM841.png"}),l(),k,L,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13I8OAYV21AADW_X25kQc388.png"}),l(),E,x,N,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F3/CgotOV13I8OAZf5aAADjeBDM6PE103.png"}),l(),U])}const H=i(_,[["render",O]]);export{j as __pageData,H as default};
