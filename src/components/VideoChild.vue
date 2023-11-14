<template>
	<div class="pate-userDome-mian-imgBox m-8" v-show="props.isShow == '所有' || props.isShow == '视频' || props.isShow == ''">
		<div class="flex items-center">
			<h2 style="font-size: 20px; margin: 10px 20px; font-weight: 600">视频</h2>
			<a-button type="primary" status="success" @click="addImageStyle">
				<template #icon>
					<icon-plus />
				</template>
				<template #default>新增</template>
			</a-button>
		</div>
		<div class="page-video flex flex-wrap">
			<a-card @click="toImgList" class="m-1" hoverable :style="{ width: '250px' }" v-for="v in videList">
				<video :src="v.url" :style="{ width: '200px', height: '300px', objectFit: 'cover' }"></video>

				<a-card-meta title="Card Title">
					<template #description> </template>
				</a-card-meta>
			</a-card>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
	isShow: {
		default: false,
		type: String,
	},
})
const emits = defineEmits(['operateModal'])
//新增视屏类型
const addImageStyle = () => {
	let obj = {
		title1: '命明视频风格',
		Remark: '视频库备注',
		isShow: true,
	}
	emits('operateModal', obj)
}
const toImgList = () => {
	let routerResolve = router.resolve({
		name: 'resourceVideoList',
		query: {
			id: 132,
		},
	})
	window.open(routerResolve.fullPath, '_blank')
}
const videList = ref([
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
	{
		url: '../../public/06.mp4',
		name: '厨房',
	},
])
</script>
<style scoped lang="scss">
.page-video {
}
</style>
