<template>
	<div class="page-image">
		<div class="flex font-bold p-3 items-center">
			<h3 class="flex-none m-3">厨房-北欧风</h3>
			<h3 class="flex-none m-3">备注1</h3>
			<a-upload action="/" class="mr-4" :auto-upload="false" ref="uploadRef" :show-file-list="false" @change="onChange" multiple>
				<template #upload-button>
					<a-space>
						<a-button> 上传图片</a-button>
					</a-space>
				</template>
			</a-upload>
			<a-upload action="/" :auto-upload="false" ref="uploadRef" :show-file-list="false" @change="onChange" multiple directory>
				<template #upload-button>
					<a-space>
						<a-button> 批量上传</a-button>
					</a-space>
				</template>
			</a-upload>
		</div>
		<div class="pl-31">
			<a-upload list-type="picture-card" action="/" :default-file-n="fileList" image-preview />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const uploadRef = ref()
const fileList = ref([
	{
		url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	},
	{
		url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
	},
])

const onChange = (files: any) => {
	fileList.value.push(files[0].url)
}
</script>
<style scoped lang="scss">
.page-image {
	:deep(.arco-upload-list-picture) {
		width: 150px;
		height: 150px;
	}
	:deep(.arco-upload-type-picture-card) {
		display: none;
	}
}
</style>
