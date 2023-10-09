import{_ as p,j as e,o as t,h as c,k as l,f as s,s as n,Q as o}from"./chunks/framework.d3daa342.js";const v=JSON.parse('{"title":"09开关组件：如何使用功能开关，支持产品快速迭代","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6662) 09  开关组件：如何使用功能开关，支持产品快速迭代.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6662) 09  开关组件：如何使用功能开关，支持产品快速迭代.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6662) 09  开关组件：如何使用功能开关，支持产品快速迭代.md"},E=n("h1",{id:"_09开关组件-如何使用功能开关-支持产品快速迭代",tabindex:"-1"},[s("09开关组件：如何使用功能开关，支持产品快速迭代 "),n("a",{class:"header-anchor",href:"#_09开关组件-如何使用功能开关-支持产品快速迭代","aria-label":'Permalink to "09开关组件：如何使用功能开关，支持产品快速迭代"'},"​")],-1),y=n("p",null,"代码管理规范一讲我提到过，开发功能的时候要新建功能分支。在实际工作当中，有一种功能分支我把它叫作长命功能分支（Long lived feature branch），因为有些大功能需要我们花几周甚至几个月来开发，相对应地它的功能分支也会非常庞大。",-1),i=n("p",null,"当整个功能开发完毕后，我们需要把它合并到主分支里面，因为里面代码实在太多了，不可避免地就会出现许多合并冲突。哪怕勉强修正并编译通过，App 里面也很可能隐藏一些不容易发现的 Bug。",-1),g=n("p",null,"怎样解决这种难题呢？",-1),d=n("p",null,"通常的办法是我们会把一个庞大的功能分拆成多个小任务，每个任务都建一个独立的功能分支，当一个任务完成后马上合并到主分支里面。",-1),u=o("",6),F=o("",8),T=n("p",null,[s("有了这些功能开关的定义以后，接着我们定义这些开关的 DataStore。首先建立了一个名叫 "),n("code",null,"TogglesDataStoreType"),s("的协议，它只定义了两个方法，其中"),n("code",null,"isToggleOn(_ toggle: ToggleType) -> Bool"),s(" 用于读取某个开关的值，而 "),n("code",null,"update(toggle: ToggleType, value: Bool)"),s(" 用于更新某个开关的值。")],-1),C=o("",7),A=o("",20),D=o("",8);function _(f,B,I,h,S,b){const a=e("Image");return t(),c("div",null,[E,y,i,g,d,l(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/24/4D/CioPOWBYUUeARJ5qAAjTjIXDSJA208.png"}),s(),u,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/4A/CioPOWBRvmeAGcsiAAHzX6EpRRU507.png"}),s(),F,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/25/6C/CioPOWBZrCOACNxtAAKd2755Bx0933.png"}),s(),T,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/24/4D/CioPOWBYURiAff7BAALmppeDy9I518.png"}),s(),C,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/53/CioPOWBRxW6AV4TlAAI7l4yPlhE343.png"}),s(),A,l(a,{alt:"2021322-144332.gif",src:"https://s0.lgstatic.com/i/image6/M00/24/37/Cgp9HWBYPLeAW1FfAKgkEsZ8QtE822.gif"}),s(),D])}const O=p(r,[["render",_]]);export{v as __pageData,O as default};
