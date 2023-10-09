import{_,j as i,o as n,h as l,k as o,f as s,Q as a,s as t}from"./chunks/framework.d3daa342.js";const I=JSON.parse('{"title":"第37讲：敏捷开发中基于场景事件流的用例设计","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1622) 第37讲：敏捷开发中基于场景事件流的用例设计.md","filePath":"posts/devops/112-高效敏捷测试文档/(1622) 第37讲：敏捷开发中基于场景事件流的用例设计.md","lastUpdated":1696682708000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1622) 第37讲：敏捷开发中基于场景事件流的用例设计.md"},r=a("",7),c=t("h4",{id:"在敏捷测试中的应用",tabindex:"-1"},[s("在敏捷测试中的应用 "),t("a",{class:"header-anchor",href:"#在敏捷测试中的应用","aria-label":'Permalink to "在敏捷测试中的应用"'},"​")],-1),d=t("p",null,[s("在敏捷测试设计中，可以将特性或 Epic 描述的需求转化为事件流，相当于完成业务流程的分析，能够梳理出一些场景，从而产生事件流图的分支------"),t("strong",null,"扩展流"),s(" 、"),t("strong",null,"异常流"),s("。为了尽可能生成所有的事件流，对梳理出的场景可以进行可能的组合，从而产生可能存在的事件流。")],-1),g=t("p",null,'例如，以在线教育 App 的"课程购买"为例，它涉及"余额支付、微信支付、支付宝支付、拼团购买、礼券、优惠码"等多个用户故事。在上一讲中，侧重对每个用户故事进行测试，现在则是对"课程购买"这个特性进行完整的业务测试，把这些用户故事串起来进行测试。更准确地说，先将把每个用户故事遇到的场景列出来，然后不是将用户故事串起来，而是将用户故事的某些场景串起来，形成新的扩展流和异常流。而基本流则是选择要购买的课程，然后选择支付方式、支付相应的费用，一切顺利，购买到课程。',-1),h=t("p",null,"而在这过程中，可能会遇到网络问题、余额不足而需要充值，或者不是遇到问题，而是有礼券或优惠码可以用。礼券一般可以用在各个课程中，以抵扣部分课程费用，而优惠码一般和课程绑定，免费购买课程。",-1),u=t("p",null,"基于实际业务和以上因素的考虑，可以绘制出事件流图。图 2 是一个简化的版本，实际情况可能更复杂，比如课程优惠期购买、拼团购买、点击他人分享链接之后购买等场景。",-1),A=t("p",null,'事件流图完成之后，就可以生成测试用例了，即遍历根节点"开始"到所有叶节点"结束"的路径。遇到循环的话，其路径可能是无限的，这时，如果质量要求不高，可以考虑完成一次完整的循环；如果质量要求高，则完成 2 次或更多次的循环，保证更高的测试充分性。',-1),m=t("p",null,'像图 1 这样的事件流图，可以生成图 3 所示那样的从根节点到叶节点的 E2E 测试用例，从左边基本流开始、然后是扩展流、最后到右边异常流。这里没有列出所有的测试用例，扩展流由图中间的 5 条测试用例再加上"登录、注册、余额不足换一种支付方式"等 3 条，总共是 8 条扩展测试用例，异常由图中右边两条用例再加上"密码输错多次"，共 3 条。所以，总共有 12 条（1+8+3）测试用例。',-1),q=a("",7),T=a("",5);function E(S,C,f,F,P,V){const e=i("Image");return n(),l("div",null,[r,o(e,{alt:"image1.png",src:"https://s0.lgstatic.com/i/image/M00/0A/6F/Ciqc1F6-EjWARB5fAAGuc70uwDc373.png"}),s(),c,d,g,h,u,o(e,{alt:"image2.png",src:"https://s0.lgstatic.com/i/image/M00/0A/6F/CgqCHl6-Ej6AAoWTAAJ6EbVSudI167.png"}),s(),A,m,o(e,{alt:"image3.png",src:"https://s0.lgstatic.com/i/image/M00/0A/6F/Ciqc1F6-Ek6AXIfqAAPVUKpGq-M576.png"}),s(),q,o(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/0A/C6/CgqCHl6-cCaAAiLeAACLGCB-8_0697.png"}),s(),T])}const b=_(p,[["render",E]]);export{I as __pageData,b as default};
