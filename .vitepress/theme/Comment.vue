<script setup>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'md5'
import {onMounted,watch} from 'vue'
import {useRoute } from 'vitepress'
const route = useRoute();

const renderGitalk = function (){
  const gitalk = new Gitalk({
    clientID: '3f8edbdf5c1c157fbcb4',
    clientSecret: '0c74d12cbd23beb1538a00907e397b97372d6d0d',
    repo: 'docs-comments',      // The repository of store comments,
    owner: 'laoyitiao',
    admin: ['laoyitiao'],
    id: md5(route.data.relativePath),      // Ensure uniqueness and length less than 50
    distractionFreeMode: false  // Facebook-like distraction free mode
  })
  gitalk.render('gitalk-container')
}
// watch(route,(r,prev)=>{
//   renderGitalk()
// })
onMounted(()=>{
  renderGitalk()
})
</script>

<template>
  <div id="gitalk-container"></div>
</template>
