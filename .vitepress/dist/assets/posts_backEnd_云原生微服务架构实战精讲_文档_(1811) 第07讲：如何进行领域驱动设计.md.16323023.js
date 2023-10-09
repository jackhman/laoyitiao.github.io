import{_ as r,j as n,o as s,h as i,k as o,f as t,s as a,Q as l}from"./chunks/framework.d3daa342.js";const aa=JSON.parse('{"title":"第07讲：如何进行领域驱动设计","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1811) 第07讲：如何进行领域驱动设计.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1811) 第07讲：如何进行领域驱动设计.md","lastUpdated":1696682708000}'),h={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1811) 第07讲：如何进行领域驱动设计.md"},_=a("h1",{id:"第07讲-如何进行领域驱动设计",tabindex:"-1"},[t("第07讲：如何进行领域驱动设计 "),a("a",{class:"header-anchor",href:"#第07讲-如何进行领域驱动设计","aria-label":'Permalink to "第07讲：如何进行领域驱动设计"'},"​")],-1),c=a("p",null,"领域驱动设计（Domain-Driven Design，DDD）这个词，可能一部分人听说过，也有一部分人觉得比较陌生。自从 Eric Evans 在其著名的《领域驱动设计 - 软件核心复杂性应对之道》一书中，提出了领域驱动设计的概念之后，领域驱动设计的思想在开发社区得到了广泛的流行和应用，很多软件开发的布道者开始推广领域驱动设计的思想。",-1),d=a("br",null,null,-1),p=a("p",null,"之所以会在本专栏中提到领域驱动设计，是因为领域驱动设计在微服务架构中有着它独特的应用，尤其是在划分微服务和定义微服务的交互方式时。要在一个课时中完整的介绍领域驱动设计，显然是不现实的，本课时将着重介绍领域驱动设计中的基本概念，下一课时将介绍领域驱动设计在微服务架构中的应用。",-1),u=a("br",null,null,-1),b=l('<h2 id="领域和子领域" tabindex="-1">领域和子领域 <a class="header-anchor" href="#领域和子领域" aria-label="Permalink to &quot;领域和子领域&quot;">​</a></h2><p><strong>领域驱动设计是一种软件设计的方法学，以领域作为设计的起点和驱动力，</strong> 这里的核心关键词是领域。软件系统存在的价值在于帮助提升现实的业务，如果不能帮助现实的业务取得成功，那么设计再好的软件系统，也是无用的。一个软件系统的好坏，不在于它是否使用了最新的技术，也不在于它的开发流程多么的规范，而在于它能否解决业务中存在的问题。**一个软件系统所工作的业务范畴，就是它的领域。**从领域中，我们可以知道现实世界中的业务是如何进行的，而软件系统可以如何提供帮助来提升业务。</p><br><p>领域本身是一个很宽泛的概念。真实的软件系统所工作的领域通常都很大，比如，银行系统、保险系统、电子商务应用、叫车应用和外卖应用，它们所涉及的业务领域都庞大而复杂。而在实际操作中，通常把整个业务领域划分成多个<strong>子领域</strong>（Subdomain）。在实际的业务中，这通常与公司的不同部门相对应。</p><br><p>比如，一个电子商务应用的领域，可以被划分成产品目录、订单处理、付款处理、库存管理和送货服务等子领域，不同的子领域在业务中的重要程度不尽相同。<strong>核心领域</strong> （Core Domain）指的是业务领域中最核心和最重要的部分，也是软件系统开发中最需要关注的部分。<strong>支撑子领域</strong> （Supporting Subdomain）和<strong>通用子领域</strong>（Generic Subdomain）都是业务系统中必不可少的部分，但并不是核心。两者的区别在于，支撑子领域包含与业务相关的内容，而通用子领域则完全与业务无关。下图给出了电子商务应用的领域中的子领域的示例。</p><br>',7),m=l('<br><p>除了核心领域之外，其他子领域可以由外部系统来实现。以电子商务应用中的子领域为例，库存管理、付款处理和送货服务等子领域都可以集成外部系统，产品目录和订单处理都是支撑子领域。那核心领域是什么？这其实是在软件系统开发之前要解决的核心问题，也是这个系统的卖点。电子商务应用的核心领域应该是如何帮助客户提高销量，比如利用大数据技术预测产品的销售趋势等。只有聚焦在核心领域，软件系统才能取得成功。</p><h2 id="模型" tabindex="-1">模型 <a class="header-anchor" href="#模型" aria-label="Permalink to &quot;模型&quot;">​</a></h2><p>领域表示的是现实世界中的事物。如果要在软件开发中应用领域中的概念，则需要对领域进行抽象，也就是对领域建模，建模的结果是得到一个关于领域的模型。这个模型的获得，是一个迭代的过程，这个过程需要软件设计人员和业务人员的协同工作。软件设计人员通过与业务人员进行交流，发现领域中包含的概念，并把它们添加到模型中。在交流的过程中，模型不断的得到修正，最终得到的模型，是领域的一个真实映射。</p><br><p>**模型源于领域，但是高于领域，是领域的提炼与升华。**领域中无关的概念被剔除，只留下有价值的概念，以及概念的属性和操作。以电子商务应用为例，从领域中，我们可以提炼出客户、订单、产品、付款和送货等概念，每个概念有其相关的属性和操作。比如，客户的属性有姓名、Email 地址、联系电话和送货地址等，相关的操作有下订单、支付订单、退换货等。</p><br><p>模型可以采用不同的方式来表达，比如图片、图表、文档或是白板上的草图。模型的表达形式并不重要，重要的是模型所传递出来的思想。在经过辛勤的努力，得到了模型之后，需要交由开发团队来进行代码设计和实现，模型是代码设计和实现的基础。在设计和实现中，一个重要的目标是<strong>确保模型的完整性不被破坏</strong>。开发团队中人员众多，每个人对模型都有自己的理解，造成具体的实现可能偏离模型原本的定义。如果不加以控制，最终得到的代码，会无法反应出模型真实的面貌，从而无法满足业务的真正需求。领域驱动设计的本质是模型驱动设计，领域驱动设计提供了一些模式来帮助确保模型的完整性。</p><h2 id="通用语言" tabindex="-1">通用语言 <a class="header-anchor" href="#通用语言" aria-label="Permalink to &quot;通用语言&quot;">​</a></h2><p>提到领域驱动设计，就一定会提到通用语言（Ubiquitous Language），该含义其实并不复杂。前面提到了理解领域和从领域中提炼模型的重要性，这就需要去了解现实中的业务流程是如何工作的，以及软件系统如何能够帮助进行提升。谁最了解现实中的业务？当然是领域专家和业务相关的人员。软件设计人员需要与业务人员进行充分的交流来理解领域和提炼模型，那交流的时候应该使用什么语言呢？业务人员有自己的行话和术语，软件设计人员则倾向于从代码实现的角度去理解问题。</p><br><p>为了避免沟通上的误解，一个团队应该形成自己的通用语言，团队中的所有人都使用这个语言来交流。随着对于领域的理解的深入，这个语言也在交流中不断的调整，通用语言和模型之间关系密切，模型实际上是通用语言的骨干，当团队中的所有人都用通用语言进行交流时，就可以避免不必要的混淆和误解。</p><h2 id="界定的上下文" tabindex="-1">界定的上下文 <a class="header-anchor" href="#界定的上下文" aria-label="Permalink to &quot;界定的上下文&quot;">​</a></h2><p>界定的上下文（Bounded Context）是领域驱动设计中非常重要的概念。它反映了模型的一个重要特征，那就是<strong>模型只有在特定的上下文中才有意义</strong>。这个论断，明确指出了在传统的软件设计中经常会存在的一个误区，那就是设计出大而全的模型，而忽略模型所应用的上下文。</p><br><p>以电子商务应用为例，客户是模型中的一个基本概念，但是客户这个概念，在不同的上下文中的含义是不同的。当客户在浏览产品目录时，我们关注的是该客户的历史购买记录，以方便推荐合适的产品；当客户下订单时，我们关注的是该客户的支付方式和收货地址；当给客户送货时，客户的概念变得不再重要，只留下了收货人的地址和联系方式。在传统的面向对象设计方式中，在不同上下文中会共用一个客户类，所造成的结果就是不同上下文之间出现了紧密耦合关系。随着代码的更新，这个公用类会变得非常臃肿，另外，对这个公用类的修改，则需要多个小团队之间的协调。</p><br><p>界定的上下文指的是模型存在的边界，在这个边界之内，通用语言中的术语都有特定的含义。在电子商务应用中，同样是客户这样一个术语，在不同的界定上下文中的含义是不同的。当每次提到客户时，都是在特定的上下文中，比如产品目录上下文中的客户，和订单处理上下文中的客户，虽然名字一样，但是含义却不相同。工作在不同的上下文中的团队成员，都清楚的了解客户所代表的含义，客户不再是一个大而全的概念，在不同的上下文中变得具体和简洁。</p><br><p>在下图中，左侧是单一的客户概念，可以看到其中包含了很多的属性；右侧是不同界定的上下文中的模型。虽然这些模型中都有名为客户的概念，但是它们的含义和包含的属性是不同的，有些属性虽然重复出现，但是这样的划分是很有必要的。比如，在订单处理上下文中，客户有一个属性是收货地址列表，因为客户在下订单时可以从地址列表中进行选择；而送货服务上下文中，客户则只有一个收货地址，也就是实际要派送的地址。经过这样的划分之后，每个模型中的概念更加的清晰和具体。</p><br>',21),g=a("h2",{id:"模型中的元素",tabindex:"-1"},[t("模型中的元素 "),a("a",{class:"header-anchor",href:"#模型中的元素","aria-label":'Permalink to "模型中的元素"'},"​")],-1),A=a("p",null,"领域驱动设计中说明了模型中可能存在的不同元素。",-1),q=a("h3",{id:"分层架构",tabindex:"-1"},[t("分层架构 "),a("a",{class:"header-anchor",href:"#分层架构","aria-label":'Permalink to "分层架构"'},"​")],-1),P=a("p",null,"为了防止领域相关的逻辑散落在应用的不同部分，应该使用分层架构，每个层次都是高内聚的。下表给出了领域驱动设计推荐的 4 个层次，按照从上到下的方式出现。",-1),C=a("br",null,null,-1),x=a("br",null,null,-1),f=a("p",null,"严格来说，每个层次都应该只与直接在它下面的那一层进行交互，不过，这样的限制在具体的实现中可能过于严格，可以适当放松。",-1),k=a("br",null,null,-1),S=a("p",null,"下图给出了这 4 个层次之间的交互关系，在上面的层次可以访问下面的所有层次。",-1),T=a("br",null,null,-1),N=l('<h3 id="实体" tabindex="-1">实体 <a class="header-anchor" href="#实体" aria-label="Permalink to &quot;实体&quot;">​</a></h3><p>提到实体（Entity），很多人会联系到 JPA 和 Hibernate 中的实体。领域驱动设计中的实体，与 JPA 中的实体并没有实际上的关联。实体指的是一类特殊的对象，这类对象有唯一的标识符，并且在其生命周期中，对象的标识符保持不变。对于实体来说，重要的不是其中包含的属性，而是其标识符。实体之间通过标识符来进行区分。</p><h3 id="值对象" tabindex="-1">值对象 <a class="header-anchor" href="#值对象" aria-label="Permalink to &quot;值对象&quot;">​</a></h3><p>值对象（Value Object）与实体不同，值对象并没有自己的标识符，而是由属性值来确定相等性。如果两个值对象的全部属性值都是相等的，那么这两个值对象就是相等的，值对象一般是不可变的，方便进行共享。</p><h3 id="服务" tabindex="-1">服务 <a class="header-anchor" href="#服务" aria-label="Permalink to &quot;服务&quot;">​</a></h3><p>有些操作并不能添加到实体或值对象上，而这些操作本来就是行为和动作，需要以对象的方式来表达。对于这样的操作，一般使用服务来进行表示。服务所表示的操作与一个领域中的概念相关，并且是无状态的。服务对象并不包含内部的状态，只是为了提供相关的功能。</p><h3 id="模块" tabindex="-1">模块 <a class="header-anchor" href="#模块" aria-label="Permalink to &quot;模块&quot;">​</a></h3><p>模块（Module）是相关概念的一种组织方式，模块内部是高内聚的，模块之间是松散耦合的，模块的作用在于降低理解的复杂度。每次只需要专注于一个模块中的有限概念即可，模块由功能上或逻辑上紧密关联的元素组成。模块对外提供定义良好的接口，模块也属于通用语言的一部分。</p><h3 id="聚合" tabindex="-1">聚合 <a class="header-anchor" href="#聚合" aria-label="Permalink to &quot;聚合&quot;">​</a></h3><p>领域驱动设计中的聚合（Aggregate）是一个很重要的概念，在说明什么是聚合之前，先了解一些聚合所要解决的问题是什么。在建模的过程中，我们会创建很多实体和值对象，比如，在电子商务应用的模型中，会包含客户、产品、订单和订单项等实体。这些实体和值对象之间存在关联关系，比如，订单实体中包含多个订单项实体，订单项实体则引用产品实体，客户实体关联多个订单实体。对某个实体进行的操作，可能会影响多个实体，产生级联式的反应。</p><br><p>在更新操作时，一个挑战是如何保证由业务规则决定的不变量不被破坏。比如，由于新冠肺炎造成了卫生纸的短缺，在线购物网站需要应用一个业务规则，那就是每个订单中的卫生纸不能超过 3 个，由于卫生纸类别下的产品有很多，每个订单中的订单项实体可能会引用不同的产品。如果更新订单的服务可以直接访问订单中的订单项实体，那么在并发操作时可能造成不变量被破坏。</p><br><p>比如，当前订单中的两个订单项分别包含了卫生纸 A 和 B 各 1 件，这个时候可以把卫生纸 A 和 B 的数量增加 1。如果只在修改订单项的操作之前进行检查，那么当两个数量加 1 的操作并发执行时，有可能两个操作的检查都通过，从而都可以继续执行。所产生的结果是订单中卫生纸的数量变成了 4，破坏了业务规则设置的不变量。</p><br><p>造成上述问题的原因在于，订单项实体可以被外部直接访问，而不变量的规则定义在包含它们的订单实体中。聚合是实体和值对象的一个集群，有自己的边界，每个聚合都有一个根。聚合的根是聚合中包含的一个实体，也是外部对象唯一可以访问的聚合中的对象。聚合内部的实体和值对象可以互相引用。</p><br><p>聚合有如下特征：</p><ul><li><p>作为聚合根的实体拥有全局的标识符，并且负责检查不变量。</p></li><li><p>聚合中除了根之外的其他实体只有局部的标识符，只在聚合内部唯一。</p></li><li><p>聚合边界之外的对象只能引用聚合的根实体。虽然外部对象可以通过聚合的根实体获取到内部对象的引用，不过这些引用是临时的，不能用来改变内部对象的状态。一个常见的做法是将内部对象转换成值对象之后，再返回给使用者。</p></li><li><p>聚合中的对象可以引用其他聚合的根对象。</p></li></ul><br><p>在应用了聚合的概念之后，可以创建一个订单相关的聚合，订单实体是这个聚合的根，而订单项则变成了该聚合的内部实体。外部对象只能通过订单实体来进行更新，这就确保了订单的不变量可以在每次更新操作时都得到检查。</p><h3 id="工厂" tabindex="-1">工厂 <a class="header-anchor" href="#工厂" aria-label="Permalink to &quot;工厂&quot;">​</a></h3><p>工厂（Factory）用来创建聚合或对象，对象一般可通过构造器来创建，对于一些复杂的对象或聚合来说，创建的逻辑可能很复杂。工厂的作用是提供了一个专有的接口来创建对象或聚合。</p><h3 id="资源库" tabindex="-1">资源库 <a class="header-anchor" href="#资源库" aria-label="Permalink to &quot;资源库&quot;">​</a></h3><p>在使用对象之前，首先需要获得该对象的引用，为了得到引用，要么创建一个新的对象，要么根据对象的引用关系进行遍历，进行遍历的前提条件是找到作为起点的那个对象，这个起点对象通常是聚合的根。资源库（Repository）封装了获取对象引用的逻辑，同时也提供了对象的添加、删除和查询操作，只需要对聚合的根提供资源库即可。</p><br><p>熟悉 Spring 的人可能发现了 Spring 中的注解 Service 和 Repository 与领域驱动设计中的元素有一样的名称，这是因为这两个注解本来就来源于领域驱动设计。</p><h2 id="上下文映射" tabindex="-1">上下文映射 <a class="header-anchor" href="#上下文映射" aria-label="Permalink to &quot;上下文映射&quot;">​</a></h2><p>由于多个上下文的存在，同一个概念在不同的上下文模型中有不同的表达形式。当需要把这些不同的上下文进行集成时，则需要考虑不同上下文之间的同一个概念，如何进行映射的问题。下面介绍常用的映射方式。</p><h3 id="共享内核" tabindex="-1">共享内核 <a class="header-anchor" href="#共享内核" aria-label="Permalink to &quot;共享内核&quot;">​</a></h3><p>共享内核（Shared Kernel）指的是两个界定的上下文共享同一个很小的模型，因为这个模型是共享的，就意味着在两个上下文之间建立了紧密耦合的关系。当对这个共享模型进行修改时，需要两个上下文团队的沟通与合作，为了避免造成冲突，共享模型一般由其中一个团队负责维护。共享内核的做法虽然看起来并不是很理想，但是在很多情况下都有用武之地。</p><br><p>下图给出了共享内核的示例，两个界定的上下文中间交界的地方就是共享内核。</p><br>',34),I=a("h3",{id:"客户-供应商",tabindex:"-1"},[t("客户---供应商 "),a("a",{class:"header-anchor",href:"#客户-供应商","aria-label":'Permalink to "客户---供应商"'},"​")],-1),M=a("p",null,"客户---供应商（Customer - Supplier）指的是两个界定的上下文之间存在生产者和消费者的关系，供应商是上游的提供者，客户是下游的消费者。客户可以对供应商提出要求，而供应商要尽可能满足客户的要求，但最终的决定权在供应商手中。",-1),V=a("br",null,null,-1),D=a("p",null,"下图给出了客户---供应商的示例。",-1),E=a("br",null,null,-1),H=a("h3",{id:"顺从者",tabindex:"-1"},[t("顺从者 "),a("a",{class:"header-anchor",href:"#顺从者","aria-label":'Permalink to "顺从者"'},"​")],-1),B=a("p",null,[t("顺从者（Conformist）可以看成是客户---供应商的一种特殊情况，也同样分为上游的生产者和下游的消费者。不同之处在于，作为上游的供应商完全可以不考虑客户的需求，客户只能选择全盘接受供应商提供的模型，这也是"),a("strong",null,"顺从者"),t("这个名称的含义。从另一个角度来看，顺从者模式又像是共享内核，只不过客户并不能对这个共享内核做出任何修改。")],-1),v=a("h3",{id:"防腐蚀层",tabindex:"-1"},[t("防腐蚀层 "),a("a",{class:"header-anchor",href:"#防腐蚀层","aria-label":'Permalink to "防腐蚀层"'},"​")],-1),R=a("p",null,"防腐蚀层（Anticorruption Layer）指的是作为下游的团队，当与上游的模型进行集成时，在两个模型之间创建一个独立的隔离层，这个层次称为防腐蚀层，防腐蚀层的存在，使得下游的团队可以根据其自身的实际业务来定义模型。与上游模型的转换工作，由防腐蚀层来完成，这就保证了下游模型的稳定性，避免受到外部模型的侵蚀。防腐蚀层有着自己不小的代价，不过这样的代价所带来的好处也是值得的。",-1),y=a("br",null,null,-1),J=a("p",null,"下图给出了防腐蚀层的示例。",-1),U=a("br",null,null,-1),Y=a("h3",{id:"开放主机服务",tabindex:"-1"},[t("开放主机服务 "),a("a",{class:"header-anchor",href:"#开放主机服务","aria-label":'Permalink to "开放主机服务"'},"​")],-1),j=a("p",null,"开放主机服务（Open Host Service）指的是界定的上下文以开放服务的方式对外提供访问，所开放的服务有设计良好的 API，这使得其他团队可以更容易的进行集成。",-1),L=a("br",null,null,-1),O=a("p",null,"下图给出了开放主机服务的示例。",-1),$=a("br",null,null,-1),K=l('<h3 id="公开语言" tabindex="-1">公开语言 <a class="header-anchor" href="#公开语言" aria-label="Permalink to &quot;公开语言&quot;">​</a></h3><p>当多个模型需要协同工作时，在这些模型之间传递消息是必不可少的，一个现实的问题是如何定义消息的格式。如果两个模型之间是顺从者的关系，那么直接用上游的模型来作为消息的格式即可。在大多数情况下，两个模型是相对独立的，不存在以其中某一个为主的情况。</p><br><p>一种好的做法是定义一种公开语言（Published Language）作为沟通的中间格式，两个模型在进行消息传递时，都需要转换成这个中间格式。公开语言通常与开放主机服务一块使用，如果开放主机服务提供的 API 以公开的方式发布出来，就成为了公开语言。</p><h3 id="分道扬镳" tabindex="-1">分道扬镳 <a class="header-anchor" href="#分道扬镳" aria-label="Permalink to &quot;分道扬镳&quot;">​</a></h3><p>上面介绍的这些上下文映射的模式，其目的还是希望可以与上游的上下文中的模型进行集成。为了要进行集成，就必须添加类似防腐蚀层这样的结构，这就意味着附加的实现成本。在有些情况下，这些附加的成本所带来的好处，可能还抵不上它的成本，在这样的情况下，集成就不是一个好的选项。可能更好的做法是不去集成，而是自己实现所需要的模型，这就是<strong>分道扬镳</strong>（Seperate Way）模式。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>领域驱动设计的思想在微服务架构中有其独特的应用。本课时对领域驱动设计的基本概念进行了介绍，包括领域、子领域、模型、通用语言和界定的上下文等；接着介绍了模型中包含的元素，包括实体、值对象、服务、模块、聚合、工厂和资源库等；最后介绍了在不同的界定的上下文之间进行映射的方式，包括共享内核、客户---供应商、顺从者、防腐蚀层、开放主机服务、公开语言和分道扬镳等。</p>',8);function Q(G,W,w,F,X,Z){const e=n("Image");return s(),i("div",null,[_,c,d,p,u,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/20/Cgq2xl6NoH6AL_taAABXaOR7skw235.jpg"}),t(),b,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/0A/Ciqah16NoH6ADTPjAAHuYoq0YMU365.png"}),t(),m,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/0A/Ciqah16NoH-ASKCJAAAqc96nsaI393.png"}),t(),g,A,q,P,C,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/20/Cgq2xl6NoH-AASaUAABWcus8PZs461.png"}),t(),x,f,k,S,T,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/0A/Ciqah16NoH-AYYi4AACGbPhl2MQ829.png"}),t(),N,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/0A/Ciqah16NoH-AYMkPAACScPd_CmU621.png"}),t(),I,M,V,D,E,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/20/Cgq2xl6NoICAJot5AACun34sV3k024.png"}),t(),H,B,v,R,y,J,U,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/20/Cgq2xl6NoICAQpeIAAC1-kP-KdE293.png"}),t(),Y,j,L,O,$,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/20/Cgq2xl6NoICAJ-mMAAC5dqCxNaU132.png"}),t(),K])}const ta=r(h,[["render",Q]]);export{aa as __pageData,ta as default};
