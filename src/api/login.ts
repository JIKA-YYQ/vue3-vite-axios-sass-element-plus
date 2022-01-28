import service from '@/utils/http'
import { HttpResponse } from '@/utils/response'

/**
 * @interface loginParams -登录参数
 * @property {string} username -用户名
 * @property {string} password -用户密码
 */
interface LoginParams {
    username: string
    password: string
}
//封装home类型的接口方法
export class login {
    static async login(params: LoginParams): Promise<HttpResponse> {
        return service('/api/user', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    static async userInfo(): Promise<HttpResponse> {
        return service('/api/user/user_info', {
            method: 'get',
            responseType: 'json',
        })
    }
}