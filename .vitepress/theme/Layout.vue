<script setup lang="ts">
import { useData,useRouter,useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide,ref,watch,onMounted } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const route = useRoute()

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
onMounted(changeTitle)
watch(route,changeTitle)


const router = useRouter();
NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示
router.onBeforeRouteChange=(to)=>{
  NProgress.start();
  return true;
}
router.onAfterRouteChanged=(to)=>{
  NProgress.done();
}
</script>

<template>

  <DefaultTheme.Layout>
    <template #sidebar-nav-before>
      <div class="title" style="padding: 20px 0px 0px 0px">
        <strong>{{ title }} ：</strong>
      </div>
    </template>
  </DefaultTheme.Layout>

</template>
