import{_ as n,j as e,o as r,h as g,k as o,f as t,Q as i,s as a}from"./chunks/framework.d3daa342.js";const k=JSON.parse('{"title":"第20讲：什么是数据一致性与Saga模式","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1824) 第20讲：什么是数据一致性与 Saga 模式.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1824) 第20讲：什么是数据一致性与 Saga 模式.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1824) 第20讲：什么是数据一致性与 Saga 模式.md"},l=i('<h1 id="第20讲-什么是数据一致性与saga模式" tabindex="-1">第20讲：什么是数据一致性与Saga模式 <a class="header-anchor" href="#第20讲-什么是数据一致性与saga模式" aria-label="Permalink to &quot;第20讲：什么是数据一致性与Saga模式&quot;">​</a></h1><p>从本课时开始，我将开始介绍跨微服务的协作与查询，这一部分的内容主要涉及微服务之间的交互方式。由于每个微服务一般都各自独立存储数据，所以在不同微服务之间共享数据变得复杂。本课时将讲解微服务架构的应用中的数据一致性问题，以及 Saga 模式。</p><h3 id="数据一致性" tabindex="-1">数据一致性 <a class="header-anchor" href="#数据一致性" aria-label="Permalink to &quot;数据一致性&quot;">​</a></h3><p>数据一致性是软件开发中经常会遇到的问题，指的是相互关联的数据的值出现了不一致，破坏了业务逻辑中的不变量。数据一致性是一个很宽泛的话题，很多开发中的常见问题都可以归类为<strong>数据一致性的问题</strong> 。数据一致性的问题通常涉及多个动作，每个动作都会对一些数据进行修改，这些动作的整体才是对数据的完整修改，这几个动作在逻辑上组成了一个<strong>工作单元</strong>（Unit of Work）。我们需要保证的是同一工作单元中的全部动作在执行前后，业务逻辑中所规定的不变量不被破坏。</p><p>一个典型的问题是银行账户之间的转账。当从账户 A 转账一定金额到账户 B 时，在转账操作执行前后，这两个账户的余额总和应该保持不变，这就是转账这一业务逻辑的不变量。如果转账操作成功，那么账户 A 的余额会减去转账金额，同时账户 B 的余额会加上转账金额；如果转账失败，则两个账户的余额保持不变。这两种情况都保证了业务逻辑的不变量。如果转账金额从账户 A 中被扣掉，而账户 B 的余额没有增加，这就表示业务逻辑的不变量被破坏，也就是出现了数据一致性的问题。</p><p>数据一致性问题的一个典型场景是在数据库操作中，关系型数据库通过事务来解决一致性问题。</p><h3 id="数据库事务的-acid-特性" tabindex="-1">数据库事务的 ACID 特性 <a class="header-anchor" href="#数据库事务的-acid-特性" aria-label="Permalink to &quot;数据库事务的 ACID 特性&quot;">​</a></h3><p>数据一致性问题的一个解决办法是保证工作单元的原子性，也就是说，工作单元中的全部动作，要么全部发生，要么全部不发生。在关系式数据库管理系统中，事务用来作为多个语句执行时的单元。数据库事务满足 ACID 特性，ACID 是<strong>原子性</strong> （Atomicity）、<strong>一致性</strong> （Consistency）、<strong>隔离性</strong> （Isolation）和<strong>持久性</strong>（Durability）对应的英文单词首字母的缩写。</p><p>原子性指的是每个事务都被当成一个独立的单元，其中包含的语句要么全部成功，要么全部不执行。如果事务中的一个语句执行失败，整个事务会被回滚，不会对数据库产生影响。上面提到的银行账户之间转账的例子，如果对两个账户的操作都在一个事务中完成，那么事务的原子性可以保证业务逻辑中的不变量不被破坏。</p><p>一致性指的是事务只会把数据库从一个合法的状态带到另外一个合法的状态，并保持数据库的不变量。数据库的不变量与之前提到的业务逻辑的不变量并不相同。数据库的不变量指的是为了保证数据的完整性所定义的规则，包括约束、级联操作和触发器等。常用的规则包括，数据库表中的主键必须唯一，外键所引用的主键必须存在等。</p><p>隔离性与事务的并发执行有关。事务通常是并发执行的，也就是说，多个事务可能同时对同一个数据库表进行修改。隔离性要求多个事务在并发执行的结果，与这些事务按顺序执行所得到的结果是一样的。也就是说，每个事务都相当于在自己隔离的空间中运行，不受其他事务的影响。</p><p>持久性指的是一旦事务被提交，那么即便是系统崩溃，该事件仍然处于已提交状态。一般的做法是使用事务日志来记录已提交的事件，持久性保证了事务的执行结果不会受到系统崩溃的影响。</p><p>之前提到的数据一致性问题，如果使用数据库事务，就可以轻松解决。很多的编程语言和框架都支持数据库事务，声明式的事务更加简化了开发人员的工作。比如，在 Java 中，只需要在类或方法上添加 @Transactional 注解，就可以启用事务。如果相关的操作涉及多个数据库，可以使用基于两阶段提交协议的 XA 事务。</p><p>在一个分布式系统中，事务并不总是可用的。在第 15 课时提到过，Apache Kafka 不支持 XA 事务，因此无法参与到关系型数据库的事务中来。即便是可以使用 XA 事务，其成本也是很高的。在分布式系统中，可以考虑的另外一种一致性模型是<strong>最终一致性</strong>。</p><h3 id="最终一致性的-base-特性" tabindex="-1">最终一致性的 BASE 特性 <a class="header-anchor" href="#最终一致性的-base-特性" aria-label="Permalink to &quot;最终一致性的 BASE 特性&quot;">​</a></h3><p>最终一致性（Eventual Consistency）指的是，对于一个数据项，如果没有对它做新的改动，那么所有对该数据项的访问最终都会返回最后一次更新的值。最终一致性所提供的特性是 BASE，即<strong>基本可用</strong> （Basically Available）、<strong>软状态</strong> （Soft State）和<strong>最终一致性</strong>（Eventual Consistency）的缩写。BASE 在化学上的含义是碱，刚好与 ACID 的含义酸相对应。</p><p>基本可用指的是基本的读取和写入操作是尽可能可用的，但是并不保证一致性。也就是说，读取操作不一定返回的是最近一次更新的值，写入操作只有在解决冲突之后才会被持久化。软状态指的是由于没有一致性的保证，在某个时间点上，我们只能对系统的状态有一个大致的认知。最终一致性的含义如上面所述，只需要等待足够长的时间，系统的状态就会最终恢复一致性。</p><p>最终一致性的目标是提高系统的可用性，这就要提到分布式系统中的 CAP 定理。CAP 定理指的是一个分布式数据存储最多只能提供<strong>一致性</strong> （Consistency）、<strong>可用性</strong> （Availability）和<strong>分区容错性</strong>（Partition Tolerance）这三个保证的两个保证。</p><p>这三个保证的内容分别是：</p><ul><li><strong>一致性</strong>，每次读取操作可以获取到最近一次写入的值，或者产生错误；</li><li><strong>可用性</strong>，每次请求总是可以得到一个正确的响应，尽管其中包含的不一定是最近一次写入的值；</li><li><strong>分区容错性</strong>，当由于节点之间的网络原因，造成系统内部的消息丢失时，系统仍然可以继续工作。</li></ul><p>由于分布式系统中的网络错误不可避免，分区容错性的保证是必须要有的。所以基于 CAP 定理，当出现网络分区时，就需要在一致性和可用性之间进行选择。一种做法是直接出错，这样保证了一致性，但是会降低可用性，因为不能再提供请求的响应；另外一种做法是返回系统已知的最近值，但是该值不一定是最新的，这样保证了可用性，但是丢失了一致性。</p><p>这里需要注意的是，CAP 定理并不是说永远只能在一致性、可用性和分区容错性这三者中选择两个。事实上，当网络没有问题时，一致性和可用性是可以兼顾的。一致性和可用性的取舍，只发生在网络出现问题时。</p><h3 id="微服务架构中的最终一致性" tabindex="-1">微服务架构中的最终一致性 <a class="header-anchor" href="#微服务架构中的最终一致性" aria-label="Permalink to &quot;微服务架构中的最终一致性&quot;">​</a></h3><p>微服务架构的本质是一个分布式系统，也同样也会遇到一致性的问题，这种一致性不仅体现在数据层面上，更多的是在业务逻辑上。在微服务架构的应用中，一个业务场景可能会由多个微服务来协作完成，所有参与的微服务的数据必须在业务逻辑上保持一致。比如，在一个外卖订餐系统中，当用户下单之后，订单服务需要进行记录，同时通知餐馆开始准备订单中的菜品，支付服务也需要进行扣款。如果扣款失败，那么订单的状态需要更新，餐馆也需要得到通知。当一个订单成功完成时，订单服务、餐馆服务和支付服务中关于这一订单的数据应该是匹配的。</p><p>在微服务架构的应用中，最终一致性是解决数据一致性问题的最现实方案。当业务流程横跨多个微服务时，完成一个业务流程的时间可能会比较长。如果从业务流程的生命周期全过程中的某个时间点来看，相关的数据可能处于不一致的状态。比如，一个外卖订单已经扣款成功，但是餐馆由于自身原因，暂时无法确认是否能提供全部菜品，在这个时间点上来说，用户完成了支付，但是对应的菜品处于未确定状态。如果餐馆无法提供菜品，而导致订单取消，在完成退款操作之前，用户付了钱，但可能没有得到任何菜品。如果等整个业务流程全部完成，那么系统的状态会恢复一致性。</p><p>在微服务架构中，描述业务流程，需要用到下面介绍的 Saga 模式。</p><h3 id="saga-模式" tabindex="-1">Saga 模式 <a class="header-anchor" href="#saga-模式" aria-label="Permalink to &quot;Saga 模式&quot;">​</a></h3><p>Saga 最早在 1987 年作为解决数据库系统中的长时间运行的事务的方案而出现，该模式通常又被称为<strong>长时间运行的事务</strong>（Long-Running Transaction）。一个长时间运行的事务，由多个小的本地事务组成，它避免了对非本地资源的锁定，并通过补偿机制来处理失败。长时间运行的事务并不具备数据库事务的全部 ACID 特性，但是组成它的本地事务具有 ACID 特性。如果某个本地事务出现错误，那么对于那些已提交的本地事务，会应用其对应的补偿机制来恢复状态。</p><p>以银行账户之间的转账操作为例，如果以 Saga 模式来实现，那么从源账户转出和转入到目标账户这两个操作都由本地事务来完成。假设从账户 A 转账 100 元到账户 B，如果从账户 A 的转出操作成功，而转入账户 B 的操作失败，那么会执行对应的补偿操作，也就是对账户 A 存入 100 元。这样就保证了数据的一致性。</p><p>虽然 Saga 模式起源于数据库系统，它非常适合于微服务架构，该模式用来保证业务事务（Business Transaction）的数据一致性。业务事务可能横跨多个微服务的边界，涉及不同类型的数据存储，还可能有人员的参与。这样的业务事务有自己的状态，而且可能耗时漫长，Saga 模式是实现业务事务的良好解决方案。</p><p>在应用 Saga 模式之后，每个微服务更新本地的数据库，并发布事件来推动业务事务往前发展。根据是否有协调者，Saga 分成<strong>编排型</strong> （Choreography）和<strong>编制型</strong>（Orchestration）两种，其中编制型有协调者。编排型 Saga 中的本地事务由事件来直接触发，而编制型中 Saga 的本地事务的触发由协调者来确定。</p><p>每个 Saga 中有多个参与者，每个参与者需要定义所执行的操作，以及对应的补偿操作。补偿操作不一定与执行的操作完全相反。比如，订单服务中的创建订单操作的补偿操作是把订单的状态改为已取消，同时根据不同的情况，可能收取一定的取消费用。每个参与者只负责完成整个业务事务中的某一步，并根据执行的结果来确定下一步的操作。编排型 Saga 中的业务逻辑散落在每个参与者之中，而编制型 Saga 中的业务逻辑由协调者来统一管理。业务事务的进程推进由事件和消息来完成，当业务事务进行到最后一步时，这个 Saga 处于已完成的状态。</p><p>下图是编排型 Saga 的示意图。图中的每个六边形表示一个服务，其中的箭头表示事件。对事件的处理发生在每个服务的内部，处理的结果会导致新的事件产生。整个业务事务的状态可以从订单对象的状态中得到。</p>',33),c=a("p",null,"下图是编制型 Saga 的示意图。服务之间传递的是命令和命令的响应，图中以双向箭头来表示。订单服务中有专门的 Saga 实体来维护业务事务的状态，这个 Saga 实体也负责根据之前命令的响应结果，来确定下一步需要调用的命令。",-1),_=a("h3",{id:"总结",tabindex:"-1"},[t("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),h=a("p",null,"微服务架构中的数据一致性是一个相对复杂的问题，不同微服务中独立的数据存储，使得维护数据的一致性变得困难。本课时对数据一致性的问题做了介绍，包括数据库事务的 ACID 特性，以及最终一致性的 BASE 特性；最后介绍了用来保证数据一致性的 Saga 模式。通过本课时的学习，你将对数据一致性问题有更清楚的认识，了解到 ACID 和 BASE 这两种一致性特性，并对 Saga 模式有最基本的认识。",-1);function d(A,S,C,u,m,b){const s=e("Image");return r(),g("div",null,[l,o(s,{alt:"x2.png",src:"https://s0.lgstatic.com/i/image/M00/0F/84/CgqCHl7HjlCARxkQAACZydbpKFM106.png"}),t(),c,o(s,{alt:"222.png",src:"https://s0.lgstatic.com/i/image/M00/0F/A2/CgqCHl7Hr_eAFyxUAAB4JwfkACs191.png"}),t(),_,h])}const B=n(p,[["render",d]]);export{k as __pageData,B as default};
