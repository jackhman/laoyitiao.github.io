import{_ as n,j as o,o as c,g as a,k as l,h as e,s,Q as _}from"./chunks/framework.e0c66c3f.js";const Ws=JSON.parse('{"title":"测试用例流程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(351) 第31讲：Android 自动化测试.md","filePath":"posts/devops/110-测试开发核心技术文档/(351) 第31讲：Android 自动化测试.md","lastUpdated":1696338709000}'),i={name:"posts/devops/110-测试开发核心技术文档/(351) 第31讲：Android 自动化测试.md"},r=s("p",null,"本课时我们开始进入安卓自动化测试的学习。先来看一下我们今天要完成一个什么样的测试用例。",-1),h=s("h2",{id:"测试用例流程",tabindex:"-1"},[e("测试用例流程 "),s("a",{class:"header-anchor",href:"#测试用例流程","aria-label":'Permalink to "测试用例流程"'},"​")],-1),d=s("p",null,"这个用例首先要进入雪球的行情页面，然后进入自选股，添加一只我们关注的股票，并断言这只股票在添加的列表里。接下来我们把整个过程按照标准的测试用例进行拆分。",-1),u=s("br",null,null,-1),p=s("br",null,null,-1),g=s("p",null,"首先回到测试页面，打开雪球 App 进入行情页，找到里面的股票，这时需要添加股票，但是在已添加的股票里可以看到有很多历史记录，这里需要先删除所有的股票，点击全选然后取消关注。删除之后，回到自选股页面。这时我们可以选择添加一只股票，比如选择京东，然后点击加自选，加自选成功之后，点击取消，京东就在自选股页面里了 。",-1),b=s("br",null,null,-1),m=s("p",null,"接下来我们还可以继续添加，比如拼多多，将它也添加到自选页面里。 这个测试用例需要判断自选股是否添加成功，所以需要断言所添加的目标是否在列表中，这是一个典型的 case。",-1),A=s("br",null,null,-1),P=s("p",null,"我们把这个 case 拆分成这样几个步骤：在进入雪球 时，首先需要清理已有的数据，我们把这个步骤放到 set_up class 里，在前面的课时里我们学过 set_up class 是 Pytest 的一个测试用法，它的作用是在类内所有的用例跑之前只执行一次，特别适合于清理已有的数据。",-1),k=s("br",null,null,-1),M=s("p",null,"setup class清理完成之后，在每个 case 执行之前是不需要的特殊处理的，所以我们就 pass 掉 setup 这个步骤。接下来在测试用例里我们要完成添加股票，断言股票是否在自选股中已经存在，可以用 testcase 方法。接下来我们可以用 teardown_class 关闭 App，这样 case 就已经完成了。",-1),f=s("h2",{id:"设计-po-方法",tabindex:"-1"},[e("设计 PO 方法 "),s("a",{class:"header-anchor",href:"#设计-po-方法","aria-label":'Permalink to "设计 PO 方法"'},"​")],-1),C=s("p",null,"如果要完成这个 case，我们自然就需要设计对应的 PO 方法以及测试用例，我们先写测试用例，设计 PO 的基本方法，然后再去实现对应 PO 方法的自动化。",-1),O=s("br",null,null,-1),D=s("br",null,null,-1),q=s("p",null,"先来看一下我们的测试用例，在这个测试用例里，我们创建了一个类叫 TestStockSelect。根据上面介绍的流程，我们先在测试用例里创建一个 setup 方法，在 setup 方法里创建 MainPage，MainPage 需要有一个入口进入行情页，所以首页需要添加一个进入行情页的方法。点击行情之后会进入自选股页面。自选股本身要添加股票，还要清理已有的股票，所以它至少要添加两个方法。 在进入 TestStockSelect 页面之后，我们需要先清空所有的股票。",-1),x=s("br",null,null,-1),S=s("p",null,"接着我们写一个 case， 它可以在刚才进入的股票页面里选择一只股票，把它加进来，接着获取所有的股票。所以你可以看到这里有两个要实现的PO方法，代表两个股票页内部所提供的功能。 拿到所有的股票之后，就需要断言添加的股票代码，它的名字在股票内，也就是说我们搜的是股票的代码，而结果判断用的是股票的名字。",-1),v=s("br",null,null,-1),T=s("br",null,null,-1),y=s("p",null,"到这里，测试用例我们就已经设计好了，根据这个测试用例，我们来看一下我们总共有几个 PO 方法需要定义。首先，首页需要追加一个新的入口，能够进入股票的自选股页面，我给它起个名字叫 MainPage.stock_select()。",-1),K=s("br",null,null,-1),w=s("p",null,"到了 MainPage.stock_select() （股票的自选股页面）页面后，它需要先清理所有的股票记录，然后选择一只股票，获取股票所有的名字后，就可以进行断言。所以它至少需要添加这 4 个方法。",-1),z=s("h2",{id:"定义-po-方法",tabindex:"-1"},[e("定义 PO 方法 "),s("a",{class:"header-anchor",href:"#定义-po-方法","aria-label":'Permalink to "定义 PO 方法"'},"​")],-1),I=s("br",null,null,-1),B=s("p",null,"接下来我们就看来一下该怎么去完成它。我们先进入 case。 setup class里需要有 stock_select() 和 clear_all()。接下来定义一个 testcase，在 case 内调用它的 select 方法，然后再调用 get_stocks() 取出所有的股票，接着断言，最后使用 Pytest 的一个参数化方法，它可以帮我们完成多个 testcase，这样就可以增加各种各样的 case 了。",-1),F=s("br",null,null,-1),N=s("p",null,"case 已经有了，接下来我们看一下我们的 PO 是怎么定义的？我们先从定义 stock_select() 开始。",-1),V=s("br",null,null,-1),E=s("br",null,null,-1),U=s("p",null,"首先 stock_select() 是 MainPage 内追加的一个方法，以前我们用过 search 方法，这次追加了一个 stock_select() 方法。首先进入自选股页面，它的写法是 find_element，找到行情按钮之后，点击直接进入。进入之后需要返回自选股页面，所以需要创建 StockSelect 这样一个 PO，我们进到 stock_select.py 页面中编写它。",-1),W=s("br",null,null,-1),G=s("br",null,null,-1),H=s("p",null,'那么这个 PO 需要几个方法呢？我们再回到测试用例。第 1 个需要提供的方法叫 clear_all()，清空所有的股票。我们打开 App，可以看到，首先要等待"全部"这个按钮加载完成，然后再点击列表。为什么会等待它？因为在测试过程中你会发现，在加载比较慢的时候，点击列表按钮是没有效果的。只有所有的内容加载完成，才可以点击。所以我们需要在前面等待一个可用状态，这里使用一个显式等待，去 wait 其中的"全部"。等待之后，点击列表，进入后点击全选，然后取消关注，再点击完成，我们就可以清理所有的股票。',-1),J=s("br",null,null,-1),L=s("br",null,null,-1),j=s("p",null,"再回到 case，clear_all 动作完成之后，接下来看一下股票和股票自选股页面。这里有一个 select 方法，select 方法根据你所指定的关键字选出匹配的股票，那么它是怎么来写的呢？首先 select 提供了一个 self.search 方法，search 实际上是页面内的搜索功能，我要点一下像放大镜一样的按钮，才能进入搜索页，所以说我们要封装一个 search 方法，进入 search 之后，后面的搜索股票、添加股票，其实是属于搜索结果页的 PO 定义，我们可以复用它。",-1),$=s("br",null,null,-1),Q=s("p",null,"我们可以调用 self.search，search 会返回 SearchPage，接下来我们就可以用 SearchPage 本来已经完成的 search 方法、 select 方法和 cancel 方法，来完成对股票的搜索、添加以及最后退出页面的操作。select 选完之后，仍然回到当前的股票页面，所以说仍然是 return self。",-1),X=s("br",null,null,-1),R=s("br",null,null,-1),Y=s("p",null,"那么 select 方法定义好之后，我们再看 get_stocks()。get_stocks() 是获取所有的股票，用它获取股票比较简单，我们使用self.find_elements ， 它会根据 ID 去找自选股页面的股票列表。 假设我们添加了一个股票，首先需要知道股票的名字，并断言添加的股票是否已经在列表中。",-1),Z=s("h2",{id:"设计中遇到的问题",tabindex:"-1"},[e("设计中遇到的问题 "),s("a",{class:"header-anchor",href:"#设计中遇到的问题","aria-label":'Permalink to "设计中遇到的问题"'},"​")],-1),ss=s("p",null,"整体的设计基本上就是这样。但是在这个过程中你可能会遇到一些坑，这个坑在哪呢？",-1),ts=s("br",null,null,-1),ls=s("br",null,null,-1),es=s("p",null,"我们在做自动化的过程中，经常大量用到显式等待和隐式等待。举个例子，回到刚才的 clear_all()，对于这样一个小功能，你可以看到，当我们直接去点 edit_group 时，有时因为整个页面没有加载完成，点击是没有效果的。这个时候我们需要等待页面加载完成，通常是等待某一个具体的控件，在加载完成时它会完全的展示出来。",-1),ns=s("br",null,null,-1),os=s("p",null,"这个时候我们使用显式等待，显式等待是我们自己封装的一个方法，我们也可以使用系统已有的 WebDriverWait。自己封装是因为很多地方将来都要用到，所以通常都是自己封装。",-1),cs=s("br",null,null,-1),as=s("br",null,null,-1),_s=s("p",null,"你可以看到 wait 方法，其实它调用的就是 WebDriverWait，只不过它会判断你的条件，如果你传的是一个定位符元组，那么它就会使用 wait.until 去找这个元素；如果你传递的是一个 string，它就会判断 page_source 里是否有对应的 string；如果你传递的是一个列表，那么它会判断这个列表内任何一个元素是否出现，这个条件特别适合首页刚开始加载的时候。由于我们希望等待的是多个可能性之一，所以可以使用这个列表。",-1),is=s("br",null,null,-1),rs=s("br",null,null,-1),hs=s("p",null,"以上就是封装的一个小方法，方便我们后续的使用。这个方便体现在什么地方？比如说在 MainPage 里面，当我们初始化 driver 之后，这一块经常会出现升级框和同意框，以及默认什么都不出现的 home_search 搜索框。所以说我们会添加几种可能，它们分别表示，无论是同意 image_cancel 还是 home search，只要其中任何一个控件出现，我就认为已经进入首页了。借助这样的封装，我们就可以把多种可能性融合到一块，更智能化的进行判断。",-1),ds=s("br",null,null,-1),us=s("br",null,null,-1),ps=s("p",null,'以上就是 search 和 wait 的用法，接下来我们看一下 clear_all() 后下一步，它先等待一个叫"全部"的元素。基本上在雪球自选股页面里，"全部"一出现，整个页面通常就已经加载完成了。',-1),gs=s("br",null,null,-1),bs=s("p",null,"那么第 2 个坑就是异常处理了。前面在讲异常处理的时候，我为你展示了一串 demo 代码，而真实的异常处理往往会比较复杂，除了弹框要进行自动处理之外，还要解决最大重试次数。比如找不到弹框，就会一直重试，这时通常会设置一个最大重试次数。在查找弹框的过程中，每一个查找弹框的过程中也会有隐式等待影响，这个时候没必要再使用隐式等待了，所以不需要隐式等待 10 秒，比如说我要找弹框，没必要等 10 秒再去判断它是否出现，所以我们可以临时把隐式等待时间设置成最小，处理完成之后再把隐式等待进行还原。",-1),ms=s("br",null,null,-1),As=s("br",null,null,-1),Ps=s("p",null,"异常处理机制里也加了一些详细的日志记录，这是需要你去完善的。这里我给出一个简单的代码示例，你可以参考一下。具体代码可以看一下 BasePage 里所写的，首先我们需要把整个方法定义成一个装饰器，Python 的装饰器可以让我们用一些其他的方法进行相关的异常处理。比如说对 find_element、click，以及 wait 操作，我们都需要进行弹框的异常处理，这时就可以使用 Python 的装饰器，对所有的方法进行通用的异常处理的包装。",-1),ks=s("br",null,null,-1),Ms=s("p",null,"装饰器的写法其实就是在 BasePage 里增加一个函数，它接受另外一个函数的传参，在内部定义一个新的函数，用新的函数去包装原有传递过来的函数，然后完成一些复杂的异常处理。处理完成之后把新的函数返回就可以了。这就是Python 装饰器的用法。",-1),fs=s("br",null,null,-1),Cs=s("p",null,"那么整个代码逻辑就是这样，包含了异常处理、最大重试次数、隐式等待的临时性设置与还原。有了这样的异常处理机制，再加上显式等待，基本上你的 case 稳定性整体就会提高很多。有了这个装饰器，我们只需要把想要获得异常处理能力的方法比如 find element 或者 click 等可能会出异常的各种办法，加一个装饰器对方法进行修饰即可。",-1),Os=s("h2",{id:"演示-case",tabindex:"-1"},[e("演示 case "),s("a",{class:"header-anchor",href:"#演示-case","aria-label":'Permalink to "演示 case"'},"​")],-1),Ds=s("p",null,"整个逻辑，从 PO 的定义，到框架的一些渐动性改进，现在都已经有了。接下来我们跑一下 case 具体演示该怎么去运行。",-1),qs=s("br",null,null,-1),xs=s("p",null,"我们把 case 加几个数据，一共是 4 条：拼多多、阿里巴巴、京东和中国平安，接下来我们来运行 case，看一下整个的运行效果。这中间要改的逻辑是比较多的，你可以看一下视频里面我贴的这些代码 。",-1),Ss=s("br",null,null,-1),vs=s("br",null,null,-1),Ts=s("p",null,"运行之前得确保模拟器已经存在，并且 Appium 要处于开启状态，这两个条件都具备之后，我们跑一下所有的 case。",-1),ys=s("br",null,null,-1),Ks=s("br",null,null,-1),ws=_('<br><p>你可以看到 4 个 case，全都通过了。</p><h2 id="流程回顾" tabindex="-1">流程回顾 <a class="header-anchor" href="#流程回顾" aria-label="Permalink to &quot;流程回顾&quot;">​</a></h2><p>我们再来看一下这几个方法。对于这么长的一个 case，我们需要做哪些事情？</p><br><p>首先要把 case 写好，然后定义好 PO，对每个 PO 的方法完成自动化，这个过程比较简单，更多的是思考是如何解决其中的各种异常问题。有的时候由于模拟器比较慢，或者真机因为网络等各种原因加载特别慢，就会出现各种各样的异常。这个时候我们需要等待整个页面真正的加载完成，这就要用到显式等待机制。显式等待会设计一个最大超时时间，然后去等待特定的状态出现。这里我封装了一个小方法，它可以支持等待某个元素、文本，或者多个文本中的任何一个出现。</p><br><p>异常处理机制，包括弹框的处理，最大尝试的次数，还要设置隐式等待，这样可以更快地运行，并生成一个详细的日志记录。比如说我们刚才执行的这么多步骤，每一步点击什么按钮，其实在日志里面都有很清晰的统计。 在这里我只是给你展示了一个示例，真实的封装比这个还要复杂，到底需要什么样的封装，需要根据你公司的情况来设置。</p><br><p>封装逻辑完成之后，还要给相关的方法加上装饰器，装饰器可以在一个方法出现异常的时候，自动进行异常处理。</p><br><p>Ok，经过这样的演示，相信你已经从整体上知道该怎么去编写一个安卓的测试用例，以及在这个过程中需要用到哪些技巧了。</p>',12);function zs(Is,Bs,Fs,Ns,Vs,Es){const t=o("Image");return c(),a("div",null,[r,h,d,u,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/25/Cgq2xl59sz2AKoYiAAEr8ygrgJ4203.png"}),p,g,b,m,A,P,k,M,f,C,O,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/0F/Ciqah159sz6AGAm0AAKGvsO9tKE752.png"}),D,q,x,S,v,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/25/Cgq2xl59sz6AP07bAADDUIEwdpo263.png"}),T,y,K,w,z,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/0F/Ciqah159sz6AdUbtAAI8jHMpT38488.png"}),I,B,F,N,V,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/25/Cgq2xl59sz6AVWrHAAFAcjrGWBw650.png"}),E,U,W,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/0F/Ciqah159sz-AUJoRAAKvg7LyF0E349.png"}),G,H,J,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/25/Cgq2xl59sz-ADVN-AACXfE2-Gbo785.png"}),L,j,$,Q,X,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/0F/Ciqah159sz-AbJbMAADS-gkexMw138.png"}),R,Y,Z,ss,ts,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/26/Cgq2xl59sz-AU5OvAAMSO79Ly5U199.png"}),ls,es,ns,os,cs,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/0F/Ciqah159s0CAKyj5AAKWY0uK9rc541.png"}),as,_s,is,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/26/Cgq2xl59s0CAaQCBAADtbVlyq0I589.png"}),rs,hs,ds,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/10/Ciqah159s0CANLswAAKXzKHJq4I759.png"}),us,ps,gs,bs,ms,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/26/Cgq2xl59s0CAfF5-AAI4LbdDTfU795.png"}),As,Ps,ks,Ms,fs,Cs,Os,Ds,qs,xs,Ss,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/10/Ciqah159s0GABODDAAidrBN-cQc279.png"}),vs,Ts,ys,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7D/26/Cgq2xl59s0GAHTFiAAX5lkTH17E494.png"}),e(),Ks,l(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/04/10/Ciqah159s0KAML3HAAbK8lo3vyo570.png"}),ws])}const Gs=n(i,[["render",zs]]);export{Ws as __pageData,Gs as default};
