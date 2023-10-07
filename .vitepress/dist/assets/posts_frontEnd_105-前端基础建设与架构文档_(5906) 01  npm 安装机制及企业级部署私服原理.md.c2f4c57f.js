import{_ as l,j as e,o as t,g as c,k as a,h as n,Q as o,s}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"01npm安装机制及企业级部署私服原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5906) 01  npm 安装机制及企业级部署私服原理.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5906) 01  npm 安装机制及企业级部署私服原理.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/105-前端基础建设与架构文档/(5906) 01  npm 安装机制及企业级部署私服原理.md"},i=o('<h1 id="_01npm安装机制及企业级部署私服原理" tabindex="-1">01npm安装机制及企业级部署私服原理 <a class="header-anchor" href="#_01npm安装机制及企业级部署私服原理" aria-label="Permalink to &quot;01npm安装机制及企业级部署私服原理&quot;">​</a></h1><p>前端工程化离不开 npm（node package manager） 或者 Yarn 这些管理工具。npm 或 Yarn 在工程项目中，除了负责依赖的安装和维护以外，还能通过 npm scripts 串联起各个职能部分，让独立的环节自动运转起来。</p><p>无论是 npm 还是 Yarn，它们的体系都非常庞大，在使用过程中你很可能产生如下疑问：</p><ul><li><p>项目依赖出现问题时，删除大法好，即删除 node_modules 和 lockfiles，再重新 install，这样操作是否存在风险？</p></li><li><p>把所有依赖都安装到 dependencies 中，不区分 devDependencies 会有问题吗？</p></li><li><p>我们的应用依赖了公共库 A 和公共库 B，同时公共库 A 也依赖了公共库 B，那么公共库 B 会被多次安装或重复打包吗？</p></li><li><p>一个项目中，既有人用 npm，也有人用 Yarn，这会引发什么问题？</p></li><li><p>我们是否应该提交 lockfiles 文件到项目仓库呢？</p></li></ul><p>接下来的 01 ~ 03 讲我们就进一步聊一聊这些问题！</p><h3 id="npm-内部机制和核心原理" tabindex="-1">npm 内部机制和核心原理 <a class="header-anchor" href="#npm-内部机制和核心原理" aria-label="Permalink to &quot;npm 内部机制和核心原理&quot;">​</a></h3><p>我们先来看看 npm 的核心目标：</p><blockquote><p>Bring the best of open source to you, your team and your company.</p><p>给你和你的团队、你的公司带来最好的开源库和依赖。</p></blockquote><p>通过这句话，我们可以知道 npm 最重要的一环是安装和维护依赖。在平时开发中，&quot;<strong>删除 node_modules，重新 npm install</strong>&quot;是一个百试不爽的解决 npm 安装类问题的方法。但是其中的作用原理是什么？这样的操作是否规范呢？</p><p>这一讲，我们就先从 npm 内部机制出发来剖析此类问题。了解完安装机制和原理，我相信你对于工程中依赖的问题，将有一个更加体系化的认知。</p><h4 id="npm-的安装机制和背后思想" tabindex="-1">npm 的安装机制和背后思想 <a class="header-anchor" href="#npm-的安装机制和背后思想" aria-label="Permalink to &quot;npm 的安装机制和背后思想&quot;">​</a></h4><p>npm 的安装机制非常值得探究。Ruby 的 Gem、Python 的 pip 都是全局安装，但是 npm 的安装机制秉承了不同的设计哲学。</p><p>它会优先安装依赖包到当前项目目录，使得不同应用项目的依赖各成体系，同时还减轻了包作者的 API 兼容性压力，<strong>但这样做的缺陷也很明显</strong> ：如果我们的项目 A 和项目 B，都依赖了相同的公共库 C，那么公共库 C 一般都会在项目 A 和项目 B 中，各被安装一次。这就说明，<strong>同一个依赖包可能在我们的电脑上进行多次安装</strong>。</p><p>当然，对于一些工具模块比如 supervisor 和 gulp，你仍然可以使用全局安装模式，这样方便注册 path 环境变量，我们可以在任何地方直接使用 supervisor、 gulp 这些命令。（不过，一般还是建议不同项目维护自己局部的 gulp 开发工具以适配不同项目需求。）</p><p>下面，言归正传，我们通过流程图来分析 npm install 的安装机制。</p>',15),E=o('<p>npm install 安装流程图</p><p>npm install 执行之后，首先，检查并获取 npm 配置，<strong>这里的优先级为：项目级的 .npmrc 文件 &gt; 用户级的 .npmrc 文件&gt; 全局级的 .npmrc 文件 &gt; npm 内置的 .npmrc 文件</strong>。</p><p>然后检查项目中是否有 package-lock.json 文件。</p><p>如果有，则检查 package-lock.json 和 package.json 中声明的依赖是否一致：</p><ul><li><p>一致，直接使用 package-lock.json 中的信息，从缓存或网络资源中加载依赖；</p></li><li><p>不一致，按照 npm 版本进行处理（不同 npm 版本处理会有不同，具体处理方式如图所示）。</p></li></ul><p>如果没有，则根据 package.json 递归构建依赖树。然后按照构建好的依赖树下载完整的依赖资源，在下载时就会检查是否存在相关资源缓存：</p><ul><li><p>存在，则将缓存内容解压到 node_modules 中；</p></li><li><p>否则就先从 npm 远程仓库下载包，校验包的完整性，并添加到缓存，同时解压到 node_modules。</p></li></ul><p>最后生成 package-lock.json。</p><p>构建依赖树时，当前依赖项目不管其是直接依赖还是子依赖的依赖，都应该按照扁平化原则，优先将其放置在 node_modules 根目录（最新版本 npm 规范）。在这个过程中，遇到相同模块就判断已放置在依赖树中的模块版本是否符合新模块的版本范围，如果符合则跳过；不符合则在当前模块的 node_modules 下放置该模块（最新版本 npm 规范）。</p><p>我给出的流程图中有标注更细节的内容，这里就不再赘述了。<strong>你要格外注意图中标明的 npm 不同版本的不同处理情况，并学会从这种&quot;历史问题&quot;中总结 npm 使用的团队最佳实践：同一个项目团队，应该保证 npm 版本的一致</strong>。</p><p>前端工程中，依赖嵌套依赖，一个中型项目中 node_moduels 安装包可能就已经是海量的了。如果安装包每次都通过网络下载获取，无疑会增加安装时间成本。对于这个问题，<strong>缓存</strong>始终是一个好的解决思路，我们接下来看看 npm 自己的缓存机制。</p><h4 id="npm-缓存机制" tabindex="-1">npm 缓存机制 <a class="header-anchor" href="#npm-缓存机制" aria-label="Permalink to &quot;npm 缓存机制&quot;">​</a></h4><p><strong>对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计</strong>。使用时要先执行以下命令：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm config get cache</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm config get cache</span></span></code></pre></div><p>得到配置缓存的根目录在 /Users/cehou/.npm（ Mac OS 中，npm 默认的缓存位置） 当中。我们 cd 进入 /Users/cehou/.npm 中可以发现<code>_cacache</code>文件。事实上，在 npm v5 版本之后，缓存数据均放在根目录中的<code>_cacache</code>文件夹中。</p>',15),y=o(`<p>（<code>_cacache</code>文件）</p><p>我们可以使用以下命令清除 /Users/cehou/.npm/_cacache 中的文件：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> npm cache clean --force</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> npm cache clean --force</span></span></code></pre></div><blockquote><p>你可以点击<a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank" rel="noreferrer">这里</a>看看其中对应的 npm 源码。</p></blockquote><p>接下来打开<code>_cacache</code>文件，看看 npm 缓存了哪些东西，一共有 3 个目录：</p><ul><li><p>content-v2</p></li><li><p>index-v5</p></li><li><p>tmp</p></li></ul><p>其中 content-v2 里面基本都是一些二进制文件。为了使这些二进制文件可读，我们把二进制文件的扩展名改为 .tgz，然后进行解压，得到的结果其实就是我们的 npm 包资源。</p><p>而 index-v5 文件中，我们采用跟刚刚一样的操作就可以获得一些描述性的文件，事实上这些内容就是 content-v2 里文件的索引。</p><p>这些缓存如何被储存并被利用的呢？</p><p>这就和 npm install 机制联系在了一起。当 npm install 执行时，通过<a href="https://www.npmjs.com/package/pacote" target="_blank" rel="noreferrer">pacote</a>把相应的包解压在对应的 node_modules 下面。npm 在下载依赖时，先下载到缓存当中，再解压到项目 node_modules 下。pacote 依赖<a href="https://github.com/npm/npm-registry-fetch#npm-registry-fetch" target="_blank" rel="noreferrer">npm-registry-fetch</a>来下载包，npm-registry-fetch 可以通过设置 cache 属性，在给定的路径下根据<a href="https://datatracker.ietf.org/doc/rfc7234/" target="_blank" rel="noreferrer">IETF RFC 7234</a>生成缓存数据。</p><p>接着，在每次安装资源时，根据 package-lock.json 中存储的 integrity、version、name 信息生成一个唯一的 key，这个 key 能够对应到 index-v5 目录下的缓存记录。如果发现有缓存资源，就会找到 tar 包的 hash，根据 hash 再去找缓存的 tar 包，并再次通过<a href="https://www.npmjs.com/package/pacote" target="_blank" rel="noreferrer">pacote</a>把对应的二进制文件解压到相应的项目 node_modules 下面，省去了网络下载资源的开销。</p><p><strong>注意，这里提到的缓存策略是从 npm v5 版本开始的。在 npm v5 版本之前，每个缓存的模块在 ~/.npm 文件夹中以模块名的形式直接存储，储存结构是：{cache}/{name}/{version}</strong>。</p><p>了解这些相对底层的内容可以直接帮助开发者排查 npm 相关问题，这也是区别一般程序员和架构师的细节之一。能不能在理论内容上多走一步，也决定了我们的技术能力能不能更上一层楼。这里我们进行了初步学习，我希望这也可以成为你探究底层的开始。</p><h3 id="npm-不完全指南" tabindex="-1">npm 不完全指南 <a class="header-anchor" href="#npm-不完全指南" aria-label="Permalink to &quot;npm 不完全指南&quot;">​</a></h3><p>接下来，我想介绍几个实用的 npm 小技巧，这些技巧并不包括&quot;npm 快捷键&quot;等常见内容，主要是从工程开发角度，聚焦更广泛的内容。这里我不会花大量篇幅讲解 npm 命令内容，这些知识你可以直接通过 <a href="https://docs.npmjs.com/cli-documentation/" target="_blank" rel="noreferrer">npm cli 官方文档</a>获得。</p><p>下面，我将从 npm 使用技巧以及一些常见使用误区来展开。</p><h4 id="自定义-npm-init" tabindex="-1">自定义 npm init <a class="header-anchor" href="#自定义-npm-init" aria-label="Permalink to &quot;自定义 npm init&quot;">​</a></h4><p>npm 支持我们自定义 npm init，快速创建一个符合自己需求的自定义项目。想象一下，<strong>npm init 命令本身并不复杂，它其实就是调用 shell 脚本输出一个初始化的 package.json 文件</strong>。那么相应地，我们要自定义 npm init 命令，就是写一个 node 脚本而已，它的 module.exports 即为 package.json 配置内容。</p><p>为了实现更加灵活的自定义功能，我们可以使用 prompt() 方法，获取用户输入并动态产生的内容：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> desc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prompt</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;请输入项目描述&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;项目描述...&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">module.exports </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prompt</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;name?&#39;</span><span style="color:#E1E4E8;">, process.</span><span style="color:#B392F0;">cwd</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">()),</span></span>
<span class="line"><span style="color:#E1E4E8;">  version</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prompt</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;version?&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;0.0.1&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  description</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> desc,</span></span>
<span class="line"><span style="color:#E1E4E8;">  main</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;index.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  repository</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prompt</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;github repository url&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> (url) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (url) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;touch README.md&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;git init&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;git add README.md&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;git commit -m &quot;first commit&quot;&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(\`git remote add origin \${url}\`);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;git push -u origin master&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> url;</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> desc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prompt</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;请输入项目描述&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;项目描述...&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">module.exports </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prompt</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;name?&#39;</span><span style="color:#24292E;">, process.</span><span style="color:#6F42C1;">cwd</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">()),</span></span>
<span class="line"><span style="color:#24292E;">  version</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prompt</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;version?&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;0.0.1&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  description</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> desc,</span></span>
<span class="line"><span style="color:#24292E;">  main</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;index.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  repository</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prompt</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;github repository url&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> (url) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (url) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;touch README.md&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;git init&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;git add README.md&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;git commit -m &quot;first commit&quot;&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(\`git remote add origin \${url}\`);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;git push -u origin master&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> url;</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>假设该脚本名为 .npm-init.js，我们执行下述命令来确保 npm init 所对应的脚本指向正确的文件：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm config set init</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">module </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">\\.npm</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">init.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm config set init</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">module </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">\\.npm</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">init.js</span></span></code></pre></div><blockquote><p>更多信息可见：<a href="https://docs.npmjs.com/cli/init" target="_blank" rel="noreferrer">npm-init</a>。</p></blockquote><p>我们也可以通过配置 npm init 默认字段来自定义 npm init 的内容：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm config set init.author.name </span><span style="color:#9ECBFF;">&quot;Lucas&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">npm config set init.author.email </span><span style="color:#9ECBFF;">&quot;lucasXXXXXX@gmail.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">npm config set init.author.url </span><span style="color:#9ECBFF;">&quot;lucasXXXXX.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">npm config set init.license </span><span style="color:#9ECBFF;">&quot;MIT&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm config set init.author.name </span><span style="color:#032F62;">&quot;Lucas&quot;</span></span>
<span class="line"><span style="color:#24292E;">npm config set init.author.email </span><span style="color:#032F62;">&quot;lucasXXXXXX@gmail.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">npm config set init.author.url </span><span style="color:#032F62;">&quot;lucasXXXXX.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">npm config set init.license </span><span style="color:#032F62;">&quot;MIT&quot;</span></span></code></pre></div><blockquote><p>更多信息见：<a href="https://docs.npmjs.com/cli-commands/config.html" target="_blank" rel="noreferrer">npm-config</a>。</p></blockquote><h4 id="利用-npm-link-高效率在本地调试以验证包的可用性" tabindex="-1">利用 npm link，高效率在本地调试以验证包的可用性 <a class="header-anchor" href="#利用-npm-link-高效率在本地调试以验证包的可用性" aria-label="Permalink to &quot;利用 npm link，高效率在本地调试以验证包的可用性&quot;">​</a></h4><p>当我们开发一个公共包时，总会有这样的困扰：假如我开发一个组件库，某个组件开发完成之后，如何验证该组件能在我的业务项目中正常运行呢？</p><p>除了写一个完备的测试以外，常见的思路就是<strong>在组件库开发中，设计 examples 目录或者一个 playground，启动一个开发服务，以验证组件的运行情况</strong>。</p><p>然而真实应用场景是多种多样的，如果能在某个项目中率先尝试就太好了。但我们又不能发布一个不安全的包版本供业务项目使用。另一个&quot;笨&quot;方法是，手动复制粘贴组件并打包产出到业务项目的 node_modules 中进行验证，但是这种做法既不安全也会使得项目混乱，变得难以维护，同时过于依赖手工执行，这种操作非常原始。</p><p>那么如何<strong>高效率在本地调试以验证包的可用性</strong> 呢？这个时候，我们就可以<strong>使用 npm link</strong> 。简单来说，它可以<strong>将模块链接到对应的业务项目中运行</strong>。</p><p>我们来看一个具体场景，假设你正在开发项目 project 1，其中有个包 package 1，对应 npm 模块包名称是 npm-package-1，我们在 package 1 项目中加入了新功能 feature A，现在要验证在 project 1 项目中能否正常使用 package 1 的 feature A，你应该怎么做？</p><p>我们先在 package 1 目录中，执行 npm link，这样 npm link 通过链接目录和可执行文件，实现 npm 包命令的全局可执行。</p><p>然后在 project 1 中创建链接，执行 npm link npm-package-1 命令时，它就会去 /usr/local/lib/node_modules/ 这个路径下寻找是否有这个包，如果有就建立软链接。</p><p>这样一来，我们就可以在 project 1 的 node_module 中会看到链接过来的模块包 npm-package-1，此时的 npm-package-1 就带有最新开发的 feature A，这样一来就可以在 project 1 中正常开发调试 npm-package-1。当然别忘了，调试结束后可以执行 npm unlink 以取消关联。</p><p>从工作原理上总结，npm link 的本质就是软链接，它主要做了两件事：</p><ul><li><p>为目标 npm 模块（npm-package-1）创建软链接，将其链接到全局 node 模块安装路径 /usr/local/lib/node_modules/ 中；</p></li><li><p>为目标 npm 模块（npm-package-1）的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/ 中。</p></li></ul><p>通过刚才的场景，你可以看到：<strong>npm link 能够在工程上解决依赖包在任何一个真实项目中进行调试的问题，并且操作起来更加方便快捷</strong>。</p><h4 id="npx-的作用" tabindex="-1">npx 的作用 <a class="header-anchor" href="#npx-的作用" aria-label="Permalink to &quot;npx 的作用&quot;">​</a></h4><p>npx 由 npm v5.2 版本引入，解决了 npm 的一些使用快速开发、调试，以及项目内使用全局模块的痛点。</p><p><strong>在传统 npm 模式下</strong> ，如果我们需要使用代码检测工具 <a href="https://eslint.bootcss.com/" target="_blank" rel="noreferrer">ESLint</a>，就要先通过 npm install 安装：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm install eslint </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">save</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm install eslint </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">save</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">dev</span></span></code></pre></div><p>然后在项目根目录下执行：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">node_modules</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">.bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">eslint </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">init</span></span>
<span class="line"><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">node_modules</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">.bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">eslint yourfile.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">.</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">node_modules</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">.bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">eslint </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">init</span></span>
<span class="line"><span style="color:#24292E;">.</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">node_modules</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">.bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">eslint yourfile.js</span></span></code></pre></div><p>或者通过项目脚本和 package.json 的 npm scripts 字段调用 ESLint。</p><p>而使用 npx 就简单多了，你只需要下面 2 个操作步骤：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx eslint </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">init</span></span>
<span class="line"><span style="color:#E1E4E8;">npx eslint yourfile.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx eslint </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">init</span></span>
<span class="line"><span style="color:#24292E;">npx eslint yourfile.js</span></span></code></pre></div><p>为什么 npx 操作起来如此便捷呢？</p><p>这是因为它可以直接执行 node_modules/.bin 文件夹下的文件。在运行命令时，npx 可以自动去 node_modules/.bin 路径和环境变量 $PATH 里面检查命令是否存在，而不需要再在 package.json 中定义相关的 script。</p><p><strong>npx 另一个更实用的好处是：npx 执行模块时会优先安装依赖，但是在安装执行后便删除此依赖，这就避免了全局安装模块带来的问题</strong>。</p><p>运行如下命令后，npx 会将 create-react-app 下载到一个临时目录，使用以后再删除：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx create</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">react</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">app cra</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">project</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx create</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">react</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">app cra</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">project</span></span></code></pre></div><p>更多关于 npx 的介绍你可以去<a href="https://www.npmjs.com/package/npx" target="_blank" rel="noreferrer">官网</a>进一步查看。</p><p>现在，你已经对 npm 有了一个初步了解，我们接下来一同看看 npm 实操部分：多源镜像和企业级部署私服原理。</p><h3 id="npm-多源镜像和企业级部署私服原理" tabindex="-1">npm 多源镜像和企业级部署私服原理 <a class="header-anchor" href="#npm-多源镜像和企业级部署私服原理" aria-label="Permalink to &quot;npm 多源镜像和企业级部署私服原理&quot;">​</a></h3><p><strong>npm 中的源（registry），其实就是一个查询服务</strong>。以 npmjs.org 为例，它的查询服务网址是 <a href="https://registry.npmjs.org/%E3%80%82%E8%BF%99%E4%B8%AA%E7%BD%91%E5%9D%80%E5%90%8E%E9%9D%A2%E8%B7%9F%E4%B8%8A%E6%A8%A1%E5%9D%97%E5%90%8D%EF%BC%8C%E5%B0%B1%E4%BC%9A%E5%BE%97%E5%88%B0%E4%B8%80%E4%B8%AA" target="_blank" rel="noreferrer">https://registry.npmjs.org/。这个网址后面跟上模块名，就会得到一个</a> JSON 对象，里面是该模块所有版本的信息。比如，访问 <a href="https://registry.npmjs.org/react%EF%BC%8C%E5%B0%B1%E4%BC%9A%E7%9C%8B%E5%88%B0" target="_blank" rel="noreferrer">https://registry.npmjs.org/react，就会看到</a> react 模块所有版本的信息。</p><p>我们可以通过<code>npm config set</code>命令来设置安装源或者某个 scope 对应的安装源，很多企业也会搭建自己的 npm 源。我们常常会碰到需要使用多个安装源的项目，这时就可以通过 npm-preinstall 的钩子，通过 npm 脚本，在安装公共依赖前自动进行源切换：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;preinstall&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;node ./bin/preinstall.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;preinstall&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;node ./bin/preinstall.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其中 preinstall.js 脚本内容，具体逻辑为通过 node.js 执行<code>npm config set</code>命令，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39; child_process&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">exec</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;npm config get registry&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(error, stdout, stderr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">stdout.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">registry\\.x\\.com</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">exec</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;npm config set @xscope:registry https://xxx.com/npm/&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39; child_process&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">exec</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;npm config get registry&#39;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(error, stdout, stderr) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">stdout.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">registry\\.x\\.com</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">exec</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;npm config set @xscope:registry https://xxx.com/npm/&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>国内很多开发者使用的 <a href="https://www.npmjs.com/package/nrm" target="_blank" rel="noreferrer">nrm</a>（npm registry manager）是 npm 的镜像源管理工具，使用它可以快速地在 npm 源间切换，这当然也是一种选择。</p><p>你的公司是否也正在部署一个私有 npm 镜像呢？你有没有想过公司为什么要这样做呢？</p><p>虽然 npm 并没有被屏蔽，但是下载第三方依赖包的速度依然较缓慢，这严重影响 CI/CD 流程或本地开发效率。部署镜像后，一般可以<strong>确保高速、稳定的 npm 服务</strong> ，而且<strong>使发布私有模块更加安全</strong> 。除此之外，审核机制也可以<strong>保障私服上的 npm 模块质量和安全</strong>。</p><p>那么，如何部署一个私有 npm 镜像呢？</p><p>现在社区上主要有 3 种工具来搭建 npm 私服：nexus、verdaccio 以及 cnpm。</p><p>它们的工作原理相同，我们可以通过 nexus 的架构示例简单了解一下：</p>`,66),m=s("p",null,"nexus 架构示例图",-1),d=s("p",null,"nexus 工作在 client 和外部 npm 之间，并通过 group repository 合并 npm 仓库以及私有仓库，这样就起到了代理转发的作用。",-1),g=s("p",null,'了解了 npm 私服的原理，我们就不畏惧任何"雷区"。这部分我也总结了两个社区上常见的问题。',-1),u=s("p",null,[s("strong",null,"npm 配置作用优先级")],-1),h=s("p",null,"npm 可以通过默认配置帮助我们预设好 npm 对项目的影响动作，但是 npm 的配置优先级需要开发者确认了解。",-1),_=s("p",null,"如下图所示，优先级从左到右依次降低。我们在使用 npm 时需要了解 npm 的设置作用域，排除干扰范围，以免一顿骚操作之后，并没有找到相应的起作用配置。",-1),F=o('<p>优先级排序示意图</p><p><strong>npm 镜像和安装问题</strong></p><p>另外一个常见的问题就是 npm 镜像和依赖安装，关于 npm 镜像和依赖安装问题，归根到底还是网络环境导致的，建议有条件的情况下还是<strong>从网络层面解决问题</strong>。</p><p>如果没有条件，也不要紧，办法总比困难多，可以通过设置安装源镜像来解决，这就需要紧跟社区方案，刨根究底了。这里推荐一篇文章：<a href="https://mp.weixin.qq.com/s/2ntKGIkR3Uiy9cQfITg2NQ" target="_blank" rel="noreferrer">聊聊 npm 镜像那些险象环生的坑</a>，文章中有更详细的内容，你可以看看。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>关于 npm 的核心理念及安装机制，我们暂且分析到这里。这一讲，我们梳理了 npm 安装逻辑，在了解其安装原理的基础上，对 npm 一些常见使用误区以及使用技巧进行了分析；另外我们也具体了解了 npm 多源镜像和企业级部署私服原理。</p>',6),k=s("p",null,"各种环节并不复杂，但是却往往被开发者忽略，导致项目中开发受阻或者架构混乱。本课时，我们也深入多处源码内容，希望对你设计一个完整的工程流程机制有所启发。这里我也给大家留一个思考题：cnpm 是什么，它有什么意义？欢迎你在留言区分享你的观点。",-1),v=s("p",null,"关于 npm 和 Yarn 的更多内容，我们将在下一讲中继续进行，欢迎你继续阅读。",-1),b=s("hr",null,null,-1),f=s("p",null,"[",-1),C=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),n(")")],-1),A=s("p",null,[n("对标阿里P7技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点此链接，快来领取！")],-1);function q(B,j,x,D,T,P){const p=e("Image");return t(),c("div",null,[i,a(p,{alt:"068739612.png",src:"https://s0.lgstatic.com/i/image2/M01/02/A9/Cip5yF_axkqAclTFAAJmlxGYSmI551.png"}),n(),E,a(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_TbUSAZ8CsAAF3O01IL9Q887.png"}),n(),y,a(p,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_Tba6AcJj0AAGPl9HW2qg745.png"}),n(),m,d,g,u,h,_,a(p,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_TbZCAanocAADUyWa5fV4429.png"}),n(),F,a(p,{alt:"01.png",src:"https://s0.lgstatic.com/i/image2/M01/00/68/CgpVE1_XAHWAOTwZAAa8HJHvldA513.png"}),n(),k,v,b,f,a(p,{alt:"大前端引流.png",src:"https://s0.lgstatic.com/i/image2/M01/00/66/CgpVE1_W_x2AaW0rAAdqMM6w3z0145.png"}),n(),C,A])}const w=l(r,[["render",q]]);export{S as __pageData,w as default};
