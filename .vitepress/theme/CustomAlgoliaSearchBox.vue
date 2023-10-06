<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import docsearch from '@docsearch/js'
import { onMounted, watch } from 'vue'
import { useRouter, useRoute, } from 'vitepress'
import { useData as useData$ } from 'vitepress'
const useData = useData$;
const props = defineProps<{
  algolia: DefaultTheme.AlgoliaSearchOptions
}>()

const router = useRouter()
const route = useRoute()
const { site, localeIndex, lang } = useData()

type DocSearchProps = Parameters<typeof docsearch>[0]

onMounted(update)
watch(localeIndex, ()=>{
  update()
})

function update() {
  const options = {
    ...props.algolia,
    ...props.algolia.locales?.[localeIndex.value]
  }
  const rawFacetFilters = options.searchParameters?.facetFilters ?? []
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters)
            ? rawFacetFilters
            : [rawFacetFilters]
    ).filter((f) => !f.startsWith('lang:')),
    `lang:${lang.value}`
  ]

  console.log("update options",options);
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters
    }
  })
}


function initialize(userOptions: DefaultTheme.AlgoliaSearchOptions) {
  const options = Object.assign({}, userOptions, {
    container: '#docsearch',
    navigator: {
      navigate({ itemUrl }) {
        const { pathname: hitPathname } = new URL(
            window.location.origin + itemUrl
        )
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl)
        } else {
          router.go(itemUrl)
        }
      }
    },
    transformItems(items) {
      return items.map((item) => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url)
        })
      })
    },
    hitComponent({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children }
      }
    },
    maxResultsPerGroup: 10
  })

  options.resultsFooterComponent = ({state}) => ({
    type: 'div',
    ref: undefined,
    constructor: undefined,
    key: state.query,
    props: {
      onClick: (e) => {
        console.log("props",props);
      },
      children: `为您找到${state.context.nbHits} 条相关结果!`,
    },
    __v: null,
  })
  docsearch(options)
}

function getRelativePath(url: string) {
  const { pathname, hash } = new URL(url, location.origin)
  return (
      pathname.replace(
          /\.html$/,
          site.value.cleanUrls ? '' : '.html'
      ) + hash
  )
}
</script>

<template>
  <div id="docsearch" />
</template>
