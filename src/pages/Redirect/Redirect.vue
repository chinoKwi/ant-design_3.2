<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
const router = useRouter()

store.commit('Exclude/INIT_exclude')
router.push('/' + route.query.to)
</script>
