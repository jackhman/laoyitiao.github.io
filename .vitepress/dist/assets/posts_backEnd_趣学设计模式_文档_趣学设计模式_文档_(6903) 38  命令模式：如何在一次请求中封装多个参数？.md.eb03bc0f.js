import{_ as a,j as l,o as p,g as e,k as o,h as c,Q as s}from"./chunks/framework.e0c66c3f.js";const g=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6903) 38  命令模式：如何在一次请求中封装多个参数？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6903) 38  命令模式：如何在一次请求中封装多个参数？.md","lastUpdated":1696338709000}'),i={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6903) 38  命令模式：如何在一次请求中封装多个参数？.md"},t=s('<p>命令模式使用频率不算太高，这里你可能会问：命令和查询有什么区别？简单来说，<strong>查询是获取一个不可变的结果，而命令是改变状态，不一定获取结果</strong>。</p><p>如果你熟悉函数式编程的话，会发现命令模式完全没有使用的必要，甚至在业务开发的场景中也很少使用到。不过对于想要找到正确抽象的设计者来说，命令模式的设计思想却非常值得借鉴。因此，在这一讲中我们会剖析命令模式的原理和实现，帮助你深入理解命令模式的精髓。</p><p>话不多说，让我们开始今天的学习吧。</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>命令模式的原始定义是：将一个请求封装为一个对象，从而让我们可以参数化具有不同请求、队列或日志请求的其他对象，并支持可撤销的操作。</p><p>从这个定义中我们能看出，<strong>命令模式是为了将一组操作封装在对象中而设计的，简单来说，就是为了将函数方法封装为对象以方便传输</strong>。但我们知道，实际上在大部分的编程语言中，函数并不能作为参数来进行传递，比如，Java 直到 8 以后才真正支持将函数作为参数传递的。</p><p>所以说，在实际的开发中，如果你用到的编程语言并不支持用函数作为参数来传递，那么就可以借助命令模式将函数封装为对象来使用。</p><p>我们先来看看命令模式的UML图：</p>',8),r=s(`<p>命令模式的 UML 图</p><p>从这个 UML 图中，我们能看出命令模式包含五个关键角色。</p><ul><li><p><strong>抽象命令类</strong>（Command）：用于声明需要做的操作有哪些。</p></li><li><p><strong>具体命令类</strong>（Command1、2等）：实现 Command 接口，其中存储一个接收者类，并在 execute 调用具体命令时，委托给接收者来执行具体的方法。</p></li><li><p><strong>调用者</strong>（Invoker）：客户端通过与调用者交互来操作不同的命令对象。</p></li><li><p><strong>抽象接收者</strong>（Receiver）：声明需要执行的命令操作，同时提供给客户端使用。</p></li><li><p><strong>具体接收者</strong>（Receiver1、2等）：实现抽象接收者，用于接收命令并执行真实的代码逻辑。</p></li></ul><p>下面我们再来看看这个 UML 图对应的代码实现：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void excute();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Command1 implements Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private final Receiver receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Command1(Receiver receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.receiver = receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void excute() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        receiver.operationA();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Command2 implements Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private final Receiver receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Command2(Receiver receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.receiver = receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void excute() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        receiver.operationB();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Command3 implements Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private final Receiver receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Command3(Receiver receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.receiver = receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void excute() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        receiver.operationC();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public interface Receiver {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void operationA();</span></span>
<span class="line"><span style="color:#E1E4E8;">    void operationB();</span></span>
<span class="line"><span style="color:#E1E4E8;">    void operationC();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Receiver1 implements Receiver {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void operationA() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;操作 A&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void operationB() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;操作 B&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void operationC() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;操作 C&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Demo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Receiver receiver1 = new Receiver1();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Invoker invoker = new Invoker();</span></span>
<span class="line"><span style="color:#E1E4E8;">        invoker.setCommand(new Command1(receiver1));</span></span>
<span class="line"><span style="color:#E1E4E8;">        invoker.setCommand(new Command2(receiver1));</span></span>
<span class="line"><span style="color:#E1E4E8;">        invoker.setCommand(new OperationA(receiver1));</span></span>
<span class="line"><span style="color:#E1E4E8;">        invoker.run();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">操作 A</span></span>
<span class="line"><span style="color:#E1E4E8;">操作 B</span></span>
<span class="line"><span style="color:#E1E4E8;">操作 C</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Command {</span></span>
<span class="line"><span style="color:#24292E;">    void excute();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Command1 implements Command {</span></span>
<span class="line"><span style="color:#24292E;">    private final Receiver receiver;</span></span>
<span class="line"><span style="color:#24292E;">    public Command1(Receiver receiver) {</span></span>
<span class="line"><span style="color:#24292E;">        this.receiver = receiver;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void excute() {</span></span>
<span class="line"><span style="color:#24292E;">        receiver.operationA();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Command2 implements Command {</span></span>
<span class="line"><span style="color:#24292E;">    private final Receiver receiver;</span></span>
<span class="line"><span style="color:#24292E;">    public Command2(Receiver receiver) {</span></span>
<span class="line"><span style="color:#24292E;">        this.receiver = receiver;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void excute() {</span></span>
<span class="line"><span style="color:#24292E;">        receiver.operationB();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Command3 implements Command {</span></span>
<span class="line"><span style="color:#24292E;">    private final Receiver receiver;</span></span>
<span class="line"><span style="color:#24292E;">    public Command3(Receiver receiver) {</span></span>
<span class="line"><span style="color:#24292E;">        this.receiver = receiver;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void excute() {</span></span>
<span class="line"><span style="color:#24292E;">        receiver.operationC();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public interface Receiver {</span></span>
<span class="line"><span style="color:#24292E;">    void operationA();</span></span>
<span class="line"><span style="color:#24292E;">    void operationB();</span></span>
<span class="line"><span style="color:#24292E;">    void operationC();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Receiver1 implements Receiver {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void operationA() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;操作 A&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void operationB() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;操作 B&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void operationC() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;操作 C&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Demo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Receiver receiver1 = new Receiver1();</span></span>
<span class="line"><span style="color:#24292E;">        Invoker invoker = new Invoker();</span></span>
<span class="line"><span style="color:#24292E;">        invoker.setCommand(new Command1(receiver1));</span></span>
<span class="line"><span style="color:#24292E;">        invoker.setCommand(new Command2(receiver1));</span></span>
<span class="line"><span style="color:#24292E;">        invoker.setCommand(new OperationA(receiver1));</span></span>
<span class="line"><span style="color:#24292E;">        invoker.run();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">操作 A</span></span>
<span class="line"><span style="color:#24292E;">操作 B</span></span>
<span class="line"><span style="color:#24292E;">操作 C</span></span></code></pre></div><p>上面的代码实现非常简单，其中 Command 就和我们通常理解的&quot;命令&quot;相一致，比如，点击按钮打开文件、点击按钮关闭窗口等命令，只不过这个命令是告诉计算机的。接收者则类似不同的处理对象，比如，浏览器可以是一个接收者来接收打开关闭文件的命令，文件编辑器也可以是接收者来接收打开关闭文件的命令。</p><p>命令模式的核心关键点就在于<strong>围绕着命令来展开</strong>，通过抽象不同的命令，并封装到对象，让不同的接收者针对同一个命令都能做出自身的反应。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>命令模式常见的使用场景有以下几种情况。</p><ul><li><p><strong>需要通过操作来参数化对象时</strong>。比如，当我们将鼠标移动到网页上的下拉菜单时，获取下拉列表的同时还能点菜单项。</p></li><li><p><strong>想要将操作放入队列、按顺序执行脚本操作或者执行一些远程操作命令时</strong>。比如，先 SSH 登录远程服务器，再 tail 查询某个目录下的日志文件，并将日志打印回显到网页的某个窗口中。</p></li><li><p><strong>实现操作回滚功能的场景时</strong>。虽然备忘录模式也能够实现，但是命令模式能够更好地记录命令操作的顺序和相关的上下文信息。</p></li></ul><p>对于命令模式的使用场景，一个经典的类比例子就是 Shell 脚本。如果你熟悉 Shell 脚本的话，就会发现一个 Shell 脚本其实就是这里的 Invoker 调用者，脚本里各式各样的 ps、cat、sed 等命令就是 Command，而 bash shell 或 z shell 就是作为接收者来具体实现执行命令的。</p><p>当然，命令模式并不仅限于操作系统的命令，在实际的业务开发中，可能是对应的一组复杂的代码调用逻辑，比如，触发数据统计、日志记录、链路跟踪等。</p><p>为了帮助你更好地理解命令模式的使用场景，下面我们通过一个简单例子来为你演示。</p><p>假设我们正在开发一款网页的文字编辑器，对于文本格式我们期望支持 HTML 和 Markdown 的格式，编辑器需要有打开、保存和关闭的功能。于是，我们先来创建一个<strong>抽象命令类</strong> Command，其中定义一个无返回的方法 execute。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void execute();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Command {</span></span>
<span class="line"><span style="color:#24292E;">    void execute();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>再来依次实现打开（Open）、保存（Save）、关闭（Close）三个操作，每个操作中都存有一个 Editor（<strong>抽象接收者类</strong>），在实现方法 execute 时，会调用 Editor 对应的 open、save 和 close 方法。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class Open implements Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Editor editor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Open(Editor editor) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.editor = editor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void execute() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        editor.open();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Save implements Command {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Editor editor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Save(Editor editor) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.editor = editor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void execute() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        editor.save();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Close implements Command{</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Editor editor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Close(Editor editor) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.editor = editor;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void execute() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        editor.close();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class Open implements Command {</span></span>
<span class="line"><span style="color:#24292E;">    private Editor editor;</span></span>
<span class="line"><span style="color:#24292E;">    public Open(Editor editor) {</span></span>
<span class="line"><span style="color:#24292E;">        this.editor = editor;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void execute() {</span></span>
<span class="line"><span style="color:#24292E;">        editor.open();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Save implements Command {</span></span>
<span class="line"><span style="color:#24292E;">    private Editor editor;</span></span>
<span class="line"><span style="color:#24292E;">    public Save(Editor editor) {</span></span>
<span class="line"><span style="color:#24292E;">        this.editor = editor;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void execute() {</span></span>
<span class="line"><span style="color:#24292E;">        editor.save();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Close implements Command{</span></span>
<span class="line"><span style="color:#24292E;">    private Editor editor;</span></span>
<span class="line"><span style="color:#24292E;">    public Close(Editor editor) {</span></span>
<span class="line"><span style="color:#24292E;">        this.editor = editor;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void execute() {</span></span>
<span class="line"><span style="color:#24292E;">        editor.close();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后，我们需要定义 Editor 的三个操作方法：打开、保存和关闭。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Editor {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void open();</span></span>
<span class="line"><span style="color:#E1E4E8;">    void save();</span></span>
<span class="line"><span style="color:#E1E4E8;">    void close();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Editor {</span></span>
<span class="line"><span style="color:#24292E;">    void open();</span></span>
<span class="line"><span style="color:#24292E;">    void save();</span></span>
<span class="line"><span style="color:#24292E;">    void close();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>接着我们再来实现支持 HTML5 的编辑器 Html5Editor（<strong>具体接收者</strong>），分别实现打开、保存和关闭三个方法，这里具体只是打印了三种不同的操作。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class Html5Editor implements Editor {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void open() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;=== Html5Editor 执行 open 操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void save() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;=== Html5Editor 执行 save 操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void close() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;=== Html5Editor 执行 close 操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class Html5Editor implements Editor {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void open() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;=== Html5Editor 执行 open 操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void save() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;=== Html5Editor 执行 save 操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void close() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;=== Html5Editor 执行 close 操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>同样，再实现支持 Markdown 的编辑器 MarkDownEditor，功能和 Html5Editor 相同。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class MarkDownEditor implements Editor {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void open() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;=== MarkDownEditor 执行 open 操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void save() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;=== MarkDownEditor 执行 save 操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void close() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;=== MarkDownEditor 执行 close 操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class MarkDownEditor implements Editor {</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void open() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;=== MarkDownEditor 执行 open 操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void save() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;=== MarkDownEditor 执行 save 操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void close() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;=== MarkDownEditor 执行 close 操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>最后，我们定义一个 Web 编辑器来模拟执行编辑器的操作，并自定义一个简单的编辑流程来模拟运行编辑器的使用。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class WebEditFlow {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private final List&lt;</span><span style="color:#FDAEB7;font-style:italic;">Command</span><span style="color:#E1E4E8;">&gt; commands;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public WebEditFlow() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        commands = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void setCommand(Command command) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        commands.add(command);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void run() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        commands.forEach(Command::execute);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Client {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Html5Editor html5Editor = new Html5Editor();</span></span>
<span class="line"><span style="color:#E1E4E8;">        MarkDownEditor markDownEditor = new MarkDownEditor();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Open html5Open = new Open(html5Editor);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Save html5Save = new Save(html5Editor);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Close html5Close = new Close(html5Editor);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Open markDownOpen = new Open(markDownEditor);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Save markDownSave = new Save(markDownEditor);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Close markDownClose = new Close(markDownEditor);</span></span>
<span class="line"><span style="color:#E1E4E8;">        WebEditFlow webEditFlow = new WebEditFlow();</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.setCommand(html5Open);</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.setCommand(html5Save);</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.setCommand(html5Close);</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.setCommand(markDownOpen);</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.setCommand(markDownSave);</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.setCommand(markDownClose);</span></span>
<span class="line"><span style="color:#E1E4E8;">        webEditFlow.run();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">=== Html5Editor 执行 open 操作</span></span>
<span class="line"><span style="color:#E1E4E8;">=== Html5Editor 执行 save 操作</span></span>
<span class="line"><span style="color:#E1E4E8;">=== Html5Editor 执行 close 操作</span></span>
<span class="line"><span style="color:#E1E4E8;">=== MarkDownEditor 执行 open 操作</span></span>
<span class="line"><span style="color:#E1E4E8;">=== MarkDownEditor 执行 save 操作</span></span>
<span class="line"><span style="color:#E1E4E8;">=== MarkDownEditor 执行 close 操作</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class WebEditFlow {</span></span>
<span class="line"><span style="color:#24292E;">    private final List&lt;</span><span style="color:#B31D28;font-style:italic;">Command</span><span style="color:#24292E;">&gt; commands;</span></span>
<span class="line"><span style="color:#24292E;">    public WebEditFlow() {</span></span>
<span class="line"><span style="color:#24292E;">        commands = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public void setCommand(Command command) {</span></span>
<span class="line"><span style="color:#24292E;">        commands.add(command);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public void run() {</span></span>
<span class="line"><span style="color:#24292E;">        commands.forEach(Command::execute);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Client {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Html5Editor html5Editor = new Html5Editor();</span></span>
<span class="line"><span style="color:#24292E;">        MarkDownEditor markDownEditor = new MarkDownEditor();</span></span>
<span class="line"><span style="color:#24292E;">        Open html5Open = new Open(html5Editor);</span></span>
<span class="line"><span style="color:#24292E;">        Save html5Save = new Save(html5Editor);</span></span>
<span class="line"><span style="color:#24292E;">        Close html5Close = new Close(html5Editor);</span></span>
<span class="line"><span style="color:#24292E;">        Open markDownOpen = new Open(markDownEditor);</span></span>
<span class="line"><span style="color:#24292E;">        Save markDownSave = new Save(markDownEditor);</span></span>
<span class="line"><span style="color:#24292E;">        Close markDownClose = new Close(markDownEditor);</span></span>
<span class="line"><span style="color:#24292E;">        WebEditFlow webEditFlow = new WebEditFlow();</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.setCommand(html5Open);</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.setCommand(html5Save);</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.setCommand(html5Close);</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.setCommand(markDownOpen);</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.setCommand(markDownSave);</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.setCommand(markDownClose);</span></span>
<span class="line"><span style="color:#24292E;">        webEditFlow.run();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">=== Html5Editor 执行 open 操作</span></span>
<span class="line"><span style="color:#24292E;">=== Html5Editor 执行 save 操作</span></span>
<span class="line"><span style="color:#24292E;">=== Html5Editor 执行 close 操作</span></span>
<span class="line"><span style="color:#24292E;">=== MarkDownEditor 执行 open 操作</span></span>
<span class="line"><span style="color:#24292E;">=== MarkDownEditor 执行 save 操作</span></span>
<span class="line"><span style="color:#24292E;">=== MarkDownEditor 执行 close 操作</span></span></code></pre></div><p>从上面的例子中可以看出，命令模式的使用还是非常简单的，使用关键点就在于<strong>按照顺序来组合不同的命令</strong>。</p><p>因此，命令模式的使用场景也非常局限，只能针对命令顺序执行的场景，而对于需要多种组合的场景来说，命令模式并不是很适合。</p><h3 id="为什么使用命令模式" tabindex="-1">为什么使用命令模式？ <a class="header-anchor" href="#为什么使用命令模式" aria-label="Permalink to &quot;为什么使用命令模式？&quot;">​</a></h3><p>分析完命令模式的原理和使用场景后，我们再来说说使用命令模式的原因，可总结为以下三个。</p><p><strong>第一个，只关心具体的命令和动作，不想知道具体的接收者是谁以及如何操作</strong>。在实际的开发中，有时我们经常需要向某些对象发送请求，但又不知道请求的接收者是谁。比如，在 Linux 下查看操作系统的日志打印，通常我们知道执行 tail 命令就可以查看日志打印，但是对于 tail 命令如何将文件内容转化为窗口中的显示，实际上我们并不关心。命令模式通过将发送者和接收者解耦开，也就去除了它们之间的直接引用的关系，就能让发送者只提供命令而不必知道命令到底是如何完成的。</p><p><strong>第二个，为了围绕命令的维度来构建功能</strong>。比如，可以构建上传、下载、打开、关闭这样的命令，这样更符合人类自然的思考逻辑，同时避免了使用者需要了解大量的代码实现逻辑，起到隐藏代码逻辑的作用。同时，还能自由组合相关的命令，完成一系列的组合功能，比如，登录到服务器自动下载日志文件，并保存关键数据到数据库。</p><p><strong>第三个，为了方便统计跟踪行为操作</strong>。比如，对于数据的排序、序列化、跟踪、日志记录等操作。使用命令模式能够便捷地记录相关操作，例如，执行撤销和重做操作时，可以从执行的命令列表中快速找到相关操作进行重置，弥补了备忘录模式的缺点。像一些需要读取大量数据的场景中，使用命令模式来读取上下文信息，还能避免内存溢出的风险。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过上述分析，我们也可以总结出使用命令模式的优点。</p><ul><li><p><strong>降低对象之间的耦合度</strong>。比如，发出请求的对象和执行请求的对象是通过命令对象来间接耦合的，避免了直接引用。</p></li><li><p><strong>扩展更容易</strong>。由于命令模式是以命令作为统一的使用维度，新增逻辑可以放入一个新的命令中来执行。同时，对于同一个命令，还可以使用不同的接收者来进行实现。</p></li><li><p><strong>可以快捷地设计组合命令</strong>。对于调用系统命令或远程命令时，使用命令模式能够方便地进行自由组合。比如，登录到远程服务器执行一组命令操作。</p></li></ul><p>同样，命令模式也有一些缺点。</p><ul><li><p><strong>不同的接收者需要实现重复的命令</strong>。比如，Markdown 编辑器需要实现编辑器里的打开、保存、关闭等操作，新增一个富文本编辑器时也需要实现打开、保存、关闭等操作。</p></li><li><p><strong>当命令中涉及对象状态变化时，可能导致不同的结果出现</strong>。比如，在执行某条命令时调用异步方法获取结果，这时如果异步执行未完成，那么接下来执行的命令可能就会出现与预期不符的情况。</p></li><li><p><strong>增加了代码的数量和修改难度</strong>。每新增一个命令都需要在对应的接收者那里新增命令的实现，代码量会增加很多。同样，一旦代码发生修改，也会需要修改所有接收者的实现，不利于代码的维护。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>命令模式将一个或一组命令封装为一个对象，从而能够将函数方法作为参数进行传输，同时还能够解耦客户端和服务端的直接耦合，适用场景有：做简单的请求排队，记录请求日志，以及支持可撤销的操作。</p><p><strong>简单来说，命令模式的本质是对命令进行封装，将发出命令的责任和执行命令的责任分离开。</strong></p><p>命令模式的原理稍微有点复杂，在使用时也容易区分不开接收者和命令，好在适用的场景比较有限，对于大多数开发人员来说，并不是高频使用的模式。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>虽然命令模式从命令的维度统一了命令的行为，但是对于不同操作系统下的同一个命令，可能代码实现却完全不同，这样每新增一个平台都需要重新实现一次命令，你认为这样做值得吗？为什么？</p><p>欢迎你在留言区与我分享你的想法和答案。</p><p>在下一讲，我会接着与你分享&quot;责任链模式与解决审核、过滤场景问题&quot;的相关内容，记得按时来听课！</p>`,45);function E(d,y,m,v,u,b){const n=l("Image");return p(),e("div",null,[t,o(n,{alt:"设计模式38~01.jpg",src:"https://s0.lgstatic.com/i/image6/M00/4F/07/Cgp9HWD3kviAYSQPAAFRbDR2c0g940.jpg"}),c(),r])}const C=a(i,[["render",E]]);export{g as __pageData,C as default};
