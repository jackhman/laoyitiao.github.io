import{_ as a,j as _,o as n,g as o,k as s,s as t,h as l,Q as p}from"./chunks/framework.e0c66c3f.js";const W=JSON.parse('{"title":"需求分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据分析思维与实战_文档/(3500) 09  销售：传统行业如何做好交易额提升？.md","filePath":"posts/backEnd/数据分析思维与实战_文档/(3500) 09  销售：传统行业如何做好交易额提升？.md","lastUpdated":1696338709000}'),e={name:"posts/backEnd/数据分析思维与实战_文档/(3500) 09  销售：传统行业如何做好交易额提升？.md"},c=t("p",null,"今天我主要讲解传统销售行业的数据分析案例。",-1),g=t("p",null,"可能很多同学没有接触过销售行业，那如果接到一个陌生行业的数据分析需求，该如何去入手呢？我举个实际案例。",-1),r=t("h3",{id:"需求分析",tabindex:"-1"},[l("需求分析 "),t("a",{class:"header-anchor",href:"#需求分析","aria-label":'Permalink to "需求分析"'},"​")],-1),h=t("p",null,"这是我之前接到一个 case 的原始需求：",-1),d=t("p",null,"对方还提供了对应的四张表（门店信息表、产品信息表、销售经理表、销售数据表），如下图所示：",-1),A=p('<p>前面三张表可以理解为维度表，最后一张表为具体订单表。</p><ol><li><p>门店信息表：省区、城市、大区、门店编号、门店销售目标。</p></li><li><p>产品信息表：产品编码、产品名称、产品单价、产品经理、产品销售目标。</p></li><li><p>销售经理表：销售经理名称、大区，以及销售目标。</p></li><li><p>销售数据表：以上 3 个表的综合数据，具体的销售数据。</p></li></ol><p>这四个表的需求是什么呢？</p><ol><li><p>产出 2016 年全国销售状况报告（维度多，包括时间、地域、产品、人等）。</p></li><li><p>产出 2016 年全国销售状况框架（结构化表现，X-mind 形式）。</p></li></ol><p>针对这样的原始需求，该如何做呢？</p><p>实际工作过程中，原始需求往往比较模糊，数据分析师要跟业务方良好地沟通，因为有些业务方表达能力可能真的不太好。</p><h3 id="核心指标分析" tabindex="-1">核心指标分析 <a class="header-anchor" href="#核心指标分析" aria-label="Permalink to &quot;核心指标分析&quot;">​</a></h3><h4 id="销售额完成率" tabindex="-1">销售额完成率 <a class="header-anchor" href="#销售额完成率" aria-label="Permalink to &quot;销售额完成率&quot;">​</a></h4><p>实际上销售行业的核心指标是销售额完成率，所以我们按照正常业务理解进行维度拆解即可。</p><p>首先以 Boss 看报告的角度，去找到一条可以把所有的数据联系起来的清晰路径，一层一层剖析分解即可。分析路径如下图所示：</p>',10),m=t("p",null,"首先是总体的销售额完成率，假设上年末定的 7 月份预期完成目标是 50% 。我们看一下具体的数据，截止 7 月份目标完成情况，如下图所示：",-1),u=t("p",null,"上图左侧显示总目标为 60.5 亿，目前已完成 32.1 亿，完成率是 53%，预期目标是 50%，实际上已经完成了目标。因为这仅仅体现的是一个大数字，所以要分析总结因为哪些点做得好，哪些点做得不好，从而超额完成目标，这也是数据分析的价值。",-1),q=t("p",null,"我们前面说了总体完成率之后，再看了区域完成率，如下图所示：",-1),C=t("p",null,"从图中我们发现排名前三是华中、西南、东北，相对华南、华东、华北就差一点。",-1),T=t("p",null,"这里面西南地区虽然经济收入相对来说不高，但业绩却排在第 2 。而华北地域经济收入较高，但完成率不到 50%。实际上到了区域完成率还是比较抽象，在抽象化的基础之上，我们要想获得一些有价值的数据，必须要进行一个具体案例的分析。因此可以针对这两个地区，挑选门店单独进行分析。",-1),D=t("p",null,"我们看下门店完成率的排序，如下图所示：",-1),E=t("p",null,"Top 10 完成率最好的是门店 58，已经完成了 90%，而对于完成率最差的十家门店，最后一名是门店 3， 只完成了 37%。Top 10 的门店必然是有一些做得好的点，所以要进一步挖掘，比如以门店 58 为例，它哪里做得好，它肯定有一些可以借鉴的地方。而对于最差的十家门店，我们也要分析差在哪里，提升空间大不大。如果提升空间不大，从减少支出的角度来算，是不是可以建议直接关闭门店。接下来我会以这两个门店为例，进行详细地分析。",-1),f=t("p",null,"先看门店 58 ，我们现在手里有产品、订单、时间段的数据。因为统计的时间是 1 到 7 月份，所以会有一个持续的数据，经过这种数据处理之后，我拉了一张图，如下图所示：",-1),b=t("p",null,"由图可以看出这 10 个产品的趋势，首先在整体趋势上基本上一致，2 月份是高峰期，6 月份是回暖期，这代表这个行业有周期性。其次发现不同产品间销售额差异比较大，黄色线条的产品 4 高高在上，表现最抢眼，中间产品差不多，最下面两个产品表现比较差。",-1),w=t("p",null,"基于这些数据可以看出，门店 58 的用户偏爱产品 4，且不同产品间销售额差异比较大，因此我们要看产品本身的特征跟销售额的相关性。在这个案例当中，产品特征只有单价，所以我们就看一下产品单价和销售额的相关性。我画了一个散点图，如下图所示。",-1),B=t("p",null,"看图结果发现随着 x 的增大，y 也明显增大。所以对于门店 58 这个地区的用户，整体偏爱高价格的产品，表现最好的也是价格最高的产品（单价 100 的红点），所以就可以进一步优化产品结构，让产品价格更加的偏高端，而像 15 、20 元的产品，就可以不用投入人力资源去做。产品 4 和产品 2 表现最佳，提示产品经理要进一步看该类产品的特征是什么，从而进行优化。",-1),F=t("p",null,"上面是从产品单价跟销售额的相关性来看，其实我们这张表还有客单价的数据，（客单价=销售金额/订单数），客单价在业务上可以反映用户每一次订单的平均价位是多少。我们可以看下客单价与销售额的相关性，如下图所示。",-1),M=t("p",null,"按照正常业务理解，每一次订单的价格应该是要高于单价。但结果发现单价为 50、65、70 元的三款产品，它们的客单价竟然小于单价，这说明用户有订单，但没有产生消费额。所以，必然是某个环节出问题，产品经理接下来要进一步排查，该类产品由于哪个问题哪个环节导致订单没有成交，在下半年的时候就要规避这种情况。这就是从 Boss 的角度，看这个产品。",-1),k=t("p",null,"同样的分析方法我们也看一下门店 3，首先也是时段和产品的交叉数据，如下图所示。",-1),P=t("p",null,"门店 3 销售目标是 20 亿，从刚才的数据可知门店 58 的销售目标只有 5 亿。门店 3 的销售目标是门店 58 的 4 倍，但在同产品的实际销售额上均达不到 4 倍（可把门店 3 和门店 58 的时段产品交叉数据图进行对比），所以门店 3 的完成率差，可能不是产品问题，因为门店 3 在所有产品上都表现比较差，这个时候我们就要怀疑是不是跟外部政策有关，需产品经理进一步排查。",-1),H=t("h4",{id:"客单价与销售额",tabindex:"-1"},[l("客单价与销售额 "),t("a",{class:"header-anchor",href:"#客单价与销售额","aria-label":'Permalink to "客单价与销售额"'},"​")],-1),V=t("p",null,"我们再看一下门店 3 的产品单价跟销售额的相关性，如下图所示。",-1),S=t("p",null,"由图可知门店 3 的产品 4 和产品 6 表现最佳，所以要进一步加大该类产品的资源。虽然门店 3整体完成率差，但是肯定也有一些做得好的地方，下半年就可以在这两个点上进一步发力。",-1),x=t("p",null,"再看一下门店 3 产品单价和客单价的一个相关性，如下图所示：",-1),I=p("<p>由图可知，门店 3 在订单上比较正常，而且客单价（y）是单价（x）的 2 倍，这说明用户一次性下单可能买了 Double，只有 Double 的时候，每一次订单的价格才是单价的两倍，所以后期是不是可以尝试捆绑销售，这也更加说明门店 58 在部分订单上有问题。</p><p>这个时候我们对销售行业就已经有数据感觉，这跟之前完全不一样，因为你已经对具体的门店进行了分析。在此基础上，我们可以跟进以下几项。</p><ol><li><p>门店 58 地区用户整体比较偏爱高端价格产品，可优化产品结构，在产品特征上参考产品 4和 2。</p></li><li><p>门店 58 部分订单未产生消费额，需要进一步排查，在下半年规避此类情况发生。</p></li><li><p>门店 3 整体受外部影响较大，完成率低，可以进一步做以下动作。</p></li></ol><ul><li><p>查看地区竞品的销售额；</p></li><li><p>ROI；</p></li><li><p>外部影响持续性评估；</p></li><li><p>结合前三点，可以考虑下半年是否关闭门店 3，减少支出。</p></li></ul><p>实际工作过程中你分析后一定要给出一些很具体的建议。比如，这个门店 58 指标，如果有进一步的数据，那么就能知道有一些订单没有产生消费到底是什么原因？实际上你已经在推动各方去优化了，这就是很实际的落地项。</p><p>我们已知门店 3 和门店 58 在用户偏好上差异较大，那么作为集团的 Boss，肯定更关心区域性的用户产品偏好特征，也就是每一个区域到底搭配什么样的产品比较好，从而进行针对性产品投放优化。所以就可以猜想，不同区域产品差异都较大，接下来就是从数据上去验证，最后我们就能够给 Boss 很具体的区域性产品搭配建议。</p><p>我们把销售额完成率最差的三个区域和最好的三区分开分开来看，如下图所示。</p>",7),N=p('<p>然后我们发现所有区域单价为 70、20、15 元的产品都最差，针对这三个产品，下半年就可以不上，或者要减少资源去推广这三个产品。对于这 6 个区域的具体分析如下。</p><ul><li><p>华东：单价 100 元的产品最好，其他产品销售额差距太大。</p></li><li><p>华北：所有产品都不太好，因为与华东相比 KPI 差不多，但单价 100 元的相比华东差太远，其他同理。</p></li><li><p>华南：单价 100 元产品表现最好，同时其他产品销售额波动较大。</p></li><li><p>东北、华中、西南：中间价位产品销售均不错。</p></li><li><p>西南：单价 100 元的产品很好，华中东北单价 80、60 元产品不错。</p></li></ul><p>那么基于这些区域产品的特征，我们就能够给 Boss 一些很具体的产品投放建议。比如说下半年每个地区应该重点做哪些产品，哪些产品我们就可以不做。</p><h3 id="改善方案流程" tabindex="-1">改善方案流程 <a class="header-anchor" href="#改善方案流程" aria-label="Permalink to &quot;改善方案流程&quot;">​</a></h3><p>很多时候需要分析一个陌生的行业，都会感觉无从下手，可能是因为两点，第一是你本身没有找到切入点，第二是没有具体生动的案例，所以这里我总结了一套分析陌生行业的&quot;类似&quot;方法论，如下图所示。</p>',5),R=p('<p>第一步厘清业务模式，你要知道这个业务是在做什么，至少刚刚这个案例我们知道有门店，每个门店有销售经理，然后销售产品，销售额多少，订单数多少。</p><p>第二步寻找到北极星指标，北极星指标是最核心的指标，你要知道这个业务里面最重要的是什么，这个案例最重要的是销售额。</p><p>第三步是对最重要北极星指标进行主体维度的拆解，分析这个目的是要有具体的案例，类似于我们刚刚说的门店 3 和门店 58 的产品时段分析。我们按照门店维度拆解，然后在门店的下面我们按照产品和时段维度拆解，有了具体案例之后，你已经对当前行业有所感觉。</p><p>第四步就是小发现大猜想，我们根据刚刚的案例发现不同门店的产品特征及用户偏好有差异性，这时候我们就猜想是不是区域性原因，或者是有某种规律。</p><p>第五步就是用数据验证，也就是闭环。果然我们就发现不同的区域有一些类似和差异的规律。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>最后我们总结一下第二章节，第二章节整体是一个宏观思维模块，更加偏行业分析。我首先介绍了分析师的多元思维模型，成为一名优秀分析师，你除了具备真正的专业度，还应该要具备有效沟通、快速发散以及宏观思维的能力。其次介绍了电商模型，电商主要是围绕界面分发效率和交易额漏斗。而对于互联网金融模型就围绕信用分的建模以及落地。再就是游戏，游戏的数据分析比较注重收入、ROI 以及玩游戏的体感。</p><p>今天的课程就到这里，从下一节课开始，我们正式进入微观方法论。如果你有问题可以在下方留言，同时欢迎你关注我本人的公众号（微信搜索：数据分析学习之道），之后会定期更新原创高质量的数据分析文章。</p><p><a href="https://wj.qq.com/s2/6894820/1708/" target="_blank" rel="noreferrer">这是课程评价链接，快来帮花木老师评价下吧！</a></p>',9);function K(U,O,Q,v,G,y){const i=_("Image");return n(),o("div",null,[c,g,r,h,s(i,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/28/E9/Ciqc1F75qOCAMe_TAAKUBNZdqzA364.png"}),d,s(i,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/28/F4/CgqCHl75qOiANRmGAAvK_etrssQ043.png"}),A,s(i,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/28/E9/Ciqc1F75qQOAfuSNAABJlyzmLpk236.png"}),s(i,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/28/E9/Ciqc1F75qQiAV5zHAAB_FjurHNY001.png"}),m,s(i,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/28/F5/CgqCHl75qQ-AYWOrAAEEoBkBuG0110.png"}),u,q,s(i,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/28/F5/CgqCHl75qR-AB1NDAACnZHeWuB4999.png"}),C,T,D,s(i,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/28/F5/CgqCHl75qRiAGBPZAAGVIquiYEQ317.png"}),E,f,s(i,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/28/F5/CgqCHl75qU6AJhCfAAJVBiAHAxE439.png"}),b,w,s(i,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/28/E9/Ciqc1F75qVeACu3FAAGHUhF4B4g725.png"}),B,F,s(i,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/28/EA/Ciqc1F75qd6ATgMtAAC2l6Bhf_U030.png"}),M,k,s(i,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/28/EA/Ciqc1F75qfKARqm1AAK12fLK8mk315.png"}),P,H,V,s(i,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/28/F6/CgqCHl75qfqAHlSdAACyEs679wE120.png"}),S,x,s(i,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/28/F6/CgqCHl75qgKAW4CKAAC9JMvfEwg314.png"}),I,s(i,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/28/EA/Ciqc1F75qhKAEyDVAAHWpsUdxUA411.png"}),s(i,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/28/EA/Ciqc1F75qhiARKkkAAHHDH7iUdQ659.png"}),N,s(i,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/28/EA/Ciqc1F75qiGAT9peAADuobvT1hc342.png"}),R])}const $=a(e,[["render",K]]);export{W as __pageData,$ as default};
