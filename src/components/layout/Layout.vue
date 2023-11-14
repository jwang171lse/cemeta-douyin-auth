<template>
	<a-layout class="layout-demo">
		<a-layout-sider collapsible breakpoint="xl">
			<AsideMenuList></AsideMenuList>
		</a-layout-sider>
		<a-layout class="layout-right">
			<a-layout-header>
				<div class="flex justify-between px-6">
					<div class="title font-bold text-lg flex items-center">{{ userStore.userInfo?.user.id }}</div>
					<div class="user">
						<div></div>
						<a-dropdown @select="onSelectHeaderOption">
							<a-button>{{ userStore.userInfo?.user?.account }} <icon-down /></a-button>
							<template #content>
								<a-doption value="loginOut">退出登录</a-doption>
							</template>
						</a-dropdown>
					</div>
				</div>
			</a-layout-header>
			<a-layout class="layout-main !p-6">
				<!-- <a-breadcrumb class="layout-breadcrumb">
					<a-breadcrumb-item>Home</a-breadcrumb-item>
					<a-breadcrumb-item>List</a-breadcrumb-item>
					<a-breadcrumb-item>App</a-breadcrumb-item>
				</a-breadcrumb> -->
				<!-- !bg-transparent -->
				<a-layout-content class="layout-content">
					<div class="main">
						<router-view></router-view>
					</div>
				</a-layout-content>
				<!-- <a-layout-footer class="layout-footer">Footer</a-layout-footer> -->
			</a-layout>
		</a-layout>
	</a-layout>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore'
import { AsideMenuList } from './components/AsideMenuList'
import { loginOut } from '@/util/user'
import { useRouter } from 'vue-router'
let userStore = useUserStore()
const router = useRouter()
function onSelectHeaderOption(data: string | number | Record<string, any> | undefined) {
	if (data === 'loginOut') {
		loginOut()
		router.push({
			name: 'login',
		})
	}
}
</script>
<style scoped lang="scss">
.layout-demo {
	min-height: 100vh;
	background: var(--color-fill-2);
	border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
	height: 32px;
	margin: 12px 8px;
	background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
	background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
	height: 64px;
	line-height: 64px;
	background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
	height: 48px;
	color: var(--color-text-2);
	font-weight: 400;
	font-size: 14px;
	line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
	color: var(--color-text-2);
	font-weight: 400;
	font-size: 14px;
	background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
	// display: flex;
	// flex-direction: column;
	// justify-content: center;
	// color: var(--color-white);
	// font-size: 16px;
	// font-stretch: condensed;
	// text-align: center;
}

.layout-right {
	height: 100vh;
	max-height: 100vh;
	overflow-y: hidden;
}

.layout-main {
	display: flex;
	flex-direction: column;
	min-height: 0;

	.layout-content {
		display: flex;
		flex: 1;
		min-height: 0px;

		.main {
			flex: 1;
			overflow: auto;
		}
	}

	.layout-breadcrumb {
		margin: 16px 0;
		display: block;
	}

	.layout-footer {
		height: 0px;
		//height: 20px;
		opacity: 0;
	}
}
</style>
