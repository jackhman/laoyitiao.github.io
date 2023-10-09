import{_ as o,j as e,o as t,h as c,k as p,f as a,Q as l,s}from"./chunks/framework.d3daa342.js";const P=JSON.parse('{"title":"14命令与代码注入：常令安全人员半夜应急的漏洞","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5982) 14  命令与代码注入：常令安全人员半夜应急的漏洞.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5982) 14  命令与代码注入：常令安全人员半夜应急的漏洞.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5982) 14  命令与代码注入：常令安全人员半夜应急的漏洞.md"},y=l("",39),E=l("",7),i=l("",15),d=l("",11),F=l("",31),h=s("p",null,"图 4 OpenRASP 拦截命令执行",-1),u=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),g=s("p",null,'本课主要以 PHP 环境下的"命令注入"场景作为演示，介绍了命令注入漏洞的成因，以及常见的利用技巧，特别总结了些常见的限制绕过方法，最后同样讲解漏洞挖掘与防御的主流方式。',-1),A=s("p",null,"命令注入原理和利用相对比较简单，但在真实业务场景中，用户可控变量的传递往往比较复杂，并不一定那么容易发现和构造利用，往往是黑盒扫描与白盒代码审计相结合去发现，业务上线后再结合 RASP 等安全系统去监控和拦截。",-1),m=s("p",null,"WAF 在命令注入检测中有作用相对比较有限，因为有些命令就是简单字母字符串，比如 id。拦截此参数很大概率会连正常请求都阻断点，会影响正常业务功能，所以很多时候都是设法从程序运行环境、系统底层去做检测与拦截。",-1),_=s("hr",null,null,-1),D=s("p",null,[s("a",{href:"https://wj.qq.com/s2/8059116/3881/",target:"_blank",rel:"noreferrer"},"课程评价入口，挑选 5 名小伙伴赠送小礼品～")],-1);function b(v,C,x,k,q,B){const n=e("Image");return t(),c("div",null,[y,p(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/A9/Cip5yGASiyeAblmvAAYSmm7bGoE695.png"}),a(),E,p(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/AB/CgpVE2ASizuAFANhAAF--IPq7VM659.png"}),a(),i,p(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/92/BF/CgqCHmASi1CATWHbAARYJuJkPEw289.png"}),a(),d,p(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/92/B4/Ciqc1GASi7mASyv4AAFgvRQXlzo668.png"}),a(),F,p(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/AB/CgpVE2ASi3yACySBAAMVN4nSHBY967.png"}),a(),h,u,g,A,m,_,D])}const S=o(r,[["render",b]]);export{P as __pageData,S as default};
