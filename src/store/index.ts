import { createStore } from 'vuex'
import route from './route'
import language from './language'

export default createStore({
    modules: {
        route,
        language
    }
})