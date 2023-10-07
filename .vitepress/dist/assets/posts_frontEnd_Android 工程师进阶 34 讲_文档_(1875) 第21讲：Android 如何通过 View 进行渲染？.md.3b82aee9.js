import{_ as s,j as r,o as l,g as n,k as i,h as a,Q as o,s as e}from"./chunks/framework.4e7d56ce.js";const be=JSON.parse('{"title":"第21讲：Android如何通过View进行渲染？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1875) 第21讲：Android 如何通过 View 进行渲染？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1875) 第21讲：Android 如何通过 View 进行渲染？.md","lastUpdated":1696417798000}'),p={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1875) 第21讲：Android 如何通过 View 进行渲染？.md"},d=o('<h1 id="第21讲-android如何通过view进行渲染" tabindex="-1">第21讲：Android如何通过View进行渲染？ <a class="header-anchor" href="#第21讲-android如何通过view进行渲染" aria-label="Permalink to &quot;第21讲：Android如何通过View进行渲染？&quot;">​</a></h1><p>在上一课时介绍 Activity、Window 和 View 之间的关系时，我们了解了 ViewRootImpl 在整个流程中，起着承上启下的作用。</p><p>一方面 ViewRootImpl 中通过 Binder 通信机制，远程调用 WindowSession 将 View 添加到 Window 中。</p><p>另一方面，ViewRootImpl 在添加 View 之前，又需要调用 requestLayout 方法，执行完整的 View 树的渲染操作。</p><h3 id="屏幕绘制" tabindex="-1">屏幕绘制 <a class="header-anchor" href="#屏幕绘制" aria-label="Permalink to &quot;屏幕绘制&quot;">​</a></h3><h4 id="viewrootimpl-requestlayout-流程" tabindex="-1">ViewRootImpl requestLayout 流程 <a class="header-anchor" href="#viewrootimpl-requestlayout-流程" aria-label="Permalink to &quot;ViewRootImpl requestLayout 流程&quot;">​</a></h4>',6),c=e("p",null,"requestLayout 第一次被调用是在 setView 方法中，从名字也能看出，这个方法的主要目的就是请求布局操作，其中包括 View 的测量、布局、绘制等。具体代码如下：",-1),_=e("p",null,"说明：",-1),h=e("p",null,"注释 1 处检查是否为合法线程，一般情况下就是检查是否为主线程。",-1),w=e("p",null,"注释 2 处将请求布局标识符设置为 true，这个参数决定了后续是否需要执行 measure 和 layout 操作。",-1),u=e("p",null,"最后执行 scheduleTraversals 方法，如下：",-1),m=e("p",null,"说明：",-1),g=e("p",null,[a("注释 1 处向主线程消息队列中插入 SyncBarrier Message。该方法发送了一个没有 target 的 Message 到 Queue 中，在 next 方法中获取消息时，如果发现没有 target 的 Message，则在一定的时间内跳过同步消息，优先执行"),e("strong",null,"异步消息"),a("。这里通过调用此方法，保证 UI 绘制操作优先执行。")],-1),A=e("p",null,"注释 2 处调用 Choreographer 的 postCallback 方法，实际上也是发送一个 Message 到主线程消息队列。",-1),V=e("p",null,"Choreographer 的 postCallback 的执行流程如下：",-1),D=e("p",null,"可以看出最终通过 Handler 发送到 MessageQueue 中的 Message 被设置为异步类型的消息。",-1),C=e("p",null,"mTraversalRunnable 是一个实现 Runnable 接口的 TraversalRunnable 类型对象，其 run 方法如下：",-1),I=e("p",null,"可以看出，在 run 方法中调用了 doTraversal 方法，并最终调用了 performTraversals() 方法，这个方法就是真正的开始 View 绘制流程：measure --> layout --> draw 。",-1),v=e("h4",{id:"viewrootimpl-的-performtraversals-方法",tabindex:"-1"},[a("ViewRootImpl 的 performTraversals 方法 "),e("a",{class:"header-anchor",href:"#viewrootimpl-的-performtraversals-方法","aria-label":'Permalink to "ViewRootImpl 的 performTraversals 方法"'},"​")],-1),f=e("p",null,"这个方法是一个比较重的方法，查看源码发现总共将近 900 行代码。但是抽取一下核心部分代码，这个方法实际上只负责做 3 件事情：",-1),R=e("p",null,"很明显，实际就是执行了我们在自定义 View 课时中学习的 3 个主要过程。",-1),q=e("p",null,"接下来以测量 performMeasure 实现举例。",-1),M=e("h4",{id:"viewrootimpl-的-measurehierarchy",tabindex:"-1"},[a("ViewRootImpl 的 measureHierarchy "),e("a",{class:"header-anchor",href:"#viewrootimpl-的-measurehierarchy","aria-label":'Permalink to "ViewRootImpl 的 measureHierarchy"'},"​")],-1),b=e("p",null,"我们知道 View 的测量是一层递归调用，递归执行子 View 的测量工作之后，最后决定父视图的宽和高。但是这个递归的起源是在哪里呢？答案就是 DecorView。因为在 measureHierarchy 方法中最终是调用 performMeasure 方法来进行测量工作的，所以我们直接看 performMeasure 方法的实现，如下所示：",-1),y=e("p",null,'在这个方法中，通过 getRootMeasureSpec 方法获取了根 View的MeasureSpec，实际上 MeasureSpec 中的宽高此处获取的值是 Window 的宽高。关于 MeasureSpec 的介绍可以查看第15课时"自定义 View"。',-1),T=e("h4",{id:"viewrootimpl-的-performmeasure",tabindex:"-1"},[a("ViewRootImpl 的 performMeasure "),e("a",{class:"header-anchor",href:"#viewrootimpl-的-performmeasure","aria-label":'Permalink to "ViewRootImpl 的 performMeasure"'},"​")],-1),P=e("p",null,"这个方法很简单，只是执行了 mView 的 measure 方法，这个 mView 就是 DecorVIew。其 DecorView 的 measure 方法中，会调用 onMeasure 方法，而 DecorView 是继承自 FrameLayout 的，因此最终会执行 FrameLayout 中的 onMeasure 方法，并递归调用子 View 的 onMeasure 方法。",-1),W=e("blockquote",null,[e("p",null,"performLayout 也是类似的过程，就不再赘述。")],-1),x=e("h4",{id:"viewrootimpl-的-performdraw",tabindex:"-1"},[a("ViewRootImpl 的 performDraw "),e("a",{class:"header-anchor",href:"#viewrootimpl-的-performdraw","aria-label":'Permalink to "ViewRootImpl 的 performDraw"'},"​")],-1),S=e("p",null,"从图中可以看出，在 performDraw 方法中，调用的 ViewRootImpl 的 draw 方法。在 draw 方法中进行 UI 绘制操作，Android 系统提供了 2 种绘制方式：",-1),L=e("ul",null,[e("li",null,"图中 1 处表示 App 开启了硬件加速功能，所以会启动硬件加速绘制；"),e("li",null,"图中 2 处表示使用软件绘制。")],-1),F=e("blockquote",null,[e("p",null,"ViewRootImpl 中有一个非常重要的对象 Surface，之所以说 ViewRootImpl 的一个核心功能就是负责 UI 渲染，原因就在于在 ViewRootImpl 中会将我们在 draw 方法中绘制的 UI 元素，绑定到这个 Surface 上。如果说 Canvas 是画板，那么 Surface 就是画板上的画纸，Surface 中的内容最终会被传递给底层的 SurfaceFlinger，最终将 Surface 中的内容进行合成并显示的屏幕上。")],-1),U=e("h4",{id:"软件绘制-drawsoftware",tabindex:"-1"},[a("软件绘制 drawSoftware "),e("a",{class:"header-anchor",href:"#软件绘制-drawsoftware","aria-label":'Permalink to "软件绘制 drawSoftware"'},"​")],-1),k=e("p",null,"图中 1 处就是调用 DecorView 的 draw 方法将 UI 元素绘制到画布 Canvas 对象中，具体可以绘制的内容在自定义 View 课时已经介绍过了。",-1),B=e("p",null,"图中 2 处请求将 Canvas 中的内容显示到屏幕上，实际上就是将 Canvas 中的内容提交给 SurfaceFlinger 进行合成处理。",-1),E=e("p",null,"默认情况下软件绘制没有采用 GPU 渲染的方式，drawSoftware 工作完全由 CPU 来完成。",-1),O=e("p",null,"DecorView 并没有复写 draw 方法，因此实际是调用的顶层 View 的 draw 方法，如下：",-1),H=e("p",null,"解释说明：",-1),G=e("ul",null,[e("li",null,"图中 1 处绘制 View 的背景；"),e("li",null,"图中 2 处绘制 View 自身内容；"),e("li",null,"图中 3 处表示对 draw 事件进行分发，在 View 中是空实现，实际调用的是 ViewGroup 中的实现，并递归调用子 View 的 draw 事件。")],-1),N=e("h3",{id:"启用硬件加速",tabindex:"-1"},[a("启用硬件加速 "),e("a",{class:"header-anchor",href:"#启用硬件加速","aria-label":'Permalink to "启用硬件加速"'},"​")],-1),Q=e("h4",{id:"是否启用硬件加速",tabindex:"-1"},[a("是否启用硬件加速 "),e("a",{class:"header-anchor",href:"#是否启用硬件加速","aria-label":'Permalink to "是否启用硬件加速"'},"​")],-1),Y=e("p",null,"可以在 ViewRootImpl 的 draw 方法中，通过如下方法判断是否启用硬件加速：",-1),K=e("p",null,"我们可以在 AndroidManifest 清单文件中，指定 Application 或者某一个 Activity 支持硬件加速，如下：",-1),j=e("p",null,"此外我们还可以进行粒度更小的硬件加速设置，比如设置某个 View 支持硬件加速：",-1),J=o('<p>之所以会有这么多级的支持区分，主要是因为并不是所有的 2D 绘制操作都支持硬件加速，当在自定义 View 中使用了如下 API，则有可能造成程序工作不正常：</p><p>Canvas</p><ul><li>clipPath()</li><li>clipRegion()</li><li>drawPicture()</li><li>drawPosText()</li><li>drawTextOnPath()</li><li>drawVertices()</li></ul><p>Paint</p><ul><li>setLinearText()</li><li>setMaskFilter()</li><li>setRasterizer()</li></ul><h4 id="硬件加速优势" tabindex="-1">硬件加速优势 <a class="header-anchor" href="#硬件加速优势" aria-label="Permalink to &quot;硬件加速优势&quot;">​</a></h4><p>接下来，看下为什么硬件加速能够提高 UI 渲染的性能。再看 ViewRootImpl 的 draw 方法：</p>',7),Z=e("p",null,"图中 mThreadRenderer 是 ThreadRenderer 类型，其 draw 方法具体如下：",-1),z=e("p",null,"图中注释 1 处就是硬件加速的特殊之处，通过 updateRootDisplayList 方法将 View 视图抽象成一个 RenderNode 对象，并构建 View 的 DrawOp 树。",-1),$=e("p",null,"图中 2 处通知 RenderThread 进行绘制操作，RenderThread 是一个单例线程，每个进程最多只有一个硬件渲染线程，这样就不会存在多线程并发访问冲突问题。",-1),X=e("p",null,"updateRootDisplayList 具体如下：",-1),ee=e("p",null,"Android 硬件加速过程中，View 视图被抽象成 RenderNode 节点，View 中的绘制操作都会被抽象成一个个 DrawOp，比如 View中drawLine，构建过程中就会被抽象成一个 DrawLineOp，drawBitmap 操作会被抽象成 DrawBitmapOp。每个子 View 的绘制被抽象成 DrawRenderNodeOp，每个 DrawOp 有对应的 OpenGL 绘制命令。",-1),ae=e("p",null,"上图中 1 处就是遍历 View 递归构建 DrawOp，2 处就是根据 Canvas 将所有的 DrawOp 进行缓存操作。所有的 DrawOp 对应的 OpenGL 命令构建完成之后，就需要使用 RenderProxy 向 RenderThread 发送消息，请求 OpenGL 线程进行渲染。整个渲染过程是通过 GPU 并在不同线程绘制渲染图形，因此整个流程会更加顺畅。",-1),te=e("h4",{id:"invalidate-轻量级刷新",tabindex:"-1"},[a("Invalidate 轻量级刷新 "),e("a",{class:"header-anchor",href:"#invalidate-轻量级刷新","aria-label":'Permalink to "Invalidate 轻量级刷新"'},"​")],-1),ie=e("p",null,"如果你做过开发应该用过 invalidate 来刷新 View，这个方法跟 requestLayout 的区别在于，它不一定会触发 View 的 measure 和 layout 的操作，多数情况下只会执行 draw 操作。",-1),oe=e("p",null,"在 View 的 measure 方法中，有如下几行代码：",-1),se=e("p",null,"可以看出，如果要触发 onMeasure 方法，需要对 View 设置 PFLAG_FORCE_LAYOUT 标志位，而这个标志位在 requestLayout 方法中被设置，invalidate 并没有设置此标志位。",-1),re=e("p",null,"再看下 onLayout 方法：",-1),le=e("p",null,"可以看出，当 View 的位置发送改变，或者添加 PFLAG_FORCE_LAYOUT 标志位后 onLayout 才会被执行。当调用 invalidate 方法时，如果 View 的位置并没有发生改变，则 View 不会触发重新布局的操作。",-1),ne=e("h4",{id:"postinvalidate",tabindex:"-1"},[a("postInvalidate "),e("a",{class:"header-anchor",href:"#postinvalidate","aria-label":'Permalink to "postInvalidate"'},"​")],-1),pe=e("p",null,"说到 invalidate 就不得不说一下 postInvalidate，不光是因为面试中经常被问到，实际开发中使用频率也是较高。",-1),de=e("p",null,"它们两者之间的区别就是 invalidate 是在 UI 线程调用，postInvalidate 是在非 UI 线程调用。",-1),ce=e("p",null,"postInvalidate 的实现如下：",-1),_e=e("p",null,"最终还是在 ViewRootImpl 中进行操作。",-1),he=e("h4",{id:"viewrootimpl-的-dispatchinvalidatedelayed",tabindex:"-1"},[a("ViewRootImpl 的 dispatchInvalidateDelayed "),e("a",{class:"header-anchor",href:"#viewrootimpl-的-dispatchinvalidatedelayed","aria-label":'Permalink to "ViewRootImpl 的 dispatchInvalidateDelayed"'},"​")],-1),we=e("p",null,"在非 UI 线程中，通过 Handler 发送了一个延时 Message，因为 Handler 是在主线程中创建的，所以最终 handlerMessage 会在主线程中被执行，方法如下：",-1),ue=e("p",null,"上图中的 msg.obj 就是发送 postInvalidate 的 View 对象，可以看出最终还是回到 UI 线程执行了 View 的 invalidate 方法。",-1),me=e("p",null,[e("strong",null,"个人理解"),a("：做过 Android 开发的都知道只有 UI 线程才可以刷新 View 控件，但是事实却并非如此。在 ViewRootImpl 中对 View 进行刷新时，会检查当前线程的合法性：")],-1),ge=e("p",null,"图中 mThread 是被赋值为当前线程，而 ViewRootImpl 是在 UI 线程中被创建的，因此只有 UI 线程可以进行 View 刷新。但是如果我们能在非 UI 线程中创建 ViewRootImpl，并通过这个 ViewRootImpl 进行 View 的添加和绘制操作，那么后续理论上也是可以在非 UI 线程中刷新 View 控件的，只是维护成本较高，很少有人去做这件事情。",-1),Ae=e("h3",{id:"总结",tabindex:"-1"},[a("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),Ve=e("p",null,"至此 View 的工作流程的大致整体已经描述完毕了，做一下总结。本课时主要介绍了 ViewRootImpl 是如何执行 View 的渲染操作的，其中核心方法在 performTraversals 方法中会按顺序执行 measure-layout-draw 操作。并顺带介绍了软件绘制和硬件加速的区别，最后介绍了 View 刷新的两种方式 Invalidate 和 postInvalidate。",-1);function De(Ce,Ie,ve,fe,Re,qe){const t=r("Image");return l(),n("div",null,[d,i(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/16/C8/CgqCHl7WDlCAeAPUAAGFbv2WWtE729.png"}),a(),c,i(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDliACqDnAACLhxORyNU400.png"}),a(),_,h,w,u,i(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDnKAE5bEAADr-hOeT7c204.png"}),a(),m,g,A,V,i(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDmKANFtlAALhxsMs9iU294.png"}),a(),D,C,i(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDnyAFJzqAAGK-YCFG4Q860.png"}),a(),I,v,f,i(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/16/C8/CgqCHl7WDoSAWZbvAADYcHBoqeI812.png"}),a(),R,q,M,b,i(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDoyAFEyEAAH8ZASrUuA900.png"}),a(),y,T,i(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDpSAGnncAAEEdynruCQ210.png"}),a(),P,W,x,i(t,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDp2AdB5MAAGhEZyszW4993.png"}),a(),S,L,F,U,i(t,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDqaAKgJLAAEkjkmYIYM648.png"}),a(),k,B,E,O,i(t,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDq6Af5IAAAYyxWxdF9o888.png"}),a(),H,G,N,Q,Y,i(t,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDraAJ9ZlAABqmEhIDCw023.png"}),a(),K,i(t,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDr2AQxK3AAB2-Q9A-7U911.png"}),a(),j,i(t,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDsSAAVO5AACzRKtZ2EI576.png"}),a(),J,i(t,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDsyADbbKAAC-kGeLnrQ221.png"}),a(),Z,i(t,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/16/BD/Ciqc1F7WDtOAUoc6AAEpLsoDeF4936.png"}),a(),z,$,X,i(t,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDtuAcV5jAARjA_A5JGU433.png"}),a(),ee,ae,te,ie,oe,i(t,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDuSAS5Q3AAD2vQh4q2Q362.png"}),a(),se,re,i(t,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDuuABTjaAADaaiuHx4A929.png"}),a(),le,ne,pe,de,ce,i(t,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/16/BE/Ciqc1F7WDvKAO-ATAAD_ImH55fQ360.png"}),a(),_e,he,i(t,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/16/BE/Ciqc1F7WDvqAaBciAACf9B7bw-o687.png"}),a(),we,i(t,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDwGALvleAADn6lvsgqo628.png"}),a(),ue,me,i(t,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image/M00/16/C9/CgqCHl7WDweAYfN8AAEWYlH4C2g694.png"}),a(),ge,Ae,Ve])}const ye=s(p,[["render",De]]);export{be as __pageData,ye as default};
