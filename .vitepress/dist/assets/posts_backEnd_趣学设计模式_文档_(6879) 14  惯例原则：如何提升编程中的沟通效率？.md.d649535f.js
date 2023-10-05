import{_ as o,j as p,o as e,g as r,k as n,Q as t}from"./chunks/framework.4e7d56ce.js";const b=JSON.parse('{"title":"惯例原则：有\\"共同语言\\"的编程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6879) 14  惯例原则：如何提升编程中的沟通效率？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6879) 14  惯例原则：如何提升编程中的沟通效率？.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/趣学设计模式_文档/(6879) 14  惯例原则：如何提升编程中的沟通效率？.md"},i=t('<p>在软件开发中，你是不是经常因为沟通效率低下而烦恼？</p><ul><li><p>所接手的维护项目代码质量低，频繁出问题，不得不一次又一次地找之前的人沟通；</p></li><li><p>团队中模块分散，各自编程风格不同，使用对方服务时需要反复沟通；</p></li><li><p>跨团队合作沟通，技术栈不同，需要反复沟通统一的标准。</p></li></ul><p>你会发现，这些问题的本质其实都是因为代码而产生了学习成本和沟通成本，或者说，每一份代码都变成了需要重新学习的东西，自然需要反复研究和沟通。</p><p>那为什么学习了 Spring 框架后，再和别人交流关于这个框架的问题时沟通效率会变高？因为 Spring Boot 框架应用了一个简单的原则来帮助编程者提前建立了<strong>隐形的公共知识体系</strong>，当一方提到某个知识时，另一方其实早就非常熟悉，不需要反复给对方解释含义，沟通效率自然会不断提高。</p><p>今天，我们就来学习下这个具备强大威力的原则：<strong>惯例优于配置原则</strong> （下文简称<strong>惯例原则</strong>）。</p><h3 id="惯例原则-有-共同语言-的编程" tabindex="-1">惯例原则：有&quot;共同语言&quot;的编程 <a class="header-anchor" href="#惯例原则-有-共同语言-的编程" aria-label="Permalink to &quot;惯例原则：有&quot;共同语言&quot;的编程&quot;">​</a></h3><p>惯例原则（Convention over Configuration，常用英文缩写 CoC），最早起源于 Ruby On Rails 框架的设计理念，如果你使用过 Rails，应该就知道 Rails 几乎没有配置文件。</p><p>简单来说，<strong>惯例原则就是将一些在编程中公认的配置方式和约定信息作为内部缺省的默认规则来使用</strong>，比如，MyBatis 的映射文件通常都使用 xxxMapper.xml 来命名。因为是默认统一的规则，绝大部分人都会优先采用，久而久之，便对规则有了一个统一的认知，当彼此相互沟通时，便能极大地减少重复理解与沟通的时间。</p><p>另外，我们还可以把惯例原则理解为一种约束，在特定的框架（知识体系）下，我们可以根据这些约束制定合适的默认规则，然后框架就能基于这些默认规则实现一些统一的操作。比如，基于 Spring 框架实现中，我们使用注解 @Autowired 能够自动注入 Java Bean，框架通过实现解析 @Autowired 注解来帮助我们自动寻找对应的 Java Bean。</p><p>所以，惯例原则通常也叫<strong>按约定编程</strong>，但是不同于契约原则（DBC）的按统一协议/标准协作，惯例原则更重视的是隐形知识的共享。比如，我使用 Maven 来管理工程结构，其实是预先假定你在维护我的代码时，是已经提前学习或知道 Maven 相关的惯例约定的。</p><h3 id="惯例原则解决了什么问题" tabindex="-1">惯例原则解决了什么问题 <a class="header-anchor" href="#惯例原则解决了什么问题" aria-label="Permalink to &quot;惯例原则解决了什么问题&quot;">​</a></h3><p>先来看一个经典的例子，如下图：</p>',12),_=t('<p>图中的目录结构是一个用 Maven 自动生成的常见 Java 工程结构，这个目录结构对于 Java 程序员来说不言而喻，这就是一种公认的惯例。</p><p>实际上，惯例原则主要<strong>解决了在编程中我们对共同隐性知识的学习的问题，通过统一的默认规则，建立起了一道沟通的桥梁。</strong></p><p>你可能会说，可不可以不用这种惯例？可以！但是，你就需要花费大量的时间去解释和说明你新规则的含义，并且还得保证要能消除其他相关人员对新规则的误解。</p><p>除此之外，惯例原则还间接起到了以下两个作用。</p><ul><li><p><strong>逐渐形成一种编程圈子里共同的专业行话。</strong> 也就是说，在编程领域，只要你这样说，几乎所有人都知道你说的是什么，而不需要额外的解释和沟通。</p></li><li><p><strong>减少编程时思考决策次数，降低认知负担。</strong> 对于编程人员来说，选择不同技术往往比只能使用一种技术来编程实现要难，因为&quot;选择&quot;就意味着需要去评估选择后可能带来的各种风险。</p></li></ul><h3 id="惯例原则的副作用" tabindex="-1">惯例原则的副作用 <a class="header-anchor" href="#惯例原则的副作用" aria-label="Permalink to &quot;惯例原则的副作用&quot;">​</a></h3><p>什么样的代码维护起来最轻松？答案是：<strong>需要你学习的东西最少的代码。</strong></p><p>使用惯例原则，能给你带来良好的可维护性，同时极大地提升你和他人沟通时的效率。虽然惯例原则的优点非常明显，但缺点也同样非常明显。这里，我重点说四个常见的副作用。</p><p><strong>第一个，丢失灵活性</strong>。惯例原则最大的一个弊端就在于，过于定制化的默认规则。虽然默认规则能统一大家的认知，提高代码的可维护性，但却也失去了一定程度的灵活性。比如，Web 中使用统一的 ApiResponseResult 类来处理 json 的返回格式，虽然这是一个不错的惯例，但是当有人想要修改不同的数据格式返回时，可能就需要修改很多代码。</p><p><strong>第二个，自定义惯例有风险</strong>。默认值的判断标准一旦不统一，很可能导致业务更大的混乱。曾经我就遇见过这么一个的案例：数据库 YN 字段默认值通常使用 0 和 1（0 为删除，1 为正确），但是突然一天来了一个很厉害的新员工，他的惯例是 -1 和 0（0是正确，-1 为删除），但他没有告知团队他对默认值的这个理解；于是在接下来长达半年的时间里，部分系统的代码里 YN 默默地变成了 -1 和 0，此时系统并没有任何异常，但是某一天团队的系统需要迁移数据并删除旧数据，惨剧就开始了，迁移速度超乎寻常地快，这时迁移人员在没有 check 的情况下，继续执行删除操作，最后导致部分数据丢失。</p><p><strong>第三个，参考变强制</strong>。本来惯例原则是基于开源社区的框架而发展起来的，但是随着越来越多的团队开始使用这些框架，惯例原则慢慢变成了某种程度上的强制标准，进而导致设计僵化，缺乏灵活性。比如，设计数据类只能写 get、set 方法，或者虽然分层但是代码只写在一个层里（通常是 Service 或 Dao 层）。</p><p><strong>第四个，不同框架下的惯例之间并不能复用</strong>。比如，C++ 的开发惯例和 Java 的开发惯例其实是不相通的，惯例本就是一种通用化的定制规则。一定要尽早意识到不同知识体系下的惯例是不同的，一旦胡乱使用惯例，就会带来和上面第二个副作用一样的严重问题。</p><h3 id="如何正确使用惯例原则" tabindex="-1">如何正确使用惯例原则 <a class="header-anchor" href="#如何正确使用惯例原则" aria-label="Permalink to &quot;如何正确使用惯例原则&quot;">​</a></h3><p>在软件开发中，惯例原则其实早已深入人心。一方面是各类通用框架的普及，比如，Spring、Spring Boot、MyBatis 等都采用了惯例原则设计，你在使用中会逐渐接受一些惯例并固化到自己的编程习惯中去。另一方面，使用惯例能够减少当面与人沟通的次数，这大大提升了沟通效率。</p><p>为了避免在使用惯例原则时引入过多副作用，你还需要使用一些技巧来合理应用惯例原则。结合我的经验，我总结了以下 5 个技巧供你参考。</p><p><strong>第一，遵循大多数人使用的惯例。</strong> 比如，Java 中使用驼峰命名的惯例，MySQL 数据库字段使用下划线分割单词等。你应该选择大多数人都习惯使用的惯例，这样不仅能保证理解的一致性，而且还能在沟通中减少重复解释，节约沟通成本。除此之外，使用大多数人都习惯的惯例还有一个好处就是，这些惯例都是经过了实践检验的，可以在很大程度上避免未知风险。</p><p><strong>第二，要搞清楚惯例的适用范围。</strong> 有的惯例可能只适用于特定的编程语言，有的惯例可能只适用于特定编程场景，有的惯例可能只是某个行业所特有的......只有搞清楚了惯例所处的范围，才能发挥惯例最大化共享知识的作用，否则就会变成另一种严重的误解。</p><p><strong>第三，自定义惯例时需要在团队内反复不断确认。</strong> 除了业界通用的惯例外，你可能有时需要针对实际业务自定义一些惯例，比如，Redis Key 在不同环境下要加前缀标识（dev/prod/test），这时一定要确保团队内的每个人都知晓所采用的惯例是什么，并在实际编码中不断和调用方确认有自定义惯例的存在，以避免理解的歧义造成重大安全事故。</p><p><strong>第四，要在惯例和灵活性之间做平衡。</strong> 过度使用惯例和过度设计一样都非常有害，惯例优于配置并不是说完全消除配置，在某些需要灵活性的地方可能需要配置，甚至需要代码实现，那就选择那个最合适的做法。如果你发现使用惯例不仅能帮助对方高效理解代码，自己实现起来也很方便，那就是用惯例。</p><p><strong>第五，不要强制他人使用惯例。</strong> 其实不使用惯例也能让开发工作顺利进行，你不应该让惯例从一种自由组合变成一种强制要求。因为只要变成强制，虽然惯例提升了沟通效率，但是也有可能在其他方面带来负面影响。比如，在一个团队内，有人喜欢在引入组件时使用配置文件，有人喜欢用注解的方式引入组件，一旦规定只能使用配置或只能使用注解，那么就会破坏一部分人的编程习惯，他们就不得不重新学习、花费更多时间，这样反而降低了开发效率。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>惯例原则的初衷是提供隐形的公共知识，来减少开发人员重复决策的次数。</p><p>惯例原则的优势在于能够帮助我们降低编程时的学习成本，不过它也有一些劣势，比如，可能导致设计的灵活性不足，乱用自定义惯例导致不同人按照各自的理解使用而引发问题，将参考的默认规则变成强制的主要规则，等等。</p><p>惯例原则是程序员之间的共同行话，只要你用了一个惯例，那么对方便知道其中的意思。</p><p>虽然惯例原则很简单，但是在日常开发中却应用很广泛。你在使用时应该注意：隐形的公共知识和大家的理解是不是一致的？如果不一致，要尽量保持一致，避免自以为正确的使用而导致理解出现偏差，进而在不知情的情况下导致维护系统出现故障。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>惯例有点像我们平常说的&quot;习惯成自然&quot;，但好的惯例通常需要很长的时间才能存活下来，那你知道哪些好的惯例呢？它们好的原因有哪些呢？</p><p>欢迎留言分享，我会第一时间给你回复。</p><p>在下一讲，我会接着与你分享&quot;分离原则：如何将复杂问题拆分成小问题？&quot;的相关内容，记得按时来听课！</p>',29);function l(g,c,d,h,u,m){const a=p("Image");return e(),r("div",null,[i,n(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image6/M01/3C/04/Cgp9HWCH5biAE2kaAADy-mTurkA779.png"}),_])}const v=o(s,[["render",l]]);export{b as __pageData,v as default};
