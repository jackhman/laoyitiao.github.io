import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"SQL 注入产生的原因 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Web 安全攻防之道_文档/(5974) 06  SQL 注入：小心数据库被拖走（上）.md","filePath":"posts/backEnd/Web 安全攻防之道_文档/(5974) 06  SQL 注入：小心数据库被拖走（上）.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Web 安全攻防之道_文档/(5974) 06  SQL 注入：小心数据库被拖走（上）.md"},E=s("p",null,"你好，我是赢少良。我们现在来到了 SQL 注入的学习，这里我会主要介绍 SQL 注入漏洞的产生原理、利用、检测和防御。相信学完后，你就知道：",-1),y=s("ul",null,[s("li",null,[s("p",null,"为什么 'or'1'='1 是个万能密码；")]),s("li",null,[s("p",null,"攻击者会如何进一步利用漏洞发动攻击窃取数据库；")]),s("li",null,[s("p",null,"开发如何检测和防御 SQL 注入漏洞。")])],-1),F=s("p",null,"这一讲，我主要讲解 SQL 注入与数据库拖库问题。",-1),i=s("p",null,"十几年前，我在网上偶然间看到一篇文章，号称有可登录任意网站管理后台的万能密码，只要在用户名和密码中均输入 'or'1'='1（注意单引号的使用）即可登录后台。当时感觉特别神奇，也有点质疑，于是，我通过 Google 搜索了几个网站后台，没想到有一个真的登录进去了，还可以直接修改主页内容。我没有动，给管理员留言后就退出了。",-1),C=s("p",null,'后来，从网友那得知有个叫"明小子"的工具，专门用于检测和利用 SQL 注入漏洞，使用起来非常"傻瓜"。如果你很早接触过安全，相信对下面的界面图再熟悉不过了。这是我第一次听说"SQL 注入"这个词，知道了它属于 Web 漏洞中非常常见的一种漏洞。',-1),u=p("",12),d=s("p",null,"图 2：username 没有闭合导致的语法错误",-1),h=s("p",null,"还记得开头提到的万能密码吗？我们输入试试：",-1),g=p("",31),B=s("p",null,"图 4：正常访问的页面",-1),A=s("p",null,[n("以 sqli-labs 第 8 题为例，上图是正常访问后的网页内容。通过 Get 参数 id 实现 SQL 注入，我们直接用前面讲的单引号注入试试，请求地址为 "),s("a",{href:"http://localhost/Less-8/?id=1",target:"_blank",rel:"noreferrer"},"http://localhost/Less-8/?id=1"),n("'，返回结果如下：")],-1),D=p("",17),q=s("p",null,"图 6：请求 1 展示图",-1),_=p("",9),m=s("p",null,"图 8：宽字符导致的错误",-1),b=s("p",null,"注入关键词 IF 导致的错误：",-1),v=p("",10),L=p("",4),S=p("",4),T=p("",23),k=p("",7),f=s("p",null,"图 14：内联/嵌套查询注入",-1),w=s("p",null,"内联/嵌套查询注入方法可以在一句语句中嵌入另一句语句，在有限漏洞场景下能实现更多的功能，因此在实际的漏洞利用中常被用于实现敏感信息的窃取，甚至执行系统命令。",-1),I=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),M=s("p",null,"这一讲我主要介绍了 SQL 注入的产生原理、分类，以及相关的测试技术。SQL 注入产生的原因是由于开发对用户的输入数据未做有效过滤，直接引用 SQL 语句执行，导致原本的数据被当作 SQL 语句执行。通常来说，SQL 注入分为数字型和字符型注入，我们主要通过注入参数类型来判断。",-1),R=s("p",null,"我还介绍了 6 大 SQL 注入测试技术，这是挖掘和利用 SQL 注入漏洞的基础，只有掌握这些测试技术，才能进一步提升对 SQL 注入的理解与实践能力。",-1),$=s("p",null,"SQL 注入通常被视为高危或严重的漏洞，一些漏洞奖励平台对此的赏金也会很高，尤其是在国外，经常在 5000 美金以上，甚至有的是几万美金。",-1),Q=s("p",null,"在学习之后，你也可以尝试去挖一些国内的 SRC 平台或者国外 HackerOne 平台授权的测试网站。如果你有发现什么有趣的 SQL 注入漏洞，欢迎在留言区分享。",-1);function P(O,H,W,x,V,N){const a=e("Image");return t(),c("div",null,[E,y,F,i,C,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPOeAI7xSAABTJIYxcfE254.png"}),n(),u,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPPmAe_Z_AALZLcXi9OA547.png"}),n(),d,h,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPP6AYussAALaISw7_cc369.png"}),n(),g,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPQ2AHPOrAAMq22_Vn7A821.png"}),n(),B,A,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPRWATvHkAAMWNlgn8Q0897.png"}),n(),D,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPSSAcUf3AAOSbJ2meEM358.png"}),n(),q,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPSqACFm1AAOOcCQ2IIE741.png"}),n(),_,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPTmAH1smAAOLYXHDOxU134.png"}),n(),m,b,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPT-AD3rcAAOEXKoNpik989.png"}),n(),v,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPUqADu50AANtXLBwuf0866.png"}),n(),L,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPVGAYoxhAANs6mFjRDI693.png"}),n(),S,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPVmAaBouAAN-25Njwzw855.png"}),n(),T,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPWaAOKOTAABkBqvFPw0394.png"}),n(),k,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPW-AdtmmAAOCJCqUXmU735.png"}),n(),f,w,I,M,R,$,Q,l(a,{alt:"Lark20201231-135716.png",src:"https://s0.lgstatic.com/i/image/M00/8C/7D/CgqCHl_taF6AUy71AAUbxs9dlU0807.png"})])}const Y=o(r,[["render",P]]);export{U as __pageData,Y as default};
