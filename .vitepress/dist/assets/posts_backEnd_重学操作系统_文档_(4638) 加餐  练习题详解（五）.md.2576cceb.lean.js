import{_ as n,j as p,o as l,h as r,k as t,f as a,Q as o,s}from"./chunks/framework.d3daa342.js";const U=JSON.parse('{"title":"加餐练习题详解（五）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4638) 加餐  练习题详解（五）.md","filePath":"posts/backEnd/重学操作系统_文档/(4638) 加餐  练习题详解（五）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/重学操作系统_文档/(4638) 加餐  练习题详解（五）.md"},i=o("",8),_=o("",31),g=s("p",null,"8 个缓存条目用 7 个节点控制，每个节点是 1 位。0 代表节点指向左边，1 代表节点指向右边。",-1),d=s("p",null,"初始化的时候，所有节点都指向左边，如下图所示：",-1),h=s("p",null,"接下来每次写入，会从根节点开始寻找，顺着箭头方向（0 向左，1 向右），找到下一个更新方向。比如现在图中下一个要更新的位置是 0。更新完成后，所有路径上的节点箭头都会反转，也就是 0 变成 1，1 变成 0。",-1),m=s("p",null,[a("上图是"),s("code",null,"read a"),a("后的结果，之前路径上所有的箭头都被反转，现在看到下一个位置是 4，我用橘黄色进行了标记。")],-1),u=s("p",null,[a("上图是发生操作"),s("code",null,"read b"),a("之后的结果，现在橘黄色可以更新的位置是 2。")],-1),b=s("p",null,[a("上图是读取 c 后的情况。后面我不一一绘出，假设后面的读取顺序是"),s("code",null,"d,e,f,g,h"),a("，那么缓存会变成如下图所示的结果：")],-1),A=s("p",null,[a("这个时候用户如果读取了已经存在的值，比如说"),s("code",null,"c"),a("，那么指向"),s("code",null,"c"),a("那路箭头会被翻转，下图是"),s("code",null,"read c"),a("的结果：")],-1),T=o("",8),E=o("",7);function C(y,f,q,P,k,L){const e=p("Image");return l(),r("div",null,[i,t(e,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image2/M01/03/80/Cip5yF_cbT6AO6DwAACbQMquDX0718.png"}),a(),_,t(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/8B/AE/CgqCHl_cbWiANygpAAChKW14Ffw720.png"}),a(),g,d,t(e,{alt:"2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/82/CgpVE1_cbZaAOEVvAACaMkDXYtc665.png"}),a(),h,t(e,{alt:"3.png",src:"https://s0.lgstatic.com/i/image2/M01/03/82/CgpVE1_cbbmAOIQDAACdnlwZGVE658.png"}),a(),m,t(e,{alt:"Lark20201221-142046.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C1/Ciqc1F_gP2WAScBQAACgqJrvexo168.png"}),a(),u,t(e,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/8B/AE/CgqCHl_cbg-ABn7-AACe6aOsslk632.png"}),a(),b,t(e,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/8B/AE/CgqCHl_cbj-ATxdgAACsKCmX118121.png"}),a(),A,t(e,{alt:"8.png",src:"https://s0.lgstatic.com/i/image2/M01/03/82/CgpVE1_cbnmAMnbJAACm2EGytKM521.png"}),a(),T,t(e,{alt:"9.png",src:"https://s0.lgstatic.com/i/image2/M01/03/80/Cip5yF_cbrCAZqANAABmyPzf-Zs709.png"}),a(),E])}const G=n(c,[["render",C]]);export{U as __pageData,G as default};
