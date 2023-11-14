import http from "@/util/http"
import { Page, PageParam } from "@/vo/Page"


export type CompanyItem = {
	_id: string
	name: string
	adminPhoneList: Array<string>
	lock: boolean
	createdAt: string
	updatedAt: string
}

// 获取企业列表
export function apiGetCompanyList(param: {
	keyword?: string
} & PageParam) {
	return http<Page<CompanyItem>>('GET', `/api/cemeta/ops/v1/company`, param)
}

// 切换企业状态
export function apiUpdateCompany(param: Partial<CompanyItem>) {
	Object.assign(param, {
		phone: param.adminPhoneList
	})
	return http('POST', `/api/cemeta/ops/v1/company/${param._id}`, param)
}

// 添加企业
export function apiAddCompany(param: Partial<CompanyItem>) {
	Object.assign(param, {
		phone: param.adminPhoneList
	})
	return http('POST', `/api/cemeta/ops/v1/company`, param)
}

// 删除企业
export function apiDeleteCompany(companyId: string) {
	return http('DELETE', `/api/cemeta/ops/v1/company/${companyId}`, {})
}


export type AddCompanyRecharge = {
	companyId: string
	word: number
	image: number
	video: number
}
//增加公司余额
export function apiCompanyRecharge(param: AddCompanyRecharge) {
	return http<{
		word: number
		image: number
		video: number
	}>('POST', '/api/cemeta/balancemanager/v1/company/recharge', param, {
		dataTransfer: 'params'
	})
}
