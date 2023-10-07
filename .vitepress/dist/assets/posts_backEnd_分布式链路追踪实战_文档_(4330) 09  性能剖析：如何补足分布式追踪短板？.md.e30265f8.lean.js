import{_ as r,j as l,o as p,g as i,k as s,h as o,Q as a,s as t}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"09性能剖析：如何补足分布式追踪短板？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4330) 09  性能剖析：如何补足分布式追踪短板？.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4330) 09  性能剖析：如何补足分布式追踪短板？.md","lastUpdated":1696417798000}'),e={name:"posts/backEnd/分布式链路追踪实战_文档/(4330) 09  性能剖析：如何补足分布式追踪短板？.md"},_=a("",16),g=a("",9),c=t("p",null,"CPU 火焰图",-1),h=t("p",null,"在 CPU 火焰图中，每一个方格代表一个方法栈帧，方格的长度则代表它的执行时间，所以方格越长就说明该栈帧执行的时间越长。火焰图中在某一个方格中增高一层，就说明是这个方法栈帧中，又调用了某个方法的栈帧。最顶层的函数，是叶子函数。叶子函数的方格越宽，说明这个方法在这里的执行耗时越长。",-1),d=t("p",null,"如果觉得上面的火焰图太复杂的话，我们可以看一张简化的图，如下：",-1),u=t("p",null,"图中，a 方法是执行的方法，可以看出来，其中 g 方法是执行时间相对较长的。",-1),m=t("p",null,"无论是火焰图，还是这张简化的图，它们都通过图形的方式，让我们能够快速定位到执行缓慢的原因。但是这种的方式也存在一些问题：",-1),C=t("ol",null,[t("li",null,[t("p",null,[t("strong",null,"不方便查看函数名称等信息"),o("。虽然我们可以做一些交互上的处理，比如浮动时展示，但如果我们在进行栈帧跟踪，查询还是不方便。")])]),t("li",null,[t("p",null,[t("strong",null,"很难发现非叶子节点的问题"),o("。我们在简化图中可以发现，我们在 d 方法中除了 e 和 f 方法的调用以外，其实 d 方法还有一段的时间是自己消耗的，并且没有被处理掉，这一问题在火焰图中会更加明显。")])])],-1),A=t("h4",{id:"树形图",tabindex:"-1"},[o("树形图 "),t("a",{class:"header-anchor",href:"#树形图","aria-label":'Permalink to "树形图"'},"​")],-1),P=a("",9);function T(b,S,f,k,q,D){const n=l("Image");return p(),i("div",null,[_,s(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/47/3C/Ciqc1F9HZ0uASChgAABQpC64934541.png"}),o(),g,s(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/47/3C/Ciqc1F9HZ2KAXgC0AAaJrTEo0uQ972.png"}),o(),c,h,d,s(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/47/48/CgqCHl9HZ2mAaGjhAACnwkzLj5I930.png"}),o(),u,m,C,A,s(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/47/3D/Ciqc1F9HZ6SAAuuSAACg533klAQ565.png"}),o(),P])}const I=r(e,[["render",T]]);export{V as __pageData,I as default};
