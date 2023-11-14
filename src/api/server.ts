import http from "@/util/http"
import { Page, PageParam } from "@/vo/Page"


export type ServerItem = {
	_id: string
	name: string
	address: string
	type: "sd"
	weight: number
	receiveReq: boolean
	status: "free" | "busy"
	taskId: null | string
	distributed: boolean
	createdAt?: string
	updatedAt?: string
}

export function apiGetServerList(param: {
	address?: string
} & PageParam) {
	return http<Page<ServerItem>>('GET', `/api/cemeta/ops/v1/server`, param)
}

export function apiAddServer(param: Partial<ServerItem>) {
	return http('POST', `/api/cemeta/ops/v1/server`, param)
}

export function apiSetServerPullTaskStatus(serverId: string, param: {
	receiveReq: boolean
}) {
	return http('POST', `/api/cemeta/ops/v1/server/${serverId}`, param)
}

export function apiDeleteServer(serverId: string) {
	return http('DELETE', `/api/cemeta/ops/v1/server`, {
		ids: [serverId]
	}, {
		dataTransfer: 'data'
	})
}
