import{_ as l,j as a,o as c,h,k as s,f as o,Q as i,s as t}from"./chunks/framework.d3daa342.js";const b=JSON.parse('{"title":"第04讲：Linux三剑客（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(373) 第04讲：Linux 三剑客（下）.md","filePath":"posts/devops/110-测试开发核心技术文档/(373) 第04讲：Linux 三剑客（下）.md","lastUpdated":1696682708000}'),n={name:"posts/devops/110-测试开发核心技术文档/(373) 第04讲：Linux 三剑客（下）.md"},p=i("",6),r=t("p",null,"因为 dddd 文件是不存在的，所以会打印了一个独立显示的报错信息，我们就称之为错误输出。",-1),g=t("p",null,"我们现在输入 ls -l /tmp appium.log 指令，可以打印一个正确的输出。",-1),_=t("p",null,'而输入是一个读取文件的过程，比如我们输入 grep "hogwarts" /tmp/hello.txt 指令便是从 hello.txt 文件中读取 hogwarts。',-1),d=t("p",null,'但如果我们不传递给指令一个文件，会发生什么样的效果？比如输入 grep "hogwarts" 指令，你会发现什么都没有显示，继续输入 xxx、dddd 仍没有任何反应，直到输入 hogwarts 时，系统才会输出 hogwarts，我们看到如果不传递输入文件，grep 会默认从当前输入读取内容。',-1),m=t("p",null,"我们来简单总结一下，输入文件就是标准输入 0，如果当没有输入文件时会获取当前输入窗口中的数据，读到数据后可以对数据进行一系列的操作，标准输出 1 就是一个输出文件，而如果错误输出文件就是标准错误 2。",-1),A=t("p",null,"管道",-1),u=t("hr",null,null,-1),x=t("p",null,"接下来，我们学习管道在整个输入输出过程中发挥的作用，以及管道的具体用法。在日常工作中，通常需要特殊的方法将多个程序串联起来，将程序 1 的输出 1 作为程序 2 的输入，在 Shell 中这个特殊的方法就是管道。",-1),C=t("p",null,"举个例子，比如我们输入 echo hello | gerp hogwarts 指令，打印一个 hello 传给 grep hogwarts，这个时候，你会发现没有任何输出，这是为什么呢？",-1),D=t("p",null,"我们把指令分为两部分执行，第一部分执行 echo hello，这个指令没有任何输入但是有输出。",-1),M=t("p",null,"然后，将 echo hello 通过管道传递给 grep hogwarts，此时管道已经找到输入内容 echo hello，于是便不再从当前窗口读取数据，但因为读入的内容实际是没有输入的所以会得不到任何输出。",-1),P=t("p",null,"我们应该如何正确操作呢，输入 echo hello hogwarts | gerp hogwarts 指令，你会看到输出了正确的内容。因为上一个命令输入了 hello hogwarts，再经 grep 后输出。你可以看到通过管道我们可以让 Linux 三剑客的功能发挥到一个新的高度，有了管道很多的操作就变得非常简单易处理。",-1),z=t("p",null,"再举个例子，首先通过 cat /tmp/hello.txt 指令打印 hello.txt 文件。",-1),f=t("p",null,"然后通过管道打印包含 testerhome 的信息行。",-1),S=t("p",null,"如果此时我们只想得到 testerhome 这个单词怎么办呢？输入 cat /tmp/hello.txt | grep testerhome | awk '{print $3}' 指令就可以单独打印 testerhome 了，因为 hello from testerhome 是以空格隔开的，所以指令中的 $3 表示第三个元素。",-1),V=t("p",null,"我们再继续使用管道将 testerhome 中的 tester 替换成 dev，输入 cat /tmp/hello.txt | grep testerhome | awk '{print $3}' | sed 's#tester#dev#' 指令，你可以看到 testerhome 就变成了devhome 了。",-1),L=t("p",null,"这就是使用管道的魅力，管道和三剑客结合使用可以实现非常好的执行效果，它可以帮助我们处理一些复杂的数据处理工作，提高我们的工作效率。",-1);function w(O,B,k,H,T,v){const e=a("Image");return c(),h("div",null,[p,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czBiAQrPTAAJmF953Il8386.png"}),o(),r,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czCaAPOigAAI94SOIP8Q284.png"}),o(),g,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czDOAQH4QAAJeXeuP_OE959.png"}),o(),_,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czD-ABCoWAAHsxWlG56g657.png"}),o(),d,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czEmAZ0OHAAAu39KhXGc899.png"}),o(),m,A,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czFWAdLdxAAA6ljNKhhE539.png"}),o(),u,x,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czGCAP4CYAAHPxkU23_Y997.png"}),o(),C,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czG-APPCuAAHKJe8bVUg331.png"}),o(),D,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czHyAC5P7AAHcF8HELcU211.png"}),o(),M,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czJKAXcksAAHlS8hzS9g985.png"}),o(),P,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czKCAdhjzAAHmEnTiajE963.png"}),o(),z,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czKyAV6LNAAIYxUQ2cfk322.png"}),o(),f,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czLaAMLMMAAJYe229DN0565.png"}),o(),S,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czMCAbfmlAAKapT3G6Ps078.png"}),o(),V,L])}const E=l(n,[["render",w]]);export{b as __pageData,E as default};
