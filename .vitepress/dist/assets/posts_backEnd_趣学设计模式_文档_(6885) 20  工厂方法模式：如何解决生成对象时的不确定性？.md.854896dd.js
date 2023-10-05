import{_ as o,j as t,o as e,g as c,k as l,Q as p,s,h as n}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6885) 20  工厂方法模式：如何解决生成对象时的不确定性？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6885) 20  工厂方法模式：如何解决生成对象时的不确定性？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/趣学设计模式_文档/(6885) 20  工厂方法模式：如何解决生成对象时的不确定性？.md"},i=p('<p>在上一讲中，我们介绍了工厂模式中的抽象工厂模式，为便于你更好地理解，我们还通过家具厂的实例讲解了抽象工厂的使用步骤，并结合 Spring Framework 框架中的 BeanFactory 说明了寻找正确抽象的重要性。</p><p>今天我们接着来讲解另外一个工厂模式：<strong>工厂方法模式（Factory Method Pattern）</strong>。</p><p>工厂方法模式就是我们俗称的工厂模式，和抽象工厂模式很类似，但<strong>工厂方法模式因为只围绕着一类接口来进行对象的创建与使用，使用场景更简单和单一，在实际的项目中使用频率反而比抽象工厂模式更高</strong>。</p><p>那么，话不多说，接下来我们就开始今天的学习吧！</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>工厂方法模式的原始定义是：定义一个创建对象的接口，但让实现这个接口的类来决定实例化哪个类。</p><p>工厂方法模式的目的很简单，就是<strong>封装对象创建的过程，提升创建对象方法的可复用性</strong>。</p><p>我们直接来看看工厂方法模式的 UML 图：</p>',8),E=p(`<p>从图中可以看出，工厂方法模式包含三个关键角色：</p><ul><li><p>抽象接口（也叫抽象产品）；</p></li><li><p>核心工厂；</p></li><li><p>具体产品（也可以是具体工厂）。</p></li></ul><p>其中，<strong>核心工厂</strong> 通常作为父类负责定义创建对象的<strong>抽象接口</strong> 以及使用哪些<strong>具体产品</strong>，具体产品可以是一个具体的类，也可以是一个具体工厂类，负责生成具体的对象实例。于是，工厂方法模式便将对象的实例化操作延迟到了具体产品子类中去完成。</p><p>不同于抽象工厂模式，工厂方法模式侧重于直接对具体产品的实现进行封装和调用，通过统一的接口定义来约束程序的对外行为。换句话说，<strong>用户通过使用核心工厂来获得具体实例对象，再通过对象的统一接口来使用对象功能</strong>。</p><p>工厂方法模式对应 UML 图的代码实现如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">//抽象产品</span></span>
<span class="line"><span style="color:#E1E4E8;">public interface IProduct {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void apply();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//核心工厂类</span></span>
<span class="line"><span style="color:#E1E4E8;">public class ProductFactory {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static IProduct getProduct(String name){</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (&quot;a&quot;.equals(name)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return new Product_A_Impl();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return new Product_B_Impl();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//具体产品实现A</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Product_A_Impl implements IProduct{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void apply() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;use A product now&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//具体产品实现B</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Product_B_Impl implements IProduct{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void apply() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;use B product now&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//client使用者</span></span>
<span class="line"><span style="color:#E1E4E8;">public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    IProduct iProduct = ProductFactory.getProduct(&quot;&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    iProduct.apply();</span></span>
<span class="line"><span style="color:#E1E4E8;">    IProduct iProducta = ProductFactory.getProduct(&quot;a&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    iProducta.apply();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">//抽象产品</span></span>
<span class="line"><span style="color:#24292E;">public interface IProduct {</span></span>
<span class="line"><span style="color:#24292E;">    void apply();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//核心工厂类</span></span>
<span class="line"><span style="color:#24292E;">public class ProductFactory {</span></span>
<span class="line"><span style="color:#24292E;">    public static IProduct getProduct(String name){</span></span>
<span class="line"><span style="color:#24292E;">        if (&quot;a&quot;.equals(name)) {</span></span>
<span class="line"><span style="color:#24292E;">            return new Product_A_Impl();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return new Product_B_Impl();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//具体产品实现A</span></span>
<span class="line"><span style="color:#24292E;">public class Product_A_Impl implements IProduct{</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void apply() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;use A product now&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//具体产品实现B</span></span>
<span class="line"><span style="color:#24292E;">public class Product_B_Impl implements IProduct{</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void apply() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;use B product now&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//client使用者</span></span>
<span class="line"><span style="color:#24292E;">public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">    IProduct iProduct = ProductFactory.getProduct(&quot;&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    iProduct.apply();</span></span>
<span class="line"><span style="color:#24292E;">    IProduct iProducta = ProductFactory.getProduct(&quot;a&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    iProducta.apply();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这段代码实现很简单，通过定义一个通用的接口 IProduct，实现 use 的方法，并使用 ProductFactory 工厂通过产品名称来创建具体子类。</p><p>在前面的<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=710&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=6880&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">《15 | 分离原则：如何将复杂问题拆分成小问题？》</a>这一讲，我们介绍过一个视角：<strong>使用与创建分离</strong>。我们知道了使用与创建分离的好处在于能够提升组件的复用性，同时保证对象在同一个逻辑层级里，能够方便阅读与维护。</p><p>但你发现没，实际上<strong>使用工厂方法模式就能很好地实现分离原则</strong>。在工厂方法模式中，核心的工厂 ProductFactory 类不会负责所有产品的创建，只是负责实现通用逻辑，具体的实例创建工作都是交给具体工厂去做的，同时子类需要实现一个公共的接口来对外提供统一的功能，这使得工厂方法模式可以允许程序在不修改工厂角色的情况下引入新的产品实现。</p><p>那么，工厂方法模式封装了哪些变化呢？主要有以下三个。</p><ul><li><p>工厂使用了哪些具体的实现算法；</p></li><li><p>工厂使用的具体产品数量；</p></li><li><p>工厂定义的抽象产品。</p></li></ul><p>总体来说，<strong>工厂方法模式是围绕着特定的抽象产品（一般是接口）来封装对象的创建过程，客户端只需要通过工厂类来创建对象并使用特定接口的功能</strong>。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>一般情况下，工厂方法模式有以下几个使用场景。</p><ul><li><p>需要使用很多重复代码创建对象时，比如，DAO 层的数据对象、API 层的 VO 对象等。</p></li><li><p>创建对象要访问外部信息或资源时，比如，读取数据库字段，获取访问授权 token 信息，配置文件等。</p></li><li><p>创建需要统一管理生命周期的对象时，比如，会话信息、用户网页浏览轨迹对象等。</p></li><li><p>创建池化对象时，比如，连接池对象、线程池对象、日志对象等。这些对象的特性是：有限、可重用，使用工厂方法模式可以有效节约资源。</p></li><li><p>希望隐藏对象的真实类型时，比如，不希望使用者知道对象的真实构造函数参数等。</p></li></ul><p>为了帮助你更好地理解使用场景的本质特征，这里我们通过一段经典的源码实现------MyBatis 实现的 Log 日志功能------来学习。代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public final class LogFactory {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static final String MARKER = &quot;MYBATIS&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private static Constructor</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">? extends Log&gt; logConstructor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private LogFactory() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static Log getLog(Class</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">?&gt; clazz) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return getLog(clazz.getName());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static Log getLog(String logger) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        try {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return (Log)logConstructor.newInstance(logger);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } catch (Throwable var2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            throw new LogException(&quot;Error creating logger for logger &quot; + logger + &quot;.  Cause: &quot; + var2, var2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...省略具体工厂实现类...</span></span>
<span class="line"><span style="color:#E1E4E8;">    private static void tryImplementation(Runnable runnable) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (logConstructor == null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            try {</span></span>
<span class="line"><span style="color:#E1E4E8;">                runnable.run();</span></span>
<span class="line"><span style="color:#E1E4E8;">            } catch (Throwable var2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    private static void setImplementation(Class</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">? extends Log&gt; implClass) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        try {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Constructor</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">? extends Log&gt; candidate = implClass.getConstructor(String.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">            Log log = (Log)candidate.newInstance(LogFactory.class.getName());</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (log.isDebugEnabled()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                log.debug(&quot;Logging initialized using &#39;&quot; + implClass + &quot;&#39; adapter.&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            logConstructor = candidate;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } catch (Throwable var3) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            throw new LogException(&quot;Error setting Log implementation.  Cause: &quot; + var3, var3);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    static {</span></span>
<span class="line"><span style="color:#E1E4E8;">        tryImplementation(LogFactory::useSlf4jLogging);</span></span>
<span class="line"><span style="color:#E1E4E8;">        tryImplementation(LogFactory::useCommonsLogging);</span></span>
<span class="line"><span style="color:#E1E4E8;">        tryImplementation(LogFactory::useLog4J2Logging);</span></span>
<span class="line"><span style="color:#E1E4E8;">        tryImplementation(LogFactory::useLog4JLogging);</span></span>
<span class="line"><span style="color:#E1E4E8;">        tryImplementation(LogFactory::useJdkLogging);</span></span>
<span class="line"><span style="color:#E1E4E8;">        tryImplementation(LogFactory::useNoLogging);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public final class LogFactory {</span></span>
<span class="line"><span style="color:#24292E;">    public static final String MARKER = &quot;MYBATIS&quot;;</span></span>
<span class="line"><span style="color:#24292E;">    private static Constructor</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">? extends Log&gt; logConstructor;</span></span>
<span class="line"><span style="color:#24292E;">    private LogFactory() {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public static Log getLog(Class</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">?&gt; clazz) {</span></span>
<span class="line"><span style="color:#24292E;">        return getLog(clazz.getName());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public static Log getLog(String logger) {</span></span>
<span class="line"><span style="color:#24292E;">        try {</span></span>
<span class="line"><span style="color:#24292E;">            return (Log)logConstructor.newInstance(logger);</span></span>
<span class="line"><span style="color:#24292E;">        } catch (Throwable var2) {</span></span>
<span class="line"><span style="color:#24292E;">            throw new LogException(&quot;Error creating logger for logger &quot; + logger + &quot;.  Cause: &quot; + var2, var2);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    ...省略具体工厂实现类...</span></span>
<span class="line"><span style="color:#24292E;">    private static void tryImplementation(Runnable runnable) {</span></span>
<span class="line"><span style="color:#24292E;">        if (logConstructor == null) {</span></span>
<span class="line"><span style="color:#24292E;">            try {</span></span>
<span class="line"><span style="color:#24292E;">                runnable.run();</span></span>
<span class="line"><span style="color:#24292E;">            } catch (Throwable var2) {</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    private static void setImplementation(Class</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">? extends Log&gt; implClass) {</span></span>
<span class="line"><span style="color:#24292E;">        try {</span></span>
<span class="line"><span style="color:#24292E;">            Constructor</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">? extends Log&gt; candidate = implClass.getConstructor(String.class);</span></span>
<span class="line"><span style="color:#24292E;">            Log log = (Log)candidate.newInstance(LogFactory.class.getName());</span></span>
<span class="line"><span style="color:#24292E;">            if (log.isDebugEnabled()) {</span></span>
<span class="line"><span style="color:#24292E;">                log.debug(&quot;Logging initialized using &#39;&quot; + implClass + &quot;&#39; adapter.&quot;);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            logConstructor = candidate;</span></span>
<span class="line"><span style="color:#24292E;">        } catch (Throwable var3) {</span></span>
<span class="line"><span style="color:#24292E;">            throw new LogException(&quot;Error setting Log implementation.  Cause: &quot; + var3, var3);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    static {</span></span>
<span class="line"><span style="color:#24292E;">        tryImplementation(LogFactory::useSlf4jLogging);</span></span>
<span class="line"><span style="color:#24292E;">        tryImplementation(LogFactory::useCommonsLogging);</span></span>
<span class="line"><span style="color:#24292E;">        tryImplementation(LogFactory::useLog4J2Logging);</span></span>
<span class="line"><span style="color:#24292E;">        tryImplementation(LogFactory::useLog4JLogging);</span></span>
<span class="line"><span style="color:#24292E;">        tryImplementation(LogFactory::useJdkLogging);</span></span>
<span class="line"><span style="color:#24292E;">        tryImplementation(LogFactory::useNoLogging);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这段代码的实现很简单，却充分体现了<strong>工厂方法模式使用场景的本质：尽可能地封装对象创建过程中所遇见的所有可能变化</strong>。</p><p>这里 LogFactory 的职责就是核心工厂的创建职责，所需要创建的具体产品就是实现 Log 这个接口的特定实现，比如，Slf4j、Log4J 等。Log 接口代码如下所示：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Log {</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean isDebugEnabled();</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean isTraceEnabled();</span></span>
<span class="line"><span style="color:#E1E4E8;">    void error(String var1, Throwable var2);</span></span>
<span class="line"><span style="color:#E1E4E8;">    void error(String var1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    void debug(String var1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    void trace(String var1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    void warn(String var1);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Log {</span></span>
<span class="line"><span style="color:#24292E;">    boolean isDebugEnabled();</span></span>
<span class="line"><span style="color:#24292E;">    boolean isTraceEnabled();</span></span>
<span class="line"><span style="color:#24292E;">    void error(String var1, Throwable var2);</span></span>
<span class="line"><span style="color:#24292E;">    void error(String var1);</span></span>
<span class="line"><span style="color:#24292E;">    void debug(String var1);</span></span>
<span class="line"><span style="color:#24292E;">    void trace(String var1);</span></span>
<span class="line"><span style="color:#24292E;">    void warn(String var1);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>而具体的产品实现就是通过以下的类去实现的：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Slf4jImpl.class</span></span>
<span class="line"><span style="color:#E1E4E8;">JakartaCommonsLoggingImpl.class</span></span>
<span class="line"><span style="color:#E1E4E8;">Log4jImpl.class</span></span>
<span class="line"><span style="color:#E1E4E8;">Log4j2Impl.class</span></span>
<span class="line"><span style="color:#E1E4E8;">Jdk14LoggingImpl.class</span></span>
<span class="line"><span style="color:#E1E4E8;">StdOutImpl.class</span></span>
<span class="line"><span style="color:#E1E4E8;">NoLoggingImpl.class</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Slf4jImpl.class</span></span>
<span class="line"><span style="color:#24292E;">JakartaCommonsLoggingImpl.class</span></span>
<span class="line"><span style="color:#24292E;">Log4jImpl.class</span></span>
<span class="line"><span style="color:#24292E;">Log4j2Impl.class</span></span>
<span class="line"><span style="color:#24292E;">Jdk14LoggingImpl.class</span></span>
<span class="line"><span style="color:#24292E;">StdOutImpl.class</span></span>
<span class="line"><span style="color:#24292E;">NoLoggingImpl.class</span></span></code></pre></div><p>如果你看过这些具体类的代码实现，就会发现各自的代码风格可能完全不同，但最终实现的日志功能却是一样的。其中，Slf4jImpl 甚至还为不同的 Slf4j 版本 API 接口做了兼容性处理，如果想要扩展一个新的日志实现，那么新增一个实现类并在核心工厂类里加入你的调用代码即可。</p><p>你发现没，这里的关键其实是 Log 这个接口，这个接口设计得非常好，也就是抽象产品设计得特别好，不仅满足接口隔离原则，而且还是找到了正确抽象的典型代表。每一个操作几乎都是日志相关的原子操作，即便具体类的实现不同，但只要使用 LogFactory 就能获得满足要求的日志功能。</p><h3 id="为什么要用工厂方法模式" tabindex="-1">为什么要用工厂方法模式？ <a class="header-anchor" href="#为什么要用工厂方法模式" aria-label="Permalink to &quot;为什么要用工厂方法模式？&quot;">​</a></h3><p>分析完工厂方法模式的原理和使用场景后，我们再来说说使用工厂方法模式的原因，主要有以下三个。</p><p><strong>第一个，为了把对象的创建和使用过程分开，降低代码耦合性。</strong> 这是使用工厂方法模式最直接的理由之一。在实际的软件开发中，你可能更喜欢使用 new 来创建对象，同时紧接着便开始使用新创建的对象，这看上去并没有什么问题，但是随着创建对象数量的增多，你会发现，当你想要重构、修改已有的对象属性和方法时，你几乎不敢轻易修改，因为你早已记不清哪些对象在哪里被创建和使用，以及跟哪些对象发生了关联和交互。而使用工厂方法模式，就能很好地避免这个问题，创建的过程始终在工厂内部管理，只要对外使用的方法不发生变化，那么就不会对创建对象造成影响。</p><p><strong>第二个，减少重复代码。</strong> 对于要写代码的程序员或架构师来说，面对成千上万相同的数据对象进行增删改查时，如果每次都使用 new 来创建对象的话，那么 80% 的时间都会浪费在同样属性的 get 与 set 上。这时要是使用的对象之间还有相互引用的话（A 引用 B，B 又引用 C......），重复的代码就会剧增。而对于多个相同对象的构建过程，除了使用建造者模式以外，还可以使用工厂方法模式来避免出现过多的重复代码，将相同的创建规则统一放在一起。</p><p><strong>第三个，统一管理创建对象的不同实现逻辑。</strong> 比如，当一个业务对象发生业务逻辑变化时，使用工厂方法模式后，你不需要找到所有创建对象的地方去修改，而只需要在工厂里修改即可。即便这时你想要扩展对象为新的子类，也不需要把所有调用父类的地方都改成子类，只需要在工厂中修改其生产的对象为新的子类。同时，还隐藏了具体的创建过程，减少了使用者误用逻辑而导致未知错误出现的概率。</p><h3 id="收益与损失" tabindex="-1">收益与损失 <a class="header-anchor" href="#收益与损失" aria-label="Permalink to &quot;收益与损失&quot;">​</a></h3><p>使用工厂方法模式主要有以下几个优点。</p><ul><li><p><strong>能根据用户的需求定制化地创建对象。</strong> 工厂方法模式是基于某一个抽象产品角色来进行具体的实现工厂的设计。这样的好处就在于具体工厂可以根据自己的需求来决定创建什么样的具体产品，同时，还能把不同的算法细节完全封装在具体的工厂内部。</p></li><li><p><strong>隐藏了具体使用哪种产品来创建对象。</strong> 由于工厂方法模式对外使用统一的抽象接口，这样就向用户隐藏了具体正在使用的产品实例，让用户只需要关心抽象接口即可，无须关心创建细节，甚至都不用知道具体产品类的真实类名。</p></li><li><p><strong>实现同一抽象父类的多态性，满足&quot;里氏替换原则（LSP）&quot;。</strong> 在使用工厂方法模式时，因为是围绕着统一的抽象接口来实现具体的功能，那么就能很便捷地使用不同的算法策略来实现同一功能，所以这样更好地实现了不同具体产品之间的可替换性。</p></li><li><p><strong>满足&quot;开闭原则&quot;。</strong> 当你想要在系统中加入新的具体对象时，不用再修改抽象接口和核心工厂，也不用修改客户端，更不用修改其他具体工厂和具体产品，而只需要新增一个具体工厂和具体产品就可以了。这样系统的可扩展性也就变得非常好，完全符合&quot;开闭原则&quot;。</p></li></ul><p>同样，除了以上优点以外，工厂方法模式也有一些缺点。</p><ul><li><p><strong>抽象接口新增方法时，会增加开发成本。</strong> 当统一的抽象接口中新增方法时，相应的每个具体工厂都需要新增实现。不管具体工厂是否需要这个方法，都必须要新写代码，这样在一定程度上增加了开发工作量，因为修改后就需要编译、运行和测试，自然增加了开发成本。</p></li><li><p><strong>具体工厂实现逻辑不统一，增加代码理解难度。</strong> 虽然核心工厂已经保证了部分共有逻辑的实现，但是具体产品依然是由具体工厂封装实现的，一旦具体工厂采用非通用的实现策略，那么对于维护的人员来说，就需要耗费大量的精力和时间去学习和理解。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>工厂方法模式的原理和使用都很简单，并且还可以很方便地通过子类进行定制，因此，在软件开发的早期，开发人员会很容易选择和使用工厂方法模式。另外，随着时间的推移，还可以将工厂方法模式演变为使用抽象工厂模式，进而极大地提升了程序的可扩展性。</p><p>不过在我看来，<strong>如果对象的属性数量并不多，并且创建过程也不复杂的话，那么用不着使用工厂方法模式来创建对象</strong>，毕竟工厂方法模式强调使用继承来实现对象的创建，会引入继承相关的副作用。</p>`,37),g=s("p",null,[n("这里尤其要注意的是，工厂方法模式和抽象工厂模式虽然都用于创建对象，但是两者的侧重点是完全不同的。"),s("strong",null,"工厂方法模式侧重于继承的连续性，而抽象工厂模式侧重于组合的扩展性"),n("，这就导致了工厂方法模式会更多去关注是否满足里氏替换原则，而抽象工厂模式很多时候是要寻找到更好的抽象产品，这期间很有可能是会违反里氏替换原则的。")],-1),y=s("h3",{id:"课后思考",tabindex:"-1"},[n("课后思考 "),s("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),u=s("p",null,"在文中 LogFactory 的代码实现里，如果不使用静态加载来实现具体产品的初始化的话，要想实现接入更多日志组件的话，该如何实现呢？",-1),d=s("p",null,"欢迎留言分享，我会第一时间给你回复。",-1),m=s("p",null,'在下一讲，我会接着与你分享"原型模式：什么场景下需要用到对象拷贝？"这个话题，记得按时来听课！',-1);function h(_,b,L,v,I,q){const a=t("Image");return e(),c("div",null,[i,l(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image6/M00/40/38/CioPOWCjk6qAJLeiAADWU3qiKQg267.png"}),E,l(a,{alt:"设计模式20--金句.png",src:"https://s0.lgstatic.com/i/image6/M00/40/2F/Cgp9HWCjk9yAAngzAAYesuPxHzg864.png"}),g,y,u,d,m])}const f=o(r,[["render",h]]);export{C as __pageData,f as default};
