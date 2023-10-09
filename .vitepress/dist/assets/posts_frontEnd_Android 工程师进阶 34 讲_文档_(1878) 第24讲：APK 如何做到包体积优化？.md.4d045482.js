import{_ as r,j as n,o as l,h as s,k as i,f as t,Q as o,s as e}from"./chunks/framework.d3daa342.js";const F=JSON.parse('{"title":"第24讲：APK如何做到包体积优化？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1878) 第24讲：APK 如何做到包体积优化？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1878) 第24讲：APK 如何做到包体积优化？.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1878) 第24讲：APK 如何做到包体积优化？.md"},c=o('<h1 id="第24讲-apk如何做到包体积优化" tabindex="-1">第24讲：APK如何做到包体积优化？ <a class="header-anchor" href="#第24讲-apk如何做到包体积优化" aria-label="Permalink to &quot;第24讲：APK如何做到包体积优化？&quot;">​</a></h1><p>关于 APK Size 的优化，网上有很多版本的介绍。但是因为每个项目的背景、实现方式都不尽相同，导致各个项目之间能列出的共性相对较少。所以这节课我主要分享一下我在项目中对包体积优化的一些尝试。主要分两部分：安装包监控、安装包大小优化。</p><h3 id="安装包监控" tabindex="-1">安装包监控 <a class="header-anchor" href="#安装包监控" aria-label="Permalink to &quot;安装包监控&quot;">​</a></h3><h4 id="android-studio-的-apk-analyser" tabindex="-1">Android Studio 的 APK Analyser <a class="header-anchor" href="#android-studio-的-apk-analyser" aria-label="Permalink to &quot;Android Studio 的 APK Analyser&quot;">​</a></h4><p>这是 Android Studio 提供的一个 APK 检测工具，通过它可以查看一个 APK 文件内部各项内容所占的大小，并且按照大小排序显示。因此我们很容易观察到 APK 中哪一部分内容占用了最大空间。APK Analyzer 的使用非常简单，只要将需要分析的 APK 文件拖入 Android Studio 中即可，显示内容类似下图所示：</p>',5),d=e("p",null,"从上图中可以很明显看出部分图片占用了比较大的资源空间，因此可以针对性地对其做压缩优化等操作。",-1),_=e("blockquote",null,[e("p",null,"实际上 APK Analyzer 的作用不光是查看 APK 大小，从它的名字也能看出它是用来分析 APK 的，因此可以使用它来分析一些优秀 APK 的目录结构、代码规范，甚至是使用了哪些动态库技术等。")],-1),A=e("h4",{id:"matrix中-的-apkchecker",tabindex:"-1"},[t("Matrix中 的 ApkChecker "),e("a",{class:"header-anchor",href:"#matrix中-的-apkchecker","aria-label":'Permalink to "Matrix中 的 ApkChecker"'},"​")],-1),h=e("p",null,"ApkChecker 是腾讯开源框架 Matrix 的一部分，主要是用来对 Android 安装包进行分析检测，并输出较为详细的检测结果报告。正常情况下我们需要下载 Matrix 源码，并单独编译 matrix-apk-cananry 部分。但是如果想快速使用 ApkChecker，可以直接在网上下载其 ApkChecker.jar 文件，然后创建一个配置文件 .json 即可。",-1),u=e("p",null,"官方的配置文件格式如下：",-1),g=o('<p>配置文件有几个地方是需要我们去替换的。</p><ul><li><p>apk：需要分析的 APK 文件的路径；</p></li><li><p>mappingTxt：指定混淆 mapping 文件的路径；</p></li><li><p>output：分析报告的输出目录；</p></li><li><p>rTx：APK 文件生成时，对应的 R 文件目录。</p></li></ul><p>ApkChecker 的好处是可以命令行使用，这样我们可以很方便将其配置在自动化集成系统中，并对最终生成的 APK 文件进行分析，将产出报告发送到指定位置。这样不管是程序开发人员或者是测试工程师，都可以很直观地对当前版本 APK 有一个大概的评估。</p><blockquote><p><strong>注意</strong>：Matrix 也有一定的缺陷，比如使用 UnusedAssetTask 检索 assets 中的资源，这个过程只是调用 DexFileFactory.loadDexFile 加载 dex 文件，所以只会去搜索 java 文件中的引用。如果在 assets 目录下有一个 .json 文件，此 .json 文件中记录 assets 文件夹中的其他图片路径，然后在 Java 代码中通过 AssetManager 读取这个 .json 文件之后，循环遍历出它所引用的图片，对于这种方式 Matrix 是检测不到的，会将它置为 unused。关于这方面我也给 Matrix 作者提过反馈，目前是没有好的解决办法。</p></blockquote><h3 id="安装包优化实践" tabindex="-1">安装包优化实践 <a class="header-anchor" href="#安装包优化实践" aria-label="Permalink to &quot;安装包优化实践&quot;">​</a></h3><h4 id="删除无用文件" tabindex="-1">删除无用文件 <a class="header-anchor" href="#删除无用文件" aria-label="Permalink to &quot;删除无用文件&quot;">​</a></h4><p>使用 Lint 查看未引用资源。Lint 是一个静态扫描工具，它可以识别出项目中没有被任何代码所引用到的资源文件。具体使用也很简单，只要在 Android Studio 中点击 Analyze -&gt; Inspect Code，然后选中整个项目即可，如下所示：</p>',7),b=e("p",null,"如果项目中有未被使用资源，则 Lint 会在窗口 Inspection Result 中显示，类似结果如下：",-1),k=e("p",null,"下面两个选项可以在项目编译时期减少被打包到 APK 中的文件， 使用 shrinkResources 能够在项目编译阶段，删除所有在项目中未被使用到的资源文件。但是需要将 minifyEnabled 选项设置为 true。",-1),m=e("p",null,"使用 resConfig 限定国际化资源文件。有时候我们使用到的三方库中可能会对各种国际化语言进行支持，但是我们自己的项目只支持某个语言，比如中文，那我们可以在 gradle 的 defaultConfig 中使用 resConfig 来限制打包到 APK 中的国际化资源文件，具体如下所示：",-1),P=e("h4",{id:"文件优化",tabindex:"-1"},[t("文件优化 "),e("a",{class:"header-anchor",href:"#文件优化","aria-label":'Permalink to "文件优化"'},"​")],-1),D=e("ul",null,[e("li",null,"关于静态图片优化")],-1),x=e("p",null,"优先使用 VectorDrawable 图片，如果 UI 无法提供 VectorDrawable 图片，那么 webp 格式是一个不错的选择。Android Studio 也支持直接将 png 或者 jpg 格式图片转化为 webp 格式，如下所示：",-1),C=e("ul",null,[e("li",null,"关于动态图片优化")],-1),w=e("p",null,"实际上 webp 也可以作动态图，只是目前对 webp 动图支持的三方库并不多，谷歌官方推荐的 Glide 对 webp 支持也不是很友好。",-1),f=e("p",null,[t("但是谷歌推出了一套 C++ 依赖库，上层开发人员可以基于此库的基础上使用 JNI 来解析 Animated webp 图片，并将解析出来的每一帧封装成一个 Bitmap，并根据解析出来的时间差值动态显示相应的帧 Bitmap 即可。如果 JNI 不熟或者不想再花时间精力去实现 JNI 调用，可以考虑使用 GitHub 的 "),e("a",{href:"https://github.com/McoyJiang/Android-WebP",target:"_blank",rel:"noreferrer"},"Android-WebP"),t(" 。Android 开发人员只需使用 WebpImageView 控件并指定图片路径即可。")],-1),K=e("p",null,"另外针对动态图片，我们也做了其他方面的尝试。做过游戏开发的一般都比较熟悉 TextureAlas 这种图片格式，就是将多个序列图按照一定的排放位置合成到一张图片中，比如以下图片：",-1),q=e("p",null,"并且跟随图片一起生成的还有一个用来对其解析的文本配置文件。主要是用来识别合成图中的路径、每张帧图片的序列、位置等。一般情况下配置文本的格式如下：",-1),T=e("p",null,"这套方案主要是借鉴了一个轻量级游戏引擎 libgdx 的实现思路，解析上述的 TextureAtlas 图片，将生成的 Texture 渲染到 Bitmap 上展示每一帧内容。具体代码如下：",-1),y=o('<p>更多实现细节，可以参考 libgdx 在 GitHub上的介绍：<a href="https://github.com/libgdx/libgdx/wiki/Texture-packer#textureatlas" target="_blank" rel="noreferrer">Libgdx github wiki : Texture packer</a>。</p><blockquote><p>这套方案的优点是图片压缩效果比 webp 和 gif 更加显著，生成的合成图片比 webp 和 gif 更小。但是缺点是使用技术门槛较高，需要有一定 OpenGL 基础。</p></blockquote><ul><li><strong>关于引入三方库</strong></li></ul><p>在 App 中会引入各种三方的&quot;轮子&quot;，但是在引入之前最好权衡一下是否需要将其代码全部引入，造成不必要的代码或者资源也被打包到 APK 中。</p><p>比如在我们项目中曾经使用到哔哩哔哩的 ijkplayer 库，原因是我们实现的视频渲染功能，在某些旧的厂商手机中无法正常播放。后来分析下来总结是厂商手机并没有很好地支持谷歌最新的硬编码格式，而使用 ijkplayer 的软编码恰恰能解决此问题。</p><p>但是 ijkplayer 是一套完整的视频播放器，很多功能都不是必需的，这种情况下如果只是因为解决一个在很小部分的手机上的 bug，而引入一个比较大的库性价比是不高的，因此需要将 ijkplayer 中关于软编码的功能摘取出来放到项目中。</p><p>这种做法同样适用于对 webp 动图的实现方案，上文中有介绍我们使用了谷歌官方推荐的 libwebp，但是这个库不光是为了解析 webp 图片，还有很大一部分代码是为了实现生成一个 webp 图片，这部分代码我们是不需要的，因此也需要将这部分代码给删除，最终编译之后生成的 so 库大小可以减少 1/ 3 左右。</p><ul><li><strong>关于 App Bundle</strong></li></ul><p>如果 App 是海外项目，那么会舒服很多。因为谷歌官方支持动态发布。正常情况下我们的 APK 中为了更好地适配屏幕、语言等，会在项目里添加多套相应的资源文件，比如不同 hdpi 的 drawable，或者不同 CPU 下的 so 文件，最终打包生成的 APK 中会包含所有的资源文件。但是实际上一台手机设备只会用到这其中的一套资源，这无形中就已经产生了一些不必要的资源浪费。而谷歌的 Dynamic Delivery 功能就天然地解决了这个问题，通过 Google Play Store 安装 APK 时，会根据安装设备的属性，只选取相应的资源打包到 APK 文件中。</p><p>另外我们在项目中也使用了另一个 App Bundle 中比较好用的选项--Dynamic Asset Delivery。这个功能本来只是针对安装包超过 100M 的 App，但是不影响我们使用这套方案进行安装包优化。具体做法就是将大部分 assets 中的资源使用无损压缩的方式，压缩成一个 .obb 格式的文件，然后每次发布 APK 时都将此 obb 文件设置为 APK 的 bundle 文件，这样也可以减少用户实际的安装包大小。</p><blockquote><p>但是 App Bundle 目前只适合在 Google Play Store 上发布的项目，国内目前还是通过各家的插件化方案来实现动态部署，一定程度上也可以算作减少安装包大小的方案。</p></blockquote><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课内容主要介绍了我们平时在项目中关于安装包优化的一些实践总结，主要分两方面：</p><ul><li>安装包的监控</li></ul><p>主要介绍了几个可以用来分析安装包大小以及详细内容的工具：Apk Analyzer 和 ApkChecker。实际上，在开发过程中，良好的编程习惯和严格的 code review 也是非常重要的。</p><ul><li>安装包优化实践</li></ul><p>主要思路就是删减无用资源或者代码，并对资源文件进行相应的压缩优化。实际上除了资源文件，对于代码部分也可以更进一步的优化，比如使用 Proguard，或者直接使用 R8 编译方式。 只是因为 R8 还处于实验阶段，我们项目中没有过多的实践过程。对于这一部分极力推荐你阅读一下 Jake Wharton 的个人博客：<a href="https://jakewharton.com/blog/" target="_blank" rel="noreferrer">jakewharton</a> 中的相关介绍。</p>',17);function S(M,I,j,V,N,B){const a=n("Image");return l(),s("div",null,[c,i(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1D/98/CgqCHl7iDwSAcxVpAAESeM9GOkw713.png"}),t(),d,_,A,h,u,i(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iDxeAWk0XAAGXToDFD8k730.png"}),t(),g,i(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iDyuAfUVWAASa1y2IUjk925.png"}),t(),b,i(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1D/98/CgqCHl7iDzGAA1xGAADeNuNw4Kg407.png"}),t(),k,m,i(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iDziAHFtMAABQrq4bjvI623.png"}),t(),P,D,x,i(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1D/98/CgqCHl7iD0CAIBL9AADuuOoqScw829.png"}),t(),C,w,f,K,i(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iD02AfSHDAAhMCw88tKw252.png"}),t(),q,i(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iD1OAQHiyAADyfh_8hwY702.png"}),t(),T,i(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iD1mAE4P6AAF6BeEgjAE934.png"}),t(),y])}const G=r(p,[["render",S]]);export{F as __pageData,G as default};
