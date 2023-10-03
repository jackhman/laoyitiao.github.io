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
</script>

## 文章索引

<p v-for="(post,pk) in data.folder">

::: details {{pk}} :tada: :100: <VPBadge :type="Object.keys(post).length>40 ? 'danger' : Object.keys(post).length>20 ? 'warning' : 'tip'">共 {{Object.keys(post).length}} 项专栏</VPBadge>

<p v-for="(v,k,i) in post">

{{i+1}} : <VPLink :href="'/posts/'+pk+'/'+k+'/'+v[0]">
{{k}} <VPBadge :type="v.length>40 ? 'danger' : v.length>20 ? 'warning' : 'tip'">共计: {{v.length}} 讲</VPBadge></VPLink>

</p>

:::

</p>

<hr/>

::: tip TIP:
目前基本使用`VitePress`默认主题，有点单调，有时间会重新定制`自定义主题`，如果您愿意提供好的设计可以[点击此处联系我](https://github.com/laoyitiao/docs/issues)

内容来自互联网，经HTML转换为Markdown后，由VitePress生成SPA，转换后的markdown内容与VitePress已基本兼容。

::: warning 但仍存在以下问题【不影响使用】
- 图片在黑色模式下可能会看不清，还需全部替换为vue组件提供`缩放`、`下载`和`全屏预览`

- 页面标题显示不够精确

- markdown内容格式[标题混乱]，主题风格[胡乱使用引用等]都不够统一，不太美观，而且还会导致`MiniSearch`无法命中【MiniSearch仅匹配`title`字段,即markdown中的1-6级标题,字段过多会导致索引文件过大从而引起搜索开始时严重阻塞】

- 部分代码块语言存在错误，代码高亮效果不太理想


:::