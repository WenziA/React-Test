import axios from 'axios'

const request = axios.create({
  baseURL: '',//baseURL 留空，因为接口同源
  timeout: 10000
})

// 请求拦截器：发请求之前做处理
request.interceptors.request.use((config) => {
  return config
})

// 响应拦截器：拿到服务器返回之后处理
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('请求出错', error)
    return Promise.reject(error)
  }
)

export default request