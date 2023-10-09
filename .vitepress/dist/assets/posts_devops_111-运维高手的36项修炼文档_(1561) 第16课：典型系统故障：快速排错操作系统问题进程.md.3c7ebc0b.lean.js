import{_ as i,j as e,o as _,h as a,k as o,f as l,s as t,Q as n}from"./chunks/framework.d3daa342.js";const mt=JSON.parse('{"title":"第16课：典型系统故障：快速排错操作系统问题进程","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1561) 第16课：典型系统故障：快速排错操作系统问题进程.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1561) 第16课：典型系统故障：快速排错操作系统问题进程.md","lastUpdated":1696682708000}'),p={name:"posts/devops/111-运维高手的36项修炼文档/(1561) 第16课：典型系统故障：快速排错操作系统问题进程.md"},c=t("h1",{id:"第16课-典型系统故障-快速排错操作系统问题进程",tabindex:"-1"},[l("第16课：典型系统故障：快速排错操作系统问题进程 "),t("a",{class:"header-anchor",href:"#第16课-典型系统故障-快速排错操作系统问题进程","aria-label":'Permalink to "第16课：典型系统故障：快速排错操作系统问题进程"'},"​")],-1),d=t("p",null,'本课时我们开始学习"典型系统故障：快速排错操作系统问题进程 "。',-1),r=t("br",null,null,-1),h=t("p",null,"首先我将为你讲解常见问题进程的现象及影响，然后讲解如何通过一些命令和工具来分析这些问题进程。",-1),u=t("h2",{id:"常见进程问题及其对业务的影响",tabindex:"-1"},[l("常见进程问题及其对业务的影响 "),t("a",{class:"header-anchor",href:"#常见进程问题及其对业务的影响","aria-label":'Permalink to "常见进程问题及其对业务的影响"'},"​")],-1),b=t("p",null,"下面这张表格里面列出的是问题进程常见的一些类型。这个表格里一共有 6 个类型，前面 4 个类型可以总结为对资源使用过度，主要是 CPU、内存、 IO 以及对操作系统上文件句柄使用过度。这样的问题会影响到业务服务的稳定运行，同时可能会因为资源的占用，造成操作系统上面其他服务进程出现问题。",-1),m=t("br",null,null,-1),A=n("",10),f=n("",8),C=t("br",null,null,-1),g=t("p",null,"这样我们会更加直观地看到，在当前操作系统上，哪一个进程（command），使用的 CPU 是排名靠前的，我们可以定位到导致系统 CPU 占用率过高的进程。",-1),P=t("p",null,'第 2 个是 ps 命令，它可以瞬间把操作系统的进程状态提取出来。通过 ps -aux --sort=-%cpu 这个参数，我们同样也可以实现按照 CPU 的使用率，由大到小进行排序。跟 top 相比，ps 并不是实时去展示的，而是提取出瞬间的进程信息。我们可以再加一个管道符过滤一下，也就是写成"ps -aux --sort=-%cpu|head -n 10"，表示显示对系统 CPU 资源使用率排名 Top10 的进程。',-1),x=t("br",null,null,-1),q=t("br",null,null,-1),B=t("p",null,"可以看到这张图的样例是这样进行展示的，top 可以做实时分析，而 ps 的命令是瞬间展示，相对于 top 命令而言，ps 命令的优势在于它本身不会占用操作系统太多资源，而 top 由于实时提取计算操作系统的进程信息，所以消耗性能情况会比使用 ps命令更多。所以如果我们只是想通过 ps 命令，快速地把当前操作系统进程上面的进程占用率做一个排序，提取出来，而不想对操作系统有额外的消耗，就可以通过 ps 命令来操作。",-1),I=t("br",null,null,-1),T=t("p",null,"刚刚讲到的是对 CPU 的资源使用率的操作，接下来我会讲到对内存资源使用率的操作。",-1),O=t("h3",{id:"查找进程使用内存-io资源过多",tabindex:"-1"},[l("查找进程使用内存/IO资源过多 "),t("a",{class:"header-anchor",href:"#查找进程使用内存-io资源过多","aria-label":'Permalink to "查找进程使用内存/IO资源过多"'},"​")],-1),S=t("p",null,'如果是通过 top 命令来分析进程对内存使用率情况，那么我们可以按住"shift+m"，这个时候它就可以按照内存这一列的使用率进行排序，我们可以把操作系统上当前占用率更高的进程整体罗列出来。 ps 命令也是一样，只不过是在 sort 排序这一列里，改成了 -%MEM，按照这一列来进行由大到小的数值排序。',-1),k=t("br",null,null,-1),D=t("br",null,null,-1),M=t("p",null,"以上就是排查进程对操作系统的内存资源使用过度的方式，接下来讲解是进程使用的磁盘 IO分析场景，我们首先用 yum install sysstat 安装软件包，再在操作系统的 Terminal 终端上面执行 iostat 命令。",-1),U=t("br",null,null,-1),N=t("br",null,null,-1),V=t("p",null,"可以看到我在执行 iostat 命令后面加入两个数值的参数，分别是 2 和 1，2 表示刷新的频率，间隔周期，1 表示总共的次数，我这里总共只执行了一次。",-1),z=t("br",null,null,-1),E=t("p",null,"执行 iostat 的展示情况就是这样，我们重点需要关注的是磁盘设备（我这里是 vda 设备）的读写速率，在上图中，前面是读（KB_read/s），后面是写（KB_wrtn/s）。",-1),v=t("br",null,null,-1),y=t("p",null,"如果你觉得刚展示的这些数值还不够详细和形象的话，我们可以加入一个 -x 选项，就可以展示出更多详细的对于磁盘 IO 的操作信息。比如 %util，这个值表示一秒钟有多少时间用于 IO 操作，可以反映出 IOPS 的情况，并且非常形象地展示出它的百分比，从而能够清晰地看出当前磁盘的负荷状态。",-1),K=t("br",null,null,-1),L=t("p",null,"只用 iostat 命令还不够，有时候我们还会想更加具体地了解每一个进程使用 lO 的情况。这个时候我们只需要去安装另外一个包：iotop。它能够展示每个进程对 lO 的使用。值得注意的是，如果你的系统 lO 操作非常频繁，这个命令可能会占用比较大的操作系统性能，所以你还是需要合理使用它。iotop 会把每一个进程信息的 IO 使用率进行罗列，并展示出来。我们看到这里有一个展示的效果图示：",-1),F=t("br",null,null,-1),Z=n("",19),R=t("br",null,null,-1),$=t("p",null,'我们通过 ps -ef +管道符号（|），grep 一个"defunct"关键词，就会展示所有僵尸状态的进程。如果是通过 top 命令，也可以查看当前操作系统上的异常状态进程个数。',-1),j=t("p",null,'通过"ps -e -o ppid,stat | grep Z | cut -d" " -f2 | xargs kill -9 "这段组合代码用来进行处理僵尸进程，原理是要把父进程的 pid 清理掉，才能够把僵尸进程回收。',-1),w=t("h3",{id:"进程不可中断睡眠状态",tabindex:"-1"},[l("进程不可中断睡眠状态 "),t("a",{class:"header-anchor",href:"#进程不可中断睡眠状态","aria-label":'Permalink to "进程不可中断睡眠状态"'},"​")],-1),G=t("p",null,'刚讲到的是僵尸进程状态，第 2 个异常进程状态是进程不可中断睡眠状态。在操作系统的睡眠状态分为可中断睡眠状态和不可中断睡眠状态。可中断睡眠状态通常是以"S"表示，而不可中断睡眠状态通常是以"D"关键字符进行表示。',-1),H=t("br",null,null,-1),J=t("p",null,"我们首先来分析一下，不可中断睡眠状态产生的场景，这里我画了一张简单的图示：",-1),Q=t("br",null,null,-1),W=t("br",null,null,-1),X=t("p",null,"我们会看到这里有两个进程，分别是进程 A 和进程 B，中间是一个队列，进程 B 负责添加数据，添加完数据以后，它要唤醒进程 A 来提取数据，并且执行相应的任务。假设在 B 唤醒 A 的过程中，A 进程正在处理上一次的任务，此时 A 就无法响应 B 的这次唤醒，这个时候就会导致进程 A 进入等待状态，从而进入不可中断的睡眠状态。",-1),Y=t("br",null,null,-1),tt=t("p",null,"可中断的程序设计过程是这样的，它会只等待某个条件为真，不论是产生硬件中断，或释放进程等待系统资源，还是传递一个信号量，都可以作为唤醒进程的条件。而不可中断进程只能等待原有硬件终端所需要的资源被唤醒，如果没有得到唤醒的话，那么它就不响应操作系统上的信号量。",-1),lt=t("br",null,null,-1),st=t("p",null,"所以如果我们想关闭不可中断进程状态的话，通过 kill -9 命令关闭是做不到的。这种情况下，只能通过重启操作系统进行恢复或者所需资源。",-1),ot=t("br",null,null,-1),nt=t("p",null,"再举一个真实的例子，我们常见到的客户端挂载 NFS 这种共享存储服务来给到客户端场景。假设把NFS 服务端关闭之时，未先 umount 相关目录，在 NFS 客户端执行 df 命令，这个时候我们会看到在操作系统的前端， df 命令会一直进入不可中断的状态，即使用 kill -9 也无法把 df 命令关闭。这时正确的处理方式是，需要先把 NFS 服务端的服务重新启用，才能够唤醒前端进程的响应，这个是我们常见到的一种情况。",-1),it=t("br",null,null,-1),et=t("p",null,"那么对于不可中断的进程，我为你介绍的就是这些。",-1),_t=t("br",null,null,-1);function at(pt,ct,dt,rt,ht,ut){const s=e("Image");return _(),a("div",null,[c,d,r,h,u,b,m,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzA-ASdUyAAQqyjnlKws003.png"}),l(),A,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzA-AFspTAALINqZd-a8200.png"}),l(),f,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzA-AfJyuAACkI-WSPd8875.png"}),l(),C,g,P,x,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzBCAKt5RAABshfA11Ls394.png"}),l(),q,B,I,T,O,S,k,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzBCAMzG_AADk9yzHaj0041.png"}),l(),D,M,U,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzBCAMlMoAABTWkXEzMs498.png"}),l(),N,V,z,E,v,y,K,L,F,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzBCAHK2vAADAVSLisC4355.png"}),l(),Z,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzBCAVqEDAADn6mBVAos240.png"}),l(),R,$,j,w,G,H,J,Q,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzBGAYhKmAAIGtoLnki4328.png"}),l(),W,X,Y,tt,lt,st,ot,nt,it,et,_t])}const At=i(p,[["render",at]]);export{mt as __pageData,At as default};
