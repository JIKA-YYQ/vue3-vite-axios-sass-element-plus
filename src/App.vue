<template>
	<el-config-provider :locale="locale">
		<template v-if="showMenu">
			<Header/>
			<div class="CONTENT">
				<NavBar ref="navbar"/>
				<el-scrollbar height="100%" style="width: 100%">
					<router-view v-slot="{ Component }">
						<template v-if="route && route.title">
							<el-breadcrumb separator="/" class="BREAD">
								<el-breadcrumb-item v-for="(name,index) in route.title" :key="index">{{ $t(name) }}</el-breadcrumb-item>
							</el-breadcrumb>
						</template>
						<transition name="move" mode="out-in">
							<component :is="Component" class="CONTAINER"/>
						</transition>
					</router-view>
				</el-scrollbar>
			</div>
		</template>
		<template v-else>
			<router-view/>
		</template>
	</el-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { mapState, useStore } from 'vuex'
import Header from '@/view/Frame/Header.vue'
import NavBar from '@/view/Frame/Navbar.vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { getLocal, removeLocal } from '@/utils/local'

export default defineComponent({
    name: 'App',
    components: {
        Header,
        NavBar,
    },
	computed: mapState({
		route: state => state.route,
		locale: state => {
			if (state.language.language === 'zhCn') {
				return zhCn
			} else {
				return en
			}
		},
	}),
	setup () {
		const noMenu: string[]  = ['/login'] //不在框架内的页面
		const showMenu = ref(false)
		const lan = ref('zhCn')
		const $store = useStore()
		const $router = useRouter()

		const { locale } = getCurrentInstance().appContext.config.globalProperties.$i18n()
		const loc = (navigator.language || navigator.browserLanguage).toLowerCase()
		
		if (loc == 'zh' || loc == 'zh-cn') {
			lan.value = 'zhCn';
			locale.value = 'zh-cn';
		} else {
			lan.value = 'en';
			locale.value = 'en-us';
		}

		$store.commit('language/setLanguage', lan.value)

		const routeJudge = $router.beforeEach((to, from, next) => {
			showMenu.value = !noMenu.includes(to.path)

			if (to.path == '/login') {
				document.title = locale.value == 'zh-cn' ? to.meta.title.zh : to.meta.title.en

				removeLocal('token')
				removeLocal('userInfo')
				
				next()
			} else {
				//判断是否有token,无token跳转登录
				getLocal('token') && next();
				!getLocal('token') && $router.push('/login')
			}
		})
		return {
			showMenu,
		}
	}
})
</script>
<style lang="scss" scoped>
.CONTENT {
	padding-top: 50px;
	display: flex;
	height: calc(100vh - 50px);
	.BREAD {
		height: 34px;
		line-height: 34px;
		padding: 0 10px;
		box-shadow: 0px 3px 6px #e7e7e7;
	}
	.CONTAINER {
		padding: 15px 15px 15px 20px;
		box-sizing: border-box;
	}
}
</style>