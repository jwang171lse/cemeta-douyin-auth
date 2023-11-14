<template>
	<div class="page-style">
		<a-modal v-model:visible="props.modalShow" @ok="handleOk" @cancel="handleCancel" draggable>
			<template #title> 新增资源 </template>
			<a-form :model="form">
				<a-form-item :label="props.modalText?.title1">
					<a-select
						:style="{
							width: '250px',
						}"
						v-model="form.section"
						placeholder="Please select ..."
						allow-clear
					>
						<a-option value="section one">Section One</a-option>
					</a-select>
				</a-form-item>
				<a-form-item :label="props.modalText?.title2" v-if="props.modalText?.title2">
					<a-select
						:style="{
							width: '250px',
						}"
						v-model="form.section"
						placeholder="Please select ..."
						allow-clear
					>
						<a-option value="section one">Section One</a-option>
					</a-select>
				</a-form-item>
				<a-form-item :label="props.modalText?.Remark">
					<a-input
						placeholder="请选择"
						:style="{
							width: '250px',
						}"
					></a-input>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { reactive, defineProps, defineEmits } from 'vue'
const props = defineProps({
	modalShow: {
		type: Boolean,
	},
	modalText: {
		type: Object,
	},
})

const form = reactive({
	imageType: props.modalText,
	section: '',
})
const emits = defineEmits(['operateModal'])
const handleOk = () => {
	console.log(form)

	emits('operateModal', false)
}
const handleCancel = () => {
	emits('operateModal', false)
}
</script>
<style scoped lang="scss">
.page-style {
}
</style>
