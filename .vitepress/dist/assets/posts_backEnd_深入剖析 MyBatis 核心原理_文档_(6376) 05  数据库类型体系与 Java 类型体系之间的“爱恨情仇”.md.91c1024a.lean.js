import{_ as o,j as e,o as t,g as c,k as l,h as a,s,Q as p}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"深入 TypeHandler ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6376) 05  数据库类型体系与 Java 类型体系之间的“爱恨情仇”.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6376) 05  数据库类型体系与 Java 类型体系之间的“爱恨情仇”.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6376) 05  数据库类型体系与 Java 类型体系之间的“爱恨情仇”.md"},y=s("p",null,"作为一个 Java 程序员，你应该已经具备了使用 JDBC 操作数据库的基础技能。在使用 JDBC 的时候，你会发现 JDBC 的数据类型与 Java 语言中的数据类型虽然有点对应关系，如下图所示，但还是无法做到一一对应，也自然无法做到自动映射。",-1),E=s("p",null,"数据库类型与 Java 类型对应图表",-1),i=s("p",null,"在使用 PreparedStatement 执行 SQL 语句之前，都是需要手动调用 setInt()、setString() 等 set 方法绑定参数，这不仅仅是告诉 JDBC 一个 SQL 模板中哪个占位符需要使用哪个实参，还会将数据从 Java 类型转换成 JDBC 类型。当从 ResultSet 中获取数据的时候，则是一个逆过程，数据会从 JDBC 类型转换为 Java 类型。",-1),d=s("p",null,[a("可以使用 MyBatis 中的"),s("strong",null,"类型转换器"),a("，完成上述两次类型转换，如下图所示：")],-1),F=p("",5),g=s("p",null,"TypeHandler 继承关系图",-1),A=s("p",null,"在 BaseTypeHandler 中，简单实现了 TypeHandler 接口的 setParameter() 方法和 getResult() 方法。",-1),T=s("ul",null,[s("li",null,[s("p",null,"在 setParameter() 实现中，会判断传入的 parameter 实参是否为空，如果为空，则调用 PreparedStatement.setNull() 方法进行设置；如果不为空，则委托 setNonNullParameter() 这个抽象方法进行处理，setNonNullParameter() 方法由 BaseTypeHandler 的子类提供具体实现。")]),s("li",null,[s("p",null,"在 getResult() 的三个重载实现中，会直接调用相应的 getNullableResult() 抽象方法，这里有三个重载的 getNullableResult() 抽象方法，它们都由 BaseTypeHandler 的子类提供具体实现。")])],-1),u=s("p",null,[a("BaseTypeHandler 的具体实现比较简单，这里就不再展示，你若感兴趣的话可以参考"),s("a",{href:"https://github.com/xxxlxy2008/mybatis",target:"_blank",rel:"noreferrer"},"源码"),a("进行学习。")],-1),D=s("p",null,"下图展示了 BaseTypeHandler 的全部实现类，虽然实现类比较多，但是它们的实现方式大同小异。",-1),H=p("",45),C={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},b=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),m=s("p",null,[a("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),a("！")],-1);function h(B,v,M,J,S,_){const n=e("Image");return t(),c("div",null,[y,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/02/E6/Cgp9HWAeMiSAcga0AAEpsa9onlg651.png"}),a(),E,i,d,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/02/E4/CioPOWAeMi6AdTRAAAENMX_HsyU054.png"}),a(),F,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/02/E4/CioPOWAeMkCANy6LAABJPBfXPJY527.png"}),a(),g,A,T,u,D,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/02/E6/Cgp9HWAeMkuAI22uAApwhcDLfQ4596.png"}),a(),H,s("p",null,[s("a",C,[l(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"})])]),b,m])}const L=o(r,[["render",h]]);export{f as __pageData,L as default};
