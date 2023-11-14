export const createAndDispatchEvent = function (eventName: string, data?: unknown) {
	const event = new CustomEvent(eventName, { detail: data })
	dispatchEvent(event)
}
