import{_ as n,j as l,o as e,g as c,k as p,h as o,s,Q as a}from"./chunks/framework.4e7d56ce.js";const Q=JSON.parse('{"title":"02经验教训：微服务设计时的五条宝贵经验","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6747) 02  经验教训：微服务设计时的五条宝贵经验.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6747) 02  经验教训：微服务设计时的五条宝贵经验.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6747) 02  经验教训：微服务设计时的五条宝贵经验.md"},_=s("h1",{id:"_02经验教训-微服务设计时的五条宝贵经验",tabindex:"-1"},[o("02经验教训：微服务设计时的五条宝贵经验 "),s("a",{class:"header-anchor",href:"#_02经验教训-微服务设计时的五条宝贵经验","aria-label":'Permalink to "02经验教训：微服务设计时的五条宝贵经验"'},"​")],-1),i=s("p",null,"前文我们探讨了什么是微服务，尽管微服务架构有着高度独立的软件模块、单一的业务职责、可灵活调整的技术栈等优点，但也不能忽视它所带来的弊端，本节我们将针对引入微服务架构后带来的新问题展开讨论，并分享一些我在微服务实践中的心得。",-1),g=s("h3",{id:"微服务架构的新挑战",tabindex:"-1"},[o("微服务架构的新挑战 "),s("a",{class:"header-anchor",href:"#微服务架构的新挑战","aria-label":'Permalink to "微服务架构的新挑战"'},"​")],-1),d=s("p",null,'在著名软件著作《人月神话》中提到，软件世界没有"银弹"，这句话当然适用于架构领域，随着从单体架构过渡到微服务架构，因为将原有系统打散，给系统增加了许多不稳定因素。',-1),u=s("p",null,"单体架构向微服务架构转变",-1),h=s("p",null,"下面我从网络、性能、运维成本、组织架构与集成测试五个方面分别进行阐述。",-1),A=s("p",null,[s("strong",null,"第一点，跨进程通信带来的新问题。"),o(' 以往单体应用是在单机中进行进程内通信，通信稳定性相当好。但是打散为分布式系统后，变为进程间通信，往往这个过程还伴随着跨设备的网络访问，架构师在设计时必须考虑上下游系统因为网络因素无法通信的情况，要假设网络是不可靠的，并设计微服务在网络异常时也能进行符合预期的异常处理。以支付模块为例，用户支付成功后系统自动调用短信服务向用户手机发送"订单支付成功"的消息，此时架构师就必须假设短信服务在服务或者网络不可用时不会影响到订单业务的正常执行。')],-1),E=s("p",null,"微服务间跨进程RESTful调用",-1),m=s("p",null,[s("strong",null,"第二点，较高的响应延迟。"),o(' 相比传统单体架构进程内通信，跨进程、跨网络的微服务通信在网络传输与消息序列化带来的延迟是不可被忽略的，尤其是在五个以上微服务间消息调用时，网络延迟对于实时系统的影响是很大的。早些年我和军事院校合作了一个雷达仿真训练的系统，因为要模拟"导弹打飞机"的场景，在计算飞行轨道时1毫秒的响应增加都可以会影响到最终的结果，显然这类系统采用分布式设计就不再合适。')],-1),y=s("p",null,"雷达指挥训练系统流程",-1),C=s("p",null,[s("strong",null,"第三点，运维成本会直线上升。"),o(" 早期单体应用因为结构简单，规模也较小，发版时通常面对几台服务器部署几个Jar/War文件就可以了。同时，应用的交付周期也是以周甚至月为单位，此时硬件设备成本与运维人员技术要求都比较低，采用手动部署即可满足要求。而对于微服务架构而言，每一个服务都是可独立运行、独立部署、独立维护的业务单元，再加上互联网时代用户需求的不断变化以及市场的不稳定因素，运维人员每天面对成百上千台服务器发布几十次已是家常便饭，传统手动部署显然已经无法满足互联网的快速变化。")],-1),q=s("p",null,"京东 JDOS 自动化运维架构图",-1),b=s("p",null,[s("strong",null,"第四点，组织架构层面的调整。"),o(" 微服务不但是一种架构风格，同样也是一种软件组织模型，以往软件公司会以职能划分研发、测试、运维部门进行独立管理考核，而在微服务的实施过程中，是以业务模块进行团队划分，每一个团队是内聚的，要求可以独立完成从调研到发版的全流程，尽量减少对外界的依赖。如何将传统的职能团队调整为按业务划分的研发团队，同样是对管理者的巨大挑战，要知道人的思想比架构更难改变。")],-1),T=s("p",null,"独立的全生命周期研发团队",-1),P=s("p",null,[s("strong",null,"第五点，服务间的集成测试变得举步维艰。"),o(" 传统单体架构集成测试是将不同的模块按业务流程进行组合，在进程内验证每一种可能性下其模块间协作是否符合预期即可。但对于微服务而言，系统被拆解为很多独立运行的单元，服务间采用接口进行网络通信。要获取准确的测试结果，必须搭建完整的微服务环境，光这一项就需要花费大量的人力物力。同时，因为微服务是跨网络通信，网络延迟、超时、带宽、数据量等因素都将影响最终结果，测试结果易产生偏差。")],-1),S=s("h3",{id:"微服务最佳实践",tabindex:"-1"},[o("微服务最佳实践 "),s("a",{class:"header-anchor",href:"#微服务最佳实践","aria-label":'Permalink to "微服务最佳实践"'},"​")],-1),M=s("p",null,"刚刚我们总结了引入微服务架构的一些新挑战，下面我将结合自己多年的微服务落地经验，总结出五点微服务架构最佳实践，希望能对你日后的工作提供帮助。",-1),k=s("p",null,[s("strong",null,"第一点，微服务的划分原则。"),o(' 将已有系统拆分为多个微服务，本就没有统一的标准。举个例子，一个初创电商公司，要开发一套电商系统，将"促销活动"单独剥离出来作为"促销服务"是没有问题的。但是如果在"淘宝""京东"这种体量的电商平台，"促销服务"就显得粒度太粗了。可以继续拆解为"价格服务""优惠券服务""京豆服务"等更细粒度的小服务，每个服务有专门团队负责维护。')],-1),F=a("",3),I=a("",5),v=a("",4),D=a("",5),f=s("p",null,"链式模式",-1),N=s("p",null,"因为请求是按业务流程传递，很容易能被开发人员理解，链式模式成为最常用的服务间通信模式。但链式模式采用串联模式，调用的整体成功率等于单个服务成功率的乘积，假设每个服务可靠性为 90%，一个业务在 4 个服务执行后的最终成功率只有 90%*90%*90%*90%≈66%，有将近一半的请求会处理失败，这是无法接受的。此外，链式模式因默认采用同步方式传输，在服务处理完成前应用会一直处于阻塞状态，当调用链较长时，系统整体性能会严重下滑。",-1),V=s("p",null,'聚合器模式则是通过服务作为入口，组装其他服务的调用。以下图为例，因为"订单流程服务"是将其他服务进行聚合操作，所以称其为聚合器模式。以"订单流程服务"为例，将"订单""支付""库存"服务进行聚合，一个服务实现了下单、支付、减库存的完整流程。',-1),W=a("",13);function O(B,H,R,x,L,X){const t=l("Image");return e(),c("div",null,[_,i,g,d,p(t,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/10/FC/CioPOWA_PaaARKuqAAHKtkLZuH0547.png"}),o(),u,h,A,p(t,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_PbaASsMIAAF-pDiGFG4323.png"}),o(),E,m,p(t,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_PcKADivhAACntU7GHO4809.png"}),o(),y,C,p(t,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_Pc6AYOwCAAXgZiw2Ab4912.png"}),o(),q,b,p(t,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_PdyALc1mAAJTL_7gKk8799.png"}),o(),T,P,S,M,k,p(t,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_PeiAP3wPAAsfM7_MQ_Y076.png"}),o(),F,p(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/10/A4/CioPOWA-8-yAJfZfAAnmvD6BXtI383.png"}),o(),I,p(t,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/10/FD/CioPOWA_PgaAItvNAAGuONGMYe4111.png"}),o(),v,p(t,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/10/FD/CioPOWA_PhSAVdhGAAINBDbc_gM750.png"}),o(),D,p(t,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_Pp-AJMY7AAC16-d9QWM976.png"}),o(),f,N,V,p(t,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/11/00/Cgp9HWA_PjOAT2wnAAC1qYHjdec918.png"}),o(),W])}const w=n(r,[["render",O]]);export{Q as __pageData,w as default};
