import{_ as o,j as e,o as t,g as c,k as p,h as a,Q as l,s}from"./chunks/framework.4e7d56ce.js";const j=JSON.parse('{"title":"05工具实践：基准测试JMH，精确测量方法性能","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4182) 05  工具实践：基准测试 JMH，精确测量方法性能.md","filePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4182) 05  工具实践：基准测试 JMH，精确测量方法性能.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 性能优化实战 21 讲_文档/(4182) 05  工具实践：基准测试 JMH，精确测量方法性能.md"},E=l("",12),y=l("",15),i=l("",31),F=l("",26),d=s("h4",{id:"_10-compilercontrol",tabindex:"-1"},[a("10. @CompilerControl "),s("a",{class:"header-anchor",href:"#_10-compilercontrol","aria-label":'Permalink to "10. @CompilerControl"'},"​")],-1),u=s("p",null,"这可以说是一个非常有用的功能了。",-1),C=s("p",null,"Java 中方法调用的开销是比较大的，尤其是在调用量非常大的情况下。拿简单的getter/setter 方法来说，这种方法在 Java 代码中大量存在。我们在访问的时候，就需要创建相应的栈帧，访问到需要的字段后，再弹出栈帧，恢复原程序的执行。",-1),h=s("p",null,"如果能够把这些对象的访问和操作，纳入目标方法的调用范围之内，就少了一次方法调用，速度就能得到提升，这就是方法内联的概念。如下图所示，代码经过 JIT 编译之后，效率会有大的提升。",-1),g=l("",9),m=l("",5),A=s("p",null,[s("strong",null,"meta-chart")],-1),B=s("p",null,[a("一个通用的 "),s("a",{href:"https://www.meta-chart.com/",target:"_blank",rel:"noreferrer"},"在线图表生成器"),a("（点击链接跳转），导出 CSV 文件后，做适当处理，即可导出精美图像。")],-1),D=s("p",null,"像 Jenkins 等一些持续集成工具，也提供了相应的插件，用来直接显示这些测试结果。",-1),_=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),v=s("p",null,[a("本课时主要介绍了 基准测试工具--- JMH，官方的 JMH 有非常丰富的示例，比如伪共享（FalseSharing）的影响等高级话题。我已经把它放在了 "),s("a",{href:"https://gitee.com/xjjdog/tuning-lagou-res",target:"_blank",rel:"noreferrer"},"Gitee"),a("（点击链接跳转）上，你可以将其导入至 Idea 编辑器进行测试。")],-1),k=s("p",null,"JMH 这个工具非常好用，它可以使用确切的测试数据，来支持我们的分析结果。一般情况下，如果定位到热点代码，就需要使用基准测试工具进行专项优化，直到性能有了显著的提升。",-1),b=s("p",null,"接下来的课程，将涉及对一些性能问题细节的验证，也会使用 JMH 进行进一步的分析。",-1);function S(T,q,M,f,I,N){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/38/FA/Ciqc1F8epk6ALUNZAABpIyGz37g324.png"}),a(),y,p(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/39/06/CgqCHl8epmWAWw_3AABS3CbQ8AE949.png"}),a(),i,p(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/38/FA/Ciqc1F8epneAFThuAABRpqRrEUw322.png"}),a(),F,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/38/CD/CgqCHl8ebZaAPtXOAAPe5vpFf_c784.png"}),a(),d,u,C,h,p(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/38/FA/Ciqc1F8epoqAI9u2AAB4h_ABJWE362.png"}),a(),g,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/38/C3/Ciqc1F8ebi2AdAAbAALlvsHgcKk925.png"}),a(),m,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/38/CE/CgqCHl8ebkmAbujsAAHK-g94ooM905.png"}),a(),A,B,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/38/CE/CgqCHl8eboKAHRe8AAGSfMVOXxw934.png"}),a(),D,_,v,k,b])}const O=o(r,[["render",S]]);export{j as __pageData,O as default};
