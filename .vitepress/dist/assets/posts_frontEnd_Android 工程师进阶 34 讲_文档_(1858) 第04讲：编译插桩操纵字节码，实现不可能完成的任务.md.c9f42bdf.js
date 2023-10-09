import{_ as r,j as i,o as n,h as e,k as a,f as t,Q as o,s as l}from"./chunks/framework.d3daa342.js";const lt=JSON.parse('{"title":"第04讲：编译插桩操纵字节码，实现不可能完成的任务","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1858) 第04讲：编译插桩操纵字节码，实现不可能完成的任务.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1858) 第04讲：编译插桩操纵字节码，实现不可能完成的任务.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1858) 第04讲：编译插桩操纵字节码，实现不可能完成的任务.md"},_=o('<h1 id="第04讲-编译插桩操纵字节码-实现不可能完成的任务" tabindex="-1">第04讲：编译插桩操纵字节码，实现不可能完成的任务 <a class="header-anchor" href="#第04讲-编译插桩操纵字节码-实现不可能完成的任务" aria-label="Permalink to &quot;第04讲：编译插桩操纵字节码，实现不可能完成的任务&quot;">​</a></h1><br><p>本课时我们讲解如何编译插桩操纵字节码。</p><br><p>上一课时我们介绍了 Java 字节码文件的格式，并通过一个 demo 手动模拟了 JVM 解析 class 文件的过程。所有的理论知识都是为了在项目中实践做准备。本课时我们就来看下，对于 class 文件我们还有什么其他玩法。</p><br><p>相信做过 Android 开发的工程师大多都遇到过这种需求：</p><blockquote><p>记录每一个页面的打开和关闭事件，并通过各种 DataTracking 的框架上传到服务器，用来日后做数据分析。</p></blockquote><p>面对这样的需求，一般人都会想到，这其实就是在每一个 Activity 的 onCreate 和 onDestroy 方法中，分别添加页面打开和页面关闭的逻辑。常见的做法有以下两种：</p><br><ol><li><p>修改项目中现有的每一个 Activity，这样显然不够高大上，并且如果项目以后需要添加新的页面，这套逻辑需要重新拷贝一遍，非常容易遗漏。</p></li><li><p>将项目中所有的 Activity 继承自 BaseActivity，将页面打开和关闭的逻辑添加在 BaseActivity中，这种方案看起来比第 1 种方案高级得多，并且后续项目中有新的 Activity，直接继承 BaseActivity 即可。但是这种方案对第三方依赖库中的界面则无能为力，因为我们没有第三方依赖库的源码。</p></li></ol><br><p>就是在这种环境下，一种更加优雅更加完整的方案应运而生：<strong>编译插桩</strong>。</p><h1 id="编译插桩是什么" tabindex="-1">编译插桩是什么 <a class="header-anchor" href="#编译插桩是什么" aria-label="Permalink to &quot;编译插桩是什么&quot;">​</a></h1><p>顾名思义，所谓编译插桩就是在代码编译期间修改已有的代码或者生成新代码。实际上，我们项目中经常用到的 Dagger、ButterKnife 甚至是 Kotlin 语言，它们都用到了编译插桩的技术。</p><br><p>理解编译插桩之前，需要先回顾一下 Android 项目中 .java 文件的编译过程：</p><br>',18),p=l("br",null,null,-1),d=l("p",null,"从上图可以看出，我们可以在 1、2 两处对代码进行改造。",-1),u=l("ol",null,[l("li",null,[l("p",null,"在 .java 文件编译成 .class 文件时，APT、AndroidAnnotation 等就是在此处触发代码生成。")]),l("li",null,[l("p",null,"在 .class 文件进一步优化成 .dex 文件时，也就是直接操作字节码文件，也是本课时主要介绍的内容。这种方式功能更加强大，应用场景也更多。但是门槛比较高，需要对字节码有一定的理解。")])],-1),h=l("br",null,null,-1),g=l("p",null,"本课时主要介绍第 2 种实现方式，用一张图来描述如下过程，其中红色虚框包含了本课时要讲的所有内容。",-1),m=l("br",null,null,-1),A=o('<br><p>一般情况下，我们经常会使用编译插桩实现如下几种功能：</p><ul><li><p>日志埋点；</p></li><li><p>性能监控；</p></li><li><p>动态权限控制；</p></li><li><p>业务逻辑跳转时，校验是否已经登录；</p></li><li><p>甚至是代码调试等。</p></li></ul><h1 id="插桩工具介绍" tabindex="-1">插桩工具介绍 <a class="header-anchor" href="#插桩工具介绍" aria-label="Permalink to &quot;插桩工具介绍&quot;">​</a></h1><p>目前市面上主要流行两种实现编译插桩的方式：</p><h3 id="aspectj" tabindex="-1">AspectJ <a class="header-anchor" href="#aspectj" aria-label="Permalink to &quot;AspectJ&quot;">​</a></h3><p>AspectJ 是老牌 AOP（Aspect-Oriented Programming）框架，如果你做过 J2EE 开发可能对这个框架更加熟悉，经常会拿这个框架跟 Spring AOP 进行比较。其主要优势是成熟稳定，使用者也不需要对字节码文件有深入的理解。</p><h3 id="asm" tabindex="-1">ASM <a class="header-anchor" href="#asm" aria-label="Permalink to &quot;ASM&quot;">​</a></h3><p>目前另一种编译插桩的方式 ASM 越来越受到广大工程师的喜爱。通过 ASM 可以修改现有的字节码文件，也可以动态生成字节码文件，并且它是一款完全以字节码层面来操纵字节码并分析字节码的框架（此处可以联想一下写汇编代码时的酸爽）。</p><br><p>举个例子，在 Java 中如果实现两个数相加操作，可以如下实现：</p><br>',12),f=l("p",null,"但是如果使用 ASM 直接编写字节码指令，则有可能是如下几个字节码指令：",-1),b=l("br",null,null,-1),T=o('<br><p>虽然上面的代码看起来很恐怖，但是没必要太过担心，因为有各种工具帮我们生成这些字节码指令。</p><br><p>本课时就使用 ASM 来实现简单的编译插桩效果，通过插桩实现课时开始讲的需求，在每一个 Activity 打开时输出相应的 log 日志。</p><h1 id="实现思路" tabindex="-1">实现思路 <a class="header-anchor" href="#实现思路" aria-label="Permalink to &quot;实现思路&quot;">​</a></h1><p>过程主要包含两步：</p><ol><li><strong>遍历项目中所有的 .class 文件</strong></li></ol><p>如何找到项目中编译生成的所有 .class 文件，是我们需要解决的第一个问题。众所周知，Android Studio 使用 Gradle 编译项目中的 .java 文件，并且从 Gradle1.5.0 之后，我们可以自己定义 <strong>Transform</strong> ，来获取所有 .class 文件引用。但是 Transform 的使用需要依赖 Gradle Plugin。<strong>因此我们第一步需要创建一个单独的 Gradle Plug</strong> <strong>in</strong> <strong>，并在 Gradle Plug</strong> <strong>in</strong> <strong>中使用自定义 Transform 找出所有的 .class 文件</strong>。</p><br><ol><li><strong>遍历到目标</strong> <strong>.</strong> <strong>class 文件 （Activity）之后，通过 ASM 动态注入需要被插入的字节码</strong></li></ol><p>如果第一步进行顺利，我们可以找出所有的 .class 文件。<strong>接下来就需要过滤出目标 Activity 文件，并在目标 Activity 文件的 onCreate 方法中，通过 ASM 插入相应的 log 日志字节码</strong>。</p><h1 id="具体实现" tabindex="-1">具体实现 <a class="header-anchor" href="#具体实现" aria-label="Permalink to &quot;具体实现&quot;">​</a></h1><h3 id="创建-asmlifecycledemo-项目" tabindex="-1">创建 ASMLifeCycleDemo 项目 <a class="header-anchor" href="#创建-asmlifecycledemo-项目" aria-label="Permalink to &quot;创建 ASMLifeCycleDemo 项目&quot;">​</a></h3><p>创建主项目 ASMLifeCycleDemo，当前项目中只有一个 MainActivity，如下：</p><br>',15),y=l("h3",{id:"创建自定义-gradle-插件",tabindex:"-1"},[t("创建自定义 Gradle 插件 "),l("a",{class:"header-anchor",href:"#创建自定义-gradle-插件","aria-label":'Permalink to "创建自定义 Gradle 插件"'},"​")],-1),C=l("p",null,"首先在 ASMLifeCycleDemo 项目中创建一个新的 module，并选择 Android Library 类型，命名为 asm_lifecycle_plugin。",-1),S=l("br",null,null,-1),M=l("p",null,"将 asm_lifecycle_plugin module 中除了 build.gradle 和 main 文件夹之外的所有内容都删除。然后在 main 目录下分别创建 groovy 和 java 目录，结构如下：",-1),P=l("br",null,null,-1),v=l("br",null,null,-1),q=l("p",null,"因为 Gradle 插件是使用 groovy 语言编写的，所以需要新建一个 groovy 目录，用来存放插件相关的.groovy类。 但 ASM 是 java 层面的框架，所以在 java 目录里存放 ASM 相关的类。",-1),F=l("br",null,null,-1),x=l("p",null,"然后，在 groovy 中创建目录 danny.jiang.plugin，并在此目录中创建类 LifeCyclePlugin.groovy 文件。在 LifeCyclePlugin 中重写 apply 方法，实现插件逻辑，因为是 demo 演示，所以我只是简单的打印 log 日志。",-1),k=l("br",null,null,-1),D=l("p",null,"目录结构与代码如下：",-1),I=l("br",null,null,-1),V=l("br",null,null,-1),E=l("p",null,"可以看出 LifeCyclePlugin 实现了 gradle api 中的 Plugin 接口。当我们在 app module 的 build.gradle 文件中使用此插件时，其 LifeCyclePlugin 的 apply 方法将会被自动调用。",-1),L=l("br",null,null,-1),G=l("p",null,"接下来，将 asm_lifecycle_plugin module 的 build.gradle 中的内容全部删掉，改为如下内容：",-1),j=l("br",null,null,-1),N=o("<br><p><strong>group</strong> 和 <strong>version</strong>都需要在 app module 引用此插件时使用。</p><br><p>所有的插件都需要被部署到 maven 库中，我们可以选择部署到远程或者本地。这里只是演示，所以只是将插件部署到本地目录中。具体地址通过 repository 属性配置，如图所示我将其配置在项目根目录下的 asm_lifecycle_repo 目录下。</p><br><p>最后一步，创建 properties 文件。</p><br><p>在 plugin/src/main 目录下新建目录 resources/META-INF/gradle-plugins，然后在此目录下新建一个文件：danny.asm.lifecycle.properties，其中文件名 danny.asm.lifecycle 就是我们自定义插件的名称，稍后我们在 app module 中会使用到此名称。</p><br><p>在 .properties 文件中，需要指定我们自定义的插件类名 LifeCyclePlugin，如下所示：</p><br>",11),B=l("br",null,null,-1),J=l("p",null,"至此，自定义 Gradle 插件就已经写完，现在可以在 Android Studio 的右边栏找到 Gradle 中点击 uploadArchives，执行 plugin 的部署任务：",-1),R=l("br",null,null,-1),O=l("br",null,null,-1),X=l("p",null,"可以看到，构建成功之后，在 Project 的根目录下将会出现一个 repo 目录，里面存放的就是我们的插件目标文件。",-1),U=l("h3",{id:"测试-asm-lifecycle-plugin",tabindex:"-1"},[t("测试 asm_lifecycle_plugin "),l("a",{class:"header-anchor",href:"#测试-asm-lifecycle-plugin","aria-label":'Permalink to "测试 asm_lifecycle_plugin"'},"​")],-1),W=l("p",null,"为了测试自定义的 Gradle 插件是否可用，可以在 app module 中的 build.gradle 中引用此插件。",-1),K=l("br",null,null,-1),w=l("br",null,null,-1),Q=l("p",null,"图中 ① 处就是在自定义 Gradle 插件中 properties 的文件名 （danny.asm.lifecycle）。",-1),Y=l("br",null,null,-1),z=l("p",null,"图中 ② 处 dependencies 中的 classpath 是 group 值 + module 名 + version。",-1),H=l("br",null,null,-1),$=l("p",null,"然后在命令行中使用 gradlew 执行构建命令，如果打印出我们自定义插件里的 log，则说明自定义 Gradle 插件可以使用：",-1),Z=l("br",null,null,-1),ll=o('<blockquote><p>其实现在已经有了一些比较成熟的三方 Gradle 插件，比如 hiBeaver。如果不喜欢从头创建 Gradle 插件，可以考虑尝试使用。</p></blockquote><h1 id="自定义-transform-实现遍历-class-文件" tabindex="-1">自定义 Transform，实现遍历 .class 文件 <a class="header-anchor" href="#自定义-transform-实现遍历-class-文件" aria-label="Permalink to &quot;自定义 Transform，实现遍历 .class 文件&quot;">​</a></h1><p>自定义 Gradle 插件已经写好，接下来就需要实现遍历所有 .class 的逻辑。这部分功能主要依赖 Transform API。</p><h3 id="什么是-transform" tabindex="-1">什么是 Transform ？ <a class="header-anchor" href="#什么是-transform" aria-label="Permalink to &quot;什么是 Transform ？&quot;">​</a></h3><p><strong>Transform</strong> 可以被看作是 Gradle 在编译项目时的一个 task，在 .class 文件转换成 .dex 的流程中会执行这些 task，对所有的 .class 文件（可包括第三方库的 .class）进行转换，转换的逻辑定义在 <strong>Transform</strong> 的 transform 方法中。实际上平时我们在 build.gradle 中常用的功能都是通过 Transform 实现的，比如混淆（proguard）、分包（multi-dex）、jar 包合并（jarMerge）。</p><h3 id="自定义-transform" tabindex="-1">自定义 Transform <a class="header-anchor" href="#自定义-transform" aria-label="Permalink to &quot;自定义 Transform&quot;">​</a></h3><p>在 danny.jiang.plugin 目录中，新建 LifeCycleTransform.groovy，并继承 Transform 类。</p><br>',8),tl=l("br",null,null,-1),sl=l("p",null,"可以看到，LifeCycleTransform 需要实现抽象类 Transform 中的抽象方法，具体有如下几个方法需要实现：",-1),al=l("br",null,null,-1),ol=o("<br><p>解释说明：Transform 主要作用是检索项目编译过程中的所有文件。通过这几个方法，我们可以对自定义 Transform 设置一些遍历规则，具体如下：</p><br><p><strong>getName：</strong></p><p>设置我们自定义的 Transform 对应的 Task 名称。Gradle 在编译的时候，会将这个名称显示在控制台上。比如：Task :app:transformClassesWith<strong>XXX</strong>ForDebug。</p><br><p><strong>getInputType：</strong></p><p>在项目中会有各种各样格式的文件，通过 getInputType 可以设置 LifeCycleTransform 接收的文件类型，此方法返回的类型是 Set&lt;QualifiedContent.ContentType&gt; 集合。</p><br><p>ContentType 有以下 2 种取值。</p><br>",11),rl=l("br",null,null,-1),il=l("ol",null,[l("li",null,[l("p",null,"CLASSES：代表只检索 .class 文件；")]),l("li",null,[l("p",null,"RESOURCES：代表检索 java 标准资源文件。")])],-1),nl=l("br",null,null,-1),el=l("p",null,[l("strong",null,"getScopes()")],-1),cl=l("p",null,"这个方法规定自定义 Transform 检索的范围，具体有以下几种取值：",-1),_l=l("br",null,null,-1),pl=o("<br><p><strong>i</strong> <strong>s</strong> <strong>Incremental()</strong> 表示当前 Transform 是否支持增量编译，我们不需要增量编译，所以直接返回 false 即可。</p><br><p><strong>transform()</strong></p><p>在 自定义Transform 中最重要的方法就是 transform()。在这个方法中，可以获取到两个数据的流向。</p><ul><li><p>inputs：inputs 中是传过来的输入流，其中有两种格式，一种是 jar 包格式，一种是 directory（目录格式）。</p></li><li><p>outputProvider：outputProvider 获取到输出目录，最后将修改的文件复制到输出目录，这一步必须做，否则编译会报错。</p></li></ul><br><p>我们可以实现一个简易 LifeCycleTransform，功能是打印出所有 .class 文件。代码如下：</p><br>",9),dl=o('<br><p>解释说明：</p><ol><li><p>自定义的 Transform 名称为 LifeCycleTransform；</p></li><li><p>检索项目中 .class 类型的目录或者文件；</p></li><li><p>设置当前 Transform 检索范围为当前项目；</p></li><li><p>设置过滤文件为 .class 文件（去除文件夹类型），并打印文件名称。</p></li></ol><h3 id="将自定义的-lifecycletransform-注册到-gradle-插件中" tabindex="-1">将自定义的 LifeCycleTransform 注册到 Gradle 插件中 <a class="header-anchor" href="#将自定义的-lifecycletransform-注册到-gradle-插件中" aria-label="Permalink to &quot;将自定义的 LifeCycleTransform 注册到 Gradle 插件中&quot;">​</a></h3><p>在 LifeCyclePlugin 中添加如下代码：</p><br>',6),ul=l("br",null,null,-1),hl=l("p",null,"再次在命令行中执行 build 命令，可以看到 LifeCycleTransform 检索出的所有 .class 文件。",-1),gl=l("br",null,null,-1),ml=o('<br><p>从图中可以看出，Gradle 编译时多了一个我们自定义的 LifeCycleTransform 类型的任务，并且将所有 .class 文件名打印出来，其中包含了我们需要的目标文件 MainActivity.class。</p><h1 id="使用-asm-插入字节码到-activity-文件" tabindex="-1">使用 ASM，插入字节码到 Activity 文件 <a class="header-anchor" href="#使用-asm-插入字节码到-activity-文件" aria-label="Permalink to &quot;使用 ASM，插入字节码到 Activity 文件&quot;">​</a></h1><p>ASM 是一套开源框架，其中几个常用的 API 如下：</p><ul><li><p>ClassReader：负责解析 .class 文件中的字节码，并将所有字节码传递给 ClassWriter。</p></li><li><p>ClassVisitor：负责访问 .class 文件中各个元素，还记得上一课时我们介绍的 .class 文件结构吗？ClassVisitor 就是用来解析这些文件结构的，当解析到某些特定结构时（比如类变量、方法），它会自动调用内部相应的 FieldVisitor 或者 MethodVisitor 的方法，进一步解析或者修改 .class 文件内容。</p></li><li><p>ClassWriter：继承自 ClassVisitor，它是生成字节码的工具类，负责将修改后的字节码输出为 byte 数组。</p></li></ul><h3 id="添加-asm-依赖" tabindex="-1">添加 ASM 依赖 <a class="header-anchor" href="#添加-asm-依赖" aria-label="Permalink to &quot;添加 ASM 依赖&quot;">​</a></h3><p>在 asm_lifecycle_plugin 的 build.gradle 中，添加对 ASM 的依赖，如下：</p><br>',8),Al=l("h3",{id:"创建自定义-asm-visitor-类",tabindex:"-1"},[t("创建自定义 ASM Visitor 类 "),l("a",{class:"header-anchor",href:"#创建自定义-asm-visitor-类","aria-label":'Permalink to "创建自定义 ASM Visitor 类"'},"​")],-1),fl=l("p",null,"在 asm_lifecycle_plugin module 中的 src/main/java 目录下创建包 danny.jiang.asm，并分别创建 LifecycleClassVisitor.java 和 LifecycleMethodVisitor.java。代码如下：",-1),bl=l("br",null,null,-1),Tl=l("p",null,[l("strong",null,"LifecycleClassVisitor.java")],-1),yl=l("br",null,null,-1),Cl=l("br",null,null,-1),Sl=l("p",null,"红框中，在 visitMethod 方法中，过滤出继承自 AppCompatActivity 的文件，并在 LifeCycleMethodVisitor.java 中对 onCreate 进行改造。",-1),Ml=l("p",null,[l("strong",null,"LifeCycleMethodVisitor.java")],-1),Pl=l("br",null,null,-1),vl=l("br",null,null,-1),ql=l("p",null,"图中红框内是真正执行插入字节码的逻辑。可以看出 ASM 都是直接以字节码指令的方式进行操作的，所以如果想使用 ASM，需要程序员对字节码有一定的理解。如果对字节码不是很了解，也可以借助三方工具 ASM Bytecode Outline 来生成想要的字节码。",-1),Fl=l("h3",{id:"修改-lifecycletransform-的-transform-方法-使用-asm",tabindex:"-1"},[t("修改 LifeCycleTransform 的 transform 方法，使用 ASM "),l("a",{class:"header-anchor",href:"#修改-lifecycletransform-的-transform-方法-使用-asm","aria-label":'Permalink to "修改 LifeCycleTransform 的 transform 方法，使用 ASM"'},"​")],-1),xl=l("p",null,"各种 Visitor 都定义好之后，我们就可以修改 LifeCycleTransform 的 transform 方法，并将需要插桩的字节码插入到 MainActivity.class 文件中：",-1),kl=l("br",null,null,-1),Dl=l("h3",{id:"重新部署自定义-gradle-插件-并运行主项目",tabindex:"-1"},[t("重新部署自定义 Gradle 插件，并运行主项目 "),l("a",{class:"header-anchor",href:"#重新部署自定义-gradle-插件-并运行主项目","aria-label":'Permalink to "重新部署自定义 Gradle 插件，并运行主项目"'},"​")],-1),Il=l("p",null,"上面几步如果一切执行顺利，那接下来就可以在点击 uploadArchives 重新部署 LifeCyclePlugin。",-1),Vl=l("blockquote",null,[l("p",null,"注意：重新部署时，需要先在 app module 的 build.gradle 中将插件依赖注释，否则报错。")],-1),El=l("p",null,"部署成功之后，重新在 app 中依赖自定义插件并运行主项目，当 MainActivity 被打开时，会在 logcat 中看到如下日志：",-1),Ll=l("br",null,null,-1),Gl=l("br",null,null,-1),jl=l("p",null,"后续如果我们有新的 Activity，比如新建一个 BActivity.java 如下：",-1),Nl=l("br",null,null,-1),Bl=l("br",null,null,-1),Jl=l("p",null,"并在 MainActivity 中设置点击事件跳转到 BActivity 中：",-1),Rl=l("br",null,null,-1),Ol=l("br",null,null,-1),Xl=l("p",null,"那么 Logcat 中的日志如下：",-1),Ul=l("br",null,null,-1),Wl=o('<br><p>虽然我们在 MainActivity 和 BActivity 中并没有添加任何 log 日志逻辑，但是在编译期间，自定义的 LifeCyclePlugin 会自动为每一个 Activity 的 onCreate 方法中添加 log 日志逻辑。</p><br><blockquote><p><strong>读</strong> <strong>到这</strong> <strong>里你</strong> <strong>可能会有疑虑，如果在项目中打开了混淆，那注入的字节码还会正常 work 吗？ 其实无需担心，因为混淆其实也是一个 Transform，叫作 ProguardTransform，它是在自定义的 Transform 之后执行。</strong></p></blockquote><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>本课时主要通过一个 Demo，详细操作了一遍编译插桩的流程。期间涉及了几个知识点：</p><ul><li><p>Android APK 打包编译过程；</p></li><li><p>自定义 Gradle 插件；</p></li><li><p>Transform API 的使用；</p></li><li><p>ASM 的使用。</p></li></ul><p>本课时作为一篇对编译插桩的入门指导，并没有对以上几个知识点做深入分析。你课后如果感兴趣，可以自行查阅相关资料。最后以一句话结束这一课时：</p><blockquote><p><strong>对技术的追求不仅仅</strong> <strong>要</strong> <strong>停留在会用</strong> <strong>API，会写基本功能上，要想在技术上有更高的造诣，就需要深入到原理层面去认识代码运行的机制。</strong></p></blockquote>',9);function Kl(wl,Ql,Yl,zl,Hl,$l){const s=i("Image");return n(),e("div",null,[_,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD2AcPLbAABSfiJwMz0698.png"}),t(),p,d,u,h,g,m,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD2ABAAgAACZzFsVdz4155.png"}),t(),A,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD2AOP6NAAAoSfnUSfs015.png"}),t(),f,b,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD6AWVBUAADlL7SiS8E561.png"}),t(),T,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD6AQu0pAAQ1Wm_ByoY051.png"}),t(),y,C,S,M,P,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD6AD2mpAABt5LwLX34393.png"}),t(),v,q,F,x,k,D,I,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD6AIHSHAAOeqTsYs-g391.png"}),t(),V,E,L,G,j,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD6AMfbvAAEZ8hmY0ug669.png"}),t(),N,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD6AG_hdAAMET2o5690336.png"}),t(),B,J,R,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD-AMDFKAAcAXIFLKA8851.png"}),t(),O,X,U,W,K,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD-AQN1IAATaMwf46xo414.png"}),t(),w,Q,Y,z,H,$,Z,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD-Af1TcAADOeFj_5qk929.png"}),t(),ll,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD-AdirgAANetW-9U_k623.png"}),t(),tl,sl,al,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrD-AJIY8AACIgS4S4x0997.png"}),t(),ol,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrD-AFs_yAADDIlsaIko915.png"}),t(),rl,il,nl,el,cl,_l,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrECAc6aAAABxuVEoJS4898.png"}),t(),pl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrECAIyhAAAaChFP01sA916.png"}),t(),dl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrECAIC6-AADhUNvTh88444.png"}),t(),ul,hl,gl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrECALf2oAAMhJPoxXUY597.png"}),t(),ml,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrECAIGaWAAF-FJ4mWuk667.png"}),t(),Al,fl,bl,Tl,yl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrEGAXSAvAAXJnOIKDA4481.png"}),t(),Cl,Sl,Ml,Pl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrEGANL3MAAOBvTve6Uk244.png"}),t(),vl,ql,Fl,xl,kl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrEGAb48HAAe4XCpf8E4959.png"}),t(),Dl,Il,Vl,El,Ll,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrEGAJlXtAADxyHXMnAI728.png"}),t(),Gl,jl,Nl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/4F/Ciqah16FrEGAAdI2AACizAJ39-E938.png"}),t(),Bl,Jl,Rl,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrEKAUZ5RAAFE_Wak9lg786.png"}),t(),Ol,Xl,Ul,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/65/Cgq2xl6FrEKAG8_wAAFEns-a-xg520.png"}),t(),Wl])}const tt=r(c,[["render",Kl]]);export{lt as __pageData,tt as default};
