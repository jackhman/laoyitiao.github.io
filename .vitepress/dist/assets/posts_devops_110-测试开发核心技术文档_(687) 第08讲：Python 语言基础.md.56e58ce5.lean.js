import{_ as a,j as l,o as e,g as h,k as s,h as o,Q as p,s as t}from"./chunks/framework.4e7d56ce.js";const j=JSON.parse('{"title":"第08讲：Python语言基础","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(687) 第08讲：Python 语言基础.md","filePath":"posts/devops/110-测试开发核心技术文档/(687) 第08讲：Python 语言基础.md","lastUpdated":1696417798000}'),i={name:"posts/devops/110-测试开发核心技术文档/(687) 第08讲：Python 语言基础.md"},r=p("",11),c=t("p",null,"比如输入 pyenv install -l 指令，可以打印出 Python 的所有版本。你可以选择自己感兴趣的版本进行安装，还可以通过工具对 Python 进行管理，你可以看到列表中包含了 Python 的所有变种版本和原生版本。",-1),_=t("p",null,"安装完成之后，可以通过前面课时讲过的 PATH 变量来切换不同的 Python 环境，还可以通过 pyenv local 与 global 命令来实现同样的效果。",-1),y=t("p",null,"除此之外，Python 还有一个特别重要的知识点叫作虚拟环境，用以达到环境隔离的目的。当我们在使用 Python 时，因为项目中不同的组件依赖的版本可能不同，这时就需要我们在不同的环境与不同的项目之间进行隔离。如果它们都共用一套 Python 环境，就可能会相互影响。Python 提供的虚拟环境叫作 VirtualEnv，它允许我们创建一套隔离环境，在隔离环境中配置 Python 相关的依赖库，所以你可以使用 VirtualEnv 来创建属于自己的虚拟环境，有了虚拟环境后就不会影响到本地的 Python 环境了。",-1),g=t("h6",{id:"通过指令新建项目",tabindex:"-1"},[o("通过指令新建项目 "),t("a",{class:"header-anchor",href:"#通过指令新建项目","aria-label":'Permalink to "通过指令新建项目"'},"​")],-1),d=t("p",null,"接下来，我们来新建一个项目，首先从简单的命令入手，最后再切换到 IDE。",-1),P=t("p",null,"输入 python 指令，会自动进入 Python 环境，你可以看到这个环境是一个交互式的环境，在这个环境中你可以运行 Python 的相关语法。",-1),m=t("p",null,"比如随便输入 2*3、5/2，你可以看到在这里输出了正确的结果。",-1),A=t("p",null,'你还可以输入 print("hello wolrd")，简单打印 hello world。',-1),u=t("p",null,"可以使用 Ctrl + D 组合键退出 Python 环境。",-1),C=t("p",null,'你还可以编写一个 Python 脚本，比如输入 vim /tmp/1.python 创建脚本，并在脚本中输入 print("hello world")，保存之后输入 python /tmp/1.py 运行它，你可以看到输出了 hello world，但这种模式非常低效，我们平时并不会经常使用。',-1),F=t("h6",{id:"使用-pycharm-新建项目",tabindex:"-1"},[o("使用 PyCharm 新建项目 "),t("a",{class:"header-anchor",href:"#使用-pycharm-新建项目","aria-label":'Permalink to "使用 PyCharm 新建项目"'},"​")],-1),E=t("p",null,"平时工作中我们更多使用的是一个叫作 PyCharm 的 IDE 工具来创建项目，PyCharm 可以让我们更好地获得 Python 的综合开发环境。",-1),D=t("p",null,"首先我们打开 PyCharm，你可以看到左侧是你创建的项目，右侧是项目的管理入口，比如现在我们创建一个自己的项目，点击 New Project。",-1),x=t("p",null,"你会发现地址栏会自动生成一个路径，我们起个简单的名字，比如叫作 LagouTesting，一个属于 Lagou 的测试开发项目。",-1),I=t("p",null,"点击地址栏下面的箭头展开信息，你可以看到默认使用的是 Virtualenv，当然其他本版也各有不同，Virtualenv 会在你的项目下面自动创建一个 venv 的子目录，这个目录下会自动配置你的 Python 和相应的依赖库。",-1),f=t("p",null,"然后点击 Create 键就可以了，其他的都不用管，这时就创建了一个崭新的开发环境，在这个环境中我们可以看到 IDE 的所有功能都是具备的。",-1),v=t("p",null,"接下来，我们创建一个 Python 文件，命名为 demo，然后就可以在文件中编写 Python 的相关代码了。",-1),M=t("p",null,"比如输入 print，它后面会跟一些相关的代码提示。",-1),U=t("p",null,"写完之后点击鼠标右键，然后再点击 Run，你就可以运行程序了，后面我们所有的演练都会在这个项目中进行。",-1),b=t("p",null,"除此之外，我们可能会遇到一些特殊情况需要添加依赖库，这时便可以在项目设置中进行添加，目前默认使用的是 pip 和 setuptools 工具，如果你想增加一些第三方库，可以在搜索栏中进行搜索，搜索完成之后添加到项目中，此时加载速度比较慢是因为大部分三方库的服务器都在海外，如果你想加载更快一些可以把豆瓣和阿里云的镜像添加进去，这样安装速度就会快很多。",-1),k=t("br",null,null,-1);function q(w,B,O,S,T,V){const n=l("Image");return e(),h("div",null,[r,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/CgpOIF3yFUGAdG7_AAGSzbPs2f4283.png"}),o(),c,_,y,g,d,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUKAUjILAAEtlT3HPd4840.png"}),o(),P,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/CgpOIF3yFUKAe9hlAAERa_mHK8U085.png"}),o(),m,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUKAIZcBAAESetMPBRY569.png"}),o(),A,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/CgpOIF3yFUKAUhveAAETkY6kkuc074.png"}),o(),u,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUOAdNz_AAD2Bbjx_l8240.png"}),o(),C,F,E,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUOAQvRpAAGUkmgkCsk774.png"}),o(),D,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/CgpOIF3yFUOAB3w0AAB_gFtBIf4241.png"}),o(),x,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUOASgthAAFBA4li-0E528.png"}),o(),I,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/CgpOIF3yFUSAQMjVAAHQju3q3j8012.png"}),o(),f,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUSAIYN7AAK6APzE9OI273.png"}),o(),v,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/CgpOIF3yFUSAAXigAAJRbdjkNAE937.png"}),o(),M,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2D/Cgq2xl3yFUSAI_-4AAMxl3nPLDM522.png"}),o(),U,s(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/57/2E/Cgq2xl3yFu6AZIKCAAIOJYWXuQA156.png"}),o(),b,k])}const K=a(i,[["render",q]]);export{j as __pageData,K as default};
