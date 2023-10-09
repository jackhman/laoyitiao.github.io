import{_ as a,j as i,o,h as r,k as n,f as e,Q as s,s as t}from"./chunks/framework.d3daa342.js";const X=JSON.parse('{"title":"第40讲：脚本开发、调试与维护的常用技巧","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1625) 第40讲：脚本开发、调试与维护的常用技巧.md","filePath":"posts/devops/112-高效敏捷测试文档/(1625) 第40讲：脚本开发、调试与维护的常用技巧.md","lastUpdated":1696682708000}'),d={name:"posts/devops/112-高效敏捷测试文档/(1625) 第40讲：脚本开发、调试与维护的常用技巧.md"},_=s(`<h1 id="第40讲-脚本开发、调试与维护的常用技巧" tabindex="-1">第40讲：脚本开发、调试与维护的常用技巧 <a class="header-anchor" href="#第40讲-脚本开发、调试与维护的常用技巧" aria-label="Permalink to &quot;第40讲：脚本开发、调试与维护的常用技巧&quot;">​</a></h1><p>这一讲的内容是针对 Web UI 的自动化测试。测试金字塔告诉我们，要尽量多做单元测试和 API 层的自动化测试，而 UI 层的要少做，因为脚本开发和维护的成本会很高，执行起来还不稳定。但从业务的角度来说，UI 层的自动化测试最接近用户对产品的操作，因此也最接近用户需求。另外，在拿不到 API 的情况下，UI 自动化测试也不得不做。所以，还是有必要讲一讲 UI 层测试的脚本开发和维护。</p><h3 id="脚本语言和测试框架的选择" tabindex="-1">脚本语言和测试框架的选择 <a class="header-anchor" href="#脚本语言和测试框架的选择" aria-label="Permalink to &quot;脚本语言和测试框架的选择&quot;">​</a></h3><p>UI 自动化测试的脚本语言有很多选择，目前最流行的编程语言中，Java、Python、JavaScript、Ruby 都适合编写自动化测试脚本。自动化测试脚本语言和被测软件开发语言没有关系，无论选择哪种语言，作为测试人员都需要有扎实的编程基础和代码调试的经验。相对来说，Python 和 Ruby 语言更容易学习和掌握，对于编程能力较弱的初学者来说是不错的选择。而近几年，在 AI、机器学习方面 Python 语言的应用越来越广泛。</p><p>目前的 Web UI 自动化测试框架基本上都是基于 Selenium 进行扩展，所以学习 UI 自动化测试绕不开 Selenium。Selenium 支持多种浏览器和多种开发语言，还支持在多台机器上的并发测试（Selenium Grid）。</p><p>Appium 是目前移动端的主流 UI 自动化测试工具之一，支持 Android 和 iOS 平台上的原生应用、Web 应用，以及混合应用（Hybrid）的自动化测试。</p><p>上述 UI 自动化测试框架提供了操作 Web/App 的方法，在实际使用中最好结合其他的自动化测试框架提供对测试用例的组织和运行管理。比如在前面讲到的 BDD 自动化测试框架 Cucumber，通用测试框架 RobotFramework，另外还有单元测试框架 Pytest、Unittest 等很多选择。会让测试用例更有结构，执行管理上更加方便，另外还可以统计测试用例的执行结果。</p><p>这一讲就以 Selenium 和 Python 语言为例，并且结合 Unittest 测试框架进行讲解。</p><h3 id="ui-元素定位" tabindex="-1">UI 元素定位 <a class="header-anchor" href="#ui-元素定位" aria-label="Permalink to &quot;UI 元素定位&quot;">​</a></h3><p>Selenium 经历了三次大的版本演变，目前 Selenium 3.0 延续了从 2.0 开始对 WebDriver 的支持，其原理是使用浏览器原生的 WebDriver 对 HTML 页面对象进行定位和操作。UI 自动化测试的核心就是对于 UI 界面中的元素进行定位（识别）和操作。</p><p>一般 Web UI 测试的操作步骤分为两步：</p><p>（1）定位网页上的 UI 元素，并获取元素对象；</p><p>（2）对元素对象进行单击、双击、拖曳或输入等操作。</p><p>Selenium 提供了 8 种不同的定位方法，开发脚本时需要综合运用这些定位方法。表 1 列举了不同的定位方法和对应的 Python 方法。</p><pre><code>表1 Selenium 提供的 UI 元素定位方法
</code></pre><table><thead><tr><th style="text-align:left;">UI 元素定位方式</th><th style="text-align:center;">Python 方法</th></tr></thead><tbody><tr><td style="text-align:left;">id 定位</td><td style="text-align:center;">find_element_by_id()</td></tr><tr><td style="text-align:left;">name 定位</td><td style="text-align:center;">find_element_by_name()</td></tr><tr><td style="text-align:left;">tag 定位</td><td style="text-align:center;">find_element_by_tag_name()</td></tr><tr><td style="text-align:left;">class 定位</td><td style="text-align:center;">find_element_by_class_name()</td></tr><tr><td style="text-align:left;">link_text 定位</td><td style="text-align:center;">find_element_by_link_text()</td></tr><tr><td style="text-align:left;">partial link 定位</td><td style="text-align:center;">find_element_by_partial_link_text()</td></tr><tr><td style="text-align:left;">XPath 定位</td><td style="text-align:center;">find_element_by_xpath()</td></tr><tr><td style="text-align:left;">CSS_selector 定位</td><td style="text-align:center;">find_element_by_css_selector()</td></tr></tbody></table><p>WebDriver 对 UI 元素的常用操作和对应的 Python 方法如表 2 所示。</p><p>表2 Selenium 提供的元素操作方法</p><table><thead><tr><th style="text-align:left;">UI 元素操作</th><th style="text-align:center;">Python 方法</th></tr></thead><tbody><tr><td style="text-align:left;">清除文本</td><td style="text-align:center;">clear()</td></tr><tr><td style="text-align:left;">模拟按键输入文本</td><td style="text-align:center;">send_keys(value)</td></tr><tr><td style="text-align:left;">模拟鼠标单击元素</td><td style="text-align:center;">click()</td></tr><tr><td style="text-align:left;">获取元素的文本，当前页面的 URL，当前页面的标题，用于信息验证</td><td style="text-align:center;">text，current_url，title</td></tr><tr><td style="text-align:left;">返回一个元素是否用户可见，true 或 false</td><td style="text-align:center;">is_displayed()</td></tr><tr><td style="text-align:left;">模拟鼠标各种操作，可以用来操作悬停菜单</td><td style="text-align:center;">ActionsChains()</td></tr></tbody></table><p>基于这些元素定位和操作方法，现在可以编写一个 UI 自动化测试脚本，如图 1 所示。这个示例代码进行的操作依次为：</p><ol><li>打开一个 Chrome 浏览器；</li><li>在 URL 栏输入 <a href="https://kaiwu.lagou.com/" target="_blank" rel="noreferrer">https://kaiwu.lagou.com/</a>；</li><li><strong>登录操作</strong>，点击页面上方的&quot;登录&quot;，选择&quot;密码登录&quot;，在弹出的登录界面中输入用户名、输入密码，然后单击&quot;登录&quot;按钮；</li><li><strong>进入一个已经购买的课程</strong>，在课程主页面选择课程&quot;高效敏捷测试 49 讲&quot;，单击&quot;开始学习&quot;按钮，验证页面中显示的课程名称是否正确；</li><li><strong>退出登录</strong>，定位到页面上方的账户名称，在悬停菜单中单击&quot;退出&quot;按钮；</li><li>关闭 Chrome 浏览器。</li></ol>`,21),c=t("p",null,'以第 19 行代码为例，对密码输入框的定位采用了 XPath 的定位方式，利用"type"属性的值进行定位。下面是测试代码行、HTML 代码以及登录界面的密码输入框之间的对应关系。',-1),p=s('<h3 id="测试代码的模块化和参数化" tabindex="-1">测试代码的模块化和参数化 <a class="header-anchor" href="#测试代码的模块化和参数化" aria-label="Permalink to &quot;测试代码的模块化和参数化&quot;">​</a></h3><p>上面的这段测试代码虽然可以执行，但是有以下 3 个缺点。</p><p><strong>所有的操作步骤都混合在一起，可读性比较差</strong>。UI 自动化测试是最接近真正业务流程的模拟操作，但是上面这段代码即使添加了注释，给人的感觉也比较混乱，需要花时间理解这个测试用例的主要目的。</p><p><strong>所有的输入数据都以硬编码（Hard Code）的形式写在测试代码中，代码的灵活<strong><strong>性</strong></strong>就比较差</strong>。比如，如果想换一个账户进行登录，或者换一个已购课程进行检查，就需要修改测试用例中的登录信息或课程名称。</p><p><strong>会产生大量的重复代码，代码的可维护性比较差</strong>。在实际测试中大量的测试用例都会在登录之后执行，并且在执行完退出登录。这意味着很多测试用例都需要包括 &quot;登录&quot; 和 &quot;退出登录&quot; 的代码。如果登录界面有所变动，会导致测试脚本的元素定位或操作有变化，就需要修改所有包含 &quot;登录&quot; 和 &quot;退出登录&quot; 的测试用例。</p><p>为了解决上述问题，我们需要对上面的测试代码进行改造，解决方案就是实现代码的模块化和参数化。<strong>模块化是指把可重用的业务流程封装成一个个的操作函数供多个测试用例调用，参数化是指把测试数据从测试代码中进行分离</strong>。</p><p>上面那段代码经过改造后，生成了两个代码文件。</p><p>第一个代码文件里面创建了一个类，这个类包含了 3 个业务操作函数：登录、进入课程、退出登录，如图 3 所示。每个封装的函数都可以单独执行了一个业务操作，并且可以被多个测试用例调用。</p>',8),g=t("p",null,"第二个代码文件是测试用例，如图 4 所示。在调用函数时通过参数把测试数据传递给函数，实现了测试数据和测试代码的分离，可以看到，测试用例的代码简单多了，从业务层面也更好理解。",-1),h=t("h3",{id:"selenium-集成自动化测试框架",tabindex:"-1"},[e("Selenium 集成自动化测试框架 "),t("a",{class:"header-anchor",href:"#selenium-集成自动化测试框架","aria-label":'Permalink to "Selenium 集成自动化测试框架"'},"​")],-1),u=t("p",null,"在实际测试中，每个项目一定会有多个测试用例，有的是测试相同功能点的不同操作，有的是不同功能点的测试。如何进行组织和管理呢？通过讲解下面这个测试用例文件，你可以感受到 Selenium 和其他自动化测试框架集成带来的好处。这里以 Unittest 测试框架为例，虽然它被称为单元测试的自动化框架，实际上也可以支持 UI 自动化测试。图 5 就是 Selenium 集成了 Unittest 之后的测试用例代码。",-1),m=t("p",null,"和图 4 相比，所不同的是，在新的测试用例文件中包含了两个测试相同功能点的测试用例，同时把登录操作作为执行这两个测试用例之前的准备步骤，把退出登录和退出浏览器的操作作为两个用例执行完毕后的操作步骤。",-1),y=t("p",null,"具体来看一下，第一个测试用例（test_check_paid_course）是进入一个已购买的课程并且验证课程信息是否正确；第二个测试用例（test_check_unpaid_course）是进入一个未购买的课程并且验证课程信息是否正确。这两个测试用例都调用了函数 access_course，在组织测试用例时，通常会把测试同一个功能点的几个测试用例放在一个文件中。",-1),b=t("p",null,'setUpClass 和 tearDownClass 是 Unittest 测试框架提供的两个类方法，两个测试用例在执行前需要执行的操作放在 setUpClass 里，在这个例子中为 "登录" 操作。执行完毕后需要执行的操作放在 tearDownClass 中，这里包括退出登录和关闭浏览器。',-1),I=t("p",null,[e("Unittest 测试框架提供了对数据驱动自动化测试的支持，"),t("strong",null,"DDT"),e("（Data-Driven Tests）是针对 Unittest 测试框架涉及的扩展库，通过 @ddt 和 @data 可以使用不同的测试数据来运行一个测试用例。在这个例子中，测试用例 test_check_paid_course 会被执行两遍，每次测试一个已购课程，测试结果中也会显示每一条测试数据对应的测试结果。")],-1),x=t("p",null,"另外，还可以读取保存在文件中的测试数据来驱动测试用例的执行，Unittest 可以支持对 csv、json、yaml 文件的读取，数据文件和对应的测试脚本如图 6 所示。",-1),f=t("p",null,"相信到这里你已经理解了采用测试框架对测试用例进行组织和管理的好处：让测试用例的编写更加规范，更方便实现数据驱动的自动化测试。特别是在实际项目中的测试用例一般都有上百条，不可能都放在一个测试文件里，需要按照所测试的功能拆分成多个文件，甚至需要放在不同的目录下。测试框架对多个测试用例的组织管理的优势就更加明显。Unittest 提供了 TestSuite 类来创建测试套件，测试套件是一组服务于特定测试目标的测试用例集合。",-1),U=t("p",null,"需要提醒的是，自动化测试用例之间尽量不要有依赖关系或者互相调用，并且每个测试用例尽量不要太复杂，否则会给测试结果的统计和分析带来困难。",-1),q=t("h3",{id:"pageobject-设计模式",tabindex:"-1"},[e("PageObject 设计模式 "),t("a",{class:"header-anchor",href:"#pageobject-设计模式","aria-label":'Permalink to "PageObject 设计模式"'},"​")],-1),A=t("p",null,"到目前为止，我们的测试代码采用了两层结构：一层是操作函数（如图 3 所示），一层是测试用例（如图 5 所示），并且我们通过引入 Unittest 自动化测试框架实现了测试用例的规范化和数据驱动。",-1),P=t("p",null,"下面要说的 PageObject 设计模式是目前进行 UI 自动化测试的主流设计思想，代码分层是 PageObject 设计思想的核心，以页面为单位把页面上的元素和元素的操作封装起来，把同属于一个页面的元素都放在一个页面类中。操作函数通过调用这些封装的对象完成对界面的操作。",-1),D=t("p",null,"以图 7 操作函数 login 为例，展示了如何运用 PageObject 模式把页面元素的具体操作从操作函数中分离出来。在 LoginPage 类中封装了 4 个登录用到的页面元素操作，而新的 login 函数调用每个元素操作的具体函数完成登录操作，改造后的 login 函数其可读性变得更好。当页面元素有更改时，只需要更改对应的页面元素封装函数，代码的可维护性也变得更好。",-1),S=t("p",null,"由此，测试代码由原来的两层结构变成了三层结构：第一层封装了页面元素和操作，第二层封装了业务操作的函数，第三层是测试用例。",-1),C=t("p",null,"PageObject 提供了页面元素操作和业务流程相分离的模式，使操作函数的代码更加清晰，可读性更强。同时，使得整体自动化测试代码的可维护性也增强了。如果某个页面的元素有了变更，只需要更改封装的页面元素类，而不用更改调用它的其他测试类/代码。",-1),k=t("p",null,"在敏捷团队中一个比较好的实践是，页面元素类由开发人员负责维护并进行测试，相当于对页面元素进行单元测试。开发人员最清楚哪些页面元素有了改动，也应该对前端开发的质量负责。然后专职的测试人员在此基础上进一步开发面向业务少量的 UI 测试用例。比如，根据二八原则，对 80% 的客户都会用到的那些 20% 的页面操作进行自动化。",-1),H=t("h3",{id:"隐式等待",tabindex:"-1"},[e("隐式等待 "),t("a",{class:"header-anchor",href:"#隐式等待","aria-label":'Permalink to "隐式等待"'},"​")],-1),T=t("p",null,'上面的测试脚本中都没有添加等待时间。但在实际的测试脚本里，代码在执行过程中经常需要等待页面元素加载完毕才能完成操作，否则会抛出异常，尤其是发生了页面跳转时。可以在元素定位之前添加 time.sleep()（以秒为单位），但要在每个需要等待时间的元素定位之前都要添加，而且是固定时间。另外一种方式是添加隐式等待，比如"driver.implicitly_wait()"。隐式等待是智能等待方式，添加一次就会作用于整个脚本，不会影响脚本的执行速度，设置的时间只是等待的最大时长。当脚本执行到某个元素定位时，如果定位不到，将以轮询的方式不断地判断元素是否存在。',-1),v=t("h3",{id:"测试脚本的开发调试环境",tabindex:"-1"},[e("测试脚本的开发调试环境 "),t("a",{class:"header-anchor",href:"#测试脚本的开发调试环境","aria-label":'Permalink to "测试脚本的开发调试环境"'},"​")],-1),F=t("p",null,"目前像 Pycharm、Intellij Idea 等工具都提供了良好的脚本开发和调试的集成环境，通过设置断点可以查找程序运行时的错误，是调试程序常用的手段。在开发测试脚本的过程中，如果脚本运行失败，通过返回的错误信息可以大致判断可能在哪一代码行出错，则就在那里下一个断点，然后一步步调试运行，观察方法之间的调用以及变量的变化，这样可以快速找到错误。",-1),j=t("p",null,"以 Intellij Idea 为例，如果要调试某个脚本，可以左击代码行设置断点，然后右击测试脚本选择在 Debug 模式下运行测试脚本。访问请求到达第一个断点后，会自动激活 Debug 窗口，如图 8 所示，具体调试方法可自行学习。",-1),M=t("p",null,"今天这一讲到这里就结束了，现在来总结一下这一讲的主要内容：",-1),V=t("ul",null,[t("li",null,"以 Selenium 为例讲解了 UI 元素的定位、操作，以及如何开发一个 UI 自动化测试脚本；"),t("li",null,"如何通过模块化和参数化对测试代码进行优化，封装业务操作函数把可复用的代码从测试用例脚本中分离出来，提高了代码的可复用性和测试用例的可读性，同时，也实现了测试数据和操作函数的分离；"),t("li",null,"如何通过 UI 自动化测试工具与其他自动化测试框架对测试用例进行组织和管理，以及很方便地实现了数据驱动自动化脚本；"),t("li",null,"PageObject 的设计模式，根据分层的思想进一步把页面元素的定位、操作与业务操作函数分离；"),t("li",null,"上述技巧都从不同的角度增强了测试代码的可读性、可维护性。")],-1),W=t("p",null,"前面讲过 BDD 的自动化测试框架，也讲过 BDD 是敏捷测试中测试左移的优秀实践。今天给你出一道练习题：选择一个 BDD 自动化测试框架和 Selenium 或其他 UI 自动化测试工具进行集成，打造出 BDD 风格的测试脚本。",-1);function B(N,O,L,R,w,J){const l=i("Image");return o(),r("div",null,[_,n(l,{alt:"image1.png",src:"https://s0.lgstatic.com/i/image/M00/0F/5D/Ciqc1F7HdH6AI5XbAADmJNW6res445.png"}),e(),c,n(l,{alt:"image2.png",src:"https://s0.lgstatic.com/i/image/M00/0F/5D/Ciqc1F7HdIuAf_7IAANlIzuk3f0199.png"}),e(),p,n(l,{alt:"image3.png",src:"https://s0.lgstatic.com/i/image/M00/0F/68/CgqCHl7HdJSAJybzAAC8634VWtI037.png"}),e(),g,n(l,{alt:"image4.png",src:"https://s0.lgstatic.com/i/image/M00/0F/5D/Ciqc1F7HdJ2ALVCQAABphrgRIEI044.png"}),e(),h,u,m,n(l,{alt:"image5.png",src:"https://s0.lgstatic.com/i/image/M00/0F/5D/Ciqc1F7HdKaAYEHYAADj_IMoHsI662.png"}),e(),y,b,I,x,n(l,{alt:"image6.png",src:"https://s0.lgstatic.com/i/image/M00/0F/5D/Ciqc1F7HdK-AXyDWAAL3eVP896w445.png"}),e(),f,U,q,A,P,D,S,n(l,{alt:"image7.png",src:"https://s0.lgstatic.com/i/image/M00/0F/69/CgqCHl7HdLqAG4ulAAc_ztezY70528.png"}),e(),C,k,H,T,v,F,j,n(l,{alt:"image8.png",src:"https://s0.lgstatic.com/i/image/M00/0F/5D/Ciqc1F7HdMWAVc9DAAoKpqXHr-s491.png"}),e(),M,V,W])}const z=a(d,[["render",B]]);export{X as __pageData,z as default};
