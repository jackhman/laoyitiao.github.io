---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 首页
hero:
  name: Jun的静态博客
  text: 不积硅步无以至千里
  tagline: b.2023
  image:
    src: /logo/sloth512.png
    alt: VitePress
  
  actions:
    - theme: brand
      text: 瞄一哈
      link: /posts/
    - theme: sponsor
      text: 在GitHub上查看
      link: https://github.com/laoyitiao/laoyitiao.github.io

features:
  - icon:
      src: /confettiWidget/panda.png
    title: 完整
    details: 所有知识点深入剖析，深入浅出
  - icon:
      src: /confettiWidget/cute.png
    title: 全面
    details: 包含frontEnd、backEnd、devops的方方面面
  - icon:
      src: /confettiWidget/love-birds.png
    title: 干净
    details: Docs不会收集您的任何信息
---


<script setup>
    import Confetti from ".vitepress/theme/Confetti.vue";
</script>

<div id="Confetti" @click.right="void 0">
<Confetti/> 
</div>


<style>
#Confetti{
    position: fixed;
    inset: 0;
    z-index: -10;
}

#Confetti:after{
    position: absolute;
    inset: 0;
    z-index: 1;
    content: '';
    /*background-color: rgba(0,0,0,.1)*/
}
</style>