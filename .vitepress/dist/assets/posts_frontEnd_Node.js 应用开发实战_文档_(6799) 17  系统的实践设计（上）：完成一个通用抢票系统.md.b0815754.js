import{_ as l,j as t,o as e,g as c,k as o,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"17系统的实践设计（上）：完成一个通用抢票系统","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6799) 17  系统的实践设计（上）：完成一个通用抢票系统.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6799) 17  系统的实践设计（上）：完成一个通用抢票系统.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6799) 17  系统的实践设计（上）：完成一个通用抢票系统.md"},E=p('<h1 id="_17系统的实践设计-上-完成一个通用抢票系统" tabindex="-1">17系统的实践设计（上）：完成一个通用抢票系统 <a class="header-anchor" href="#_17系统的实践设计-上-完成一个通用抢票系统" aria-label="Permalink to &quot;17系统的实践设计（上）：完成一个通用抢票系统&quot;">​</a></h1><p>互联网公司经常举办福利活动，比如&quot; 9.9 元电影票活动&quot;，并以回帖的方式进行（前 500 名回复者获得奖励）。为了参加活动，你需要报名然后快速回帖，如果几万个人同时回帖，并发肯定极大，很可能导致回帖直接卡住，这时候先报名的同学根本无法回帖，只能不断进行重试，那有没有更公平有效的方式保证先来先得呢？</p><p>Node.js 适合做这种通用的高并发服务，正好可以解决这类并发抢票的问题，所以接下来我就用两讲的时间和你一起实现一个通用的抢票系统，这样一来，你可以自己配置票种，然后导入系统中，在自己公司内部和同事一起来玩这个抢票游戏了。</p><p>一般来讲，一个后台系统的设计首先需要了解产品的需求（核心就是该服务应该解决什么问题），从问题出发，分析系统的一些核心特点，在此基础上去设计系统架构、数据库、接口、开发代码以及联调，提测上线。今天这一讲，我们也按照这个流程来学习。</p><h3 id="系统的核心特点" tabindex="-1">系统的核心特点 <a class="header-anchor" href="#系统的核心特点" aria-label="Permalink to &quot;系统的核心特点&quot;">​</a></h3><p>根据抢票的例子，我们可以提炼出这个系统的核心特点：</p><ol><li><p>抢票活动可配制化；</p></li><li><p>抢票并发较大；</p></li><li><p>物品有限，一定不能超出；</p></li><li><p>安全性重要，避免一些非法获利；</p></li><li><p>抢票结果可导出分析。</p></li></ol><p>分析这 5 个特点，我们先设计出整体的架构，看一下需要哪些技术来支撑这个系统。</p><h3 id="架构说明" tabindex="-1">架构说明 <a class="header-anchor" href="#架构说明" aria-label="Permalink to &quot;架构说明&quot;">​</a></h3>',9),y=p('<p>通用抢票系统架构</p><p>从图中我们可以看到，需要以下 5 点技术来支撑上述系统：</p><ol><li><p>Nginx 作为负载均衡，其次作为域名的一个接入点；</p></li><li><p>Node.js 核心服务，这里我会把课程中涉及的各种功能应用上，比如 PM2、压测、监控、日志、安全以及过载保护机制；</p></li><li><p>考虑到高性能，在 Node.js 核心服务中，部分信息还会直接缓存在本地，减少与 Redis 交互次数；</p></li><li><p>Node.js 核心服务交互都只会和 Redis 进行，包括获取活动、票信息以及抢票等，Redis 的数据来源主要是配置文件、异步更新等，由于涉及抢票，所以要用到 Redis 一些原子操作来进行处理（下一讲代码实现中会详细说明）；</p></li><li><p>MongoDB 会作为部分数据的落地处理，只是简单的异步方式，不影响核心主线程，比如存储某个人的抢票结果；</p></li></ol><p>考虑到高性能，我们不会在任何一个接口中，去等待 MongoDB 操作结束后再响应用户请求（08 讲中我提到要用高性能的网络 I/O 替换低性能网络 I/O），在本系统的接口实现中都是与高性能 I/O Redis 缓存服务来交互。</p><p>当整体架构设计完成后，因为后台服务的核心是数据交互，所以你要继续要思考数据库结构的设计方案，接下来我们就来看一下 MongoDB 需要存储哪些信息、Redis 需要存储哪些信息。</p><h3 id="数据库设计" tabindex="-1">数据库设计 <a class="header-anchor" href="#数据库设计" aria-label="Permalink to &quot;数据库设计&quot;">​</a></h3><p>根据抢票系统的架构设计图，我们需要用到3 种数据存储的服务：本地服务器缓存；Redis 缓存；MongoDB 存储。咱们先分析一下底层的 MongoDB。</p><h4 id="mongodb-存储" tabindex="-1">MongoDB 存储 <a class="header-anchor" href="#mongodb-存储" aria-label="Permalink to &quot;MongoDB 存储&quot;">​</a></h4><p>上述场景需求中，涉及了用户、活动、票以及抢票结果，与这些场景属性对应的是：用户表、活动表、票表、票的券码表和用户票列表（也就是抢票结果） 5 个表，我们先来看下用户表。</p>',9),i=p('<p>以上就是 MongoDB 中要保存的原始数据（无论是接口响应数据还是各种缓存存储数据，都是来自原始数据表）。接下来你需要将一部分原始数据落入本地缓存和 Redis 缓存中，特别是一些高频访问的数据，使用高性能的网络 I/O 替换低性能的网络 I/O 。</p><p>那什么数据需要缓存到 Redis 中，什么数据需要本地服务器缓存呢？我们一个一个分析。</p><h4 id="redis-存储" tabindex="-1">Redis 存储 <a class="header-anchor" href="#redis-存储" aria-label="Permalink to &quot;Redis 存储&quot;">​</a></h4><p>因为要拉取进行中的<strong>活动列表</strong>，所以你要把活动列表缓存到 Redis 中，防止数据量过多。比如只缓存前 100 个进行中的活动（100 是个例子，你需要了解自己系统中用户的习惯，一般情况下前 100 个就可以囊括了 99% 的用户了）在这里你可以按照分页来缓存，比如 20 个一页，那么可以用 activity_list_page_1 、activity_list_page_2 ... activity_list_page_5 这种键名来保存。对于我们这个系统的场景超出 5 页的数据，由于访问极少，我们可以直接读取数据库。</p><p><strong>而活动详情是访问最大量的请求，</strong> 所以你要把在线的活动列表的详情缓存在 Redis 中（可以使用 activity_info_id_001 、 activity_info_id_002 这样的键名）。</p><p><strong>票详情基本都是一致的，</strong> 但是它的访问频次也较高，所以可以把票详情存储在 Redis 中，以 ticket_id_001 的方式保存。</p><p><strong>针对券码列表，</strong> 因为票券码需要存储在一个 Redis 队列中，所以你要设计一个 activity_ticket_codes_001 以活动 id 为标识。</p><p><strong>针对获取票结果，</strong> 因为用户参与活动后会获得券码，或者没有获得券码，但是要标记用户是否参与了本次活动的结果，由于这种访问频次非常高，因此需要将该数据保存在缓存中。</p><p>最后，<strong>个人的票列表</strong>一般访问并发较少，其次缓存意义也不大，因为每个人的票列表不一样。</p><h4 id="本地服务器缓存" tabindex="-1">本地服务器缓存 <a class="header-anchor" href="#本地服务器缓存" aria-label="Permalink to &quot;本地服务器缓存&quot;">​</a></h4><p>根据 09 讲涉及的知识，我们只能缓存基本不变化以及数据量较少的数据。而 Redis 中的数据，<strong>活动详情、票详情基本不变，</strong> 可以缓存在本地服务器上；但是活动列表因为有时间概念，最好不要直接缓存在本地服务，避免更新不及时，多个服务器返回的列表不一致的情况。</p><p>明确数据库以及缓存数据的设计后，接下来就要了解数据的流转以及变化，而数据的流转变化都在接口中进行处理，所以要继续分析 Node.js 核心服务中包含的接口，以及每个接口的时序图。</p><h3 id="接口设计" tabindex="-1">接口设计 <a class="header-anchor" href="#接口设计" aria-label="Permalink to &quot;接口设计&quot;">​</a></h3><p>我们先来看一下抢票活动的应用场景：用户先进入活动列表页面，选择相应的活动，进入活动详情，然后点击抢票，最终在抢票列表结果页面查看票证的详情。</p><p>根据该抢票场景，涉及的接口有 5 个。</p><ol><li><p>活动列表：显示当前可以参与的抢票活动列表；</p></li><li><p>活动详情：获取抢票活动信息，根据用户是否登录，获取用户是否已经参与过活动；</p></li><li><p>抢票接口：携带活动 ID ，需要判断用户是否有登录权限，活动是否已经结束，用户是否已经参与过；</p></li><li><p>票列表：需要显示用户抢到的票列表；</p></li><li><p>票详情：显示具体的票证详情，为后续提供一些认证信息。</p></li></ol><p>根据以上接口，我们来分析其所对应的时序图。</p><h4 id="活动列表" tabindex="-1">活动列表 <a class="header-anchor" href="#活动列表" aria-label="Permalink to &quot;活动列表&quot;">​</a></h4><p>我们先来设计一下活动列表的接口参数以及返回结构：由于是活动列表，所以需要携带翻页数据（这里我们简单用 pageSize 来翻页，默认每页 20 条数据）。<br> 表格 6 活动列表接口参数</p>',19),u=p(`<p>接下来，我们看下返回的数据：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;ret&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;message&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;success&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pageNum&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;hasMore&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pageSize&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;lastId&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;0022&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;list&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;111&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;抢洗头券&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;desc&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;image&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;xxxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;start_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1422222333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;end_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1444444444</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;ret&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;message&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;success&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;pageNum&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;hasMore&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;pageSize&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;lastId&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;0022&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;list&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;111&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;抢洗头券&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;desc&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;image&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;xxxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;start_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1422222333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;end_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1444444444</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在上面数据结构中，最外层是我们框架的基本结构，而在 data 中第一层是翻页配置，list 中则是具体的活动数据结构。而整个接口的时序图就如图 2 所示：</p>`,3),q=s("p",null,"图 2 活动列表时序图",-1),d=s("p",null,"图 2 中的 Activity-C 是活动 Controller 类，S 则为 Service，M 则是 Model ，Redis 是我们的 Cache 类。",-1),_=s("p",null,"首先，接口请求到 Controller 中，然后去 Service 中拉取在线的活动列表，这时候需要通过 Redis 数据层来获取缓存数据，如果成功获取直接返回，如果获取失败则需要从 Model 层去重新获取，获取成功则再次缓存到数据层中，最后再返回到接口调用方。",-1),F=s("p",null,"在图 2 中，我们发现活动列表的大部分逻辑都经过 Service 层来处理，这其中的主要原因在于：我们希望将业务逻辑处理部分都转移到 Service 来处理，而在 Model 层保存比较单一的数据获取的逻辑。",-1),C=s("p",null,"其他的票列表、票详情和活动详情比较相似，我们看一下这三者的接口参数设置和返回接口就可以了，没必要每个都进行时序图设计。",-1),h=s("h4",{id:"活动详情",tabindex:"-1"},[a("活动详情 "),s("a",{class:"header-anchor",href:"#活动详情","aria-label":'Permalink to "活动详情"'},"​")],-1),g=s("p",null,[a("首先还是来设计接口参数和返回结构，如表格 7。"),s("br"),a(" 表格 7 活动详情接口参数")],-1),B=p(`<p>返回的数据结构也比较简单，只需要返回一条活动详情数据即可：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;ret&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;message&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;success&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;111&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;抢洗头券&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;desc&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;image&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;xxxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;start_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1422222333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;end_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1444444444</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;ret&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;message&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;success&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;111&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;抢洗头券&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;desc&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;image&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;xxxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;start_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1422222333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;end_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1444444444</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="票列表" tabindex="-1">票列表 <a class="header-anchor" href="#票列表" aria-label="Permalink to &quot;票列表&quot;">​</a></h4><p>接口参数和返回结构，如表格 8。<br> 表格 8 票列表接口参数</p>`,4),m=s("p",null,"返回的数据结构是一个列表的通用结构，包括 pageNum 是当前页数，hasMore 代表的是是否存在下一页，pageSize 代表的是一页所包含的票数量，lastId 是本页的最后一条数据的 ID ，主要用于辅助翻页，list 则是当前的票列表数据。",-1),x=s("pre",null,[s("code",null,`{
  "ret":0,
  "message":"success",
  "data":{
    "pageNum" : 1,
    "hasMore": true,
    "pageSize": 20,
    "lastId": "0022",
    "list": [
        "id":"111",
        "name":"洗头券",
        "desc":"周六日前往，可免费体验",
        "code":"xxxx11",
        "act_id":"1110",
        "is_effective": true,
        "start_time":1422222333,
        "end_time":1444444444
    ]
}
`)],-1),A=s("h4",{id:"票详情",tabindex:"-1"},[a("票详情 "),s("a",{class:"header-anchor",href:"#票详情","aria-label":'Permalink to "票详情"'},"​")],-1),b=s("p",null,[a("接口参数和返回结构，如表格 9。"),s("br"),a(" 表格 9 活动详情接口参数")],-1),k=p(`<p>返回的数据结构也比较简单，只需要返回一条活动详情数据即可。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;ret&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;message&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;success&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;111&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;洗头券&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;code&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;xxxx11&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;desc&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;act_id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;1110&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;is_effective&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;image&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;xxxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;start_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1422222333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;end_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1444444444</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;ret&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;message&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;success&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;111&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;洗头券&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;code&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;xxxx11&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;desc&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;act_id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;1110&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;is_effective&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;image&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;xxxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;start_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1422222333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;end_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1444444444</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="抢票接口" tabindex="-1">抢票接口 <a class="header-anchor" href="#抢票接口" aria-label="Permalink to &quot;抢票接口&quot;">​</a></h4><p>最后我们再来看下抢票的接口，这个稍微复杂并且核心，因此这部分会设计时序图，我们首先还是来看下参数设计，如表格 10 所示。<br> 表格 10 抢票接口参数</p>`,4),T=p(`<p>返回结构如下所示：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;ret&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;message&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;success&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;111&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;洗头券&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;desc&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;code&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;xxx1222&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;actId&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;1110&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;isEffective&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;image&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;xxxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;start_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1422222333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;end_time&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1444444444</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;ret&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;message&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;success&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;111&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;洗头券&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;desc&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;周六日前往，可免费体验&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;code&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;xxx1222&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;actId&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;1110&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;isEffective&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;image&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;xxxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;start_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1422222333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;end_time&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1444444444</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里抢票会可能失败，比如 -1 活动结束了，-2 票不足，未抢到，-3 则是系统错误。如果抢到票则在 data 中返回具体的票信息，用于前端展示。</p><p>时序图如图 3 所示。</p>`,4),v=p(`<p>图 3 抢票接口时序图</p><p>我来详细带你了解各模块间的函数交互的 6 过程：</p><ol><li><p>用户调用 ticket/get 前往抢票；</p></li><li><p>进行活动校验，主要是检查活动时间是否生效过程中，如果已经失效或者未开始，则直接返回相应的错误码；</p></li><li><p>检查用户是否有权限参加活动，判断用户是否已经参加过，或者该活动是否仅针对某些用户，如果参加过返回相应的状态，如果不能参加则返回其他信息；</p></li><li><p>校验都通过后，调用 Model 层的 getOneTicket 方法获取一张票，这时候需要利用 Redis 的队列，原子操作获取一张票，拿到票以后返回相应的 code 信息；</p></li><li><p>拿到 code 以后需要将 code 换成票详情信息，因此又需要反查 Service 层获取票详情；</p></li><li><p>最终再将票详情返回给到接口调用方。</p></li></ol><p>完成接口设计以后，我们就可以做一定的 Mock 数据返回了，你可以打开<a href="https://github.com/love-flutter/nodejs-column?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">17 讲的 GitHub</a>的源代码，然后运行服务，访问以下 5 个接口，你将可以得到一组测试的假数据，这样和你合作的前端同学也可以进行一些界面的开发了：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/list</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/detail?actId=111</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/detail?ticketId=111</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/list</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/list</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/detail?actId=111</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/detail?ticketId=111</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/list</span></span></code></pre></div><p>以上就是抢票逻辑的几个过程，这一讲我只带你做完了前期的准备工作，主要是让你了解后台服务的开发流程，而 18 讲则侧重在代码实现细节，核心是介绍系统的开发实践以及核心抢票逻辑的原理。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>总的来说，前后端开发在思路上是完全不同的，前端注重交互，后端则要考虑架构的设计以及数据结构的设计。学完这一讲之后，我希望你能更了解后台服务的开发思维，从需求拆解分析到架构设计、数据结构的设计，最终到接口的协议的设计。在整个流程中，你要非常注意核心接口的设计以及技术细节的实现，在前期考虑好所有的设计后，再进行下一讲的代码实现。</p><p>今天我给你留的作业是：在本讲中只是绘制了活动列表和抢票的时序图，你可以尝试去绘制活动详情、票列表和票详情的时序图，感谢你的阅读，我们下一讲见。</p>`,9);function D(f,P,S,I,M,R){const n=t("Image");return e(),c("div",null,[E,o(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/EF/Cgp9HWCHs9uASQd_AAEmJyLM3ZA530.png"}),a(),y,o(n,{alt:"2021427-16051.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/F6/Cgp9HWCHxM2AVJF9AAEESFYZzXQ742.png"}),a(),i,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/F7/CioPOWCHtCOAQdDiAABbA8HTaXk689.png"}),a(),u,o(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/EF/Cgp9HWCHtDmADmj3AAB9ykWJBzM920.png"}),a(),q,d,_,F,C,h,g,o(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/F7/CioPOWCHtFCAUZ2yAAA5HVIwidg206.png"}),a(),B,o(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F7/CioPOWCHtGCAUraVAABWk6QkP0g384.png"}),a(),m,x,A,b,o(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F7/CioPOWCHtGyAJsHYAAA01aveJSg751.png"}),a(),k,o(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F8/CioPOWCHtHiAETgTAAA1-H9aNLI698.png"}),a(),T,o(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/EF/Cgp9HWCHtIOAPyT9AADhIF3eWWE014.png"}),a(),v])}const j=l(r,[["render",D]]);export{V as __pageData,j as default};
