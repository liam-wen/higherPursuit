import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'

export function successMessage(text) {
  Message({
    type: 'success',
    duration: 3000,
    message: text
  })
}

export function infoMessage(text) {
  Message({
    type: 'info',
    duration: 3000,
    message: text
  })
}

export function errorMessage(text) {
  Message({
    type: 'error',
    duration: 3000,
    message: text
  })
}

export function MessageBoxAlert(text) {
  return MessageBox({
    title: '提示',
    message: text
  })
}

export function MessageBoxCofirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    center: true
  })
}
