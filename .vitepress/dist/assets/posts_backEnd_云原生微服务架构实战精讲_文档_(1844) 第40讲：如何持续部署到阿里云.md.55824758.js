import{_ as l,j as p,o,g as e,k as t,Q as c,s,h as a}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"Helm 介绍 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1844) 第40讲：如何持续部署到阿里云.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1844) 第40讲：如何持续部署到阿里云.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1844) 第40讲：如何持续部署到阿里云.md"},E=c(`<p>第 39 课时介绍了持续集成，本课时接着介绍如何实现持续部署，持续部署从容器镜像开始，把应用所有的微服务部署在云平台上。当有新的容器镜像被发布之后，持续部署负责更新应用。对于微服务架构的应用来说，持续部署需确保相互独立的各个微服务可以协同工作；对于多个微服务相互协作的场景，需要在持续部署的环境上进行测试。本课时介绍的持续部署的实现方式，不限定于特定的云平台，只需要有能够正常访问的 Kubernetes 集群即可。</p><p>每个微服务都需要独立部署，包括服务本身，以及服务依赖的支撑服务等。在这些支撑服务中，有些是微服务独有的，比如数据库；有些则是很多微服务共享的，比如 Apache Kafka 这样的消息代理。Kubernetes 上基本的部署方式是创建部署、有状态集和服务等资源，以 YAML 文件来描述，可直接通过 YAML 文件来创建资源的做法，只适合于非常简单的应用。当应用变得复杂时，需要 更 有效 的方式来管理部署相关的各种资源。目前在 Kubernetes 上最常用的部署方式是使用 Helm。</p><h3 id="helm-介绍" tabindex="-1">Helm 介绍 <a class="header-anchor" href="#helm-介绍" aria-label="Permalink to &quot;Helm 介绍&quot;">​</a></h3><p>Helm 是 Kubernetes 上的软件包管理软件，类似于 Node.js 中的 npm 或 yarn，其已经成为 Kubernetes 上管理软件的事实上的标准。Helm 是 CNCF 中已经毕业的项目，由社区负责维护，目前有 2 和 3 两个主流版本，本课时以最新版本 3 为主。</p><p>Helm 中的每个软件包称为<strong>图表（Chart）</strong> ，它的一个优势是促进了应用软件包的共享。社区贡献了很多运行不同应用的图表，发布在公共的图表仓库中。绝大部分公开的应用，都可以在仓库中找到相应的 Helm 图表。通过 <a href="https://hub.helm.sh/" target="_blank" rel="noreferrer">Helm Hub</a>可以发布和查找 Helm 图表。</p><p>Helm 中有 3 个基本的概念，如下表所示。</p><table><thead><tr><th><strong>概念</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>图表</td><td>创建 Kubernetes 上应用的实例所需的信息集合</td></tr><tr><td>配置</td><td>配置信息，与图表合并来创建可以发布的对象</td></tr><tr><td>发行</td><td>图表的一个运行中的实例，与配置结合在一起</td></tr></tbody></table><p>以 PostgreSQL 的 Helm 图表为例，该图表中包含了部署 PostgreSQL 所需的有状态集、配置表、服务和密钥等资源的声明；配置指的是根据应用部署的需要，为图表提供的配置项指定具体值，比如设置数据库的名称、访问数据库的用户名和密码等。把自定义配置值和图表结合起来，就得到了一个发行，可以在 Kubernetes 上运行。</p><p>我们可以在 Bitnami 的 Helm 图表仓库中找到 PostgreSQL 图表。在使用图表之前，首先需要把该 Helm 图表仓库添加到 Helm 中，如下面的代码所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ helm repo add bitnami https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//charts.bitnami.com/bitnami</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ helm repo add bitnami https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//charts.bitnami.com/bitnami</span></span></code></pre></div><p>每个 Helm 图表的根目录下都包含一个 values.yaml 文件，该文件中包含了图表提供的配置项及默认值。在以 helm install 命令来安装应用时，可以通过 --set 参数来指定配置项的值，或是通过 -f 参数来指定包含配置值的文件。提供的配置值会覆盖图表所提供的默认值。</p><p>下面代码中的 YAML 文件是安装 PostgreSQL 图表时使用的配置文件的内容。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">postgresqlDatabase</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">testdb</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">postgresqlUsername</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">myuser</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">postgresqlPassword</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mypassword</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">postgresqlDatabase</span><span style="color:#24292E;">: </span><span style="color:#032F62;">testdb</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">postgresqlUsername</span><span style="color:#24292E;">: </span><span style="color:#032F62;">myuser</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">postgresqlPassword</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mypassword</span></span></code></pre></div><p>通过下面的命令安装 Helm 图表，第一个参数是发行的名称。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ helm install test</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">postgresql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f values.yaml bitnami</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">postgresql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ helm install test</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">postgresql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f values.yaml bitnami</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">postgresql</span></span></code></pre></div><p>当需要对已有的应用发行进行修改时，可以使用 helm upgrade 命令，如下所示。在进行修改时，我们提供了新的配置文件。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ helm upgrade test</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">postgresql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f values</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">v2.yaml bitnami</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">postgresql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ helm upgrade test</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">postgresql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f values</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">v2.yaml bitnami</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">postgresql</span></span></code></pre></div><p>Helm 负责记录每次对发行所做的修改，通过 helm history 命令可以查看一个发行的全部历史版本信息。如果对发行所做的修改产生了问题，可以通过 helm rollback 命令来回退到指定的版本。在下面的代码中，把发行 test-postgresql 回退到版本 1。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ helm rollback test</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">postgresql </span><span style="color:#79B8FF;">1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ helm rollback test</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">postgresql </span><span style="color:#005CC5;">1</span></span></code></pre></div><p>通过 helm uninstall 命令可以删除应用的发行，如下面的代码所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ helm uninstall test</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">postgresql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ helm uninstall test</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">postgresql</span></span></code></pre></div><p>除了上面提供的命令之外，常用的其他 Helm 命令如下表所示：</p><table><thead><tr><th><strong>命令</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>list</td><td>列出来所有的发行</td></tr><tr><td>plugin</td><td>管理 Helm 插件</td></tr><tr><td>pull</td><td>从仓库中下载图表文件到本地</td></tr><tr><td>search</td><td>搜索图表</td></tr><tr><td>show</td><td>显示图表的信息</td></tr><tr><td>status</td><td>查看 Helm 发行的状态</td></tr></tbody></table><h3 id="创建-helm-图表" tabindex="-1">创建 Helm 图表 <a class="header-anchor" href="#创建-helm-图表" aria-label="Permalink to &quot;创建 Helm 图表&quot;">​</a></h3><p>虽然公开的 Helm 图表仓库中包含了常用服务的图表，但是安装 私有 应用的图表需要手动创建。以行程管理服务的 Helm 图表来进行说明，我们首先使用 helm create 命令来创建图表，如下面的代码所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ helm create trip</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ helm create trip</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span></span></code></pre></div><p>该命令会在当前目录下创建一个名为 trip-service 的子目录，其中包含了 Helm 图表的基本代码。下面的代码给出了自动创建 的 图表所包含的目录和文件。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">│  .helmignore</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│  Chart.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│  values.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">├─charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">└─templates</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  deployment.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  hpa.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  ingress.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  NOTES.txt</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  service.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  serviceaccount.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│  _helpers.tpl</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">│</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">└─tests</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">test-connection.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">│  .helmignore</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│  Chart.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│  values.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">├─charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">└─templates</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  deployment.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  hpa.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  ingress.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  NOTES.txt</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  service.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  serviceaccount.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│  _helpers.tpl</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">│</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">└─tests</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">test-connection.yaml</span></span></code></pre></div><p>下表给出了这些目录或文件的说明。</p><table><thead><tr><th><strong>文件或目录</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>Chart.yaml</td><td>图表的元数据，包括名称、描述、类型和版本号</td></tr><tr><td>values.yaml</td><td>图表提供的配置项及其默认值</td></tr><tr><td>charts</td><td>所依赖的其他图表</td></tr><tr><td>templates</td><td>资源的模板</td></tr></tbody></table><p>对一个 Helm 图表来说，最重要的是 templates 目录中包含的模板文件。下表给出了 templates 目录下的 子 目录或文件的说明。</p><table><thead><tr><th><strong>文件或目录</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>_helpers.tpl</td><td>包含可复用的变量的声明</td></tr><tr><td>YAML文件</td><td>Kubernetes 资源声明模板</td></tr><tr><td>NOTES.txt</td><td>图表安装之后显示的内容</td></tr><tr><td>tests</td><td>图表测试用例</td></tr></tbody></table><p>templates 目录下的每个模板文件都会被转换成 YAML 文件，并应用到 Kubernetes 中。一个模板文件中通常包含一个 Kubernetes 资源，在模板文件中可以引用 values.yaml 文件中的 配置项 。Helm 提供了很多内置的函数来生成模板中的内容。</p><p>由 helm create 命令创建的图表用来安装 Nginx，从 templates 目录中可以看到与 Kubernetes 中的部署、Ingress、服务、服务账户和 Pod 自动水平扩展相关的资源。</p><p>对行程管理服务来说，我们只需要对生成的图表中的 Kubernetes 部署的模板进行修改即可。 图表的完整代码请参考 GitHub 上源代码中的 K 8s 目录。</p><h3 id="helmfile-介绍" tabindex="-1">Helmfile 介绍 <a class="header-anchor" href="#helmfile-介绍" aria-label="Permalink to &quot;Helmfile 介绍&quot;">​</a></h3><p>通过 Helm 的图表可以方便地安装单个应用。但是当需要同时安装多个互相关联的应用时，单独使用 Helm 很难进行管理。在安装 Helm 的图表时，配置项的值通过 YAML 文件来传递，一个常见的需求是在安装两个不同的图表时，使用同样的配置值。一个典型的场景是访问数据库的用户名和密码，同样的用户名和密码，在 PostgreSQL 的图表，以及使用该 PostgreSQL 的行程管理服务的图表中，都会被用到。我们希望的做法是只在一个地方维护这些配置项的值，不仅减少了代码重复，配置修改时也会变得更简单。</p><p>在目前的版本中，Helm 并没有提供一种比较有效的方式来在两个独立的图表之间共享配置。 这主要是因为 Helm 的 values.yaml 文件不支持模板的语法，必须是实际的配置值。在 Helm 的 GitHub 上，2017 年就有人提出了<a href="https://github.com/helm/helm/issues/2492" target="_blank" rel="noreferrer">这个问题</a>，但是 Helm 一直没有解决。 比较可行的做法是把 PostgreSQL 的图表作为行程管理服务的子图表，这样以全局变量的形式在父图表和子图表之间传递值。不过这种做法的限制比较多，有些图表之间并不存在直接的父子关系。<a href="https://github.com/roboll/helmfile" target="_blank" rel="noreferrer">Helmfile</a>是解决这一问题的工具。</p><p>Helmfile 通过 helmfile.yaml 文件来管理多个 Helm 发行。下面的代码是行程管理服务使用的 helmfile.yaml 文件的内容，在这个文件中，repositories 用来声明获取 Helm 图表的仓库，这里定义了 Bitnami 的仓库。releases 用来声明 Helm 发行，这里定义了两个发行：第一个名为 postgresql-trip 的发行用来安装 PostgreSQL，指定了图表的名称和版本；第二个名为 trip-service 的图表用来安装行程管理服务 ，使用的是 charts 子目录中的自定义 Helm 图表 trip-service 。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">repositories</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">bitnami</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://charts.bitnami.com/bitnami</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">releases</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">postgresql-trip</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: { { </span><span style="color:#9ECBFF;">env &quot;NAMESPACE&quot; | default &quot;happyride&quot;</span><span style="color:#E1E4E8;"> }} </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">chart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">bitnami/postgresql</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8.10.13</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">wait</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">values</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">../postgresql-config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">trip-service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: { { </span><span style="color:#9ECBFF;">env &quot;NAMESPACE&quot; | default &quot;happyride&quot;</span><span style="color:#E1E4E8;"> }} </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">chart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">charts/trip-service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">values</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">tag</span><span style="color:#E1E4E8;">: { { </span><span style="color:#9ECBFF;">requiredEnv &quot;TRIP_SERVICE_VERSION&quot; | quote</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;512Mi&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;500m&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1Gi&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">repositories</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">bitnami</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://charts.bitnami.com/bitnami</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">releases</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">postgresql-trip</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: { { </span><span style="color:#032F62;">env &quot;NAMESPACE&quot; | default &quot;happyride&quot;</span><span style="color:#24292E;"> }} </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">chart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">bitnami/postgresql</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8.10.13</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">wait</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">values</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">../postgresql-config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">trip-service</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: { { </span><span style="color:#032F62;">env &quot;NAMESPACE&quot; | default &quot;happyride&quot;</span><span style="color:#24292E;"> }} </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">chart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">charts/trip-service</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">values</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">tag</span><span style="color:#24292E;">: { { </span><span style="color:#032F62;">requiredEnv &quot;TRIP_SERVICE_VERSION&quot; | quote</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;512Mi&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;500m&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1Gi&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1&quot;</span></span></code></pre></div><p>从该文件中可以看出 Helmfile 的一些优势：</p><ul><li><p>Helmfile 文件本身可以使用与 Helm 相似的模板语法；</p></li><li><p>通过 env 函数可以从环境变量中获取值；</p></li><li><p>可以通过 values 来使用多个配置项的来源，postgresql-trip 发行中的配置项来自两个 YAML 文件，而 trip-service 发行中的配置项来自配置文件和内联的值，Helmfile 会自动对配置项进行合并。</p></li></ul><p>Helmfile 简化了不同发行之间的配置项的共享。在上面的 helmfile.yaml 文件中，两个发行都用到了 config.yaml 文件，该文件中包含了 PostgreSQL 数据库相关的配置，被两个发行所共享。而 postgresql-config.yaml 文件则包含了与 PostgreSQL 相关的全局配置，该文件会被所有的 PostgreSQL 发行所共享。</p><p>在创建了 helmfile.yaml 文件之后，使用 helmfile apply 命令可以通过 Helm 来安装应用。</p><p>除了应用自身的服务之外，第三方支撑服务也可以使用 Helmfile 来安装。下面代码中的 helmfile.yaml 文件用来安装 Apache Kafka。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">repositories</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">bitnami</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://charts.bitnami.com/bitnami</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">releases</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kafka</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: { { </span><span style="color:#9ECBFF;">env &quot;NAMESPACE&quot; | default &quot;happyride&quot;</span><span style="color:#E1E4E8;"> }} </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">chart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">bitnami/kafka</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">11.3.2</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">wait</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">repositories</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">bitnami</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://charts.bitnami.com/bitnami</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">releases</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kafka</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: { { </span><span style="color:#032F62;">env &quot;NAMESPACE&quot; | default &quot;happyride&quot;</span><span style="color:#24292E;"> }} </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">chart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">bitnami/kafka</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">11.3.2</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">wait</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><p>当存在多个应用时，每个应用的 helmfile.yaml 文件可以组织在一起，由另外一个 helmfile.yaml 文件来管理。下面的代码给出了示例应用中不同服务的 helmfile.yaml 文件的组织结构，其中的 apps 子目录包含了每个应用的 helmfile.yaml 文件和 Helm 图表。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">├── apps</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── address-service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── address-service-config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── axon</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── common</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── kafka</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── passenger-api-graphql</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── passenger-service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   ├── config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── postgresql-config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   ├── redis</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   │   └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│   └── trip-service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│       ├── charts</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│       ├── config.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">│       └── helmfile.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">└── helmfile.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">.</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">├── apps</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── address-service</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── address-service-config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── axon</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── common</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── kafka</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── passenger-api-graphql</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── passenger-service</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   ├── config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── postgresql-config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   ├── redis</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   │   └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│   └── trip-service</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│       ├── charts</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│       ├── config.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">│       └── helmfile.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">└── helmfile.yaml</span></span></code></pre></div><p>下面是根目录 中的 helmfile.yaml 文件的内容，使用通配符包含了 apps 目录下的全部 helmfile.yaml 文件。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">helmfiles</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#9ECBFF;">apps/*/helmfile.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">helmfiles</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#032F62;">apps/*/helmfile.yaml</span></span></code></pre></div><p>当在根目录下运行 helmfile apply 命令时，全部的应用都会更新。</p><h3 id="持续部署" tabindex="-1">持续部署 <a class="header-anchor" href="#持续部署" aria-label="Permalink to &quot;持续部署&quot;">​</a></h3><p>每个微服务都应该有自己的持续部署流程，对于每个服务来说，代码提交会触发持续集成流程。当持续集成完成之后，该服务的容器镜像会被发布到镜像注册表中，并且由一个唯一的标签来标识。在安装应用的 Helm 图表中，镜像的标签通常以 image.tag 配置项来传递。只需要更新该配置项的值，再使用 Helm 来更新应用的发行，就可以部署新的版本。</p><p>不同的环境可能 有 各自的持续部署策略。对于开发环境来说，每次代码提交都可以触发部署流程；对于测试环境来说，由于测试周期的问题，测试团队不会频繁更新部署；对于生产环境来说，部署会有更加严格的控制策略。</p><p>在进行部署时，所需要的输入只有镜像的标签，实际的部署操作由 Helmfile 来完成。下面的代码给出了部署地址管理服务的命令。 环境变量 ADDRESS_SERVICE_VERSION 的值会被传递给对应 Helm 图表的 image.tag 配置项。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ ADDRESS_SERVICE_VERSION</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">6ec24a6 helmfile apply</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ ADDRESS_SERVICE_VERSION</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">6ec24a6 helmfile apply</span></span></code></pre></div><p>为了部署可以成功，Helmfile 在运行时需要访问 Kubernetes 集群。如果 kubectl 可以成功访问 Kubernetes 集群，那么同一机器上的 Helmfile 也能正常访问。如果在 Kubernetes 集群内部的 Pod 容器中进行部署，那么需要注意权限的问题。Pod 运行时默认的服务账户可能没有修改 Kubernetes 资源的权限。</p><p>下面代码中的 YAML 文件创建了一个服务账户 deploy-user，并且赋予了该账户 cluster-admin 角色，允许访问 Kubernetes 上的任意资源。进行部署工作的 Pod 可以使用该服务账户。 如果需要进一步控制该部署服务账户的权限，可以使用 Kubernetes 提供的 RBAC 支持。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">deploy-user</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">happyride</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">---</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRoleBinding</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">deploy-user</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">roleRef</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">cluster-admin</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">subjects</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">deploy-user</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">happyride</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">deploy-user</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">happyride</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">---</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRoleBinding</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">deploy-user</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">roleRef</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">cluster-admin</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">subjects</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">deploy-user</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">happyride</span></span></code></pre></div><p>下面介绍 Jenkins 上的持续部署的流水线。整个流水线由两个阶段组成：构建阶段负责构建容器镜像并发布到镜像注册表，部署阶段负责调用 helmfile 来更新部署。</p><p>下面的代码是 Jenkins 的流水线配置。在 Pod 模板中，声明了使用服务账户 deploy-user。Pod 有两个容器，对应于构建和部署两个阶段，分别运行 Maven 和 Helmfile。在构建阶段中，容器镜像的标签被保存在 addressServiceImageTag 变量中；在部署阶段中，该变量的值被传递给环境变量 ADDRESS_SERVICE_VERSION。</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">addressServiceImageTag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline { </span></span>
<span class="line"><span style="color:#E1E4E8;">  agent { </span></span>
<span class="line"><span style="color:#E1E4E8;">    kubernetes { </span></span>
<span class="line"><span style="color:#E1E4E8;">      yaml </span><span style="color:#9ECBFF;">&quot;&quot;&quot; </span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: v1 </span></span>
<span class="line"><span style="color:#9ECBFF;">kind: Pod </span></span>
<span class="line"><span style="color:#9ECBFF;">spec: </span></span>
<span class="line"><span style="color:#9ECBFF;">  serviceAccountName: deploy-user </span></span>
<span class="line"><span style="color:#9ECBFF;">  securityContext: </span></span>
<span class="line"><span style="color:#9ECBFF;">    fsGroup: 1000 </span></span>
<span class="line"><span style="color:#9ECBFF;">  containers: </span></span>
<span class="line"><span style="color:#9ECBFF;">  - name: maven </span></span>
<span class="line"><span style="color:#9ECBFF;">    image: maven:3.6.3-jdk-8 </span></span>
<span class="line"><span style="color:#9ECBFF;">    command: </span></span>
<span class="line"><span style="color:#9ECBFF;">    - sleep </span></span>
<span class="line"><span style="color:#9ECBFF;">    args: </span></span>
<span class="line"><span style="color:#9ECBFF;">    - infinity </span></span>
<span class="line"><span style="color:#9ECBFF;">    resources: </span></span>
<span class="line"><span style="color:#9ECBFF;">      requests: </span></span>
<span class="line"><span style="color:#9ECBFF;">        cpu: &quot;0.5&quot; </span></span>
<span class="line"><span style="color:#9ECBFF;">        memory: 512Mi </span></span>
<span class="line"><span style="color:#9ECBFF;">      limits: </span></span>
<span class="line"><span style="color:#9ECBFF;">        cpu: &quot;1&quot; </span></span>
<span class="line"><span style="color:#9ECBFF;">        memory: 1Gi</span></span>
<span class="line"><span style="color:#9ECBFF;">    volumeMounts: </span></span>
<span class="line"><span style="color:#9ECBFF;">      - name: dockersock </span></span>
<span class="line"><span style="color:#9ECBFF;">        mountPath: &quot;/var/run/docker.sock&quot; </span></span>
<span class="line"><span style="color:#9ECBFF;">  - name: helmfile </span></span>
<span class="line"><span style="color:#9ECBFF;">    image: quay.io/roboll/helmfile:helm3-v0.125.0 </span></span>
<span class="line"><span style="color:#9ECBFF;">    command: </span></span>
<span class="line"><span style="color:#9ECBFF;">    - sleep </span></span>
<span class="line"><span style="color:#9ECBFF;">    args: </span></span>
<span class="line"><span style="color:#9ECBFF;">    - infinity </span></span>
<span class="line"><span style="color:#9ECBFF;">    resources: </span></span>
<span class="line"><span style="color:#9ECBFF;">      limits: </span></span>
<span class="line"><span style="color:#9ECBFF;">        cpu: &quot;0.5&quot; </span></span>
<span class="line"><span style="color:#9ECBFF;">        memory: 256Mi </span></span>
<span class="line"><span style="color:#9ECBFF;">  volumes: </span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: dockersock </span></span>
<span class="line"><span style="color:#9ECBFF;">      hostPath: </span></span>
<span class="line"><span style="color:#9ECBFF;">        path: /var/run/docker.sock </span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;&quot;&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  stages { </span></span>
<span class="line"><span style="color:#E1E4E8;">    stage(</span><span style="color:#9ECBFF;">&#39;Build&#39;</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      environment { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">BUILD_DOCKER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">CONTAINER_REGISTRY</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;docker-registry:5000&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      steps { </span></span>
<span class="line"><span style="color:#E1E4E8;">        git </span><span style="color:#9ECBFF;">&#39;https://github.com/alexcheng1982/happyride&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        container(</span><span style="color:#9ECBFF;">&#39;maven&#39;</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">          sh </span><span style="color:#9ECBFF;">&#39;mvn -B -ntp -Dmaven.test.failure.ignore install&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          junit </span><span style="color:#9ECBFF;">&#39;**/target/surefire-reports/TEST-*.xml&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          script { </span></span>
<span class="line"><span style="color:#E1E4E8;">            addressServiceImageTag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> readFile(</span><span style="color:#9ECBFF;">&quot;happyride-address-service/target/image_tag.txt&quot;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">          } </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    stage(</span><span style="color:#9ECBFF;">&#39;Deploy&#39;</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      environment { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">ADDRESS_SERVICE_VERSION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\${addressServiceImageTag}&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">CONTAINER_REGISTRY</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;localhost:30000&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      steps { </span></span>
<span class="line"><span style="color:#E1E4E8;">        git </span><span style="color:#9ECBFF;">&#39;https://github.com/alexcheng1982/happyride&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        container(</span><span style="color:#9ECBFF;">&#39;helmfile&#39;</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">          sh </span><span style="color:#9ECBFF;">&#39;cd k8s/happyride/apps/address-service &amp;&amp; helmfile apply&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">addressServiceImageTag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline { </span></span>
<span class="line"><span style="color:#24292E;">  agent { </span></span>
<span class="line"><span style="color:#24292E;">    kubernetes { </span></span>
<span class="line"><span style="color:#24292E;">      yaml </span><span style="color:#032F62;">&quot;&quot;&quot; </span></span>
<span class="line"><span style="color:#032F62;">apiVersion: v1 </span></span>
<span class="line"><span style="color:#032F62;">kind: Pod </span></span>
<span class="line"><span style="color:#032F62;">spec: </span></span>
<span class="line"><span style="color:#032F62;">  serviceAccountName: deploy-user </span></span>
<span class="line"><span style="color:#032F62;">  securityContext: </span></span>
<span class="line"><span style="color:#032F62;">    fsGroup: 1000 </span></span>
<span class="line"><span style="color:#032F62;">  containers: </span></span>
<span class="line"><span style="color:#032F62;">  - name: maven </span></span>
<span class="line"><span style="color:#032F62;">    image: maven:3.6.3-jdk-8 </span></span>
<span class="line"><span style="color:#032F62;">    command: </span></span>
<span class="line"><span style="color:#032F62;">    - sleep </span></span>
<span class="line"><span style="color:#032F62;">    args: </span></span>
<span class="line"><span style="color:#032F62;">    - infinity </span></span>
<span class="line"><span style="color:#032F62;">    resources: </span></span>
<span class="line"><span style="color:#032F62;">      requests: </span></span>
<span class="line"><span style="color:#032F62;">        cpu: &quot;0.5&quot; </span></span>
<span class="line"><span style="color:#032F62;">        memory: 512Mi </span></span>
<span class="line"><span style="color:#032F62;">      limits: </span></span>
<span class="line"><span style="color:#032F62;">        cpu: &quot;1&quot; </span></span>
<span class="line"><span style="color:#032F62;">        memory: 1Gi</span></span>
<span class="line"><span style="color:#032F62;">    volumeMounts: </span></span>
<span class="line"><span style="color:#032F62;">      - name: dockersock </span></span>
<span class="line"><span style="color:#032F62;">        mountPath: &quot;/var/run/docker.sock&quot; </span></span>
<span class="line"><span style="color:#032F62;">  - name: helmfile </span></span>
<span class="line"><span style="color:#032F62;">    image: quay.io/roboll/helmfile:helm3-v0.125.0 </span></span>
<span class="line"><span style="color:#032F62;">    command: </span></span>
<span class="line"><span style="color:#032F62;">    - sleep </span></span>
<span class="line"><span style="color:#032F62;">    args: </span></span>
<span class="line"><span style="color:#032F62;">    - infinity </span></span>
<span class="line"><span style="color:#032F62;">    resources: </span></span>
<span class="line"><span style="color:#032F62;">      limits: </span></span>
<span class="line"><span style="color:#032F62;">        cpu: &quot;0.5&quot; </span></span>
<span class="line"><span style="color:#032F62;">        memory: 256Mi </span></span>
<span class="line"><span style="color:#032F62;">  volumes: </span></span>
<span class="line"><span style="color:#032F62;">    - name: dockersock </span></span>
<span class="line"><span style="color:#032F62;">      hostPath: </span></span>
<span class="line"><span style="color:#032F62;">        path: /var/run/docker.sock </span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  stages { </span></span>
<span class="line"><span style="color:#24292E;">    stage(</span><span style="color:#032F62;">&#39;Build&#39;</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">      environment { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">BUILD_DOCKER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">CONTAINER_REGISTRY</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;docker-registry:5000&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      steps { </span></span>
<span class="line"><span style="color:#24292E;">        git </span><span style="color:#032F62;">&#39;https://github.com/alexcheng1982/happyride&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        container(</span><span style="color:#032F62;">&#39;maven&#39;</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">          sh </span><span style="color:#032F62;">&#39;mvn -B -ntp -Dmaven.test.failure.ignore install&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          junit </span><span style="color:#032F62;">&#39;**/target/surefire-reports/TEST-*.xml&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          script { </span></span>
<span class="line"><span style="color:#24292E;">            addressServiceImageTag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> readFile(</span><span style="color:#032F62;">&quot;happyride-address-service/target/image_tag.txt&quot;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">          } </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    stage(</span><span style="color:#032F62;">&#39;Deploy&#39;</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">      environment { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">ADDRESS_SERVICE_VERSION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\${addressServiceImageTag}&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">CONTAINER_REGISTRY</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;localhost:30000&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      steps { </span></span>
<span class="line"><span style="color:#24292E;">        git </span><span style="color:#032F62;">&#39;https://github.com/alexcheng1982/happyride&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        container(</span><span style="color:#032F62;">&#39;helmfile&#39;</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">          sh </span><span style="color:#032F62;">&#39;cd k8s/happyride/apps/address-service &amp;&amp; helmfile apply&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>下图是 Jenkins 上运行流水线的结果图。</p>`,63),y=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),i=s("p",null,"通过持续部署，每次代码提交所对应的代码，都可以在 Kubernetes 上部署运行。通过本课时的学习，你可以了解到 Helm 的用法、如何创建 Helm 图表，以及如何使用 Helmfile 来管理多个应用；同时还可以了解如何在 Jenkins 上实现服务的持续部署。",-1),F=s("p",null,[a("最后呢，成老师邀请你为本专栏课程进行结课评价，因为你的每一个观点都是我们最关注的点。"),s("a",{href:"https://wj.qq.com/s2/6902680/3fb2/",target:"_blank",rel:"noreferrer"},"点击链接，即可参与课程评价"),a("。")],-1);function m(d,h,u,g,C,v){const n=p("Image");return o(),e("div",null,[E,t(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/3B/73/CgqCHl8kBquARhV_AAIeNS7HLIc586.png"}),y,i,F])}const q=l(r,[["render",m]]);export{b as __pageData,q as default};
