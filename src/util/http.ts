import { DOMAIN_MAP } from '@/config/config'
import { LocalStorageKey } from '@/config/enum'
import RequestPromise from '@/extend'
import { useLocalStorage } from '@/hooks/useStorage'
import { UserInfo } from '@/vo/UserInfo'
import { Modal } from '@arco-design/web-vue'
import axios, { Canceler, CancelToken, Method, ResponseType } from 'axios'

type RequestResult = {
	code: number
	status: number
	message: string | undefined
	data: unknown
}

type RequestConfig = {
	responseType?: ResponseType
	dataTransfer?: 'data' | 'params'
	domainName?: keyof typeof DOMAIN_MAP
	cancelPreviousRequest?: RequestPromise<unknown> | null
	showMsg?: boolean
	timeout?: number
	headers?: Record<string, unknown>
	coverHeader?: boolean
	sourceResult?: boolean
	tokenExpireUncheck?: boolean //todo
}
type AxiosRequestConfig = {
	responseType?: ResponseType
	timeout: number
	headers: {
		'X-App'?: string
	}
	cancelToken: CancelToken
	method: Method
	url: string
	params?: unknown
	data?: unknown
}
const DEFAULT_REQUEST_CONFIG: RequestConfig = {
	showMsg: true,
}
function getRequestUrl(url: string, config: RequestConfig): string {
	let requestUrl = ''
	requestUrl = DOMAIN_MAP[config.domainName || 'default'] as string
	//url是否已http开头
	if (url.startsWith('http')) {
		requestUrl = url
	}
	//正常拼接
	else {
		requestUrl += url
	}
	return requestUrl
}
function showMsg(config: RequestConfig, title?: string, err?: string) {
	if (config.showMsg) {
		Modal.error({
			title: title || '',
			content: err || ''
		})
	}
}

function addHeader(header: object, name: string, value: string | number | undefined | null) {
	if (value != null && value != undefined && value != '') {
		Object.assign(header, {
			[name]: value
		})
	}
}

const http = function <T>(method: Method, url: string, params: unknown, requestConfig?: RequestConfig): RequestPromise<T> {
	const config: RequestConfig = JSON.parse(JSON.stringify(DEFAULT_REQUEST_CONFIG))
	Object.assign(config, requestConfig)
	if (config.cancelPreviousRequest) {
		config.cancelPreviousRequest.__abort('Canceled Request:' + url)
	}
	const requestUrl = getRequestUrl(url, config)
	let headers: Record<string, unknown> = {
		'X-App': 'admin',
	}

	let userInfo = useLocalStorage<UserInfo | null>(LocalStorageKey.USER_INFO)

	// addHeader(headers, 'X-Auth', userInfo?.token)
	// addHeader(headers, 'X-Company', userInfo?.user?.companyId)
	addHeader(headers, 'X-User', userInfo?.user.id)

	if (config.coverHeader) {
		headers = requestConfig?.headers || {}
	} else if (config.headers) {
		Object.assign(headers, config.headers)
	}

	let abort: Canceler = () => {
		console.log('Not have axios Canceler.')
	}
	const axiosRequestConfig: AxiosRequestConfig = {
		timeout: config.timeout || 15000,
		cancelToken: new axios.CancelToken(function executor(cancel) {
			abort = cancel
		}),
		headers,
		method: method,
		url: requestUrl,
	}

	if (config.responseType) {
		axiosRequestConfig.responseType = config.responseType
	}

	if (config.dataTransfer) {
		axiosRequestConfig[config.dataTransfer] = params
	} else {
		const upperMethod = String.prototype.toUpperCase.call(method)

		if (upperMethod === 'GET' || upperMethod === 'DELETE') {
			axiosRequestConfig.params = params
		} else {
			axiosRequestConfig.data = params
		}
	}

	const request = new RequestPromise<T>((resolve, reject) => {
		axios
			.request<T | RequestResult>(axiosRequestConfig)
			.then(resp => {
				if (requestConfig?.sourceResult) {
					resolve(resp.data as unknown as T)
					return
				}
				//TODO(songle): 判断token失效的状态码，失效就返回到首页
				let respInfo = resp.data as RequestResult
				if (respInfo.status && (respInfo.code || respInfo.message)) {
					showMsg(config, '' + respInfo.code, respInfo.message)
					reject(respInfo)
				} else {
					resolve(resp.data as T)
				}
			})
			.catch(async err => {
				if (!(err instanceof axios.Cancel)) {
					showMsg(config, err?.response?.data?.code || '请求出错', err?.response?.data?.message || err.message)
				}
				reject(err)
			})
	}, abort)
	return request
}
export default http;
