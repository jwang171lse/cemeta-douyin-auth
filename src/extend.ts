import { Canceler } from 'axios'

class RequestPromise<T> extends Promise<T> {
	constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void, public __abort: Canceler) {
		super(executor)
	}

	then<TResult1 = T, TResult2 = never>(
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
	): RequestPromise<TResult1 | TResult2> {
		const result = super.then(onfulfilled, onrejected) as RequestPromise<TResult1 | TResult2>
		result.__abort = this.__abort
		return result
	}

	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): RequestPromise<T | TResult> {
		const result = super.catch(onrejected) as RequestPromise<T | TResult>
		result.__abort = this.__abort
		return result
	}

	finally(onfinally?: (() => void) | undefined | null): RequestPromise<T> {
		const result = super.finally(onfinally) as RequestPromise<T>
		result.__abort = this.__abort
		return result
	}
}

export default RequestPromise

declare module 'vue-router' {

	interface RouteMeta {
		title?: string
		noLogin?: boolean
		icon?: () => JSX.Element
		menuShow?: boolean
		permission?: string
	}
}


