import{_ as l,j as t,o as e,h as c,k as o,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const H=JSON.parse('{"title":"03为什么React16要更改组件的生命周期？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4852) 03  为什么 React 16 要更改组件的生命周期？（下）.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4852) 03  为什么 React 16 要更改组件的生命周期？（下）.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4852) 03  为什么 React 16 要更改组件的生命周期？（下）.md"},E=p("",5),y=p("",6),i=s("p",null,"你现在可以打开开篇我给出的 Demo，将你的 React 版本更新到 16.3，然后运行这个项目，你就可以在控制台看到新的生命周期执行过程了。控制台的输出如图所示：",-1),u=p("",15),g=s("p",null,"第二个重点，该方法可以接收两个参数：props 和 state，它们分别代表当前组件接收到的来自父组件的 props 和当前组件自身的 state。我们可以尝试在 Demo 中输出这两个参数看一看，输出效果如下图所示：",-1),F=s("p",null,"可以看出，挂载阶段输出的 props 正是初始化阶段父组件传进来的 this.props 对象；而 state 是 LifeCycle 组件自身的 state 对象。",-1),d=s("p",null,"第三个重点，getDerivedStateFromProps 需要一个对象格式的返回值。如果你没有指定这个返回值，那么大概率会被 React 警告一番，警告内容如下图所示：",-1),h=p("",6),m=s("h4",{id:"updating-阶段-组件的更新",tabindex:"-1"},[n("Updating 阶段：组件的更新 "),s("a",{class:"header-anchor",href:"#updating-阶段-组件的更新","aria-label":'Permalink to "Updating 阶段：组件的更新"'},"​")],-1),q=s("p",null,"React 15 与 React 16.3 的更新流程对比如下图所示：",-1),C=s("p",null,[n('注意，咱们前面提到 React 16.4 对生命周期流程进行了"微调"，其实就调在了更新过程的getDerivedStateFromProps 这个生命周期上。先来看一张 React 16.4+ 的生命周期大图（出处仍然是'),s("a",{href:"https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/",target:"_blank",rel:"noreferrer"},"Wojciech Maj 的 react-lifecycle-methods-diagram"),n("）：")],-1),D=p("",24),_=s("p",null,[n('值得一提的是，这个生命周期的设计初衷，是为了"与 componentDidUpdate 一起，涵盖过时的 componentWillUpdate 的所有用例"（引用自 React 官网）。'),s("strong",null,"getSnapshotBeforeUpdate 要想发挥作用，离不开 componentDidUpdate 的配合"),n("。")],-1),A=s("p",null,[n("那么换个角度想想，"),s("strong",null,"为什么 componentWillUpdate 就非死不可呢"),n('？说到底，还是因为它"挡了 Fiber 的路"。各位莫慌，咱们离真相越来越近了~')],-1),v=s("h4",{id:"unmounting-阶段-组件的卸载",tabindex:"-1"},[n("Unmounting 阶段：组件的卸载 "),s("a",{class:"header-anchor",href:"#unmounting-阶段-组件的卸载","aria-label":'Permalink to "Unmounting 阶段：组件的卸载"'},"​")],-1),B=s("p",null,"我们先继续把完整的生命周期流程走完，以下是组件卸载阶段的示意图：",-1),S=s("p",null,"卸载阶段的生命周期与 React 15 完全一致，只涉及 componentWillUnmount 这一个生命周期，此处不再重复讲解。",-1),P=s("p",null,'接下来，就让一切变化背后的"始作俑者" Fiber 架构来和大家打个招呼吧！',-1),f=s("h3",{id:"透过现象看本质-react-16-缘何两次求变",tabindex:"-1"},[n("透过现象看本质：React 16 缘何两次求变？ "),s("a",{class:"header-anchor",href:"#透过现象看本质-react-16-缘何两次求变","aria-label":'Permalink to "透过现象看本质：React 16 缘何两次求变？"'},"​")],-1),b=s("h5",{id:"fiber-架构简析",tabindex:"-1"},[n("Fiber 架构简析 "),s("a",{class:"header-anchor",href:"#fiber-架构简析","aria-label":'Permalink to "Fiber 架构简析"'},"​")],-1),R=s("p",null,[n('Fiber 是 React 16 对 React 核心算法的一次重写。关于 Fiber，我将在"模块二：核心原理"花大量的篇幅来介绍它的原理和细节。在本课时，你只需要 get 到这一个点：'),s("strong",null,"Fiber 会使原本同步的渲染过程变成异步的"),n("。")],-1),x=s("p",null,"在 React 16 之前，每当我们触发一次组件的更新，React 都会构建一棵新的虚拟 DOM 树，通过与上一次的虚拟 DOM 树进行 diff，实现对 DOM 的定向更新。这个过程，是一个递归的过程。下面这张图形象地展示了这个过程的特征：",-1),T=p("",2),U=s("p",null,'如果你初学 Fiber，对上面的两段描述感到陌生或者说"吃不透"，这都是正常的。在本课时，你大可不必如此苛求自己，只需对"同步渲染"和"异步渲染"这两个概念有一个大致的印象，同时把握住 Fiber 架构下"任务拆解"和"可打断"这两个特性即可。接下来，我们继续往下走，看看"同步"变"异步"这个过程，是如何对生命周期构成影响的。',-1),k=s("h5",{id:"换个角度看生命周期工作流",tabindex:"-1"},[n("换个角度看生命周期工作流 "),s("a",{class:"header-anchor",href:"#换个角度看生命周期工作流","aria-label":'Permalink to "换个角度看生命周期工作流"'},"​")],-1),M=s("p",null,[n("Fiber 架构的重要特征就是"),s("strong",null,"可以被打断的"),n(' 异步渲染模式。但这个"打断"是有原则的，根据"'),s("strong",null,"能否被打断"),n('"这一标准，React 16 的生命周期被划分为了 render 和 commit 两个阶段，而 commit 阶段又被细分为了 pre-commit 和 commit。每个阶段所涵盖的生命周期如下图所示：')],-1),W=p("",27);function I(V,w,N,j,O,L){const a=t("Image");return e(),c("div",null,[E,o(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5D/D9/CgqCHl-FVVeAaMJvAAKXOyLlUwM592.png"}),n(),y,o(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/5F/B0/Ciqc1F-Klv6AIeOPAADAZZgLu7U105.png"}),n(),i,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CE/Ciqc1F-FVW6AAX_PAADMEGvjdFI487.png"}),n(),u,o(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5D/DA/CgqCHl-FVZSAX16PAAK3atPnbSg411.png"}),n(),g,o(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5D/DA/CgqCHl-FVZqAJnD-AAQlZUXOgq0760.png"}),n(),F,d,o(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CE/Ciqc1F-FVaCAOOnzAALVyD02cdg817.png"}),n(),h,o(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5D/DA/CgqCHl-FVbiAR1FtAABja-0bwL0578.png"}),n(),m,q,o(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/5F/BB/CgqCHl-KlxyAB5MpAAFaH-Kgggo887.png"}),n(),C,o(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CF/Ciqc1F-FVcSALRwNAAIomWwVcQU231.png"}),n(),D,o(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CF/Ciqc1F-FVlOAX7VMAAE_3SdYf2M700.png"}),n(),_,A,v,B,o(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/5F/B0/Ciqc1F-KlzqACUOPAABE6JqN9E0200.png"}),n(),S,P,f,b,R,x,o(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/5F/B0/Ciqc1F-Kl0WAO2mzAABxddWHnXI121.png"}),n(),T,o(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/5F/B0/Ciqc1F-Kl1CAA6pwAADpyi-xSnM494.png"}),n(),U,k,M,o(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CF/Ciqc1F-FVn6AEtlxAAIomWwVcQU485.png"}),n(),W])}const X=l(r,[["render",I]]);export{H as __pageData,X as default};
