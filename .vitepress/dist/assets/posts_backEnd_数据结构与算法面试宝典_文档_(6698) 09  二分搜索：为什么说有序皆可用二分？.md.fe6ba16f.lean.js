import{_ as o,j as e,o as t,h as r,k as a,f as s,Q as p,s as l}from"./chunks/framework.d3daa342.js";const Z=JSON.parse('{"title":"09 二分搜索：为什么说有序皆可用二分？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6698) 09  二分搜索：为什么说有序皆可用二分？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6698) 09  二分搜索：为什么说有序皆可用二分？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6698) 09  二分搜索：为什么说有序皆可用二分？.md"},E=p("",7),y=p("",15),i=p("",11),A=p("",47),g=p("",21),F=p("",5),D=p("",26),u=l("p",null,[s('我们要求的是"最小长度的连续子数组"。不过在实施的时候，需要'),l("strong",null,'把"最小，最大"这种字样去掉'),s("，然后变为 x。")],-1),B=l("p",null,"确定了 x 之后，我们还需要确定 x 的范围。连续子数组的长度，在这个题里面只能可能是 [1, N + 1)。因为 A[] 数组和 s 都是正数。所以最短的连续子数组不可能为 0。 而最长可以是整个数组 N。那么用开闭原则表示就应该是 [0, N + 1)。",-1),h=l("p",null,[l("strong",null,"2"),s(". 第二步：满足约束条件的 f(x) = 0。")],-1),d=l("p",null,"对于一个给定的子数组长度 x，f(x) 表示的含义：满足约束条件（长度为 x 的连续子数组的和的最大值 >= s），f(x) = 0。",-1),C=l("p",null,[l("strong",null,"3"),s(" . "),l("strong",null,"不满足"),s("约束条件的 f(x) 设置为 -1 或者 1。")],-1),m=l("p",null,"那么到底是设置为 -1，还是 1 呢？这个时候我们需要回到题目的场景中进一步思考。此时可以确定 f(x) = 长度为 x 的子数组最大和。接下来可以得出：f(x + 1)≥f(x)",-1),b=l("p",null,[l("strong",null,"证明"),s("：当已经得到 f(x) 之后，只需要在长度为 x 的子数组的左边/右边再加延长一下就可以得到 f(x+1)。如下图所示：")],-1),_=l("p",null,"由于数组中的元素都是正数，那么可以肯定的是 f(x + 1) ≥ f(x)。那么我们可以得到一个单调递增的函数，那就是：",-1),f=p("",24),x=p("",5),k=l("p",null,"对于 f(x) 来说，其含义为：给定的平均值 x，如果存在：",-1),v=l("p",null,[l("strong",null,"3"),s(" . "),l("strong",null,"不满足"),s("约束条件的 f(x) 设置为 -1 或者 1。")],-1),T=p("",12),q=p("",8),S=p("",8),j=p("",14),N=p("",10),V=p("",7),w=l("p",null,"当 A[L] < A[M] 的时候，中间值肯定是掉落在左边的。在这种情况下，我们需要再分 （a）、（b） 两种情况。",-1),R=l("p",null,"（a）x 位于 A[m] 的左边。此时需要满足条件：A[L] < x < A[M]。在这种情况下，右边的区域是没有必要保留的。可以通过 R = M 来扔掉。",-1),M=l("p",null,"（b）x 位于 A[m] 的右边。此时左边的部分是没有必要保留的，把左边切掉，让 L = M+ 1。",-1),P=l("p",null,[l("strong",null,"2"),s(". A[m] 掉落在右边区域。需要满足条件 A[M] < A[R]。如下图所示：")],-1),H=l("p",null,"此时我们要找的值 x 可以分成（c）、（d）两种情况：",-1),Q=l("p",null,"（c）位于最右边区域。此时需要满足条件，A[M] < x < A[R]。那么可以直接把左边区域扔掉，设置 L = M + 1 即可。",-1),I=p("",19),X=p("",6);function K(G,O,L,W,J,U){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnQ2ADowqABN13BB0LLU138.gif"}),s(),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnTWAWu8YAADoiX1uAos462.png"}),s(),i,a(n,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M01/27/B7/CioPOWBdnUqAayqLABLk-NmvXA0875.gif"}),s(),A,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdnWuAHlaZAACvdO-eOpY916.png"}),s(),g,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdnXmAS4ZMAABruIWMDas017.png"}),s(),F,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdnYmAddOFAAETfQMy6vc139.png"}),s(),D,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdnb-ABFgaAABqYrb0MiY105.png"}),s(),u,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdnamADeEOAABqG8sccSs175.png"}),s(),B,h,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdncyAQiAyAABi-zz0PQo044.png"}),s(),d,C,m,b,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B8/CioPOWBdndSAVa20AACc21JFZlk639.png"}),s(),_,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdndqAIWGAAABwzAeOXWE704.png"}),s(),f,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B8/CioPOWBdnfCAfgTUAABrY1hyi1k406.png"}),s(),x,a(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdngWALZ9zAABhy_ZI9lg598.png"}),s(),k,a(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnieAbr7hAABBUtXsXLI943.png"}),s(),v,a(n,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B8/CioPOWBdnhGADWo8AABejsjHA-g049.png"}),s(),T,a(n,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B8/CioPOWBdnj6AXSEoAABxSRrShKU892.png"}),s(),q,a(n,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B8/CioPOWBdnkeACjFwAAB2QUb2OP8106.png"}),s(),S,a(n,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnmyAMTEQAAHbOIJo-JU000.png"}),s(),j,a(n,{alt:"Drawing 24.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnpuAJXhnAAEBs7isOFc504.png"}),s(),N,a(n,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnqWAGZStAABeKdrevNw727.png"}),s(),V,a(n,{alt:"Drawing 26.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BB/Cgp9HWBdnrKAAUj2AABniw2Zc2k297.png"}),s(),w,a(n,{alt:"Drawing 27.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B8/CioPOWBdnr2AT9D1AABp_yYk9aA263.png"}),s(),R,a(n,{alt:"Drawing 28.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BC/Cgp9HWBdnsWABOwBAABuoIxhu84288.png"}),s(),M,P,a(n,{alt:"Drawing 29.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdntCAT8kvAABlgSswVU8127.png"}),s(),H,a(n,{alt:"Drawing 30.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BC/Cgp9HWBdnteAAYFWAABom4eopCw440.png"}),s(),Q,a(n,{alt:"Drawing 31.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BC/Cgp9HWBdnt2AYcGmAABpvhp8n8M685.png"}),s(),I,a(n,{alt:"Drawing 32.png",src:"https://s0.lgstatic.com/i/image6/M00/27/B8/CioPOWBdnvmAHabcAAJ_yPY2KLM697.png"}),s(),X])}const z=o(c,[["render",K]]);export{Z as __pageData,z as default};
