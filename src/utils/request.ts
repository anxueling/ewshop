// 1,引入axios依赖包
import axios from "axios";
// 2,axios创建对象
const request = axios.create({
    baseURL:"https://api.shop.eduwork.cn/", // 管理后台要使用的接口的基地址
    timeout:8000, // 超时时间
});


//3,定义前置拦截器，请求拦截器，请求发出之前触发的
request.interceptors.request.use((config) => {
    // config 接口请求的配置信息
    // 1. 获取token
    const token = localStorage.getItem("token");
    // 2. 判断token是否存在
    if (token) {
        // 3. 如果存在，把token添加到请求头中
        config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
});

//4.响应拦截器
request.interceptors.response.use((response)=>{
    // 响应回来的数据操作
    return response.data;
});
// 5.导出axios实例
export default request;