import{_ as l,j as o,o as e,g as t,k as n,h as c,s as a,Q as p}from"./chunks/framework.e0c66c3f.js";const T=JSON.parse('{"title":"什么是 unittest？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4669) 07  你的第一个 Web 测试框架（一）.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4669) 07  你的第一个 Web 测试框架（一）.md","lastUpdated":1696338709000}'),r={name:"posts/devops/114-测试开发入门与实战文档/(4669) 07  你的第一个 Web 测试框架（一）.md"},E=a("p",null,'通过模块一的学习，我们已经对自动化测试框架和 Python 编程有了基本的认识。从本节课开始，我们便正式进入实战部分，我将带你一步步搭建测试框架，"Web 测试框架"我将分为两个课时讲解，本课时我将先详细介绍 Python 自带的标准框架 unittest， 等完全熟悉 unittest 的各种用法后，下一课时我将把 unittest 作为测试框架的核心模块，并在此基础上带你快速搭建出第一个 Web 测试框架。',-1),y=p('<p>根据被测试对象的不同，当前流行的测试框架可以分为 Web 端测试框架、接口测试框架和移动端测试框架。在我看来，这些框架看似跨越了不同终端，属于不同类型的测试框架，但底层核心却可以是同一个，那就是以 unittest，pytest 为代表的一类基础框架。</p><p>就以 Python 应用中使用最广泛的<strong>pytest/unittest 框架</strong> 为例，在它的基础上集成 Selenium/WebDriver 就是一个 Web 端测试框架、集成 Requests 就是一个接口测试框架、集成 Appium 就变成了移动端测试框架。事实上市面上大多数开源框架，大部分底层核心部分用的正是<strong>pytest 框架。</strong></p><blockquote><p>如果你想要对测试框架有更多了解，可以至我的公众号 iTesting，搜索关键词&quot;测试框架&quot;查阅相关文章，如<a href="https://mp.weixin.qq.com/s/2KFMC-PtxRk48wep6enqiw" target="_blank" rel="noreferrer">《测试框架之我见</a><a href="https://mp.weixin.qq.com/s/2KFMC-PtxRk48wep6enqiw" target="_blank" rel="noreferrer">》</a><a href="https://mp.weixin.qq.com/s/xfok6qhqjWag408D1jJRUg" target="_blank" rel="noreferrer">《Web自动化测试框架实践指南》</a>等。</p></blockquote><p>从我的角度看，学习框架最好遵循如下步骤：</p><ul><li><p>照猫画虎，根据官方文档搭建初始版框架；</p></li><li><p>知其所以然，在使用中深入了解框架的经典实现；</p></li><li><p>推陈出新，结合公司业务持续创新，最终形成通用的框架。</p></li></ul><p>今天我就按照以上步骤带领你搭建你的第一个 Web 测试框架。 考虑到学习的难度，在本节 Web 端框架的讲解中，我将使用 Python 标准库自带的 <strong>unittest</strong> 来作为 Web 端框架的核心；而在之后的 API 测试框架中，我将会使用 <strong>pytest</strong> 作为 API 测试框架的核心。</p><h3 id="什么是-unittest" tabindex="-1">什么是 unittest？ <a class="header-anchor" href="#什么是-unittest" aria-label="Permalink to &quot;什么是 unittest？&quot;">​</a></h3><p><strong>unittest 是 Python 自带的类 Junit 单元测试框架。</strong></p><p>像 Junit 之于 Java 一样，unittest 可用于单元测试，也可用于 Web 自动化测试甚至接口测试。unittest 支持测试用例/测试用例集的查找、组装，还可以在测试用例/测试用例集内共享数据，也支持根据条件筛选测试用例执行，以及自动化生成测试报告。</p><p>使用 unittest 可以快速搭建自动化测试框架进行测试。</p><h3 id="unittest-核心组成" tabindex="-1">unittest 核心组成 <a class="header-anchor" href="#unittest-核心组成" aria-label="Permalink to &quot;unittest 核心组成&quot;">​</a></h3><p>unittest 由以下核心组成部分。</p><h4 id="_1-test-fixture" tabindex="-1">1.Test Fixture <a class="header-anchor" href="#_1-test-fixture" aria-label="Permalink to &quot;1.Test Fixture&quot;">​</a></h4><p>Test Fixture 通常用来做测试用例的准备或者清理工作。比如测试开始前的数据准备或者测试结束后的数据清理等。Python 通过 setUp()、tearDown()、setUpClass()、tearDownClass() 这 4 个钩子函数（Hook）来实现测试的准备和清理工作。</p><h4 id="_2-test-case" tabindex="-1">2.Test Case <a class="header-anchor" href="#_2-test-case" aria-label="Permalink to &quot;2.Test Case&quot;">​</a></h4><p>Test Case 是 unittest 的最小单元，一个 Test Case 就是一个测试用例，通常 Test Case 会继承 TestCase 这个基类。</p><h4 id="_3-test-suite" tabindex="-1">3.Test Suite <a class="header-anchor" href="#_3-test-suite" aria-label="Permalink to &quot;3.Test Suite&quot;">​</a></h4><p>Test Suite 是测试套件，就是我们常说的测试用例集，它可以包含一个或多个测试用例。</p><h4 id="_4-test-loader" tabindex="-1">4.Test Loader <a class="header-anchor" href="#_4-test-loader" aria-label="Permalink to &quot;4.Test Loader&quot;">​</a></h4><p>Test Loader 用来从提供的类（classes）和模块（modules）中生成测试用例集，默认情况下unittest 会提供一个 default test loader。</p><h4 id="_5-test-runner" tabindex="-1">5.Test Runner <a class="header-anchor" href="#_5-test-runner" aria-label="Permalink to &quot;5.Test Runner&quot;">​</a></h4><p>Test Runner 是测试执行器，用来进行测试用例的执行和测试结果的输出。</p><h3 id="unittest-运行原理" tabindex="-1">unittest 运行原理 <a class="header-anchor" href="#unittest-运行原理" aria-label="Permalink to &quot;unittest 运行原理&quot;">​</a></h3><p>知道了 unittest 的 5 大核心类，我们看下 unittest 的运行原理，如图所示：</p>',24),i=p(`<p><strong>Test Cases</strong> 包括一个或者多个 TestCase 类，其中保存了具体的测试过程，你可以在测试类里使用 Test Fixture，例如setUp()、tearDown() 进行测试开始前的准备和结束后的清理工作。</p><p><strong>TestSuite</strong> 包括一个或者多个 TestSuite 类，其中 TestSuite 包括了一个或多个 TestCase，也可以包括其他 TestSuite。TestSuite 通过 addTest() 或者 addTests() 方法把一个个的测试用例或者测试用例集（TestSuite）组装起来成为一个新的测试用例集。</p><p><strong>TestLoader</strong> 类加载本地或从外部文件中定义好的 TestCase 或者 TestSuites。</p><p><strong>TestRunner</strong> 包括TextTestRunner类， 它提供了运行测试的标准平台。测试运行可以通过 unittest.main() 或者 python -m unittest xxx.py 来运行。</p><p><strong>Test Results Collector</strong> 包括 TestResults 类，它为测试结果提供了一个标准容器，它存储运行的测试用例状态，例如 errors、failures、skipped，测试的结果可以直接在 Console 输出，也可以为通过其他形式输出，例如 Text、result、output。</p><h3 id="融会贯通-unittest-使用" tabindex="-1">融会贯通 unittest 使用 <a class="header-anchor" href="#融会贯通-unittest-使用" aria-label="Permalink to &quot;融会贯通 unittest 使用&quot;">​</a></h3><h4 id="_1-unittest-极简用法" tabindex="-1">1.unittest 极简用法 <a class="header-anchor" href="#_1-unittest-极简用法" aria-label="Permalink to &quot;1.unittest 极简用法&quot;">​</a></h4><p>好，原理我们也了解了，下面看下如何使用 unittest 来进行测试，以及 unittest 常用的语法语句。</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"><span style="color:#6A737D;">#测试类必须要继承TestCase类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TestSample</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">unittest</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">TestCase</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#测试用例默认以test开头</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_equal</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_not_equal</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertNotEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    unittest.main()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"><span style="color:#6A737D;">#测试类必须要继承TestCase类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TestSample</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">unittest</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">TestCase</span><span style="color:#24292E;">):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#测试用例默认以test开头</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_equal</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_not_equal</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertNotEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    unittest.main()</span></span></code></pre></div><p>上面是 unittest 的最简单使用方法。可以看到我定义了一个测试类 TestSample，它继承自 unittest.TestCse 类，如果使用 unittest 框架，你的测试类必须要继承unittest.TestCse 类，且你的测试用例默认以 test 开头（实际上这个可以更改）。</p><p>这里我的测试用例有 2 个，分别为 test_equal 和 test_not_equal。注意测试用例在 unittest 里的表现形式是一个类方法。</p><p>我们在 Pycharm 里或者命令行里运行上述文件，得到如下结果：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Ran </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> tests </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.</span><span style="color:#FDAEB7;font-style:italic;">002s</span></span>
<span class="line"><span style="color:#79B8FF;">OK</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Ran </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> tests </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.</span><span style="color:#B31D28;font-style:italic;">002s</span></span>
<span class="line"><span style="color:#005CC5;">OK</span></span></code></pre></div><h4 id="_2-testfixture-的使用" tabindex="-1">2.TestFixture 的使用 <a class="header-anchor" href="#_2-testfixture-的使用" aria-label="Permalink to &quot;2.TestFixture 的使用&quot;">​</a></h4><p>如果你想在测试用例或者测试用例集开始前，执行某些操作， 在测试用例或者测试用例集结束后再执行另外一些操作，那么你应该使用 Test Fixture。</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试类必须要继承TestCase类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TestSample</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">unittest</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">TestCase</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#类共享的fixture，在整个测试类执行过程中仅仅执行一次，需加装饰器@classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@</span><span style="color:#79B8FF;">classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setUpClass</span><span style="color:#E1E4E8;">(cls):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;整个测试类只执行一次 -- Start&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#测试用例fixture</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setUp</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;每个测试开始前执行一次&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 测试用例默认以test开头</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_equal</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_not_equal</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertNotEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#测试用例fixture</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tearDown</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;每个测试结束后执行一次&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#类共享的fixture，在整个测试类执行过程中仅仅执行一次，需加装饰器@classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@</span><span style="color:#79B8FF;">classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tearDownClass</span><span style="color:#E1E4E8;">(cls):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;整个测试类只执行一次 -- End&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    unittest.main()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试类必须要继承TestCase类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TestSample</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">unittest</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">TestCase</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#类共享的fixture，在整个测试类执行过程中仅仅执行一次，需加装饰器@classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@</span><span style="color:#005CC5;">classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setUpClass</span><span style="color:#24292E;">(cls):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;整个测试类只执行一次 -- Start&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#测试用例fixture</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setUp</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;每个测试开始前执行一次&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 测试用例默认以test开头</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_equal</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_not_equal</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertNotEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#测试用例fixture</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tearDown</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;每个测试结束后执行一次&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#类共享的fixture，在整个测试类执行过程中仅仅执行一次，需加装饰器@classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@</span><span style="color:#005CC5;">classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tearDownClass</span><span style="color:#24292E;">(cls):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;整个测试类只执行一次 -- End&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    unittest.main()</span></span></code></pre></div><p>需要注意的是，TestFixture 包括如下 4 个方法：</p><ul><li>setUp()</li></ul><p>setUp()方法在每一个测试用例执行测试前<strong>都会</strong>执行。</p><ul><li>setUpClass()</li></ul><p>setUpClass()方法<strong>仅在</strong>整个测试类开始执行前执行.setUpClass()方法必须使用 @classmethod 来装饰。</p><p>setUp() 和 setUpClass() 通常用来进行<strong>测试前的准备工作</strong>。例如，访问数据库获得测试用例需要的数据等。</p><ul><li>tearDown()</li></ul><p>tearDown()方法在每一个测试用例执行后<strong>都会</strong>执行。</p><ul><li>tearDownClass()</li></ul><p>tearDownClass()方法<strong>仅在</strong>整个测试类结束执行后执行.tearDownClass()方法必须使用 @classmethod 来装饰。</p><p>tearDown() 和 tearDownClass() 通常用来进行<strong>测试后的清理工作</strong>。例如，测试结束后删除测试产生的数据，将被测试系统恢复至之前的状态等。</p><p>我们在 Pycharm 里或者命令行里运行上述文件，得到结果如下：</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> Start</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">End</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> Start</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">End</span></span></code></pre></div><p>由此可见，test fixture 被正确执行了。</p><h4 id="_3-运行指定文件夹下的测试用例" tabindex="-1">3.运行指定文件夹下的测试用例 <a class="header-anchor" href="#_3-运行指定文件夹下的测试用例" aria-label="Permalink to &quot;3.运行指定文件夹下的测试用例&quot;">​</a></h4><p>在真实工作中，我们常常需要仅运行某一个测试类，或者某一个文件夹下的测试用例。此时，可以利用 unittest 的 main 函数来指定 module 运行，我们在《<strong>04 必知必会，打好 Python 基本功》<strong>里讲过 module 是什么</strong>。</strong></p><blockquote><p>模块（module）是为了编写可维护的代码，而把函数分组放到不同文件里的行为。在 Python 中，一个 .py文件 就是一个模块，一个模块可以包括一个或多个功能，模块有可以被一个或多个其他模块引用。</p></blockquote><p>先来看下 unittest.main 的语法。</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">unittest.main(</span><span style="color:#FFAB70;">module</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">defaultTest</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">argv</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">testRunner</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">testLoader</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">unittest.defaultTestLoader, </span><span style="color:#FFAB70;">exit</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">verbosity</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">failfast</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">catchbreak</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">buffer</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">warnings</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">unittest.main(</span><span style="color:#E36209;">module</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">defaultTest</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">argv</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">testRunner</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">testLoader</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">unittest.defaultTestLoader, </span><span style="color:#E36209;">exit</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">, </span><span style="color:#E36209;">verbosity</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#E36209;">failfast</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">catchbreak</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">buffer</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">warnings</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span></span></code></pre></div><p>其各个参数的含义如下：</p><ul><li><p>module：指定待运行的 module，默认是&quot;<strong>main</strong>&quot;；</p></li><li><p>defaultTest：单个测试的名字或者多个测试名字的组合（必须要 iterable）；</p></li><li><p>argv：传递给程序的一组变量，如果没有指定，那么系统默认使用 sys.argv；</p></li><li><p>testRunner：指定 unittest 的 test runner，可以是 test runner 类本身或者 test runner 类实例。默认情况下，main 函数会调用 sys.exit()，并且会在屏幕上显示测试运行错误或者成功的提示；</p></li><li><p>testLoader：必须是 TestLoader 类实例，默认是 <a href="https://docs.python.org/3.4/library/unittest.html#unittest.defaultTestLoader" target="_blank" rel="noreferrer">defaultTestLoader</a>；</p></li><li><p>exit：默认是 True，即测试运行完调用 sys.exit()，在交互模式下使用时可指定为 False；</p></li><li><p>verbosity：用于控制显示在 console 里的 log 等级，有 0、1、 2 三种，一般默认为等级 1，其中等级 2 显示的 log 最详细。</p></li></ul><p>下面来看一个 discover 的例子, 假设我们的项目结构如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">lagouTest</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">tests</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_to_run.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">itesting_test.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">__init__.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">main.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">__init__.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">|--</span><span style="color:#24292E;">lagouTest</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">tests</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_to_run.py</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">itesting_test.py</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">__init__.py</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">main.py</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">__init__.py</span></span></code></pre></div><p>其中，test_to_run.py 文件里的内容如下：</p><pre><code># test_to_run.py
# coding=utf-8

import unittest

class TestToRun(unittest.TestCase):
    def setUp(self):
        pass
        # 这里写setUp的方法，通常是打开浏览器


    def testAssertNotEqual(self):
        self.assertEqual(1, 2)
        # 这里写具体的search方法


    def testAssertEqual(self):
        print(1)
        self.assertEqual(1, 1)
        # 这里写具体的search方法


    def tearDown(self):
        pass
        # tearDown方法，测试后的清理工具，比如对测试产生的数据进
</code></pre><p>itesting_test.py 文件里的内容如下：</p><pre><code>#itesting_test.py
# coding=utf-8


import unittest


# 测试类必须要继承TestCase类
class ITestingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        print(&#39;整个测试类只执行一次 -- Start&#39;)


    def setUp(self):
        print(&#39;每个测试开始前执行一次&#39;)


    # 测试用例默认以test开头
    def equal_test(self):
        self.assertEqual(1, 1)


    def test_not_equal(self):
        self.assertNotEqual(1, 0)


    def tearDown(self):
        print(&#39;每个测试结束后执行一次&#39;)


    @classmethod
    def tearDownClass(cls):
        print(&#39;整个测试类只执行一次 --&#39;)
</code></pre><p>main.py 的内容如下：</p><pre><code># coding=utf-8

import importlib.util
import os
import unittest


# 解析tests文件夹，并且返回module的字符串列表
def get_module_name_string(file_dir):
    return_list = []
    for root, dirs, file in os.walk(file_dir):
        for i in file:
            if not (i.endswith(&#39;__init__.py&#39;) or i.endswith(&#39;.pyc&#39;)) and i.startswith(&#39;test&#39;):
                f = os.path.join(root, i)
                // 以下为Windows用法，如Mac系统，需要改成：
                //mod = &#39;tests.&#39; + f.split(&#39;tests&#39;)[1].replace(&#39;.py&#39;, // &#39;&#39;).replace(&#39;/&#39;, &#39;&#39;)
                mod = &#39;tests.&#39; + f.split(&#39;\\\\tests\\\\&#39;)[1].replace(&#39;.py&#39;, &#39;&#39;).replace(&#39;\\\\&#39;, &#39;.&#39;)
                return_list.append(mod)
    return return_list


if __name__ == &quot;__main__&quot;:
    # 定义suites

    suites = unittest.TestSuite()

    # 获取所有的module的string，类似\`
package.mod的方式
    mod_string_list = (get_module_name_string(os.path.join(os.path.dirname(__file__), &#39;tests&#39;)))
    # 遍历每个mod string，import并且把它加入test case中来
    for mod_string in mod_string_list:
        m = importlib.import_module(mod_string)
        test_case = unittest.TestLoader().loadTestsFromModule(m)
        suites.addTests(test_case)
    # 指定runner为TextTestRunner
    runner = unittest.TextTestRunner(verbosity=2)
    # 运行suites
    runner.run(suites)
</code></pre><p>在 Pycharm 或者命令行里运行 main.py，看下运行结果：</p><pre><code>java
testAssertEqual (tests.tests_to_run.TestToRun) ... ok
testAssertNotEqual (tests.tests_to_run.TestToRun) ... ok
----------------------------------------------------------------------
Ran 2 tests in 0.000s
OK
</code></pre><p>可以看到，os.path.join(os.path.dirname(-file-), &#39;tests&#39;) 这个命令获取了 tests 这个文件夹的路径，然后我通过 get_module_name_string 这个方法，把 tests 文件夹下的所有 module 的string 获取出来（放到 mod_string_list 中去），接着我遍历每一个获取的 module string，把它导入并加入到 unittest 的 suites 中去，最后我指定了 runner 并且运行。</p><p>如果你仔细观察测试结果，你会发现仅仅 test_to_run 这个文件夹下面的测试用例被执行了，而 itesting_tests.py下面的测试用例都没有被运行。</p><p>这是为什么呢？注意函数 get_module_name_string（）中，我定义了仅会查找所有以&quot;test&quot;开头的 .py 文件。因为 itesting_tests.py 是以&quot;itesting&quot;开头的并不是以&quot;test&quot;开头的，所以它被排除在外了。</p><h4 id="_4-动态查找测试用例运行" tabindex="-1">4.动态查找测试用例运行 <a class="header-anchor" href="#_4-动态查找测试用例运行" aria-label="Permalink to &quot;4.动态查找测试用例运行&quot;">​</a></h4><p>除去直接使用 unittest.main 方式加载 module 运行外，unittest 还支持通过 TestLoader 下的 discover 方法去查找测试用例。</p><p>语法如下：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">unittest.TestLoader.discover(start_dir, </span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;test*.py&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">top_level_dir</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">unittest 允许你从某个文件夹开始，递归查找所有符合筛选条件的测试用例，并且返回一个包含这些测试用例的 TestSuite 对象，unittest.TestLoader.discover 支持的参数如下：</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">unittest.TestLoader.discover(start_dir, </span><span style="color:#E36209;">pattern</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;test*.py&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">top_level_dir</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">unittest 允许你从某个文件夹开始，递归查找所有符合筛选条件的测试用例，并且返回一个包含这些测试用例的 TestSuite 对象，unittest.TestLoader.discover 支持的参数如下：</span></span></code></pre></div><ul><li><p><strong>start_dir</strong>：起始文件夹的路径；</p></li><li><p><strong>pattern</strong>（匹配模式）：默认搜索所有以&quot;test&quot;开头的测试文件，并把这些文件里的以&quot;test&quot;开头的测试用例挑选出来；</p></li><li><p><strong>top_level_dir</strong>（根目录）：测试模块必须从根目录导入，如果 start_dir 的位置不是根目录，那么必须显式指定 top_level_dir。</p></li></ul><p>仍然以上面的测试项目为例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">lagouTest</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">tests</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_to_run.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">itesting_test.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">__init__.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">main.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">__init__.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">|--</span><span style="color:#24292E;">lagouTest</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">tests</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_to_run.py</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">itesting_test.py</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">__init__.py</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">main.py</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">__init__.py</span></span></code></pre></div><p>其他文件内容不变，把 main.py 文件用 discover 的方式改写如下：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    loader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.defaultTestLoader</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#生成测试用suite</span></span>
<span class="line"><span style="color:#E1E4E8;">    suite </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> loader.discover(os.path.join(os.path.dirname(</span><span style="color:#79B8FF;">__file__</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&#39;tests&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#FFAB70;">top_level_dir</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">os.path.dirname(</span><span style="color:#79B8FF;">__file__</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#指定runner为TextTestRunner</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.TextTestRunner(</span><span style="color:#FFAB70;">verbosity</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#运行suite</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner.run(suite)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    loader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.defaultTestLoader</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#生成测试用suite</span></span>
<span class="line"><span style="color:#24292E;">    suite </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> loader.discover(os.path.join(os.path.dirname(</span><span style="color:#005CC5;">__file__</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&#39;tests&#39;</span><span style="color:#24292E;">), </span><span style="color:#E36209;">top_level_dir</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">os.path.dirname(</span><span style="color:#005CC5;">__file__</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#指定runner为TextTestRunner</span></span>
<span class="line"><span style="color:#24292E;">    runner </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.TextTestRunner(</span><span style="color:#E36209;">verbosity</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#运行suite</span></span>
<span class="line"><span style="color:#24292E;">    runner.run(suite)</span></span></code></pre></div><p>运行后发现结果跟用 unittest.main 的方式一致。</p><h4 id="_5-按需组装测试用例" tabindex="-1">5.按需组装测试用例 <a class="header-anchor" href="#_5-按需组装测试用例" aria-label="Permalink to &quot;5.按需组装测试用例&quot;">​</a></h4><p>从以上的例子里，你发现没有？ 如果测试运行，那么一个测试类下面的所有以 test 开头的测试方法都会被执行，那有没有让我只执行指定的测试用例的方法呢？</p><p>在 unittest 中，testSuite 的组装，可以用上述的方式直接 discover，也可以用 unittest.TestSuite.addTest() 方式来添加测试用例到 TestSuite。</p><p>仍然以上述的项目为例：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">|--lagouTest</span></span>
<span class="line"><span style="color:#E1E4E8;">    |--tests</span></span>
<span class="line"><span style="color:#E1E4E8;">        |--test_to_run.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        |--itesting_test.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        |--__init__.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    |--main.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    |--__init__.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">|--lagouTest</span></span>
<span class="line"><span style="color:#24292E;">    |--tests</span></span>
<span class="line"><span style="color:#24292E;">        |--test_to_run.py</span></span>
<span class="line"><span style="color:#24292E;">        |--itesting_test.py</span></span>
<span class="line"><span style="color:#24292E;">        |--__init__.py</span></span>
<span class="line"><span style="color:#24292E;">    |--main.py</span></span>
<span class="line"><span style="color:#24292E;">    |--__init__.py</span></span></code></pre></div><p>其他文件不变，我们把 main.py 更改成如下:</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"><span style="color:#6A737D;"># 这里导入TestToRun这个测试类</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> tests.tests_to_run </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> TestToRun</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> tests.itesting_test </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ITestingTest</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#定义一个测试用例集</span></span>
<span class="line"><span style="color:#E1E4E8;">    suite </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.TestSuite(v)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#把导入进来的TestToRun这个测试类下面的测试方法加入测试用例</span></span>
<span class="line"><span style="color:#E1E4E8;">    suite.addTest(TestToRun(</span><span style="color:#9ECBFF;">&#39;testAssertNotEqual&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    suite.addTest(ITestingTest(</span><span style="color:#9ECBFF;">&#39;test_not_equal&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 指定runner为TextTestRunner</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.TextTestRunner(</span><span style="color:#FFAB70;">verbosity</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 运行测试</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner.run(suite)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"><span style="color:#6A737D;"># 这里导入TestToRun这个测试类</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> tests.tests_to_run </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> TestToRun</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> tests.itesting_test </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ITestingTest</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#定义一个测试用例集</span></span>
<span class="line"><span style="color:#24292E;">    suite </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.TestSuite(v)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#把导入进来的TestToRun这个测试类下面的测试方法加入测试用例</span></span>
<span class="line"><span style="color:#24292E;">    suite.addTest(TestToRun(</span><span style="color:#032F62;">&#39;testAssertNotEqual&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    suite.addTest(ITestingTest(</span><span style="color:#032F62;">&#39;test_not_equal&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 指定runner为TextTestRunner</span></span>
<span class="line"><span style="color:#24292E;">    runner </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.TextTestRunner(</span><span style="color:#E36209;">verbosity</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 运行测试</span></span>
<span class="line"><span style="color:#24292E;">    runner.run(suite)</span></span></code></pre></div><p>在 Pycharm 或者命令行里运行 main.py，结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> Start</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> End</span></span>
<span class="line"><span style="color:#B392F0;">testAssertNotEqual</span><span style="color:#E1E4E8;"> (tests.tests_to_run.TestToRun) ... ok</span></span>
<span class="line"><span style="color:#B392F0;">test_not_equal</span><span style="color:#E1E4E8;"> (tests.itesting_test.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#F97583;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> tests in 0.</span><span style="color:#FDAEB7;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#E1E4E8;">OK</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> Start</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> End</span></span>
<span class="line"><span style="color:#6F42C1;">testAssertNotEqual</span><span style="color:#24292E;"> (tests.tests_to_run.TestToRun) ... ok</span></span>
<span class="line"><span style="color:#6F42C1;">test_not_equal</span><span style="color:#24292E;"> (tests.itesting_test.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#D73A49;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;">Ran </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> tests in 0.</span><span style="color:#B31D28;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#24292E;">OK</span></span></code></pre></div><p>你可以看到，在本次的测试中，我们分别挑选了 TestToRun 这个测试类下的&quot;testAssertNotEqua&quot;方法，和 ITestingTest 下面的&quot;test_not_equal&quot;方法，并且把它们组装到一个 TestSuite 里运行。</p><p>通过 suit.addTest() 的方式，就可以按照需要实现把不同文件下的测试用例组装到同一个 suite 执行的操作。</p><h4 id="_6-破除默认-pattern-随心所欲命名测试文件" tabindex="-1">6.破除默认 pattern，随心所欲命名测试文件 <a class="header-anchor" href="#_6-破除默认-pattern-随心所欲命名测试文件" aria-label="Permalink to &quot;6.破除默认 pattern，随心所欲命名测试文件&quot;">​</a></h4><p>在以上的举例中，除去按需组装测试用例，其他例子中，itesting_test.py 文件下的测试用例都没有被执行，其原因就是 unittest 有默认的查找 pattern 如下：</p><ul><li><p>查找测试文件，默认查找&quot;test*.py&quot;；</p></li><li><p>查找测试用例，默认查找&quot;test*&quot;。</p></li></ul><p>我们可以通过更改查找 pattern 的方式来执行所有的测试用例，仍以上述项目为例：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">|--lagouTest</span></span>
<span class="line"><span style="color:#E1E4E8;">    |--tests</span></span>
<span class="line"><span style="color:#E1E4E8;">        |--test_to_run.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        |--itesting_test.py</span></span>
<span class="line"><span style="color:#E1E4E8;">        |--__init__.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    |--main.py</span></span>
<span class="line"><span style="color:#E1E4E8;">    |--__init__.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">|--lagouTest</span></span>
<span class="line"><span style="color:#24292E;">    |--tests</span></span>
<span class="line"><span style="color:#24292E;">        |--test_to_run.py</span></span>
<span class="line"><span style="color:#24292E;">        |--itesting_test.py</span></span>
<span class="line"><span style="color:#24292E;">        |--__init__.py</span></span>
<span class="line"><span style="color:#24292E;">    |--main.py</span></span>
<span class="line"><span style="color:#24292E;">    |--__init__.py</span></span></code></pre></div><p>其他文件不变，更改 main.py 为：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    suite </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.defaultTestLoader.discover(os.path.join(os.path.dirname(</span><span style="color:#79B8FF;">__file__</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&quot;tests&quot;</span><span style="color:#E1E4E8;">), \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                </span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;*.py&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">top_level_dir</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">os.path.dirname(</span><span style="color:#79B8FF;">__file__</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.TextTestRunner(</span><span style="color:#FFAB70;">verbosity</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner.run(suite)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    suite </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.defaultTestLoader.discover(os.path.join(os.path.dirname(</span><span style="color:#005CC5;">__file__</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&quot;tests&quot;</span><span style="color:#24292E;">), \\</span></span>
<span class="line"><span style="color:#24292E;">                                                </span><span style="color:#E36209;">pattern</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;*.py&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">top_level_dir</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">os.path.dirname(</span><span style="color:#005CC5;">__file__</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    runner </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.TextTestRunner(</span><span style="color:#E36209;">verbosity</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    runner.run(suite)</span></span></code></pre></div><p>运行后查看结果，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">test_not_equal</span><span style="color:#E1E4E8;"> (tests.itesting_test.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#B392F0;">testAssertEqual</span><span style="color:#E1E4E8;"> (tests.tests_to_run.TestToRun) ... ok</span></span>
<span class="line"><span style="color:#B392F0;">testAssertNotEqual</span><span style="color:#E1E4E8;"> (tests.tests_to_run.TestToRun) ... ok</span></span>
<span class="line"><span style="color:#F97583;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> tests in 0.</span><span style="color:#FDAEB7;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#E1E4E8;">OK</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> Start</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> End</span></span>
<span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">Process finished with exit code </span><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">test_not_equal</span><span style="color:#24292E;"> (tests.itesting_test.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#6F42C1;">testAssertEqual</span><span style="color:#24292E;"> (tests.tests_to_run.TestToRun) ... ok</span></span>
<span class="line"><span style="color:#6F42C1;">testAssertNotEqual</span><span style="color:#24292E;"> (tests.tests_to_run.TestToRun) ... ok</span></span>
<span class="line"><span style="color:#D73A49;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;">Ran </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> tests in 0.</span><span style="color:#B31D28;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#24292E;">OK</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> Start</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> End</span></span>
<span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">Process finished with exit code </span><span style="color:#005CC5;">0</span></span></code></pre></div><p>我们把默认的 pattern 更改为&quot;*.py&quot;，这样任何在 tests 文件夹下的 py 文件都可以被查找到。可以看到 itesting_test.py 下的测试用例运行了一个方法，即&quot;test_not_equal&quot;，但是&quot;equal_test&quot;这个方法没有运行，那是因为方法&quot;testMethodPrefix&quot;在起作用。</p><p>我们来更改下测试方法的默认查找方式， 更改 main.py 为如下：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    loader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.defaultTestLoader</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 设置仅运行以equal开头的测试用例</span></span>
<span class="line"><span style="color:#E1E4E8;">    loader.testMethodPrefix </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;equal&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    suite </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> loader.discover(</span><span style="color:#FFAB70;">start_dir</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">os.path.join(os.path.dirname(</span><span style="color:#79B8FF;">__file__</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&quot;tests&quot;</span><span style="color:#E1E4E8;">), </span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;*.py&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">top_level_dir</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">os.path.dirname(</span><span style="color:#79B8FF;">__file__</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unittest.TextTestRunner(</span><span style="color:#FFAB70;">verbosity</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    runner.run(suite)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    loader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.defaultTestLoader</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 设置仅运行以equal开头的测试用例</span></span>
<span class="line"><span style="color:#24292E;">    loader.testMethodPrefix </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;equal&#39;</span></span>
<span class="line"><span style="color:#24292E;">    suite </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> loader.discover(</span><span style="color:#E36209;">start_dir</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">os.path.join(os.path.dirname(</span><span style="color:#005CC5;">__file__</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&quot;tests&quot;</span><span style="color:#24292E;">), </span><span style="color:#E36209;">pattern</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;*.py&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">top_level_dir</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">os.path.dirname(</span><span style="color:#005CC5;">__file__</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    runner </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unittest.TextTestRunner(</span><span style="color:#E36209;">verbosity</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    runner.run(suite)</span></span></code></pre></div><p>运行结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> Start</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> End</span></span>
<span class="line"><span style="color:#B392F0;">equal_test</span><span style="color:#E1E4E8;"> (tests.itesting_test.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#F97583;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> test in 0.</span><span style="color:#FDAEB7;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#E1E4E8;">OK</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> Start</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> End</span></span>
<span class="line"><span style="color:#6F42C1;">equal_test</span><span style="color:#24292E;"> (tests.itesting_test.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#D73A49;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;">Ran </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> test in 0.</span><span style="color:#B31D28;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#24292E;">OK</span></span></code></pre></div><p>可以发现，&quot;testMethodPrefix&quot;改变了 python 查找测试用例的默认方式。</p><p>在这里给你留一个课后作业：Python 3.7 及以后的版本，TestLoader 多了一个属性 testNamePatterns，可以用于设置测试用例的 pattern，你可以课后尝试一下，看看结果有什么不同？</p><h4 id="_7-忽略测试用例执行" tabindex="-1">7.忽略测试用例执行 <a class="header-anchor" href="#_7-忽略测试用例执行" aria-label="Permalink to &quot;7.忽略测试用例执行&quot;">​</a></h4><p>unittest 还支持忽略执行某些测试用例，只要在要忽略的测试用例上加上如下装饰器即可：</p><p><strong>@unittest.skip()</strong> 执行时直接忽略掉被装饰的测试用例；</p><p><strong>@unittest.skipIf()</strong> 如果 skipIf 里的条件成立，执行时直接忽略掉被装饰的测试用例；</p><p><strong>@unittest.skipUnless()</strong> 永久在执行时忽略被装饰的测试用例，除非 skipUnless 里的条件成立；</p><p><strong>@unittest.expectedFailure</strong>期望被装饰的测试用例是失败的，如果是失败的，则此条测试用例将被标记为测试通过。</p><p>下面来通过一组测试来显示如何忽略测试用例执行：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> unittest</span></span>
<span class="line"><span style="color:#E1E4E8;">flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试类必须要继承TestCase类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ITestingTest</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">unittest</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">TestCase</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@</span><span style="color:#79B8FF;">classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setUpClass</span><span style="color:#E1E4E8;">(cls):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;整个测试类只执行一次 -- Start&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setUp</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;每个测试开始前执行一次&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@unittest.skip</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;没有任何原因，忽略运行&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">equal_test</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@unittest.skipIf</span><span style="color:#E1E4E8;">(flag </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;flag为True则skip&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_not_equal</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertNotEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@unittest.skipUnless</span><span style="color:#E1E4E8;">(flag </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;flag为False则skip&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_not_equal1</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertNotEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@unittest.expectedFailure</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test_not_equal2</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.assertNotEqual(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tearDown</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;每个测试结束后执行一次&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@</span><span style="color:#79B8FF;">classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tearDownClass</span><span style="color:#E1E4E8;">(cls):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;整个测试类只执行一次 -- End&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"><span style="color:#E1E4E8;">    unittest.main(</span><span style="color:#FFAB70;">verbosity</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># coding=utf-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> unittest</span></span>
<span class="line"><span style="color:#24292E;">flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试类必须要继承TestCase类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ITestingTest</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">unittest</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">TestCase</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@</span><span style="color:#005CC5;">classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setUpClass</span><span style="color:#24292E;">(cls):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;整个测试类只执行一次 -- Start&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setUp</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;每个测试开始前执行一次&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@unittest.skip</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;没有任何原因，忽略运行&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">equal_test</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@unittest.skipIf</span><span style="color:#24292E;">(flag </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;flag为True则skip&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_not_equal</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertNotEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@unittest.skipUnless</span><span style="color:#24292E;">(flag </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;flag为False则skip&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_not_equal1</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertNotEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@unittest.expectedFailure</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test_not_equal2</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.assertNotEqual(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tearDown</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;每个测试结束后执行一次&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@</span><span style="color:#005CC5;">classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tearDownClass</span><span style="color:#24292E;">(cls):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;整个测试类只执行一次 -- End&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"><span style="color:#24292E;">    unittest.main(</span><span style="color:#E36209;">verbosity</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span></code></pre></div><p>运行后结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">test_not_equal</span><span style="color:#E1E4E8;"> (__main__.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#B392F0;">test_not_equal1</span><span style="color:#E1E4E8;"> (__main__.ITestingTest) ... skipped </span><span style="color:#9ECBFF;">&#39;flag为False则skip&#39;</span></span>
<span class="line"><span style="color:#B392F0;">test_not_equal2</span><span style="color:#E1E4E8;"> (__main__.ITestingTest) ... unexpected success</span></span>
<span class="line"><span style="color:#F97583;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> tests in 0.</span><span style="color:#FDAEB7;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#B392F0;">FAILED</span><span style="color:#E1E4E8;"> (skipped</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, unexpected successes</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> Start</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">整个测试类只执行一次 </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> End</span></span>
<span class="line"><span style="color:#E1E4E8;">Process finished with exit code </span><span style="color:#79B8FF;">1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">test_not_equal</span><span style="color:#24292E;"> (__main__.ITestingTest) ... ok</span></span>
<span class="line"><span style="color:#6F42C1;">test_not_equal1</span><span style="color:#24292E;"> (__main__.ITestingTest) ... skipped </span><span style="color:#032F62;">&#39;flag为False则skip&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">test_not_equal2</span><span style="color:#24292E;"> (__main__.ITestingTest) ... unexpected success</span></span>
<span class="line"><span style="color:#D73A49;">----------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;">Ran </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> tests in 0.</span><span style="color:#B31D28;font-style:italic;">000s</span></span>
<span class="line"><span style="color:#6F42C1;">FAILED</span><span style="color:#24292E;"> (skipped</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, unexpected successes</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> Start</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试开始前执行一次</span></span>
<span class="line"><span style="color:#24292E;">每个测试结束后执行一次</span></span>
<span class="line"><span style="color:#24292E;">整个测试类只执行一次 </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> End</span></span>
<span class="line"><span style="color:#24292E;">Process finished with exit code </span><span style="color:#005CC5;">1</span></span></code></pre></div><h3 id="使用-unittest-框架创建测试的步骤" tabindex="-1">使用 unittest 框架创建测试的步骤 <a class="header-anchor" href="#使用-unittest-框架创建测试的步骤" aria-label="Permalink to &quot;使用 unittest 框架创建测试的步骤&quot;">​</a></h3><p>本课时我详细讲解了unittest 的各种用法，了解 unitest 的各种用法后，你就可以搭建出以unittest 为核心的测试框架了。</p><p>使用 unittest 框架创建测试的步骤如下：</p><ul><li><p>编写一个测试类，这个测试类必须继承 TestCase 这个基类， 测试类所对应的 .py 文件默认要以 test 开头；</p></li><li><p>在这个测试类下面写你的测试方法，每个测试方法应该包括一个测试的完整步骤，测试方法要默认以 test 开头；</p></li><li><p>通过 unittest.main()、runner.run() 或者 python -m 的方式来调用这些测试用例。</p></li></ul><p>熟悉了 unittest 框架后，下一课时我将带你正式搭建 Web 测试框架。</p><hr>`,103),u=a("p",null,"unittest.main 源码图",-1),d=a("p",null,"该图用以回答留言区：[老师，这几种加载方式一般都是为runner.run方法去执行？然而unittest.main方法是不是只能用于单个module场景？多个module就无法应用？] 这一提问。",-1);function _(F,h,C,g,f,m){const s=o("Image");return e(),t("div",null,[E,n(s,{alt:"白底脑图.png",src:"https://s0.lgstatic.com/i/image/M00/5A/87/CgqCHl94SRWAcS3zAADAcDmUSmw724.png"}),y,n(s,{alt:"Screen Shot 2020-09-03 at 11.32.17 PM.png",src:"https://s0.lgstatic.com/i/image/M00/5A/26/Ciqc1F90Ja6AKbQrAADD2IRL5RA935.png"}),i,n(s,{alt:"07问答.png",src:"https://s0.lgstatic.com/i/image6/M00/04/AC/Cgp9HWAuApOAFsZAAACOuDb0P8o306.png"}),c(),u,d])}const D=l(r,[["render",_]]);export{T as __pageData,D as default};
