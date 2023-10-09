import{_ as s,o as n,h as a,Q as l}from"./chunks/framework.d3daa342.js";const h=JSON.parse('{"title":"第10讲：Python语法知识","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(326) 第10讲：Python 语法知识.md","filePath":"posts/devops/110-测试开发核心技术文档/(326) 第10讲：Python 语法知识.md","lastUpdated":1696682708000}'),p={name:"posts/devops/110-测试开发核心技术文档/(326) 第10讲：Python 语法知识.md"},e=l(`<h1 id="第10讲-python语法知识" tabindex="-1">第10讲：Python语法知识 <a class="header-anchor" href="#第10讲-python语法知识" aria-label="Permalink to &quot;第10讲：Python语法知识&quot;">​</a></h1><p>本课时我们就主要学习 Python 的基础语法知识，因为本课时的内容非常简单，这里就不再带你演示具体的代码了。</p><h2 id="if-条件判断" tabindex="-1">if 条件判断 <a class="header-anchor" href="#if-条件判断" aria-label="Permalink to &quot;if 条件判断&quot;">​</a></h2><p>首先，我们学习 if 条件判断语句，以具体的场景为例，如代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">x = input(&quot;你好，请输入你编写自动化测试用例常用的测试框架：&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">if x == &quot;pytest&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">print(&quot;高级测试工程师&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">elif x == &quot;unittest&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">print(&quot;中级测试工程师&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">else:</span></span>
<span class="line"><span style="color:#E1E4E8;">print(&quot;不符合要求&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">x = input(&quot;你好，请输入你编写自动化测试用例常用的测试框架：&quot;)</span></span>
<span class="line"><span style="color:#24292E;">if x == &quot;pytest&quot;:</span></span>
<span class="line"><span style="color:#24292E;">print(&quot;高级测试工程师&quot;)</span></span>
<span class="line"><span style="color:#24292E;">elif x == &quot;unittest&quot;:</span></span>
<span class="line"><span style="color:#24292E;">print(&quot;中级测试工程师&quot;)</span></span>
<span class="line"><span style="color:#24292E;">else:</span></span>
<span class="line"><span style="color:#24292E;">print(&quot;不符合要求&quot;)</span></span></code></pre></div><p>我们提出了一个问题&quot;请输入你编写自动化测试用例的测试框架：&quot;并将问题的答案赋值给变量 x，接下来通过 if 判断变量 x 是否与指定的条件匹配，比如回答是否为 pytest、unittest 等，如果回答的是 pytest，就打印高级测试工程师，以此类推。通过 if 条件判断语句可以根据变量值来匹配不同的操作。</p><h2 id="for-遍历循环" tabindex="-1">for 遍历循环 <a class="header-anchor" href="#for-遍历循环" aria-label="Permalink to &quot;for 遍历循环&quot;">​</a></h2><p>第二个是 for 遍历循环，for遍历循环会根据数据本身的特征遍历其中的每一项数据，上一课时我们学习的集合、元祖、列表等内容都是序列型的数据，针对这些序列型的数据我们就可以对其进行相应的遍历，如代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">interviewss = [26,28,30,32,26,35,40]</span></span>
<span class="line"><span style="color:#E1E4E8;">for age in interviewss</span></span>
<span class="line"><span style="color:#E1E4E8;">    if 30 </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> age </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 35:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print(f&quot;{age}岁可能是一个高级工程师&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    elif age &gt;= 35:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print (f&quot;{age}岁可能是一个测试专家或者测试管理&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    else:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print (f&quot;{age}岁可能是一个初中级工程师&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">interviewss = [26,28,30,32,26,35,40]</span></span>
<span class="line"><span style="color:#24292E;">for age in interviewss</span></span>
<span class="line"><span style="color:#24292E;">    if 30 </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> age </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 35:</span></span>
<span class="line"><span style="color:#24292E;">        print(f&quot;{age}岁可能是一个高级工程师&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    elif age &gt;= 35:</span></span>
<span class="line"><span style="color:#24292E;">        print (f&quot;{age}岁可能是一个测试专家或者测试管理&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    else:</span></span>
<span class="line"><span style="color:#24292E;">        print (f&quot;{age}岁可能是一个初中级工程师&quot;)</span></span></code></pre></div><p>我们首先定义了一个列表并往里面进行赋值，然后可以使用 for in 结构的语句来进行循环遍历，在 interviewee 中判断 age 的范围，然后根据 age 的范围进行一个初始化的判断并输出不同的结果，for 遍历循环的特点是 for in 结构使用非常简单，可遍历的数据结构都可以使用 for in 结构来遍历数据。</p><h2 id="for-计数循环" tabindex="-1">for 计数循环 <a class="header-anchor" href="#for-计数循环" aria-label="Permalink to &quot;for 计数循环&quot;">​</a></h2><p>第二个 for 循环叫作 for 计数循环，for 计数循环严格按照计数计算并进行循环遍历，举个例子，如代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">interviewss = [26,28,30,32,26,35,40]</span></span>
<span class="line"><span style="color:#E1E4E8;">for i in range(5):</span></span>
<span class="line"><span style="color:#E1E4E8;">if 30 </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> interviewss[i]  </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 35:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print(f&quot;第{i}名面试者：{interviewss[i]}岁可能是一个高级工程师&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    elif age &gt;= 35:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print (f&quot;第{i}名面试者：{interviewss[i]}岁可能是一个测试专家或者测试管理&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    else:</span></span>
<span class="line"><span style="color:#E1E4E8;">        print (f&quot;第{i}名面试者：{interviewss[i]}岁可能是一个初中级工程师&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">interviewss = [26,28,30,32,26,35,40]</span></span>
<span class="line"><span style="color:#24292E;">for i in range(5):</span></span>
<span class="line"><span style="color:#24292E;">if 30 </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> interviewss[i]  </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 35:</span></span>
<span class="line"><span style="color:#24292E;">        print(f&quot;第{i}名面试者：{interviewss[i]}岁可能是一个高级工程师&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    elif age &gt;= 35:</span></span>
<span class="line"><span style="color:#24292E;">        print (f&quot;第{i}名面试者：{interviewss[i]}岁可能是一个测试专家或者测试管理&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    else:</span></span>
<span class="line"><span style="color:#24292E;">        print (f&quot;第{i}名面试者：{interviewss[i]}岁可能是一个初中级工程师&quot;)</span></span></code></pre></div><p>仍使用上面定义的列表，这次我们通过 for i in rang(5) 获取前 5 个数据进行判断，range(5)会生成一个标记位从 0~4 的列表，然后在这个子列表中进行循环遍历，这便是一个典型的计数循环，可以根据下标获取相应的数据再通过 if 语句判断面试者对应的职称。</p><h2 id="while-循环" tabindex="-1">while 循环 <a class="header-anchor" href="#while-循环" aria-label="Permalink to &quot;while 循环&quot;">​</a></h2><p>接下来是 while 循环，while 循环是条件轮询的循环结构，它会不断地轮询一个条件，如代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">i = 1</span></span>
<span class="line"><span style="color:#E1E4E8;">while i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 6：</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(i)</span></span>
<span class="line"><span style="color:#E1E4E8;">    i +=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">i = 1</span></span>
<span class="line"><span style="color:#24292E;">while i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 6：</span></span>
<span class="line"><span style="color:#24292E;">    print(i)</span></span>
<span class="line"><span style="color:#24292E;">    i +=1</span></span></code></pre></div><p>在 while 后设定了一个判断条件，只有当判断条件为 true 时，才可以继续往下执行，如果不为 true 就跳出循环，可以看到 while 循环也非常简单。</p><h2 id="函数与参数" tabindex="-1">函数与参数 <a class="header-anchor" href="#函数与参数" aria-label="Permalink to &quot;函数与参数&quot;">​</a></h2><p>前面我们学习了条件判断语句和循环语句，接下来我们学习函数和类是如何定义的。</p><p>首先是函数，如代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def x(a,b=1,*c,**d):</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(f&quot;a={a}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(f&quot;b={b}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(f&quot;c={c}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    print(f&quot;d={d}&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">x(2)</span></span>
<span class="line"><span style="color:#E1E4E8;">x(2,3)</span></span>
<span class="line"><span style="color:#E1E4E8;">x(2,3,4,5)</span></span>
<span class="line"><span style="color:#E1E4E8;">x(2,3,4,5,x=1,y=2)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def x(a,b=1,*c,**d):</span></span>
<span class="line"><span style="color:#24292E;">    print(f&quot;a={a}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    print(f&quot;b={b}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    print(f&quot;c={c}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    print(f&quot;d={d}&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">x(2)</span></span>
<span class="line"><span style="color:#24292E;">x(2,3)</span></span>
<span class="line"><span style="color:#24292E;">x(2,3,4,5)</span></span>
<span class="line"><span style="color:#24292E;">x(2,3,4,5,x=1,y=2)</span></span></code></pre></div><p>Python 中可以通过两种方式定义一个函数。</p><ul><li><p>第一种方式通过 def 语句定义函数，def 后定义一个函数名，函数名后括号里的是传入函数的参数，函数体内只简单打印相应的参数，通过这种方式创建的函数通常叫作命名函数。</p></li><li><p>第二种方式是通过 lambda 表达式定义函数，lambda 表达式允许我们创建一个特殊的方法来执行相应的操作，与第一种方式相对应这种方式是匿名函数。</p></li></ul><p>函数的另一个重要知识点是参数，Python 中函数的参数主要分为：</p><ul><li><p>默认参数；</p></li><li><p>命名参数；</p></li><li><p>变长参数；</p></li><li><p>词典参数。</p></li></ul><p>比如参数 a 和 b=1 都是命名参数，又因为参数 b 设置了默认的初始值，同时它也是默认参数，参数 *c 则表示变长参数，也就是参数个数是可变的；**d 表示词典参数，里面传入的是类似于上一课时我们学习过的词典数据结构里面的 k/v 结构数据。接下来我们将代码中的赋值带入参数，来对比它们有何异同。</p><ul><li><p>当执行 x(2) 时，a=2，b=1；</p></li><li><p>当执行 x(2,3) 时，a=2，b=3；</p></li><li><p>当执行 x(2,3,4,5) 时，a=2，b=3，c=4,5；</p></li><li><p>当执行 x(2,3,4,5,x=1,y=2)，a=2，b=3，c=4,5，d= x=1,y=2。</p></li></ul><p>这就是函数和参数的相关知识点，希望你在课后多加练习。</p><h2 id="类与方法" tabindex="-1">类与方法 <a class="header-anchor" href="#类与方法" aria-label="Permalink to &quot;类与方法&quot;">​</a></h2><p>最后，我们看下类和方法，在 Python 中定义一个类也非常简单，只需要在 class 后面加上对应的类名即可。我们举个简单的例子，如代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">class MyClass</span></span>
<span class="line"><span style="color:#E1E4E8;">    i = 12345</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    def f(self)</span></span>
<span class="line"><span style="color:#E1E4E8;">        return &quot;hello world&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">x = MyClass()</span></span>
<span class="line"><span style="color:#E1E4E8;">x.f()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">class MyClass</span></span>
<span class="line"><span style="color:#24292E;">    i = 12345</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    def f(self)</span></span>
<span class="line"><span style="color:#24292E;">        return &quot;hello world&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">x = MyClass()</span></span>
<span class="line"><span style="color:#24292E;">x.f()</span></span></code></pre></div><p>在类里面涉及几个关键的知识点：</p><ul><li><p>第一个是类的定义，通过 class + 类名 的方式即可定义一个类；</p></li><li><p>然后是初始化方法，初始化方法使用 <strong>init</strong> 即可；</p></li><li><p>第三个是类变量，定义在类里的变量即为类变量，比如 i = 12345；</p></li><li><p>k可以使用 @ class 的方式将方法升级为类方法；</p></li><li><p>当调用方法时传入的参数是 self 就表示该方法为实例方法。</p></li></ul><p>到这里本课时的内容就结束了，通过本课时的学习你可以掌握 Python 常见的控制语句，以及函数与类的相关知识，希望你在课后针对这方面的内容勤加练习，如果你想要更深入地研究还可以查看 Python 的使用文档。</p>`,35),o=[e];function t(i,c,r,E,y,u){return n(),a("div",null,o)}const f=s(p,[["render",t]]);export{h as __pageData,f as default};
