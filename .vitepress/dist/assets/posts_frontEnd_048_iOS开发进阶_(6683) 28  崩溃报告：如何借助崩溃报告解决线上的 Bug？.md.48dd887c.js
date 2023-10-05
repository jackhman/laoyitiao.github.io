import{_ as o,j as e,o as t,g as c,k as n,Q as p,s,h as l}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"配置 Crashlytics ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6683) 28  崩溃报告：如何借助崩溃报告解决线上的 Bug？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6683) 28  崩溃报告：如何借助崩溃报告解决线上的 Bug？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6683) 28  崩溃报告：如何借助崩溃报告解决线上的 Bug？.md"},i=p('<p>App 在运行过程中发生闪退会给用户带来极其恶劣的体验，因此，用户往往会把经常闪退的 App 直接删掉。同样地，对开发者来说，重现线上问题也是件困难的事，因为这些 Bug 可能与用户使用时的网络连接状态、iOS 系统版本、内存空间、是否越狱等有关。那有没有什么好办法能帮助我们解决线上的 Bug，并提升用户体验呢？</p><p><strong>崩溃报告是一种解决线上闪退问题的有效办法。崩溃报告可以实时收集真实用户在使用 App 过程中发生闪退的信息，并将其解释成对开发者友好的报告，这可以很好地帮助我们确认和诊断线上的问题。</strong></p><p>可以这么说，崩溃报告服务已经成为 App 不可或缺的支撑功能。在 Moments App 中，我选择了 Firebase Crashlytics 作为崩溃报告服务。与市面上其他服务相比，Firebase Crashlytics 有以下 5 个优点。</p><ol><li><p>Crashlytics 产品有 10 年的历史，经过这快 10 年的实践检验，我们发现该产品非常稳定。</p></li><li><p>Crashlytics 能同时支持 iOS 和 Android 等平台，方便我们在同一个地方查看所有 App 的崩溃报告。</p></li><li><p>Crashlytics 完美地整合在 Firebase 里面，可以与 Firebase 其他服务一同使用，例如可以配合性能监控一起使用。</p></li><li><p>与 Firebase 的其他产品一样，Crashlytics 可以免费使用。</p></li><li><p>fastlane 支持 Crashlytics 的整合，只需要简单的配置就可以通过 CI 自动化上传 dSYM 文件。</p></li></ol><p>下面我们就来看看如何在 Moments App 里面使用 Crashlytics。</p><h3 id="配置-crashlytics" tabindex="-1">配置 Crashlytics <a class="header-anchor" href="#配置-crashlytics" aria-label="Permalink to &quot;配置 Crashlytics&quot;">​</a></h3><p>在使用 Crashlytics 前，我们需要完成一次性的配置。</p><p>首先登录到 Firebase 网站，并通过位于左边 Crashlytics 菜单打开 Crashlytics 页面，接着点击&quot;Enable Crashlytics&quot;按钮来启动 Crashlytics 功能。</p>',8),y=p(`<p>启动 Crashlytics 服务以后，在 Podfile 文件里添加以下的 Pod：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def thirdparty_pods</span></span>
<span class="line"><span style="color:#E1E4E8;">  pod </span><span style="color:#9ECBFF;">&#39;Firebase/Crashlytics&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;= 7.0.0&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  pod </span><span style="color:#9ECBFF;">&#39;Firebase/Performance&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;= 7.0.0&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def thirdparty_pods</span></span>
<span class="line"><span style="color:#24292E;">  pod </span><span style="color:#032F62;">&#39;Firebase/Crashlytics&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;= 7.0.0&#39;</span></span>
<span class="line"><span style="color:#24292E;">  pod </span><span style="color:#032F62;">&#39;Firebase/Performance&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;= 7.0.0&#39;</span></span>
<span class="line"><span style="color:#24292E;">end</span></span></code></pre></div><p>其中，<code>Firebase/Crashlytics</code>是用于崩溃报告服务的 Pod，而<code>Firebase/Performance</code>是用于性能监控的 Pod。完成上面的配置以后，只需重新执行<code>bundle exec pod install</code>命令就能完成 Crashlytics 的安装了。</p><p>最后一步是调用<code>FirebaseApp.configure()</code>函数来启动崩溃报告服务。如果你已经使用了统计分析服务，那么这一步之前就做过了。</p><h3 id="自动化上传-dsym-文件" tabindex="-1">自动化上传 dSYM 文件 <a class="header-anchor" href="#自动化上传-dsym-文件" aria-label="Permalink to &quot;自动化上传 dSYM 文件&quot;">​</a></h3><p>完成了上述的配置以后，一旦发生闪退，在 Firebase Crashlytics 页面就能看到相关的闪退信息，除此之外，你还可能会看到以下的警告页面：</p>`,6),E=p(`<p>该页面告诉我们&quot;Missing required dSYMs&quot;，中文意思就是&quot;缺了必需的 dSYM 文件&quot;。那什么是 dSYM 文件呢？</p><p>当 Xcode 在把源代码编译成机器码的时候，编译器会生成一堆 Symbol（符号）来存放类型的名字、全局变量和方法的名称等，这些 Symbol 会把机器码对应到各种类型所在的文件和行号。因此，我们可以利用这些 Symbol 在 Xcode 里面进行 Debug，或者在崩溃报告上定位 Bug。默认情况下，当我们生成一个 Debug 版本的 App 时，所有的 Debug Symbol 都会自动存放在 App 里面。</p><p>但是 Release 版本的 App 却不一样，<strong>为了减小 App 的尺寸，编译器并不把 Debug Symbol 存放在 App 里面，而是生成一些额外的 dSYM 文件（Debug Symbol file）来存放</strong>。每个可执行文件、Framework 以及 Extension 都通过唯一的 UUID 来配对相应的 dSYM 文件。为了便于定位线上 App 的问题，我们需要保存这些 dSYM 文件，并上传到崩溃报告服务上去。</p><p>幸运的是，fastlane 提供了一个<code>upload_symbols_to_crashlytics</code>Action 来帮我们简化上传 dSYM 文件的操作。上传 Internal App dSYM 文件的具体实现如下：</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">desc </span><span style="color:#9ECBFF;">&#39;Upload symbols to Crashlytics for Internal app&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:upload_symbols_to_crashlytics_internal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  upload_symbols_to_crashlytics(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">dsym_path:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Moments.app.dSYM.zip&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">gsp_path:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Moments/Moments/Configurations/Firebase/GoogleService-Info-Internal.plist&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">api_token:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ENV</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;FIREBASE_API_TOKEN&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">desc </span><span style="color:#032F62;">&#39;Upload symbols to Crashlytics for Internal app&#39;</span></span>
<span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:upload_symbols_to_crashlytics_internal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  upload_symbols_to_crashlytics(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">dsym_path:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Moments.app.dSYM.zip&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">gsp_path:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Moments/Moments/Configurations/Firebase/GoogleService-Info-Internal.plist&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">api_token:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ENV</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;FIREBASE_API_TOKEN&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>在调用<code>upload_symbols_to_crashlytics</code>Action 时，我们需要传递三个参数：首先把 dSYM 文件的路径传递给<code>dsym_path</code>参数，然后把 Firebase 的配置文件传递给<code>gsp_path</code>参数，最后是把 Firebase API Token 传递给<code>api_token</code>参数。在前面的<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=657&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=6680&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">《25 | 自动化构建：解决大量重复性人力工作神器》</a>里我们已经讲述过如何获取这个 Token 了，我们是将<code>FIRBASE_API_TOKEN</code>环境变量配置在 local.keys 文件里面。</p><p>接下来我们再一起看看上传 AppStore 版本 dSYM 文件的具体实现：</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">desc </span><span style="color:#9ECBFF;">&#39;Upload symbols to Crashlytics for Production app&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:upload_symbols_to_crashlytics_appstore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  upload_symbols_to_crashlytics(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">dsym_path:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Moments.app.dSYM.zip&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">gsp_path:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Moments/Moments/Configurations/Firebase/GoogleService-Info-AppStore.plist&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">api_token:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ENV</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;FIREBASE_API_TOKEN&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">desc </span><span style="color:#032F62;">&#39;Upload symbols to Crashlytics for Production app&#39;</span></span>
<span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:upload_symbols_to_crashlytics_appstore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  upload_symbols_to_crashlytics(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">dsym_path:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Moments.app.dSYM.zip&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">gsp_path:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Moments/Moments/Configurations/Firebase/GoogleService-Info-AppStore.plist&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">api_token:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ENV</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;FIREBASE_API_TOKEN&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>可以看到，<code>upload_symbols_to_crashlytics_appstore</code>与<code>upload_symbols_to_crashlytics_internal</code>的实现基本一样，唯一不同的地方是<code>upload_symbols_to_crashlytics_appstore</code>把 GoogleService-Info-AppStore.plist 文件传递给了<code>gsp_path</code>参数。</p><p>有了这些 Lane 以后，我们就可以修改 CI 的配置来自动完成上传 dSYM 文件的操作。下面是 .travis.yml 的配置：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">stage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Archive, sign and deploy internal app&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Archive Internal app&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">if</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">branch = main</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">bundle exec fastlane archive_internal</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">bundle exec fastlane upload_symbols_to_crashlytics_internal</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 新增的步骤</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">bundle exec fastlane deploy_internal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">stage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Archive, sign and deploy internal app&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Archive Internal app&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">if</span><span style="color:#24292E;">: </span><span style="color:#032F62;">branch = main</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">script</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">bundle exec fastlane archive_internal</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">bundle exec fastlane upload_symbols_to_crashlytics_internal</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 新增的步骤</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">bundle exec fastlane deploy_internal</span></span></code></pre></div><p>可以看到，我们在<code>script</code>下增加了<code>upload_symbols_to_crashlytics_internal</code>步骤。</p><h3 id="查看崩溃报告" tabindex="-1">查看崩溃报告 <a class="header-anchor" href="#查看崩溃报告" aria-label="Permalink to &quot;查看崩溃报告&quot;">​</a></h3><p>得到了上传的 dSYM 文件以后，Crashlytics 就能自动处理 dSYM 文件，并把崩溃信息解释成对开发者友好的报告，如下图所示：</p>`,14),d=s("p",null,"报告中最关键的信息是堆栈回溯（Trace Stack），它会把 App 闪退前所调用的方法名称、代码执行的行号都按顺序依次打印出来，这样能方便我们对照着源码来定位问题。",-1),_=s("p",null,"另外，Crashlytics 还能把收集到的设备信息显示出来，方便我们重现和诊断问题，这些信息如下图所示：",-1),h=s("p",null,"如果我们同时使用了 Firebase 的统计分析服务，那么 Crashlytics 还会给我们提供闪退前的用户行为事件，方便我们按照这些步骤来重现问题，如下图所示：",-1),u=s("p",null,"除了提供崩溃报告以外，Crashlytics 还能提供可配置的警告信息，Crashlytics 会根据崩溃率的阈值来给我们及时发送警告通知。例如，下面的配置表示当有 0.1% 的用户在最近一小时内发生闪退时就发送警告通知。",-1),g=s("h3",{id:"性能报告",tabindex:"-1"},[l("性能报告 "),s("a",{class:"header-anchor",href:"#性能报告","aria-label":'Permalink to "性能报告"'},"​")],-1),C=s("p",null,[l("因为我们安装了"),s("code",null,"Firebase/Performance"),l("Pod，所以 Firebase 会自动生成性能监控报告，如下图所示：")],-1),m=s("p",null,"这些报告能为我们提供网络运行状态、屏幕呈现速度、App 启动速度等指标。",-1),b=s("p",null,"这里我们还可以为各个指标配置不同阈值与目标值来进一步监控 App 的性能状况。比如，下图显示了 App 启动速度指标的详细信息。",-1),F=p('<p>除了启动速度以外，Crashlytics 还提供了各种脱敏信息，例如操作系统的版本、设备的类型等，这些信息能帮助我们更准确地定位性能问题的瓶颈。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在这一讲中，我们讲述了如何使用 Firebase Crashlytics 来收集崩溃报告，还讲解了如何使用 fastlane 来开发上传 dSYM 文件的操作，以及通过 CI 的配置来完成全自动化上传。通过与统计分析服务相结合，Crashlytics 能提供详细的崩溃信息，帮助我们快速地诊断和定位线上的 Bug，从而降低崩溃率，提升用户的使用体验。</p><p>这里我再分享一些减少闪退的有效办法。你可以根据项目的具体情况，<strong>合理配置崩溃率的阈值</strong> ，并随着 App 质量的提高而不断降低崩溃率的阈值配置。然后，在发布新版本的时候采用<strong>分阶段发布</strong>的方式，例如，通过发布 1% 的用户来观察崩溃率是否提升，一旦超过一定的阈值就马上暂停发布，修复好引起崩溃的 Bug 后再重新发布新版本。总之，结合我自己的开发经验来看，通过合理配置崩溃率阈值和分阶段发布的方式，可以在很大程度上降低闪退的概率，所以，在你的开发工作中，建议你可以考虑使用。</p><p><strong>思考题</strong></p><blockquote><p>请问你是通过什么办法来解决线上崩溃的问题呢？能分享一下你的经验吗？</p></blockquote><p>请把你的答案写到留言区哦。下一讲我将介绍&quot;如何使用远程开关来远程遥控上线 App 的产品行为&quot;的相关内容，记得按时来听课。</p><p><strong>源码地址</strong></p><blockquote><p>Fastfile 文件地址：<a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/fastlane/Fastfile#L264-L281?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/blob/main/fastlane/Fastfile#L264-L281</a></p><p>.travis.yml 文件地址：<a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/.travis.yml#L35?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/blob/main/.travis.yml#L35</a></p></blockquote>',9);function A(S,f,q,B,v,M){const a=e("Image");return t(),c("div",null,[i,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/41/5A/CioPOWCrg9uAHGPoAAMmXqOKJGo185.png"}),y,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/41/C7/CioPOWCt9oiAGLfXAASImtow89w029.png"}),E,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/41/51/Cgp9HWCrg_GAVqX7AAJUyq4Wg7c868.png"}),d,_,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/41/51/Cgp9HWCrg_aASscLAAB9tjkKGTA430.png"}),h,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/41/5A/CioPOWCrg_uAWvqlAACNjcsm3ps311.png"}),u,n(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/41/C7/CioPOWCt9vKASHf_AAGEXm8i864118.png"}),g,C,n(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/41/C7/CioPOWCt9xqABA89AAUscXwHDVg298.png"}),m,b,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/41/52/Cgp9HWCrhBSAMMylAAIEEs1Bhvk758.png"}),F])}const P=o(r,[["render",A]]);export{I as __pageData,P as default};
