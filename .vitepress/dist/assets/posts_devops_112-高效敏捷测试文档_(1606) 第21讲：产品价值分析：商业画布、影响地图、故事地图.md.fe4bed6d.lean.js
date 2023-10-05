import{_ as o,j as a,o as e,g as _,k as s,s as t,h as n,Q as l}from"./chunks/framework.4e7d56ce.js";const O=JSON.parse('{"title":"产品价值是基础 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1606) 第21讲：产品价值分析：商业画布、影响地图、故事地图.md","filePath":"posts/devops/112-高效敏捷测试文档/(1606) 第21讲：产品价值分析：商业画布、影响地图、故事地图.md","lastUpdated":1696417798000}'),i={name:"posts/devops/112-高效敏捷测试文档/(1606) 第21讲：产品价值分析：商业画布、影响地图、故事地图.md"},c=t("br",null,null,-1),r=t("p",null,"上一讲介绍了用户故事的可测试性及 ATDD。这一讲为什么不继续讲测试，而要讲解产品价值分析呢？首要原因是由于我们提倡业务驱动测试，希望从业务的角度出发来进行测试分析与设计，然后再回归业务。",-1),h=t("br",null,null,-1),d=t("p",null,'其次，当一个项目开始进行测试时，要清楚项目的上下文，这是第 3 讲提到的敏捷测试"上下文驱动"的思维方式，我们应该基于上下文进行测试需求分析、设计并制定测试计划。其中，产品和业务是最重要的测试上下文之一。',-1),u=t("br",null,null,-1),b=t("p",null,'再者，敏捷特别强调交付"价值"给客户，团队必须做对客户有价值的事情。所以，无论是开发还是测试，都需要关注产品的价值。测试具有保证质量的责任，之前谈质量，更多是从质量模型所定义的质量特性（比如功能、性能、安全性等）出发；而在敏捷中，从客户价值出发更有意义，所以这一讲，我们就来讨论产品价值分析。',-1),g=t("h3",{id:"产品价值是基础",tabindex:"-1"},[n("产品价值是基础 "),t("a",{class:"header-anchor",href:"#产品价值是基础","aria-label":'Permalink to "产品价值是基础"'},"​")],-1),A=t("p",null,"产品价值是软件研发的基础，用户只有认可产品的价值才会购买并使用它。敏捷团队首先需要了解的是产品可以带给用户什么样的价值，以及谁才是目标用户；其次才是需求分析和功能特性的实现。然而在实际工作中，研发团队往往不太关心公司要做一个产品的目的是什么，只知道是由产品经理给出的建议，由高层领导来做决定，最后落实到研发团队。",-1),m=t("br",null,null,-1),T=t("p",null,"根据 PMI（Project Management Institute）发布的年度报告，在 2017 年有 14% 的 IT 项目宣告失败，其中有 39% 是因为不正确的产品需求导致的，需求问题是项目失败的首要原因。为什么会这样呢？我们可以看看图 1，它用漫画的形式形象地描述了客户的需求是如何一步步走样的，最后改的面目全非。参与项目的每个角色对需求的理解都不一样，需求文档又很简单，客户的需求主要靠角色之间的沟通和交流来传递，挺像敏捷开发的场景，所以往往最后做出来的东西和客户想要的结果有很大偏差。",-1),q=t("br",null,null,-1),P=l("",14),E=t("p",null,"图 2 商业画布构造图",-1),C=t("br",null,null,-1),S=t("p",null,"用商业画布进行商业模式分析的过程基本如下。",-1),V=t("br",null,null,-1),I=t("p",null,"找到产品的目标用户群**（客户细分）** → 分析用户的需求**（价值主张）** 是什么→ 探讨怎样才能获取到用户**（渠道通路）** → 怎样建立和维持客户关系留住客户**（客户关系）** → 该用什么样的方式实现盈利**（收入来源）** → 发掘产品目前拥有什么样的核心资源，比如资金、技术、人力等**（核心资源）** → 列出必须要交付的业务功能**（关键业务）** → 找出重要的合作伙伴都有哪些**（关键合作伙伴）** → 分析投入产出比是怎样的**（成本结构）**。",-1),k=t("br",null,null,-1),D=t("p",null,'图 3 就是一个在线教育 App 产品的商业画布示例。从测试角度来看，我们应该重点关注其中的"客户细分、价值主张、客户关系、关键业务、渠道"等五项内容。',-1),W=t("br",null,null,-1),f=l("",13),v=l("",15),M=l("",6);function y(N,x,B,J,H,j){const p=a("Image");return e(),_("div",null,[c,r,h,d,u,b,g,A,m,T,q,s(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/09/D5/Ciqah16J2pSAUt3bAAGOd9qz3j4361.jpg"}),P,s(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/09/D5/Ciqah16J2pSAUasvAADYAQDCI70690.png"}),E,C,S,V,I,k,D,W,s(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/09/D5/Ciqah16J2pWAHG2VAAGcLFilTeM857.png"}),f,s(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/09/D5/Ciqah16J2pWAOs5kAAVOIbsDYTA245.png"}),v,s(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/09/D5/Ciqah16J2pWAS2qEAATPX62PrkE180.png"}),M])}const R=o(i,[["render",y]]);export{O as __pageData,R as default};
