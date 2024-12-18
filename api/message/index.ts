
import request from '@/utils/request'

const messagesApi = {
  getMessages: (): Promise<any> => request.request({ url: "/api/v1/auth/mes" }),
}

export default messagesApi