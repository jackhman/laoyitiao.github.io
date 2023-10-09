import{_ as o,j as e,o as t,h as c,k as l,f as a,Q as p,s}from"./chunks/framework.d3daa342.js";const R=JSON.parse('{"title":"第04讲：动手实践：从栈帧看字节码是如何在JVM中进行流转的","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1028) 第04讲：动手实践：从栈帧看字节码是如何在 JVM 中进行流转的.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1028) 第04讲：动手实践：从栈帧看字节码是如何在 JVM 中进行流转的.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1028) 第04讲：动手实践：从栈帧看字节码是如何在 JVM 中进行流转的.md"},E=p("",28),y=p("",26),i=s("p",null,"常量池包含 .class 文件常量池、运行时常量池、String 常量池等部分，大多是一些静态内容。",-1),d=s("p",null,[s("strong",null,"<2>")],-1),g=s("p",null,"接下来，可以看到两个默认的 <init> 和 <cinit> 方法。以下截图是 test 方法的 code 区域，比命令行版的更加直观。",-1),F=s("p",null,[s("strong",null,"<3>")],-1),h=s("p",null,"继续往下看，我们看到了 LocalVariableTable 的三个变量。其中，slot 0 指向的是 this 关键字。该属性的作用是描述帧栈中局部变量与源码中定义的变量之间的关系。如果没有这些信息，那么在 IDE 中引用这个方法时，将无法获取到方法名，取而代之的则是 arg0 这样的变量名。",-1),C=p("",16),u=s("p",null,[a("（1）"),s("strong",null,"0: aload_0")],-1),_=s("p",null,"把第 1 个引用型局部变量推到操作数栈，这里的意思是把 this 装载到了操作数栈中。",-1),A=s("p",null,"对于 static 方法，aload_0 表示对方法的第一个参数的操作。",-1),v=p("",3),b=s("p",null,[a("（3）"),s("strong",null,"i2l")],-1),m=s("p",null,"将栈顶 int 类型的数据转化为 long 类型，这里就涉及我们的隐式类型转换了。图中的信息没有变动，不再详解介绍。",-1),B=s("p",null,[a("（4）"),s("strong",null,"lload_1")],-1),D=s("p",null,"将第一个局部变量入栈。也就是我们的参数 num。这里的 l 表示 long，同样用于局部变量装载。你会看到这个位置的局部变量，一开始就已经有值了。",-1),j=s("p",null,[a("（5）"),s("strong",null,"ladd")],-1),k=s("p",null,"把栈顶两个 long 型数值出栈后相加，并将结果入栈。",-1),T=s("p",null,[a("（6）"),s("strong",null,"getstatic #3")],-1),I=s("p",null,"根据偏移获取静态属性的值，并把这个值 push 到操作数栈上。",-1),f=s("p",null,[a("（7）"),s("strong",null,"ladd")],-1),V=s("p",null,"再次执行 ladd。",-1),q=s("p",null,[a("（8）"),s("strong",null,"lstore_3")],-1),J=s("p",null,"把栈顶 long 型数值存入第 4 个局部变量。",-1),M=s("p",null,"还记得我们上面的图么？slot 为 4，索引为 3 的就是 ret 变量。",-1),S=s("p",null,[a("（9）"),s("strong",null,"lload_3")],-1),P=s("p",null,"正好与上面相反。上面是变量存入，我们现在要做的，就是把这个变量 ret，压入虚拟机栈中。",-1),x=p("",17);function N(O,w,L,z,W,K){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/AD/CgpOIF4ezuOAK_6bAACFY5oeX-Y174.jpg"}),a(),y,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/AD/Cgq2xl4ezeKAWB30AADZXqT3TjQ870.jpg"}),a(),i,d,g,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/AD/CgpOIF4ezeKAVmSnAACExsXdgtg544.jpg"}),a(),F,h,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/AD/Cgq2xl4ezeKASWJHAAB5Ptt1JsM137.jpg"}),a(),C,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/AD/CgpOIF4ezeKAHVCXAABv7rzSgXE896.jpg"}),a(),u,_,A,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/CgpOIF4w-GGAA6DnAAEtqWkdOnE696.jpg"}),a(),v,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/Cgq2xl4w-HKABrhgAAEvNAmbGWY870.jpg"}),a(),b,m,B,D,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/CgpOIF4w-IuAOmp0AAEzFWM0gmc155.jpg"}),a(),j,k,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/Cgq2xl4w-KKAGhwcAAEtNkzwpcw021.jpg"}),a(),T,I,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/Cgq2xl4w-MWAVt_ZAAE2NxokOfU153.jpg"}),a(),f,V,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/CgpOIF4w-NCAaU4rAAEtel-Iskk153.jpg"}),a(),q,J,M,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/CgpOIF4w-OWAPOn9AAE1Y2sXttM659.jpg"}),a(),S,P,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/63/24/CgpOIF4w-O6ARdRFAAE62GkvYGo689.jpg"}),a(),x])}const G=o(r,[["render",N]]);export{R as __pageData,G as default};
