import{_ as l,j as p,o,h as i,k as n,f as a,Q as t,s}from"./chunks/framework.d3daa342.js";const K=JSON.parse('{"title":"第24讲：BDD及其自动化实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1609) 第24讲：BDD 及其自动化实践.md","filePath":"posts/devops/112-高效敏捷测试文档/(1609) 第24讲：BDD 及其自动化实践.md","lastUpdated":1696682708000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1609) 第24讲：BDD 及其自动化实践.md"},c=t("",24),D=t("",5),h=t("",10),u=s("br",null,null,-1),_=s("p",null,"Cucumber 自动把测试用例转译成 Step 代码，这样就可以方便添加相应的测试代码了，如下图所示：",-1),d=s("br",null,null,-1),b=s("br",null,null,-1),B=s("p",null,"为了方便理解，我用中文编写用户场景，在实践中，你完全可以替换成英文。除了 Given-When-Then，Cucumber 常用关键字还包括 Feature、Background、Scenario、Scenario Outline、And、OR、But 等。如果在一个 .feature 文件中的所有场景重复相同的 Given 步骤，那么就可以归并为 Background（背景）。以课程分享功能里面的生成推广海报这个用户故事为例，我列出了其中所有的用户场景。",-1),m=s("br",null,null,-1),g=s("br",null,null,-1),E=s("p",null,"如果几个场景只是取值不同，即业务的输入或输出数据是变化的，这时就可以使用 Scenario Outline（场景大纲），通过 Examples 表合并需要执行的数据，这也是完成了需求实例化，如下图所示：",-1),T=s("br",null,null,-1),A=s("br",null,null,-1),C=s("p",null,"这个 Scenario 会执行 2 次，对应 Examples 表中的每一行数据运行一次。关于需求实例化，下一讲将会详细讲解。",-1),v=s("br",null,null,-1),y=s("p",null,"Cucumber 还能同时做服务器和手机端的功能测试。Calabash 是一个服务于移动端 App 的验收测试框架，其中核心是 Cucumber，通过 Cucumber 将 Android 的测试框架 Robotium，以及 iOS 的测试框架 Frank 封装起来，使得 Cucumber 的 Step 可以调用 Robotium 或 Frank 进行测试。",-1),S=s("br",null,null,-1),R=s("p",null,"图 3 是 Calabash 的工作原理图，其中 Features 相当于前面所说的 Cucumber 的 feature 文件，Calabash Ruby API 是由 Ruby Client Library 支持并与 Instrumentation test server 或 Calabash HTTP server 连接，即实现 PC 端与模拟器或手机真机进行通信，驱动被测应用执行 UI 自动化操作。",-1),G=s("br",null,null,-1),k=s("p",null,"图3 Calabash 工作原理图",-1),f=s("br",null,null,-1),q=s("p",null,"Cucumber 做到了业务规范和具体的测试代码分离，并且非研发人员也可以编写业务规范。不仅如此，GWT 风格描述的用户场景让软件系统的行为更清晰，因此 Cucumber 不仅是一个自动化测试框架，更是一个团队进行需求沟通和协作的工具。但是单纯从自动化测试的角度来看，很多人觉得固定语法常常让人感觉写起来费时费力。",-1),P=s("br",null,null,-1),I=s("p",null,"虽然感觉 Cucumber 就是 BDD 的化身，但它也不一定是最好的或是最适合你的，可以看看其他 BDD 自动化测试框架是不是更适合自己。下面就将几个 BDD 自动化测试框架各自特点做一个比较，如表 1 所示，从而帮助你做出更明智的决定。",-1),N=s("br",null,null,-1),W=s("p",null,"表1 常用的 BDD 测试框架的区别和特点",-1),V=t("",13);function x(F,O,M,w,H,J){const e=p("Image");return o(),i("div",null,[c,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0E/33/Ciqah16TGROAILJqAAKyhUpH6Z8666.png"}),a(),D,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/04/CgoCgV6TGROANHiwAASMXPB5yF0074.png"}),a(),h,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/87/49/Cgq2xl6TGROAdGHJAAEv7Fl7VJk453.png"}),a(),u,_,d,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0E/33/Ciqah16TGRSAVfCgAARA7zDec9E615.png"}),a(),b,B,m,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/05/CgoCgV6TGRSANHh9AAaHQzh_6pE881.png"}),a(),g,E,T,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/87/49/Cgq2xl6TGRWAH70qAAFHKSD0fkE804.png"}),a(),A,C,v,y,S,R,G,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0E/33/Ciqah16TGRWAEoawAARdN245bdQ127.png"}),a(),k,f,q,P,I,N,W,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/05/CgoCgV6TGRWARvRPAAHR7ihmgAg784.png"}),a(),V])}const $=l(r,[["render",x]]);export{K as __pageData,$ as default};
