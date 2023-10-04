import{_ as l,j as i,o as r,g as n,k as o,Q as p,s as a,h as e}from"./chunks/framework.e0c66c3f.js";const M=JSON.parse('{"title":"度量和运营 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4237) 16  度量与运营篇：如何做好质量和效率的度量与运营？.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4237) 16  度量与运营篇：如何做好质量和效率的度量与运营？.md","lastUpdated":1696338709000}'),s={name:"posts/devops/043_微服务质量保障 20 讲/(4237) 16  度量与运营篇：如何做好质量和效率的度量与运营？.md"},h=p("",22),c=a("h4",{id:"_1-交付质量",tabindex:"-1"},[e("(1) 交付质量 "),a("a",{class:"header-anchor",href:"#_1-交付质量","aria-label":'Permalink to "(1) 交付质量"'},"​")],-1),_=a("p",null,"对于微服务来说，线上质量可以通过如下维度来度量。",-1),u=a("p",null,"从上述指标不难看出，保障交付质量是要努力减少线上故障和线上缺陷，降低故障级别。微服务架构线上故障几乎不可避免，那么就需要最大限度地降低线上故障的影响，比如降低线上故障的恢复时长，减少对生产环境真实用户的影响。",-1),d=a("h4",{id:"_2-过程质量之需求质量",tabindex:"-1"},[e("(2) 过程质量之需求质量 "),a("a",{class:"header-anchor",href:"#_2-过程质量之需求质量","aria-label":'Permalink to "(2) 过程质量之需求质量"'},"​")],-1),g=a("p",null,"在产品交付过程中，需求的规划和评审是起点，所以规划质量和内容质量会间接影响到代码质量和测试质量。需求质量通常有两层理解，一是需求所涉及的研发项目的质量，这种理解比较接近整个需求开发的过程质量，二是该需求所对应的 PRD 的规划质量和内容质量，本文指的是第二种。",-1),q=a("p",null,"PRD 的质量可以用如下指标来衡量。",-1),m=a("p",null,"一般来说，需求质量 Bug 数应该占总 Bug 数的 5% 左右。需求评审打回的标准可以是发现 5 个逻辑类的问题。需求评审打回、需求变更、需求插入等情况，对软件过程的健康度和质量有较大危害，建议制定相对严苛的流程规范，并结合质量运营手段来应对此类情况，以减少此类情况发生。比如需求评审不通过时，需求文档的作者需要向相关人员发送重新评审的申请邮件，并针对当次打回情况做改进分析。",-1),b=a("h4",{id:"_3-过程质量之开发质量",tabindex:"-1"},[e("(3) 过程质量之开发质量 "),a("a",{class:"header-anchor",href:"#_3-过程质量之开发质量","aria-label":'Permalink to "(3) 过程质量之开发质量"'},"​")],-1),A=a("p",null,"我们在工作中，经常会反馈开发质量差的问题，但是有多差、差在哪里，又很难说清楚。常见的开发质量指标有：",-1),P=a("p",null,"一般情况下，提测质量等于 1 才符合预期，即 15/15、12/12 等，因为只要有 1 条冒烟用例执行不通过，则可以进行提测打回。你可能会好奇，既然有 1 条执行不通过就提测打回，那么是不是就不用执行后续用例了，直接记录提测打回数为 1 不是更好吗？这是因为，即使提测打回的情况下，比如提测质量是 1/15 还是 13/15，还是有很大区别的，这也是为了后续更好地进行质量分析和运营。",-1),k=a("h4",{id:"_4-过程质量之测试质量",tabindex:"-1"},[e("(4) 过程质量之测试质量 "),a("a",{class:"header-anchor",href:"#_4-过程质量之测试质量","aria-label":'Permalink to "(4) 过程质量之测试质量"'},"​")],-1),T=a("p",null,"质量度量过程中，测试团队和人员自身的测试质量也需要额外重视，常见的指标有：",-1),f=p("",19),C=p("",20);function D(x,S,w,B,R,V){const t=i("Image");return r(),n("div",null,[h,o(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4C/39/Ciqc1F9XTPCAdI9TAABgnhBkp1o742.png"}),c,_,o(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4C/39/Ciqc1F9XTPqAHeMfAACXA5zxpjc791.png"}),u,d,g,q,o(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4C/39/Ciqc1F9XTQSAXRjrAADpKrcd9Vk328.png"}),m,b,A,o(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4C/39/Ciqc1F9XTRGADTSXAACS3HW8brk250.png"}),P,k,T,o(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4C/39/Ciqc1F9XTSSAALWnAACwR0t2U00021.png"}),f,o(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4C/39/Ciqc1F9XTTyAX-g9AAB1ACo7eeA340.png"}),C])}const X=l(s,[["render",D]]);export{M as __pageData,X as default};
