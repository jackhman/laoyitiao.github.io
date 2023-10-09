import{_ as t,j as l,o as r,h as o,k as a,f as s,Q as p,s as e}from"./chunks/framework.d3daa342.js";const k=JSON.parse('{"title":"第13讲：剖析Trace在SkyWalking中的落地实现方案（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(2033) 第13讲：剖析 Trace 在 SkyWalking 中的落地实现方案（下）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(2033) 第13讲：剖析 Trace 在 SkyWalking 中的落地实现方案（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(2033) 第13讲：剖析 Trace 在 SkyWalking 中的落地实现方案（下）.md"},i=p('<h1 id="第13讲-剖析trace在skywalking中的落地实现方案-下" tabindex="-1">第13讲：剖析Trace在SkyWalking中的落地实现方案（下） <a class="header-anchor" href="#第13讲-剖析trace在skywalking中的落地实现方案-下" aria-label="Permalink to &quot;第13讲：剖析Trace在SkyWalking中的落地实现方案（下）&quot;">​</a></h1><h1 id="tracesegmentref" tabindex="-1">TraceSegmentRef <a class="header-anchor" href="#tracesegmentref" aria-label="Permalink to &quot;TraceSegmentRef&quot;">​</a></h1><p>TraceSegment 中除了 Span 之外，还有另一个需要介绍的重要依赖 ------ TraceSegmentRef，TraceSegment 通过 refs 集合记录父 TraceSegment 的信息，它的核心字段大概可以分为 3 类：</p><ul><li><p><strong>父 Span 信息</strong></p><ul><li><p><strong>traceSegmentId（ID 类型）</strong>：父 TraceSegment 的 ID。</p></li><li><p><strong>spanId（int 类型）</strong>：父 Span 的 ID，与 traceSegmentId 结合就可以确定父 Span。</p></li><li><p><strong>type（SegmentRefType 类型）</strong>：SegmentRefType 是个枚举，可选值有：CROSS_PROCESS、CROSS_THREAD，分别表示跨进程调用和跨线程调用。</p></li></ul></li><li><p><strong>父应用（或者说，上游调用方）信息</strong></p><ul><li><p><strong>peerId 和 peerHos****t</strong>：父应用（即上游调用方）的地址信息。</p></li><li><p><strong>parentServiceInstanceId（int 类型）</strong>：父应用（即上游应用）的 ServiceInstanceId。</p></li><li><p><strong>parentEndpointName 和 parentEndpointId</strong>：父应用的（即上游应用）的 Endpoint 信息。</p></li></ul></li><li><p><strong>入口信息</strong>（在整条 Trace 中都会传递该信息)</p><ul><li><p><strong>entryServiceInstanceId</strong>：入口应用的 ServiceInstanceId。</p></li><li><p><strong>entryEndpointName 和 entryEndpointId</strong>：入口 Endpoint 信息。</p></li></ul></li></ul><h1 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;Context&quot;">​</a></h1><p>SkyWalking 中的每个 TraceSegment 都与一个 Context 上下文对象一对一绑定，Context 上下文不仅记录了 TraceSegment 的上下文信息，还提供了管理 TraceSegment 生命周期、创建 Span 以及跨进程（跨线程）传播相关的功能。</p><br><p>AbstractTracerContext 是对上下文概念的抽象，其中定义了 Context 上下文的基本行为：</p><ul><li><p><strong>inject(ContextCarrier) 方法</strong>：在跨进程调用之前，调用方会通过 inject() 方法将当前 Context 上下文记录的全部信息注入到 ContextCarrier 参数中，Agent 后续会将 ContextCarrier 序列化并随远程调用进行传播。ContextCarrier 的具体实现在后面会详细分析。</p></li><li><p><strong>extract(ContextCarrier)</strong> <strong>方法</strong>：跨进程调用的接收方会反序列化得到 ContextCarrier 对象，然后通过 extract() 方法从 ContextCarrier 中读取上游传递下来的 Trace 信息并记录到当前的 Context 上下文中。</p></li><li><p><strong>ContextSnapshot capture()</strong> <strong>方法</strong>：在跨线程调用之前，SkyWalking Agent 会通过 capture() 方法将当前 Context 进行快照，然后将快照传递给其他线程。</p></li><li><p><strong>continued(ContextSnapshot)</strong> <strong>方法</strong>：跨线程调用的接收方会从收到的 ContextSnapshot 中读取 Trace 信息并填充到当前 Context 上下文中。</p></li><li><p><strong>getReadableGlobalTraceId()</strong> <strong>方法</strong>： 用于获取当前 Context 关联的 TraceId。</p></li><li><p><strong>createEntrySpan()、createLocalSpan() 方法、createExitSpan()</strong> <strong>方法</strong>：用于创建 Span。</p></li><li><p><strong>activeSpan()</strong> **方法：**用于获得当前活跃的 Span。在 TraceSegment 中，Span 也是按照栈的方式进行维护的，因为 Span 的生命周期符合栈的特性，即：先创建的 Span 后结束。</p></li><li><p><strong>stopSpan(AbstractSpan)</strong> <strong>方法</strong>：用于停止指定 Span。</p></li></ul><br><p>AbstractTraceContext 有两个实现类，如下图所示：</p><br>',12),E=p(`<br><p>IgnoredTracerContext 表示该 Trace 将会被丢失，所以其中不会记录任何信息，里面所有方法也都是空实现。这里重点来看 TracingContext，其核心字段如下：</p><ul><li><p><strong>samplingService（SamplingService</strong> <strong>类型）</strong>：负责完成 Agent 端的 Trace 采样，后面会展开介绍具体的采样逻辑。</p></li><li><p><strong>segment（TraceSegment</strong> <strong>类型）</strong>：它是与当前 Context 上下文关联的 TraceSegment 对象，在 TracingContext 的构造方法中会创建该对象。</p></li><li><p><strong>activeSpanStack（LinkedList&lt;AbstractSpan&gt;</strong> <strong>类型）</strong>：用于记录当前 TraceSegment 中所有活跃的 Span（即未关闭的 Span）。实际上 activeSpanStack 字段是作为栈使用的，TracingContext 提供了 push() 、pop() 、peek() 三个标准的栈方法，以及 first() 方法来访问栈底元素。</p></li><li><p><strong>spanIdGenerator（int</strong> <strong>类型）</strong>：它是 Span ID 自增序列，初始值为 0。该字段的自增操作都是在一个线程中完成的，所以无需加锁。</p></li></ul><h2 id="管理-span" tabindex="-1">管理 Span <a class="header-anchor" href="#管理-span" aria-label="Permalink to &quot;管理 Span&quot;">​</a></h2><p>一般情况下，在 Agent 插件的前置处理逻辑中，会调用 createEntrySpan() 方法创建 EntrySpan，在 TracingContext 的实现中，会检测 EntrySpan 是否已创建，如果是，则不会创建新的 EntrySpan，只是重新调用一下其 start() 方法即可。TracingContext.createEntrySpan() 方法的大致实现如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public AbstractSpan createEntrySpan(final String operationName) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (isLimitMechanismWorking()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       // 前面提到过，默认配置下，每个TraceSegment只能放300个Span</span></span>
<span class="line"><span style="color:#E1E4E8;">        NoopSpan span = new NoopSpan(); // 超过300就放 NoopSpan</span></span>
<span class="line"><span style="color:#E1E4E8;">        return push(span); // 将Span记录到activeSpanStack这个栈中</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractSpan entrySpan;</span></span>
<span class="line"><span style="color:#E1E4E8;">    final AbstractSpan parentSpan = peek(); // 读取栈顶Span，即当前Span</span></span>
<span class="line"><span style="color:#E1E4E8;">    final int parentSpanId = parentSpan == null ? -1 : </span></span>
<span class="line"><span style="color:#E1E4E8;">            parentSpan.getSpanId();</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (parentSpan != null &amp;&amp; parentSpan.isEntry()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 更新 operationId(省略operationName的处理逻辑)，省略</span></span>
<span class="line"><span style="color:#E1E4E8;">        // EndpointNameDictionary 的处理，其核心逻辑在前面的小节已经介绍过了。</span></span>
<span class="line"><span style="color:#E1E4E8;">        entrySpan = parentSpan.setOperationId(operationId);</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 重新调用 start()方法，前面提到过，start()方法会重置</span></span>
<span class="line"><span style="color:#E1E4E8;">        // operationId(以及或operationName)之外的其他字段</span></span>
<span class="line"><span style="color:#E1E4E8;">        return entrySpan.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 新建 EntrySpan对象，spanIdGenerator生成Span ID并递增</span></span>
<span class="line"><span style="color:#E1E4E8;">        entrySpan = new EntrySpan(spanIdGenerator++, parentSpanId, </span></span>
<span class="line"><span style="color:#E1E4E8;">                        operationId);</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 调用 start()方法，第一次调用start()方法时会设置startTime</span></span>
<span class="line"><span style="color:#E1E4E8;">        entrySpan.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 将新建的Span添加到activeSpanStack栈的栈顶</span></span>
<span class="line"><span style="color:#E1E4E8;">        return push(entrySpan);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public AbstractSpan createEntrySpan(final String operationName) {</span></span>
<span class="line"><span style="color:#24292E;">    if (isLimitMechanismWorking()) {</span></span>
<span class="line"><span style="color:#24292E;">       // 前面提到过，默认配置下，每个TraceSegment只能放300个Span</span></span>
<span class="line"><span style="color:#24292E;">        NoopSpan span = new NoopSpan(); // 超过300就放 NoopSpan</span></span>
<span class="line"><span style="color:#24292E;">        return push(span); // 将Span记录到activeSpanStack这个栈中</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    AbstractSpan entrySpan;</span></span>
<span class="line"><span style="color:#24292E;">    final AbstractSpan parentSpan = peek(); // 读取栈顶Span，即当前Span</span></span>
<span class="line"><span style="color:#24292E;">    final int parentSpanId = parentSpan == null ? -1 : </span></span>
<span class="line"><span style="color:#24292E;">            parentSpan.getSpanId();</span></span>
<span class="line"><span style="color:#24292E;">    if (parentSpan != null &amp;&amp; parentSpan.isEntry()) {</span></span>
<span class="line"><span style="color:#24292E;">        // 更新 operationId(省略operationName的处理逻辑)，省略</span></span>
<span class="line"><span style="color:#24292E;">        // EndpointNameDictionary 的处理，其核心逻辑在前面的小节已经介绍过了。</span></span>
<span class="line"><span style="color:#24292E;">        entrySpan = parentSpan.setOperationId(operationId);</span></span>
<span class="line"><span style="color:#24292E;">        // 重新调用 start()方法，前面提到过，start()方法会重置</span></span>
<span class="line"><span style="color:#24292E;">        // operationId(以及或operationName)之外的其他字段</span></span>
<span class="line"><span style="color:#24292E;">        return entrySpan.start();</span></span>
<span class="line"><span style="color:#24292E;">    } else {</span></span>
<span class="line"><span style="color:#24292E;">        // 新建 EntrySpan对象，spanIdGenerator生成Span ID并递增</span></span>
<span class="line"><span style="color:#24292E;">        entrySpan = new EntrySpan(spanIdGenerator++, parentSpanId, </span></span>
<span class="line"><span style="color:#24292E;">                        operationId);</span></span>
<span class="line"><span style="color:#24292E;">        // 调用 start()方法，第一次调用start()方法时会设置startTime</span></span>
<span class="line"><span style="color:#24292E;">        entrySpan.start();</span></span>
<span class="line"><span style="color:#24292E;">        // 将新建的Span添加到activeSpanStack栈的栈顶</span></span>
<span class="line"><span style="color:#24292E;">        return push(entrySpan);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>前面通过 demo-webapp 示例介绍了多次调用 EntrySpan.start() 方法中栈相关的概念，这里依旧通过 demo-webapp 示例简单介绍一下 activeSpanStack 这个栈的工作原理，示例 Trace 如下图所示：</p><br>`,10),S=e("br",null,null,-1),g=e("p",null,"当请求经过 Tomcat 插件时会创建 EntrySpan（调用 start() 方法）并入栈到 activeSpanStack 中；请求经过 Spring MVC 插件时不会创建新的 EntrySpan，只会重新调用 start() 方法。接下来在调用 first() 方法时会创建相应的 LocalSpan 并入栈，first() 方法调用结束之后会将该 LocalSpan 出栈；调用 second() 方法时与 Span 出入栈逻辑相同；最后在通过 Dubbo 远程调用 HelloService.say() 方法的时候，会创建相应的 ExitSpan 并入栈，结束 Dubbo 调用之后其相应的 ExitSpan 会出栈，此时整个 activeSpanStack 栈空了，TraceSegment 也就结束了。整个过程如下图所示：",-1),y=e("br",null,null,-1),d=p(`<br><p>createLocalSpan() 方法负责创建 LocalSpan 对象并添加到 activeSpanStack 集合中，LocalSpan 的 start() 方法中没有栈的概念，存在多次调用的情况，只在这里调用一次即可。</p><br><p>createExitSpan() 方法负责创建 ExitSpan，与 createEntrySpan() 方法类似：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public AbstractSpan createExitSpan(String operationName, </span></span>
<span class="line"><span style="color:#E1E4E8;">         String remotePeer) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractSpan exitSpan;</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 从activeSpanStack栈顶获取当前Span</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractSpan parentSpan = peek(); </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (parentSpan != null &amp;&amp; parentSpan.isExit()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 当前Span已经是ExitSpan，则不再新建ExitSpan，而是调用其start()方法</span></span>
<span class="line"><span style="color:#E1E4E8;">        exitSpan = parentSpan; </span></span>
<span class="line"><span style="color:#E1E4E8;">    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 当前Span不是 ExitSpan，就新建一个ExitSpan</span></span>
<span class="line"><span style="color:#E1E4E8;">        final int parentSpanId = parentSpan == null ? -1 :</span></span>
<span class="line"><span style="color:#E1E4E8;">                parentSpan.getSpanId();</span></span>
<span class="line"><span style="color:#E1E4E8;">        exitSpan =  new ExitSpan(spanIdGenerator++, parentSpanId, </span></span>
<span class="line"><span style="color:#E1E4E8;">                operationId, peerId);</span></span>
<span class="line"><span style="color:#E1E4E8;">        push(exitSpan); // 将新建的ExitSpan入栈</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    exitSpan.start();// 调用start()方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    return exitSpan;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public AbstractSpan createExitSpan(String operationName, </span></span>
<span class="line"><span style="color:#24292E;">         String remotePeer) {</span></span>
<span class="line"><span style="color:#24292E;">    AbstractSpan exitSpan;</span></span>
<span class="line"><span style="color:#24292E;">    // 从activeSpanStack栈顶获取当前Span</span></span>
<span class="line"><span style="color:#24292E;">    AbstractSpan parentSpan = peek(); </span></span>
<span class="line"><span style="color:#24292E;">    if (parentSpan != null &amp;&amp; parentSpan.isExit()) {</span></span>
<span class="line"><span style="color:#24292E;">        // 当前Span已经是ExitSpan，则不再新建ExitSpan，而是调用其start()方法</span></span>
<span class="line"><span style="color:#24292E;">        exitSpan = parentSpan; </span></span>
<span class="line"><span style="color:#24292E;">    } else {</span></span>
<span class="line"><span style="color:#24292E;">        // 当前Span不是 ExitSpan，就新建一个ExitSpan</span></span>
<span class="line"><span style="color:#24292E;">        final int parentSpanId = parentSpan == null ? -1 :</span></span>
<span class="line"><span style="color:#24292E;">                parentSpan.getSpanId();</span></span>
<span class="line"><span style="color:#24292E;">        exitSpan =  new ExitSpan(spanIdGenerator++, parentSpanId, </span></span>
<span class="line"><span style="color:#24292E;">                operationId, peerId);</span></span>
<span class="line"><span style="color:#24292E;">        push(exitSpan); // 将新建的ExitSpan入栈</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    exitSpan.start();// 调用start()方法</span></span>
<span class="line"><span style="color:#24292E;">    return exitSpan;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>了解了 TracingContext 创建以及维护 3 类 Span 的实现之后，我们来看关闭 Span 的方法 ------ stopSpan() 方法，它会将当前 activeSpanStack 栈顶的 Span 关闭并出栈，同时在整个 activeSpanStack 栈空了之后，会尝试关闭当前 TraceSegment，具体实现如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public boolean stopSpan(AbstractSpan span) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractSpan lastSpan = peek(); // 获取当前栈顶的Span对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (lastSpan == span) { // 只能关闭当前活跃Span对象，否则抛异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (lastSpan instanceof AbstractTracingSpan) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (lastSpan.finish(segment)) { // 尝试关闭Span</span></span>
<span class="line"><span style="color:#E1E4E8;">                //当Span完全关闭之后，会将其出栈(即从activeSpanStack中删除）</span></span>
<span class="line"><span style="color:#E1E4E8;">                pop(); </span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            pop(); // 针对NoopSpan类型Span的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        throw new IllegalStateException(&quot;Stopping the unexpected...&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    // TraceSegment中全部Span都关闭(且异步状态的Span也关闭了)，则当前</span></span>
<span class="line"><span style="color:#E1E4E8;">    //  TraceSegment也会关闭，该关闭会触发TraceSegment上传操作，后面详述</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (checkFinishConditions()) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        finish(); </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return activeSpanStack.isEmpty();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public boolean stopSpan(AbstractSpan span) {</span></span>
<span class="line"><span style="color:#24292E;">    AbstractSpan lastSpan = peek(); // 获取当前栈顶的Span对象</span></span>
<span class="line"><span style="color:#24292E;">    if (lastSpan == span) { // 只能关闭当前活跃Span对象，否则抛异常</span></span>
<span class="line"><span style="color:#24292E;">        if (lastSpan instanceof AbstractTracingSpan) {</span></span>
<span class="line"><span style="color:#24292E;">            if (lastSpan.finish(segment)) { // 尝试关闭Span</span></span>
<span class="line"><span style="color:#24292E;">                //当Span完全关闭之后，会将其出栈(即从activeSpanStack中删除）</span></span>
<span class="line"><span style="color:#24292E;">                pop(); </span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            pop(); // 针对NoopSpan类型Span的处理</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } else {</span></span>
<span class="line"><span style="color:#24292E;">        throw new IllegalStateException(&quot;Stopping the unexpected...&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    // TraceSegment中全部Span都关闭(且异步状态的Span也关闭了)，则当前</span></span>
<span class="line"><span style="color:#24292E;">    //  TraceSegment也会关闭，该关闭会触发TraceSegment上传操作，后面详述</span></span>
<span class="line"><span style="color:#24292E;">    if (checkFinishConditions()) { </span></span>
<span class="line"><span style="color:#24292E;">        finish(); </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return activeSpanStack.isEmpty();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="跨进程-跨线程-传播" tabindex="-1">跨进程(跨线程)传播 <a class="header-anchor" href="#跨进程-跨线程-传播" aria-label="Permalink to &quot;跨进程(跨线程)传播&quot;">​</a></h2><p>在开始介绍 Context 与跨进程传播相关的实现之前，需要先介绍一下它们的参数 ------ ContextCarrier。从类名就可以看出 ContextCarrier 是 Context 上下文的搬运工（Carrier），它实现了 Serializable 接口，负责在进程之间搬运 TracingContext 的一些基本信息，跨进程调用涉及 Client 和 Server 两个系统，所以 ContextCarrier 中的字段 Client 和 Server 含义不同：</p><ul><li><p><strong>traceSegmentId（ID 类型）</strong>：它记录了 Client 中 TraceSegment ID；从 Server 角度看，记录的是父 TraceSegment 的 ID。</p></li><li><p><strong>spanId（int 类型）</strong>：从 Client 角度看，它记录了当前 ExitSpan 的 ID；从 Server 角度，看记录的是父 Span ID。</p></li><li><p><strong>parentServiceInstanceId（int 类型）</strong>：它记录的是 Client 服务实例的 ID。</p></li><li><p><strong>peerHost（String 类型）</strong>：它记录了 Server 端的地址（这里 peerName 和 peerId 共用了同一个字段）。以 &quot;#&quot; 开头时记录的是 peerName，否则记录的是 peerId，在 inject() 方法（或 extract() 方法）中填充（或读取）该字段时会专门判断处理开头的&quot;#&quot;字符。</p></li><li><p><strong>entryEndpointName（String</strong> <strong>类型）</strong>：它记录整个 Trace 的入口 EndpointName，该值在整个 Trace 中传播。</p></li><li><p><strong>parentEndpointName（String</strong> <strong>类型）</strong>：它记录了 Client 入口 EndpointName（或 EndpointId）。以 &quot;#&quot; 开头的时候，记录的是 EndpointName，否则记录的是 EndpointId。</p></li><li><p><strong>primaryDistributedTraceId（DistributedTraceId</strong> <strong>类型）</strong>：它记录了当前 Trace ID。</p></li><li><p><strong>entryServiceInstanceId（int</strong> <strong>类型）</strong>：它记录了当前 Trace 的入口服务实例 ID。</p></li></ul><p>跨进程传播 Context 上下文信息的核心流程大致为：远程调用的 Client 端会调用 inject(ContextCarrier) 方法，将当前 TracingContext 中记录的 Trace 上下文信息填充到传入的 ContextCarrier 对象。后续 Client 端的插件会将 ContextCarrier 对象序列化成字符串并将其作为附加信息添加到请求中，这样，ContextCarrier 字符串就会和请求一并到达 Server 端。Server 端的入口插件会检查请求中是否携带了 ContextCarrier 字符串，如果存在 ContextCarrier 字符串，就会将其进行反序列化，然后调用 extract() 方法从 ContextCarrier 对象中取出 Context 上下文信息，填充到当前 TracingContext（以及 TraceSegmentRef) 中。</p><br><p>例如在 demo-webapp 和 demo-provider 的示例中，ContextCarrier 的传播过程如图所示，序列化之后的 ContextCarrier 字符串会放到 RpcContext 中：</p><br>`,17),u=p(`<br><p>这里需要深入介绍一下 ContextCarrier 序列化之后的格式，具体实现在其 serialize() 方法中：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 有多个版本的结构，这里只关注最新的V2版本</span></span>
<span class="line"><span style="color:#E1E4E8;">String serialize(HeaderVersion version) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    return StringUtil.join(&#39;-&#39;, &quot;1&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Base64.encode(this.getPrimaryDistributedTraceId().encode()),</span></span>
<span class="line"><span style="color:#E1E4E8;">        Base64.encode(this.getTraceSegmentId().encode()),</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.getSpanId() + &quot;&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.getParentServiceInstanceId() + &quot;&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.getEntryServiceInstanceId() + &quot;&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Base64.encode(this.getPeerHost()),</span></span>
<span class="line"><span style="color:#E1E4E8;">        Base64.encode(this.getEntryEndpointName()),</span></span>
<span class="line"><span style="color:#E1E4E8;">        Base64.encode(this.getParentEndpointName()));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 有多个版本的结构，这里只关注最新的V2版本</span></span>
<span class="line"><span style="color:#24292E;">String serialize(HeaderVersion version) { </span></span>
<span class="line"><span style="color:#24292E;">    return StringUtil.join(&#39;-&#39;, &quot;1&quot;,</span></span>
<span class="line"><span style="color:#24292E;">        Base64.encode(this.getPrimaryDistributedTraceId().encode()),</span></span>
<span class="line"><span style="color:#24292E;">        Base64.encode(this.getTraceSegmentId().encode()),</span></span>
<span class="line"><span style="color:#24292E;">        this.getSpanId() + &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292E;">        this.getParentServiceInstanceId() + &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292E;">        this.getEntryServiceInstanceId() + &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292E;">        Base64.encode(this.getPeerHost()),</span></span>
<span class="line"><span style="color:#24292E;">        Base64.encode(this.getEntryEndpointName()),</span></span>
<span class="line"><span style="color:#24292E;">        Base64.encode(this.getParentEndpointName()));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>ContextCarrier 序列化之后得到的字符串分为 9 个部分，每个部分通过&quot;-&quot;（中划线）连接。在 deserialize() 方法中实现了 ContextCarrier 反序列化的逻辑，即将上述字符串进行切分并赋值到对应的字段中，具体逻辑为 serialize() 方法的逆操作，这里不再展开分析。</p><br><p>下面来看 TracingContext 对跨线程传播的支持，这里涉及 capture() 方法和 continued() 方法。跨线程传播时使用 ContextSnapshot 为 Context 上下文创建快照，因为是在一个 JVM 中，所以 ContextSnapshot 不涉及序列化的问题，也无需携带服务实例 ID 以及 peerHost 信息，其他核心字段与 ContextCarrier 类似，这里不再展开介绍。</p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>这个课时我们主要学习了 SkyWalking 对 Trace 基本概念的实现，首先介绍了 Trace ID 的实现结构，之后分析了 TraceSegment 如何维护底层 Span 集合以及父子关系，接下来深入剖析了 3 种类型的 Span 以及 StackBasedTracingSpan 引入的栈的概念。最后剖析了与 TraceSegment 相对应的 TracingContext 的实现，它管理着 3 类 Span 的生命周期，提供了跨进程/跨线程传播的基本方法。</p><br><p>在后面的课时中，我们将深入学习与 Trace 相关的 BootService 实现，分析 SkyWalking Agent 如何在这些基础组件上有条不紊的收集并发送 Trace 数据。</p><br>`,13);function m(C,h,x,T,_,I){const n=l("Image");return r(),o("div",null,[i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/94/Cgq2xl6X_6-ATLgTAAApyYi2z4g447.png"}),s(),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/50/CgoCgV6X_7CAIrmBAABEHpBozXI630.png"}),s(),S,g,y,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/7E/Ciqah16X_7CADwCpAAQ3K_wSU4k128.png"}),s(),d,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/95/Cgq2xl6X_7CATU_aAAFxCpVbciQ707.png"}),s(),u])}const v=t(c,[["render",m]]);export{k as __pageData,v as default};
