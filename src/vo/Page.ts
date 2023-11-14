export interface Page<T> {
	list: T[],
	total: number
}

export interface PageParam {
	skip: number
	limit: number
}
