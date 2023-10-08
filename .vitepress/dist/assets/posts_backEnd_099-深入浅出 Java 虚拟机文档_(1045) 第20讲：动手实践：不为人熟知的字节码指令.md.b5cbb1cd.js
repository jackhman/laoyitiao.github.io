import{_ as a,j as l,o as p,g as e,k as o,h as t,Q as s}from"./chunks/framework.4e7d56ce.js";const _=JSON.parse('{"title":"第20讲：动手实践：不为人熟知的字节码指令","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1045) 第20讲：动手实践：不为人熟知的字节码指令.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1045) 第20讲：动手实践：不为人熟知的字节码指令.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1045) 第20讲：动手实践：不为人熟知的字节码指令.md"},i=s('<h1 id="第20讲-动手实践-不为人熟知的字节码指令" tabindex="-1">第20讲：动手实践：不为人熟知的字节码指令 <a class="header-anchor" href="#第20讲-动手实践-不为人熟知的字节码指令" aria-label="Permalink to &quot;第20讲：动手实践：不为人熟知的字节码指令&quot;">​</a></h1><p>本课时我们主要分享一个实践案例：不为人熟知的字节码指令。</p><br><p>下面将通过介绍 Java 语言中的一些常见特性，来看一下字节码的应用，由于 Java 特性非常多，这里我们仅介绍一些经常遇到的特性。javap 是手中的利器，复杂的概念都可以在这里现出原形，并且能让你对此产生深刻的印象。</p><br><p>本课时代码比较多，相关代码示例都可以在仓库中找到，建议实际操作一下。</p><h2 id="异常处理" tabindex="-1">异常处理 <a class="header-anchor" href="#异常处理" aria-label="Permalink to &quot;异常处理&quot;">​</a></h2><p>在上一课时中，细心的你可能注意到了，在 synchronized 生成的字节码中，其实包含两条 monitorexit 指令，是为了保证所有的异常条件，都能够退出。</p><br><p>这就涉及到了 Java 字节码的异常处理机制，如下图所示。</p><br>',11),r=s(`<br><p>如果你熟悉 Java 语言，那么对上面的异常继承体系一定不会陌生，其中，Error 和 RuntimeException 是非检查型异常（Unchecked Exception），也就是不需要 catch 语句去捕获的异常；而其他异常，则需要程序员手动去处理。</p><h3 id="异常表" tabindex="-1">异常表 <a class="header-anchor" href="#异常表" aria-label="Permalink to &quot;异常表&quot;">​</a></h3><p>在发生异常的时候，Java 就可以通过 Java 执行栈，来构造异常栈。回想一下第 02 课时中的栈帧，获取这个异常栈只需要遍历一下它们就可以了。</p><br><p>但是这种操作，比起常规操作，要昂贵的多。Java 的 Log 日志框架，通常会把所有错误信息打印到日志中，在异常非常多的情况下，会显著影响性能。</p><br><p>我们还是看一下上一课时生成的字节码：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void doLock();</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ()V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=2, locals=3, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: aload_0</span></span>
<span class="line"><span style="color:#E1E4E8;">         1: getfield      #3                  // Field lock:Ljava/lang/Object;</span></span>
<span class="line"><span style="color:#E1E4E8;">         4: dup</span></span>
<span class="line"><span style="color:#E1E4E8;">         5: astore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         6: monitorenter</span></span>
<span class="line"><span style="color:#E1E4E8;">         7: getstatic     #4                  // Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">        10: ldc           #8                  // String lock</span></span>
<span class="line"><span style="color:#E1E4E8;">        12: invokevirtual #6                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#E1E4E8;">        15: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        16: monitorexit</span></span>
<span class="line"><span style="color:#E1E4E8;">        17: goto          25</span></span>
<span class="line"><span style="color:#E1E4E8;">        20: astore_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        21: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        22: monitorexit</span></span>
<span class="line"><span style="color:#E1E4E8;">        23: aload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        24: athrow</span></span>
<span class="line"><span style="color:#E1E4E8;">        25: return</span></span>
<span class="line"><span style="color:#E1E4E8;">      Exception table:</span></span>
<span class="line"><span style="color:#E1E4E8;">         from    to  target type</span></span>
<span class="line"><span style="color:#E1E4E8;">             7    17    20   any</span></span>
<span class="line"><span style="color:#E1E4E8;">            20    23    20   any</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void doLock();</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ()V</span></span>
<span class="line"><span style="color:#24292E;">    flags:</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=2, locals=3, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: aload_0</span></span>
<span class="line"><span style="color:#24292E;">         1: getfield      #3                  // Field lock:Ljava/lang/Object;</span></span>
<span class="line"><span style="color:#24292E;">         4: dup</span></span>
<span class="line"><span style="color:#24292E;">         5: astore_1</span></span>
<span class="line"><span style="color:#24292E;">         6: monitorenter</span></span>
<span class="line"><span style="color:#24292E;">         7: getstatic     #4                  // Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#24292E;">        10: ldc           #8                  // String lock</span></span>
<span class="line"><span style="color:#24292E;">        12: invokevirtual #6                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#24292E;">        15: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        16: monitorexit</span></span>
<span class="line"><span style="color:#24292E;">        17: goto          25</span></span>
<span class="line"><span style="color:#24292E;">        20: astore_2</span></span>
<span class="line"><span style="color:#24292E;">        21: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        22: monitorexit</span></span>
<span class="line"><span style="color:#24292E;">        23: aload_2</span></span>
<span class="line"><span style="color:#24292E;">        24: athrow</span></span>
<span class="line"><span style="color:#24292E;">        25: return</span></span>
<span class="line"><span style="color:#24292E;">      Exception table:</span></span>
<span class="line"><span style="color:#24292E;">         from    to  target type</span></span>
<span class="line"><span style="color:#24292E;">             7    17    20   any</span></span>
<span class="line"><span style="color:#24292E;">            20    23    20   any</span></span></code></pre></div><br><p>可以看到，编译后的字节码，带有一个叫 Exception table 的异常表，里面的每一行数据，都是一个异常处理器：</p><ul><li><p><strong>from</strong> 指定字节码索引的开始位置</p></li><li><p><strong>to</strong> 指定字节码索引的结束位置</p></li><li><p><strong>target</strong> 异常处理的起始位置</p></li><li><p><strong>type</strong> 异常类型</p></li></ul><br><p>也就是说，只要在 from 和 to 之间发生了异常，就会跳转到 target 所指定的位置。</p><h3 id="finally" tabindex="-1">finally <a class="header-anchor" href="#finally" aria-label="Permalink to &quot;finally&quot;">​</a></h3><p>通常我们在做一些文件读取的时候，都会在 finally 代码块中关闭流，以避免内存的溢出。关于这个场景，我们再分析一下下面这段代码的异常表。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import java.io.FileInputStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.io.FileNotFoundException;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.io.IOException;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.io.InputStream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public class A {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void read() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        InputStream in = null;</span></span>
<span class="line"><span style="color:#E1E4E8;">        try {</span></span>
<span class="line"><span style="color:#E1E4E8;">            in = new FileInputStream(&quot;A.java&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } catch (FileNotFoundException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">        } finally {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (null != in) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                try {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    in.close();</span></span>
<span class="line"><span style="color:#E1E4E8;">                } catch (IOException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import java.io.FileInputStream;</span></span>
<span class="line"><span style="color:#24292E;">import java.io.FileNotFoundException;</span></span>
<span class="line"><span style="color:#24292E;">import java.io.IOException;</span></span>
<span class="line"><span style="color:#24292E;">import java.io.InputStream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public class A {</span></span>
<span class="line"><span style="color:#24292E;">    public void read() {</span></span>
<span class="line"><span style="color:#24292E;">        InputStream in = null;</span></span>
<span class="line"><span style="color:#24292E;">        try {</span></span>
<span class="line"><span style="color:#24292E;">            in = new FileInputStream(&quot;A.java&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        } catch (FileNotFoundException e) {</span></span>
<span class="line"><span style="color:#24292E;">            e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">        } finally {</span></span>
<span class="line"><span style="color:#24292E;">            if (null != in) {</span></span>
<span class="line"><span style="color:#24292E;">                try {</span></span>
<span class="line"><span style="color:#24292E;">                    in.close();</span></span>
<span class="line"><span style="color:#24292E;">                } catch (IOException e) {</span></span>
<span class="line"><span style="color:#24292E;">                    e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>上面的代码，捕获了一个 FileNotFoundException 异常，然后在 finally 中捕获了 IOException 异常。当我们分析字节码的时候，却发现了一个有意思的地方：IOException 足足出现了三次。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Exception table:</span></span>
<span class="line"><span style="color:#E1E4E8;">    from    to  target type</span></span>
<span class="line"><span style="color:#E1E4E8;">    17    21    24   Class java/io/IOException</span></span>
<span class="line"><span style="color:#E1E4E8;">    2    12    32   Class java/io/FileNotFoundException</span></span>
<span class="line"><span style="color:#E1E4E8;">    42    46    49   Class java/io/IOException</span></span>
<span class="line"><span style="color:#E1E4E8;">     2    12    57   any</span></span>
<span class="line"><span style="color:#E1E4E8;">    32    37    57   any</span></span>
<span class="line"><span style="color:#E1E4E8;">    63    67    70   Class java/io/IOException</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Exception table:</span></span>
<span class="line"><span style="color:#24292E;">    from    to  target type</span></span>
<span class="line"><span style="color:#24292E;">    17    21    24   Class java/io/IOException</span></span>
<span class="line"><span style="color:#24292E;">    2    12    32   Class java/io/FileNotFoundException</span></span>
<span class="line"><span style="color:#24292E;">    42    46    49   Class java/io/IOException</span></span>
<span class="line"><span style="color:#24292E;">     2    12    57   any</span></span>
<span class="line"><span style="color:#24292E;">    32    37    57   any</span></span>
<span class="line"><span style="color:#24292E;">    63    67    70   Class java/io/IOException</span></span></code></pre></div><br><p>Java 编译器使用了一种比较<strong>傻</strong>的方式来组织 finally 的字节码，它分别在 try、catch 的正常执行路径上，复制一份 finally 代码，追加在 正常执行逻辑的后面；同时，再复制一份到其他异常执行逻辑的出口处。</p><br><p>这也是下面这段方法不报错的原因，都可以在字节码中找到答案。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">//B.java</span></span>
<span class="line"><span style="color:#E1E4E8;">public int read() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        try {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int a = 1 / 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">            return a;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } finally {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">//B.java</span></span>
<span class="line"><span style="color:#24292E;">public int read() {</span></span>
<span class="line"><span style="color:#24292E;">        try {</span></span>
<span class="line"><span style="color:#24292E;">            int a = 1 / 0;</span></span>
<span class="line"><span style="color:#24292E;">            return a;</span></span>
<span class="line"><span style="color:#24292E;">        } finally {</span></span>
<span class="line"><span style="color:#24292E;">            return 1;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>下面是上面程序的字节码，可以看到，异常之后，直接跳转到序号 8 了。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stack=2, locals=4, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: iconst_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         1: iconst_0</span></span>
<span class="line"><span style="color:#E1E4E8;">         2: idiv</span></span>
<span class="line"><span style="color:#E1E4E8;">         3: istore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         4: iload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         5: istore_2</span></span>
<span class="line"><span style="color:#E1E4E8;">         6: iconst_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         7: ireturn</span></span>
<span class="line"><span style="color:#E1E4E8;">         8: astore_3</span></span>
<span class="line"><span style="color:#E1E4E8;">         9: iconst_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        10: ireturn</span></span>
<span class="line"><span style="color:#E1E4E8;">      Exception table:</span></span>
<span class="line"><span style="color:#E1E4E8;">         from    to  target type</span></span>
<span class="line"><span style="color:#E1E4E8;">             0     6     8   any</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stack=2, locals=4, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: iconst_1</span></span>
<span class="line"><span style="color:#24292E;">         1: iconst_0</span></span>
<span class="line"><span style="color:#24292E;">         2: idiv</span></span>
<span class="line"><span style="color:#24292E;">         3: istore_1</span></span>
<span class="line"><span style="color:#24292E;">         4: iload_1</span></span>
<span class="line"><span style="color:#24292E;">         5: istore_2</span></span>
<span class="line"><span style="color:#24292E;">         6: iconst_1</span></span>
<span class="line"><span style="color:#24292E;">         7: ireturn</span></span>
<span class="line"><span style="color:#24292E;">         8: astore_3</span></span>
<span class="line"><span style="color:#24292E;">         9: iconst_1</span></span>
<span class="line"><span style="color:#24292E;">        10: ireturn</span></span>
<span class="line"><span style="color:#24292E;">      Exception table:</span></span>
<span class="line"><span style="color:#24292E;">         from    to  target type</span></span>
<span class="line"><span style="color:#24292E;">             0     6     8   any</span></span></code></pre></div><h2 id="装箱拆箱" tabindex="-1">装箱拆箱 <a class="header-anchor" href="#装箱拆箱" aria-label="Permalink to &quot;装箱拆箱&quot;">​</a></h2><p>在刚开始学习 Java 语言的你，可能会被自动装箱和拆箱搞得晕头转向。Java 中有 8 种基本类型，但鉴于 Java 面向对象的特点，它们同样有着对应的 8 个包装类型，比如 int 和 Integer，包装类型的值可以为 null，很多时候，它们都能够相互赋值。</p><br><p>我们使用下面的代码从字节码层面上来观察一下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class Box {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Integer cal() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer a = 1000;</span></span>
<span class="line"><span style="color:#E1E4E8;">        int b = a * 10;</span></span>
<span class="line"><span style="color:#E1E4E8;">        return b;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class Box {</span></span>
<span class="line"><span style="color:#24292E;">    public Integer cal() {</span></span>
<span class="line"><span style="color:#24292E;">        Integer a = 1000;</span></span>
<span class="line"><span style="color:#24292E;">        int b = a * 10;</span></span>
<span class="line"><span style="color:#24292E;">        return b;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>上面是一段简单的代码，首先使用包装类型，构造了一个值为 1000 的数字，然后乘以 10 后返回，但是中间的计算过程，使用了普通类型 int。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public java.lang.Integer read();</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ()Ljava/lang/Integer;</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags: ACC_PUBLIC</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=2, locals=3, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: sipush        1000</span></span>
<span class="line"><span style="color:#E1E4E8;">         3: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;</span></span>
<span class="line"><span style="color:#E1E4E8;">         6: astore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         7: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         8: invokevirtual #3                  // Method java/lang/Integer.intValue:()I</span></span>
<span class="line"><span style="color:#E1E4E8;">        11: bipush        10</span></span>
<span class="line"><span style="color:#E1E4E8;">        13: imul</span></span>
<span class="line"><span style="color:#E1E4E8;">        14: istore_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        15: iload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        16: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;</span></span>
<span class="line"><span style="color:#E1E4E8;">        19: areturn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public java.lang.Integer read();</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ()Ljava/lang/Integer;</span></span>
<span class="line"><span style="color:#24292E;">    flags: ACC_PUBLIC</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=2, locals=3, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: sipush        1000</span></span>
<span class="line"><span style="color:#24292E;">         3: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;</span></span>
<span class="line"><span style="color:#24292E;">         6: astore_1</span></span>
<span class="line"><span style="color:#24292E;">         7: aload_1</span></span>
<span class="line"><span style="color:#24292E;">         8: invokevirtual #3                  // Method java/lang/Integer.intValue:()I</span></span>
<span class="line"><span style="color:#24292E;">        11: bipush        10</span></span>
<span class="line"><span style="color:#24292E;">        13: imul</span></span>
<span class="line"><span style="color:#24292E;">        14: istore_2</span></span>
<span class="line"><span style="color:#24292E;">        15: iload_2</span></span>
<span class="line"><span style="color:#24292E;">        16: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;</span></span>
<span class="line"><span style="color:#24292E;">        19: areturn</span></span></code></pre></div><br><p>通过观察字节码，我们发现赋值操作使用的是 Integer.valueOf 方法，在进行乘法运算的时候，调用了 Integer.intValue 方法来获取基本类型的值。在方法返回的时候，再次使用了 Integer.valueOf 方法对结果进行了包装。</p><br><p>这就是 Java 中的自动装箱拆箱的底层实现。</p><br><p>但这里有一个 Java 层面的陷阱问题，我们继续跟踪 Integer.valueOf 方法。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static Integer valueOf(int i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (i &gt;= IntegerCache.low &amp;&amp; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= IntegerCache.high)</span></span>
<span class="line"><span style="color:#E1E4E8;">            return IntegerCache.cache[i + (-IntegerCache.low)];</span></span>
<span class="line"><span style="color:#E1E4E8;">        return new Integer(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@HotSpotIntrinsicCandidate</span></span>
<span class="line"><span style="color:#24292E;">    public static Integer valueOf(int i) {</span></span>
<span class="line"><span style="color:#24292E;">        if (i &gt;= IntegerCache.low &amp;&amp; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= IntegerCache.high)</span></span>
<span class="line"><span style="color:#24292E;">            return IntegerCache.cache[i + (-IntegerCache.low)];</span></span>
<span class="line"><span style="color:#24292E;">        return new Integer(i);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><br><p>这个 IntegerCache，缓存了 low 和 high 之间的 Integer 对象，可以通过 -XX:AutoBoxCacheMax 来修改上限。</p><br><p>下面是一道经典的面试题，请考虑一下运行代码后，会输出什么结果？</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class BoxCacheError{</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Integer n1 = 123;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer n2 = 123;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer n3 = 128;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer n4 = 128;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(n1 == n2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(n3 == n4);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class BoxCacheError{</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Integer n1 = 123;</span></span>
<span class="line"><span style="color:#24292E;">        Integer n2 = 123;</span></span>
<span class="line"><span style="color:#24292E;">        Integer n3 = 128;</span></span>
<span class="line"><span style="color:#24292E;">        Integer n4 = 128;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        System.out.println(n1 == n2);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(n3 == n4);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><br><p>当我使用 <strong>java BoxCacheError</strong> 执行时，是 true,false；当我加上参数 <strong>java -XX:AutoBoxCacheMax=256 BoxCacheError</strong>执行时，结果是 true,ture，原因就在于此。</p><h2 id="数组访问" tabindex="-1">数组访问 <a class="header-anchor" href="#数组访问" aria-label="Permalink to &quot;数组访问&quot;">​</a></h2><p>我们都知道，在访问一个数组长度的时候，直接使用它的属性 <strong>.length</strong>就能获取，而在 Java 中却无法找到对于数组的定义。</p><br><p>比如 int[] 这种类型，通过 getClass（getClass 是 Object 类中的方法）可以获取它的具体类型是 <strong>[I</strong>。</p><br><p>其实，数组是 JVM 内置的一种对象类型，这个对象同样是继承的 Object 类。</p><br><p>我们使用下面一段代码来观察一下数组的生成和访问。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class ArrayDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    int getValue() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        int[] arr = new int[]{</span></span>
<span class="line"><span style="color:#E1E4E8;">                1111, 2222, 3333, 4444</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        return arr[2];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    int getLength(int[] arr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return arr.length;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class ArrayDemo {</span></span>
<span class="line"><span style="color:#24292E;">    int getValue() {</span></span>
<span class="line"><span style="color:#24292E;">        int[] arr = new int[]{</span></span>
<span class="line"><span style="color:#24292E;">                1111, 2222, 3333, 4444</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        return arr[2];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    int getLength(int[] arr) {</span></span>
<span class="line"><span style="color:#24292E;">        return arr.length;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>首先看一下 getValue 方法的字节码。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int getValue();</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ()I</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=4, locals=2, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: iconst_4</span></span>
<span class="line"><span style="color:#E1E4E8;">         1: newarray       int</span></span>
<span class="line"><span style="color:#E1E4E8;">         3: dup</span></span>
<span class="line"><span style="color:#E1E4E8;">         4: iconst_0</span></span>
<span class="line"><span style="color:#E1E4E8;">         5: sipush        1111</span></span>
<span class="line"><span style="color:#E1E4E8;">         8: iastorae</span></span>
<span class="line"><span style="color:#E1E4E8;">         9: dup</span></span>
<span class="line"><span style="color:#E1E4E8;">        10: iconst_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        11: sipush        2222</span></span>
<span class="line"><span style="color:#E1E4E8;">        14: iastore</span></span>
<span class="line"><span style="color:#E1E4E8;">        15: dup</span></span>
<span class="line"><span style="color:#E1E4E8;">        16: iconst_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        17: sipush        3333</span></span>
<span class="line"><span style="color:#E1E4E8;">        20: iastore</span></span>
<span class="line"><span style="color:#E1E4E8;">        21: dup</span></span>
<span class="line"><span style="color:#E1E4E8;">        22: iconst_3</span></span>
<span class="line"><span style="color:#E1E4E8;">        23: sipush        4444</span></span>
<span class="line"><span style="color:#E1E4E8;">        26: iastore</span></span>
<span class="line"><span style="color:#E1E4E8;">        27: astore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        28: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        29: iconst_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        30: iaload</span></span>
<span class="line"><span style="color:#E1E4E8;">        31: ireturn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int getValue();</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ()I</span></span>
<span class="line"><span style="color:#24292E;">    flags:</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=4, locals=2, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: iconst_4</span></span>
<span class="line"><span style="color:#24292E;">         1: newarray       int</span></span>
<span class="line"><span style="color:#24292E;">         3: dup</span></span>
<span class="line"><span style="color:#24292E;">         4: iconst_0</span></span>
<span class="line"><span style="color:#24292E;">         5: sipush        1111</span></span>
<span class="line"><span style="color:#24292E;">         8: iastorae</span></span>
<span class="line"><span style="color:#24292E;">         9: dup</span></span>
<span class="line"><span style="color:#24292E;">        10: iconst_1</span></span>
<span class="line"><span style="color:#24292E;">        11: sipush        2222</span></span>
<span class="line"><span style="color:#24292E;">        14: iastore</span></span>
<span class="line"><span style="color:#24292E;">        15: dup</span></span>
<span class="line"><span style="color:#24292E;">        16: iconst_2</span></span>
<span class="line"><span style="color:#24292E;">        17: sipush        3333</span></span>
<span class="line"><span style="color:#24292E;">        20: iastore</span></span>
<span class="line"><span style="color:#24292E;">        21: dup</span></span>
<span class="line"><span style="color:#24292E;">        22: iconst_3</span></span>
<span class="line"><span style="color:#24292E;">        23: sipush        4444</span></span>
<span class="line"><span style="color:#24292E;">        26: iastore</span></span>
<span class="line"><span style="color:#24292E;">        27: astore_1</span></span>
<span class="line"><span style="color:#24292E;">        28: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        29: iconst_2</span></span>
<span class="line"><span style="color:#24292E;">        30: iaload</span></span>
<span class="line"><span style="color:#24292E;">        31: ireturn</span></span></code></pre></div><br><p>可以看到，新建数组的代码，被编译成了 newarray 指令。数组里的初始内容，被顺序编译成了一系列指令放入：</p><ul><li><p><strong>sipush</strong> 将一个短整型常量值推送至栈顶；</p></li><li><p><strong>iastore</strong> 将栈顶 int 型数值存入指定数组的指定索引位置。</p></li></ul><br><blockquote><p>为了支持多种类型，从操作数栈存储到数组，有更多的指令：bastore、castore、sastore、iastore、lastore、fastore、dastore、aastore。</p></blockquote><br><p>数组元素的访问，是通过第 28 ~ 30 行代码来实现的：</p><ul><li><p><strong>aload_1</strong> 将第二个引用类型本地变量推送至栈顶，这里是生成的数组；</p></li><li><p><strong>iconst_2</strong> 将 int 型 2 推送至栈顶；</p></li><li><p><strong>iaload</strong> 将 int 型数组指定索引的值推送至栈顶。</p></li></ul><p>值得注意的是，在这段代码运行期间，有可能会产生 ArrayIndexOutOfBoundsException，但由于它是一种非捕获型异常，我们不必为这种异常提供异常处理器。</p><br><p>我们再看一下 getLength 的字节码，字节码如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int getLength(int[]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ([I)I</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=1, locals=2, args_size=2</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         1: arraylength</span></span>
<span class="line"><span style="color:#E1E4E8;">         2: ireturn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int getLength(int[]);</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ([I)I</span></span>
<span class="line"><span style="color:#24292E;">    flags:</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=1, locals=2, args_size=2</span></span>
<span class="line"><span style="color:#24292E;">         0: aload_1</span></span>
<span class="line"><span style="color:#24292E;">         1: arraylength</span></span>
<span class="line"><span style="color:#24292E;">         2: ireturn</span></span></code></pre></div><br><p>可以看到，获取数组的长度，是由字节码指令 arraylength 来完成的。</p><h2 id="foreach" tabindex="-1">foreach <a class="header-anchor" href="#foreach" aria-label="Permalink to &quot;foreach&quot;">​</a></h2><p>无论是 Java 的数组，还是 List，都可以使用 foreach 语句进行遍历，比较典型的代码如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public class ForDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void loop(int[] arr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int i : arr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.println(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    void loop(List&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; arr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int i : arr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.println(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public class ForDemo {</span></span>
<span class="line"><span style="color:#24292E;">    void loop(int[] arr) {</span></span>
<span class="line"><span style="color:#24292E;">        for (int i : arr) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.println(i);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    void loop(List&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; arr) {</span></span>
<span class="line"><span style="color:#24292E;">        for (int i : arr) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.println(i);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><br><p>虽然在语言层面它们的表现形式是一致的，但实际实现的方法并不同。我们先看一下遍历数组的字节码：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void loop(int[]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ([I)V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=2, locals=6, args_size=2</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         1: astore_2</span></span>
<span class="line"><span style="color:#E1E4E8;">         2: aload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">         3: arraylength</span></span>
<span class="line"><span style="color:#E1E4E8;">         4: istore_3</span></span>
<span class="line"><span style="color:#E1E4E8;">         5: iconst_0</span></span>
<span class="line"><span style="color:#E1E4E8;">         6: istore        4</span></span>
<span class="line"><span style="color:#E1E4E8;">         8: iload         4</span></span>
<span class="line"><span style="color:#E1E4E8;">        10: iload_3</span></span>
<span class="line"><span style="color:#E1E4E8;">        11: if_icmpge     34</span></span>
<span class="line"><span style="color:#E1E4E8;">        14: aload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        15: iload         4</span></span>
<span class="line"><span style="color:#E1E4E8;">        17: iaload</span></span>
<span class="line"><span style="color:#E1E4E8;">        18: istore        5</span></span>
<span class="line"><span style="color:#E1E4E8;">        20: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">        23: iload         5</span></span>
<span class="line"><span style="color:#E1E4E8;">        25: invokevirtual #3                  // Method java/io/PrintStream.println:(I)V</span></span>
<span class="line"><span style="color:#E1E4E8;">        28: iinc          4, 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        31: goto          8</span></span>
<span class="line"><span style="color:#E1E4E8;">        34: return</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void loop(int[]);</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ([I)V</span></span>
<span class="line"><span style="color:#24292E;">    flags:</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=2, locals=6, args_size=2</span></span>
<span class="line"><span style="color:#24292E;">         0: aload_1</span></span>
<span class="line"><span style="color:#24292E;">         1: astore_2</span></span>
<span class="line"><span style="color:#24292E;">         2: aload_2</span></span>
<span class="line"><span style="color:#24292E;">         3: arraylength</span></span>
<span class="line"><span style="color:#24292E;">         4: istore_3</span></span>
<span class="line"><span style="color:#24292E;">         5: iconst_0</span></span>
<span class="line"><span style="color:#24292E;">         6: istore        4</span></span>
<span class="line"><span style="color:#24292E;">         8: iload         4</span></span>
<span class="line"><span style="color:#24292E;">        10: iload_3</span></span>
<span class="line"><span style="color:#24292E;">        11: if_icmpge     34</span></span>
<span class="line"><span style="color:#24292E;">        14: aload_2</span></span>
<span class="line"><span style="color:#24292E;">        15: iload         4</span></span>
<span class="line"><span style="color:#24292E;">        17: iaload</span></span>
<span class="line"><span style="color:#24292E;">        18: istore        5</span></span>
<span class="line"><span style="color:#24292E;">        20: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#24292E;">        23: iload         5</span></span>
<span class="line"><span style="color:#24292E;">        25: invokevirtual #3                  // Method java/io/PrintStream.println:(I)V</span></span>
<span class="line"><span style="color:#24292E;">        28: iinc          4, 1</span></span>
<span class="line"><span style="color:#24292E;">        31: goto          8</span></span>
<span class="line"><span style="color:#24292E;">        34: return</span></span></code></pre></div><br><p>可以很容易看到，它将代码解释成了传统的变量方式，即 **for(int i;i&lt;length;i++)**的形式。</p><br><p>而 List 的字节码如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void loop(java.util.List&lt;</span><span style="color:#FDAEB7;font-style:italic;">java.lang.Integer</span><span style="color:#E1E4E8;">&gt;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">       0: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">       1: invokeinterface #4,  1            // InterfaceMethod java/util/List.iterator:()Ljava/util/Iterator;</span></span>
<span class="line"><span style="color:#E1E4E8;">       6: astore_2-</span></span>
<span class="line"><span style="color:#E1E4E8;">       7: aload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">       8: invokeinterface #5,  1            // InterfaceMethod java/util/Iterator.hasNext:()Z</span></span>
<span class="line"><span style="color:#E1E4E8;">      13: ifeq          39</span></span>
<span class="line"><span style="color:#E1E4E8;">      16: aload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">      17: invokeinterface #6,  1            // InterfaceMethod java/util/Iterator.next:()Ljava/lang/Object;</span></span>
<span class="line"><span style="color:#E1E4E8;">      22: checkcast     #7                  // class java/lang/Integer</span></span>
<span class="line"><span style="color:#E1E4E8;">      25: invokevirtual #8                  // Method java/lang/Integer.intValue:()I</span></span>
<span class="line"><span style="color:#E1E4E8;">      28: istore_3</span></span>
<span class="line"><span style="color:#E1E4E8;">      29: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">      32: iload_3</span></span>
<span class="line"><span style="color:#E1E4E8;">      33: invokevirtual #3                  // Method java/io/PrintStream.println:(I)V</span></span>
<span class="line"><span style="color:#E1E4E8;">      36: goto          7</span></span>
<span class="line"><span style="color:#E1E4E8;">      39: return</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void loop(java.util.List&lt;</span><span style="color:#B31D28;font-style:italic;">java.lang.Integer</span><span style="color:#24292E;">&gt;);</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">       0: aload_1</span></span>
<span class="line"><span style="color:#24292E;">       1: invokeinterface #4,  1            // InterfaceMethod java/util/List.iterator:()Ljava/util/Iterator;</span></span>
<span class="line"><span style="color:#24292E;">       6: astore_2-</span></span>
<span class="line"><span style="color:#24292E;">       7: aload_2</span></span>
<span class="line"><span style="color:#24292E;">       8: invokeinterface #5,  1            // InterfaceMethod java/util/Iterator.hasNext:()Z</span></span>
<span class="line"><span style="color:#24292E;">      13: ifeq          39</span></span>
<span class="line"><span style="color:#24292E;">      16: aload_2</span></span>
<span class="line"><span style="color:#24292E;">      17: invokeinterface #6,  1            // InterfaceMethod java/util/Iterator.next:()Ljava/lang/Object;</span></span>
<span class="line"><span style="color:#24292E;">      22: checkcast     #7                  // class java/lang/Integer</span></span>
<span class="line"><span style="color:#24292E;">      25: invokevirtual #8                  // Method java/lang/Integer.intValue:()I</span></span>
<span class="line"><span style="color:#24292E;">      28: istore_3</span></span>
<span class="line"><span style="color:#24292E;">      29: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#24292E;">      32: iload_3</span></span>
<span class="line"><span style="color:#24292E;">      33: invokevirtual #3                  // Method java/io/PrintStream.println:(I)V</span></span>
<span class="line"><span style="color:#24292E;">      36: goto          7</span></span>
<span class="line"><span style="color:#24292E;">      39: return</span></span></code></pre></div><br><p>它实际是把 list 对象进行迭代并遍历的，在循环中，使用了 Iterator.next() 方法。</p><br><p>使用 jd-gui 等反编译工具，可以看到实际生成的代码：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void loop(List&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; paramList) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (Iterator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer</span><span style="color:#E1E4E8;">&gt; iterator = paramList.iterator(); iterator.hasNext(); ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      int i = ((Integer)iterator.next()).intValue();</span></span>
<span class="line"><span style="color:#E1E4E8;">      System.out.println(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void loop(List&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; paramList) {</span></span>
<span class="line"><span style="color:#24292E;">    for (Iterator&lt;</span><span style="color:#B31D28;font-style:italic;">Integer</span><span style="color:#24292E;">&gt; iterator = paramList.iterator(); iterator.hasNext(); ) {</span></span>
<span class="line"><span style="color:#24292E;">      int i = ((Integer)iterator.next()).intValue();</span></span>
<span class="line"><span style="color:#24292E;">      System.out.println(i);</span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><h2 id="注解" tabindex="-1">注解 <a class="header-anchor" href="#注解" aria-label="Permalink to &quot;注解&quot;">​</a></h2><p>注解在 Java 中得到了广泛的应用，Spring 框架更是由于注解的存在而起死回生。注解在开发中的作用就是做数据约束和标准定义，可以将其理解成代码的规范标准，并帮助我们写出方便、快捷、简洁的代码。</p><p>那么注解信息是存放在哪里的呢？我们使用两个 Java 文件来看一下其中的一种情况。</p><p><strong>MyAnnotation.java</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public @interface MyAnnotation {</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public @interface MyAnnotation {</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p><strong>AnnotationDemo</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@MyAnnotation</span></span>
<span class="line"><span style="color:#E1E4E8;">public class AnnotationDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @MyAnnotation</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void test(@MyAnnotation  int a){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@MyAnnotation</span></span>
<span class="line"><span style="color:#24292E;">public class AnnotationDemo {</span></span>
<span class="line"><span style="color:#24292E;">    @MyAnnotation</span></span>
<span class="line"><span style="color:#24292E;">    public void test(@MyAnnotation  int a){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>下面我们来看一下字节码信息。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  public AnnotationDemo();</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ()V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags: ACC_PUBLIC</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=1, locals=1, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: aload_0</span></span>
<span class="line"><span style="color:#E1E4E8;">         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;</span><span style="color:#FDAEB7;font-style:italic;">init</span><span style="color:#E1E4E8;">&gt;&quot;:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">         4: return</span></span>
<span class="line"><span style="color:#E1E4E8;">      LineNumberTable:</span></span>
<span class="line"><span style="color:#E1E4E8;">        line 2: 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  public void test(int);</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: (I)V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags: ACC_PUBLIC</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=0, locals=2, args_size=2</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: return</span></span>
<span class="line"><span style="color:#E1E4E8;">      LineNumberTable:</span></span>
<span class="line"><span style="color:#E1E4E8;">        line 6: 0</span></span>
<span class="line"><span style="color:#E1E4E8;">    RuntimeInvisibleAnnotations:</span></span>
<span class="line"><span style="color:#E1E4E8;">      0: #11()</span></span>
<span class="line"><span style="color:#E1E4E8;">    RuntimeInvisibleParameterAnnotations:</span></span>
<span class="line"><span style="color:#E1E4E8;">      0:</span></span>
<span class="line"><span style="color:#E1E4E8;">        0: #11()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">SourceFile: &quot;AnnotationDemo.java&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">RuntimeInvisibleAnnotations:</span></span>
<span class="line"><span style="color:#E1E4E8;">  0: #11()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  public AnnotationDemo();</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ()V</span></span>
<span class="line"><span style="color:#24292E;">    flags: ACC_PUBLIC</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=1, locals=1, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: aload_0</span></span>
<span class="line"><span style="color:#24292E;">         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;</span><span style="color:#B31D28;font-style:italic;">init</span><span style="color:#24292E;">&gt;&quot;:()V</span></span>
<span class="line"><span style="color:#24292E;">         4: return</span></span>
<span class="line"><span style="color:#24292E;">      LineNumberTable:</span></span>
<span class="line"><span style="color:#24292E;">        line 2: 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  public void test(int);</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: (I)V</span></span>
<span class="line"><span style="color:#24292E;">    flags: ACC_PUBLIC</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=0, locals=2, args_size=2</span></span>
<span class="line"><span style="color:#24292E;">         0: return</span></span>
<span class="line"><span style="color:#24292E;">      LineNumberTable:</span></span>
<span class="line"><span style="color:#24292E;">        line 6: 0</span></span>
<span class="line"><span style="color:#24292E;">    RuntimeInvisibleAnnotations:</span></span>
<span class="line"><span style="color:#24292E;">      0: #11()</span></span>
<span class="line"><span style="color:#24292E;">    RuntimeInvisibleParameterAnnotations:</span></span>
<span class="line"><span style="color:#24292E;">      0:</span></span>
<span class="line"><span style="color:#24292E;">        0: #11()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">SourceFile: &quot;AnnotationDemo.java&quot;</span></span>
<span class="line"><span style="color:#24292E;">RuntimeInvisibleAnnotations:</span></span>
<span class="line"><span style="color:#24292E;">  0: #11()</span></span></code></pre></div><br><p>可以看到，无论是类的注解，还是方法注解，都是由一个叫做 RuntimeInvisibleAnnotations 的结构来存储的，而参数的存储，是由 RuntimeInvisibleParameterAnotations 来保证的。</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本课时我们简单介绍了一下工作中常见的一些问题，并从字节码层面分析了它的原理，包括异常的处理、finally 块的执行顺序；以及隐藏的装箱拆箱和 foreach 语法糖的底层实现。</p><br><p>由于 Java 的特性非常多，这里不再一一列出，但都可以使用这种简单的方式，一窥究竟。可以认为本课时属于抛砖引玉，给出了一种学习思路。</p><br><p>另外，也可以对其中的性能和复杂度进行思考。可以注意到，在隐藏的装箱拆箱操作中，会造成很多冗余的字节码指令生成。那么，这个东西会耗性能吗？答案是肯定的，但是也不必纠结于此。</p><br><p>你所看到的字节码指令，可能洋洋洒洒几千行，看起来很吓人，但执行速度几乎都是纳秒级别的。Java 的无数框架，包括 JDK，也不会为了优化这种性能对代码进行限制。了解其原理，但不要舍本逐末，比如减少一次 Java 线程的上下文切换，就比你优化几千个装箱拆箱动作，来的更快捷一些。</p>`,130);function E(y,d,g,u,v,h){const n=l("Image");return p(),e("div",null,[i,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/3B/CgpOIF5x0xWABeHPAAAgs1YbFw4651.jpg"}),t(),r])}const m=a(c,[["render",E]]);export{_ as __pageData,m as default};
