import{_ as p,j as l,o as e,g as o,k as t,h as n,s,Q as r}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6902) 37  解释器模式：如何实现一个自定义配置规则功能？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6902) 37  解释器模式：如何实现一个自定义配置规则功能？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6902) 37  解释器模式：如何实现一个自定义配置规则功能？.md"},c=s("p",null,[n('解释器模式使用频率不算高，通常用来描述如何构建一个简单"语言"的语法解释器。它只在一些非常特定的领域被用到，比如编译器、规则引擎、正则表达式、SQL 解析等。不过，了解它的实现原理同样很重要，能帮助你思考'),s("strong",null,"如何通过更简洁的规则来表示复杂的逻辑"),n("。")],-1),E=s("p",null,"话不多说，让我们开始今天的学习吧。",-1),y=s("h3",{id:"模式原理分析",tabindex:"-1"},[n("模式原理分析 "),s("a",{class:"header-anchor",href:"#模式原理分析","aria-label":'Permalink to "模式原理分析"'},"​")],-1),x=s("p",null,"解释器模式的原始定义是：用于定义语言的语法规则表示，并提供解释器来处理句子中的语法。",-1),u=s("p",null,'语法也称文法，在语言学中指任意自然语言中句子、短语以及词等语法单位的语法结构与语法意义的规律。比如，在编程语言中，if-else 用作条件判断的语法，for 用于循环语句的语法标识。再比如，"我爱中国"是一个中文句子，我们可以用名词、动词、形容词等语法规则来直观地描述句子。',-1),m=s("p",null,"我们还是直接先来看看解释器模式的 UML 图：",-1),d=r(`<p>解释器模式的 UML 图</p><p>从该 UML 图中，我们能看出解释器模式包含的关键角色有四个。</p><ul><li><p><strong>抽象表达式（AbstractExpression）</strong>：定义一个解释器有哪些操作，可以是抽象类或接口，同时说明只要继承或实现的子节点都需要实现这些操作方法。</p></li><li><p><strong>终结符表达式（TerminalExpression）</strong>：用于解释所有终结符表达式。</p></li><li><p><strong>非终结符表达式（NonterminalExpression）</strong>：用于解释所有非终结符表达式。</p></li><li><p><strong>上下文（Context）</strong>：包含解释器全局的信息。</p></li></ul><p>解释器模式 UML 对应的代码实现如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">//抽象表达式类</span></span>
<span class="line"><span style="color:#E1E4E8;">public interface AbstractExpression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean interpreter(Context context);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//上下文信息类</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Context {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private String data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Context(String data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.data = data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public String getData() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void setData(String data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.data = data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//终结符表达式类</span></span>
<span class="line"><span style="color:#E1E4E8;">public class TerminalExpression implements AbstractExpression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private String data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public TerminalExpression(String data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.data = data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean interpreter(Context context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if(context.getData().contains(data)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//非终结符表达式类</span></span>
<span class="line"><span style="color:#E1E4E8;">public class NonterminalExpression implements AbstractExpression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractExpression expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractExpression expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public NonterminalExpression(AbstractExpression expr1, AbstractExpression expr2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean interpreter(Context context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return expr1.interpreter(context) &amp;&amp; expr2.interpreter(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//单元测试类</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Demo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        AbstractExpression person1 = new TerminalExpression(&quot;mick&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        AbstractExpression person2 = new TerminalExpression(&quot;mia&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        AbstractExpression isSingle = new NonterminalExpression(person1, person2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Context context1 = new Context(&quot;mick,mia&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Context context2 = new Context(&quot;mia,mock&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Context context3 = new Context(&quot;spike&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isSingle.interpreter(context1));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isSingle.interpreter(context2));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isSingle.interpreter(context3));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">//抽象表达式类</span></span>
<span class="line"><span style="color:#24292E;">public interface AbstractExpression {</span></span>
<span class="line"><span style="color:#24292E;">    boolean interpreter(Context context);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//上下文信息类</span></span>
<span class="line"><span style="color:#24292E;">public class Context {</span></span>
<span class="line"><span style="color:#24292E;">    private String data;</span></span>
<span class="line"><span style="color:#24292E;">    public Context(String data) {</span></span>
<span class="line"><span style="color:#24292E;">        this.data = data;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public String getData() {</span></span>
<span class="line"><span style="color:#24292E;">        return data;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public void setData(String data) {</span></span>
<span class="line"><span style="color:#24292E;">        this.data = data;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//终结符表达式类</span></span>
<span class="line"><span style="color:#24292E;">public class TerminalExpression implements AbstractExpression {</span></span>
<span class="line"><span style="color:#24292E;">    private String data;</span></span>
<span class="line"><span style="color:#24292E;">    public TerminalExpression(String data) {</span></span>
<span class="line"><span style="color:#24292E;">        this.data = data;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public boolean interpreter(Context context) {</span></span>
<span class="line"><span style="color:#24292E;">        if(context.getData().contains(data)) {</span></span>
<span class="line"><span style="color:#24292E;">            return true;</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            return false;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//非终结符表达式类</span></span>
<span class="line"><span style="color:#24292E;">public class NonterminalExpression implements AbstractExpression {</span></span>
<span class="line"><span style="color:#24292E;">    AbstractExpression expr1;</span></span>
<span class="line"><span style="color:#24292E;">    AbstractExpression expr2;</span></span>
<span class="line"><span style="color:#24292E;">    public NonterminalExpression(AbstractExpression expr1, AbstractExpression expr2) {</span></span>
<span class="line"><span style="color:#24292E;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#24292E;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public boolean interpreter(Context context) {</span></span>
<span class="line"><span style="color:#24292E;">        return expr1.interpreter(context) &amp;&amp; expr2.interpreter(context);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//单元测试类</span></span>
<span class="line"><span style="color:#24292E;">public class Demo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        AbstractExpression person1 = new TerminalExpression(&quot;mick&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        AbstractExpression person2 = new TerminalExpression(&quot;mia&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        AbstractExpression isSingle = new NonterminalExpression(person1, person2);</span></span>
<span class="line"><span style="color:#24292E;">        Context context1 = new Context(&quot;mick,mia&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Context context2 = new Context(&quot;mia,mock&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Context context3 = new Context(&quot;spike&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isSingle.interpreter(context1));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isSingle.interpreter(context2));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isSingle.interpreter(context3));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">true</span></span>
<span class="line"><span style="color:#24292E;">false</span></span>
<span class="line"><span style="color:#24292E;">false</span></span></code></pre></div><p>在上面的代码实现中，NonterminalExpression 用于判断两个表达式是否都存在，存在则在解释器判断时输出 true，如果只有一个则会输出 false。也就是说，表达式解释器的解析逻辑放在了不同的表达式子节点中，这样就能通过增加不同的节点来解析上下文。</p><p>所以说，解释器模式原理的本质就是对语法配备解释器，通过解释器来执行更详细的操作。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>一般来讲，解释器模式常见的使用场景有这样几种。</p><ul><li><p><strong>当语言的语法较为简单并且对执行效率要求不高时</strong>。比如，通过正则表达式来寻找 IP 地址，就不需要对四个网段都进行 0~255 的判断，而是满足 IP 地址格式的都能被找出来。</p></li><li><p><strong>当问题重复出现，且可以用一种简单的语言来进行表达时</strong>。比如，使用 if-else 来做条件判断语句，当代码中出现 if-else 的语句块时都统一解释为条件语句而不需要每次都重新定义和解释。</p></li><li><p><strong>当一个语言需要解释执行时</strong>。如 XML 文档中&lt;&gt;括号表示的不同的节点含义。</p></li></ul><p>为了方便你更好地理解解释器模式的使用场景，下面我们通过一个简单的例子来详细说明。</p><p>我们创建一个逻辑与的解释器例子。简单来说，就是通过字符串名字来判断表达式是否同时存在，存在则打印 true，存在一个或不存在都打印 false。在下面的代码中，我们会创建一个接口 Expression 和实现 Expression 接口的具体类，并定义一个终结符表达式类 TerminalExpression 作为主解释器，再定义非终结符表达式类，这里 OrExpression、AndExpression 分别是处理不同逻辑的非终结符表达式。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Expression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean interpreter(String con);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class TerminalExpression implements Expression{</span></span>
<span class="line"><span style="color:#E1E4E8;">    String data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public TerminalExpression(String data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.data = data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if(con.contains(data)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class AndExpression implements Expression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Expression expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Expression expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public AndExpression(Expression expr1, Expression expr2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return expr1.interpreter(con) &amp;&amp; expr2.interpreter(con);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class OrExpression implements Expression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Expression expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Expression expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public OrExpression(Expression expr1, Expression expr2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return expr1.interpreter(con) || expr2.interpreter(con);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class AndExpression implements Expression {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Expression expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Expression expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public AndExpression(Expression expr1, Expression expr2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return expr1.interpreter(con) &amp;&amp; expr2.interpreter(con);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Client {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Expression person1 = new TerminalExpression(&quot;mick&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Expression person2 = new TerminalExpression(&quot;mia&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Expression isSingle = new OrExpression(person1, person2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Expression spike = new TerminalExpression(&quot;spike&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Expression mock = new TerminalExpression(&quot;mock&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Expression isCommitted = new AndExpression(spike, mock);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isSingle.interpreter(&quot;mick&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isSingle.interpreter(&quot;mia&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isSingle.interpreter(&quot;max&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isCommitted.interpreter(&quot;mock, spike&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(isCommitted.interpreter(&quot;Single, mock&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Expression {</span></span>
<span class="line"><span style="color:#24292E;">    boolean interpreter(String con);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class TerminalExpression implements Expression{</span></span>
<span class="line"><span style="color:#24292E;">    String data;</span></span>
<span class="line"><span style="color:#24292E;">    public TerminalExpression(String data) {</span></span>
<span class="line"><span style="color:#24292E;">        this.data = data;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#24292E;">        if(con.contains(data)) {</span></span>
<span class="line"><span style="color:#24292E;">            return true;</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">            return false;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class AndExpression implements Expression {</span></span>
<span class="line"><span style="color:#24292E;">    Expression expr1;</span></span>
<span class="line"><span style="color:#24292E;">    Expression expr2;</span></span>
<span class="line"><span style="color:#24292E;">    public AndExpression(Expression expr1, Expression expr2) {</span></span>
<span class="line"><span style="color:#24292E;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#24292E;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#24292E;">        return expr1.interpreter(con) &amp;&amp; expr2.interpreter(con);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class OrExpression implements Expression {</span></span>
<span class="line"><span style="color:#24292E;">    Expression expr1;</span></span>
<span class="line"><span style="color:#24292E;">    Expression expr2;</span></span>
<span class="line"><span style="color:#24292E;">    public OrExpression(Expression expr1, Expression expr2) {</span></span>
<span class="line"><span style="color:#24292E;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#24292E;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#24292E;">        return expr1.interpreter(con) || expr2.interpreter(con);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class AndExpression implements Expression {</span></span>
<span class="line"><span style="color:#24292E;">    Expression expr1;</span></span>
<span class="line"><span style="color:#24292E;">    Expression expr2;</span></span>
<span class="line"><span style="color:#24292E;">    public AndExpression(Expression expr1, Expression expr2) {</span></span>
<span class="line"><span style="color:#24292E;">        this.expr1 = expr1;</span></span>
<span class="line"><span style="color:#24292E;">        this.expr2 = expr2;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public boolean interpreter(String con) {</span></span>
<span class="line"><span style="color:#24292E;">        return expr1.interpreter(con) &amp;&amp; expr2.interpreter(con);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Client {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Expression person1 = new TerminalExpression(&quot;mick&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Expression person2 = new TerminalExpression(&quot;mia&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Expression isSingle = new OrExpression(person1, person2);</span></span>
<span class="line"><span style="color:#24292E;">        Expression spike = new TerminalExpression(&quot;spike&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Expression mock = new TerminalExpression(&quot;mock&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Expression isCommitted = new AndExpression(spike, mock);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isSingle.interpreter(&quot;mick&quot;));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isSingle.interpreter(&quot;mia&quot;));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isSingle.interpreter(&quot;max&quot;));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isCommitted.interpreter(&quot;mock, spike&quot;));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(isCommitted.interpreter(&quot;Single, mock&quot;));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">true</span></span>
<span class="line"><span style="color:#24292E;">true</span></span>
<span class="line"><span style="color:#24292E;">false</span></span>
<span class="line"><span style="color:#24292E;">true</span></span>
<span class="line"><span style="color:#24292E;">false</span></span></code></pre></div><p>在最终单元测试的结果中，我们可以看到：在表达式范围内的单词能获得 true 的返回，没有在表达式范围内的单词则会获得 false 的返回。</p><h3 id="为什么使用解释器模式" tabindex="-1">为什么使用解释器模式？ <a class="header-anchor" href="#为什么使用解释器模式" aria-label="Permalink to &quot;为什么使用解释器模式？&quot;">​</a></h3><p>分析完解释器模式的原理和使用场景后，我们再来说说使用解释器模式的原因，可总结为以下两个。</p><p><strong>第一个，将领域语言（即问题表征）定义为简单的语言语法</strong>。这样做的目的是通过多个不同规则的简单组合来映射复杂的模型。比如，在中文语法中会定义主谓宾这样的语法规则，当我们写了一段文字后，其实是可以通过主谓宾这个规则来进行匹配的。如果只是一个汉字一个汉字地解析，解析效率会非常低，而且容易出错。同理，在开发中我们可以使用正则表达式来快速匹配IP地址，而不是将所有可能的情况都用 if-else 来进行编写。</p><p><strong>第二个，更便捷地提升解释数学公式这一类场景的计算效率</strong>。我们都知道，计算机在计算加减乘除一类的数学运算时，和人类计算的方式是完全不同的，需要通过一定的规则运算才能得出最后的结果。比如，3+2-（4 X 5)，如果我们不告诉计算机先要运算括号中的表达式，计算机则只会按照顺序进行计算，这显然是错误的。而使用解释器模式，则能很好地通过预置的规则来进行判断和解释。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过前面的分析，我们也就可以总结出使用解释器模式主要有以下优点。</p><ul><li><p><strong>很容易改变和扩展语法逻辑</strong>。由于在模式中是使用类来表示语法规则的，因此当我们需要新增或修改规则时，只需要新增或修改类即可。同时，还可以使用继承或组合方式来扩展语法。</p></li><li><p><strong>更容易实现语法</strong>。我们可以定义节点的类型，并编写通用的规则来实现这些节点类，或者还可以使用编译器来自动生成它们。</p></li></ul><p>同样，解释器模式也不是万能的，也有一些缺点。</p><ul><li><p><strong>维护成本很高</strong>。语法中的每个规则至少要定义一个类，因此，语法规则越多，类越难管理和维护。</p></li><li><p><strong>执行效率较低</strong>。由于解释器模式会使用到树的数据结构，那么就会使用大量的循环和递归调用来访问不同的节点，当需要解释的句子语法比较复杂时，会执行大量的循环语句，性能很低。</p></li><li><p><strong>应用场景单一，复用性不高</strong>。在开发中，除了要发明一种新的编程语言或对某些新硬件进行解释外，解释器模式的应用实例其实非常少，加上特定的数据结构，扩展性很低。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在实际的业务开发中，解释器模式很少使用，主要应用于 SQL 解析、符号处理引擎等场景中。</p><p>在解释器模式中通常会使用树的结构，有点类似于组合模式中定义的树结构，<strong>终端表达式对象是叶对象，非终端表达式是组合对象</strong>。</p><p>虽然解释器模式很灵活，能够使用语法规则解析很多复杂的句子，比如，编程语法。但是稍不留神就很容易把解释逻辑写在一个类中，进而导致后期难以维护。除此之外，把解析逻辑拆分为单个的子节点后，又会因为类数量的暴增，导致代码的理解难度倍增。</p><p>不过，解释器模式能够通过一些简短的规则来解决复杂的数据匹配问题，比如，正则表达式 [0-9] 就能匹配数字字符串。所以说，理解解释器模式的原理还是很有必要的。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>在实际的软件开发中，你有用过哪些使用到解释器模式的软件组件？欢迎你在留言区与我分享你的使用感受。</p><p>在下一讲，我会接着与你分享&quot;命令模式与在一次请求中封装多个参数&quot;的相关内容，记得按时来听课！</p>`,31);function b(g,h,S,_,q,k){const a=l("Image");return e(),o("div",null,[c,E,y,x,u,m,t(a,{alt:"【配图】37 解释器模式.png",src:"https://s0.lgstatic.com/i/image6/M00/4E/05/CioPOWDxTw6Ab2ULAAB6RYJCFSY881.png"}),n(),d])}const A=p(i,[["render",b]]);export{C as __pageData,A as default};
