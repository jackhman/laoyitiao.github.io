import{_ as l,j as o,o as e,g as t,k as n,h as p,Q as s}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"基础配置 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3534) 17  打包发布：Flutter 应用，你离线上运营只差最后一步.md","filePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3534) 17  打包发布：Flutter 应用，你离线上运营只差最后一步.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/101-Flutter快学快用24讲文档/(3534) 17  打包发布：Flutter 应用，你离线上运营只差最后一步.md"},c=s(`<p>本课时主要介绍如何将 Two You App 项目，打包成 apk 和 ipa 文件。在打包前，我们首先需要将 App 的名称和图标进行修改，其次增加一些功能授权，确保我们打包后的文件安装是可用的。</p><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><p>在打包之前我们需要修改 App 的名字和图标，Android 和 iOS 的修改方式有点不同，我们先来看下在 Android 中的修改方式。</p><h4 id="android" tabindex="-1">Android <a class="header-anchor" href="#android" aria-label="Permalink to &quot;Android&quot;">​</a></h4><p>我们打开项目路径下的 android/app/src/main/AndroidMainfest.xml 文件，在该文件中找到下面两个字段：</p><ul><li><p>android:label，为应用展示在手机中的名字，这里我们修改为 Two You；</p></li><li><p>android:icon，为应用展示在手机中的图标，可以修改图片的名字，具体图标文件存储在 android/app/src/main/res 中。</p></li></ul><p>其次需要增加网络访问权限，在 manifest（application 配置下面）中增加下面四行配置：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">uses-permission</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">android:name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;android.permission.READ_PHONE_STATE&quot;</span><span style="color:#E1E4E8;"> /&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">uses-permission</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">android:name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;android.permission.INTERNET&quot;</span><span style="color:#E1E4E8;"> /&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">uses-permission</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">android:name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;android.permission.ACCESS_NETWORK_STATE&quot;</span><span style="color:#E1E4E8;"> /&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">uses-permission</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">android:name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;android.permission.ACCESS_WIFI_STATE&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">uses-permission</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">android:name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;android.permission.READ_PHONE_STATE&quot;</span><span style="color:#24292E;"> /&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">uses-permission</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">android:name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;android.permission.INTERNET&quot;</span><span style="color:#24292E;"> /&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">uses-permission</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">android:name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;android.permission.ACCESS_NETWORK_STATE&quot;</span><span style="color:#24292E;"> /&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">uses-permission</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">android:name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;android.permission.ACCESS_WIFI_STATE&quot;</span><span style="color:#24292E;"> /&gt;</span></span></code></pre></div><p>这样就将打包所需要的配置信息处理完了，接下来我们看下 iOS 的配置。</p><h4 id="ios" tabindex="-1">iOS <a class="header-anchor" href="#ios" aria-label="Permalink to &quot;iOS&quot;">​</a></h4><p>我们打开项目路径下的 ios/Runner/info.plist 文件，在文件中找到 CFBundleName 的 key，然后修改该 key 对应的值，修改为下面的配置：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;CFBundleName&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;  </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;Two You&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;CFBundleName&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;  </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;Two You&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>图标的配置在 ios/Runner/Assets.xcassets/AppIcon.appiconset/Content.json 文件中，具体需要根据不同的机型做不同的配置。</p><p>请注意，如果需要申请其他权限，例如本地存储都需要在 AndroidMainfest.xml 和 info.plist 中增加相应的配置，不然可能会导致异常或者 Crash。具体权限配置查询，<a href="https://developer.android.com/guide/topics/manifest/manifest-intro.html" target="_blank" rel="noreferrer">Android 请参考这里</a>，<a href="https://pub.dev/packages/flutter_permissions" target="_blank" rel="noreferrer">iOS 请参考这里</a>。</p><p>如上配置修改完成后，我们可以在虚拟机上重新构建 App，构建完成后你可以在虚拟机上看到图标和名称的效果，接下来我们开始介绍打包过程。</p><h3 id="打包发布" tabindex="-1">打包发布 <a class="header-anchor" href="#打包发布" aria-label="Permalink to &quot;打包发布&quot;">​</a></h3><p>打包发布过程在官网都有比较详细的说明文档，不过这里我还是会针对过程中的每一步进行阐述，减少你在打包发布过程中的问题。由于目前没有私人的苹果开发者账号，因此这里只说明 Android 中的打包问题，iOS 部分会详细介绍下流程。</p><h4 id="android-1" tabindex="-1">Android <a class="header-anchor" href="#android-1" aria-label="Permalink to &quot;Android&quot;">​</a></h4><p>按照如下步骤，一步步操作。在每个步骤中，我会详细说明需要注意的细节点，请认真阅读每个过程，以免出现一些不必要的问题。</p><p>1.<strong>keytool 是否安装</strong> 。一般情况下，如果安装了 Android Studio ，keytool 是会默认安装，如果你安装了 Java ，在 Java 的 bin 目录也可以找到该工具，没有安装 Java 的话可以前往 <a href="https://java.com/en/download/help/download_options.xml" target="_blank" rel="noreferrer">这里安装 Java</a>；</p><p>2.<strong>创建 keystore</strong>，有了 keytool 工具后，运行如下命令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">keytool </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">genkey </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">v </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keystore </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">key.jks </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keyalg RSA </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keysize </span><span style="color:#79B8FF;">2048</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">validity </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">alias key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">keytool </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">genkey </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">v </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">keystore </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">key.jks </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">keyalg RSA </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">keysize </span><span style="color:#005CC5;">2048</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">validity </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">alias key</span></span></code></pre></div><p>其中 genkey 是生成一个密钥对，keystore 是密钥库的名称（可以根据你自己的实际情况修改），keyalg 是加密算法，keysize 是大小，validity 为有效期天数，alias 为别名。在上面的配置信息中， alias 的 key 是比较关键的，如果大家需要修改需要记住该 alias。</p><p>输入该命令后，需要你填写各种信息，其中涉及一个密码比较关键（请记住该密码），其他的信息按照你的想法输入就行。执行完成后会提示下面的信息，代表成功创建。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[正在存储</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Users</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">xxx</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">key.jks]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[正在存储</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Users</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">xxx</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">key.jks]</span></span></code></pre></div><p>这里请记住该 keystore 的目录地址。</p><p>3.<strong>引用 keystore 生成 key.properties</strong>，在项目的 android 目录下创建一个 key.properties 文件，该文件包含如下配置信息：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">storePassword</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">刚才输入的密码 </span></span>
<span class="line"><span style="color:#E1E4E8;">keyPassword</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">刚才输入的密码 </span></span>
<span class="line"><span style="color:#E1E4E8;">keyAlias</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">刚才设置的别名 </span></span>
<span class="line"><span style="color:#E1E4E8;">storeFile</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">生成的 keystore 文件地址路径</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">storePassword</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">刚才输入的密码 </span></span>
<span class="line"><span style="color:#24292E;">keyPassword</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">刚才输入的密码 </span></span>
<span class="line"><span style="color:#24292E;">keyAlias</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">刚才设置的别名 </span></span>
<span class="line"><span style="color:#24292E;">storeFile</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">生成的 keystore 文件地址路径</span></span></code></pre></div><p>这四个数据一定要配置正确，不然会在打包时会报错，报错会提示相应的数据错误。</p><p>4.<strong>配置签名</strong>，具体需要打开 android/app/build.gradle 该文件，在该文件中找到下面信息</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">android {</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">android {</span></span></code></pre></div><p>修改为下面的配置，主要是增加了对 key.properties 文件引入。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">def keystorePropertiesFile </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> rootProject.</span><span style="color:#B392F0;">file</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;key.properties&quot;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">def keystoreProperties </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Properties</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">keystoreProperties.</span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileInputStream</span><span style="color:#E1E4E8;">(keystorePropertiesFile)) </span></span>
<span class="line"><span style="color:#E1E4E8;">android {</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">def keystorePropertiesFile </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> rootProject.</span><span style="color:#6F42C1;">file</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;key.properties&quot;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">def keystoreProperties </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Properties</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">keystoreProperties.</span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileInputStream</span><span style="color:#24292E;">(keystorePropertiesFile)) </span></span>
<span class="line"><span style="color:#24292E;">android {</span></span></code></pre></div><p>然后找到下面配置。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">buildTypes { </span></span>
<span class="line"><span style="color:#E1E4E8;">    release { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// TODO: Add your own signing config for the release build. </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Signing with the debug keys for now, so \`flutter run --release\` works. </span></span>
<span class="line"><span style="color:#E1E4E8;">        signingConfig signingConfigs.debug </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">buildTypes { </span></span>
<span class="line"><span style="color:#24292E;">    release { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// TODO: Add your own signing config for the release build. </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Signing with the debug keys for now, so \`flutter run --release\` works. </span></span>
<span class="line"><span style="color:#24292E;">        signingConfig signingConfigs.debug </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>替换为下面这份配置。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">signingConfigs { </span></span>
<span class="line"><span style="color:#E1E4E8;">    release { </span></span>
<span class="line"><span style="color:#E1E4E8;">        keyAlias keystoreProperties[</span><span style="color:#9ECBFF;">&#39;keyAlias&#39;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">        keyPassword keystoreProperties[</span><span style="color:#9ECBFF;">&#39;keyPassword&#39;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">        storeFile </span><span style="color:#B392F0;">file</span><span style="color:#E1E4E8;">(keystoreProperties[</span><span style="color:#9ECBFF;">&#39;storeFile&#39;</span><span style="color:#E1E4E8;">]) </span></span>
<span class="line"><span style="color:#E1E4E8;">        storePassword keystoreProperties[</span><span style="color:#9ECBFF;">&#39;storePassword&#39;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">buildTypes { </span></span>
<span class="line"><span style="color:#E1E4E8;">    release { </span></span>
<span class="line"><span style="color:#E1E4E8;">        signingConfig signingConfigs.release </span></span>
<span class="line"><span style="color:#E1E4E8;">        minifyEnabled </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        useProguard </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        proguardFiles </span><span style="color:#B392F0;">getDefaultProguardFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;proguard-android.txt&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&#39;proguard-rules.pro&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">signingConfigs { </span></span>
<span class="line"><span style="color:#24292E;">    release { </span></span>
<span class="line"><span style="color:#24292E;">        keyAlias keystoreProperties[</span><span style="color:#032F62;">&#39;keyAlias&#39;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">        keyPassword keystoreProperties[</span><span style="color:#032F62;">&#39;keyPassword&#39;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">        storeFile </span><span style="color:#6F42C1;">file</span><span style="color:#24292E;">(keystoreProperties[</span><span style="color:#032F62;">&#39;storeFile&#39;</span><span style="color:#24292E;">]) </span></span>
<span class="line"><span style="color:#24292E;">        storePassword keystoreProperties[</span><span style="color:#032F62;">&#39;storePassword&#39;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">buildTypes { </span></span>
<span class="line"><span style="color:#24292E;">    release { </span></span>
<span class="line"><span style="color:#24292E;">        signingConfig signingConfigs.release </span></span>
<span class="line"><span style="color:#24292E;">        minifyEnabled </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        useProguard </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        proguardFiles </span><span style="color:#6F42C1;">getDefaultProguardFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;proguard-android.txt&#39;</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&#39;proguard-rules.pro&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>5.<strong>混淆代码包</strong>，这点类似于前端所说的 JS 压缩，主要是缩减代码，并达到不可阅读的目的。完成混淆功能，需要创建 lib/android/app/proguard-rule 文件，具体可以按照如下的方式配置：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#79B8FF;">Flutter</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Wrapper</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keep </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> io.flutter.app.</span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">; } </span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keep </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> io.flutter.plugin.</span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">  { </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">; } </span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keep </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> io.flutter.util.</span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">  { </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">; } </span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keep </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> io.flutter.view.</span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">  { </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">; } </span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keep </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> io.flutter.</span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">  { </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">; } </span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keep </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> io.flutter.plugins.</span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">  { </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">; }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#</span><span style="color:#005CC5;">Flutter</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Wrapper</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">keep </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> io.flutter.app.</span><span style="color:#D73A49;">**</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">; } </span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">keep </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> io.flutter.plugin.</span><span style="color:#D73A49;">**</span><span style="color:#24292E;">  { </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">; } </span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">keep </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> io.flutter.util.</span><span style="color:#D73A49;">**</span><span style="color:#24292E;">  { </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">; } </span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">keep </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> io.flutter.view.</span><span style="color:#D73A49;">**</span><span style="color:#24292E;">  { </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">; } </span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">keep </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> io.flutter.</span><span style="color:#D73A49;">**</span><span style="color:#24292E;">  { </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">; } </span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">keep </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> io.flutter.plugins.</span><span style="color:#D73A49;">**</span><span style="color:#24292E;">  { </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">; }</span></span></code></pre></div><p>上述配置只混淆了 Flutter 引擎库，其他的库或者项目中的库也可以使用这种方式，具体的配置规则大家可以搜索 Proguard 的常用规则。</p><p>增加需要混淆压缩的配置文件后，需要在 lib/android/app/build.gradle 中打开混淆压缩的逻辑，在 android 中增加下面一段配置。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">buildTypes { </span></span>
<span class="line"><span style="color:#E1E4E8;">        release { </span></span>
<span class="line"><span style="color:#E1E4E8;">            signingConfig signingConfigs.release </span></span>
<span class="line"><span style="color:#E1E4E8;">            minifyEnabled </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            useProguard </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            proguardFiles </span><span style="color:#B392F0;">getDefaultProguardFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;proguard-android.txt&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&#39;proguard-rules.pro&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">buildTypes { </span></span>
<span class="line"><span style="color:#24292E;">        release { </span></span>
<span class="line"><span style="color:#24292E;">            signingConfig signingConfigs.release </span></span>
<span class="line"><span style="color:#24292E;">            minifyEnabled </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            useProguard </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            proguardFiles </span><span style="color:#6F42C1;">getDefaultProguardFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;proguard-android.txt&#39;</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&#39;proguard-rules.pro&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p>其中 minifyEnabled 和 useProguard 配合使用都为 true 才会开启压缩混淆，如果只是 minifyEnabled 为 true 只会打开压缩，并不会混淆。</p><p>以上完成后，我们在项目根目录，运行下面命令启动打包 apk。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">flutter build apk</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">flutter build apk</span></span></code></pre></div><p>执行成功后，会提示具体 apk 保存的位置，然后将该 apk 发送到 Android 手机，就可以在手机上看到我们的具体效果了。</p><p><strong>可能出现的问题</strong>（后续有出现其他的，可以评论，我会尽量帮大家解答，解答完成后再更新到这里）：</p><p>1.<strong>Execution failed for task &#39;:flutter_webview_plugin:verifyReleaseResources&#39;. &gt; A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade.</strong></p><p>原因：我们使用了一个 flutter_webview_plugin: ^0.3.0+2 的包，会导致在打包的时候无法找到。</p><p>解决：你先将这个包的版本修改为 flutter_webview_plugin: ^0.3.0 这个，其次删掉 pubspec.lock 文件，依次等待执行下面几个命令即可：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">flutter clean </span></span>
<span class="line"><span style="color:#E1E4E8;">flutter pub get</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">flutter clean </span></span>
<span class="line"><span style="color:#24292E;">flutter pub get</span></span></code></pre></div><p>2.<strong>在虚拟机上运行正常，在实体机上运行出现各种奇怪问题，比如一打开直接黑屏。</strong></p><p>原因：实体机上各种权限都是需要申请，比如说网络权限、相机权限等，如果没有申请会导致网络请求失败超时。我们 App 中首次需要等待用户信息返回数据，因此可能会导致的就是黑屏。</p><p>解决：对于黑屏，上面已经说明了需要增加网络授权。关于这类问题的话，你可以使用排除法，例如只展示一个简单 Text 组件，看下打包后是否正常，然后慢慢地增加组件。经过这个过程，你会发现到具体的问题原因。还有一种方法就是外接设备进行调试。</p><p>其他问题欢迎大家评论补充，接下来我们看下 iOS 的打包过程。</p><h4 id="ios-1" tabindex="-1">iOS <a class="header-anchor" href="#ios-1" aria-label="Permalink to &quot;iOS&quot;">​</a></h4><p>完成 iOS 的打包和发布，需要几个先决条件：</p><ol><li><p>Xcode，如果你是非 Mac 系统，需要先安装虚拟机，然后安装 Mac 系统，具体的流程你可以去搜索安装；</p></li><li><p>苹果开发者账户，这个需要下载苹果的开发者 App，然后在 App 上认证支付，认证完成后创建项目，并设置一个 Bundle Id。</p></li></ol><p>接下来我们看下具体的打包步骤：</p><p>1.<strong>打开 Xcode</strong> ，并打开 Flutter 中的 ios 目录；</p><p>2.打开后，<strong>点击左侧项目的 Runner</strong>，然后选择右侧的 Singing &amp; Capabilites，修改 Bundle Id 为对应在苹果开发者中创建的项目 Bundle Id，接下来选择 Team，登录开发者账户，自动查询相应的项目信息，如图 1 截图指引所示；</p>`,61),i=s('<p>图 1 Xcode 配置指引</p><p>3.回到项目根目录中运行下面命令并<strong>执行 Flutter 的命令创建 relase 版本</strong>；</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">flutter build ios</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">flutter build ios</span></span></code></pre></div><p>4.在 Xcode 中，**配置应用程序版本并构建一个可测试的 App 版本，**步骤如下。</p><ul><li><p>首先选择 Product &gt; Scheme &gt; Runner，然后选择 Product &gt; Destination &gt; Generic iOS Device。</p></li><li><p><strong>选中左侧的 Runner</strong>，并打开右侧的 General ，然后配置 Identity 中的版本号 Version 和 Build，如图 2 所示。</p></li></ul>',5),E=s('<p>图 2 配置指引</p><br><ul><li><p><strong>选择 Product &gt; Archive 以生成构建文件。</strong></p></li><li><p>在 Xcode Organizer 窗口的边栏中，选择 iOS 应用程序，然后<strong>选中刚刚构建的文件。</strong></p></li><li><p>点击 Validate... 按钮，然后 <strong>Upload to App Store</strong>，然后你就可以在开发者官网中查看构建情况。</p></li></ul><p>以上就完成了构建过程，构建成功后会有相应的邮件提醒，然后就可以发布到 TestFlight 进行安装测试了。如果你还需要发布到 App Store，则按照苹果的审核要求提交审核即可。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时着重介绍了如何打包发布我们的 App，其中大部分都是实践操作，只要你根据步骤去实践即可。学完本课时你需要掌握 Android 和 iOS 两个平台的打包发布流程。</p><p>下一课时，我将完善我们 App 的整体代码逻辑，其中包括：我的消息、系统设置、搜索等功能。我会通过演示界面效果和绘制组件树来介绍整体代码逻辑，对于其中特殊的点会进一步说明。谢谢。</p><p><a href="https://github.com/love-flutter/flutter-column" target="_blank" rel="noreferrer">点击此链接查看本课时源码</a></p>',8);function y(d,g,u,k,h,F){const a=o("Image");return e(),t("div",null,[c,n(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/3D/C7/Ciqc1F8qoliAHwU5AALSnCYSZPg629.png"}),p(),i,n(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/3D/D3/CgqCHl8qopOARENrAAaU0YGW44c040.png"}),p(),E])}const b=l(r,[["render",y]]);export{A as __pageData,b as default};
