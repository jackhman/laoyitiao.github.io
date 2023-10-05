import{_ as i,j as n,o as s,g as c,s as l,k as t,h as o,Q as a}from"./chunks/framework.4e7d56ce.js";const ml=JSON.parse('{"title":"多线程知识点 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(6) 第04讲：并发与多线程.md","filePath":"posts/backEnd/036_32个Java面试必考点/(6) 第04讲：并发与多线程.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/036_32个Java面试必考点/(6) 第04讲：并发与多线程.md"},p=l("p",null,"本课时的主要内容是 Java 的多线程和并发。重点知识有线程的状态转换、线程的同步与互斥、线程池的运作机制详解，以及 JUC 中常用的工具类。",-1),_=l("h6",{id:"多线程知识点",tabindex:"-1"},[o("多线程知识点 "),l("a",{class:"header-anchor",href:"#多线程知识点","aria-label":'Permalink to "多线程知识点"'},"​")],-1),h={id:"",tabindex:"-1"},d=l("a",{class:"header-anchor",href:"#","aria-label":'Permalink to "<Image alt="" src="http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI2Aa7QeAAEskU8MCuc505.png"/>"'},"​",-1),u=l("br",null,null,-1),A=l("p",null,"多线程协作时，因为对资源的锁定与等待会产生死锁，这里需要了解产生死锁的四个基本条件，要明白竞争条件与临界区的概念，知道可以通过破坏造成死锁的 4 个条件来防止死锁。",-1),g=l("p",null,"前面讲过进程间的通信方式，这里还要知道线程间的通信方式，通信主要指线程之间的协作机制，例如 wait、notify 等。",-1),b=l("p",null,"还需要知道 Java 为多线程提供的一些机制，例如 ThreadLocal 用来保存线程独享的数据， Fork/Join 机制用于大任务的分割与汇总，Volatile 对多线程数据可见性的保证，以及线程的中断机制。",-1),m=l("p",null,"其他还有：ThreadLocal 的实现机制。Fork/Join 的工作窃取算法等内容。",-1),C=l("h6",{id:"详解线程状态转换",tabindex:"-1"},[o("详解线程状态转换 "),l("a",{class:"header-anchor",href:"#详解线程状态转换","aria-label":'Permalink to "详解线程状态转换"'},"​")],-1),T=l("p",null,"线程是 JVM 执行任务的最小单元，理解线程的状态转换是理解后续多线程问题的基础。在 JVM 运行中，线程一共有 NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED 六种状态，这些状态对应 Thread.State 枚举类中的状态。",-1),k=l("p",null,"如下图所示，当创建一个线程时，线程处在 NEW 状态，运行 Thread 的 start 方法后，线程进入 RUNNABLE 可运行状态。",-1),S=l("br",null,null,-1),E=a('<br><p>这时，所有可运行状态的线程并不能马上运行，而是需要先进入就绪状态等待线程调度，如图中间所示的 READY 状态。在获取 CPU 后才能进入运行状态，如图中所示的 RUNNING。运行状态可以随着不同条件转换成除 NEW 以外的其他状态。</p><p>如图左侧所示，在运行态中的线程进入 synchronized 同步块或者同步方法时，如果获取锁失败，则会进入到 BLOCKED 状态。当获取到锁后，会从 BLOCKED 状态恢复到就绪状态。</p><p>如图右侧所示，运行中的线程还会进入等待状态，这两个等待一个是有超时时间的等待，例如调用 Object.wait、Thread.join 等；另外一个是无超时的等待，例如调用 Thread.join 或者 Locksupport.park 等。这两种等待都可以通过 notify 或 unpark 结束等待状态并恢复到就绪状态。</p><p>最后是线程运行完成结束时，如图下侧所示，线程状态变成 TERMINATED。</p><h6 id="详解-cas-与-aba-问题" tabindex="-1">详解 CAS 与 ABA 问题 <a class="header-anchor" href="#详解-cas-与-aba-问题" aria-label="Permalink to &quot;详解 CAS 与 ABA 问题&quot;">​</a></h6><p>这部分内容详解线程的同步与互斥，解决线程同步与互斥的主要方式是 CAS、synchronized 和 lock。</p><h2 id="cas" tabindex="-1">CAS <a class="header-anchor" href="#cas" aria-label="Permalink to &quot;CAS&quot;">​</a></h2><p>CAS 是乐观锁的一种实现方式，是一种轻量级锁，JUC 中很多工具类的实现就是基于 CAS 的。CAS 操作的流程如下图所示，线程在读取数据时不进行加锁，在准备写回数据时，比较原值是否修改，若未被其他线程修改则写回，若已被修改，则重新执行读取流程。这是一种乐观策略，认为并发操作并不总会发生。</p><br>',10),B=l("br",null,null,-1),L=l("p",null,"比较并写回的操作是通过操作系统原语实现的，保证执行过程中不会被中断。",-1),I=l("h2",{id:"aba",tabindex:"-1"},[o("ABA "),l("a",{class:"header-anchor",href:"#aba","aria-label":'Permalink to "ABA"'},"​")],-1),M=l("p",null,"CAS 容易出现 ABA 问题，就是如下面时序图所示，如果线程 T1 读取值 A 之后，发生两次写入，先由线程 T2 写回了 B，又由 T3 写回了 A，此时 T1 在写回比较时，值还是 A，就无法判断是否发生过修改。",-1),f=l("br",null,null,-1),P=l("p",null,"ABA 问题不一定会影响结果，但还是需要防范，解决的办法可以增加额外的标志位或者时间戳。JUC 工具包中提供了这样的类。",-1),D=l("h6",{id:"详解-synchronized",tabindex:"-1"},[o("详解 synchronized "),l("a",{class:"header-anchor",href:"#详解-synchronized","aria-label":'Permalink to "详解 synchronized"'},"​")],-1),J=l("p",null,"synchronized 是最常用的线程同步手段之一，它是如何保证同一时刻只有一个线程可以进入临界区呢？",-1),V=l("p",null,"synchronized 对对象进行加锁，在 JVM 中，对象在内存中分为三块区域：对象头、实例数据和对齐填充。在对象头中保存了锁标志位和指向 monitor 对象的起始地址，如下图所示，右侧就是对象对应的 Monitor 对象。当 Monitor 被某个线程持有后，就会处于锁定状态，如图中的 Owner 部分，会指向持有 Monitor 对象的线程。另外 Monitor 中还有两个队列，用来存放进入及等待获取锁的线程。",-1),N=l("br",null,null,-1),y=l("p",null,"synchronized 应用在方法上时，在字节码中是通过方法的 ACC_SYNCHRONIZED 标志来实现的，synchronized 应用在同步块上时，在字节码中是通过 monitorenter 和 monitorexit 实现的。",-1),R=l("p",null,"针对 synchronized 获取锁的方式，JVM 使用了锁升级的优化方式，就是先使用偏向锁优先同一线程然后再次获取锁，如果失败，就升级为 CAS 轻量级锁，如果失败就会短暂自旋，防止线程被系统挂起。最后如果以上都失败就升级为重量级锁。",-1),x=l("h6",{id:"详解-aqs-与-lock",tabindex:"-1"},[o("详解 AQS 与 Lock "),l("a",{class:"header-anchor",href:"#详解-aqs-与-lock","aria-label":'Permalink to "详解 AQS 与 Lock"'},"​")],-1),O=l("p",null,"在介绍 Lock 前，先介绍 AQS，也就是队列同步器，这是实现 Lock 的基础。下图就是 AQS 的结构图，从图中可以看出，AQS 有一个 state 标记位，值为1 时表示有线程占用，其他线程需要进入到同步队列等待。同步队列是一个双向链表。",-1),U=l("br",null,null,-1),q=l("br",null,null,-1),w=l("p",null,"当获得锁的线程需要等待某个条件时，会进入 condition 的等待队列，等待队列可以有多个。当 condition 条件满足时，线程会从等待队列重新进入同步队列进行获取锁的竞争。ReentrantLock 就是基于 AQS 实现的，如下图所示，ReentrantLock 内部有公平锁和非公平锁两种实现，差别就在于新来的线程是否比已经在同步队列中的等待线程更早获得锁。",-1),Q=l("br",null,null,-1),j=l("p",null,"和 ReentrantLock 实现方式类似，Semaphore 也是基于 AQS 的，差别在于 ReentrantLock 是独占锁，Semaphore 是共享锁。",-1),v=l("br",null,null,-1),z=l("br",null,null,-1),W=l("h6",{id:"详解线程池",tabindex:"-1"},[o("详解线程池 "),l("a",{class:"header-anchor",href:"#详解线程池","aria-label":'Permalink to "详解线程池"'},"​")],-1),K=l("p",null,"线程池通过复用线程，避免线程频繁地创建和销毁。Java 的 Executors 工具类中提供了 5 种类型的线程池创建方法，如下图所示，来看它们的特点和适用场景。",-1),F=l("br",null,null,-1),Y=a('<ol><li><p>固定大小线程池，特点是线程数固定，使用无界队列，适用于任务数量不均匀的场景、对内存压力不敏感但系统负载比较敏感的场景；</p></li><li><p>Cached 线程池，特点是不限制线程数，适用于要求低延迟的短期任务场景；</p></li><li><p>单线程线程池，就是一个线程的固定线程池，适用于需要异步执行但需要保证任务顺序的场景；</p></li><li><p>Scheduled 线程池，适用于定期执行任务场景，支持按固定频率定期执行和按固定延时定期执行两种方式；</p></li><li><p>工作窃取线程池，使用的是 ForkJoinPool，是固定并行度的多任务队列，适合任务执行时长不均匀的场景。</p></li></ol><h6 id="详解线程池参数" tabindex="-1">详解线程池参数 <a class="header-anchor" href="#详解线程池参数" aria-label="Permalink to &quot;详解线程池参数&quot;">​</a></h6><p>线程池除了工作窃取线程池外，都是通过 ThreadPoolExecutor 的不同初始化参数来创建的。</p><p>创建参数列表如下图所示。</p><br>',5),H=a('<ul><li><p>第一个参数设置核心线程数。默认情况下核心线程会一直存活。</p></li><li><p>第二个参数设置最大线程数。决定线程池最多可以创建的多少线程。</p></li><li><p>第三个参数和第四个参数用来设置线程空闲时间，和空闲时间的单位，当线程闲置超过空闲时间就会被销毁。可以通过 allowCoreThreadTimeOut 方法来允许核心线程被回收。</p></li><li><p>第五个参数设置缓冲队列，上图中左下方的三个队列是设置线程池时常使用的缓冲队列。其中 ArrayBlockingQueue 是一个有界队列，就是指队列有最大容量限制。LinkedBlockingQueue 是无界队列，就是队列不限制容量。最后一个是 SynchronousQueue，是一个同步队列，内部没有缓冲区。</p></li><li><p>第六个参数设置线程池工厂方法，线程工厂用来创建新线程，可以用来对线程的一些属性进行定制，例如线程的 group、线程名、优先级等。一般使用默认工厂类即可。</p></li><li><p>第七个参数设置线程池满时的拒绝策略。如上图右下方所示有四种策略，Abort 策略在线程池满后，提交新任务时会抛出 RejectedExecutionException，这个也是默认的拒绝策略。Discard 策略会在提交失败时对任务直接进行丢弃。CallerRuns 策略会在提交失败时，由提交任务的线程直接执行提交的任务。DiscardOldest 策略会丢弃最早提交的任务。</p></li></ul><br><p>再来看前面的几种线程池都是使用怎样的参数来创建的。</p><ul><li><p>固定大小线程池创建时核心和最大线程数都设置成指定的线程数，这样线程池中就只会使用固定大小的线程数。</p></li><li><p>队列使用无界队列 LinkedBlockingQueue。</p></li><li><p>Single 线程池就是线程数设置为 1 的固定线程池。</p></li><li><p>Cached 线程池的核心线程数设置为 0，最大线程数是 Integer.MAX_VALUE，主要是通过把缓冲队列设置成 SynchronousQueue，这样只要没有空闲线程就会新建。</p></li><li><p>Scheduled 线程池与前几种不同的是使用了 DelayedWorkQueue，这是一种按延迟时间获取任务的优先级队列。</p></li></ul><h6 id="详解线程池执行流程" tabindex="-1">详解线程池执行流程 <a class="header-anchor" href="#详解线程池执行流程" aria-label="Permalink to &quot;详解线程池执行流程&quot;">​</a></h6><p>向线程提交任务时可以使用 execute 和 submit，区别就是 submit 可以返回一个 future 对象，通过 future 对象可以了解任务执行情况，可以取消任务的执行，还可获取执行结果或执行异常。submit 最终也是通过 execute 执行的。</p><p>向线程池提交任务时的执行顺序如下图所示。</p><br>',8),G=a('<br><ol><li><p>向线程池提交任务时，会首先判断线程池中的线程数是否大于设置的核心线程数，如果不大于，就创建一个核心线程来执行任务。</p></li><li><p>如果大于核心线程数，就会判断缓冲队列是否满了，如果没有满，则放入队列，等待线程空闲时执行任务。</p></li><li><p>如果队列已经满了，则判断是否达到了线程池设置的最大线程数，如果没有达到，就创建新线程来执行任务。</p></li><li><p>如果已经达到了最大线程数，则执行指定的拒绝策略。</p></li></ol><p>这里需要注意队列的判断与最大线程数判断的顺序，不要搞反。</p><h6 id="详解-juc-工具类" tabindex="-1">详解 JUC 工具类 <a class="header-anchor" href="#详解-juc-工具类" aria-label="Permalink to &quot;详解 JUC 工具类&quot;">​</a></h6><p>JUC 是 Java 提供的用于多线程处理的工具类库，来看其中的常用工具类的作用，如下图所示。</p><br>',6),X=l("br",null,null,-1),$=l("p",null,"如上图所示，第一行的类都是基本数据类型的原子类，包括 AtomicBoolean、AtomicLong、AtomicInteger 类。",-1),Z=l("ul",null,[l("li",null,[l("p",null,"AtomicLong 通过 unsafe 类实现，基于CAS。unsafe 类是底层工具类，JUC 中很多类的底层都使用到了 unsafe 包中的功能。unsafe 类提供了类似 C 的指针操作，提供 CAS 等功能。unsafe 类中的所有方法都是 native 修饰的。")]),l("li",null,[l("p",null,"LongAdder等 4 个类是 JDK1.8 中提供的更高效的操作类。LongAdder 基于 Cell 实现，使用分段锁思想，是一种空间换时间的策略，更适合高并发场景；LongAccumulator 提供了比 LongAdder 更强大的功能，能够指定对数据的操作规则，例如可以把对数据的相加操作改成相乘操作。")])],-1),ll=l("br",null,null,-1),el=l("p",null,"第二行中的类提供了对对象的原子读写功能，后两个类 AtomicStampedReference 和 AtomicMarkableReference 用于解决前面提到的 ABA 问题，分别基于时间戳和标记位来解决问题。",-1),tl=l("p",null,"再看下图。",-1),ol=a("<br><p>第一行的类主要是锁相关的类，例如前面介绍过的 Reentrant 重入锁。</p><ul><li><p>与 ReentrantLock 的独占锁不同，Semaphore 是共享锁，允许多个线程共享资源，适用于限制使用共享资源线程数量的场景，例如 100 个车辆要使用 20 个停车位，那么最多允许 20 个车占用停车位。</p></li><li><p>StampedLock 是JDK 1.8 改进的读写锁，是使用一种 CLH 的乐观锁，能够有效防止写饥饿。所谓写饥饿就是在多线程读写时，读线程访问非常频繁，导致总是有读线程占用资源，写线程很难加上写锁。</p></li></ul><p>第二行中主要是异步执行相关的类。</p><ul><li><p>重点了解 JDK 1.8 中提供的 CompletableFuture，可以支持流式调用，可以方便的进行多 future 的组合使用，例如可以同时执行两个异步任务，然后对执行结果进行合并处理。还可以很方便地设置完成时间。</p></li><li><p>另外一个是 JDK 1.7 中提供的 ForkJoinPool，采用分治思想，将大任务分解成多个小任务处理，然后在合并处理结果。ForkJoinPool 的特点是使用工作窃取算法，可以有效平衡多任务时间长短不一的场景。</p></li></ul><br><p>其他 JUC 常用工具如下图所示。</p>",7),al=a('<br><p>第一行是常用的阻塞队列，讲解线程池时已经简单介绍过了，这里再补充一些。</p><ul><li><p>LinkedBlockingDeque 是双端队列，也就是可以分别从队头和队尾操作入队、出队。</p></li><li><p>ArrayBlockingQueue 单端队列，只能从队尾入队，队头出队。</p></li></ul><br><p>第二行是控制多线程协作时使用的类。</p><ul><li><p>CountDownLatch 实现计数器功能，可以用来控制等待多个线程执行任务后进行汇总。</p></li><li><p>CyclicBarrier 可以让一组线程等待至某个状态之后，再全部同时执行，一般在测试时使用，可以让多线程更好的并发执行。</p></li><li><p>Semaphore 用来控制对共享资源的访问并发度。</p></li></ul><br><p>最后一行是比较常用的两个集合类，ConcurrentHashMap 我们前面的课程已经详细介绍过了，这里可以了解 CopyOnWriteArrayList，COW 通过写入数据时进行 copy 修改，然后更新引用的方式，来消除并行读写中的锁使用，比较适合读多写少，数据量比较小，但是并发非常高的场景。</p><h6 id="考察点和加分项" tabindex="-1">考察点和加分项 <a class="header-anchor" href="#考察点和加分项" aria-label="Permalink to &quot;考察点和加分项&quot;">​</a></h6><h6 id="考察点" tabindex="-1">考察点 <a class="header-anchor" href="#考察点" aria-label="Permalink to &quot;考察点&quot;">​</a></h6><p>讲解完本课时的知识点，总结下面试考察点。</p><ol><li><p>要理解线程同步与互斥的原理，包括临界资源、临界区的概念，知道重量级锁、轻量级锁、自旋锁、偏向锁、重入锁、读写锁的概念。</p></li><li><p>要掌握线程安全相关机制，例如 CAS、synchronized、Lock 三种同步方式的实现原理、要明白 ThreadLocal 是每个线程独享的局部变量，了解 ThreadLocal 使用弱引用的 ThreadLocalMap 保存不同的 ThreadLocal 变量。</p></li><li><p>要了解 JUC 中的工具类的使用场景与主要的几种工具类的实现原理，例如 Reentrantlock，ConcurrentHashMap、LongAdder 等实现方式。</p></li><li><p>要熟悉线程池的原理、使用场景、常用配置，例如大量短期任务的场景适合使用 Cached 线程池；系统资源比较紧张时，可以选择固定线程池。另外注意慎用无界队列，可能会有 OOM 的风险。</p></li><li><p>要深刻理解线程的同步与异步、阻塞与非阻塞，同步和异步的区别在于任务是否是同一个线程执行，阻塞与非阻塞的区别在于异步执行任务时，线程是会阻塞等待结果，还是会继续执行后续逻辑。</p></li></ol><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>掌握了上面这些内容，如果能做到这几点加分项，一定会给面试官留下更好的印象。</p><ol><li><p>可以结合实际项目经验或者实际案例介绍原理，例如介绍线程池设置时，可以提到自己的项目中有一个需要高吞吐量的场景，使用了 Cached 的线程池。</p></li><li><p>如果有过解决多线程问题的经验或者排查思路的话会获得面试加分。</p></li><li><p>能够熟悉常用的线程分析工具与方法，例如会用 jstack 分析线程的运行状态，查找锁对象持有状况等。</p></li><li><p>了解 Java 8 对 JUC 工具类做了哪些增强，例如提供了 LongAdder 来替换 AtomicLong，更适合并发度比较高的场景。</p></li><li><p>了解 Reactive 异步编程思想，了解 back pressure 背压的概念与应用场景。</p></li></ol><h6 id="真题汇总" tabindex="-1">真题汇总 <a class="header-anchor" href="#真题汇总" aria-label="Permalink to &quot;真题汇总&quot;">​</a></h6><p>总结相关的面试真题，如下图所示，对重点题目提供一些思路。</p><br>',18),il=a("<ul><li><p>第 1 题如何实现一个生产者与消费者模型？可以尝试通过锁、信号量、线程通信、阻塞队列等不同方式实现。</p></li><li><p>第 4 题 wait 与 sleep 的有什么不同？回答的要点四个：</p><ul><li><p>wait 属于 Object 类，sleep 属于 Thread 类；</p></li><li><p>wait 会释放锁对象，而 sleep 不会；</p></li><li><p>使用的位置不同，wait 需要在同步块中使用，sleep 可以在任意地方；</p></li><li><p>sleep 需要捕获异常，而 wait 不需要。</p></li></ul></li><li><p>第 6 题，读写锁适用于什么场景？可以回答读写锁适合读并发多，写并发少的场景，另外一个解决这种场景的方法是 copyonwrite。</p></li></ul><br><p>真题第二部分如下，提供解题思路。</p><br>",4),nl=l("ul",null,[l("li",null,[l("p",null,"第 7 题，线程之间如何通信？主要可以介绍一下 wait/notify 机制，共享变量的 synchronized 或者 Lock 同步机制等。")]),l("li",null,[l("p",null,"第 8 题，保证线程安全的方法有哪些？可以提 CAS、synchronized、Lock，以及 ThreadLocal 等机制。")]),l("li",null,[l("p",null,"第 9 题，如何尽可能提高多线程并发性能？可以从尽量减少临界区范围，使用 ThreadLocal，减少线程切换、使用读写锁或 copyonwrite 等机制这些方面来回答。")]),l("li",null,[l("p",null,"第 10 题，ThreadLocal 用来解决什么问题？ThreadLocal 是如何实现的？可以重点回答 ThreadLocal 不是用来解决多线程共享变量的问题，而是用来解决线程数据隔离的问题。")])],-1),sl=l("br",null,null,-1),cl=l("p",null,"本课时内容就到这里，下一课时会讲解基础知识模块中的数据结构与算法。",-1),rl=l("br",null,null,-1);function pl(_l,hl,dl,ul,Al,gl){const e=n("Image");return s(),c("div",null,[p,_,l("h6",h,[t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI2Aa7QeAAEskU8MCuc505.png"}),o(),d]),u,A,g,b,m,C,T,k,S,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI2Ab8rJAACvTREK08g324.png"}),E,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI6AM2T_AAAblRNWyOU110.png"}),B,L,I,M,f,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI6AB5XwAAAWMnENBjk562.png"}),P,D,J,V,N,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI6AGOs9AABK2UOTXYM742.png"}),y,R,x,O,U,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI6ANLfHAAA3fj0S8po403.png"}),q,w,Q,j,v,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI6AHi8EAAAmrb0oKYY337.png"}),z,W,K,F,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI6ARRYYAACMegWL29o977.png"}),Y,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI6AYuywAABjUwbc6lw080.png"}),H,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI6ABd8rAABJ5DF7U78658.png"}),G,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI6ALbKbAABsWQ4Nsws755.png"}),X,$,Z,ll,el,tl,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI6ADBHyAABidDn7gt4688.png"}),ol,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI6AXuPCAABiZsTbtrs036.png"}),al,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BE/CgoB5l14nI6ASj5CAABnpj1enwM108.png"}),il,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DE/CgotOV14nI-AOlGmAABc2tbFdwU647.png"}),nl,sl,cl,rl])}const Cl=i(r,[["render",pl]]);export{ml as __pageData,Cl as default};
