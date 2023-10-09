<script setup lang="ts">
import { useRouter,useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {ref,watch,onMounted,onBeforeUnmount, } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Url from 'url-parse'
const route = useRoute()
const router = useRouter();
const title = ref('');


function changeTitle(){
  const routeSplit = route.data.relativePath.split("/");
  if (routeSplit.length>=2){
    let t = routeSplit[routeSplit.length-2].replace(/\s+/g,"")
    const patten = /[0-9]*(-|_)/
    const regExp = patten.exec(t);
    if (regExp!=null) title.value = t.replace(regExp[0],"").replace("文档","")
  }
}
watch(route,changeTitle,{immediate:true})

function t(e){
  e.preventDefault();
  if (Url(document.URL).hostname !== Url(e.target.href).hostname){
    // 已经在提醒页面 仍然点击A标签
    if (Url(document.URL).pathname==="/externalLinks"){
      window.open(e.target.href,"_self");
      return true
    }else {
      window.open("/externalLinks?target="+e.target.href+"&alt="+e.target.innerText, '_blank');
      return false;
    }
  }
}
function preventAClick(){
  let aTags = document.querySelectorAll(".content a");
  aTags.forEach((a)=>{
    a.addEventListener("click", t, true)
  })
}

function removeClickListener() {
  let aTags = document.querySelectorAll(".content a");
  aTags.forEach((a)=>{
    a.removeEventListener("click",t)
  })
}

onMounted(()=>{
  preventAClick()
  window.onpopstate = ()=>{
    setTimeout(preventAClick,500)
  }
})



onBeforeUnmount(()=>{
  removeClickListener()
})


NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示
router.onBeforeRouteChange=(to)=>{
  removeClickListener()
  NProgress.start();
  return true;
}
router.onAfterRouteChanged=(to)=>{
  NProgress.done();
  preventAClick()
}

</script>

<template>
  <DefaultTheme.Layout>
    <template #sidebar-nav-before>
      <div class="title" style="padding: 20px 0px 0px 0px">
        <strong>{{ title }}</strong>
      </div>
    </template>
  </DefaultTheme.Layout>

</template>
