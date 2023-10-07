import{_ as i,j as o,o as a,g as r,k as s,h as l,s as e,Q as n}from"./chunks/framework.4e7d56ce.js";const ge=JSON.parse('{"title":"第23讲：Selenium框架安装与使用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(342) 第23讲：Selenium 框架安装与使用.md","filePath":"posts/devops/110-测试开发核心技术文档/(342) 第23讲：Selenium 框架安装与使用.md","lastUpdated":1696417798000}'),c={name:"posts/devops/110-测试开发核心技术文档/(342) 第23讲：Selenium 框架安装与使用.md"},u=e("h1",{id:"第23讲-selenium框架安装与使用",tabindex:"-1"},[l("第23讲：Selenium框架安装与使用 "),e("a",{class:"header-anchor",href:"#第23讲-selenium框架安装与使用","aria-label":'Permalink to "第23讲：Selenium框架安装与使用"'},"​")],-1),_=e("br",null,null,-1),h=e("p",null,"本课时我们开始进入对 Selenium 的学习，首先我们先来介绍 Selenium 的架构以及用途是什么。",-1),p=e("h2",{id:"selenium-架构",tabindex:"-1"},[l("Selenium 架构 "),e("a",{class:"header-anchor",href:"#selenium-架构","aria-label":'Permalink to "Selenium 架构"'},"​")],-1),d=e("br",null,null,-1),m=e("p",null,"我们可以看到 Selenium 的基础架构是这样的，它是用来做 Web 自动化测试的一个框架，整体架构采用这样一种模式，你可以使用 Python、Java、Ruby 等各种语言去编写你的自动化测试用例，然后测试用例会请求 Selenium 框架调用浏览器，浏览器的运行需要各自的 Driver 来驱动，Selenium 会借助每个浏览器的专属驱动来完成自动化。",-1),g=e("br",null,null,-1),b=e("br",null,null,-1),S=e("p",null,"我们可以打开 Selenium 的官网 selenium.dev，这是它的最新版本的官网，在官网中介绍了 Selenium 的整体用途，以及它的一些简单的 case 怎么去编写。",-1),A=e("br",null,null,-1),C=n('<br><p>比如官网中的 Python 测试用例，整体逻辑是这样的，首先需要导入依赖，然后创建一个 Driver，接下来调用 Driver 来完成相应的方法，比如打开浏览器，然后根据特定的标签来定位元素，并往里面输入一些值，最后进入显式等待过程并校验结果是否正确，这便是 Selenium 的基本使用情况。</p><h2 id="selenium-核心组件" tabindex="-1">Selenium 核心组件 <a class="header-anchor" href="#selenium-核心组件" aria-label="Permalink to &quot;Selenium 核心组件&quot;">​</a></h2><p>了解完基础架构和主要用途，我们来看下 Selenium 的基本组成部分，从开始的架构图中我们也可以看到 Selenium 主要包括 Selenium Webdriver Client，也就是每种语言的客户端；以及 Selenium Driver 用于驱动各个浏览器。</p><br><p>在 Selenium 老一点的版本中还包含 Selenium 1，主要使用 JS 注入模式来完成自动化测试，在新版本中该组件已经被废弃了，我们现在更多的使用的是 Driver 模式。然后它也提供了一定的生态环境，比如像 Selenium IDE，用于录制 case。还有 Selenium Grid 用于多浏览器管理。</p><h2 id="selenium-安装" tabindex="-1">Selenium 安装 <a class="header-anchor" href="#selenium-安装" aria-label="Permalink to &quot;Selenium 安装&quot;">​</a></h2><p>我们看下 Selenium 具体怎样安装。首先，Selenium 各个组件的安装你需要先有一个浏览器，我们大部分同学的本地都是有浏览器的，所以你只需要找到本地浏览器的 Driver 就可以了。</p><br><p>我们以我的本地浏览器 Chrome 为例，第一步需要我们做的是安装 Selenium的Chrome Driver，并把它放入一个 Path 变量中，接下来需要安装 Selenium Client，Client 是每个语言的一个语言库，这个时候我们可以使用前面学习过的 PyCharm 或 Python pip 的方式来进行安装。</p><br><p>最后我们安装浏览器的扩展 Selenium IDE，IDE 可以帮助我们录制一些入门级的 case，随着你个人能力的提升你也可以不再使用 IDE，而是直接编写 case。</p><br><p>我们具体看下怎么安装 Selenium，首先是下载浏览器驱动，比如 Chrome 的驱动你可以从这个网址<a href="https://npm.taobao.org/mirrors/chromedriver%E8%BF%9B%E8%A1%8C%E4%B8%8B%E8%BD%BD%E3%80%82" target="_blank" rel="noreferrer">https://npm.taobao.org/mirrors/chromedriver进行下载。</a></p><br><p>我们打开网址，你可以在&quot;关于Chrome&quot;里找到 Chrome 的版本设置，然后便可以根据你的浏览器的版本下载对应的驱动了，下载完成之后你需要把 Driver 放到系统的 Path 变量中去，这个时候我们打开 Shell。Windows的同学可以使用Git Bash。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">which chromedriver</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">which chromedriver</span></span></code></pre></div><br><p>首先通过这条命令检查系统的 Path 变量里面有没有 chromedriver工具。</p><br>',21),v=e("br",null,null,-1),D=e("p",null,"找到工具之后，你需要先验证能不能启动它，为了节省时间这里是我之前下载的版本，这样第一步就完成了。下载 Driver 并把它赋值给 Path 变量，然后确保能够正常启动它，这样就说明你已经安装完成了。",-1),E=e("h2",{id:"selenium-ide-用例录制",tabindex:"-1"},[l("Selenium IDE 用例录制 "),e("a",{class:"header-anchor",href:"#selenium-ide-用例录制","aria-label":'Permalink to "Selenium IDE 用例录制"'},"​")],-1),I=e("p",null,"接下来，我们就可以使用 Selenium 的一个扩展来完成简单的 IDE 的录制了，当然你也可以不使用 IDE 录制，直接写代码也是可以的。",-1),P=e("br",null,null,-1),B=e("p",null,"我们先来看下入门的引导录制工具是怎样使用的，首先行业内有两个比较常用的录制工具，一个叫作 Selenium IDE，一个叫作 Katalon Studio，这两个工具都非常不错，今天我们使用官方的Selenium IDE 来进行演示。",-1),k=e("br",null,null,-1),f=e("br",null,null,-1),Q=e("p",null,"你可以在 Chrome 里面通过扩展打开 Selenium IDE，也可以自行的安装它，安装完成之后你可以根据引导来一步一步完成你想要的 case。",-1),y=e("br",null,null,-1),q=e("br",null,null,-1),x=e("p",null,"比如我们创建一个 testchrome 的案例。",-1),M=e("br",null,null,-1),T=e("br",null,null,-1),X=e("p",null,"然后，我们打开 testerhome 的网址。",-1),V=e("br",null,null,-1),O=e("br",null,null,-1),F=e("p",null,"打开完成之后，我们就可以看到整个界面，我们在搜索栏中输入 appium，然后按回车。",-1),J=e("br",null,null,-1),j=e("br",null,null,-1),N=e("p",null,"这个时候就可以搜到一条记录，然后点击取消，我们回到 Selenium IDE。",-1),w=e("br",null,null,-1),W=e("br",null,null,-1),G=e("p",null,"点击关闭代码。",-1),K=e("br",null,null,-1),U=e("br",null,null,-1),$=e("p",null,"然后给这个 case 起一个名字，比如叫 search，这个时候其实就已经生成了一个很好的录制脚本了。",-1),R=e("br",null,null,-1),z=e("br",null,null,-1),L=e("p",null,"你可以使用 python pytes t将录制脚本导出，然后给定一个目录进行存储就可以了。",-1),H=e("br",null,null,-1),Y=n('<br><p>从这里你可以看到录制的 case 是这样的，这样我们的第一个 case 就录制完成并生成出来了，你可以看到 IDE 的使用是非常简单的，只需要把你录入的 case 导入到你的项目里面去就可以了。</p><h2 id="测试用例编写" tabindex="-1">测试用例编写 <a class="header-anchor" href="#测试用例编写" aria-label="Permalink to &quot;测试用例编写&quot;">​</a></h2><p>基本的 case 生成之后，接下来我们来了解如何编写测试用例，然后并运行它，关于如何编写测试用例这里有一个入门文档 <a href="https://selenium-python.readthedocs.io/%E3%80%82" target="_blank" rel="noreferrer">https://selenium-python.readthedocs.io/。</a></p><br><p>我们打开这个网址，这个是 Selenium Python 库的一个使用文档，文档中介绍的也非常的详细，告诉你是如何入门的，以及它的一个简单使用，还包括一些高级功能应该如何使用，等等。</p><br><p>接下来，我带你编写一个小的 case，首先我们刚才已经录制了 case 并且也装了 Chrome 的驱动了，这个时候基本的条件就已经满足了，那我们去运行我们的第一个 case。</p><h2 id="用例的关键要素" tabindex="-1">用例的关键要素 <a class="header-anchor" href="#用例的关键要素" aria-label="Permalink to &quot;用例的关键要素&quot;">​</a></h2><p>首先，我们看下测试用例的一个结构分析，测试用例的结构差不多可以分为四大部分：</p><ul><li><p>导入依赖</p></li><li><p>创建 Driver</p></li><li><p>执行自动化步骤</p></li><li><p>断言</p></li></ul><br>',12),Z=e("br",null,null,-1),ee=e("p",null,"我们回到项目中，给你看下 case 的基本结构，这是我们已经录制好的 case，你可以看到类名叫作 TestSearch，然后 setup、teardown 方法中都有完整的对浏览器 Driver 的初始化及退出处理，中间代码是测试的 case，这基本上就符合我们的测试用例结构的，首先是导入依赖，接着是创建Driver，然后执行你的 case，最后在加一个断言就可以了，断言你可以使用 assert 去获取某一个控件的内容或者属性。",-1),le=e("br",null,null,-1),te=e("p",null,"这就是整个 case 的编写过程，我们试着去运行我们的 case，首先这里如果提示有报错，你需要安装对应的依赖，",-1),se=e("br",null,null,-1),ne=e("p",null,"现在 Selenium 已经把所有的代码和依赖都已经帮我们生成好了，接下来我们只需要运行它就可以了，我给你演示下怎么去运行，首先我们点击运行，你可以看到它驱动起来一个浏览器，并按照我们刚才录制的 case 的顺序进行执行，这时 case 就运行成功了，可以看出录制功能是非常强大的，基本上一步到位就全部帮你自动生成了。",-1),ie=e("br",null,null,-1),oe=e("p",null,"但随着测试用例的增多，断言的增加，或是你的公司需要的测试越来越复杂，这个时候 Selenium IDE 可能就无法满足你的需求了，我们就需要使用 Page Object模式来解决问题了，关于 Page Object 的使用我会在后面的课时进行详细的讲解。",-1),ae=e("br",null,null,-1);function re(ce,ue,_e,he,pe,de){const t=o("Image");return a(),r("div",null,[u,_,h,p,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQqASMVjAAJMtC1ch8w140.png"}),l(),d,m,g,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQqABom0AAWpUWFCL9U037.png"}),l(),b,S,A,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQuAJAjuAAJjfIjEy-g112.png"}),l(),C,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQuAD2BtAAEl9-suV4c986.png"}),l(),v,D,E,I,P,B,k,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQuAVz6sAAKblXP8tyI978.png"}),l(),f,Q,y,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQyAf7PQAACQCI3a-kQ436.png"}),l(),q,x,M,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQyAC8k-AACZDEmccGQ088.png"}),l(),T,X,V,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQyAKJlnAAV6yXtz99U647.png"}),l(),O,F,J,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQ2AdivkAAJA1ScCkT0000.png"}),l(),j,N,w,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQ2AGCo7AAD6eAHDv5E107.png"}),l(),W,G,K,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQ2AELvoAAB-QkG4QpI596.png"}),l(),U,$,R,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQ6AVm4-AACESAhC6pk075.png"}),l(),z,L,H,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/Cgq2xl5XdQ6AbisiAAPTPW9S2xw151.png"}),l(),Y,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/51/CgpOIF5XdQ6AKCaIAAOYa3sFEvM410.png"}),l(),Z,ee,le,te,se,ne,ie,oe,ae])}const be=i(c,[["render",re]]);export{ge as __pageData,be as default};
