import{_ as l,j as o,o as e,g as c,k as n,s as a,h as t,Q as p}from"./chunks/framework.e0c66c3f.js";const q=JSON.parse('{"title":"自动刷新的问题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(2268) 第08讲：如何让你的模块支持热替换（HMR）机制？.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(2268) 第08讲：如何让你的模块支持热替换（HMR）机制？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/102-Webpack原理与实践文档/(2268) 第08讲：如何让你的模块支持热替换（HMR）机制？.md"},E=a("p",null,"在第六讲中我们已经简单了解了 Webpack Dev Server 的一些基本用法和特性，它为我们使用 Webpack 构建的项目，提供了一个比较友好的开发环境和一个用于调试的开发服务器。",-1),y=a("p",null,"使用 Webpack Dev Server 就可以让我们在开发过程中专注编码，因为它可以自动监视我们代码的变化然后自动进行打包，最后通过自动刷新的方式同步到浏览器以便于我们即时预览，效果如下：",-1),i=a("h3",{id:"自动刷新的问题",tabindex:"-1"},[t("自动刷新的问题 "),a("a",{class:"header-anchor",href:"#自动刷新的问题","aria-label":'Permalink to "自动刷新的问题"'},"​")],-1),d=a("p",null,"但是当你实际去使用 Webpack Dev Server 自动刷新的特性去完成具体的开发任务时，你会发现还是有一些不舒服的地方。",-1),F=a("p",null,"例如，这里是一个编辑器应用，我想要即时调试这个编辑器中内容文本的样式。那正常的操作肯定是我先尝试在编辑器里面去添加一些文本，作为展示样例，再回到开发工具中，找到控制编辑器样式的 CSS 文件，然后进行编辑，具体操作如下：",-1),h=p("",14),g=a("p",null,"有了 HMR 支持后，我们同样先在页面中随意添加一些内容，也就是为页面制造一些运行状态，然后我们回到开发工具中，再来尝试修改文本的样式，保存过后页面并没有整体刷新，而且我们能立即看到最新的样式。这种体验相对于自动刷新会友好很多。",-1),A=a("p",null,"HMR 对于项目中其他代码文件的修改，也可以有相同的热更新体验。你可以再去尝试修改一下 JS 文件，保存过后，浏览器中同样不会刷新页面，而是直接执行了你刚刚修改的这个模块，具体效果如下：",-1),u=p("",14),m=p("",33),C=p("",5),D=p("",16),_=p("",5),b=a("p",null,"第二个问题，对于使用了 HMR API 的代码，如果我们在没有开启 HMR 功能的情况下运行 Webpack 打包，此时运行环境中就会报出 Cannot read property 'accept' of undefined 的错误，具体错误信息如下：",-1),v=p("",5),k=p("",7);function M(R,H,B,f,S,j){const s=o("Image");return e(),c("div",null,[E,y,n(s,{alt:"live-reloading.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1D/Ciqc1F67uVGANMuRAAwzuBVY37c734.gif"}),i,d,F,n(s,{alt:"live-reloading-issue.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1D/Ciqc1F67uV2ASstCAA8cz1bBH8g073.gif"}),h,n(s,{alt:"hmr-experience.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1D/Ciqc1F67uWqAImJxAA3J0FNFIDo287.gif"}),g,A,n(s,{alt:"hmr-experience-js.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1D/Ciqc1F67uXOAc64lAA4l0No8gOk355.gif"}),u,n(s,{alt:"js-live-reloading.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1D/Ciqc1F67uY6AWK-DAAo_tpO6GaI873.gif"}),m,n(s,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/09/1D/Ciqc1F67uZ6AU5wjAAvFBUDd75g274.png"}),C,n(s,{alt:"module-hot.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1E/CgqCHl67uamADY97AA4Ht2ooOXA786.gif"}),D,n(s,{alt:"hmr-error.gif",src:"https://s0.lgstatic.com/i/image/M00/09/1E/Ciqc1F67ubeAT4knAA-uyhsCyD0801.gif"}),_,n(s,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/09/1E/Ciqc1F67ucCAB6tmAAw05eRHK1o555.png"}),b,n(s,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/09/1E/Ciqc1F67ucaABUSHAAFH9zDbzcU466.png"}),v,n(s,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/09/1E/Ciqc1F67uc6ACTacAAGT2VwSBrk938.png"}),k])}const P=l(r,[["render",M]]);export{q as __pageData,P as default};
