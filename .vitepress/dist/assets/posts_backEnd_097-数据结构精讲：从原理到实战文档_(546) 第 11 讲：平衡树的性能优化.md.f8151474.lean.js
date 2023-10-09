import{_ as o,j as p,o as l,h as r,k as n,f as t,Q as e,s}from"./chunks/framework.d3daa342.js";const N=JSON.parse('{"title":"第11讲：平衡树的性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(546) 第 11 讲：平衡树的性能优化.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(546) 第 11 讲：平衡树的性能优化.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(546) 第 11 讲：平衡树的性能优化.md"},i=e("",9),_=e("",15),d=s("p",null,"这棵树的高度是 O(log n)，n 是这棵树的节点数量。无论搜索哪个节点，我们最多需要运行上面的 Search() 方法 O(log n)，怎么样？是不是有种逃不出如来佛祖手掌心的感觉。",-1),u=s("br",null,null,-1),g=s("p",null,"再让我们看一个最坏的情况，如果二叉查找树每一个节点都只有一个孩子呢？如图中所示：",-1),h=e("",9),E=e("",27),y=s("p",null,"从上图中可以看到，这样的数据结构其实和数组非常像，数组里的值就保存着 URL 和 1，每次有新用户观看过视频之后，就会将 URL 和 1 加到数组的结尾。在上面的例子中，我们只需要遍历一遍这个数组，然后将不同的 URL 值加起来就可以得到观看的总数，例如 A 的观看总数为 8 次，B 为 3 次，C 为 5 次。",-1),b=s("br",null,null,-1),S=s("p",null,"这其实就是 Log-Structured 结构的本质了，不过细心的你应该可以发现了，这样一个最基本的 Log-Structured 结构，其实在应用里会有很多的问题。比如说，一个数组不可能在内存中无限地增长下去，我们要如何处理呢？如果每次想要知道结果，就必须遍历一遍这样的数组，时间复杂度会非常高，那该怎么优化呢？平衡树是如何被应用在里面的呢？所有这些问题的答案我都会在下一讲中为你讲解。",-1),A=s("br",null,null,-1),T=s("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"LSM 树在 Apache HBase 等存储系统中的应用"，记得按时来听课哈。',-1);function k(m,L,f,B,q,x){const a=p("Image");return l(),r("div",null,[i,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/6F/Cgq2xl4lJxiAQfdjAABNJHaIRGg578.png"}),t(),_,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/6F/CgpOIF4lJxiARTx7AAAs1WYpVu4184.png"}),t(),d,u,g,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/6F/Cgq2xl4lJxiAUwTpAABybInZyxQ334.png"}),t(),h,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/6F/CgpOIF4lJxiAZkIuAAECpEddJJM026.png"}),t(),E,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/6F/Cgq2xl4lJxiANBoGAADWAJDk3lo640.png"}),t(),y,b,S,A,T])}const V=o(c,[["render",k]]);export{N as __pageData,V as default};
