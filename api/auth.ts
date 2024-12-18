// src/api/auth.js

import request from '@/utils/request'

interface Credentials {
  account: string
  password: string
}

const authApi = {
  login: (credentials: Credentials): Promise<any> => request.post('/api/v1/login', credentials),
}

export default authApi