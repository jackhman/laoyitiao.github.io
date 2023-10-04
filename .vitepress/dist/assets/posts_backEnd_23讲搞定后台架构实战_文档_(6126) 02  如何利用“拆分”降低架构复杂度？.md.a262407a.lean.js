import{_,j as l,o as n,g as e,k as s,h as t,Q as a,s as p}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"为什么要做拆分 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6126) 02  如何利用“拆分”降低架构复杂度？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6126) 02  如何利用“拆分”降低架构复杂度？.md","lastUpdated":1696338709000}'),i={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6126) 02  如何利用“拆分”降低架构复杂度？.md"},r=a("",30),g=a("",9),c=a("",7),d=p("p",null,"图 3：技术维度的垂直拆分架构",-1),h=p("p",null,[t("至此，我们已经完成了两次垂直维度的拆分。拆分的结果与后台系统的三大类：读模块、写模块及扣减模块基本一致，只是本讲的模块都带上了具体的业务前缀。这里我再强调一点，"),p("strong",null,"任何技术都是服务于业务的，脱离业务的技术无法发挥它的价值"),t(" 。"),p("strong",null,"本专栏讲解时去掉了具体的业务前缀，不是不关注业务，而是希望你能够深入理解这些业务背后的通用点，从而更好地服务于业务"),t("。")],-1),u=p("p",null,"完成两次垂直拆分后，就可以做最后一步拆分了，即水平拆分或者叫作分层拆分。水平拆分的依据是按易变度或共性度 。经过水平拆分，上层的称为易变模块，下层的称为非易变模块。越靠下面的模块越稳定、越共性、越不易变化。",-1),q=p("p",null,"拆分后，对于非易变的模块，我们只需要编写、修改一次或者零星几次即可，对于易变的模块则需要投入更多的人力去维护。因为易变与非易变模块已经拆开，易变模块进行需求改造对非易变模块基本上没有任何影响。下面我们以第二步垂直拆分形成的模块作为分层拆分的实战。",-1),A=p("p",null,"经过第二步按技术维度的垂直拆分，形成了用户的读模块、写模块、任务模块等。在设计或者开发时，你会发现这些模块都会连接数据库或者其他存储。对于这些连接数据库的代码，基本都是对象映射，将入参的对象转换为数据库 ER 格式的对象。",-1),m=p("p",null,"如果是 Java 应用，还会包含 MyBatis 或者 Hibernate 相关的数据库 ORM 映射的脚手架代码，其他语言以此类推。这些通用的代码只编写一次即可形成一个模块，比如数据访问模块，可以供用户的读模块和写模块共同使用，这就是水平拆分的结果，它的上层是读写模块、下层为共性的数据访问模块。具体形式见下图 4：",-1),T=a("",12);function C(E,k,f,P,b,S){const o=l("Image");return n(),e("div",null,[r,s(o,{alt:"Lark20210106-174914.png",src:"https://s0.lgstatic.com/i/image/M00/8C/E9/CgqCHl_1h7iAIErUAAESckGT900235.png"}),t(),g,s(o,{alt:"Lark20210106-174919.png",src:"https://s0.lgstatic.com/i/image/M00/8C/DF/Ciqc1F_1klqAdXBHAAFL3dq6Hcw516.png"}),t(),c,s(o,{alt:"Lark20210106-210638.png",src:"https://s0.lgstatic.com/i/image/M00/8C/EE/CgqCHl_1tgGARofLAAHbDfE-JI8342.png"}),t(),d,h,s(o,{alt:"Lark20210107-113627.png",src:"https://s0.lgstatic.com/i/image2/M01/04/CF/CgpVE1_2gfOAJ2TAAAEghz_HDEc907.png"}),u,q,A,m,s(o,{alt:"Lark20210106-210641.png",src:"https://s0.lgstatic.com/i/image2/M01/04/C7/CgpVE1_1tgmAXfziAAIdlp2K3DA347.png"}),t(),T])}const x=_(i,[["render",C]]);export{I as __pageData,x as default};
