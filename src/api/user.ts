import http from "@/util/http"
import request from "@/util/request"
import { UserInfo } from "@/vo/UserInfo"


export function apiLogin(param: {
	account: string
	password: string
}) {
	return http<UserInfo>('POST', `/api/cemetapub/ops/v1/account/login`, {
		payload: param,
		type: 'pwd'
	})
}
export function getDouyin() {
	return request('GET', '/api/qrcode/auth', {
	}, { responseType: 'blob' })
}
