import{_ as e,j as t,o,g as i,k as a,h as l,Q as p,s}from"./chunks/framework.cfb14fe0.js";const w=JSON.parse('{"title":"第22讲：动手实践：JIT参数配置如何影响程序运行？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1047) 第22讲：动手实践：JIT 参数配置如何影响程序运行？.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1047) 第22讲：动手实践：JIT 参数配置如何影响程序运行？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1047) 第22讲：动手实践：JIT 参数配置如何影响程序运行？.md"},r=p('<h1 id="第22讲-动手实践-jit参数配置如何影响程序运行" tabindex="-1">第22讲：动手实践：JIT参数配置如何影响程序运行？ <a class="header-anchor" href="#第22讲-动手实践-jit参数配置如何影响程序运行" aria-label="Permalink to &quot;第22讲：动手实践：JIT参数配置如何影响程序运行？&quot;">​</a></h1><br><p>本课时我们主要分享一个实践案例，JIT 参数配置是如何影响程序运行的。</p><br><p>我们在前面的课时中介绍了很多字节码指令，这也是 Java 能够跨平台的保证。程序在运行的时候，这些指令会按照顺序解释执行，但是，这种解释执行的方式是非常低效的，它需要把字节码先<strong>翻译</strong>成机器码，才能往下执行。另外，字节码是 Java 编译器做的一次初级优化，许多代码可以满足语法分析，但还有很大的优化空间。</p><br><p>所以，为了提高热点代码的执行效率，在运行时，虚拟机将会把这些代码编译成与本地平台相关的机器码，并进行各种层次的优化。完成这个任务的编译器，就称为<strong>即时编译器</strong> （Just In Time Compiler），简称<strong>JIT 编译器</strong>。</p><br><p>热点代码，就是那些被频繁调用的代码，比如调用次数很高或者在 for 循环里的那些代码。这些再次编译后的机器码会被缓存起来，以备下次使用，但对于那些执行次数很少的代码来说，这种编译动作就纯属浪费。</p><br><p>在第 14 课时我们提到了参数&quot;-XX:ReservedCodeCacheSize&quot;，用来限制 CodeCache 的大小。也就是说，JIT 编译后的代码都会放在 CodeCache 里。</p><br><p>如果这个空间不足，JIT 就无法继续编译，编译执行会变成解释执行，性能会降低一个数量级。同时，JIT 编译器会一直尝试去优化代码，从而造成了 CPU 占用上升。</p><br>',14),E=p(`<h2 id="jitwatch" tabindex="-1">JITWatch <a class="header-anchor" href="#jitwatch" aria-label="Permalink to &quot;JITWatch&quot;">​</a></h2><p>在开始之前，我们首先介绍一个观察 JIT 执行过程的图形化工具：JITWatch，这个工具非常好用，可以解析 JIT 的日志并友好地展示出来。<a href="https://github.com/AdoptOpenJDK/jitwatch" target="_blank" rel="noreferrer">项目地址请点击这里查看</a>。</p><br><p>下载之后，进入解压目录，执行 ant 即可编译出执行文件。</p><h3 id="产生-jit-日志" tabindex="-1">产生 JIT 日志 <a class="header-anchor" href="#产生-jit-日志" aria-label="Permalink to &quot;产生 JIT 日志&quot;">​</a></h3><p>我们观察下面的一段代码，这段代码没有什么意义，而且写得很烂。在 test 函数中循环 cal 函数 1 千万次，在 cal 函数中，还有一些冗余的上锁操作和赋值操作，这些操作在解释执行的时候，会加重 JVM 的负担。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class JITDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Integer a = 1000;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public void setA(Integer a) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.a = a;    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public Integer getA() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return this.a;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public Integer cal(int num) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        synchronized (new Object()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Integer a = getA();</span></span>
<span class="line"><span style="color:#E1E4E8;">            int b = a * 10;</span></span>
<span class="line"><span style="color:#E1E4E8;">            b = a * 100;</span></span>
<span class="line"><span style="color:#E1E4E8;">            return b + num;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public int test() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        synchronized (new Object()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int total = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">            int count = 100_000_00;</span></span>
<span class="line"><span style="color:#E1E4E8;">            for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> count; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                total += cal(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">                if (i % 1000 == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.println(i * 1000);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            return total;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        JITDemo demo = new JITDemo();</span></span>
<span class="line"><span style="color:#E1E4E8;">        int total = demo.test();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class JITDemo {</span></span>
<span class="line"><span style="color:#24292E;">    Integer a = 1000;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public void setA(Integer a) {</span></span>
<span class="line"><span style="color:#24292E;">        this.a = a;    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public Integer getA() {</span></span>
<span class="line"><span style="color:#24292E;">        return this.a;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public Integer cal(int num) {</span></span>
<span class="line"><span style="color:#24292E;">        synchronized (new Object()) {</span></span>
<span class="line"><span style="color:#24292E;">            Integer a = getA();</span></span>
<span class="line"><span style="color:#24292E;">            int b = a * 10;</span></span>
<span class="line"><span style="color:#24292E;">            b = a * 100;</span></span>
<span class="line"><span style="color:#24292E;">            return b + num;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public int test() {</span></span>
<span class="line"><span style="color:#24292E;">        synchronized (new Object()) {</span></span>
<span class="line"><span style="color:#24292E;">            int total = 0;</span></span>
<span class="line"><span style="color:#24292E;">            int count = 100_000_00;</span></span>
<span class="line"><span style="color:#24292E;">            for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> count; i++) {</span></span>
<span class="line"><span style="color:#24292E;">                total += cal(i);</span></span>
<span class="line"><span style="color:#24292E;">                if (i % 1000 == 0) {</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.println(i * 1000);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            return total;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        JITDemo demo = new JITDemo();</span></span>
<span class="line"><span style="color:#24292E;">        int total = demo.test();</span></span></code></pre></div><br><p>在方法执行的时候，我们加上一系列参数，用来打印 JIT 最终生成的机器码，执行命令如下所示：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$JAVA_HOME_13/bin/java -server -XX:+UnlockDiagnosticVMOptions -XX:+TraceClassLoading  -XX:+PrintAssembly -XX:+LogCompilation -XX:LogFile=jitdemo.log JITDemo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$JAVA_HOME_13/bin/java -server -XX:+UnlockDiagnosticVMOptions -XX:+TraceClassLoading  -XX:+PrintAssembly -XX:+LogCompilation -XX:LogFile=jitdemo.log JITDemo</span></span></code></pre></div><br><p>执行的过程，会输入到 jitdemo.log 文件里，接下来我们分析这个文件。</p><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3>`,15),d=s("br",null,null,-1),y=s("p",null,"单击 open log 按钮，打开我们生成的日志文件。",-1),g=s("br",null,null,-1),u=s("br",null,null,-1),h=s("p",null,"单击 config 按钮，加入要分析的源代码目录和字节码目录。确认后，单击 start 按钮进行分析。",-1),b=s("br",null,null,-1),_=s("p",null,"在右侧找到我们的 test 方法，聚焦光标后，将弹出我们要分析的主要界面。",-1),C=s("br",null,null,-1),m=s("br",null,null,-1),v=s("p",null,"在同一个界面上，我们能够看到源代码、字节码、机器码的对应关系。在右上角，还有 C2/OSR/Level4 这样的字样，可以单击切换。",-1),T=s("br",null,null,-1),I=s("p",null,"单击上图中的 Chain 按钮，还会弹出一个依赖链界面，该界面显示了哪些方法已经被编译了、哪些被内联、哪些是通过普通的方法调用运行的。",-1),A=s("br",null,null,-1),f=s("br",null,null,-1),J=s("p",null,"使用 JITWatch 可以看到，调用了 1 千万次的 for 循环代码，已经被 C2 进行编译了。",-1),k=s("br",null,null,-1),X=p(`<h2 id="编译层次" tabindex="-1">编译层次 <a class="header-anchor" href="#编译层次" aria-label="Permalink to &quot;编译层次&quot;">​</a></h2><p>HotSpot 虚拟机包含多个即时编译器，有 C1、C2 和 Graal，采用的是分层编译的模式。使用 jstack 获得的线程信息，经常能看到它们的身影。</p><br><p>实验性质的 Graal 可以通过追加 JVM 参数进行开启，命令行如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$JAVA_HOME_13/bin/java -server -XX:+UnlockDiagnosticVMOptions -XX:+TraceClassLoading</span></span>
<span class="line"><span style="color:#E1E4E8;">  -XX:+PrintAssembly -XX:+LogCompilation -XX:+UnlockExperimentalVMOptions</span></span>
<span class="line"><span style="color:#E1E4E8;">   -XX:+UseJVMCICompiler -XX:LogFile=jitdemo.log JITDemo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$JAVA_HOME_13/bin/java -server -XX:+UnlockDiagnosticVMOptions -XX:+TraceClassLoading</span></span>
<span class="line"><span style="color:#24292E;">  -XX:+PrintAssembly -XX:+LogCompilation -XX:+UnlockExperimentalVMOptions</span></span>
<span class="line"><span style="color:#24292E;">   -XX:+UseJVMCICompiler -XX:LogFile=jitdemo.log JITDemo</span></span></code></pre></div><br><p>不同层次的编译器会产生不一样的效果，机器码也会不同，我们仅看 C1、C2 的一些特点。</p><br><p>JIT 编译方式有两种：一种是编译方法，另一种是编译循环。分层编译将 JVM 的执行状态分为了五个层次：</p><ul><li><p>字节码的解释执行；</p></li><li><p>执行不带 profiling 的 C1 代码；</p></li><li><p>执行仅带方法调用次数，以及循环执行次数 profiling 的 C1 代码；</p></li><li><p>执行带所有 profiling 的 C1 代码；</p></li><li><p>执行 C2 代码。</p></li></ul><br><p>其中，profiling 指的是运行时的程序执行状态数据，比如循环调用的次数、方法调用的次数、分支跳转次数、类型转换次数等。JDK 中的 hprof 工具就是一种 profiler。</p><br><p>在不启用分层编译的情况下，当方法的调用次数和循环回边的次数总和，超过由参数 -XX:CompileThreshold 指定的阈值时，便会触发即时编译；当启用分层编译时，这个参数将会失效，会采用动态调整的方式进行。</p><br><p>常见的优化方法有以下几种：</p><ul><li><p>公共子表达式消除</p></li><li><p>数组范围检查消除</p></li><li><p>方法内联</p></li><li><p>逃逸分析</p></li></ul><br><p>我们重点看一下方法内联和逃逸分析。</p><h2 id="方法内联" tabindex="-1">方法内联 <a class="header-anchor" href="#方法内联" aria-label="Permalink to &quot;方法内联&quot;">​</a></h2><p>在第 17 课时里，我们可以看到方法调用的开销是比较大的，尤其是在调用量非常大的情况下。拿简单的 getter/setter 方法来说，这种方法在 Java 代码中大量存在，我们在访问的时候，需要创建相应的栈帧，访问到需要的字段后，再弹出栈帧，恢复原程序的执行。</p><br><p>如果能够把这些对象的访问和操作，纳入到目标方法的调用范围之内，就少了一次方法调用，速度就能得到提升，这就是方法内联的概念。</p><br><p>C2 编译器会在解析字节码的过程中完成方法内联。内联后的代码和调用方法的代码，会组成新的机器码，存放在 CodeCache 区域里。</p><br><p>在 JDK 的源码里，有很多被 <strong>@ForceInline</strong> 注解的方法，这些方法会在执行的时候被强制进行内联；而被 <strong>@DontInline</strong> 注解的方法，则始终不会被内联，比如下面的一段代码。</p><br><p>java.lang.ClassLoader 的 getClassLoader 方法将会被强制内联。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@CallerSensitive</span></span>
<span class="line"><span style="color:#E1E4E8;">    @ForceInline // to ensure Reflection.getCallerClass optimization</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ClassLoader getClassLoader() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ClassLoader cl = getClassLoader0();</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (cl == null)</span></span>
<span class="line"><span style="color:#E1E4E8;">            return null;</span></span>
<span class="line"><span style="color:#E1E4E8;">        SecurityManager sm = System.getSecurityManager();</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (sm != null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            ClassLoader.checkClassLoaderPermission(cl, Reflection.getCallerClass());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return cl;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@CallerSensitive</span></span>
<span class="line"><span style="color:#24292E;">    @ForceInline // to ensure Reflection.getCallerClass optimization</span></span>
<span class="line"><span style="color:#24292E;">    public ClassLoader getClassLoader() {</span></span>
<span class="line"><span style="color:#24292E;">        ClassLoader cl = getClassLoader0();</span></span>
<span class="line"><span style="color:#24292E;">        if (cl == null)</span></span>
<span class="line"><span style="color:#24292E;">            return null;</span></span>
<span class="line"><span style="color:#24292E;">        SecurityManager sm = System.getSecurityManager();</span></span>
<span class="line"><span style="color:#24292E;">        if (sm != null) {</span></span>
<span class="line"><span style="color:#24292E;">            ClassLoader.checkClassLoaderPermission(cl, Reflection.getCallerClass());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return cl;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>方法内联的过程是非常智能的，内联后的代码，会按照一定规则进行再次优化。最终的机器码，在保证逻辑正确的前提下，可能和我们推理的完全不一样。在非常小的概率下，JIT 会出现 Bug，这时候可以关闭问题方法的内联，或者直接关闭 JIT 的优化，保持解释执行。实际上，这种 Bug 我从来没碰到过。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">-XX:CompileCommand=exclude,com/lagou/Test,test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">-XX:CompileCommand=exclude,com/lagou/Test,test</span></span></code></pre></div><br><p>上面的参数，表示 com.lagou.Test 的 test 方法将不会进行 JIT 编译，一直解释执行。</p><br><p>另外，C2 支持的内联层次不超过 9 层，太高的话，CodeCache 区域会被挤爆，这个阈值可以通过 -XX:MaxInlineLevel 进行调整。相似的，编译后的代码超过一定大小也不会再内联，这个参数由 -XX:InlineSmallCode 进行调整。</p><br><p>有非常多的参数，被用来控制对内联方法的选择，整体来说，短小精悍的小方法更容易被优化。</p><br><p>这和我们在日常中的编码要求是一致的：代码块精简，逻辑清晰的代码，更容易获得优化的空间。</p><br>`,45),S=p(`<br><p>我们使用 JITWatch 再看一下对于 getA() 方法的调用，将鼠标悬浮在字节码指令上，可以看到方法已经被内联了。</p><h2 id="逃逸分析" tabindex="-1">逃逸分析 <a class="header-anchor" href="#逃逸分析" aria-label="Permalink to &quot;逃逸分析&quot;">​</a></h2><p>逃逸分析（Escape Analysis）是目前 JVM 中比较前沿的优化技术。通过逃逸分析，JVM 能够分析出一个新的对象使用范围，从而决定是否要将这个对象分配到堆上。</p><br><p>使用 -XX:+DoEscapeAnalysis 参数可以开启逃逸分析，逃逸分析现在是 JVM 的默认行为，这个参数可以忽略。</p><br><p>JVM 判断新创建的对象是否逃逸的依据有：</p><ul><li><p>对象被赋值给堆中对象的字段和类的静态变量；</p></li><li><p>对象被传进了不确定的代码中去运行。</p></li></ul><br><p>举个例子，在代码 1 中，虽然 map 是一个局部变量，但是它通过 return 语句返回，其他外部方法可能会使用它，这就是方法逃逸。另外，如果被其他线程引用或者赋值，则成为线程逃逸。</p><br><p>代码 2，用完 Map 之后就直接销毁了，我们就可以说 map 对象没有逃逸。</p><br><p>代码1：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public Map fig(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    Map map = new HashMap();</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    return map;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public Map fig(){</span></span>
<span class="line"><span style="color:#24292E;">    Map map = new HashMap();</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">    return map;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>代码2：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public void fig(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    Map map = new HashMap();</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public void fig(){</span></span>
<span class="line"><span style="color:#24292E;">    Map map = new HashMap();</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>那逃逸分析有什么好处呢？</p><ul><li><p><strong>同步省略</strong>，如果一个对象被发现只能从一个线程被访问到，那么对于这个对象的操作可以不考虑同步。</p></li><li><p><strong>栈上分配</strong>，如果一个对象在子程序中被分配，那么指向该对象的指针永远不会逃逸，对象有可能会被优化为栈分配。</p></li><li><p><strong>分离对象或标量替换</strong>，有的对象可能不需要作为一个连续的内存结构存在也可以被访问到，那么对象的部分（或全部）可以不存储在内存，而是存储在 CPU 寄存器中。标量是指无法再分解的数据类型，比如原始数据类型及 reference 类型。</p></li></ul><br>`,25),M=p(`<br><p>再来看一下 JITWatch 对 synchronized 代码块的分析。根据提示，由于逃逸分析了解到新建的锁对象 Object 并没有逃逸出方法 cal，它将会在栈上直接分配。</p><br><p>查看 C2 编译后的机器码，发现并没有同步代码相关的生成。这是因为 JIT 在分析之后，发现针对 new Object() 这个对象并没有发生线程竞争的情况，则会把这部分的同步直接给优化掉。我们在代码层次做了一些无用功，字节码无法发现它，而 JIT 智能地找到了它并进行了优化。</p><br><p>因此，并不是所有的对象或者数组都会在堆上分配。由于 JIT 的存在，如果发现某些对象没有逃逸出方法，那么就有可能被优化成栈分配。</p><h2 id="intrinsic" tabindex="-1">intrinsic <a class="header-anchor" href="#intrinsic" aria-label="Permalink to &quot;intrinsic&quot;">​</a></h2><p>另外一个不得不提的技术点那就是 intrinsic，这来源于一道面试题：为什么 String 类的 indexOf 方法，比我们使用相同代码实现的方法，执行效率要高得多？</p><br><p>在翻看 JDK 的源码时，能够看到很多地方使用了 <strong>HotSpotIntrinsicCandidate</strong> 注解。比如 StringBuffer 的 append 方法：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">@HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#E1E4E8;">public synchronized StringBuffer append(char c) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        toStringCache = null;</span></span>
<span class="line"><span style="color:#E1E4E8;">        super.append(c);</span></span>
<span class="line"><span style="color:#E1E4E8;">        return this;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> @Override</span></span>
<span class="line"><span style="color:#24292E;">@HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#24292E;">public synchronized StringBuffer append(char c) {</span></span>
<span class="line"><span style="color:#24292E;">        toStringCache = null;</span></span>
<span class="line"><span style="color:#24292E;">        super.append(c);</span></span>
<span class="line"><span style="color:#24292E;">        return this;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>被 @HotSpotIntrinsicCandidate 标注的方法，在 HotSpot 中都有一套高效的实现，该高效实现基于 CPU 指令，运行时，HotSpot 维护的高效实现会替代 JDK 的源码实现，从而获得更高的效率。</p><br><p>上面的问题中，我们往下跟踪实现，可以发现 StringLatin1 类中的 indexOf 方法，同样适用了 HotSpotIntrinsicCandidate 注解，原因也就在于此。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static int indexOf(byte[] value, byte[] str) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (str.length == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (value.length == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return indexOf(value, value.length, str, str.length, 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static int indexOf(byte[] value, int valueCount, byte[] str, int strCount, int fromIndex) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte first = str[0];</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#24292E;">    public static int indexOf(byte[] value, byte[] str) {</span></span>
<span class="line"><span style="color:#24292E;">        if (str.length == 0) {</span></span>
<span class="line"><span style="color:#24292E;">            return 0;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        if (value.length == 0) {</span></span>
<span class="line"><span style="color:#24292E;">            return -1;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return indexOf(value, value.length, str, str.length, 0);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#24292E;">    public static int indexOf(byte[] value, int valueCount, byte[] str, int strCount, int fromIndex) {</span></span>
<span class="line"><span style="color:#24292E;">        byte first = str[0];</span></span></code></pre></div><br>`,19),j=p('<br><p>JDK 中这种方法有接近 400 个，可以在 IDEA 中使用 <strong>Find Usages</strong> 找到它们。</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>JIT 是现代 JVM 主要的优化点，能够显著地增加程序的执行效率，从解释执行到最高层次的 C2，一个数量级的性能提升也是有可能的。但即时编译的过程是非常缓慢的，耗时间也费空间，所以这些优化操作会和解释执行同时进行。</p><br><p>一般，方法首先会被解释执行，然后被 3 层的 C1 编译，最后被 4 层的 C2 编译，这个过程也不是一蹴而就的。</p><br><p>常用的优化手段，有公共子表达式消除、数组范围检查消除、方法内联、逃逸分析等。</p><br><p>其中，方法内联通过将短小精悍的代码融入到调用方法的执行逻辑里，来减少方法调用上的开支；逃逸分析通过分析变量的引用范围，对象可能会使用栈上分配的方式来减少 GC 的压力，或者使用标量替换来获取更多的优化。</p><br><p>这个过程的执行细节并不是那么&quot;确定&quot;，在不同的 JVM 中，甚至在不同的 HotSpot 版本中，效果也不尽相同。</p><br><p>使用 JITWatch 工具，能够看到字节码和机器码的对应关系，以及执行过程中的一系列优化操作。若想要了解这个工具的更多功能，<a href="https://github.com/AdoptOpenJDK/jitwatch/wiki" target="_blank" rel="noreferrer">可以点击这里参考 wiki</a>。</p>',14);function V(x,D,P,q,O,L){const n=t("Image");return o(),i("div",null,[r,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/89/Cgq2xl57A7qAGBF6AAAx8j1m3Kw525.jpg"}),l(),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/73/Ciqah157A7uAPt49AAD7831CinU309.jpg"}),l(),d,y,g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/89/Cgq2xl57A7uAf1o-AAEJfdrafg8749.jpg"}),l(),u,h,b,_,C,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/73/Ciqah157A7uAB8iPAAFu7HBxG4w040.jpg"}),l(),m,v,T,I,A,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/89/Cgq2xl57A7uAO1CdAACX4fWefMo181.jpg"}),l(),f,J,k,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/89/Cgq2xl57A7yAZvChAAG-RAna12A372.jpg"}),l(),X,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/73/Ciqah157A7yAJiHeAAF5gyjxA3w172.jpg"}),l(),S,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/89/Cgq2xl57A7yAZKc2AAFu39pb5SE629.jpg"}),l(),M,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/73/Ciqah157A7yAHKkqAADmapAcCaE181.jpg"}),l(),j])}const B=e(c,[["render",V]]);export{w as __pageData,B as default};
