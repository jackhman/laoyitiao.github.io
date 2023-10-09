import{_ as e,j as a,o as p,h as c,k as o,f as s,s as t,Q as i}from"./chunks/framework.d3daa342.js";const Y=JSON.parse('{"title":"第23课：操作系统紧急故障修复常见有效方案","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1568) 第23课：操作系统紧急故障修复常见有效方案.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1568) 第23课：操作系统紧急故障修复常见有效方案.md","lastUpdated":1696682708000}'),n={name:"posts/devops/111-运维高手的36项修炼文档/(1568) 第23课：操作系统紧急故障修复常见有效方案.md"},_=t("h1",{id:"第23课-操作系统紧急故障修复常见有效方案",tabindex:"-1"},[s("第23课：操作系统紧急故障修复常见有效方案 "),t("a",{class:"header-anchor",href:"#第23课-操作系统紧急故障修复常见有效方案","aria-label":'Permalink to "第23课：操作系统紧急故障修复常见有效方案"'},"​")],-1),g=t("p",null,"你好，我是你的运维课老师 Jeson，本课时我们主要讲解操作系统故障时修复的常见有效方案。",-1),r=t("p",null,"通常操作系统遇到的一些灾难性故障，会导致操作系统无法正常运行、启动或是运维人员无法进行管理。我们想要学习解决操作系统的故障，就必须了解操作系统依赖的一些核心模块。",-1),h=t("h4",{id:"操作系统模块",tabindex:"-1"},[s("操作系统模块 "),t("a",{class:"header-anchor",href:"#操作系统模块","aria-label":'Permalink to "操作系统模块"'},"​")],-1),u=i('<p>接下来，我们就先回顾操作系统在启动过程中需要依赖哪些核心模块，这里我以 Centos7 的操作系统为例进行讲解，如图所示。</p><p>图中由上到下列出了操作系统启动顺序，当我们打开计算机的电源开关后，计算机通电便会开始进入启动环节，首选会进入 BIOS，BIOS 的功能主要是为计算机提供最底层硬件设置和控制，并且加载 MBR。</p><p>MBR 是磁盘最前的一段引导代码，主要负责操作系统 对磁盘进行分区的合法判断，以及分区的引导信息定位，引导完成以后 MBR 接下来会交给操作系统的 GRUB2。</p><p>GRUB2 主要用于加载操作系统内核，如果你了解 Linux 就会比较清楚，我们可以在 GRUB2 的引导过程中来选择你想加载的操作系统内核选项，这里我们在作双系统场景需要通过 GRUB2 来设置 。</p><p>在 GRUB2 加载完操作系统内核后，便会进入操作系统内核的启动过程，操作系统内核启动过程主要是加载操作系统内核模块、驱动模块，等等。内核加载完毕后则正式交给操作系统的服务管理（systemd）来作服务加载，这样就完成了操作系统的启动过程。</p><h4 id="常见错误" tabindex="-1">常见错误 <a class="header-anchor" href="#常见错误" aria-label="Permalink to &quot;常见错误&quot;">​</a></h4><p>在操作系统的启动过程中，任何一个模块出现问题可能都会导致操作系统无法正常运行，运维人员无法进行管理的情况，那么通常会遇到哪些常见的问题呢？这里列举了运维常见的故障。</p><ul><li>fstab 错误</li></ul><p>fstab 是作用在 /etc 下的文件，里面存放了操作系统的文件系统信息，我们在启动操作系统后需要挂载磁盘设备和分区，我们了解的 mount 挂载磁盘时的开机自动挂载方式就是通过 fstab 进行加载的。</p><p>通常情况，导致 fstab 常见的错误原因包括，比如在操作系统运行的过程中，把硬盘或存储给移除掉了，却没有及时修改更新 fstab 的设置；另外就是本身在配置 fstab 时就出现错误，在操作系统重启前没有及时进行更正。这些情况都可能导致操作系统启动时产生 fstab 错误。</p><ul><li>GRUB\\MBR 损坏</li></ul><p>刚讲的 Linux 启动过程中，GRUB\\MBR 是系统启动必须经过的两个核心环节，而 GRUB\\MBR也可能被异常损坏：比如我们在安装双系统的时候，由于后面安装的操作系统把前面操作系统的 MBR 给清理掉了，导致系统无法正常引导启动；第二种就是误删文件，我们在操作系统上把 GRUB 相关的文件进行了删除，这样就会导致操作系统无法读取到相关的配置，进而导致系统启动失败。</p><ul><li>文件系统损坏</li></ul><p>导致文件系统损坏一些常见场景，比如服务器正在运行时出现意外断电，导致文件系统出现损坏需要进行修复；或者磁盘等硬件故障也会导致文件系统损坏需要进行软件或硬件层的修复，这些都会导致操作系统文件系统损坏的情况。</p><ul><li>root 用户密码错误</li></ul><p>root 用户密码错误是我们非常常见的错误，可能是由于忘记了 root 密码或是修改了 sshd 服务 相关配置，或是 password 文件出错，都可能导致无法通过 ssh 远程登录方式来管理操作系统。</p><p>以上这些情况都会导致管理员无法登录到操作系统上对问题进行修复，或者会导致操作系统长期维护上存在隐患。</p><h4 id="操作系统特殊模式" tabindex="-1">操作系统特殊模式 <a class="header-anchor" href="#操作系统特殊模式" aria-label="Permalink to &quot;操作系统特殊模式&quot;">​</a></h4><p>那么，针对这种重大故障，我们来讲解常见的修复方式。从而了解操作系统的特殊模式能够帮助我们在遇到问题时快速解决。</p><p>本课时，主要讲解 Linux 操作系统下的两种特殊模式，一种是单用户模式，另外一种是救援模式。</p><ul><li>单用户模式</li></ul><p>单用户模式是操作系统安装完成以后默认存在的一种模式，这种模式只会启动最小的必要的操作系统服务，主要用于做系统修复工作。</p><p>在单用户模式下，运行级别是 1，当我们进入单用户模式以后，在操作系统里面会引导一个根 shell，并默认把网络禁用，进入单用户模式前就需要重启服务器。一般前提条件是需要运维人员是能够触碰到机器操作，或是通过服务器上管理卡操作进入单用户模式，单用户模式可以修复如文件系统损坏，root 密码错误等故障场景。</p><ul><li>救援模式</li></ul><p>相比单用户模式，救援模式要求的条件会更加苛刻，并且所修复故障场景级别也会更加的高，救援模式需要通过其他介质进行启动，通常情况下我们使用 U 盘、光盘等介质进入修复模式。修复模式本质可以理解为独立的 Linux 系统环境，也就是即使原系统损坏了也不影响我们登录到一个新的 Linux 环境，通过救援模式登录到一个独立的 Linux 环境可以修复原来操作系统GRUB\\MBR 等严重问题。</p><p>接下来，我们来看下如何进入到操作系统的特殊模式，首先，不管是进入单用户模式还是救援模式都需要重启操作系统，我们先来看下如何进入单用户模式。</p><blockquote><p>注意：不同的操作系统进入单用户模式会有一些操作上的差异。</p></blockquote>',27),A=t("p",null,"在这里，我以 Centos 6 和 Centos 7 的版本来分别进行介绍，Centos 6 的操作如下：",-1),m=t("ol",null,[t("li",null,"启动界面任意按一个字符，进入选择启动项菜单。"),t("li",null,"在启动菜单（GRUB）读秒界面按 e 键进入编辑模式。"),t("li",null,'用上下键移动到"kernel"行，按 e 进入行编辑模式。'),t("li",null,"在行编辑界面，在行末尾键入s、S、1 或者 single。")],-1),d=t("p",null,"然后进行保存、重启就可以告诉系统重启后以单用户模式加载启动操作系统，这是 Centos 6 进入单用户模式的操作流程，相比 Centos 6 ， Centos 7的进去单用模式可能略显复杂。",-1),C=i('<ol><li>启动界面任意按一个字符，进入选择启动项菜单。</li><li>在启动菜单（GRUB）读秒界面按 e 键进入编辑模式。</li><li>用上下键移动到&quot;kernel&quot;行，按 e 进入行编辑模式 <strong>-&gt; 找到&quot;linux16&quot;开头的行</strong>。</li><li>在行编辑界面，在行末尾键入 s、S、1 或者 single <strong>-&gt; 删除 rhgb 和 quiet，同时在后面添加init=/sysroot/bin/sh</strong>。</li></ol><p>然后，保存编辑的内容，重启操作系统就可以进入单用户模式，接下来我们讲解救援模式，救援模式就以 Centos 7 为例来进行讲解。</p><ol><li>设置 BIOS 的引导设备，优先通过 ISO 启动。</li><li>进入系统安装盘界面，先选 <strong>Troubleshooting</strong> ，再选 <strong>Rescue a CentOS system</strong>。</li><li>进入后等待最终进入提示模式，输入 1 回车。</li></ol><p>输入 chroot /mnt/sysimage 切换到原 Linux 系统主目录下，接着就可以开始对原系统进行修复工作，这就是 Centos 7 进入救援模式的大体过程。</p><h4 id="救援演示" tabindex="-1">救援演示 <a class="header-anchor" href="#救援演示" aria-label="Permalink to &quot;救援演示&quot;">​</a></h4><p>接下来，我们来演示救援模式的使用，我们模拟把 GURB 文件进行删除，删除以后会提示因为没有了 GURB 的启动配置文件导致系统无法进入 GURB 菜单选项引导界面了，这时就需要我们使用救援模式来修复 GURB。</p><p>首先，我使用 Vmware 虚拟并启动了一个 Centos 7 的实验操作系统，使用这样的环境来模拟救援模式修复 GURB 的过程。</p>',7),B=t("p",null,"我的操作系统挂载了两块硬盘，硬盘 1 为系统盘，硬盘 2 为数据盘，光盘这里挂载到了与已安装的操作系统 Centos 7 一样版本的 ISO 镜像，演示中进入的救援模式是需要 CD/DVD 介质来启动进入。",-1),b=t("p",null,"接下来进入我正在运行的操作系统里面，登录进入系统，首先需要模拟损坏 GURB。",-1),j=t("p",null,"进入 /boot 目录下输入 ls 会看到 GRUB 对应的文件目录，然后通过 rm -rf grub* 删除 GRUB 的文件目录。",-1),R=t("p",null,"再次输入 ls，可以发现 GRUB 的文件目录就已经没有了。",-1),M=t("p",null,"然后重启操作系统，这个时候会提示文件没有找到，需要进入救援模式的界面。",-1),U=t("p",null,"这个时候就需要通过光碟进入救援模式，首先通过设置引导介质为光碟，然后重启启动。这样就模拟了一个 BIOS 设置引导介质过程，通过新的介质启动虚拟机。",-1),q=t("p",null,"这个时候你会发现通过 BIOS 会直接进入一个安装的启动界面，然后选择 Centos 7 救援模式的按钮，这样就进入确认界面，然后点击确认就会启动救援模式。",-1),G=t("p",null,"这里会加载启动救援模式必需的操作系统内核和服务程序。",-1),f=t("p",null,"这里输入 1，就进入了救援模式，并进入了一个 Shell 的交互界面了，这样我们就可以通过输入命令来修复已经损坏的 GRUB 文件。",-1),x=t("p",null,"首先，我需要输入的是 chroot 命令（chroot /mnt/sysimage/），chroot 命令负责切换到原来的管理目录结构下，这时再输入 ls 会看到 / 目录下的文件内容及结构就是磁盘 1 （原系统盘）上的所有操作系统的磁盘文件，接下来我需要修复 GRUB。",-1),S=t("p",null,"修复 GRUB，Centos 7 有对应的成熟的命令，首先新建一个目录（mkdir /boot/grub2），因为我们刚才把整个文件目录做了删除。",-1),I=t("p",null,"然后在输入 grub2 -mkconfig -o /boot/grub2/grub.cfg，这样就可以按照对应的路径要求生成配置文件。",-1),T=t("p",null,"然后执行 grub2-install /dev/sda（添加需要修复系统所在的磁盘的设备）。",-1),F=t("p",null,"这个时候我们就可以通过 ls 命令查看对应目录下有没有文件生成，如果有文件生成以后就可以重启操作系统，",-1),O=t("p",null,"然后在 BIOS 中将启动介质设置为磁盘 1，然后重启启动，这个时候会看到正常进入 GRUB 的选择菜单栏里，这个时候选择默认的第一个启动菜单项。",-1),P=t("p",null,"这时，我们观察下启动过程，会发现启动停留在一个 selinux 报错上，导致后面一直无法启动，这个时候我们还需要修复下，在启动的时候不去加载 selinux。",-1),k=t("p",null,'这个时候可以选择重新启动磁盘，然后在启动过程中修改启动 GRUB 的配置，，把 selinux 设置为禁用，这时需要重启启动虚拟机，然后按 e键进入 GRUB 菜单中编辑，找到" Linux 16" 这一行并在" centos/swap" 后面输入 selinux = 0 把 selinux 临时禁用（永久关闭的方式请见课时8），这样在启动过程中就不再加载 selinux 的相关策略。',-1),E=t("p",null,"然后按住 control + X 继续启动，就可以进入到登录界面，说明操作系统正常启动。",-1),H=t("p",null,"好了，本课时内容就全部讲完了，如果你遇到相应的问题可以尝试用今天讲到的方法尝试修复操作系统故障。",-1);function L(V,v,D,N,w,y){const l=a("Image");return p(),c("div",null,[_,g,r,h,o(l,{alt:"1.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66a-OAPlCNAAIm5pCaK9U962.jpg"}),s(),u,o(l,{alt:"2.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/CgqCHl66a_yAAvcMAAEMHAiOI_A313.jpg"}),s(),A,m,d,o(l,{alt:"3.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bASAZ7p_AABx_fUX-gY425.jpg"}),s(),C,o(l,{alt:"4.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/CgqCHl66bA2AM-vuAABLSq_t41U364.jpg"}),s(),B,b,o(l,{alt:"5.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/CgqCHl66bB2AVJwFAACveDe3Ia4694.jpg"}),s(),j,o(l,{alt:"6.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bCSAaCI3AAEn4wHWpb0519.jpg"}),s(),R,o(l,{alt:"7.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bCyAfM7FAAAvPF0DDv4130.jpg"}),s(),M,U,o(l,{alt:"8.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bDSAeMsVAABGEtLIoIQ378.jpg"}),s(),q,o(l,{alt:"9.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bDuAOuSNAADMrAEagRY261.jpg"}),s(),G,o(l,{alt:"10.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bEGAYEcOAAEoAMQ3u00725.jpg"}),s(),f,o(l,{alt:"11.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/CgqCHl66bEmATe3oAAAx4fNQ8RQ164.jpg"}),s(),x,o(l,{alt:"12.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/CgqCHl66bF2AdAI3AAANA6T4YWM710.jpg"}),s(),S,o(l,{alt:"13.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bGKAb3hQAABJCj_36rw341.jpg"}),s(),o(l,{alt:"14.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bGuAWYrCAABLIALdS3M504.jpg"}),s(),I,o(l,{alt:"15.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/44/Ciqc1F66bHOAEm3PAAAfY1xGwoU495.jpg"}),s(),T,o(l,{alt:"16.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/45/CgqCHl66bHuAXyiiAAAmz6_nPZo827.jpg"}),s(),F,o(l,{alt:"17.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/45/Ciqc1F66bIOAVgJcAABUL1FHMtM765.jpg"}),s(),O,o(l,{alt:"18.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/45/CgqCHl66bIuAECi-AAA33rT3QlU625.jpg"}),s(),P,o(l,{alt:"19.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/45/CgqCHl66bJaAZoaXAAEhYTMITew904.jpg"}),s(),k,o(l,{alt:"20.jpg",src:"https://s0.lgstatic.com/i/image/M00/08/45/Ciqc1F66bNaAM40mAAAXBpmReRQ703.jpg"}),s(),E,H])}const J=e(n,[["render",L]]);export{Y as __pageData,J as default};
