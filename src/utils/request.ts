import { ref } from 'vue'
import axios from 'axios'

export default function request <T> (url: string) {
    const loading = ref(true)
    const errorMsg = ref('')
    const result = ref<T | null>(null)

    axios.get(url)
    .then(resp => {
        loading.value = false
        result.value = resp.data
    }).catch(err => {
        loading.value = false
        errorMsg.value = err.message || '未知错误'
    })

    return {
        loading,
        result,
        errorMsg
    }
}