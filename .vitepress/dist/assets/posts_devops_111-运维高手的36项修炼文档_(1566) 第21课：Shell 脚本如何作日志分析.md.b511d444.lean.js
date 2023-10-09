import{_ as l,j as o,o as e,h as t,k as p,f as n,Q as c,s}from"./chunks/framework.d3daa342.js";const w=JSON.parse('{"title":"第21课：Shell脚本如何作日志分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1566) 第21课：Shell 脚本如何作日志分析.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1566) 第21课：Shell 脚本如何作日志分析.md","lastUpdated":1696682708000}'),i={name:"posts/devops/111-运维高手的36项修炼文档/(1566) 第21课：Shell 脚本如何作日志分析.md"},r=c("",64),d=s("p",null,"我们首先来介绍一下 Shell 脚本的整体结构，最上面的这一段语句是做一个文件路径（/tmp/logs）的判断，如果存在的话，就会先把之前的文件做一个清空。",-1),g=s("p",null,"这是因为执行日志分析的脚本时，会把每一项的功能得到的统计结果，输出到 tmp 路径下面的 logs 目录下，并且以对应的文件名进行归纳。当我们执行完脚本以后，想要了解每一项结果内容的时候，就可以到该路径下面去查看对应的结果。",-1),E=s("p",null,"这里需要填写 Nginx 的 access 日志目录，用于分析的文件 access 日志路径。接下来做日志路径判断，如果日志路径不存在，那么脚本执行就会中断退出。",-1),u=s("p",null,"再往下看的话，这里就是做系统版本检测，这个脚本需要在 Debian 操作系统或者 Ubuntu 、Centos 这样的操作系统上，如果操作系统不能满足的话也会退出。",-1),y=s("p",null,"接下来就要用到我们刚刚讲到的 ag 命令。在没有 ag 命令情况下，脚本会先提示并进行安装，对应的使用 Yu m 或者是 apt get 包管理器安装。",-1),h=s("p",null,"下面就具体每一项的功能分析：",-1),m=s("p",null,"这里分析的就是访问 Top20 的 IP 地址，那么 ag 命令就做一个正则匹配，把所有的地址打印出来，然后通过 sort 来进行排序，uniq 来进行统计，然后再得到由大到小的结果，并且过滤出前 20 行数，然后同时把内容给到 tee 这个命令，它会把输出内容重定向到日志结果目录（/tmp/logs/top20.log），整体执行完毕后，如果我们想要看这一项分析结果的话，那么就可以在 log 目录下 Top20.log 文件里查看。另外 tee 命令还可以支持在终端输出，也就是既把结果放在终端输出。",-1),F=s("p",null,"所以这样就完成了第 1 项的日志功能分析，分析出访次数问前 20 的 IP 地址，并且打印。后面的每一项功能分析其实都是类似的原理，通过 ag 命令来对文件进行关键字查找，并且进行分析和统计。",-1),_=s("p",null,"好了，最后执行 sh nginx_check.sh，就可以开始 nginx access 日志来分析，我们在控制台终端关注它的执行过程和进度，并且在结果目录中详细分析日志得到的结果内容。",-1);function v(k,C,$,b,x,q){const a=o("Image");return e(),t("div",null,[r,p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C3/Ciqah16oCk2AEbinAAF6FZc0C8Y862.png"}),n(),d,p(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C3/Ciqah16oClaAAuEjAAHN0RjwOLs251.png"}),n(),g,E,p(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/94/CgoCgV6oCnSAMMVaAAHrrrcMxQM494.png"}),n(),u,y,p(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C3/Ciqah16oCnyAU7F5AAK3m1tcm1U889.png"}),n(),h,p(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/94/CgoCgV6oCoSABFmQAADl0mRWcSA337.png"}),n(),m,F,p(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/94/CgoCgV6oCouACYpDAAOHWLR8AZM738.png"}),n(),_])}const N=l(i,[["render",v]]);export{w as __pageData,N as default};
