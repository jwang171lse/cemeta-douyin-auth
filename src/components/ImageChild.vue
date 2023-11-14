<template>
	<div class="pate-userDome-mian-imgBox m-8" v-show="props.isShow == '所有' || props.isShow == '图片' || props.isShow == ''">
		<div class="flex items-center">
			<h2 style="font-size: 20px; margin: 10px 20px; font-weight: 600">图片</h2>
			<a-button type="primary" status="success" @click="addImageStyle">
				<template #icon>
					<icon-plus />
				</template>
				<!-- Use the default slot to avoid extra spaces -->
				<template #default>新增</template>
			</a-button>
		</div>

		<div class="flex flex-wrap">
			<a-card hoverable class="m-1 flex-none" :style="{ width: '200px' }" v-for="(item, index) in videList" :key="index">
				<template #cover>
					<div
						@click="toImgList"
						:style="{
							height: '120px',
							overflow: 'hidden',
						}"
					>
						<img :style="{ width: '200px', transform: 'translateY(0px)' }" alt="dessert" :src="item.url" />
					</div>
				</template>
				<a-card-meta>
					<template #description> {{ item.name }} <br /> </template>
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
const toImgList = () => {
	let routerResolve = router.resolve({
		name: 'resourceImageList',
		query: {
			id: 132,
		},
	})
	window.open(routerResolve.fullPath, '_blank')
}
const emits = defineEmits(['operateModal'])
const videList = ref([
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
	{
		url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
		name: '厨房',
	},
])
//新增图片风格
const addImageStyle = () => {
	let obj = {
		title1: '选择场景',
		title2: '选择风格图库',
		Remark: '备注',
		isShow: true,
	}
	emits('operateModal', obj)
}
</script>
<style scoped lang="scss">
.page-image {
}
</style>
