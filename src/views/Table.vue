<template>
  <TableList
    :data="car.cars"
    :columns="columns"
    :delete-func="deleteCar"
    :rules="rules"
    :form-state="formState"
    :add-func="createCar"
    :update-func="updateCar"
    :storeUpdate="car.updateCarData"
  >
    <a-form-item name="name" label="姓名">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item name="price" label="价格">
      <a-input-number v-model:value="formState.price" :min="0" :max="1000000" :step="0.1" />
    </a-form-item>
  </TableList>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { createCar, deleteCar, updateCar } from '@/api/car.js'
import TableList from '@/components/TableList.vue'
import { useCarListStore } from '@/stores/car.js'

const car = useCarListStore()
const columns = [
  {
    title: '编码',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '30%'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.price.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    }
  },
  {
    title: '创建时间',
    dataIndex: 'publishedAt',
    key: 'publishedAt'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: 'Action',
    key: 'action'
  }
]
const formState = reactive({
  name: '',
  price: ''
})
const rules = {
  title: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'change'
    },
    {
      min: 3,
      max: 5,
      message: 'Length should be 3 to 5',
      trigger: 'blur'
    }
  ]
}
onMounted(() => {
  car.updateCarData()
})
</script>
