import{_ as s,o as a,g as o,Q as l}from"./chunks/framework.e0c66c3f.js";const C=JSON.parse('{"title":"Docker 能做什么？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4572) 01  Docker 安装：入门案例带你了解容器技术原理.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4572) 01  Docker 安装：入门案例带你了解容器技术原理.md","lastUpdated":1696338709000}'),n={name:"posts/backEnd/045_由浅入深吃透 Docker/(4572) 01  Docker 安装：入门案例带你了解容器技术原理.md"},p=l(`<p>咱们第一课时就先聊聊 Docker 的基础内容：Docker 能做什么，怎么安装 Docker，以及容器技术的原理。</p><h3 id="docker-能做什么" tabindex="-1">Docker 能做什么？ <a class="header-anchor" href="#docker-能做什么" aria-label="Permalink to &quot;Docker 能做什么？&quot;">​</a></h3><p>众所周知，Docker 是一个用于开发，发布和运行应用程序的开放平台。通俗地讲，Docker 类似于集装箱。在一艘大船上，各种货物要想被整齐摆放并且相互不受到影响，我们就需要把各种货物进行集装箱标准化。有了集装箱，我们就不需要专门运输水果或者化学用品的船了。我们可以把各种货品通过集装箱打包，然后统一放到一艘船上运输。Docker 要做的就是把各种软件打包成一个集装箱（镜像），然后分发，且在运行的时候可以相互隔离。</p><p>到此，相信你已经迫不及待想要体验下了，下面就让我们来安装一个 Docker。</p><h3 id="centos-下安装-docker" tabindex="-1">CentOS 下安装 Docker <a class="header-anchor" href="#centos-下安装-docker" aria-label="Permalink to &quot;CentOS 下安装 Docker&quot;">​</a></h3><p>Docker 是跨平台的解决方案，它支持在当前主流的各大平台安装，包括 Ubuntu、RHEL、CentOS、Debian 等 Linux 发行版，同时也可以在 OSX 、Microsoft Windows 等非 Linux 平台下安装使用。</p><p>因为 Linux 是 Docker 的原生支持平台，所以推荐你在 Linux 上使用 Docker。由于生产环境中我们使用 CentOS 较多，下面主要针对在 CentOS 平台下安装和使用 Docker 展开介绍。</p><h4 id="操作系统要求" tabindex="-1">操作系统要求 <a class="header-anchor" href="#操作系统要求" aria-label="Permalink to &quot;操作系统要求&quot;">​</a></h4><p>要安装 Docker，我们需要 CentOS 7 及以上的发行版本。建议使用<code>overlay2</code>存储驱动程序。</p><h4 id="卸载已有-docker" tabindex="-1">卸载已有 Docker <a class="header-anchor" href="#卸载已有-docker" aria-label="Permalink to &quot;卸载已有 Docker&quot;">​</a></h4><p>如果你已经安装过旧版的 Docker，可以先执行以下命令卸载旧版 Docker。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">remove</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-client</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-client-latest</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-common</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-latest</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-latest-logrotate</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-logrotate</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-engine</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">remove</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-client</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-client-latest</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-common</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-latest</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-latest-logrotate</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-logrotate</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-engine</span></span></code></pre></div><h4 id="安装-docker" tabindex="-1">安装 Docker <a class="header-anchor" href="#安装-docker" aria-label="Permalink to &quot;安装 Docker&quot;">​</a></h4><p>首次安装 Docker 之前，需要添加 Docker 安装源。添加之后，我们就可以从已经配置好的源，安装和更新 Docker。添加 Docker 安装源的命令如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum-config-manager</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--add-repo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">https://download.docker.com/linux/centos/docker-ce.repo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum-config-manager</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--add-repo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">https://download.docker.com/linux/centos/docker-ce.repo</span></span></code></pre></div><p>正常情况下，直接安装最新版本的 Docker 即可，因为最新版本的 Docker 有着更好的稳定性和安全性。你可以使用以下命令安装最新版本的 Docker。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce-cli</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd.io</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce-cli</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd.io</span></span></code></pre></div><p>如果你想要安装指定版本的 Docker，可以使用以下命令：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--showduplicates</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">18.06</span><span style="color:#9ECBFF;">.1.ce-3.el7</span><span style="color:#E1E4E8;">                   </span><span style="color:#9ECBFF;">docker-ce-stable</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">18.06</span><span style="color:#9ECBFF;">.0.ce-3.el7</span><span style="color:#E1E4E8;">                   </span><span style="color:#9ECBFF;">docker-ce-stable</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">18.03</span><span style="color:#9ECBFF;">.1.ce-1.el7.centos</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">docker-ce-stable</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">18.03</span><span style="color:#9ECBFF;">.0.ce-1.el7.centos</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">docker-ce-stable</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">17.12</span><span style="color:#9ECBFF;">.1.ce-1.el7.centos</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">docker-ce-stable</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">17.12</span><span style="color:#9ECBFF;">.0.ce-1.el7.centos</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">docker-ce-stable</span></span>
<span class="line"><span style="color:#B392F0;">docker-ce.x86_64</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">17.09</span><span style="color:#9ECBFF;">.1.ce-1.el7.centos</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">docker-ce-stable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--showduplicates</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">18.06</span><span style="color:#032F62;">.1.ce-3.el7</span><span style="color:#24292E;">                   </span><span style="color:#032F62;">docker-ce-stable</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">18.06</span><span style="color:#032F62;">.0.ce-3.el7</span><span style="color:#24292E;">                   </span><span style="color:#032F62;">docker-ce-stable</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">18.03</span><span style="color:#032F62;">.1.ce-1.el7.centos</span><span style="color:#24292E;">            </span><span style="color:#032F62;">docker-ce-stable</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">18.03</span><span style="color:#032F62;">.0.ce-1.el7.centos</span><span style="color:#24292E;">            </span><span style="color:#032F62;">docker-ce-stable</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">17.12</span><span style="color:#032F62;">.1.ce-1.el7.centos</span><span style="color:#24292E;">            </span><span style="color:#032F62;">docker-ce-stable</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">17.12</span><span style="color:#032F62;">.0.ce-1.el7.centos</span><span style="color:#24292E;">            </span><span style="color:#032F62;">docker-ce-stable</span></span>
<span class="line"><span style="color:#6F42C1;">docker-ce.x86_64</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">17.09</span><span style="color:#032F62;">.1.ce-1.el7.centos</span><span style="color:#24292E;">            </span><span style="color:#032F62;">docker-ce-stable</span></span></code></pre></div><p>然后选取想要的版本执行以下命令：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce-</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">VERSION_STRIN</span><span style="color:#E1E4E8;">G</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce-cli-</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">VERSION_STRIN</span><span style="color:#E1E4E8;">G</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd.io</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce-</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">VERSION_STRIN</span><span style="color:#24292E;">G</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce-cli-</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">VERSION_STRIN</span><span style="color:#24292E;">G</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd.io</span></span></code></pre></div><p>安装完成后，使用以下命令启动 Docker。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre></div><p>这里有一个国际惯例，安装完成后，我们需要使用以下命令启动一个 hello world 的容器。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">hello-world</span></span>
<span class="line"><span style="color:#B392F0;">Unable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">find</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello-world:latest&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">locally</span></span>
<span class="line"><span style="color:#B392F0;">latest:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Pulling</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">library/hello-world</span></span>
<span class="line"><span style="color:#B392F0;">0e03bdcc26d7:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">complete</span></span>
<span class="line"><span style="color:#B392F0;">Digest:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sha256:7f0a9f93b4aa3022c3a4c147a449bf11e0941a1fd0bf4a8e6c9408b2600777c5</span></span>
<span class="line"><span style="color:#B392F0;">Status:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Downloaded</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">newer</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">hello-world:latest</span></span>
<span class="line"><span style="color:#B392F0;">Hello</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Docker!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">hello-world</span></span>
<span class="line"><span style="color:#6F42C1;">Unable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">find</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello-world:latest&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">locally</span></span>
<span class="line"><span style="color:#6F42C1;">latest:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Pulling</span><span style="color:#24292E;"> </span><span style="color:#032F62;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">library/hello-world</span></span>
<span class="line"><span style="color:#6F42C1;">0e03bdcc26d7:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">complete</span></span>
<span class="line"><span style="color:#6F42C1;">Digest:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sha256:7f0a9f93b4aa3022c3a4c147a449bf11e0941a1fd0bf4a8e6c9408b2600777c5</span></span>
<span class="line"><span style="color:#6F42C1;">Status:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Downloaded</span><span style="color:#24292E;"> </span><span style="color:#032F62;">newer</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">for</span><span style="color:#24292E;"> </span><span style="color:#032F62;">hello-world:latest</span></span>
<span class="line"><span style="color:#6F42C1;">Hello</span><span style="color:#24292E;"> </span><span style="color:#032F62;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Docker!</span></span></code></pre></div><p>运行上述命令，Docker 首先会检查本地是否有<code>hello-world</code>这个镜像，如果发现本地没有这个镜像，Docker 就会去 Docker Hub 官方仓库下载此镜像，然后运行它。最后我们看到该镜像输出 &quot;Hello from Docker!&quot; 并退出。</p><blockquote><p>安装完成后默认 docker 命令只能以 root 用户执行，如果想允许普通用户执行 docker 命令，需要执行以下命令 sudo groupadd docker &amp;&amp; sudo gpasswd -a \${USER} docker &amp;&amp; sudo systemctl restart docker ，执行完命令后，退出当前命令行窗口并打开新的窗口即可。</p></blockquote><p>安装完 Docker，先不着急使用，先来了解下容器的技术原理，这样才能知其所以然。</p><h3 id="容器技术原理" tabindex="-1">容器技术原理 <a class="header-anchor" href="#容器技术原理" aria-label="Permalink to &quot;容器技术原理&quot;">​</a></h3><p>提起容器就不得不说 chroot，因为 chroot 是最早的容器雏形。chroot 意味着切换根目录，有了 chroot 就意味着我们可以把任何目录更改为当前进程的根目录，这与容器非常相似，下面我们通过一个实例了解下 chroot。</p><h4 id="chroot" tabindex="-1">chroot <a class="header-anchor" href="#chroot" aria-label="Permalink to &quot;chroot&quot;">​</a></h4><p>什么是 chroot 呢？下面是 chroot 维基百科定义：</p><blockquote><p>chroot 是在 Unix 和 Linux 系统的一个操作，针对正在运作的软件行程和它的子进程，改变它外显的根目录。一个运行在这个环境下，经由 chroot 设置根目录的程序，它不能够对这个指定根目录之外的文件进行访问动作，不能读取，也不能更改它的内容。</p></blockquote><p>通俗地说 ，chroot 就是可以改变某进程的根目录，使这个程序不能访问目录之外的其他目录，这个跟我们在一个容器中是很相似的。下面我们通过一个实例来演示下 chroot。</p><p>首先我们在当前目录下创建一个 rootfs 目录：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rootfs</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rootfs</span></span></code></pre></div><p>这里为了方便演示，我使用现成的 busybox 镜像来创建一个系统，镜像的概念和组成后面我会详细讲解，如果你没有 Docker 基础可以把下面的操作命令理解成在 rootfs 下创建了一些目录和放置了一些二进制文件。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rootfs</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> create busybox)</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-o</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">busybox.tar</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">busybox.tar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rootfs</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">export</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> create busybox)</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">busybox.tar</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">busybox.tar</span></span></code></pre></div><p>执行完上面的命令后，在 rootfs 目录下，我们会得到一些目录和文件。下面我们使用 ls 命令查看一下 rootfs 目录下的内容。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ls</span></span>
<span class="line"><span style="color:#B392F0;">bin</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">busybox.tar</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">dev</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">etc</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">home</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">proc</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">sys</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">tmp</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">usr</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">var</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ls</span></span>
<span class="line"><span style="color:#6F42C1;">bin</span><span style="color:#24292E;">  </span><span style="color:#032F62;">busybox.tar</span><span style="color:#24292E;">  </span><span style="color:#032F62;">dev</span><span style="color:#24292E;">  </span><span style="color:#032F62;">etc</span><span style="color:#24292E;">  </span><span style="color:#032F62;">home</span><span style="color:#24292E;">  </span><span style="color:#032F62;">proc</span><span style="color:#24292E;">  </span><span style="color:#032F62;">root</span><span style="color:#24292E;">  </span><span style="color:#032F62;">sys</span><span style="color:#24292E;">  </span><span style="color:#032F62;">tmp</span><span style="color:#24292E;">  </span><span style="color:#032F62;">usr</span><span style="color:#24292E;">  </span><span style="color:#032F62;">var</span></span></code></pre></div><p>可以看到我们在 rootfs 目录下初始化了一些目录，下面让我们通过一条命令来见证 chroot 的神奇之处。使用以下命令，可以启动一个 sh 进程，并且把 /home/centos/rootfs 作为 sh 进程的根目录。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">chroot</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/home/centos/rootfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/bin/sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chroot</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/home/centos/rootfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/bin/sh</span></span></code></pre></div><p>此时，我们的命令行窗口已经处于上述命令启动的 sh 进程中。在当前 sh 命令行窗口下，我们使用 ls 命令查看一下当前进程，看是否真的与主机上的其他目录隔离开了。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> # </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">ls </span><span style="color:#F97583;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">bin  busybox.tar  dev  etc  home  proc  root  sys  tmp  usr  </span><span style="color:#F97583;">var</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;"> # </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">ls </span><span style="color:#D73A49;">/</span></span>
<span class="line"><span style="color:#24292E;">bin  busybox.tar  dev  etc  home  proc  root  sys  tmp  usr  </span><span style="color:#D73A49;">var</span></span></code></pre></div><p>这里可以看到当前进程的根目录已经变成了主机上的 /home/centos/rootfs 目录。这样就实现了当前进程与主机的隔离。到此为止，一个目录隔离的容器就完成了。</p><p>但是，此时还不能称之为一个容器，为什么呢？你可以在上一步（使用 chroot 启动命令行窗口）执行以下命令，查看如下路由信息：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">etc # </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">ip route</span></span>
<span class="line"><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> via </span><span style="color:#79B8FF;">172.20</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;"> dev eth0</span></span>
<span class="line"><span style="color:#79B8FF;">172.17</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0.0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> dev docker0 scope link  src </span><span style="color:#79B8FF;">172.17</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0.1</span></span>
<span class="line"><span style="color:#79B8FF;">172.20</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1.0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24</span><span style="color:#E1E4E8;"> dev eth0 scope link  src </span><span style="color:#79B8FF;">172.20</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1.3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;">etc # </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">ip route</span></span>
<span class="line"><span style="color:#D73A49;">default</span><span style="color:#24292E;"> via </span><span style="color:#005CC5;">172.20</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;"> dev eth0</span></span>
<span class="line"><span style="color:#005CC5;">172.17</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0.0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> dev docker0 scope link  src </span><span style="color:#005CC5;">172.17</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0.1</span></span>
<span class="line"><span style="color:#005CC5;">172.20</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1.0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24</span><span style="color:#24292E;"> dev eth0 scope link  src </span><span style="color:#005CC5;">172.20</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1.3</span></span></code></pre></div><p>执行 ip route 命令后，你可以看到网络信息并没有隔离，实际上进程等信息此时也并未隔离。要想实现一个完整的容器，我们还需要 Linux 的其他三项技术： Namespace、Cgroups 和联合文件系统。</p><p>Docker 是利用 Linux 的 Namespace 、Cgroups 和联合文件系统三大机制来保证实现的， 所以它的原理是使用 Namespace 做主机名、网络、PID 等资源的隔离，使用 Cgroups 对进程或者进程组做资源（例如：CPU、内存等）的限制，联合文件系统用于镜像构建和容器运行环境。</p><p>后面我会对这些技术进行详细讲解，这里我就简单解释下它们的作用。</p><h4 id="namespace" tabindex="-1">Namespace <a class="header-anchor" href="#namespace" aria-label="Permalink to &quot;Namespace&quot;">​</a></h4><p>Namespace 是 Linux 内核的一项功能，该功能对内核资源进行隔离，使得容器中的进程都可以在单独的命名空间中运行，并且只可以访问当前容器命名空间的资源。Namespace 可以隔离进程 ID、主机名、用户 ID、文件名、网络访问和进程间通信等相关资源。</p><p>Docker 主要用到以下五种命名空间。</p><ul><li><p>pid namespace：用于隔离进程 ID。</p></li><li><p>net namespace：隔离网络接口，在虚拟的 net namespace 内用户可以拥有自己独立的 IP、路由、端口等。</p></li><li><p>mnt namespace：文件系统挂载点隔离。</p></li><li><p>ipc namespace：信号量,消息队列和共享内存的隔离。</p></li><li><p>uts namespace：主机名和域名的隔离。</p></li></ul><h4 id="cgroups" tabindex="-1">Cgroups <a class="header-anchor" href="#cgroups" aria-label="Permalink to &quot;Cgroups&quot;">​</a></h4><p>Cgroups 是一种 Linux 内核功能，可以限制和隔离进程的资源使用情况（CPU、内存、磁盘 I/O、网络等）。在容器的实现中，Cgroups 通常用来限制容器的 CPU 和内存等资源的使用。</p><h4 id="联合文件系统" tabindex="-1">联合文件系统 <a class="header-anchor" href="#联合文件系统" aria-label="Permalink to &quot;联合文件系统&quot;">​</a></h4><p>联合文件系统，又叫 UnionFS，是一种通过创建文件层进程操作的文件系统，因此，联合文件系统非常轻快。Docker 使用联合文件系统为容器提供构建层，使得容器可以实现写时复制以及镜像的分层构建和存储。常用的联合文件系统有 AUFS、Overlay 和 Devicemapper 等。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>容器技术从 1979 年 chroot 的首次问世便已崭露头角，但是到了 2013 年，Dokcer 的横空出世才使得容器技术迅速发展，可见 Docker 对于容器技术的推动力和影响力。</p><blockquote><p>另外， Docker 还提供了工具和平台来管理容器的生命周期：</p><ol><li><p>使用容器开发应用程序及其支持组件。</p></li><li><p>容器成为分发和测试你的应用程序的单元。</p></li><li><p>可以将应用程序作为容器或协调服务部署到生产环境中。无论您的生产环境是本地数据中心，云提供商还是两者的混合，其工作原理都相同。</p></li></ol></blockquote><p>到此，相信你已经了解了实现容器的基本技术原理，并且对 Docker 的作用有了一定认知。那么你知道为什么容器技术在 Docker 出现之前一直没有爆发的根本原因吗？思考后，可以把你的想法写在留言区。</p><p>下一课时，我将讲解 Docker 的架构设计以及 Docker 的三大核心概念。</p>`,63),e=[p];function c(t,r,y,E,F,i){return a(),o("div",null,e)}const h=s(n,[["render",c]]);export{C as __pageData,h as default};
