import{_ as s,j as n,o as _,h as l,k as p,f as a,Q as e,s as t}from"./chunks/framework.d3daa342.js";const D=JSON.parse('{"title":"05海量并发场景下，如何回答分布式事务一致性问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6054) 05  海量并发场景下，如何回答分布式事务一致性问题？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6054) 05  海量并发场景下，如何回答分布式事务一致性问题？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/架构设计面试精讲_文档/(6054) 05  海量并发场景下，如何回答分布式事务一致性问题？.md"},i=e("",18),c=t("p",null,"Spring事务管理",-1),u=t("p",null,"我们假设订单数据，商品数据和促销数据分别保存在数据库 D1，数据库 D2 和数据库 D3 上。",-1),g=t("ul",null,[t("li",null,[t("strong",null,"准备阶段"),a(" ，事务管理器首先通知所有资源管理器开启事务，询问是否做好提交事务的准备。如资源管理器此时会将 undo 日志和 redo 日志计入事务日志中，并做出应答，当协调者接收到反馈 Yes 后，则准备阶段结束。")])],-1),h=t("p",null,"2PC 准备阶段",-1),d=t("ul",null,[t("li",null,[t("strong",null,"提交阶段"),a(" ，当收到所有数据库实例的 Yes 后，事务管理器会发出提交指令。每个数据库接受指令进行本地操作，正式提交更新数据，然后向协调者返回 Ack 消息，事务结束。")])],-1),C=t("p",null,"2PC 提交阶段",-1),P=t("ul",null,[t("li",null,[t("strong",null,"中断阶段"),a("，如果任何一个参与者向协调者反馈了 No 响应，例如用户 B 在数据库 D3 上面的余额在执行其他扣款操作，导致数据库 D3 的数据无法锁定，则只能向事务管理器返回失败。此时，协调者向所有参与者发出 Rollback 请求，参与者接收 Rollback 请求后，会利用其在准备阶段中记录的 undo 日志来进行回滚操作，并且在完成事务回滚之后向协调者发送 Ack 消息，完成事务回滚操作。")])],-1),A=e("",12),T=e("",11),m=e("",8);function q(M,b,k,Q,S,E){const o=n("Image");return _(),l("div",null,[i,p(o,{alt:"18.png",src:"https://s0.lgstatic.com/i/image/M00/8D/5C/Ciqc1F_-ekKAVX8CAAD_lE98vHY368.png"}),a(),c,u,g,p(o,{alt:"19.png",src:"https://s0.lgstatic.com/i/image2/M01/05/43/Cip5yF_-ek-AeszEAAGVNQOE9EQ982.png"}),a(),h,d,p(o,{alt:"20.png",src:"https://s0.lgstatic.com/i/image2/M01/05/45/CgpVE1_-elyAMxAUAAGGnETIxqE263.png"}),a(),C,P,p(o,{alt:"21.png",src:"https://s0.lgstatic.com/i/image2/M01/05/43/Cip5yF_-emuANRvWAAJkZ2BNZ00511.png"}),a(),A,p(o,{alt:"10.png",src:"https://s0.lgstatic.com/i/image2/M01/05/43/Cip5yF_-enyATCEeAACzkaFkExY342.png"}),a(),T,p(o,{alt:"11.png",src:"https://s0.lgstatic.com/i/image2/M01/05/43/Cip5yF_-epGAWFi1AAE-yrH59GA499.png"}),a(),m])}const V=s(r,[["render",q]]);export{D as __pageData,V as default};
