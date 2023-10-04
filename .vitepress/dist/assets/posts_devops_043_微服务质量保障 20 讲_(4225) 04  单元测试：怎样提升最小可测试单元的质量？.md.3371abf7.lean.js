import{_ as s,j as i,o as n,g as l,k as o,s as t,h as e,Q as a}from"./chunks/framework.e0c66c3f.js";const x=JSON.parse('{"title":"单元测试的价值 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4225) 04  单元测试：怎样提升最小可测试单元的质量？.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4225) 04  单元测试：怎样提升最小可测试单元的质量？.md","lastUpdated":1696338709000}'),p={name:"posts/devops/043_微服务质量保障 20 讲/(4225) 04  单元测试：怎样提升最小可测试单元的质量？.md"},c=t("p",null,"上一篇文章，我讲到了微服务架构下的测试策略和质量保障体系，今天我来讲讲测试策略中的最底层测试------单元测试。",-1),g=t("h3",{id:"单元测试的价值",tabindex:"-1"},[e("单元测试的价值 "),t("a",{class:"header-anchor",href:"#单元测试的价值","aria-label":'Permalink to "单元测试的价值"'},"​")],-1),_=t("p",null,[e("单元测试是一种白盒测试技术，通常由开发人员在编码阶段完成，目的是验证软件代码中的每个单元（方法或类等）是否符合预期，即"),t("strong",null,"尽早"),e(" 在"),t("strong",null,"尽量小的范围内"),e("暴露问题。")],-1),h=t("p",null,"我们都知道，问题发现得越早，修复的代价越小。毫无疑问，在开发阶段进行正确的单元测试可以极大地节省时间和金钱。如果跳过单元测试，会导致在后续更高级别的测试阶段产生更高的缺陷修复成本。",-1),u=a("",11),m=t("p",null,[e("如图，测试订单类的获取总价方法（Order.getTotalPrice()）时会真实调用用户类的优惠等级方法（User.reductionLevel()）和商品类的商品单价方法（Goods.getUnitPrice()）。将被测试单元视为黑盒子，直接对其进行测试，这种单元测试称之为"),t("strong",null,"社交型单元测试（Sociable Unit Testing）"),e("。")],-1),d=t("h4",{id:"_2-孤立型单元测试-solitary-unit-testing",tabindex:"-1"},[e("2. 孤立型单元测试（Solitary Unit Testing） "),t("a",{class:"header-anchor",href:"#_2-孤立型单元测试-solitary-unit-testing","aria-label":'Permalink to "2. 孤立型单元测试（Solitary Unit Testing）"'},"​")],-1),k=a("",4),b=t("p",null,[t("strong",null,"由上图可知，在微服务架构中，不同组成使用的单元测试类型不同：")],-1),f=a("",13),A=a("",13);function T(w,q,v,C,j,S){const r=i("Image");return n(),l("div",null,[c,g,_,h,o(r,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/39/96/Ciqc1F8f7cWAVsrMAABFwThSg-U472.png"}),u,o(r,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/39/A1/CgqCHl8f7e6AKMwnAABnkatxrFM928.png"}),m,d,o(r,{alt:"Lark20200728-165448.png",src:"https://s0.lgstatic.com/i/image/M00/39/96/Ciqc1F8f7h-AU6TmAAC372KA44g862.png"}),k,o(r,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/39/A2/CgqCHl8f7kiAI3ksAAFYtUA3syQ407.png"}),b,o(r,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/39/A2/CgqCHl8f7lqAYCVuAACnpSlf1e4918.png"}),f,o(r,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/39/A2/CgqCHl8f7peAZGzxAABmknW8jXs450.png"}),A])}const M=s(p,[["render",T]]);export{x as __pageData,M as default};
