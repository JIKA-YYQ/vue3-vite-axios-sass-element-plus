<template>
    <h1 class="title">
        <el-button type="primary">element-plus按钮</el-button>
        <svg-icon name="github" :width="100" :height="100" color="#13227a"></svg-icon>
        <br>
        <p>{{ count }}</p>
        <button @click="add">叠加</button>
        <div>
            <span>{{ family.name }}:{{ family.age }}{{ family.gender }},wife: {{ family.wife.name }} {{ family.wife.age }}{{ family.wife.love }}</span>
        </div>
        <button @click="updateUser">更新用户</button>
        <hr>
        <Test :MSG="msg" :MSG2="'啦啦啦'" @update="updateText"></Test>
        <hr>
        <fieldset>
            <legend>原始数据</legend>
            <input type="text" v-model="myInfo.name">
            <input type="text" v-model="myInfo.nick">
        </fieldset>
        <fieldset>
            <legend>改变数据</legend>
            1.<input type="text" v-model="changeA">
            2.<input type="text" v-model="changeB">
            3.<input type="text" v-model="changeC">
        </fieldset>

        <hr>

        <p v-if="loading">加载中...</p>
        <p v-else-if="errorMsg">errorMsg:{{ errorMsg }}</p>
        <!-- <ul v-else>
            <li>id:{{ result.id }}</li>
            <li>name:{{ result.name }}</li>
            <li>price:{{ result.price }}</li>
        </ul> -->

        <hr>

        <ul v-for="item in result" :key="item.id">
            <li>id:{{ item.id }}</li>
            <li>name:{{ item.name }}</li>
            <li>type:{{ item.type }}</li>
            <br>
        </ul>

        <hr>
        <p>x:{{x}}</p>
        <p>y:{{y}}</p>
        <p>z:{{z}}</p>

        <hr>
        <input type="text" ref="refInput">

        <hr>

        <input type="text" v-model="_customRef">
        <p>{{ _customRef }}</p>

        <hr>
        <button @click="color='red'">红色</button>
        <button @click="color='orange'">橙色</button>
        <button @click="color='green'">绿色</button>
        <p>{{ color }}</p>
        <Son/>

        <hr>
        <button @click="_params('形参',6, undefined, '剩余参数1', '剩余参数2', '剩余参数3')">函数参数</button>

    </h1>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed, watch, watchEffect, toRefs, toRef, customRef, provide } from 'vue'
import request from '@/utils/request'
import { login } from '@/api/login'
import Test from '@/components/test.vue'
import Son from '@/components/Son.vue'
import svgIcon from '@/components/SvgIcon.vue'

interface objType {
    id: number
    name: string
    price: number
}

interface arrType {
    id: number
    type: string
    name: string
}

function useCustomRef<T> (value:T, delay=200) {
    let timer: number
    return customRef((track, trigger) => {
        return {
            get () {
                track() //告诉Vue追踪数据
                return value
            },
            set (newValue: T) {
                clearTimeout(timer)
                setTimeout(() => {
                    value = newValue
                    trigger()   //告诉Vue出发界面刷新
                }, delay);
            }
        }
    })
}

function Params(param1:string, param2: number=1, param3?: string, ...params:string[]) {
    // param2：默认参数, param3：可选参数, params：剩余参数
    console.log(param1, param2, param3, params)
}


export default defineComponent({
    name: 'home',
    components: {
        Test,
        Son,
        svgIcon
    },
    setup () {
        const params: any = {
            name: 'jika',
            age: 18
        }
        login.login(params)
        .then(res => {
            console.log('异步返回：',res)
        })

        
        const count = ref(0)    //ref通过给value属性添加getter/setter方法实现对数据的劫持

        console.log(count)

        function add () {
            count.value++
        }

        const family = reactive<any>({      //reative通过Proxy实现对对象内部所有数据的劫持，并通过Reflect操作对象内部的数据
            name: 'STAR',
            age: 28,
            wife: {
                name: 'JIKA',
                age: 28,
                love: ['sing','movie','code']
            }
        })

        console.log(family)

        const updateUser = () => {
            family.name = 'star'
            family.wife.name = 'jika'
            family.wife.love[0] = '唱歌'
            family.gender = '男'
            delete family.age
        }

        const msg = ref('你好')
        const updateText = (txt: string) => {
            msg.value = msg.value + txt
        }

        const myInfo = reactive({
            name: '小杨',
            nick: 'JIKA'
        })
        console.log('----myInfo----',myInfo)
        const changeA = computed(() => {    //传入一个回电函数，表示只调用get方法
            return `${ myInfo.name }_${ myInfo.nick }`
        })
        const changeB = computed({      //传入一个对象，表示既有get方法，又有set方法
            get () {
                return `${ myInfo.name }#${ myInfo.nick }`
            },
            set (val: string) {
                const m = val.split('#')
                myInfo.name = m[0]
                myInfo.nick = m[1]
            }
        })

        const changeC = ref('')
        watch (myInfo,({ name, nick }) => {
            console.log('改变', name, nick)
            changeC.value = `${ name }_${ nick }`
        },{immediate: true, deep: true})    //默认初始时不执行回调；immediate: true让watch默认先执行一次；配置deep:true, 来指定深度监视

        

        watchEffect (() => {    //不需要配置immediate: true，默认会自动监听
            const m = changeC.value.split('_')
            myInfo.name = m[0]
            myInfo.nick = m[1]
        })

        // watch可监听多个数据，当监听的数据不是响应式时，必须通过函数来指定
        watch([() => myInfo.name, () => myInfo.nick, changeC],([new1,new2,new3],[old1,old2,old3]) => {
            console.log('111111', new1,new2,new3,'-----',old1,old2,old3)
        })

        // const { loading, result, errorMsg } = request<objType>('/datas/obj.json')   //获取对象
        const { loading, result, errorMsg } = request<arrType[]>('/datas/arr.json')    //获取数组

        watch(result,() => {
            console.log('22222222',result.value.length)
        })

        //reactive对象的属性都是非响应式的；
        // toRefs把响应式对象（reactive对象）的所有原始属性转化为响应式的ref属性

        const rea = reactive({
            x: 100,
            y: 50,
            z: 2000
        })

        const { x, y, z } = toRefs(rea)

        // setInterval(() => {
        //     x.value += 5
        //     y.value *= 2
        //     z.value /= 2
        // },1000)


        const refInput = ref<HTMLElement | null>(null)
        onMounted (() => {
            //refInput.value 是 <input type="text" ref="refInput">
            refInput.value && refInput.value.focus()
        })

        const _data = reactive({
            a: 1,
            b: '嗯嗯'
        })

        console.log(_data)

        const _data_a = toRef(_data, 'a')

        console.log('a',_data_a)

        const _customRef = useCustomRef('fgfg',300)

        const _params = Params


        //依赖注入：provide/inject，实现跨层级数据传递

        const color = ref('red')

        provide('color',color)



        return {
            count,
            family,
            msg,
            myInfo,
            changeA,changeB,changeC,
            loading,result,errorMsg,
            x,y,z,
            refInput,
            _customRef,
            color,
            _params,
            add,
            updateText,
            updateUser,
            
        }
    }
})
</script>
<style lang='scss' scoped>
.title{
    color: $main-color;
    p {
        font-size: 20px;
        color: $main-text-color;
    }
}
</style>