import http from "@/util/http"

// 修改注册登陆方式
export function apiGetConfig(param: { config: string, value: Array<string> }) {
	return http('POST', `/api/cemeta/ops/v1/config`, param)
}
