import{_ as n,j as a,o,g as p,k as s,Q as i,s as t,h as l}from"./chunks/framework.4e7d56ce.js";const K=JSON.parse('{"title":"测试框架的核心要素 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(371) 第47讲：利用参数化与数据驱动打造通用测试框架.md","filePath":"posts/devops/110-测试开发核心技术文档/(371) 第47讲：利用参数化与数据驱动打造通用测试框架.md","lastUpdated":1696417798000}'),_={name:"posts/devops/110-测试开发核心技术文档/(371) 第47讲：利用参数化与数据驱动打造通用测试框架.md"},c=i("",14),r=t("p",null,"你可以看到这里有一套测试用例，这个测试用例参数化的功能是指把代码中的变量参数化，比如代码中的 name 和 code 两个参数。",-1),h=t("p",null,"有了参数化，我们就可以使用各种办法对数据进行供应，供应的数据可以来自 Python 里的装饰器，也可以来自某一个全局变量，甚至来自更多地方。如果流程是固定的，我们可以把关键的数据进行参数化，来完成对用例的倍增以增加更多的数据，然后让整个用例能够运行起来，以整合相似流程，并用不同数据驱动的测试流程，这就是参数化的例子。",-1),d=t("h4",{id:"数据驱动",tabindex:"-1"},[l("数据驱动 "),t("a",{class:"header-anchor",href:"#数据驱动","aria-label":'Permalink to "数据驱动"'},"​")],-1),u=t("p",null,"然后，再来看下什么是数据驱动，数据驱动跟参数化的概念非常接近，数据驱动测试是指如果实现参数化，那么参数化又可以实现外部数据的供应，我们就可以对外部数据进行管理，通过使用外部数据，便可以脱离整个框架的外部数据源来驱动已有的测试，这便是数据驱动测试的概念。",-1),g=t("p",null,"数据驱动测试的核心概念跟参数化有一定的对应关系，数据驱动既可以跟参数进行结合，可以实现测试数据的数据驱动，我们也可以完成对测试步骤的数据驱动。",-1),A=t("p",null,"让我们回到示例，可以看到，核心的测试数据已经参数化了，我们就可以通过这三种办法来批量供应数据，让测试用例实现倍增，同时可以满足不同的测试场景，这边是参数化的一个示例。",-1),m=t("p",null,"而数据驱动呢？我们可以把数据脱离代码，能够从外部数据源直接进行供应，这个供应同样也需要驱动，它需要你首先完成参数化。",-1),x=t("p",null,"当然还有一种情况不需要提前进行参数化，比如我们之前讲自动化测试的时候，配置 Object 思想，那么在 PV 中我们需要指明输入的操作时点击还是滑动，还需要指定特定的值，对于测试步骤的数据驱动，它是不需要与参数化进行结合的，你只需要在核心的测试步骤里找到对应的驱动就可以了，这便是数据驱动的另外一个场景。",-1),P=t("p",null,"总结一下，数据驱动本质上是可以利用参数化的功能来完成测试数据的数据驱动、测试步骤的数据驱动，还有全局配置的数据驱动。我们在测试中可能会遇到各种各样的全局配置，这些配置比如机器的 IP 地址跟域名的对应关系，可以放到一个配置文件里，通过外部数据源来进行驱动。",-1),D=t("p",null,"这就是数据驱动测试的几个常见的场景，测试数据的数据驱动、测试步骤的数据驱动以及全局配置的数据驱动，都与参数化有一定的关系。",-1),M=t("p",null,"那我们再来看下数据驱动的底层原理，首先是数据来源，来自 CSV、YAML、XML、DB、Excel、JSON 等各种数据结构，而数据本身需要脱离这个已有的测试框架，成为独立的外部数据源，当然你也可以使用 URL、文档配置。",-1),T=t("p",null,"那么在数据驱动过程中，一旦有了外部数据源，我们就需要管理数据，主要要两个办法，第一种，可以从数据源里读一个列表，用这个列表驱动测试用例的执行；还有一种办法是基于 Schema，基于定义好的模型使用 List 管理。",-1),C=t("p",null,"最后，通过参数化与数据完成关键数据的对接，比如从文件里读取的数据结构，结构里每一个字段与参数化的字段进行一一对应，这样就可以是吸纳数据驱动和参数化的结合。",-1),b=t("h3",{id:"数据格式的选择",tabindex:"-1"},[l("数据格式的选择 "),t("a",{class:"header-anchor",href:"#数据格式的选择","aria-label":'Permalink to "数据格式的选择"'},"​")],-1),E=t("p",null,"我们了解了数据驱动的原理，再来看下数据格式的选择，刚才我们提到了有非常多的数据格式的选择，那么这些数据格式之间有什么优缺点呢？如表格所示：",-1),q=t("p",null,"我们了解了数据驱动的原理，让我们来看一下数据格式的选择。刚才我们提到了有非常多的数据格式的选择，那么这些数据格式之间有什么优缺点呢？我画了一张表格。",-1),V=i("",15),L=t("p",null,"第一个是参数化的一个案例，这方面的代表是我们前面学习过的一个案例，你平时应该也有使用过，是一个简单的测试场景。",-1),S=t("p",null,"测试数据的数据驱动，我们可以使用 YAML 文件进行描述，YAML 支持非常精简的单行模式，也可以支持多行模式。下面的部分和上面的含义是一样的，都代表有三组数据，这三组数据里面，你可以把这些数据与参数化一一对应，就可以完成测试数据的数据驱动了。",-1),f=t("p",null,"测试步骤的数据驱动是什么格式呢？你可以看看这种格式，这个格式里定义了三个步骤，第一个步骤代表 ID 为 search_input_text 的控件，完成点击动作；第二个步骤是完成点击之后，需要对完成输入，如果其中有一部分步骤涉及变化的内容，可以通过一个变量来表示；第三个步骤是对 name 控件进行点击操作，这便是一个典型的测试步骤的数据驱动。",-1),U=t("p",null,"而如果你要从零开始打造的框架，你需要掌握这样几个技术：",-1),I=t("ul",null,[t("li",null,"模板替换。我们可以看到上面这里有一些数据，这些数据需要外面来进行参数化，进行变换，也就是你需要从已有的数据源里面进行替换，需要有一个模板替换。"),t("li",null,"变量引用。我们的变量，比如上个接口抓到的数据我希望用在下一个接口里，这个时候你需要变量在跨用例之间能够进行调用，所以就需要一个变量引用过程。"),t("li",null,"自定义扩展。有的时候，纯粹的驱动很难描述比较复杂的行为。对这些复杂的逻辑，我们可以自己编写对应的编程语言，实现好之后封装成一个简单的功能，供整个数据驱动框架来使用，这样就会简化描述相关事情。"),t("li",null,"最后，我们需要把所有的 xUnit 测试的核心概念来进行封装，比如用例怎么表达，套件怎么表达，执行、断言以及测试的装置。")],-1),w=t("p",null,"关于测试步骤的驱动，这有一个小的 Demo，你可以看一下。",-1),F=t("p",null,"这个小 Demo 里，其实是说它打开了一个文件，使用 YAML 格式读取文件所有内容。读完数据之后，可以看到里面有一个 List 列表，列表里有非常多的步骤，我们需要根据每一个步骤进行描述。",-1),J=t("p",null,"然后再看下行为，行为是操作一个控件，无论是获取控件的属性，还是对控件完成输入，这些都需要模板替换，所以需要一些简单的替换语句，完成对数据的动态化替换。",-1),R=t("p",null,"这是一个小 Demo，带你了解怎么编写一个数据驱动的小引擎，更完善的设计你可以参考 HttpRunner 框架，HttpRunner 是一个非常优雅的接口测试开源项目。这个醒目是一个面向 HTTP 协议的通用测试框架，你只需要维护一个 YAML/JSON 脚本，就可以完成自动化测试、性能测试等多种测试场景。",-1),N=t("p",null,'它的核心设计里面就是复用已有的开源项目，然后通过遵循"约定大于配置"的原则，整体通过配置决定大部分行为，然后就可以更高效的在公司内部应用。',-1),j=t("p",null,"这个项目的官方地址在 GitHub 上，你可以参考一下，了解它的核心源代码，这样你就可以知道怎么去打造一个基于参数化数据驱动的自定义测试框架了。",-1),k=t("p",null,"一旦有了数据驱动框架，我们就可以通过测试平台管理数据驱动的测试用例了。",-1);function O(H,X,Y,v,y,B){const e=a("Image");return o(),p("div",null,[c,s(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3E/CgqCHl7jVziAJ0lzAAFvDXMfeog843.png"}),r,h,d,u,g,A,s(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3E/CgqCHl7jV0WAKJZ1AAFUx7nI9Ag775.png"}),m,x,P,D,s(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV02AZo7bAAerLeDubAQ918.png"}),M,T,C,b,E,q,s(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV6iAMncfAAFDDfQs3Ko255.png"}),V,s(e,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV7SAGf0LAAJhbwfXysc748.png"}),L,s(e,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV7yAA2JYAAGnZcBJabw762.png"}),S,s(e,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV8OARvE5AAIYjDo4V9M713.png"}),f,U,I,s(e,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV8uAH7oGAALxaCZoWPw602.png"}),w,F,J,s(e,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV9KARU3bAAMUErE02XQ383.png"}),R,N,s(e,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV9iAT6RwAAKTFgg1sec348.png"}),j,k])}const Q=n(_,[["render",O]]);export{K as __pageData,Q as default};
