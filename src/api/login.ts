import service from '@/utils/http'
import { HttpResponse } from '@/utils/response'

/**
 * @interface loginParams -登录参数
 * @property {string} username -用户名
 * @property {string} password -用户密码
 */
interface LoginParams {
    account: string
    password: string
}
//封装login类型的接口方法
export class login {
    static async login(params: LoginParams): Promise<HttpResponse> {
        return service('/api/admin_login', {
            method: 'post',
            responseType: 'json',
            data: {
                ...params
            },
        })
    }

    static async userInfo(token: string): Promise<HttpResponse> {
        return service('/api/admin_user', {
            method: 'get',
            responseType: 'json',
            params: {
                token
            }
        })
    }
}