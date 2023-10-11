import{_ as l,D as t,o as e,g as c,J as o,h as a,Q as p,m as s}from"./chunks/framework.f67d7268.js";const V=JSON.parse('{"title":"17系统的实践设计（上）：完成一个通用抢票系统","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6799) 17  系统的实践设计（上）：完成一个通用抢票系统.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6799) 17  系统的实践设计（上）：完成一个通用抢票系统.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6799) 17  系统的实践设计（上）：完成一个通用抢票系统.md"},E=p("",9),y=p("",9),i=p("",19),u=p("",3),q=s("p",null,"图 2 活动列表时序图",-1),d=s("p",null,"图 2 中的 Activity-C 是活动 Controller 类，S 则为 Service，M 则是 Model ，Redis 是我们的 Cache 类。",-1),_=s("p",null,"首先，接口请求到 Controller 中，然后去 Service 中拉取在线的活动列表，这时候需要通过 Redis 数据层来获取缓存数据，如果成功获取直接返回，如果获取失败则需要从 Model 层去重新获取，获取成功则再次缓存到数据层中，最后再返回到接口调用方。",-1),F=s("p",null,"在图 2 中，我们发现活动列表的大部分逻辑都经过 Service 层来处理，这其中的主要原因在于：我们希望将业务逻辑处理部分都转移到 Service 来处理，而在 Model 层保存比较单一的数据获取的逻辑。",-1),C=s("p",null,"其他的票列表、票详情和活动详情比较相似，我们看一下这三者的接口参数设置和返回接口就可以了，没必要每个都进行时序图设计。",-1),h=s("h4",{id:"活动详情",tabindex:"-1"},[a("活动详情 "),s("a",{class:"header-anchor",href:"#活动详情","aria-label":'Permalink to "活动详情"'},"​")],-1),g=s("p",null,[a("首先还是来设计接口参数和返回结构，如表格 7。"),s("br"),a(" 表格 7 活动详情接口参数")],-1),B=p("",4),m=s("p",null,"返回的数据结构是一个列表的通用结构，包括 pageNum 是当前页数，hasMore 代表的是是否存在下一页，pageSize 代表的是一页所包含的票数量，lastId 是本页的最后一条数据的 ID ，主要用于辅助翻页，list 则是当前的票列表数据。",-1),x=s("pre",null,[s("code",null,`{
  "ret":0,
  "message":"success",
  "data":{
    "pageNum" : 1,
    "hasMore": true,
    "pageSize": 20,
    "lastId": "0022",
    "list": [
        "id":"111",
        "name":"洗头券",
        "desc":"周六日前往，可免费体验",
        "code":"xxxx11",
        "act_id":"1110",
        "is_effective": true,
        "start_time":1422222333,
        "end_time":1444444444
    ]
}
`)],-1),A=s("h4",{id:"票详情",tabindex:"-1"},[a("票详情 "),s("a",{class:"header-anchor",href:"#票详情","aria-label":'Permalink to "票详情"'},"​")],-1),b=s("p",null,[a("接口参数和返回结构，如表格 9。"),s("br"),a(" 表格 9 活动详情接口参数")],-1),T=p("",4),k=p("",4),v=p("",9);function D(f,P,S,I,M,R){const n=t("Image");return e(),c("div",null,[E,o(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/EF/Cgp9HWCHs9uASQd_AAEmJyLM3ZA530.png"}),a(),y,o(n,{alt:"2021427-16051.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/F6/Cgp9HWCHxM2AVJF9AAEESFYZzXQ742.png"}),a(),i,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/F7/CioPOWCHtCOAQdDiAABbA8HTaXk689.png"}),a(),u,o(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/EF/Cgp9HWCHtDmADmj3AAB9ykWJBzM920.png"}),a(),q,d,_,F,C,h,g,o(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3B/F7/CioPOWCHtFCAUZ2yAAA5HVIwidg206.png"}),a(),B,o(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F7/CioPOWCHtGCAUraVAABWk6QkP0g384.png"}),a(),m,x,A,b,o(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F7/CioPOWCHtGyAJsHYAAA01aveJSg751.png"}),a(),T,o(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F8/CioPOWCHtHiAETgTAAA1-H9aNLI698.png"}),a(),k,o(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/EF/Cgp9HWCHtIOAPyT9AADhIF3eWWE014.png"}),a(),v])}const j=l(r,[["render",D]]);export{V as __pageData,j as default};
