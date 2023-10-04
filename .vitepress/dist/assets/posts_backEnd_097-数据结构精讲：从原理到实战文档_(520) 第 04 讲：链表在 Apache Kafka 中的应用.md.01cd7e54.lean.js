import{_ as n,j as e,o as l,g as p,k as a,Q as s,s as t,h as u}from"./chunks/framework.e0c66c3f.js";const w=JSON.parse('{"title":"如何重新设计定时器算法 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(520) 第 04 讲：链表在 Apache Kafka 中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(520) 第 04 讲：链表在 Apache Kafka 中的应用.md","lastUpdated":1696338709000}'),i={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(520) 第 04 讲：链表在 Apache Kafka 中的应用.md"},r=s("",10),c=t("p",null,"它表示现在系统维护了 3 个定时器，分别会在 3T、T 和 2T 时间之后超时。如果现在用户又插入了一个新定时器，将会在 T 时间后超时，我们会将新的定时器数据结构插入到链表结尾，如下图所示：",-1),_=t("p",null,"每次经过 T 时间之后，定时器检测进程都会从头到尾扫描一遍这个链表，每扫描到一个节点的时候都会将里面的时间减去 T，然后判断这个节点的值是否等于 0 了，如果等于 0 了，则表示这个定时器超时，执行定时器超时进程并删除定时器，如果不等于，则继续扫描下一个节点。",-1),q=t("p",null,"这种方法的好处是定时器的插入和删除操作都只需要 O(1) 的时间。但是每次执行定时器检测进程的时间复杂度为 O(N)。如果定时器的数量还很小时还好，如果当定时器有成百上千个的时候，定时器检测进程就会成为一个瓶颈了。",-1),g=t("h3",{id:"维护有序定时器列表",tabindex:"-1"},[t("strong",null,"维护有序定时器列表"),u(),t("a",{class:"header-anchor",href:"#维护有序定时器列表","aria-label":'Permalink to "**维护有序定时器列表**"'},"​")],-1),h=t("p",null,"这种方法是上述方法的改良版本。我们可以还是继续维护一个定时器列表，与第一种方法不一样的是，每次插入一个新的定时器时，并不是将它插入到链表的结尾，而是从头遍历一遍链表，将定时器的超时时间按从小到大的顺序插入到定时器列表中。还有一点不同的是，每次插入新定时器时，并不是保存超时时间，而是根据当前系统时间和超时时间算出一个绝对时间出来。例如，当前的系统时间为 NowTime，超时时间为 2T，那这个绝对时间就为 NowTime + 2T。",-1),d=t("p",null,"假设原来的有序定时器列表如下图所示：",-1),A=t("p",null,"当我们要插入一个新的定时器，超时的绝对时间算出为 25 Dec 2019 9:23:34，这时候我们会按照超时时间从小到大的顺序，将定时器插入到定时器列表的开头，如下图所示：",-1),T=s("",7),m=t("p",null,'那么我们假设现在的时间是 S×N + 2，表示这个"时间轮"的当前周期为 S，数组索引为 2，同时假设这个"时间轮"已经维护了一部分定时器链表，如下图所示：',-1),f=t("br",null,null,-1),E=t("p",null,'如果我们想新插入一个超时时间为 T 的新定时器进这个时间轮，因为 T 小于这个"时间轮"周期的大小 8T，所以表示这个定时器可以被插入到当前的"时间轮"中，插入的位置为当前索引为 1 + 2 % 8 = 3 ，插入新定时器后的"时间轮"如下图所示：',-1),k=t("br",null,null,-1),C=s("",3),P=s("",10),I=t("p",null,'当每次有新的定时器需要插入进分层"时间轮"的时候，将根据分层"时间轮"的"现在时间"算出一个超时的绝对时间。例如，分层"时间轮"的"现在时间"是 22h:20min:30s，而当我们要插入的新定时器超时时间为 50 分钟 10 秒时，这个超时的绝对时间则为 23h:10min:40s。',-1),b=t("p",null,'我们需要先判断最高层的时间是否一致，如果不一致的话则算出时间差，然后插入定时器到对应层的"时间轮"中，如果一致，则到下一层中的时间中计算，如此类推。在上面的例子中，最高层的时间小时相差了 23－22 = 1 小时，所以需要将定时器插入到小时"时间轮"中的 (1 + 21) % 24 = 22这个索引中，定时器列表里还需要保存下层"时间轮"所剩余的时间 10min:40s，如下图所示：',-1),x=t("p",null,'每经过一秒钟，秒"时间轮"的索引都会加 1，并且执行定时器检测进程。定时器检测进程需要判断当前元素里的定时器列表是否为空，如果为空则不执行任何操作，如果不为空则对于这个数组元素列表里的所有定时器执行定时器超时进程。需要注意的是，定时器检测进程只会针对最下层的"时间轮"执行。',-1),M=t("p",null,'如果秒"时间轮"的索引到达 60 之后会将其归零，并将上一层的"时间轮"索引加 1，同时判断上一层的"时间轮"索引里的列表是否为空，如果不为空，则按照之前描述的算法将定时器加入到下一层"时间轮"中去，如此类推。',-1),N=t("p",null,'在经过一段时间之后，上面的分层"时间轮"会到达以下的一个状态：',-1),O=t("p",null,'这时候上层"时间轮"索引里的列表不为空，将这个定时器加入的索引为 10 的分钟"时间轮"中，并且保存下层"时间轮"所剩余的时间 40s，如下图所示：',-1),S=t("p",null,'如此类推，在经过 10 分钟之后，分层"时间轮"会到达以下的一个状态：',-1),B=t("p",null,'同样的，我们将这个定时器插入到秒"时间轮"中，如下图所示：',-1),F=t("p",null,'这个时候，再经过 40 秒，秒"时间轮"的索引将会指向一个元素，里面有着非空的定时器列表，然后执行定时器超时进程并将定时器列表里所有的定时器删除。',-1),y=s("",7);function v(K,V,D,G,H,R){const o=e("Image");return l(),p("div",null,[r,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/CgpOIF4EZ5GAGIysAAAwMX46TJ4905.png"}),c,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/Cgq2xl4EZ5GAOmjhAAAojT2d1yQ153.png"}),_,q,g,h,d,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/CgpOIF4EZ5GANmf7AAE9ok2RoEk947.png"}),A,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/Cgq2xl4EZ5GAezpLAAG4uRLeH28330.png"}),T,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/CgpOIF4EZ5GAXlGMAABboVgG49c716.png"}),m,f,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/Cgq2xl4EZ5GAfv-zAAEx8tfoD5Q555.png"}),E,k,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/CgpOIF4EZ5GAE6MFAAFph4owXi0789.png"}),C,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/6F/Cgq2xl4EZ5KAbE3FAAGRd4XWnFs829.png"}),P,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/CgpOIF4Efl2Ad4lgAAHYUt39Xk4150.png"}),I,b,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7B/Cgq2xl4Efl2AFC8yAAH_xBDJGqM733.png"}),x,M,N,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/CgpOIF4Efl2AM9mbAAH_RIwfKm8774.png"}),O,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7B/Cgq2xl4Efl2AVj80AAHqhEPdsAo113.png"}),S,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/CgpOIF4Efl2ATWRDAAH0naPN-HA794.png"}),B,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7B/Cgq2xl4Efl2AIm04AAHF7KzHJcs847.png"}),F,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/CgpOIF4Efl6AfQaHAAHWoZdqcY4094.png"}),y])}const Q=n(i,[["render",v]]);export{w as __pageData,Q as default};
