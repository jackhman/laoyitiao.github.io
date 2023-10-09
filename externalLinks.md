---
layout: doc
lastUpdate: false
title: 外部链接提醒
---
<script setup>
import Url from 'url-parse';
import queryString from 'query-string';
import { onMounted,ref } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
let target = ref("");
let alt = ref("");
function confirm(){
    document.querySelector("#externalLink").click()
}
onMounted(()=>{
    let query = Url(document.URL).query;
    const params = queryString.parse(query);
    target.value = params.target;
    alt.value = params.alt;
});
</script>


::: warning 注意：
您即将离开`Docs`，去往：<a id="externalLink" :href="target" target="_self">{{target}}</a>
<VPButton text="我已知晓，前往" size="medium" theme="sponsor" @click="confirm"/>
:::