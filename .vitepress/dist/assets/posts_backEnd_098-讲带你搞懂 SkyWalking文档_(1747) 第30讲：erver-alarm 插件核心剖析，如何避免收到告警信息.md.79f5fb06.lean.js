import{_ as p,j as o,o as e,g as t,k as a,Q as l,s,h as c}from"./chunks/framework.4e7d56ce.js";const P=JSON.parse('{"title":"AlarmCore ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1747) 第30讲：erver-alarm 插件核心剖析，如何避免收到告警信息.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1747) 第30讲：erver-alarm 插件核心剖析，如何避免收到告警信息.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1747) 第30讲：erver-alarm 插件核心剖析，如何避免收到告警信息.md"},E=l("",21),y=l("",7),i=s("p",null,"下面是 18:30~18:31 这两分钟内，demo-webapp 服务对应的 Window 的变化情况。在图【1】中，该 Wondow 会调用 moveTo() 方法将 values 集合中的全部元素填充为 null，更新 endTime 为 18:30。同样是在 18:30 这一分钟内，该 RunningRule 收到了 18:30 对应的 service_resp_time 监控点，如图【2】所示，会通过 Window.add() 方法将其记录到 values 集合中：",-1),u=s("p",null,"随着时间的流逝，时间来到 18:31 分，AlarmCore 的后台 check 线程检查到距上次告警检查已经过去 1 分钟，会首先调用 moveTo() 方法更新该 Window 的 endTime 字段并更新 values（即抛弃最老的监控数据），如下图所示：",-1),d=s("p",null,"后台 check 线程完成 values 集合更新后会立即调用该 Window.checkAlarm() 方法进行告警检查，此时只有一个监控点且未达到阈值，不会触发告警。之后（还是在 18:31 这一分钟内）会收到新的监控点，如下图所示，同样会通过 Window.add() 记录到 values 集合中：",-1),m=s("p",null,"后台 check 线程在 18:32 分的行为类似，会更新 Window.endTime、更新 values 集合并进行告警检查，如下图所示，此时只有 18:31 分这一个点超过告警阈值，当前时间窗口依然不符合触发告警的条件。",-1),A=s("p",null,"在后续两分钟里，demo-webapp 服务的耗时都为 2s，下图展示了该 Window 在这两分钟的对应变化：",-1),g=s("p",null,"在 18：34 分的检查中首次满足告警条件，即当前时间窗口内有 3 个点超过 2s。",-1),F=s("p",null,"demo-webapp 服务在接下来两分钟的耗时分别为 1s 和 2s，该 Window 对应的变化如下图所示：",-1),h=s("p",null,"在 18:34~18:36 连续 3 次检查都符合了告警条件，此时才会真正发送告警信息。之后会进入 2 分钟的沉默期，如下图所示，虽然 18:37 和 18:38 两次检查都符合告警条件，但因为此时在沉默期内，都不会告警消息。",-1),C=s("p",null,"此时已经连续累积了 4 个时间窗口符合告警条件，接下来的 18:39 分检查结果无论是否符合告警条件，都会发送告警消息出去，并再次进入 2 分钟的沉默期，该过程与上述过程类似，不再展开描述。",-1),D=s("p",null,"通过分析 demo-webapp 响应时间的告警流程，相信你可以轻松地理解 server-alarm-plugin 插件告警的核心原理，具体的代码实现就留给你自己分析了。",-1),_=s("h3",{id:"notifyhandler",tabindex:"-1"},[c("NotifyHandler "),s("a",{class:"header-anchor",href:"#notifyhandler","aria-label":'Permalink to "NotifyHandler"'},"​")],-1),k=s("p",null,"在前面的章节中详细地介绍了 MetricsStreamProcessor 处理监控指标的核心逻辑，它会根据配置创建 Minute、Hour、Day、Month 四种不同 DownSampling 粒度的 MetricsPersistentWorker，分别对应 minutePersistentWorker、hourPersistentWorker、dayPersistentWorker、monthPersistentWorker，其中 minutePersistentWorker 与其他逻辑三个 MetricsPersistentWorker 对象相比，除了 DownSampling 粒度不同之外，还多封装了两个 Worker ------ AlarmNotifyWorker 和 ExportWorker。",-1),v=s("p",null,"从名字就能看出 AlarmNotifyWorker 与告警相关，OAP 收到的监控点就是通过该 Worker 进入上述告警流程的。当收到一个监控点（即 Metrics 对象）时，会经过如下组件：",-1),b=l("",7),S=l("",9);function T(R,B,f,M,w,L){const n=o("Image");return e(),t("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/29/C6/CgqCHl77FaKAbZTaAAC4W_ZFMnE073.png"}),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/29/BB/Ciqc1F77FbCAD42wAAFrmYbteBM986.png"}),i,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77Gk2AMA0ZAALbFV-nsm8496.png"}),u,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GlSAV1j5AAEkL4shzy4313.png"}),d,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GnOAGvmhAAJEKxLQ3E4580.png"}),m,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GnqATDeMAACt8uwPp9k199.png"}),A,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GoKAWDomAAKwgRmNiQc249.png"}),g,F,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GouAKUjQAAKMsltdt1Y452.png"}),h,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GpOAASBGAAMmjzGJu0o957.png"}),C,D,_,k,v,a(n,{alt:"9.png",src:"https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GrGAeKDVAAA2LYgGcXw505.png"}),b,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GruAGZICAAHBhdHdoB8058.png"}),S])}const W=p(r,[["render",T]]);export{P as __pageData,W as default};
