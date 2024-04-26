<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
      <a-menu v-model:selectedKeys="selectedKeysLeft" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <router-link to="/hello">你好</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 24 }">
        <a-menu
          v-model:selectedKeys="selectedKeysRight"
          theme="light"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1"><router-link to="/table">表格</router-link></a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff' }">
          <RouterView />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue'
const selectedKeysLeft = ref(['1'])
const selectedKeysRight = ref(['1'])
</script>
<style scoped></style>
