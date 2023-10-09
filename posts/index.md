---
sidebar: false
aside: false
editLink: false
footer: false
prev: false
next: false
search: false
---

<script setup>
    import {data} from './posts.data.js';
    import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
    import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';
    import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';

// 去除"空格，数字下划线开头，数字横杠开头，‘文档’"
function changeTitle(str){
    let t = str.replace(/\s+/g,"");
    const patten = /[0-9]*(-|_)/;
    const regExp = patten.exec(t);
    if (regExp!=null) return t.replace(regExp[0],"").replace("文档","");
    return str;
}
</script>


<br/>

# 文章专栏

<p v-for="(post,pk) in data.folder" class="docIndex">

::: details {{pk === 'backEnd' ? ':pill:' : pk === 'frontEnd' ? ':dart:' : ':pick:'}} {{pk}}    <VPBadge :type="Object.keys(post).length>40 ? 'danger' : Object.keys(post).length>20 ? 'warning' : 'tip'">共 {{Object.keys(post).length}} 项专栏</VPBadge>

<p v-for="(v,k,i) in post">

{{i+1}} : <VPLink :href="'/posts/'+pk+'/'+k+'/'+v[0]">
{{changeTitle(k)}} <VPBadge :type="v.length>40 ? 'danger' : v.length>20 ? 'warning' : 'tip'">共计: {{v.length}} 讲</VPBadge></VPLink>

</p>

:::

</p>


::: tip TIP:
目前基本使用`VitePress`默认主题，有点单调，有时间会去定制`自定义主题`，这将包括但不限于：
- :star_struck:全新的布局设计，提升交互体验
- :kissing_heart:更友好的搜索，支持分类分页近义词等...
- :sunglasses:支持关键字索引，文档自动归类等...
- :broken_heart:放弃`Gitalk`评论组件，自行开发评论服务，提升网络体验。[服务器到期了，啥时候有服务器用了啥时候加:sweat_smile:，可能会被攻击不一定上]

如果您愿意提供好的设计或建议[点击此处留言](https://github.com/laoyitiao/laoyitiao.github.io/issues/new?title=主题设计)

文章内容来自互联网，由HTML转换为Markdown后，由VitePress生成SPA，转换后的Markdown内容与VitePress已`基本兼容`。

::: warning 但仍存在以下问题【不影响使用】
- :sweat:markdown`内容格式`[标题混乱]，`主题风格`[胡乱使用引用、列表等]都不够统一，不够美观且影响插件编写
- 部分代码块指定的语言存在错误导致`代码高亮`效果不太理想
- 部分专栏Sidebar顺序存在错误
:::
