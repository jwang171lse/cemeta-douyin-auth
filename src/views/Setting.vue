<template>
	<div class='page-setting p-2'>
		<div class="page-setting-login">
			<a-card title="登陆与注册">
				<a-form :model="form" ref="formRef" :style="{ width: '600px' }" auto-label-width @submit="handleSubmit">
					<a-form-item field="duration" label="保持登陆时长(天)">
						<a-input-number v-model="form.duration" :style="{ width: '100px' }" placeholder="Please Enter"
							:default-value="1" mode="button" class="input-demo" />
					</a-form-item>
					<a-form-item v-model="form.method" field="method" label="注册/登陆方式">
						<a-checkbox-group v-model="form.method">
							<a-checkbox laber="phone" value="phone">手机号</a-checkbox>
							<a-checkbox laber="email" value="email">邮箱</a-checkbox>
						</a-checkbox-group>
					</a-form-item>
					<a-form-item>
						<a-space>
							<a-button @click="resetBtn" type="outline" status="success">重置</a-button>
							<a-button html-type="submit" type="primary" status="success">确认</a-button>
						</a-space>
					</a-form-item>
				</a-form>
			</a-card>

		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { apiGetConfig } from '@/api/setting';
import { FormInstance } from "@arco-design/web-vue";
const form = reactive({
	duration: 1,
	method: []
})
const formRef = ref<FormInstance>()
const handleSubmit = async () => {
	await apiGetConfig({ config: 'account.registerType', value: form.method })
}
const resetBtn = () => {
	if (formRef.value)
		formRef.value.resetFields()
}
</script>
<style lang='scss'>
.page-setting {
	&-login {
		font-size: 14px;

		.setting_iteam {}

	}
}
</style>
