import{_ as e,j as o,o as t,h as c,k as l,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const O=JSON.parse('{"title":"第17讲：动手实践：从字节码看方法调用的底层实现","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1042) 第17讲：动手实践：从字节码看方法调用的底层实现.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1042) 第17讲：动手实践：从字节码看方法调用的底层实现.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1042) 第17讲：动手实践：从字节码看方法调用的底层实现.md"},r=p('<h1 id="第17讲-动手实践-从字节码看方法调用的底层实现" tabindex="-1">第17讲：动手实践：从字节码看方法调用的底层实现 <a class="header-anchor" href="#第17讲-动手实践-从字节码看方法调用的底层实现" aria-label="Permalink to &quot;第17讲：动手实践：从字节码看方法调用的底层实现&quot;">​</a></h1><p>本课时我们主要分析从字节码看方法调用的底层实现。</p><h2 id="字节码结构" tabindex="-1">字节码结构 <a class="header-anchor" href="#字节码结构" aria-label="Permalink to &quot;字节码结构&quot;">​</a></h2><h3 id="基本结构" tabindex="-1">基本结构 <a class="header-anchor" href="#基本结构" aria-label="Permalink to &quot;基本结构&quot;">​</a></h3><p>在开始之前，我们先简要地介绍一下 class 文件的内容，这个结构和我们前面使用的 jclasslib 是一样的。关于 class 文件结构的资料已经非常多了（<a href="https://docs.oracle.com/javase/specs/jvms/se11/html/jvms-4.html" target="_blank" rel="noreferrer">点击这里可查看官网详细介绍</a>），这里不再展开讲解了，大体介绍如下。</p><br>',6),E=p("<br><p>**magic：**魔数，用于标识当前 class 的文件格式，JVM 可据此判断该文件是否可以被解析，目前固定为 0xCAFEBABE。</p><br><p>**major_version：**主版本号。</p><br><p>**minor_version：**副版本号，这两个版本号用来标识编译时的 JDK 版本，常见的一个异常比如 Unsupported major.minor version 52.0 就是因为运行时的 JDK 版本低于编译时的 JDK 版本（52 是 Java 8 的主版本号）。</p><br><p><strong>constant_pool_count</strong>：常量池计数器，等于常量池中的成员数加 1。</p><br><p><strong>constant_pool</strong>：常量池，是一种表结构，包含 class 文件结构和子结构中引用的所有字符串常量，类或者接口名，字段名和其他常量。</p><br><p><strong>access_flags</strong>：表示某个类或者接口的访问权限和属性。</p><br><p><strong>this_class</strong>：类索引，该值必须是对常量池中某个常量的一个有效索引值，该索引处的成员必须是一个 CONSTANT_Class_info 类型的结构体，表示这个 class 文件所定义的类和接口。</p><br><p><strong>super_class</strong>：父类索引。</p><br><p><strong>interfaces_count</strong>：接口计数器，表示当前类或者接口直接继承接口的数量。</p><br><p><strong>interfaces</strong>：接口表，是一个表结构，成员同 this_class，是对常量池中 CONSTANT_Class_info 类型的一个有效索引值。</p><br><p><strong>fields_count</strong>：字段计数器，当前 class 文件所有字段的数量。</p><br><p><strong>fields</strong>：字段表，是一个表结构，表中每个成员必须是 filed_info 数据结构，用于表示当前类或者接口的某个字段的完整描述，但它不包含从父类或者父接口继承的字段。</p><br><p><strong>methods_count</strong>：方法计数器，表示当前类方法表的成员个数。</p><br><p><strong>methods</strong>：方法表，是一个表结构，表中每个成员必须是 method_info 数据结构，用于表示当前类或者接口的某个方法的完整描述。</p><br><p><strong>attributes_count</strong>：属性计数器，表示当前 class 文件 attributes 属性表的成员个数。</p><br><p><strong>attributes</strong>：属性表，是一个表结构，表中每个成员必须是 attribute_info 数据结构，这里的属性是对 class 文件本身，方法或者字段的补充描述，比如 SourceFile 属性用于表示 class 文件的源代码文件名。</p><br>",33),d=p(`<br><p>当然，class 文件结构的细节是非常多的，如上图，展示了一个简单方法的字节码描述，可以看到真正的执行指令在整个文件结构中的位置。</p><h3 id="实际观测" tabindex="-1">实际观测 <a class="header-anchor" href="#实际观测" aria-label="Permalink to &quot;实际观测&quot;">​</a></h3><p>为了避免枯燥的二进制对比分析，直接定位到真正的数据结构，这里介绍一个小工具，使用这种方式学习字节码会节省很多时间。这个工具就是 <a href="https://wiki.openjdk.java.net/display/CodeTools/asmtools" target="_blank" rel="noreferrer">asmtools</a>，为了方便使用，我已经编译了一个 jar 包，放在了仓库里。</p><br><p>执行下面的命令，将看到类的 JCOD 语法结果。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java -jar asmtools-7.0.jar jdec LambdaDemo.class</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java -jar asmtools-7.0.jar jdec LambdaDemo.class</span></span></code></pre></div><br><p>输出的结果类似于下面的结构，它与我们上面介绍的字节码组成是一一对应的，对照官网或者资料去学习，速度飞快。若想要细挖字节码，一定要掌握好它。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class LambdaDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">  0xCAFEBABE;</span></span>
<span class="line"><span style="color:#E1E4E8;">  0; // minor version</span></span>
<span class="line"><span style="color:#E1E4E8;">  52; // version</span></span>
<span class="line"><span style="color:#E1E4E8;">  [] { // Constant Pool</span></span>
<span class="line"><span style="color:#E1E4E8;">    ; // first element is empty</span></span>
<span class="line"><span style="color:#E1E4E8;">    Method #8 #25; // #1</span></span>
<span class="line"><span style="color:#E1E4E8;">    InvokeDynamic 0s #30; // #2</span></span>
<span class="line"><span style="color:#E1E4E8;">    InterfaceMethod #31 #32; // #3</span></span>
<span class="line"><span style="color:#E1E4E8;">    Field #33 #34; // #4</span></span>
<span class="line"><span style="color:#E1E4E8;">    String #35; // #5</span></span>
<span class="line"><span style="color:#E1E4E8;">    Method #36 #37; // #6</span></span>
<span class="line"><span style="color:#E1E4E8;">    class #38; // #7</span></span>
<span class="line"><span style="color:#E1E4E8;">    class #39; // #8</span></span>
<span class="line"><span style="color:#E1E4E8;">    Utf8 &quot;&lt;</span><span style="color:#FDAEB7;font-style:italic;">init</span><span style="color:#E1E4E8;">&gt;&quot;; // #9</span></span>
<span class="line"><span style="color:#E1E4E8;">    Utf8 &quot;()V&quot;; // #10</span></span>
<span class="line"><span style="color:#E1E4E8;">    Utf8 &quot;Code&quot;; // #11</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class LambdaDemo {</span></span>
<span class="line"><span style="color:#24292E;">  0xCAFEBABE;</span></span>
<span class="line"><span style="color:#24292E;">  0; // minor version</span></span>
<span class="line"><span style="color:#24292E;">  52; // version</span></span>
<span class="line"><span style="color:#24292E;">  [] { // Constant Pool</span></span>
<span class="line"><span style="color:#24292E;">    ; // first element is empty</span></span>
<span class="line"><span style="color:#24292E;">    Method #8 #25; // #1</span></span>
<span class="line"><span style="color:#24292E;">    InvokeDynamic 0s #30; // #2</span></span>
<span class="line"><span style="color:#24292E;">    InterfaceMethod #31 #32; // #3</span></span>
<span class="line"><span style="color:#24292E;">    Field #33 #34; // #4</span></span>
<span class="line"><span style="color:#24292E;">    String #35; // #5</span></span>
<span class="line"><span style="color:#24292E;">    Method #36 #37; // #6</span></span>
<span class="line"><span style="color:#24292E;">    class #38; // #7</span></span>
<span class="line"><span style="color:#24292E;">    class #39; // #8</span></span>
<span class="line"><span style="color:#24292E;">    Utf8 &quot;&lt;</span><span style="color:#B31D28;font-style:italic;">init</span><span style="color:#24292E;">&gt;&quot;; // #9</span></span>
<span class="line"><span style="color:#24292E;">    Utf8 &quot;()V&quot;; // #10</span></span>
<span class="line"><span style="color:#24292E;">    Utf8 &quot;Code&quot;; // #11</span></span></code></pre></div><br><p>了解了类的文件组织方式，下面我们来看一下，类文件在加载到内存中以后，是一个怎样的表现形式。</p><h2 id="内存表示" tabindex="-1">内存表示 <a class="header-anchor" href="#内存表示" aria-label="Permalink to &quot;内存表示&quot;">​</a></h2><p>准备以下代码，使用 <strong>javac -g InvokeDemo.java</strong>进行编译，然后使用 java 命令执行。程序将阻塞在 sleep 函数上，我们来看一下它的内存分布：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">interface I {</span></span>
<span class="line"><span style="color:#E1E4E8;">    default void infMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    void inf();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">abstract class Abs {</span></span>
<span class="line"><span style="color:#E1E4E8;">    abstract void abs();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public class InvokeDemo extends Abs implements I {</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static void staticMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    private void privateMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public void publicMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void inf() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    void abs() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) throws Exception{</span></span>
<span class="line"><span style="color:#E1E4E8;">        InvokeDemo demo = new InvokeDemo();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        InvokeDemo.staticMethod();</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.abs();</span></span>
<span class="line"><span style="color:#E1E4E8;">        ((Abs) demo).abs();</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.inf();</span></span>
<span class="line"><span style="color:#E1E4E8;">        ((I) demo).inf();</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.privateMethod();</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.publicMethod();</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.infMethod();</span></span>
<span class="line"><span style="color:#E1E4E8;">        ((I) demo).infMethod();</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.sleep(Integer.MAX_VAL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">interface I {</span></span>
<span class="line"><span style="color:#24292E;">    default void infMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    void inf();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">abstract class Abs {</span></span>
<span class="line"><span style="color:#24292E;">    abstract void abs();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public class InvokeDemo extends Abs implements I {</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static void staticMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    private void privateMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public void publicMethod() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void inf() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    void abs() { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) throws Exception{</span></span>
<span class="line"><span style="color:#24292E;">        InvokeDemo demo = new InvokeDemo();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        InvokeDemo.staticMethod();</span></span>
<span class="line"><span style="color:#24292E;">        demo.abs();</span></span>
<span class="line"><span style="color:#24292E;">        ((Abs) demo).abs();</span></span>
<span class="line"><span style="color:#24292E;">        demo.inf();</span></span>
<span class="line"><span style="color:#24292E;">        ((I) demo).inf();</span></span>
<span class="line"><span style="color:#24292E;">        demo.privateMethod();</span></span>
<span class="line"><span style="color:#24292E;">        demo.publicMethod();</span></span>
<span class="line"><span style="color:#24292E;">        demo.infMethod();</span></span>
<span class="line"><span style="color:#24292E;">        ((I) demo).infMethod();</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Thread.sleep(Integer.MAX_VAL</span></span></code></pre></div><br><p>为了更加明显的看到这个过程，下面介绍一个 jhsdb 工具，这是在 Java 9 之后 JDK 先加入的调试工具，我们可以在命令行中使用 <strong>jhsdb hsdb</strong>来启动它。注意，要加载相应的进程时，必须确保是同一个版本的应用进程，否则会产生报错。</p><br>`,21),y=s("br",null,null,-1),h=s("p",null,[n("attach 启动 Java 进程后，可以在 "),s("strong",null,"Class Browser"),n(" 菜单中查看加载的所有类信息。我们在搜索框中输入 "),s("strong",null,"InvokeDemo"),n("，找到要查看的类。")],-1),g=s("br",null,null,-1),u=s("br",null,null,-1),v=s("p",null,[s("strong",null,"@"),n(" 符号后面的，就是具体的内存地址，我们可以复制一个，然后在 "),s("strong",null,"Inspector"),n(" 视图中查看具体的属性，可以"),s("strong",null,"大体"),n("认为这就是类在方法区的具体存储。")],-1),b=s("br",null,null,-1),m=s("br",null,null,-1),_=s("p",null,[n("在 Inspector 视图中，我们找到方法相关的属性 "),s("strong",null,"_methods"),n("，可惜它无法点开，也无法查看。")],-1),k=s("br",null,null,-1),M=p('<br><p>接下来使用命令行来检查这个数组里面的值。打开菜单中的 Console，然后输入 examine 命令，可以看到这个数组里的内容，对应的地址就是 Class 视图中的方法地址。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">examine 0x000000010e650570/10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">examine 0x000000010e650570/10</span></span></code></pre></div><br>',5),C=s("br",null,null,-1),A=s("p",null,"我们可以在 Inspect 视图中看到方法所对应的内存信息，这确实是一个 Method 方法的表示。",-1),f=s("br",null,null,-1),S=s("br",null,null,-1),j=s("p",null,"相比较起来，对象就简单了，它只需要保存一个到达 Class 对象的指针即可。我们需要先从对象视图中进入，然后找到它，一步步进入 Inspect 视图。",-1),T=s("br",null,null,-1),I=s("br",null,null,-1),q=s("p",null,"由以上的这些分析，可以得出下面这张图。执行引擎想要运行某个对象的方法，需要先在栈上找到这个对象的引用，然后再通过对象的指针，找到相应的方法字节码。",-1),V=s("br",null,null,-1),L=p(`<h2 id="方法调用指令" tabindex="-1">方法调用指令 <a class="header-anchor" href="#方法调用指令" aria-label="Permalink to &quot;方法调用指令&quot;">​</a></h2><p>关于方法的调用，Java 共提供了 5 个指令，来调用不同类型的函数：</p><ul><li><p><strong>invokestatic</strong> 用来调用静态方法；</p></li><li><p><strong>invokevirtual</strong> 用于调用非私有实例方法，比如 public 和 protected，大多数方法调用属于这一种；</p></li><li><p><strong>invokeinterface</strong> 和上面这条指令类似，不过作用于接口类；</p></li><li><p><strong>invokespecial</strong> 用于调用私有实例方法、构造器及 super 关键字等；</p></li><li><p><strong>invokedynamic</strong> 用于调用动态方法。</p></li></ul><br><p>我们依然使用上面的代码片段来看一下前四个指令的使用场景。代码中包含一个接口 <strong>I、</strong> 一个抽象类 <strong>Abs、</strong> 一个实现和继承了两者类的 <strong>InvokeDemo</strong>。</p><br><p>回想一下，第 03 课时讲到的类加载机制，在 class 文件被加载到方法区以后，就完成了从符号引用到具体地址的转换过程。</p><br><p>我们可以看一下编译后的 main 方法字节码，尤其需要注意的是对于接口方法的调用。使用实例对象直接调用，和强制转化成接口调用，所调用的字节码指令分别是 <strong>invokevirtual</strong> 和 <strong>invokeinterface</strong>，它们是有所不同的。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public static void main(java.lang.String[]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ([Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags: ACC_PUBLIC, ACC_STATIC</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=2, locals=2, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: new           #2                  // class InvokeDemo</span></span>
<span class="line"><span style="color:#E1E4E8;">         3: dup</span></span>
<span class="line"><span style="color:#E1E4E8;">         4: invokespecial #3                  // Method &quot;&lt;</span><span style="color:#FDAEB7;font-style:italic;">init</span><span style="color:#E1E4E8;">&gt;&quot;:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">         7: astore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         8: invokestatic  #4                  // Method staticMethod:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        11: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        12: invokevirtual #5                  // Method abs:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        15: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        16: invokevirtual #6                  // Method Abs.abs:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        19: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        20: invokevirtual #7                  // Method inf:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        23: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        24: invokeinterface #8,  1            // InterfaceMethod I.inf:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        29: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        30: invokespecial #9                  // Method privateMethod:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        33: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        34: invokevirtual #10                 // Method publicMethod:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        37: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        38: invokevirtual #11                 // Method infMethod:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        41: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        42: invokeinterface #12,  1           // InterfaceMethod I.infMethod:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        47: return</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public static void main(java.lang.String[]);</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ([Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#24292E;">    flags: ACC_PUBLIC, ACC_STATIC</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=2, locals=2, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: new           #2                  // class InvokeDemo</span></span>
<span class="line"><span style="color:#24292E;">         3: dup</span></span>
<span class="line"><span style="color:#24292E;">         4: invokespecial #3                  // Method &quot;&lt;</span><span style="color:#B31D28;font-style:italic;">init</span><span style="color:#24292E;">&gt;&quot;:()V</span></span>
<span class="line"><span style="color:#24292E;">         7: astore_1</span></span>
<span class="line"><span style="color:#24292E;">         8: invokestatic  #4                  // Method staticMethod:()V</span></span>
<span class="line"><span style="color:#24292E;">        11: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        12: invokevirtual #5                  // Method abs:()V</span></span>
<span class="line"><span style="color:#24292E;">        15: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        16: invokevirtual #6                  // Method Abs.abs:()V</span></span>
<span class="line"><span style="color:#24292E;">        19: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        20: invokevirtual #7                  // Method inf:()V</span></span>
<span class="line"><span style="color:#24292E;">        23: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        24: invokeinterface #8,  1            // InterfaceMethod I.inf:()V</span></span>
<span class="line"><span style="color:#24292E;">        29: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        30: invokespecial #9                  // Method privateMethod:()V</span></span>
<span class="line"><span style="color:#24292E;">        33: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        34: invokevirtual #10                 // Method publicMethod:()V</span></span>
<span class="line"><span style="color:#24292E;">        37: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        38: invokevirtual #11                 // Method infMethod:()V</span></span>
<span class="line"><span style="color:#24292E;">        41: aload_1</span></span>
<span class="line"><span style="color:#24292E;">        42: invokeinterface #12,  1           // InterfaceMethod I.infMethod:()V</span></span>
<span class="line"><span style="color:#24292E;">        47: return</span></span></code></pre></div><br><p>另外还有一点，和我们想象中的不同，大多数普通方法调用，使用的是 <strong>invokevirtual</strong> 指令，它其实和 <strong>invokeinterface</strong>是一类的，都属于虚方法调用。很多时候，JVM 需要根据调用者的动态类型，来确定调用的目标方法，这就是动态绑定的过程。</p><br><p>invokevirtual 指令有多态查找的机制，该指令运行时，解析过程如下：</p><ul><li><p>找到操作数栈顶的第一个元素所指向的对象实际类型，记做 c；</p></li><li><p>如果在类型 c 中找到与常量中的描述符和简单名称都相符的方法，则进行访问权限校验，如果通过则返回这个方法直接引用，查找过程结束，不通过则返回 java.lang.IllegalAccessError；</p></li><li><p>否则，按照继承关系从下往上依次对 c 的各个父类进行第二步的搜索和验证过程；</p></li><li><p>如果始终没找到合适的方法，则抛出 java.lang.AbstractMethodError 异常，这就是 Java 语言中方法重写的本质。</p></li></ul><br><p>相对比，<strong>invokestatic</strong> 指令加上 <strong>invokespecial</strong>指令，就属于静态绑定过程。</p><br><p>所以<strong>静态绑定</strong> ，指的是能够直接识别目标方法的情况，而<strong>动态绑定</strong>指的是需要在运行过程中根据调用者的类型来确定目标方法的情况。</p><br><p>可以想象，相对于静态绑定的方法调用来说，动态绑定的调用会更加耗时一些。由于方法的调用非常的频繁，JVM 对动态调用的代码进行了比较多的优化，比如使用方法表来加快对具体方法的寻址，以及使用更快的缓冲区来直接寻址（ 内联缓存）。</p><h2 id="invokedynamic" tabindex="-1">invokedynamic <a class="header-anchor" href="#invokedynamic" aria-label="Permalink to &quot;invokedynamic&quot;">​</a></h2><p>有时候在写一些 Python 脚本或者JS 脚本时，特别羡慕这些动态语言。如果把查找目标方法的决定权，从虚拟机转嫁给用户代码，我们就会有更高的自由度。</p><br><p>之所以单独把 invokedynamic 抽离出来介绍，是因为它比较复杂。和反射类似，它用于一些动态的调用场景，但它和反射有着本质的不同，效率也比反射要高得多。</p><br><p>这个指令通常在 Lambda 语法中出现，我们来看一下一小段代码：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class LambdaDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Runnable r = () -&gt; System.out.println(&quot;Hello Lambda&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        r.run();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class LambdaDemo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Runnable r = () -&gt; System.out.println(&quot;Hello Lambda&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        r.run();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>使用 javap -p -v 命令可以在 main 方法中看到 invokedynamic 指令：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public static void main(java.lang.String[]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor: ([Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags: ACC_PUBLIC, ACC_STATIC</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack=1, locals=2, args_size=1</span></span>
<span class="line"><span style="color:#E1E4E8;">         0: invokedynamic #2,  0              // InvokeDynamic #0:run:()Ljava/lang/Runnable;</span></span>
<span class="line"><span style="color:#E1E4E8;">         5: astore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         6: aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         7: invokeinterface #3,  1            // InterfaceMethod java/lang/Runnable.run:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">        12: return</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public static void main(java.lang.String[]);</span></span>
<span class="line"><span style="color:#24292E;">    descriptor: ([Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#24292E;">    flags: ACC_PUBLIC, ACC_STATIC</span></span>
<span class="line"><span style="color:#24292E;">    Code:</span></span>
<span class="line"><span style="color:#24292E;">      stack=1, locals=2, args_size=1</span></span>
<span class="line"><span style="color:#24292E;">         0: invokedynamic #2,  0              // InvokeDynamic #0:run:()Ljava/lang/Runnable;</span></span>
<span class="line"><span style="color:#24292E;">         5: astore_1</span></span>
<span class="line"><span style="color:#24292E;">         6: aload_1</span></span>
<span class="line"><span style="color:#24292E;">         7: invokeinterface #3,  1            // InterfaceMethod java/lang/Runnable.run:()V</span></span>
<span class="line"><span style="color:#24292E;">        12: return</span></span></code></pre></div><br><p>另外，我们在 javap 的输出中找到了一些奇怪的东西：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">BootstrapMethods:</span></span>
<span class="line"><span style="color:#E1E4E8;">  0: #27 invokestatic java/lang/invoke/LambdaMetafactory.metafactory:</span></span>
<span class="line"><span style="color:#E1E4E8;">  (Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang</span></span>
<span class="line"><span style="color:#E1E4E8;">  /invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/</span></span>
<span class="line"><span style="color:#E1E4E8;">  MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Method arguments:</span></span>
<span class="line"><span style="color:#E1E4E8;">      #28 ()V</span></span>
<span class="line"><span style="color:#E1E4E8;">      #29 invokestatic LambdaDemo.lambda$main$0:()V</span></span>
<span class="line"><span style="color:#E1E4E8;">      #28 ()V</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">BootstrapMethods:</span></span>
<span class="line"><span style="color:#24292E;">  0: #27 invokestatic java/lang/invoke/LambdaMetafactory.metafactory:</span></span>
<span class="line"><span style="color:#24292E;">  (Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang</span></span>
<span class="line"><span style="color:#24292E;">  /invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/</span></span>
<span class="line"><span style="color:#24292E;">  MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;</span></span>
<span class="line"><span style="color:#24292E;">    Method arguments:</span></span>
<span class="line"><span style="color:#24292E;">      #28 ()V</span></span>
<span class="line"><span style="color:#24292E;">      #29 invokestatic LambdaDemo.lambda$main$0:()V</span></span>
<span class="line"><span style="color:#24292E;">      #28 ()V</span></span></code></pre></div><br><p>BootstrapMethods 属性在 Java 1.7 以后才有，位于类文件的属性列表中，这个属性用于保存 invokedynamic 指令引用的引导方法限定符。</p><br><p>和上面介绍的四个指令不同，invokedynamic 并没有确切的接受对象，取而代之的，是一个叫 <strong>CallSite</strong>的对象。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">static CallSite bootstrap(MethodHandles.Lookup caller, String name, MethodType type);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">static CallSite bootstrap(MethodHandles.Lookup caller, String name, MethodType type);</span></span></code></pre></div><br><p>其实，invokedynamic 指令的底层，是使用<strong>方法句柄</strong>（MethodHandle）来实现的。方法句柄是一个能够被执行的引用，它可以指向静态方法和实例方法，以及虚构的 get 和 set 方法，从 IDE 中可以看到这些函数。</p><br>`,46),D=p(`<br><p><strong>句柄类型</strong>（MethodType）是我们对方法的具体描述，配合方法名称，能够定位到一类函数。访问方法句柄和调用原来的指令基本一致，但它的调用异常，包括一些权限检查，在运行时才能被发现。</p><br><p>下面这段代码，可以完成一些动态语言的特性，通过方法名称和传入的对象主体，进行不同的调用，而 Bike 和 Man 类，可以没有任何关系。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import java.lang.invoke.MethodHandle;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.invoke.MethodHandles;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.lang.invoke.MethodType;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public class MethodHandleDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static class Bike {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String sound() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return &quot;ding ding&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class Animal {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String sound() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return &quot;wow wow&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class Man extends Animal {</span></span>
<span class="line"><span style="color:#E1E4E8;">        @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">        String sound() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return &quot;hou hou&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    String sound(Object o) throws Throwable {</span></span>
<span class="line"><span style="color:#E1E4E8;">        MethodHandles.Lookup lookup = MethodHandles.lookup();</span></span>
<span class="line"><span style="color:#E1E4E8;">        MethodType methodType = MethodType.methodType(String.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">        MethodHandle methodHandle = lookup.findVirtual(o.getClass(), &quot;sound&quot;, methodType);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        String obj = (String) methodHandle.invoke(o);</span></span>
<span class="line"><span style="color:#E1E4E8;">        return obj;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) throws Throwable {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String str = new MethodHandleDemo().sound(new Bike());</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(str);</span></span>
<span class="line"><span style="color:#E1E4E8;">        str = new MethodHandleDemo().sound(new Animal());</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(str);</span></span>
<span class="line"><span style="color:#E1E4E8;">        str = new MethodHandleDemo().sound(new Man());</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(str);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import java.lang.invoke.MethodHandle;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.invoke.MethodHandles;</span></span>
<span class="line"><span style="color:#24292E;">import java.lang.invoke.MethodType;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public class MethodHandleDemo {</span></span>
<span class="line"><span style="color:#24292E;">    static class Bike {</span></span>
<span class="line"><span style="color:#24292E;">        String sound() {</span></span>
<span class="line"><span style="color:#24292E;">            return &quot;ding ding&quot;;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class Animal {</span></span>
<span class="line"><span style="color:#24292E;">        String sound() {</span></span>
<span class="line"><span style="color:#24292E;">            return &quot;wow wow&quot;;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class Man extends Animal {</span></span>
<span class="line"><span style="color:#24292E;">        @Override</span></span>
<span class="line"><span style="color:#24292E;">        String sound() {</span></span>
<span class="line"><span style="color:#24292E;">            return &quot;hou hou&quot;;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    String sound(Object o) throws Throwable {</span></span>
<span class="line"><span style="color:#24292E;">        MethodHandles.Lookup lookup = MethodHandles.lookup();</span></span>
<span class="line"><span style="color:#24292E;">        MethodType methodType = MethodType.methodType(String.class);</span></span>
<span class="line"><span style="color:#24292E;">        MethodHandle methodHandle = lookup.findVirtual(o.getClass(), &quot;sound&quot;, methodType);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        String obj = (String) methodHandle.invoke(o);</span></span>
<span class="line"><span style="color:#24292E;">        return obj;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) throws Throwable {</span></span>
<span class="line"><span style="color:#24292E;">        String str = new MethodHandleDemo().sound(new Bike());</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(str);</span></span>
<span class="line"><span style="color:#24292E;">        str = new MethodHandleDemo().sound(new Animal());</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(str);</span></span>
<span class="line"><span style="color:#24292E;">        str = new MethodHandleDemo().sound(new Man());</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(str);</span></span></code></pre></div><br><p>可以看到 Lambda 语言实际上是通过方法句柄来完成的，在调用链上自然也多了一些调用步骤，那么在性能上，是否就意味着 Lambda 性能低呢？对于大部分&quot;非捕获&quot;的 Lambda 表达式来说，JIT 编译器的逃逸分析能够优化这部分差异，性能和传统方式无异；但对于&quot;捕获型&quot;的表达式来说，则需要通过方法句柄，不断地生成适配器，性能自然就低了很多（不过和便捷性相比，一丁点性能损失是可接受的）。</p><br><p>除了 Lambda 表达式，我们还没有其他的方式来产生 invokedynamic 指令。但可以使用一些外部的字节码修改工具，比如 ASM，来生成一些带有这个指令的字节码，这通常能够完成一些非常酷的功能，比如完成一门弱类型检查的 JVM-Base 语言。</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本课时从 Java 字节码的顶层结构介绍开始，通过一个实际代码，了解了类加载以后，在 JVM 内存里的表现形式，并学习了 jhsdb 对 Java 进程的观测方式。</p><br><p>接下来，我们分析了 invokestatic、invokevirtual、invokeinterface、invokespecial 这四个字节码指令的使用场景，并从字节码中看到了这些区别。</p><br><p>最后，了解了 Java 7 之后的 invokedynamic 指令，它实际上是通过方法句柄来实现的。和我们关系最大的就是 Lambda 语法，了解了这些原理，可以忽略那些对 Lambda 性能高低的争论，要尽量写一些&quot;非捕获&quot;的 Lambda 表达式。</p><br>`,17);function w(P,x,H,B,J,F){const a=o("Image");return t(),c("div",null,[r,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KeAAJqIAAC_nqBW9x8213.jpg"}),n(),E,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KeAKhUAAAFE99wUPW0675.jpg"}),n(),d,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KeAVTC2AACpnNi6GE0282.jpg"}),n(),y,h,g,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KeAQIsAAACaFyeUVPI476.jpg"}),n(),u,v,b,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KiAWuv-AAGcKB6dCE4406.jpg"}),n(),m,_,k,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KiALPruAAD5Er51lCo505.jpg"}),n(),M,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KiARdERAAGRPMESLnI388.jpg"}),n(),C,A,f,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KiAHHFPAAGXAWSStVA060.jpg"}),n(),S,j,T,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KmAY-DPAAE7J_7eC4A001.jpg"}),n(),I,q,V,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KmAO0npAABUB89jbXE399.jpg"}),n(),L,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KmAKs5YAADn6hIT-L8728.jpg"}),n(),D])}const N=e(i,[["render",w]]);export{O as __pageData,N as default};
