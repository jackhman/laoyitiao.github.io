import{_ as n,j as s,o as l,g as i,k as o,h as t,Q as r,s as a}from"./chunks/framework.4e7d56ce.js";const G=JSON.parse('{"title":"第08讲：如何对示例应用进行微服务划分","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1812) 第08讲：如何对示例应用进行微服务划分.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1812) 第08讲：如何对示例应用进行微服务划分.md","lastUpdated":1696417798000}'),h={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1812) 第08讲：如何对示例应用进行微服务划分.md"},p=r('<h1 id="第08讲-如何对示例应用进行微服务划分" tabindex="-1">第08讲：如何对示例应用进行微服务划分 <a class="header-anchor" href="#第08讲-如何对示例应用进行微服务划分" aria-label="Permalink to &quot;第08讲：如何对示例应用进行微服务划分&quot;">​</a></h1><p>在第 07 课时介绍了领域驱动设计的基本概念之后，本课时将介绍如何在微服务划分时应用领域驱动设计相关的思想。</p><h1 id="微服务划分" tabindex="-1">微服务划分 <a class="header-anchor" href="#微服务划分" aria-label="Permalink to &quot;微服务划分&quot;">​</a></h1><p>在微服务架构应用的设计和实现中，如果要找出最重要的一个任务，那必定是非<strong>微服务划分</strong>莫属。微服务架构的核心是多个互相协作的微服务组成的分布式系统，只有在完成微服务的划分之后，才能明确每个微服务的职责，以及确定微服务之间的交互方式，然后再进行每个微服务的 API 设计，最后才是每个微服务的具体实现、测试和部署。</p><br><p>从上述流程中可以看到，微服务划分处在应用的设计和实现整个链条的第一环。链条中每一环的变动，都会对后面的环节产生影响，作为第一环的微服务划分，如果产生变动，则会影响后面全部的环节。你最不希望看到的就是，在微服务实现的过程中，发现有些功能应该被迁移到其他微服务中。如果发生这样的情况，那么会造成相关微服务的 API 和实现都需要进行修改。</p><br><p>当然了，在实际开发中，要完全避免对微服务划分的改动也是不现实的。在微服务划分阶段，花费足够多的精力来进行分析，所获得的收益绝对是巨大的。</p><h1 id="微服务与界定的上下文" tabindex="-1">微服务与界定的上下文 <a class="header-anchor" href="#微服务与界定的上下文" aria-label="Permalink to &quot;微服务与界定的上下文&quot;">​</a></h1><p>在第 07 课时中，我们介绍了领域驱动设计中界定的上下文的概念，如果把领域驱动设计的思想应用在微服务架构上，可以把微服务与界定的上下文进行一一对应。<strong>每一个界定的上下文都直接对应一个微服务，然后利用上下文映射的模式来定义微服务之间的交互方式。</strong></p><br><p>这样就把微服务划分的问题，转换成了领域驱动设计中界定的上下文的划分问题。如果你已经对领域驱动设计有较深的了解，那会是一个优势；如果没有的话，第 07 课时的内容可以让你快速入门。</p><br><p>下面以本专栏的示例应用为例来进行具体说明。</p><h1 id="示例应用的微服务划分" tabindex="-1">示例应用的微服务划分 <a class="header-anchor" href="#示例应用的微服务划分" aria-label="Permalink to &quot;示例应用的微服务划分&quot;">​</a></h1><p>第 06 课时对示例应用的用户场景进行了介绍，基于这些场景，可以确定应用的领域。在实际的应用开发中，通常需要有领域专家和业务人员参与其中，通过与业务人员的交流，我们可以对领域有更清楚的认识。具体到示例应用来说，由于应用的领域比较贴近生活，也为了简化相关的介绍， 由我们自己来进行领域分析。不过这样有一个弊端，那就是开发人员所做的领域分析，并不一定能反映真实的业务流程。不过，对于示例应用来说，这已经足够好了。</p><br><p>领域驱动设计以领域为核心，领域分为<strong>问题空间</strong> 和<strong>解决空间</strong>。</p><br><p><strong>问题空间</strong>帮助我们在业务层面上进行思考，是核心领域所依赖的领域中的部分，它包括核心领域，以及所需的其他子领域。核心领域必须从头开始创建，因为这是我们将要开发的软件系统的核心内容；其他子领域则有可能已经存在，或者也需要从头开始创建。问题空间的核心问题是如何识别和划分子领域。</p><br><p><strong>解决空间</strong>则由一个或多个界定的上下文组成，以及上下文中的模型。在理想情况下，界定的上下文和子领域之间，存在一一对应的关系。这样可以从业务层次开始进行划分，然后在实现层次也采用同样的划分方式，这样就可以实现问题空间和解决空间的完美集成。在现实的实践中，界定的上下文和子领域之间，不太可能存在一一对应的关系。软件系统在实现中，通常需要与已有的遗留系统和外部系统进行集成，这些系统有自己的界定的上下文。在实际中，比较现实的情况是，多个界定的上下文属于同一个子领域，或是一个界定的上下文对应于多个子领域。</p><br><p>领域驱动设计的思路是，从领域出发，先划分子领域，然后再从子领域中抽象出界定的上下文，以及上下文中的模型，每个界定的上下文都对应一个微服务。</p><h2 id="核心领域" tabindex="-1">核心领域 <a class="header-anchor" href="#核心领域" aria-label="Permalink to &quot;核心领域&quot;">​</a></h2><p>核心领域是软件系统存在的价值所在，也是设计的起点。在软件系统开始之前，你应该对软件系统的核心价值有清楚的认识，如果没有的话，那么你首先需要考虑清楚软件系统的卖点在哪里，不同的软件系统其核心领域是不同的。作为打车应用，它的核心领域是如何让乘客快速、舒适和安全的出行，这也是滴滴打车和优步这些打车应用的核心领域。对于作为示例的快乐出行应用来说，这样的核心领域有些过大了，快乐出行应用对核心领域进行了简化，只关注如何让乘客快速的出行。</p><br><p>我们需要给核心领域一个适合的名称。快乐出行的核心领域是如何在需要叫车的乘客和提供出行服务的司机之间，进行快速的匹配。在用户创建行程之后，由系统派发给可用的司机，当司机接收行程之后，系统选中一个司机来派发行程。核心领域的重点是派发行程，因此命名为<strong>行程派发</strong>。</p><h2 id="领域中的概念" tabindex="-1">领域中的概念 <a class="header-anchor" href="#领域中的概念" aria-label="Permalink to &quot;领域中的概念&quot;">​</a></h2><p>我们接着罗列出领域中的概念。这是一个头脑风暴的过程，可以在白板上进行，逐一列出所有想到的相关概念，概念都是名词，最早的概念是行程，表示从某个起点到终点的一次旅程。从行程出发，可以引出乘客和司机的概念，乘客是行程的发起者，司机是行程的完成者，每个行程有起点和终点，对应的概念是地址。司机使用私人车辆来完成行程，因此车辆是另外一个概念。</p><br><p>我们根据概念来找到其他的子领域，行程这个概念属于核心领域。司机和乘客应该属于各种独立的子领域，然后分别进行管理，这就产生了<strong>乘客管理</strong> 和<strong>司机管理</strong> 两个子领域。地址这个概念，属于<strong>地址管理</strong>子领域；车辆这个概念，属于司机管理子领域。</p><br><p>在通过领域中的概念进行子领域划分之后，下一步我们就要从领域中的操作中继续发现新的子领域。在用户场景中提到了行程需要进行验证，这个操作有其对应的子领域<strong>行程验证</strong> 。在行程完成之后，乘客需要进行支付，这个操作有其对应的子领域<strong>支付管理</strong>。</p><br><p>下图给出了示例应用中的子领域。</p><br>',37),_=a("h2",{id:"界定的上下文",tabindex:"-1"},[t("界定的上下文 "),a("a",{class:"header-anchor",href:"#界定的上下文","aria-label":'Permalink to "界定的上下文"'},"​")],-1),c=a("p",null,"在确定了核心领域和其他子领域之后，下一步可以从问题空间转移到解决空间。首先把子领域都映射成界定的上下文，界定的上下文与子领域的名称相同；接着对界定的上下文进行建模，建模的主要任务是对相关的概念进行具体化。",-1),d=a("h3",{id:"行程派发",tabindex:"-1"},[t("行程派发 "),a("a",{class:"header-anchor",href:"#行程派发","aria-label":'Permalink to "行程派发"'},"​")],-1),b=a("p",null,"行程派发模型中的重要实体是行程，也是行程所在的聚合的根。行程有它的起始位置和结束位置，以值对象地址来表示。行程由乘客发起，因此行程实体需要有乘客的引用，当系统选中一个司机接受行程之后，行程实体有对司机的引用。在整个生命周期过程中，行程可能处于不同的状态，有一个属性及其对应的枚举类型来描述行程的状态。",-1),u=a("br",null,null,-1),g=a("p",null,"下图给出了模型中的实体和值对象。",-1),m=a("br",null,null,-1),q=a("h3",{id:"乘客管理",tabindex:"-1"},[t("乘客管理 "),a("a",{class:"header-anchor",href:"#乘客管理","aria-label":'Permalink to "乘客管理"'},"​")],-1),f=a("p",null,"乘客管理模型中的重要实体是乘客，也是乘客所在的聚合的根。乘客实体的属性包括姓名、Email 地址、联系电话等，乘客实体有与之关联的已保存的地址列表，地址是一个实体。",-1),k=a("br",null,null,-1),P=a("p",null,"下图给出了模型中的实体。",-1),A=a("br",null,null,-1),x=a("h3",{id:"司机管理",tabindex:"-1"},[t("司机管理 "),a("a",{class:"header-anchor",href:"#司机管理","aria-label":'Permalink to "司机管理"'},"​")],-1),C=a("p",null,"司机管理模型中的重要实体是司机，也是司机所在的聚合的根。司机实体的属性包括姓名、Email 地址、联系电话等，除了司机实体之外，聚合中还包含了车辆实体，车辆实体的属性包括生产厂商、型号、出厂日期和牌照号等。",-1),I=a("br",null,null,-1),S=a("p",null,"下图给出了模型中的实体。",-1),T=a("br",null,null,-1),E=r('<h3 id="地址管理" tabindex="-1">地址管理 <a class="header-anchor" href="#地址管理" aria-label="Permalink to &quot;地址管理&quot;">​</a></h3><p>地址管理模型中的重要实体是地址，地址都是分级的，从省、直辖市、自治区到乡村和街道。除了分级地址之外，还有一个重要的信息，那就是地理位置坐标，包括经度和纬度。</p><h3 id="行程验证" tabindex="-1">行程验证 <a class="header-anchor" href="#行程验证" aria-label="Permalink to &quot;行程验证&quot;">​</a></h3><p>行程验证模型中并不包含具体的实体，而是验证行程的服务和相关的算法实现。</p><h3 id="支付管理" tabindex="-1">支付管理 <a class="header-anchor" href="#支付管理" aria-label="Permalink to &quot;支付管理&quot;">​</a></h3><p>支付管理模型中的重要实体是支付记录，包含了对行程的引用和支付状态等信息。</p><h2 id="界定的上下文之间的交互" tabindex="-1">界定的上下文之间的交互 <a class="header-anchor" href="#界定的上下文之间的交互" aria-label="Permalink to &quot;界定的上下文之间的交互&quot;">​</a></h2><p>在我们界定的上下文的模型中，行程派发模型的行程实体需要引用乘客管理模型中的聚合&quot;乘客&quot;的根实体，以及司机管理模型中的聚合&quot;司机&quot;的根实体。在第 07 课时中，我们提到过，外部对象只能引用聚合的根实体，在引用时，应该引用的是聚合的根实体的标识符，而不是实体本身。乘客实体和司机实体的标识符都是字符串类型，因此行程实体中包含两个字符串类型的属性来分别引用乘客实体和司机实体。</p><br><p>当不同的界定的上下文中的模型中出现相同的概念时，则需要进行映射，我们可以使用第 07 课时中提到的上下文映射的模式来进行映射。</p><br><p>在地址管理和行程派发上下文中，都有地址的概念。地址管理中的地址实体是一个复杂的结构，包括不同分级的地理名称，这是为了实现多级式的地址选择和地址查询。在行程派发上下文中，地址则只包含一个完整的名称，以及地理位置坐标。为了在两个上下文中进行映射，我们可以在行程派发上下文上增加一个防腐蚀层来进行模型的转换。</p><h1 id="已有单体应用的迁移" tabindex="-1">已有单体应用的迁移 <a class="header-anchor" href="#已有单体应用的迁移" aria-label="Permalink to &quot;已有单体应用的迁移&quot;">​</a></h1><p>本专栏的示例应用是从头开始创建的新应用，因此在划分微服务时并没有可参考的已有实现。当把已有的单体应用迁移为微服务架构时，划分微服务会更加的有迹可循，可以从单体应用的已有实现中，了解到系统各个部分的实际交互，有助于更好的根据它们的职责来进行划分。这样划分出来的微服务更贴近实际的运行情况。</p><br><p>ThoughtWorks 的 Sam Newman 在其《Building Microservices》一书中分享了产品 SnapCI 的微服务划分的经验，由于有开源项目 GoCD 的相关经验，SnapCI 团队很快就划分了 SnapCI 的微服务。但是，GoCD 和 SnapCI 的用户场景存在一些不同，在一段时间过后，SnapCI 团队发现当前的微服务划分带来了很多问题，他们经常需要做一些跨多个微服务的改动，产生了很高的开销。</p><br><p>SnapCI 团队的做法是把这些微服务重新合并成一个单体系统，让他们有更多的时间来了解系统的实际运行状况。一年之后，SnapCI 团队把这个单体系统重新划分成微服务，经过这一次的划分，微服务的边界变得更加稳定。SnapCI 的这个例子说明了在划分微服务时，对领域的了解是至关重要的。</p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>微服务划分在微服务架构应用开发中至关重要。通过应用领域驱动设计的思想，把微服务的划分问题转换成领域驱动设计中子领域的划分问题，再通过界定的上下文来对领域中的概念进行建模。通过界定的上下文之间的映射模式，可以进行模型的转换。</p>',20);function D(N,V,v,B,M,Q){const e=s("Image");return l(),i("div",null,[p,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0D/66/Ciqah16QE7eAOBcNAAK6WjFz5LI941.png"}),t(),_,c,d,b,u,g,m,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/00/38/CgoCgV6QE7eAbZTTAAA1DxD5XGE513.png"}),t(),q,f,k,P,A,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/7D/Cgq2xl6QE7eAEzyCAAAppuXa84s515.png"}),t(),x,C,I,S,T,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0D/66/Ciqah16QE7iAOlNoAAAveUrki8E910.png"}),t(),E])}const O=n(h,[["render",D]]);export{G as __pageData,O as default};
