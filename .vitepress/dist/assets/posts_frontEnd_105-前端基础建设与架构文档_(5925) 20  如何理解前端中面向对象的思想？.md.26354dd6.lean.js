import{_ as l,j as o,o as e,g as t,k as n,Q as c,s,h as p}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"实现 new 没有那么容易 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5925) 20  如何理解前端中面向对象的思想？.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5925) 20  如何理解前端中面向对象的思想？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/105-前端基础建设与架构文档/(5925) 20  如何理解前端中面向对象的思想？.md"},E=c("",92),y=s("p",null,'通过上图，我们看出一些问题（单一继承、紧耦合以及层级分类问题），对于类 8，只想继承五边形的属性，却得到了继承链上其他并不需要的属性，比如五角星，正方形属性。这就是大猩猩/香蕉问题，"我只想要一个香蕉，但是你给我了整个森林"。',-1),i=s("p",null,"对于类 9，对比其父类，我只需要把五角星属性修改成四角星，但是五角星继承自基类 1，如果要去修改，那就会影响整个继承树（脆弱基类/层级僵化问题）；好吧，我不去修改，那就需要给类 9 新建一个基类（必然重复性问题）。",-1),d=s("p",null,"那么基于原型的继承如何解决上述问题呢？",-1),u=s("p",null,[p("采用原型继承，其实"),s("strong",null,"本质是对象组合"),p("，可以避免复杂纵深的层级关系。当类 1 需要四角星特性的时候，只需要组合新特性即可，不会影响到其他实例。")],-1),F=s("h3",{id:"总结",tabindex:"-1"},[p("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),h=s("p",null,'面向对象是一个永远说不完的话题，更是一个永远不会过时的话题，具备良好的面向对象架构能力，对于开发者来说至关重要。同时由于 JavaScript 面向对象的特殊性，它区别于其他语言，显得"与众不同"。我们在了解 JavaScript 原型、原型链知识的前提下，对比其他语言的思想，就变得非常重要和有意义了。',-1),g=s("p",null,"本讲内容总结如下：",-1),C=s("p",null,"从下一讲开始，我们将深入数据结构这个话题。数据结构是算法的基础，其本身也包含了算法的部分内容。如果你想要掌握算法，一定要先有一个巩固的数据结构基础。下一讲我们将用 JavaScript 实现几个常见的数据结构，帮助你在不同的场景中，找到最为适合的数据结构处理问题。",-1);function v(D,A,b,_,j,m){const a=o("Image");return e(),t("div",null,[E,n(a,{alt:"2021217-163948.png",src:"https://s0.lgstatic.com/i/image6/M00/04/83/CioPOWAs1oqAK7n6AAD_bt3FABw414.png"}),y,i,d,n(a,{alt:"2021217-163944.gif",src:"https://s0.lgstatic.com/i/image6/M00/04/83/CioPOWAs1quAXIdzAC9wcK4g428951.gif"}),u,F,h,g,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/03/02/Cgp9HWAeXoaAKvD-AAG_qfSV0Ls210.png"}),C])}const f=l(r,[["render",v]]);export{B as __pageData,f as default};
