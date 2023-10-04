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


::: tip TIP:
目前基本使用`VitePress`默认主题，有点单调，有时间会重新定制`自定义主题`，如果您愿意提供好的设计可以[点击此处联系我](https://github.com/laoyitiao/laoyitiao.github.io/issues)

内容来自互联网，经HTML转换为Markdown后，由VitePress生成SPA，转换后的Markdown内容与VitePress已`基本兼容`。

::: warning 但仍存在以下问题【不影响使用】
- 页面标题显示不够精确【markdown中缺少H1标题】
- markdown内容格式[标题混乱]，主题风格[胡乱使用引用等]都不够统一，不够美观
- 由于使用的是`LocalSearch`，在首次使用`搜索`时会去下载`索引文件`，若网络不佳会导致点击搜索框后`页面长时间阻塞`
- 部分代码块语言存在错误，`代码高亮`效果不太理想，代码块没有`自动换行`且在手机上有无法滚动浏览代码块的情况
:::

<br/>

# 文章索引

<p v-for="(post,pk) in data.folder">

::: details {{pk}} :tada: :100: <VPBadge :type="Object.keys(post).length>40 ? 'danger' : Object.keys(post).length>20 ? 'warning' : 'tip'">共 {{Object.keys(post).length}} 项专栏</VPBadge>

<p v-for="(v,k,i) in post">

{{i+1}} : <VPLink :href="'/posts/'+pk+'/'+k+'/'+v[0]">
{{k}} <VPBadge :type="v.length>40 ? 'danger' : v.length>20 ? 'warning' : 'tip'">共计: {{v.length}} 讲</VPBadge></VPLink>

</p>

:::

</p>
