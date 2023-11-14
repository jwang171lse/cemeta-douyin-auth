
export function useStorage<T>(type: Storage, key: string, value?: T) {
	if (value != undefined && value != '' && value != null) {
		type.setItem(key, JSON.stringify(value))
		return value
	} else {
		let result = type.getItem(key)
		return result ? JSON.parse(type.getItem(key) || '') as T : null
	}
}


export function useLocalStorage<T>(key: string, value?: T) {
	return useStorage(localStorage, key, value)
}

export function useSessionStorage<T>(key: string, value?: T) {
	return useStorage(sessionStorage, key, value)

}
