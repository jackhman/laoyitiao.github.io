import{_ as e,j as l,o as p,g as r,k as t,h as a,s,Q as o}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"第27讲：Web自动化测试演练","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(346) 第27讲：Web 自动化测试演练.md","filePath":"posts/devops/110-测试开发核心技术文档/(346) 第27讲：Web 自动化测试演练.md","lastUpdated":1696417798000}'),c={name:"posts/devops/110-测试开发核心技术文档/(346) 第27讲：Web 自动化测试演练.md"},i=s("h1",{id:"第27讲-web自动化测试演练",tabindex:"-1"},[a("第27讲：Web自动化测试演练 "),s("a",{class:"header-anchor",href:"#第27讲-web自动化测试演练","aria-label":'Permalink to "第27讲：Web自动化测试演练"'},"​")],-1),E=s("p",null,"本课时我们以霍格沃兹学院的学员社区网页来演示如何把之前的 case 进行 PO 改造。",-1),d=s("br",null,null,-1),y=o(`<br><p>在这前的 case 中，我们打开了一个网址 (home.testing-studio.com)，并搜索内容，然后断言结果是否符合预期，这是一个非常传统的 Web 自动化测试流程，接下来我们对其进行 PO 模式改造。</p><br><p>首先，我们需要创建两个对应的子包，一个叫作 page 用于存放 PO 定义；另一个叫作 testcase 用于存放调用的测试用例。创建完成之后和以前一样首先打开搜索内容，然后断言结果是否符合预期。</p><h2 id="构思-po" tabindex="-1">构思 PO <a class="header-anchor" href="#构思-po" aria-label="Permalink to &quot;构思 PO&quot;">​</a></h2><p>搜索结果页和首页一共是两个页面，所以我们需要创建两个 PO 。</p><br><p>首页的 PO 具有搜索功能，在搜索结果页中还可以根据用户名继续搜索，这里面又包含了一个独立的 PO。首页要有一个 PO ，这个 PO 是一个快捷搜索，我们搜索完关键字后会进入搜索结果页，也就是 search 结果后需要返回的是搜索结果页的 PO。</p><br><p>搜索结果页要允许用户可以根据特征进行搜索，比如根据作者搜索、根据分类搜索、或者根据一些其他条件进行搜索。</p><br><p>搜完之后，我们要对结果进行校验， 所以需要提供一些获取关键结果的方法。如果想获取搜索结果，可以使用 get_result 方法，如果要获取其中的一个作者，可以使用 get_authors 方法。</p><br><p>至此我们构思出了两个 PO，在这两个 PO 中包含四种方法。</p><h2 id="编写-po" tabindex="-1">编写 PO <a class="header-anchor" href="#编写-po" aria-label="Permalink to &quot;编写 PO&quot;">​</a></h2><p>基于之前的设计构思，我们开始编写我们的实现。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Main：</span></span>
<span class="line"><span style="color:#E1E4E8;">    def search（self，keyword）：</span></span>
<span class="line"><span style="color:#E1E4E8;">        return Search（）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Main：</span></span>
<span class="line"><span style="color:#24292E;">    def search（self，keyword）：</span></span>
<span class="line"><span style="color:#24292E;">        return Search（）</span></span></code></pre></div><br><p>首先，我们回到 page 内新建一个 main 文件，表示主页。创建之后，新建一个 class 类，这个类里面有 search 功能。search 允许我们搜一个关键字，所以需要传参，我将参数命名为 keyword。 搜完 keyword 之后会返回搜索结果页，所以需要 return 一个对象，我们假设 return 一个 search，而此时 search 还没有实现，因此我们需要要创建它。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Search：</span></span>
<span class="line"><span style="color:#E1E4E8;">    def search_by(self,author=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return self</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Search：</span></span>
<span class="line"><span style="color:#24292E;">    def search_by(self,author=None):</span></span>
<span class="line"><span style="color:#24292E;">        return self</span></span></code></pre></div><br><p>现在我们开始创建 search。 因为 PO 是一个类，所以我们可以使用一个类的方法去创建它。</p><br><p>创建的类有几个方法，第 1 个方法叫 search_by，它可以根据一些特征来进行搜索。 搜索特征有哪些呢？根据我们刚才的界面你可以看到，除了搜索普通关键词之外还有很多选项，比如根据发帖人或分类进行搜索。</p><br><p>这次我根据作者进行搜索。首先我们要给作者一个默认值 None。搜索完成之后仍然是当前的结果页，注意，这个时候它也是 PO，只不过 return 的是它自己self。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Search:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def search_by(self,author=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return self</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    def get_result(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return []</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span></span>
<span class="line"><span style="color:#E1E4E8;">    def get_authors(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return []</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Search:</span></span>
<span class="line"><span style="color:#24292E;">    def search_by(self,author=None):</span></span>
<span class="line"><span style="color:#24292E;">        return self</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    def get_result(self):</span></span>
<span class="line"><span style="color:#24292E;">        return []</span></span>
<span class="line"><span style="color:#24292E;">       </span></span>
<span class="line"><span style="color:#24292E;">    def get_authors(self):</span></span>
<span class="line"><span style="color:#24292E;">        return []</span></span></code></pre></div><br><p>搜索完成后需要对结果进行判断，这时我们需要有 API 能够获取所有搜索结果中的作者。在这里，我们先获取搜索结果 get_results，搜索结果要 return 一个数组。然后是 get_authors，它要 return 一个字符串数组，用于我们后期的断言。</p><br><p>接着我们完善下类的导入，PO 模式基本上就已经成型了。</p><h2 id="编写测试用例" tabindex="-1">编写测试用例 <a class="header-anchor" href="#编写测试用例" aria-label="Permalink to &quot;编写测试用例&quot;">​</a></h2><p>我们开始编写测试用例。首先创建一个 test_search 的测试用例。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class TestSearch:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def setup(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.search_page=Main().search(&quot;selenium&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    def test_search(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        authors=.self.search_page.search_by(author=&quot;Wayyt&quot;,keyword=&quot;selenium&quot;).get_authors</span></span>
<span class="line"><span style="color:#E1E4E8;">        assert len(authors)&gt;0</span></span>
<span class="line"><span style="color:#E1E4E8;">        for result in authors:</span></span>
<span class="line"><span style="color:#E1E4E8;">            assert result ==&quot;Wayyt&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class TestSearch:</span></span>
<span class="line"><span style="color:#24292E;">    def setup(self):</span></span>
<span class="line"><span style="color:#24292E;">        self.search_page=Main().search(&quot;selenium&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    def test_search(self):</span></span>
<span class="line"><span style="color:#24292E;">        authors=.self.search_page.search_by(author=&quot;Wayyt&quot;,keyword=&quot;selenium&quot;).get_authors</span></span>
<span class="line"><span style="color:#24292E;">        assert len(authors)&gt;0</span></span>
<span class="line"><span style="color:#24292E;">        for result in authors:</span></span>
<span class="line"><span style="color:#24292E;">            assert result ==&quot;Wayyt&quot;</span></span></code></pre></div><br><p>第一步是创建 Setup，Setup 中包含初始化内容，比如首页 Main page 初始化，首先需要导入 Main，初始化后调用快捷搜索方法，这里输入 selenium，搜索完之后才能进入结果页。在这里我们创建一个 search_page 变量，用于保存结果页，这样就完成了对搜索结果页的初始化。</p><br><p>接着是 test_search，我们这次搜索一个简单的功能，使用 self.search_page 的 search_by 功能去搜作者，也可以搜索其他内容，这里我们搜索 wayyt 这个作者。</p><br><p>当然 search_by 也支持搜索结果内容，所以这里还可以追加更多的参数，比如 keyword。</p><br><p>这里令 keyword 参数为 selenium 并根据作者进行搜索，所以我希望获取的结果是作者。获取结果后存储进来，并开始编写断言，比如说断言搜索的内容，第 1 个断言是 assert 获取的作者长度至少要大于 0。 接下来对其中每个作者进行断言， 令 assert 的内容等于我刚才所写的 wayyt，这样就编写出来了一个简单的测试用例，这个测试用例它很好地描述了我的业务：根据关键字进行搜索，搜完之后对结果进行比对。</p><br><p>我们运行一下 case，case 一开始是报错的，这属于正常情况，因为我们还没有做自动化。</p><br><p>从这一步开始，我们已经设计好整个业务的用例：case 构建没问题了，测试用例的构建和 PO 的模式构建已经非常顺畅了。</p><h2 id="实现-po" tabindex="-1">实现 PO <a class="header-anchor" href="#实现-po" aria-label="Permalink to &quot;实现 PO&quot;">​</a></h2><p>接下来我们要完成对 PO 的实现。 首先回到之前的 case，把代码整合进来。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Main:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver = webdriver.Chrome()</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver.implicitly_wait(5)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.wait = WebDriverWait(self.driver, 30)</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.vars = {}</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver.get(&quot;https://home.testing-studio.com/&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    def search(self, keyword):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver.find_element(By.CSS_SELECTOR, &#39;#search-button&#39;).click()</span></span>
<span class="line"><span style="color:#E1E4E8;">        input_element = self.driver.find_element(By.CSS_SELECTOR, &#39;#search-term&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        input_element.send_keys(&quot;selenium&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        input_element.send_keys(Keys.ENTER)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        return Search(self.driver</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Main:</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self):</span></span>
<span class="line"><span style="color:#24292E;">        self.driver = webdriver.Chrome()</span></span>
<span class="line"><span style="color:#24292E;">        self.driver.implicitly_wait(5)</span></span>
<span class="line"><span style="color:#24292E;">        self.wait = WebDriverWait(self.driver, 30)</span></span>
<span class="line"><span style="color:#24292E;">        self.vars = {}</span></span>
<span class="line"><span style="color:#24292E;">        self.driver.get(&quot;https://home.testing-studio.com/&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    def search(self, keyword):</span></span>
<span class="line"><span style="color:#24292E;">        self.driver.find_element(By.CSS_SELECTOR, &#39;#search-button&#39;).click()</span></span>
<span class="line"><span style="color:#24292E;">        input_element = self.driver.find_element(By.CSS_SELECTOR, &#39;#search-term&#39;)</span></span>
<span class="line"><span style="color:#24292E;">        input_element.send_keys(&quot;selenium&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        input_element.send_keys(Keys.ENTER)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        return Search(self.driver</span></span></code></pre></div><br><p>Search类也需要用到driver来完成自己的自动化，所以我们给Search类增加一个可以传递driver的初始化方法。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Search:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def  __init__(self,driver):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver=driver</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Search:</span></span>
<span class="line"><span style="color:#24292E;">    def  __init__(self,driver):</span></span>
<span class="line"><span style="color:#24292E;">        self.driver=driver</span></span></code></pre></div><br><p>我们对Search类也进行改造，完成对应方法的实现</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class Search:</span></span>
<span class="line"><span style="color:#E1E4E8;">    def __init__(self, driver):</span></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver: WebDriver = driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    def search_by(self, author=None, keyword=None):</span></span>
<span class="line"><span style="color:#E1E4E8;">        if keyword is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">            search_input=self.driver.find_element(By.CSS_SELECTOR, &#39;input.search-query&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">            search_input.clear()</span></span>
<span class="line"><span style="color:#E1E4E8;">            search_input.send_keys(keyword)</span></span>
<span class="line"><span style="color:#E1E4E8;">            # search_input.send_keys(Keys.ENTER)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        if author is not None:</span></span>
<span class="line"><span style="color:#E1E4E8;">            self.driver.find_element(By.NAME, &#39;user-selector-renamed&#39;).send_keys(author)</span></span>
<span class="line"><span style="color:#E1E4E8;">            self.driver.find_element(By.CSS_SELECTOR, &#39;li .selected&#39;).click()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        self.driver.find_element(By.CSS_SELECTOR, &#39;button.search-cta&#39;).click()</span></span>
<span class="line"><span style="color:#E1E4E8;">        return self</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    def get_results(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return [element.text for element in self.driver.find_elements(By.CSS_SELECTOR, &#39;div.fps-topic&#39;)]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    def get_authors(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        return [element.get_attribute(&#39;data-user-card&#39;) for element in</span></span>
<span class="line"><span style="color:#E1E4E8;">                self.driver.find_elements(By.CSS_SELECTOR, &#39;div.fps-result .author a</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class Search:</span></span>
<span class="line"><span style="color:#24292E;">    def __init__(self, driver):</span></span>
<span class="line"><span style="color:#24292E;">        self.driver: WebDriver = driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    def search_by(self, author=None, keyword=None):</span></span>
<span class="line"><span style="color:#24292E;">        if keyword is not None:</span></span>
<span class="line"><span style="color:#24292E;">            search_input=self.driver.find_element(By.CSS_SELECTOR, &#39;input.search-query&#39;)</span></span>
<span class="line"><span style="color:#24292E;">            search_input.clear()</span></span>
<span class="line"><span style="color:#24292E;">            search_input.send_keys(keyword)</span></span>
<span class="line"><span style="color:#24292E;">            # search_input.send_keys(Keys.ENTER)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        if author is not None:</span></span>
<span class="line"><span style="color:#24292E;">            self.driver.find_element(By.NAME, &#39;user-selector-renamed&#39;).send_keys(author)</span></span>
<span class="line"><span style="color:#24292E;">            self.driver.find_element(By.CSS_SELECTOR, &#39;li .selected&#39;).click()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        self.driver.find_element(By.CSS_SELECTOR, &#39;button.search-cta&#39;).click()</span></span>
<span class="line"><span style="color:#24292E;">        return self</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    def get_results(self):</span></span>
<span class="line"><span style="color:#24292E;">        return [element.text for element in self.driver.find_elements(By.CSS_SELECTOR, &#39;div.fps-topic&#39;)]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    def get_authors(self):</span></span>
<span class="line"><span style="color:#24292E;">        return [element.get_attribute(&#39;data-user-card&#39;) for element in</span></span>
<span class="line"><span style="color:#24292E;">                self.driver.find_elements(By.CSS_SELECTOR, &#39;div.fps-result .author a</span></span></code></pre></div><p>接着运行用例，解决完一些细节问题后， case就可以运行通过了，你可以看到，我们搜 wayyt，搜出来他所发的几个帖子，然后每一个结果也都是符合我们的预期的。</p><br><p>通过这样一个小的案例，相信你已经知道基于 PO 的模式应该如何来写了。从这里也可以看到，就算没有做自动化测试，也可以把用例和场景提前写好，把流程连接起来，一旦连接完成，接下来就可以实现 自动化了，也就是我们可以提前设计好测试用例。</p><br><p>这就是整体的实现过程。 其实有了这些东西，基本的 PO 模式就实现了，但 PO 还有很多东西需要我们去继续改进。</p><h2 id="继续改进的几个技术点" tabindex="-1">继续改进的几个技术点 <a class="header-anchor" href="#继续改进的几个技术点" aria-label="Permalink to &quot;继续改进的几个技术点&quot;">​</a></h2><p>再说几个改进的方向，让你知道如何进行改进。</p><br><p>第 1 个技术点在于所有的oage类在功能上基本都是类似的，我们需要把它的公用功能抽象到一个统一的父类，比如 parent page 或者 base page 里，统一处理初始化与 driver 传递的问题，这个过程可以在 init 里面去进行解决和封装。Page 里面有大量的 driver.find 方法，我们在父类的Page中可以定义一个 find() 封装解决 driver.find 调用问题，这样可以减少大量的样板代码。</p><br><p>第 2 个技术点在于改进你的 find 策略，我们前面提到了，当广告\\评价等各种弹框出现的时候，需要进行一些异常处理。当我们 find 原有控件时，会因为广告弹框导致 case 失败。我们希望这个 case 能够更智能，就需要额外去增加一个封装，这个封装是一个异常处理流程。我们可以使用 Python 的装饰器为一些通用 find 方法增加异常处理。</p><br><p>异常处理的逻辑是这样的，首先它会执行你的 find 方法，一旦发现报错就会进入异常处理流程，异常处理流程完成后会重新再次执行正常流程。通过这个方法，你的 case 就可以应对这种异常因素，从而提高稳定性。</p><br><p>第 3 个技术点是数据驱动，这个概念在后面的课时里面也会讲，所以在这儿我们就不详细说明了。</p><br><p>第 4 个技术点是 driver 驱动，当你有很多浏览器的时候，如何实现 driver 的合理安排和多浏览器的测试呢？这个时候我们需要创建一些 driver 的工厂方法，来便捷的去调用各个浏览器。</p><br><p>有了上面这些封装基础，小的框架改造就已经非常顺畅了，下一步我们需要对你的测试用例进行改造。测试用例很多通用的流程也是类似的。我们要把测试用例也抽象成一层，比如说 BaseTestCase，然后在这里面完成通用的一些 setup 和 teardown 的处理。</p><br><p>最后在测试报告中，我们可以使用 log 替换 print，生成的结果里面要支持 JUnit 风格的 XML 测试报告文件，这是pytest 也提供的功能，可以用持续集成系统结合。</p><br><p>然后还有一个是 Allure 框架，它也提供了一个非常漂亮的 HTML 报告，我们在前面的课程里面给你讲过，你要把它应用在你的框架里面，这样你的框架才会更易用，更易于维护，同时也能够更健壮，可以处理好各种异常处理流程。</p><br><p>本课时的内容就讲完了，因为篇幅限制，我们没有办法在专栏里面给你讲解的特别深入，更多关于实战的内容，你可以关注我跟拉勾教育合作的大课，在大课里面会有更多的关于这些进阶的实战教程。</p><br>`,87);function h(u,_,f,b,v,g){const n=l("Image");return p(),r("div",null,[i,E,d,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/72/0C/CgpOIF5nZsqAON56AALtshmb4zs614.png"}),a(),y])}const S=e(c,[["render",h]]);export{k as __pageData,S as default};
