import{_ as p,j as t,o as l,g as c,k as a,h as n,Q as o,s}from"./chunks/framework.4e7d56ce.js";const ns=JSON.parse('{"title":"03配置准备：如何搭建多环境支持，为App开发作准备","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6656) 03  配置准备：如何搭建多环境支持，为 App 开发作准备.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6656) 03  配置准备：如何搭建多环境支持，为 App 开发作准备.md","lastUpdated":1696417798000}'),i={name:"posts/frontEnd/048_iOS开发进阶/(6656) 03  配置准备：如何搭建多环境支持，为 App 开发作准备.md"},r=o("",11),d=s("h4",{id:"xcode-target",tabindex:"-1"},[n("Xcode Target "),s("a",{class:"header-anchor",href:"#xcode-target","aria-label":'Permalink to "Xcode Target"'},"​")],-1),g=s("p",null,[s("strong",null,"Xcode Target"),n("用来定义如何构建出一个产品（例如 App， Extension 或者 Framework），Target 可以指定需要编译的源代码文件和需要打包的资源文件，以及构建过程中的步骤。")],-1),E=s("p",null,[n("例如在我们的 Moments App 项目中，负责单元测试的"),s("strong",null,"MomentsTests"),n(" Target 就指定了 14 个测试文件需要构建（见下图的 Compile Sources），并且该 Target 依赖了主 App Target"),s("strong",null,"Moments"),n("（见下图的 Dependencies）。")],-1),u=s("p",null,"有了 Target 的定义，构建系统就可以读取相关的源代码文件进行编译，然后把相关的资源文件进行打包，并严格按照 Target 所指定的设置和步骤执行。那么 Target 所指定的设置哪里来的呢？来自 Build Settings。",-1),h=s("h4",{id:"build-settings",tabindex:"-1"},[n("Build Settings "),s("a",{class:"header-anchor",href:"#build-settings","aria-label":'Permalink to "Build Settings"'},"​")],-1),_=s("p",null,[s("strong",null,"Build Setting"),n("保存了构建过程中需要用到的信息，它以一个变量的形式而存在，例如所支持的设备平台，或者支持操作系统的最低版本等。")],-1),y=s("p",null,[n("通常，一条 Build Setting 信息由两部分组成：名字和值。比如下面是一条 Setting 信息，"),s("code",null,"iOS Development Target"),n("是名字，而"),s("code",null,"iOS 14.0"),n("是值。")],-1),A=o("",5),m=s("p",null,"那什么是 Build Configuration 呢？",-1),T=s("p",null,[s("strong",null,"Build Configuration"),n("就是一组 Build Setting。 我们可以通过 Build Configuration 来分组和管理不同组合的 Build Setting 集合，然后传递给 Xcode 构建系统进行编译。")],-1),S=s("p",null,[n("有了 Build Configuration 以后，我们就能为同一个 Build Setting 设置不同的值。例如"),s("code",null,"Build Active Architecture Only"),n("在 Debug configuration 是"),s("code",null,"Yes"),n("，而在 Internal 和 AppStore configuration 则是"),s("code",null,"No"),n("。这样就能做到同一份源代码通过使用不同的 Build Configuration 来构建出功能不一样的 App 了。")],-1),C=s("p",null,"那么，在构建过程中怎样才能选择不同的 Build Configuration 呢？答案是使用 Xcode Scheme。",-1),f=s("h4",{id:"xcode-scheme",tabindex:"-1"},[n("Xcode Scheme "),s("a",{class:"header-anchor",href:"#xcode-scheme","aria-label":'Permalink to "Xcode Scheme"'},"​")],-1),F=s("p",null,[s("strong",null,"Xcode Scheme"),n("用于定义一个完整的构建过程，其包括指定哪些 Target 需要进行构建，构建过程中使用了哪个 Build Configuration ，以及需要执行哪些测试案例等等。在项目新建的时候只有一个 Scheme，但可以为同一个项目建立多个 Scheme。不过这么多 Scheme 中，同一时刻只能有一个 Scheme 生效。")],-1),D=s("p",null,"我们一起看一下 Moments App 项目的 Scheme 吧。 Moments App 项目有三个 Scheme 来分别代表三个环境，Moments Scheme 用于开发环境，Moments-Internal Scheme 用于测试环境，而 Moments-AppStore Scheme 用于生产环境。",-1),v=s("p",null,[n("下面是"),s("strong",null,"Moments"),n("Scheme 的配置。")],-1),I=s("p",null,[n("左边是该 Scheme 的各个操作，如当前选择了 Build 操作；右边是对应该操作的配置，比如 Build 对应的 Scheme 可以构建三个不同的 Targets。不同的 Scheme 所构建的 Target 数量可以不一样，例如下面是"),s("strong",null,"Moments-Internal"),n("Scheme 的配置。")],-1),B=s("p",null,[n("该 Scheme 只构建主 App Target"),s("strong",null,"Moments"),n("，而不能构建其他两个测试 Target。")],-1),P=s("p",null,[n("当我们选择 Run、Test、Profile、 Analyze 和 Archive 等操作时，在右栏有一个很关键的配置 "),s("s",null,"是"),n("叫作 Build Configuration，我们可以通过下拉框来选择 Moments App 项目里面三个 Configuration （Debug，Internal 和 AppStore） 中的其中一个。")],-1),b=s("p",null,"为了方便管理，我们通常的做法是，一个 Scheme 对应一个 Configuration。有了这三个 Scheme 以后，我们就可以很方便地构建出 Moments α（开发环境），Moments β（测试环境）和 Moments（生产环境）三个功能差异的 App。",-1),M=s("p",null,"￼",-1),N=s("p",null,[n("你可能已经注意到这三个 App 的名字都不一样，怎么做到的呢？实际上是我们为不同的 Configuration 设置了不一样的 Build Setting。其中决定 App 名字的 Build Setting 叫作"),s("code",null,"PRODUCT_BUNDLE_NAME"),n("，然后在 Info.plist 文件里面为 Bundle name 赋值，就能构建出名字不一样的 App。")],-1),O=s("p",null,"为了构建出不同环境版本的 App，我们需要经常为各个 Build Configuration 下的 Build Setting 设置不一样的值。 在这其中，使用好 xcconfig 配置文件就显得非常重要。",-1),x=s("h3",{id:"xcconfig-配置文件",tabindex:"-1"},[n("xcconfig 配置文件 "),s("a",{class:"header-anchor",href:"#xcconfig-配置文件","aria-label":'Permalink to "xcconfig 配置文件"'},"​")],-1),k=s("p",null,"xcconfig 会起到什么作用呢？",-1),q=s("p",null,"一般修改 Build Setting 的办法是在 Xcode 的 Build Settings 界面上进行。 例如下面的例子中修改 Suppress Warnings。",-1),R=s("p",null,"这样做有一些不好的地方，首先是手工修改很容易出错，例如有时候很难看出来修改的 Setting 到底是 Project 级别的还是 Target 级别的。其次，最关键的是每次修改完毕以后都会修改了 xcodeproj 项目文档 （如下图所示），导致 Git 历史很难查看和对比。",-1),j=o("",24),U=o("",30),L=s("p",null,"下面是所有 Configurations 所引用的 xcconfig 文件。",-1),W=s("p",null,[n("在配置好所有 xcconfig 文件的引用以后，可以在 Build Settings 页面查看某个 Build Setting 的生效值。我们以"),s("code",null,"IPHONEOS_DEPLOYMENT_TARGET"),n("为例，一起看看。")],-1),V=o("",5),X=o("",10),H=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),n(")")],-1),w=s("p",null,[s("strong",null,"《大前端高薪训练营》")],-1),$=s("p",null,[n("12 个月打磨，6 个月训练，优秀学员大厂内推，"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击报名，高薪有你"),n("！")],-1);function G(Y,K,J,Q,z,Z){const e=t("Image");return l(),c("div",null,[r,a(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9Eb2ARf3OAAK1tf7-bjM651.png"}),n(),d,g,E,a(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9EciAH1boAAaiePlJeSA718.png"}),n(),u,h,_,y,a(e,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9Ed2ACeq0AAKM_xm8xxI584.png"}),n(),A,a(e,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/0F/CioPOWA9EfSAY2OBAALUPeNgNGQ665.png"}),n(),m,T,S,a(e,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9EfyAVTM7AAPlUPRPHoQ921.png"}),n(),C,f,F,D,a(e,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/0F/CioPOWA9EgeAYsQhAAy86ZVIPDY023.png"}),n(),v,a(e,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9Eg6AF5o_AA7dS4NRt4E058.png"}),n(),I,a(e,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9EheABikxAA6wBftOxsw011.png"}),n(),B,P,a(e,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9Eh-AcgcJABDw5Uj21A0457.png"}),n(),b,M,a(e,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9EiqAFjzxAA135y-7y-8462.png"}),n(),N,a(e,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/12/Cgp9HWA9EjyAJgqrAAsJppbAhkc094.png"}),n(),O,x,k,q,a(e,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/0F/CioPOWA9EkaAcmKDAAScwhg-YKw659.png"}),n(),R,a(e,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/0F/CioPOWA9ElCAUe6vAAfIFrFWo48879.png"}),n(),j,a(e,{alt:"Drawing 27.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/12/Cgp9HWA9EmOAPIq1ABD7ml3cabY856.png"}),n(),U,a(e,{alt:"Drawing 29.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/12/Cgp9HWA9EnyAOX4GABH86gYqfAc683.png"}),n(),L,a(e,{alt:"Drawing 31.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/12/Cgp9HWA9EoSARVwGAAZ4k9BLebE007.png"}),n(),W,a(e,{alt:"Drawing 33.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/0F/CioPOWA9EoyAfB15AAMBWeDhWeI967.png"}),n(),V,a(e,{alt:"Drawing 34.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/12/Cgp9HWA9EpaASYdnAAaN1YenVoI219.png"}),n(),X,a(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/08/77/Cgp9HWA0wqWAI70NAAdqMM6w3z0673.png"}),n(),H,w,$])}const es=p(i,[["render",G]]);export{ns as __pageData,es as default};
