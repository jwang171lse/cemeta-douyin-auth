<template>
	<div class="page-sku-detail p-3" :loading="loading">
		<template v-if="videoShow && skuItem"> <SkuDetailVideo :skuItem="skuItem"></SkuDetailVideo> </template>
		<template v-else>
			<a-divider>{{ skuItem?.name + '-' + skuItem?.mark }}</a-divider>
			<a-form
				v-if="skuItem"
				v-model:model="skuItem"
				class="mt-6"
				:label-col-props="{
					span: 3,
				}"
			>
				<a-form-item field="status" label="企业设置状态">
					<a-radio-group type="button" v-model="skuItem.status" read>
						<a-radio value="active">正在使用</a-radio>
						<a-radio value="disabled">已经下架</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item field="review" label="维护状态">
					<a-switch v-model="skuItem.review" @change="onChangeStatus" :disabled="!adminPermisson.hasPermission"></a-switch>
				</a-form-item>
				<a-form-item field="params.article" label="语料库数据">
					<a-input-number placeholder="小红书文案" v-model="skuItem.models[0].corpusId.xiaohongshu">
						<template #prepend> 小红书文案 </template>
					</a-input-number>
				</a-form-item>

				<a-form-item field="params.article" label="">
					<a-input-number placeholder="微信朋友圈" v-model="skuItem.models[0].corpusId.wechatpyq">
						<template #prepend> 微信朋友圈 </template>
					</a-input-number>
				</a-form-item>
				<a-form-item field="params.article" label="">
					<a-input-number placeholder="抖音文案" v-model="skuItem.models[0].corpusId.douyin">
						<template #prepend> &nbsp;&nbsp;抖音文案&nbsp;&nbsp; </template>
					</a-input-number>
				</a-form-item>
				<a-form-item label="">
					<a-button type="primary" @click="onSaveCorpus" :disabled="!adminPermisson.hasPermission">更新语料库</a-button>
				</a-form-item>
				<a-form-item label="图库数据">
					<a-upload
						:file-list="skuItem.models[0].imageParams.__defaultImages"
						list-type="picture-card"
						:disabled="!adminPermisson.hasPermission"
						:auto-upload="false"
						@change="onChangeVideoImg"
						image-preview
					/>
				</a-form-item>
				<a-form-item label="场景数据">
					<a-collapse :default-active-key="[1]" accordion class="w-full">
						<a-collapse-item v-for="(sd, sdIndex) in skuItem.models[0].imageParams.sd" :key="'' + sd.id + sdIndex">
							<template #header>
								<a-input :readonly="!sd.__isAdd" v-model="sd.name" @click.stop placeholder="请输入SD名称"></a-input>
							</template>

							<template #extra>
								<a-space>
									<a-button v-if="sd.__isAdd" type="primary" @click.stop="() => onSaveSd(sd)" size="mini">确定添加</a-button>
								</a-space>
							</template>
							<a-form
								:model="sd"
								:label-col-props="{
									span: 3,
								}"
							>
								<a-form-item label="图片比例">
									<a-select
										:disabled="!adminPermisson.hasPermission"
										:style="{ width: '150px' }"
										v-model="sd.generateImageWhRatio"
										@change="(value:string | number | boolean | Record<string, any>)=>onChangeGenerateImageWhRatio(sd,value)"
										placeholder="请选择图片比例"
										color="#fff"
									>
										<a-option v-for="item in generateImageWhRatioOptions" :key="item" :value="item" :label="item"></a-option>
									</a-select>
								</a-form-item>
								<a-form-item field="active" label="场景状态" v-if="!sd.__isAdd">
									<a-radio-group
										type="button"
										:disabled="!adminPermisson.hasPermission"
										:default-value="sd.active"
										@change="status => onChangeStyleStatus(sd.id, status)"
									>
										<a-radio :value="true">启用</a-radio>
										<a-radio :value="false">停用</a-radio>
									</a-radio-group>
								</a-form-item>
							</a-form>
							<a-form-item field="negativePrompt" label="反向提示词">
								<a-textarea v-model:model-value="sd.negativePrompt" auto-size class="w-full" />
							</a-form-item>
							<a-form-item label="" v-if="!sd.__isAdd">
								<a-button type="primary" @click="() => onSaveNegativePrompt(sd.id, sd.negativePrompt)" :disabled="!adminPermisson.hasPermission"
									>更新反向提示词</a-button
								>
							</a-form-item>
							<template v-if="!sd.__isAdd">
								<a-form-item label="场景风格">
									<a-collapse :default-active-key="sd.style.map((style, styleIndex) => '' + style.id + styleIndex)" accordion class="w-full">
										<a-collapse-item v-for="(style, styleIndex) in sd.style" :key="'' + style.id + styleIndex">
											<template #header>
												<a-input v-model="style.name" @click.stop placeholder="请输入风格名"></a-input>
											</template>
											<template #extra>
												<a-space v-if="adminPermisson.hasPermission">
													<a-button v-if="style.__isAdd" type="primary" @click.stop="() => onSaveStyle(sd.id, style)" size="mini">确定添加</a-button>
													<a-button v-else type="primary" @click.stop="() => onSaveStyle(sd.id, style)" size="mini">保存</a-button>
													<a-popconfirm type="warning" content="确定删除?" @ok="() => onDeleteStyle(sd, style)">
														<a-button type="primary" :status="'danger'" size="mini">删除</a-button>
													</a-popconfirm>
												</a-space>
											</template>
											<a-form
												v-bind:model="style"
												:label-col-props="{
													span: 3,
												}"
											>
												<a-form-item field="prompt" label="提示词">
													<a-textarea v-model:model-value="style.prompt" auto-size class="w-full" />
												</a-form-item>
												<a-form-item label="风格图">
													<a-upload
														:disabled="!adminPermisson.hasPermission"
														list-type="picture-card"
														:auto-upload="false"
														@change="fileList => onChangeStyleImg(sd.id, style, fileList)"
														:file-list="style.__fileList"
														:limit="1"
														image-preview
													/>
												</a-form-item>
											</a-form>
										</a-collapse-item>
									</a-collapse>
								</a-form-item>
								<a-form-item label="">
									<a-button type="primary" @click="onAddStyle(sd)" :disabled="!adminPermisson.hasPermission">添加场景风格</a-button>
								</a-form-item>
								<a-form-item label="场景参数">
									<a-collapse :default-active-key="sd.argument.map((argument, argumentIndex) => '' + argument.id + argumentIndex)" accordion class="w-full">
										<a-collapse-item :header="`参数-${argumentIndex}`" v-for="(argument, argumentIndex) in sd.argument" :key="'' + argument.id + argumentIndex">
											<template #extra>
												<a-space v-if="adminPermisson.hasPermission">
													<a-button v-if="argument.__isAdd" type="primary" @click.stop="() => onSaveArgument(sd.id, argument)" size="mini">确定添加</a-button>
													<a-button v-else type="primary" @click.stop="() => onSaveArgument(sd.id, argument)" size="mini">保存</a-button>
													<a-popconfirm type="warning" content="确定删除?" @ok="() => onDeleteArgument(sd, argument)">
														<a-button type="primary" :status="'danger'" size="mini">删除</a-button>
													</a-popconfirm>
												</a-space>
											</template>
											<a-form
												v-bind:model="argument"
												:label-col-props="{
													span: 3,
												}"
											>
												<a-form-item field="prompt" label="提示词">
													<a-textarea v-model="argument.prompt" auto-size class="w-full" />
												</a-form-item>
												<a-form-item field="model" label="模型">
													<a-select v-model="argument.model" class="w-full">
														<a-option v-for="item in argumentModelList" :key="item" :value="item" :label="item"></a-option>
													</a-select>
												</a-form-item>

												<a-form-item label="init">
													<a-upload
														:disabled="!adminPermisson.hasPermission"
														list-type="picture-card"
														:auto-upload="false"
														@change="fileList => onChangeArgumentImg(sd.id, argument, fileList, 'initImg')"
														:file-list="argument.__initImgFileList"
														:limit="1"
														image-preview
													/>
												</a-form-item>
												<a-form-item label="mask">
													<a-upload
														:disabled="!adminPermisson.hasPermission"
														list-type="picture-card"
														:auto-upload="false"
														@change="fileList => onChangeArgumentImg(sd.id, argument, fileList, 'maskImg')"
														:file-list="argument.__maskImgFileList"
														:limit="1"
														image-preview
													/>
												</a-form-item>
											</a-form>
										</a-collapse-item>
									</a-collapse>
								</a-form-item>
								<a-form-item label="">
									<a-button type="primary" @click="onAddArgument(sd)" :disabled="!adminPermisson.hasPermission">添加场景参数</a-button>
								</a-form-item>

								<template v-for="common in commonList">
									<a-form-item :label="common">
										<a-collapse
											:default-active-key="sd[common as keyof Pick<SdItem, 'color' | 'light' | 'layout' | 'material'>].map((commonItem, commonIndex)=>'' + commonItem.id + commonIndex)"
											accordion
											class="w-full"
										>
											<a-collapse-item
												:header="common + '-' + commonIndex"
												v-for="(commonItem, commonIndex) in sd[common as keyof Pick<SdItem, 'color' | 'light' | 'layout' | 'material'>]"
												:key="'' + commonItem.id + commonIndex"
											>
												<template #extra>
													<a-space v-if="adminPermisson.hasPermission">
														<a-button v-if="commonItem.__isAdd" type="primary" @click.stop="() => onSaveCommon(sd.id, commonItem, common)" size="mini"
															>确定添加</a-button
														>
														<a-button v-else type="primary" @click.stop="() => onSaveCommon(sd.id, commonItem, common)" size="mini">保存</a-button>
														<a-popconfirm type="warning" content="确定删除?" @ok="() => onDeleteCommon(sd, commonItem, common)">
															<a-button type="primary" :status="'danger'" size="mini">删除</a-button>
														</a-popconfirm>
													</a-space>
												</template>
												<a-form
													v-bind:model="commonItem"
													:label-col-props="{
														span: 3,
													}"
												>
													<a-form-item field="prompt" label="提示词">
														<a-textarea v-model:model-value="commonItem.prompt" auto-size class="w-full" />
													</a-form-item>
												</a-form>
											</a-collapse-item>
										</a-collapse>
									</a-form-item>
									<a-form-item label="">
										<a-button type="primary" @click="onAddCommon(sd, common)" :disabled="!adminPermisson.hasPermission">添加{{ common }}</a-button>
									</a-form-item>
								</template>
							</template>
						</a-collapse-item>
					</a-collapse>
				</a-form-item>

				<!-- !!!  -->
				<a-form-item label="">
					<a-button type="primary" @click="onAddSd()" :disabled="!adminPermisson.hasPermission">添加场景数据</a-button>
				</a-form-item>
			</a-form>
		</template>
	</div>
</template>
<script setup lang="ts">
import { SkuItem, SdItem, apiUpdateSku, UpdateSkuType, UpdateSkuData, apiGetSkuById, SdStyle, SdArgument, CommonSd } from '@/api/sku'
import { usePermission } from '@/hooks/usePermission'
import { file2base64 } from '@/util/file'
import { FileItem, Message } from '@arco-design/web-vue'
import { differenceBy } from 'lodash'
import { uid } from 'uid'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SkuDetailVideo from '@/components/skuDetailVideo.vue'
const route = useRoute()
let adminPermisson = usePermission('admin')

let argumentModelList = [
	'control_v11f1p_sd15_depth [cfd03158]',
	'control_v11p_sd15_canny [d14c016b]',
	'control_v11p_sd15_mlsd [aca30ff0]',
	'control_v11p_sd15_lineart [43d4be0d]',
	'control_v11p_sd15_inpaint [ebff9138]',
]

let commonList = ['color', 'light', 'layout', 'material'] as const

let generateImageWhRatioOptions = ['1:1', '3:4', '4:3']

type CommonType = (typeof commonList)[number]

let skuItem = ref<SkuItem>()
function formatterSkuData(sku: SkuItem | null) {
	if (!sku) return null
	if (sku.models[0]?.imageParams.defaultImages == null) {
		return false
	}
	sku.models[0].imageParams.__defaultImages = sku.models[0]?.imageParams.defaultImages.map(videoUrl => {
		let file: FileItem = {
			uid: uid(6),
			url: videoUrl,
		}
		return file
	})

	sku.models[0].imageParams.sd = sku.models[0].imageParams.sd.map(sd => {
		sd.style = sd.style.map(style => {
			let fileList = new Array<FileItem>()
			if (style.image) {
				let file: FileItem = {
					uid: uid(6),
					url: style.image,
				}
				fileList.push(file)
			}

			style.__fileList = fileList

			return style
		})
		sd.argument = sd.argument.map(argument => {
			let initFile: FileItem = {
				uid: uid(6),
				url: argument.initImg,
			}
			let maskFile: FileItem = {
				uid: uid(6),
				url: argument.maskImg,
			}
			argument.__initImgFileList = argument.initImg ? [initFile] : []
			argument.__maskImgFileList = argument.maskImg ? [maskFile] : []
			return argument
		})
		return sd
	})
}

let loading = ref(false)

function onSubmit(type: UpdateSkuType, data: UpdateSkuData) {
	if (!skuItem.value) return
	loading.value = true

	Object.assign(data, {
		paramId: skuItem.value._id,
	})
	apiUpdateSku({
		id: skuItem.value._id,
		type,
		data,
	})
		.then(resp => {
			formatterSkuData(resp)

			skuItem.value = resp
			Message.success({
				content: '成功',
				duration: 800,
			})
		})
		.finally(() => {
			loading.value = false
		})
}

function onChangeStatus(status: string | number | boolean) {
	onSubmit('set_review_status', {
		review: status,
	})
}

function onSaveCorpus() {
	onSubmit('set_article_corpus', {
		xiaohongshu: skuItem.value?.models[0].corpusId.xiaohongshu,
		douyin: skuItem.value?.models[0].corpusId.douyin,
		wechatpyq: skuItem.value?.models[0].corpusId.wechatpyq,
	})
}

function onChangeStyleStatus(senceId: string, status: string | number | boolean) {
	onSubmit('set_sence_status', {
		active: status,
		senceId,
	})
}

function onChangeGenerateImageWhRatio(sd: SdItem, value: string | number | boolean | Record<string, any>) {
	onSubmit('set_sence_generate_image_wh_ratio', {
		generateImageWhRatio: value,
		senceId: sd.id,
	})
}

function onSaveNegativePrompt(senceId: string, negativePrompt: string) {
	onSubmit('set_sence_negative_prompt', {
		negativePrompt,
		senceId,
	})
}

async function onChangeVideoImg(fileList: FileItem[]) {
	if (!skuItem.value) return
	let oldList = skuItem.value.models[0].__videoDefaultImages
	let base64OrUrl = ''
	if (fileList.length > oldList.length) {
		let file = fileList.find(file => file.file)
		if (file?.file) {
			base64OrUrl = await file2base64(file.file)
		}
	}

	// if (fileList.length < oldList.length) {
	// 	let deleteFile = differenceBy(oldList, fileList, file => file.uid)[0]
	// 	if (!deleteFile) return
	// 	base64OrUrl = deleteFile.url || ''
	// }

	if (base64OrUrl) {
		onSubmit('set_video_default_img', {
			file: base64OrUrl,
		})
	}
}

function onSaveStyle(senceId: string, style: SdStyle) {
	onSubmit('set_style', {
		senceId,
		...style,
	})
}
function onSaveSd(sd: SdItem) {
	onSubmit('add_sence', {
		...sd,
	})
}
function onSaveCommon(senceId: string, common: CommonSd, type: CommonType) {
	onSubmit(`set_${type}`, {
		senceId,
		...common,
	})
}

function onSaveArgument(senceId: string, argument: SdArgument) {
	onSubmit('set_argument', {
		senceId,
		...argument,
	})
}

function onAddSd() {
	let sd: SdItem = {
		id: '',
		name: '未命名场景',
		negativePrompt: '请填写反向提示词',
		generateImageWhRatio: generateImageWhRatioOptions[0],
		active: false,
		argument: [],
		layout: [],
		light: [],
		material: [],
		style: [],
		color: [],
		__isAdd: true,
	}
	skuItem.value?.models[0].imageParams.sd.push(sd)
}

function onAddStyle(item: SdItem) {
	if (item.style.some(i => i.__isAdd)) {
		Message.warning('有未保存新添加的风格')
		return
	}
	let style: SdStyle = {
		__isAdd: true,
		image: '',
		name: '未命名',
		prompt: '请填写提示词',
		__fileList: [],
	}
	item.style.push(style)
}

function onAddCommon(item: SdItem, type: CommonType) {
	let list = item[type]
	if (list.some(i => i.__isAdd)) {
		Message.warning('有未保存新添加的风格')
		return
	}

	let addItem: CommonSd = {
		__isAdd: true,
		prompt: `请填写${type}提示词`,
	}
	list.push(addItem)
}

function onAddArgument(item: SdItem) {
	if (item.argument.some(i => i.__isAdd)) {
		Message.warning('有未保存新添加的参数')
		return
	}
	let argument: SdArgument = {
		__isAdd: true,
		initImg: '',
		maskImg: '',
		prompt: '请填写提示词',
		__initImgFileList: [],
		__maskImgFileList: [],
		weight: 1,
		model: '',
	}
	item.argument.push(argument)
}

function onDeleteStyle(sd: SdItem, item: SdStyle) {
	if (item.__isAdd) {
		sd.style = sd.style.filter(i => i !== item)
	} else {
		onSubmit('delete_style', {
			senceId: sd.id,
			id: item.id,
		})
	}
}

function onDeleteArgument(sd: SdItem, item: SdArgument) {
	if (item.__isAdd) {
		sd.argument = sd.argument.filter(i => i !== item)
	} else {
		onSubmit('delete_argument', {
			senceId: sd.id,
			id: item.id,
		})
	}
}

function onDeleteCommon(sd: SdItem, item: CommonSd, type: CommonType) {
	if (item.__isAdd) {
		sd[type] = sd[type].filter(i => i !== item)
	} else {
		onSubmit(`delete_${type}`, {
			senceId: sd.id,
			id: item.id,
		})
	}
}

async function onChangeStyleImg(senceId: string, style: SdStyle, fileList: FileItem[]) {
	if (!skuItem.value) return

	let oldList = style.__fileList
	let base64OrUrl = ''
	if (fileList.length > oldList.length) {
		let file = fileList.find(file => file.file)
		if (file?.file) {
			base64OrUrl = await file2base64(file.file)
		}
	}

	if (fileList.length < oldList.length) {
		let deleteFile = differenceBy(oldList, fileList, file => file.uid)[0]
		if (!deleteFile) return
		base64OrUrl = ''
	}

	if (style.__isAdd) {
		style.image = base64OrUrl
		return
	}
	onSubmit('set_style', {
		senceId,
		id: style.id,
		name: style.name,
		prompt: style.prompt,
		image: base64OrUrl,
	})
}

async function onChangeArgumentImg(senceId: string, argument: SdArgument, fileList: FileItem[], type: 'initImg' | 'maskImg') {
	let oldList = argument[`__${type}FileList`]
	let base64OrUrl = ''
	if (fileList.length > oldList.length) {
		let file = fileList.find(file => file.file)
		if (file?.file) {
			base64OrUrl = await file2base64(file.file)
		}
	}

	if (fileList.length < oldList.length) {
		let deleteFile = differenceBy(oldList, fileList, file => file.uid)[0]
		if (!deleteFile) return
		base64OrUrl = ''
	}
	argument[type] = base64OrUrl

	onSubmit('set_argument', {
		senceId,
		...argument,
	})
}

const videoShow = ref(false)
function getSku() {
	if (!route.query.id) return
	loading.value = true
	apiGetSkuById(route.query.id as string)
		.then(resp => {
			if (resp?.models[0].type.includes('video')) {
				//视频详情
				videoShow.value = true
			} else {
				videoShow.value = false
			}

			skuItem.value = resp
			formatterSkuData(resp)
		})
		.finally(() => {
			loading.value = false
		})
}

getSku()
</script>
<style scoped lang="scss">
.page-sku-detail {
}
</style>
