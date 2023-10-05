import{_ as l,j as o,o as e,g as t,k as a,Q as p,s as n,h as c}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"周期性更新和数据预拉取 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5104) 11  数据预取：合理缓存提高用户体验.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5104) 11  数据预取：合理缓存提高用户体验.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5104) 11  数据预取：合理缓存提高用户体验.md"},E=p('<p>你好，我是俊鹏，今天我带你学习怎么通过微信提供的数据预取能力，提高小程序的用户体验。</p><p>数据预取也叫数据预加载，顾名思义，这项能力能提前加载未来要使用的数据，然后缓存到本地。这样一来，你在使用这些数据时就省去了加载时间，能更快地把页面展示给用户，在很大程度上提升用户体验。<strong>而提升用户体验就是我们学习小程序的数据预加载能力的原因和目的。</strong></p><p>今天这节课我会先带你了解小程序提供的两种数据预加载能力，以及各自的使用场景，然后再详细讲解数据预加载背后的技术原理，最后会讲一下传统前端开发领域中的预加载功能，之所以安排最后一部分的内容是希望通过对比传统前端和小程序在预加载方面的不同，令你加深对数据预加载功能的理解。今天你学完这节课之后，可以在未来要设计一套预加载体系时，把所学的知识运用起来。</p><p>好了，话不多说，我们正式进入今天的课程，<strong>先来了解一下小程序提供的两种数据预加载能力：周期性更新和数据预拉取，</strong> 这两种能力的底层原理和设置方法类似，只是应对的使用场景不同。</p><h3 id="周期性更新和数据预拉取" tabindex="-1">周期性更新和数据预拉取 <a class="header-anchor" href="#周期性更新和数据预拉取" aria-label="Permalink to &quot;周期性更新和数据预拉取&quot;">​</a></h3><p><strong>周期性更新是指：</strong> 在用户未打开小程序的情况下，微信客户端从服务器拉取数据，并且缓存到小程序本地，用户下次打开小程序时就已经有了预加载数据，进而能够快速地将页面展示给用户。</p><p>这项能力主要解决当用户设备处于弱网环境下，造成的网络请求耗时过长，以及用户长时间等待过长造成的用户流失。所以周期性更新预加载的资源通常是小程序首屏的数据。</p><p><strong>数据预拉取的执行时机与周期性更新不同，<strong>是在小程序</strong>冷启动</strong>阶段执行数据的预加载（小程序另外的启动情况是热启动）。</p><ul><li><p><strong>冷启动是指：</strong> 用户首次打开，或小程序销毁后被用户再次打开时，小程序需要重新加载启动的情况。</p></li><li><p><strong>热启动是指：</strong> 用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时小程序并未被销毁，只是从后台状态进入前台状态的情况。</p></li></ul><p>打开小程序后，进入冷启动还是热启动状态的决定性条件是小程序是否被销毁，那么小程序什么场景下会被销毁？一种场景是小程序退回到后台以后超过一定时间未被唤醒到前台；另一种场景就是当小程序占用的内存过高。</p><p>小程序被销毁后，再次被打开就会进入冷启动状态，冷启动的耗时比较长，用户需要等待，数据预拉取能够在冷启动阶段进行关键数据的预加载，这样等冷启动完成之后可以立即使用这些数据，避免了一次网络请求的耗时等待时间，也提升了用户体验。</p><p>明确了周期性更新和数据预拉取在使用场景上的区别之后，接下来我就带你学习这两种能力的设置方法和技术原理，教你如何使用小程序的预加载能力提高用户体验。</p><p>首先，咱们先从应对弱网环境的周期性更新开始学习。</p><h3 id="应对弱网的周期性更新" tabindex="-1">应对弱网的周期性更新 <a class="header-anchor" href="#应对弱网的周期性更新" aria-label="Permalink to &quot;应对弱网的周期性更新&quot;">​</a></h3><p>小程序周期性更新的配置流程里，你需要关注这三个步骤：</p><ol><li><p>配置预加载数据的请求地址。</p></li><li><p>在第一次启动小程序时，将自定义登录态同步给微信客户端，请注意是微信客户端而不是微信服务器。</p></li><li><p>在用户再次启动小程序时，直接读取预加载的数据。</p></li></ol><p>光看这三条描述是不是觉得有些不明所以？别急，我们一点点学。</p><p>首先是配置预加载数据的请求地址，你可以在微信小程序的管理后台中找到&quot;开发&quot;-&quot;开发设置&quot;=&quot;数据周期性更新&quot;：</p>',18),i=p(`<p>点击开启后，你就会开始配置请求地址，这个地址就是需要被预加载的数据来源，微信服务器会从这个地址拉取所需的预加载数据。你可以通过自己的服务器（比如由 02 讲中提到的开发者服务器提供，也可以由前两讲中讲到的云函数提供）。</p><p>在管理后台开启了周期性更新之后，第二步就是把小程序的自定义登录态同步给微信客户端（如果你不记得什么是自定义登录态，就要复习02讲了）。同步的方法是使用小程序 SDK 提供的<a href="https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.setBackgroundFetchToken.html" target="_blank" rel="noreferrer">wx.setBackgroundFetchToken</a> API，语法请看下面这段代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onLaunch</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 第1步：从storage中取出自定义登录态</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> wx.</span><span style="color:#B392F0;">getStorageSync</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&lt;token-key&gt;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 第2步：将登录态同步给微信客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">    wx.</span><span style="color:#B392F0;">setBackgroundFetchToken</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      token</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">App</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onLaunch</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 第1步：从storage中取出自定义登录态</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> wx.</span><span style="color:#6F42C1;">getStorageSync</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&lt;token-key&gt;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 第2步：将登录态同步给微信客户端</span></span>
<span class="line"><span style="color:#24292E;">    wx.</span><span style="color:#6F42C1;">setBackgroundFetchToken</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      token</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>这段代码是假设小程序已经登录了，这时候本地的 storage 中已经存在自定义登录态，然后从本地缓存中取出并同步给微信客户端。</p><p>经过上面两个步骤，你就已经成功启动了周期性更新，微信客户端会每隔 12 小时发送一个请求，请求的目标就是你在第一步配置的地址，然后将获取到的数据（也就是 HTTP 请求的 Body 数据缓存到本地）。之后，当用户再次打开小程序时，就能获取这些缓存数据，获取的方法是借助小程序 SDK提供的<a href="https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchData.html" target="_blank" rel="noreferrer">wx.getBackgroundFetchData</a>API，请看以下代码片段：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onLaunch</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    wx.</span><span style="color:#B392F0;">getBackgroundFetchData</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      fetchType: </span><span style="color:#9ECBFF;">&#39;periodic&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res.fetchedData) </span><span style="color:#6A737D;">// 缓存数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res.timeStamp) </span><span style="color:#6A737D;">// 客户端拿到缓存数据的时间戳</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">App</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onLaunch</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    wx.</span><span style="color:#6F42C1;">getBackgroundFetchData</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      fetchType: </span><span style="color:#032F62;">&#39;periodic&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res.fetchedData) </span><span style="color:#6A737D;">// 缓存数据</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res.timeStamp) </span><span style="color:#6A737D;">// 客户端拿到缓存数据的时间戳</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>走到这一步就完成了周期性更新的全部流程，看上去简单，<strong>但里面有一个问题：定时拉取数据的时间间隔（ 12 小时）是怎么实现的？</strong> 是不是跟上一讲订阅消息中传统调用方式过程的定时任务一样？答应是否定的。</p><p>周期性更新并不是一个定时任务，而是一个任务队列，简单讲就是一个个顺序排列的任务，只有当前面的任务被执行成功之后，后面的任务才会被执行。<strong>小程序的周期性更新的计时规则是：</strong> 只有当一次更新数据成功之后，才会再次向任务队列中放入一个 12 小时执行的新任务。</p><p><strong>这套机制与定时任务的区别在于：</strong> 定时任务一般是不管执行结果的，只要任务被执行了不论成功还是失败，都会在精准的 12 小时之后执行下一个任务。而任务队列通常是阻塞式的，也就是只有当前面的任务执行成功，才会继续执行后面的任务。所以任务队列通常具备重试机制，即某个任务失败后重新尝试执行，这样做可以提高每一次更新的成功率。</p><p>所以根据上面的步骤，小程序周期性更新的完整流程可以描述为下面这张图：</p>`,10),y=p('<p>搞清楚了周期性更新的使用方法和技术原理之后，我们再看看为了应对冷启动的数据预拉取功能是什么。</p><h3 id="应对冷启动的数据预拉取" tabindex="-1">应对冷启动的数据预拉取 <a class="header-anchor" href="#应对冷启动的数据预拉取" aria-label="Permalink to &quot;应对冷启动的数据预拉取&quot;">​</a></h3><p>除了执行时机不同以外，数据预拉取跟周期性更新在配置的方法和使用的流程上都非常接近。你需要关注的仍然只有三点：</p><ol><li><p>配置预加载数据的请求地址。</p></li><li><p>在第一次启动小程序时，将自定义登录态同步给微信客户端。</p></li><li><p>在用户再次启动小程序时，直接读取预加载的数据。</p></li></ol><p>是不是跟周期性更新的流程完全一样？二、三步的操作方法跟周期性更新完全一样，使用的 API 也是同一份。唯一的区别就是第一步的配置入口不同，数据预拉取的配置入口在小程序管理后台的&quot;开发&quot;-&quot;开发设置&quot;-&quot;数据预拉取&quot;中，你会找到下面这张图所示的配置：</p>',5),g=n("p",null,"跟周期性更新的配置一样，你可以填写开发者服务器的一个接口地址，也可以填写一个云函数。",-1),_=n("p",null,"你要注意，配置和使用流程一致只是表象，数据预拉取与周期性更新的技术原理并不完全相同。数据预拉取并没有每隔 12 小时轮询一次的机制，而是在用户打开小程序时，如果小程序时冷启动，这时候会发起数据预拉取的任务。冷启动结束以后小程序便可直接获取预拉取的数据，完整的流程如图所示：",-1),d=n("p",null,[n("strong",null,"通过上面的学习你可以得出一个结论："),c(" 小程序的数据预取能力其实是借微信客户端完成的，包括预加载数据的网络请求和数据的缓存，而小程序最终只是从微信客户端的缓存中读取已有的数据而已。这其实也从侧面印证了我们在 09 讲学习融入微信生态的必要性。")],-1),h=p('<p>现在，你已经学完了微信小程序的数据预取能力，搞清楚了使用方法和技术原理。但作为一名前端开发者，虽然很熟悉数据预加载的概念，在学习了小程序的数据预取之后，肯定会发现它跟传统前端的预加载并不完全相同，<strong>那区别到底在哪呢？</strong></p><h3 id="传统前端的预加载" tabindex="-1">传统前端的预加载 <a class="header-anchor" href="#传统前端的预加载" aria-label="Permalink to &quot;传统前端的预加载&quot;">​</a></h3><p>小程序的数据预取针对的是数据，不论是周期性更新还是数据预拉取，都是微信客户端从开发者服务器或云函数中获取一些数据而不是资源，<strong>这是小程序与传统前端在预加载方面最大的区别。</strong></p><p>我们都知道，小程序的资源文件托管在微信服务器中，是封闭的，用户不能从微信服务器直接获取小程序的资源文件，只有微信客户端有权限。而传统前端的资源是开放的，一个网站的所有资源，包括 html、js、css、图片等文件都可以用一个 URL 获取到，我们称这些文件为静态资源。当用户打开一个网站后首先要加载的就是这些静态文件，所以这些静态文件的加载耗时就成了传统前端性能优化的重点之一，预加载就是其中的一种优化策略。</p><p><strong>所以在传统前端开发领域，预加载的对象是资源和数据，而小程序只有一种，那就是数据。</strong></p><p>在传统前端项目中，浏览器提供了预加载资源的能力：preload。你可以通过一个 HTML 标签声明需要预加载的资源文件地址，浏览器会在空闲时间将这些资源提前加载到本地缓存中，比如下面这个 HTML 标签便是告知浏览器要预加载一个 css 文件：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rel</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;preload&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/path/to/style.css&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">as</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;style&quot;</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">link</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rel</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;preload&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/path/to/style.css&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">as</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;style&quot;</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>在数据的预加载方面，由于传统前端项目没有类似小程序的冷启动机制，也不能向小程序一样借助微信客户端做后台的数据拉取，所以小程序的周期性更新和数据预拉取能力在传统前端项目中无法实现。<strong>这里注意一下，</strong> 我说的传统前端项目指的是运行在浏览器中的网站，如果你的项目是运行在 WebView 中的混合模式，则可以借助原生 App 的能力实现类似小程序和周期性更新和数据预拉取能力，这种场景下原生 App 相当于微信客户端的角色，而 WebView 中的网站则类似小程序的角色。</p><p>如果需要在传统前端项目中实现数据的预拉取，只能交给开发者自行研发，原理很简单，就是在空闲时间中向后端接口发起一个 HTTP 请求预加载未来将要用到的数据，然后放入本地缓存中，比如 localstorage ；然后在用到这些数据的时候从缓存中直接读取就行。</p><p><strong>而与小程序的区别在于：</strong> 小程序数据预取的对象一般都是首屏的数据，这是因为这些数据的加载执行者是微信客户端而不是小程序，加载时用户还未打开或进入小程序。传统前端预加载的数据往往是首屏以外的数据，这是因为这些数据的加载执行者是前端项目本身而不是外部的浏览器，前端项目必须等待用户打开网站之后才能执行 js 脚本。</p><p>通过对比小程序和传统前端在预加载方面的区别，我希望你能够明白这两种技术领域对于预加载目标的不同需求以及实现方式，如果以后需要你自己研发一套预加载机制，可以从中吸取灵感。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天我们主要学习了小程序的两种数据预取能力：周期性更新和数据预拉取。这两种能力的配置方法和使用流程非常接近，区别在于应用场景。周期性更新主要是为了应对弱网环境，而数据预拉取则是为了应对小程序的冷启动。两种能力都是借助微信客户端完成。通过今天的学习我希望你能够掌握以下知识点：</p><ol><li><p>理解小程序的两种数据预取能力的配置、使用和应用场景。</p></li><li><p>理解周期性更新和数据预拉取的技术原理。</p></li><li><p>了解小程序和传统前端项目对于预加载的不同需求和实现方式。</p></li></ol><p>今天的课后作业比较简单：按照学习的内容为你的小程序开启周期性更新和数据预拉取功能。通过动手实践加深对课程内容的理解。</p>',15);function u(F,A,k,m,q,C){const s=o("Image");return e(),t("div",null,[E,a(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/73/8D/Ciqc1F_GFBGAYbfQAADRyJ9lhhI010.png"}),i,a(s,{alt:"Lark20201204-183844.png",src:"https://s0.lgstatic.com/i/image/M00/78/85/Ciqc1F_KEieAKxxuAAETANPzC8E599.png"}),y,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/73/8D/Ciqc1F_GFCqAL-MsAADIAWGO2H4699.png"}),g,_,a(s,{alt:"Lark20201204-183859.png",src:"https://s0.lgstatic.com/i/image/M00/78/90/CgqCHl_KEjGAf3IqAAD-e8Eo6bo194.png"}),d,a(s,{alt:"11.png",src:"https://s0.lgstatic.com/i/image/M00/80/34/CgqCHl_Qgq-AXdOrAACFZYooKw0252.png"}),h])}const D=l(r,[["render",u]]);export{B as __pageData,D as default};
