import http from '@/util/http'
import { Page } from '@/vo/Page'
import { FileItem } from '@arco-design/web-vue'

export type SkuStatus = 'disabled' | 'active'

export type CommonSd = {
	id?: string
	prompt: string
	__isAdd?: boolean
}

export type SdStyle = {
	name: string
	image: string
	__fileList: FileItem[]
} & CommonSd

export type SdArgument = {
	initImg: string
	__initImgFileList: FileItem[]
	maskImg: string
	__maskImgFileList: FileItem[]
	weight: number
	model: string
} & CommonSd

export type SdItem = {
	id: string
	active: boolean
	name: string
	negativePrompt: string
	generateImageWhRatio: string
	style: SdStyle[]
	argument: SdArgument[]
	color: CommonSd[]
	light: CommonSd[]
	layout: CommonSd[]
	material: CommonSd[]
	__isAdd?: boolean
}

export type SkuParam = {
	sd: SdItem[]
	article: {
		xiaohongshuCorpusId: number
		wechatpyqCorpusId: number
		douyinCorpusId: number
	}
	videoDefaultImages: string[]
	__videoDefaultImages: FileItem[]
}

type modelsItem = {
	[x: string]: any
	corpusId: any
	_id: string
	skuId: string
	type: string
	detailType: string
	sellingpoints: null | undefined
	imageParams: {
		defaultImages: string[]
		__defaultImages: FileItem[]
		sd: SdItem[]
	}
}

export type SkuItem = {
	appId: string[]
	companyId: string
	resourceId: string
	createdAt: string
	image: string
	mark: string
	status: string
	review: string
	name: string
	userId: string | null
	models: modelsItem[]
	sortNum: number
	updatedAt: string
	_id: string
}

export type GetSkuListParam = {
	appId: string
	companyId: string
}

export function apiGetSkuListByCompanyAndApp(param: GetSkuListParam) {
	return http<Page<SkuItem>>('GET', `/api/cemeta/ops/v1/application/data/sku`, param)
}

//! 修改接口 type
export type UpdateSkuType =
	| 'set_review_status'
	| 'add_sence'
	| 'set_sence_status'
	| 'set_sence_negative_prompt'
	| 'set_style'
	| 'delete_style'
	| 'set_argument'
	| 'delete_argument'
	| 'set_color'
	| 'delete_color'
	| 'set_light'
	| 'delete_light'
	| 'set_layout'
	| 'delete_layout'
	| 'set_material'
	| 'delete_material'
	| 'set_video_default_img'
	| 'set_article_corpus'
	| 'set_sence_generate_image_wh_ratio'
export type UpdateSkuData = Record<string, unknown>

export function apiUpdateSku(param: { id: string; type: UpdateSkuType; data: UpdateSkuData }) {
	return http<SkuItem>('PUT', `/api/cemeta/ops/v1/application/data/sku`, param, {
		dataTransfer: 'data',
	})
}

export function apiGetSkuById(skuId: string) {
	return http<SkuItem>('GET', `/api/cemeta/ops/v1/application/data/sku/${skuId}`, {})
}
