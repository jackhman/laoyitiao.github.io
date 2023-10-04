import{_ as i,j as o,o as r,g as n,k as t,Q as a,s as e,h as l}from"./chunks/framework.e0c66c3f.js";const N=JSON.parse('{"title":"权限分类 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1886) 第32讲：解析动态权限适配遇到的问题.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1886) 第32讲：解析动态权限适配遇到的问题.md","lastUpdated":1696338709000}'),p={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1886) 第32讲：解析动态权限适配遇到的问题.md"},c=a("",9),d=a("",11),_=e("p",null,"只有在高于 23 版本的系统中才需要动态申请权限，在申请之前还需要检查当前 App 是否已经获取到相应的权限，避免重复申请，如下所示：",-1),h=e("p",null,"上图中的 PackageManager.PERMISSION_GRANTED 表示权限已获取。",-1),u=e("p",null,"接下来就是申请权限的流程，上文中已经介绍在申请权限之前，需要调用 shouldShowRequestPermissionRationale 方法判断用户之前的操作，因此代码修改如下：",-1),g=e("p",null,"图中 1 处 shouldShowRequestPermissionRationale 返回 true，直接调用 requestPermission 再次申请权限即可。但是对于返回 false 的情况需要特殊处理，因为有 2 种情况返回 false。我们可以借助于 SharedPreference 来判断是否为用户第一次申请权限的操作，代码如下所示：",-1),m=e("p",null,"上图中使用 SharedPreference 来保存用户是否是第一次申请权限的状态值，默认情况为 true，当执行一次申请权限操作之后需要将其设置为 false。",-1),A=e("h3",{id:"权限申请操作封装",tabindex:"-1"},[l("权限申请操作封装 "),e("a",{class:"header-anchor",href:"#权限申请操作封装","aria-label":'Permalink to "权限申请操作封装"'},"​")],-1),P=e("p",null,"App 中会存在很多调用危险权限的代码，如果每一次执行这些代码都复制粘贴上图中的权限申请代码，会显得代码很冗余。因此我们可以将动态权限申请的操作封装到工程中的某个 Util 类中，并提供给调用者相应的回调接口。部分核心代码如下：",-1),q=e("p",null,"最后只需要在 BaseActivity 中，调用此方法时传入具体实现的 PermissionRequestListener 即可，如下所示：",-1),f=a("",6),S=a("",4);function k(T,b,v,C,E,R){const s=o("Image");return r(),n("div",null,[c,t(s,{alt:"1111.png",src:"https://s0.lgstatic.com/i/image/M00/2F/68/Ciqc1F8G3YGAJrl1AACChv-T4dA120.png"}),d,t(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/2F/52/CgqCHl8Gv6yAQZ_OAADjBdhnuiM380.png"}),_,t(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2F/47/Ciqc1F8Gv7OAaOl5AAFtm5WoMi8929.png"}),h,u,t(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/2F/47/Ciqc1F8Gv7uAWrNAAAJ2uuU_dG4235.png"}),g,t(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/2F/47/Ciqc1F8Gv8OAaueXAASkAMqGrG0285.png"}),m,A,P,t(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/2F/52/CgqCHl8Gv8-AYZiTAAzY68oUW5Q902.png"}),q,t(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2F/52/CgqCHl8Gv9aAAZZ2AAmHrI_zkLk847.png"}),f,t(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/2F/47/Ciqc1F8Gv-6AYLO4AABPhx3IiGQ762.png"}),S])}const I=i(p,[["render",k]]);export{N as __pageData,I as default};
