<template>
	<div class="page-text m-8" v-show="props.isShow == '所有' || props.isShow == '文案' || props.isShow == ''">
		<div class="flex items-center">
			<h2 style="font-size: 20px; margin: 10px 20px; font-weight: 600">文案</h2>
			<a-button type="primary" status="success" @click="addImageStyle">
				<template #icon>
					<icon-plus />
				</template>
				<!-- Use the default slot to avoid extra spaces -->
				<template #default>新增</template>
			</a-button>
		</div>
		<a-list :style="{ width: `600px` }">
			<a-list-item v-for="idx in textList" :key="idx" @click="toImgList">
				<a-list-item-meta :title="idx"> </a-list-item-meta>
				<template #actions>
					<icon-edit @click="emitTextStype" />
					<icon-delete @click="deleteTextStyle" />
				</template>
			</a-list-item>
		</a-list>
	</div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
	isShow: {
		default: false,
		type: String,
	},
})
const emits = defineEmits(['operateModal'])
const textList = ['风格1', '风格2', '风格3', '风格4', '风格5', '风格6', '风格7', '风格8', '风格9', '风格10', '风格11', '风格12', '风格13']
//点击编辑文案类型
const emitTextStype = () => {}
//点击删除文案类型
const deleteTextStyle = () => {}
//新增文案类型
const addImageStyle = () => {
	let obj = {
		title1: '文案渠道',
		Remark: '视频库备注',
		isShow: true,
	}
	emits('operateModal', obj)
}
const toImgList = () => {
	let routerResolve = router.resolve({
		name: 'resourceTextList',
		query: {
			id: 132,
		},
	})
	window.open(routerResolve.fullPath, '_blank')
}
</script>
<style scoped lang="scss">
.page-text {
}
</style>
