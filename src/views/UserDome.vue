<template>
	<div class="pate-userDome p-3">
		<div class="pate-userDome-header m-1 flex justify-between">
			<div>
				<h2 style="font-size: 20px; display: inline-block">SKU：</h2>
				<a-select :style="{ width: '220px' }" placeholder="请选择sku">
					<a-option>美的大白梨</a-option>
				</a-select>
			</div>
			<a-select :style="{ width: '120px' }" v-model="skuTypeShow" placeholder="显示所有">
				<a-option v-for="(v, i) in skuSelect" :key="i">{{ v }}</a-option>
			</a-select>
		</div>
		<div class="pate-userDome-mian">
			<imageChild :isShow="skuTypeShow" @operateModal="operateModal"></imageChild>
			<videoChild :isShow="skuTypeShow" @operateModal="operateModal"></videoChild>
			<textChild :isShow="skuTypeShow" @operateModal="operateModal"></textChild>
			<!-- <div class="pate-userDome-mian-textBox m-8">文案</div> -->
		</div>
	</div>
	<styleChild :modalShow="modalShow" :modalText="modalText" @operateModal="operateModal"></styleChild>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import imageChild from '@/components/ImageChild.vue'
import videoChild from '@/components/VideoChild.vue'
import textChild from '@/components/TextChild.vue'
import styleChild from '@/components//styleChild.vue'

const skuSelect = ref(['所有', '图片', '视频', '文案'])
const skuTypeShow = ref('')
const modalText = ref({})
const modalShow = ref(false)
const operateModal = (e: any) => {
	modalText.value = e
	modalShow.value = e.isShow
}
</script>
<style scoped lang="scss">
.pate-userDome {
	&-mian {
	}
}
</style>
