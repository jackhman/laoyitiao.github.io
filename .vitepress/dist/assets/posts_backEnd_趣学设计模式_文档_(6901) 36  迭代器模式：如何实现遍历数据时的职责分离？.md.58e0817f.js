import{_ as a,j as p,o as l,g as e,k as t,h as o,Q as s}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"36迭代器模式：如何实现遍历数据时的职责分离？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6901) 36  迭代器模式：如何实现遍历数据时的职责分离？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6901) 36  迭代器模式：如何实现遍历数据时的职责分离？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/趣学设计模式_文档/(6901) 36  迭代器模式：如何实现遍历数据时的职责分离？.md"},i=s('<h1 id="_36迭代器模式-如何实现遍历数据时的职责分离" tabindex="-1">36迭代器模式：如何实现遍历数据时的职责分离？ <a class="header-anchor" href="#_36迭代器模式-如何实现遍历数据时的职责分离" aria-label="Permalink to &quot;36迭代器模式：如何实现遍历数据时的职责分离？&quot;">​</a></h1><p>迭代器模式是我们学习一个设计时很少用到的、但编码实现时却经常使用到的行为型设计模式。<strong>在绝大多数编程语言中，迭代器已经成为一个基础的类库，直接用来遍历集合对象</strong> 。在平时开发中，我们更多的是<strong>直接使用</strong>它，很少会从零去实现一个迭代器。</p><p>不过，我们课程的宗旨就是要弄懂原理，更好地帮助你去灵活使用这些设计模式。所以，今天我会<strong>重点讲解迭代器的原理和实现</strong>。</p><p>话不多说，让我们开始今天的学习吧。</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>迭代器模式又叫游标（Cursor）模式，它的原始定义是：迭代器提供一种对容器对象中的各个元素进行访问的方法，而又不需要暴露该对象的内部细节。</p><p>可以看到，该定义很明确地指出，迭代器模式就是为了提供一种通用的访问对象的方式。我们先来看下它的 UML 图：</p>',7),r=s(`<p>迭代器模式的 UML 图</p><p>从该 UML 图中，我们能看出迭代器模式的四个关键角色。</p><ul><li><p><strong>抽象集合类（Aggregate）</strong>：创建和抽象迭代器类相关联的方法，同时可以添加其他集合类需要的方法。</p></li><li><p><strong>具体集合类（ConcreteAggregate）</strong>：实现抽象集合类声明的所有方法，在具体使用集合类时会创建对应具体的迭代器类。</p></li><li><p><strong>抽象迭代器类（Iterator）</strong>：定义统一的迭代器方法 hasNext() 和 next()，用于判断当前集合中是否还有对象以及按顺序读取集合中的当前对象。</p></li><li><p><strong>具体迭代器类（ConcreteIterator）</strong>：实现了抽象迭代器类声明的方法，处理具体集合中对对象位置的偏移以及具体对象数据的传输。</p></li></ul><p>该 UML 图对应的代码实现如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Iterator{</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object next();</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean hasNext();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class ConcreteIterator implements Iterator {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Object[] objects;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private int position;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ConcreteIterator(Object[] objects) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.objects = objects;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Object next() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return objects[position++];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean hasNext() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if(position &gt;= objects.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public interface Aggregate {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Iterator createIterator();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class ConcreteAggregate implements Aggregate{</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Object[] objects;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ConcreteAggregate(Object[] objects) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.objects = objects;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Iterator createIterator() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return new ConcreteIterator(objects);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Demo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object[] objects = new Object[2];</span></span>
<span class="line"><span style="color:#E1E4E8;">        objects[0] = new Object();</span></span>
<span class="line"><span style="color:#E1E4E8;">        objects[1] = new Object();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Aggregate aggregate = new ConcreteAggregate(objects);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Iterator iterator = aggregate.createIterator();</span></span>
<span class="line"><span style="color:#E1E4E8;">        while(iterator.hasNext()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Object currentObject = iterator.next();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.println(currentObject.toString());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果：</span></span>
<span class="line"><span style="color:#E1E4E8;">java.lang.Object@7ea987ac</span></span>
<span class="line"><span style="color:#E1E4E8;">java.lang.Object@12a3a380</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Iterator{</span></span>
<span class="line"><span style="color:#24292E;">    Object next();</span></span>
<span class="line"><span style="color:#24292E;">    boolean hasNext();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class ConcreteIterator implements Iterator {</span></span>
<span class="line"><span style="color:#24292E;">    private Object[] objects;</span></span>
<span class="line"><span style="color:#24292E;">    private int position;</span></span>
<span class="line"><span style="color:#24292E;">    public ConcreteIterator(Object[] objects) {</span></span>
<span class="line"><span style="color:#24292E;">        this.objects = objects;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public Object next() {</span></span>
<span class="line"><span style="color:#24292E;">        return objects[position++];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public boolean hasNext() {</span></span>
<span class="line"><span style="color:#24292E;">        if(position &gt;= objects.length) {</span></span>
<span class="line"><span style="color:#24292E;">            return false;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return true;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public interface Aggregate {</span></span>
<span class="line"><span style="color:#24292E;">    Iterator createIterator();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class ConcreteAggregate implements Aggregate{</span></span>
<span class="line"><span style="color:#24292E;">    private Object[] objects;</span></span>
<span class="line"><span style="color:#24292E;">    public ConcreteAggregate(Object[] objects) {</span></span>
<span class="line"><span style="color:#24292E;">        this.objects = objects;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public Iterator createIterator() {</span></span>
<span class="line"><span style="color:#24292E;">        return new ConcreteIterator(objects);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Demo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Object[] objects = new Object[2];</span></span>
<span class="line"><span style="color:#24292E;">        objects[0] = new Object();</span></span>
<span class="line"><span style="color:#24292E;">        objects[1] = new Object();</span></span>
<span class="line"><span style="color:#24292E;">        Aggregate aggregate = new ConcreteAggregate(objects);</span></span>
<span class="line"><span style="color:#24292E;">        Iterator iterator = aggregate.createIterator();</span></span>
<span class="line"><span style="color:#24292E;">        while(iterator.hasNext()) {</span></span>
<span class="line"><span style="color:#24292E;">            Object currentObject = iterator.next();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.println(currentObject.toString());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果：</span></span>
<span class="line"><span style="color:#24292E;">java.lang.Object@7ea987ac</span></span>
<span class="line"><span style="color:#24292E;">java.lang.Object@12a3a380</span></span></code></pre></div><p>从最后的结果可以看出，我们通过实现迭代器模式最终打印了对象数组中的两个不同对象。从上面的代码实现也能看出，迭代器的实现原理非常简单，就是<strong>通过为集合对象创建统一的迭代器 Iterator 来统一对集合里的对象进行访问</strong>。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>一般来讲，迭代器模式常见的使用场景有以下几种。</p><ul><li><p><strong>希望对客户端隐藏其遍历算法复杂性时</strong>。有时可能出于使用便利性或安全性的考虑，只想让客户端使用遍历某个集合的对象，而不告诉客户端具体的遍历算法。</p></li><li><p><strong>需要简化重复的循环遍历逻辑时</strong>。比如，读取数组里的数据，遍历二叉树等树形结构。</p></li></ul><p>为了帮助你更好地理解迭代器模式，下面我们还是通过一个简单的例子来为你说明。我们先来创建<strong>抽象迭代器</strong> IteratorIterator（这里为了和 Java 中的 Iterator 接口区别开），声明为泛型接口，接收类型参数E，同时声明四个方法：reset()、next()、currentItem() 和 hasNext()。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface IteratorIterator&lt;</span><span style="color:#FDAEB7;font-style:italic;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void reset();       //重置为第一个元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    E next();           //获取下一个元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    E currentItem();    //检索当前元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean hasNext();  //判断是否还有下一个元素存在.</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface IteratorIterator&lt;</span><span style="color:#B31D28;font-style:italic;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    void reset();       //重置为第一个元素</span></span>
<span class="line"><span style="color:#24292E;">    E next();           //获取下一个元素</span></span>
<span class="line"><span style="color:#24292E;">    E currentItem();    //检索当前元素</span></span>
<span class="line"><span style="color:#24292E;">    boolean hasNext();  //判断是否还有下一个元素存在.</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>接下来，我们再来定义<strong>抽象集合</strong> ListList（同样为了和 Java 中的 List 接口区别开），也声明为泛型接口，接收类型参数 E，声明一个创建迭代器 IteratorIterator 的方法 iterator()。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface ListList&lt;</span><span style="color:#FDAEB7;font-style:italic;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    IteratorIterator&lt;</span><span style="color:#FDAEB7;font-style:italic;">E</span><span style="color:#E1E4E8;">&gt; iterator();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface ListList&lt;</span><span style="color:#B31D28;font-style:italic;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    IteratorIterator&lt;</span><span style="color:#B31D28;font-style:italic;">E</span><span style="color:#24292E;">&gt; iterator();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后，我们构造一个对象 Topic，对象中只包含 name 属性以及其构造函数和 get、set 方法。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class Topic {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Topic(String name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        super();</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.name = name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public String getName() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void setName(String name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.name = name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class Topic {</span></span>
<span class="line"><span style="color:#24292E;">    private String name;</span></span>
<span class="line"><span style="color:#24292E;">    public Topic(String name) {</span></span>
<span class="line"><span style="color:#24292E;">        super();</span></span>
<span class="line"><span style="color:#24292E;">        this.name = name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public String getName() {</span></span>
<span class="line"><span style="color:#24292E;">        return name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public void setName(String name) {</span></span>
<span class="line"><span style="color:#24292E;">        this.name = name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>再接着实现一个<strong>具体的迭代器类</strong> TopicIterator，其中包含属性为 Topic 的数组和一个记录对象存储位置的对象 position。当我们执行 next() 方法时，会获取当前记录位置的对象，至于 reset() 则会重置对象在数组中的位置为 0，currentItem() 方法则会返回当前位置下的对象，hasNext() 则判断当前位置是否越界。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class TopicIterator implements IteratorIterator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Topic</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Topic[] topics;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private int position;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public TopicIterator(Topic[] topics) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.topics = topics;</span></span>
<span class="line"><span style="color:#E1E4E8;">        position = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void reset() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        position = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Topic next() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return topics[position++];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Topic currentItem() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return topics[position];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean hasNext() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if(position &gt;= topics.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class TopicIterator implements IteratorIterator&lt;</span><span style="color:#B31D28;font-style:italic;">Topic</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    private Topic[] topics;</span></span>
<span class="line"><span style="color:#24292E;">    private int position;</span></span>
<span class="line"><span style="color:#24292E;">    public TopicIterator(Topic[] topics) {</span></span>
<span class="line"><span style="color:#24292E;">        this.topics = topics;</span></span>
<span class="line"><span style="color:#24292E;">        position = 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void reset() {</span></span>
<span class="line"><span style="color:#24292E;">        position = 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public Topic next() {</span></span>
<span class="line"><span style="color:#24292E;">        return topics[position++];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public Topic currentItem() {</span></span>
<span class="line"><span style="color:#24292E;">        return topics[position];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public boolean hasNext() {</span></span>
<span class="line"><span style="color:#24292E;">        if(position &gt;= topics.length) {</span></span>
<span class="line"><span style="color:#24292E;">            return false;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return true;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>同样，还需要实现一个<strong>具体的集合类</strong> TopicList，该类中只实现一个创建迭代器的方法，返回对应具体迭代器的类方法。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class TopicList implements ListList&lt;</span><span style="color:#FDAEB7;font-style:italic;">Topic</span><span style="color:#E1E4E8;">&gt;{</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Topic[] topics;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public TopicList(Topic[] topics)</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.topics = topics;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public IteratorIterator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Topic</span><span style="color:#E1E4E8;">&gt; iterator() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return new TopicIterator(topics);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class TopicList implements ListList&lt;</span><span style="color:#B31D28;font-style:italic;">Topic</span><span style="color:#24292E;">&gt;{</span></span>
<span class="line"><span style="color:#24292E;">    private Topic[] topics;</span></span>
<span class="line"><span style="color:#24292E;">    public TopicList(Topic[] topics)</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        this.topics = topics;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public IteratorIterator&lt;</span><span style="color:#B31D28;font-style:italic;">Topic</span><span style="color:#24292E;">&gt; iterator() {</span></span>
<span class="line"><span style="color:#24292E;">        return new TopicIterator(topics);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>最后，我们再来运行一段单元测试：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class Client {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Topic[] topics = new Topic[5];</span></span>
<span class="line"><span style="color:#E1E4E8;">        topics[0] = new Topic(&quot;topic1&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        topics[1] = new Topic(&quot;topic2&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        topics[2] = new Topic(&quot;topic3&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        topics[3] = new Topic(&quot;topic4&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        topics[4] = new Topic(&quot;topic5&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        ListList&lt;</span><span style="color:#FDAEB7;font-style:italic;">Topic</span><span style="color:#E1E4E8;">&gt; list = new TopicList(topics);</span></span>
<span class="line"><span style="color:#E1E4E8;">        IteratorIterator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Topic</span><span style="color:#E1E4E8;">&gt; iterator = list.iterator();</span></span>
<span class="line"><span style="color:#E1E4E8;">        while(iterator.hasNext()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Topic currentTopic = iterator.next();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.println(currentTopic.getName());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">topic1</span></span>
<span class="line"><span style="color:#E1E4E8;">topic2</span></span>
<span class="line"><span style="color:#E1E4E8;">topic3</span></span>
<span class="line"><span style="color:#E1E4E8;">topic4</span></span>
<span class="line"><span style="color:#E1E4E8;">topic5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class Client {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Topic[] topics = new Topic[5];</span></span>
<span class="line"><span style="color:#24292E;">        topics[0] = new Topic(&quot;topic1&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        topics[1] = new Topic(&quot;topic2&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        topics[2] = new Topic(&quot;topic3&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        topics[3] = new Topic(&quot;topic4&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        topics[4] = new Topic(&quot;topic5&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        ListList&lt;</span><span style="color:#B31D28;font-style:italic;">Topic</span><span style="color:#24292E;">&gt; list = new TopicList(topics);</span></span>
<span class="line"><span style="color:#24292E;">        IteratorIterator&lt;</span><span style="color:#B31D28;font-style:italic;">Topic</span><span style="color:#24292E;">&gt; iterator = list.iterator();</span></span>
<span class="line"><span style="color:#24292E;">        while(iterator.hasNext()) {</span></span>
<span class="line"><span style="color:#24292E;">            Topic currentTopic = iterator.next();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.println(currentTopic.getName());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">topic1</span></span>
<span class="line"><span style="color:#24292E;">topic2</span></span>
<span class="line"><span style="color:#24292E;">topic3</span></span>
<span class="line"><span style="color:#24292E;">topic4</span></span>
<span class="line"><span style="color:#24292E;">topic5</span></span></code></pre></div><p>上面的代码实现非常简单，如果你对 Java 非常熟悉的话，就能在 JDK 的类库中找到 List 的源码实现。</p><p>正是因为迭代器模式的使用场景非常明确，所以在实际的开发中，它的应用非常广泛，几乎所有涉及集合的遍历时都会使用到迭代器模式。</p><h3 id="为什么使用迭代器模式" tabindex="-1">为什么使用迭代器模式？ <a class="header-anchor" href="#为什么使用迭代器模式" aria-label="Permalink to &quot;为什么使用迭代器模式？&quot;">​</a></h3><p>分析完迭代器模式的原理和使用场景后，我们再来说说使用迭代器模式的原因，可总结为以下两个。</p><p><strong>第一个，减少程序中重复的遍历代码</strong>。我们都知道，对于放入一个集合容器中的多个对象来说，访问必然涉及遍历算法。如果我们不将遍历算法封装到容器里（比如，List、Set、Map 等），那么就需要使用容器的人自行去实现遍历算法，这样容易造成很多重复的循环和条件判断语句出现，不利于代码的复用和扩展，同时还会暴露不同容器的内部结构。而使用迭代器模式是将遍历算法作为容器对象自身的一种&quot;属性方法&quot;来使用，能够有效地避免写很多重复的代码，同时又不会暴露内部结构。</p><p><strong>第二个，为了隐藏统一遍历集合的方法逻辑</strong>。迭代器模式把对不同集合类的访问逻辑抽象出来，这样在不用暴露集合内部结构的情况下，可以隐藏不同集合遍历需要使用的算法，同时还能够对外提供更为简便的访问算法接口。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过上述分析，我们也可以总结出使用迭代器模式有以下优点。</p><ul><li><p><strong>满足单一职责原则</strong>。由于迭代器模式是将遍历算法代码统一抽取封装为独立的类，这个类的职责便只有一个------遍历查询所有数据，所以这很符合单一职责原则。</p></li><li><p><strong>满足开闭原则</strong>。当需要对新的对象集合进行扩展时，只需要新增具体的对象迭代器和具体的集合类便能方便地进行扩展。</p></li><li><p><strong>可以并行遍历同一集合</strong>。因为每个对象都有自身的遍历器对象，那么可以同时使用这个遍历器来进行遍历，而无须等待。</p></li><li><p><strong>可以减少直接使用 for 循环的重复代码问题</strong>。直接使用 for 循环的缺点在于必须事先知道集合的数据结构，而一旦我们需要更换一种对象集合的话，则可能需要实现相同的循环逻辑。同时，代码会因此变成了一种硬编码形式，每次都需要修改代码才能进行新的结构的遍历。而使用迭代器模式则可以很好地来避免这个问题。</p></li></ul><p>同样，迭代器模式也有一些缺点。</p><ul><li><p><strong>增加子类数量</strong>。当新增某种集合类型的迭代器时，还得新增对应类型的迭代器和集合对象，这会增加很多不同的子类。</p></li><li><p><strong>增加系统复杂性</strong>。由于分离了更为抽象的遍历算法逻辑，所以对于那些不了解设计模式的维护者来说，相当于变相地增加新的复杂性。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>迭代器模式的实现原理非常简单，<strong>关键思想是将访问和遍历的职责从集合对象中分离出来，放入标准的协议对象中</strong>。这样既能对客户端隐藏复杂结构的遍历访问方式，也能提供减少重复遍历的代码实现。</p><p>现在几乎所有编程语言都会实现迭代器模式，主要被实现为<strong>类库</strong>来使用，可以说使用非常普遍。其实，除了编程语言之外，很多组件也有应用，比如 Redis 中的 rehash() 操作，就是迭代器模式的体现，而且 Redis 更进一步地还区分了安全迭代器和非安全迭代器。</p><p>所以说，在遇见需要使用迭代器模式的场景时，你就可以回想一下今天学习的迭代器模式的基本原理，然后&quot;依葫芦画瓢&quot;来构建自己的迭代器，而不只是会熟练使用已有的迭代器。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>在 Java 中，为什么直接使用 for 迭代器的同时进行集合中的元素删除会出现异常报错？你觉得该如何来解决这个问题呢？欢迎你在留言区与我分享你的想法和答案。</p><p>在下一讲，我会接着与你分享&quot;解释器模式与实现一个自定义配置规则功能&quot;的相关内容，记得按时来听课！</p>`,39);function E(y,g,u,b,d,h){const n=p("Image");return l(),e("div",null,[i,t(n,{alt:"【配图】36 迭代器模式.png",src:"https://s0.lgstatic.com/i/image6/M00/4D/53/CioPOWDuXXeAVG88AAFTk5v0CXs343.jpg"}),o(),r])}const T=a(c,[["render",E]]);export{v as __pageData,T as default};
