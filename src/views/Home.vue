<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeysLeft" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <router-link to="/table">表格</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <router-link to="/demo">demo</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 24 }">
        <a-menu
            v-model:selectedKeys="selectedKeysRight"
            theme="light"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <router-link to="/table">表格</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item></a-breadcrumb-item>
          <a-breadcrumb-item></a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <RouterView />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue'
const collapsed = ref(false);
const selectedKeysLeft = ref(['1'])
const selectedKeysRight = ref(['1'])
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>

