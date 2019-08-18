/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
// 环境的切换


// 测试环境和生成环境接口baseURL
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/static/';
} else if (process.env.NODE_ENV == 'production') {  // npm run build
    axios.defaults.baseURL = 'http://myhost.com/xxx/xxx/';
}
// 请求超时时间
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况 
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录    
                // 未登录则跳转登录页面，并携带当前页面的路径    
                // 在登录成功后返回当前页面，这一步需要在登录页操作。    
                case 401:
                    alert('未登录');
                    break;
                    // 403 token过期    
                    // 登录过期对用户进行提示    
                    // 清除本地token和清空vuex中token对象    
                    // 跳转登录页面    
                case 403:
                    alert('登录过期，请重新登录');
                    break;
                    // 404请求不存在    
                case 404:
                    alert('网络请求不存在');
                    break;
                    // 其他错误，直接抛出错误提示    
                default:
                    alert('网络请求不存在');
            }
            return Promise.reject(error.response);
        }
    }
);

export default function request(param) {
    console.log('param', param);
    return new Promise ((resolve, reject)=> {
        axios(param).then(response=> {
            console.log('response',response)
            // 统一处理200成功后的返回值
            if (response.data.code !== '0' || response.data.code !== '0000') {
                // alert(response.err_msg)
            }
            // 统一处理200成功后的返回值
            resolve(response.data);
        }).catch(err=> {
            reject(err);
        })
    })
}



// /** 
//  * get方法，对应get请求 
//  * @param {String} url [请求的url地址] 
//  * @param {Object} params [请求时携带的参数] 
//  */
// export function get(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {
//                 params: params
//             })
//             .then(res => {
//                 resolve(res.data);
//             })
//             .catch(err => {
//                 reject(err.data)
//             })
//     });
// }
// /** 
//  * post方法，对应post请求 
//  * @param {String} url [请求的url地址] 
//  * @param {Object} params [请求时携带的参数] 
//  */
// export function post(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, QS.stringify(params))
//             .then(res => {
//                 resolve(res.data);
//             })
//             .catch(err => {
//                 reject(err.data)
//             })
//     });
// }