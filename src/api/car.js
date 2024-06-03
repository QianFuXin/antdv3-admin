import service from '@/utils/requests.js'
// 一套resful api例子
// Get list of cars
export const carList = () => {
  return service.get('/api/cars')
}
// Get a single car by ID
export const getCar = (id) => {
  return service.get(`/api/cars/${id}`)
}

// Create a new car
export const createCar = (carData) => {
  return service.post('/api/cars', carData)
}

// Update an existing car by ID
export const updateCar = (id, carData) => {
  return service.put(`/api/cars/${id}`, carData)
}

// Delete a car by ID
export const deleteCar = (id) => {
  return service.delete(`/api/cars/${id}`)
}
