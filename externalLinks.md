---
layout: doc
title: 外部链接
lastUpdated: false
---
<script setup>
import Url from 'url-parse';
import queryString from 'query-string';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';

function confirm(){
    document.querySelector("#externalLink").click()
}

let query = Url(document.URL).query;
const params = queryString.parse(query);
const target = params.target;
const alt = params.alt;

</script>


::: warning 注意：
您即将离开`Docs`，去往：<a id="externalLink" :href="target" target="_self">{{target}}</a>
<VPButton text="我已知晓，前往" size="medium" theme="sponsor" @click="confirm"/>
:::