import http from "@/util/http"
import { Page, PageParam } from "@/vo/Page"


export type TicketsItem = {
	_id: string
	type: string
	code: string
	appId: string
	phone: string
	userId: string
	companyId: string
	quota: {
		word: number
		image: number
		video: number
	},
	isUseful: boolean
	createdAt: string
	updatedAt: string
}

// 获取兑换码列表
export function apiGetTicketList(param: {
	phone?: string
} & PageParam) {
	return http<Page<TicketsItem>>('GET', `/api/cemeta/ops/v1/ticket`, param)
}

export type AddTicketParam = {
	appId: string,
	phone: string,
	word: number
}

// 添加兑换码
export function apiAddTicket(param: AddTicketParam) {
	return http<Page<TicketsItem>>('post', `/api/cemeta/ops/v1/ticket`, param)
}

// 删除兑换码
export function apiDeleteTicket(ids: Array<string>) {
	return http('DELETE', `/api/cemeta/ops/v1/ticket`, {
		ids
	}, {
		dataTransfer: 'data'
	})
}
