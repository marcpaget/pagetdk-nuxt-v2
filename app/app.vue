<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtuiNavBar />
    <NuxtPage  :transition="{
          name: 'bounce',
          mode: 'out-in',
        }"
        />
  </UApp>
</template>
