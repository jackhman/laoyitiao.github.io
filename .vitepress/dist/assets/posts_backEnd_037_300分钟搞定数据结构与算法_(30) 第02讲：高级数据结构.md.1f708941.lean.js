import{_ as o,j as e,o as r,g as n,k as a,h as t,Q as i,s as l}from"./chunks/framework.4e7d56ce.js";const L=JSON.parse('{"title":"第02讲：高级数据结构","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(30) 第02讲：高级数据结构.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(30) 第02讲：高级数据结构.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(30) 第02讲：高级数据结构.md"},h=i("",23),u=l("br",null,null,-1),d=l("p",null,"时间复杂度：由于二叉堆是一棵完全二叉树，并假设堆的大小为 k，因此整个过程其实就是沿着树的高度往上爬，所以只需要 O(logk) 的时间。",-1),_=l("p",null,[l("strong",null,"2. 向下筛选（sift down / bubble down）")],-1),c=l("ul",null,[l("li",null,[l("p",null,"当堆顶的元素被取出时，要更新堆顶的元素来作为下一次按照优先级顺序被取出的对象，需要将堆底部的元素放置到堆顶，然后不断地对它执行向下筛选的操作。")]),l("li",null,[l("p",null,"将该元素和它的两个孩子节点对比优先级，如果优先级最高的是其中一个孩子，就将该元素和那个孩子进行交换，然后反复进行下去，直到无法继续交换为止。")])],-1),g=i("",8),q=i("",36),b=i("",13),m=i("",16),k=l("p",null,'单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。',-1),A=l("p",null,"说明：你可以假设所有输入都由小写字母 a-z 组成。",-1),T=l("h3",{id:"解题思路-2",tabindex:"-1"},[t("解题思路 "),l("a",{class:"header-anchor",href:"#解题思路-2","aria-label":'Permalink to "解题思路"'},"​")],-1),P=l("p",null,"这是一道出现较为频繁的难题，题目给出了一个二维的字符矩阵，然后还给出了一个字典，现在要求在这个字符矩阵中找到出现在字典里的单词。",-1),C=l("p",null,"由于字符矩阵的每个点都能作为一个字符串的开头，所以必须得尝试从矩阵中的所有字符出发，上下左右一步步地走，然后去和字典进行匹配，如果发现那些经过的字符能组成字典里的单词，就把它记录下来。",-1),f=l("p",null,"可以借用深度优先的算法来实现（关于深度优先算法，将在第 06 节课深入探讨），如果你对它不熟悉，可以把它想象成走迷宫。",-1),x=i("",14),S=i("",24),I=i("",33);function V(O,B,D,y,M,N){const p=e("Image");return r(),n("div",null,[h,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EC/CgotOV2ISXaAJ9iGACXUNreouXo038.gif"}),t(),u,d,_,c,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/CC/CgoB5l2ISa-Af-7tAB97MaSBBWo211.gif"}),t(),g,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/B0/CgoB5l2ILXuAYVN6AAAwD4S9aDs940.png"}),t(),q,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/EC/CgotOV2ISc-ADjNDAK_6wbp-nzI430.gif"}),t(),b,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/D0/CgotOV2ILXyAAbuPAAHuMjoQ0_M307.png"}),t(),m,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/B0/CgoB5l2ILXyAYLwPAAAO6ajgsHk324.png"}),t(),k,A,T,P,C,f,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/CD/CgoB5l2IShaAfIDFAAElACD4d7I232.png"}),t(),x,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/D0/CgotOV2ILX2AB5E_AABPrKDb2WM573.png"}),t(),S,a(p,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/90/ED/CgotOV2IStmAJxNFAHcB4XzkqCg286.gif"}),t(),I])}const j=o(s,[["render",V]]);export{L as __pageData,j as default};
