<script setup lang="ts">
const route = useRoute()

const { data: page } = await useFetch(`/api/docs${route.path}`, {
  key: route.path,
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}
const { data: surround } = await useAsyncData(`${route.path}:surround`, () =>
  queryCollectionItemSurroundings('content', route.path),
)
void surround
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title" />

    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />

      <USeparator v-if="surround?.filter(Boolean).length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>
