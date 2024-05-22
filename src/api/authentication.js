import service from '@/utils/requests.js'
import { loginUrl } from '@/utils/config.js'

export const loginApi = (data) => {
  return service.post(loginUrl, data)
}
