import { message } from 'ant-design-vue'

export const error = (msg) => {
  message.error(msg)
}

export const success = (msg) => {
  message.success(msg)
}

export const warning = (msg) => {
  message.warning(msg)
}

export const info = (msg) => {
  message.info(msg)
}

export const loading = (msg) => {
  message.loading(msg)
}
