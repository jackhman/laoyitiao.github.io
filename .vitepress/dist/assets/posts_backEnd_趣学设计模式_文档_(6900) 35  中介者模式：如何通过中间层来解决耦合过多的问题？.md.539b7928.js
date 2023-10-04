import{_ as p,j as l,o as e,g as o,k as t,h as n,s,Q as c}from"./chunks/framework.e0c66c3f.js";const _=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6900) 35  中介者模式：如何通过中间层来解决耦合过多的问题？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6900) 35  中介者模式：如何通过中间层来解决耦合过多的问题？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/趣学设计模式_文档/(6900) 35  中介者模式：如何通过中间层来解决耦合过多的问题？.md"},i=s("p",null,"中介者模式理解起来并不难，代码实现简单，学习难度也很小，只要合理充分地应用这个模式，往往就能够解决一些意想不到的问题。那这到底是怎样一个模式？多用于什么场景中？为什么使用？该怎么使用？",-1),E=s("p",null,"话不多说，让我们带着这些问题开始今天的学习吧。",-1),y=s("h3",{id:"模式原理分析",tabindex:"-1"},[n("模式原理分析 "),s("a",{class:"header-anchor",href:"#模式原理分析","aria-label":'Permalink to "模式原理分析"'},"​")],-1),d=s("p",null,"中介者模式的原始定义是：中介者对象封装了一组对象之间的交互，这组对象会将它们的交互委托给中介者对象，而不是直接交互。",-1),u=s("p",null,"可以看到，这个定义是难得的简单和明确，中介者对象就是用于处理对象与对象之间的直接交互，封装了多个对象之间的交互细节。",-1),m=s("p",null,"我们还是先来看看中介者模式的 UML 图：",-1),g=c(`<p>中介者模式的 UML 图</p><p>从这个 UML 图中，我们能看出中介者模式包含了四个关键角色。</p><ul><li><p><strong>抽象中介者</strong>（Mediator）：定义中介者需要执行的方法操作。</p></li><li><p><strong>具体中介者</strong>（MediatorImpl）：实现抽象中介者定义的方法操作，同时可以包含更多逻辑。</p></li><li><p><strong>抽象组件类</strong>（Component）：定义组件需要执行的方法操作。</p></li><li><p><strong>具体组件类</strong>（ComponentA、ComponentB）：继承自抽象组件类，实现具体的组件业务逻辑。</p></li></ul><p>下面我们再来看看 UML 对应的代码实现：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface Mediator {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void apply(String key);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class MediatorImpl implements Mediator{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void apply(String key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;最终中介者执行操作，key为：&quot;+key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public abstract class Component {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Mediator mediator;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Component(Mediator mediator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.mediator = mediator;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public abstract void exec(String key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    public Mediator getMediator() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return mediator;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class ComponentA extends Component{</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ComponentA(Mediator mediator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        super(mediator);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void exec(String key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;===在组件A中，通过中介者执行&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        getMediator().apply(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class ComponentB extends Component{</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ComponentB(Mediator mediator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        super(mediator);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void exec(String key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(&quot;===在组件B中，通过中介者的操作&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        getMediator().apply(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">public class Demo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Mediator mediator = new MediatorImpl();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Component componentA = new ComponentA(mediator);</span></span>
<span class="line"><span style="color:#E1E4E8;">        componentA.exec(&quot;key-A&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Component componentB = new ComponentB(mediator);</span></span>
<span class="line"><span style="color:#E1E4E8;">        componentB.exec(&quot;key-B&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">===在组件A中，通过中介者执行</span></span>
<span class="line"><span style="color:#E1E4E8;">最终中介者执行操作，key为：key-A</span></span>
<span class="line"><span style="color:#E1E4E8;">===在组件B中，通过中介者的操作</span></span>
<span class="line"><span style="color:#E1E4E8;">最终中介者执行操作，key为：key-B</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface Mediator {</span></span>
<span class="line"><span style="color:#24292E;">    void apply(String key);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class MediatorImpl implements Mediator{</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void apply(String key) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;最终中介者执行操作，key为：&quot;+key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public abstract class Component {</span></span>
<span class="line"><span style="color:#24292E;">    private Mediator mediator;</span></span>
<span class="line"><span style="color:#24292E;">    public Component(Mediator mediator) {</span></span>
<span class="line"><span style="color:#24292E;">        this.mediator = mediator;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public abstract void exec(String key);</span></span>
<span class="line"><span style="color:#24292E;">    public Mediator getMediator() {</span></span>
<span class="line"><span style="color:#24292E;">        return mediator;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class ComponentA extends Component{</span></span>
<span class="line"><span style="color:#24292E;">    public ComponentA(Mediator mediator) {</span></span>
<span class="line"><span style="color:#24292E;">        super(mediator);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void exec(String key) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;===在组件A中，通过中介者执行&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        getMediator().apply(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class ComponentB extends Component{</span></span>
<span class="line"><span style="color:#24292E;">    public ComponentB(Mediator mediator) {</span></span>
<span class="line"><span style="color:#24292E;">        super(mediator);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void exec(String key) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(&quot;===在组件B中，通过中介者的操作&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        getMediator().apply(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">public class Demo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Mediator mediator = new MediatorImpl();</span></span>
<span class="line"><span style="color:#24292E;">        Component componentA = new ComponentA(mediator);</span></span>
<span class="line"><span style="color:#24292E;">        componentA.exec(&quot;key-A&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        Component componentB = new ComponentB(mediator);</span></span>
<span class="line"><span style="color:#24292E;">        componentB.exec(&quot;key-B&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">===在组件A中，通过中介者执行</span></span>
<span class="line"><span style="color:#24292E;">最终中介者执行操作，key为：key-A</span></span>
<span class="line"><span style="color:#24292E;">===在组件B中，通过中介者的操作</span></span>
<span class="line"><span style="color:#24292E;">最终中介者执行操作，key为：key-B</span></span></code></pre></div><p>从上面的代码实现中，你会发现中介者模式的关键点就在于<strong>在组件与组件之间加入一个中间对象来进行间接通信</strong>。虽然多了&quot;一层&quot;会更烦琐些，但是这样就可以在中介者里进行其他的一些操作。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>中介者模式常见的使用场景有以下几种：</p><ul><li><p>系统中对象之间存在复杂的引用关系时，比如，聊天系统；</p></li><li><p>通过一个中间对象来封装多个类中的共有行为时，比如，在分层架构中的 DAO 层和数据库 DB 层中间再引入一个读写分离和读写均衡的中间层；</p></li><li><p>不想生成太多的子类时。</p></li></ul><p>为了帮助你快速理解中介者的适用场景，下面我们还是通过一个简单的例子来讲解和演示。</p><p>假设我们要设计一个可以让多人参与进去的聊天室，该怎么去实现呢？首先，定义聊天室的接口 ChatRoom，其中包含两个方法 sendMessage 和 addUser，分别代表发送消息和新增用户。这里的 ChatRoom 就是<strong>抽象的中介者类</strong>。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public interface ChatRoom {</span></span>
<span class="line"><span style="color:#E1E4E8;">    void sendMessage(String msg, String userId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    void addUser(User user);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public interface ChatRoom {</span></span>
<span class="line"><span style="color:#24292E;">    void sendMessage(String msg, String userId);</span></span>
<span class="line"><span style="color:#24292E;">    void addUser(User user);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后，创建一个 ChatRoom 的<strong>实现类</strong>ChatRoomImpl，使用 addUser 来添加需要聊天的用户对象，同时这里再使用一个Map来保存添加时需要用来进行通信的对象列表，在发送消息 sendMessage 的方法中，我们通过 userId 指定某个对象来接收消息。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class ChatRoomImpl implements ChatRoom {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private Map&lt;</span><span style="color:#FDAEB7;font-style:italic;">String,</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;">&gt; usersMap = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void sendMessage(String msg, String userId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        User u = usersMap.get(userId);</span></span>
<span class="line"><span style="color:#E1E4E8;">        u.receive(msg);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void addUser(User user) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.usersMap.put(user.getId(), user);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class ChatRoomImpl implements ChatRoom {</span></span>
<span class="line"><span style="color:#24292E;">    private Map&lt;</span><span style="color:#B31D28;font-style:italic;">String,</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">User</span><span style="color:#24292E;">&gt; usersMap = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void sendMessage(String msg, String userId) {</span></span>
<span class="line"><span style="color:#24292E;">        User u = usersMap.get(userId);</span></span>
<span class="line"><span style="color:#24292E;">        u.receive(msg);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void addUser(User user) {</span></span>
<span class="line"><span style="color:#24292E;">        this.usersMap.put(user.getId(), user);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>接下来我们再定义一个<strong>抽象组件类 User</strong>，如下所示：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public abstract class User {</span></span>
<span class="line"><span style="color:#E1E4E8;">    private ChatRoom mediator;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private String id;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public User(ChatRoom room, String id, String name){</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.mediator = room;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.name = name;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.id = id;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public abstract void send(String msg, String userId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    public abstract void receive(String msg);</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ChatRoom getMediator() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return mediator;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public String getId() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return id;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    public String getName() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public abstract class User {</span></span>
<span class="line"><span style="color:#24292E;">    private ChatRoom mediator;</span></span>
<span class="line"><span style="color:#24292E;">    private String id;</span></span>
<span class="line"><span style="color:#24292E;">    private String name;</span></span>
<span class="line"><span style="color:#24292E;">    public User(ChatRoom room, String id, String name){</span></span>
<span class="line"><span style="color:#24292E;">        this.mediator = room;</span></span>
<span class="line"><span style="color:#24292E;">        this.name = name;</span></span>
<span class="line"><span style="color:#24292E;">        this.id = id;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public abstract void send(String msg, String userId);</span></span>
<span class="line"><span style="color:#24292E;">    public abstract void receive(String msg);</span></span>
<span class="line"><span style="color:#24292E;">    public ChatRoom getMediator() {</span></span>
<span class="line"><span style="color:#24292E;">        return mediator;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public String getId() {</span></span>
<span class="line"><span style="color:#24292E;">        return id;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    public String getName() {</span></span>
<span class="line"><span style="color:#24292E;">        return name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>继承User实现一个<strong>具体的组件类 ChatUser</strong>，并实现发送消息 send 和接收消息 receive 的方法。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class ChatUser extends User {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public ChatUser(ChatRoom room, String id, String name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        super(room, id, name);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void send(String msg, String userId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(this.getName() + &quot; :: Sending Message : &quot; + msg);</span></span>
<span class="line"><span style="color:#E1E4E8;">        getMediator().sendMessage(msg, userId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void receive(String msg) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.println(this.getName() + &quot; :: Received Message : &quot; + msg);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class ChatUser extends User {</span></span>
<span class="line"><span style="color:#24292E;">    public ChatUser(ChatRoom room, String id, String name) {</span></span>
<span class="line"><span style="color:#24292E;">        super(room, id, name);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void send(String msg, String userId) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(this.getName() + &quot; :: Sending Message : &quot; + msg);</span></span>
<span class="line"><span style="color:#24292E;">        getMediator().sendMessage(msg, userId);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public void receive(String msg) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.println(this.getName() + &quot; :: Received Message : &quot; + msg);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>最后，我们同样还是运行一段单元测试代码：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class Client {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ChatRoom chatroom = new ChatRoomImpl();</span></span>
<span class="line"><span style="color:#E1E4E8;">        User user1 = new ChatUser(chatroom,&quot;1&quot;, &quot;Spike&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        User user2 = new ChatUser(chatroom,&quot;2&quot;, &quot;Mia&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        User user3 = new ChatUser(chatroom,&quot;3&quot;, &quot;Max&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        User user4 = new ChatUser(chatroom,&quot;4&quot;, &quot;Mick&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        chatroom.addUser(user1);</span></span>
<span class="line"><span style="color:#E1E4E8;">        chatroom.addUser(user2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        chatroom.addUser(user3);</span></span>
<span class="line"><span style="color:#E1E4E8;">        chatroom.addUser(user4);</span></span>
<span class="line"><span style="color:#E1E4E8;">        user1.send(&quot;Hello man&quot;, &quot;2&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        user2.send(&quot;Hey&quot;, &quot;1&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">//输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">Spike :: Sending Message : Hello man</span></span>
<span class="line"><span style="color:#E1E4E8;">Mia :: Received Message : Hello man</span></span>
<span class="line"><span style="color:#E1E4E8;">Mia :: Sending Message : Hey</span></span>
<span class="line"><span style="color:#E1E4E8;">Spike :: Received Message : Hey</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class Client {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        ChatRoom chatroom = new ChatRoomImpl();</span></span>
<span class="line"><span style="color:#24292E;">        User user1 = new ChatUser(chatroom,&quot;1&quot;, &quot;Spike&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        User user2 = new ChatUser(chatroom,&quot;2&quot;, &quot;Mia&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        User user3 = new ChatUser(chatroom,&quot;3&quot;, &quot;Max&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        User user4 = new ChatUser(chatroom,&quot;4&quot;, &quot;Mick&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        chatroom.addUser(user1);</span></span>
<span class="line"><span style="color:#24292E;">        chatroom.addUser(user2);</span></span>
<span class="line"><span style="color:#24292E;">        chatroom.addUser(user3);</span></span>
<span class="line"><span style="color:#24292E;">        chatroom.addUser(user4);</span></span>
<span class="line"><span style="color:#24292E;">        user1.send(&quot;Hello man&quot;, &quot;2&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        user2.send(&quot;Hey&quot;, &quot;1&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">//输出结果</span></span>
<span class="line"><span style="color:#24292E;">Spike :: Sending Message : Hello man</span></span>
<span class="line"><span style="color:#24292E;">Mia :: Received Message : Hello man</span></span>
<span class="line"><span style="color:#24292E;">Mia :: Sending Message : Hey</span></span>
<span class="line"><span style="color:#24292E;">Spike :: Received Message : Hey</span></span></code></pre></div><p>到此，我们就完成了一个简单的聊天室程序。从代码实现中能看出，<strong>中介者在使用时需要知道对象之间的交互关系，然后通过封装这些交互关系的变化让对象在使用中介者时变得更简单</strong>。</p><h3 id="为什么使用中介者模式" tabindex="-1">为什么使用中介者模式？ <a class="header-anchor" href="#为什么使用中介者模式" aria-label="Permalink to &quot;为什么使用中介者模式？&quot;">​</a></h3><p>分析完中介者模式的原理和使用场景后，我们再来说说使用中介者模式的原因，可总结为以下三个。</p><p><strong>第一个，解决对象之间直接耦合的问题，避免&quot;一处修改多处&quot;的连锁反应出现</strong>。比如，在上面聊天室的例子中，如果用户与用户之间是直连通信的，那么任何一个用户对象发生变化都会影响到直接聊天的那个用户，而那个用户可能又在跟别的用户聊天，以此类推，用户之间的关系会变得越来越复杂。这样，当我们再修改代码时，就很容易造成&quot;一处修改又引起多处修改&quot;的连锁反应。而使用中介者模式时，用户会通过聊天室和别的用户通信，避免了直接与对方通信，这样修改某个用户对象时并不会影响到其他对象。</p><p><strong>第二个，在结构上作为中转，解耦两个服务或系统之间的直接耦合关系</strong>。在分层架构中，我们都知道视图层一般不会直接使用 DAO 层，因为一旦直接使用，DAO 层任何一个微小的变动都可能引起视图层的变化，这时通常会引入 Service 层作为中介者来进行请求的转发，以达到解耦的目的，避免了相互之间的直接影响，同时也能在中间层里加入一些特定的逻辑，如性能监控、埋点数据记录等。</p><p><strong>第三个，为了更便捷地统一协同对象之间的通信</strong>。我们知道在对远程服务器进行调用时，协调网络通信是一件异常复杂和烦琐的事情，这时如果有一个中介者来统一协调，则会大大提升效率，比如，Dubbo 一类的 RPC 框架就是一个完整的中介者模式的体现。对于所有的 Java RPC 调用来说，只需要通过这个中间层来进行通信即可，而不需要知道对方服务器地址以及如何发起网络调用。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过以上分析，我们可以得出中介者模式主要有这样几个优点。</p><ul><li><p><strong>减少对象之间的直接交互，间接解耦过多依赖</strong>。比如，Maven 就是 Java 中引用 jar 包时的中介者，如果我们手动直接引用 jar 包，会容易造成非常混乱的引用关系，而使用 Maven 则能很方便地减少代码直接依赖 jar 包的问题。</p></li><li><p><strong>减少子类的创建数量</strong>。比如，在多个用户的会话请求中，我们可以使用一个通用的上下文的中介者来保存会话中一些不变的静态数据，这样就不需要每新增一个会话都需要新增一些静态数据。</p></li><li><p><strong>简化各系统的设计和实现</strong>。由于中介者能够处理一些共用的通信逻辑，所以其他对象在进行自身业务的处理时可以不用关心共用的通信逻辑，这样就大大减少了系统的实现逻辑。</p></li><li><p><strong>通过新建中间层快速扩展新功能，提升代码扩展性</strong>。比如，对象通过中间层调用时，我们可以在中间层加入对每一次请求或方法调用的耗时统计，这样就能快速扩展功能。</p></li></ul><p>同样，中介者模式也有一些缺点。</p><ul><li><p><strong>中介者类中的交互逻辑可能变得非常复杂且难以维护</strong>。当中介者类中包含了太多对象之间的交互细节后，中介者就变成了新的复杂对象，使得系统维护成本变高。</p></li><li><p><strong>中介者变成了新的重度依赖对象</strong>。一旦中介者对象变得复杂后，势必会增加与其他对象之间的耦合度，而这时如果中介者对象发生故障，则依赖的相关对象也会受到影响，修改中介者也会影响关联对象。</p></li><li><p><strong>中介者需要知道所有对象交互的逻辑</strong>。由于中介者对象承担了交互对象的传输渠道，所以就需要知道对象交互的详细细节，这样无疑增加了中介者对象的学习成本。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>虽然中介者模式的原理和实现都非常简单，但是中介者在系统中承担的责任却是非常重要的。</p><p>中介者通常会承担两方面的职责。</p><ul><li><p>一方面是<strong>中转作用（结构性）</strong>。不同对象通过中介者进行中转就意味着不再需要显式直接引用对象，比如聊天中的两个用户。当用户需要和另一个对象进行通信时，只需要通过中介者，而不需要直接和对方建立联系。这样从结构上不再会形成网状结构，而是以某个中介者为中心的星型结构，这样能极大地降低对象的结构耦合性。</p></li><li><p>另一方面是<strong>协调作用（行为性）</strong>。中介者会在自身内部分装协调逻辑，并对同类型的对象请求进行统一的处理。</p></li></ul><p>总结来讲，<strong>中介者模式提供了一种减少对象之间耦合度的思路</strong>。对于一些维护性的旧项目来说，直接修改已有代码通常都会导致系统出现问题，而通过引入中间层，能够起到过渡的作用，同时还能够逐渐解耦原有的强耦合关系，让系统的扩展性变得更强。不过，中介者也可能因此变得异常复杂，一旦中介者出现问题，就会导致所有系统都出现问题，所以在使用时也需要注意设计的度。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>学习了中介者模式后，你有没有发现，随着对象与对象都通过中介者来交互后，通信的效率其实反而变差了，中介者可能承担的职责会变得更多，这样会不会引发新的问题呢？为什么？欢迎你在留言区与我分享你的想法和答案。</p><p>在下一讲，我会接着与你分享&quot;迭代器模式与实现遍历数据时的职责分离&quot;的相关内容，记得按时来听课！</p>`,39);function h(b,v,q,C,M,S){const a=l("Image");return e(),o("div",null,[i,E,y,d,u,m,t(a,{alt:"设计模式35（202179-162249）.jpeg",src:"https://s0.lgstatic.com/i/image6/M01/4C/23/Cgp9HWDoCCOAYZ9-AAGxdIBEJ1E23.jpeg"}),n(),g])}const U=p(r,[["render",h]]);export{_ as __pageData,U as default};
