import{_ as l,j as e,o as t,g as r,k as p,h as a,Q as n,s}from"./chunks/framework.4e7d56ce.js";const L=JSON.parse('{"title":"指标功能 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4325) 04  统计指标：“五个九”对系统稳定的真正意义.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4325) 04  统计指标：“五个九”对系统稳定的真正意义.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/分布式链路追踪实战_文档/(4325) 04  统计指标：“五个九”对系统稳定的真正意义.md"},y=n("",10),E=s("p",null,"图 1：计数器",-1),i=s("h4",{id:"仪表盘-gauge",tabindex:"-1"},[a("仪表盘（Gauge） "),s("a",{class:"header-anchor",href:"#仪表盘-gauge","aria-label":'Permalink to "仪表盘（Gauge）"'},"​")],-1),d=s("p",null,"仪表盘和计数器都可以用来查询某个时间点的固定内容的数值，但和计数器不同，仪表盘的值可以随意变化，可以增加也可以减少。比如在 Java 线程池中活跃的线程数，就可以使用 ThreadPoolExecutor 的 getActiveCount 获取；比较常见的 CPU 使用率和内存占用量也可以通过仪表盘获取。",-1),h=s("p",null,"图 2：仪表盘",-1),_=s("h4",{id:"直方图-histogram",tabindex:"-1"},[a("直方图（Histogram） "),s("a",{class:"header-anchor",href:"#直方图-histogram","aria-label":'Permalink to "直方图（Histogram）"'},"​")],-1),u=s("p",null,"直方图相对复杂一些，它是将多个数值聚合在一起的数据结构，可以表示数据的分布情况。",-1),F=s("p",null,[a("如下图，它可以将数据分成多个"),s("strong",null,"桶（Bucket）"),a("，每个桶代表一个范围区间（图下横向数），比如第 1 个桶代表 0~10，第二个桶就代表 10~15，以此类推，最后一个桶代表 100 到正无穷。每个桶之间的数字大小可以是不同的，并没有规定要有规律。每个桶和一个数字挂钩（图左纵向数），代表了这个桶的数值。")],-1),A=s("p",null,"图 3：直方图",-1),g=s("p",null,"以最常见的响应耗时举例，我把响应耗时分为多个桶，比如我认为 0~100 毫秒比较快，就可以把这个范围做一个桶，然后是 100~150 毫秒，以此类推。通过这样的形式，可以直观地看到一个时间段内的请求耗时分布图，这有助于我们理解耗时情况分布。",-1),C=s("h4",{id:"摘要-summary",tabindex:"-1"},[a("摘要（Summary） "),s("a",{class:"header-anchor",href:"#摘要-summary","aria-label":'Permalink to "摘要（Summary）"'},"​")],-1),m=s("p",null,"摘要与直方图类似，同样表示的是一段时间内的数据结果，但是数据反映的内容不太一样。摘要一般用于标识分位值，分位值就是我们常说的 TP90、TP99 等。",-1),b=s("p",null,"假设有 100 个耗时数值，将所有的数值从低到高排列，取第 90% 的位置，这个位置的值就是 TP90 的值，而这个桶的值假设是 80ms，那么就代表小于等于90%位置的请求都 ≤80ms。",-1),q=s("p",null,"用文字不太好理解，我们来看下面这张图。这是一张比较典型的分位值图，我们可以看到图中有 6 个桶，分别是 50、75、80、90、95、99，而桶的值就是相对应的耗时情况。",-1),D=n("",31);function P(k,v,S,T,x,B){const o=e("Image");return t(),r("div",null,[y,p(o,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/40/5B/CgqCHl8yW_eAKnuGAABkAkOJ2w4716.png"}),a(),E,i,d,p(o,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/40/4F/Ciqc1F8yXACACNtbAAB9D2b9yO0247.png"}),a(),h,_,u,F,p(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/40/4F/Ciqc1F8yXAyAAr1_AANyRfEvYDI870.png"}),a(),A,g,C,m,b,q,p(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/40/4F/Ciqc1F8yXCuAAFmKAADKIjwhWjo693.png"}),a(),D])}const j=l(c,[["render",P]]);export{L as __pageData,j as default};
