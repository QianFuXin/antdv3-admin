import service from '@/utils/requests.js'

export const book = () => {
  return service.get('/api/books')
}
