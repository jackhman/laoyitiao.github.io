import{_ as o,j as e,o as t,h as r,k as l,f as a,Q as p,s}from"./chunks/framework.d3daa342.js";const j=JSON.parse('{"title":"15探究MyBati结果集映射机制背后的秘密（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6386) 15  探究 MyBati 结果集映射机制背后的秘密（下）.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6386) 15  探究 MyBati 结果集映射机制背后的秘密（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6386) 15  探究 MyBati 结果集映射机制背后的秘密（下）.md"},y=p("",35),E=p("",21),i=s("p",null,"ResultLoaderMap.load() 方法的调用点",-1),u=s("p",null,"ResultLoaderMap 中还有一个 loadAll() 方法，这个方法会触发 loaderMap 中全部 ResultLoader 的 load() 方法，将所有延迟加载的对象都加载上来。",-1),d=s("h4",{id:"_4-代理工厂",tabindex:"-1"},[a("4. 代理工厂 "),s("a",{class:"header-anchor",href:"#_4-代理工厂","aria-label":'Permalink to "4. 代理工厂"'},"​")],-1),F=s("p",null,[a("为了同时接入 cglib 和 javassist 两种生成动态代理的方式，"),s("strong",null,"MyBatis 提供了一个抽象的 ProxyFactory 接口来抽象动态生成代理类的基本行为"),a("，同时提供了下图中的两个实现类来接入上述两种生成方式：")],-1),g=p("",33),D=s("p",null,[a("]("),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),a(")")],-1),h=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),b=s("p",null,[a("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),a("！")],-1);function A(M,m,C,R,v,B){const n=e("Image");return t(),r("div",null,[y,l(n,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/5C/Cgp9HWBLPxOAVTGAAADxvYPW-EI795.png"}),a(),E,l(n,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/59/CioPOWBLPt6AAcONAAREOc3fRG0341.png"}),a(),i,u,d,F,l(n,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/59/CioPOWBLPvuAEqGrAAD_fS5qAGA047.png"}),a(),g,l(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"}),a(),D,h,b])}const _=o(c,[["render",A]]);export{j as __pageData,_ as default};
