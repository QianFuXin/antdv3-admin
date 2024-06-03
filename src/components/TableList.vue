<template>
  <div>
    <a-space>
      <a-button type="primary" @click="visible = true">
        <template #icon>
          <PlusOutlined />
        </template>
        添加
      </a-button>
      <a-button type="primary" @click="storeUpdate()">
        下载
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
    </a-space>
    <a-modal
      v-model:open="visible"
      :title="modalTitle"
      ok-text="确定"
      cancel-text="取消"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" :rules="rules">
        <slot>Fallback content</slot>
      </a-form>
    </a-modal>
    <a-table :data-source="data" :columns="columns" bordered>
      <template
        #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`查找 ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined />
            </template>
            查找
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            重置
          </a-button>
        </div>
      </template>
      <template #customFilterIcon="{ filtered }">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #bodyCell="{ text, column, record }">
        <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="primary" block @click="openEditModal(record)">
              <template #icon>
                <FormOutlined />
              </template>
              更新
            </a-button>
            <a-popconfirm
              title="确认删除？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="deleteData(record.id)"
            >
              <a-button danger block>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { DownloadOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { success } from '@/utils/message.js'

const props = defineProps({
  data: Array,
  columns: Array,
  deleteFunc: Function,
  rules: Object,
  formState: Object,
  addFunc: Function,
  updateFunc: Function,
  storeUpdate: Function
})
const formRef = ref()
const visible = ref(false)
const isEdit = ref(false)
const editId = ref(null)
const modalTitle = computed(() => (isEdit.value ? '编辑数据' : '新建数据'))
function onCancel() {
  formRef.value.resetFields()
  isEdit.value = false
}
const onOk = () => {
  formRef.value
    .validateFields()
    .then((values) => {
      visible.value = false
      if (isEdit.value) {
        props
          .updateFunc(editId.value, { data: props.formState })
          .then((d) => {
            success('更新成功！')
            props.storeUpdate()
            isEdit.value = false
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        // 新增操作
        props
          .addFunc({ data: props.formState })
          .then((d) => {
            success('上传成功！')
            props.storeUpdate()
          })
          .catch((err) => {
            console.log(err)
          })
      }
      formRef.value.resetFields()
    })
    .catch((info) => {
      console.log('Validate Failed:', info)
    })
}
function deleteData(id) {
  props
    .deleteFunc(id)
    .then((d) => {
      success('删除成功！')
      props.storeUpdate()
    })
    .catch((err) => {
      console.log(err)
    })
}
function openEditModal(record) {
  Object.keys(props.formState).forEach((key) => {
    props.formState[key] = record[key]
  })
  visible.value = true
  isEdit.value = true
  editId.value = record.id
}
const state = reactive({
  searchText: '',
  searchedColumn: ''
})
const searchInput = ref()
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm()
  state.searchText = selectedKeys[0]
  state.searchedColumn = dataIndex
}
const handleReset = (clearFilters) => {
  clearFilters({
    confirm: true
  })
  state.searchText = ''
}
</script>
