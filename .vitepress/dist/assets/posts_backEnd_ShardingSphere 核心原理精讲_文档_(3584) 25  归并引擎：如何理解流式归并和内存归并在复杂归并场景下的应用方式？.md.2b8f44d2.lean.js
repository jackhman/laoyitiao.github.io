import{_ as o,j as e,o as t,g as r,k as a,Q as l,s,h as p}from"./chunks/framework.e0c66c3f.js";const S=JSON.parse('{"title":"最复杂的归并：分组归并 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3584) 25  归并引擎：如何理解流式归并和内存归并在复杂归并场景下的应用方式？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3584) 25  归并引擎：如何理解流式归并和内存归并在复杂归并场景下的应用方式？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3584) 25  归并引擎：如何理解流式归并和内存归并在复杂归并场景下的应用方式？.md"},E=l("",9),y=l("",8),i=s("ul",null,[s("li",null,[s("strong",null,"第二次 next 调用")])],-1),g=s("p",null,'与此同时，所有数据结果集中的游标都将下移至"task1"的下一个不同的数据值，并且根据数据结果集当前游标指向的值进行重排序。在上图中，我们看到第二个"task2"同时存在于 health_task0 和 health_task1 中，这样包含名字为"task2"的相关数据结果集则排在的队列的前列。',-1),u=s("p",null,[p("当再次执行 next 调用时，我们获取了 "),s("strong",null,'"task2"'),p(" 的分数并进行了累加，即 42+50=92，如下图中所示：")],-1),F=l("",58);function A(d,D,C,B,m,h){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4B/9B/CgqCHl9V6UOALvzxAAB7G9wGDzY482.png"}),y,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4B/9B/CgqCHl9V6V6AO3mBAAB_3I9Nrm8196.png"}),i,g,u,a(n,{alt:"Lark20200907-164326.png",src:"https://s0.lgstatic.com/i/image/M00/4B/99/Ciqc1F9V8tmAFpx-AAB_pY0rk9I059.png"}),F])}const b=o(c,[["render",A]]);export{S as __pageData,b as default};
