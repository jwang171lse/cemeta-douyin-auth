import http from "@/util/http"
import { Page, PageParam } from "@/vo/Page"


export type Policy = {
	isUseful: true
	register: false
	reserve: false
	companyAuth: false
	userAuth: false
}

export type AppItem = {
	_id: string
	createdAt: string
	updatedAt: string
	name: string
	policy: Policy
}

export type AuthType = 'user' | 'company'
export type GetAppListParam = { hasAuth?: 'yes' } & Partial<PageParam>
// 获取列表
export function getAppList(param?: GetAppListParam) {
	return http<Page<AppItem>>('GET', `/api/cemeta/ops/v1/application`, param)
}

// 更新数据
export function apiAppUpdateSetting(appId: string, option: Partial<Policy>) {
	return http('POST', `/api/cemeta/ops/v1/application/${appId}/setting`, option)
}

export type AuthItem = {
	name: string
	data: string
}
export function apiGetAuthList(appId: string, type: AuthType) {
	return http<AuthItem[]>('GET', `/api/cemeta/ops/v1/application/${appId}/auth`, { type })
}

export type SetAppAuthParam = {
	__appId?: string
	type: AuthType
	companyIds?: Array<string>
	phones?: Array<string>
}
export function apiSetAppAuth(param: SetAppAuthParam) {
	return http('POST', `/api/cemeta/ops/v1/application/${param.__appId}/auth`, param)
}
