import{_ as t,j as e,o as _,g as s,k as a,h as l,Q as i,s as p}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"03程序的执行：相比32位，64位的优势是什么？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4680) 03  程序的执行：相比 32 位，64 位的优势是什么？（下）.md","filePath":"posts/backEnd/重学操作系统_文档/(4680) 03  程序的执行：相比 32 位，64 位的优势是什么？（下）.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/重学操作系统_文档/(4680) 03  程序的执行：相比 32 位，64 位的优势是什么？（下）.md"},r=i("",13),c=i("",9),d=i("",12),P=p("ul",null,[p("li",null,[p("p",null,[l("最左边的 6 位，叫作"),p("strong",null,"操作码"),l("，英文是 OpCode，100011 代表 load 指令；")])]),p("li",null,[p("p",null,"中间的 4 位 0000是寄存器的编号，这里代表寄存器 R0；")]),p("li",null,[p("p",null,"后面的 22 位代表要读取的地址，也就是 0x100。")])],-1),C=p("p",null,"所以我们是把操作码、寄存器的编号、要读取的地址合并到了一个 32 位的指令中。",-1),h=p("p",null,"我们再来看一条求加法运算的 add 指令，16 进制表示是 0x08048000，换算成二进制就是：",-1),g=i("",3),u=i("",28);function U(m,A,T,x,q,b){const o=e("Image");return _(),s("div",null,[r,a(o,{alt:"图片1 (1).png",src:"https://s0.lgstatic.com/i/image/M00/4E/C8/Ciqc1F9fGs2AEfeRAADnPPOm_gU294.png"}),l(),c,a(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/50/B5/Ciqc1F9jNVKAbRJhAADt2il2zYI826.png"}),l(),d,a(o,{alt:"12.png",src:"https://s0.lgstatic.com/i/image/M00/4E/EA/CgqCHl9fMJiAXO1-AABvVvPHepg435.png"}),l(),P,C,h,a(o,{alt:"11.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DF/Ciqc1F9fMKGAT9ymAACIAk1pGnk727.png"}),l(),g,a(o,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/4E/DF/Ciqc1F9fMKiAZhMVAABIVEePzcA916.png"}),l(),u])}const R=t(n,[["render",U]]);export{k as __pageData,R as default};
