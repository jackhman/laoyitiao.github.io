import{_ as e,j as p,o as t,g as c,k as n,h as o,s,Q as l}from"./chunks/framework.4e7d56ce.js";const D=JSON.parse('{"title":"Ruby 工具链 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6654) 01  开发环境：如何使用 Ruby 工具链统一开发环境？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6654) 01  开发环境：如何使用 Ruby 工具链统一开发环境？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6654) 01  开发环境：如何使用 Ruby 工具链统一开发环境？.md"},i=l('<p>在 iOS 开发过程中，你是不是会经常遇到这些情况：</p><p>每次打开一个新项目，都需要手动搭建开发环境；有时候在安装第三方工具时使用到 sudo 权限，导致以后安装工具都需要手工输入密码而无法实施自动化。还有，每当启动一台新 CI 时，就需要手工登录并配置一遍，更可怕的是，原先搭建好的 CI 会随着 Xcode 版本更新需要重新配置。</p><p>为什么会这么麻烦呢？就是因为你在项目开始之初没有做好统一配置。</p><p>所谓统一配置，就是所有的配置信息都以文本的格式存放在 Git 里面，我们可以随时查看修改记录，以此来帮助我们比较不同配置之间的差异性，然后在这个基础上不断更新迭代。</p><p>可以说，有了统一配置，任何工程师都可以搭建出一模一样的开发环境，构建出功能一致的 App；有了统一配置，还可以让我们按需延展 CI 服务，而不用任何手工操作。更重要的是，它还可以应用到各个类似的 iOS 项目中，极大地减轻了项目前期的搭建成本。</p><p>既然统一的配置那么重要，那么我们怎样搭建统一配置的开发环境呢？</p><h3 id="ruby-工具链" tabindex="-1">Ruby 工具链 <a class="header-anchor" href="#ruby-工具链" aria-label="Permalink to &quot;Ruby 工具链&quot;">​</a></h3><p>我们可以通过 Ruby 工具链为整个项目搭建一致的开发和构建环境。为什么选择 Ruby 而不是其他语言环境呢？因为在 iOS 开发方面，目前流行的第三方工具 CocoaPods 和 fastlane 都是使用 Ruby 来开发的。特别是 Ruby 有非常成熟的依赖库管理工具 RubyGems 和 Bundler，其中 Bundler 可以帮我们有效地管理 CocoaPods 和 fastlane 的版本。</p><p>下面一起来看看怎样搭建一个统一的开发环境吧。</p>',9),y=l('<p>开发环境统一配置图</p><p>通常，统一的开发环境应该从操作系统开始。对于 iOS 开发来说，<strong>MacOS</strong> 是目前 iOS 开发唯一支持的操作系统。在公司，MacOS 的版本一般由 IT 部门统一管理和更新。要注意，当公司统一更新了我们开发环境的 MacOS 版本以后，需要同时更新 CI 上 MacOS 的版本，以保持一致。</p><h4 id="xcode" tabindex="-1">Xcode <a class="header-anchor" href="#xcode" aria-label="Permalink to &quot;Xcode&quot;">​</a></h4><p>位于 MacOS 上层的是 Xcode 和 rbenv。其中，<strong>Xcode</strong> 是 iOS 开发和构建工具，在同一个项目里，最好使用同一个版本的 Xcode 进行开发和构建，我们可以在项目的 README.md 文件标注 Xcode 的版本。</p><p>像我们将要开发的这款类似朋友圈的 Moments App 项目，我就在对应的 README.md 文件里标明了需要使用 Xcode Version 12.2 (12B45b)。具体内容你也可以在<a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/README.md" target="_blank" rel="noreferrer">代码仓库</a>找到。</p>',5),d=s("p",null,[o("那我们怎样才能保证每个人都安装同一个版本号的 Xcode 呢？技巧就是我们不要到有自动更新功能的 Mac App Store 中下载 Xcode，而是到"),s("a",{href:"https://developer.apple.com/download/more/",target:"_blank",rel:"noreferrer"},"苹果的开发者网站"),o("搜索并下载。")],-1),E=l(`<p>有时候我们会同时开发多个项目，这样有可能要安装多个不同版本的 Xcode。如果你的机器有多于一个版本的 Xcode，此时需要特别注意，为了保证所使用的编译器版本一致，在每次执行自动化命令之前（如执行<code>bundle exec fastlane test</code>），要先使用<code>xcode-select -s</code>来选择该项目所对应版本的 Xcode。</p><p>比如说我的电脑上有多个 Xcode 版本，在开发 Moments App 时，每次执行自动化命令之前都会执行这样一条命令<code>xcode-select -s /Applications/Xcode12.2.app/Contents/Developer</code>来选择 Moments App 项目所使用的 Xcode。这里的<code>Xcode12.2.app</code>就是我安装的 Xcode 12.2 版所在的位置。</p><h4 id="rbenv" tabindex="-1">rbenv <a class="header-anchor" href="#rbenv" aria-label="Permalink to &quot;rbenv&quot;">​</a></h4><p>有了版本一致的 Xcode 以后，因为后期我们会用到 CocoaPods 等第三方 Ruby 工具，为了自动化安装和管理这些工具，整个项目团队所使用的 Ruby 版本也必须保持一致。为此，我们就需要用到 Ruby 环境管理工具。</p><p>目前流行的 Ruby 环境管理工具有 RVM 和 rbenv。我推荐使用的是 rbenv，因为它使用 shims 文件夹来分离各个 Ruby 版本，相对于 RVM 更加轻装而方便使用。千万注意，团队内部不要同时使用不同的 Ruby 环境管理工具，否则项目编译会出错。</p><p><strong>rbenv</strong> 是 Ruby 环境管理工具，能够安装、管理、隔离以及在多个 Ruby 版本之间切换。要使用 rbenv，我们可以通过 Homebrew 来安装它，下面是安装 Homebrew 和 rbenv 的脚本。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bash </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">brew install rbenv ruby</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">build rbenv</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">vars</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bash </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)&quot;</span></span>
<span class="line"><span style="color:#24292E;">brew install rbenv ruby</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">build rbenv</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">vars</span></span></code></pre></div><p>一旦安装 rbenv 完毕，我们需要把以下的设置信息放到你的 Shell 配置文件里面，例如 ~/.bash_profile 或者 ~/.zshrc 等文件，这样能保证每次打开终端的时候都会初始化 rbenv。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export PATH</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;$HOME/.rbenv/bin:$PATH&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">eval </span><span style="color:#9ECBFF;">&quot;$(rbenv init -)&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export PATH</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;$HOME/.rbenv/bin:$PATH&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">eval </span><span style="color:#032F62;">&quot;$(rbenv init -)&quot;</span></span></code></pre></div><p>接着我们就可以安装和设置项目的 Ruby 环境了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ cd </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(PROJECT_DIR)</span></span>
<span class="line"><span style="color:#E1E4E8;">$ rbenv install </span><span style="color:#79B8FF;">2.7</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">$ rbenv local </span><span style="color:#79B8FF;">2.7</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ cd </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(PROJECT_DIR)</span></span>
<span class="line"><span style="color:#24292E;">$ rbenv install </span><span style="color:#005CC5;">2.7</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">1</span></span>
<span class="line"><span style="color:#24292E;">$ rbenv local </span><span style="color:#005CC5;">2.7</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">1</span></span></code></pre></div><p>此处是把项目的 Ruby 环境配置为 2.7.1 版本。rbenv 会帮我们建立 一个叫作.<strong>ruby-version</strong> 的文件，该文件里面只保存一个版本号（例如<code>2.7.1</code>）的字符串。这个包含了版本号的文件可以用 Git 进行管理。如果要更新版本，可以通过<code>rbenv local</code>命令进行，每次更新也由 Git 统一管理，这样就能让其他开发者使用同一版本的 Ruby 开发环境了。</p><h4 id="rubygems-和-bundler" tabindex="-1">RubyGems 和 Bundler <a class="header-anchor" href="#rubygems-和-bundler" aria-label="Permalink to &quot;RubyGems 和 Bundler&quot;">​</a></h4><p>RubyGems 和 Bundler 主要是用来安装和管理 CocoaPods 和 fastlane 等第三方工具。</p><p>具体来说，RubyGems 是 Ruby 依赖包管理工具。在 Ruby 的世界，包叫作 Gem，我们可以通过<code>gem install</code>命令来安装。但是 RubyGems 在管理 Gem 版本的时候有些缺陷，就有人开发了 Bundler，用它来检查和安装 Gem 的特定版本，以此为 Ruby 项目提供一致性的环境。</p><p>要安装 Bundler，我们可执行<code>gem install bundler</code>命令进行，之后，再执行<code>bundle init</code>就可以生成一个 Gemfile 文件，像 CocoaPods 和 fastlane 等依赖包，我们就可以添加到这个文件里面。</p><p>具体代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">source </span><span style="color:#9ECBFF;">&quot;https://rubygems.org&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">gem </span><span style="color:#9ECBFF;">&quot;cocoapods&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;1.10.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">gem </span><span style="color:#9ECBFF;">&quot;fastlane&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;2.166.0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">source </span><span style="color:#032F62;">&quot;https://rubygems.org&quot;</span></span>
<span class="line"><span style="color:#24292E;">gem </span><span style="color:#032F62;">&quot;cocoapods&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;1.10.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">gem </span><span style="color:#032F62;">&quot;fastlane&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;2.166.0&quot;</span></span></code></pre></div><p>注意我们在<code>gem</code>命令里面都指定了依赖包的特定版本号。例如，在我们的 Moment App 就使用了<code>1.10.0</code>版的 CocoaPods，然后执行<code>bundle install</code>来安装各个 Gem。 Bundler 会自动生成一个 Gemfile.lock 文件来锁定所安装的 Gem 的版本，例如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">DEPENDENCIES</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">cocoapods</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.10</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">fastlane</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2.166</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">DEPENDENCIES</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">cocoapods</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.10</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">fastlane</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2.166</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">)</span></span></code></pre></div><p>为了保证团队其他成员都可以使用版本号一致的 Gem，我们需要把 Gemfile 和 Gemfile.lock 一同保存到 Git 里面统一管理起来。</p><p>到此为止，我们已经知道怎样使用 Ruby 工具链配置一个统一的开发环境。但在真实的开发环境中，搭建环境只需要一个人来完成即可，其他成员执行以下脚本就能完成整套开发环境的搭建。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">scripts</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">setup.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">scripts</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">setup.sh</span></span></code></pre></div><p>我们一起看看这个脚本做了些什么？</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># Install ruby using rbenv</span></span>
<span class="line"><span style="color:#E1E4E8;">ruby_version</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\`cat .ruby</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">version\`</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [[ </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d </span><span style="color:#9ECBFF;">&quot;$HOME/.rbenv/versions/$ruby_version&quot;</span><span style="color:#E1E4E8;"> ]]; then</span></span>
<span class="line"><span style="color:#E1E4E8;">  rbenv install $ruby_version;</span></span>
<span class="line"><span style="color:#E1E4E8;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;"># Install bunlder</span></span>
<span class="line"><span style="color:#E1E4E8;">gem install bundler</span></span>
<span class="line"><span style="color:#E1E4E8;"># Install all gems</span></span>
<span class="line"><span style="color:#E1E4E8;">bundle install</span></span>
<span class="line"><span style="color:#E1E4E8;"># Install all pods</span></span>
<span class="line"><span style="color:#E1E4E8;">bundle exec pod install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># Install ruby using rbenv</span></span>
<span class="line"><span style="color:#24292E;">ruby_version</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\`cat .ruby</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">version\`</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [[ </span><span style="color:#D73A49;">!</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d </span><span style="color:#032F62;">&quot;$HOME/.rbenv/versions/$ruby_version&quot;</span><span style="color:#24292E;"> ]]; then</span></span>
<span class="line"><span style="color:#24292E;">  rbenv install $ruby_version;</span></span>
<span class="line"><span style="color:#24292E;">fi</span></span>
<span class="line"><span style="color:#24292E;"># Install bunlder</span></span>
<span class="line"><span style="color:#24292E;">gem install bundler</span></span>
<span class="line"><span style="color:#24292E;"># Install all gems</span></span>
<span class="line"><span style="color:#24292E;">bundle install</span></span>
<span class="line"><span style="color:#24292E;"># Install all pods</span></span>
<span class="line"><span style="color:#24292E;">bundle exec pod install</span></span></code></pre></div><p>该脚本主要做了四件事情，第一步是在 rbenv 下安装特定版本的 Ruby 开发环境，然后通过 RubyGems 安装 Bunlder，接着使用 Bundler 安装 CocoaPods 和 fastlane 等依赖包，最后安装各个 Pod。这样，一个统一的项目环境就搭建完成了，接下来开发者就可以打开 <strong>Moments.xcworkspace</strong>进行开发了。</p><p>说完 Ruby 环境搭建以后，最后我们一起聊聊保证项目文件一致性的 .gitignore 文件。</p><h3 id="gitignore-文件" tabindex="-1">.gitignore 文件 <a class="header-anchor" href="#gitignore-文件" aria-label="Permalink to &quot;.gitignore 文件&quot;">​</a></h3><p>.gitignore 文件是一个配置文件，用来指定让 Git 需要忽略的文件或者目录。如果没有 .gitignore 文件，项目成员可能会不小心把一些自动生成等无关重要的文件或者具有个人信息(例如 xcuserdata)的文件保存到 Git 里面。这就大大增加了查看 Git 修改历史的难度。因此，在项目初期就配置一个合适的 .gitignore 文件，能减轻后续的管理工作。</p><p>如何创建 .gitignore 文件呢？</p><p>我一般会在 gitignore.io 里面输入关键字，例如 Xcode，Swift 等，然后该网站会帮我们生成一个默认的 .gitignore 文件。咱们项目 Moments App 的.gitignore 文件你可以到<a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/.gitignore" target="_blank" rel="noreferrer">拉勾教育的仓库中</a>查看。</p>`,31),u=s("h3",{id:"总结",tabindex:"-1"},[o("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),b=s("p",null,"以上，我们通过 Xcode、rbenv、RubyGems 和 Bundler 搭建一个统一的 iOS 开发和构建环境。",-1),g=l('<p>再次强调下，为了让各个开发和构建环境能保持一致，我们要把 .ruby-version、 Gemfile 和 Gemfile.lock 文件通过 Git 统一管理起来，并共享给整个项目团队使用。</p><p>而且，由于我们的开发环境已经通过 Bundler 管理起来，今后，当使用各个 Gem 工具的时候，也需要使用 Bundler。例如在使用 CocoaPods 时要执行<code>bundle exec pod</code>，以保证我们使用的是项目级别而不是操作系统级别的 Gem 工具。</p><p>思考题：</p><blockquote><p>请问如果我们不使用 rbenv ，那我们使用的 Ruby 来自哪里？使用 CocoaPods 等工具又来自哪里？不同项目能使用不同版本的 CocoaPods 吗？</p></blockquote><p>你可以把回答写到下面的留言区哦，下一讲我将介绍如何使用 CocoaPods 统一依赖库的管理。</p><p>源码地址：</p><blockquote><p>README.md<br><a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/README.md" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/blob/main/README.md</a></p><p>Moments App 的.gitignore 文件<br><a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/.gitignore" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/blob/main/.gitignore</a></p></blockquote><hr>',8),h={href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},_=s("p",null,[s("strong",null,"《大前端高薪训练营》")],-1),m=s("p",null,[o("12 个月打磨，6 个月训练，优秀学员大厂内推，"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击报名，高薪有你"),o("！")],-1);function v(A,C,F,f,k,q){const a=p("Image");return t(),c("div",null,[i,n(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/0A/3D/Cgp9HWA3F9SAPGu_AALEFvdRBzw539.png"}),o(),y,n(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/0A/3D/Cgp9HWA3GA-AYvZfAAND2HpeMGs775.png"}),d,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/0A/39/CioPOWA3F5OAUokNAARwNdiYhbs294.png"}),E,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/08/75/CioPOWA0xDCALL3FAABG42Ok7aU292.png"}),u,b,n(a,{alt:"开发环境.png",src:"https://s0.lgstatic.com/i/image6/M01/0A/39/CioPOWA3FsqAOn0YAAq1IyqbxEs043.png"}),g,s("p",null,[s("a",h,[n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/08/77/Cgp9HWA0wqWAI70NAAdqMM6w3z0673.png"})])]),_,m])}const B=e(r,[["render",v]]);export{D as __pageData,B as default};
