import{_ as s,j as n,o as c,h as i,k as o,f as a,Q as r,s as e}from"./chunks/framework.d3daa342.js";const R=JSON.parse('{"title":"第08讲：哈希表在Facebook和Pinteret中的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(534) 第 08 讲：哈希表在 Facebook 和 Pinteret 中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(534) 第 08 讲：哈希表在 Facebook 和 Pinteret 中的应用.md","lastUpdated":1696682708000}'),h={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(534) 第 08 讲：哈希表在 Facebook 和 Pinteret 中的应用.md"},d=r("",35),p=r("",15),_=e("p",null,"Sorted Sets 这个类型其实就是在 Set 外的基础上加上了一个 Score 的概念，Redis 内部会根据 Score 的大小对插入的键进行排序。比如说，Pinterest 会把一个用户所关注的其他用户按照以关注时间戳为 Score，关注的用户 ID 作为键存放在 Sorted Sets 里。",-1),b=e("br",null,null,-1),l=e("p",null,"这样做的好处就是当一个用户在查看自己所有关注过的用户时，可以读取所有存储在这个 Sorted Sets 里的数据，而因为 Score 的值是关注这个用户的时间戳，所以读取数据出来的时候，会按照自己关注他们的时间顺序读取出来，而不是乱序地读取关注过的用户。",-1),g=e("br",null,null,-1),m=e("p",null,"Pinterest 也会将对于一个 Board 的所有关注用户存放在 Redis 的 Hash 里。这样，一个 Board 每次发布一个新的 Pin 之后，就无需到数据库中寻找应该推送这个 Pin 给哪些用户了，而是直接从 Redis 中读取所有关注了这个 Board 的用户。",-1),k=e("br",null,null,-1),P=e("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"树的基本原理"，记得按时来听课哈。',-1);function u(S,M,F,f,A,q){const t=n("Image");return c(),i("div",null,[d,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/60/C6/Cgq2xl4YQN2AA74vAABzCbPb1_E500.png"}),a(),p,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/60/C5/CgpOIF4YQN2AaykSAAEoFuAApMU699.png"}),a(),_,b,l,g,m,k,P])}const x=s(h,[["render",u]]);export{R as __pageData,x as default};
