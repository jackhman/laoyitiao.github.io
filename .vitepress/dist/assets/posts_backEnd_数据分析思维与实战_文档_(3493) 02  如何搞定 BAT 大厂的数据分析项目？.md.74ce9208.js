import{_ as e,j as i,o as s,h as r,k as o,f as t,Q as l,s as p}from"./chunks/framework.d3daa342.js";const x=JSON.parse('{"title":"02如何搞定BAT大厂的数据分析项目？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据分析思维与实战_文档/(3493) 02  如何搞定 BAT 大厂的数据分析项目？.md","filePath":"posts/backEnd/数据分析思维与实战_文档/(3493) 02  如何搞定 BAT 大厂的数据分析项目？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/数据分析思维与实战_文档/(3493) 02  如何搞定 BAT 大厂的数据分析项目？.md"},_=l('<h1 id="_02如何搞定bat大厂的数据分析项目" tabindex="-1">02如何搞定BAT大厂的数据分析项目？ <a class="header-anchor" href="#_02如何搞定bat大厂的数据分析项目" aria-label="Permalink to &quot;02如何搞定BAT大厂的数据分析项目？&quot;">​</a></h1><p>今天我讲一下 BAT 的数据分析工作。</p><h3 id="bat-招聘解析" tabindex="-1">BAT 招聘解析 <a class="header-anchor" href="#bat-招聘解析" aria-label="Permalink to &quot;BAT 招聘解析&quot;">​</a></h3><p>通过招聘解析的讲解，一是希望你能了解互联网大厂数据分析师的日常工作内容是什么，揭开大厂招聘的神秘面纱；二是通过他们的岗位要求，了解到自身的差距，并对不足有针对性的面试准备，或提升自己在行业内的技术能力。</p><h4 id="阿里" tabindex="-1">阿里 <a class="header-anchor" href="#阿里" aria-label="Permalink to &quot;阿里&quot;">​</a></h4>',5),h=p("p",null,"（阿里数据分析师岗位职责）",-1),c=p("p",null,'先看下阿里的岗位职责描述，关键词有"代理""方向""痛点""转化""风险""创新""落地""合作"，岗位要求的关键词有"敏感度""方法论""管理整合"。由此可以看出，阿里的分析师岗位对技术要求不是很高，但对人的综合能力要求非常高，需要具备一定的数据敏感度和方法论。之所以没有特别要求技术能力是因为市场上工作三五年的分析师基本上都具备了一定的技术能力，但仍有很多人缺少宏观、中观与微观意识，这也是大部分人的职业瓶颈。',-1),d=p("h4",{id:"腾讯",tabindex:"-1"},[t("腾讯 "),p("a",{class:"header-anchor",href:"#腾讯","aria-label":'Permalink to "腾讯"'},"​")],-1),A=p("p",null,"（腾讯数据分析师岗位职责）",-1),g=p("p",null,'再来看下腾讯的岗位职责描述，关键词有"埋点""异常检测""决策""A/B 测试"等，岗位要求包括"海量数据处理""用户增长"等，可以看出腾讯的岗位职责中规中矩，基本涵盖了 80% 的互联网公司数据分析师的日常工作内容。值得关注的是腾讯特别提到了增长黑客的经验，目前独角兽企业都会要求有这样的经验。',-1),u=p("h4",{id:"百度",tabindex:"-1"},[t("百度 "),p("a",{class:"header-anchor",href:"#百度","aria-label":'Permalink to "百度"'},"​")],-1),q=l('<p>（百度数据分析师岗位职责）</p><p>再来看下百度的岗位职责描述，关键词有&quot;分析体系&quot;&quot;专项策略&quot;&quot;用户增长&quot;&quot;逻辑思维&quot;&quot;敏感度&quot;等，可以看出百度对个人的&quot;发散思维&quot;和&quot;策略研究&quot;要求非常高，同时在用户运营领域也要有自己的体系。</p><p>我们可以看出对于 BAT，他们会特别关注用户增长，毕竟独角兽企业只有持续增长才能获得发展，而在实际工作中，你也会感同身受，所有项目都是为了用户增长而构建。</p><h3 id="日常工作" tabindex="-1">日常工作 <a class="header-anchor" href="#日常工作" aria-label="Permalink to &quot;日常工作&quot;">​</a></h3><p>第二部分就是日常工作，日常工作主要包括数据异常的排查和融入专项，做专项分析并负责 KPI、埋点，指标体系等。</p><h4 id="数据异常排查" tabindex="-1">数据异常排查 <a class="header-anchor" href="#数据异常排查" aria-label="Permalink to &quot;数据异常排查&quot;">​</a></h4><p>我们先看下数据异常排查的背景，一般情况下，BAT 的数据产品 DAU 都比较大，动辄几百万上千万，甚至过亿，因此业务方和管理层每天都会盯着核心数据，而在这些核心数据中肯定会有一些数据是波动比较大的。这时，分析师需要对这些波动进行排查并解释原因，如果没有一套方法论面对问题就会很头痛，你可以回想下自己是否面对过这种情况，每天早上面对波动数据无从下手，找不到原因，解决不了，进而浪费很多时间做了很多无用功，感觉永无出头之日。</p><p>实际上，数据有较大波动，无非就两个原因：一是目前数据本身有问题；二是业务本身有问题。</p><p>如果能够透过问题看本质，你就可以在数据波动方面成为专家。当然数据异常排查是需要一些前期准备的：</p><ul><li><p>业务理解；</p></li><li><p>指标口径；</p></li><li><p>当前数据产出过程。</p></li></ul><p>第一个业务理解，比如某个 App 的 DAU 低于1000w，那么请问这个 DAU 代表的是什么行动的DAU，是在进程中还是需要打开 App，还是必须有主动行为，这理解起来是不一样的。第二个指标口径，同样是 DAU 一千万，是 Android 还是所有系统。第三个产出过程，对于 DAU 一千万目前是由哪份日志做了哪些数据清洗计算出来的，只有了解清楚这些才能够开始异常排查。</p><p>举个例子，市场部领导看了某一张日活数据和你提供的数据相差较大，就来询问是怎么回事。实际上这时你首先需要弄清楚他看到的数据表是怎样产出的，然后指标口径是什么，指标的业务含义是什么，只有熟悉这些情况后才能分析出产生差异的原因。</p><p>实际工作中，有些分析师在进入一家公司时产品已经比较成熟，但指标口径没有文档化，所以可能对业务理解不深，这个时候面对领导的提问就会手足无措，一旦不能解决问题就会失去信任，所以前期准备工作一定要做好。</p><p>有了前期准备工作，接下来就是异常排查步骤了，异常排查主要分三步：</p><ol><li><p>判断是否异常；</p></li><li><p>最大概率法则归类；</p></li><li><p>闭环。</p></li></ol><p>第一步判断是否异常，有四个关键点：</p><ul><li><p><strong>亲自去看数据准确性，不要人云亦云</strong>，比如业务方说 DAU 下降了就立马去调查，这是不对的，而是应该亲自查看数据是否真实，有时候业务方不一定多专业，也会出现错误。</p></li><li><p><strong>时间轴拉长，看是近期异常（3 个月）还是历史异常</strong>，一般分析师看数据时习惯看近一两周或一个月的数据，然后突然出现波峰或波谷就认为数据异常了，但实际上往往不是。我们一定要拉长时间轴，如果仍出现波峰或波谷可能就真的出现异常了。</p></li><li><p><strong>看和该指标关联的其他指标或其他核心指标是否也异常</strong>，比如 DAU 异常时，需要查看自流、渗透率是否异常，如果也异常就需要一起解决，而不是按下葫芦浮起瓢，反复做无用功。</p></li><li><p><strong>找到一个关键人物（产品/数据），提前沟通</strong>，也就是当我们确认是数据异常后，找经验丰富的人提前沟通，看他们对此是否有什么见解，往往经验能够快速的定位问题。</p></li></ul><p>第二步就是最大概率法则原因归类，很多分析师遇到异常时无从下手，抓不到问题主线，无法对问题进行有效分类，而我把异常问题分为了六大类，基本上所有的异常问题都归属于这六大类。</p><ul><li><p><strong>假期效应</strong>：开学季、暑假、四大节、当地节日；</p></li><li><p><strong>热点事件</strong>：常规热点（世界杯）、突发热点（爆款 IP）；</p></li><li><p><strong>活动影响</strong>：双 11、618，公司层面活动；</p></li><li><p><strong>政策影响</strong>：互联网金融监管，快递实名；</p></li><li><p><strong>底层系统故障</strong>：数据传输、存储、清洗有无问题；</p></li><li><p><strong>统计口径</strong>：业务逻辑更改、指标计算方式更改。</p></li></ul><p>所以当我们遇到问题时，就可以按照降序在这六大类中逐一排查找到问题原因。</p><p>第三步就是闭环，当我们排查出问题原因后，一定要形成闭环，关于闭环有三个点：</p><ul><li><p>持续跟踪后期数据是否再次异常，比如当我们排查出原因后，产品做相应的改进，而问题仍在就说明前期排查问题出错。</p></li><li><p>记录、沉淀、文档化，因为后续我们可能还会遇到相同问题，所以记录文档利人利己。</p></li><li><p>邮件化，只有确认没有问题再发邮件给相关方，描述影响范围和主要结论即可。</p></li></ul><p>举个例子，某 App 海外版的主要用户在东南亚地区，某天 DAU 突然涨到 5000 万，与历史数据相比明显异常，问了很多人之后，发现数据采集、传输、活动、业务口径、常规热点等都没有变化。</p><p>这时你先不要困惑，我们按照问题归类逐一排查，发现爆款 IP 没有排查到，我们就按照这个点继续排查数据，果然发现因为某国宝级的明星突然去世带来了 App 大量访问。因为在海外，信息传输比较慢，而突发事件国内用户无法快速知道，所以分析师发现流量提升后应该快速反馈给业务人员，业务确认没问题后立刻调动运营资源对该明星进行全方位解析，持续蹭热点把事件发酵到最大化，养成用户口碑。</p><p>及时地响应事件后，整个 App 的 DAU 上涨了 10 个点，而一般的产品运营优化很难达到这个效果。针对这样的突发事件并不是每个分析师都能够遇到，但遇到异常数据一定要多尝试，虽然很多分析师排斥数据异常，但优秀的分析师还是能够从异常中发现业务增长点。</p><p>所以遇到问题时，要有耐心，最后总会有所发现。我已经归纳了问题的归类，你在实际工作中可以直接参考，我们接下来看如何融入专项，也就是专题分析。</p><h4 id="专题分析" tabindex="-1">专题分析 <a class="header-anchor" href="#专题分析" aria-label="Permalink to &quot;专题分析&quot;">​</a></h4><p>关于专题分析，我们在上个课时也有介绍过，只不过对于 BAT 而言，专题分析有三个特征：</p><ul><li><p>有目标：紧贴项目 KPI；</p></li><li><p>有节奏：2~3 周时间输出一份完整报告；</p></li><li><p>有闭环：所有的报告都说人话，做人事。</p></li></ul><p>我们以今日头条 App 新用户留存专项为例来看下这三个特征。</p><p><strong>项目背景</strong>：2015 年今日头条 App 新用户次留、7 留（7 日留存）与竞品相比，留存均低于 5% 绝对值，并且新用户流失速度要高于竞品，因此要在数据分析基础上，产品运营优化，提升用户留存 5% 绝对值。</p><p>这是项目的一个背景，有了项目背景后分析师应该怎么做，主要分为三个阶段：</p><p><strong>第一阶段：新用户留存整体分析</strong></p><p>目的：摸清数据现状，同时找到若干切入点。</p><p>关键点：不要太注重细节，该过程讲究报告产出的时效性，让其他人员感受到分析师的存在。</p><p>在一个项目里会有产品、运营、研发，这些岗位你都很好理解，都是必要岗位，但别人往往觉得分析师不是必要的岗位。因为 BAT 的产品和运营肯定都会一些基础数据的处理，都会写 SQL。为了让其他人员感受到分析师的存在，我们一定要在项目前期，大家都比较困惑，找不到点的时候，我们用两周左右的时间输出一份专题报告，把一些细节的数据体现出来。</p><p>比如我这里写了渠道侧、产品侧、用户侧（如图所示）：</p>',37),T=l('<p>（新用户留存分析）</p><p>渠道侧里的 UV 多少？ 一级渠道的次留、7 留有多少，二级渠道的次留、7 留有多少。</p><p>产品侧里的主要功能，它的渗透率是什么情况，有没有出什么问题，关键漏斗数据怎么样，漏斗数据上面有没有什么发现。</p><p>用户侧指我们目标用户群体是哪些，用户行为分布又是什么情况，比如我们知道人均浏览文章篇数是三、四篇，那么具体的分布是什么样子？有多少用户是阅读一篇的，或者说有多少用户压根一篇都不看。</p><p>所以第一阶段就是预估下大致数据。</p><p><strong>第二阶段：寻找优化切入点，一般是 1～2 个</strong></p><p>比如在前面那个架构图里面发现：</p><ol><li>关键路径数据发现曝光 PV 到点击 PV 的 CTR 很低。</li></ol><p>应细致分析：对于新用户，应该曝光什么，在什么时候、什么位置曝光。</p><ol start="2"><li>某个量大的二级渠道次留明显要低于其他渠道。</li></ol><p>应进一步分析： 对于该渠道，用户的留存过低是因为本身渠道质量存在问题？用户已经安装竞品？当前产品设计与渠道用户不太匹配？同时高留存的渠道本身特征是什么？</p><p>切入以上两点，就已经能给产品运营不少建议了，再配合 A/B 测试，就能看到数据分析效果。</p><p>A/B 测试过于复杂，后面会单独展开。我们一定要相信，在一个项目或产品才开始做的时候，它一定是存在诸多问题，基于我们数据的深入分析和切入点的生活轨迹往往就能够提供很多优化建议，即使现在很多产品已经比较成熟，但始终还有优化空间，所以数据分析的发挥空间还是非常大。</p><p><strong>第三阶段 ： 不断<strong><strong>地</strong></strong>重复前面两个阶段，继续寻找其他切入点</strong></p><p>除了寻找本身产品的切入点，需要同时进行竞品分析、营销活动分析、用户流失分析等，整个过程就是在不断地&quot;试错&quot;。每一次分析报告都要有能落地的点，并且真的落地了，这就是闭环，这也是优秀分析师最重要的评判标准。</p><h3 id="bat-面试技巧以及必问问题" tabindex="-1">BAT 面试技巧以及必问问题 <a class="header-anchor" href="#bat-面试技巧以及必问问题" aria-label="Permalink to &quot;BAT 面试技巧以及必问问题&quot;">​</a></h3><h4 id="面试技巧" tabindex="-1">面试技巧 <a class="header-anchor" href="#面试技巧" aria-label="Permalink to &quot;面试技巧&quot;">​</a></h4><p>我们再说一下面试技巧，这几家公司的面试基本上都是五到六面，前三面最为关键。第一面基本上都是电话面，第二面是 Boss 一面，第三面是 Boss 二面，所有的面试都是基于简历，所以你的简历一定要多下点功夫。</p><p>第一面的关键点就是逻辑性。因为电话面看不到人，所以往往就看求职者基本功怎么样。你说话要条理清晰，然后对简历上的数据要非常熟悉，例如：活跃、留存、流失、渠道等。如果问你目前大概有哪些渠道，每个渠道的留存大概是多少，这些你都答不上来，那肯定是过不了关。</p><p>第二面的关键点就是实操性。因为现场面是人与人现场的互动，首先要尊敬对方，面带微笑。其次要多使用你应聘岗位的产品 App ，同时带上一份你写的优秀专题分析报告，这可以证明你爱思考、有能力。</p><p>第三面是要有亮点，因为 Boss 二面一般是总监面。总监的高度比较高，所以我们要从宏观的角度去说，比如说目前整体的行业趋势是什么样子，然后行业里有哪些痛点，这些产品有哪些方法可以改进，之前做的项目的上、下游是怎么考虑的，总之就是多有一些想法。</p><h4 id="bat-面试必问的三个问题" tabindex="-1">BAT 面试必问的三个问题 <a class="header-anchor" href="#bat-面试必问的三个问题" aria-label="Permalink to &quot;BAT 面试必问的三个问题&quot;">​</a></h4><p>Q1：流量波动，数据突然涨了怎么分析？</p><p>Q2：分析下你手机里面最常用的三个 App 是哪三个（这个问题套路很深）？</p><p>Q3：商业模式，你之前产品的 CPC/CPM 以及商业模式是什么样的，你在这一块是怎么优化的？</p><p>这三个问题的答案你可以先想一下，在下方留言讨论。下一节我将讲解中小型私企的数据分析工作，也会分享我对以上三个问题的理解。</p>',26);function m(b,B,P,f,C,k){const a=i("Image");return s(),r("div",null,[_,o(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/18/F8/CgqCHl7ZwteADv9xAAC0-raOQaY656.png"}),t(),h,c,d,o(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/18/ED/Ciqc1F7ZwuKAS1rQAADRpU00f3U484.png"}),t(),A,g,u,o(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/19/0C/Ciqc1F7Z69GAM9_0AAeYlnckECM166.png"}),t(),q,o(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/18/F9/CgqCHl7Zwz2ASwOlAAB_LLrVFdY987.png"}),t(),T])}const S=e(n,[["render",m]]);export{x as __pageData,S as default};
