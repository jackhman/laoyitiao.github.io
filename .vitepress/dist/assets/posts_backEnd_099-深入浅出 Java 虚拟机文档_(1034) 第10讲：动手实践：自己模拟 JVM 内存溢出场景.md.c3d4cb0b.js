import{_ as s,o as n,g as a,Q as p}from"./chunks/framework.f949202b.js";const b=JSON.parse('{"title":"java -XX:+PrintFlagsFinal 2>&1 | grep SurvivorRatio","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1034) 第10讲：动手实践：自己模拟 JVM 内存溢出场景.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1034) 第10讲：动手实践：自己模拟 JVM 内存溢出场景.md","lastUpdated":null}'),e={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1034) 第10讲：动手实践：自己模拟 JVM 内存溢出场景.md"},l=p(`<p>本课时我们主要自己模拟一个 JVM 内存溢出的场景。在模拟 JVM 内存溢出之前我们先来看下这样的几个问题。</p><ul><li><p>老年代溢出为什么那么可怕？</p></li><li><p>元空间也有溢出？怎么优化？</p></li><li><p>如何配置栈大小？避免栈溢出？</p></li><li><p>进程突然死掉，没有留下任何信息时如何进行排查？</p></li></ul><p>年轻代由于有老年代的担保，一般在内存占满的时候，并没什么问题。但老年代满了就比较严重了，它没有其他的空间用来做担保，只能 OOM 了，也就是发生 Out Of Memery Error。JVM 会在这种情况下直接停止工作，是非常严重的后果。</p><br><p>OOM 一般是内存泄漏引起的，表现在 GC 日志里，一般情况下就是 GC 的时间变长了，而且每次回收的效果都非常一般。GC 后，堆内存的实际占用呈上升趋势。接下来，我们将模拟三种溢出场景，同时使用我们了解的工具进行观测。</p><br><p>在开始之前，请你下载并安装一个叫作 VisualVM 的工具，我们使用这个图形化的工具看一下溢出过程。</p><br><p>虽然 VisualVM 工具非常好用，但一般生产环境都没有这样的条件，所以大概率使用不了。新版本 JDK 把这个工具单独抽离了出去，需要自行下载。</p><br><p>这里需要注意下载安装完成之后请在插件选项中勾选 Visual GC 下载，它将可视化内存布局。</p><h2 id="堆溢出模拟" tabindex="-1">堆溢出模拟 <a class="header-anchor" href="#堆溢出模拟" aria-label="Permalink to &quot;堆溢出模拟&quot;">​</a></h2><p>首先，我们模拟堆溢出的情况，在模拟之前我们需要准备一份测试代码。这份代码开放了一个 HTTP 接口，当你触发它之后，将每秒钟生成 1MB 的数据。由于它和 GC Roots 的强关联性，每次都不能被回收。</p><br><p>程序通过 JMX，将在每一秒创建数据之后，输出一些内存区域的占用情况。然后通过访问 <a href="http://localhost:8888" target="_blank" rel="noreferrer">http://localhost:8888</a> 触发后，它将一直运行，直到堆溢出。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpContext;</span></span>
<span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpExchange;</span></span>
<span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpServer;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.io.OutputStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.management.ManagementFactory;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.management.MemoryPoolMXBean;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.net.InetSocketAddress;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.ArrayList;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.List;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class OOMTest {</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static final int _1MB = 1024 * 1024;</span></span>
<span class="line"><span style="color:#E1E4E8;">   static List&lt;</span><span style="color:#FDAEB7;font-style:italic;">byte[]</span><span style="color:#E1E4E8;">&gt; byteList = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static void oom(HttpExchange exchange) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       try {</span></span>
<span class="line"><span style="color:#E1E4E8;">           String response = &quot;oom begin!&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">           exchange.sendResponseHeaders(200, response.getBytes().length);</span></span>
<span class="line"><span style="color:#E1E4E8;">           OutputStream os = exchange.getResponseBody();</span></span>
<span class="line"><span style="color:#E1E4E8;">           os.write(response.getBytes());</span></span>
<span class="line"><span style="color:#E1E4E8;">           os.close();</span></span>
<span class="line"><span style="color:#E1E4E8;">       } catch (Exception ex) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">       for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           byte[] bytes = new byte[_1MB];</span></span>
<span class="line"><span style="color:#E1E4E8;">           byteList.add(bytes);</span></span>
<span class="line"><span style="color:#E1E4E8;">           System.out.println(i + &quot;MB&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">           memPrint();</span></span>
<span class="line"><span style="color:#E1E4E8;">           try {</span></span>
<span class="line"><span style="color:#E1E4E8;">               Thread.sleep(1000);</span></span>
<span class="line"><span style="color:#E1E4E8;">           } catch (Exception e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           }</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   static void memPrint() {</span></span>
<span class="line"><span style="color:#E1E4E8;">       for (MemoryPoolMXBean memoryPoolMXBean : ManagementFactory.getMemoryPoolMXBeans()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           System.out.println(memoryPoolMXBean.getName() +</span></span>
<span class="line"><span style="color:#E1E4E8;">                   &quot;  committed:&quot; + memoryPoolMXBean.getUsage().getCommitted() +</span></span>
<span class="line"><span style="color:#E1E4E8;">                   &quot;  used:&quot; + memoryPoolMXBean.getUsage().getUsed());</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static void srv() throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">       HttpContext context = server.createContext(&quot;/&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">       context.setHandler(OOMTest::oom);</span></span>
<span class="line"><span style="color:#E1E4E8;">       server.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static void main(String[] args) throws Exception{</span></span>
<span class="line"><span style="color:#E1E4E8;">       srv();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpContext;</span></span>
<span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpExchange;</span></span>
<span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpServer;</span></span>
<span class="line"><span style="color:#24292E;">import java.io.OutputStream;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.management.ManagementFactory;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.management.MemoryPoolMXBean;</span></span>
<span class="line"><span style="color:#24292E;">import java.net.InetSocketAddress;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.ArrayList;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.List;</span></span>
<span class="line"><span style="color:#24292E;">public class OOMTest {</span></span>
<span class="line"><span style="color:#24292E;">   public static final int _1MB = 1024 * 1024;</span></span>
<span class="line"><span style="color:#24292E;">   static List&lt;</span><span style="color:#B31D28;font-style:italic;">byte[]</span><span style="color:#24292E;">&gt; byteList = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">   private static void oom(HttpExchange exchange) {</span></span>
<span class="line"><span style="color:#24292E;">       try {</span></span>
<span class="line"><span style="color:#24292E;">           String response = &quot;oom begin!&quot;;</span></span>
<span class="line"><span style="color:#24292E;">           exchange.sendResponseHeaders(200, response.getBytes().length);</span></span>
<span class="line"><span style="color:#24292E;">           OutputStream os = exchange.getResponseBody();</span></span>
<span class="line"><span style="color:#24292E;">           os.write(response.getBytes());</span></span>
<span class="line"><span style="color:#24292E;">           os.close();</span></span>
<span class="line"><span style="color:#24292E;">       } catch (Exception ex) {</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">       for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#24292E;">           byte[] bytes = new byte[_1MB];</span></span>
<span class="line"><span style="color:#24292E;">           byteList.add(bytes);</span></span>
<span class="line"><span style="color:#24292E;">           System.out.println(i + &quot;MB&quot;);</span></span>
<span class="line"><span style="color:#24292E;">           memPrint();</span></span>
<span class="line"><span style="color:#24292E;">           try {</span></span>
<span class="line"><span style="color:#24292E;">               Thread.sleep(1000);</span></span>
<span class="line"><span style="color:#24292E;">           } catch (Exception e) {</span></span>
<span class="line"><span style="color:#24292E;">           }</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   static void memPrint() {</span></span>
<span class="line"><span style="color:#24292E;">       for (MemoryPoolMXBean memoryPoolMXBean : ManagementFactory.getMemoryPoolMXBeans()) {</span></span>
<span class="line"><span style="color:#24292E;">           System.out.println(memoryPoolMXBean.getName() +</span></span>
<span class="line"><span style="color:#24292E;">                   &quot;  committed:&quot; + memoryPoolMXBean.getUsage().getCommitted() +</span></span>
<span class="line"><span style="color:#24292E;">                   &quot;  used:&quot; + memoryPoolMXBean.getUsage().getUsed());</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   private static void srv() throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">       HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);</span></span>
<span class="line"><span style="color:#24292E;">       HttpContext context = server.createContext(&quot;/&quot;);</span></span>
<span class="line"><span style="color:#24292E;">       context.setHandler(OOMTest::oom);</span></span>
<span class="line"><span style="color:#24292E;">       server.start();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   public static void main(String[] args) throws Exception{</span></span>
<span class="line"><span style="color:#24292E;">       srv();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>我们使用 CMS 收集器进行垃圾回收，可以看到如下的信息。</p><br><p>命令：</p><p>java -Xmx20m -Xmn4m -XX:+UseConcMarkSweepGC -verbose:gc -Xlog:gc,</p><p>gc+ref=debug,gc+heap=debug,</p><p>gc+age=trace:file=/tmp/logs/gc_%p.log:tags,</p><p>uptime,</p><p>time,</p><p>level -Xlog:safepoint:file=/tmp/logs/safepoint_%p.log:tags,</p><p>uptime,</p><p>time,</p><p>level -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log -XX:-OmitStackTraceInFastThrow OOMTest</p><p>输出：</p><p>[0.025s][info][gc] Using Concurrent Mark Sweep</p><p>0MB</p><p>CodeHeap &#39;non-nmethods&#39; committed:2555904 used:1120512</p><p>Metaspace committed:4980736 used:854432</p><p>CodeHeap &#39;profiled nmethods&#39; committed:2555904 used:265728</p><p>Compressed Class Space committed:524288 used:96184</p><p>Par Eden Space committed:3407872 used:2490984</p><p>Par Survivor Space committed:393216 used:0</p><p>CodeHeap &#39;non-profiled nmethods&#39; committed:2555904 used:78592</p><p>CMS Old Gen committed:16777216 used:0</p><p>...省略</p><p>[16.377s][info][gc] GC(9) Concurrent Mark 1.592ms</p><p>[16.377s][info][gc] GC(9) Concurrent Preclean</p><p>[16.378s][info][gc] GC(9) Concurrent Preclean 0.721ms</p><p>[16.378s][info][gc] GC(9) Concurrent Abortable Preclean</p><p>[16.378s][info][gc] GC(9) Concurrent Abortable Preclean 0.006ms</p><p>[16.378s][info][gc] GC(9) Pause Remark 17M-&gt;17M(19M) 0.344ms</p><p>[16.378s][info][gc] GC(9) Concurrent Sweep</p><p>[16.378s][info][gc] GC(9) Concurrent Sweep 0.248ms</p><p>[16.378s][info][gc] GC(9) Concurrent Reset</p><p>[16.378s][info][gc] GC(9) Concurrent Reset 0.013ms</p><p>17MB</p><p>CodeHeap &#39;non-nmethods&#39; committed:2555904 used:1120512</p><p>Metaspace committed:4980736 used:883760</p><p>CodeHeap &#39;profiled nmethods&#39; committed:2555904 used:422016</p><p>Compressed Class Space committed:524288 used:92432</p><p>Par Eden Space committed:3407872 used:3213392</p><p>Par Survivor Space committed:393216 used:0</p><p>CodeHeap &#39;non-profiled nmethods&#39; committed:2555904 used:88064</p><p>CMS Old Gen committed:16777216 used:16452312</p><p>[18.380s][info][gc] GC(10) Pause Initial Mark 18M-&gt;18M(19M) 0.187ms</p><p>[18.380s][info][gc] GC(10) Concurrent Mark</p><p>[18.384s][info][gc] GC(11) Pause Young (Allocation Failure) 18M-&gt;18M(19M) 0.186ms</p><p>[18.386s][info][gc] GC(10) Concurrent Mark 5.435ms</p><p>[18.395s][info][gc] GC(12) Pause Full (Allocation Failure) 18M-&gt;18M(19M) 10.572ms</p><p>[18.400s][info][gc] GC(13) Pause Full (Allocation Failure) 18M-&gt;18M(19M) 5.348ms</p><p>Exception in thread &quot;main&quot; java.lang.OutOfMemoryError: Java heap space</p><p>at OldOOM.main(OldOOM.java:20)</p><p>最后 JVM 在一阵疯狂的 GC 日志输出后，进程停止了。在现实情况中，JVM 在停止工作之前，很多会垂死挣扎一段时间，这个时候，GC 线程会造成 CPU 飙升，但其实它已经不能工作了。</p><br><p>VisualVM 的截图展示了这个溢出结果。可以看到 Eden 区刚开始还是运行平稳的，内存泄漏之后就开始疯狂回收（其实是提升），老年代内存一直增长，直到 OOM。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/65/E6/Cgq2xl5DytGAc09TAAFdBh0n9eo313.jpg" alt=""></p><p>很多参数会影响对象的分配行为，但不是非常必要，我们一般不去调整它们。为了观察这些参数的默认值，我们通常使用 -XX:+PrintFlagsFinal 参数，输出一些设置信息。</p><br><p>命令：</p><h1 id="java-xx-printflagsfinal-2-1-grep-survivorratio" tabindex="-1">java -XX:+PrintFlagsFinal 2&gt;&amp;1 | grep SurvivorRatio <a class="header-anchor" href="#java-xx-printflagsfinal-2-1-grep-survivorratio" aria-label="Permalink to &quot;java -XX:+PrintFlagsFinal 2\\&gt;\\&amp;1 \\| grep SurvivorRatio&quot;">​</a></h1><p>uintx SurvivorRatio = 8 {product} {default}</p><br><p>Java13 输出了几百个参数和默认值，我们通过修改一些参数来观测一些不同的行为。</p><br><p><strong>NewRatio</strong> 默认值为 2，表示年轻代是老年代的 1/2。追加参数 &quot;-XX:NewRatio=1&quot;，可以把年轻代和老年代的空间大小调成一样大。在实践中，我们一般使用 -Xmn 来设置一个固定值。注意，这两个参数不要用在 G1 垃圾回收器中。</p><br><p><strong>SurvivorRatio</strong> 默认值为 8。表示伊甸区和幸存区的比例。在上面的例子中，Eden 的内存大小为：0.8*4MB。S 分区不到 1MB，根本存不下我们的 1MB 数据。</p><br><p><strong>MaxTenuringThreshold</strong> 这个值在 CMS 下默认为 6，G1 下默认为 15。这是因为 G1 存在动态阈值计算。这个值和我们前面提到的对象提升有关，如果你想要对象尽量长的时间存在于年轻代，则在 CMS 中，可以把它调整到 15。</p><br><p>java -XX:+PrintFlagsFinal -XX:+UseConcMarkSweepGC 2&gt;&amp;1 | grep MaxTenuringThreshold</p><p>java -XX:+PrintFlagsFinal -XX:+UseG1GC 2&gt;&amp;1 | grep MaxTenuringThreshold</p><br><p><strong>PretenureSizeThreshold</strong> 这个参数默认值是 0，意味着所有的对象年轻代优先分配。我们把这个值调小一点，再观测 JVM 的行为。追加参数 -XX:PretenureSizeThreshold=1024，可以看到 VisualVm 中老年代的区域增长。</p><br><p><strong>TargetSurvivorRatio</strong> 默认值为 50。在动态计算对象提升阈值的时候使用。计算时，会从年龄最小的对象开始累加，如果累加的对象大小大于幸存区的一半，则将当前的对象 age 作为新的阈值，年龄大于此阈值的对象直接进入老年代。工作中不建议调整这个值，如果要调，请调成比 50 大的值。</p><br><p>你可以尝试着更改其他参数，比如垃圾回收器的种类，动态看一下效果。尤其注意每一项内存区域的内容变动，你会对垃圾回收器有更好的理解。</p><br><p><strong>UseAdaptiveSizePolicy</strong> ，因为它和 CMS 不兼容，所以 CMS 下默认为 false，但 G1 下默认为 true。这是一个非常智能的参数，它是用来自适应调整空间大小的参数。它会在每次 GC 之后，重新计算 Eden、From、To 的大小。很多人在 Java 8 的一些配置中会见到这个参数，但其实在 CMS 和 G1 中是不需要显式设置的。</p><br><p>值的注意的是，Java 8 默认垃圾回收器是 Parallel Scavenge，它的这个参数是默认开启的，有可能会发生把幸存区自动调小的可能，造成一些问题，显式的设置 SurvivorRatio 可以解决这个问题。</p><br><p>下面这张截图，是切换到 G1 之后的效果。</p><p>java -Xmx20m -XX:+UseG1GC -verbose:gc -Xlog:gc,gc+ref=debug,gc+heap=debug,gc+age=trace:file=/tmp/logs/gc_%p.log:tags,uptime,time,level -Xlog:safepoint:file=/tmp/logs/safepoint_%p.log:tags,uptime,time,level -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log -XX:-OmitStackTraceInFastThrow OOMTest</p><p><img src="https://s0.lgstatic.com/i/image3/M01/65/E5/CgpOIF5DytKAIL4RAAE2rXZgveA253.jpg" alt=""></p><p>可以通过下面这个命令调整小堆区的大小，来看一下这个过程。</p><p>-XX:G1HeapRegionSize=&lt;N&gt;M</p><h2 id="元空间溢出" tabindex="-1">元空间溢出 <a class="header-anchor" href="#元空间溢出" aria-label="Permalink to &quot;元空间溢出&quot;">​</a></h2><p>堆一般都是指定大小的，但元空间不是。所以如果元空间发生内存溢出会更加严重，会造成操作系统的内存溢出。我们在使用的时候，也会给它设置一个上限 for safe。</p><br><p>元空间溢出主要是由于加载的类太多，或者动态生成的类太多。下面是一段模拟代码。通过访问 <a href="http://localhost:8888" target="_blank" rel="noreferrer">http://localhost:8888</a> 触发后，它将会发生元空间溢出。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpContext;</span></span>
<span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpExchange;</span></span>
<span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpServer;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.io.OutputStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.reflect.InvocationHandler;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.reflect.Method;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.reflect.Proxy;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.net.InetSocketAddress;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.net.URL;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.net.URLClassLoader;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.HashMap;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.Map;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class MetaspaceOOMTest {</span></span>
<span class="line"><span style="color:#E1E4E8;">   public interface Facade {</span></span>
<span class="line"><span style="color:#E1E4E8;">       void m(String input);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static class FacadeImpl implements Facade {</span></span>
<span class="line"><span style="color:#E1E4E8;">       @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">       public void m(String name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static class MetaspaceFacadeInvocationHandler implements InvocationHandler {</span></span>
<span class="line"><span style="color:#E1E4E8;">       private Object impl;</span></span>
<span class="line"><span style="color:#E1E4E8;">       public MetaspaceFacadeInvocationHandler(Object impl) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           this.impl = impl;</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">       @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">       public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {</span></span>
<span class="line"><span style="color:#E1E4E8;">           return method.invoke(impl, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static Map&lt;</span><span style="color:#FDAEB7;font-style:italic;">String,</span><span style="color:#B392F0;"> Facade</span><span style="color:#E1E4E8;">&gt; classLeakingMap = new HashMap&lt;</span><span style="color:#FDAEB7;font-style:italic;">String,</span><span style="color:#B392F0;"> Facade</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static void oom(HttpExchange exchange) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       try {</span></span>
<span class="line"><span style="color:#E1E4E8;">           String response = &quot;oom begin!&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">           exchange.sendResponseHeaders(200, response.getBytes().length);</span></span>
<span class="line"><span style="color:#E1E4E8;">           OutputStream os = exchange.getResponseBody();</span></span>
<span class="line"><span style="color:#E1E4E8;">           os.write(response.getBytes());</span></span>
<span class="line"><span style="color:#E1E4E8;">           os.close();</span></span>
<span class="line"><span style="color:#E1E4E8;">       } catch (Exception ex) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">       try {</span></span>
<span class="line"><span style="color:#E1E4E8;">           for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">               String jar = &quot;file:&quot; + i + &quot;.jar&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">               URL[] urls = new URL[]{new URL(jar)};</span></span>
<span class="line"><span style="color:#E1E4E8;">               URLClassLoader newClassLoader = new URLClassLoader(urls);</span></span>
<span class="line"><span style="color:#E1E4E8;">               Facade t = (Facade) Proxy.newProxyInstance(newClassLoader,</span></span>
<span class="line"><span style="color:#E1E4E8;">                       new Class</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">?&gt;[]{Facade.class},</span></span>
<span class="line"><span style="color:#E1E4E8;">                       new MetaspaceFacadeInvocationHandler(new FacadeImpl()));</span></span>
<span class="line"><span style="color:#E1E4E8;">               classLeakingMap.put(jar, t);</span></span>
<span class="line"><span style="color:#E1E4E8;">           }</span></span>
<span class="line"><span style="color:#E1E4E8;">       } catch (Exception e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static void srv() throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">       HttpContext context = server.createContext(&quot;/&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">       context.setHandler(MetaspaceOOMTest::oom);</span></span>
<span class="line"><span style="color:#E1E4E8;">       server.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       srv();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpContext;</span></span>
<span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpExchange;</span></span>
<span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpServer;</span></span>
<span class="line"><span style="color:#24292E;">import java.io.OutputStream;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.reflect.InvocationHandler;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.reflect.Method;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.reflect.Proxy;</span></span>
<span class="line"><span style="color:#24292E;">import java.net.InetSocketAddress;</span></span>
<span class="line"><span style="color:#24292E;">import java.net.URL;</span></span>
<span class="line"><span style="color:#24292E;">import java.net.URLClassLoader;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.HashMap;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.Map;</span></span>
<span class="line"><span style="color:#24292E;">public class MetaspaceOOMTest {</span></span>
<span class="line"><span style="color:#24292E;">   public interface Facade {</span></span>
<span class="line"><span style="color:#24292E;">       void m(String input);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   public static class FacadeImpl implements Facade {</span></span>
<span class="line"><span style="color:#24292E;">       @Override</span></span>
<span class="line"><span style="color:#24292E;">       public void m(String name) {</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   public static class MetaspaceFacadeInvocationHandler implements InvocationHandler {</span></span>
<span class="line"><span style="color:#24292E;">       private Object impl;</span></span>
<span class="line"><span style="color:#24292E;">       public MetaspaceFacadeInvocationHandler(Object impl) {</span></span>
<span class="line"><span style="color:#24292E;">           this.impl = impl;</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">       @Override</span></span>
<span class="line"><span style="color:#24292E;">       public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {</span></span>
<span class="line"><span style="color:#24292E;">           return method.invoke(impl, args);</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   private static Map&lt;</span><span style="color:#B31D28;font-style:italic;">String,</span><span style="color:#6F42C1;"> Facade</span><span style="color:#24292E;">&gt; classLeakingMap = new HashMap&lt;</span><span style="color:#B31D28;font-style:italic;">String,</span><span style="color:#6F42C1;"> Facade</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">   private static void oom(HttpExchange exchange) {</span></span>
<span class="line"><span style="color:#24292E;">       try {</span></span>
<span class="line"><span style="color:#24292E;">           String response = &quot;oom begin!&quot;;</span></span>
<span class="line"><span style="color:#24292E;">           exchange.sendResponseHeaders(200, response.getBytes().length);</span></span>
<span class="line"><span style="color:#24292E;">           OutputStream os = exchange.getResponseBody();</span></span>
<span class="line"><span style="color:#24292E;">           os.write(response.getBytes());</span></span>
<span class="line"><span style="color:#24292E;">           os.close();</span></span>
<span class="line"><span style="color:#24292E;">       } catch (Exception ex) {</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">       try {</span></span>
<span class="line"><span style="color:#24292E;">           for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#24292E;">               String jar = &quot;file:&quot; + i + &quot;.jar&quot;;</span></span>
<span class="line"><span style="color:#24292E;">               URL[] urls = new URL[]{new URL(jar)};</span></span>
<span class="line"><span style="color:#24292E;">               URLClassLoader newClassLoader = new URLClassLoader(urls);</span></span>
<span class="line"><span style="color:#24292E;">               Facade t = (Facade) Proxy.newProxyInstance(newClassLoader,</span></span>
<span class="line"><span style="color:#24292E;">                       new Class</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">?&gt;[]{Facade.class},</span></span>
<span class="line"><span style="color:#24292E;">                       new MetaspaceFacadeInvocationHandler(new FacadeImpl()));</span></span>
<span class="line"><span style="color:#24292E;">               classLeakingMap.put(jar, t);</span></span>
<span class="line"><span style="color:#24292E;">           }</span></span>
<span class="line"><span style="color:#24292E;">       } catch (Exception e) {</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   private static void srv() throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">       HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);</span></span>
<span class="line"><span style="color:#24292E;">       HttpContext context = server.createContext(&quot;/&quot;);</span></span>
<span class="line"><span style="color:#24292E;">       context.setHandler(MetaspaceOOMTest::oom);</span></span>
<span class="line"><span style="color:#24292E;">       server.start();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">       srv();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br></div></div><p>这段代码将使用 Java 自带的动态代理类，不断的生成新的 class。</p><br><p>java -Xmx20m -Xmn4m -XX:+UseG1GC -verbose:gc -Xlog:gc,gc+ref=debug,gc+heap=debug,gc+age=trace:file=/tmp/logs/gc_%p.log:tags,uptime,time,level -Xlog:safepoint:file=/tmp/logs/safepoint_%p.log:tags,uptime,time,level -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log -XX:-OmitStackTraceInFastThrow -XX:MetaspaceSize=16M -XX:MaxMetaspaceSize=16M MetaspaceOOMTest</p><br><p>我们在启动的时候，限制 Metaspace 空间大小为 16MB。可以看到运行一小会之后，Metaspace 会发生内存溢出。</p><br><p>[6.509s][info][gc] GC(28) Pause Young (Concurrent Start) (Metadata GC Threshold) 9M-&gt;9M(20M) 1.186ms</p><p>[6.509s][info][gc] GC(30) Concurrent Cycle</p><p>[6.534s][info][gc] GC(29) Pause Full (Metadata GC Threshold) 9M-&gt;9M(20M) 25.165ms</p><p>[6.556s][info][gc] GC(31) Pause Full (Metadata GC Clear Soft References) 9M-&gt;9M(20M) 21.136ms</p><p>[6.556s][info][gc] GC(30) Concurrent Cycle 46.668ms</p><p>java.lang.OutOfMemoryError: Metaspace</p><p>Dumping heap to /tmp/logs/java_pid36723.hprof ...</p><p>Heap dump file created [17362313 bytes in 0.134 secs]</p><p><img src="https://s0.lgstatic.com/i/image3/M01/65/E6/Cgq2xl5DytKAMGfeAAE5q9rh1rM558.jpg" alt=""></p><p>但假如你把堆 Metaspace 的限制给去掉，会更可怕。它占用的内存会一直增长。</p><h2 id="堆外内存溢出" tabindex="-1">堆外内存溢出 <a class="header-anchor" href="#堆外内存溢出" aria-label="Permalink to &quot;堆外内存溢出&quot;">​</a></h2><p>严格来说，上面的 Metaspace 也是属于堆外内存的。但是我们这里的堆外内存指的是 Java 应用程序通过直接方式从操作系统中申请的内存。所以严格来说，这里是指直接内存。</p><p>程序将通过 ByteBuffer 的 allocateDirect 方法每 1 秒钟申请 1MB 的直接内存。不要忘了通过链接触发这个过程。</p><br><p>但是，使用 VisualVM 看不到这个过程，使用 JMX 的 API 同样也看不到。关于这部分内容，我们将在堆外内存排查课时进行详细介绍。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpContext;</span></span>
<span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpExchange;</span></span>
<span class="line"><span style="color:#E1E4E8;">import com.sun.net.httpserver.HttpServer;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.io.OutputStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.management.ManagementFactory;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.management.MemoryPoolMXBean;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.net.InetSocketAddress;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.nio.ByteBuffer;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.ArrayList;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.List;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class OffHeapOOMTest {</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static final int _1MB = 1024 * 1024;</span></span>
<span class="line"><span style="color:#E1E4E8;">   static List&lt;</span><span style="color:#FDAEB7;font-style:italic;">ByteBuffer</span><span style="color:#E1E4E8;">&gt; byteList = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static void oom(HttpExchange exchange) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       try {</span></span>
<span class="line"><span style="color:#E1E4E8;">           String response = &quot;oom begin!&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">           exchange.sendResponseHeaders(200, response.getBytes().length);</span></span>
<span class="line"><span style="color:#E1E4E8;">           OutputStream os = exchange.getResponseBody();</span></span>
<span class="line"><span style="color:#E1E4E8;">           os.write(response.getBytes());</span></span>
<span class="line"><span style="color:#E1E4E8;">           os.close();</span></span>
<span class="line"><span style="color:#E1E4E8;">       } catch (Exception ex) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">       for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           ByteBuffer buffer = ByteBuffer.allocateDirect(_1MB);</span></span>
<span class="line"><span style="color:#E1E4E8;">           byteList.add(buffer);</span></span>
<span class="line"><span style="color:#E1E4E8;">           System.out.println(i + &quot;MB&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">           memPrint();</span></span>
<span class="line"><span style="color:#E1E4E8;">           try {</span></span>
<span class="line"><span style="color:#E1E4E8;">               Thread.sleep(1000);</span></span>
<span class="line"><span style="color:#E1E4E8;">           } catch (Exception e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           }</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   private static void srv() throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">       HttpContext context = server.createContext(&quot;/&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">       context.setHandler(OffHeapOOMTest::oom);</span></span>
<span class="line"><span style="color:#E1E4E8;">       server.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       srv();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   static void memPrint() {</span></span>
<span class="line"><span style="color:#E1E4E8;">       for (MemoryPoolMXBean memoryPoolMXBean : ManagementFactory.getMemoryPoolMXBeans()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           System.out.println(memoryPoolMXBean.getName() +</span></span>
<span class="line"><span style="color:#E1E4E8;">                   &quot;  committed:&quot; + memoryPoolMXBean.getUsage().getCommitted() +</span></span>
<span class="line"><span style="color:#E1E4E8;">                   &quot;  used:&quot; + memoryPoolMXBean.getUsage().getUsed());</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpContext;</span></span>
<span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpExchange;</span></span>
<span class="line"><span style="color:#24292E;">import com.sun.net.httpserver.HttpServer;</span></span>
<span class="line"><span style="color:#24292E;">import java.io.OutputStream;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.management.ManagementFactory;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.management.MemoryPoolMXBean;</span></span>
<span class="line"><span style="color:#24292E;">import java.net.InetSocketAddress;</span></span>
<span class="line"><span style="color:#24292E;">import java.nio.ByteBuffer;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.ArrayList;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.List;</span></span>
<span class="line"><span style="color:#24292E;">public class OffHeapOOMTest {</span></span>
<span class="line"><span style="color:#24292E;">   public static final int _1MB = 1024 * 1024;</span></span>
<span class="line"><span style="color:#24292E;">   static List&lt;</span><span style="color:#B31D28;font-style:italic;">ByteBuffer</span><span style="color:#24292E;">&gt; byteList = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">   private static void oom(HttpExchange exchange) {</span></span>
<span class="line"><span style="color:#24292E;">       try {</span></span>
<span class="line"><span style="color:#24292E;">           String response = &quot;oom begin!&quot;;</span></span>
<span class="line"><span style="color:#24292E;">           exchange.sendResponseHeaders(200, response.getBytes().length);</span></span>
<span class="line"><span style="color:#24292E;">           OutputStream os = exchange.getResponseBody();</span></span>
<span class="line"><span style="color:#24292E;">           os.write(response.getBytes());</span></span>
<span class="line"><span style="color:#24292E;">           os.close();</span></span>
<span class="line"><span style="color:#24292E;">       } catch (Exception ex) {</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">       for (int i = 0; ; i++) {</span></span>
<span class="line"><span style="color:#24292E;">           ByteBuffer buffer = ByteBuffer.allocateDirect(_1MB);</span></span>
<span class="line"><span style="color:#24292E;">           byteList.add(buffer);</span></span>
<span class="line"><span style="color:#24292E;">           System.out.println(i + &quot;MB&quot;);</span></span>
<span class="line"><span style="color:#24292E;">           memPrint();</span></span>
<span class="line"><span style="color:#24292E;">           try {</span></span>
<span class="line"><span style="color:#24292E;">               Thread.sleep(1000);</span></span>
<span class="line"><span style="color:#24292E;">           } catch (Exception e) {</span></span>
<span class="line"><span style="color:#24292E;">           }</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   private static void srv() throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">       HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);</span></span>
<span class="line"><span style="color:#24292E;">       HttpContext context = server.createContext(&quot;/&quot;);</span></span>
<span class="line"><span style="color:#24292E;">       context.setHandler(OffHeapOOMTest::oom);</span></span>
<span class="line"><span style="color:#24292E;">       server.start();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">       srv();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   static void memPrint() {</span></span>
<span class="line"><span style="color:#24292E;">       for (MemoryPoolMXBean memoryPoolMXBean : ManagementFactory.getMemoryPoolMXBeans()) {</span></span>
<span class="line"><span style="color:#24292E;">           System.out.println(memoryPoolMXBean.getName() +</span></span>
<span class="line"><span style="color:#24292E;">                   &quot;  committed:&quot; + memoryPoolMXBean.getUsage().getCommitted() +</span></span>
<span class="line"><span style="color:#24292E;">                   &quot;  used:&quot; + memoryPoolMXBean.getUsage().getUsed());</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><p>通过 top 或者操作系统的监控工具，能够看到内存占用的明显增长。为了限制这些危险的内存申请，如果你确定在自己的程序中用到了大量的 JNI 和 JNA 操作，要显式的设置 MaxDirectMemorySize 参数。</p><br><p>以下是程序运行一段时间抛出的错误。</p><p>Exception in thread &quot;Thread-2&quot; java.lang.OutOfMemoryError: Direct buffer memory</p><p>at java.nio.Bits.reserveMemory(Bits.java:694)</p><p>at java.nio.DirectByteBuffer.&lt;init&gt;(DirectByteBuffer.java:123)</p><p>at java.nio.ByteBuffer.allocateDirect(ByteBuffer.java:311)</p><p>at OffHeapOOMTest.oom(OffHeapOOMTest.java:27)</p><p>at com.sun.net.httpserver.Filter$Chain.doFilter(Filter.java:79)</p><p>at sun.net.httpserver.AuthFilter.doFilter(AuthFilter.java:83)</p><p>at com.sun.net.httpserver.Filter$Chain.doFilter(Filter.java:82)</p><p>at sun.net.httpserver.ServerImpl$Exchange$LinkHandler.handle(ServerImpl.java:675)</p><p>at com.sun.net.httpserver.Filter$Chain.doFilter(Filter.java:79)</p><p>at sun.net.httpserver.ServerImpl$Exchange.run(ServerImpl.java:647)</p><p>at sun.net.httpserver.ServerImpl$DefaultExecutor.execute(ServerImpl.java:158)</p><p>at sun.net.httpserver.ServerImpl$Dispatcher.handle(ServerImpl.java:431)</p><p>at sun.net.httpserver.ServerImpl$Dispatcher.run(ServerImpl.java:396)</p><p>at java.lang.Thread.run(Thread.java:748)</p><p>启动命令。</p><p>java -XX:MaxDirectMemorySize=10M -Xmx10M OffHeapOOMTest</p><h2 id="栈溢出" tabindex="-1">栈溢出 <a class="header-anchor" href="#栈溢出" aria-label="Permalink to &quot;栈溢出&quot;">​</a></h2><p>还记得我们的虚拟机栈么？栈溢出指的就是这里的数据太多造成的泄漏。通过 -Xss 参数可以设置它的大小。比如下面的命令就是设置栈大小为 128K。</p><br><p>-Xss128K</p><br><p>从这里我们也能了解到，由于每个线程都有一个虚拟机栈。线程的开销也是要占用内存的。如果系统中的线程数量过多，那么占用内存的大小也是非常可观的。</p><br><p>栈溢出不会造成 JVM 进程死亡，危害&quot;相对较小&quot;。下面是一个简单的模拟栈溢出的代码，只需要递归调用就可以了。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class StackOverflowTest {</span></span>
<span class="line"><span style="color:#E1E4E8;">   static int count = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">   static void a() {</span></span>
<span class="line"><span style="color:#E1E4E8;">       System.out.println(count);</span></span>
<span class="line"><span style="color:#E1E4E8;">       count++;</span></span>
<span class="line"><span style="color:#E1E4E8;">       b();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   static void b() {</span></span>
<span class="line"><span style="color:#E1E4E8;">       System.out.println(count);</span></span>
<span class="line"><span style="color:#E1E4E8;">       count++;</span></span>
<span class="line"><span style="color:#E1E4E8;">       a();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       a();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class StackOverflowTest {</span></span>
<span class="line"><span style="color:#24292E;">   static int count = 0;</span></span>
<span class="line"><span style="color:#24292E;">   static void a() {</span></span>
<span class="line"><span style="color:#24292E;">       System.out.println(count);</span></span>
<span class="line"><span style="color:#24292E;">       count++;</span></span>
<span class="line"><span style="color:#24292E;">       b();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   static void b() {</span></span>
<span class="line"><span style="color:#24292E;">       System.out.println(count);</span></span>
<span class="line"><span style="color:#24292E;">       count++;</span></span>
<span class="line"><span style="color:#24292E;">       a();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">       a();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>运行后，程序直接报错。</p><p>Exception in thread &quot;main&quot; java.lang.StackOverflowError</p><p>at java.io.PrintStream.write(PrintStream.java:526)</p><p>at java.io.PrintStream.print(PrintStream.java:597)</p><p>at java.io.PrintStream.println(PrintStream.java:736)</p><p>at StackOverflowTest.a(StackOverflowTest.java:5)</p><p>如果你的应用经常发生这种情况，可以试着调大这个值。但一般都是因为程序错误引起的，最好检查一下自己的代码。</p><h2 id="进程异常退出" tabindex="-1">进程异常退出 <a class="header-anchor" href="#进程异常退出" aria-label="Permalink to &quot;进程异常退出&quot;">​</a></h2><p>上面这几种溢出场景，都有明确的原因和报错，排查起来也是非常容易的。但是还有一类应用，死亡的时候，静悄悄的，什么都没留下。</p><br><p>以下问题已经不止一个同学问了：<strong>我的 Java 进程没了，什么都没留下，直接蒸发不见了</strong></p><p>why？是因为对象太多了么？</p><br><p>这是趣味性和技巧性非常突出的一个问题。让我们执行 dmesg 命令，大概率会看到你的进程崩溃信息躺在那里。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/65/E5/CgpOIF5DytKAL-kVAAEITZsHixY196.jpg" alt=""></p><p>为了能看到发生的时间，我们习惯性加上参数 T（dmesg -T）。</p><br><p>这个现象，其实和 Linux 的内存管理有关。由于 Linux 系统采用的是虚拟内存分配方式，JVM 的代码、库、堆和栈的使用都会消耗内存，但是申请出来的内存，只要没真正 access过，是不算的，因为没有真正为之分配物理页面。</p><br><p>随着使用内存越用越多。第一层防护墙就是 SWAP；当 SWAP 也用的差不多了，会尝试释放 cache；当这两者资源都耗尽，杀手就出现了。oom-killer 会在系统内存耗尽的情况下跳出来，选择性的干掉一些进程以求释放一点内存。</p><br><p>所以这时候我们的 Java 进程，是操作系统&quot;主动&quot;终结的，JVM 连发表遗言的机会都没有。这个信息，只能在操作系统日志里查找。</p><br><p>要解决这种问题，首先不能太贪婪。比如一共 8GB 的机器，你把整整 7.5GB 都分配给了 JVM。当操作系统内存不足时，你的 JVM 就可能成为 oom-killer 的猎物。</p><br><p>相对于被动终结，还有一种主动求死的方式。有些同学，会在程序里面做一些判断，直接调用 System.exit() 函数。</p><br><p>这个函数危险得很，它将强制终止我们的应用，而且什么都不会留下。你应该扫描你的代码，确保这样的逻辑不会存在。</p><br><p>再聊一种最初级最常见还经常发生的，会造成应用程序意外死亡的情况，那就是对 Java 程序错误的启动方式。</p><br><p>很多同学对 Linux 不是很熟悉，使用 XShell 登陆之后，调用下面的命令进行启动。</p><p>java com.cn.AA &amp;</p><br><p>这样调用还算有点意识，在最后使用了&quot;&amp;&quot;号，以期望进程在后台运行。但可惜的是，很多情况下，随着 XShell Tab 页的关闭，或者等待超时，后面的 Java 进程就随着一块停止了，很让人困惑。</p><br><p>正确的启动方式，就是使用 nohup 关键字，或者阻塞在其他更加长命的进程里（比如docker）。</p><p>nohup java com.cn.AA &amp;</p><br><p>进程这种静悄悄的死亡方式，通常会给我们的问题排查带来更多的困难。</p><br><p>在发生问题时，要确保留下了足够的证据，来支持接下来的分析。不能喊一句&quot;出事啦&quot;，然后就陷入无从下手的尴尬境地。</p><br><p>通常，我们在关闭服务的时候，会使用&quot;kill -15&quot;，而不是&quot;kill -9&quot;，以便让服务在临死之前喘口气。信号9和15的区别，是面试经常问的一个问题，也是一种非常有效的手段。</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本课时我们简单模拟了堆、元空间、栈的溢出。并使用 VisualVM 观察了这个过程。</p><br><p>接下来，我们了解到进程静悄悄消失的三种情况。如果你的应用也这样消失过，试着这样找找它。这三种情况也是一个故障排查流程中要考虑的环节，属于非常重要的边缘检查点。相信聪明的你，会将这些情况揉进自己的面试体系去，真正成为自己的实战经验。</p>`,207),t=[l];function r(o,c,i,E,m,u){return n(),a("div",null,t)}const g=s(e,[["render",r]]);export{b as __pageData,g as default};
