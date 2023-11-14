<template>
	<div class="page-sku-video p-3">
		<a-form v-model:model="formItem" ref="formRef" v-if="skuItem">
			<!-- <a-form :style="{ width: '600px' }"> -->
			<a-form-item field="status" label="企业设置状态">
				<a-radio-group @change="enterpriseStatusChange" v-model="skuItem.status" type="button" :disabled="adminPermisson" read>
					<a-radio value="active">正在使用</a-radio>
					<a-radio value="disabled">已经下架</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item field="review" v-model="skuItem.review" label="维护状态">
				<a-switch @change="onChangeStatus" :disabled="adminPermisson"></a-switch>
			</a-form-item>
			<a-form-item field="review" label="语料库数据">
				<a-input :style="{ width: '320px' }" placeholder="发布文案id" allow-clear />
				<a-button @click="submitarticalId" type="primary" :style="{ width: '80px', margin: '0 20px' }">确认</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import { SkuItem } from '@/api/sku'
let skuItem = ref<SkuItem>()

const adminPermisson = ref(true)
const props = defineProps(['skuItem'])
onMounted(() => {
	skuItem.value = props.skuItem
	console.log(skuItem.value)
})
const formItem = ref({})
const onChangeStatus = (value: string | number | boolean, ev: Event) => {
	console.log(value, ev)
}
const enterpriseStatusChange = (value: string | number | boolean, ev: Event) => {
	console.log(value, ev)
}
//TODO():
const submitarticalId = () => {}
</script>
<style scoped lang="scss"></style>
