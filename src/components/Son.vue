<template>
    <h3>Son儿子组件</h3>
    <button @click="funA('第',5,3)">点一下吧</button>
    <GrandSon/>
    <hr>
    <div>{{ jika }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import GrandSon from '@/components/GrandSon.vue'

class Parent {
    str_1: string;
    static str_2: string = '哈哈哈';
    private readonly str_3: string = '我是私有变量';
    constructor (str_1:string) {
        this.str_1 = str_1
    }
    
    say_1 () {
        console.log('str_2:'+Parent.str_2)
        console.log('str_3:'+this.str_3)   //class内读取私有变量

        console.log('说啥？')
        console.log(this.str_1)
    };
    static say_2 () {
        console.log('不知道')
    }
}

class Son extends Parent {
    say_3 () {
        console.log('随意~~')
    }
}

//凡是被static修饰的属性和方法都是静态的属性和方法，只能被类名调用，不能被实例化对象调用，同时也不能被子类继承。

Parent.str_2        //被static修饰的变量，可被类名调用
Parent.say_2()      //被static修饰的方法，可被类名调用
// Parent.str_1     //错误：未被static修饰的变量，【不能】被类名直接调用
// Parent.say_1()   //错误：未被static修饰的方法，【不能】被类名直接调用


let son_k = new Parent('建设大厦')
son_k.str_1     //未被static修饰的变量，可被实例化对象调用
son_k.say_1()   //未被static修饰的方法，可被实例化对象调用
// son_k.str_2          //错误：static修饰的属性不能被实例化对象son_k调用
// son_k.say_2()        //错误：static修饰的方法不能被实例化对象son_k调用

let son_f = new Son('无所谓')
son_f.say_1()
// son_f.str_2          //错误：static修饰的属性不能被子类继承
// son_f.say_2()        //错误：static修饰的方法不能被实例化对象son_k调用


export default defineComponent({
    name: 'Son',
    components: {
        GrandSon
    },
    setup () {
        function funA(a:string, b:number, c:number): Array<object>{
            let arr = new Array()
            for(let i = 0; i < b; i++) {
                let k = {}
                let cc = new Array()
                for(let j = 0; j < c; j++) {
                    cc[j] = j*i
                }
                k = {aa: `${ a }${ i+1 }`, bb: `共${ b }个`, cc}
                arr[i] = k
            }
            console.log(arr)
            return arr
        }


        interface People {
            sex: string,
            height ?: number,
            weight ?: number,
            work ?(): void,     // ? 该属性、方法可有可无
            [propName: string]: any    //任意类型的属性：可自定义多个属性、方法
        }

        let jika: People = {
            sex: '女',
            height: 158,
            home: '祥云',
            work () {
                console.log('我是一名coder')
            },
            school () {
                console.log('宁夏医科大学')
            }
        }
        jika.work()
        jika.school()


        interface funParam {    //根据入参类型判断调用哪一个函数
            (param: string): string,
            (param: number): string,
            (param: Array<number>): string,
            (param: Array<string>): string,
            (param: Array<object>): string

            // 简便写法如下：
            (param: string | number | Array<number | string | object>): string
        }

        let _fun: funParam = (param) => {
            return `${ param } 帅帅哒~~`
        }
        console.log(_fun(['Star',18]))

        function _fun2(param: string | number | Array<number | string | object>): string {
            return `${ param }对接完成！`
        }
        console.log(_fun2(['天宫','不得了']))
        

        return {
            funA,
            jika
        }
    }
})
</script>
<style lang="scss" scoped>

</style>