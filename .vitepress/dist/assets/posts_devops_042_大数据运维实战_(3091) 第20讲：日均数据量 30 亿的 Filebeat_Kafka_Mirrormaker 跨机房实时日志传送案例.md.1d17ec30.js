import{_ as o,j as e,o as r,g as t,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"第20讲：日均数据量30亿的Filebeat+Kafka+Mirrormaker跨机房实时日志传送案例","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3091) 第20讲：日均数据量 30 亿的 Filebeat+Kafka+Mirrormaker 跨机房实时日志传送案例.md","filePath":"posts/devops/042_大数据运维实战/(3091) 第20讲：日均数据量 30 亿的 Filebeat+Kafka+Mirrormaker 跨机房实时日志传送案例.md","lastUpdated":1696417798000}'),c={name:"posts/devops/042_大数据运维实战/(3091) 第20讲：日均数据量 30 亿的 Filebeat+Kafka+Mirrormaker 跨机房实时日志传送案例.md"},i=p('<h1 id="第20讲-日均数据量30亿的filebeat-kafka-mirrormaker跨机房实时日志传送案例" tabindex="-1">第20讲：日均数据量30亿的Filebeat+Kafka+Mirrormaker跨机房实时日志传送案例 <a class="header-anchor" href="#第20讲-日均数据量30亿的filebeat-kafka-mirrormaker跨机房实时日志传送案例" aria-label="Permalink to &quot;第20讲：日均数据量30亿的Filebeat+Kafka+Mirrormaker跨机房实时日志传送案例&quot;">​</a></h1><h3 id="案例环境介绍" tabindex="-1">案例环境介绍 <a class="header-anchor" href="#案例环境介绍" aria-label="Permalink to &quot;案例环境介绍&quot;">​</a></h3><p>这是我们之前的一个应用案例，先说一下业务场景，这是一款电商 App 产品，此 App 运行在某公有云上，每天都会产生大量日志，其中涉及访问日志、购买日志、订单日志等多个信息，这些信息比较敏感。因此需要日志产生后马上回传到我们自建的 IDC 数据中心，然后存储在内部的大数据平台上，最后进行各种维度的分析和报表展示。我们的日志数据量每天平均在 30 亿左右，数据是实时产生，要求能实时的传输到 IDC 数据中心，数据延时不能超过 10 秒钟。</p><p>由于涉及数据量比较大，又对实时性要求较高，并且还是跨广域网传输数据，所以传统的日志文件传输方法肯定行不通了。为了更快地传输和更小的延时，我们将 App 服务部署在了华北区域，因为我们的数据中心在北京。基于此，最初采用 Flume+Kafka 的方案，用 Flume 作为日志收集工具，在每个 App 服务器上安装 Flume Agent 来收集日志数据，然后，实时地将日志数据传输到 IDC 数据中心的 Kafka 集群中。</p><p>但此方案使用不久，就发生了问题，第一个问题是服务器上安装的 Flume Agent 太消耗系统内存和 CPU 资源，影响了 App 服务器的正常运行；第二个问题是数据传输到 Kafka 集群时，由于网络抖动或者故障会出现丢失数据或者数据重复的问题，并且一旦出现数据丢失或者重复，无法进行补录数据，这是我们所不能容忍的。</p><p>后来，在经过多次的讨论和研究，改进了数据传输方案，这次采用了 <strong>Filebeat 加双 Kafka 集群</strong> 的方式，也就是在 App 服务器上部署 Filebeat 软件，用来收集 App 日志数据；然后在公有云部署了一台 Kafka 集群，Filebeat 收集到的数据直接通过内网发送到公有云上的 Kafka 集群中；接着公有云上的 Kafka 集群再将数据实时同步到 IDC 数据中心的 Kafka 集群中，两个 Kafka 集群直接同步了我们采用的 <strong>Kafka MirrorMaker</strong>。这是 Kafka 官方提供的跨数据中心的流数据同步方案。</p><p>经过多次测试和试运行，此方案完美地满足了我们的应用需要，Filebeat 在前端 App 服务器上占有 CPU 资源最多在 10% 左右，内存维持在 2G 左右，这对 App 服务不会有任何影响。同时，由于采用了 2 个 Kafka 集群，Filebeat 和公有云上的 Kafka 是内网数据传输，所以不会出现网络问题。而两个 Kafka 之间的数据传输，虽然说也会由于网络延时或者抖动出现数据丢失或者重复的问题，但是，在发现某个时段数据有问题的时候，只需要在 IDC 数据中心的 Kafka 集群上重新拉取一下公有云 Kafka 集群上这个故障时间段的数据就行了。因而也不用担心网络出现问题。</p><p>目前此架构已经稳定运行了 2 年多，非常稳定。</p><h3 id="kafka-mirrormaker-如何工作" tabindex="-1">Kafka MirrorMaker 如何工作 <a class="header-anchor" href="#kafka-mirrormaker-如何工作" aria-label="Permalink to &quot;Kafka MirrorMaker 如何工作&quot;">​</a></h3><p>上面案例中提到了 MirrorMaker，Kakfa MirrorMaker 是 Kafka 官方提供的一个跨数据中心的流数据同步方案。它的实现原理是从一个源 Kafka 集群消费消息，然后在将消息生产到目标 Kafka 集群，其实就是一个普通的生产和消费。要使用 MirrorMaker，只需要简单地配置一下 MirrorMaker 的 Consumer 和 Producer，然后启动 MirrorMaker，就可以实现两个 Kafka 集群的准实时数据同步。</p><p>下图是一个 MirrorMaker 原理架构图：</p>',11),y=s("p",null,"从图中可以看出，MirrorMaker 位于源 Kafka 集群和目标 Kafka 集群之间，MirrorMaker 从源 Kafka 集群消费数据，此时 MirrorMaker 是一个 Consumer；接着，Kafka 将消费过来的数据直接通过网络传输到目标的 Kafka 集群中，此时 MirrorMaker 是一个 Producer。在实际的使用中，源 Kafka 集群和目标 Kafka 集群可以在不同的网络中，也可以跨广域网，此时的 MirrorMaker 就是一个 Kafka 集群的镜像，实现了数据的实时同步和异地备份。",-1),E=s("p",null,"在实际的使用中，MirrorMaker 可以和目标 Kafka 集群运行在一起，也可以将 MirrorMaker 单独运行在一个独立的机器上。根据我们的使用经验，MirrorMaker 单独运行在一台机器上性能更加稳定。",-1),k=s("h3",{id:"实时日志传输架构",tabindex:"-1"},[a("实时日志传输架构 "),s("a",{class:"header-anchor",href:"#实时日志传输架构","aria-label":'Permalink to "实时日志传输架构"'},"​")],-1),u=s("p",null,"上面提到了 Filebeat 加双 Kafka 集群，然后通过 Kafka MirrorMaker 在两个 Kafka 集群之间同步数据的应用架构。我们的 App 服务器有 20 台，每台都安装 Filebeat，然后指定要收集的日志，而两个 Kafka 集群，都采用 6 个节点构建，MirrorMaker 分布式部署在 3 个节点上。整个实时日志传输架构如下图所示：",-1),f=p(`<p>从此图可以看出，此架构总共需要 15 台服务器，公有云 6 台、IDC 数据中心 9 台，其中，6 台部署 Kafka 集群，3 台部署 MirrorMaker 来消费公有云的 Kafka 集群数据。由于是实时传输数据，公有云每个 Kafka 节点的带宽设置为 20M 即可。</p><p>对于每个主机的配置，我们的经验是 16 核 CPU、32GB 内存即可，磁盘用普通的 HDD 硬盘可能会有性能瓶颈，推荐使用 SSD 固态硬盘。</p><p>在这个架构中，Filebeat、Kafka 的使用前面课时均进行过介绍，这里重点介绍的是 Kafka MirrorMaker 如何配置和使用。</p><h3 id="filebeat-与-mirrormaker-的配置" tabindex="-1">Filebeat 与 MirrorMaker 的配置 <a class="header-anchor" href="#filebeat-与-mirrormaker-的配置" aria-label="Permalink to &quot;Filebeat 与 MirrorMaker 的配置&quot;">​</a></h3><p>这里我们假定两个 Kafka 集群已经部署完成了，部署过程不再介绍。接着，我们来看看如何配置 Filebeat 和 MirrorMaker。</p><p>Filebeat 需要在 App 服务器的每个节点都部署，这里以一个节点为例，其他节点类似。Filebeat 采用 7.7.1 版本，配置好的 filebeat 文件内容如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">filebeat.inputs</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> log</span></span>
<span class="line"><span style="color:#E1E4E8;">  enabled</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  paths</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">openresty</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">mg_2020</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">.log</span></span>
<span class="line"><span style="color:#E1E4E8;">  fields</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   log_topic</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> mglogs</span></span>
<span class="line"><span style="color:#E1E4E8;">filebeat.config.modules</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  path</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${path.config}</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">modules.d</span><span style="color:#6A737D;">/*.yml</span></span>
<span class="line"><span style="color:#6A737D;">  reload.enabled: false</span></span>
<span class="line"><span style="color:#6A737D;">name: &quot;appserver1&quot;</span></span>
<span class="line"><span style="color:#6A737D;">output.kafka:</span></span>
<span class="line"><span style="color:#6A737D;">  enabled: true</span></span>
<span class="line"><span style="color:#6A737D;">  hosts: [&quot;172.16.213.31:9092&quot;, &quot;172.16.213.41:9092&quot;, &quot;172.16.213.70:9092&quot;]</span></span>
<span class="line"><span style="color:#6A737D;">  version: &quot;0.10&quot;</span></span>
<span class="line"><span style="color:#6A737D;">  topic: &#39;%{[fields][log_topic]}&#39;</span></span>
<span class="line"><span style="color:#6A737D;">  codec.format.string: &#39;%{[message]}&#39;</span></span>
<span class="line"><span style="color:#6A737D;">  partition.round_robin:</span></span>
<span class="line"><span style="color:#6A737D;">    reachable_only: true</span></span>
<span class="line"><span style="color:#6A737D;">  worker: 2</span></span>
<span class="line"><span style="color:#6A737D;">  required_acks: 1</span></span>
<span class="line"><span style="color:#6A737D;">  compression: gzip</span></span>
<span class="line"><span style="color:#6A737D;">  max_message_bytes: 10000000</span></span>
<span class="line"><span style="color:#6A737D;">processors:</span></span>
<span class="line"><span style="color:#6A737D;"> - drop_fields:</span></span>
<span class="line"><span style="color:#6A737D;">    fields: [&quot;input&quot;, &quot;host&quot;, &quot;agent.type&quot;, &quot;agent.ephemeral_id&quot;, &quot;agent.id&quot;, &quot;agent.version&quot;, &quot;ecs&quot;]</span></span>
<span class="line"><span style="color:#6A737D;">logging.level: info</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">filebeat.inputs</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;"> type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> log</span></span>
<span class="line"><span style="color:#24292E;">  enabled</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  paths</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">openresty</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">mg_2020</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">.log</span></span>
<span class="line"><span style="color:#24292E;">  fields</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">   log_topic</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> mglogs</span></span>
<span class="line"><span style="color:#24292E;">filebeat.config.modules</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  path</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${path.config}</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">modules.d</span><span style="color:#6A737D;">/*.yml</span></span>
<span class="line"><span style="color:#6A737D;">  reload.enabled: false</span></span>
<span class="line"><span style="color:#6A737D;">name: &quot;appserver1&quot;</span></span>
<span class="line"><span style="color:#6A737D;">output.kafka:</span></span>
<span class="line"><span style="color:#6A737D;">  enabled: true</span></span>
<span class="line"><span style="color:#6A737D;">  hosts: [&quot;172.16.213.31:9092&quot;, &quot;172.16.213.41:9092&quot;, &quot;172.16.213.70:9092&quot;]</span></span>
<span class="line"><span style="color:#6A737D;">  version: &quot;0.10&quot;</span></span>
<span class="line"><span style="color:#6A737D;">  topic: &#39;%{[fields][log_topic]}&#39;</span></span>
<span class="line"><span style="color:#6A737D;">  codec.format.string: &#39;%{[message]}&#39;</span></span>
<span class="line"><span style="color:#6A737D;">  partition.round_robin:</span></span>
<span class="line"><span style="color:#6A737D;">    reachable_only: true</span></span>
<span class="line"><span style="color:#6A737D;">  worker: 2</span></span>
<span class="line"><span style="color:#6A737D;">  required_acks: 1</span></span>
<span class="line"><span style="color:#6A737D;">  compression: gzip</span></span>
<span class="line"><span style="color:#6A737D;">  max_message_bytes: 10000000</span></span>
<span class="line"><span style="color:#6A737D;">processors:</span></span>
<span class="line"><span style="color:#6A737D;"> - drop_fields:</span></span>
<span class="line"><span style="color:#6A737D;">    fields: [&quot;input&quot;, &quot;host&quot;, &quot;agent.type&quot;, &quot;agent.ephemeral_id&quot;, &quot;agent.id&quot;, &quot;agent.version&quot;, &quot;ecs&quot;]</span></span>
<span class="line"><span style="color:#6A737D;">logging.level: info</span></span></code></pre></div><p>上面配置中，/data/openresty/logs 是 App 日志的生成目录，此目录下每隔一小时产生一个文件，文件名以时间命名，比如 mg_2020-06-23-18.log，上面通过通配符匹配的方式，将所有日志动态匹配给 Filebeat。</p><p>最后的 output.kafka 配置是将日志输出到 Kafka 集群中，hosts 中指定了 Kafka 集群节点信息。注意，这个 Kafka 集群位于公有云上。</p><p>接着，就是 MirrorMaker 的配置了，其是以一个脚本的形式默认保存在 Kafka 安装目录下的 bin 子目录下，脚本名为 kafka-mirror-maker.sh。要启动这个脚本，需要先配置两个文件，即 $KAFKA_HOME/config/consumer.properties 和 $KAFKA_HOME/config/producer.properties。consumer.properties 文件是配置 MirrorMaker 从公有云 Kafka 集群中消费数据的属性，常见的配置项内容如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">bootstrap.servers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">cloudkafka1</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;">,cloudkafka2</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;">,cloudkafka3</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span></span>
<span class="line"><span style="color:#E1E4E8;">group.id</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">cloudgroup</span></span>
<span class="line"><span style="color:#E1E4E8;">enable.auto.commit</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">request.timeout.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">180000</span></span>
<span class="line"><span style="color:#E1E4E8;">heartbeat.interval.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1000</span></span>
<span class="line"><span style="color:#E1E4E8;">session.timeout.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">120000</span></span>
<span class="line"><span style="color:#E1E4E8;">max.poll.interval.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">600000</span></span>
<span class="line"><span style="color:#E1E4E8;">max.poll.records</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">120000</span></span>
<span class="line"><span style="color:#E1E4E8;">auto.offset.reset</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">earliest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">bootstrap.servers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">cloudkafka1</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;">,cloudkafka2</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;">,cloudkafka3</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span></span>
<span class="line"><span style="color:#24292E;">group.id</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">cloudgroup</span></span>
<span class="line"><span style="color:#24292E;">enable.auto.commit</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">request.timeout.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">180000</span></span>
<span class="line"><span style="color:#24292E;">heartbeat.interval.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1000</span></span>
<span class="line"><span style="color:#24292E;">session.timeout.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">120000</span></span>
<span class="line"><span style="color:#24292E;">max.poll.interval.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">600000</span></span>
<span class="line"><span style="color:#24292E;">max.poll.records</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">120000</span></span>
<span class="line"><span style="color:#24292E;">auto.offset.reset</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">earliest</span></span></code></pre></div><p>对这几个参数的含义介绍如下：</p><ul><li><p>bootstrap.servers：指定去消费的 Kafka 集群的 broker 地址，不需要将 Kafka 集群中所有的 broker 都配置上，因为启动后会自动地发现集群的所有 broker。</p></li><li><p>group.id：指定该 consumer 想要加入哪个 Group 中，也就是指定一个 Consumer Group。一条消息可以被多个 Consumer Group 消费，但是一条消息只会被 Consumer Group 中的一个 Consumer 消费。</p></li><li><p>enable.auto.commit：指定了消费者是否自动提交偏移量，默认值是 true，但自动提交会带来重复消费和数据丢失的问题，建议把它设置为 false，手动控制提交偏移量。</p></li><li><p>request.timeout.ms：当请求发起后，并不一定会很快接收到响应信息，这个配置就是来配置请求的超时时间。</p></li><li><p>heartbeat.interval.ms：表示心跳间隔，心跳是确定 consumer 存活，加入或者退出 Group 的有效手段。</p></li><li><p>session.timeout.ms：表示 Consumer Session 过期时间，当 Consumer 由于某种原因不能发 Heartbeat 到协调器时，并且时间超过 session.timeout.ms 的设置，Kafka 就会认为该 Consumer 已退出，它所订阅的 Partition 会分配到同一 Group 内的其他 Consumer 上，此值必须大于 heartbeat.interval.ms 的值。</p></li><li><p>max.poll.interval.ms：设置 Consumer 处理逻辑最大时间，如果 Consumer 长时间没有调用 poll，且间隔超过这个值时，就会认为这个 Consumer 失败了。</p></li><li><p>max.poll.records：Consumer 每次调用 poll 时取到的消息的最大数量，需要合理设置这个值，如果设置过大，会导致一次 poll 操作返回的消息记录无法在 max.poll.interval.ms 指定的时间内完成，就会触发 rebalance 操作。</p></li><li><p>auto.offset.reset：设置消费者在读取一个没有偏移量或者偏移量无效的情况下，应该如何处理，默认值是 latest，也就是从最新纪录读取数据；还有一个值为 earliest，表示在偏移量无效的情况下，消费者从头开始消费数据。建议使用 earliest。设置该参数后 Kafka 如果出错重启，找到未消费的 offset 可以继续消费。而 latest 这个设置容易丢失数据。</p></li></ul><p>此配置文件中，大部分是优化参数，优化参数的设置需要根据具体应用场景来设定，因此需要深入了解每个参数的含义和使用细节。</p><p>另一个需要配置的是 producer.properties，此文件用来控制将数据发送到 IDC 数据中心的 Kafka 集群的属性值，常见的配置项内容如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">bootstrap.servers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">idckafka1</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;">,idckafka2</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;">,idckafka3</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span></span>
<span class="line"><span style="color:#E1E4E8;">acks</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">all</span></span>
<span class="line"><span style="color:#E1E4E8;">batch.size</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">16348</span></span>
<span class="line"><span style="color:#E1E4E8;">linger.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">max.block.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">9223372036854775807</span></span>
<span class="line"><span style="color:#E1E4E8;">compression.type</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">gzip</span></span>
<span class="line"><span style="color:#E1E4E8;">request.timeout.ms</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">90000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">bootstrap.servers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">idckafka1</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;">,idckafka2</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;">,idckafka3</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span></span>
<span class="line"><span style="color:#24292E;">acks</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">all</span></span>
<span class="line"><span style="color:#24292E;">batch.size</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">16348</span></span>
<span class="line"><span style="color:#24292E;">linger.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">max.block.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">9223372036854775807</span></span>
<span class="line"><span style="color:#24292E;">compression.type</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">gzip</span></span>
<span class="line"><span style="color:#24292E;">request.timeout.ms</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">90000</span></span></code></pre></div><p>对这几个参数的含义介绍如下：</p><ul><li><p>bootstrap.servers：指定将消息发送到 IDC 数据中心 Kafka 集群的 Broker 地址，不需要将 Kafka 集群中所有的 Broker 都配置上。</p></li><li><p>acks：该参数指定了在集群中有多少个分区副本收到消息，Kafka Producer 才会认为消息写入成功。这个参数对消息是否丢失有很大的影响，可以设置的值有 0、1 和 all，其中 0 和 1 都有可能丢失数据，设置为 all 时，并且集群至少有 2 个以上的副本时，可以保证不丢失任何数据。此模式安全性最高，但是效率最低。</p></li><li><p>batch.size：用来设置 Producer 批量发送的基本单位，每个 Batch 要存放 batch.size 大小的数据后，才可以发送出去。batch.size 默认值是 16KB，因此，Producer 要凑够 16KB 的数据才会发送。</p></li><li><p>linger.ms：设置一个 Batch 被创建之后，最多过多久、不管这个 Batch 有没有写满，都必须发送出去了。linger.ms 配合 batch.size 一起来设置，可避免一个 Batch 迟迟凑不满，导致消息一直积压在内存里发送不出去的情况。</p></li><li><p>max.block.ms：设置获取 Kafka 集群元数据时生产者的阻塞时间，在超过这个阻塞时间后，生产者会抛出超时异常。</p></li><li><p>compression.type：指定消息发送到 Kafka 的 Broker 之前使用哪一种压缩算法，使用压缩可以降低网络传输开销和存储开销，而这往往是向 Kafka 发送消息的瓶颈所在。</p></li><li><p>request.timeout.ms：指定了生产者在发送数据时等待 Kafka 集群返回响应的时间。</p></li></ul><p>这两个文件配置完成后，就可以启动 Kakfa MirrorMaker 了，这里我将 MirrorMaker 部署在三个独立的主机上，依次在三台主机上启动 MirrorMaker 服务，启动方式如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[kafka@</span><span style="color:#F97583;">mirrormaker1</span><span style="color:#E1E4E8;">  kafka]$ cd </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kafka</span></span>
<span class="line"><span style="color:#E1E4E8;">[kafka@</span><span style="color:#F97583;">mirrormaker1</span><span style="color:#E1E4E8;"> kafka]$ nohup bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kafka</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mirror</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">maker.sh </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">consumer.config </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kafka</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">config</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">consumer.properties </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">num.streams </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">producer.config </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kafka</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">config</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">producer.properties </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">whitelist</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;mglogs*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[kafka@</span><span style="color:#D73A49;">mirrormaker1</span><span style="color:#24292E;">  kafka]$ cd </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kafka</span></span>
<span class="line"><span style="color:#24292E;">[kafka@</span><span style="color:#D73A49;">mirrormaker1</span><span style="color:#24292E;"> kafka]$ nohup bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kafka</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mirror</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">maker.sh </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">consumer.config </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kafka</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">config</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">consumer.properties </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">num.streams </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">producer.config </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kafka</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">config</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">producer.properties </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">whitelist</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;mglogs*&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span></span></code></pre></div><p>其中：</p><ul><li><p>--num.streams：设置此 MirrorMaker 进程开启的线程数，每个线程就是一个独立的 Consumer。例如上面开启了 16 个线程，也就创建了 16 个 Consumer 进行消息消费。</p></li><li><p>--whitelist：设置要同步的 Topic，如果要同步的 Topic 比较多，可以使用正则表达式。</p></li></ul><p>这样，MirrorMaker 服务就启动成功了，可通过查看 nohup.out 文件检查 MirrorMaker 服务是否运行正常。</p><h3 id="开启数据实时同步" tabindex="-1">开启数据实时同步 <a class="header-anchor" href="#开启数据实时同步" aria-label="Permalink to &quot;开启数据实时同步&quot;">​</a></h3><p>所有配置完成后，就可以开启服务进行数据同步了，首先开启 App 服务器上的每个 Filebeat 服务，然后启动两个 Kafka 集群，最后启动 MirrorMaker 服务，启动后，两个 Kafka 集群就自动开始同步数据了，要查看两个 Kafka 集群之间的数据同步状态，可执行如下命令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[kafka@</span><span style="color:#F97583;">mirrormaker1</span><span style="color:#E1E4E8;">  kafka]$ cd </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kafka</span></span>
<span class="line"><span style="color:#E1E4E8;">[kafka@</span><span style="color:#F97583;">mirrormaker1</span><span style="color:#E1E4E8;"> kafka]$ bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kafka</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">consumer</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">groups.sh  </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">bootstrap</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">server </span><span style="color:#79B8FF;">172.16</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">213</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">152</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">172.16</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">213</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">138</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">172.16</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">213</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">80</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9092</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">describe </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">group cloudgroup</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[kafka@</span><span style="color:#D73A49;">mirrormaker1</span><span style="color:#24292E;">  kafka]$ cd </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kafka</span></span>
<span class="line"><span style="color:#24292E;">[kafka@</span><span style="color:#D73A49;">mirrormaker1</span><span style="color:#24292E;"> kafka]$ bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kafka</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">consumer</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">groups.sh  </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">bootstrap</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">server </span><span style="color:#005CC5;">172.16</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">213</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">152</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">172.16</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">213</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">138</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">172.16</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">213</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">80</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9092</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">describe </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">group cloudgroup</span></span></code></pre></div><p>注意，这个命令中指定的 bootstrap-server，是公有云 Kafka 集群的地址和端口。命令执行后，可获得下图所示的状态：</p>`,27),m=p('<p>在这个输出中，分为 9 列。第 1 列是消费组名，第 2 列是同步的 Topic 名，第 3 列 Topic 是对应的 Partition，第 4 列 CURRENT-OFFSET 是现在消费到的 OFFSET 位置，第 5 列 LOG-END-OFFSET 是公有云的 Kafka 集群目前的 OFFSET，第 6 列 LAG 是数据同步延时值，其实就是 LOG-END-OFFSET 减去 CURRENT-OFFSE 的结果，第 7 列是消费者的 ID，如果开启了 16 个消费线程，那么就会有 16 个消费 ID，第 8 列的 HOST 表示 MirrorMaker 服务对应的主机地址，最后一列显示的是消费者对应的客户端 ID。</p><p>这里需要重点关注的是 LAG 这一列，通过此列可以看出两个 Kafka 之间数据同步、延时状态。如果长期持续 LAG 列对应的值很大，就要考虑优化 MirrorMaker，因为过大的延时会导致实时数据同步出现延时，影响后端的实时分析业务。</p><h3 id="使用-mirrormaker-需要注意的事项" tabindex="-1">使用 MirrorMaker 需要注意的事项 <a class="header-anchor" href="#使用-mirrormaker-需要注意的事项" aria-label="Permalink to &quot;使用 MirrorMaker 需要注意的事项&quot;">​</a></h3><p>在使用 MirrorMaker 对两个 Kafka 集群进行数据同步时，经常出现的问题有数据延时、数据重复或数据丢失。如果两个 Kafka 集群之间是跨广域网同步，那么数据不一致问题可能会经常发生，针对这种情况，可从如下几个方面优化，最大限度保证数据的完整性。</p><p>（1）如果出现数据延时过大，那么可启动多个 MirrorMaker 进程，同时单个进程启动多个 Consuemr Streams，这样可以提高吞吐量。</p><p>（2）MirrorMaker 建议单独部署在一个独立服务器上，尽量不要和 Kafka 集群共用一台主机，同时，MirrorMaker 服务器应该和目标 Kafka 集群放在同一个网络中。</p><p>（3）在跨广域网同步消息时，如果出现网络问题导致同步失败，可在 MirrorMaker 服务器上重新消费某个故障时间段的数据。为了保障数据的完整性，可以将数据按小时同步和存放，例如每小时一个 Topic，这样的话，如果某个小时出现数据异常，可通过另一个消费组重新消费这个小时的数据即可完成数据的补录。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时主要介绍了如何通过 MirrorMaker 实现两个 Kafka 集群之间的数据同步，此架构部署起来比较简单，但是要做到稳定运行，并不容易。因为网络环境不同，业务量不同，要具体优化的参数也不同，所以，我们要在了解此架构的基础上，根据具体的应用场景进行针对性地调试和优化，做到灵活应用。</p>',9);function d(F,A,D,g,h,_){const n=e("Image");return r(),t("div",null,[i,l(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C8/Ciqc1F7-_leALHMZAADu46coWFk590.png"}),a(),y,E,k,u,l(n,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C8/Ciqc1F7-_mOAV8jJAAI6p1ez7Zc179.png"}),a(),f,l(n,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C8/Ciqc1F7-_pKAF4RAAABpI2OKlhc572.png"}),a(),m])}const M=o(c,[["render",d]]);export{C as __pageData,M as default};
