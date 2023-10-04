import{_ as o,j as t,o as e,g as r,k as a,Q as l,s as n,h as p}from"./chunks/framework.e0c66c3f.js";const K=JSON.parse('{"title":"DP 题目的特点 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6703) 14  DP：我是怎么治好“DP 头痛症”的？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6703) 14  DP：我是怎么治好“DP 头痛症”的？.md","lastUpdated":null}'),c={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6703) 14  DP：我是怎么治好“DP 头痛症”的？.md"},E=l("",86),y=n("ul",null,[n("li",null,"如下图所示，第二种，dp[5] 可以通过 dp[3] 得到，值为 3。")],-1),i=l("",12),A=l("",64),d=l("",10),D=n("p",null,"Case 1. 找到某个位置，将 s1, s2 都切成两半，其中 s1 = x + y，而 s2 = c + d，那么我们只需要保证 x 是 c 的扰乱字符串，y 是 d 的扰乱字符串。",-1),u=l("",59),F=l("",5),g=n("h4",{id:"_2-子问题-3",tabindex:"-1"},[p("2. 子问题 "),n("a",{class:"header-anchor",href:"#_2-子问题-3","aria-label":'Permalink to "2. 子问题"'},"​")],-1),h=n("p",null,[p("通过观察最后一步，可以发现它就是在可访问点集 Y 的基础上，通过"),n("strong",null,"加入边"),p("A[n-1] ，然后生成点集 Z。如果引入更早一点的可访问点集 X，可以将点集的扩展顺序表示如下：")],-1),b=l("",22),f=n("p",null,"但是，如果按上图这样操作，就会出错。因为 A[i] = 2 被使用了两次，而题目要求只能使用一次。",-1),C=n("p",null,[p("出现这个问题的原因是"),n("strong",null,"我们无法区分旧有的数，新加入的数"),p("。使用另外一个数组标记旧有的数，新生成的数本质上就与两个集合完成迭代没有区别了。那么有什么办法可以帮助我们区分旧有的数和新生成的数呢？")],-1),m=n("p",null,"如果我们试试从大往小更新呢？从大往小更新主要是基于这样一个条件：",-1),x=n("blockquote",null,[n("p",null,"新生成的数总是要更大一些的。如果我们先让大的数加上了 A[i]，这些更大的数会放在后面，再次遍历，我们总是不会遇到这些新生成的数。")],-1),B=n("p",null,"迭代步骤如下图所示：",-1),_=l("",36),k=l("",21),q=l("",83),P=l("",5),v=l("",11);function j(T,V,N,R,X,H){const s=t("Image");return e(),r("div",null,[E,a(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/37/60/CioPOWB2zBuAOaffAAB34BpuEyM913.png"}),y,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/37/60/CioPOWB2zCaAHlLsAAB8MadAE-U569.png"}),i,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zDKAQUFhAADATI1rcXE556.png"}),A,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zFWABT97AABr3D8VE1U754.png"}),d,a(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zGaANoGhAAeB2NdVgKc054.png"}),D,a(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zGyAOitSAAeBHGBc82w657.png"}),u,a(s,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zJmAW8HqAAm_mP67WDc578.gif"}),F,a(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zMOAbGNlAABqNw0YfrM582.png"}),g,h,a(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zMuAH3SUAABi4JG4bTk857.png"}),b,a(s,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zN2Af9neAAQiPWUjU6c193.gif"}),f,C,m,x,B,a(s,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zPGAEM2YAARohJntves709.gif"}),_,a(s,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zQeANJDtAAAi-wCtZjQ178.png"}),k,a(s,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zTyAErOsAACsCnIj2ck114.png"}),q,a(s,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zYiAaRzEAAAr6bp4N30004.png"}),P,a(s,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zZ2AJiVSAARePu3Wkh8895.png"}),v])}const Q=o(c,[["render",j]]);export{K as __pageData,Q as default};
