import{_ as a,j as l,o as _,g as e,k as s,h as o,s as t,Q as n}from"./chunks/framework.e0c66c3f.js";const E=JSON.parse('{"title":"案例背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6057) 08  MQ：如何回答消息队列的丢失、重复与积压问题.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6057) 08  MQ：如何回答消息队列的丢失、重复与积压问题.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/架构设计面试精讲_文档/(6057) 08  MQ：如何回答消息队列的丢失、重复与积压问题.md"},i=t("p",null,"这一讲，我们将围绕 MQ 消息中间件，讨论你经常被问到的高频设计问题。",-1),c=t("p",null,[o("面试官在面试候选人时，如果发现候选人的简历中写了在项目中使用了 MQ 技术（如 Kafka、RabbitMQ、RocketMQ），基本都会抛出一个问题："),t("strong",null,"在使用 MQ 的时候，怎么确保消息 100% 不丢失？")],-1),g=t("p",null,"这个问题在实际工作中很常见，既能考察候选者对于 MQ 中间件技术的掌握程度，又能很好地区分候选人的能力水平。接下来，我们就从这个问题出发，探讨你应该掌握的基础知识和答题思路，以及延伸的面试考点。",-1),u=t("h3",{id:"案例背景",tabindex:"-1"},[o("案例背景 "),t("a",{class:"header-anchor",href:"#案例背景","aria-label":'Permalink to "案例背景"'},"​")],-1),d=t("p",null,'以京东系统为例，用户在购买商品时，通常会选择用京豆抵扣一部分的金额，在这个过程中，交易服务和京豆服务通过 MQ 消息队列进行通信。在下单时，交易服务发送"扣减账户 X 100 个京豆"的消息给 MQ 消息队列，而京豆服务则在消费端消费这条命令，实现真正的扣减操作。',-1),h=n("",13),M=n("",10),q=t("p",null,"扣减京豆",-1),Q=t("p",null,[t("strong",null,"最简单的实现方案，就是在数据库中建一张消息日志表，"),o(" 这个表有两个字段：消息 ID 和消息执行状态。这样，我们消费消息的逻辑可以变为：在消息日志表中增加一条消息记录，然后再根据消息记录，异步操作更新用户京豆余额。")],-1),k=t("p",null,"因为我们每次都会在插入之前检查是否消息已存在，所以就不会出现一条消息被执行多次的情况，这样就实现了一个幂等的操作。当然，基于这个思路，不仅可以使用关系型数据库，也可以通过 Redis 来代替数据库实现唯一约束的方案。",-1),A=t("p",null,'在这里我多说一句，想要解决"消息丢失"和"消息重复消费"的问题，有一个前提条件就是要实现一个全局唯一 ID 生成的技术方案。这也是面试官喜欢考察的问题，你也要掌握。',-1),m=t("p",null,"在分布式系统中，全局唯一 ID 生成的实现方法有数据库自增主键、UUID、Redis，Twitter-Snowflake 算法，我总结了几种方案的特点，你可以参考下。",-1),I=n("",15);function T(f,C,D,b,P,S){const p=l("Image");return _(),e("div",null,[i,c,g,u,d,s(p,{alt:"1.png",src:"https://s0.lgstatic.com/i/image2/M01/07/69/CgpVE2AICf-AIldlAACI4Qo9Nv4750.png"}),h,s(p,{alt:"2.png",src:"https://s0.lgstatic.com/i/image2/M01/07/68/Cip5yGAICkGAI7vpAAEcjkYXvaA495.png"}),o(),M,s(p,{alt:"3.png",src:"https://s0.lgstatic.com/i/image2/M01/07/69/CgpVE2AICsCAYHgNAAF3z8OC8eg779.png"}),o(),q,Q,k,A,m,s(p,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/8F/79/Ciqc1GAIDXuAZ2iUAAIGj0vJThg862.png"}),I])}const N=a(r,[["render",T]]);export{E as __pageData,N as default};
