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
    - theme: alt
      text: 在GitHub上查看
      link: https://github.com/laoyitiao/docs

features:
  - icon:
      src: /confettiWidget/panda.png
    title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    linkText: 百度
    link: http://www.baidu.com
    rel: external
  - icon:
      src: /confettiWidget/cute.png
    title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    linkText: 前往查看
    link: http://www.baidu.com
    rel: external
  - icon:
      src: /confettiWidget/love-birds.png
    title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    linkText: 百度
    link: http://www.baidu.com
    rel: external
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