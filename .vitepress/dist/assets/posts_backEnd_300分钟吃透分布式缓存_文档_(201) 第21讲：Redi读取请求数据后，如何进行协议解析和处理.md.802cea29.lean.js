import{_ as i,j as o,o as _,h as d,k as s,f as a,Q as r,s as e}from"./chunks/framework.d3daa342.js";const I=JSON.parse('{"title":"第21讲：Redi读取请求数据后，如何进行协议解析和处理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(201) 第21讲：Redi读取请求数据后，如何进行协议解析和处理.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(201) 第21讲：Redi读取请求数据后，如何进行协议解析和处理.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(201) 第21讲：Redi读取请求数据后，如何进行协议解析和处理.md"},c=r("",5),l=e("p",null,"client 读取完请求命令后，则根据 query buff 进行协议解析。协议解析时，首先查看协议的首字符。如果是 *，则解析为字符块数组类型，即 MULTIBULK。否则请求解析为 INLINE 类型。",-1),h=e("p",null,"INLINE 类型是以 CRLF 结尾的单行字符串，协议命令及参数以空格分隔。解析过程参考之前课程里分析的对应协议格式。协议解析完毕后，将请求参数个数存入 client 的 argc 中，将请求的具体参数存入 client 的 argv 中。",-1),p=e("h6",{id:"协议执行",tabindex:"-1"},[a("协议执行 "),e("a",{class:"header-anchor",href:"#协议执行","aria-label":'Permalink to "协议执行"'},"​")],-1),m=e("p",null,"请求命令解析完毕，则进入到协议执行部分。协议执行中，对于 quit 指令，直接返回 OK，设置 flag 为回复后关闭连接。",-1),u=e("p",null,"对于非 quit 指令，以 client 中 argv[0] 作为命令，从 server 中的命令表中找到对应的 redisCommand。如果没有找到 redisCommand，则返回未知 cmd 异常。如果找到 cmd，则开始执行 redisCommand 中的 proc 函数，进行具体命令的执行。在命令执行完毕后，将响应写入 client 的写缓冲。并按配置和部署，将写指令分发给 aof 和 slaves。同时更新相关的统计数值。",-1);function f(g,b,R,q,A,k){const t=o("Image");return _(),d("div",null,[c,s(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A1/20/CgoB5l236leAQe3lAACYuua9lLs344.png"}),a(),l,h,p,m,s(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A1/40/CgotOV236liAP-kPAAC0HQZ_GbA559.png"}),a(),u])}const N=i(n,[["render",f]]);export{I as __pageData,N as default};
