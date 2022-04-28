<template>
    <div class="login-box">
        <div class="login">
            <div class="name">
                <img src="../assets/images/github.png">
                <span>{{ $t('systemName') }}</span>
            </div>
            <div class="name-password">
                <el-form ref="ruleFormRef" :model="loginForm" labelPosition="top">
                    <el-form-item 
                    prop="account"
                    :label="$t('login.account')" 
                    :rules="[{required: true, message: $t('login.mustAccount'), trigger: 'change'}]">
                        <el-input v-model.trim="loginForm.account"></el-input>
                    </el-form-item>
                    <el-form-item 
                    prop="password"
                    :label="$t('login.password')" 
                    :rules="[{required: true, message: $t('login.mustPassword'), trigger: 'change'}]">
                        <el-input v-model.trim="loginForm.password" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-button @click="Login(ruleFormRef)" type="primary" class="login-button">{{ $t('login.login') }}</el-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setLocal } from '@/utils/local'
import type { ElForm } from 'element-plus'
import { login } from '@/api/login'
import { getLocal } from '@/utils/local'
export default defineComponent({
    name: 'login',
    setup () {
        const ruleFormRef = ref<InstanceType<typeof ElForm>>()
        const $route = useRoute()
        const $router = useRouter()
        const loginForm = reactive({
            account: '',
            password: ''
        })
        const Login = (ruleForm: InstanceType<typeof ElForm> | undefined) => {
            if(!ruleForm) return;
            ruleForm.validate(valid => {
                if (!valid) {
                    return false
                } else {
                    //调登录接口
                    login.login(loginForm)
                    .then(res => {
                        if (res.data.code == 200) {
                            //保存token
                            setLocal('token',res.data.data.token)
                            //保存登录者信息
                            login.userInfo(res.data.data.token)
                            .then(res2 => {
                                setLocal('userInfo',res2.data.data)
                            })
                            .then(() => {
                                const history = getLocal('fromRoute')
                                if (history) {
                                    $router.push(history)
                                } else {
                                    $router.push('/')
                                }
                            })
                        } else {
                            ElMessage.error(res.data.message.message.cn)
                        }
                    })
                    .catch(err => {
                        console.log('err',err)
                    })
                }
            })
        }

        onMounted(() => {
            //清除登录信息
        })
        return {
            loginForm,
            ruleFormRef,
            Login
        }
    }
})
</script>
<style lang="scss" scoped>
.login-box {
    color: $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: $minor-color;
    background-image: linear-gradient(-90deg, $main-color, #409eff, $minor-color);
    .login {
        text-align: center;
        padding: 40px 50px;
        border-radius: 15px;
        box-shadow: 0px 0px 10px #fff;
        background-color: #ffffff;
        .name {
            padding: 0 30px 20px;
            display: inline-flex;
            align-items: center;
            img {
                width: 35px;
                height: 35px;
                margin-right: 10px;
            }
            span {
                font-size: 28px;
                letter-spacing: 4px;
            }
        }
        .name-password {
            text-align: left;
            p {
                padding: 20px 10px 10px;
                b {
                    color: red;
                }
            }
        }
        .login-button {
            width: 100%;
            margin-top: 30px;
            margin-bottom: 10px;
        }
    }
}
</style>