import{_ as l,j as p,o as i,g as c,k as a,Q as e,s,h as n}from"./chunks/framework.e0c66c3f.js";const B=JSON.parse('{"title":"技术配置 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(367) 第44讲：接口测试持续集成.md","filePath":"posts/devops/110-测试开发核心技术文档/(367) 第44讲：接口测试持续集成.md","lastUpdated":1696338709000}'),o={name:"posts/devops/110-测试开发核心技术文档/(367) 第44讲：接口测试持续集成.md"},r=e("",9),g=e("",6),u=s("p",null,"在 JenKins 节点上 Job Build 过程中执行 Execute shell 的时候，我们把上述流程加进去，在构建的时候它就会自动执行。",-1),d=s("h3",{id:"结果分析",tabindex:"-1"},[n("结果分析 "),s("a",{class:"header-anchor",href:"#结果分析","aria-label":'Permalink to "结果分析"'},"​")],-1),h=s("p",null,"在上述过程中，我们通过两个参数分别生成了 junit 的测试结果和 allure 的测试结果。我们该如何进行结果分析呢？",-1),_=s("h4",{id:"junit-xml-文件",tabindex:"-1"},[n("junit.xml 文件 "),s("a",{class:"header-anchor",href:"#junit-xml-文件","aria-label":'Permalink to "junit.xml 文件"'},"​")],-1),m=s("p",null,"我们可以将 junit.xml 测试报告添加到 Post Build 过程中，填入 junit.xml 文件路径，JenKins 就会帮我们自动分析测试结果，如下图所示：",-1),A=s("h4",{id:"allure-文件",tabindex:"-1"},[n("allure 文件 "),s("a",{class:"header-anchor",href:"#allure-文件","aria-label":'Permalink to "allure 文件"'},"​")],-1),E=s("p",null,"对于 post build allure2 的结果，我们需要使用独立的 Allure Report 插件，安装之后，在 post build 的过程中添加 allure report 配置，之后填入 allure_results 文件路径，如下图所示：",-1),v=s("p",null,"等所有的结果运行完成之后，就会生成这一个清晰的数据报表，如下图所示：",-1),y=s("h3",{id:"项目配置",tabindex:"-1"},[n("项目配置 "),s("a",{class:"header-anchor",href:"#项目配置","aria-label":'Permalink to "项目配置"'},"​")],-1),C=s("p",null,"接下来，我们看一下真实的项目是如何配置的。首先，是技术的配置，这里我们固定了工作节点，如下图所示：",-1),b=s("p",null,"然后，原代码的技术配置，如下图所示：",-1),q=s("p",null,"接下来是构建的流程，这里，既可以选择周期性部署，也可以选在代码更新后自动部署。我设置的是当代码有更新时，每隔5分钟检测一次，如果没有代码更新，也会每隔10分钟构建一次，如下图所示：",-1),D=s("p",null,"在 Build 里面，就是执行我们前面讲到的相关命令，如图所示：",-1),x=s("p",null,"接下来在 Post-build 里面，我们填 allure_results 和 junit.xml 的测试结果。",-1),w=s("p",null,"了解了这些配置之后，我们来运行一下测试用例，会生成相关的分析报告，如下图所示。",-1),L=s("p",null,"最终我们会得到详细的分析结果，如下图所示，在 categories 里面会罗列存在的 bug：",-1),W=s("p",null,"在 suits 中会展示现有的 case：",-1),k=s("p",null,"在 graphs 中是所有测试结果图标展示：",-1),f=s("p",null,"在 timeline 中是 case 分类执行的情况：",-1),M=s("p",null,"在behaviors 中是每个 case 的执行情况：",-1),P=s("p",null,"在 packages 中会根据包罗列 case：",-1),j=s("p",null,"最后是测试结果的列表，展示了所有的测试结果，这里跟 allure 很像，如下图所示：",-1),T=s("p",null,"通过上述流程，我们就完成了接口测试持续集成的学习。",-1);function H(R,I,S,F,N,J){const t=p("Image");return i(),c("div",null,[r,a(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLJGAfb2dAAL0aLxvgT0179.png"}),g,a(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/Ciqc1F7WLJyACk1CAAHFbPUuvis905.png"}),u,d,h,_,m,a(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/Ciqc1F7WLKSAK6ZRAAFvlG8umI4600.png"}),A,E,a(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLKqAJQA2AADGJR8OaW4827.png"}),v,a(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLLGAfoqXAANdJw2W4tA646.png"}),y,C,a(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLL2AULJbAAGKpubBS5Y645.png"}),b,a(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLMWAZEs8AAFPajJz6I8086.png"}),q,a(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLMuABhZ-AAGtY2RlrlY927.png"}),D,a(t,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLNKAArKbAAGDvRqNbyg043.png"}),x,a(t,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLNmAXeuiAAHw4RB_QVI761.png"}),w,a(t,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLOGAIIZyAAIbs0CAsUo348.png"}),a(t,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLOiAAbBfAAGfKZwgnPc239.png"}),L,a(t,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLO-AU0XwAAR7bKKzgXo804.png"}),W,a(t,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLPWAQ6spAAIuZz1c698714.png"}),k,a(t,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/16/E9/CgqCHl7WLPyAH6d2AAHYXfCOmqE451.png"}),f,a(t,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/16/EA/CgqCHl7WLQSAfAWwAAOckuWr_W8669.png"}),M,a(t,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/16/EA/CgqCHl7WLQuAO-B5AAE3ifs-L0U493.png"}),P,a(t,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLRKAfR4NAALe0sRdxOk618.png"}),j,a(t,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLR2ATt6AAAEwp2snRL0400.png"}),a(t,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/16/EA/CgqCHl7WLSSARqV7AAIZL6krv30854.png"}),a(t,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/16/DE/Ciqc1F7WLSuAYDATAAJT7NyH1OA565.png"}),T])}const O=l(o,[["render",H]]);export{B as __pageData,O as default};
