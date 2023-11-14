import http from "@/util/http";

export function apiGetOssSts() {
	return http<{
		expiredTime: number
		expiration: string
		credentials: {
			sessionToken: string
			tmpSecretId: string
			tmpSecretKey: string
		}
		requestId: string
		startTime: number
	}>('GET', `/api/cemetapub/usermanager/v1/account/sts`, {})
}
