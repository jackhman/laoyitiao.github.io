import{_ as n,j as r,o as p,h as _,k as a,f as t,Q as e,s as o}from"./chunks/framework.d3daa342.js";const V=JSON.parse('{"title":"开篇词既往不恋，当下不杂，未来不迎","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4221) 开篇词  既往不恋，当下不杂，未来不迎.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4221) 开篇词  既往不恋，当下不杂，未来不迎.md","lastUpdated":1696682708000}'),l={name:"posts/devops/043_微服务质量保障 20 讲/(4221) 开篇词  既往不恋，当下不杂，未来不迎.md"},i=e('<h1 id="开篇词既往不恋-当下不杂-未来不迎" tabindex="-1">开篇词既往不恋，当下不杂，未来不迎 <a class="header-anchor" href="#开篇词既往不恋-当下不杂-未来不迎" aria-label="Permalink to &quot;开篇词既往不恋，当下不杂，未来不迎&quot;">​</a></h1><p>你好，我是嘉木，进入测试行业已有十余年，曾在金山、美团、360 等多家知名公司任职。</p><p>期间，我曾负责大型网游项目的功能测试和服务端维护工作，经历了整个项目和团队的搭建过程，并参与了质量保障体系的搭建。因为完整的大型项目经验和质量保障经历，我顺利拿到了大厂 Offer 并转入互联网行业。再之后，我开始负责 20 多人的测试团队管理工作，并从 0 到 1 建立了千万级用户量的即时通信软件的服务端质量保障体系，目前该体系仍在项目中发挥着重要作用。</p><p>可以说，这十年间我见证了国内从 PC 互联网到移动互联网的转型，自身更是经历了从功能测试工程师到服务端测试开发工程师，再到测试专家的成长蜕变。</p><h3 id="微服务架构的盛行-带来了新的机遇与挑战" tabindex="-1">微服务架构的盛行，带来了新的机遇与挑战 <a class="header-anchor" href="#微服务架构的盛行-带来了新的机遇与挑战" aria-label="Permalink to &quot;微服务架构的盛行，带来了新的机遇与挑战&quot;">​</a></h3><p>随着各行业应用的日益复杂化，产品为了适应不断变化的市场环境，就需要快速地迭代，而为了适应这种快速迭代的开发需求，主流的开发框架便由传统的单体应用架构转向微服务架构。<strong>技术快速更迭，守成显然不是正确选择，测试从业者同样需要跟上时代的步伐，如果满足于现状则很容易掉队，甚至被淘汰。</strong></p><p>比如，现阶段很多测试从业者还在项目中进行着&quot;点点点&quot;的测试工作，其实这样不但工作效率极低，而且难以积累实质经验，久而久之就会变成恶性循环。</p><p>再比如，很多测试从业者积累的知识、经验和技能，往往只适用于自己当下的工作场景，这也导致他们不能轻易地换测试对象、换业务模块或者去换工作。因为不仅要重新学习新业务和适应新的协作方，还要变换测试方法和技术等。</p><p>也有很多测试从业者认识到了互联网的核心是各种类型的微服务，而且服务端承载了业务的核心逻辑和用户价值，所以他们选择了服务端测试工程师职业方向。思路和切入点很好，但是对于微服务架构下的服务端应该如何测试，网络上大多是关于接口测试自动化及框架之类的资料，很难让他们建立一个整体的认知，并因此容易误会为------服务端测试只能通过接口测试来进行。</p><p>其实，服务端测试是一套全方位的测试保障体系，除了保证对外提供的接口符合要求，在业务广度和技术深度方面都需要有良好的覆盖率，并且要求有一系列的流程规范、方法、工具等做支撑。而软件测试人员需要根据技术架构和测试对象的特点，相应地调整自己的测试策略和思路，积累和总结测试方法和技能，进而沉淀出体系化的保障体系。</p><p>此外，各大互联网公司也都在积极招募服务端测试高级工程师、服务端测试开发工程师等服务端测试岗位，薪资非常具有竞争优势：</p>',11),c=e('<p>从招聘需求中可以看到，与很多测试从业者对服务端测试的认知和技能还停留在传统的<strong>服务端测试</strong> 阶段不同，大厂已经明确要求服务端测试工程师参与<strong>服务端质量保障体系</strong>的建设。而即使熟悉服务端质量保障体系的测试人才，也因为微服务的盛行面临新的挑战。他们需要针对微服务的特点、所在项目的环境情况做进一步的分析，对质量保障体系做合理裁剪，才能真正落地应用。</p><h3 id="服务端质量-保障-体系的重要性" tabindex="-1">服务端质量（保障）体系的重要性 <a class="header-anchor" href="#服务端质量-保障-体系的重要性" aria-label="Permalink to &quot;服务端质量（保障）体系的重要性&quot;">​</a></h3><p>这里我们有必要先厘清两个概念：<strong>测试</strong> 更多指具体的测试活动，而<strong>质量保障</strong>是一个全面的体系化的内容，测试只是其中的一个环节或方面。</p><p>对业务发展来说，质量保障体系是企业内部系统的技术和管理手段，是为满足业务发展需要、生产出满足质量目标的产品而建立的，有计划的、系统的企业活动。它随着业务发展的阶段性规划和目标做调整，具有强烈的实用意义，不是单为建立体系而建立。</p><p>对个人职业发展来说，质量保障体系指明了一个测试人员的终极目标。初阶测试人员的工作重点为&quot;具体的测试工作&quot;，中阶测试人员除了&quot;具体的测试工作&quot;，还需要能够参与&quot;质量保障体系的建设&quot;，而像测试架构师、测试专家、测试经理等高阶测试人员则需要能够规划、设计和主导&quot;质量保障体系的建设&quot;。可见，<strong>工作中对&quot;质量保障体系建设&quot;的投入度体现了测试人员的职业发展阶段和核心竞争力，并且影响着测试人员的薪资待遇。</strong></p><blockquote><p>具体到实际工作场景中，假如没有搭建测试环境并建立提交测试的规范，测试活动无从开展；假如没有设置可量化的质量目标，测试活动都不知道应该在什么时候结束；假如不对质量指标进行定期分析和运营，就没有办法针对某类质量痛点做定向改进；假如没有引入丰富的测试技术和手段，测试活动的充分性和效率就无法保障......这些都是质量保障体系的范畴，可见质量保障体系，既是基础，又是核心。</p></blockquote><p><strong>对于测试人员来说，一定要尽早树立测试策略分析和构建质量保障体系的意识，从全局视角理解所在业务中的质量保障体系。以终为始，有意识、有规划地补齐质量保障体系中的各种手段和技能，才能去体验不同的职业成长路径。</strong></p><h3 id="课程设计" tabindex="-1">课程设计 <a class="header-anchor" href="#课程设计" aria-label="Permalink to &quot;课程设计&quot;">​</a></h3><p>借由这个微服务质量保障专栏，我希望能弥补市面上这部分知识的空白。现如今绝大多数服务端都是以微服务的形式存在，这也正是我围绕微服务的测试和质量保障展开介绍的关键所在。</p><p>专栏合计 4 个模块，共 20 篇文章，包含了<strong>技术、体系、经验、方法论</strong> 等内容，这正是一个测试从业者<strong>从新手到资深</strong>必须建立的知识体系。</p><ul><li><p><strong>微服务测试概况。</strong> 我介绍了微服务的产生背景和基本特点，微服务架构下服务端质量面临的各种挑战，以及应该通过什么样的测试策略和质量保障体系来应对这些挑战。学完本部分，你可以对微服务的成因有个基本了解，能够从正反两面来看微服务的特点，为做好微服务测试打好基础。</p></li><li><p><strong>微服务测试策略详解。</strong> 微服务测试在深度上需要通过分层测试来完成，主要包括单元测试、集成测试、组件测试、契约测试、端到端测试等分层测试技术和方法，本模块将一一详解这些内容。学完本部分，你会具备对微服务进行深度测试的能力。</p></li><li><p><strong>微服务质量保障体系。</strong> 因为只有分层的测试策略无法全面保障服务端质量，我在此详细讲解了微服务的质量保障体系。在实际的项目中，你还需要不断优化研发过程中的流程规范，优化测试技术和工具，并对微服务的各类属性进行有效度量与运营，再配合必要的组织保障，方可全方位保障微服务的质量。学完本部分，你可以全方位、多角度地构建微服务的质量保障体系。</p></li><li><p><strong>扩展话题探讨。</strong> 通过&quot;软件测试新趋势探讨&quot;和&quot;测试从业者如何打造自身的核心竞争力&quot;这两个话题，使你了解趋势，并保持开放心态，主动拥抱变化。</p></li></ul>',11),g=o("h3",{id:"讲师寄语",tabindex:"-1"},[t("讲师寄语 "),o("a",{class:"header-anchor",href:"#讲师寄语","aria-label":'Permalink to "讲师寄语"'},"​")],-1),d=o("p",null,[t('曾国藩说："'),o("strong",null,"既往不恋，当下不杂，未来不迎"),t('"，表达了他对于过去、现在与未来的不同态度：对未来有规划，不过分留恋过去，走好当下的每一步，为达成目标持续努力。这句话同样适用于每一位测试从业者。')],-1),h=o("p",null,[t("虽然我们每个人入行的起点不同，但"),o("strong",null,"目标和终点往往是一致的"),t("，希望你能够通过持续的学习和努力打造核心竞争力，让自己在职业道路上有更多的选择。而这也就意味着，你不能一味重复几乎所有从业者人都会做的事情。")],-1),u=o("p",null,"最后，欢迎在留言区分享你关于测试的感悟与成长经历，以及关于微服务测试的任何想法，未来这段时间，让我们一起努力。",-1);function q(m,A,f,T,b,C){const s=r("Image");return p(),_("div",null,[i,a(s,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/35/39/Ciqc1F8VK_6AQpYjAABA-cWN2mI917.png"}),t(),a(s,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/35/3A/Ciqc1F8VLASAEQ8CAABrZtOY7vE525.png"}),t(),c,a(s,{alt:"课程表2.png",src:"https://s0.lgstatic.com/i/image/M00/44/82/CgqCHl8-QsCAV2t0AAL0aNx5gwI248.png"}),t(),g,d,h,u])}const k=n(l,[["render",q]]);export{V as __pageData,k as default};
