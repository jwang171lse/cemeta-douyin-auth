<template>
	<div class='page-application p-2'>
		<div class="page-application-demo">
			<div class="page-application-demo-item pb-6" v-for="(app, index) in applicationList" :key="index">
				<a-divider orientation="left">{{ app.name }}</a-divider>
				<div class="flex items-center">
					<!-- +是否可用 -->
					<div class="setting_iteam">
						<div class="setting_iteam_name">状态</div>
						<div class="setting_iteam_value">
							<a-switch :size="'small'" v-model="app.policy.isUseful" active-text="可用" inactive-text="停用"
								@change="updateAppSetting(app._id, { isUseful: app.policy.isUseful })" />
						</div>
						<div style="clear: both;"></div>
					</div>
					<!-- +是否开放注册 -->
					<div class="setting_iteam" v-if="app.policy.isUseful">
						<div class="setting_iteam_name">注册</div>
						<div class="setting_iteam_value">
							<a-switch :size="'small'" v-model="app.policy.register" active-text="开放注册" inactive-text="不能注册"
								@change="updateAppSetting(app._id, { register: app.policy.register })" />
						</div>
						<div style="clear: both;"></div>
					</div>
					<!-- +是否预约才能使用 -->
					<div class="setting_iteam" v-if="app.policy.isUseful && !app.policy.register">
						<div class="setting_iteam_name">预约才可使用</div>
						<div class="setting_iteam_value">
							<a-switch :size="'small'" v-model="app.policy.reserve" active-text="预约使用" inactive-text="不开放预约"
								@change="updateAppSetting(app._id, { reserve: app.policy.reserve })" />
						</div>
						<div style="clear: both;"></div>
					</div>
					<!-- +是否启用企业授权 -->
					<div class="setting_iteam" v-if="app.policy.isUseful && !app.policy.register && !app.policy.reserve">
						<div class="setting_iteam_name">启用企业授权</div>
						<div class="setting_iteam_value">
							<a-switch :size="'small'" v-model="app.policy.companyAuth" active-text="企业需授权才可用" inactive-text="企业不能使用"
								@change="updateAppSetting(app._id, { companyAuth: app.policy.companyAuth })" />
						</div>
						<div style="clear: both;"></div>
					</div>
					<!-- +是否启用个人用户授权 -->
					<div class="setting_iteam" v-if="app.policy.isUseful && !app.policy.register && !app.policy.reserve">
						<div class="setting_iteam_name">启用个人授权</div>
						<div class="setting_iteam_value">
							<a-switch :size="'small'" v-model="app.policy.userAuth" active-text="个人用户需授权才可用" inactive-text="个人用户不能使用"
								@change="updateAppSetting(app._id, { userAuth: app.policy.userAuth })" />
						</div>
						<div style="clear: both;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { AppItem, apiAppUpdateSetting, Policy } from '@/api/application';
import { getAppList } from '@/api/application';
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
const applicationList = ref<AppItem[]>([]);


onMounted(() => {
	getApplicationInfo()
})

//获取产品列表
const getApplicationInfo = async () => {
	let res = await getAppList()
	applicationList.value = res.list
}


const updateAppSetting = async (appId: string, option: Partial<Policy>) => {
	await apiAppUpdateSetting(appId, option);
	getApplicationInfo()
	Message.success({
		content: `切换成功`,
		duration: 1000
	})
}
</script>

<style lang='scss'>
.page {
	&-application {
		&-demo {
			box-sizing: border-box;
			//   width: 560px;
			padding: 10px;
			border: 0px solid rgb(var(--gray-2));
		}
	}

}

.setting_iteam {
	line-height: 40px;
	margin-top: 26px;

	.setting_iteam_name {
		display: block;
		float: left;
		width: 130px;
		text-align: right;
		margin-right: 28px;
	}

	.setting_iteam_value {
		display: block;
		float: left;
		width: calc(100% - 160px);
	}
}
</style>
