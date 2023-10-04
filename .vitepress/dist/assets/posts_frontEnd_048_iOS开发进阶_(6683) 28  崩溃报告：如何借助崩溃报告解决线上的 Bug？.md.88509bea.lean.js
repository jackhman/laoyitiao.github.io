import{_ as o,j as e,o as t,g as c,k as n,Q as p,s,h as l}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"配置 Crashlytics ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6683) 28  崩溃报告：如何借助崩溃报告解决线上的 Bug？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6683) 28  崩溃报告：如何借助崩溃报告解决线上的 Bug？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6683) 28  崩溃报告：如何借助崩溃报告解决线上的 Bug？.md"},i=p("",8),y=p("",6),E=p("",14),d=s("p",null,"报告中最关键的信息是堆栈回溯（Trace Stack），它会把 App 闪退前所调用的方法名称、代码执行的行号都按顺序依次打印出来，这样能方便我们对照着源码来定位问题。",-1),_=s("p",null,"另外，Crashlytics 还能把收集到的设备信息显示出来，方便我们重现和诊断问题，这些信息如下图所示：",-1),h=s("p",null,"如果我们同时使用了 Firebase 的统计分析服务，那么 Crashlytics 还会给我们提供闪退前的用户行为事件，方便我们按照这些步骤来重现问题，如下图所示：",-1),u=s("p",null,"除了提供崩溃报告以外，Crashlytics 还能提供可配置的警告信息，Crashlytics 会根据崩溃率的阈值来给我们及时发送警告通知。例如，下面的配置表示当有 0.1% 的用户在最近一小时内发生闪退时就发送警告通知。",-1),g=s("h3",{id:"性能报告",tabindex:"-1"},[l("性能报告 "),s("a",{class:"header-anchor",href:"#性能报告","aria-label":'Permalink to "性能报告"'},"​")],-1),C=s("p",null,[l("因为我们安装了"),s("code",null,"Firebase/Performance"),l("Pod，所以 Firebase 会自动生成性能监控报告，如下图所示：")],-1),m=s("p",null,"这些报告能为我们提供网络运行状态、屏幕呈现速度、App 启动速度等指标。",-1),b=s("p",null,"这里我们还可以为各个指标配置不同阈值与目标值来进一步监控 App 的性能状况。比如，下图显示了 App 启动速度指标的详细信息。",-1),F=p("",9);function A(S,f,q,B,v,M){const a=e("Image");return t(),c("div",null,[i,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/41/5A/CioPOWCrg9uAHGPoAAMmXqOKJGo185.png"}),y,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/41/C7/CioPOWCt9oiAGLfXAASImtow89w029.png"}),E,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/41/51/Cgp9HWCrg_GAVqX7AAJUyq4Wg7c868.png"}),d,_,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/41/51/Cgp9HWCrg_aASscLAAB9tjkKGTA430.png"}),h,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/41/5A/CioPOWCrg_uAWvqlAACNjcsm3ps311.png"}),u,n(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/41/C7/CioPOWCt9vKASHf_AAGEXm8i864118.png"}),g,C,n(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/41/C7/CioPOWCt9xqABA89AAUscXwHDVg298.png"}),m,b,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/41/52/Cgp9HWCrhBSAMMylAAIEEs1Bhvk758.png"}),F])}const P=o(r,[["render",A]]);export{I as __pageData,P as default};
