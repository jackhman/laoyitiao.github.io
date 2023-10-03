import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.f949202b.js";const q=JSON.parse('{"title":"引入 Spring Boot Actuator 组件 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5735) 20  服务监控：如何使用 Actuator 组件实现系统监控？.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5735) 20  服务监控：如何使用 Actuator 组件实现系统监控？.md","lastUpdated":null}'),p={name:"posts/backEnd/Spring Boot 实战开发_文档/(5735) 20  服务监控：如何使用 Actuator 组件实现系统监控？.md"},o=l(`<p>这一讲我们将介绍 Spring Boot 中一个非常有特色的主题------系统监控。</p><p>系统监控是 Spring Boot 中引入的一项全新功能，它对应用程序运行状态的管理非常有效。而 Spring Boot Actuator 组件主要通过一系列 HTTP 端点提供的系统监控功能来实现系统监控。因此，接下来我们将引入 Spring Boot Actuator 组件，介绍如何使用它进行系统监控，以及如何对 Actuator 端点进行扩展。</p><h3 id="引入-spring-boot-actuator-组件" tabindex="-1">引入 Spring Boot Actuator 组件 <a class="header-anchor" href="#引入-spring-boot-actuator-组件" aria-label="Permalink to &quot;引入 Spring Boot Actuator 组件&quot;">​</a></h3><p>在初始化 Spring Boot 系统监控功能之前，首先我们需要引入 Spring Boot Actuator 组件，具体操作为在 pom 中添加如下所示的 Maven 依赖：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-actuator&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-actuator&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>请注意，引入 Spring Boot Actuator 组件后，并不是所有的端点都对外暴露。例如，启动 customer-service 时，我们就可以在启动日志中发现如下所示内容：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Exposing 2 endpoint(s) beneath base path &#39;/actuator&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Exposing 2 endpoint(s) beneath base path &#39;/actuator&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>访问 <a href="http://localhost:8080/actuator" target="_blank" rel="noreferrer">http://localhost:8080/actuator</a> 端点后，我们也会得到如下所示结果。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;_links&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;self&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;health-path&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health/{*path}&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;health&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;info&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/info&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;_links&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;self&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;health-path&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health/{*path}&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;health&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;info&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/info&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>这种结果就是 HATEOAS 风格的 HTTP 响应。如果我们想看到默认情况下看不到的所有端点，则需要在配置文件中添加如下所示的配置信息。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">management:</span></span>
<span class="line"><span style="color:#E1E4E8;">  endpoints:</span></span>
<span class="line"><span style="color:#E1E4E8;">    web:</span></span>
<span class="line"><span style="color:#E1E4E8;">      exposure:</span></span>
<span class="line"><span style="color:#E1E4E8;">        include: &quot;*&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">management:</span></span>
<span class="line"><span style="color:#24292E;">  endpoints:</span></span>
<span class="line"><span style="color:#24292E;">    web:</span></span>
<span class="line"><span style="color:#24292E;">      exposure:</span></span>
<span class="line"><span style="color:#24292E;">        include: &quot;*&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>重启应用后，我们就能获取到 Spring Boot Actuator 暴露的所有端点，如下代码所示：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;_links&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;self&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;beans&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/beans&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;health&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;health-path&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health/{*path}&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;info&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/info&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;conditions&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/conditions&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;configprops&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/configprops&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;env&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/env&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;env-toMatch&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/env/{toMatch}&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;loggers&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/loggers&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;loggers-name&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/loggers/{name}&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;heapdump&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/heapdump&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;threaddump&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/threaddump&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;metrics-requiredMetricName&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/metrics/{requiredMetricName}&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;metrics&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/metrics&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;scheduledtasks&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/scheduledtasks&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;mappings&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/mappings&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;_links&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;self&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;beans&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/beans&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;health&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;health-path&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/health/{*path}&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;info&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/info&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;conditions&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/conditions&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;configprops&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/configprops&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;env&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/env&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;env-toMatch&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/env/{toMatch}&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;loggers&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/loggers&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;loggers-name&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/loggers/{name}&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;heapdump&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/heapdump&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;threaddump&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/threaddump&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;metrics-requiredMetricName&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/metrics/{requiredMetricName}&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:true</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;metrics&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/metrics&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;scheduledtasks&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/scheduledtasks&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;mappings&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;href&quot;:&quot;http://localhost:8080/actuator/mappings&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;templated&quot;:false</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><p>根据端点所起到的作用，我们把 Spring Boot Actuator 提供的原生端点分为如下三类。</p><ul><li><p><strong>应用配置类：</strong> 主要用来获取应用程序中加载的应用配置、环境变量、自动化配置报告等配置类信息，它们与 Spring Boot 应用密切相关。</p></li><li><p><strong>度量指标类：</strong> 主要用来获取应用程序运行过程中用于监控的度量指标，比如内存信息、线程池信息、HTTP 请求统计等。</p></li><li><p><strong>操作控制类：</strong> 在原生端点中只提供了一个关闭应用的端点，即 /shutdown 端点。</p></li></ul><p>根据 Spring Boot Actuator 默认提供的端点列表，我们将部分常见端点的类型、路径和描述梳理在如下表格中，仅供参考。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/08/30/Cip5yGAKfl6Af_yWAAIDoRxLU2E765.png" alt="Drawing 0.png"></p><p>通过访问上表中的各个端点，我们就可以获取自己感兴趣的监控信息了。例如访问了<a href="http://localhost:8082/actuator/health" target="_blank" rel="noreferrer">http://localhost:8082/actuator/health</a>端点，我们就可以得到如下所示的 account-service 基本状态。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;status&quot;:&quot;UP&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;status&quot;:&quot;UP&quot;</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>此时，我们看到这个健康状态信息非常简单。</p><p>那有没有什么办法可以获取更详细的状态信息呢？答案是：有，而且办法很简单，我们只需要在配置文件中添加如下所示的配置项即可。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">management: </span></span>
<span class="line"><span style="color:#E1E4E8;">  endpoint:</span></span>
<span class="line"><span style="color:#E1E4E8;">    health:</span></span>
<span class="line"><span style="color:#E1E4E8;">      show-details: always</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">management: </span></span>
<span class="line"><span style="color:#24292E;">  endpoint:</span></span>
<span class="line"><span style="color:#24292E;">    health:</span></span>
<span class="line"><span style="color:#24292E;">      show-details: always</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上述配置项指定了针对 health 端点需要显示它的详细信息。这时，如果我们重启 Spring Boot 应用程序，并重新访问 <a href="http://localhost:8082/actuator/health" target="_blank" rel="noreferrer">http://localhost:8082/actuator/health</a> 端点，就可以获取如下所示的详细信息。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;components&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;diskSpace&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;details&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;total&quot;:201649549312,</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;free&quot;:3434250240,</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;threshold&quot;:10485760</span></span>
<span class="line"><span style="color:#E1E4E8;">             }</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;ping&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;status&quot;:&quot;UP&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#24292E;">     &quot;components&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;diskSpace&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;details&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;total&quot;:201649549312,</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;free&quot;:3434250240,</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;threshold&quot;:10485760</span></span>
<span class="line"><span style="color:#24292E;">             }</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;ping&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;status&quot;:&quot;UP&quot;</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>如果 Spring Boot Actuator 默认提供的端点信息不能满足业务需求，我们可以对其进行修改和扩展。此时，常见实现方案有两种，一种是扩展现有的监控端点，另一种是自定义新的监控端点。这两种方案我们都会逐一介绍，不过这一讲先来关注如何在现有的监控端点上添加定制化功能。</p><h3 id="扩展-actuator-端点" tabindex="-1">扩展 Actuator 端点 <a class="header-anchor" href="#扩展-actuator-端点" aria-label="Permalink to &quot;扩展 Actuator 端点&quot;">​</a></h3><p>前面我们介绍了 Spring Boot 默认暴露了日常开发中最常见的两个端点：Info 端点和 Health 端点。接下来，我们讨论下如何对这两个端点进行扩展。</p><h4 id="扩展-info-端点" tabindex="-1">扩展 Info 端点 <a class="header-anchor" href="#扩展-info-端点" aria-label="Permalink to &quot;扩展 Info 端点&quot;">​</a></h4><p>Info 端点用于暴露 Spring Boot 应用的自身信息。在 Spring Boot 内部，它把这部分工作委托给了一系列 <a href="https://github.com/spring-projects/spring-boot/tree/v1.4.1.RELEASE/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/InfoContributor.java" target="_blank" rel="noreferrer">InfoContributor</a> 对象，而 Info 端点会暴露所有 <a href="https://github.com/spring-projects/spring-boot/tree/v1.4.1.RELEASE/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/InfoContributor.java" target="_blank" rel="noreferrer">InfoContributor</a> 对象所收集的各种信息。</p><p>在Spring Boot 中包含了很多自动配置的 InfoContributor 对象，常见的 InfoContributor 及其描述如下表所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/90/47/CgqCHmAKfoOARrjaAADoOGMdQb4610.png" alt="Drawing 1.png"></p><p>以上表中的 EnvironmentInfoContributor 为例，通过在配置文件中添加格式以&quot;info&quot;作为前缀的配置段，我们就可以定义 Info 端点暴露的数据。添加完成后，我们将看到所有在&quot;info&quot;配置段下的属性都将被自动暴露。</p><p>比如你可以将如下所示配置信息添加到配置文件 application.yml 中：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">info:</span></span>
<span class="line"><span style="color:#E1E4E8;">	app:</span></span>
<span class="line"><span style="color:#E1E4E8;">	    encoding: UTF-8</span></span>
<span class="line"><span style="color:#E1E4E8;">	    java:</span></span>
<span class="line"><span style="color:#E1E4E8;">	        source: 1.8.0_31</span></span>
<span class="line"><span style="color:#E1E4E8;">	        target: 1.8.0_31</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">info:</span></span>
<span class="line"><span style="color:#24292E;">	app:</span></span>
<span class="line"><span style="color:#24292E;">	    encoding: UTF-8</span></span>
<span class="line"><span style="color:#24292E;">	    java:</span></span>
<span class="line"><span style="color:#24292E;">	        source: 1.8.0_31</span></span>
<span class="line"><span style="color:#24292E;">	        target: 1.8.0_31</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>现在访问 Info 端点，我们就能得到如下的 Environment 信息。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;app&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;encoding&quot;:&quot;UTF-8&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;java&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;source&quot;:&quot;1.8.0_31&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;target&quot;:&quot;1.8.0_31&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;app&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;encoding&quot;:&quot;UTF-8&quot;,</span></span>
<span class="line"><span style="color:#24292E;">         &quot;java&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;source&quot;:&quot;1.8.0_31&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;target&quot;:&quot;1.8.0_31&quot;</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>同时，我们还可以在服务构建时扩展 Info 属性，而不是硬编码这些值。假设使用 Maven，我们就可以按照如下所示的配置重写前面的示例并得到同样的效果。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">info: </span></span>
<span class="line"><span style="color:#E1E4E8;">	app:</span></span>
<span class="line"><span style="color:#E1E4E8;">	    encoding: @project.build.sourceEncoding@</span></span>
<span class="line"><span style="color:#E1E4E8;">	    java:</span></span>
<span class="line"><span style="color:#E1E4E8;">	      source: @java.version@</span></span>
<span class="line"><span style="color:#E1E4E8;">	      target: @java.version@</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">info: </span></span>
<span class="line"><span style="color:#24292E;">	app:</span></span>
<span class="line"><span style="color:#24292E;">	    encoding: @project.build.sourceEncoding@</span></span>
<span class="line"><span style="color:#24292E;">	    java:</span></span>
<span class="line"><span style="color:#24292E;">	      source: @java.version@</span></span>
<span class="line"><span style="color:#24292E;">	      target: @java.version@</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>很多时候，Spring Boot 自身提供的 Info 端点并不能满足我们的业务需求，这就需要我们编写一个自定义的 InfoContributor 对象。</p><p>方法也很简单，我们直接实现 InfoContributor 接口的 contribute() 方法即可。例如，我们希望在 Info 端点中暴露该应用的构建时间，就可以采用如下所示的代码进行操作。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomBuildInfoContributor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InfoContributor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">contribute</span><span style="color:#E1E4E8;">(Builder </span><span style="color:#FFAB70;">builder</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      builder.</span><span style="color:#B392F0;">withDetail</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          Collections.</span><span style="color:#B392F0;">singletonMap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timestamp&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Date</span><span style="color:#E1E4E8;">())); </span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomBuildInfoContributor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InfoContributor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">contribute</span><span style="color:#24292E;">(Builder </span><span style="color:#E36209;">builder</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      builder.</span><span style="color:#6F42C1;">withDetail</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          Collections.</span><span style="color:#6F42C1;">singletonMap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timestamp&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">())); </span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>重新构建应用并访问 Info 端口后，我们就能获取如下所示信息。</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;app&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;encoding&quot;:&quot;UTF-8&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;java&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;source&quot;:&quot;1.8.0_31&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;target&quot;:&quot;1.8.0_31&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">     },</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;build&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;timestamp&quot;:1604307503710</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;app&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;encoding&quot;:&quot;UTF-8&quot;,</span></span>
<span class="line"><span style="color:#24292E;">         &quot;java&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;source&quot;:&quot;1.8.0_31&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;target&quot;:&quot;1.8.0_31&quot;</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">     },</span></span>
<span class="line"><span style="color:#24292E;">     &quot;build&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;timestamp&quot;:1604307503710</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这里我们可以看到，CustomBuildInfoContributor 为 Info 端口新增了时间属性。</p><h4 id="扩展-health-端点" tabindex="-1">扩展 Health 端点 <a class="header-anchor" href="#扩展-health-端点" aria-label="Permalink to &quot;扩展 Health 端点&quot;">​</a></h4><p>Health 端点用于检查正在运行的应用程序健康状态，而健康状态信息由 HealthIndicator 对象从 Spring 的 ApplicationContext 中获取。</p><p>和 Info 端点一样，Spring Boot 内部也提供了一系列 HealthIndicator 对象供我们实现定制化。在默认情况下，HealthAggregator 会根据 HealthIndicator 的有序列表对每个状态进行排序，从而得到最终的系统状态。</p><p>常见的 HealthIndicator 如下表所示：</p><table><thead><tr><th><strong>HealthIndicator 名称</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/system/DiskSpaceHealthIndicator.java" target="_blank" rel="noreferrer">DiskSpaceHealthIndicator</a></td><td>检查磁盘空间是否足够</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/jdbc/DataSourceHealthIndicator.java" target="_blank" rel="noreferrer">DataSourceHealthIndicator</a></td><td>检查是否可以获得连接 DataSource</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/elasticsearch/ElasticsearchHealthIndicator.java" target="_blank" rel="noreferrer">ElasticsearchHealthIndicator</a></td><td>检查 Elasticsearch 集群是否启动</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/jms/JmsHealthIndicator.java" target="_blank" rel="noreferrer">JmsHealthIndicator</a></td><td>检查 JMS 代理是否启动</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/mail/MailHealthIndicator.java" target="_blank" rel="noreferrer">MailHealthIndicator</a></td><td>检查邮件服务器是否启动</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/mongo/MongoHealthIndicator.java" target="_blank" rel="noreferrer">MongoHealthIndicator</a></td><td>检查 Mongo 数据库是否启动</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/amqp/RabbitHealthIndicator.java" target="_blank" rel="noreferrer">RabbitHealthIndicator</a></td><td>检查 RabbitMQ 服务器是否启动</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/redis/RedisHealthIndicator.java" target="_blank" rel="noreferrer">RedisHealthIndicator</a></td><td>检查 Redis 服务器是否启动</td></tr><tr><td><a href="https://github.com/spring-projects/spring-boot/tree/v2.0.1.RELEASE/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/solr/SolrHealthIndicator.java" target="_blank" rel="noreferrer">SolrHealthIndicator</a></td><td>检查 Solr 服务器是否已启动</td></tr></tbody></table><p>Health 端点信息的丰富程度取决于当下应用程序所处的环境，而一个真实的 Health 端点信息如下代码所示：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">     &quot;components&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;db&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;details&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;database&quot;:&quot;MySQL&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;result&quot;:1,</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;validationQuery&quot;:&quot;/* ping */ SELECT 1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">             }</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;diskSpace&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;details&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;total&quot;:201649549312,</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;free&quot;:3491287040,</span></span>
<span class="line"><span style="color:#E1E4E8;">                 &quot;threshold&quot;:10485760</span></span>
<span class="line"><span style="color:#E1E4E8;">             }</span></span>
<span class="line"><span style="color:#E1E4E8;">         },</span></span>
<span class="line"><span style="color:#E1E4E8;">         &quot;ping&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">             &quot;status&quot;:&quot;UP&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#24292E;">     &quot;components&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">         &quot;db&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;details&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;database&quot;:&quot;MySQL&quot;,</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;result&quot;:1,</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;validationQuery&quot;:&quot;/* ping */ SELECT 1&quot;</span></span>
<span class="line"><span style="color:#24292E;">             }</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;diskSpace&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;status&quot;:&quot;UP&quot;,</span></span>
<span class="line"><span style="color:#24292E;">             &quot;details&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;total&quot;:201649549312,</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;free&quot;:3491287040,</span></span>
<span class="line"><span style="color:#24292E;">                 &quot;threshold&quot;:10485760</span></span>
<span class="line"><span style="color:#24292E;">             }</span></span>
<span class="line"><span style="color:#24292E;">         },</span></span>
<span class="line"><span style="color:#24292E;">         &quot;ping&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">             &quot;status&quot;:&quot;UP&quot;</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>通过以上这些信息，我们就可以判断该环境中是否包含了 MySQL 数据库。</p><p>现在，我们还想在 Health 端点中暴露 customer-service 当前运行时状态。</p><p>为了进一步明确该服务的状态，我们可以自定义一个 CustomerServiceHealthIndicator 端点专门展示 customer-service 的状态信息，CustomerServiceHealthIndicator 的定义如下所示：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomerServiceHealthIndicator</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">HealthIndicator</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Health </span><span style="color:#B392F0;">health</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	URL url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">URL</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;http://localhost:8083/health/&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">	HttpURLConnection conn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (HttpURLConnection) </span></span>
<span class="line"><span style="color:#E1E4E8;">	url.</span><span style="color:#B392F0;">openConnection</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> statusCode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> conn.</span><span style="color:#B392F0;">getResponseCode</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (statusCode </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> statusCode </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Health.</span><span style="color:#B392F0;">up</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Health.</span><span style="color:#B392F0;">down</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">withDetail</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;HTTP Status Code&quot;</span><span style="color:#E1E4E8;">, statusCode).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Health.</span><span style="color:#B392F0;">down</span><span style="color:#E1E4E8;">(e).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomerServiceHealthIndicator</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">HealthIndicator</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Health </span><span style="color:#6F42C1;">health</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	URL url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">URL</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;http://localhost:8083/health/&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">	HttpURLConnection conn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (HttpURLConnection) </span></span>
<span class="line"><span style="color:#24292E;">	url.</span><span style="color:#6F42C1;">openConnection</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> statusCode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> conn.</span><span style="color:#6F42C1;">getResponseCode</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (statusCode </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> statusCode </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Health.</span><span style="color:#6F42C1;">up</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Health.</span><span style="color:#6F42C1;">down</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">withDetail</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;HTTP Status Code&quot;</span><span style="color:#24292E;">, statusCode).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Health.</span><span style="color:#6F42C1;">down</span><span style="color:#24292E;">(e).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>我们需要提供 health() 方法的具体实现并返回一个 Health 结果。该 Health 结果应该包括一个状态，并且可以根据需要添加任何细节信息。</p><p>以上代码中，我们使用了一种简单且直接的方式判断配置中心服务&quot;customerservice&quot;是否正在运行。然后我们构建一个 HTTP 请求，并根据 HTTP 响应得出了健康诊断的结论。</p><p>如果 HTTP 响应的状态码处于 200~300 之间，我们认为该服务正在运行，此时，Health.up().build() 方法就会返回一种 Up 响应，如下代码所示：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;status&quot;: &quot;UP&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        &quot;customerservice&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;status&quot;: &quot;UP&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    &quot;status&quot;: &quot;UP&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">        &quot;customerservice&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">            &quot;status&quot;: &quot;UP&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>如果状态码不处于这个区间（例如返回 404，代表服务不可用），Health.down().withDetail().build() 方法就会返回一个 Down 响应，并给出具体的状态码，如下代码所示：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        &quot;customerservice&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                &quot;HTTP Status Code&quot;: &quot;404&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">        &quot;customerservice&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">            &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#24292E;">            &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">                &quot;HTTP Status Code&quot;: &quot;404&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>如果 HTTP 请求直接抛出了异常，Health.down().build() 方法同样会返回一个 Down 响应，并返回异常信息，效果如下代码所示：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        &quot;customerservice&quot;:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                &quot;error&quot;: &quot;java.net.ConnectException: Connection refused: connect&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">        &quot;customerservice&quot;:{</span></span>
<span class="line"><span style="color:#24292E;">            &quot;status&quot;: &quot;DOWN&quot;,</span></span>
<span class="line"><span style="color:#24292E;">            &quot;details&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">                &quot;error&quot;: &quot;java.net.ConnectException: Connection refused: connect&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>显然，通过扩展 Health 端点为我们实时监控系统中各个服务的正常运行状态提供了很好的支持，我们也可以根据需要构建一系列有用的 HealthIndicator 实现类，并添加报警等监控手段。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>Spring Boot 内置的 Actuator 组件使得开发人员在管理应用程序运行的状态有了更加直接且高效的手段。</p><p>这一讲，我们引入了 Actuator 组件并介绍了该组件提供的一系列核心端点，同时重点分析了 Info 和 Health 这两个基础端点，并给出了对它们进行扩展的系统方法。</p><p>系统监控的一大目标是收集和分析系统运行时的度量指标，并基于这些指标判断当前的运行时状态，因此，21 讲我们将讨论如何在系统中嵌入自定义度量指标的实现技巧。</p><p>这里给你留一道思考题：在使用 Spring Boot 时，如何实现自定义的健康监测功能？欢迎你在留言区与我互动、交流。</p><p>另外，如果你觉得本专栏有价值，欢迎分享给更多好友看到哦~</p>`,70),e=[o];function t(r,c,i,u,E,y){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{q as __pageData,d as default};
