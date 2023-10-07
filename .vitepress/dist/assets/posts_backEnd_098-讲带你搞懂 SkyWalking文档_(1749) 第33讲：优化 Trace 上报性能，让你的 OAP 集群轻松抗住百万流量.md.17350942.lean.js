import{_ as o,j as e,o as t,g as r,k as p,h as a,Q as l,s}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"第33讲：优化Trace上报性能，让你的OAP集群轻松抗住百万流量","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1749) 第33讲：优化 Trace 上报性能，让你的 OAP 集群轻松抗住百万流量.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1749) 第33讲：优化 Trace 上报性能，让你的 OAP 集群轻松抗住百万流量.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1749) 第33讲：优化 Trace 上报性能，让你的 OAP 集群轻松抗住百万流量.md"},E=l("",8),y=l("",1),i=s("p",null,"同一 Topic 的不同 Partition 会分配在不同的 Broker 上。 Partition 是 Kafka 水平扩展性的基础，我们可以通过增加服务器并在其上分配 Partition 的方式，增加 Kafka 的并行处理能力。",-1),g=s("p",null,"Partition 在逻辑上对应着一个 Log，当 Producer 将消息写入 Partition 时，实际上是写入到了 Partition 对应的 Log 中。Log 是一个逻辑概念，可以对应到磁盘上的一个文件夹。Log 由多个 Segment 组成，每个 Segment 对应一个日志文件和索引文件。在面对海量数据时，为避免出现超大文件，每个日志文件的大小是有限制的，当超出限制后则会创建新的 Segment，继续对外提供服务。这里要注意，因为 Kafka 采用顺序 IO，所以只向最新的 Segment 追加数据。为了权衡文件大小、索引速度、占用内存大小等多方面因素，索引文件采用稀疏索引的方式，文件大小并不会很大，在运行时会将其内容映射到内存，提高索引速度。",-1),d=s("ul",null,[s("li",null,[s("strong",null,"保留策略（Retention Policy）& 日志压缩（Log Compaction）")])],-1),u=s("p",null,'无论消费者是否已经消费了消息，Kafka 都会一直保存这些消息，但并不会像数据库那样长期保存。为了避免磁盘被占满，Kafka 会配置相应的"保留策略"（Retention Policy），以实现周期性的删除陈旧的消息。',-1),F=s("p",null,'Kafka 中有两种"保留策略"：一种是根据消息保留的时间，当消息在 Kafka 中保存的时间超过了指定时间，就可以被删除；另一种是根据 Topic 存储的数据大小，当 Topic 所占的日志文件大小大于一个阈值，则可以开始删除最旧的消息。Kafka 会启动一个后台线程，定期检查是否存在可以删除的消息。"保留策略"的配置是非常灵活的，可以有全局的配置，也可以针对 Topic 进行配置覆盖全局配置。',-1),C=s("p",null,'除此之外，Kafka 还会进行"日志压缩"（Log Compaction）。在很多场景中，消息的 key 与 value 的值之间的对应关系是不断变化的，就像数据库中的数据会不断被修改一样，消费者只关心 key 对应的最新 value 值。此时，可以开启 Kafka 的日志压缩功能，Kafka 会在后台启动一个线程，定期将相同 key 的消息进行合并，只保留最新的 value 值。日志压缩的工作原理如下图所示，图展示了一次日志压缩过程的简化版本。',-1),m=s("ul",null,[s("li",null,[s("strong",null,"Replica"),a("：一般情况下，Kafka 对消息进行了冗余备份，每个 Partition 可以有多个 Replica（副本），每个 Replica 中包含的消息是一样的。每个 Partition 的 Replica 集合中，都会选举出一个 Replica 作为 Leader Replica，Kafka 在不同的场景下会采用不同的选举策略。所有的读写请求都由选举出的 Leader Replica 处理，其他都作为 Follower Replica，Follower Replica 仅仅是从 Leader Replica 处把数据拉取到本地之后，同步更新到自己的 Log 中。每个 Partition 至少有一个 Replica，当 Partition 中只有一个 Replica 时，就只有 Leader Replica，没有 Follower Replica。下图展示了一个拥有三个 Replica 的Partition。")])],-1),k=l("",7),h=l("",8),A=s("p",null,"此时 Leader Replica 所在的 Broker 突然宕机，则会重新选举新的 Leader Replica，而新的 Leader Replica 中没有原来 Leader Replica 的消息，这就出现了消息的丢失，而有些 Consumer 则可能消费了这些丢失的消息，后续服务状态变得不可控。",-1),v=s("p",null,"Kafka 权衡了同步复制和异步复制两种策略，通过引入了 ISR 集合，巧妙地解决了上面两种方案存在的缺陷：首先，当 Follower Replica 的延迟过高时，会将 Leader Replica 被踢出 ISR 集合，消息依然可以快速提交，Producer 也可以快速得到响应，避免高延时的 Follower Replica 影响整个 Kafka 集群的性能。当 Leader Replica 所在的 Broker 突然宕机的时候，会优先将 ISR 集合中 Follower Replica 选举为 Leader Replica，新 Leader Replica 中包含了 HW 之前的全部消息，这就避免了消息的丢失。值得注意是，Follower Replica 可以批量地从 Leader Replica 复制消息，这就加快了网络 I/O，Follower Replica 在更新消息时是批量写磁盘，加速了磁盘的 I/O，极大减少了 Follower 与 Leader 的差距。",-1),f=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"Cluster&Controller"),a("：多个 Broker 可以做成一个 Cluster（集群）对外提供服务，每个 Cluster 当中会选举出一个 Broker 来担任 Controller，Controller 是 Kafka 集群的指挥中心，而其他 Broker 则听从 Controller 指挥实现相应的功能。Controller 负责管理分区的状态、管理每个分区的 Replica 状态、监听 Zookeeper 中数据的变化等工作。Controller 也是一主多从的实现，所有 Broker 都会监听 Controller Leader 的状态，当 Leader Controller 出现故障时则重新选举新的 Controller Leader。")])]),s("li",null,[s("p",null,[s("strong",null,"Consumer"),a("：从 Topic 中拉取消息，并对消息进行消费。某个消费者消费到 Partition 的哪个位置（offset）的相关信息，是 Consumer 自己维护的。在下图中，三个消费者同时消费同一个 Partition，各自管理自己的消费位置。")])])],-1),S=s("p",null,"这样设计非常巧妙，避免了 Kafka Server 端维护消费者消费位置的开销，尤其是在消费数量较多的情况下。另一方面，如果是由 Kafka Server 端管理每个 Consumer 消费状态，一旦 Kafka Server 端出现延或是消费状态丢失时，将会影响大量的 Consumer。同时，这一设计也提高了 Consumer 的灵活性，Consumer 可以按照自己需要的顺序和模式拉取消息进行消费。例如：Consumer 可以通过修改其消费的位置实现针对某些特殊 key 的消息进行反复消费，或是跳过某些消息的需求。",-1),D=s("ul",null,[s("li",null,[s("strong",null,"Consumer Group"),a('：在 Kafka 中，多个 Consumer 可以组成一个 Consumer Group，一个Consumer 只能属于一个 Consumer Group。Consumer Group 保证其订阅的 Topic 的每个Partition 只被分配给此 Consumer Group 中的一个消费者处理。如果不同 Consumer Group 订阅了同一 Topic，Consumer Group 彼此之间不会干扰。这样，如果要实现一个消息可以被多个 Consumer 同时消费（"广播"）的效果，则将每个 Consumer 放入单独的一个 Consumer Group；如果要实现一个消息只被一个 Consumer 消费（"独占"）的效果，则将所有的 Consumer 放入一个 Consumer Group 中。在 Kafka 官网的介绍中，将 Consumer Group 称为"逻辑上的订阅者"（logical subscriber），从这个角度看，是有一定道理的。')])],-1),_=s("p",null,"下图展示了一个 Consumer Group 中消费者与 Partition 之间的对应关系，其中，Consumer1 和 Consumer2 分别消费 Partition0 和 Partition1，而 Partition2 和 Partition3 分配给了 Consumer3 进行处。",-1),R=s("p",null,'Consumer Group 除了实现"独占"和"广播"模式的消息处理外，Kafka 还通过 Consumer Group 实现了消费者的水平扩展和故障转移。在上图中，当 Consumer3 的处理能力不足以处理两个 Partition 中的数据时，可以通过向 Consumer Group 中添加消费者的方式，触发Rebalance 操作重新分配 Partition 与 Consumer 的对应关系，从而实现水平扩展。如下图所示，添加 Consumer4 之后，Consumer3 只消费 Partition3 中的消息，Partition4 中的消息则由 Consumer4 来消费。',-1),b=s("p",null,"下面来看 Consumer 出现故障的场景，当 Consumer4 宕机时，Consumer Group 会自动重新分配 Partition，如下图所示，由 Consumer3 接管 Consumer4 对应的 Partition 继续处理。",-1),P=s("p",null,"注意，Consumer Group 中消费者的数量并不是越多越好，当消费者数量超过 Partition 的数量时，会导致有 Consumer 分配不到 Partition，从而造成 Consumer 的浪费。",-1),T=s("p",null,"介绍完 Kafka 的核心概念后，我们通过下图进行总结，并从更高的视角审视 Kafka 集群的完整架构。",-1),B=l("",16),q=l("",16),K=l("",34),L=s("p",null,"在 SkyWalking Rocketbot UI 中可以查找到相应的完整 Trace 信息，如下图所示，即表示上述改造成果：",-1);function w(G,I,x,O,M,j){const n=e("Image");return t(),r("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2F/54/CgqCHl8GwXOAJW_TAAENpE35u5w381.png"}),a(),y,p(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/2F/89/CgqCHl8G-OaAKGrhAABeWbnSWmg382.png"}),a(),i,g,d,u,F,C,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2F/49/Ciqc1F8GwaGAJouRAAKTqlJtZJc799.png"}),a(),m,p(n,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/2F/89/CgqCHl8G-PqAAWyMAABTqAURrAc486.png"}),a(),k,p(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/2F/7D/Ciqc1F8G-Q6ACSq7AABvhBoNdlo220.png"}),a(),h,p(n,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/2F/7E/Ciqc1F8G-RyAAeDAAAAnkFKrwaI521.png"}),a(),A,v,f,p(n,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/2F/7E/Ciqc1F8G-SeAbrU5AAAzthf0-to945.png"}),a(),S,D,_,p(n,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/2F/7E/Ciqc1F8G-TOAJ2cnAABuLTyumCs642.png"}),a(),R,p(n,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/2F/89/CgqCHl8G-T2AAoDPAAB37LzFH3w280.png"}),a(),b,p(n,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/2F/7E/Ciqc1F8G-UuASSRJAABvDdSbF40361.png"}),a(),P,T,p(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/2F/4D/Ciqc1F8GxJWAWTtSAAKDvoKBlPU986.png"}),a(),B,p(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/2F/4D/Ciqc1F8GxLqAHJWSAAGLMsqgETA207.png"}),a(),q,p(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/2F/58/CgqCHl8GxP2AWGQxAACxh34qQEw194.png"}),a(),K,p(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/2F/59/CgqCHl8GxVeAbpX5AAFAyMPwgYA338.png"}),a(),L,p(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/2F/4E/Ciqc1F8GxV-AWrfaAACzTk0fGVU367.png"})])}const W=o(c,[["render",w]]);export{H as __pageData,W as default};
