import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { carList } from '@/api/car.js'

export const useCarListStore = defineStore('car', () => {
  const carData = ref([])
  const cars = computed(() => {
    return carData.value.map((car) => ({
      id: car.id,
      name: car.attributes.name,
      price: car.attributes.price,
      createdAt: car.attributes.createdAt,
      updatedAt: car.attributes.updatedAt,
      publishedAt: car.attributes.publishedAt
    }))
  })
  function updateCarData() {
    carList()
      .then((d) => {
        carData.value = d.data
      })
      .catch((err) => {
        carData.value = []
        console.log(err)
      })
  }

  return { carData, cars, updateCarData }
})
