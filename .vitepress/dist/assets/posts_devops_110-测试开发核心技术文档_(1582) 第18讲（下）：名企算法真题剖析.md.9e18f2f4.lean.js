import{_ as e,j as o,o as t,g as c,k as a,h as l,Q as p,s}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"第18讲（下）：名企算法真题剖析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(1582) 第18讲（下）：名企算法真题剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(1582) 第18讲（下）：名企算法真题剖析.md","lastUpdated":1696417798000}'),r={name:"posts/devops/110-测试开发核心技术文档/(1582) 第18讲（下）：名企算法真题剖析.md"},i=p("",25),E=p("",6),d=p("",9),y=p("",6),h=p("",26),u=s("br",null,null,-1),_=s("p",null,"这时报错，我们就需要去查找原因，我们可以看到测试用例需要一个 content，因为 create_from_string 是一个类方法，我已经传入了一个参数但是它提示还缺一个参数，原因在于 tree 结构有两个参数，第一个参数要传入一个类，从目前来看调用的方法里面，它使用的是 Tree 这个数据，也就是说你调用的参数的类型是不对的，那怎么办呢？我们对于使用类而不是实例直接进行调用时，需要将它改造成一个静态方法。",-1),g=s("br",null,null,-1),f=s("br",null,null,-1),q=s("p",null,"我们使用 classmethod 对 create_tree_string 进行注解，然后再使用一个 cls，我们将它改造成一个类方法。",-1),b=s("br",null,null,-1),v=s("br",null,null,-1),k=s("p",null,"处理完成之后我们运行 case，整个 case 完全可以通过，然后我们把打印逻辑的代码复制过来并打印下这个结构。",-1),m=s("br",null,null,-1),T=s("br",null,null,-1),A=s("p",null,"可以发现数据结构完全正确，到这里根据 html 数据生成多叉树的处理逻辑就全部讲完了。",-1),C=s("br",null,null,-1);function D(N,x,I,S,B,F){const n=o("Image");return t(),c("div",null,[i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIKAIsZ1AADAOtimqRs873.png"}),l(),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOAK2iIAADUdQhHwIQ158.png"}),l(),d,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIOAQQJnAADIUkZj7wg648.png"}),l(),y,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOASaR1AADIGqiGv1M869.png"}),l(),h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIOAFA6ZAAFGmXvabCo953.png"}),l(),u,_,g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOASL9dAADXKF9RsZk190.png"}),l(),f,q,b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/CgpOIF5GdIOAM3FBAAEkGsUFxqY064.png"}),l(),v,k,m,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/81/Cgq2xl5GdIOAdN7TAAEINwwXC50534.png"}),l(),T,A,C])}const O=e(r,[["render",D]]);export{V as __pageData,O as default};
