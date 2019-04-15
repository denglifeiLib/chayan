import request from './request.js';

export function testRequire(param = {}) {
    return request({
        url: 'test.json',
        method: 'get',
        params: param
    })
}

export function testPost(param = {}) {
    return request({
        url: '/users',
        method: 'post',
        data: param
    })
}