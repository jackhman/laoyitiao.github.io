import{_ as e,j as o,o as t,h as c,k as l,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const cs=JSON.parse('{"title":"第05讲：深度与广度优先搜索","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md"},E=p("",8),r=s("h3",{id:"解题思路",tabindex:"-1"},[n("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路","aria-label":'Permalink to "解题思路"'},"​")],-1),y=s("p",null,"必须依赖栈（Stack），特点是后进先出（LIFO）。",-1),d=s("br",null,null,-1),h=s("p",null,"第一步，选择一个起始顶点，例如从顶点 A 开始。把 A 压入栈，标记它为访问过（用红色标记），并输出到结果中。",-1),u=s("p",null,"第二步，寻找与 A 相连并且还没有被访问过的顶点，顶点 A 与 B、D、G 相连，而且它们都还没有被访问过，我们按照字母顺序处理，所以将 B 压入栈，标记它为访问过，并输出到结果中。",-1),g=s("p",null,"第三步，现在我们在顶点 B 上，重复上面的操作，由于 B 与 A、E、F 相连，如果按照字母顺序处理的话，A 应该是要被访问的，但是 A 已经被访问了，所以我们访问顶点 E，将 E 压入栈，标记它为访问过，并输出到结果中。",-1),m=s("p",null,"第四步，从 E 开始，E 与 B、G 相连，但是B刚刚被访问过了，所以下一个被访问的将是G，把G压入栈，标记它为访问过，并输出到结果中。",-1),f=s("p",null,"第五步，现在我们在顶点 G 的位置，由于与 G 相连的顶点都被访问过了，类似于我们走到了一个死胡同，必须尝试其他的路口了。所以我们这里要做的就是简单地将 G 从栈里弹出，表示我们从 G 这里已经无法继续走下去了，看看能不能从前一个路口找到出路。",-1),_=s("p",null,"可以看到，每次我们在考虑下一个要被访问的点是什么的时候，如果发现周围的顶点都被访问了，就把当前的顶点弹出。",-1),A=s("p",null,"第六步，现在栈的顶部记录的是顶点 E，我们来看看与 E 相连的顶点中有没有还没被访问到的，发现它们都被访问了，所以把 E 也弹出去。",-1),B=s("p",null,"第七步，当前栈的顶点是 B，看看它周围有没有还没被访问的顶点，有，是顶点 F，于是把 F 压入栈，标记它为访问过，并输出到结果中。",-1),b=s("p",null,"第八步，当前顶点是 F，与 F 相连并且还未被访问到的点是 C 和 D，按照字母顺序来，下一个被访问的点是 C，将 C 压入栈，标记为访问过，输出到结果中。",-1),k=s("p",null,"第九步，当前顶点为 C，与 C 相连并尚未被访问到的顶点是 H，将 H 压入栈，标记为访问过，输出到结果中。",-1),x=s("p",null,"第十步，当前顶点是 H，由于和它相连的点都被访问过了，将它弹出栈。",-1),C=s("p",null,"第十一步，当前顶点是 C，与 C 相连的点都被访问过了，将 C 弹出栈。",-1),z=s("p",null,"第十二步，当前顶点是 F，与 F 相连的并且尚未访问的点是 D，将 D 压入栈，输出到结果中，并标记为访问过。",-1),I=s("p",null,"第十三步，当前顶点是 D，与它相连的点都被访问过了，将它弹出栈。以此类推，顶点 F，B，A 的邻居都被访问过了，将它们依次弹出栈就好了。最后，当栈里已经没有顶点需要处理了，我们的整个遍历结束。",-1),S=s("h6",{id:"例题分析一",tabindex:"-1"},[n("例题分析一 "),s("a",{class:"header-anchor",href:"#例题分析一","aria-label":'Permalink to "例题分析一"'},"​")],-1),F=s("p",null,"给定一个二维矩阵代表一个迷宫，迷宫里面有通道，也有墙壁，通道由数字 0 表示，而墙壁由 -1 表示，有墙壁的地方不能通过，那么，能不能从 A 点走到 B 点。",-1),q=s("p",null,"从 A 开始走的话，有很多条路径通往 B，例如下面两种。",-1),D=p("",33),v=s("p",null,"从各方向到达该点所需要的步数都更多，则不再尝试。",-1),j=p("",17),V=s("h3",{id:"解题思路-2",tabindex:"-1"},[n("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路-2","aria-label":'Permalink to "解题思路"'},"​")],-1),M=s("p",null,"依赖队列（Queue），先进先出（FIFO）。",-1),O=s("br",null,null,-1),w=s("p",null,"一层一层地把与某个点相连的点放入队列中，处理节点的时候正好按照它们进入队列的顺序进行。",-1),T=s("p",null,"第一步，选择一个起始顶点，让我们从顶点 A 开始。把 A 压入队列，标记它为访问过（用红色标记）。",-1),P=s("p",null,"第二步，从队列的头取出顶点 A，打印输出到结果中，同时将与它相连的尚未被访问过的点按照字母大小顺序压入队列，同时把它们都标记为访问过，防止它们被重复地添加到队列中。",-1),N=s("p",null,"第三步，从队列的头取出顶点 B，打印输出它，同时将与它相连的尚未被访问过的点（也就是 E 和 F）压入队列，同时把它们都标记为访问过。",-1),L=s("p",null,"第四步，继续从队列的头取出顶点 D，打印输出它，此时我们发现，与 D 相连的顶点 A 和 F 都被标记访问过了，所以就不要把它们压入队列里。",-1),K=s("p",null,"第五步，接下来，队列的头是顶点 G，打印输出它，同样的，G 周围的点都被标记访问过了。我们不做任何处理。",-1),G=s("p",null,"第六步，队列的头是 E，打印输出它，它周围的点也都被标记为访问过了，我们不做任何处理。",-1),H=s("p",null,"第七步，接下来轮到顶点 F，打印输出它，将 C 压入队列，并标记 C 为访问过。",-1),Y=s("p",null,"第八步，将 C 从队列中移出，打印输出它，与它相连的 H 还没被访问到，将 H 压入队列，将它标记为访问过。",-1),Z=s("p",null,"第九步，队列里只剩下 H 了，将它移出，打印输出它，发现它的邻居都被访问过了，不做任何事情。",-1),U=s("p",null,"第十步，队列为空，表示所有的点都被处理完毕了，程序结束。",-1),Q=s("h6",{id:"例题分析一-1",tabindex:"-1"},[n("例题分析一 "),s("a",{class:"header-anchor",href:"#例题分析一-1","aria-label":'Permalink to "例题分析一"'},"​")],-1),X=s("p",null,"运用广度优先搜索的算法在迷宫中寻找最短的路径。",-1),R=s("h3",{id:"解题思路-3",tabindex:"-1"},[n("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路-3","aria-label":'Permalink to "解题思路"'},"​")],-1),J=s("p",null,"搜索的过程如下。",-1),W=p("",32),$=p("",14);function ss(ns,as,ls,ps,es,os){const a=o("Image");return t(),c("div",null,[E,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYuANIhxAAB2CBZsYLQ484.png"}),n(),r,y,d,h,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAAZhkABsNRVtft9s555.gif"}),n(),u,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAHhJWACv4GjTZRBQ760.gif"}),n(),g,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYyAO9LVACEhHBdbKfc149.gif"}),n(),m,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAc3T6ACUuR_5lcvw842.gif"}),n(),f,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYyAYBQ4AA7A5yscltI499.gif"}),n(),_,A,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAe__KABAUImf6ENE708.gif"}),n(),B,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY2ACNi3AEWj2_BWcsM296.gif"}),n(),b,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY2ABY_CAD5yLy-V6CM016.gif"}),n(),k,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkY2AHiebAEZJ2pzOuiQ289.gif"}),n(),x,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY6AMrbOAC9gCtQSDyg193.gif"}),n(),C,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZCAb7O6ACq7mfesvtU046.gif"}),n(),z,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZGAcNsZACm2oC7I53I299.gif"}),n(),I,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZKAUYofADryI0IEla8177.gif"}),n(),S,F,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZOAZAaTAAEnEYY55UA254.png"}),n(),q,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZmAUAsQAOl9ssa2zxE177.gif"}),n(),l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZ6AEp2BAOF4o1jndN0409.gif"}),n(),D,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkaSAJZTIAOVn4eGgEXc393.gif"}),n(),v,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkamAazS1ANB4kNxFNT4453.gif"}),n(),j,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkamAcHHCAAB2vDyOBsk961.png"}),n(),V,M,O,w,T,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkaqAMe91ACG_XqSE0yA958.gif"}),n(),P,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkayAaGfVAETtH2VWV-A751.gif"}),n(),N,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2Ika-AOPRWAHRFIVXcPQI792.gif"}),n(),L,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkbGAMV2kAC8Ltvwuc5g827.gif"}),n(),K,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbKAceIeADfsJWqxiZA916.gif"}),n(),G,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkbOACo8JABbKDt0EN50653.gif"}),n(),H,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbWATgK5ACuDZM3dEJw749.gif"}),n(),Y,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbaAW9IfACOEixVhbyA516.gif"}),n(),Z,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbeAHpX6AB3ZQSZ7XbM801.gif"}),n(),U,Q,X,R,J,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbuAIX0lAHdOXp_zsxE546.gif"}),n(),W,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkcCAWjRjALszKfUEV7A310.gif"}),n(),l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkcOAd-giAItzJVPUNUM375.gif"}),n(),l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkcaAI78RAHjv2Tul3JY991.gif"}),n(),$])}const is=e(i,[["render",ss]]);export{cs as __pageData,is as default};
