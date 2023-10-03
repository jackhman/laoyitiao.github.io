import{_ as s,o as n,g as a,Q as p}from"./chunks/framework.f949202b.js";const u=JSON.parse('{"title":"API 优先的策略 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1814) 第10讲：使用 OpenAPI 和 Swagger 实现 API 优先设计.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1814) 第10讲：使用 OpenAPI 和 Swagger 实现 API 优先设计.md","lastUpdated":null}'),e={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1814) 第10讲：使用 OpenAPI 和 Swagger 实现 API 优先设计.md"},l=p(`<p>从本课时开始，我们将进入到云原生微服务架构应用的实战开发环节，在介绍微服务的具体实现之前，首要的工作是设计和确定每个微服务的<strong>开放 API</strong> 。开放 API 在近几年得到了广泛的流行，很多在线服务和政府机构都对外提供了开放 API，其已经成为在线服务的标配功能。开发者可以利用开放 API 开发出各种不同的应用。</p><br><p>微服务应用中的开放 API 与在线服务的开放 API，虽然存在一定的关联，但作用是不同的。在微服务架构的应用中，微服务之间只能通过进程间的通讯方式来交互，一般使用 REST 或 gRPC。这样的交互方式需要以形式化的方式固定下来，就形成了开放 API，一个微服务的开放 API 对外部使用者屏蔽了服务内部的实现细节，同时也是外部使用者与之交互的唯一方式（当然，这里指的是微服务之间仅通过 API 来进行集成，如果使用异步事件来进行集成的话，这些事件也是交互方式）。由此可以看出，微服务 API 的重要性。从受众的角度来说，微服务API的使用者主要是其他微服务，也就是说，主要是应用内部的使用者，这一点与在线服务的 API 主要面向外部用户是不同的。除了其他微服务之外，应用的 Web 界面和移动客户端也需要使用微服务的 API，不过，它们一般通过 API 网关来使用微服务的 API。</p><br><p>由于微服务 API 的重要性，我们需要在很早的时候就得进行 API 的设计，也就是 API 优先的策略。</p><h2 id="api-优先的策略" tabindex="-1">API 优先的策略 <a class="header-anchor" href="#api-优先的策略" aria-label="Permalink to &quot;API 优先的策略&quot;">​</a></h2><p>如果你有过开发在线服务 API 的经验，会发现通常是先有实现，再有公开 API，这是因为在设计之前，并没有考虑到公开 API 的需求，而是之后才添加的公开 API。这种做法带来的结果就是，开放的 API 只是反映了当前的实际实现，而不是 API 应该有的样子。API 优先（API First）的设计方式，是把 API 的设计放在具体的实现之前，API 优先强调应该更多地从 API 使用者的角度来考虑 API 的设计。</p><br><p>在写下第一行实现的代码之前，API 的提供者和使用者应该对 API 进行充分的讨论，综合两方面的意见，最终确定 API 的全部细节，并以形式化的格式固定下来，成为 API 规范。在这之后，API 的提供者确保实际的实现满足 API 规范的要求，使用者则根据 API 规范来编写客户端实现。API 规范是提供者和使用者之间的契约，API 优先的策略已经应用在很多在线服务的开发中了。API 设计并实现出来之后，在线服务自身的 Web 界面和移动端应用，和其他第三方应用一样，都使用相同的 API 实现。</p><br><p>API 优先的策略，在微服务架构的应用实现中，有着更加重要的作用。这里有必要区分两类 API：一类是提供给其他微服务使用的 API，另一类是提供给 Web 界面和移动客户端使用的 API。在第 07 课时中介绍领域驱动设计的时候，我提到过界定的上下文的映射模式中的开放主机服务和公开语言，微服务与界定的上下文是一一对应的。如果把开放主机服务和公共语言结合起来，就得到了微服务的 API，公共语言就是 API 的规范。</p><br><p>从这里我们可以知道，第一类微服务 API 的目的是进行上下文映射，与第二类 API 的作用存在显著的不同。举例来说，乘客管理微服务提供了管理乘客的功能，包括乘客注册、信息更新和查询等。对于乘客 App 来说，这些功能都需要 API 的支持，其他微服务如果需要获取乘客信息，也必须调用乘客管理微服务的 API。这是为了把乘客这个概念在不同的微服务之间进行映射。</p><h2 id="api-实现方式" tabindex="-1">API 实现方式 <a class="header-anchor" href="#api-实现方式" aria-label="Permalink to &quot;API 实现方式&quot;">​</a></h2><p>在 API 实现中，首要的一个问题是选择 API 的实现方式。理论上来说，微服务的内部 API 对互操作性的要求不高，可以使用私有格式。不过，为了可以使用服务网格，推荐使用通用的标准格式，下表给出了常见的 API 格式。除了使用较少的 SOAP 之外，一般在 REST 和 gRPC 之间选择。两者的区别在于，REST 使用文本格式，gRPC 使用二进制格式；两者在流行程度、实现难度和性能上存在不同。简单来说，REST 相对更加流行，实现难度较低，但是性能不如 gRPC。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/03/D7/CgoCgV6ZTAOAe8LCAAAmZRAsEQw388.png" alt=""></p><br><p>本专栏的示例应用的 API 使用 REST 实现，不过会有一个课时专门来介绍 gRPC。下面介绍与 REST API 相关的 OpenAPI 规范。</p><h2 id="openapi-规范" tabindex="-1">OpenAPI 规范 <a class="header-anchor" href="#openapi-规范" aria-label="Permalink to &quot;OpenAPI 规范&quot;">​</a></h2><p>为了在 API 提供者和使用者之间更好的沟通，我们需要一种描述 API 的标准格式。对于 REST API 来说，这个标准格式由 OpenAPI 规范来定义。</p><br><p>OpenAPI 规范（OpenAPI Specification，OAS）是由 Linux 基金会旗下的 OpenAPI 倡议（OpenAPI Initiative，OAI）管理的开放 API 的规范。OAI 的目标是创建、演化和推广一种供应商无关的 API 描述格式。OpenAPI 规范基于 Swagger 规范，由 SmartBear 公司捐赠而来。</p><br><p>OpenAPI 文档描述或定义 API，OpenAPI 文档必须满足 OpenAPI 规范。OpenAPI 规范定义了 OpenAPI 文档的内容格式，也就是其中所能包含的对象及其属性。OpenAPI 文档是一个 JSON 对象，可以用 JSON 或 YAML 文件格式来表示。下面对 OpenAPI 文档的格式进行介绍，本课时的代码示例都使用 YAML 格式。</p><br><p>OpenAPI 规范中定义了几种基本类型，分别是 integer、number、string 和 boolean。对于每种基本类型，可以通过 format 字段来指定数据类型的具体格式，比如 string 类型的格式可以是 date、date-time 或 password。</p><br><p>下表中给出了 OpenAPI 文档的根对象中可以出现的字段及其说明，目前 OpenAPI 规范的最新版本是 3.0.3。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/11/06/Ciqah16ZTAOAAwW0AACP-qu5xrk547.png" alt=""></p><h3 id="info-对象" tabindex="-1">Info 对象 <a class="header-anchor" href="#info-对象" aria-label="Permalink to &quot;Info 对象&quot;">​</a></h3><p>Info 对象包含了 API 的元数据，可以帮助使用者更好的了解 API 的相关信息。下表给出了 Info 对象中可以包含的字段及其说明。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/8A/1C/Cgq2xl6ZTAOAdpURAABX1Kfh-DM443.png" alt=""></p><br><p>下面的代码是 Info 对象的使用示例。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">title: 测试服务</span></span>
<span class="line"><span style="color:#E1E4E8;">description: 该服务用来进行简单的测试</span></span>
<span class="line"><span style="color:#E1E4E8;">termsOfService: http://myapp.com/terms/</span></span>
<span class="line"><span style="color:#E1E4E8;">contact:</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: 管理员</span></span>
<span class="line"><span style="color:#E1E4E8;">  url: http://www.myapp.com/support</span></span>
<span class="line"><span style="color:#E1E4E8;">  email: support@myapp.com</span></span>
<span class="line"><span style="color:#E1E4E8;">license:</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: Apache 2.0</span></span>
<span class="line"><span style="color:#E1E4E8;">  url: https://www.apache.org/licenses/LICENSE-2.0.html</span></span>
<span class="line"><span style="color:#E1E4E8;">version: 2.1.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">title: 测试服务</span></span>
<span class="line"><span style="color:#24292E;">description: 该服务用来进行简单的测试</span></span>
<span class="line"><span style="color:#24292E;">termsOfService: http://myapp.com/terms/</span></span>
<span class="line"><span style="color:#24292E;">contact:</span></span>
<span class="line"><span style="color:#24292E;">  name: 管理员</span></span>
<span class="line"><span style="color:#24292E;">  url: http://www.myapp.com/support</span></span>
<span class="line"><span style="color:#24292E;">  email: support@myapp.com</span></span>
<span class="line"><span style="color:#24292E;">license:</span></span>
<span class="line"><span style="color:#24292E;">  name: Apache 2.0</span></span>
<span class="line"><span style="color:#24292E;">  url: https://www.apache.org/licenses/LICENSE-2.0.html</span></span>
<span class="line"><span style="color:#24292E;">version: 2.1.0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="server-对象" tabindex="-1">Server 对象 <a class="header-anchor" href="#server-对象" aria-label="Permalink to &quot;Server 对象&quot;">​</a></h3><p>Server 对象表示 API 的服务器，下表给出了 Server 对象中可以包含的字段及其说明。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/03/D7/CgoCgV6ZTAOABcF1AAA-57NeBGQ901.png" alt=""></p><br><p>下面代码是 Server 对象的使用示例，其中服务器的 URL 中包含了 port 和 basePath 两个参数，port 是枚举类型，可选值是 80 和 8080。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">url: http://test.myapp.com:{port}/{basePath}</span></span>
<span class="line"><span style="color:#E1E4E8;">description: 测试服务器</span></span>
<span class="line"><span style="color:#E1E4E8;">variables:</span></span>
<span class="line"><span style="color:#E1E4E8;">  port:</span></span>
<span class="line"><span style="color:#E1E4E8;">    enum:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - &#39;80&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - &#39;8080&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    default: &#39;80&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  basePath:</span></span>
<span class="line"><span style="color:#E1E4E8;">    default: v2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">url: http://test.myapp.com:{port}/{basePath}</span></span>
<span class="line"><span style="color:#24292E;">description: 测试服务器</span></span>
<span class="line"><span style="color:#24292E;">variables:</span></span>
<span class="line"><span style="color:#24292E;">  port:</span></span>
<span class="line"><span style="color:#24292E;">    enum:</span></span>
<span class="line"><span style="color:#24292E;">      - &#39;80&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - &#39;8080&#39;</span></span>
<span class="line"><span style="color:#24292E;">    default: &#39;80&#39;</span></span>
<span class="line"><span style="color:#24292E;">  basePath:</span></span>
<span class="line"><span style="color:#24292E;">    default: v2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="paths-对象" tabindex="-1">Paths 对象 <a class="header-anchor" href="#paths-对象" aria-label="Permalink to &quot;Paths 对象&quot;">​</a></h3><p>Paths 对象中的字段是动态的。每个字段表示一个路径，以&quot;/&quot;开头，路径可以是包含变量的字符串模板。字段的值是 PathItem 对象，在该对象中可以使用 summary、description、servers 和 parameters 这样的通用字段，还可以使用 HTTP 方法名称，包括 get、put、post、delete、options、head、patch 和 trace，这些方法名称的字段，定义了对应的路径所支持的 HTTP 方法。</p><h3 id="operation-对象" tabindex="-1">Operation 对象 <a class="header-anchor" href="#operation-对象" aria-label="Permalink to &quot;Operation 对象&quot;">​</a></h3><p>在 Paths 对象中，HTTP 方法对应的字段的值的类型是 Operation 对象，表示 HTTP 操作。下表给出了 Operation 对象中可以包含的字段及其说明，在这些字段中，比较常用的是 parameters、requestBody 和 responses。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/11/06/Ciqah16ZTAOAC-XoAAC9Yc_U9FY508.png" alt=""></p><h3 id="parameter-对象" tabindex="-1">Parameter 对象 <a class="header-anchor" href="#parameter-对象" aria-label="Permalink to &quot;Parameter 对象&quot;">​</a></h3><p>Parameter 对象表示操作的参数。下表给出了 Parameter 对象中可以包含的字段及其说明。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/8A/1C/Cgq2xl6ZTAOANejbAADhE2FZLo4096.png" alt=""></p><br><p>下面的代码是 Parameter 对象的使用示例，参数 id 出现在路径中，类型是 string。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">name: id</span></span>
<span class="line"><span style="color:#E1E4E8;">in: path</span></span>
<span class="line"><span style="color:#E1E4E8;">description: 乘客ID</span></span>
<span class="line"><span style="color:#E1E4E8;">required: true</span></span>
<span class="line"><span style="color:#E1E4E8;">schema:</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: string</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">name: id</span></span>
<span class="line"><span style="color:#24292E;">in: path</span></span>
<span class="line"><span style="color:#24292E;">description: 乘客ID</span></span>
<span class="line"><span style="color:#24292E;">required: true</span></span>
<span class="line"><span style="color:#24292E;">schema:</span></span>
<span class="line"><span style="color:#24292E;">  type: string</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="requestbody-对象" tabindex="-1">RequestBody 对象 <a class="header-anchor" href="#requestbody-对象" aria-label="Permalink to &quot;RequestBody 对象&quot;">​</a></h3><p>RequestBody 对象表示 HTTP 请求的内容，下表给出了 RequestBody 对象中可以包含的字段及其说明。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/03/D7/CgoCgV6ZTAOAU9XxAAA4YbmwX3A208.png" alt=""></p><h3 id="responses-对象" tabindex="-1">Responses 对象 <a class="header-anchor" href="#responses-对象" aria-label="Permalink to &quot;Responses 对象&quot;">​</a></h3><p>Responses 对象表示 HTTP 请求的响应，该对象中的字段是动态的。字段的名称是 HTTP 响应的状态码，对应的值的类型是 Response 或 Reference 对象。下表给出了 Response 对象中可以包含的字段及其说明。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/11/06/Ciqah16ZTAOAHz9LAAB3y1Wy79M022.png" alt=""></p><h3 id="reference-对象" tabindex="-1">Reference 对象 <a class="header-anchor" href="#reference-对象" aria-label="Permalink to &quot;Reference 对象&quot;">​</a></h3><p>在对不同类型的对象描述中，字段的类型可以是 Reference 对象，该对象表示对其他组件的引用，其中只包含一个 $ref 字段来声明引用。引用可以是同一文档中的组件，也可以来自外部文件。在文档内部，可以在 Components 对象中定义不同类型的可复用组件，并由 Reference 对象来引用；文档内部的引用是以 # 开头的对象路径，比如 #/components/schemas/CreateTripRequest。</p><h3 id="schema-对象" tabindex="-1">Schema 对象 <a class="header-anchor" href="#schema-对象" aria-label="Permalink to &quot;Schema 对象&quot;">​</a></h3><p>Schema 对象用来描述数据类型的定义，数据类型可以是简单类型、数组或对象类型，通过字段 type 可以指定类型，format 字段表示类型的格式。如果是数组类型，即 type 的值是 array，则需要通过字段 items 来表示数组中元素的类型；如果是对象类型，即 type 的值是 object，则需要通过字段 properties 来表示对象中属性的类型。</p><h3 id="完整文档示例" tabindex="-1">完整文档示例 <a class="header-anchor" href="#完整文档示例" aria-label="Permalink to &quot;完整文档示例&quot;">​</a></h3><p>下面是一个完整的 OpenAPI 文档示例。在 paths 对象中，定义了 3 个操作，操作的请求内容和响应格式的类型定义，都在 Components 对象的 schemas 字段中定义。操作的 requestBody 和 responses 字段都使用 Reference 对象来引用。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">openapi: &#39;3.0.3&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">info:</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: 行程服务</span></span>
<span class="line"><span style="color:#E1E4E8;">  version: &#39;1.0&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">servers:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - url: http://localhost:8501/api/v1</span></span>
<span class="line"><span style="color:#E1E4E8;">tags:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - name: trip</span></span>
<span class="line"><span style="color:#E1E4E8;">    description: 行程相关</span></span>
<span class="line"><span style="color:#E1E4E8;">paths:</span></span>
<span class="line"><span style="color:#E1E4E8;">  /:</span></span>
<span class="line"><span style="color:#E1E4E8;">    post:</span></span>
<span class="line"><span style="color:#E1E4E8;">      tags:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - trip</span></span>
<span class="line"><span style="color:#E1E4E8;">      summary: 创建行程</span></span>
<span class="line"><span style="color:#E1E4E8;">      operationId: createTrip</span></span>
<span class="line"><span style="color:#E1E4E8;">      requestBody:</span></span>
<span class="line"><span style="color:#E1E4E8;">        content:</span></span>
<span class="line"><span style="color:#E1E4E8;">          application/json:</span></span>
<span class="line"><span style="color:#E1E4E8;">            schema:</span></span>
<span class="line"><span style="color:#E1E4E8;">              $ref: &quot;#/components/schemas/CreateTripRequest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        required: true      </span></span>
<span class="line"><span style="color:#E1E4E8;">      responses:</span></span>
<span class="line"><span style="color:#E1E4E8;">        &#39;201&#39;:</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: 创建成功</span></span>
<span class="line"><span style="color:#E1E4E8;">  /{tripId}:</span></span>
<span class="line"><span style="color:#E1E4E8;">    get:</span></span>
<span class="line"><span style="color:#E1E4E8;">      tags:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - trip</span></span>
<span class="line"><span style="color:#E1E4E8;">      summary: 获取行程</span></span>
<span class="line"><span style="color:#E1E4E8;">      operationId: getTrip</span></span>
<span class="line"><span style="color:#E1E4E8;">      parameters:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - name: tripId</span></span>
<span class="line"><span style="color:#E1E4E8;">          in: path</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: 行程ID</span></span>
<span class="line"><span style="color:#E1E4E8;">          required: true</span></span>
<span class="line"><span style="color:#E1E4E8;">          schema:</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: string</span></span>
<span class="line"><span style="color:#E1E4E8;">      responses:</span></span>
<span class="line"><span style="color:#E1E4E8;">        &#39;200&#39;:</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: 获取成功  </span></span>
<span class="line"><span style="color:#E1E4E8;">          content:</span></span>
<span class="line"><span style="color:#E1E4E8;">            application/json:</span></span>
<span class="line"><span style="color:#E1E4E8;">              schema:</span></span>
<span class="line"><span style="color:#E1E4E8;">                $ref: &quot;#/components/schemas/TripVO&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &#39;404&#39;:</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: 找不到行程</span></span>
<span class="line"><span style="color:#E1E4E8;">  /{tripId}/accept:</span></span>
<span class="line"><span style="color:#E1E4E8;">    post:</span></span>
<span class="line"><span style="color:#E1E4E8;">      tags:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - trip</span></span>
<span class="line"><span style="color:#E1E4E8;">      summary: 接受行程</span></span>
<span class="line"><span style="color:#E1E4E8;">      operationId: acceptTrip</span></span>
<span class="line"><span style="color:#E1E4E8;">      parameters:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - name: tripId</span></span>
<span class="line"><span style="color:#E1E4E8;">          in: path</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: 行程ID</span></span>
<span class="line"><span style="color:#E1E4E8;">          required: true</span></span>
<span class="line"><span style="color:#E1E4E8;">          schema:</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: string</span></span>
<span class="line"><span style="color:#E1E4E8;">      requestBody:</span></span>
<span class="line"><span style="color:#E1E4E8;">        content:</span></span>
<span class="line"><span style="color:#E1E4E8;">          application/json:</span></span>
<span class="line"><span style="color:#E1E4E8;">            schema:</span></span>
<span class="line"><span style="color:#E1E4E8;">              $ref: &quot;#/components/schemas/AcceptTripRequest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        required: true</span></span>
<span class="line"><span style="color:#E1E4E8;">      responses:</span></span>
<span class="line"><span style="color:#E1E4E8;">        &#39;200&#39;:</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: 接受成功</span></span>
<span class="line"><span style="color:#E1E4E8;">components:</span></span>
<span class="line"><span style="color:#E1E4E8;">  schemas:</span></span>
<span class="line"><span style="color:#E1E4E8;">    CreateTripRequest:</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: object</span></span>
<span class="line"><span style="color:#E1E4E8;">      properties:</span></span>
<span class="line"><span style="color:#E1E4E8;">        passengerId:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: string   </span></span>
<span class="line"><span style="color:#E1E4E8;">        startPos:</span></span>
<span class="line"><span style="color:#E1E4E8;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        endPos:</span></span>
<span class="line"><span style="color:#E1E4E8;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      required:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - passengerId</span></span>
<span class="line"><span style="color:#E1E4E8;">        - startPos</span></span>
<span class="line"><span style="color:#E1E4E8;">        - endPos</span></span>
<span class="line"><span style="color:#E1E4E8;">    AcceptTripRequest:</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: object</span></span>
<span class="line"><span style="color:#E1E4E8;">        properties:</span></span>
<span class="line"><span style="color:#E1E4E8;">          driverId:</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: string</span></span>
<span class="line"><span style="color:#E1E4E8;">          posLng:</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: number</span></span>
<span class="line"><span style="color:#E1E4E8;">            format: double</span></span>
<span class="line"><span style="color:#E1E4E8;">          posLat:</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: number</span></span>
<span class="line"><span style="color:#E1E4E8;">            format: double</span></span>
<span class="line"><span style="color:#E1E4E8;">        required:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - driverId</span></span>
<span class="line"><span style="color:#E1E4E8;">          - posLng</span></span>
<span class="line"><span style="color:#E1E4E8;">          - posLat</span></span>
<span class="line"><span style="color:#E1E4E8;">    TripVO:</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: object</span></span>
<span class="line"><span style="color:#E1E4E8;">      properties:</span></span>
<span class="line"><span style="color:#E1E4E8;">        id: </span></span>
<span class="line"><span style="color:#E1E4E8;">          type: string</span></span>
<span class="line"><span style="color:#E1E4E8;">        passengerId:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: string</span></span>
<span class="line"><span style="color:#E1E4E8;">        driverId:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: string</span></span>
<span class="line"><span style="color:#E1E4E8;">        startPos:</span></span>
<span class="line"><span style="color:#E1E4E8;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        endPos:</span></span>
<span class="line"><span style="color:#E1E4E8;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        state:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: string                     </span></span>
<span class="line"><span style="color:#E1E4E8;">    PositionVO:</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: object</span></span>
<span class="line"><span style="color:#E1E4E8;">      properties:</span></span>
<span class="line"><span style="color:#E1E4E8;">        lng:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: number</span></span>
<span class="line"><span style="color:#E1E4E8;">          format: double</span></span>
<span class="line"><span style="color:#E1E4E8;">        lat:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: number</span></span>
<span class="line"><span style="color:#E1E4E8;">          format: double </span></span>
<span class="line"><span style="color:#E1E4E8;">        addressId:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: string </span></span>
<span class="line"><span style="color:#E1E4E8;">      required:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - lng</span></span>
<span class="line"><span style="color:#E1E4E8;">        - lat</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">openapi: &#39;3.0.3&#39;</span></span>
<span class="line"><span style="color:#24292E;">info:</span></span>
<span class="line"><span style="color:#24292E;">  title: 行程服务</span></span>
<span class="line"><span style="color:#24292E;">  version: &#39;1.0&#39;</span></span>
<span class="line"><span style="color:#24292E;">servers:</span></span>
<span class="line"><span style="color:#24292E;">  - url: http://localhost:8501/api/v1</span></span>
<span class="line"><span style="color:#24292E;">tags:</span></span>
<span class="line"><span style="color:#24292E;">  - name: trip</span></span>
<span class="line"><span style="color:#24292E;">    description: 行程相关</span></span>
<span class="line"><span style="color:#24292E;">paths:</span></span>
<span class="line"><span style="color:#24292E;">  /:</span></span>
<span class="line"><span style="color:#24292E;">    post:</span></span>
<span class="line"><span style="color:#24292E;">      tags:</span></span>
<span class="line"><span style="color:#24292E;">        - trip</span></span>
<span class="line"><span style="color:#24292E;">      summary: 创建行程</span></span>
<span class="line"><span style="color:#24292E;">      operationId: createTrip</span></span>
<span class="line"><span style="color:#24292E;">      requestBody:</span></span>
<span class="line"><span style="color:#24292E;">        content:</span></span>
<span class="line"><span style="color:#24292E;">          application/json:</span></span>
<span class="line"><span style="color:#24292E;">            schema:</span></span>
<span class="line"><span style="color:#24292E;">              $ref: &quot;#/components/schemas/CreateTripRequest&quot;</span></span>
<span class="line"><span style="color:#24292E;">        required: true      </span></span>
<span class="line"><span style="color:#24292E;">      responses:</span></span>
<span class="line"><span style="color:#24292E;">        &#39;201&#39;:</span></span>
<span class="line"><span style="color:#24292E;">          description: 创建成功</span></span>
<span class="line"><span style="color:#24292E;">  /{tripId}:</span></span>
<span class="line"><span style="color:#24292E;">    get:</span></span>
<span class="line"><span style="color:#24292E;">      tags:</span></span>
<span class="line"><span style="color:#24292E;">        - trip</span></span>
<span class="line"><span style="color:#24292E;">      summary: 获取行程</span></span>
<span class="line"><span style="color:#24292E;">      operationId: getTrip</span></span>
<span class="line"><span style="color:#24292E;">      parameters:</span></span>
<span class="line"><span style="color:#24292E;">        - name: tripId</span></span>
<span class="line"><span style="color:#24292E;">          in: path</span></span>
<span class="line"><span style="color:#24292E;">          description: 行程ID</span></span>
<span class="line"><span style="color:#24292E;">          required: true</span></span>
<span class="line"><span style="color:#24292E;">          schema:</span></span>
<span class="line"><span style="color:#24292E;">            type: string</span></span>
<span class="line"><span style="color:#24292E;">      responses:</span></span>
<span class="line"><span style="color:#24292E;">        &#39;200&#39;:</span></span>
<span class="line"><span style="color:#24292E;">          description: 获取成功  </span></span>
<span class="line"><span style="color:#24292E;">          content:</span></span>
<span class="line"><span style="color:#24292E;">            application/json:</span></span>
<span class="line"><span style="color:#24292E;">              schema:</span></span>
<span class="line"><span style="color:#24292E;">                $ref: &quot;#/components/schemas/TripVO&quot;</span></span>
<span class="line"><span style="color:#24292E;">        &#39;404&#39;:</span></span>
<span class="line"><span style="color:#24292E;">          description: 找不到行程</span></span>
<span class="line"><span style="color:#24292E;">  /{tripId}/accept:</span></span>
<span class="line"><span style="color:#24292E;">    post:</span></span>
<span class="line"><span style="color:#24292E;">      tags:</span></span>
<span class="line"><span style="color:#24292E;">        - trip</span></span>
<span class="line"><span style="color:#24292E;">      summary: 接受行程</span></span>
<span class="line"><span style="color:#24292E;">      operationId: acceptTrip</span></span>
<span class="line"><span style="color:#24292E;">      parameters:</span></span>
<span class="line"><span style="color:#24292E;">        - name: tripId</span></span>
<span class="line"><span style="color:#24292E;">          in: path</span></span>
<span class="line"><span style="color:#24292E;">          description: 行程ID</span></span>
<span class="line"><span style="color:#24292E;">          required: true</span></span>
<span class="line"><span style="color:#24292E;">          schema:</span></span>
<span class="line"><span style="color:#24292E;">            type: string</span></span>
<span class="line"><span style="color:#24292E;">      requestBody:</span></span>
<span class="line"><span style="color:#24292E;">        content:</span></span>
<span class="line"><span style="color:#24292E;">          application/json:</span></span>
<span class="line"><span style="color:#24292E;">            schema:</span></span>
<span class="line"><span style="color:#24292E;">              $ref: &quot;#/components/schemas/AcceptTripRequest&quot;</span></span>
<span class="line"><span style="color:#24292E;">        required: true</span></span>
<span class="line"><span style="color:#24292E;">      responses:</span></span>
<span class="line"><span style="color:#24292E;">        &#39;200&#39;:</span></span>
<span class="line"><span style="color:#24292E;">          description: 接受成功</span></span>
<span class="line"><span style="color:#24292E;">components:</span></span>
<span class="line"><span style="color:#24292E;">  schemas:</span></span>
<span class="line"><span style="color:#24292E;">    CreateTripRequest:</span></span>
<span class="line"><span style="color:#24292E;">      type: object</span></span>
<span class="line"><span style="color:#24292E;">      properties:</span></span>
<span class="line"><span style="color:#24292E;">        passengerId:</span></span>
<span class="line"><span style="color:#24292E;">          type: string   </span></span>
<span class="line"><span style="color:#24292E;">        startPos:</span></span>
<span class="line"><span style="color:#24292E;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#24292E;">        endPos:</span></span>
<span class="line"><span style="color:#24292E;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#24292E;">      required:</span></span>
<span class="line"><span style="color:#24292E;">        - passengerId</span></span>
<span class="line"><span style="color:#24292E;">        - startPos</span></span>
<span class="line"><span style="color:#24292E;">        - endPos</span></span>
<span class="line"><span style="color:#24292E;">    AcceptTripRequest:</span></span>
<span class="line"><span style="color:#24292E;">        type: object</span></span>
<span class="line"><span style="color:#24292E;">        properties:</span></span>
<span class="line"><span style="color:#24292E;">          driverId:</span></span>
<span class="line"><span style="color:#24292E;">            type: string</span></span>
<span class="line"><span style="color:#24292E;">          posLng:</span></span>
<span class="line"><span style="color:#24292E;">            type: number</span></span>
<span class="line"><span style="color:#24292E;">            format: double</span></span>
<span class="line"><span style="color:#24292E;">          posLat:</span></span>
<span class="line"><span style="color:#24292E;">            type: number</span></span>
<span class="line"><span style="color:#24292E;">            format: double</span></span>
<span class="line"><span style="color:#24292E;">        required:</span></span>
<span class="line"><span style="color:#24292E;">          - driverId</span></span>
<span class="line"><span style="color:#24292E;">          - posLng</span></span>
<span class="line"><span style="color:#24292E;">          - posLat</span></span>
<span class="line"><span style="color:#24292E;">    TripVO:</span></span>
<span class="line"><span style="color:#24292E;">      type: object</span></span>
<span class="line"><span style="color:#24292E;">      properties:</span></span>
<span class="line"><span style="color:#24292E;">        id: </span></span>
<span class="line"><span style="color:#24292E;">          type: string</span></span>
<span class="line"><span style="color:#24292E;">        passengerId:</span></span>
<span class="line"><span style="color:#24292E;">          type: string</span></span>
<span class="line"><span style="color:#24292E;">        driverId:</span></span>
<span class="line"><span style="color:#24292E;">          type: string</span></span>
<span class="line"><span style="color:#24292E;">        startPos:</span></span>
<span class="line"><span style="color:#24292E;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#24292E;">        endPos:</span></span>
<span class="line"><span style="color:#24292E;">          $ref: &quot;#/components/schemas/PositionVO&quot;</span></span>
<span class="line"><span style="color:#24292E;">        state:</span></span>
<span class="line"><span style="color:#24292E;">          type: string                     </span></span>
<span class="line"><span style="color:#24292E;">    PositionVO:</span></span>
<span class="line"><span style="color:#24292E;">      type: object</span></span>
<span class="line"><span style="color:#24292E;">      properties:</span></span>
<span class="line"><span style="color:#24292E;">        lng:</span></span>
<span class="line"><span style="color:#24292E;">          type: number</span></span>
<span class="line"><span style="color:#24292E;">          format: double</span></span>
<span class="line"><span style="color:#24292E;">        lat:</span></span>
<span class="line"><span style="color:#24292E;">          type: number</span></span>
<span class="line"><span style="color:#24292E;">          format: double </span></span>
<span class="line"><span style="color:#24292E;">        addressId:</span></span>
<span class="line"><span style="color:#24292E;">          type: string </span></span>
<span class="line"><span style="color:#24292E;">      required:</span></span>
<span class="line"><span style="color:#24292E;">        - lng</span></span>
<span class="line"><span style="color:#24292E;">        - lat</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br></div></div><h2 id="openapi-工具" tabindex="-1">OpenAPI 工具 <a class="header-anchor" href="#openapi-工具" aria-label="Permalink to &quot;OpenAPI 工具&quot;">​</a></h2><p>我们可以用一些工具来辅助 OpenAPI 规范相关的开发。作为 OpenAPI 规范的前身，Swagger 提供了很多与 OpenAPI 相关的工具。</p><h3 id="swagger-编辑器" tabindex="-1">Swagger 编辑器 <a class="header-anchor" href="#swagger-编辑器" aria-label="Permalink to &quot;Swagger 编辑器&quot;">​</a></h3><p>Swagger 编辑器是一个 Web 版的 Swagger 和 OpenAPI 文档编辑器。在编辑器的左侧是编辑器，右侧是 API 文档的预览。Swagger 编辑器提供了很多实用功能，包括语法高亮、快速添加不同类型的对象、生成服务器代码和生成客户端代码等。</p><br><p>使用 Swagger 编辑器时，可以直接使用<a href="https://editor.swagger.io/" target="_blank" rel="noreferrer">在线版本</a>，也可以在本地运行，在本地运行最简单的方式是使用 Docker 镜像 swaggerapi/swagger-editor。</p><br><p>下面的代码启动了 Swagger 编辑器的 Docker 容器，容器启动之后，通过 localhost:8000 访问即可。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker run -d -p 8000:8080 swaggerapi/swagger-editor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker run -d -p 8000:8080 swaggerapi/swagger-editor</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><br><p>下图是 Swagger 编辑器的界面。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/8A/1C/Cgq2xl6ZTASABJOwAAFARz_LfhM630.png" alt=""></p><h3 id="swagger-界面" tabindex="-1">Swagger 界面 <a class="header-anchor" href="#swagger-界面" aria-label="Permalink to &quot;Swagger 界面&quot;">​</a></h3><p>Swagger 界面提供了一种直观的方式来查看 API 文档，并进行交互。通过该界面，可以直接发送 HTTP 请求到 API 服务器，并查看响应结果。</p><br><p>同样，我们可以用 Docker 来启动 Swagger 界面，如下面的命令所示。容器启动之后，通过 localhost:8010 来访问即可。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker run -d -p 8010:8080 swaggerapi/swagger-ui</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker run -d -p 8010:8080 swaggerapi/swagger-ui</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><br><p>对于本地的 OpenAPI 文档，可以配置 Docker 镜像来使用该文档。假设当前目录中有 OpenAPI 文档 openapi.yml，则可以使用下面的命令来启动 Docker 镜像来展示该文档。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker run -p 8010:8080 -e SWAGGER_JSON=/api/openapi.yml -v $PWD:/api swaggerapi/swagger-ui</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker run -p 8010:8080 -e SWAGGER_JSON=/api/openapi.yml -v $PWD:/api swaggerapi/swagger-ui</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><br><p>下图是 Swagger 界面的截图。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/03/D7/CgoCgV6ZTASAXGi3AAH17b7200I115.png" alt=""></p><h3 id="代码生成" tabindex="-1">代码生成 <a class="header-anchor" href="#代码生成" aria-label="Permalink to &quot;代码生成&quot;">​</a></h3><p>通过 OpenAPI 文档，可以利用 Swagger 提供的代码生成工具来自动生成服务器存根代码和客户端。代码生成时可以使用不同的编程语言和框架。</p><br><p>下面给出了代码生成工具所支持的编程语言和框架。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">aspnetcore, csharp, csharp-dotnet2, go-server, dynamic-html, html, html2, java, jaxrs-cxf-client,</span></span>
<span class="line"><span style="color:#E1E4E8;"> jaxrs-cxf, inflector, jaxrs-cxf-cdi, jaxrs-spec, jaxrs-jersey, jaxrs-di, jaxrs-resteasy-eap, jaxrs-resteasy, micronaut</span></span>
<span class="line"><span style="color:#E1E4E8;">, spring, nodejs-server, openapi, openapi-yaml, kotlin-client, kotlin-server, php, python, python-flask, r, scala, scal</span></span>
<span class="line"><span style="color:#E1E4E8;">a-akka-http-server, swift3, swift4, swift5, typescript-angular, javascript</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">aspnetcore, csharp, csharp-dotnet2, go-server, dynamic-html, html, html2, java, jaxrs-cxf-client,</span></span>
<span class="line"><span style="color:#24292E;"> jaxrs-cxf, inflector, jaxrs-cxf-cdi, jaxrs-spec, jaxrs-jersey, jaxrs-di, jaxrs-resteasy-eap, jaxrs-resteasy, micronaut</span></span>
<span class="line"><span style="color:#24292E;">, spring, nodejs-server, openapi, openapi-yaml, kotlin-client, kotlin-server, php, python, python-flask, r, scala, scal</span></span>
<span class="line"><span style="color:#24292E;">a-akka-http-server, swift3, swift4, swift5, typescript-angular, javascript</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><br><p>代码生成工具是一个 Java 程序，下载之后可以直接运行。在下载 JAR 文件 <a href="https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.19/swagger-codegen-cli-3.0.19.jar" target="_blank" rel="noreferrer">swagger-codegen-cli-3.0.19.jar</a> 之后，可以使用下面的命令来生成 Java 客户端代码，其中 -i 参数指定输入的 OpenAPI 文档，-l 指定生成的语言，-o 指定输出目录。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java -jar swagger-codegen-cli-3.0.19.jar generate -i openapi.yml -l java -o /tmp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java -jar swagger-codegen-cli-3.0.19.jar generate -i openapi.yml -l java -o /tmp</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><br><p>除了生成客户端代码之外，还可以生成服务器存根代码。下面代码是生成 NodeJS 服务器存根代码：</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java -jar swagger-codegen-cli-3.0.19.jar generate -i openapi.yml -l nodejs-server -o /tmp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java -jar swagger-codegen-cli-3.0.19.jar generate -i openapi.yml -l nodejs-server -o /tmp</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>API 优先的策略保证了微服务的 API 在设计时，充分考虑到 API 使用者的需求，使得 API 成为提供者和使用者之间的良好契约。本课时首先介绍了 API 优先的设计策略，然后介绍了 API 的不同实现方式，接着介绍了 REST API 的 OpenAPI 规范，最后介绍了 OpenAPI 的相关工具。</p>`,121),r=[l];function c(o,i,t,E,b,y){return n(),a("div",null,r)}const d=s(e,[["render",c]]);export{u as __pageData,d as default};
