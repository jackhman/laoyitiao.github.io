import{_ as l,D as e,o as t,g as c,J as p,h as s,Q as o,m as n}from"./chunks/framework.f67d7268.js";const I=JSON.parse('{"title":"25自动化构建：解决大量重复性人力工作神器","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6680) 25  自动化构建：解决大量重复性人力工作神器.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6680) 25  自动化构建：解决大量重复性人力工作神器.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6680) 25  自动化构建：解决大量重复性人力工作神器.md"},i=o("",14),E=o("",16),y=n("p",null,"在图中有一个名为 embedded.mobileprovision 的 Provisioning Profile 文件，你可以打开该文件来查看相关内容，如下图所示：",-1),d=o("",6),u=n("p",null,[n("code",null,"ipa_path"),s("参数接收的是 IPA 文件的路径。当我们执行完上面的"),n("code",null,"archive_internal"),s("命令以后，根目录会生成一个名叫 Moments.ipa 的文件，我们把该文件名传递给"),n("code",null,"ipa_path"),s("参数即可。")],-1),F=n("p",null,[n("code",null,"groups"),s("参数用于指定测试组。在 Firebase 网站上打开 App Distribution -> Testers and Groups 就可以看到测试组。在 Moments App 项目里，我们配置了一个名叫 internal-testers 的测试组，如下图所示：")],-1),_=o("",5),g=n("p",null,[s("我们可以把这个 Token 信息也放到 local.keys 文件里面，这样就能通过环境变量"),n("code",null,"FIREBASE_API_TOKEN"),s("来提供给 fastlane 使用了。")],-1),C=n("p",null,[s("至此，我们已经完成了上传到 Firebase App 分发服务的所有配置。请注意，这些配置只需要执行一次，以后任何开发者或者 CI 都可以方便地执行"),n("code",null,"deploy_internal"),s("命令来完成上传操作。当上传完毕后，我们可以在 Firebase 网站上看到各个版本，如下图所示：")],-1),m=n("p",null,"同时，测试者也能在手机上看到最新的版本，如下图所示：",-1),h=o("",12);function q(A,b,B,f,v,k){const a=e("Image");return t(),c("div",null,[i,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/3F/EC/Cgp9HWCiSPyAYEIRAAUgbfbdYaM382.png"}),s(),E,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/D4/Cgp9HWCiCkOALAJ1AAEF7RK-scI993.png"}),s(),y,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/D4/Cgp9HWCiCkiAd4TxAAGYCDQpM2k855.png"}),s(),d,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/DC/CioPOWCiClOAF5DMAAI5dJ-pBIU662.png"}),s(),u,F,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/DC/CioPOWCiClmAJsjxAAGsz1GasqA461.png"}),s(),_,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/D4/Cgp9HWCiCmCAFw7fAAIpk8yrsEA370.png"}),s(),g,C,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/3F/EC/Cgp9HWCiSMuAInUGAAWIaVp5nWU208.png"}),s(),m,p(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/3F/D4/Cgp9HWCiCm2AQVxJAAN6wuVJh64174.png"}),s(),h])}const S=l(r,[["render",q]]);export{I as __pageData,S as default};
