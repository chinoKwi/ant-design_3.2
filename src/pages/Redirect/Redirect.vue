<template>
  <div></div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { push_route } from '@/utils'
const store = useStore()
const route = useRoute()
store.commit('Exclude/INIT_exclude')
const path = route.query.to as string
push_route(path)
</script>
<script lang="ts">
export default {
  name: 'Redirect'
}
</script>
