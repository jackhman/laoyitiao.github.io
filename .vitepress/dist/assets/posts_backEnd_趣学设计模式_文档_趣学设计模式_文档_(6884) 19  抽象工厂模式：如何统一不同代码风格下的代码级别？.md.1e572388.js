import{_ as p,j as o,o as e,g as t,k as a,h as l,Q as n,s as r}from"./chunks/framework.e0c66c3f.js";const d=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6884) 19  抽象工厂模式：如何统一不同代码风格下的代码级别？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6884) 19  抽象工厂模式：如何统一不同代码风格下的代码级别？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6884) 19  抽象工厂模式：如何统一不同代码风格下的代码级别？.md"},E=n('<p>在 GoF 的《设计模式》一书中，工厂模式被分为了三种：简单工厂、工厂方法和抽象工厂。（不过，在书中作者将简单工厂模式看作是工厂方法模式的一种特例。）在实际工作中，用得比较多的就是<strong>工厂方法模式</strong> 和<strong>抽象工厂模式</strong>这两类。</p><p>今天，我们先来讲解抽象工厂模式。</p><p>学习抽象工厂模式真正的重点和难点在于：<strong>如何找到正确的抽象</strong>。虽然抽象工厂模式很容易实现，但更重要的是我们要能意识到&quot;正确的抽象往往都很简单也很底层&quot;，比如，数据库的增删改查操作，日志的 debug、info、warn、error 级别，JVM 内存模型，等等。其实，抽象工厂模式想要告诉我们的不只是在写代码时随便建个抽象类就够了，而是当我们自己在对一类功能进行抽象分析时有没有找到足够简单而又通用的正确抽象。</p><p>那么，话不多说，我们这就开始今天的学习吧！</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>抽象工厂模式的原始定义是：提供了一个用于创建相关或相关对象族的接口，而无须指定其具体类。</p><p>实际上，这句话是给使用者说的。因为从使用者的角度来看，他有时可能只关心某一个抽象的大类，就好比你去租车时，你对店员说，你想要租一辆小型轿车，但具体品牌和型号你并不在意。而站在创建者的角度看，他需要关注的是如何找到这个正确的抽象大类，就好比在上面的租车场景中，你需要从普通的汽车消费者变成汽车厂的厂长一样，你必须关注最后具体的型号该怎么落地。</p><p>所以说，<strong>当我们在创建抽象工厂模式时，最终还是会涉及指定具体的实现类</strong>。换句话说，定义只是说了抽象工厂模式应该要朝着分析共性规律的方向走，而具体操作时我们还得仔细分析具体实现类该怎么实现才行。</p><p>我们再来看看抽象工厂模式原始的 UML 图：</p>',9),y=n(`<p>从这个 UML 图中，我们能看出抽象工厂模式中其实包含了四个关键角色。</p><ul><li><p>抽象工厂；</p></li><li><p>抽象产品（通用的一类对象或接口）；</p></li><li><p>具体工厂；</p></li><li><p>具体产品（继承通用对象或接口后扩展特有属性）。</p></li></ul><p>为便于你更好地理解这几个角色，这里我们结合现实中的例子来打个比方。比如说，<strong>抽象工厂</strong> 生产的<strong>抽象产品</strong> 是椅子、桌子、沙发一类的家具，那<strong>具体工厂</strong> 可能就在生产<strong>具体的产品</strong>：椅子设计成现代简约风格或欧洲宫廷风格，使用的材质有木质或铝制，等等。本质上椅子的特性没有发生重大改变，但在外观上，不同的具体工厂生产的椅子尺寸、材质、外观各不相同。</p><p>其中最为关键的角色并不是抽象工厂本身，而是抽象产品。<strong>抽象产品的好坏才是直接决定了抽象工厂和具体工厂能否发挥最大作用的关键所在</strong>。这也是我们在前面原则模块和思维模块里多次提到的&quot;找到正确的抽象很重要&quot;的原因。</p><p>明白了这个道理后，这时你再来看下面 UML 图的代码实现，会发现思路特别清晰。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Chair myChair;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Sofa mySofa;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Table myTable;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//通过抽象工厂来生产家具</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;">(AbsractFactory </span><span style="color:#FFAB70;">af</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        myChair </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> af.</span><span style="color:#B392F0;">createChair</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        mySofa </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> af.</span><span style="color:#B392F0;">createSofa</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        myTable </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> af.</span><span style="color:#B392F0;">createTable</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//抽象的家具工厂</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbsractFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> Chair </span><span style="color:#B392F0;">createChair</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> Sofa </span><span style="color:#B392F0;">createSofa</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> Table </span><span style="color:#B392F0;">createTable</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//中国的家具工厂</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ChinaFactory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbsractFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Chair </span><span style="color:#B392F0;">createChair</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ChinaChair</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Sofa </span><span style="color:#B392F0;">createSofa</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ChinaSofa</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Table </span><span style="color:#B392F0;">createTable</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ChinaTable</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//美国的家具工厂</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">USAFactory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbsractFactory</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Chair </span><span style="color:#B392F0;">createChair</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">USAChair</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Sofa </span><span style="color:#B392F0;">createSofa</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">USASofa</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Table </span><span style="color:#B392F0;">createTable</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">USATable</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Client</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Chair myChair;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Sofa mySofa;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Table myTable;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//通过抽象工厂来生产家具</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Client</span><span style="color:#24292E;">(AbsractFactory </span><span style="color:#E36209;">af</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        myChair </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> af.</span><span style="color:#6F42C1;">createChair</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        mySofa </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> af.</span><span style="color:#6F42C1;">createSofa</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        myTable </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> af.</span><span style="color:#6F42C1;">createTable</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//抽象的家具工厂</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbsractFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> Chair </span><span style="color:#6F42C1;">createChair</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> Sofa </span><span style="color:#6F42C1;">createSofa</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> Table </span><span style="color:#6F42C1;">createTable</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//中国的家具工厂</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ChinaFactory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbsractFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Chair </span><span style="color:#6F42C1;">createChair</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ChinaChair</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Sofa </span><span style="color:#6F42C1;">createSofa</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ChinaSofa</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Table </span><span style="color:#6F42C1;">createTable</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ChinaTable</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//美国的家具工厂</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">USAFactory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbsractFactory</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Chair </span><span style="color:#6F42C1;">createChair</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">USAChair</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Sofa </span><span style="color:#6F42C1;">createSofa</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">USASofa</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Table </span><span style="color:#6F42C1;">createTable</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">USATable</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>代码实现了两个不同国家的家具制造工厂。其中，AbsractFactory 是抽象工厂，创建的椅子、沙发和桌子是抽象产品；中国工厂和美国工厂是具体工厂，通过中国工厂或美国工厂制作的家具是具体产品。当我们只想买椅子、沙发和桌子时，只需要告诉抽象工厂就行，可能得到的是中国生产的，也可能是美国生产的。</p><p>从上面代码实现中我们可以看出，抽象工厂模式向使用（客户）方隐藏了下列变化：</p><ul><li><p>程序所支持的实例集合（具体工厂）的数目；</p></li><li><p>当前是使用的实例集合中的哪一个实例；</p></li><li><p>在任意给定时刻被实例化的具体类型；</p></li><li><p>实例集变化的依据。</p></li></ul><p>这些变化也给了我们一些启示，对于<strong>软件使用者</strong> 来说，他们其实更关心某一组产品的某些共性功能，至于这些功能具体的实现他们并不在意。反过来，对于<strong>软件创建者</strong>来说，他们要找到正确的共性功能，并尽可能隐藏具体的实现细节，始终围绕着提供符合共性功能的软件。比如，Spring 框架就是始终围绕着如何正确地管理（创建、使用、销毁）Java 对象生命周期这个共性功能。</p><p>所以说，在理解抽象工厂模式原理时，你一定要牢牢记住&quot;如何找到某一个类产品的正确共性功能&quot;这个重点。</p>`,11),i=n(`<h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>实际上，抽象工厂模式在现实中有很多应用。</p><p>比如，当我们需要在一个应用程序中支持多个操作系统时，就会用到像抽象工厂模式这样的机制，需要为目前应用程序所使用的操作系统（Windows、Mac、Linux）选择正确的硬件驱动程序集合（包括磁盘驱动程序、显示驱动程序、IO 外设驱动程序等）。</p><p>再比如，在电商系统中，国内电商和海外电商都需要使用类似商品、订单、物流等系统，但是不同地区的政策条件不同、购买习惯不同，即便是同样的线上购物流程，也会存在不同的具体代码实现。这种情况下使用抽象工厂模式就是一个很好的方式，不仅能提高代码的可移植性，还能找到不同地区的差异性。</p><p><strong>简单来说，在软件开发中，抽象工厂模式的使用场景主要就是解决跨平台兼容性的问题。</strong></p><p>这里我们还是通过一个例子来帮助你理解抽象工厂模式的使用场景。在 Spring 框架中的 BeanFactory 就是最早实现抽象工厂模式的代码，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String FACTORY_BEAN_PREFIX </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&amp;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; T </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">, Class&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">var2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">, Object... </span><span style="color:#FFAB70;">var2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; T </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(Class&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; T </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(Class&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">, Object... </span><span style="color:#FFAB70;">var2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; ObjectProvider&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getBeanProvider</span><span style="color:#E1E4E8;">(Class&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; ObjectProvider&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getBeanProvider</span><span style="color:#E1E4E8;">(ResolvableType </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">containsBean</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isSingleton</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isPrototype</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isTypeMatch</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">, ResolvableType </span><span style="color:#FFAB70;">var2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isTypeMatch</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">, Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">var2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Nullable</span></span>
<span class="line"><span style="color:#E1E4E8;">    Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getType</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Nullable</span></span>
<span class="line"><span style="color:#E1E4E8;">    Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getType</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">var2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">getAliases</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    String FACTORY_BEAN_PREFIX </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&amp;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    Object </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; T </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">, Class&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">var2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException;</span></span>
<span class="line"><span style="color:#24292E;">    Object </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">, Object... </span><span style="color:#E36209;">var2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; T </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(Class&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; T </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(Class&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">, Object... </span><span style="color:#E36209;">var2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; ObjectProvider&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getBeanProvider</span><span style="color:#24292E;">(Class&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; ObjectProvider&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getBeanProvider</span><span style="color:#24292E;">(ResolvableType </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">containsBean</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isSingleton</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isPrototype</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isTypeMatch</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">, ResolvableType </span><span style="color:#E36209;">var2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isTypeMatch</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">, Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">var2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Nullable</span></span>
<span class="line"><span style="color:#24292E;">    Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getType</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Nullable</span></span>
<span class="line"><span style="color:#24292E;">    Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getType</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#E36209;">var2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> NoSuchBeanDefinitionException;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">getAliases</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>BeanFactory 在 Spring 中是实现 IoC 容器的核心接口，它的职责包括：实例化、定位、配置应用程序中的对象及建立这些对象间的依赖。实现这个接口的抽象工厂类有很多，比如，AbstractBeanFactory 等。</p>`,8),F=r("p",null,"实现 BeanFactory 接口的类列表概览",-1),g=n('<p>继承自 AbstactBeanFactory 的三个子类</p><p>而围绕 AbstractBeanFactory 的具体实现类，有 DefaultListableBeanFactory、XmlBeanFactory 等。这里，BeanFactory 就是抽象产品，AbstractBeanFactory 是抽象工厂，XmlBeanFactory 是具体工厂，通过 XML 注入的 Bean 实例就是最终通过 XmlBeanFactory 具体实现的产品。</p><p>总结来说，<strong>在实际的代码实现中，抽象工厂模式体现为定义一个抽象工厂类，多个不同的具体工厂继承这个抽象工厂类后，再各自实现相同的抽象功能，进而实现代码上的多态性。</strong></p><h3 id="为什么要使用抽象工厂模式" tabindex="-1">为什么要使用抽象工厂模式？ <a class="header-anchor" href="#为什么要使用抽象工厂模式" aria-label="Permalink to &quot;为什么要使用抽象工厂模式？&quot;">​</a></h3><p>分析完抽象工厂模式的原理和使用场景后，我们再来说说使用抽象工厂模式的原因，主要有以下三点。</p><p><strong>第一点，对于不同产品系列有比较多共性特征时，可以使用抽象工厂模式，有助于提升组件的复用性。</strong> 比如，不同的数据库产品，JDBC 就是对于数据库增删改查建立的抽象工厂模式，无论使用什么类型的数据库，只要具体的数据库组件能够支持 JDBC，就能对数据库进行读写操作，这极大地提高了我们对不同数据库组件的复用性。</p><p><strong>第二点，当需要提升代码的扩展性并降低维护成本时，把对象的创建和使用过程分开，能有效地将代码统一到一个级别上</strong>。比如，你需要创建统一的日志监控，但不同应用使用的日志收集代理可能各不相同，这时如果有一个统一的日志收集工厂定义抽象的日志收集功能，那么不同的代理只需要按照各自的实现方式提供统一的日志收集功能即可，这样即便以后新增了一些代理，也不会影响旧的功能，提升扩展性的同时也能提升维护性。</p><p><strong>第三点，解决跨平台带来的兼容性问题。</strong> 抽象工厂模式提供了一种解决跨平台问题的思路，也就是我们的后台服务应该尽可能地使用更高层级的统一的抽象功能，然后通过不同客户端的适配程序来实现统一的功能交付。比如，同一个地区里，安卓或 iOS 的客户端 App 通过 API 网关访问商品数据时，应该是先获取统一的抽象数据对象，然后经过安卓或 iOS 的客户端适配器程序的适配转换和传输，而不是针对具体型号的手机（华为、小米、苹果等）来单独进行适配，安卓和 iOS 这里就被看作是不同手机型号的抽象工厂模式。</p><h3 id="收获什么-损失什么" tabindex="-1">收获什么？损失什么？ <a class="header-anchor" href="#收获什么-损失什么" aria-label="Permalink to &quot;收获什么？损失什么？&quot;">​</a></h3><p>那使用抽象工厂模式我们能收获什么呢？也就是抽象工厂模式的优点有哪些呢？我总结出以下五点。</p><ul><li><p><strong>符合开闭原则。</strong> 当我们需要添加新的工厂类时，只用新继承一个类，不用修改抽象工厂和其他具体类。</p></li><li><p><strong>可以保证同一工厂生成的产品符合预期。</strong> 通过抽象工厂定义了统一的抽象产品功能，只要是继承了这个抽象工厂，本质的抽象产品功能是不会发生改变的。</p></li><li><p><strong>将使用和创建的代码进行解耦。</strong> 在具体的代码实现中，使用者只用关心如何使用具体的功能，而不再需要关心这个对象是怎么创建的。这样对象与对象之间的耦合关系变得更单一，降低了过多应用带来的耦合风险。</p></li><li><p><strong>满足单一职责原则。</strong> 由于我们将产品的实现代码放到同一层级里，并继承同一个抽象工厂类，所以说，即便具体的代码风格有所不同，也不影响最终提供功能的统一性，使得代码的可维护性大大提高。</p></li><li><p><strong>容易增加新的产品系列。</strong> 因为有了抽象工厂作为参考模板，那么再新增新的具体工厂时非常容易，不需要修改其他具体工厂，并且各自的工厂可以朝着自己的演化方向发展。</p></li></ul><p>同样，除了以上优点外，抽象工厂模式也有一些缺点。</p><ul><li><p><strong>增加代码量。</strong> 虽然抽象工厂模式很好地进行了职责分离，但因此也增加了更多的类文件和代码行数，使得开发时间变长，并且随着实现子类越来越多，可能当一个抽象工厂想要增加抽象时，影响的代码范围会很大。</p></li><li><p><strong>增加学习成本。</strong> 抽象工厂模式是自顶向下式的设计，无论是入门级的程序员还是资深程序员，一开始就找到正确的抽象是一件非常困难的事情。这可能需要学习大量的实践案例，并不断总结归纳才有可能做得更好。</p></li><li><p><strong>变更产品的结构困难。</strong> 抽象工厂模式最大的缺点在于，一旦定义了某种产品结构后，要想修改就得修改所有的具体工厂和抽象工厂。比如，家具工厂需要再生产&quot;门&quot;这个家具，那么不管是已有的中国工厂还是美国工厂，都需要新增生产&quot;门&quot;的家具，势必会引入风险。其实，这本质上就是继承带来的问题。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在我看来，抽象工厂模式的使用和创建都很简单，不过这并不是应用这个模式的重点，重点其实在于能否明白抽象工厂模式的本质，也就是如何寻找到正确的抽象。<strong>只有找到了正确的抽象产品，才能发挥抽象工厂模式的作用</strong>，这样即便你的具体工厂全部是硬编码或烂代码，也依然不会掩盖优秀设计的光辉。</p><p>换句话说，如果没有找到正确的抽象产品，那么你不应该急着去使用抽象工厂模式。如果只是想要封装对象创建过程，那么使用工厂方法模式完全可以满足要求的。</p><p>另外，你可能会发现在很多优秀的开源框架中都会使用到抽象工厂模式，但在具体的业务代码开发中，却很少使用，为什么？原因就在于我们常常低估了正确抽象设计的作用，更多时候只想要实现立即能用的工作代码。</p><p>因此，我希望你学完今天的课程后，能够在实践中更多地实践抽象工厂模式，这会对你在日后进行抽象设计有很大的帮助。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>抽象工厂模式是在很多开源框架、类库中都有应用，比如，JDK 中的 DocumentBuilderFactory 和 TransformerFactory。除此之外，你还知道哪些优秀的抽象工厂模式的实践案例呢？</p><p>欢迎留言分享，我会第一时间给你回复。</p><p>在下一讲，我会接着与你分享&quot;工厂方法模式：如何解决生成对象时的不确定性？&quot;这个话题，记得按时来听课！</p>',22);function A(h,B,C,b,D,_){const s=o("Image");return e(),t("div",null,[E,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/3F/70/Cgp9HWCeK86AUL5HAADvgr2h814367.png"}),y,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/70/Cgp9HWCeK-OAbh1TAAXmBulFbns965.png"}),i,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/70/Cgp9HWCeK_KAe9fJAAdU9XpK5Xw488.png"}),l(),F,a(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/70/Cgp9HWCeK_mADInoAAJBgDbFziw310.png"}),l(),g])}const v=p(c,[["render",A]]);export{d as __pageData,v as default};
