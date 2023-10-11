import{_ as i,D as e,o as _,g as a,J as o,h as l,m as t,Q as n}from"./chunks/framework.f67d7268.js";const mt=JSON.parse('{"title":"第16课：典型系统故障：快速排错操作系统问题进程","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1561) 第16课：典型系统故障：快速排错操作系统问题进程.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1561) 第16课：典型系统故障：快速排错操作系统问题进程.md","lastUpdated":1696682708000}'),p={name:"posts/devops/111-运维高手的36项修炼文档/(1561) 第16课：典型系统故障：快速排错操作系统问题进程.md"},c=t("h1",{id:"第16课-典型系统故障-快速排错操作系统问题进程",tabindex:"-1"},[l("第16课：典型系统故障：快速排错操作系统问题进程 "),t("a",{class:"header-anchor",href:"#第16课-典型系统故障-快速排错操作系统问题进程","aria-label":'Permalink to "第16课：典型系统故障：快速排错操作系统问题进程"'},"​")],-1),d=t("p",null,'本课时我们开始学习"典型系统故障：快速排错操作系统问题进程 "。',-1),r=t("br",null,null,-1),h=t("p",null,"首先我将为你讲解常见问题进程的现象及影响，然后讲解如何通过一些命令和工具来分析这些问题进程。",-1),u=t("h2",{id:"常见进程问题及其对业务的影响",tabindex:"-1"},[l("常见进程问题及其对业务的影响 "),t("a",{class:"header-anchor",href:"#常见进程问题及其对业务的影响","aria-label":'Permalink to "常见进程问题及其对业务的影响"'},"​")],-1),b=t("p",null,"下面这张表格里面列出的是问题进程常见的一些类型。这个表格里一共有 6 个类型，前面 4 个类型可以总结为对资源使用过度，主要是 CPU、内存、 IO 以及对操作系统上文件句柄使用过度。这样的问题会影响到业务服务的稳定运行，同时可能会因为资源的占用，造成操作系统上面其他服务进程出现问题。",-1),m=t("br",null,null,-1),A=n('<br><p>造成问题的常见原因有很多：</p><ol><li><p>由于外部请求或外部访问，超过了自身进程所能够承载的负荷，导致系统的资源消耗过多；</p></li><li><p>进程内部的问题，即进程的程序代码设计不合理，效率比较低，出现了资源分配不合理的地方，导致在自己的资源上消耗过多；</p></li><li><p>部署不合理，比如我们在部署的时候，两个进程抢占同一份资源；</p></li><li><p>安全性的问题，比如被攻击等。</p></li></ol><br><p>接下来是第 2 类进程问题的类型：进程状态的问题。这里主要介绍两个我们运维会常见到的问题进程状态，一个是僵尸状态（Z），另外一个是进程不可中断的睡眠状态（D），这些都会导致自己业务服务出现问题。</p><br><p>这一类的问题通常是进程本身造成的，代码逻辑导致的情况居多。</p><br><p>以上就是我罗列的一些常见的进程问题类型，针对这些问题，接下来我罗列了一张表格，看看可以通过哪些命令来分析进程问题。</p><h2 id="进程分析命令" tabindex="-1">进程分析命令 <a class="header-anchor" href="#进程分析命令" aria-label="Permalink to &quot;进程分析命令&quot;">​</a></h2>',10),C=n('<br><p>我们从上往下对这张表进行讲解：</p><ul><li><p>top 命令可以做到实时显示系统中各个进程的资源占用状况，后面是它的使用用例，如 top 或 top -p pid 对应的 pid 来展示某一个进程的使用状态。</p></li><li><p>ps 命令，它也用来展示进程的状态，不过它是显示瞬间进程的状态 。我们可以通过 ps --ef、ps -aux 参数把某一个时态的操作系统的进程状态全部获取出来。</p></li><li><p>strace 命令主要用来跟踪一个进程调用系统底层模块的过程，我们可以通过 strace+ 具体进程执行的命令，去跟踪对应进程对系统的调用。</p></li><li><p>free 命令统计系统内存使用情况。</p></li><li><p>iostat 主要用来监视操作系统上，磁盘操作的活动情况。</p></li><li><p>vmstat 主要用来监控内存、进程、CPU 的活动状态。</p></li><li><p>ldd 用来监控一个进程在启动运行时所需要的一些共享库。后面有一个用例，比如我们这里执行 ldd test 这个命令，那么它就会查看 test 进程在启用时，需要调用到操作系统的哪些共享库。</p></li></ul><p>以上就是我们在分析问题进程时可能会经常用到的一些命令。接下来我们来讲讲，刚介绍的这些问题进程产生的原因是什么？以及我们具体应该通过什么样的方式去查看和分析这些问题进程？</p><h2 id="问题进程排查方式" tabindex="-1">问题进程排查方式 <a class="header-anchor" href="#问题进程排查方式" aria-label="Permalink to &quot;问题进程排查方式&quot;">​</a></h2><h3 id="查找进程使用-cpu-资源过度" tabindex="-1">查找进程使用 CPU 资源过度 <a class="header-anchor" href="#查找进程使用-cpu-资源过度" aria-label="Permalink to &quot;查找进程使用 CPU 资源过度&quot;">​</a></h3><p>首先对于查找进程 CPU 资源使用过度的场景，这里最常用到的就是 top 命令。top 命令可以实时展示某一个进程或系统上所有进程的资源使用情况。可以在 Linux 操作系统上先输入 top 命令，如果我们需要去分析哪一个进程使用的资源更多，需要按对 CPU 的利用率由大到小进行排序，这时我们可以在执行 top 命令后，同时按住键盘上的&quot;shift+p&quot;键，就可以使进程对 CPU 的资源使用率这一列，按照从大到小来进行排序。</p><br>',8),f=t("br",null,null,-1),g=t("p",null,"这样我们会更加直观地看到，在当前操作系统上，哪一个进程（command），使用的 CPU 是排名靠前的，我们可以定位到导致系统 CPU 占用率过高的进程。",-1),P=t("p",null,'第 2 个是 ps 命令，它可以瞬间把操作系统的进程状态提取出来。通过 ps -aux --sort=-%cpu 这个参数，我们同样也可以实现按照 CPU 的使用率，由大到小进行排序。跟 top 相比，ps 并不是实时去展示的，而是提取出瞬间的进程信息。我们可以再加一个管道符过滤一下，也就是写成"ps -aux --sort=-%cpu|head -n 10"，表示显示对系统 CPU 资源使用率排名 Top10 的进程。',-1),x=t("br",null,null,-1),q=t("br",null,null,-1),B=t("p",null,"可以看到这张图的样例是这样进行展示的，top 可以做实时分析，而 ps 的命令是瞬间展示，相对于 top 命令而言，ps 命令的优势在于它本身不会占用操作系统太多资源，而 top 由于实时提取计算操作系统的进程信息，所以消耗性能情况会比使用 ps命令更多。所以如果我们只是想通过 ps 命令，快速地把当前操作系统进程上面的进程占用率做一个排序，提取出来，而不想对操作系统有额外的消耗，就可以通过 ps 命令来操作。",-1),I=t("br",null,null,-1),T=t("p",null,"刚刚讲到的是对 CPU 的资源使用率的操作，接下来我会讲到对内存资源使用率的操作。",-1),O=t("h3",{id:"查找进程使用内存-io资源过多",tabindex:"-1"},[l("查找进程使用内存/IO资源过多 "),t("a",{class:"header-anchor",href:"#查找进程使用内存-io资源过多","aria-label":'Permalink to "查找进程使用内存/IO资源过多"'},"​")],-1),S=t("p",null,'如果是通过 top 命令来分析进程对内存使用率情况，那么我们可以按住"shift+m"，这个时候它就可以按照内存这一列的使用率进行排序，我们可以把操作系统上当前占用率更高的进程整体罗列出来。 ps 命令也是一样，只不过是在 sort 排序这一列里，改成了 -%MEM，按照这一列来进行由大到小的数值排序。',-1),k=t("br",null,null,-1),D=t("br",null,null,-1),M=t("p",null,"以上就是排查进程对操作系统的内存资源使用过度的方式，接下来讲解是进程使用的磁盘 IO分析场景，我们首先用 yum install sysstat 安装软件包，再在操作系统的 Terminal 终端上面执行 iostat 命令。",-1),U=t("br",null,null,-1),N=t("br",null,null,-1),V=t("p",null,"可以看到我在执行 iostat 命令后面加入两个数值的参数，分别是 2 和 1，2 表示刷新的频率，间隔周期，1 表示总共的次数，我这里总共只执行了一次。",-1),z=t("br",null,null,-1),E=t("p",null,"执行 iostat 的展示情况就是这样，我们重点需要关注的是磁盘设备（我这里是 vda 设备）的读写速率，在上图中，前面是读（KB_read/s），后面是写（KB_wrtn/s）。",-1),v=t("br",null,null,-1),y=t("p",null,"如果你觉得刚展示的这些数值还不够详细和形象的话，我们可以加入一个 -x 选项，就可以展示出更多详细的对于磁盘 IO 的操作信息。比如 %util，这个值表示一秒钟有多少时间用于 IO 操作，可以反映出 IOPS 的情况，并且非常形象地展示出它的百分比，从而能够清晰地看出当前磁盘的负荷状态。",-1),K=t("br",null,null,-1),L=t("p",null,"只用 iostat 命令还不够，有时候我们还会想更加具体地了解每一个进程使用 lO 的情况。这个时候我们只需要去安装另外一个包：iotop。它能够展示每个进程对 lO 的使用。值得注意的是，如果你的系统 lO 操作非常频繁，这个命令可能会占用比较大的操作系统性能，所以你还是需要合理使用它。iotop 会把每一个进程信息的 IO 使用率进行罗列，并展示出来。我们看到这里有一个展示的效果图示：",-1),F=t("br",null,null,-1),Z=n('<br><p>刚刚讲到的查找进程 IO 资源使用情况，接下来我将为你介绍进程占用文件句柄。</p><h3 id="进程占用文件描述符问题" tabindex="-1">进程占用文件描述符问题 <a class="header-anchor" href="#进程占用文件描述符问题" aria-label="Permalink to &quot;进程占用文件描述符问题&quot;">​</a></h3><p>之前的课时里我们讲过文件句柄的相关知识，这个课时里我们主要补充，如何查看操作系统当前的文件句柄以及它的每一个限制。</p><br><p>首先就是操作系统上允许所有进程打开文件句柄的总数限制，我们可以通过 cat 命令路径下的 file-max ，查看状态信息，这个数值代表操作系统上所有进程允许打开的最大 fd 数量。</p><br><p>有时我们还需要去查看当前所有的进程已打开和允许打开 fd 数量，这个时候我们可以通过 cat 命令，查看另外一个文件，叫作 file-nr，它会展示出操作系统当前的进程打开及允许打开的文件句柄。</p><br><p>接下来，如果我想把范围精确到某一个进程允许打开的 fd 数量，因为操作系统除了对所有进程打开的 fd 文件有限制以外，对单个进程也会有限制。所以如果我们想了解单个进程打开文件句柄的限制，可以通过插入 ulimit 命令，然后加 --n 参数，来展示单个进程允许打开的文件句柄数量。</p><br><p>刚讲到的是单个进程允许打开的文件句柄数量，同样我们想了解某一个进程当前打开了哪些 fd，我们可以使用 ls -l，然后在 proc 目录下对应的进程 pid 目录，再到进程 ID（pid ）目录的 fd 目录下（/proc/{pid}/{fd}/），存放着当前打开的文件句柄，我们可以通过 ls -l 把所有的内容全部罗列出来，然后用 wc 命令进行统计，就能知道当前进程(PID)打开的 fd 数量。</p><br><p>如果进程它所打开的文件句柄过多，超过了操作系统的限制，就可能导致进程或服务出现影响和问题。这个时候我们就需要去进行分析和调整了。关于调整操作系统的文件句柄限制，我们在课时 8 中学习如何进行操作系统初始化的时候，给你讲到了如何去调整操作系统对文件句柄打开的设置，这里就不多讲了。如果要用第 2 种方式，也就是架构、程序优化的角度去解决的话，就要从程序自身排查，比如思考它为什么会打开这么多文件句柄，以及打开的文件句柄是否合理。</p><br><p>通常来说，一些程序可能因为设计不合理，在本地创建了很多的临时碎片文件，这都有可能导致自己的文件句柄过多，从而影响服务。</p><h3 id="僵尸状态进程" tabindex="-1">僵尸状态进程 <a class="header-anchor" href="#僵尸状态进程" aria-label="Permalink to &quot;僵尸状态进程&quot;">​</a></h3><p>接下来我们讲下操作系统僵尸进程分析和处理，我们知道LInux的父子进程，任何一个子进程(init除外)在exit()之后，并非马上就消失掉，而是留下一个称为僵尸进程(Zombie)的数据结构，等待父进程处理。这是每个 子进程在结束时都要经过的阶段。如果子进程在exit()之后，父进程没有来得及处理，这时用ps命令就能看到子进程的状态是&quot;Z&quot;</p><br>',19),R=t("br",null,null,-1),$=t("p",null,'我们通过 ps -ef +管道符号（|），grep 一个"defunct"关键词，就会展示所有僵尸状态的进程。如果是通过 top 命令，也可以查看当前操作系统上的异常状态进程个数。',-1),w=t("p",null,'通过"ps -e -o ppid,stat | grep Z | cut -d" " -f2 | xargs kill -9 "这段组合代码用来进行处理僵尸进程，原理是要把父进程的 pid 清理掉，才能够把僵尸进程回收。',-1),G=t("h3",{id:"进程不可中断睡眠状态",tabindex:"-1"},[l("进程不可中断睡眠状态 "),t("a",{class:"header-anchor",href:"#进程不可中断睡眠状态","aria-label":'Permalink to "进程不可中断睡眠状态"'},"​")],-1),J=t("p",null,'刚讲到的是僵尸进程状态，第 2 个异常进程状态是进程不可中断睡眠状态。在操作系统的睡眠状态分为可中断睡眠状态和不可中断睡眠状态。可中断睡眠状态通常是以"S"表示，而不可中断睡眠状态通常是以"D"关键字符进行表示。',-1),j=t("br",null,null,-1),H=t("p",null,"我们首先来分析一下，不可中断睡眠状态产生的场景，这里我画了一张简单的图示：",-1),Q=t("br",null,null,-1),W=t("br",null,null,-1),X=t("p",null,"我们会看到这里有两个进程，分别是进程 A 和进程 B，中间是一个队列，进程 B 负责添加数据，添加完数据以后，它要唤醒进程 A 来提取数据，并且执行相应的任务。假设在 B 唤醒 A 的过程中，A 进程正在处理上一次的任务，此时 A 就无法响应 B 的这次唤醒，这个时候就会导致进程 A 进入等待状态，从而进入不可中断的睡眠状态。",-1),Y=t("br",null,null,-1),tt=t("p",null,"可中断的程序设计过程是这样的，它会只等待某个条件为真，不论是产生硬件中断，或释放进程等待系统资源，还是传递一个信号量，都可以作为唤醒进程的条件。而不可中断进程只能等待原有硬件终端所需要的资源被唤醒，如果没有得到唤醒的话，那么它就不响应操作系统上的信号量。",-1),lt=t("br",null,null,-1),st=t("p",null,"所以如果我们想关闭不可中断进程状态的话，通过 kill -9 命令关闭是做不到的。这种情况下，只能通过重启操作系统进行恢复或者所需资源。",-1),ot=t("br",null,null,-1),nt=t("p",null,"再举一个真实的例子，我们常见到的客户端挂载 NFS 这种共享存储服务来给到客户端场景。假设把NFS 服务端关闭之时，未先 umount 相关目录，在 NFS 客户端执行 df 命令，这个时候我们会看到在操作系统的前端， df 命令会一直进入不可中断的状态，即使用 kill -9 也无法把 df 命令关闭。这时正确的处理方式是，需要先把 NFS 服务端的服务重新启用，才能够唤醒前端进程的响应，这个是我们常见到的一种情况。",-1),it=t("br",null,null,-1),et=t("p",null,"那么对于不可中断的进程，我为你介绍的就是这些。",-1),_t=t("br",null,null,-1);function at(pt,ct,dt,rt,ht,ut){const s=e("Image");return _(),a("div",null,[c,d,r,h,u,b,m,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzA-ASdUyAAQqyjnlKws003.png"}),l(),A,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzA-AFspTAALINqZd-a8200.png"}),l(),C,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzA-AfJyuAACkI-WSPd8875.png"}),l(),f,g,P,x,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzBCAKt5RAABshfA11Ls394.png"}),l(),q,B,I,T,O,S,k,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzBCAMzG_AADk9yzHaj0041.png"}),l(),D,M,U,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzBCAMlMoAABTWkXEzMs498.png"}),l(),N,V,z,E,v,y,K,L,F,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/BE/Ciqah16OzBCAHK2vAADAVSLisC4355.png"}),l(),Z,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzBCAVqEDAADn6mBVAos240.png"}),l(),R,$,w,G,J,j,H,Q,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/D4/Cgq2xl6OzBGAYhKmAAIGtoLnki4328.png"}),l(),W,X,Y,tt,lt,st,ot,nt,it,et,_t])}const At=i(p,[["render",at]]);export{mt as __pageData,At as default};
