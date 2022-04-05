<template>
  <a-tabs
    v-model:activeKey="activeKey"
    :tabBarGutter="5"
    hide-add
    size="large"
    type="editable-card"
  >
    <a-tab-pane v-for="pane in panes_list" :key="pane.key">
      <template #tab>
        <div @click="change_components(pane.key)">
          <!-- 标题 -->
          {{ pane.title }}
          <!-- 刷新 -->
          <ReloadOutlined
            class="myicon"
            v-if="activeKey == pane.key"
            @click.stop="reload_components(route.path)"
          />
          <!-- 关闭 -->
          <CloseOutlined
            class="myicon close"
            @click.stop="remove_pane(pane.key)"
          />
        </div>
      </template>
    </a-tab-pane>
    <!-- TODO:迁移V3版本注意此处更名 -->
    <template #tabBarExtraContent>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          操作
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="menu_click">
            <a-menu-item key="1"> 关闭其他 </a-menu-item>
            <a-menu-item key="2"> 刷新当前页面 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tabs>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import {
  add_pane,
  activeKey,
  panes_list,
  change_components,
  reload_components,
  remove_pane,
  menu_click,
  set_path
} from '../hooks/usePane'
import { fomat_route } from '../hooks/useRoute'

const store = useStore()
const route = useRoute()

// 监控菜单变化
watch(
  () => store.state.Menu.menu,
  (val) => {
    fomat_route(val)
    add_pane(route.path.substr(1))
  },
  { immediate: true, deep: true }
)
// 监控路由变化
watch(
  () => route.path,
  (val) => {
    set_path(val)
    add_pane(val.substr(1))
  }
)
</script>
<style lang="less" scoped>
.myicon {
  :deep(svg) {
    width: 12px !important;
    height: 12px !important;
  }
  transition: all 0.3s;
  margin-left: 8px;
  margin-right: 0px !important;
  color: #939393;
}
.myicon:hover {
  font-size: 16px;
  font-weight: bold;
  color: #1890ff;
  transform: rotate(360deg);
}
.close {
  margin-left: 8px;
}
.close:hover {
  transform: rotate(180deg);
}
</style>
